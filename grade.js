"use strict";
/* Most od kursu od zera do programu Grade 5–8: Grade 1 i Grade 2 według programu RCM (Piano Syllabus 2022, Level 1 i 2).
   Dopisuje do kursu od zera (beginner.js) poziomy, etapy, lekcje i utwory, więc nuty, odsłuch, etapy nauki utworu
   i sprawdzanie przez pianino (midiplay.js) działają tak samo jak w kursie od zera.
   Technika (gamy i trójdźwięki) jest generowana z palcowaniem; „gotowe” w S.beg.tech[id].
   Plan dnia w Grade 1–2: technika, lekcja, czytanie a vista (generator z extra.js), słuch w stylu RCM, utwór, powtórka. */

BEG_LVLS.push({id: "g1", name: "Grade 1", chip: "Grade 1"}, {id: "g2", name: "Grade 2", chip: "Grade 2"});
BEG_ETAPY.push(
  {n: 5, lvl: "g1", name: "Technika i tonacje", desc: "Gamy na dwie oktawy, tonacje molowe, trójdźwięki z przewrotami, ruch przeciwny i gama chromatyczna."},
  {n: 6, lvl: "g1", name: "Utwory, słuch i czytanie", desc: "Trzy rodzaje utworów, artykulacja, słuch i czytanie a vista jak na egzaminie RCM, gra z pamięci."},
  {n: 7, lvl: "g2", name: "Bemole i akompaniament", desc: "B-dur i g-moll, gama melodyczna, bas walcowy i bas Albertiego, ręce razem w gamie."},
  {n: 8, lvl: "g2", name: "Muzykalność i egzamin", desc: "Rytm z kropką, frazowanie i dynamika, kwinta na słuch, czytanie poza pozycją pięciu palców."}
);

/* ============================== TECHNIKA: GENERATOR GAM I TRÓJDŹWIĘKÓW ============================== */
// nuta: li – litera 0..6 (C..H), oct – oktawa (4 = od środkowego C), alt – -1/0/1
const GR_MODES = {maj: [0, 2, 4, 5, 7, 9, 11], nat: [0, 2, 3, 5, 7, 8, 10], harm: [0, 2, 3, 5, 7, 8, 11], mel: [0, 2, 3, 5, 7, 9, 11]};
const grMidi = (n) => 12 * (n.oct + 1) + NAT[n.li] + n.alt;
function grTonic(keyName, oct) {
  const li = LETTERS.indexOf(keyName[0]), K = SR_KEYS[keyName];
  return {li, oct, alt: sigAlter(K.sig, li)};
}
// stopień i (może być ujemny lub > 7) gamy w danym trybie, od toniki t
function grDeg(t, mode, i) {
  const step = Math.floor(i / 7), r = ((i % 7) + 7) % 7, idx = t.li + i;
  const li = ((idx % 7) + 7) % 7, oct = t.oct + Math.floor(idx / 7);
  const target = grMidi(t) + GR_MODES[mode][r] + 12 * step;
  return {li, oct, alt: target - (12 * (oct + 1) + NAT[li])};
}
// zapis ABC z kasowaniem znaków w obrębie taktu (bar: Map, nowa dla każdego taktu)
function grAbcNote(n, sig, bar) {
  const key = n.li + "_" + n.oct, eff = bar.has(key) ? bar.get(key) : sigAlter(sig, n.li);
  let acc = "";
  if (n.alt !== eff) { acc = {"1": "^", "-1": "_", "0": "=", "2": "^^", "-2": "__"}[n.alt]; bar.set(key, n.alt); }
  const L = LETTERS[n.li];
  return acc + (n.oct >= 5 ? L.toLowerCase() + "'".repeat(n.oct - 5) : L + ",".repeat(4 - n.oct));
}
const grF = (f) => (f ? "!" + f + "!" : "");
// ciąg nut [{n, f, d}] (d w ósemkach) → takty po 8 ósemek
function grBars(seq, sig, barLen) {
  barLen = barLen || 8;
  const bars = []; let cur = [], len = 0, bar = new Map();
  for (const x of seq) {
    const body = x.chord ? "[" + x.chord.map(n => grAbcNote(n, sig, bar)).join("") + "]" : x.rest ? "z" : grAbcNote(x.n, sig, bar);
    cur.push((x.tri ? "(3" : "") + grF(x.f) + body + (x.d === 1 || x.grp ? "" : x.d));
    len += x.grp ? (x.triEnd ? 2 : 0) : x.d;      // triola trzech ósemek trwa ćwierćnutę
    if (len >= barLen) { bars.push(cur.join(" ")); cur = []; len = 0; bar = new Map(); }
  }
  if (cur.length) bars.push(cur.join(" "));
  return bars;
}
const grRest = (n, len) => Array.from({length: n}, () => "z" + (len || 8));
function grAbcDoc(keyName, bpm, rh, lh, meter) {
  return `X:1\nM:${meter || "4/4"}\nL:1/8\nQ:1/4=${bpm}\nK:${keyName}\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] ${rh.join(" | ")} |]\n[V:LH] ${lh.join(" | ")} |]`;
}
// gama na 2 oktawy w górę i w dół ósemkami: 29 nut, ostatnia półnuta
function grScaleSeq(keyName, mode, oct, fingers) {
  const t = grTonic(keyName, oct), up = [], seq = [];
  for (let i = 0; i <= 14; i++) up.push(grDeg(t, mode, i));
  const dn = []; for (let i = 13; i >= 0; i--) dn.push(grDeg(t, mode === "mel" ? "nat" : mode, i));   // melodyczna w dół = naturalna
  const all = up.concat(dn);
  const fAll = fingers.concat(fingers.slice(0, 14).reverse());
  all.forEach((n, i) => seq.push({n, f: fAll[i], d: i === all.length - 1 ? 4 : 1}));
  return seq;
}
const FG = {
  rh: [1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 4, 5], lh: [5, 4, 3, 2, 1, 3, 2, 1, 4, 3, 2, 1, 3, 2, 1],
  rhF: [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 4],
  rhBb: [4, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 4], lhBb: [3, 2, 1, 4, 3, 2, 1, 3, 2, 1, 4, 3, 2, 1, 3]
};
function grFingers(keyName, hand) {
  if (keyName === "Bb") return hand === "r" ? FG.rhBb : FG.lhBb;
  if (keyName === "F" && hand === "r") return FG.rhF;
  return hand === "r" ? FG.rh : FG.lh;
}
const grRhOct = (keyName) => ("AB".includes(keyName[0]) ? 3 : 4);
function grScaleAbc(it) {
  const K = SR_KEYS[it.key], rh = grBars(grScaleSeq(it.key, it.mode, grRhOct(it.key), grFingers(it.key, "r")), K.sig);
  const lh = grBars(grScaleSeq(it.key, it.mode, 2, grFingers(it.key, "l")), K.sig);
  return grAbcDoc(it.key, it.bpm, rh.concat(grRest(lh.length)), grRest(rh.length).concat(lh));
}
// ruch przeciwny: oba kciuki na środkowym C, prawa w górę, lewa w dół, 2 oktawy i z powrotem
function grContraryAbc(it) {
  const K = SR_KEYS[it.key], t = grTonic(it.key, 4), f = FG.rh, fAll = f.concat(f.slice(0, 14).reverse());
  const r = [], l = [];
  for (let i = 0; i <= 14; i++) { r.push(grDeg(t, "maj", i)); l.push(grDeg(t, "maj", -i)); }
  const rs = r.concat(r.slice(0, 14).reverse()), ls = l.concat(l.slice(0, 14).reverse());
  return grAbcDoc(it.key, it.bpm,
    grBars(rs.map((n, i) => ({n, f: fAll[i], d: i === rs.length - 1 ? 4 : 1})), K.sig),
    grBars(ls.map((n, i) => ({n, f: fAll[i], d: i === ls.length - 1 ? 4 : 1})), K.sig));
}
// ręce razem w ruchu równoległym, jedna oktawa
function grParallelAbc(it) {
  const K = SR_KEYS[it.key], fr = [1, 2, 3, 1, 2, 3, 4, 5], fl = [5, 4, 3, 2, 1, 3, 2, 1];
  const mk = (oct, f) => { const t = grTonic(it.key, oct), up = []; for (let i = 0; i <= 7; i++) up.push(grDeg(t, "maj", i));
    const all = up.concat(up.slice(0, 7).reverse()), fa = f.concat(f.slice(0, 7).reverse());
    return all.map((n, i) => ({n, f: fa[i], d: i === all.length - 1 ? 2 : 1})); };
  return grAbcDoc(it.key, it.bpm, grBars(mk(grRhOct(it.key), fr), K.sig), grBars(mk(it.key[0] === "C" ? 3 : 2, fl), K.sig));
}
// chromatyczna na 1 oktawę: w górę z krzyżykami, w dół z bemolami; czarne – 3. palec
const SHARP_SP = [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [3, 0], [3, 1], [4, 0], [4, 1], [5, 0], [5, 1], [6, 0]];
const FLAT_SP = [[0, 0], [1, -1], [1, 0], [2, -1], [2, 0], [3, 0], [4, -1], [4, 0], [5, -1], [5, 0], [6, -1], [6, 0]];
function grChromSeq(keyName, oct, hand) {
  const start = grMidi(grTonic(keyName, oct)), seq = [];
  const ms = []; for (let i = 0; i <= 12; i++) ms.push(start + i); for (let i = 11; i >= 0; i--) ms.push(start + i);
  ms.forEach((m, i) => {
    const pc = m % 12, sp = (i <= 12 ? SHARP_SP : FLAT_SP)[pc], n = {li: sp[0], oct: Math.floor(m / 12) - 1, alt: sp[1]};
    const black = [1, 3, 6, 8, 10].includes(pc);
    let f = black ? 3 : hand === "r" ? ([0, 5].includes(pc) ? 2 : 1) : ([4, 11].includes(pc) ? 2 : 1);
    if (i === 0 || i === ms.length - 1) f = 1;
    seq.push({n, f, d: i === ms.length - 1 ? 8 : 1});
  });
  return seq;
}
function grChromAbc(it) {
  const rh = grBars(grChromSeq(it.key, 4, "r"), 0), lh = grBars(grChromSeq(it.key, it.key === "C" ? 3 : 2, "l"), 0);
  return grAbcDoc("C", it.bpm, rh.concat(grRest(lh.length)), grRest(rh.length).concat(lh));
}
// trójdźwięk toniczny: położenie zasadnicze, I i II przewrót, zasadnicze oktawę wyżej i z powrotem
function grTriadPos(keyName, oct) {
  const K = SR_KEYS[keyName], t = grTonic(keyName, oct), mode = K.minor ? "nat" : "maj";
  const r = grDeg(t, mode, 0), th = grDeg(t, mode, 2), fi = grDeg(t, mode, 4);
  const up = (n) => ({li: n.li, oct: n.oct + 1, alt: n.alt});
  return [[r, th, fi], [th, fi, up(r)], [fi, up(r), up(th)], [up(r), up(th), up(fi)]];
}
const TRI_F = {r: [[1, 3, 5], [1, 2, 5], [1, 3, 5], [1, 3, 5]], l: [[5, 3, 1], [5, 3, 1], [5, 2, 1], [5, 3, 1]]};
const grTriOct = (keyName, hand) => (hand === "r" ? grRhOct(keyName) : "CDEF".includes(keyName[0]) ? 3 : 2);
function grBrokenSeq(keyName, hand) {
  const P = grTriadPos(keyName, grTriOct(keyName, hand)), F = TRI_F[hand], seq = [];
  const group = (notes, fs) => notes.forEach((n, j) => seq.push({n, f: fs[j], d: 1, grp: true, tri: j === 0, triEnd: j === 2}));
  [0, 1, 2, 3].forEach(i => group(P[i], F[i]));
  [2, 1, 0].forEach(i => group([...P[i]].reverse(), [...F[i]].reverse()));
  seq.push({rest: true, d: 2});
  return seq;
}
function grBrokenAbc(it) {
  const sig = SR_KEYS[it.key].sig, rh = grBars(grBrokenSeq(it.key, "r"), sig), lh = grBars(grBrokenSeq(it.key, "l"), sig);
  return grAbcDoc(it.key, it.bpm, rh.concat(grRest(lh.length)), grRest(rh.length).concat(lh));
}
function grSolidSeq(keyName, hand) {
  const P = grTriadPos(keyName, grTriOct(keyName, hand)), seq = [];
  [0, 1, 2, 3, 2, 1].forEach(i => { seq.push({chord: P[i], d: 2}); seq.push({rest: true, d: 2}); });
  seq.push({chord: P[0], d: 4}); seq.push({rest: true, d: 4});
  return seq;
}
function grSolidAbc(it) {
  const sig = SR_KEYS[it.key].sig, rh = grBars(grSolidSeq(it.key, "r"), sig), lh = grBars(grSolidSeq(it.key, "l"), sig);
  return grAbcDoc(it.key, it.bpm, rh.concat(grRest(lh.length)), grRest(rh.length).concat(lh));
}

/* lista techniki: RCM Level 1 i 2 (gamy HS 2 oktawy ♩=69 / ♩=80, trójdźwięki rozłożone ♩=50/60, akordy ♩=100/112) */
const GR_MODE_PL = {maj: "", nat: "naturalna", harm: "harmoniczna", mel: "melodyczna"};
const GR_TECH = [];
function grAddTech(lvl, it) { it.lvl = lvl; GR_TECH.push(it); }
function grBuildTech() {
  const L = {g1: {sc: 69, br: 50, so: 100}, g2: {sc: 80, br: 60, so: 112}};
  const add = (lvl, majors, minors, forms) => {
    majors.forEach(k => grAddTech(lvl, {id: `${lvl}-sc-${k}`, grp: "Gamy", kind: "scale", key: k, mode: "maj", bpm: L[lvl].sc, name: SR_KEYS[k].pl}));
    minors.forEach(k => forms.forEach(f => grAddTech(lvl, {id: `${lvl}-sc-${k}-${f[0]}`, grp: "Gamy", kind: "scale", key: k, mode: f, bpm: L[lvl].sc, name: SR_KEYS[k].pl + " " + GR_MODE_PL[f]})));
  };
  add("g1", ["C", "G", "F"], ["Am", "Em", "Dm"], ["nat", "harm"]);
  grAddTech("g1", {id: "g1-cm-C", grp: "Inne", kind: "contrary", key: "C", bpm: 69, name: "C-dur w ruchu przeciwnym (ręce razem)"});
  grAddTech("g1", {id: "g1-ch-C", grp: "Inne", kind: "chrom", key: "C", bpm: 69, name: "Gama chromatyczna od C"});
  add("g2", ["G", "F", "Bb"], ["Em", "Dm", "Gm"], ["harm", "mel"]);
  grAddTech("g2", {id: "g2-pa-C", grp: "Inne", kind: "parallel", key: "C", bpm: 60, name: "C-dur ręce razem, 1 oktawa"});
  grAddTech("g2", {id: "g2-pa-G", grp: "Inne", kind: "parallel", key: "G", bpm: 60, name: "G-dur ręce razem, 1 oktawa"});
  grAddTech("g2", {id: "g2-ch-G", grp: "Inne", kind: "chrom", key: "G", bpm: 80, name: "Gama chromatyczna od G"});
  [["g1", ["C", "G", "F", "Am", "Em", "Dm"]], ["g2", ["G", "F", "Bb", "Em", "Dm", "Gm"]]].forEach(([lvl, keys]) => keys.forEach(k => {
    grAddTech(lvl, {id: `${lvl}-tr-${k}-b`, grp: "Trójdźwięki", kind: "broken", key: k, bpm: L[lvl].br, name: `${SR_KEYS[k].pl} – rozłożony`});
    grAddTech(lvl, {id: `${lvl}-tr-${k}-s`, grp: "Trójdźwięki", kind: "solid", key: k, bpm: L[lvl].so, name: `${SR_KEYS[k].pl} – akordy`});
  }));
}
grBuildTech();
const GR_TECH_TIPS = {
  scale: "Najpierw prawa ręka, potem lewa (każda ręka osobno, jak na egzaminie). Kciuk zaczyna iść pod dłoń, zanim będzie potrzebny. Na egzaminie z pamięci.",
  contrary: "Oba kciuki zaczynają na środkowym C. Obie ręce grają w tej samej chwili tym samym palcem – kciuki przechodzą razem.",
  chrom: "Czarne klawisze 3. palcem, białe kciukiem; w prawej ręce C i F gra 2. palec, w lewej E i H. Ręka blisko czarnych klawiszy.",
  parallel: "Ręce razem w tę samą stronę. Kciuki przechodzą w różnych miejscach – ćwicz bardzo wolno, z zatrzymaniem tam, gdzie przechodzi kciuk.",
  broken: "Trzy dźwięki na jedno uderzenie (triola). Ręka przesuwa się z położenia do położenia bez szarpnięcia. Najpierw prawa, potem lewa.",
  solid: "Wszystkie trzy palce trafiają w klawisze w tej samej chwili. W pauzie ręka unosi się lekko i przenosi na następne położenie."
};
const grTech = (id) => GR_TECH.find(t => t.id === id) || null;
const GR_ABC_CACHE = {};
function grTechAbc(it) {
  if (!GR_ABC_CACHE[it.id]) GR_ABC_CACHE[it.id] = ({scale: grScaleAbc, contrary: grContraryAbc, parallel: grParallelAbc, chrom: grChromAbc, broken: grBrokenAbc, solid: grSolidAbc})[it.kind](it);
  return GR_ABC_CACHE[it.id];
}
const grTechLvl = (lvl) => GR_TECH.filter(t => t.lvl === lvl);
function grTechReady(id) { const B = begS(); return !!(B.tech && B.tech[id]); }
function grTechShare(lvl) { const T = grTechLvl(lvl); return T.length ? T.filter(t => grTechReady(t.id)).length / T.length : 0; }
function grTechMark(id, val, fromPiano) {
  const B = begS(); if (!B.tech) B.tech = {};
  if (!!B.tech[id] === val) return;
  if (val) B.tech[id] = todayKey(); else delete B.tech[id];
  save(); header();
  document.querySelectorAll(`#view [data-techbtn="${id}"]`).forEach(el => { el.outerHTML = grTechBtn(id); });
  document.querySelectorAll(`#view [data-techpill="${id}"]`).forEach(el => { el.hidden = !val; });
  const it = grTech(id);
  if (val && it) toast((fromPiano ? "Zaliczone z pianinem: " : "Gotowe: ") + it.name, {label: "Cofnij", fn: () => grTechMark(id, false)});
}
const grTechBtn = (id) => grTechReady(id)
  ? `<button class="btn sm" data-act="g-tech-ready" data-id="${id}" data-techbtn="${id}">Gotowe ✓ (cofnij)</button>`
  : `<button class="btn sm ghost" data-act="g-tech-ready" data-id="${id}" data-techbtn="${id}">Umiem z pamięci w tempie ✓</button>`;
function grTechBody(it) {
  return `<div class="abc" data-abc="${it.id}:0"></div>
    <div class="row"><button class="btn sm" data-act="b-play" data-src="tech:${it.id}:0">▶ Posłuchaj</button><button class="btn sm ghost" data-act="b-stop">Stop</button>${mpUi("tech:" + it.id + ":0")}
    <p class="small muted" style="margin:0">${GR_TECH_TIPS[it.kind]} Tempo egzaminu: ♩ = ${it.bpm}.</p>
    <div class="row">${grTechBtn(it.id)}</div>`;
}
function grTechItemHtml(it, open) {
  return `<details class="piece"${open ? " open" : ""}><summary><span class="pn">${it.name}</span><span class="muted small mono">♩=${it.bpm}</span>
    <span class="pill own" data-techpill="${it.id}" ${grTechReady(it.id) ? "" : "hidden"}>gotowe</span></summary>
    <div class="stack" style="gap:8px;padding:2px 0 6px">${grTechBody(it)}</div></details>`;
}
function grTechListHtml(ids, openFirst) {
  const items = ids.map(grTech).filter(Boolean);
  return `<div class="pieces" style="padding:0">${items.map((it, i) => grTechItemHtml(it, openFirst && i === 0)).join("")}</div>`;
}
function grTechCardsHtml() {
  const cur = begLvl();
  return BEG_LVLS.filter(v => v.id !== "start").map(v => {
    const T = grTechLvl(v.id), ready = T.filter(t => grTechReady(t.id)).length;
    const groups = [...new Set(T.map(t => t.grp))];
    return `<details class="card"${v.id === cur ? " open" : ""}><summary><b>Technika ${v.name}</b> <span class="muted small">${ready}/${T.length} gotowe</span></summary>
      <div class="stack" style="margin-top:10px">
      <p class="small muted" style="margin:0">Wszystko, co jest na egzaminie RCM ${v.id === "g1" ? "Level 1" : "Level 2"}, z palcowaniem nad nutami. Z podłączonym pianinem ćwiczenie zalicza się samo: tryb „Z metronomem”, tempo egzaminu, co najmniej 90% w każdej kategorii. Bez pianina zaznacz je sam${gx("a", "")}, gdy grasz je z pamięci w tempie.</p>
      ${groups.map(g => `<h4 class="lvlhead">${g}</h4><div class="pieces" style="padding:0">${T.filter(t => t.grp === g).map(t => grTechItemHtml(t, false)).join("")}</div>`).join("")}
      </div></details>`;
  }).join("");
}
// na dziś: najpierw ćwiczenia jeszcze niegotowe (po kolei), potem powtórka gotowych
function grTechToday(lvl, key) {
  const T = grTechLvl(lvl), todo = T.filter(t => !grTechReady(t.id));
  if (!todo.length) return T.slice().sort((a, b) => hash(key + a.id) - hash(key + b.id)).slice(0, 2).map(t => t.id);
  const sc = todo.filter(t => t.grp !== "Trójdźwięki"), tr = todo.filter(t => t.grp === "Trójdźwięki");
  const out = []; if (sc.length) out.push(sc[0].id); if (tr.length) out.push(tr[0].id);
  if (out.length < 2 && todo.length > 1) out.push(todo.find(t => !out.includes(t.id)).id);
  return out;
}

/* ============================== LEKCJE ============================== */
const GR_LESSONS = [
/* ---------- GRADE 1 · ETAP 1 ---------- */
{id: "g1-1", etap: 5, title: "Witaj w Grade 1",
 short: "Czym jest Grade 1 w programie RCM i jak wygląda teraz plan dnia.",
 goal: "Wiesz, z jakich części składa się Grade 1, i znasz nowe bloki planu: technika, czytanie a vista i słuch.",
 body: `<p>Po kursie od zera idziemy dalej programem <b>RCM</b> (Royal Conservatory of Music z Kanady) – tym samym, w którym ćwiczy konto zaawansowane, tylko od pierwszego stopnia. Na każdym stopniu wymagania są te same co na egzaminie.</p>
 <p>Egzamin RCM Level 1 składa się z:</p>
 <ul><li><b>3 utworów</b> – po jednym z list A (barok i klasycyzm), B (romantyzm i muzyka współczesna) i C (inwencje: ręce naśladują się nawzajem),</li>
 <li><b>etiudy</b> – utworu, który ćwiczy jedną umiejętność techniczną,</li>
 <li><b>techniki</b>: gamy C-, G-, F-dur i a-, e-, d-moll na dwie oktawy, trójdźwięki z przewrotami, gama w ruchu przeciwnym i chromatyczna,</li>
 <li><b>słuchu</b>: tercja mała i wielka, akord durowy czy molowy, powtórzenie rytmu i krótkiej melodii,</li>
 <li><b>czytania a vista</b>: wystukanie rytmu i zagranie 4-taktowej melodii.</li></ul>
 <p>Plan dnia ma teraz bloki: <b>Technika</b> (gamy i trójdźwięki z nutami i palcowaniem), <b>Lekcja</b>, <b>Czytanie a vista</b> (za każdym razem nowe ćwiczenie), <b>Słuch</b>, <b>Utwór</b> i <b>Powtórka</b>. Z podłączonym pianinem aplikacja sprawdza gamy, utwory, czytanie a vista i powtarzanie melodii.</p>
 <p>Na jeden stopień zwykle potrzeba kilku miesięcy regularnej gry. Liczy się codzienny kontakt z klawiaturą, a nie tempo przerabiania lekcji.</p>`,
 piano: "Zagraj dwa utwory z kursu od zera, które lubisz najbardziej – na rozgrzewkę przed nowym materiałem.",
 check: [
   {q: "Ile utworów (oprócz etiudy) gra się na egzaminie Level 1?", opts: ["1", "3", "5"], ok: 1, why: "Po jednym z list A, B i C."},
   {q: "Czym wyróżnia się lista C?", opts: ["To utwory barokowe", "Ręce naśladują się nawzajem", "To utwory jazzowe"], ok: 1}
 ]},
{id: "g1-2", etap: 5, title: "Gama C-dur na dwie oktawy",
 short: "Kciuk przechodzi pod dłonią – dzięki temu gama płynie bez przerw przez dwie oktawy.",
 goal: "Grasz gamę C-dur na dwie oktawy każdą ręką osobno, równo, ósemkami w tempie ♩ = 69.",
 body: `<p>W kursie od zera gama C-dur miała jedną oktawę. Na egzaminie gra się <b>dwie oktawy w górę i w dół, każdą ręką osobno</b>, ósemkami – dwa dźwięki na jedno uderzenie metronomu, w tempie ♩ = 69.</p>
 <p><b>Prawa ręka</b> w górę: 1-2-3, kciuk pod dłonią, 1-2-3-4, kciuk pod dłonią, 1-2-3, 1-2-3-4-5. W dół odwrotnie: po kciuku przekładasz nad nim 3. albo 4. palec.</p>
 <p><b>Lewa ręka</b> w górę: 5-4-3-2-1, 3. palec nad kciukiem, 2-1, 4. palec nad kciukiem, 3-2-1, 3. palec, 2-1. W dół kciuk przechodzi pod dłonią.</p>
 <p>Najważniejsze: kciuk zaczyna iść pod dłoń, <b>zanim</b> będzie potrzebny – już wtedy, gdy grają 2. i 3. palec. Łokieć i nadgarstek płyną w bok, nie podskakują. Słuchaj, czy dźwięk grany kciukiem nie jest głośniejszy od innych.</p>`,
 tech: ["g1-sc-C"],
 piano: "Najpierw sam ruch kciuka: prawą ręką C-D-E-F i z powrotem, 10 razy, bardzo wolno. Potem cała gama z nut powyżej – w trybie „Nuty czekają”, a potem z metronomem na „Wolno”.",
 check: [
   {q: "Kiedy kciuk zaczyna przechodzić pod dłonią?", opts: ["Dopiero gdy ma zagrać", "Już podczas grania poprzednich palców", "Wcale – ręka przeskakuje"], ok: 1},
   {q: "Ile dźwięków na jedno uderzenie metronomu gra się w gamach Level 1?", opts: ["Jeden", "Dwa (ósemki)", "Cztery"], ok: 1}
 ]},
{id: "g1-3", etap: 5, title: "G-dur i F-dur: Fis i B",
 short: "Dwie nowe tonacje: G-dur z jednym krzyżykiem i F-dur z jednym bemolem.",
 goal: "Grasz gamy G-dur i F-dur na dwie oktawy każdą ręką osobno, nie zapominając o Fis i B.",
 body: `<p><b>G-dur</b> ma przy kluczu jeden krzyżyk: każde F gra się jako <b>Fis</b> (czarny klawisz tuż na prawo od F). Palcowanie jest takie samo jak w C-dur.</p>
 <p><b>F-dur</b> ma jeden bemol: każde H gra się jako <b>B</b> (czarny klawisz tuż na lewo od H). Prawa ręka ma tu inne palcowanie: <b>1-2-3-4</b>, kciuk pod dłonią, 1-2-3, kciuk, 1-2-3-4 – czwarty palec zawsze trafia na B. Lewa ręka gra jak w C-dur.</p>
 <p>Znaki przy kluczu obowiązują w całym utworze, na każdej wysokości. Częsty błąd na początku: o Fis pamiętasz w pierwszej oktawie, a w drugiej już nie.</p>`,
 tech: ["g1-sc-G", "g1-sc-F"],
 piano: "Zagraj tylko „inny” klawisz z każdej gamy we wszystkich oktawach: wszystkie Fis od dołu do góry, potem wszystkie B. Potem gamy z nut powyżej.",
 check: [
   {q: "Który dźwięk zmienia się w G-dur?", opts: ["F na Fis", "H na B", "C na Cis"], ok: 0},
   {q: "Którym palcem prawa ręka gra B w gamie F-dur?", opts: ["3", "4", "5"], ok: 1}
 ]},
{id: "g1-4", etap: 5, title: "Tonacje molowe: a, e, d",
 short: "Każda tonacja durowa ma równoległą molową. Gama molowa ma odmianę naturalną i harmoniczną.",
 goal: "Grasz gamy a-, e- i d-moll (naturalną i harmoniczną) każdą ręką osobno i słyszysz różnicę między nimi.",
 body: `<p>Moll brzmi ciemniej, smutniej niż dur. Tonacja molowa <b>równoległa</b> ma te same znaki przy kluczu co durowa i zaczyna się tercję małą niżej: <b>C-dur → a-moll</b>, <b>G-dur → e-moll</b>, <b>F-dur → d-moll</b>.</p>
 <ul><li><b>Molowa naturalna</b>: tylko znaki przy kluczu. a-moll to same białe klawisze od A do A.</li>
 <li><b>Molowa harmoniczna</b>: 7. stopień podwyższony o pół tonu – w a-moll <b>Gis</b>, w e-moll <b>Dis</b>, w d-moll <b>Cis</b>. Ten dźwięk mocno ciągnie do toniki, dlatego słychać go w prawie każdym utworze molowym.</li></ul>
 <p>Palcowanie we wszystkich trzech gamach jest takie samo jak w C-dur.</p>`,
 tech: ["g1-sc-Am-n", "g1-sc-Am-h", "g1-sc-Em-n", "g1-sc-Em-h", "g1-sc-Dm-n", "g1-sc-Dm-h"],
 piano: "Zagraj po kolei gamę C-dur i a-moll naturalną – to te same klawisze, tylko inny początek. Potem a-moll harmoniczną i posłuchaj, jak Gis zmienia brzmienie.",
 check: [
   {q: "Jaka tonacja molowa jest równoległa do G-dur?", opts: ["e-moll", "a-moll", "g-moll"], ok: 0},
   {q: "Co zmienia się w gamie molowej harmonicznej?", opts: ["3. stopień", "7. stopień jest podwyższony", "Nic"], ok: 1, why: "Np. w a-moll G zamienia się na Gis."}
 ]},
{id: "g1-5", etap: 5, title: "Trójdźwięki i przewroty",
 short: "Trójdźwięk toniczny w trzech położeniach: zasadniczym, w pierwszym i w drugim przewrocie.",
 goal: "Grasz trójdźwięki C, G, F, a, e, d rozłożone (♩ = 50) i jako akordy (♩ = 100) we wszystkich położeniach, każdą ręką osobno.",
 body: `<p>Trójdźwięk to trzy dźwięki co tercję, np. C-E-G. Gdy najniższy dźwięk przeniesiesz oktawę wyżej, powstaje <b>przewrót</b>:</p>
 <ul><li><b>położenie zasadnicze</b>: C-E-G (palce prawej ręki 1-3-5, lewej 5-3-1),</li>
 <li><b>I przewrót</b>: E-G-C (prawa 1-2-5, lewa 5-3-1),</li>
 <li><b>II przewrót</b>: G-C-E (prawa 1-3-5, lewa 5-2-1).</li></ul>
 <p>Na egzaminie grasz je <b>rozłożone</b> (po jednym dźwięku) i jako <b>akordy</b> – trzy dźwięki naraz, z pauzą między akordami. W aplikacji rozłożone są zapisane triolami: trzy dźwięki na jedno uderzenie metronomu. W akordzie wszystkie palce mają trafić w klawisze dokładnie w tej samej chwili.</p>
 <p>Trójdźwięk durowy (C-E-G) od molowego (A-C-E) różni się środkowym dźwiękiem: w durze od dołu jest tercja wielka (4 półtony), w mollu mała (3 półtony).</p>`,
 tech: ["g1-tr-C-b", "g1-tr-C-s", "g1-tr-Am-b", "g1-tr-Am-s"],
 piano: "Zagraj akord C-dur we wszystkich położeniach w górę i w dół, najpierw prawą ręką, potem lewą. Patrz, który palec gra górny dźwięk: w I przewrocie prawa ręka gra środkowy dźwięk 2. palcem, a nie 3.",
 check: [
   {q: "Który dźwięk jest na dole w I przewrocie C-dur?", opts: ["C", "E", "G"], ok: 1},
   {q: "Czym różni się trójdźwięk molowy od durowego?", opts: ["Środkowy dźwięk jest pół tonu niżej", "Górny dźwięk jest wyżej", "Niczym"], ok: 0}
 ]},
{id: "g1-6", etap: 5, title: "Ruch przeciwny i gama chromatyczna",
 short: "Gama C-dur obiema rękami naraz w przeciwnych kierunkach i gama ze wszystkich klawiszy po kolei.",
 goal: "Grasz gamę C-dur w ruchu przeciwnym na dwie oktawy i gamę chromatyczną od C każdą ręką osobno.",
 body: `<p><b>Ruch przeciwny</b>: oba kciuki zaczynają na środkowym C, prawa ręka idzie w górę, lewa w dół. Obie ręce grają w tej samej chwili <b>tym samym palcem</b> – kciuki przechodzą pod dłonią jednocześnie. To najłatwiejszy sposób grania gamy obiema rękami.</p>
 <p><b>Gama chromatyczna</b> idzie po wszystkich klawiszach, białych i czarnych, co pół tonu. Zasada palcowania: <b>czarne klawisze gra 3. palec</b>, białe kciuk. Tam, gdzie dwa białe leżą obok siebie (E-F i H-C), w prawej ręce F i C gra 2. palec, a w lewej E i H gra 2. palec.</p>
 <p>W górę zapisuje się ją krzyżykami (Cis, Dis…), w dół bemolami (B, As…) – to te same klawisze.</p>`,
 tech: ["g1-cm-C", "g1-ch-C"],
 piano: "Ruch przeciwny najpierw na jedną oktawę, bardzo wolno, patrząc, czy kciuki przechodzą razem. Gamę chromatyczną zagraj najpierw tylko na odcinku C–E palcami 1-3-1-3-1.",
 check: [
   {q: "Którym palcem gra się czarne klawisze w gamie chromatycznej?", opts: ["1", "2", "3"], ok: 2},
   {q: "Co jest wspólne dla obu rąk w ruchu przeciwnym?", opts: ["Kierunek", "Numer palca w tej samej chwili", "Nic"], ok: 1}
 ]},
/* ---------- GRADE 1 · ETAP 2 ---------- */
{id: "g1-7", etap: 6, title: "Trzy listy utworów i etiuda",
 short: "Barok i klasycyzm, romantyzm i muzyka współczesna, inwencje – każdy styl gra się trochę inaczej.",
 goal: "Rozpoznajesz styl utworu i wiesz, na co uważać w każdej liście. Zaczynasz pierwszy utwór Grade 1.",
 body: `<p>Na egzaminie gra się trzy różne utwory, żeby pokazać różne umiejętności:</p>
 <ul><li><b>Lista A – barok i klasycyzm</b> (Bach, Mozart, Haydn, Türk): menuety, tańce, sonatiny. Równe tempo, lekkie, wyraźne nuty, prawie bez pedału. Frazy jak zdania: pytanie i odpowiedź.</li>
 <li><b>Lista B – romantyzm i muzyka XX i XXI wieku</b> (Gurlitt, Czajkowski, kompozytorzy współcześni): melodia „śpiewa”, akompaniament cichszy, więcej dynamiki i nastroju.</li>
 <li><b>Lista C – inwencje</b>: obie ręce są równie ważne i <b>naśladują się nawzajem</b> – jedna zaczyna motyw, druga go powtarza.</li></ul>
 <p><b>Etiuda</b> to utwór, który ćwiczy jedną rzecz techniczną: rozłożone akordy, gamę w melodii, staccato.</p>
 <p>W zakładce Utwory są utwory Grade 1 w każdym stylu – z nutami, odsłuchem i sprawdzaniem przez pianino – a pod nimi utwory z prawdziwego programu RCM, które można pobrać za darmo z IMSLP, i utwory z książek, które masz w domu.</p>`,
 piano: "Posłuchaj w aplikacji „Menuetu C-dur” i „Echa”. Który to lista A, a który lista C? Zacznij naukę jednego z nich.",
 check: [
   {q: "Co jest charakterystyczne dla listy C?", opts: ["Ręce naśladują się nawzajem", "Dużo pedału", "Szybkie oktawy"], ok: 0},
   {q: "Z jakiego okresu są utwory z listy A?", opts: ["Barok i klasycyzm", "Romantyzm", "Jazz"], ok: 0}
 ]},
{id: "g1-8", etap: 6, title: "Artykulacja: legato, staccato, łuki",
 short: "Kropka nad nutą to staccato – krótko. Łuk to legato – płynnie, bez przerw między dźwiękami.",
 goal: "Grasz staccato lekko z nadgarstka, a legato bez przerw, i umiesz je zmieniać w jednym utworze.",
 body: `<p><b>Legato</b> (łuk nad nutami): palec puszcza klawisz dokładnie w chwili, gdy następny go naciska. Dźwięki łączą się jak w śpiewie.</p>
 <p><b>Staccato</b> (kropka nad lub pod nutą): dźwięk krótki, mniej więcej o połowę krótszy. Ruch idzie z nadgarstka, jak lekkie odbicie piłki, a nie z całej ręki. Staccato nie znaczy głośno.</p>
 <p><b>Łuk frazowy</b> obejmuje całą myśl muzyczną; na jego końcu lekko unieś rękę, jak przy oddechu. <b>Akcent</b> (&gt;) to jedna nuta mocniej.</p>
 <p>Z pianinem w trybie „Z metronomem” aplikacja nie liczy krótkich nut staccato jako błędu długości – ale nuty legato puszczone za wcześnie zaznaczy.</p>`,
 abc: [{src: H4 + "Q:1/4=80\nK:C\n(C D E F) | .G .G .G2 | (A G F E) | .D .D .D2 | (E F G E) | .F .E .D2 | (E D C D) | C4 |]", cap: "Na zmianę: legato pod łukiem i staccato z kropkami. W 3. takcie 5. palec sięga do A."}],
 piano: "Zagraj ćwiczenie powyżej. Potem tę samą melodię odwrotnie: łuki zamień na staccato, a staccato na legato.",
 check: [
   {q: "Co oznacza kropka nad nutą?", opts: ["Głośno", "Krótko – staccato", "Trzymaj dłużej"], ok: 1},
   {q: "Skąd idzie ruch w staccato?", opts: ["Z nadgarstka, lekko", "Z ramienia, mocno", "Z łokcia"], ok: 0}
 ]},
{id: "g1-9", etap: 6, title: "Słuch: tercje, dur i moll",
 short: "Na egzaminie rozpoznajesz tercję małą i wielką, akord durowy i molowy, powtarzasz rytm i krótką melodię.",
 goal: "Rozpoznajesz tercję małą i wielką oraz akord durowy i molowy w co najmniej 8 na 10 pytań.",
 body: `<p><b>Tercja wielka</b> (C–E, 4 półtony) brzmi jasno – to dół akordu durowego. <b>Tercja mała</b> (E–G albo C–Es, 3 półtony) brzmi ciemniej; w dół to „ku-ku” kukułki i początek „Wlazł kotek na płotek” (G–E).</p>
 <p>Akord <b>durowy</b> brzmi jasno i stabilnie, <b>molowy</b> – ciemniej, smutniej. Różnica to właśnie tercja na dole akordu. Na egzaminie Level 1 egzaminator gra akord najpierw rozłożony, potem razem.</p>
 <p><b>Powtarzanie rytmu</b>: egzaminator gra krótką melodię dwa razy, a Ty ją klaszczesz lub stukasz. <b>Powtarzanie melodii</b>: 5 dźwięków z pierwszych pięciu stopni gamy (C-dur, G-dur lub a-moll), zaczynających się od toniki albo od 5. stopnia.</p>
 <p>Blok „Słuch” w planie dnia ćwiczy wszystkie cztery rzeczy. Melodię możesz zagrać na podłączonym pianinie – aplikacja sama sprawdzi dźwięki.</p>`,
 piano: "Zagraj na pianinie C–E (tercja wielka) i C–Es (tercja mała), w górę i w dół, i zaśpiewaj je. Potem akordy C-E-G i C-Es-G – posłuchaj różnicy.",
 check: [
   {q: "Ile półtonów ma tercja mała?", opts: ["2", "3", "4"], ok: 1},
   {q: "Który akord brzmi jaśniej?", opts: ["Durowy", "Molowy"], ok: 0}
 ]},
{id: "g1-10", etap: 6, title: "Czytanie a vista jak na egzaminie",
 short: "Rytm do wystukania i 4-taktowa melodia podzielona między ręce. Najważniejsze: nie zatrzymywać się.",
 goal: "Czytasz nowe ćwiczenie z bloku „Czytanie a vista” bez zatrzymywania, w równym tempie.",
 body: `<p>Na egzaminie są dwie części: <b>rytm</b> – stukasz równy puls (np. stopą), a ręką wystukujesz zapisany rytm; i <b>granie</b> – krótka melodia w C-, G-, F-dur albo a-moll, podzielona między ręce.</p>
 <p>Przed graniem masz chwilę na przegląd. Sprawdź po kolei:</p>
 <ol><li><b>tonację</b> – znaki przy kluczu,</li><li><b>metrum</b> – ile uderzeń w takcie,</li><li><b>pierwszą nutę i palec</b> każdej ręki,</li><li><b>rytm</b> – najkrótsze nuty i pauzy,</li><li><b>powtórzenia</b> – często takt 3 jest podobny do 1.</li></ol>
 <p>Potem graj <b>wolno i bez zatrzymywania</b>. Pomyłka? Graj dalej – na egzaminie liczy się ciągłość. W trybie „Z metronomem” aplikacja odlicza takt, a potem idzie dalej, nawet gdy się pomylisz – dokładnie jak na egzaminie.</p>`,
 piano: "Zrób dziś blok „Czytanie a vista” w planie: 30 sekund przeglądu według listy powyżej, potem jedno podejście z metronomem na „Wolno”.",
 check: [
   {q: "Co robisz po pomyłce w czytaniu a vista?", opts: ["Zaczynasz od nowa", "Grasz dalej w tempie", "Poprawiasz nutę"], ok: 1},
   {q: "Co sprawdzasz najpierw?", opts: ["Tonację i metrum", "Tytuł", "Tempo nagrania"], ok: 0}
 ]},
{id: "g1-11", etap: 6, title: "Pamięć i występ: próbny egzamin",
 short: "Technikę gra się z pamięci, a utwory z pamięci dają dodatkowe punkty. Jak się tego nauczyć i jak zrobić próbny egzamin.",
 goal: "Grasz z pamięci całą technikę Grade 1 i trzy utwory, a potem robisz próbny egzamin od początku do końca.",
 body: `<p>Na egzaminie <b>technikę gra się zawsze z pamięci</b>, a za każdy utwór zagrany bez nut są 2 dodatkowe punkty. Do zaliczenia trzeba 60 na 100 punktów: utwory 56, technika 24 (etiuda 12, gamy i akordy 12), słuch 10, czytanie a vista 10.</p>
 <p>Jak uczyć się na pamięć:</p>
 <ul><li><b>po fragmentach</b> – po 2 takty, potem łącz,</li><li><b>każda ręka osobno</b> z pamięci,</li><li><b>punkty startu</b> – umiesz zacząć od początku każdej frazy, nie tylko od początku utworu,</li><li><b>bez instrumentu</b> – wyobraź sobie palce, nuty i dźwięk.</li></ul>
 <p><b>Próbny egzamin</b>: wybierz trzy utwory (A, B, C) i etiudę, zagraj je po kolei bez powtórek, potem kilka gam i trójdźwięków z listy, blok słuchu i jedno ćwiczenie a vista. Najlepiej nagraj się telefonem i posłuchaj później.</p>
 <p>W aplikacji Grade 1 jest ukończony, gdy wszystkie lekcje są odhaczone, utwory opanowane, a technika ma znak „gotowe”.</p>`,
 piano: "Zagraj z pamięci gamy C-, G- i F-dur. Potem jeden utwór Grade 1 najpierw z nut, a drugi raz z pamięci.",
 check: [
   {q: "Czy technikę na egzaminie gra się z nut?", opts: ["Tak", "Nie, zawsze z pamięci"], ok: 1},
   {q: "Ile punktów trzeba do zaliczenia egzaminu RCM?", opts: ["50", "60", "80"], ok: 1}
 ]},
/* ---------- GRADE 2 · ETAP 1 ---------- */
{id: "g2-1", etap: 7, title: "Co nowego w Grade 2",
 short: "Nowe tonacje, szybsze tempo techniki, ręce razem w gamach i trochę trudniejszy słuch.",
 goal: "Wiesz, co zmienia się w Grade 2, i zaczynasz pierwszą gamę i pierwszy utwór.",
 body: `<p>Grade 2 (RCM Level 2) ma ten sam układ co Grade 1: trzy utwory z list A, B i C, etiuda, technika, słuch i czytanie a vista. Zmienia się poziom:</p>
 <ul><li><b>Gamy</b> na dwie oktawy, każda ręka osobno, ♩ = 80: G-, F- i <b>B-dur</b>, e-, d- i <b>g-moll</b> – harmoniczne i <b>melodyczne</b>.</li>
 <li><b>Ręce razem</b>: gamy C- i G-dur na dwie oktawy (tzw. wzór formuły).</li>
 <li><b>Gama chromatyczna</b> od G, każda ręka osobno.</li>
 <li><b>Trójdźwięki</b> G, F, B, e, d, g: rozłożone ♩ = 60, akordy ♩ = 112.</li>
 <li><b>Słuch</b>: dochodzi kwinta czysta; akord dur/moll słyszysz raz, od razu jako akord; melodie w G-dur, F-dur i d-moll.</li>
 <li><b>Czytanie a vista</b>: melodia może wychodzić poza pozycję pięciu palców, dochodzi d-moll.</li></ul>
 <p>Utwory są dłuższe, z akompaniamentem w lewej ręce (bas walcowy, bas Albertiego), rytmem z kropką i większą dynamiką.</p>`,
 piano: "Zagraj z pamięci gamy G-dur i F-dur z Grade 1, ale szybciej: metronom na 80, dwa dźwięki na uderzenie.",
 check: [
   {q: "Jaka nowa tonacja durowa dochodzi w Grade 2?", opts: ["D-dur", "B-dur", "A-dur"], ok: 1},
   {q: "Jaki interwał dochodzi w słuchu?", opts: ["Kwinta czysta", "Sekunda mała", "Septyma"], ok: 0}
 ]},
{id: "g2-2", etap: 7, title: "B-dur i g-moll: dwa bemole",
 short: "B i Es przy kluczu. Prawa ręka zaczyna gamę B-dur czwartym palcem.",
 goal: "Grasz gamy B-dur i g-moll harmoniczną każdą ręką osobno, z dobrym palcowaniem.",
 body: `<p><b>B-dur</b> ma dwa bemole: <b>B i Es</b>. Równoległa molowa to <b>g-moll</b> (te same znaki przy kluczu).</p>
 <p>Palcowanie B-dur jest inne niż w gamach od białego klawisza: kciuki grają zawsze na białych klawiszach <b>C i F</b>. Prawa ręka: <b>4</b> (B), 1-2-3 (C-D-Es), 1-2-3-4 (F-G-A-B), dalej tak samo. Lewa ręka: 3-2-1 (B-C-D), 4-3-2-1 (Es-F-G-A), 3 (B), dalej tak samo.</p>
 <p>Kciuk na białym klawiszu, długie palce na czarnych – ręka leży naturalnie, bez wykręcania. Ta zasada pomaga w każdej gamie z czarnymi klawiszami.</p>
 <p><b>g-moll harmoniczna</b>: B i Es przy kluczu, a 7. stopień podwyższony – <b>Fis</b>. Palcowanie jak w C-dur.</p>`,
 tech: ["g2-sc-Bb", "g2-sc-Gm-h"],
 piano: "Znajdź wszystkie B i Es na klawiaturze. Potem gama B-dur prawą ręką tylko od B do F (palce 4-1-2-3-1), dziesięć razy, aż kciuk sam trafia na C.",
 check: [
   {q: "Jakie znaki ma B-dur?", opts: ["B i Es", "Fis i Cis", "Tylko B"], ok: 0},
   {q: "Na jakich klawiszach grają kciuki w gamie B-dur?", opts: ["Na B i Es", "Na C i F", "Na dowolnych"], ok: 1}
 ]},
{id: "g2-3", etap: 7, title: "Gama molowa melodyczna",
 short: "W górę podwyższony 6. i 7. stopień, w dół jak naturalna.",
 goal: "Grasz gamy e-, d- i g-moll harmoniczne i melodyczne każdą ręką osobno i nie mylisz odmian.",
 body: `<p>Trzy odmiany gamy molowej na przykładzie e-moll (Fis przy kluczu):</p>
 <ul><li><b>naturalna</b>: E Fis G A H C D E,</li>
 <li><b>harmoniczna</b>: podwyższony 7. stopień – <b>Dis</b> – w górę i w dół,</li>
 <li><b>melodyczna</b>: w górę podwyższony 6. i 7. stopień – <b>Cis i Dis</b>, a w dół wraca do naturalnej (D, C).</li></ul>
 <p>W d-moll melodycznej w górę grasz <b>H i Cis</b>, w dół <b>C i B</b>. W g-moll w górę <b>E i Fis</b>, w dół <b>F i Es</b>.</p>
 <p>Melodyczną łatwo zapamiętać słuchem: w górę brzmi prawie jak dur, w dół jak naturalna.</p>`,
 tech: ["g2-sc-Em-h", "g2-sc-Em-m", "g2-sc-Dm-h", "g2-sc-Dm-m", "g2-sc-Gm-m"],
 piano: "Zagraj tylko górną połowę e-moll melodycznej: H Cis Dis E w górę i E D C H w dół. Powtórz 5 razy, mówiąc nazwy dźwięków.",
 check: [
   {q: "Które stopnie podwyższa się w gamie melodycznej w górę?", opts: ["Tylko 7.", "6. i 7.", "3."], ok: 1},
   {q: "Jak gra się gamę melodyczną w dół?", opts: ["Jak naturalną", "Jak harmoniczną", "Tak samo jak w górę"], ok: 0}
 ]},
{id: "g2-4", etap: 7, title: "Akompaniament: bas walcowy i bas Albertiego",
 short: "Lewa ręka przestaje grać pojedyncze nuty: „um-pa-pa” w walcu i rozłożony akord w klasycyzmie.",
 goal: "Lewa ręka gra bas walcowy i bas Albertiego równo i ciszej niż melodia, a prawa śpiewa nad nią.",
 body: `<p><b>Bas walcowy</b> (metrum 3/4): na „raz” niski dźwięk, na „dwa” i „trzy” cichsze dwudźwięki wyżej. „Raz” jest lekko zaznaczony, „dwa, trzy” lekkie jak oddech.</p>
 <p><b>Bas Albertiego</b> (klasycyzm, sonatiny): akord rozłożony w kolejności <b>dół – góra – środek – góra</b>, np. F-C-A-C. Kciuk powtarza górny dźwięk, ręka jest nieruchoma, ruch idzie z palców. Brzmi równo jak szmer i nigdy nie jest głośniejszy od melodii.</p>
 <p>Ćwicz najpierw samą lewą rękę, potem dodaj melodię i <b>słuchaj melodii</b> – lewa ręka ma być tłem.</p>`,
 abc: [
   {src: "X:1\nM:4/4\nL:1/8\nQ:1/4=72\nK:F\nV:LH clef=bass\n!5!F,!1!C!3!A,C F,CA,C | !5!E,!1!B,!2!G,B, E,B,G,B, | !5!F,!1!D!2!B,D F,DB,D | F,CA,C F,4 |]", cap: "Bas Albertiego: akordy F-dur, C7, B-dur i F-dur."},
   {src: "X:1\nM:3/4\nL:1/4\nQ:1/4=96\nK:Em\nV:LH clef=bass\n!5!E, [G,B,] [G,B,] | B,, [^D,A,] [^D,A,] | E, [G,B,] [G,B,] | B,, [^D,F,] [^D,F,] | E,3 |]", cap: "Bas walcowy w e-moll: na „raz” 5. palec, na „dwa, trzy” lekkie dwudźwięki."}
 ],
 piano: "Lewa ręka sama: bas Albertiego z nut powyżej, 4 razy, tak cicho, jak potrafisz, ale równo. Potem bas walcowy.",
 check: [
   {q: "W jakiej kolejności gra się dźwięki w basie Albertiego?", opts: ["dół – góra – środek – góra", "dół – środek – góra", "góra – dół – góra"], ok: 0},
   {q: "Która ręka powinna być głośniejsza?", opts: ["Akompaniament", "Melodia"], ok: 1}
 ]},
{id: "g2-5", etap: 7, title: "Ręce razem w gamie i chromatyka od G",
 short: "Gama obiema rękami w tę samą stronę – najpierw jedna oktawa, potem dwie.",
 goal: "Grasz gamy C- i G-dur obiema rękami razem na jedną oktawę równo, a gamę chromatyczną od G każdą ręką osobno.",
 body: `<p>W ruchu równoległym ręce idą w tę samą stronę, ale <b>kciuki przechodzą w różnych miejscach</b>. W C-dur w górę prawa ręka podkłada kciuk na F, a lewa przekłada 3. palec nad kciukiem na A.</p>
 <p>Ćwicz tak: każda ręka osobno, potem razem bardzo wolno, z zatrzymaniem w miejscu, gdzie przechodzi kciuk. Gdy jedna oktawa idzie równo, przejdź na dwie oktawy.</p>
 <p>Na egzaminie Level 2 gamy C- i G-dur gra się obiema rękami na dwie oktawy we <b>wzorze formuły</b>, który łączy ruch równoległy z przeciwnym. Dokładny przebieg jest w zeszycie RCM „Technical Requirements for Piano, Level 2”; w aplikacji ćwiczysz osobno ruch równoległy i przeciwny – to te same ruchy palców.</p>
 <p><b>Chromatyka od G</b>: te same zasady co od C – czarne klawisze 3. palcem; w prawej ręce C i F gra 2. palec, w lewej E i H.</p>`,
 tech: ["g2-pa-C", "g2-pa-G", "g2-ch-G"],
 piano: "Ręce razem, C-dur, jedna oktawa, metronom na 50 – jeden dźwięk na uderzenie. Zatrzymaj się na F (prawa) i A (lewa) i sprawdź, czy palce są gotowe.",
 check: [
   {q: "Gdzie prawa ręka podkłada kciuk w C-dur w górę?", opts: ["Na F", "Na G", "Na D"], ok: 0},
   {q: "Gdzie lewa ręka przekłada 3. palec nad kciukiem w C-dur w górę?", opts: ["Na A", "Na F", "Na E"], ok: 0}
 ]},
/* ---------- GRADE 2 · ETAP 2 ---------- */
{id: "g2-6", etap: 8, title: "Rytm z kropką i pauzy",
 short: "Ćwierćnuta z kropką i ósemka, pauzy w środku frazy.",
 goal: "Grasz i wystukujesz rytmy z kropką równo z metronomem, a pauzy trwają pełną wartość.",
 body: `<p>Kropka wydłuża nutę o połowę. <b>Ćwierćnuta z kropką</b> trwa półtora uderzenia, a ósemka po niej – pół: „taaa-ta”. Licz ósemkami: „raz-i-dwa-<b>i</b>” – ósemka wypada na „i” po drugim uderzeniu.</p>
 <p>W „Greensleeves” (zakładka Utwory) ten rytm wraca prawie w każdym takcie.</p>
 <p><b>Pauza</b> to nie przerwa w liczeniu – liczysz dalej, a ręka się unosi. Gdy jedna ręka ma pauzę, druga gra dalej równo.</p>`,
 abc: [{src: "X:1\nM:3/4\nL:1/8\nQ:1/4=72\nK:C\nC3 D E2 | F3 E D2 | E3 F G2 | z2 G2 z2 | G3 F E2 | F3 E D2 | E3 D D2 | C6 |]", cap: "Ćwierćnuta z kropką i ósemka na każdym „raz”. W 4. takcie pauzy – liczysz dalej."}],
 piano: "Wystukaj rytm ćwiczenia na kolanie, licząc ósemkami na głos. Potem zagraj je z metronomem na „Wolno”.",
 check: [
   {q: "Ile uderzeń trwa ćwierćnuta z kropką?", opts: ["1", "1,5", "2"], ok: 1},
   {q: "Co robisz w czasie pauzy?", opts: ["Przestajesz liczyć", "Liczysz dalej", "Czekasz, aż ręka będzie gotowa"], ok: 1}
 ]},
{id: "g2-7", etap: 8, title: "Frazowanie i dynamika",
 short: "Crescendo, diminuendo i fraza, która prowadzi do najważniejszej nuty.",
 goal: "W każdym utworze Grade 2 słychać co najmniej trzy poziomy głośności i kierunek fraz.",
 body: `<p>Dynamika: <b>p</b> (cicho), <b>mp</b>, <b>mf</b>, <b>f</b> (głośno). <b>Crescendo</b> (&lt;) – stopniowo głośniej, <b>diminuendo</b> (&gt;) – stopniowo ciszej.</p>
 <p>Fraza to muzyczne zdanie, zwykle 2 lub 4 takty. Ma <b>szczyt</b> – najwyższą albo najdłuższą nutę – i do niego prowadzi crescendo, a po nim fraza opada. Koniec frazy gra się ciszej, jak koniec zdania.</p>
 <p>Pianino cyfrowe reaguje na siłę uderzenia jak akustyczne. W Narzędziach → Pianino przez USB widać siłę każdego uderzenia (0–127) – dobry sposób, żeby sprawdzić, czy p i f naprawdę się różnią.</p>
 <p>Ćwicz tak: zaśpiewaj frazę i zaznacz ołówkiem, gdzie jest szczyt. Zagraj ją, prowadząc do niego, a potem nagraj się i posłuchaj.</p>`,
 piano: "Zagraj „Walc e-moll”: pierwsza fraza mf, druga p, trzecia f. Nagraj się telefonem i posłuchaj, czy różnice są słyszalne.",
 check: [
   {q: "Co oznacza crescendo?", opts: ["Stopniowo głośniej", "Stopniowo ciszej", "Szybciej"], ok: 0},
   {q: "Jak zwykle kończy się fraza?", opts: ["Głośnym akcentem", "Ciszej, jak koniec zdania", "Przyspieszeniem"], ok: 1}
 ]},
{id: "g2-8", etap: 8, title: "Słuch: kwinta i akordy od razu",
 short: "Do tercji dochodzi kwinta czysta. Akord dur czy moll słyszysz od razu jako akord.",
 goal: "Rozpoznajesz tercję małą, wielką i kwintę oraz akord dur/moll w co najmniej 8 na 10 pytań i powtarzasz 5-dźwiękowe melodie w G-dur, F-dur i d-moll.",
 body: `<p><b>Kwinta czysta</b> (C–G, 7 półtonów) brzmi pusto i mocno. To skok z początku „Błyszcz, gwiazdko” z kursu od zera: C C G G.</p>
 <p>Gdy słyszysz dwa dźwięki: szeroko i pusto – kwinta; blisko i jasno – tercja wielka; blisko i ciemno – tercja mała.</p>
 <p>W Grade 2 akord dur/moll egzaminator gra tylko raz, od razu jako akord (bez rozłożenia). Skup się na barwie: jasna czy ciemna.</p>
 <p>Powtarzanie melodii: 5 dźwięków w G-dur, F-dur lub d-moll, zaczynających się od toniki albo od 5. stopnia. Najpierw zaśpiewaj ją w myślach, potem zagraj.</p>`,
 piano: "Zagraj kwintę C–G, tercję C–E i tercję C–Es, każdą kilka razy, i zaśpiewaj każdy interwał.",
 check: [
   {q: "Ile półtonów ma kwinta czysta?", opts: ["5", "7", "8"], ok: 1},
   {q: "Jak brzmi kwinta czysta?", opts: ["Pusto i mocno", "Ciemno i smutno", "Ostro, zgrzytliwie"], ok: 0}
 ]},
{id: "g2-9", etap: 8, title: "Czytanie a vista poza pozycją",
 short: "Melodia nie mieści się już w pięciu palcach – trzeba przewidzieć zmianę pozycji.",
 goal: "Czytasz 8-taktowe ćwiczenia z bloku „Czytanie a vista” w równym tempie, przenosząc rękę bez zatrzymania.",
 body: `<p>W Grade 2 melodie wychodzą poza pięć klawiszy. Zanim zaczniesz, znajdź <b>najwyższą i najniższą nutę</b> każdej ręki – od nich zależy, gdzie położyć dłoń.</p>
 <ul><li>Pozycję najlepiej zmieniać na <b>pauzie albo długiej nucie</b> – tam ręka ma czas.</li>
 <li>Czytaj <b>kierunek i odległość</b> (krok, skok o tercję, o kwintę), a nie każdą nutę z nazwy.</li>
 <li>Oczy pół taktu do przodu: grając jeden takt, już patrz na następny.</li>
 <li>Nie patrz na ręce – odległość wyczuwasz dotykiem, np. po grupach czarnych klawiszy.</li></ul>
 <p>Nowa tonacja: <b>d-moll</b> (B przy kluczu, często Cis przed nutą).</p>`,
 piano: "Blok „Czytanie a vista”: przed graniem znajdź miejsca, gdzie ręka się przesuwa. Graj z metronomem na „Wolno” – wynik z pianina pokaże, które takty sprawiły kłopot.",
 check: [
   {q: "Gdzie najlepiej zmienić pozycję ręki?", opts: ["W środku szybkiego biegu", "Na pauzie albo długiej nucie", "Nigdy"], ok: 1},
   {q: "Gdzie patrzysz w czasie grania?", opts: ["Na ręce", "Pół taktu do przodu w nutach", "Na metronom"], ok: 1}
 ]},
{id: "g2-10", etap: 8, title: "Próbny egzamin Grade 2 i co dalej",
 short: "Sprawdź się jak na egzaminie i zobacz, co czeka w Grade 3.",
 goal: "Robisz próbny egzamin Grade 2, a utwory, technika i słuch tego poziomu są opanowane.",
 body: `<p>Próbny egzamin jak w Grade 1: trzy utwory (A, B, C) i etiuda bez powtórek, kilka gam i trójdźwięków z listy techniki, blok słuchu i jedno ćwiczenie a vista. Najlepiej nagraj całość.</p>
 <p>Oceń uczciwie:</p>
 <ul><li>czy w utworach słychać różne style i dynamikę,</li><li>czy gamy są równe w tempie ♩ = 80,</li><li>czy w czytaniu a vista nie zatrzymujesz się.</li></ul>
 <p><b>Grade 3</b> (następny etap aplikacji): gamy na dwie oktawy obiema rękami razem, arpeggia, dłuższe utwory – np. Menuet G-dur Petzolda w pełnej wersji – i najłatwiejsze etiudy Burgmüllera z op. 100 (np. nr 1 „La candeur”), którą macie w domu.</p>`,
 piano: "Zrób próbny egzamin: wybierz utwory, ustaw telefon do nagrywania i zagraj całość bez przerw.",
 check: [
   {q: "Co powinno być słychać w trzech utworach egzaminacyjnych?", opts: ["Ten sam styl", "Różne style i dynamikę", "Jak najszybsze tempo"], ok: 1}
 ]}
];
GR_LESSONS.forEach(l => { BEG_LESSONS.push(l); LESSONS[l.id] = l; });

/* ============================== UTWORY ============================== */
const L8 = (m, q, k) => `X:1\nM:${m}\nL:1/8\nQ:1/4=${q}\nK:${k}\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n`;
const L4 = (m, q, k) => `X:1\nM:${m}\nL:1/4\nQ:1/4=${q}\nK:${k}\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n`;
const GR_PIECES = [
/* ---------- GRADE 1 ---------- */
 {id: "gp-gama", lvl: "g1", need: "g1-2", list: "etiuda", name: "Etiuda: gama w melodii", by: "etiuda z aplikacji", hands: "obie ręce", pos: "C-dur, ósemki, kciuk pod dłonią",
  abc: L8("4/4", 72, "C") + "[V:RH] !mp! !1!C !2!D !3!E !1!F !2!G !3!A !4!B !1!c | !2!d !1!c !3!B !2!A !1!G4 | !1!A B c d e d c B | c8 | e8 | d4 B4 | c4 B4 | c8 |]\n[V:LH] !5!C,4 !3!E,4 | !1!G,4 G,,4 | F,,4 G,,4 | C,8 | !1!C, !2!B,, !3!A,, !1!G,, !2!F,, !3!E,, !4!D,, !5!C,, | G,,8 | C,4 G,,4 | C,,8 |]",
  tips: ["Takt 1: kciuk przechodzi pod dłonią na F. Takt 2: 3. palec nad kciukiem na H.", "W 5. takcie gamę przejmuje lewa ręka, a prawa trzyma długie E.", "Równe ósemki są ważniejsze niż tempo."]},
 {id: "gp-wiecz", lvl: "g1", need: "g1-4", list: "lista B", name: "Wieczorna piosenka", by: "utwór z aplikacji · w stylu listy B", hands: "obie ręce", pos: "a-moll, legato",
  abc: L4("4/4", 72, "Am") + "[V:RH] !p! !1!A B c d | !5!e4 | (d c B c) | A4 | !mf! c d e d | (c B A B) | !p! c B A B | A4 |]\n[V:LH] !5!A,,2 !1!E,2 | !3!C,2 E,2 | !4!B,,2 !2!D,2 | A,,2 C,2 | A,,2 E,2 | D,2 C,2 | B,,2 E,2 | A,,4 |]",
  tips: ["Obie ręce w pozycji A: prawa od A, lewa od A dwie oktawy niżej. Nie przesuwasz dłoni.", "Legato: palec puszcza klawisz dopiero, gdy następny gra.", "Takty 5–6 mf, potem znów p – na koniec jeszcze ciszej."]},
 {id: "gp-etg", lvl: "g1", need: "g1-5", list: "etiuda", name: "Etiuda: rozłożone akordy", by: "etiuda z aplikacji", hands: "obie ręce", pos: "G-dur, ósemki",
  abc: L8("4/4", 80, "G") + "[V:RH] !mf! !1!G B d B G B d B | !2!A c d c A c d c | G B d B G B d B | A c B A G4 | B d B d c d c d | B d B G A4 | B d c A B G A A | G8 |]\n[V:LH] !5!G,,8 | !1!D,8 | G,,8 | D,4 G,,4 | G,,8 | G,,4 D,4 | G,,4 D,4 | G,,8 |]",
  tips: ["Prawa ręka w pozycji G (kciuk na G), bez przesuwania. Nadgarstek luźny, palce blisko klawiszy.", "Wszystkie ósemki równo – jak tykanie zegara.", "Lewa ręka cicho, tylko podłoga dla prawej."]},
 {id: "gp-menc", lvl: "g1", need: "g1-7", list: "lista A", name: "Menuet C-dur", by: "utwór z aplikacji · w stylu listy A", hands: "obie ręce", pos: "C-dur, 3/4",
  abc: L4("3/4", 100, "C") + "[V:RH] !mf! (!1!C E G) | F2 D | (E C E) | D3 | !p! (C E G) | F D G | E D2 | C3 |]\n[V:LH] !5!C,2 E, | F,2 D, | C,2 E, | !1!G,3 | E,2 C, | D,2 F, | G,2 G, | C,3 |]",
  tips: ["Obie ręce w pozycji C – nie przesuwasz dłoni.", "Menuet to taniec na trzy: „raz” lekko zaznaczony, „dwa, trzy” lżej.", "Druga połowa cicho (p) – jak echo pierwszej."]},
 {id: "gp-echo", lvl: "g1", need: "g1-7", list: "lista C", name: "Echo", by: "inwencja z aplikacji · lista C", hands: "obie ręce", pos: "C-dur, ręce naśladują się",
  abc: L4("4/4", 88, "C") + "[V:RH] !f! !1!C D E F | G2 E2 | z4 | z4 | G F E D | E2 C2 | z4 | z4 | !mf! D E F D | C4 |]\n[V:LH] z4 | z4 | !p! !5!C, D, E, F, | G,2 E,2 | z4 | z4 | !1!G, F, E, D, | E,2 C,2 | G,4 | C,4 |]",
  tips: ["Prawa ręka gra motyw głośno (f), a lewa powtarza go oktawę niżej cicho (p) – jak echo.", "W pauzach liczysz dalej; ręka, która czeka, leży luźno nad klawiszami.", "Na końcu obie ręce razem."]},
 {id: "gp-marsz", lvl: "g1", need: "g1-8", list: "lista B", name: "Marsz F-dur", by: "utwór z aplikacji · staccato i legato", hands: "obie ręce", pos: "F-dur, 2/4",
  abc: L8("2/4", 92, "F") + "[V:RH] !f! !1!.F .A .c2 | .B .G .A2 | .F .A .c .A | G4 | !p! (A B c A) | (B G A2) | !f! .G .A .B .G | F4 |]\n[V:LH] !5!F,2 !1!C2 | G,2 C2 | F,2 A,2 | C4 | F,4 | G,4 | C4 | F,4 |]",
  tips: ["Staccato krótko i lekko, z nadgarstka – ale nie głośniej.", "Takty 5–6 legato i cicho, jak spokojna środkowa część marszu.", "Pamiętaj o B (bemol przy kluczu) w 2., 6. i 7. takcie."]},
/* ---------- GRADE 2 ---------- */
 {id: "gp-etb", lvl: "g2", need: "g2-2", list: "etiuda", name: "Etiuda B-dur", by: "etiuda z aplikacji", hands: "obie ręce", pos: "B-dur, ósemki, zmiana pozycji",
  abc: L8("4/4", 84, "Bb") + "[V:RH] !mf! !1!F G A B c B A G | F A c A F A c A | !1!B c d e f e d c | B d f d B4 | !p! e f e d c d c B | c e d c B d c B | !f! !5!c B A G F G A c | B8 |]\n[V:LH] !5!B,,4 D,4 | F,,4 A,,4 | B,,4 D,4 | B,,4 F,4 | E,4 G,4 | F,4 E,4 | F,,4 C,4 | B,,8 |]",
  tips: ["Dwie pozycje prawej ręki: od F (takty 1–2 i 7) i od B (takty 3–6). Zmiana zawsze na początku taktu – przygotuj ją wcześniej.", "Pamiętaj o Es w taktach 3, 5 i 6.", "Dynamika: mf, p w środku, f na koniec."]},
 {id: "gp-kanon", lvl: "g2", need: "g2-3", list: "lista C", name: "Kanon d-moll", by: "inwencja z aplikacji · lista C", hands: "obie ręce", pos: "d-moll i F-dur, lewa ręka naśladuje prawą",
  abc: L4("4/4", 80, "Dm") + "[V:RH] !mf! !1!D E F D | F G A F | A G F D | E ^C D2 | ^C E D2 | !p! F G A F | !3!A B c A | c B A F | G E F2 | E G F2 | !mf! A G F E | D4 |]\n[V:LH] z4 | !5!D, E, F, D, | F, G, A, F, | A, G, F, D, | E, ^C, D,2 | z4 | !5!F, G, A, F, | A, B, C A, | C B, A, F, | G, E, F,2 | ^C,2 A,,2 | D,4 |]",
  tips: ["Lewa ręka gra tę samą melodię co prawa, takt później i oktawę niżej – to jest kanon.", "Najpierw każda ręka osobno, potem razem bardzo wolno. Słuchaj, jak dwa głosy się mijają.", "Cis przed nutą (takty 4, 5 i 11) to podwyższony 7. stopień d-moll, jak w gamie harmonicznej."]},
 {id: "gp-sonat", lvl: "g2", need: "g2-4", list: "lista A", name: "Sonatinka F-dur", by: "utwór z aplikacji · w stylu listy A", hands: "obie ręce", pos: "F-dur, bas Albertiego",
  abc: L8("4/4", 96, "F") + "[V:RH] !mf! !3!A4 c4 | B2 A2 G4 | G4 B4 | A2 G2 F4 | !p! A4 c4 | c2 B2 A2 B2 | !mf! G2 A2 B2 G2 | F8 |]\n[V:LH] !5!F,!1!C!3!A,C F,CA,C | E,B,G,B, E,B,G,B, | E,B,G,B, E,B,G,B, | F,CA,C F,CA,C | F,CA,C F,CA,C | F,DB,D F,DB,D | E,B,G,B, E,B,G,B, | [F,A,C]8 |]",
  tips: ["Lewa ręka: bas Albertiego – dół, góra, środek, góra. Ręka nieruchoma, kciuk powtarza górny dźwięk.", "Prawa ręka w pozycji F (kciuk na F) przez cały utwór.", "Melodia wyraźnie, bas jak szmer – o połowę ciszej."]},
 {id: "gp-walc", lvl: "g2", need: "g2-4", list: "lista B", name: "Walc e-moll", by: "utwór z aplikacji · w stylu listy B", hands: "obie ręce", pos: "e-moll, bas walcowy",
  abc: L4("3/4", 104, "Em") + "[V:RH] !mf! B2 G | A2 F | G2 E | ^D3 | E2 G | B2 e | ^d c A | B3 | !p! B2 G | A2 F | G2 E | ^D2 E | F2 A | G2 F | E2 ^D | E3 |]\n[V:LH] !5!E, [G,B,] [G,B,] | B,, [^D,A,] [^D,A,] | E, [G,B,] [G,B,] | B,, [^D,F,] [^D,F,] | E, [G,B,] [G,B,] | E, [G,B,] [G,B,] | B,, [^D,A,] [^D,A,] | B,, [^D,F,] [^D,F,] | E, [G,B,] [G,B,] | B,, [^D,A,] [^D,A,] | E, [G,B,] [G,B,] | B,, [^D,F,] [^D,F,] | B,, [^D,A,] [^D,A,] | E, [G,B,] [G,B,] | B,, [^D,A,] [^D,A,] | E,3 |]",
  tips: ["Lewa ręka: bas walcowy. „Raz” – niski dźwięk 5. palcem, „dwa, trzy” – lekkie dwudźwięki.", "Dis w melodii i w lewej ręce to podwyższony 7. stopień e-moll.", "W 6. takcie prawa ręka sięga wyżej, do E – przygotuj przesunięcie w 5. takcie."]},
 {id: "gp-green", lvl: "g2", need: "g2-6", list: "lista B", name: "Greensleeves", by: "melodia angielska z XVI wieku, opracowanie aplikacji", hands: "obie ręce", pos: "a-moll, rytm z kropką",
  abc: L8("3/4", 88, "Am") + "[V:RH] z4 !mp! !1!A2 | c4 d2 | e3 f e2 | d4 B2 | G3 A B2 | c4 A2 | A3 ^G A2 | B4 ^G2 | E4 A2 | c4 d2 | e3 f e2 | d4 B2 | G3 A B2 | c3 B A2 | ^G3 ^F ^G2 | A6 | !f! g6 | g3 f e2 | d4 B2 | G3 A B2 | c4 A2 | A3 ^G A2 | B4 ^G2 | E6 | g6 | g3 f e2 | d4 B2 | G3 A B2 | !p! c3 B A2 | ^G3 ^F ^G2 | A6 |]\n[V:LH] z6 | [A,,E,]6 | [A,,E,]6 | [G,,D,]6 | [G,,D,]6 | [A,,E,]6 | [A,,E,]6 | [E,,B,,]6 | [E,,B,,]6 | [A,,E,]6 | [A,,E,]6 | [G,,D,]6 | [G,,D,]6 | [A,,E,]6 | [E,,B,,]6 | [A,,E,]6 | [C,G,]6 | [C,G,]6 | [G,,D,]6 | [G,,D,]6 | [A,,E,]6 | [A,,E,]6 | [E,,B,,]6 | [E,,B,,]6 | [C,G,]6 | [C,G,]6 | [G,,D,]6 | [G,,D,]6 | [A,,E,]6 | [E,,B,,]6 | [A,,E,]6 |]",
  tips: ["Rytm „taaa-ta-ta” (ćwierćnuta z kropką, ósemka, ćwierćnuta) wraca co drugi takt – policz go ósemkami.", "Gis to podwyższony 7. stopień a-moll; w taktach z G (bez krzyżyka) prawa ręka gra zwykłe G.", "Refren (od wysokiego G) głośniej, na koniec znów cicho."]},
 {id: "gp-petz", lvl: "g2", need: "g2-7", list: "lista A", name: "Menuet G-dur", by: "Ch. Petzold, z Notatnika Anny Magdaleny Bach · lewa ręka uproszczona", hands: "obie ręce", pos: "G-dur, 3/4 · w RCM to już poziom 3",
  abc: L8("3/4", 100, "G") + "[V:RH] !mf! !5!d2 !1!G A B c | d2 G2 G2 | e2 c d e f | g2 G2 G2 | c2 d c B A | B2 c B A G | F2 G A B G | A6 | d2 G A B c | d2 G2 G2 | e2 c d e f | g2 G2 G2 | c2 d c B A | B2 c B A G | A2 B A G F | G6 |]\n[V:LH] !5!G,6 | B,6 | C6 | B,6 | A,6 | G,6 | D,6 | D,6 | G,6 | B,6 | C6 | B,6 | A,6 | G,6 | D,6 | G,,6 |]",
  tips: ["Prawa ręka jest oryginalna, lewa uproszczona do długich nut. Pełna wersja jest za darmo w IMSLP (BWV Anh. 114).", "Ćwierćnuty lekko oddzielone (non legato), ósemki płynnie – tak gra się menuety barokowe.", "W programie RCM ten menuet jest na poziomie 3 – dobry cel na koniec Grade 2."]}
];
GR_PIECES.forEach(p => BEG_PIECES.push(p));

/* utwory z prawdziwego programu RCM w domenie publicznej (IMSLP) i z książek w domu – bez sprawdzania przez pianino */
const IMSLP = (q) => "https://imslp.org/index.php?search=" + encodeURIComponent(q);
const GR_FREE = {
  g1: [
    ["A", "L. Mozart – Menuet D-dur (Notatnik dla Nannerl)", "Leopold Mozart Notenbuch für Nannerl"],
    ["A", "W.A. Mozart – Menuet F-dur KV 2", "Mozart Minuet K.2"],
    ["A", "D.G. Türk – Arioso F-dur (12 Handstücke)", "Türk Handstücke"],
    ["A", "J.W. Hässler – Menuet C-dur op. 38 nr 4", "Hässler 50 pièces op.38"],
    ["B", "C. Gurlitt – Kołysanie i Polowanie (op. 117 nr 6 i 15)", "Gurlitt op.117"],
    ["etiuda", "C. Gurlitt – Poranne powitanie op. 117 nr 13", "Gurlitt op.117"],
    ["etiuda", "A. Diabelli – Etiuda C-dur op. 125 nr 3", "Diabelli op.125"],
    ["etiuda", "L. Köhler – Melodia F-dur op. 218 nr 36", "Köhler op.218"]
  ],
  g2: [
    ["A", "L. van Beethoven – Ecossaise G-dur WoO 23", "Beethoven Ecossaise WoO 23"],
    ["A", "H. Purcell – Menuet a-moll Z 649", "Purcell Musick's Hand-maid"],
    ["A", "J. Haydn – Taniec niemiecki G-dur Hob. IX:12 nr 1", "Haydn 12 German Dances Hob.IX:12"],
    ["A", "W.A. Mozart – Menuet G-dur KV 1e", "Mozart Minuet K.1e"],
    ["A", "J.-Ph. Rameau – Menuet en rondeau", "Rameau Pièces de clavecin 1724"],
    ["B", "R. Schumann – Marsz żołnierski op. 68 nr 2", "Schumann Album für die Jugend"],
    ["B", "P. Czajkowski – Chora lalka op. 39 nr 7", "Tchaikovsky Album for the Young op.39"],
    ["C", "C. Gurlitt – Kanon a-moll", "Gurlitt canon"],
    ["etiuda", "C. Czerny – Etiuda D-dur op. 139 nr 33", "Czerny op.139"],
    ["etiuda", "H. Bertini – Etiuda G-dur op. 166 nr 6", "Bertini op.166"]
  ]
};
const GR_BOOKS = {
  g1: [
    ["Łatwa klasyka na fortepian (Biskupska, Bruce)", "Utwory z pierwszej części książki – to poziom Grade 1, w większości lista A i B."],
    ["Dla Celiny (Lic) i Dla Marceliny (Wiśniewski)", "Dalsze utwory z obu zeszytów – dobre na listę B."],
    ["Play it Again: Piano, Book 1 (Spanswick)", "Pierwsze, najłatwiejsze utwory z książki."],
    ["Gamy i pasaże (PWM)", "Palcowanie gam C-, G-, F-dur i a-, e-, d-moll, gdy chcesz porównać z aplikacją."]
  ],
  g2: [
    ["Łatwa klasyka na fortepian (Biskupska, Bruce)", "Utwory ze środka książki."],
    ["Play it Again: Piano, Book 1 (Spanswick)", "Utwory ze środka książki."],
    ["Hanon – Pianista wirtuoz", "Ćwiczenia 1–5 wolno, jako rozgrzewka przed gamami (5 minut, nie dłużej)."],
    ["50 Greats for the Piano (Yamaha)", "Najkrótsze aranżacje – na koniec Grade 2."],
    ["Gamy i pasaże (PWM)", "B-dur, g-moll i gamy melodyczne."]
  ]
};
function grRepHtml(lvl) {
  const has = (n) => S.my.some(m => m.name === n);
  return `<details class="card"><summary><b>${begLvlObj(lvl).name}: utwory z programu RCM i z książek</b></summary><div class="stack" style="margin-top:10px">
    <p class="small muted" style="margin:0">Utwory z oficjalnej listy RCM ${lvl === "g1" ? "Level 1" : "Level 2"}, które są w domenie publicznej – nuty za darmo w IMSLP. Takich utworów aplikacja nie sprawdzi przez pianino (nie ma ich nut), ale możesz dodać je do Moich utworów, żeby plan je podsuwał.</p>
    <div class="stack" style="gap:6px">${GR_FREE[lvl].map(([list, name, q]) => `<div class="spread" style="gap:8px"><span class="small"><span class="pill">${list === "etiuda" ? "etiuda" : "lista " + list}</span> ${name}</span>
      <span class="row" style="gap:6px;flex:none"><a class="pill" href="${IMSLP(q)}" target="_blank" rel="noopener">IMSLP</a>${has(name) ? `<span class="small muted">dodane</span>` : `<button class="btn sm ghost" data-act="g-addmy" data-name="${esc(name)}">+ Moje</button>`}</span></div>`).join("")}</div>
    <h4 class="lvlhead">Z książek w domu</h4>
    ${GR_BOOKS[lvl].map(([b, how]) => `<div class="stack" style="gap:2px"><b class="small">${b}</b><span class="small">${how}</span></div>`).join("")}
    <div class="stack" style="gap:4px"><b class="small">MuseScore</b><span class="small">Szukaj „${lvl === "g1" ? "RCM level 1" : "RCM level 2"}” albo tytułów z listy powyżej. Wybieraj zapis z jedną, dwiema stronami.</span>
      <div class="extlinks"><a class="pill" href="${MS_SEARCH(lvl === "g1" ? "RCM level 1 piano" : "RCM level 2 piano")}" target="_blank" rel="noopener">MuseScore: ${lvl === "g1" ? "RCM Level 1" : "RCM Level 2"}</a></div></div>
  </div></details>`;
}

/* ============================== PODSUMOWANIE POZIOMU ============================== */
function grLvlSummaryHtml(lvl) {
  const L = begLvlLessons(lvl), P = begLvlPieces(lvl), T = grTechLvl(lvl);
  return `<div class="minis">
    <div class="mini"><div class="small muted">Lekcje</div><div class="v">${L.filter(l => begDone(l.id)).length}/${L.length}</div></div>
    <div class="mini"><div class="small muted">Utwory</div><div class="v">${P.filter(p => st(p.id) >= 4).length}/${P.length}</div></div>
    <div class="mini"><div class="small muted">Technika</div><div class="v">${T.filter(t => grTechReady(t.id)).length}/${T.length}</div></div>
  </div>`;
}

/* ============================== PLAN DNIA ============================== */
Object.assign(BEG_BLOCKS, {
  gtech: {name: "Technika: gamy i trójdźwięki", grp: "tech", ab: "Te"},
  gsight: {name: "Czytanie a vista", grp: "mind", ab: "Vi"},
  gear: {name: "Słuch", grp: "mind", ab: "Sł"}
});
function grGenPlan(key, minutes) {
  const lvl = begLvl(), L = begLessonIdx(), piece = begPiece();
  let w = {gtech: 5, blesson: 6, gsight: 4, gear: 3, bpiece: 8, brepeat: 4};
  if (!piece) { w.blesson += w.bpiece; delete w.bpiece; }
  if (L >= BEG_LESSONS.length) { delete w.blesson; w.bpiece = (w.bpiece || 0) + 4; w.brepeat += 2; }
  const known = BEG_PIECES.filter(p => st(p.id) >= 3);
  if (minutes < 30 || !known.length) delete w.brepeat;
  if (minutes <= 15) { if (S.sessions % 2) delete w.gear; else delete w.gsight; }
  const order = ["gtech", "blesson", "gsight", "gear", "bpiece", "brepeat"].filter(k => w[k]);
  const sum = order.reduce((a, k) => a + w[k], 0);
  const blocks = order.map(k => ({type: k, min: Math.max(2, Math.round(w[k] * minutes / sum)), done: false}));
  const diff = minutes - blocks.reduce((a, b) => a + b.min, 0);
  blocks.reduce((a, b) => b.min > a.min ? b : a, blocks[0]).min += diff;
  for (const b of blocks) {
    if (b.type === "brepeat") b.items = known.sort((a, c) => hash(key + a.id) - hash(key + c.id)).slice(0, 2).map(p => p.id);
    if (b.type === "gtech") { b.items = grTechToday(lvl, key); b.lvl = lvl; }
    if (b.type === "gsight" || b.type === "gear") b.lvl = lvl;
  }
  return {minutes, blocks, counted: false, beg: true};
}
// czytanie a vista: generator z extra.js; Grade 1 – poziom 2 (4 takty, C/G/F), Grade 2 – poziom 3 (8 taktów, także a- i d-moll)
const GR_SIGHT = {piece: null, lv: 0, n: 0};
function grSightNew(lv) { GR_SIGHT.piece = genSight(lv); GR_SIGHT.lv = lv; GR_SIGHT.n++; }
const grSightLv = (lvl) => (lvl === "g2" ? 3 : 2);
function grAbcFor(id) {
  if (id === "gsr") return GR_SIGHT.piece && GR_SIGHT.piece.abc;
  const t = grTech(id); return t ? grTechAbc(t) : null;
}
function grAbc(kind, id) { return kind === "sight" ? grAbcFor("gsr") : grAbcFor(id); }
// słuch jak na egzaminie RCM Level 1 / Level 2
const GR_EAR = {
  g1: {ints: [3, 4], chords: ["dur", "moll"], clap: 2, mel: 5, five: true, keys: ["C", "G", "Am"], cad: [],
       desc: "Jak na egzaminie Level 1: tercja mała czy wielka, akord durowy czy molowy, powtórzenie rytmu i 5-dźwiękowej melodii (C-dur, G-dur, a-moll)."},
  g2: {ints: [3, 4, 7], chords: ["dur", "moll"], clap: 3, mel: 5, five: true, keys: ["G", "F", "Dm"], cad: [],
       desc: "Jak na egzaminie Level 2: tercje i kwinta czysta, akord durowy czy molowy, powtórzenie rytmu i 5-dźwiękowej melodii (G-dur, F-dur, d-moll)."}
};
const GR_EAR_SEQ = ["ear-int", "ear-int", "ear-int", "ear-chord", "ear-chord", "ear-chord", "ear-clap", "ear-play", "ear-play"];
function grEarStart(lvl) {
  const plan = todayPlan();
  quizStart(GR_EAR_SEQ[0], "bq-inline", true, {seq: GR_EAR_SEQ, level: 2, ear: GR_EAR[lvl] || GR_EAR.g1, onDone: (sc, mx) => {
    const host = document.getElementById("bq-inline");
    if (host) host.innerHTML = `<p><b>Wynik: ${sc} z ${mx}.</b> ${sc >= mx * 0.8 ? "Świetnie – to poziom egzaminu." : "Słuch rośnie powoli – jutro kolejna porcja."}</p>`;
    const b = plan.blocks.find(x => x.type === "gear");
    if (b && !b.done) setTimeout(() => markBlock(b, true), 1500);
  }});
}
function grBlockBody(b) {
  const lvl = b.lvl || begLvl(), LV = begLvlObj(lvl);
  if (b.type === "gtech") {
    const ids = b.items || grTechToday(lvl, todayKey()), T = grTechLvl(lvl);
    return `<p class="small">Najpierw wolno, potem w tempie egzaminu. Na egzaminie technikę gra się z pamięci, więc gdy już umiesz – zamknij nuty.</p>
      ${grTechListHtml(ids, true)}
      <p class="small muted" style="margin:0">Technika ${LV.name}: ${T.filter(t => grTechReady(t.id)).length}/${T.length} gotowe. Pełna lista jest w zakładce Nauka.</p>`;
  }
  if (b.type === "gsight") {
    const lv = grSightLv(lvl);
    if (!GR_SIGHT.piece || GR_SIGHT.lv !== lv) grSightNew(lv);
    const P = GR_SIGHT.piece, src = "sight:gsr:" + GR_SIGHT.n;
    return `<p class="small">Za każdym razem nowe ćwiczenie. 30 sekund przeglądu: tonacja, metrum, pierwsza nuta i palec każdej ręki, rytm. Potem jedno podejście bez zatrzymywania.</p>
      <p class="small" style="margin:0"><b>${P.K.pl}</b> · metrum ${P.time} · ♩ = ${P.bpm}</p>
      <div class="abc" data-abc="gsr:${GR_SIGHT.n}"></div>
      <div class="row"><button class="btn sm" data-act="g-sight-new">Nowe ćwiczenie</button><button class="btn sm" data-act="b-play" data-src="${src}">▶ Posłuchaj</button><button class="btn sm ghost" data-act="b-stop">Stop</button>${mpUi(src)}
      <p class="small muted" style="margin:0">Posłuchaj dopiero po swoim podejściu – wtedy słychać, co było inaczej.</p>`;
  }
  if (b.type === "gear") {
    const cfg = GR_EAR[lvl] || GR_EAR.g1, piano = typeof mpReady === "function" && mpReady() && !mpHidden();
    return `<p class="small">${cfg.desc}${piano ? " Rytm możesz wystukać na dowolnym klawiszu, a melodię zagrać na pianinie – aplikacja sama ją sprawdzi." : ""}</p>
      <div id="bq-inline">${b.done ? `<p class="small muted">Zrobione na dziś.</p>` : `<button class="btn sm primary" data-act="g-ear" data-lvl="${lvl}">Zacznij (${GR_EAR_SEQ.length} pytań)</button>`}</div>`;
  }
  return "";
}

/* ============================== ZDARZENIA ============================== */
document.addEventListener("click", (e) => {
  const t = e.target.closest && e.target.closest("[data-act]"); if (!t) return;
  switch (t.dataset.act) {
    case "g-tech-ready": grTechMark(t.dataset.id, !grTechReady(t.dataset.id)); break;
    case "g-sight-new": if (typeof MP !== "undefined" && MP.on && MP.src && MP.src.startsWith("sight:")) mpStop(); stopQueue(); grSightNew(grSightLv(begLvl())); render(); break;
    case "g-ear": ac(); grEarStart(t.dataset.lvl); break;
    case "g-addmy": { const n = t.dataset.name; if (!S.my.some(m => m.name === n)) { S.my.push({id: "m" + Date.now(), name: n, last: ""}); save(); toast("Dodano do Moich utworów: " + n); } t.outerHTML = `<span class="small muted">dodane</span>`; break; }
  }
});
