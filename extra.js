"use strict";
/* Moduły dodatkowe: generator czytania a vista, dziennik i trener tempa, słuch w stylu RCM,
   zakładka Nauka (lekcje teorii, kurs pedału) i próbny egzamin. Korzysta ze stanu S i funkcji z index.html. */

/* ============================== NUTY I TONACJE ============================== */
const LETTERS = "CDEFGAB", NAT = [0, 2, 4, 5, 7, 9, 11];
const SHARP_ORDER = "FCGDAEB", FLAT_ORDER = "BEADGCF";
const SR_KEYS = {
  "C": {pl: "C-dur", sig: 0}, "G": {pl: "G-dur", sig: 1}, "D": {pl: "D-dur", sig: 2}, "A": {pl: "A-dur", sig: 3}, "E": {pl: "E-dur", sig: 4},
  "F": {pl: "F-dur", sig: -1}, "Bb": {pl: "B-dur", sig: -2}, "Eb": {pl: "Es-dur", sig: -3}, "Ab": {pl: "As-dur", sig: -4},
  "Am": {pl: "a-moll", sig: 0, minor: true}, "Em": {pl: "e-moll", sig: 1, minor: true}, "Bm": {pl: "h-moll", sig: 2, minor: true},
  "F#m": {pl: "fis-moll", sig: 3, minor: true}, "Dm": {pl: "d-moll", sig: -1, minor: true}, "Gm": {pl: "g-moll", sig: -2, minor: true},
  "Cm": {pl: "c-moll", sig: -3, minor: true}, "C#m": {pl: "cis-moll", sig: 4, minor: true}, "Fm": {pl: "f-moll", sig: -4, minor: true}
};
const PC_NAMES = ["C", "Cis", "D", "Dis", "E", "F", "Fis", "G", "Gis", "A", "B", "H"];
const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
function weighted(items) { // [[value, weight], ...]
  const tot = items.reduce((a, x) => a + x[1], 0); let r = Math.random() * tot;
  for (const x of items) { r -= x[1]; if (r <= 0) return x[0]; }
  return items[items.length - 1][0];
}
function sigAlter(sig, li) {
  const L = LETTERS[li];
  if (sig > 0 && SHARP_ORDER.slice(0, sig).includes(L)) return 1;
  if (sig < 0 && FLAT_ORDER.slice(0, -sig).includes(L)) return -1;
  return 0;
}
const mod7 = (d) => ((d % 7) + 7) % 7;

/* ============================== GENERATOR CZYTANIA A VISTA ============================== */
const CELLS = {q: [4], h: [8], dh: [12], w: [16], ee: [2, 2], dqe: [6, 2], ssss: [1, 1, 1, 1], ess: [2, 1, 1], des: [3, 1]};
const CELL_W = {q: 5, h: 2, dh: 1, w: 1, ee: 3, dqe: 2, ssss: 1, ess: 1, des: 1};
const CELLS_68 = {dq: [6], qe: [4, 2], eee: [2, 2, 2], dhh: [12]};
const CELL_W_68 = {dq: 3, qe: 3, eee: 3, dhh: 1};
const SRG = {
  1: {keys: ["C", "G"], times: ["4/4", "3/4"], cells: ["q", "h", "dh", "w"], bars: 4, rh: [0, 4], lh: "whole", bpm: 60},
  2: {keys: ["C", "G", "F"], times: ["4/4", "3/4", "2/4"], cells: ["q", "h", "dh", "w", "ee"], bars: 4, rh: [0, 5], lh: "half", bpm: 66},
  3: {keys: ["C", "G", "F", "D", "Am", "Dm"], times: ["4/4", "3/4", "2/4"], cells: ["q", "h", "dh", "ee", "dqe"], bars: 8, rh: [-1, 7], lh: "broken", bpm: 72, rest: true},
  4: {keys: ["C", "G", "F", "D", "Bb", "Am", "Em", "Dm"], times: ["4/4", "3/4", "6/8"], cells: ["q", "h", "ee", "dqe"], bars: 8, rh: [-2, 8], lh: "block", bpm: 76, rest: true},
  5: {keys: ["C", "G", "D", "A", "F", "Bb", "Eb", "Am", "Em", "Dm", "Gm"], times: ["4/4", "3/4", "6/8", "2/4"], cells: ["q", "h", "ee", "dqe", "ssss", "ess"], bars: 8, rh: [-2, 9], lh: "alberti", bpm: 80, rest: true},
  6: {keys: ["C", "G", "D", "A", "E", "F", "Bb", "Eb", "Ab", "Am", "Em", "Bm", "Dm", "Gm", "Cm"], times: ["4/4", "3/4", "6/8", "2/4"], cells: ["q", "h", "ee", "dqe", "ssss", "ess"], bars: 8, rh: [-3, 10], lh: "mix", bpm: 88, rest: true},
  7: {keys: Object.keys(SR_KEYS), times: ["4/4", "3/4", "6/8", "2/4"], cells: ["q", "h", "ee", "dqe", "ssss", "ess", "des"], bars: 8, rh: [-3, 11], lh: "mix", bpm: 96, rest: true},
  8: {keys: Object.keys(SR_KEYS), times: ["4/4", "3/4", "6/8", "2/4"], cells: ["q", "ee", "dqe", "ssss", "ess", "des"], bars: 8, rh: [-4, 11], lh: "mix", bpm: 104, rest: true}
};
function meterInfo(time) {
  const [n, d] = time.split("/").map(Number);
  if (d === 8) return {barLen: n * 2, beat: 6, beats: n / 3, compound: true};
  return {barLen: n * 4, beat: 4, beats: n, compound: false};
}
function fillBar(level, mi, last) {
  if (last) return [mi.barLen];
  const pool = mi.compound ? Object.keys(CELLS_68).filter(c => c !== "dhh" || level < 4).map(c => [c, CELL_W_68[c]])
                           : SRG[level].cells.map(c => [c, CELL_W[c]]);
  const table = mi.compound ? CELLS_68 : CELLS;
  const out = []; let rem = mi.barLen, guard = 0;
  while (rem > 0 && guard++ < 50) {
    const ok = pool.filter(([c]) => table[c].reduce((a, b) => a + b, 0) <= rem);
    const c = weighted(ok.length ? ok : [[mi.compound ? "eee" : "q", 1]]);
    out.push(...table[c]); rem -= table[c].reduce((a, b) => a + b, 0);
  }
  return out;
}
const PROG4 = [["I", "IV", "V", "I"], ["I", "I", "V", "I"], ["I", "V", "V", "I"], ["I", "IV", "I", "V", "I"].slice(0, 4)];
const PROG8A = [["I", "IV", "I", "V"], ["I", "V", "I", "V"], ["I", "I", "IV", "V"]];
const PROG8B = [["I", "IV", "V", "I"], ["I", "V", "V", "I"], ["IV", "I", "V", "I"]];
function progression(bars) {
  if (bars <= 4) { const p = pick(PROG4).slice(); p[p.length - 1] = "I"; if (p[2] === "I" && p[1] === "IV") p[2] = "V"; return p; }
  return [...pick(PROG8A), ...pick(PROG8B)];
}

function genSight(level) {
  level = Math.max(1, Math.min(8, level || 1));
  const L = SRG[level];
  let time = pick(L.times);
  const keyName = pick(L.keys), K = SR_KEYS[keyName];
  const mi = meterInfo(time);
  const tonicLi = LETTERS.indexOf(keyName[0]);
  const rhBase = tonicLi + 28;                       // tonika w 4. oktawie
  const lhBase = tonicLi + (tonicLi >= 4 ? 14 : 21);  // tonika w 2. lub 3. oktawie
  const lhHigh = lhBase >= 23;
  const chordRoot = (c) => c === "I" ? 0 : c === "IV" ? (lhHigh ? -4 : 3) : (lhHigh ? -3 : 4);
  const melRoot = (c) => c === "I" ? 0 : c === "IV" ? 3 : 4;
  const prog = progression(L.bars);
  const [lo, hi] = L.rh;
  let prev = pick([0, 2, 4].filter(d => d >= lo && d <= hi));
  const rh = [], lh = [];
  const lhStyle = L.lh === "mix" ? pick(["block", "broken", "alberti"]) : L.lh;

  for (let bi = 0; bi < L.bars; bi++) {
    const last = bi === L.bars - 1, chord = prog[bi];
    const rhythm = fillBar(level, mi, last);
    const bar = []; let pos = 0;
    rhythm.forEach((dur, ni) => {
      let deg;
      const strong = pos === 0 || (!mi.compound && mi.beats === 4 && pos === 8) || (mi.compound && pos === mi.beat);
      if (last) deg = Math.abs(prev - 7) < Math.abs(prev) && hi >= 7 ? 7 : 0;
      else if (bi === L.bars - 2 && ni === rhythm.length - 1) {
        const near = [1, -1, 4, 6, 8, -3].filter(d => d >= lo && d <= hi).sort((a, b) => Math.abs(a - prev) - Math.abs(b - prev));
        deg = near.length ? near[0] : 1;
      }
      else if (strong) {
        const r = melRoot(chord), tones = [];
        for (let d = lo; d <= hi; d++) if ([r, r + 2, r + 4].map(mod7).includes(mod7(d))) tones.push(d);
        tones.sort((a, b) => Math.abs(a - prev) - Math.abs(b - prev));
        deg = tones[Math.random() < 0.7 ? 0 : Math.min(1, tones.length - 1)];
      } else {
        const r = Math.random();
        let step = r < 0.62 ? 1 : r < 0.84 ? 2 : r < 0.92 ? 0 : (level >= 4 ? pick([3, 4]) : 2);
        let dir = prev >= hi - 1 ? -1 : prev <= lo + 1 ? 1 : (Math.random() < 0.5 ? -1 : 1);
        deg = Math.max(lo, Math.min(hi, prev + dir * step));
      }
      const isRest = L.rest && !last && bi > 0 && ni > 0 && dur === 4 && Math.random() < 0.08;
      bar.push(isRest ? {dur, rest: true} : {dur, notes: [deg]});
      if (!isRest) prev = deg;
      pos += dur;
    });
    rh.push(bar);
    lh.push(lhBar(lhStyle, level, mi, last ? "I" : chord, chordRoot, last));
  }
  const bpm = mi.compound ? Math.round(L.bpm * 0.7) : L.bpm;
  const piece = {level, time, keyName, K, mi, rhBase, lhBase, rh, lh, bpm};
  piece.abc = toAbc(piece);
  return piece;
}
function lhBar(style, level, mi, chord, chordRoot, last) {
  const r = chordRoot(chord), B = mi.barLen;
  if (last) return [{dur: B, notes: level <= 3 ? [r] : [r, r + 2, r + 4]}];
  const ev = (dur, notes) => ({dur, notes});
  if (style === "whole") return [ev(B, [r])];
  if (style === "half") {
    if (mi.compound) return [ev(6, [r]), ev(6, [r + 4])];
    if (B === 16) return [ev(8, [r]), ev(8, [r + 4])];
    return [ev(B, [r])];
  }
  if (style === "broken") {
    if (mi.compound) return [ev(4, [r]), ev(2, [r + 4]), ev(4, [r + 2]), ev(2, [r + 4])];
    const seq = [r, r + 4, r + 2, r + 4].slice(0, B / 4);
    return seq.map(d => ev(4, [d]));
  }
  if (style === "block") {
    const tri = [r, r + 2, r + 4];
    if (mi.compound) return [ev(6, tri), ev(6, tri)];
    if (B === 16) return [ev(8, tri), ev(8, tri)];
    if (B === 12) return [ev(4, [r]), ev(4, [r + 2, r + 4]), ev(4, [r + 2, r + 4])];
    return [ev(4, [r]), ev(4, [r + 2, r + 4])];
  }
  // alberti
  const pat = [r, r + 4, r + 2, r + 4];
  const n = B / 2;
  return Array.from({length: n}, (_, i) => ev(2, [pat[i % 4]]));
}
function noteInfo(piece, base, deg) {
  const abs = base + deg, li = mod7(abs), oct = Math.floor(abs / 7);
  const raised = piece.K.minor && mod7(deg) === 6;
  const alter = sigAlter(piece.K.sig, li) + (raised ? 1 : 0);
  return {li, oct, alter, midi: 12 * (oct + 1) + NAT[li] + alter, raised};
}
function abcPitch(n, accState) {
  const key = n.li + "_" + n.oct;
  let acc = "";
  const cur = key in accState ? accState[key] : null;
  if (n.raised && cur !== n.alter) { acc = n.alter === 1 ? "^" : n.alter === 0 ? "=" : "_"; accState[key] = n.alter; }
  let s = LETTERS[n.li];
  if (n.oct >= 5) { s = s.toLowerCase() + "'".repeat(n.oct - 5); } else if (n.oct < 4) { s = s + ",".repeat(4 - n.oct); }
  return acc + s;
}
function voiceAbc(piece, bars, base) {
  return bars.map(bar => {
    const accState = {}; let pos = 0, out = "";
    bar.forEach(e => {
      const d = e.dur === 1 ? "" : String(e.dur);
      let tok;
      if (e.rest) tok = "z" + d;
      else if (e.notes.length === 1) tok = abcPitch(noteInfo(piece, base, e.notes[0]), accState) + d;
      else tok = "[" + e.notes.map(x => abcPitch(noteInfo(piece, base, x), accState)).join("") + "]" + d;
      out += tok; pos += e.dur;
      if (pos % piece.mi.beat === 0) out += " ";
    });
    return out.trim();
  });
}
function toAbc(piece, perLine) {
  perLine = perLine || 4;
  const rh = voiceAbc(piece, piece.rh, piece.rhBase), lh = voiceAbc(piece, piece.lh, piece.lhBase);
  const q = piece.mi.compound ? "3/8" : "1/4";
  let s = `X:1\n%%stretchlast 1\nM:${piece.time}\nL:1/16\nQ:${q}=${piece.bpm}\nK:${piece.keyName}\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n`;
  for (let i = 0; i < rh.length; i += perLine) {
    const end = i + perLine >= rh.length ? " |]" : " |";
    s += "[V:RH] " + rh.slice(i, i + perLine).join(" | ") + end + "\n";
    s += "[V:LH] " + lh.slice(i, i + perLine).join(" | ") + end + "\n";
  }
  return s;
}
function inkColor() { try { return getComputedStyle(document.body).color || "#16181D"; } catch (e) { return "#16181D"; } }
function renderAbcInto(el, abc, opts) {
  if (!el) return;
  if (!window.ABCJS) { el.innerHTML = `<p class="small muted">Nuty wczytają się po połączeniu z internetem.</p>`; return; }
  const staffwidth = Math.max(260, Math.min(700, (el.clientWidth || 340) - 24));
  try { window.ABCJS.renderAbc(el, abc, Object.assign({responsive: "resize", staffwidth, foregroundColor: inkColor(), paddingleft: 0, paddingright: 0, add_classes: true}, opts || {})); }
  catch (e) { el.innerHTML = `<p class="small muted">Nie udało się narysować nut.</p>`; }
}

/* odtwarzanie: kolejka zdarzeń w czasie AudioContext, z możliwością zatrzymania */
const PLAYER = {timer: null, label: null};
function playQueue(items, onEnd) {
  stopQueue();
  const c = ac(), t0 = c.currentTime + 0.12; let i = 0;
  items.sort((a, b) => a.t - b.t);
  PLAYER.timer = setInterval(() => {
    while (i < items.length && t0 + items[i].t < c.currentTime + 0.2) { items[i].fn(t0 + items[i].t); i++; }
    if (i >= items.length) { const endAt = t0 + (items.length ? items[items.length - 1].t : 0) + 0.6; if (c.currentTime > endAt) { stopQueue(); onEnd && onEnd(); } }
  }, 30);
  return t0;
}
function stopQueue() { if (PLAYER.timer) { clearInterval(PLAYER.timer); PLAYER.timer = null; } }
function sightEvents(piece, withNotes, withClicks, countIn) {
  const u = 60 / piece.bpm / (piece.mi.compound ? 6 : 4); // sekundy na szesnastkę
  const items = [], ci = countIn ? piece.mi.barLen : 0;
  const totalUnits = piece.rh.length * piece.mi.barLen;
  if (withClicks) for (let p = 0; p < totalUnits + ci; p += piece.mi.beat) {
    const accent = ((p - ci) % piece.mi.barLen === 0) || (p < ci && p === 0);
    items.push({t: p * u, fn: (t) => click(t, accent)});
  }
  if (withNotes) [[piece.rh, piece.rhBase, 0.2], [piece.lh, piece.lhBase, 0.13]].forEach(([bars, base, vol]) => {
    let p = ci;
    bars.forEach(bar => bar.forEach(e => {
      if (!e.rest) e.notes.forEach(d => { const m = noteInfo(piece, base, d).midi; items.push({t: p * u, fn: (t) => tone(m, t, Math.max(0.25, e.dur * u * 1.1), vol)}); });
      p += e.dur;
    }));
  });
  return items;
}

/* widżet generatora: ten sam w planie dnia, w Narzędziach i na egzaminie */
const SRGEN = {};
function genFor(hostId, level) { SRGEN[hostId] = {piece: genSight(level), level}; return SRGEN[hostId]; }
function mountGen(hostId) {
  const host = document.getElementById(hostId), g = SRGEN[hostId];
  if (!host || !g) return;
  const p = g.piece;
  host.innerHTML = `<div class="stack" style="gap:8px">
    <p class="small"><b>${p.K.pl}</b> · metrum ${p.time} · tempo <span class="mono">${p.mi.compound ? "♩." : "♩"} = ${p.bpm}</span> · poziom ${p.level}</p>
    <div class="abc" id="${hostId}-abc"></div>
    <p class="genstatus" id="${hostId}-status">Najpierw przegląd, potem zagraj raz, bez zatrzymywania. „Odsłuchaj” dopiero po swoim podejściu.</p>
    <div class="genrow">
      <button class="btn primary wide" data-act="sg-play" data-host="${hostId}">Graj z metronomem</button>
      <button class="btn sm" data-act="sg-preview" data-host="${hostId}">Przegląd 30 s</button>
      <button class="btn sm" data-act="sg-listen" data-host="${hostId}">Odsłuchaj</button>
      <button class="btn sm ghost" data-act="sg-stop" data-host="${hostId}">Stop</button>
    </div>
  </div>`;
  const narrow = host.clientWidth < 560;
  renderAbcInto(document.getElementById(hostId + "-abc"), narrow ? toAbc(p, 2) : p.abc);
}
function genStatus(hostId, t, cd) {
  const el = document.getElementById(hostId + "-status"); if (!el) return;
  el.textContent = t;
  if (cd !== undefined) { const b = document.createElement("span"); b.className = "cd"; b.textContent = cd + " s"; el.prepend(b); }
}
let previewTimer = null;
function genPreview(hostId) {
  clearInterval(previewTimer); let left = 30;
  genStatus(hostId, "Tonacja, metrum, rytm, powtórzenia, trudne miejsca.", left);
  previewTimer = setInterval(() => {
    left--;
    if (left <= 0) { clearInterval(previewTimer); genPlay(hostId); return; }
    genStatus(hostId, "Tonacja, metrum, rytm, powtórzenia, trudne miejsca.", left);
  }, 1000);
}
function genPlay(hostId) {
  const g = SRGEN[hostId]; if (!g) return; clearInterval(previewTimer);
  genStatus(hostId, "Takt odliczania, potem graj. Nie zatrzymuj się!");
  playQueue(sightEvents(g.piece, false, true, true), () => genStatus(hostId, "Koniec. Oceń, jak poszło, a potem możesz odsłuchać."));
}
function genListen(hostId) {
  const g = SRGEN[hostId]; if (!g) return; clearInterval(previewTimer);
  genStatus(hostId, "Odtwarzam…");
  playQueue(sightEvents(g.piece, true, false, false), () => genStatus(hostId, "Porównaj ze swoim wykonaniem."));
}

function srInlineHtml(b) {
  const has = !!SRGEN["srgen-inline"];
  if (has && b.gen) setTimeout(() => mountGen("srgen-inline"), 0);
  return `<div class="stack" style="gap:8px">
    <div class="row"><button class="btn sm ${b.gen ? "" : "primary"}" data-act="srgen-inline">${b.gen && has ? "Nowe ćwiczenie" : "Wygeneruj ćwiczenie w aplikacji"}</button>
    <span class="small muted">albo graj z książki</span></div>
    <div id="srgen-inline"></div></div>`;
}
function srGenCardHtml() {
  const lv = (SRGEN["srgen-tools"] && SRGEN["srgen-tools"].level) || S.sr.level;
  return `<div class="card stack" id="srgen-card">
    <div class="spread"><h3>Czytanie a vista – nowe ćwiczenia</h3>
      <select id="srgen-level" aria-label="Poziom">${[1, 2, 3, 4, 5, 6, 7, 8].map(l => `<option value="${l}" ${l === lv ? "selected" : ""}>Poziom ${l}</option>`).join("")}</select></div>
    <p class="small muted">Każde ćwiczenie jest nowe i dopasowane do poziomu. Oceny z Twojego bieżącego poziomu (${S.sr.level}) liczą się do postępu.</p>
    <div><button class="btn primary" data-act="srgen-tools">Nowe ćwiczenie</button></div>
    <div id="srgen-tools"></div>
    <div id="srgen-tools-rate" ${SRGEN["srgen-tools"] ? "" : "hidden"}><span class="small">Jak poszło? (1 = wiele przerw, 5 = płynnie)</span>
      <div class="rate" role="group" aria-label="Ocena czytania a vista">${[1, 2, 3, 4, 5].map(r => `<button data-act="srgenrate" data-r="${r}" aria-label="${r} na 5">${r}</button>`).join("")}</div></div>
  </div>`;
}

/* ============================== DZIENNIK I TRENER TEMPA ============================== */
function tempoTargets(p) { const m = (p.tempo || "").match(/(\d+)\D+(\d+)/); return m ? [+m[1], +m[2]] : null; }
// Last 10 entries, each point labelled with its tempo above and its day (dd.mm) below; older ones in a list.
const dayLbl = (d) => d.slice(8) + "." + d.slice(5, 7);
function spark(log, tg) {
  const shown = log.slice(-10), W = 300, top = 16, plotH = 60, H = top + plotH + 18, vals = shown.map(x => x.bpm);
  let mn = Math.min(...vals, tg ? tg[0] : Infinity) - 4, mx = Math.max(...vals, tg ? tg[0] : -Infinity) + 4;
  if (mx - mn < 10) mx = mn + 10;
  const x = (i) => 16 + i * (W - 32) / Math.max(1, vals.length - 1), y = (v) => top + plotH - (v - mn) * plotH / (mx - mn);
  const pts = vals.map((v, i) => x(i).toFixed(1) + "," + y(v).toFixed(1)).join(" ");
  const desc = shown.map(e => `${dayLbl(e.d)}: ${e.bpm}`).join(", ");
  return `<svg class="spark" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Wykres tempa – ${desc}">
    ${tg ? `<line class="tg" x1="0" x2="${W}" y1="${y(tg[0])}" y2="${y(tg[0])}"/><text class="tgl" x="2" y="${y(tg[0]) - 3}">cel ${tg[0]}</text>` : ""}
    <polyline class="ln" points="${pts}"/>
    ${shown.map((e, i) => `<g><title>${dayLbl(e.d)}: ♩ = ${e.bpm}</title><circle cx="${x(i)}" cy="${y(e.bpm)}" r="${i === shown.length - 1 ? 3.5 : 2.5}"/>
      <text class="v" x="${x(i)}" y="${y(e.bpm) - 6}" text-anchor="middle">${e.bpm}</text>
      <text class="d" x="${x(i)}" y="${H - 4}" text-anchor="middle">${dayLbl(e.d)}</text></g>`).join("")}</svg>
    ${log.length > shown.length ? `<details><summary class="small">Wszystkie wpisy (${log.length})</summary>
      <ul class="tips small" style="margin-top:6px">${log.slice().reverse().map(e => `<li>${dayLbl(e.d)}.${e.d.slice(0, 4)} – ♩ = ${e.bpm}</li>`).join("")}</ul></details>` : ""}`;
}
function tempoLogHtml(p) {
  const log = (S.tempo && S.tempo[p.id]) || [], tg = tempoTargets(p), last = log[log.length - 1];
  const val = last ? last.bpm : (tg ? Math.round(tg[0] * 0.6) : 60);
  return `<div class="box stack" style="gap:6px">
    <div class="spread"><b class="small">Dziennik tempa</b><span class="small muted">${last ? `ostatnio ${last.bpm} (${last.d.slice(5)})` : "brak wpisów"}${tg ? ` · cel ${tg[0]}–${tg[1]}` : ""}</span></div>
    ${log.length > 1 ? spark(log, tg) : ""}
    <div class="row"><label class="small" for="tin-${p.id}">Dziś czysto w tempie</label>
      <input type="number" id="tin-${p.id}" min="20" max="240" step="1" value="${val}">
      <button class="btn sm" data-act="tempo-save" data-id="${p.id}">Zapisz</button>
      <button class="btn sm" data-act="trainer-open" data-id="${p.id}">Trener tempa</button></div>
  </div>`;
}
const TRAINER = {on: false, start: 60, target: 80, step: 2, every: 4, label: ""};
function trainerHtml() {
  return `<details id="trainer" style="width:100%" ${TRAINER.label || TRAINER.on ? "open" : ""}><summary>Trener tempa</summary>
    <div class="stack" style="gap:8px;margin-top:8px">
      <p class="small muted">${TRAINER.label ? `Utwór: ${esc(TRAINER.label)}. ` : ""}Metronom zaczyna od tempa startowego i co kilka taktów przyspiesza, aż dojdzie do docelowego.</p>
      <div class="row"><label class="small">Start <input type="number" id="tr-start" min="30" max="220" value="${TRAINER.start}"></label>
        <label class="small">Cel <input type="number" id="tr-target" min="30" max="240" value="${TRAINER.target}"></label></div>
      <div class="row"><label class="small">co <select id="tr-every">${[2, 4, 8].map(n => `<option ${n === TRAINER.every ? "selected" : ""}>${n}</option>`).join("")}</select> takty</label>
        <label class="small">o <select id="tr-step">${[1, 2, 4].map(n => `<option ${n === TRAINER.step ? "selected" : ""}>${n}</option>`).join("")}</select> uderzeń na minutę</label></div>
      <div><button class="btn primary" data-act="trainer-run">${TRAINER.on && metro.on ? "Zatrzymaj trenera" : "Start trenera"}</button></div>
    </div></details>`;
}
function updateBpmUI() {
  const o = document.getElementById("bpm-out"), r = document.getElementById("bpm");
  if (o) o.textContent = metro.bpm; if (r) r.value = metro.bpm;
}
function onMetroBeat() {
  if (!TRAINER.on || metro.beat % metro.beats !== 0) return;
  const bars = metro.beat / metro.beats;
  if (bars > 0 && bars % TRAINER.every === 0 && metro.bpm < TRAINER.target) {
    metro.bpm = Math.min(TRAINER.target, metro.bpm + TRAINER.step);
    setTimeout(updateBpmUI, 0);
    if (metro.bpm >= TRAINER.target) setTimeout(() => toast("Tempo docelowe: " + metro.bpm), 0);
  }
}
function afterToolsExtra() {
  if (SRGEN["srgen-tools"]) mountGen("srgen-tools");
  if (TRAINER.label) { const m = document.getElementById("metro"); m && m.scrollIntoView({block: "start"}); }
}

/* ============================== SŁUCH W STYLU RCM ============================== */
const EAR_EXTRA = {
  2: {clap: 2, mel: 3, cad: [], keys: ["C", "G", "F"]},
  3: {clap: 2, mel: 3, cad: [], keys: ["C", "G", "F"]},
  4: {clap: 2, mel: 4, cad: [], keys: ["C", "G", "F", "D"]},
  5: {clap: 4, mel: 5, cad: ["doskonała (V–I)", "plagalna (IV–I)"], keys: ["C", "G", "F", "D", "Am"]},
  6: {clap: 4, mel: 5, cad: ["doskonała (V–I)", "plagalna (IV–I)", "półzamknięta (–V)"], keys: ["C", "G", "F", "D", "Bb", "Am", "Dm"]},
  7: {clap: 4, mel: 6, cad: ["doskonała (V–I)", "plagalna (IV–I)", "półzamknięta (–V)", "zwodnicza (V–VI)"], keys: ["C", "G", "F", "D", "Bb", "Am", "Dm", "Em"]},
  8: {clap: 4, mel: 7, cad: ["doskonała (V–I)", "plagalna (IV–I)", "półzamknięta (–V)", "zwodnicza (V–VI)"], keys: ["C", "G", "F", "D", "Bb", "A", "Eb", "Am", "Dm", "Em", "Gm"]}
};
const EAR_MODE_NAMES = {int: "Interwały", chord: "Akordy", clap: "Powtarzanie rytmu", play: "Powtarzanie melodii", cad: "Kadencje"};
const EAR_MODE_HINTS = {
  int: "Odsłuchaj i wybierz interwał.", chord: "Odsłuchaj i wybierz rodzaj akordu.",
  clap: "Posłuchaj rytmu i wystukaj go na dużym przycisku – jak klaskanie na egzaminie.",
  play: "Posłuchaj melodii i odtwórz ją na klawiaturze w aplikacji (albo najpierw na pianinie).",
  cad: "Posłuchaj tonacji i dwóch akordów, potem nazwij kadencję."
};
function earLvl() { return Math.min(8, Math.max(2, Q.level || S.ear.level)); }
function earModes() { const e = EAR_EXTRA[Math.min(8, Math.max(2, S.ear.level))]; return e.cad.length ? ["int", "chord", "clap", "play", "cad"] : ["int", "chord", "clap", "play"]; }
const EXTRA_QUIZ = {};

// powtarzanie rytmu
EXTRA_QUIZ["ear-clap"] = function (host) {
  const lv = earLvl(), cfg = EAR_EXTRA[lv];
  const time = pick(lv >= 6 ? ["4/4", "3/4", "6/8"] : ["4/4", "3/4"]), mi = meterInfo(time);
  const srLevel = Math.min(8, Math.max(1, lv - 1));
  const bars = [];
  for (let i = 0; i < cfg.clap; i++) bars.push(fillBar(srLevel, mi, i === cfg.clap - 1));
  const bpm = lv >= 6 ? 88 : 76, u = 60 / bpm / (mi.compound ? 6 : 4);
  const onsets = []; let p = 0; bars.forEach(b => b.forEach(d => { onsets.push(p * u); p += d; }));
  const total = p * u, countIn = mi.barLen * u, beatSec = mi.beat * u;
  const abc = `X:1\nM:${time}\nL:1/16\nK:C clef=perc\n` + bars.map(b => { let pos = 0; return b.map(d => { pos += d; return "B" + (d === 1 ? "" : d) + (pos % mi.beat === 0 ? " " : ""); }).join("").trim(); }).join(" | ") + " |]";
  const play = () => {
    const items = [];
    for (let t = 0; t < countIn - 1e-6; t += beatSec) items.push({t, fn: (x) => click(x, Math.abs(t) < 1e-6)});
    onsets.forEach(o => items.push({t: countIn + o, fn: (x) => tone(84, x, 0.18, 0.3)}));
    playQueue(items);
  };
  Q.cur = {answer: null, play, onsets, total, countIn, beatSec, abc, taps: [], start: 0, open: false};
  host.innerHTML = `<div class="stack">
    <div class="row"><button class="btn primary" data-act="q-play">▶ Odsłuchaj</button><button class="btn" data-act="clap-go">Wystukaj</button>
      <span class="small muted">Pytanie ${Q.count + 1}${Q.inline ? " z " + Q.max : ""} · wynik ${Q.score} · metrum ${time}</span></div>
    <button class="tapbtn" id="tapbtn" type="button" aria-label="Stuknij rytm">Stuk</button>
    <div id="clap-res" class="small muted">Po „Wystukaj” usłyszysz takt odliczania – zacznij stukać na pierwszą miarę kolejnego taktu.</div></div>`;
  setTimeout(play, 60);
};
function clapGo() {
  const q = Q.cur; if (!q || q.onsets === undefined) return;
  const c = ac(), items = [];
  for (let t = 0; t < q.countIn - 1e-6; t += q.beatSec) items.push({t, fn: (x) => click(x, Math.abs(t) < 1e-6)});
  const t0 = playQueue(items);
  q.start = t0 + q.countIn; q.taps = []; q.open = true;
  document.getElementById("clap-res").textContent = "Odliczanie… potem stukaj.";
  setTimeout(() => { if (Q.cur === q) clapEval(); }, (q.countIn + q.total + q.beatSec * 1.5 + 0.2) * 1000);
}
function clapTap() {
  const q = Q.cur; if (!q || !q.open) return;
  const t = ac().currentTime - q.start;
  if (t > -q.beatSec * 0.5) q.taps.push(t);
  const b = document.getElementById("tapbtn"); if (b) { b.classList.add("hit"); setTimeout(() => b.classList.remove("hit"), 90); }
}
function clapEval() {
  const q = Q.cur; if (!q || !q.open) return; q.open = false;
  const e = q.onsets, u = q.taps;
  let ok = u.length === e.length, msg;
  if (ok) {
    const diffs = u.map((x, i) => x - e[i]).sort((a, b) => a - b);
    const shift = Math.max(-0.25, Math.min(0.25, diffs[Math.floor(diffs.length / 2)]));
    const tol = Math.max(0.12, q.beatSec * 0.22);
    const bad = u.filter((x, i) => Math.abs(x - shift - e[i]) > tol).length;
    ok = bad === 0;
    msg = ok ? "Dobrze! Rytm się zgadza." : `Liczba uderzeń się zgadza, ale ${bad} z nich ${bad === 1 ? "było" : "były"} nie w czasie.`;
  } else msg = `Stuknęłaś ${u.length} razy, a w rytmie jest ${e.length} dźwięków.`;
  const res = document.getElementById("clap-res");
  res.innerHTML = `<p style="margin:0;color:${ok ? "var(--ok)" : "var(--danger)"}"><b>${msg}</b></p><div class="abc" id="clap-abc"></div>
    <div class="row"><button class="btn sm" data-act="q-play">▶ Odsłuchaj jeszcze raz</button><button class="btn sm primary" data-act="ear-next" data-ok="${ok ? 1 : 0}">Dalej</button></div>`;
  renderAbcInto(document.getElementById("clap-abc"), q.abc);
}

// powtarzanie melodii
function keyTonicMidi(keyName) { const li = LETTERS.indexOf(keyName[0]); const K = SR_KEYS[keyName]; return 60 + NAT[li] + sigAlter(K.sig, li); }
EXTRA_QUIZ["ear-play"] = function (host) {
  const lv = earLvl(), cfg = EAR_EXTRA[lv], keyName = pick(cfg.keys), K = SR_KEYS[keyName];
  const piece = {K}, base = LETTERS.indexOf(keyName[0]) + 28;
  let d = pick([0, 2, 4]); const degs = [d];
  for (let i = 1; i < cfg.mel; i++) {
    if (i === cfg.mel - 1 && lv <= 6) { d = Math.abs(d - 7) < Math.abs(d) ? 7 : 0; degs.push(d); break; }
    const r = Math.random(); const step = r < 0.7 ? 1 : r < 0.93 ? 2 : 0;
    const dir = d >= 6 ? -1 : d <= -2 ? 1 : (Math.random() < 0.5 ? -1 : 1);
    d = Math.max(-3, Math.min(8, d + dir * step)); degs.push(d);
  }
  const midis = degs.map(x => noteInfo(piece, base, x).midi);
  const tonic = keyTonicMidi(keyName), third = tonic + (K.minor ? 3 : 4);
  const play = () => {
    const items = [];
    [tonic, third, tonic + 7].forEach(m => items.push({t: 0, fn: (x) => tone(m, x, 1.3, 0.14)}));
    midis.forEach((m, i) => items.push({t: 1.8 + i * 0.75, fn: (x) => tone(m, x, 0.8, 0.24)}));
    playQueue(items);
  };
  const low = Math.min(tonic - 5, ...midis) - 1, high = Math.max(tonic + 14, ...midis) + 1;
  Q.cur = {answer: null, play, midis, ans: [midis[0]], keyName, kb: [low, high]};
  host.innerHTML = `<div class="stack">
    <div class="row"><button class="btn primary" data-act="q-play">▶ Odsłuchaj</button>
      <span class="small muted">Pytanie ${Q.count + 1}${Q.inline ? " z " + Q.max : ""} · wynik ${Q.score} · ${K.pl} · ${midis.length} dźwięków</span></div>
    <p class="small" style="margin:0">Najpierw tonacja (akord), potem melodia. Pierwszy dźwięk podany: <b>${PC_NAMES[midis[0] % 12]}</b>.</p>
    <div class="seqline" id="seqline"></div>
    ${keyboardHtml(low, high)}
    <div class="row"><button class="btn sm" data-act="mel-undo">Cofnij</button><button class="btn sm primary" data-act="mel-check">Sprawdź</button></div>
    <div id="mel-res"></div></div>`;
  seqRender();
  setTimeout(play, 60);
};
function keyboardHtml(low, high) {
  const isBlack = (m) => [1, 3, 6, 8, 10].includes(m % 12);
  while (isBlack(low)) low--; while (isBlack(high)) high++;
  const whites = []; for (let m = low; m <= high; m++) if (!isBlack(m)) whites.push(m);
  const w = 100 / whites.length;
  let html = `<div class="kbd" role="group" aria-label="Klawiatura">`;
  whites.forEach(m => { html += `<button class="w" type="button" data-act="kb" data-m="${m}" aria-label="${PC_NAMES[m % 12]}">${m % 12 === 0 ? "C" + (Math.floor(m / 12) - 1) : ""}</button>`; });
  whites.forEach((m, i) => { if (m + 1 <= high && isBlack(m + 1)) html += `<button class="b" type="button" data-act="kb" data-m="${m + 1}" aria-label="${PC_NAMES[(m + 1) % 12]}" style="left:calc(${(i + 1) * w}% - ${w * 0.3}%);width:${w * 0.6}%"></button>`; });
  return html + `</div>`;
}
function seqRender() { const el = document.getElementById("seqline"); if (el && Q.cur && Q.cur.ans) el.innerHTML = Q.cur.ans.map(m => `<span>${PC_NAMES[m % 12]}</span>`).join(""); }
function melCheck() {
  const q = Q.cur; if (!q || !q.midis || Q.locked) return;
  if (q.ans.length < q.midis.length) { document.getElementById("mel-res").innerHTML = `<p class="small" style="color:var(--danger)">Wpisz ${q.midis.length} dźwięków (masz ${q.ans.length}).</p>`; return; }
  Q.locked = true;
  const ok = q.ans.length === q.midis.length && q.ans.every((m, i) => m % 12 === q.midis[i] % 12);
  document.getElementById("mel-res").innerHTML = `<p style="margin:0;color:${ok ? "var(--ok)" : "var(--danger)"}"><b>${ok ? "Dobrze!" : "Prawidłowo: " + q.midis.map(m => PC_NAMES[m % 12]).join(" – ")}</b></p>
    <div class="row"><button class="btn sm" data-act="q-play">▶ Odsłuchaj jeszcze raz</button><button class="btn sm primary" data-act="ear-next" data-ok="${ok ? 1 : 0}">Dalej</button></div>`;
}

// kadencje
EXTRA_QUIZ["ear-cad"] = function (host) {
  const lv = earLvl(), cfg = EAR_EXTRA[lv];
  const opts = cfg.cad.length ? cfg.cad : EAR_EXTRA[5].cad;
  const ans = pick(opts), keyName = pick(["C", "G", "F", "D"]), t = keyTonicMidi(keyName);
  const tri = (r, minor) => [r - 12, r, r + (minor ? 3 : 4), r + 7];
  const I = tri(t), IV = tri(t + 5), V = tri(t - 5).map(x => x + 12), vi = tri(t + 9 - 12, true).map(x => x + 12);
  const pairs = {"doskonała (V–I)": [V, I], "plagalna (IV–I)": [IV, I], "półzamknięta (–V)": [pick([I, IV]), V], "zwodnicza (V–VI)": [V, vi]};
  const play = () => {
    const items = [];
    I.forEach(m => items.push({t: 0, fn: (x) => tone(m, x, 1.1, 0.13)}));
    pairs[ans].forEach((ch, i) => ch.forEach(m => items.push({t: 1.6 + i * 1.1, fn: (x) => tone(m, x, i ? 1.8 : 1.1, 0.13)})));
    playQueue(items);
  };
  Q.cur = {answer: ans, opts, play};
  host.innerHTML = `<div class="stack"><div class="row"><button class="btn primary" data-act="q-play">▶ Odtwórz</button>
    <span class="small muted">Pytanie ${Q.count + 1}${Q.inline ? " z " + Q.max : ""} · wynik ${Q.score}</span></div>
    <p class="small" style="margin:0">Najpierw akord toniczny, potem kadencja z dwóch akordów.</p>
    <div class="answers wide">${opts.map(o => `<button data-act="q-ans" data-a="${esc(o)}">${o}</button>`).join("")}</div></div>`;
  setTimeout(play, 60);
};

// dur czy moll: krótki fragment z tymi samymi znakami dla tonacji durowej i równoległej molowej
const KM_PAIRS = [["C", "Am"], ["G", "Em"], ["F", "Dm"], ["D", "Bm"], ["Bb", "Gm"], ["A", "F#m"], ["Eb", "Cm"], ["E", "C#m"], ["Ab", "Fm"]];
// melodia prawej ręki w stopniach od toniki (6 / -1 = 7. stopień, w molu podwyższony); ostatni takt to jedna długa nuta
const KM_TUNES = [
  {time: "4/4", ch: ["I", "IV", "V", "I"], rh: [[0, 1, 2, 0], [3, 5, 4, 3], [4, 3, 1, -1], [0]]},
  {time: "4/4", ch: ["I", "IV", "V", "I"], rh: [[4, 2, 0, 2], [3, 5, 7, 5], [4, 1, 4, 6], [7]]},
  {time: "4/4", ch: ["I", "V", "V", "I"], rh: [[2, 4, 2, 0], [1, -1, 1, 4], [3, 1, -1, 1], [0]]},
  {time: "3/4", ch: ["I", "IV", "V", "I"], rh: [[0, 2, 4], [5, 3, 0], [4, 1, -1], [0]]},
  {time: "3/4", ch: ["I", "IV", "V", "I"], rh: [[2, 1, 0], [5, 3, 0], [-1, 1, -1], [0]]},
  {time: "3/4", ch: ["I", "V", "IV", "V", "I"], rh: [[4, 2, 0], [1, 4, 1], [3, 5, 3], [4, 6, 4], [7]]}
];
const KM_ROOT = {I: 0, IV: -4, V: -3};
function plNoteName(li, alter) {
  const L = "CDEFGAH"[li];
  if (alter === 1) return L + "is";
  if (alter === -1) return {E: "Es", A: "As", H: "B"}[L] || L + "es";
  return L;
}
function sigText(sig) { return sig === 0 ? "bez znaków" : Math.abs(sig) + (sig > 0 ? "♯" : "♭"); }
EXTRA_QUIZ["keymode"] = function (host) {
  const max = Math.min(4, Math.max(1, S.th.level - 1));
  const pair = pick(KM_PAIRS.filter(p => Math.abs(SR_KEYS[p[0]].sig) <= max));
  const minor = Math.random() < 0.5, keyName = pair[minor ? 1 : 0], K = SR_KEYS[keyName], piece = {K};
  const tune = pick(KM_TUNES), beats = tune.time === "3/4" ? 3 : 4;
  const li = LETTERS.indexOf(keyName[0]), rhBase = li + 28, lhBase = li + 21;
  const accR = [], accL = [], events = [], spb = 0.6;
  const rh = tune.rh.map((bar, b) => {
    const st = {}; accR.push(st);
    return bar.map((d, i) => {
      const n = noteInfo(piece, rhBase, d), len = bar.length === 1 ? beats : 1;
      events.push({t: (b * beats + i) * spb, m: n.midi, d: len * spb});
      return abcPitch(n, st) + (len === 1 ? "" : len);
    }).join(" ");
  });
  const lh = tune.ch.map((c, b) => {
    const st = {}, r = KM_ROOT[c], last = b === tune.ch.length - 1;
    const root = noteInfo(piece, lhBase, r), chord = [r + 2, r + 4].map(x => noteInfo(piece, lhBase, x));
    events.push({t: b * beats * spb, m: root.midi, d: (last ? beats : beats === 4 ? 2 : 1) * spb});
    if (last) return abcPitch(root, st) + beats;
    const tok = "[" + chord.map(n => abcPitch(n, st)).join("") + "]";
    for (let k = beats === 4 ? 2 : 1; k < beats; k += beats === 4 ? 2 : 1) chord.forEach(n => events.push({t: (b * beats + k) * spb, m: n.midi, d: (beats === 4 ? 2 : 1) * spb}));
    return abcPitch(root, st) + (beats === 4 ? "2 " + tok + "2" : " " + tok + " " + tok);
  });
  const abc = `X:1\nM:${tune.time}\nL:1/4\nK:${keyName}\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] ${rh.join(" | ")} |]\n[V:LH] ${lh.join(" | ")} |]\n`;
  // do wyjaśnienia: tonika obu tonacji i podwyższony 7. stopień molowej
  const maj = SR_KEYS[pair[0]], min = SR_KEYS[pair[1]], mLi = LETTERS.indexOf(pair[1][0]), MLi = LETTERS.indexOf(pair[0][0]);
  const ltLi = mod7(mLi - 1), ltAlt = sigAlter(min.sig, ltLi) + 1, lt = plNoteName(ltLi, ltAlt) + (ltAlt === 0 ? " (z kasownikiem)" : "");
  const minT = plNoteName(mLi, sigAlter(min.sig, mLi)), majT = plNoteName(MLi, sigAlter(maj.sig, MLi));
  const why = minor
    ? [`Znaki: ${sigText(maj.sig)}, czyli ${maj.pl} albo ${min.pl}.`,
       `W nutach pojawia się <b>${lt}</b> jako znak przygodny – to podwyższony 7. stopień ${min.pl}, który prowadzi do toniki ${minT}.`,
       `Bas kończy na <b>${minT}</b>, a pierwszy i ostatni akord to ${min.pl}.`]
    : [`Znaki: ${sigText(maj.sig)}, czyli ${maj.pl} albo ${min.pl}.`,
       `Nie ma <b>${lt}</b> – podwyższonego 7. stopnia ${min.pl}, który w tonacji molowej prawie zawsze się pojawia.`,
       `Bas kończy na <b>${majT}</b>, a pierwszy i ostatni akord to ${maj.pl}.`];
  const play = () => playQueue(events.map(e => ({t: e.t, fn: (x) => tone(e.m, x, e.d * 1.1, 0.16)})));
  Q.cur = {answer: K.pl, play, why};
  host.innerHTML = `<div class="stack">
    <div class="abc" id="km-abc"></div>
    <p class="small" style="margin:0">Dur czy moll? Sprawdź znaki, znaki przygodne i ostatnią nutę basu. <span class="muted">· pytanie ${Q.count + 1} z ${Q.max} · wynik ${Q.score}</span></p>
    <div class="answers wide">${[maj.pl, min.pl].map(o => `<button data-act="km-ans" data-a="${esc(o)}">${o}</button>`).join("")}</div>
    <div id="km-res"></div></div>`;
  renderAbcInto(document.getElementById("km-abc"), abc);
};
function kmAnswer(btn) {
  if (Q.locked) return; Q.locked = true;
  const ok = btn.dataset.a === Q.cur.answer;
  btn.classList.add(ok ? "right" : "wrong");
  if (!ok) document.querySelectorAll(`#${Q.host} [data-act="km-ans"]`).forEach(b => { if (b.dataset.a === Q.cur.answer) b.classList.add("right"); });
  const msg = ok ? "Dobrze – " + Q.cur.answer : "To " + Q.cur.answer;
  document.getElementById("km-res").innerHTML = `<p class="qfb ${ok ? "ok" : "bad"}" style="text-align:left">${msg}</p>
    <ul class="tips small">${Q.cur.why.map(x => `<li>${x}</li>`).join("")}</ul>
    <div class="row"><button class="btn sm" data-act="q-play">▶ Posłuchaj</button><button class="btn sm primary" data-act="ear-next" data-ok="${ok ? 1 : 0}">Dalej</button></div>`;
  announce(msg);
}

/* ============================== ZAKŁADKA NAUKA ============================== */
const LEARN = {view: "home", id: null};
function topicById(id) {
  for (const lv in THEORY) { const i = THEORY[lv].findIndex(x => x[0] === id); if (i >= 0) return {lv: +lv, i, t: THEORY[lv][i]}; }
  return null;
}
function pedalCourseDone() { return PEDAL.every(l => S.pedal && S.pedal.done && S.pedal.done[l.id]); }
function pedalCurrent() { return PEDAL.find(l => !(S.pedal && S.pedal.done && S.pedal.done[l.id])) || null; }
function viewLearn() {
  if (LEARN.view === "lesson") return lessonView(LEARN.id);
  if (LEARN.view === "pedal") return pedalView(LEARN.id);
  if (LEARN.view === "exam") return examView();
  if (LEARN.view === "listen") return listenView(LEARN.id);
  return learnHome();
}

/* kurs słuchania */
const spUrl = (p) => "https://open.spotify.com/" + p;
const spSearch = (q) => "https://open.spotify.com/search/" + encodeURIComponent(q);
function listenDone(id) { return !!(S.listen && S.listen[id] && S.listen[id].done); }
function listenNext() { return LISTEN.find(x => !listenDone(x.id)) || null; }
function listenCard() {
  const done = LISTEN.filter(x => listenDone(x.id)).length, next = listenNext();
  return `<div class="card stack">
    <div class="spread"><h3>Poznaj muzykę klasyczną</h3><span class="mono small">${done}/${LISTEN.length}</span></div>
    <div class="bar t-music"><span style="width:${Math.round(done / LISTEN.length * 100)}%"></span></div>
    <p class="small muted">${LISTEN.length} utworów od baroku do XX wieku, do słuchania na Spotify. Przy każdym: na co zwrócić uwagę i ciekawostka. Najlepiej po kolei, jeden lub dwa dziennie.</p>
    ${next ? `<div><button class="btn primary sm" data-act="listen-open" data-id="${next.id}">Następny: ${esc(next.composer.split(" ").slice(-1)[0])} – ${esc(next.title)}</button></div>` : `<p class="small"><b>Wysłuchane wszystkie – brawo!</b></p>`}
    ${LISTEN_ERAS.map(e => {
      const items = LISTEN.filter(x => x.era === e.id);
      return `<details><summary>${e.name} <span class="muted small">(${items.filter(x => listenDone(x.id)).length}/${items.length}) · ${e.years}</span></summary>
        <p class="small muted" style="margin:6px 0">${e.intro}</p>
        <div class="lessonlist">${items.map(x => `<button data-act="listen-open" data-id="${x.id}"><span>${esc(x.composer)} – ${esc(x.title)} <span class="muted small">· ${x.min} min</span></span>${listenDone(x.id) ? `<span class="ok">✓</span>` : `<span class="muted">›</span>`}</button>`).join("")}</div></details>`;
    }).join("")}
  </div>`;
}
function listenView(id) {
  const i = LISTEN.findIndex(x => x.id === id), x = LISTEN[i];
  if (!x) return learnHome();
  const era = LISTEN_ERAS.find(e => e.id === x.era), st_ = (S.listen && S.listen[id]) || {};
  const prev = LISTEN[i - 1], next = LISTEN[i + 1];
  return `<section class="stack">
    <div><button class="btn sm ghost" data-act="learn-home">‹ Nauka</button></div>
    <article class="card stack lesson">
      <h2>${esc(x.title)}</h2>
      <p class="muted" style="margin:0">${esc(x.composer)} · ${x.year} · ok. ${x.min} min</p>
      <p class="meta">Poznaj muzykę klasyczną · ${era.name} · ${i + 1} z ${LISTEN.length}</p>
      <div class="row">
        <a class="btn primary" href="${spUrl(x.sp)}" target="_blank" rel="noopener">▶ Słuchaj na Spotify</a>
        <a class="btn sm ghost" href="${spSearch(x.composer + " " + x.title)}" target="_blank" rel="noopener">inne wykonania</a>
      </div>
      <p class="small muted" style="margin:0">Nagranie: ${esc(x.perf)}</p>
      <h4>Na co zwrócić uwagę</h4>
      <ul>${x.listen.map(l => `<li>${l}</li>`).join("")}</ul>
      <div class="box tip"><b>Ciekawostka:</b> ${x.fact}</div>
      ${x.you ? `<p class="small" style="margin:0">${x.you}</p>` : ""}
      <div class="stack" style="gap:6px"><span class="small">Jak Ci się podobało?</span>
        <div class="rate" role="group" aria-label="Ocena utworu">${[1, 2, 3, 4, 5].map(r => `<button data-act="listen-rate" data-id="${id}" data-r="${r}" aria-pressed="${st_.r === r}" aria-label="${r} na 5">${r}</button>`).join("")}</div></div>
      <div class="row">
        ${listenDone(id) ? `<button class="btn sm" data-act="listen-done" data-id="${id}">Wysłuchane ✓ (cofnij)</button>` : `<button class="btn sm primary" data-act="listen-done" data-id="${id}">Wysłuchane ✓</button>`}
        ${prev ? `<button class="btn sm ghost" data-act="listen-open" data-id="${prev.id}">‹ Poprzedni</button>` : ""}
        ${next ? `<button class="btn sm ghost" data-act="listen-open" data-id="${next.id}">Następny ›</button>` : ""}
      </div>
    </article></section>`;
}
function learnHome() {
  const pd = PEDAL.filter(l => S.pedal.done[l.id]).length;
  const ex = (S.exams || []).slice(-5).reverse();
  return `<section class="stack">
    <h2>Nauka</h2>
    <div class="card stack">
      <div class="spread"><h3>Lekcje teorii</h3><span class="small muted">jesteś na Level ${S.th.level}</span></div>
      <p class="small muted">Krótkie lekcje po polsku z przykładami w nutach i pytaniami sprawdzającymi. Lekcje z Twojego poziomu są rozwinięte.</p>
      ${Object.keys(THEORY).map(lv => `<details ${+lv === S.th.level ? "open" : ""}><summary>Level ${lv} <span class="muted small">(${THEORY[lv].filter(t => S.th.done[t[0]]).length}/${THEORY[lv].length})</span></summary>
        <div class="lessonlist">${THEORY[lv].map(t => `<button data-act="lesson" data-id="${t[0]}"><span>${t[1]}</span>${S.th.done[t[0]] ? `<span class="ok">✓</span>` : `<span class="muted">›</span>`}</button>`).join("")}</div></details>`).join("")}
    </div>
    ${listenCard()}
    <div class="card stack">
      <div class="spread"><h3>Kurs pedału</h3><span class="mono small">${pd}/${PEDAL.length}</span></div>
      <div class="bar t-tech"><span style="width:${Math.round(pd / PEDAL.length * 100)}%"></span></div>
      <p class="small muted">Od tego, jak działa pedał, przez pedał synkopowany (najważniejsza technika), po pedał w różnych stylach. Dopóki kurs trwa, w planie dnia jest krótki blok z bieżącą lekcją.</p>
      <div class="lessonlist">${PEDAL.map((l, i) => `<button data-act="pedal-open" data-id="${l.id}"><span>${i + 1}. ${l.title}</span>${S.pedal.done[l.id] ? `<span class="ok">✓</span>` : `<span class="muted">›</span>`}</button>`).join("")}</div>
    </div>
    <div class="card stack">
      <h3>Próbny egzamin RCM</h3>
      <p class="small">Symulacja egzaminu praktycznego z Grade ${S.grade}: utwory z list A, B i C, etiudy, technika, czytanie a vista i słuch. Oceniasz się według konkretnych kryteriów (najlepiej z nagrania), a słuch sprawdza aplikacja. Trwa ok. 30–40 minut.</p>
      <div><button class="btn primary" data-act="exam-start">Rozpocznij egzamin Grade ${S.grade}</button></div>
      ${ex.length ? `<div class="stack" style="gap:6px"><b class="small">Poprzednie wyniki</b>${ex.map(e => `<div class="spread small"><span>${e.d} · Grade ${e.grade}</span><span><b>${e.total}</b>/100 · ${examClass(e.total)}</span></div>`).join("")}</div>` : ""}
    </div>
  </section>`;
}
function lessonView(id) {
  const T = topicById(id), L = (typeof LESSONS !== "undefined" && LESSONS[id]) || null;
  if (!T) return `<button class="btn sm ghost" data-act="learn-home">‹ Nauka</button>`;
  const list = THEORY[T.lv], next = list[T.i + 1] || (THEORY[T.lv + 1] || [])[0];
  return `<section class="stack">
    <div><button class="btn sm ghost" data-act="learn-home">‹ Nauka</button></div>
    <article class="card stack lesson">
      <h2>${T.t[1]}</h2>
      <p class="meta">Teoria · Level ${T.lv} · temat ${T.i + 1} z ${list.length}</p>
      ${L ? L.body : `<p>Lekcja w przygotowaniu.</p>`}
      ${L && L.abc ? L.abc.map((a, i) => `<div><div class="abc" data-abc="${id}:${i}"></div>${a.cap ? `<p class="small muted" style="margin:0">${a.cap}</p>` : ""}</div>`).join("") : ""}
      ${L && L.piano ? `<div class="box tip"><b>Przy pianinie:</b> ${L.piano}</div>` : ""}
      ${L && L.check ? `<h4>Sprawdź się</h4>${L.check.map((c, qi) => `<div class="check-q"><span>${c.q}</span><div class="opts">${c.opts.map((o, oi) => `<button type="button" data-act="chk" data-id="${id}" data-q="${qi}" data-o="${oi}">${o}</button>`).join("")}</div><p class="small muted" id="why-${qi}" role="status" style="margin:0"></p></div>`).join("")}` : ""}
      <div class="row">
        ${T.t[3] ? `<button class="btn sm" data-act="quiz" data-q="${T.t[3]}">Ćwicz w quizie</button>` : ""}
        ${S.th.done[id] ? `<span class="pill own">opanowany ✓</span>` : `<button class="btn sm primary" data-act="thdone-lesson" data-id="${id}">Temat opanowany ✓</button>`}
        ${next ? `<button class="btn sm ghost" data-act="lesson" data-id="${next[0]}">Następna lekcja ›</button>` : ""}
      </div>
    </article></section>`;
}
function pedalView(id) {
  const i = PEDAL.findIndex(l => l.id === id), l = PEDAL[i];
  if (!l) return learnHome();
  const next = PEDAL[i + 1];
  return `<section class="stack">
    <div><button class="btn sm ghost" data-act="learn-home">‹ Nauka</button></div>
    <article class="card stack lesson">
      <h2>${l.title}</h2>
      <p class="meta">Kurs pedału · lekcja ${i + 1} z ${PEDAL.length}</p>
      ${l.body}
      ${l.abc ? l.abc.map((a, k) => `<div><div class="abc" data-abc="pedal:${id}:${k}"></div>${a.cap ? `<p class="small muted" style="margin:0">${a.cap}</p>` : ""}</div>`).join("") : ""}
      <div class="box tip"><b>Ćwiczenie:</b> ${l.drill}</div>
      ${l.check ? `<h4>Sprawdź się</h4>${l.check.map((c, qi) => `<div class="check-q"><span>${c.q}</span><div class="opts">${c.opts.map((o, oi) => `<button type="button" data-act="chk" data-id="pedal:${id}" data-q="${qi}" data-o="${oi}">${o}</button>`).join("")}</div><p class="small muted" id="why-${qi}" role="status" style="margin:0"></p></div>`).join("")}` : ""}
      <div class="row">
        ${S.pedal.done[id] ? `<span class="pill own">zaliczona ✓</span>` : `<button class="btn sm primary" data-act="pedal-done" data-id="${id}">Lekcja zaliczona ✓</button>`}
        ${next ? `<button class="btn sm ghost" data-act="pedal-open" data-id="${next.id}">Następna lekcja ›</button>` : ""}
      </div>
    </article></section>`;
}
function pedalBlockBody(b) {
  const l = pedalCurrent();
  if (!l) return `<p>Kurs pedału ukończony. Gratulacje!</p>`;
  const i = PEDAL.indexOf(l);
  return `<div><h3 style="font-size:1.15rem">${l.title}</h3><p class="meta">Kurs pedału · lekcja ${i + 1} z ${PEDAL.length}</p></div>
    <p class="small">${l.short}</p>
    <div class="box tip small"><b>Ćwiczenie:</b> ${l.drill}</div>
    <div class="row"><button class="btn sm primary" data-act="pedal-open" data-id="${l.id}">Otwórz lekcję</button>
    <button class="btn sm" data-act="pedal-done" data-id="${l.id}">Lekcja zaliczona ✓</button></div>`;
}
function afterLearn() {
  document.querySelectorAll("[data-abc]").forEach(el => {
    const parts = el.dataset.abc.split(":");
    let a = null;
    if (parts[0] === "pedal") { const l = PEDAL.find(x => x.id === parts[1]); a = l && l.abc && l.abc[+parts[2]]; }
    else { const L = LESSONS[parts[0]]; a = L && L.abc && L.abc[+parts[1]]; }
    if (a) renderAbcInto(el, a.src);
  });
  if (LEARN.view === "exam") examAfter();
}
function checkAnswer(btn) {
  const id = btn.dataset.id, qi = +btn.dataset.q, oi = +btn.dataset.o;
  let c;
  if (id.startsWith("pedal:")) { const l = PEDAL.find(x => x.id === id.slice(6)); c = l.check[qi]; }
  else c = LESSONS[id].check[qi];
  const wrap = btn.closest(".check-q"), ok = oi === c.ok;
  wrap.querySelectorAll("button").forEach((b, i) => { b.classList.remove("right", "wrong"); if (!ok && i === c.ok) b.classList.add("right"); });
  btn.classList.add(ok ? "right" : "wrong");
  const why = wrap.querySelector("[id^='why-']");
  if (why) { why.className = "small chkfb " + (ok ? "ok" : "bad"); why.textContent = (ok ? "Dobrze. " : "Nie – poprawna odpowiedź: " + c.opts[c.ok] + ". ") + (c.why || ""); }
}

/* ============================== PRÓBNY EGZAMIN ============================== */
const EXAM_W = {A: 18, B: 18, C: 20, E: 12, T: 12, SR: 10, EAR: 10};
const REP_CRIT = [["Bez zatrzymywania się i poprawiania", 3], ["Poprawne nuty i rytm (najwyżej kilka drobnych błędów)", 3], ["Tempo blisko docelowego", 2], ["Słyszalna dynamika i frazowanie", 2], ["Pedał i artykulacja zgodne ze stylem", 2], ["Z pamięci", 1]];
const ET_CRIT = [["Bez zatrzymywania się", 3], ["Poprawne nuty i rytm", 3], ["Tempo blisko docelowego", 2], ["Równość techniczna (np. szesnastek)", 2]];
let EXAM = null;
function examClass(t) {
  return t >= 90 ? "First Class Honours with Distinction" : t >= 80 ? "First Class Honours" : t >= 70 ? "Honours" : t >= 60 ? "Pass" : "niezaliczony";
}
function examTechTasks(g) {
  const bpm = g >= 8 ? 112 : g >= 7 ? 100 : g >= 6 ? 88 : 80, k = () => pick(KEYS), notes = ["C", "D", "E", "F", "G", "A", "H", "Fis", "Es", "B"];
  const tasks = [
    `Gama ${k()[0]}, razem, 4 oktawy, ♩ = ${bpm} szesnastkami`,
    `Gama ${k()[1]} harmoniczna, razem, 4 oktawy, ♩ = ${bpm}`,
    `Gama ${k()[1]} melodyczna, razem, 4 oktawy, ♩ = ${bpm}`,
    `Gama chromatyczna od ${pick(notes)}, razem`,
    `Pasaż ${pick([k()[0], k()[1]])}, razem, 4 oktawy`,
    `Trójdźwięki z przewrotami w ${k()[0]}, blokowo i łamane`,
    `Kadencja I–IV–V–I w ${pick([k()[0], k()[1]])}`
  ];
  if (g >= 6) tasks.push(`Akord D7 w ${k()[0]}, rozłożony, 4 oktawy`);
  if (g >= 7) tasks.push(`Gama tercjami w odstępie w C-dur, ♩ = ${Math.round(bpm * 0.8)}`);
  return tasks.sort(() => Math.random() - 0.5).slice(0, 5).map(t => ({t, v: null}));
}
function examStart() {
  const g = S.grade;
  const best = (l) => piecesFor(g, l).slice().sort((a, b) => st(b.id) - st(a.id))[0];
  const ets = piecesFor(g, "E").slice().sort((a, b) => st(b.id) - st(a.id));
  EXAM = {g, step: 0, rep: {A: {id: best("A").id, c: []}, B: {id: best("B").id, c: []}, C: {id: best("C").id, c: []}},
    et: [{id: ets[0].id, c: []}, {id: (ets[1] || ets[0]).id, c: []}], tech: examTechTasks(g), sr: {r: null, n: null}, ear: null, scores: null};
  LEARN.view = "exam";
}
function critHtml(prefix, crit, checked) {
  return `<div class="rubric">${crit.map((c, i) => `<label><input type="checkbox" data-exam="${prefix}" data-i="${i}" ${checked.includes(i) ? "checked" : ""}><span>${c[0]} <span class="muted small">(${c[1]} pkt)</span></span></label>`).join("")}</div>`;
}
function examView() {
  if (!EXAM) return learnHome();
  const g = EXAM.g, st_ = EXAM.step;
  const head = (title, n) => `<div class="spread"><button class="btn sm ghost" data-act="exam-quit-ask">‹ Przerwij</button><span class="small muted">Krok ${n} z 6</span></div>
    ${EXAM.quitAsk ? `<div class="confirm"><p>Przerwać egzamin? Twoje odpowiedzi z tego podejścia przepadną.</p><div class="row"><button class="btn ghost sm" data-act="exam-quit">Tak, przerwij</button><button class="btn primary sm" data-act="exam-quit-no">Wracam do egzaminu</button></div></div>` : ""}
    <h2>${title}</h2>`;
  if (st_ === 0) return `<section class="stack"><div class="card stack lesson">
    <div><button class="btn sm ghost" data-act="exam-quit">‹ Wróć</button></div>
    <h2>Próbny egzamin – jak to działa</h2><p class="meta">Grade ${g}</p>
    <p>Egzamin RCM z fortepianu ocenia się w skali 100 punktów. Tutaj punkty rozkładają się tak (orientacyjnie, wzorowane na RCM):</p>
    <div class="tablewrap"><table><tr><th>Część</th><th>Punkty</th></tr>
      <tr><td>Utwór z listy A</td><td>${EXAM_W.A}</td></tr><tr><td>Utwór z listy B</td><td>${EXAM_W.B}</td></tr><tr><td>Utwór z listy C</td><td>${EXAM_W.C}</td></tr>
      <tr><td>Etiudy (2)</td><td>${EXAM_W.E}</td></tr><tr><td>Technika</td><td>${EXAM_W.T}</td></tr><tr><td>Czytanie a vista</td><td>${EXAM_W.SR}</td></tr><tr><td>Słuch</td><td>${EXAM_W.EAR}</td></tr></table></div>
    <p>Wynik: <b>60</b> – zaliczenie (Pass), <b>70</b> – Honours, <b>80</b> – First Class Honours, <b>90</b> – z wyróżnieniem (with Distinction).</p>
    <div class="box tip">Najuczciwiej będzie, jeśli każdy utwór zagrasz raz, od początku do końca, i nagrasz telefonem. Oceniaj nagranie, a nie wrażenie z grania. Na prawdziwym egzaminie nie ma drugiego podejścia.</div>
    <div><button class="btn primary" data-act="exam-next">Zaczynamy</button></div></div></section>`;
  if (st_ === 1) return `<section class="stack"><div class="card stack">${head("Utwory z list A, B i C", 1)}
    ${["A", "B", "C"].map(l => {
      const r = EXAM.rep[l], p = PIECES.find(x => x.id === r.id);
      return `<div class="stack" style="gap:6px;border-top:1px solid var(--line);padding-top:10px">
        <div class="spread"><b>Lista ${l} – ${LISTS[l]}</b><span class="small muted">${EXAM_W[l]} pkt</span></div>
        <select data-exam-sel="${l}" aria-label="Utwór z listy ${l}">${piecesFor(g, l).map(x => `<option value="${x.id}" ${x.id === r.id ? "selected" : ""}>${x.name} (${STATUS[st(x.id)]})</option>`).join("")}</select>
        <span class="small">${ytLink(YT[p.id] || p.q, "posłuchaj wzorcowego wykonania")}</span>
        ${critHtml("rep-" + l, REP_CRIT, r.c)}</div>`;
    }).join("")}
    <div><button class="btn primary" data-act="exam-next">Dalej: etiudy</button></div></div></section>`;
  if (st_ === 2) return `<section class="stack"><div class="card stack">${head("Etiudy", 2)}
    ${EXAM.et.map((r, i) => `<div class="stack" style="gap:6px;border-top:1px solid var(--line);padding-top:10px">
      <div class="spread"><b>Etiuda ${i + 1}</b><span class="small muted">${EXAM_W.E / 2} pkt</span></div>
      <select data-exam-sel="E${i}" aria-label="Etiuda ${i + 1}">${piecesFor(g, "E").map(x => `<option value="${x.id}" ${x.id === r.id ? "selected" : ""}>${x.name} (${STATUS[st(x.id)]})</option>`).join("")}</select>
      ${critHtml("et-" + i, ET_CRIT, r.c)}</div>`).join("")}
    <div><button class="btn primary" data-act="exam-next">Dalej: technika</button></div></div></section>`;
  if (st_ === 3) return `<section class="stack"><div class="card stack">${head("Technika", 3)}
    <p class="small">Egzaminator wybiera kilka wymagań na zawołanie. Zagraj każde raz, bez przygotowania.</p>
    ${EXAM.tech.map((t, i) => `<div class="stack" style="gap:6px;border-top:1px solid var(--line);padding-top:10px"><span>${t.t}</span>
      <div class="status">${[[2, "czysto i w tempie"], [1, "z błędami albo wolniej"], [0, "nie wyszło"]].map(([v, lab]) => `<button data-act="exam-tech" data-i="${i}" data-v="${v}" aria-pressed="${t.v === v}">${lab}</button>`).join("")}</div></div>`).join("")}
    <div><button class="btn primary" data-act="exam-next">Dalej: czytanie a vista</button></div></div></section>`;
  if (st_ === 4) return `<section class="stack"><div class="card stack">${head("Czytanie a vista", 4)}
    <p class="small">Ćwiczenie na poziomie Grade ${g}. Masz 30 sekund na przegląd, potem grasz raz z metronomem.</p>
    <div id="exam-sr"></div>
    <div class="stack" style="gap:6px"><span class="small">Płynność i rytm (0 = ciągłe przerwy, 5 = bez zatrzymań, równo)</span>
      <div class="rate" role="group" aria-label="Płynność i rytm">${[0, 1, 2, 3, 4, 5].map(v => `<button data-act="exam-sr" data-k="r" data-v="${v}" aria-pressed="${EXAM.sr.r === v}" aria-label="${v} na 5">${v}</button>`).join("")}</div>
      <span class="small">Poprawność nut (0 = większość źle, 5 = prawie wszystkie dobrze)</span>
      <div class="rate" role="group" aria-label="Poprawność nut">${[0, 1, 2, 3, 4, 5].map(v => `<button data-act="exam-sr" data-k="n" data-v="${v}" aria-pressed="${EXAM.sr.n === v}" aria-label="${v} na 5">${v}</button>`).join("")}</div></div>
    <div><button class="btn primary" data-act="exam-next">Dalej: słuch</button></div></div></section>`;
  if (st_ === 5) return `<section class="stack"><div class="card stack">${head("Słuch", 5)}
    <p class="small">Interwały, akordy, powtarzanie rytmu i melodii${EAR_EXTRA[Math.min(8, Math.max(2, g))].cad.length ? " oraz kadencja" : ""} na poziomie Grade ${g}. Ten wynik nie wpływa na Twoje statystyki z codziennych ćwiczeń.</p>
    <div id="exam-ear"></div></div></section>`;
  // wynik
  const sc = EXAM.scores, total = Math.round(Object.values(sc).reduce((a, b) => a + b, 0));
  const rows = [["Lista A", sc.A, EXAM_W.A], ["Lista B", sc.B, EXAM_W.B], ["Lista C", sc.C, EXAM_W.C], ["Etiudy", sc.E, EXAM_W.E], ["Technika", sc.T, EXAM_W.T], ["Czytanie a vista", sc.SR, EXAM_W.SR], ["Słuch", sc.EAR, EXAM_W.EAR]];
  const weak = rows.slice().sort((a, b) => a[1] / a[2] - b[1] / b[2]).slice(0, 2);
  return `<section class="stack"><div class="card stack">
    <h2>Wynik próbnego egzaminu</h2><p class="meta">Grade ${EXAM.g}</p>
    <div class="row" style="align-items:flex-end;gap:14px"><span class="big">${total}</span><span class="muted">na 100</span></div>
    <span class="grade-badge">${examClass(total)}</span>
    ${rows.map(r => `<div class="stack" style="gap:4px"><div class="spread small"><span>${r[0]}</span><span class="mono">${Math.round(r[1] * 10) / 10} / ${r[2]}</span></div><div class="bar"><span style="width:${Math.round(r[1] / r[2] * 100)}%"></span></div></div>`).join("")}
    <div class="box tip"><b>Nad czym popracować:</b> ${weak.map(w => w[0].toLowerCase()).join(" i ")}. ${total >= 60 ? "Ten wynik zaliczyłby egzamin." : "Do zaliczenia brakuje " + (60 - total) + " pkt."}</div>
    <p class="small muted">To samoocena według kryteriów, a nie ocena egzaminatora. Prawdziwy egzamin RCM wymaga też zdania teorii (od Grade 5).</p>
    <div><button class="btn primary" data-act="exam-done">Wróć do Nauki</button></div></div></section>`;
}
function examCollect() {
  if (!EXAM) return;
  document.querySelectorAll("[data-exam-sel]").forEach(s => {
    const k = s.dataset.examSel;
    if (k.startsWith("E")) EXAM.et[+k.slice(1)].id = s.value; else EXAM.rep[k].id = s.value;
  });
  document.querySelectorAll("[data-exam]").forEach(cb => {
    const [kind, k] = cb.dataset.exam.split("-"), i = +cb.dataset.i;
    const arr = kind === "rep" ? EXAM.rep[k].c : EXAM.et[+k].c;
    const at = arr.indexOf(i);
    if (cb.checked && at < 0) arr.push(i); if (!cb.checked && at >= 0) arr.splice(at, 1);
  });
}
function examAfter() {
  if (!EXAM) return;
  if (EXAM.step === 4) { if (!SRGEN["exam-sr"]) genFor("exam-sr", Math.min(8, EXAM.g)); mountGen("exam-sr"); }
  if (EXAM.step === 5 && document.getElementById("exam-ear")) {
    const lv = Math.min(8, Math.max(2, EXAM.g));
    const seq = ["ear-int", "ear-int", "ear-int", "ear-chord", "ear-chord", "ear-clap", "ear-play"];
    if (EAR_EXTRA[lv].cad.length) seq.push("ear-cad");
    ac();
    quizStart(seq[0], "exam-ear", true, {seq, level: lv, onDone: (score, max) => { EXAM.ear = score / max; examFinish(); }});
  }
}
function examFinish() {
  const sum = (c, crit) => c.reduce((a, i) => a + crit[i][1], 0) / crit.reduce((a, x) => a + x[1], 0);
  const sc = {
    A: EXAM_W.A * sum(EXAM.rep.A.c, REP_CRIT), B: EXAM_W.B * sum(EXAM.rep.B.c, REP_CRIT), C: EXAM_W.C * sum(EXAM.rep.C.c, REP_CRIT),
    E: EXAM.et.reduce((a, r) => a + (EXAM_W.E / 2) * sum(r.c, ET_CRIT), 0),
    T: EXAM_W.T * EXAM.tech.reduce((a, t) => a + (t.v || 0), 0) / (2 * EXAM.tech.length),
    SR: EXAM_W.SR * ((EXAM.sr.r || 0) + (EXAM.sr.n || 0)) / 10,
    EAR: EXAM_W.EAR * (EXAM.ear || 0)
  };
  EXAM.scores = sc; EXAM.step = 6;
  const total = Math.round(Object.values(sc).reduce((a, b) => a + b, 0));
  S.exams = (S.exams || []).concat([{d: todayKey(), grade: EXAM.g, total, parts: Object.fromEntries(Object.entries(sc).map(([k, v]) => [k, Math.round(v * 10) / 10]))}]).slice(-20);
  delete SRGEN["exam-sr"];
  save(); render(); window.scrollTo(0, 0);
}

/* ============================== ZDARZENIA ============================== */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-act]"); if (!t) return;
  const act = t.dataset.act;
  switch (act) {
    case "srgen-inline": {
      genFor("srgen-inline", S.sr.level);
      const b = todayPlan().blocks.find(x => x.type === "sr"); if (b && !b.gen) { b.gen = true; saveLocal(); }
      render(); setTimeout(() => { const el = document.getElementById("srgen-inline"); el && el.scrollIntoView({block: "center"}); }, 50); break;
    }
    case "srgen-tools": {
      const lv = +document.getElementById("srgen-level").value; genFor("srgen-tools", lv); mountGen("srgen-tools");
      const rate = document.getElementById("srgen-tools-rate"); if (rate) { rate.hidden = false; rate.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", "false")); }
      break;
    }
    case "srgenrate": {
      const g = SRGEN["srgen-tools"]; if (!g) break; const r = +t.dataset.r;
      t.parentElement.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === t)));
      if (g.rated) break; g.rated = true;
      if (g.level === S.sr.level) { S.sr.log.push({l: S.sr.level, r, d: todayKey(), src: "gen"}); save(); toast("Zapisano ocenę – liczy się do postępu"); }
      else toast("Zapisano – inny poziom niż Twój bieżący, więc nie liczy się do postępu");
      break;
    }
    case "sg-preview": ac(); genPreview(t.dataset.host); break;
    case "sg-play": ac(); genPlay(t.dataset.host); break;
    case "sg-listen": ac(); genListen(t.dataset.host); break;
    case "sg-stop": clearInterval(previewTimer); stopQueue(); genStatus(t.dataset.host, "Zatrzymano."); break;
    case "tempo-save": {
      const id = t.dataset.id, inp = document.getElementById("tin-" + id), v = Math.round(+inp.value);
      if (!v || v < 20 || v > 240) { toast("Wpisz tempo od 20 do 240"); inp.focus(); break; }
      S.tempo = S.tempo || {};
      const log = (S.tempo[id] || []).filter(x => x.d !== todayKey()); log.push({d: todayKey(), bpm: v}); S.tempo[id] = log.slice(-40);
      const p = PIECES.find(x => x.id === id), tg = p && tempoTargets(p);
      save(); render(); toast(tg && v >= tg[0] ? "Tempo docelowe osiągnięte!" : "Zapisano tempo " + v); break;
    }
    case "trainer-open": {
      const p = PIECES.find(x => x.id === t.dataset.id), tg = tempoTargets(p), log = (S.tempo && S.tempo[p.id]) || [];
      const last = log.length ? log[log.length - 1].bpm : null;
      TRAINER.label = p.name; TRAINER.start = last || (tg ? Math.round(tg[0] * 0.7) : 60); TRAINER.target = tg ? tg[0] : TRAINER.start + 16;
      if (TRAINER.target <= TRAINER.start) TRAINER.target = tg ? tg[1] : TRAINER.start + 8;
      TRAINER.on = false; TAB = "tools"; render(); break;
    }
    case "trainer-run": {
      if (TRAINER.on && metro.on) { metroStop(); TRAINER.on = false; render(); break; }
      const s = +document.getElementById("tr-start").value, g = +document.getElementById("tr-target").value;
      if (!(s >= 30 && g > s && g <= 240)) { toast("Tempo docelowe musi być wyższe niż startowe"); break; }
      Object.assign(TRAINER, {start: s, target: g, every: +document.getElementById("tr-every").value, step: +document.getElementById("tr-step").value, on: true});
      if (metro.on) metroStop(); metro.bpm = s; metroStart(); updateBpmUI();
      t.textContent = "Zatrzymaj trenera"; const mb = document.querySelector('[data-act="metro"]'); if (mb) mb.textContent = "Stop"; break;
    }
    case "clap-go": ac(); clapGo(); break;
    case "km-ans": kmAnswer(t); break;
    case "ear-next": if (Q.locked === "done") break; Q.locked = "done"; quizStep(t.dataset.ok === "1", 0); break;
    case "kb": { const m = +t.dataset.m; tone(m, ac().currentTime + 0.01, 0.7, 0.24); if (Q.cur && Q.cur.ans && !Q.locked) { Q.cur.ans.push(m); seqRender(); } break; }
    case "mel-undo": if (Q.cur && Q.cur.ans && Q.cur.ans.length > 1 && !Q.locked) { Q.cur.ans.pop(); seqRender(); } break;
    case "mel-check": melCheck(); break;
    case "learn-home": LEARN.view = "home"; render(); window.scrollTo(0, 0); break;
    case "lesson": LEARN.view = "lesson"; LEARN.id = t.dataset.id; TAB = "learn"; render(); window.scrollTo(0, 0); break;
    case "thdone-lesson": withUndo("Temat zaliczony", () => { S.th.done[t.dataset.id] = true; }); break;
    case "chk": checkAnswer(t); break;
    case "pedal-open": LEARN.view = "pedal"; LEARN.id = t.dataset.id; TAB = "learn"; render(); window.scrollTo(0, 0); break;
    case "pedal-done": S.pedal.done[t.dataset.id] = true; save(); toast(pedalCourseDone() ? "Kurs pedału ukończony!" : "Lekcja zaliczona"); render(); break;
    case "listen-open": LEARN.view = "listen"; LEARN.id = t.dataset.id; TAB = "learn"; render(); window.scrollTo(0, 0); break;
    case "listen-done": {
      S.listen = S.listen || {}; const cur = S.listen[t.dataset.id] || {};
      cur.done = !cur.done; if (cur.done) cur.d = todayKey(); S.listen[t.dataset.id] = cur;
      save(); render(); if (cur.done) toast("Zapisano jako wysłuchane"); break;
    }
    case "listen-rate": {
      S.listen = S.listen || {}; const cur = S.listen[t.dataset.id] || {};
      cur.r = +t.dataset.r; S.listen[t.dataset.id] = cur;
      t.parentElement.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === t))); save(); break;
    }
    case "exam-start": examStart(); render(); window.scrollTo(0, 0); break;
    case "exam-quit-ask": EXAM.quitAsk = true; render(); { const b = document.querySelector('[data-act="exam-quit-no"]'); b && b.focus(); } break;
    case "exam-quit-no": EXAM.quitAsk = false; render(); break;
    case "exam-quit": EXAM = null; delete SRGEN["exam-sr"]; stopQueue(); LEARN.view = "home"; render(); window.scrollTo(0, 0); break;
    case "exam-next": examCollect(); EXAM.quitAsk = false; EXAM.step++; render(); window.scrollTo(0, 0); break;
    case "exam-tech": EXAM.tech[+t.dataset.i].v = +t.dataset.v; t.parentElement.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === t))); break;
    case "exam-sr": EXAM.sr[t.dataset.k] = +t.dataset.v; t.parentElement.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b === t))); break;
    case "exam-done": EXAM = null; LEARN.view = "home"; render(); window.scrollTo(0, 0); break;
  }
});
document.addEventListener("pointerdown", (e) => { if (e.target.closest && e.target.closest("#tapbtn")) { e.preventDefault(); clapTap(); } });
document.addEventListener("keydown", (e) => { if (e.code === "Space" && Q.cur && Q.cur.open) { e.preventDefault(); clapTap(); } });
document.addEventListener("change", (e) => {
  if (e.target.dataset && e.target.dataset.examSel) examCollect();
  if (e.target.dataset && e.target.dataset.exam) examCollect();
});
