"use strict";
/* Gra z pianinem w kursie od zera – wymaga midi.js. Wszystko tu jest opcjonalne: bez pianina kurs działa jak dotąd,
   a całą opcję można ukryć na urządzeniu (localStorage "ppp-midi-hide").

   Pod każdym ćwiczeniem z nutami i pod każdym utworem jest „pasek pianina” (<div data-pbar="lesson:b3:0|piece:bp-oda">),
   a przy zadaniach bez nut (rozgrzewka, „Przy pianinie”) pasek z podglądem klawiszy (data-pbar="free:…").
   Pasek wypełnia mpBars() po każdym przerysowaniu widoku i po zmianie stanu połączenia.

   Dwa tryby:
   - „Nuty czekają” (wait): aplikacja czeka na właściwy klawisz, tempo nie jest oceniane.
   - „Z metronomem” (tempo): takt odliczania, potem kursor idzie w tempie; oceniamy trafione dźwięki, rytm i długość nut.
   Wysokości, czasy i powiązanie z narysowanymi nutami bierzemy z abcjs. Widok bywa przerysowywany, więc nuty
   wskazujemy selektorem klas abcjs, a nie elementem.
   Wyniki całości (obie ręce): S.beg.play[src] = {best, n, d} dla „Nuty czekają” oraz tb, tbpm dla „Z metronomem”. */

const MP = {on: false, src: null, mode: null, stage: null, hand: null, nv: 1, steps: [], i: 0, wrong: 0, msg: "", cls: "",
  tempoIdx: 0, bpm: 0, beats: 4, den: 4, beatMs: 0, tol: 0, matchW: 0, endT: 0, a0: 0, c0: 0, t0: 0, clickK: 0, clickN: 0, beat: -1, mi: 0,
  extra: 0, lastOff: null, timer: null, res: null};
const MP_HIDE = "ppp-midi-hide", MP_LAT = "ppp-midi-lat";

function mpHidden() { try { return localStorage.getItem(MP_HIDE) === "1"; } catch (e) { return false; } }
function mpSetHidden(on) { try { if (on) localStorage.setItem(MP_HIDE, "1"); else localStorage.removeItem(MP_HIDE); } catch (e) {} }
// stałe opóźnienie między kliknięciem metronomu a uderzeniem w klawisz na tym urządzeniu (ms); uczy się samo po każdym przejściu
function mpLat() { try { const v = parseFloat(localStorage.getItem(MP_LAT)); return isFinite(v) ? Math.max(-150, Math.min(400, v)) : 0; } catch (e) { return 0; } }
function mpSetLat(v) { try { localStorage.setItem(MP_LAT, String(Math.round(Math.max(-150, Math.min(400, v))))); } catch (e) {} }
const mpReady = () => MIDI.status === "on" && MIDI.inputs.length > 0;
const mpRec = (src) => { const B = S.beg; return (B && B.play && B.play[src]) || null; };

/* ============================== PASEK PIANINA ============================== */
function mpBarSlot(src) { return `<div class="pbar" data-pbar="${src}" hidden></div>`; }
function mpUiHtml(src) { return "</div>" + mpBarSlot(src); }        // zamyka wiersz przycisków pod nutami
const MP_ICON = `<span class="pkeys" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;

function mpConnectHtml() {
  let txt = "Sprawdzaj grę z pianinem (USB)", btn = `<button class="btn sm" data-act="midi-on">Połącz</button>`;
  if (MIDI.status === "asking") { txt = "Czekam na zgodę przeglądarki…"; btn = ""; }
  else if (MIDI.status === "on") { txt = "Nie widzę pianina – włącz je i sprawdź kabel USB."; btn = ""; }
  else if (MIDI.status === "denied" || MIDI.status === "error") { txt = "Brak dostępu do pianina."; btn = `<button class="btn sm" data-act="goto" data-tab="tools">Szczegóły</button>`; }
  return `${MP_ICON}<span class="grow" role="status">${txt}</span>${btn}<button class="pclose" data-act="mp-hide" aria-label="Ukryj opcję pianina">×</button>`;
}
function mpModesHtml(src) {
  const r = mpRec(src);
  return `<div class="pbar-head">${MP_ICON}<b>Zagraj z pianinem</b><span class="grow"></span><span class="pdot on" aria-hidden="true"></span><span>połączone</span></div>
    <div class="pmodes">
      <button class="pmode" data-act="mp-start" data-src="${src}" data-mode="wait"><b>Nuty czekają</b><span>Bez tempa. Sprawdza, czy grasz właściwe klawisze.</span>${r && r.best !== undefined ? `<span class="pill own">najlepiej ${r.best}%</span>` : ""}</button>
      <button class="pmode" data-act="mp-start" data-src="${src}" data-mode="tempo"><b>Z metronomem</b><span>Sprawdza też rytm i długość nut.</span>${r && r.tb !== undefined ? `<span class="pill own">najlepiej ${r.tb}% · ♩=${r.tbpm}</span>` : ""}</button>
    </div>`;
}
function mpLiveHtml() {
  return `<div class="pbar-head">${MP_ICON}<b>Podgląd klawiszy</b><span class="grow"></span><span class="plive" data-live>–</span></div>
    ${midiKbSvg().replace(' id="midi-kb"', "")}`;
}
function mpBarKey(src) {
  if (!MIDI.supported || mpHidden() || !isBeg()) return "none";
  if (MP.on && MP.src === src) return ["s", MP.mode, MP.stage, MP.hand, MP.nv, MP.tempoIdx].join("|");
  if (mpReady()) return "ready|" + JSON.stringify(mpRec(src));
  // bez połączenia jedno zaproszenie na widok wystarczy: przy zadaniu bez nut pokazujemy je tylko, gdy obok nie ma ćwiczenia z nutami
  if (src.startsWith("free:") && document.querySelector('#view [data-pbar]:not([data-pbar^="free:"])')) return "none";
  return "c|" + MIDI.status;
}
function mpBarFill(el, force) {
  const src = el.dataset.pbar, key = mpBarKey(src);
  if (!force && el.dataset.key === key) return;
  el.dataset.key = key;
  el.classList.remove("pslim");
  el.classList.toggle("plivebar", key[0] === "s" && MP.stage !== "setup" && MP.stage !== "done");   // w trakcie gry panel trzyma się dołu ekranu
  if (key === "none") { el.hidden = true; el.innerHTML = ""; return; }
  el.hidden = false;
  if (key[0] === "s") { el.innerHTML = mpSessionHtml(); mpPanelUpdate(); }
  else if (key[0] === "r") { el.innerHTML = src.startsWith("free:") ? mpLiveHtml() : mpModesHtml(src); mpLivePaint(); }
  else { el.classList.add("pslim"); el.innerHTML = mpConnectHtml(); }
}
function mpBars(force) { document.querySelectorAll("#view [data-pbar]").forEach(el => mpBarFill(el, force)); }
// podgląd klawiszy przy zadaniach bez nut
function mpLivePaint() {
  const hosts = document.querySelectorAll("#view [data-live]"); if (!hosts.length) return;
  const held = midiHeldNotes(), on = new Set(held), txt = held.length ? held.map(m => MIDI_NAMES[m % 12]).join(" · ") : "–";
  hosts.forEach(h => { h.textContent = txt; const kb = h.closest(".pbar").querySelector(".mkb"); if (kb) kb.querySelectorAll("[data-m]").forEach(r => r.classList.toggle("on", on.has(+r.dataset.m))); });
}

/* ============================== NUTY Z ABCJS ============================== */
const mpVisible = (list) => [...list].find(el => el.offsetParent !== null) || list[0] || null;
function mpScoreEl() {
  if (!MP.src) return null;
  const [kind, id, k] = MP.src.split(":");
  return mpVisible(document.querySelectorAll(kind === "piece" ? `#view [data-babc="${id}"]` : `#view [data-abc="${id}:${k}"]`));
}
function mpHostEl() { return MP.src ? mpVisible(document.querySelectorAll(`#view [data-pbar="${MP.src}"]`)) : null; }

// Kroki: nuty wszystkich głosów (albo jednej ręki) zaczynające się w tej samej chwili tworzą jeden krok.
// w, d – początek i długość w całych nutach; p – wysokość MIDI; sel – selektor narysowanej nuty.
function mpBuild(vo, hand) {
  const voices = vo.makeVoicesArray(), map = new Map();
  voices.forEach((voice, vi) => {
    if (hand !== null && vi !== hand) return;
    for (const e of voice) {
      const a = e.elem && e.elem.abcelem;
      if (!a || a.el_type !== "note" || a.rest || !a.midiPitches || !a.midiPitches.length) continue;   // pauzy i dokończenia łuków nie są krokami
      const svg = e.elem.elemset && e.elem.elemset[0], cls = (svg && svg.getAttribute("class")) || "";
      const mm = cls.match(/abcjs-mm(\d+)/), n = cls.match(/abcjs-n(\d+)/);
      const sel = mm && n ? `.abcjs-note.abcjs-mm${mm[1]}.abcjs-v${vi}.abcjs-n${n[1]}` : null;
      const k = Math.round(a.midiPitches[0].start * 20160);
      let st = map.get(k); if (!st) { st = {w: a.midiPitches[0].start, T: 0, notes: [], pitches: new Set(), hit: new Set(), err: 0, bar: mm ? +mm[1] + 1 : 0}; map.set(k, st); }
      for (const m of a.midiPitches) { if (st.pitches.has(m.pitch)) continue; st.pitches.add(m.pitch); st.notes.push({p: m.pitch, d: m.duration, sel, bar: mm ? +mm[1] + 1 : 0}); }
    }
  });
  let meter = null; try { meter = vo.getMeterFraction(); } catch (e) {}
  return {steps: [...map.values()].sort((x, y) => x.w - y.w), nv: voices.length,
    beats: meter && meter.num ? meter.num : 4, den: meter && meter.den ? meter.den : 4};
}
function mpClear(el) { if (el) el.querySelectorAll(".mp-cur,.mp-ok,.mp-fix,.mp-warn,.mp-bad").forEach(x => x.classList.remove("mp-cur", "mp-ok", "mp-fix", "mp-warn", "mp-bad")); }
function mpNoteClass(st, n, i) {
  if (MP.mode === "wait") {
    if (i < MP.i || MP.stage === "done") return st.err ? "mp-fix" : "mp-ok";
    return i === MP.i ? "mp-cur" : null;
  }
  if (n.s === "miss") return "mp-fix";
  if (n.s) return n.s === "ok" && !n.len ? "mp-ok" : "mp-warn";
  return i === MP.i && (MP.stage === "count" || MP.stage === "run") ? "mp-cur" : null;
}
const MP_RANK = {"mp-ok": 1, "mp-warn": 2, "mp-fix": 3, "mp-cur": 4};
function mpPaintScore() {
  const el = mpScoreEl(); if (!el) return;
  mpClear(el);
  const cls = new Map();
  MP.steps.forEach((st, i) => { for (const n of st.notes) { const c = mpNoteClass(st, n, i); if (n.sel && c && (!cls.has(n.sel) || MP_RANK[c] > MP_RANK[cls.get(n.sel)])) cls.set(n.sel, c); } });
  for (const [sel, c] of cls) { const n = el.querySelector(sel); if (n) { n.classList.add(c); if (c === "mp-cur" && MP.mode === "wait" && MP.cls === "bad") n.classList.add("mp-bad"); } }
}
// podświetlona nuta ma być widoczna bez dotykania ekranu
function mpFollow() {
  const el = mpScoreEl(), st = MP.steps[MP.i]; if (!el || !st || MP.stage === "done") return;
  const sel = (st.notes.find(n => n.sel) || {}).sel, n = sel ? el.querySelector(sel) : null; if (!n) return;
  const r = n.getBoundingClientRect();
  if (r.top < 70 || r.bottom > window.innerHeight - 340) window.scrollTo({top: Math.max(0, window.scrollY + r.top - window.innerHeight * 0.22), behavior: smooth()});
}

// na początku ustawiamy nuty u góry ekranu, żeby pod nimi zmieścił się panel
function mpShow() {
  const el = MP.on && mpScoreEl(); if (!el) return;
  window.scrollTo({top: Math.max(0, window.scrollY + el.getBoundingClientRect().top - 12), behavior: smooth()});
}

/* ============================== START I STOP ============================== */
function mpStart(src, mode, hand) {
  if (!isBeg()) return;
  if (MP.on) mpStop();
  const abc = begAbc(src);
  MP.src = src;
  const el = mpScoreEl();
  let built = null;
  if (abc && el && window.ABCJS) {
    try { const vo = begRender(el, abc); vo.setUpAudio(); built = mpBuild(vo, hand); } catch (e) { built = null; }
  }
  if (!built || !built.steps.length) {
    MP.src = null;
    toast(abc && el && window.ABCJS ? "Tego ćwiczenia nie da się sprawdzić z pianinem" : "Nuty jeszcze się nie wczytały – spróbuj za chwilę");
    mpBars(); return;
  }
  stopQueue();
  Object.assign(MP, {on: true, src, mode, hand, nv: built.nv, steps: built.steps, beats: built.beats, den: built.den, i: 0, wrong: 0, cls: "", res: null,
    extra: 0, lastOff: null, base: abcParse(abc).bpm});
  if (mode === "wait") { MP.stage = "run"; MP.msg = "Zagraj niebieską nutę. Tempo dowolne – nuty czekają na Ciebie."; }
  else { MP.stage = "setup"; MP.msg = ""; }
  if (!wake) keepAwake();
  mpBars(); mpPaintScore(); mpFollow();
}
function mpStop() {
  if (!MP.on) return;
  clearInterval(MP.timer); MP.timer = null;
  MP.on = false;
  mpClear(mpScoreEl());
  MP.src = null; MP.steps = []; MP.stage = null; MP.mode = null;
  if (timerState.i === null && !metro.on) releaseAwake();
  mpBars();
}
// po każdym przerysowaniu widoku: nowe paski i nowe nuty; gdy ćwiczenia nie ma już na ekranie – koniec
function mpAfter() {
  if (MP.on && (!isBeg() || !mpHostEl() || !mpScoreEl())) mpStop();
  mpBars();
  if (MP.on) mpPaintScore();
}

/* ============================== PANEL SESJI ============================== */
function mpHandsHtml() {
  return MP.nv > 1 ? `<div><div class="seg" role="group" aria-label="Która ręka">${[["all", "Obie ręce"], ["0", "Prawa"], ["1", "Lewa"]].map(([h, lbl]) =>
    `<button data-act="mp-hand" data-h="${h}" aria-pressed="${h === (MP.hand === null ? "all" : String(MP.hand))}">${lbl}</button>`).join("")}</div></div>` : "";
}
function mpTempos() { const b = MP.base || 80, ev = (x) => Math.max(40, Math.round(x / 2) * 2); return [["Wolno", ev(b * 0.6)], ["Średnio", ev(b * 0.8)], ["W tempie", b]]; }
const MP_LEGEND = `<p class="plegend"><span><i class="ok"></i>dobrze</span><span><i class="warn"></i>rytm lub długość</span><span><i class="fix"></i>pominięta</span></p>`;
function mpSessionHtml() {
  const head = (name) => `<div class="pbar-head">${MP_ICON}<b>${name}</b><span class="grow"></span><span class="mono" data-mp-prog></span></div>`;
  const bar = `<div class="bar pprog" aria-hidden="true"><span data-mp-bar style="width:0%"></span></div>`;
  if (MP.mode === "wait") {
    if (MP.stage === "done") {
      const r = MP.res;
      return `${head("Nuty czekają")}
        <div class="minis two"><div class="mini"><div class="small muted">Za pierwszym razem</div><div class="v">${r.first}/${r.n}</div></div><div class="mini"><div class="small muted">Wynik</div><div class="v">${r.p}%</div></div></div>
        <p class="mp-msg ${r.p === 100 ? "ok" : ""}">${r.p === 100 ? "Bezbłędnie! Spróbuj teraz z metronomem." : "Czerwone nuty wymagały poprawki – poćwicz te miejsca."}</p>
        ${r.goal || ""}
        <div class="row"><button class="btn sm primary" data-act="mp-restart">Jeszcze raz</button><button class="btn sm" data-act="mp-mode" data-mode="tempo">Z metronomem</button><button class="btn sm ghost" data-act="mp-stop">Zakończ</button></div>`;
    }
    return `${head("Nuty czekają")}${bar}${mpHandsHtml()}
      <p class="mp-msg" data-mp-msg></p>
      <div class="row"><button class="btn sm" data-act="mp-restart">Od początku</button><button class="btn sm ghost" data-act="mp-stop">Zakończ</button></div>`;
  }
  if (MP.stage === "setup") {
    return `${head("Z metronomem")}${mpHandsHtml()}
      <div class="stack" style="gap:4px"><span class="small muted">Tempo</span>
        <div class="seg ptempo" role="group" aria-label="Tempo">${mpTempos().map(([lbl, bpm], k) => `<button data-act="mp-tempo" data-k="${k}" aria-pressed="${k === MP.tempoIdx}">${lbl}<small>♩ = ${bpm}</small></button>`).join("")}</div></div>
      <p class="small muted" style="margin:0">${MP.msg ? `<b>${MP.msg}</b> ` : ""}Najpierw usłyszysz takt odliczania. Potem graj równo z metronomem – nuty nie czekają.</p>
      <div class="row"><button class="btn primary" data-act="mp-go">Start</button><button class="btn sm ghost" data-act="mp-stop">Zakończ</button></div>`;
  }
  if (MP.stage === "done") {
    const r = MP.res;
    return `${head("Z metronomem")}
      <div class="minis"><div class="mini"><div class="small muted">Nuty</div><div class="v">${r.hit}/${r.n}</div></div><div class="mini"><div class="small muted">Rytm</div><div class="v">${r.rhythm}%</div></div><div class="mini"><div class="small muted">Długość</div><div class="v">${r.len}%</div></div></div>
      <p class="mp-msg ${r.all === 100 ? "ok" : ""}">${r.text}</p>
      ${r.goal || ""}
      ${MP_LEGEND}
      <div class="row"><button class="btn sm primary" data-act="mp-go">Jeszcze raz</button><button class="btn sm" data-act="mp-setup">Zmień tempo</button><button class="btn sm ghost" data-act="mp-stop">Zakończ</button></div>`;
  }
  const z = Math.round(MP.tol / MP.matchW * 50);
  return `${head("Z metronomem · ♩ = " + MP.bpm)}${bar}
    <div class="pbeat"><span class="pcount" data-mp-count></span><div class="dots" data-mp-dots>${Array.from({length: MP.beats}, (x, k) => `<i class="${k ? "" : "g"}"></i>`).join("")}</div></div>
    <div><div class="ptime" style="--z:${z}%"><i data-mp-dot hidden></i></div><div class="ptime-l" aria-hidden="true"><span>za wcześnie</span><span>równo</span><span>za późno</span></div></div>
    <p class="mp-msg one" data-mp-msg></p>
    <div class="row"><button class="btn sm" data-act="mp-setup">Stop</button></div>`;
}
// lekkie odświeżenie panelu (bez przebudowy): postęp, komunikat, wskaźnik rytmu
function mpPanelUpdate() {
  const host = mpHostEl(); if (!host || !MP.on) return;
  const n = MP.steps.length, done = MP.stage === "done";
  const prog = host.querySelector("[data-mp-prog]");
  if (prog) prog.textContent = MP.stage === "setup" || done ? "" : Math.min(MP.i + 1, n) + " / " + n;
  const bar = host.querySelector("[data-mp-bar]"); if (bar) bar.style.width = Math.round((done ? n : MP.i) / n * 100) + "%";
  const msg = host.querySelector("[data-mp-msg]"); if (msg) { msg.textContent = MP.msg; msg.classList.toggle("ok", MP.cls === "ok"); msg.classList.toggle("bad", MP.cls === "bad"); }
  const dot = host.querySelector("[data-mp-dot]");
  if (dot) { dot.hidden = MP.lastOff === null; if (MP.lastOff !== null) { dot.style.left = (50 + Math.max(-1, Math.min(1, MP.lastOff / MP.matchW)) * 50) + "%"; dot.classList.toggle("off", Math.abs(MP.lastOff) > MP.tol); } }
}

/* ============================== TRYB „NUTY CZEKAJĄ” ============================== */
const mpNames = (notes) => [...notes].sort((a, b) => a - b).map(m => MIDI_NAMES[m % 12]).join(" i ");
function mpWaitNote(ev) {
  if (ev.type !== "on") return;
  const st = MP.steps[MP.i]; if (!st) return;
  if (st.pitches.has(ev.midi)) {
    st.hit.add(ev.midi);
    const held = new Set(midiHeldNotes());
    if ([...st.pitches].every(n => st.hit.has(n) && held.has(n))) {
      MP.i++; MP.msg = "✓ Dobrze"; MP.cls = "ok";
      if (MP.i >= MP.steps.length) { mpWaitFinish(); return; }
      mpPaintScore(); mpPanelUpdate(); mpFollow(); return;
    }
    MP.msg = "Dobrze – dołóż pozostałe dźwięki i trzymaj je razem."; MP.cls = "";
  } else {
    st.err++; MP.wrong++;
    const near = [...st.pitches].reduce((a, b) => Math.abs(b - ev.midi) < Math.abs(a - ev.midi) ? b : a);
    const dir = ev.midi < near ? "wyżej" : "niżej", name = MIDI_NAMES[ev.midi % 12];
    const octave = [...st.pitches].some(n => (n - ev.midi) % 12 === 0);
    MP.msg = (octave ? `✗ Dobry dźwięk (${name}), ale w innej oktawie – szukaj ${dir}.` : `✗ To było ${name} – szukaj ${dir}.`)
      + (st.err >= 3 ? ` Podpowiedź: ${st.pitches.size > 1 ? "szukane dźwięki to" : "szukany dźwięk to"} ${mpNames(st.pitches)}.` : "");
    MP.cls = "bad";
  }
  mpPaintScore(); mpPanelUpdate();
}
function mpWaitFinish() {
  const n = MP.steps.length, first = MP.steps.filter(s => !s.err).length, p = Math.round(first / n * 100);
  MP.stage = "done"; MP.res = {n, first, p};
  if (MP.hand === null) {            // wynik zapisujemy tylko dla całości (obie ręce)
    const B = begS(); if (!B.play) B.play = {};
    const r = B.play[MP.src] || {};
    r.best = Math.max(r.best || 0, p); r.n = (r.n || 0) + 1; r.d = todayKey(); B.play[MP.src] = r; save();
  }
  MP.res.goal = mpGoalAfter(MP.res);
  mpBars(); mpPaintScore();
  announce(`Koniec. Za pierwszym razem ${first} z ${n}.`);
}

/* ============================== TRYB „Z METRONOMEM” ============================== */
// chwila (performance.now), w której dźwięk zaplanowany na czas `at` zegara audio wyjdzie z głośnika
function mpPerfAt(c, at) {
  let ts = null; try { ts = c.getOutputTimestamp ? c.getOutputTimestamp() : null; } catch (e) {}
  if (ts && ts.contextTime > 0 && ts.performanceTime > 0) return ts.performanceTime + (at - ts.contextTime) * 1000;
  return performance.now() + (at - c.currentTime) * 1000 + (c.outputLatency || c.baseLatency || 0) * 1000;
}
function mpTempoGo() {
  if (!MP.on || MP.mode !== "tempo") return;
  clearInterval(MP.timer);
  if (metro.on) metroStop();
  stopQueue();
  const c = ac();
  MP.bpm = mpTempos()[MP.tempoIdx][1];
  MP.beatMs = 60000 / MP.bpm;
  const perWhole = MP.beatMs * MP.den;                                   // ms na całą nutę; miara metronomu = 1/den
  MP.tol = Math.max(90, Math.min(180, MP.beatMs / 6));                   // „równo”: około jednej szóstej miary w każdą stronę
  MP.matchW = Math.max(MP.tol + 60, Math.min(450, MP.beatMs / 2));       // dalej niż tyle od nuty = pominięta albo dodatkowy dźwięk
  MP.endT = 0;
  for (const st of MP.steps) { st.T = st.w * perWhole; for (const n of st.notes) { n.D = n.d * perWhole; delete n.s; delete n.len; delete n.on; delete n.off; delete n.rel; MP.endT = Math.max(MP.endT, st.T + n.D); } }
  for (const st of MP.steps) for (const n of st.notes) n.last = st.T + n.D >= MP.endT - 1;     // nuty kończące utwór można trzymać dłużej
  MP.a0 = c.currentTime + 0.3;
  MP.c0 = mpPerfAt(c, MP.a0) + mpLat();
  MP.t0 = MP.c0 + MP.beats * MP.beatMs;
  MP.clickK = 0; MP.clickN = MP.beats + Math.max(1, Math.ceil(MP.endT / MP.beatMs - 1e-6));
  Object.assign(MP, {stage: "count", i: 0, mi: 0, beat: -1, extra: 0, lastOff: null, msg: "Odliczanie…", cls: "", res: null});
  if (!wake) keepAwake();
  mpBars(); mpPaintScore(); mpFollow();
  MP.timer = setInterval(mpTick, 25); mpTick();
}
function mpTick() {
  if (!MP.on || MP.mode !== "tempo" || (MP.stage !== "count" && MP.stage !== "run")) { clearInterval(MP.timer); MP.timer = null; return; }
  const c = ac(), beatSec = MP.beatMs / 1000;
  while (MP.clickK < MP.clickN && MP.a0 + MP.clickK * beatSec < c.currentTime + 0.25) { click(MP.a0 + MP.clickK * beatSec, MP.clickK % MP.beats === 0 ? 2 : 0); MP.clickK++; }
  const now = performance.now(), rel = now - MP.t0, beat = Math.floor((now - MP.c0) / MP.beatMs);
  if (beat !== MP.beat && beat >= 0) {
    MP.beat = beat;
    const host = mpHostEl();
    if (host) {
      const cnt = host.querySelector("[data-mp-count]"); if (cnt) cnt.textContent = beat < MP.beats ? String(beat + 1) : "";
      host.querySelectorAll("[data-mp-dots] i").forEach((d, k) => d.classList.toggle("on", k === beat % MP.beats));
    }
  }
  if (MP.stage === "count" && rel >= -40) { MP.stage = "run"; MP.msg = "Graj!"; mpPanelUpdate(); }
  if (MP.stage !== "run") return;
  let ci = MP.i, changed = false;
  while (ci + 1 < MP.steps.length && MP.steps[ci + 1].T <= rel + 40) ci++;
  while (MP.mi < MP.steps.length && rel > MP.steps[MP.mi].T + MP.matchW) { for (const n of MP.steps[MP.mi].notes) if (!n.s) { n.s = "miss"; changed = true; } MP.mi++; }
  if (ci !== MP.i || changed) { MP.i = ci; mpPaintScore(); mpPanelUpdate(); mpFollow(); }
  if (rel > MP.endT + MP.beatMs) mpTempoFinish();
}
function mpLenJudge(n, endRel) {
  const played = (n.rel === undefined ? endRel : n.rel) - n.on;
  if (n.rel !== undefined && played < n.D * 0.5) return "short";
  if (!n.last && played > n.D + MP.beatMs * 0.5) return "long";
  return null;
}
function mpTempoNote(ev) {
  if (MP.stage !== "count" && MP.stage !== "run") return;
  const rel = ev.t - MP.t0;
  if (ev.type === "on") {
    // ten sam klawisz uderzony ponownie bez zgłoszonego puszczenia: poprzednia nuta kończy się teraz
    for (const st of MP.steps) for (const n of st.notes) if (n.p === ev.midi && n.on !== undefined && n.rel === undefined) { n.rel = rel; n.len = mpLenJudge(n, rel); }
    let best = null, bd = 0;
    for (const st of MP.steps) {
      const d = rel - st.T;
      if (d < -MP.matchW) break;
      if (d > MP.matchW) continue;
      for (const n of st.notes) if (n.p === ev.midi && !n.s && (!best || Math.abs(d) < Math.abs(bd))) { best = n; bd = d; }
    }
    if (best) {
      best.on = rel; best.off = bd; best.s = Math.abs(bd) <= MP.tol ? "ok" : bd < 0 ? "early" : "late";
      MP.lastOff = bd; MP.msg = best.s === "ok" ? "✓ równo" : best.s === "early" ? "za wcześnie" : "za późno"; MP.cls = best.s === "ok" ? "ok" : "";
    } else if (rel > -MP.matchW) { MP.extra++; MP.msg = "✗ dodatkowy dźwięk: " + MIDI_NAMES[ev.midi % 12]; MP.cls = "bad"; }
    else return;
    mpPaintScore(); mpPanelUpdate();
  } else {
    let cand = null;
    for (const st of MP.steps) for (const n of st.notes) if (n.p === ev.midi && n.on !== undefined && n.rel === undefined) cand = n;
    if (!cand) return;
    cand.rel = rel; cand.len = mpLenJudge(cand, rel);
    if (cand.len) { MP.msg = cand.len === "short" ? "za krótko – trzymaj nutę do końca" : "za długo – puść klawisz"; MP.cls = ""; mpPaintScore(); mpPanelUpdate(); }
  }
}
function mpTempoFinish() {
  clearInterval(MP.timer); MP.timer = null;
  const endRel = performance.now() - MP.t0, all = MP.steps.flatMap(st => st.notes), hit = all.filter(n => n.on !== undefined);
  for (const n of all) if (!n.s) n.s = "miss";
  // stałe przesunięcie całego wykonania (opóźnienie głośnika, nawyk) nie jest błędem rytmu: odejmujemy medianę
  let shift = 0;
  if (hit.length >= 6) { const o = hit.map(n => n.off).sort((a, b) => a - b); shift = Math.max(-250, Math.min(250, o[Math.floor(o.length / 2)])); }
  for (const n of hit) { n.off -= shift; n.s = Math.abs(n.off) <= MP.tol ? "ok" : n.off < 0 ? "early" : "late"; if (n.rel === undefined) n.len = mpLenJudge(n, endRel); }
  if (hit.length >= 6) mpSetLat(mpLat() + shift * 0.7);
  const n = all.length, rOk = hit.filter(x => x.s === "ok").length, lOk = hit.filter(x => !x.len).length, perfect = hit.filter(x => x.s === "ok" && !x.len).length;
  const early = hit.filter(x => x.s === "early").length, late = hit.filter(x => x.s === "late").length, short = hit.filter(x => x.len === "short").length, long = hit.filter(x => x.len === "long").length;
  const bars = [...new Set(all.filter(x => x.s !== "ok" || x.len).map(x => x.bar).filter(Boolean))].sort((a, b) => a - b);
  const res = {n, hit: hit.length, rhythm: hit.length ? Math.round(rOk / hit.length * 100) : 0, len: hit.length ? Math.round(lOk / hit.length * 100) : 0, all: Math.round(perfect / n * 100), extra: MP.extra};
  const tips = [];
  if (!hit.length) tips.push("Nie usłyszałem żadnej nuty z tego ćwiczenia. Zacznij razem z pierwszą miarą po odliczaniu.");
  else if (res.all === 100 && !MP.extra) tips.push(MP.tempoIdx < 2 ? "Bezbłędnie! Spróbuj w szybszym tempie." : "Bezbłędnie, w pełnym tempie!");
  else {
    if (n - hit.length) tips.push(`Pominięte nuty: ${n - hit.length}.`);
    if (MP.extra) tips.push(`Dodatkowe dźwięki: ${MP.extra}.`);
    if (early + late) tips.push(early > late * 2 ? "Często grasz za wcześnie – poczekaj na klik." : late > early * 2 ? "Często grasz za późno – przygotuj palec wcześniej." : "Rytm się chwieje – licz na głos razem z metronomem.");
    if (short + long) tips.push(short >= long ? "Niektóre nuty puszczasz za wcześnie – trzymaj je przez pełną wartość." : "Niektóre nuty trzymasz za długo.");
    if (bars.length) tips.push(`Do powtórki: ${bars.length === 1 ? "takt" : "takty"} ${bars.slice(0, 8).join(", ")}${bars.length > 8 ? "…" : ""}.`);
    if (n - hit.length > n / 3 && MP.tempoIdx > 0) tips.push("Wybierz wolniejsze tempo.");
  }
  res.text = tips.join(" ");
  MP.stage = "done"; MP.res = res; MP.msg = "";
  if (MP.hand === null) {
    const B = begS(); if (!B.play) B.play = {};
    const r = B.play[MP.src] || {};
    if (r.tb === undefined || res.all > r.tb || (res.all === r.tb && MP.bpm > r.tbpm)) { r.tb = res.all; r.tbpm = MP.bpm; }
    r.d = todayKey(); B.play[MP.src] = r; save();
  }
  res.goal = mpGoalAfter(res);
  mpBars(); mpPaintScore();
  announce(`Koniec. Nuty ${res.hit} z ${res.n}, rytm ${res.rhythm} procent, długość ${res.len} procent.`);
}
function mpTempoSetup(msg) {
  if (!MP.on || MP.mode !== "tempo") return;
  clearInterval(MP.timer); MP.timer = null;
  for (const st of MP.steps) for (const n of st.notes) { delete n.s; delete n.len; delete n.on; delete n.off; delete n.rel; }
  Object.assign(MP, {stage: "setup", i: 0, msg: msg || "", cls: "", res: null, lastOff: null});
  mpBars(); mpPaintScore();
}

/* ============================== ZDARZENIA ============================== */
midiListen((ev) => {
  mpLivePaint();
  if (MP.on) { if (MP.mode === "wait") { if (MP.stage === "run") mpWaitNote(ev); } else mpTempoNote(ev); }
  else if (ev.type === "on" && isBeg() && !mpHidden() && Q.cur && Q.cur.open) clapTap();   // rytm można wystukać na klawiszu pianina
});
document.addEventListener("click", (e) => {
  const t = e.target.closest && e.target.closest("[data-act]"); if (!t) return;
  switch (t.dataset.act) {
    case "mp-start": mpStart(t.dataset.src, t.dataset.mode, null); mpShow(); break;
    case "mp-restart": if (MP.on) mpStart(MP.src, MP.mode, MP.hand); break;
    case "mp-mode": if (MP.on) mpStart(MP.src, t.dataset.mode, MP.hand); break;
    case "mp-hand": if (MP.on) mpStart(MP.src, MP.mode, t.dataset.h === "all" ? null : +t.dataset.h); break;
    case "mp-tempo": MP.tempoIdx = +t.dataset.k; mpBars(); break;
    case "mp-go": ac(); mpTempoGo(); mpShow(); break;
    case "mp-setup": mpTempoSetup(); break;
    case "mp-stop": mpStop(); break;
    case "mp-hide": mpStop(); mpSetHidden(true); mpBars(); mpCardExtra(); mpStagesRefresh();
      toast("Opcja pianina ukryta. Włączysz ją w Narzędziach → Pianino przez USB.", {label: "Cofnij", fn: () => { mpSetHidden(false); mpBars(); mpCardExtra(); mpStagesRefresh(); }}); break;
    case "mp-show": mpSetHidden(t.dataset.v !== "1"); if (mpHidden()) mpStop(); mpBars(); mpCardExtra(); mpStagesRefresh(); break;
  }
});
// w tle zegar i metronom stają – przerywamy przejście z metronomem
document.addEventListener("visibilitychange", () => { if (document.hidden && MP.on && MP.mode === "tempo" && (MP.stage === "count" || MP.stage === "run")) mpTempoSetup("Przerwano."); });

/* ============================== CEL: UTWÓR OPANOWANY ==============================
   Gdy opcja pianina jest włączona na urządzeniu, etap „opanowany” utworu z kursu przyznaje aplikacja, a nie przycisk:
   - „Nuty czekają”, cały utwór, min. 90% za pierwszym razem → co najmniej etap 2 (razem wolno),
   - „Z metronomem” wolniej, min. 90% za nuty, rytm i długość → co najmniej etap 3 (w tempie),
   - to samo w pełnym tempie → etap 4 (opanowany).
   Etap nigdy nie spada sam. Bez pianina (opcja ukryta albo przeglądarka bez MIDI) etapy ustawia się ręcznie jak dotąd. */
const MP_GOAL = 90;
const mpGoalOn = () => MIDI.supported && !mpHidden() && isBeg();
const mpPieceOf = (src) => src && src.startsWith("piece:") ? BEG_PIECES.find(p => p.id === src.slice(6)) || null : null;
function mpStageBody(p) {
  if (!mpGoalOn()) return stageHtml(p);
  const s = st(p.id), r = mpRec("piece:" + p.id);
  const best = r && r.tb !== undefined ? ` Najlepszy wynik z metronomem: ${r.tb}% przy ♩ = ${r.tbpm}.` : "";
  return `<div class="stack" style="gap:8px">
    <div class="ladder stage t-music" role="img" aria-label="Etap: ${STATUS[s]}">${STAGE_KEY.map((n, i) => `<span class="${i + 1 < s ? "on" : i + 1 === s ? "cur" : ""}">${n}</span>`).join("")}</div>
    <div class="row">${s < 3 ? `<button class="btn sm primary" data-act="status" data-id="${p.id}" data-s="${s + 1}">${s === 0 ? "Zaczynam: rozczytuję" : "Dalej: " + STATUS[s + 1]}</button>` : s === 4 ? `<span class="pill own">opanowany</span>` : ""}
    <label class="small muted row" style="gap:6px">zmień etap <select data-act="setstage" data-id="${p.id}" aria-label="Etap nauki: ${esc(p.name)}">${STATUS.map((n, i) => `<option value="${i}" ${i === s ? "selected" : ""} ${i === 4 && s !== 4 ? "disabled" : ""}>${n}</option>`).join("")}</select></label></div>
    ${s === 4 ? "" : `<p class="pgoal"><b>Cel: opanowany.</b> Zagraj cały utwór z pianinem w trybie „Z metronomem”, w pełnym tempie, i zdobądź co najmniej ${MP_GOAL}% za nuty, rytm i długość. Wtedy aplikacja sama zaliczy utwór.${best}</p>`}</div>`;
}
function mpStagesRefresh() {
  document.querySelectorAll("#view [data-stage]").forEach(el => { const p = BEG_PIECES.find(x => x.id === el.dataset.stage); if (p) el.innerHTML = mpStageBody(p); });
}
// podnosi etap utworu (nigdy nie obniża); bez przerysowania widoku, żeby panel z wynikiem został na ekranie
function mpRaiseStage(p, s) {
  const prev = st(p.id); if (prev >= s) return false;
  const B = begS(), prevPiece = B.piece;
  S.pieces[p.id] = {s};
  if (s < 4) B.piece = p.id; else if (B.piece === p.id) B.piece = null;
  save(); mpStagesRefresh(); header();
  toast(s === 4 ? "Opanowany! " + p.name + " wraca w powtórkach." : p.name + ": " + STATUS[s],
    {label: "Cofnij", fn: () => { if (prev) S.pieces[p.id] = {s: prev}; else delete S.pieces[p.id]; begS().piece = prevPiece; save(); render(); toast("Cofnięto"); }});
  return true;
}
// po przejściu całego utworu: czy cel osiągnięty i co jeszcze brakuje (tekst trafia do panelu z wynikiem)
function mpGoalAfter(res) {
  const p = mpPieceOf(MP.src); if (!p || !mpGoalOn()) return "";
  if (MP.hand !== null) return `<p class="pgoal">Wynik jednej ręki nie liczy się do zaliczenia utworu – zagraj obiema rękami.</p>`;
  if (MP.mode === "wait") {
    if (res.p < MP_GOAL) return `<p class="pgoal"><b>Cel: ${MP_GOAL}%</b> nut za pierwszym razem. Teraz ${res.p}%.</p>`;
    mpRaiseStage(p, 2);
    return `<p class="pgoal ok">✓ Nuty opanowane (${res.p}%). Kolejny krok: tryb „Z metronomem”.</p>`;
  }
  const notes = Math.round(res.hit / res.n * 100), miss = [];
  if (notes < MP_GOAL) miss.push(`nuty ${notes}%`);
  if (res.rhythm < MP_GOAL) miss.push(`rytm ${res.rhythm}%`);
  if (res.len < MP_GOAL) miss.push(`długość ${res.len}%`);
  if (res.extra > Math.floor(res.n * 0.1)) miss.push(`dodatkowe dźwięki: ${res.extra}`);
  if (miss.length) return `<p class="pgoal"><b>Cel: ${MP_GOAL}% w każdej kategorii.</b> Do poprawy: ${miss.join(", ")}.</p>`;
  if (MP.tempoIdx < 2) {
    mpRaiseStage(p, 3);
    return `<p class="pgoal ok">✓ ${MP_GOAL}% w każdej kategorii. Żeby utwór był opanowany, zagraj tak samo w pełnym tempie (♩ = ${mpTempos()[2][1]}).</p>`;
  }
  mpRaiseStage(p, 4);
  return `<p class="pgoal ok">✓ Cel osiągnięty: co najmniej ${MP_GOAL}% w każdej kategorii, w pełnym tempie. Utwór opanowany!</p>`;
}

/* przełącznik w karcie „Pianino przez USB” (Narzędzia): pokazuj albo ukryj opcję pianina w kursie */
function mpCardExtraHtml() {
  if (!MIDI.supported || !isBeg()) return "";
  const h = mpHidden();
  return `<div class="spread" style="border-top:1px solid var(--line);padding-top:10px"><span class="small">Opcja pianina przy ćwiczeniach i utworach</span>
    <div class="seg" role="group" aria-label="Opcja pianina w kursie"><button data-act="mp-show" data-v="1" aria-pressed="${!h}">Pokazuj</button><button data-act="mp-show" data-v="0" aria-pressed="${h}">Ukryj</button></div></div>`;
}
function mpCardExtra() { const el = document.getElementById("midi-extra"); if (el) el.innerHTML = mpCardExtraHtml(); }
