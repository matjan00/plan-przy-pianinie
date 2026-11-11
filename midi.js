"use strict";
/* Pianino przez USB (Web MIDI) – funkcja opcjonalna. Bez połączenia aplikacja działa jak dotąd.
   Karta jest w Narzędziach. Wybór „połącz” pamiętamy na urządzeniu (localStorage "ppp-midi"), nie na koncie,
   bo kabel jest wpięty w konkretny telefon albo komputer.
   Inne moduły mogą słuchać gry: midiListen(fn) → fn({type:"on"|"off", midi, vel, t}), t jak performance.now(). */

const MIDI = {
  supported: typeof navigator !== "undefined" && typeof navigator.requestMIDIAccess === "function",
  status: "off",        // off | asking | on | denied | error
  access: null, gen: 0,
  inputs: [],           // [{id, name}] – podłączone wejścia
  held: new Map(),      // "wejście|kanał|nuta" → {src, ch, note}
  pedal: new Map(),     // "wejście|kanał" → wartość CC64
  last: null,           // {midi, vel}
  count: 0, gotC: false,
  subs: []
};
const MIDI_LS = "ppp-midi";
const MIDI_NAMES = ["C", "Cis/Des", "D", "Dis/Es", "E", "F", "Fis/Ges", "G", "Gis/As", "A", "Ais/B", "H"];
const MIDI_LOW = 21, MIDI_HIGH = 108, MIDI_C = 60;   // A0–C8 (88 klawiszy), środkowe C

function midiPref() { try { return localStorage.getItem(MIDI_LS) === "1"; } catch (e) { return false; } }
function midiSetPref(on) { try { if (on) localStorage.setItem(MIDI_LS, "1"); else localStorage.removeItem(MIDI_LS); } catch (e) {} }
function midiListen(fn) { MIDI.subs.push(fn); return () => { MIDI.subs = MIDI.subs.filter(x => x !== fn); }; }
function midiEmit(ev) { for (const fn of MIDI.subs.slice()) { try { fn(ev); } catch (e) {} } }

/* ============================== KOMUNIKATY MIDI ============================== */
// Bajty jednego zdarzenia → lista komunikatów. Web MIDI daje zwykle jeden komunikat na zdarzenie, ale czytamy do końca bufora.
// Note on z siłą 0 to puszczenie klawisza. Komunikaty systemowe (zegar, active sensing, SysEx) pomijamy.
function midiParse(data) {
  const out = []; let i = 0; const n = data ? data.length : 0;
  while (i < n) {
    const s = data[i];
    if (s < 0x80) { i++; continue; }
    if (s >= 0xF0) {
      if (s === 0xF0) { i++; while (i < n && data[i] !== 0xF7) i++; i++; }
      else i += s === 0xF2 ? 3 : (s === 0xF1 || s === 0xF3) ? 2 : 1;
      continue;
    }
    const kind = s & 0xF0, ch = s & 0x0F, len = (kind === 0xC0 || kind === 0xD0) ? 1 : 2;
    if (i + len >= n) break;                                   // ucięty komunikat
    const a = data[i + 1], b = len === 2 ? data[i + 2] : 0;
    if (a > 127 || b > 127) { i++; continue; }                 // zamiast danych przyszedł nowy status
    if (kind === 0x90 && b > 0) out.push({type: "on", ch, note: a, vel: b});
    else if (kind === 0x80 || kind === 0x90) out.push({type: "off", ch, note: a});
    else if (kind === 0xB0) out.push({type: "cc", ch, num: a, val: b});
    i += 1 + len;
  }
  return out;
}
const midiNoteHeld = (note) => { for (const h of MIDI.held.values()) if (h.note === note) return true; return false; };
function midiHeldNotes() { return [...new Set([...MIDI.held.values()].map(h => h.note))].sort((a, b) => a - b); }
function midiPedalDown() { for (const v of MIDI.pedal.values()) if (v >= 64) return true; return false; }

function midiApply(src, m, t) {
  const key = src + "|" + m.ch + "|" + m.note;
  if (m.type === "on") {
    // ten sam dźwięk na drugim kanale (brzmienie Dual w pianinie) to nadal jedno uderzenie
    const dup = midiNoteHeld(m.note) && !MIDI.held.has(key);
    MIDI.held.set(key, {src, ch: m.ch, note: m.note});
    if (dup) return;
    MIDI.last = {midi: m.note, vel: m.vel}; MIDI.count++;
    if (m.note === MIDI_C) MIDI.gotC = true;
    midiEmit({type: "on", midi: m.note, vel: m.vel, t});
  } else if (m.type === "off") {
    if (!MIDI.held.delete(key)) return;
    if (!midiNoteHeld(m.note)) midiEmit({type: "off", midi: m.note, vel: 0, t});
  } else if (m.type === "cc") {
    if (m.num === 64) MIDI.pedal.set(src + "|" + m.ch, m.val);
    else if (m.num === 121) MIDI.pedal.delete(src + "|" + m.ch);                    // reset kontrolerów
    else if (m.num === 120 || m.num === 123) midiRelease(h => h.src === src && h.ch === m.ch, t);   // all sound / notes off
  }
}
// zwalnia klawisze spełniające warunek (odłączone wejście, „all notes off”, aplikacja w tle)
function midiRelease(test, t) {
  const gone = new Set();
  for (const [k, h] of [...MIDI.held]) if (test(h)) { MIDI.held.delete(k); gone.add(h.note); }
  for (const note of gone) if (!midiNoteHeld(note)) midiEmit({type: "off", midi: note, vel: 0, t: t === undefined ? performance.now() : t});
}
function midiOnMsg(e) {
  if (MIDI.status !== "on") return;
  const port = e.currentTarget || e.target, src = (port && port.id) || "?";
  const msgs = midiParse(e.data); if (!msgs.length) return;
  const t = typeof e.timeStamp === "number" && e.timeStamp > 0 ? e.timeStamp : performance.now();
  for (const m of msgs) midiApply(src, m, t);
  midiPaint();
}

/* ============================== POŁĄCZENIE ============================== */
async function midiConnect() {
  if (!MIDI.supported || MIDI.status === "asking" || MIDI.status === "on") return;
  const gen = ++MIDI.gen;
  MIDI.status = "asking"; midiRefresh();
  try {
    const acc = await navigator.requestMIDIAccess();
    if (gen !== MIDI.gen) return;                              // anulowano w trakcie pytania o zgodę
    MIDI.access = acc; MIDI.status = "on"; MIDI.inputs = [];
    midiSetPref(true);
    acc.onstatechange = () => midiScan(true);
    midiScan(false);
  } catch (err) {
    if (gen !== MIDI.gen) return;
    MIDI.status = err && (err.name === "SecurityError" || err.name === "NotAllowedError") ? "denied" : "error";
  }
  midiRefresh();
  if (MIDI.status === "on") announce(MIDI.inputs.length ? "Pianino połączone" : "Zgoda udzielona, czekam na pianino");
}
function midiOff() {
  MIDI.gen++;
  if (MIDI.access) {
    try { MIDI.access.onstatechange = null; MIDI.access.inputs.forEach(inp => { inp.onmidimessage = null; }); } catch (e) {}
  }
  MIDI.access = null; MIDI.status = "off"; MIDI.inputs = [];
  midiRelease(() => true); MIDI.pedal.clear();
  midiSetPref(false); midiRefresh();
}
// Lista podłączonych wejść. Wywoływana po połączeniu i przy każdym wpięciu lub wypięciu kabla.
function midiScan(notify) {
  if (!MIDI.access || MIDI.status !== "on") return;
  const list = [];
  MIDI.access.inputs.forEach(inp => {
    if (inp.state === "disconnected") { inp.onmidimessage = null; return; }
    list.push({id: inp.id, name: (inp.name || "").trim() || "Urządzenie MIDI"});
    if (inp.onmidimessage !== midiOnMsg) inp.onmidimessage = midiOnMsg;       // przypisanie otwiera port
  });
  const before = MIDI.inputs, ids = new Set(list.map(x => x.id));
  const added = list.filter(x => !before.some(b => b.id === x.id)), removed = before.filter(b => !ids.has(b.id));
  if (!added.length && !removed.length) return;
  MIDI.inputs = list;
  if (removed.length) {
    midiRelease(h => !ids.has(h.src));
    for (const k of [...MIDI.pedal.keys()]) if (!ids.has(k.slice(0, k.lastIndexOf("|")))) MIDI.pedal.delete(k);
  }
  if (notify) {
    const msg = added.length ? "Pianino połączone: " + added[0].name : list.length ? "Odłączono: " + removed[0].name : "Pianino odłączone";
    toast(msg); announce(msg);
    midiRefresh();
  }
}
// po starcie: łączymy same tylko wtedy, gdy połączenie było włączone na tym urządzeniu i przeglądarka ma już zgodę (bez pytania)
async function midiAuto() {
  if (!MIDI.supported || !midiPref() || !navigator.permissions || !navigator.permissions.query) return;
  try { const p = await navigator.permissions.query({name: "midi"}); if (p.state === "granted") midiConnect(); } catch (e) {}
}

/* ============================== KARTA W NARZĘDZIACH ============================== */
function midiPill() {
  if (MIDI.status === "on") return MIDI.inputs.length ? `<span class="pill own">połączone</span>` : `<span class="pill">czekam na pianino</span>`;
  return `<span class="pill">opcjonalnie</span>`;
}
function midiKbSvg() {
  const W = 10, H = 56; let x = 0, wh = "", bl = "", dot = "";
  for (let m = MIDI_LOW; m <= MIDI_HIGH; m++) {
    if ([1, 3, 6, 8, 10].includes(m % 12)) { bl += `<rect class="b" data-m="${m}" x="${x - 3}" y="0" width="6" height="${H * 0.62}" rx="1"/>`; continue; }
    wh += `<rect class="w" data-m="${m}" x="${x}" y="0" width="${W}" height="${H}" rx="1.5"/>`;
    if (m === MIDI_C) dot = `<circle class="cdot" cx="${x + W / 2}" cy="${H + 6}" r="2.5"/>`;
    x += W;
  }
  return `<svg class="mkb" id="midi-kb" viewBox="-1 -1 ${x + 2} ${H + 12}" role="img" aria-label="Klawiatura pianina z zaznaczonymi naciśniętymi klawiszami">${wh}${bl}${dot}</svg>`;
}
function midiBodyHtml() {
  if (!MIDI.supported) {
    return `<p class="small">${window.isSecureContext === false ? "Połączenie z pianinem działa tylko na stronie otwartej przez https." : "Ta przeglądarka nie obsługuje połączenia z pianinem (MIDI). Działa w Chrome i Edge na Androidzie i na komputerze. Na iPhonie i iPadzie nie działa."}</p>
      <p class="small muted">Wszystko inne w aplikacji działa bez połączenia.</p>`;
  }
  const cable = `<p class="small muted">Kabel: z gniazda <b>USB TO HOST</b> pod klawiaturą pianina (kwadratowa wtyczka USB-B) do telefonu, tabletu albo komputera.</p>`;
  if (MIDI.status === "asking") {
    return `<p class="small" role="status">Czekam na zgodę przeglądarki na dostęp do urządzeń MIDI…</p>
      <div class="row"><button class="btn sm ghost" data-act="midi-off">Anuluj</button></div>`;
  }
  if (MIDI.status === "denied" || MIDI.status === "error") {
    return `<p class="small" role="status"><b>${MIDI.status === "denied" ? "Przeglądarka nie dała dostępu do urządzeń MIDI." : "Nie udało się włączyć połączenia MIDI."}</b></p>
      <p class="small">${MIDI.status === "denied" ? "W ustawieniach tej strony w Chrome (ikona przy adresie → Uprawnienia) ustaw „Urządzenia MIDI” na „Zezwalaj”, a potem spróbuj ponownie." : "Zamknij inne programy, które używają pianina, i spróbuj ponownie."}</p>
      <div class="row"><button class="btn sm primary" data-act="midi-on">Spróbuj ponownie</button></div>`;
  }
  if (MIDI.status === "on" && !MIDI.inputs.length) {
    return `<p class="small" role="status"><b>Nie widzę jeszcze pianina.</b> Ta karta sama się odświeży, gdy się pojawi.</p>
      <ul class="tips small"><li>Włącz pianino.</li><li>Sprawdź, czy kabel siedzi w gnieździe USB TO HOST i w telefonie lub komputerze.</li><li>Wyjmij kabel i włóż go jeszcze raz.</li><li>W telefonie zwykły kabel do ładowania nie wystarczy – potrzebny jest kabel USB-C – USB-B albo adapter OTG.</li></ul>
      <div class="row"><button class="btn sm ghost" data-act="midi-off">Wyłącz połączenie</button></div>`;
  }
  if (MIDI.status === "on") {
    return `<p class="small" role="status">Połączono: <b>${MIDI.inputs.map(x => esc(x.name)).join(", ")}</b></p>
      <div class="stack" style="gap:8px">
        <div class="midinote idle" id="midi-note">–</div>
        <p class="small muted" id="midi-sub" style="margin:0;text-align:center"></p>
        ${midiKbSvg()}
        <div class="bar" aria-hidden="true"><span id="midi-vel" style="width:0%"></span></div>
        <div class="spread small"><span id="midi-ctest"></span><span class="pill own" id="midi-ped" hidden>pedał wciśnięty</span></div>
      </div>
      <p class="small muted">Kropka pod klawiaturą to środkowe C. Jeśli aplikacja pokazuje inny dźwięk niż ten, który grasz, sprawdź, czy w pianinie nie jest włączona transpozycja.</p>
      <p class="small muted">${typeof isBeg === "function" && isBeg() ? "W kursie od zera pod nutami ćwiczeń i utworów jest teraz pasek <b>Zagraj z pianinem</b> z dwoma trybami: „Nuty czekają” (sprawdza klawisze) i „Z metronomem” (sprawdza też rytm i długość nut)." : "Sprawdzanie gry na żywo działa na razie tylko w kursie od zera."}</p>
      <div class="row"><button class="btn sm ghost" data-act="midi-off">Wyłącz połączenie</button></div>`;
  }
  return `<p class="small">Po podłączeniu pianina cyfrowego kablem USB aplikacja widzi, które klawisze naciskasz. To dodatek: wszystko w aplikacji działa też bez niego.</p>
    ${cable}
    <div class="row"><button class="btn sm primary" data-act="midi-on">Połącz pianino</button></div>`;
}
function midiCardHtml() {
  return `<details class="card" id="midicard"><summary data-k="midi">Pianino przez USB <span id="midi-pill">${midiPill()}</span></summary>
    <div class="stack" id="midi-body" style="margin-top:10px">${midiBodyHtml()}</div>
    <div id="midi-extra" style="margin-top:12px">${typeof mpCardExtraHtml === "function" ? mpCardExtraHtml() : ""}</div></details>`;
}
// przerysowanie samej karty (stan połączenia); naciśnięte klawisze maluje midiPaint
function midiRefresh() {
  if (typeof mpBars === "function") mpBars();        // paski pianina w kursie od zera (midiplay.js)
  const body = document.getElementById("midi-body"); if (!body) return;
  const ae = document.activeElement, act = ae && body.contains(ae) ? ae.dataset.act : null;
  body.innerHTML = midiBodyHtml();
  const pill = document.getElementById("midi-pill"); if (pill) pill.innerHTML = midiPill();
  if (act) { const b = body.querySelector(`[data-act="${act}"]`) || body.querySelector("[data-act]"); if (b) b.focus({preventScroll: true}); }
  midiPaint();
}
function midiVelWord(v) { return v < 45 ? "cicho" : v < 85 ? "średnio" : "głośno"; }
function midiPaint() {
  const noteEl = document.getElementById("midi-note"); if (!noteEl) return;
  const held = midiHeldNotes(), L = MIDI.last;
  noteEl.textContent = held.length ? held.map(m => MIDI_NAMES[m % 12]).join(" · ") : L ? MIDI_NAMES[L.midi % 12] : "–";
  noteEl.classList.toggle("idle", !held.length);
  const sub = document.getElementById("midi-sub");
  if (sub) sub.textContent = L ? `${held.length ? "" : "Ostatni dźwięk · "}siła uderzenia ${L.vel} na 127 (${midiVelWord(L.vel)}) · odebrane dźwięki: ${MIDI.count}` : "Zagraj dowolny klawisz.";
  const vel = document.getElementById("midi-vel"); if (vel) vel.style.width = (L ? Math.round(L.vel / 127 * 100) : 0) + "%";
  const kb = document.getElementById("midi-kb");
  if (kb) { const on = new Set(held); kb.querySelectorAll("[data-m]").forEach(r => r.classList.toggle("on", on.has(+r.dataset.m))); }
  const ped = document.getElementById("midi-ped"); if (ped) ped.hidden = !midiPedalDown();
  const ct = document.getElementById("midi-ctest");
  if (ct) { ct.textContent = MIDI.gotC ? "✓ Środkowe C rozpoznane – połączenie działa." : "Test: zagraj środkowe C."; ct.classList.toggle("chkfb", MIDI.gotC); ct.classList.toggle("ok", MIDI.gotC); }
}

/* ============================== ZDARZENIA ============================== */
document.addEventListener("click", (e) => {
  const t = e.target.closest && e.target.closest("[data-act]"); if (!t) return;
  if (t.dataset.act === "midi-on") midiConnect();
  else if (t.dataset.act === "midi-off") midiOff();
});
// w tle przeglądarka może zgubić puszczenie klawisza – czyścimy, a po powrocie sprawdzamy listę urządzeń
document.addEventListener("visibilitychange", () => {
  if (document.hidden) { midiRelease(() => true); MIDI.pedal.clear(); midiPaint(); }
  else if (MIDI.status === "on") midiScan(true);
});
// dopiero po wczytaniu całej strony, bo komunikaty (toast, announce) są w głównym skrypcie
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", midiAuto); else midiAuto();
