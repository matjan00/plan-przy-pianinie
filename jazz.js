"use strict";
/* Jazzy Christmas – sezonowy moduł jazzowy (21.11.2026 – 15.01.2027), tylko w trybie zaawansowanym.
   W planie dnia dodatkowy blok 20 minut (ponad wybraną długość sesji), szczegóły w zakładce „Jazz”.
   Po 15 stycznia blok znika, a zakładka trafia do archiwum (karta w zakładce Nauka).

   Sześć tematów po kolei w czasie; każdy ma lekcję teorii opartą na utworze, ćwiczenie akordów (z pianinem przez USB
   albo bez), podkład zespołu (kontrabas, perkusja, opcjonalnie fortepian) i nagrania do posłuchania.
   Utwór w każdym temacie można zamienić: aranżacje z aplikacji (domena publiczna, nuty rysuje abcjs i sprawdza pasek
   pianina, ze swingiem) albo nuty z MuseScore.
   Stan: S.jazz = {pick:{unit:songId}, songs:{songId:etap 0–4}, lesson:{unit:true}, drill:{unit:{best,n}}, heard:{id:true},
   play:{src:wynik z pianina}, arr:{…}}. */

const JZ_START = "2026-11-21", JZ_END = "2027-01-15";
const JH = (m, q, k) => `X:1\nM:${m}\nL:1/8\nQ:1/4=${q}\nK:${k}\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n`;

/* ============================== UTWORY ============================== */
// kind "app": nuty w aplikacji; kind "ms": nuty z MuseScore (q – fraza wyszukiwania). swing: ósemki grane nierówno.
const JZ_MS = "https://musescore.com/";
// Jingle Bells: zwrotka i refren osobno, żeby można je było ćwiczyć fragmentami (parts), a w całości złożyć w jeden utwór
const JB = {
 vR: `"^Zwrotka""Fmaj7"c A G F C3 C | c A G F "Gm7"D4 | D B A G "C7"E4 | c c B G "Fmaj7"A4 | "Fmaj7"c A G F C4 | c A G F "Bbmaj7"D3 D | "Gm7"D B A G "C7"c c c c | "Gm7"d c "C7"B G "F6"F4 |`,
 vL: `[F,,E,]8 | [F,,E,]4 [G,,F,]4 | [G,,F,]4 [C,E,]4 | [C,E,]4 [F,,E,]4 | [F,,E,]8 | [F,,E,]4 [B,,A,]4 | [G,,F,]4 [C,E,]4 | [G,,F,]2 [C,E,]2 [F,,D,]4 |`,
 cR: `"^Refren""Fmaj7"A2 A2 A4 | "Gm7"A2 A2 "C7"A4 | "Fmaj7"A2 c2 F3 G | "Cm7"A4- "F7"A4 | "Bbmaj7"B2 B2 B3 B | "Bbmaj7"B2 "Am7"A2 A2 A A | "Gm7"A2 G2 "C7"G2 A2 | "Gm7"G4 "C7"c4 | "Fmaj7"A2 A2 A4 | "Gm7"A2 A2 "C7"A4 | "Fmaj7"A2 c2 F3 G | "Cm7"A4- "F7"A4 | "Bbmaj7"B2 B2 B3 B | "Bbmaj7"B2 "Am7"A2 A2 "D7"A A | "Gm7"c2 c2 "C7"B2 G2 | "F6"F6 z2 |]`,
 cL: `[F,,E,]8 | [G,,F,]4 [C,E,]4 | [F,,E,]8 | [C,B,]4 [F,A,]4 | [B,,A,]8 | [B,,A,]2 [A,,G,]6 | [G,,F,]4 [C,E,]4 | [G,,F,]4 [C,E,]4 | [F,,E,]8 | [G,,F,]4 [C,E,]4 | [F,,E,]8 | [C,B,]4 [F,A,]4 | [B,,A,]8 | [B,,A,]2 [A,,G,]4 [D,^F,]2 | [G,,F,]4 [C,E,]4 | [F,,D,]6 z2 |]`};
const JZ_SONGS = [
{id: "jz-jingle", kind: "app", title: "Jingle Bells", by: "J. Pierpont (1857) · zwrotka i refren, aranżacja swingowa z aplikacji", key: "F-dur", feel: "swing", swing: true,
 abc: JH("4/4", 112, "F") + `[V:RH] ${JB.vR} ${JB.cR}\n[V:LH] ${JB.vL} ${JB.cL}`,
 parts: [{name: "Zwrotka · takty 1–8", note: "Prawie same ósemki – tu najlepiej słychać i ćwiczy się swing.", abc: JH("4/4", 112, "F") + `[V:RH] ${JB.vR.replace(/\|$/, "|]")}\n[V:LH] ${JB.vL.replace(/\|$/, "|]")}`},
         {name: "Refren · takty 9–24", note: "Znana melodia, głównie ćwierćnuty. Ósemki swingowe tylko w taktach 14 i 22.", abc: JH("4/4", 112, "F") + `[V:RH] ${JB.cR.replace('"^Refren"', "")}\n[V:LH] ${JB.cL}`}],
 an: [
  "<b>Dwie części:</b> zwrotka (takty 1–8, „Dashing through the snow”) to prawie same ósemki – na niej uczysz się swingu. Refren (takty 9–24) znasz na pamięć, więc możesz skupić się na akordach.",
  "<b>Te same melodie, inne akordy.</b> Zamiast F-dur jest <b>Fmaj7</b> (F–A–C–E). Septyma wielka E daje miękkie, „jazzowe” brzmienie. Na końcu zwrotki i utworu jest <b>F6</b> (F–A–C–D) – klasyczne swingowe zakończenie.",
  "<b>Takt 8 i takty 10, 18: Gm7 → C7 → Fmaj7.</b> To II–V–I, najważniejsza progresja jazzu. Na razie zapamiętaj, jak brzmi; dokładnie omawiamy ją w 2. temacie.",
  "<b>Takty 12 i 20: Cm7 → F7 → Bbmaj7.</b> To też II–V–I, ale w B-dur (Bb = nasze B). Melodia trzyma A, a akordy zmieniają się pod nią – typowo jazzowy chwyt.",
  "<b>Lewa ręka gra dwa dźwięki (shell voicing):</b> podstawę i septymę (Gm7 = G + F, Fmaj7 = F + E) albo podstawę i tercję (C7 = C + E). Kwintę się pomija, bo nie mówi nic o rodzaju akordu. Septymę C7 (B) często dopowiada melodia – np. „c c B G” w takcie 4.",
  "<b>Dlaczego raz septyma, raz tercja?</b> W Gm7 → C7 → Fmaj7 górny dźwięk lewej ręki idzie F → E → E: pół tonu w dół i zostaje. Ręka prawie się nie rusza, a głos płynie gładko. Tak gra lewa ręka w jazzie.",
  "<b>Swing w zwrotce:</b> w parach ósemek (np. „c A G F”) pierwsza jest długa, druga krótka i lekko akcentowana. Licz „raz-i dwa-i” jak w trioli: „raz – – i”."],
 steps: [
  "Posłuchaj „Prosto → swing” – to dwa pierwsze takty zwrotki, najpierw równo, potem swingowo.",
  "Zwrotka, prawa ręka sama (Ćwicz fragmentami → Zwrotka → Prawa, „Nuty czekają”), potem z metronomem w tempie „Wolno” – pasek sprawdza swing.",
  "Zwrotka, lewa ręka sama: same dwudźwięki, nazwij głośno każdy akord. Potem obie ręce razem wolno.",
  "Refren tak samo: najpierw prawa, potem lewa, potem razem. Melodię znasz, więc patrz głównie na akordy.",
  "Cały utwór z metronomem: „Wolno” (♩ = 68) → „Średnio” (♩ = 90) → „W tempie” (♩ = 112). Potem z podkładem zespołu – kontrabas i perkusja trzymają puls za Ciebie.",
  "Lekko, z akcentem na 2 i 4."]},
{id: "jz-santa", kind: "ms", title: "Santa Claus Is Coming to Town", by: "J. F. Coots (1934) · arr. Phillip Fullerton", url: JZ_MS + "user/7333711/scores/7280831", pg: 2, lvl: "łatwa", chords: true, feel: "swing", swing: true,
 note: "Prosta wersja w F-dur z akordami (C, C7, F, Fm) nad nutami. Twoje zadanie: zrób z niej jazz – graj swingowo, a w lewej ręce zamień F na Fmaj7, C7 zostaw, przed F wstaw Gm7–C7."},
{id: "jz-winter", kind: "ms", title: "Winter Wonderland", by: "F. Bernard (1934) · swing arrangement, Retro Piano Guy", url: JZ_MS + "user/2891181/scores/4812699", pg: 3, lvl: "średnia", chords: true, feel: "swing", swing: true,
 note: "Prawdziwa aranżacja swingowa z symbolami akordów nad nutami – trudność średnia, daj sobie na nią cały temat.",
 an: [
  "<b>C-dur, ♩ = 130, swing.</b> To zapis wykonania Roberta Turnera – trudność średnia. Zacznij od ♩ = 80–90.",
  "<b>Lewa ręka gra walking bass:</b> ćwierćnuty po dźwiękach akordu z chromatycznymi przejściami (np. Dis przed E). Tak samo gra kontrabas w podkładzie aplikacji.",
  "<b>Takty 6–8: Dm7 – Em7 – Dm7 – G7 – C.</b> To rozbudowane II–V–I: między II (Dm7) a V (G7) wstawiony jest III stopień (Em7).",
  "<b>Takt 9: As7 → G.</b> As7 leży pół tonu nad G i prowadzi do niego chromatycznie. To <i>podstawienie trytonowe</i>: As7 zamiast D7 (dominanty dominanty).",
  "<b>Akordy z lekcji:</b> Cmaj7 na początku, Dm7 i Em7 (m7), G7 i C7 (7). Podpisz każdy po polsku nad taktem.",
  "<b>Bridge (♩ = 140):</b> zwykle idzie do E-dur, ale Robert Turner gra go w Es-dur – zaznacz to w nutach i nazwij nowe akordy.",
  "<b>Prawa ręka</b> gra melodię z akordami pod spodem i z triolami – triola ósemkowa to zapisany swing (długa–krótka)."],
 steps: [
  "Lewa ręka sama: walking bass takt po takcie, równe ćwierćnuty, lekko oderwane. Licz na 4.",
  "Prawa ręka sama: najpierw tylko górna linia melodii, potem dodaj akordy pod nią.",
  "Podpisz akordy po polsku nad każdym taktem (Cmaj7, Dm7, Em7, G7, As7).",
  "Razem wolno (♩ = 80), potem z podkładem z zakładki Podkład.",
  "Tempo docelowe ♩ = 110–130, akcent na 2 i 4."],},
{id: "jz-jbrock", kind: "ms", title: "Jingle Bell Rock", by: "J. Beal, J. Boothe (1957) · arr. Toby Kolos", url: JZ_MS + "user/29305734/scores/6442705", pg: 2, lvl: "łatwa", chords: true, feel: "swing", swing: true,
 note: "W nutach jest „Swing” i akordy Gmaj7, G6, Am, D7 – świetne do ćwiczenia symboli z lekcji."},

{id: "jz-wewish", kind: "app", title: "We Wish You a Merry Christmas", by: "kolęda angielska · jazz waltz z aplikacji", key: "F-dur", feel: "waltz", swing: true,
 abc: JH("3/4", 120, "F") +
 `[V:RH] C2 | "Fmaj7"F2 FG FE | "D7"D2 D2 D2 | "Gm7"G2 GA GF | "C7"E2 C2 C2 | "A7"A2 AB AG | "Dm7"F2 D2 CC | "Gm7"D2 "C7"G2 E2 | "F6"F4 C2 | "Fmaj7"F2 F2 F2 | "C7"E4 E2 | "Gm7"F2 E2 D2 | "C7"C4 G2 | "Fmaj7"A2 G2 F2 | "D7"c2 C2 CC | "Gm7"D2 "C7"G2 E2 | "F6"F6 |]
[V:LH] z2 | [F,,E,]6 | [D,^F,]6 | [G,,F,]6 | [C,E,]6 | [A,,G,]6 | [D,F,]6 | [G,,F,]2 [C,E,]4 | [F,,D,]6 | [F,,E,]6 | [C,E,]6 | [G,,F,]6 | [C,E,]6 | [F,,E,]6 | [D,^F,]6 | [G,,F,]2 [C,E,]4 | [F,,D,]6 |]`,
 an: [
  "<b>Łańcuch dominant (koło kwintowe):</b> D7 → Gm7 → C7 → F. Każdy akord jest dominantą następnego – podstawy idą o kwintę w dół: D, G, C, F. Dlatego ta kolęda „sama się toczy”.",
  "<b>Takt 5: A7 z dźwiękiem B w melodii.</b> B (B♭) nad A7 to <i>nona mała</i> (♭9) – ostre napięcie, które ciągnie do Dm7. W jazzie to bardzo częsty kolor dominanty prowadzącej do mollowego akordu.",
  "<b>Takty 7 i 15: Gm7 → C7 → F6</b> – II–V–I w F-dur, z którego zbudowane jest zakończenie każdej frazy.",
  "<b>Lewa ręka – shell voicings:</b> Gm7 = G + F (1–7), C7 = C + E (1–3), Fmaj7 = F + E (1–7). Zobacz, że F przechodzi w E o pół tonu, a reszta stoi – to <i>prowadzenie głosów</i>.",
  "<b>Jazz waltz:</b> 3/4, ale ósemki swingowe i lekki akcent na 2 i 3 – mniej „ump-pa-pa”, bardziej kołysanie na cały takt."],
 steps: [
  "Nazwij akordy na głos, grając tylko lewą ręką (każdy na „raz”, trzymaj cały takt).",
  "Znajdź w lewej ręce wszystkie miejsca, gdzie dźwięk zostaje, a drugi przesuwa się o pół tonu.",
  "Prawa ręka: ósemki (takty 1, 3, 5) długa–krótka. Licz na trzy, czuj cały takt jako jedno kołysanie.",
  "Razem wolno, potem z podkładem jazz waltz.",
  "Na koniec spróbuj zagrać lewą ręką akord na 2. miarę zamiast na 1. – tak akompaniują pianiści jazzowi."]},
{id: "jz-deck", kind: "app", title: "Deck the Halls", by: "kolęda walijska · swing z aplikacji", key: "F-dur", feel: "swing", swing: true,
 abc: JH("4/4", 116, "F") +
 `[V:RH] "Fmaj7"c3 B A2 G2 | "Dm7"F2 G2 A2 F2 | "Gm7"G A B G "C7"A3 G | "F6"F2 "C7"E2 "F6"F4 | "Fmaj7"c3 B A2 G2 | "Dm7"F2 G2 A2 F2 | "Gm7"G A B G "C7"A3 G | "F6"F2 "C7"E2 "F6"F4 | "Gm7"G3 A B2 G2 | "C7"A3 B c2 G2 | "Fmaj7"A B c2 "Dm7"d e f2 | "G7"e2 d2 "C7"c4 | "Fmaj7"c3 B A2 G2 | "Dm7"F2 G2 A2 F2 | "Bbmaj7"d d d d "C7"c3 B | "Gm7"A2 "C7"G2 "F6"F4 |]
[V:LH] [F,,E,]8 | [D,C]8 | [G,,F,]4 [C,E,]4 | [F,,D,]2 [C,E,]2 [F,,D,]4 | [F,,E,]8 | [D,C]8 | [G,,F,]4 [C,E,]4 | [F,,D,]2 [C,E,]2 [F,,D,]4 | [G,,F,]8 | [C,E,]8 | [F,,E,]4 [D,C]4 | [G,,F,]4 [C,E,]4 | [F,,E,]8 | [D,C]8 | [B,,A,]4 [C,E,]4 | [G,,F,]2 [C,E,]2 [F,,D,]4 |]`,
 an: [
  "<b>Fmaj7 → Dm7:</b> Dm7 (D–F–A–C) ma aż trzy wspólne dźwięki z Fmaj7 (F–A–C–E). Akordy „krewni” (tonika i jej równoległy moll) łatwo się zamieniają – to pierwszy krok reharmonizacji.",
  "<b>„Fa la la la la” = Gm7 → C7 → F6:</b> II–V–I w F-dur w każdej frazie.",
  "<b>Takt 12: G7 → C7.</b> G7 to dominanta dominanty (V/V). Melodia E–D nad G7 to tercja i… sekunda? Nie – E nad G7 to <i>13</i>, D to kwinta. Rozszerzenia są w jazzie normalne.",
  "<b>Lewa ręka:</b> Gm7 = G + F, C7 = C + E, Dm7 = D + C, Fmaj7 = F + E – zawsze dwa dźwięki, a ręka prawie się nie przesuwa."],
 steps: [
  "Lewa ręka sama, z nazwami akordów na głos.",
  "Prawa ręka: grupy ósemek „fa la la la” swingowo.",
  "Razem wolno, potem z podkładem swing.",
  "Graj melodię staccato w ósemkach i legato w ćwierćnutach – tak brzmi big band."]},
{id: "jz-letitsnow", kind: "ms", title: "Let It Snow! Let It Snow! Let It Snow!", by: "J. Styne (1945) · wersja Dean Martin, Faber (oficjalna)", url: JZ_MS + "official_author/scores/6920763", pg: 3, lvl: "średnia", off: true, feel: "swing", swing: true,
 note: "Swingowa wersja w D-dur, melodia w akordach w prawej ręce, w lewej linia basu.",
 an: [
  "<b>D-dur, ♩ = 136.</b> Takty 1–4 to intro z triolami ósemkowymi – to zapisany swing (triola = długa–krótka). Od taktu 5 stoi „Swing”: ósemki grasz tak samo, chociaż są zapisane równo.",
  "<b>Prawa ręka gra melodię w akordach</b> – melodia na górze, 2–3 dźwięki pod nią. Tak brzmi sekcja dęta big bandu (<i>block chords</i>).",
  "<b>Lewa ręka gra linię basu</b> – podstawy akordów i przejścia między nimi. Nad nutami nie ma symboli akordów: odczytaj akord z basu i dźwięków prawej ręki i dopisz go ołówkiem nad taktem.",
  "<b>II–V–I w D-dur: Em7 – A7 – Dmaj7.</b> To najważniejsza progresja utworu – szukaj jej zwłaszcza na końcach fraz.",
  "<b>Bridge</b> (środkowa część) przechodzi do A-dur przez <b>E7</b> – dominantę dominanty (V/V).",
  "<b>Takty 11–12:</b> staccato i akcenty na „i” – to <i>kicks</i>, uderzenia całego zespołu. Graj je krótko i zdecydowanie."],
 steps: [
  "Wypisz akordy nad taktami (z basu i prawej ręki) – to Twoje ćwiczenie z rozpoznawania akordów.",
  "Prawa ręka: najpierw sama górna linia, potem pełne akordy; palce blisko klawiszy.",
  "Druga wersja do ćwiczenia: prawa jak w nutach, lewa – shell voicings z akordów, które wypisałaś (zamiast basu z nut).",
  "Razem wolno (♩ = 90), potem z podkładem; tempo docelowe ♩ = 120–136."],},
{id: "jz-betlejem", kind: "ms", title: "Dzisiaj w Betlejem", by: "kolęda polska · opr. josoj", url: JZ_MS + "user/832276/scores/1494691", pg: 1, lvl: "łatwa", folk: true, feel: "swing", swing: true,
 note: "Na MuseScore nie ma jazzowej wersji tej kolędy na fortepian solo – to proste opracowanie, z którego robisz jazz sama (patrz niżej)."},

{id: "jz-blues", kind: "app", title: "Śnieżny blues", by: "temat bluesowy z aplikacji (12 taktów)", key: "F-dur", feel: "blues", swing: true,
 abc: JH("4/4", 100, "F") +
 `[V:RH] "F7"F2 _A =A c2 F2 | "Bb7"d2 _d2 c4 | "F7"F2 _A =A c2 F2 | "Cm7"_e2 "F7"d2 c4 | "Bb7"B2 _d =d f2 B2 | "Bb7"_a2 g2 f4 | "F7"F2 _A =A c2 F2 | "D7"c2 A2 ^F4 | "Gm7"d2 B2 G2 F2 | "C7"E2 G2 B2 G2 | "F7"F2 _A =A "D7"c2 A2 | "Gm7"G2 B2 "C7"c2 z2 | "F7"F6 z2 |]
[V:LH] [F,,_E,]3 [F,,_E,] z4 | [B,,D,]3 [B,,D,] z4 | [F,,_E,]3 [F,,_E,] z4 | [C,_E,]4 [F,,_E,]4 | [B,,D,]3 [B,,D,] z4 | [B,,D,]3 [B,,D,] z4 | [F,,_E,]3 [F,,_E,] z4 | [D,^F,]3 [D,^F,] z4 | [G,,F,]3 [G,,F,] z4 | [C,E,]3 [C,E,] z4 | [F,,_E,]4 [D,^F,]4 | [G,,F,]4 [C,E,]4 | [F,,_E,]6 z2 |]`,
 an: [
  "<b>Forma: 12 taktów.</b> F7 (tonika) – B♭7 (subdominanta) – F7 – … – C7 (dominanta). Takt 13 to tylko zakończenie; przy powtarzaniu wracasz do taktu 1.",
  "<b>Wszystkie akordy to „siódemki”.</b> W bluesie F7 i B♭7 nie muszą się rozwiązywać – septyma mała jest tu kolorem, nie napięciem.",
  "<b>Blue notes:</b> As–A w taktach 1, 3, 7 to <i>mała i wielka tercja</i> obok siebie. Ten „brudny” półton to serce bluesa. W takcie 5 to samo przeniesione na B♭7: Des–D.",
  "<b>Takty 4 i 9–12:</b> jazzowa wersja bluesa dodaje II–V (Cm7–F7 przed B♭7, Gm7–C7 przed F7) i D7 w takcie 8.",
  "<b>Lewa ręka – rytm „Charleston”:</b> akord na „raz” i na „i” po dwójce, potem cisza. Pauza w lewej ręce jest tak samo ważna jak akord – zostawia miejsce dla melodii."],
 steps: [
  "Naucz się formy: zagraj lewą ręką same akordy przez 12 taktów, licząc takty na głos.",
  "Rytm Charleston: najpierw wystukaj go, potem graj na F7 przez 4 takty z podkładem.",
  "Prawa ręka: riff z taktu 1 (F–As–A–C) – swingowo, lekko zaakcentuj A.",
  "Razem wolno, potem z podkładem blues. Graj temat 2 razy pod rząd.",
  "Po temacie: jeden chorus improwizacji (patrz zadanie w zakładce Podkład) i jeszcze raz temat."]},
{id: "jz-rudolph", kind: "ms", title: "Run Rudolph Run", by: "J. Marks, M. Brodie (1958) · wersja boogie-woogie, arr. Brent Edstrom (Hal Leonard)", url: JZ_MS + "user/39593079/scores/16108855", pg: 3, lvl: "średnia", off: true, feel: "blues", swing: true,
 note: "12-taktowy blues z lewą ręką boogie-woogie."},
{id: "jz-xmasbaby", kind: "ms", title: "Merry Christmas, Baby", by: "L. Baxter, J. Moore (1947) · wersja jazzowa, arr. Brent Edstrom (Hal Leonard)", url: JZ_MS + "user/39593079/scores/16084576", pg: 4, lvl: "średnia", off: true, feel: "blues", swing: true,
 note: "Wolny blues – dużo blue notes i trioli."},
{id: "jz-jbblues", kind: "ms", title: "Jingle Bells Boogie", by: "J. Pierpont · arr. sandridavide6", url: JZ_MS + "user/39952632/scores/8088462", pg: 3, lvl: "średnia", feel: "blues", swing: true,
 note: "Lewa ręka gra bas boogie-woogie ósemkami, prawa – akordy i melodię. Ocena 4,9.",
 an: [
  "<b>C-dur, alla breve: 𝅗𝅥 = 110</b> – licz na 2 (półnuty), nie na 4. To szybkie tempo; zacznij od 𝅗𝅥 = 60–70.",
  "<b>Takty 1–4:</b> intro w akordach z krótkimi przednutkami – „ześlizg” z dźwięku o pół tonu niżej, typowy dla bluesa i boogie.",
  "<b>Od taktu 5 lewa ręka gra bas boogie-woogie</b> ósemkami: chromatycznie od C przez Cis i D do E, potem w górę po dźwiękach akordu (G, A, B) i z powrotem. Ta sama figura przechodzi potem na inne akordy.",
  "<b>B (nasze B) w lewej ręce to mała septyma C7</b> – dlatego całość brzmi bluesowo, a nie jak kolęda.",
  "<b>Melodia „Jingle Bells” wchodzi pod koniec taktu 8</b> (przedtakt G). Przednutki Dis → E w prawej ręce to blue note z lekcji: mała tercja ześlizguje się na wielką."],
 steps: [
  "Lewa ręka sama, aż „sama chodzi” – najpierw takty 5–8 w kółko, wolno i równo.",
  "Prawa sama: melodia z przednutkami, lekko i krótko.",
  "Razem bardzo wolno; trudne miejsca po 2 takty.",
  "Lewą rękę możesz ćwiczyć z podkładem bluesa w C (zakładka Podkład) – zespół trzyma puls."],},

{id: "jz-cicha", kind: "app", title: "Cicha noc", by: "F. X. Gruber (1818) · ballada jazzowa z aplikacji", key: "C-dur", feel: "ballad", swing: true,
 abc: JH("3/4", 84, "C") +
 `[V:RH] "Cmaj7"G3 A G2 | "Am7"E6 | "Dm7"G3 A G2 | "G7"E6 | "Dm7"d4 d2 | "G7"B6 | "Cmaj7"c4 c2 | "Gm7"G2- "C7"G4 | "Fmaj7"A4 A2 | "Dm7"c3 B A2 | "Cmaj7"G3 A G2 | "A7"E6 | "Dm7"A4 A2 | "G7sus4"c3 "G7"B A2 | "Em7"G3 A G2 | "A7"E6 | "Dm7"d4 d2 | "G7"f3 d B2 | "Cmaj7"c6 | "A7"e6 | "Dm7"c3 G E2 | "G7"G3 F D2 | "Cmaj7"C6- | "C6"C6 |]
[V:LH] C,,2 [E,B,]4 | A,,2 [C,G,]4 | D,,2 [F,C]4 | G,,2 [F,B,]4 | D,,2 [F,C]4 | G,,2 [F,B,]4 | C,,2 [E,B,]4 | [G,,F,]2 [C,E,_B,]4 | F,,2 [A,,E,]4 | D,,2 [F,C]4 | C,,2 [E,B,]4 | A,,2 [^C,G,]4 | D,,2 [F,C]4 | G,,2 [F,C]4 | E,,2 [D,G,]4 | A,,2 [^C,G,]4 | D,,2 [F,C]4 | G,,2 [F,B,]4 | C,,2 [E,B,]4 | A,,2 [^C,G,]4 | D,,2 [F,C]4 | G,,2 [F,B,]4 | C,,2 [E,B,]4 | [C,,G,,E,A,]6 |]`,
 an: [
  "<b>Oryginał ma prawie same C i G7.</b> Tutaj prawie każdy takt ma nowy akord – to <i>reharmonizacja</i>: melodia ta sama, harmonia bogatsza.",
  "<b>Takt 2: Am7 zamiast C.</b> Melodia E pasuje do obu, a Am7 (równoległy moll) daje ciepły, smutniejszy kolor.",
  "<b>Takt 8: Gm7 → C7 → Fmaj7.</b> Wstawione II–V prowadzi do F – w oryginale jest tu zwykłe C. Tak jazzmani „przygotowują” akord docelowy.",
  "<b>Takty 12, 16 i 20: A7 → Dm7.</b> A7 to dominanta wtrącona (V/II). Cis w lewej ręce to dźwięk, który ciągnie do D.",
  "<b>Takt 14: G7sus4 → G7.</b> C w melodii nad G to kwarta zawieszona (sus4); gdy melodia schodzi na H, akord rozwiązuje się w zwykłe G7.",
  "<b>Lewa ręka – bas i <i>guide tones</i>:</b> podstawa na „raz”, potem tercja i septyma razem (np. Dm7: F + C, G7: F + H, Cmaj7: E + H). Tercja i septyma to dźwięki prowadzące – niosą całą harmonię.",
  "<b>Rozszerzenia w melodii:</b> pierwsze G–A–G nad Cmaj7 to kwinta–seksta (13)–kwinta, a ostatni akord C6 brzmi miękko jak w balladach Billa Evansa."],
 steps: [
  "Posłuchaj w aplikacji. Porównaj z prostą wersją, którą znasz – gdzie harmonia Cię zaskakuje?",
  "Lewa ręka sama: bas na „raz”, tercja + septyma na „dwa”. Bas krótki, z pedałem lub bez.",
  "Pedał: zmieniaj go na każdym basie (jak w kursie pedału – synkopowo).",
  "Prawa ręka śpiewnie, lekko swingowo w ósemkach (takty 1, 3, 10, 14).",
  "Razem, z podkładem ballady (♩ = 70–84)."]},
{id: "jz-ctih", kind: "ms", title: "Christmas Time Is Here", by: "V. Guaraldi (1965) · for Jazz Piano, arr. Elijah Hemingway", url: JZ_MS + "user/36736188/scores/8688171", pg: 4, lvl: "łatwa–średnia", chords: true, feel: "waltz", swing: true,
 note: "Jazz waltz z „Charlie Brown Christmas” – pełno akordów maj7 i m9. Najpopularniejsza wersja jazzowa na MuseScore."},
{id: "jz-merrylittle", kind: "ms", title: "Have Yourself a Merry Little Christmas", by: "H. Martin, R. Blane (1944) · wersja jazzowa, arr. Brent Edstrom (Hal Leonard)", url: JZ_MS + "official_scores/scores/6950850", pg: 4, lvl: "średnia", off: true, feel: "ballad", swing: true,
 note: "Ballada z bogatą harmonią – rozszerzenia i reharmonizacja jak w lekcji."},
{id: "jz-lulajze", kind: "ms", title: "Lulajże Jezuniu", by: "kolęda polska · opr. cro_pandas", url: JZ_MS + "user/2251896/scores/1512306", pg: 1, lvl: "łatwa", folk: true, feel: "ballad", swing: true,
 note: "Proste opracowanie w 3/4 – jazzową balladę robisz z niego sama, według akordów poniżej.",
 bpm: 66,
 chart: [[{n: "Cmaj7", at: 0}], [{n: "Fmaj7", at: 0}], [{n: "Dm7", at: 0}], [{n: "G9", at: 0}], [{n: "Em7", at: 0}], [{n: "A7", at: 0}], [{n: "Dm7", at: 0}, {n: "G7", at: 1}], [{n: "G7sus4", at: 0}, {n: "Cmaj7", at: 1}],
  [{n: "Em7", at: 0}, {n: "Am7", at: 2}], [{n: "Fmaj7", at: 0}], [{n: "Dm7", at: 0}], [{n: "Dm7", at: 0}, {n: "G7", at: 1}], [{n: "Em7", at: 0}], [{n: "A7", at: 0}], [{n: "Dm7", at: 0}, {n: "G7", at: 1}], [{n: "G7sus4", at: 0}, {n: "C6/9", at: 1}]],
 an: [
  "<b>C-dur, 3/4, ♩ = 80.</b> W nutach melodia jest w prawej ręce, a lewa gra ósemkami rozłożone akordy. Symboli akordów nie ma – jazzowa harmonia jest poniżej, takt po takcie.",
  "<b>Takty 1–8:</b> Cmaj7 | Fmaj7 | Dm7 | G9 | Em7 | A7 | Dm7 → G7 | G7sus4 → Cmaj7. <b>Takty 9–16:</b> Em7 → Am7 | Fmaj7 | Dm7 | Dm7 → G7 | Em7 | A7 | Dm7 → G7 | G7sus4 → C6/9. Podpisz je ołówkiem nad nutami.",
  "<b>Takt 2:</b> melodia G–F–E nad Fmaj7 to nona, pryma i septyma wielka – rozszerzenia z lekcji.",
  "<b>Takty 4 i 12:</b> G9 – melodia A nad G to nona.",
  "<b>Takty 6 i 14: A7</b> to dominanta wtrącona do Dm7 – Cis w lewej ręce ciągnie do D.",
  "<b>Końce fraz (takty 8 i 16): G7sus4 → C.</b> W G7sus4 zamiast tercji H jest kwarta C; melodia F → E rozwiązuje się razem z akordem. Ostatni akord C6/9 (C–E–A–D) brzmi miękko, jak u Billa Evansa."],
 steps: [
  "Melodia z nut prawą ręką, wolno i śpiewnie.",
  "Lewa ręka zamiast ósemek z nut: bas na „raz”, tercja i septyma na „dwa” według akordów powyżej (np. Dm7: D, potem F + C).",
  "Pedał na każdym basie, zmieniany synkopowo.",
  "Z podkładem: zakładka Podkład gra te akordy w tempie ballady – zagraj z nim samą melodię, potem obie ręce.",
  "Na koniec jedna własna zmiana: przed jednym z akordów docelowych wstaw dominantę wtrąconą albo II–V."],},

{id: "jz-bossa", kind: "app", title: "Zimowa bossa", by: "temat bossa nova z aplikacji · a-moll", key: "a-moll", feel: "bossa", swing: false,
 abc: JH("4/4", 112, "Am") +
 `[V:RH] "Am7"e3 d c2 B2 | "Am7"A3 B- B4 | "Bm7b5"A3 F- "E7"F2 ^G2 | "Am7"A6 z2 | "Dm7"d3 c A2 F2 | "G7"B3 A- A2 G2 | "Cmaj7"G3 E- E4 | "Fmaj7"E2 F2 A2 c2 | "Bm7b5"d3 f- f2 d2 | "E7"^G3 B- B2 d2 | "Am7"c3 B A2 E2 | "A7"^c3 e- e2 g2 | "Dm7"f3 e d2 A2 | "E7"B3 ^G- ^G2 E2 | "Am7"A8 | "Am6"A6 z2 |]
[V:LH] A,,3 E,,- E,,3 A,, | A,,3 E,,- E,,3 A,, | B,,3 F,, E,,3 B,, | A,,3 E,,- E,,3 A,, | D,,3 A,,- A,,3 D,, | G,,3 D,,- D,,3 G,, | C,,3 G,,- G,,3 C,, | F,,3 C,- C,3 F,, | B,,3 F,,- F,,3 B,, | E,,3 B,,- B,,3 E,, | A,,3 E,,- E,,3 A,, | A,,3 E,,- E,,3 A,, | D,,3 A,,- A,,3 D,, | E,,3 B,,- B,,3 E,, | A,,3 E,,- E,,3 A,, | A,,8 |]`,
 an: [
  "<b>Ósemki równe!</b> Bossa nova to jedyny styl w tym module bez swingu – rytm jest prosty, ale pełen synkop.",
  "<b>Synkopa:</b> nuta na „i” przywiązana łukiem do następnej miary (np. H w takcie 2, F w takcie 3). Melodia „wyprzedza” miarę – to najbardziej brazylijski element.",
  "<b>Takt 3: Hm7♭5 → E7 → Am7.</b> II–V–I w molu. Hm7♭5 (H–D–F–A) to akord półzmniejszony, E7 ma Gis – podwyższony 7. stopień, jak w gamie a-moll harmonicznej.",
  "<b>Takty 5–8: Dm7 → G7 → Cmaj7 → Fmaj7.</b> Na chwilę C-dur (równoległa tonacja), potem znów II–V w a-moll (takty 9–10).",
  "<b>Takt 12: A7 zamiast Am7</b> – dominanta wtrącona do Dm7. Cis w melodii to tercja A7.",
  "<b>Lewa ręka – bas bossa:</b> podstawa, kwinta przywiązana na „i” po dwójce, podstawa na „i” po czwórce. Tak gra kontrabas w bossie."],
 steps: [
  "Lewa ręka sama, licząc ósemki „1 i 2 i 3 i 4 i” – równo, bez swingu.",
  "Prawa ręka: wystukaj rytm każdego taktu, zanim zagrasz – synkopy liczy się ósemkami.",
  "Razem bardzo wolno (♩ = 70), potem z podkładem bossa.",
  "Graj miękko, mp – bossa jest cicha i elegancka."]},
{id: "jz-wsrod", kind: "ms", title: "Wśród nocnej ciszy", by: "kolęda polska · wersja nowoczesna, arr. Jakub Korbanek", url: JZ_MS + "user/2639561/scores/1374086", pg: 1, lvl: "łatwa", folk: true, feel: "bossa", swing: false,
 note: "Opracowanie z nowoczesną harmonią i synkopowanym akompaniamentem – dobry materiał do zagrania jako bossa (równe ósemki, bas podstawa–kwinta)."},
{id: "jz-silentbossa", kind: "ms", title: "Silent Night, Bossa Night", by: "F. X. Gruber · bossa nova, arr. L. McKinlay (Easy Piano, oficjalna)", url: JZ_MS + "user/97106398/scores/18075718", pg: 2, lvl: "łatwa", off: true, feel: "bossa", swing: false,
 note: "Cicha noc jako bossa nova – ta sama melodia co w lekcji z 4. tematu, inny rytm.",
 an: [
  "<b>F-dur.</b> Lewa ręka przez cały utwór gra ten sam groove bossa novy (ćwierćnuta z kropką i ósemka). Ma być spokojny i nigdy się nie spieszyć.",
  "<b>Prawa ręka gra akordy 3–4-dźwiękowe z melodią na górze</b> – seksty i septymy (np. F6, Fmaj7). Niektóre brzmią dysonansowo, bo dwa dźwięki leżą o sekundę od siebie. To zamierzony jazzowy kolor.",
  "<b>Rytm jest inny niż w kolędzie</b> – melodia ma synkopy. Licz ósemkami: „1 i 2 i 3 i 4 i”.",
  "<b>Nazwij każdy akord prawej ręki</b> (podstawa z lewej ręki + dźwięki z prawej) – to ćwiczenie akordów z tego tematu na prawdziwym utworze.",
  "To łatwiejszy z dwóch utworów tematu – uczysz się go w pierwszej połowie, potem bierzesz Feliz Navidad."],
 steps: [
  "Lewa ręka sama, z podkładem bossa nova z zakładki Podkład.",
  "Prawa ręka: zmiany akordów bardzo wolno, każdy chwyt nazwij.",
  "Razem ♩ = 70–80, potem w tempie.",
  "W drugiej połowie tematu wracaj do niego na powtórkę co 2–3 dni."],},
{id: "jz-feliz", kind: "ms", title: "Feliz Navidad", by: "J. Feliciano (1970) · wersja jazzowa, arr. Brent Edstrom (Hal Leonard)", url: JZ_MS + "official_scores/scores/6930106", pg: 3, lvl: "średnia", off: true, chords: true, feel: "bossa", swing: false,
 note: "Jazzowa bossa nova z akordami nad nutami – trudniejsza z dwóch utworów tematu.",
 an: [
  "<b>D-dur, „Moderate Bossa Nova”, 𝅗𝅥 = 125</b> – licz na 2. Ósemki równe.",
  "<b>Intro (takty 1–4): D6/9 – C13 – E♭6/9 – A7♯5.</b> Cały chwyt przesuwa się o ton w dół (C) i o pół tonu w górę (Es) od toniki. A7♯5 to dominanta z podwyższoną kwintą (Eis) – mocno ciągnie do D.",
  "<b>Takty 5–8: Dmaj13 – C9♯11 – E♭maj13 – A13</b> – ten sam pomysł z bogatszymi akordami. 13 = seksta o oktawę wyżej, ♯11 = zwiększona kwarta.",
  "<b>Zwrotka (od taktu 9): Em7 – A13 – Dmaj7</b> to II–V–I w D-dur; potem G13 – IV stopień grany jak dominanta, typowe dla bluesa i soulu.",
  "<b>Takt 14: A7 → A7♭9 → D.</b> Nona mała (B nad A) to dominanta alterowana – ostrzejsze napięcie przed toniką.",
  "<b>Lewa ręka:</b> bas bossa (podstawa i kwinta, z synkopą przywiązaną), jak w lekcji."],
 steps: [
  "Najpierw intro: każdy akord osobno, nazwij jego dźwięki.",
  "Lewa ręka sama, licząc na 2.",
  "Prawa ręka: zwrotka od taktu 9, akordy wolno.",
  "Razem wolno (𝅗𝅥 = 70), potem z podkładem z zakładki Podkład; cel 𝅗𝅥 = 100–125."],},
{id: "jz-bog", kind: "ms", title: "Bóg się rodzi", by: "kolęda polska · wersja nowoczesna, arr. Jakub Korbanek", url: JZ_MS + "user/2639561/scores/867841", pg: 1, lvl: "łatwa", folk: true, feel: "swing", swing: true,
 note: "Polonez z nowoczesnym akompaniamentem. Spróbuj go zagrać w 4/4 ze swingiem – to klasyczny jazzowy trik na kolędy."},
];

/* ============================== TEMATY ============================== */
const JZ_UNITS = [
{id: "u1", from: "2026-11-21", to: "2026-11-30", title: "Swing i akordy septymowe", short: "Ósemki „długa–krótka”, akcent na 2 i 4, symbole akordów maj7, m7, 7.",
 songs: ["jz-jingle", "jz-winter"],
 lesson: `<p>Jazz różni się od muzyki klasycznej trzema rzeczami, które usłyszysz od pierwszego taktu: <b>rytmem (swing)</b>, <b>harmonią (akordy z septymą)</b> i <b>swobodą (improwizacja)</b>. W tym temacie zaczynamy od dwóch pierwszych.</p>
<h4>Swing</h4>
<p>W nutach jazzowych ósemki są zapisane równo, ale nad utworem stoi „Swing” albo „Swing feel”. Wtedy każdą parę ósemek grasz <b>długa–krótka</b>, mniej więcej jak triola z ćwierćnuty i ósemki. Wolniej – wyraźniej nierówno, szybko – prawie równo.</p>
<p><b>Akcent na 2 i 4.</b> W marszu i w klasyce ważne są 1 i 3. W swingu perkusista gra hi-hat na 2 i 4, a słuchacze pstrykają palcami właśnie tam. Spróbuj: licz „raz, <b>dwa</b>, trzy, <b>czte</b>-ry” i pstrykaj na pogrubionych.</p>
<h4>Symbole akordów</h4>
<p>Nad nutami jazzowymi są nazwy akordów. Litera to podstawa, a dopisek mówi, jaki to akord. <b>Uwaga:</b> symbole są międzynarodowe, więc <b>B = nasze H</b>, a <b>Bb = nasze B</b>. Bb7 to po polsku B7 (B–D–F–As).</p>
<ul>
<li><b>C</b> – C-dur (C–E–G), <b>Cm</b> – c-moll (C–Es–G).</li>
<li><b>Cmaj7</b> – C-dur + septyma <b>wielka</b>: C–E–G–H. Miękki, marzycielski.</li>
<li><b>C7</b> – C-dur + septyma <b>mała</b>: C–E–G–B. To akord dominantowy – znasz go jako D7 z kadencji. Chce iść dalej.</li>
<li><b>Cm7</b> – c-moll + septyma mała: C–Es–G–B. Łagodny, „chłodny”.</li>
<li><b>C6</b> – C-dur + seksta: C–E–G–A. Pogodne zakończenie.</li>
</ul>
<p>Jak budować? Trójdźwięk i jeszcze jedna tercja w górę. Durowy + tercja wielka = maj7, durowy + tercja mała = 7, mollowy + tercja mała = m7.</p>
<h4>Na Twoim utworze</h4>
<p>Uczysz się <b>Jingle Bells ze zwrotką</b>. <b>Zwrotka</b> („Dashing through the snow”, takty 1–8) to prawie same pary ósemek – to na niej ćwiczysz swing. <b>Refren</b> (takty 9–24) znasz na pamięć, więc tam skupiasz się na akordach.</p>
<p>Nad nutami są symbole: Fmaj7, Gm7, C7, Cm7, F7, Bbmaj7, Am7, D7 i F6. Zanim zaczniesz grać, podpisz ołówkiem pod każdym nazwę po polsku i rodzaj: maj7, m7, 7 czy 6. Tam, gdzie po m7 przychodzi 7, a potem maj7 (np. Gm7 → C7 → Fmaj7), masz II–V–I – o nim jest 2. temat.</p>
<h4>Dlaczego lewa ręka gra tylko dwa dźwięki?</h4>
<p>Symbol mówi, jaka jest harmonia, a nie że trzeba zagrać wszystkie dźwięki. W jazzie lewa ręka gra <b>shell voicing</b>: podstawę i jeden „znaczący” dźwięk. Najważniejsze są <b>tercja</b> (dur czy moll) i <b>septyma</b> (7 czy maj7). <b>Kwintę się pomija</b> – nic nie mówi o rodzaju akordu.</p>
<ul>
<li><b>Gm7</b> = G + F (podstawa + septyma), <b>C7</b> = C + E (podstawa + tercja), <b>Fmaj7</b> = F + E (podstawa + septyma).</li>
<li>Górny dźwięk idzie F → E → E: pół tonu w dół i zostaje. Ręka prawie się nie rusza, a głos płynie gładko – dlatego przeplata się septymę i tercję.</li>
<li>Brakujący dźwięk często dopowiada melodia: w takcie 4 prawa ręka gra „c c B G”, więc B (septyma C7) jest w melodii.</li>
</ul>
<p>W 2. temacie dojdą trzydźwiękowe shelle (np. C7 = C–E–B), które brzmią jak pełny akord niezależnie od melodii.</p>`,
 abc: [{src: JH("4/4", 80, "C") + `[V:RH] "Cmaj7"[CEGB]4 "C7"[CEG_B]4 | "Cm7"[C_EG_B]4 "C6"[CEGA]4 | "Fmaj7"[FAce]4 "Gm7"[G_Bdf]4 |]\n[V:LH] C,8 | C,8 | F,4 G,4 |]`, cap: "Cztery rodzaje akordów na C oraz Fmaj7 i Gm7. Zagraj każdy i posłuchaj różnicy."},
       {src: JH("4/4", 90, "C") + `[V:RH] "^zapis"C D E F G A B c | [M:12/8]"^tak brzmi"C2D E2F G2A B2c |]\n[V:LH] z8 | [M:12/8]z12 |]`, cap: "Pierwszy takt: tak się zapisuje. Drugi: tak brzmi swing – długa–krótka, jak triola (tu zapisane w 12/8)."}],
 check: [
  {q: "Jak gra się ósemki w swingu?", opts: ["Równo", "Długa–krótka, jak w trioli", "Krótka–długa"], ok: 1, why: "Zapisane są równo, ale grane z „przytrzymaniem” pierwszej."},
  {q: "Na które miary pada akcent w swingu (4/4)?", opts: ["1 i 3", "2 i 4", "Tylko na 1"], ok: 1, why: "Hi-hat i pstrykanie na 2 i 4 – to „off-beat”."},
  {q: "Z jakich dźwięków składa się Fmaj7?", opts: ["F–A–C–E", "F–A–C–Es", "F–As–C–Es"], ok: 0, why: "Durowy trójdźwięk F + septyma wielka E."},
  {q: "Akord „Bb7” w symbolach jazzowych to po polsku…", opts: ["H7 (H–Dis–Fis–A)", "B7 (B–D–F–As)", "b-moll"], ok: 1, why: "W symbolach międzynarodowych Bb = nasze B, a B = nasze H."}],
 drill: {mode: "full", hint: "Pełny akord w zasadniczej postaci lub w przewrocie, jedną albo dwiema rękami.",
  items: ["Cmaj7", "G7", "Dm7", "Em7", "C7", "Ab7", "Fmaj7", "Am7", "D7", "C6", "Ebmaj7", "Bb7"]},
 band: {feel: "swing", bpm: 104, chart: [["Cmaj7"], ["Cmaj7"], ["G7"], ["G7"], ["Dm7"], ["Em7", "Dm7"], ["G7"], ["Ab7", "G7"]]},
 improv: `<b>Swing na trzech dźwiękach.</b> Włącz podkład tego tematu (zakładka Podkład). Prawą ręką graj tylko C, E i G (dźwięki akordu C) – dowolne kombinacje, ale <b>zawsze ósemkami swingowymi</b> i z akcentem na „i”. Potem grajcie z podkładem „pytanie–odpowiedź”: 2 takty grasz, 2 takty pauzujesz.`,
 listen: ["jl-peterson", "jl-ella"]},

{id: "u2", from: "2026-12-01", to: "2026-12-10", title: "Shell voicings i II–V–I", short: "Lewa ręka po jazzowemu: podstawa + tercja albo septyma. Najważniejsza progresja jazzu.",
 songs: ["jz-letitsnow"],
 lesson: `<h4>Mniej znaczy więcej</h4>
<p>Pianista jazzowy rzadko gra lewą ręką pełne, czterodźwiękowe akordy – brzmią ciężko i zabierają miejsce melodii. Wystarczą <b>najważniejsze dźwięki</b>:</p>
<ul><li><b>podstawa</b> (pryma) – mówi, jaki to akord,</li><li><b>tercja</b> – mówi, czy dur, czy moll,</li><li><b>septyma</b> – mówi, czy maj7, 7, czy m7.</li></ul>
<p>Kwinta prawie nic nie wnosi, więc ją pomijamy. Zostają dwa dźwięki: <b>shell voicing</b> (skorupka) <b>1–7</b> albo <b>1–3</b>.</p>
<h4>II–V–I</h4>
<p>To najważniejsza progresja w jazzie – setki standardów to łańcuchy II–V–I. W F-dur: <b>Gm7 – C7 – Fmaj7</b> (II, V, I stopień). Podstawy idą o kwintę w dół: G → C → F. Znasz to z kadencji: II stopień zastępuje subdominantę, potem dominanta i tonika.</p>
<p><b>Sztuczka:</b> graj II w postaci 1–7, V w postaci 1–3, I znowu 1–7. Wtedy septyma jednego akordu schodzi o pół tonu na tercję następnego (F → E), a ręka prawie stoi. To <i>prowadzenie głosów</i> – dlatego jazz brzmi płynnie.</p>
<h4>Dominanty wtrącone</h4>
<p>Akord septymowy może „pożyczyć” napięcie z innej tonacji i poprowadzić do dowolnego akordu, nie tylko do toniki. W „Let It Snow” (D-dur) środkowa część idzie do A-dur przez <b>E7 → A</b>: E7 jest dominantą dla A, czyli dominantą dominanty (V/V). Takie akordy nazywamy dominantami wtrąconymi.</p>
<h4>Na Twoim utworze</h4>
<p>„Let It Snow” jest w D-dur, więc najważniejsze II–V–I to <b>Em7 – A7 – Dmaj7</b>. W nutach Fabera lewa ręka gra linię basu, a prawa melodię w akordach – symboli akordów nie ma. Twoje zadanie: odczytaj akordy z nut, podpisz je, a potem zagraj lewą ręką shell voicings zamiast basu.</p>`,
 abc: [{src: JH("4/4", 80, "C") + `[V:RH] z8 | z8 | z8 | z8 |]\n[V:LH] "Gm7"[G,,F,]2 "C7"[C,E,]2 "Fmaj7"[F,,E,]4 | "Dm7"[D,C]2 "G7"[G,,B,,]2 "Cmaj7"[C,B,]4 | "Cm7"[C,_B,]2 "F7"[F,A,]2 "Bbmaj7"[_B,,A,]4 | "Em7"[E,D]2 "A7"[A,,^C,]2 "Dmaj7"[D,^C]4 |]`, cap: "II–V–I w F, C, B (Bb) i D (jak w „Let It Snow”) – shell voicings. Zobacz, że jeden dźwięk przesuwa się o pół tonu, a drugi skacze o kwintę."}],
 check: [
  {q: "Shell voicing Gm7 w postaci 1–7 to…", opts: ["G + B", "G + F", "G + D"], ok: 1, why: "Podstawa G i septyma mała F."},
  {q: "II–V–I w C-dur to…", opts: ["Dm7 – G7 – Cmaj7", "Em7 – A7 – Dmaj7", "G7 – Dm7 – Cmaj7"], ok: 0, why: "II stopień d, V stopień G, I stopień C."},
  {q: "Dlaczego pomijamy kwintę?", opts: ["Bo jest dysonansem", "Bo nie mówi, jaki to akord – robią to tercja i septyma", "Bo jest za wysoko"], ok: 1, why: "Tercja i septyma określają rodzaj akordu; kwinta jest taka sama w maj7, 7 i m7."},
  {q: "E7 przed A-dur w „Let It Snow” (D-dur) to…", opts: ["dominanta wtrącona (V/V)", "subdominanta", "akord zmniejszony"], ok: 0, why: "E7 jest dominantą dla A – a A jest dominantą D-dur."}],
 drill: {mode: "shell", seq: true, hint: "Lewa ręka: podstawa na dole + septyma albo tercja. II w postaci 1–7, V w 1–3, I w 1–7.",
  items: ["Em7", "A7", "Dmaj7", "Bm7", "E7", "Amaj7", "Gm7", "C7", "Fmaj7", "Dm7", "G7", "Cmaj7", "Am7", "D7", "Gmaj7"]},
 band: {feel: "swing", bpm: 112, chart: [["Em7"], ["A7"], ["Dmaj7"], ["Dmaj7"], ["Bm7"], ["E7"], ["Amaj7"], ["A7"]]},
 improv: `<b>Guide tones w prawej ręce.</b> Włącz podkład II–V–I (zakładka Podkład, „Ćwiczenie tematu”). Prawą ręką graj tylko <b>tercje i septymy</b> akordów: przy Em7 – G i D, przy A7 – Cis i G, przy Dmaj7 – Fis i Cis. Dowolny rytm, ale szukaj najbliższego dźwięku przy każdej zmianie akordu. Usłyszysz, że sama melodia z tych dźwięków „opowiada” harmonię.`,
 listen: ["jl-tannenbaum", "jl-nkc"]},

{id: "u3", from: "2026-12-11", to: "2026-12-20", title: "Blues i skala bluesowa", short: "Forma 12 taktów, blue notes, rytm Charleston w lewej i pierwsza improwizacja.",
 songs: ["jz-jbblues"],
 lesson: `<h4>Forma 12 taktów</h4>
<p>Blues to najprostsza i najważniejsza forma jazzu. Ma <b>12 taktów</b> i trzy akordy, wszystkie z septymą małą. W C (tonacja Twojego „Jingle Bells Boogie”):</p>
<p class="mono">| C7 | C7 | C7 | C7 |<br>| F7 | F7 | C7 | C7 |<br>| G7 | F7 | C7 | G7 |</p>
<p>Jazzmani dodają do tego II–V i inne kolory – taką wersję gra podkład w zakładce Podkład (F7 już w 2. takcie, Gm7–C7, A7, Dm7–G7). Forma się powtarza; każde przejście 12 taktów to <b>chorus</b>.</p>
<h4>Skala bluesowa</h4>
<p>C-bluesowa: <b>C – Es – F – Fis – G – B – C</b>. To gama pentatoniczna molowa z dodanym dźwiękiem Fis (zwiększona kwarta, „blue note”). Najciekawsze jest to, że Es (tercja mała) gramy nad durowym C7 – ten zgrzyt jest zamierzony. Często Es „ześlizguje się” na E (tercję wielką) – w „Jingle Bells Boogie” zobaczysz to jako przednutkę Dis przed E.</p>
<h4>Rytm Charleston</h4>
<p>Lewa ręka gra akord na <b>„raz”</b> i na <b>„i” po dwójce</b>, potem pauza do końca taktu. Krótko, lekko. Zostawiasz miejsce melodii – pauza to też muzyka.</p>
<h4>Boogie-woogie</h4>
<p>W „Jingle Bells Boogie” lewa ręka gra ósemkami <b>bas boogie-woogie</b>: od C chromatycznie przez Cis i D do E, potem w górę po dźwiękach C7 z sekstą (G, A, B) i z powrotem. Tę samą figurę przenosi się na kolejne akordy bluesa (od F przy F7). To najstarszy fortepianowy styl bluesa. Ćwicz lewą rękę osobno, aż „sama chodzi”, a dopiero potem dokładaj prawą.</p>
<h4>Improwizacja – zasady na start</h4>
<ul><li><b>Mało dźwięków.</b> Zacznij od trzech: C, Es, F. Rytm jest ważniejszy niż nuty.</li>
<li><b>Motyw i powtórzenie.</b> Wymyśl krótki motyw (2–4 dźwięki) i powtarzaj go, zmieniając rytm.</li>
<li><b>Pytanie–odpowiedź.</b> 2 takty grasz, 2 takty słuchasz.</li>
<li><b>Kończ na dźwięku akordu</b> (C, E, G, B nad C7). „Błędny” dźwięk naprawisz, przesuwając go o pół tonu.</li></ul>`,
 abc: [{src: JH("4/4", 80, "C") + `[V:RH] "^skala C-bluesowa"C _E F ^F G _B c2 | c _B G ^F F _E C2 |]\n[V:LH] z8 | z8 |]`, cap: "Skala bluesowa od C w górę i w dół. Fis to blue note."},
       {src: JH("4/4", 90, "C") + `[V:RH] z8 | z8 |]\n[V:LH] "C7"[C,_B,]3 [C,_B,] z4 | "F7"[F,,_E,]3 [F,,_E,] z4 |]`, cap: "Rytm Charleston w lewej ręce: „raz” i „i” po dwójce."},
       {src: JH("4/4", 100, "C") + `[V:RH] z8 | z8 |]\n[V:LH] "C7"C,, ^C,, D,, E,, G,, A,, _B,, A,, | G,, E,, G,, ^F,, E,, D,, ^C,, D,, |]`, cap: "Przykładowa figura basu boogie-woogie na C7 (tak samo zbudowana jak w Twoich nutach)."}],
 check: [
  {q: "Ile taktów ma blues?", opts: ["8", "12", "16"], ok: 1, why: "12 taktów – trzy linie po cztery takty."},
  {q: "Skala bluesowa od C to…", opts: ["C–D–E–F–G–A–H", "C–Es–F–Fis–G–B", "C–E–G–B"], ok: 1, why: "Pentatonika molowa C + blue note Fis."},
  {q: "Rytm Charleston to akord na…", opts: ["1 i 3", "„raz” i „i” po dwójce", "każdą ósemkę"], ok: 1, why: "Krótko na 1, potem na „i” przed trzecią miarą."},
  {q: "Zagrałaś „zły” dźwięk w improwizacji. Co robisz?", opts: ["Przerywasz i zaczynasz od nowa", "Przesuwasz go o pół tonu na dźwięk akordu", "Udajesz, że nic się nie stało, i grasz głośniej"], ok: 1, why: "Dysonans rozwiązany o pół tonu brzmi jak zamierzony ozdobnik."}],
 drill: {mode: "shell", seq: true, hint: "Forma bluesa po kolei, shell voicings w lewej ręce. Mierzę czas całego chorusa.",
  items: ["C7", "F7", "C7", "Gm7", "C7", "F7", "F7", "C7", "A7", "Dm7", "G7", "C7", "A7", "Dm7", "G7"]},
 band: {feel: "swing", bpm: 120, chart: [["C7"], ["F7"], ["C7"], ["Gm7", "C7"], ["F7"], ["F7"], ["C7"], ["A7"], ["Dm7"], ["G7"], ["C7", "A7"], ["Dm7", "G7"]]},
 improv: `<b>Pierwszy chorus.</b> Włącz podkład bluesa (12 taktów w pętli). 1. chorus: tylko <b>C, Es, F</b> – krótkie motywy i pauzy. 2. chorus: cała skala bluesowa od C. 3. chorus: jeden riff powtarzany przez cały chorus (np. G–B–C). Lewą ręką możesz też grać bas boogie z Twoich nut.`,
 listen: ["jl-charlesbrown", "jl-chuckberry"]},

{id: "u4", from: "2026-12-21", to: "2026-12-30", title: "Ballada, rozszerzenia i reharmonizacja", short: "Guide tones w lewej, nony i tercdecymy, jak zamienić proste akordy na jazzowe.",
 songs: ["jz-lulajze"],
 lesson: `<h4>Rozszerzenia: 9, 11, 13</h4>
<p>Nad septymą możemy dokładać kolejne tercje: <b>9</b> (nona, = sekunda o oktawę wyżej), <b>11</b> (undecyma, = kwarta) i <b>13</b> (tercdecyma, = seksta). Cmaj9 = C–E–G–H–D. Te dźwięki nie są „błędne” – to kolory. Często są w samej melodii: pierwsze nuty „Cichej nocy” (G–A–G) nad Cmaj7 to kwinta, 13 i kwinta.</p>
<h4>Guide tones</h4>
<p>W balladzie lewa ręka gra <b>bas na „raz”</b> i potem <b>tercję + septymę</b> razem. Tercja i septyma to <i>guide tones</i>, dźwięki prowadzące: w II–V–I septyma jednego akordu schodzi na tercję następnego (Dm7: F+C → G7: F+H → Cmaj7: E+H). Dwa palce prawie stoją, a harmonia płynie.</p>
<h4>Reharmonizacja – trzy proste sztuczki</h4>
<ul><li><b>Krewniak zamiast toniki:</b> C → Am7 albo Em7 (mają te same dźwięki co melodia).</li>
<li><b>II–V przed celem:</b> chcesz dojść do F? Zagraj przed nim Gm7–C7.</li>
<li><b>Dominanta wtrącona:</b> przed Dm7 wstaw A7 (V/II), przed Em7 – H7 (B7).</li></ul>
<p>Drugi przykład poniżej to „Cicha noc”: ta sama melodia najpierw z akordami z kolędnika, potem po jazzowemu. Te same sztuczki zastosujesz w „Lulajże Jezuniu”: w zakładce <b>Utwór</b> masz jazzowe akordy do Twoich nut takt po takcie (Cmaj7, Fmaj7, Dm7, G9, A7, G7sus4, C6/9), a w zakładce <b>Podkład</b> zespół gra je w tempie ballady.</p>
<h4>Ballada i pedał</h4>
<p>Tempo wolne, ósemki lekko swingowe, dużo powietrza. Pedał zmieniaj na każdym basie, synkopowo – tak jak w kursie pedału.</p>`,
 abc: [{src: JH("3/4", 70, "C") + `[V:RH] "Cmaj7"[EGB]6 | "Cmaj9"[EGBd]6 | "Dm9"[FAce]6 | "G13"[FBe]6 |]\n[V:LH] C,6 | C,6 | D,6 | G,,6 |]`, cap: "Cmaj7, Cmaj9, Dm9, G13 – posłuchaj, jak rozszerzenia „otwierają” brzmienie."},
       {src: JH("3/4", 70, "C") + `[V:RH] "^oryginał C"G3 A G2 | "G7"E6 | "^jazz Cmaj7"G3 A G2 | "Am7"E6 |]\n[V:LH] [C,E,G,]6 | [G,,B,,F,]6 | C,,2 [E,B,]4 | A,,2 [C,G,]4 |]`, cap: "Reharmonizacja: ta sama melodia, najpierw z kolędnika, potem po jazzowemu."}],
 check: [
  {q: "Nona (9) nad C to dźwięk…", opts: ["D", "F", "A"], ok: 0, why: "Sekunda o oktawę wyżej."},
  {q: "Guide tones G7 to…", opts: ["G i D", "H i F", "G i H"], ok: 1, why: "Tercja H i septyma F."},
  {q: "Chcesz dojść do Fmaj7. Co wstawiasz przed nim?", opts: ["Gm7–C7", "Em7–A7", "Bbmaj7"], ok: 0, why: "II–V w F-dur."},
  {q: "A7 przed Dm7 to…", opts: ["dominanta wtrącona", "subdominanta", "akord zawieszony"], ok: 0, why: "A7 jest dominantą dla d-moll (V/II w C-dur)."}],
 drill: {mode: "guide", seq: true, hint: "Lewa ręka: tylko tercja i septyma (bas możesz dodać). Szukaj najbliższego chwytu.",
  items: ["Cmaj7", "Fmaj7", "Dm7", "G7", "Em7", "A7", "Dm7", "G7", "Cmaj7", "Am7", "Fmaj7", "G7"]},
 band: {feel: "ballad", bpm: 76, chart: [["Cmaj7"], ["Am7"], ["Dm7"], ["G7"]]},
 improv: `<b>Wypełnienia (fills).</b> Włącz podkład „Lulajże Jezuniu” (zakładka Podkład). W długich nutach na końcach fraz (takty 4, 8, 12, 16) prawa ręka trzyma nutę, a potem dogrywa krótki motyw z dźwięków akordu – jak pianista, który akompaniuje śpiewakowi i odpowiada mu w pauzach. Spróbuj użyć rozszerzeń: nad Cmaj7 D (9), nad Am7 H (9), nad G7 E (13).`,
 listen: ["jl-ctih", "jl-silentnight"]},

{id: "u5", from: "2026-12-31", to: "2027-01-10", title: "Bossa nova i bogate akordy", short: "Równe ósemki i synkopy, bas bossa, rozszerzenia 13 i ♯11, dominanta alterowana. Dwa utwory.",
 songs: ["jz-silentbossa", "jz-feliz"], all: true,
 lesson: `<h4>Bossa nova</h4>
<p>Bossa nova („nowa fala”) narodziła się w Brazylii pod koniec lat 50. – Antônio Carlos Jobim, João Gilberto, potem Stan Getz. To połączenie samby i jazzowej harmonii.</p>
<ul><li><b>Ósemki równe</b> – nie swingujemy!</li>
<li><b>Synkopy:</b> melodia często zaczyna się na „i” i jest przywiązana do następnej miary. Licz ósemkami: „1 i 2 i 3 i 4 i”.</li>
<li><b>Bas:</b> podstawa na „raz”, kwinta na „i” po dwójce (przywiązana), podstawa na „i” po czwórce.</li>
<li><b>Dynamika:</b> cicho, miękko, bez akcentów – „szept”, nie śpiew na scenie.</li></ul>
<h4>Dwa utwory, dwa poziomy</h4>
<p>W tym temacie uczysz się obu utworów: przez pierwsze 5 dni <b>„Silent Night, Bossa Night”</b> (F-dur, łatwiejszy), potem <b>„Feliz Navidad”</b> (D-dur, jazzowa aranżacja Brenta Edstroma), wracając do „Silent Night” na powtórki.</p>
<h4>Akordy z kolorem: 6, 9, 13, ♯11</h4>
<p>W „Silent Night, Bossa Night” prawa ręka gra akordy z sekstą i septymą (F6, Fmaj7), a w „Feliz Navidad” są jeszcze bogatsze: <b>D6/9</b> (D–Fis–H–E), <b>C13</b>, <b>Dmaj13</b>, <b>C9♯11</b>. Liczby mówią, które dźwięki dodać ponad septymę: 9 = sekunda, 11 = kwarta (♯11 – zwiększona), 13 = seksta, wszystkie o oktawę wyżej.</p>
<h4>Dominanta alterowana</h4>
<p>Przed toniką Edstrom zaostrza dominantę: <b>A7♯5</b> (kwinta podwyższona – Eis) w intro i <b>A7♭9</b> (nona mała – B) w zwrotce. To wciąż A7, tylko z ostrzejszym dźwiękiem, który jeszcze mocniej ciągnie do D.</p>
<h4>Przesuwanie akordów</h4>
<p>Intro „Feliz Navidad”: <b>D6/9 – C13 – E♭6/9 – A7♯5</b>. Cały chwyt zjeżdża o ton w dół (C) i wjeżdża pół tonu nad tonikę (Es), a A7♯5 sprowadza wszystko z powrotem do D. To częsty jazzowy trik: ten sam kształt dłoni, przesunięty po klawiaturze.</p>`,
 abc: [{src: JH("4/4", 80, "C") + `[V:RH] "D6/9"[^FBe]4 "C13"[E_Ba]4 | "Eb6/9"[Gcf]4 "A7#5"[G^c=f]4 | "D6/9"[^FBe]8 |]\n[V:LH] D,8 | _E,4 A,,4 | D,8 |]`, cap: "Akordy z intro „Feliz Navidad” (uproszczone chwyty): D6/9 – C13 – E♭6/9 – A7♯5 – D6/9."},
       {src: JH("4/4", 90, "Am") + `[V:RH] z8 | z8 |]\n[V:LH] "Am7"A,,3 E,,- E,,3 A,, | "Dm7"D,,3 A,,- A,,3 D,, |]`, cap: "Bas bossa nova: podstawa, kwinta przywiązana, podstawa na „i”."}],
 check: [
  {q: "Ósemki w bossie gramy…", opts: ["swingowo", "równo", "punktowane"], ok: 1, why: "Bossa to styl z równymi ósemkami."},
  {q: "A7♭9 to A7 z dodanym dźwiękiem…", opts: ["B (nona mała)", "H (nona wielka)", "Fis (seksta)"], ok: 0, why: "♭9 = nona mała: pół tonu nad podstawą, o oktawę wyżej."},
  {q: "Em7 – A13 – Dmaj7 w „Feliz Navidad” to…", opts: ["II–V–I w D-dur", "I–IV–V w e-moll", "12-taktowy blues"], ok: 0, why: "E – II stopień, A – V stopień, D – tonika."},
  {q: "D6/9 to…", opts: ["D–Fis–H–E", "D–Fis–A–C", "D–F–A–C"], ok: 0, why: "Durowy akord z sekstą (H) i noną (E), zwykle bez kwinty."}],
 drill: {mode: "full", seq: true, hint: "Pełne akordy, dowolny przewrót. Najpierw akordy z „Silent Night” (F-dur), potem z „Feliz Navidad” (D-dur).",
  items: ["Fmaj7", "F6", "Gm7", "C7", "Bbmaj7", "Dm7", "Em7", "A7", "Dmaj7", "D6", "G7", "Bm7"]},
 band: {feel: "bossa", bpm: 112, chart: [["Em7"], ["A13"], ["Dmaj7", "G13"], ["Dmaj7"], ["Em7"], ["A7", "A7b9"], ["Dmaj7"], ["Dmaj7"]]},
 improv: `<b>Melodia z gamy.</b> Włącz podkład bossa (akordy zwrotki „Feliz Navidad”). Graj w prawej ręce gamę D-dur, ale <b>w rytmie bossy</b>: zaczynaj frazy na „i”, przywiązuj nuty do następnej miary. Gdy przyjdzie A7♭9, zagraj B i rozwiąż je na A – usłyszysz, jak ciągnie do D.`,
 listen: ["jl-ipanema", "jl-xmasbossa"]},

{id: "u6", from: "2027-01-11", to: "2027-01-15", title: "Twoja aranżacja i nagranie", short: "Intro, temat, solo, zakończenie – składasz całość i nagrywasz się na koniec modułu.",
 songs: ["jz-jingle", "jz-winter", "jz-letitsnow", "jz-jbblues", "jz-lulajze", "jz-silentbossa", "jz-feliz"],
 lesson: `<h4>Forma jazzowego wykonania</h4>
<p>Jazzowy utwór rzadko gra się raz od początku do końca. Typowo: <b>intro → temat → solo → temat → zakończenie</b>.</p>
<h4>Intro</h4>
<ul><li><b>Ostatnie 4 takty utworu</b> – najprostsze i zawsze działa.</li>
<li><b>Vamp II–V:</b> np. Gm7–C7 dwa albo cztery razy, aż „wejdziesz” w temat.</li></ul>
<h4>Solo</h4>
<p>Jeden chorus improwizacji na akordach utworu – albo, jeśli wolisz, temat zagrany drugi raz po swojemu: oktawę wyżej, z innym rytmem, z wypełnieniami w pauzach.</p>
<h4>Zakończenie</h4>
<ul><li><b>Tag:</b> powtórz ostatnią frazę 2–3 razy, za każdym razem z innym akordem przed toniką (np. Am7–D7–Gm7–C7).</li>
<li><b>Zakończenie „Count Basie”:</b> po ostatnim akordzie trzy krótkie, ciche dźwięki wysoko (np. C–C–F) i mocny bas.</li>
<li><b>Akord z rozszerzeniem:</b> zamiast F zagraj F6/9 (F–A–D–G) i trzymaj z pedałem.</li></ul>
<h4>Nagranie</h4>
<p>Nagraj się telefonem i posłuchaj trzy razy: raz tylko rytmu (czy swing jest długa–krótka?), raz lewej ręki (czy jest w czasie?), raz melodii (czy śpiewa?). To najszybszy sposób, żeby usłyszeć siebie z zewnątrz.</p>`,
 abc: [{src: JH("4/4", 100, "F") + `[V:RH] "Fmaj7"A2 A2 A4 | "Am7"c4 "D7"c4 | "Gm7"B4 "C7"G4 | "F6/9"[Ad]4 z4 | z2 c' c' z f'2 z2 |]\n[V:LH] [F,,E,]8 | [A,,G,]4 [D,^F,]4 | [G,,F,]4 [C,E,]4 | [F,,D,G,]4 z4 | z4 F,,,2 z2 |]`, cap: "Przykład zakończenia: tag z Am7–D7–Gm7–C7, akord F6/9 i „Count Basie”."}],
 check: [
  {q: "Najprostsze intro to…", opts: ["ostatnie 4 takty utworu", "gama chromatyczna", "kadencja I–IV–V–I w C-dur"], ok: 0, why: "Słuchacz od razu słyszy tonację i nastrój."},
  {q: "Tag to…", opts: ["powtórzenie ostatniej frazy z nowymi akordami", "solo perkusji", "zmiana tonacji"], ok: 0, why: "Każde powtórzenie odsuwa tonikę i buduje napięcie."}],
 drill: {mode: "shell", hint: "Mieszanka ze wszystkich tematów – shell voicings (1–7 albo 1–3).",
  items: ["Fmaj7", "Gm7", "C7", "Bb7", "D7", "Cmaj7", "Am7", "A7", "Dm7", "G7", "E7", "Ebmaj7"]},
 band: {feel: "swing", bpm: 108, chart: [["Gm7"], ["C7"], ["Gm7"], ["C7"]]},
 improv: `<b>Złóż całość.</b> Wybierz utwór z modułu, zaplanuj w karcie „Moja aranżacja” intro, solo i zakończenie, zagraj z podkładem i nagraj się. Nie musi być idealnie – ważne, żeby było Twoje.`,
 listen: ["jl-skating", "jl-koledy"]}
];

/* ============================== SŁUCHANIE ============================== */
const JZ_LISTEN = {
 "jl-peterson": {who: "Oscar Peterson", title: "Jingle Bells", from: "An Oscar Peterson Christmas (1995)", q: "Oscar Peterson Jingle Bells",
  tips: ["Policz, ile razy wraca temat – reszta to improwizacja na tych samych akordach.", "Posłuchaj perkusji: hi-hat na 2 i 4.", "Kontrabas gra cztery ćwierćnuty w takcie – to „walking bass”, który robi aplikacja w podkładzie."]},
 "jl-ella": {who: "Ella Fitzgerald", title: "Jingle Bells", from: "Ella Wishes You a Swinging Christmas (1960)", q: "Ella Fitzgerald Jingle Bells Swinging Christmas",
  tips: ["Big band: sekcja dęta odpowiada wokalistce w pauzach (call and response).", "Ella śpiewa ósemki dokładnie „długa–krótka” – naśladuj ją w prawej ręce."]},
 "jl-tannenbaum": {who: "Vince Guaraldi Trio", title: "O Tannenbaum", from: "A Charlie Brown Christmas (1965)", q: "Vince Guaraldi O Tannenbaum",
  tips: ["Najpierw temat wolno i spokojnie, potem nagle swing – dwa charaktery jednej kolędy.", "Lewa ręka Guaraldiego gra krótkie, dwu- i trzydźwiękowe akordy – tak jak Twoje shell voicings."]},
 "jl-nkc": {who: "Nat King Cole", title: "The Christmas Song", from: "1961", q: "Nat King Cole The Christmas Song",
  tips: ["Harmonia pełna II–V–I – spróbuj usłyszeć, kiedy akord „idzie do domu”.", "Nat King Cole był też świetnym pianistą jazzowym – posłuchaj fortepianu w pauzach."]},
 "jl-charlesbrown": {who: "Charles Brown", title: "Merry Christmas Baby", from: "1947", q: "Charles Brown Merry Christmas Baby",
  tips: ["Wolny blues – policz 12 taktów pierwszej zwrotki.", "Fortepian gra triole i „ześlizgi” z blue note na tercję – to samo usłyszysz w „Jingle Bells Boogie”."]},
 "jl-chuckberry": {who: "Chuck Berry", title: "Run Rudolph Run", from: "1958", q: "Chuck Berry Run Rudolph Run",
  tips: ["Klasyczny 12-taktowy blues w rock'n'rollowym tempie – łatwo policzyć formę.", "Fortepian w tle gra szybkie powtórzenia akordów (boogie) – przykład, że blues to też zabawa."]},
 "jl-ctih": {who: "Vince Guaraldi Trio", title: "Christmas Time Is Here (instrumental)", from: "A Charlie Brown Christmas (1965)", q: "Vince Guaraldi Trio Christmas Time Is Here instrumental",
  tips: ["Jazz waltz: 3/4 z miotełkami na werblu.", "Akordy maj7 i m9 – wszystkie „miękkie”. Usłysz rozszerzenia z lekcji.", "Melodia ma dużo długich nut – fortepian wypełnia je małymi motywami."]},
 "jl-silentnight": {who: "różni wykonawcy", title: "Silent Night – ballada na trio jazzowe", from: "wyszukiwanie", q: "Silent Night jazz piano trio",
  tips: ["Wybierz wersję fortepianową i porównaj harmonię z wersją z aplikacji.", "Zwróć uwagę, gdzie pianista dodaje akord przed toniką (II–V)."]},
 "jl-ipanema": {who: "Stan Getz, João Gilberto", title: "The Girl from Ipanema", from: "Getz/Gilberto (1964)", q: "Getz Gilberto The Girl from Ipanema",
  tips: ["Wzorcowa bossa nova: gitara gra synkopowane akordy, bas – podstawa i kwinta.", "Wszystko cicho, miękko – posłuchaj, jak mało głośności potrzeba."]},
 "jl-xmasbossa": {who: "różni wykonawcy", title: "Świąteczna bossa nova", from: "wyszukiwanie", q: "Christmas bossa nova",
  tips: ["Wybierz jedną znaną kolędę w bossie i posłuchaj, jak zmieniono jej rytm (synkopy).", "Czy ósemki są równe? Powinny!"]},
 "jl-skating": {who: "Vince Guaraldi Trio", title: "Skating", from: "A Charlie Brown Christmas (1965)", q: "Vince Guaraldi Skating",
  tips: ["Posłuchaj formy: intro – temat – improwizacja – temat – zakończenie.", "Zakończenie jest ciche i „rozpływa się” – jeden z pomysłów na Twoją aranżację."]},
 "jl-koledy": {who: "polscy pianiści jazzowi", title: "Kolędy na jazzowo", from: "wyszukiwanie", q: "kolędy jazz fortepian",
  tips: ["Znajdź kolędę, którą znasz, i posłuchaj, które akordy zostały zmienione.", "Może to będzie Twój następny utwór po module?"]}
};

/* ============================== STAN I KALENDARZ ============================== */
function jzS() { if (!S.jazz) S.jazz = {}; const J = S.jazz; for (const k of ["pick", "songs", "lesson", "drill", "heard", "play", "arr"]) if (!J[k]) J[k] = {}; return J; }
const jzOn = (key) => !isBeg() && key >= JZ_START && key <= JZ_END;
const jzArchived = () => todayKey() > JZ_END;
const jzSongById = (id) => JZ_SONGS.find(s => s.id === id) || null;
function jzUnitFor(key) { return JZ_UNITS.find(u => key >= u.from && key <= u.to) || (key < JZ_START ? JZ_UNITS[0] : JZ_UNITS[JZ_UNITS.length - 1]); }
function jzDaysBetween(a, b) { return Math.round((new Date(b + "T12:00") - new Date(a + "T12:00")) / 86400000); }
function jzSong(u, key) {
  const id = jzS().pick[u.id];
  if (id && u.songs.includes(id)) return jzSongById(id);
  if (u.all) { const k = key || todayKey(), len = jzDaysBetween(u.from, u.to) + 1, d = Math.max(0, Math.min(len - 1, jzDaysBetween(u.from, k))); return jzSongById(u.songs[Math.min(u.songs.length - 1, Math.floor(d / Math.ceil(len / u.songs.length)))]); }
  return jzSongById(u.songs[0]);
}
const jzStage = (id) => jzS().songs[id] || 0;
const JZ_STAGES = ["nie zaczęty", "rozczytuję", "razem wolno", "w tempie ze swingiem", "gotowe"];
const jzStageName = (s, song) => s === 3 && song && !song.swing ? "w tempie" : JZ_STAGES[s];
function jzAbcById(id, k) {
  const s = jzSongById(id); if (s) return +k > 0 && s.parts ? (s.parts[+k - 1] || {}).abc || null : s.abc || null;   // k > 0: fragment utworu (parts)
  const m = id.match(/^jzl-(u\d)$/); if (m) { const u = JZ_UNITS.find(x => x.id === m[1]); return u && u.abc && u.abc[+k || 0] ? u.abc[+k || 0].src : null; }
  return null;
}
function jzCheck(id, qi) { const u = JZ_UNITS.find(x => x.id === id); return u && u.check[qi]; }

/* ============================== AKORDY ============================== */
// rodzaj akordu → [półtony, stopień (1, 3, 5, 7, 6, 9…)] – stopnie potrzebne do pisowni nazw dźwięków
const JZ_Q = {
  "maj7": [[0, 1], [4, 3], [7, 5], [11, 7]], "maj9": [[0, 1], [4, 3], [7, 5], [11, 7], [14, 9]],
  "m7": [[0, 1], [3, 3], [7, 5], [10, 7]], "m9": [[0, 1], [3, 3], [7, 5], [10, 7], [14, 9]], "m6": [[0, 1], [3, 3], [7, 5], [9, 6]],
  "m7b5": [[0, 1], [3, 3], [6, 5], [10, 7]], "dim7": [[0, 1], [3, 3], [6, 5], [9, 7]],
  "7": [[0, 1], [4, 3], [7, 5], [10, 7]], "9": [[0, 1], [4, 3], [7, 5], [10, 7], [14, 9]], "13": [[0, 1], [4, 3], [10, 7], [21, 13]],
  "7sus4": [[0, 1], [5, 4], [7, 5], [10, 7]], "7b9": [[0, 1], [4, 3], [7, 5], [10, 7], [13, 9]],
  "6": [[0, 1], [4, 3], [7, 5], [9, 6]], "6/9": [[0, 1], [4, 3], [9, 6], [14, 9]], "m": [[0, 1], [3, 3], [7, 5]], "": [[0, 1], [4, 3], [7, 5]]
};
const JZ_LET = "CDEFGAB", JZ_NAT = [0, 2, 4, 5, 7, 9, 11];
function jzChord(name) {
  const m = String(name).match(/^([A-G])(b|#)?(.*)$/); if (!m) return null;
  const li = JZ_LET.indexOf(m[1]), acc = m[2] === "b" ? -1 : m[2] === "#" ? 1 : 0, q = m[3] in JZ_Q ? m[3] : null;
  if (q === null) return null;
  const root = (JZ_NAT[li] + acc + 12) % 12;
  const tones = JZ_Q[q].map(([semi, deg]) => {
    const l2 = (li + deg - 1) % 7, pc = (root + semi) % 12;
    let a = pc - JZ_NAT[l2]; if (a > 6) a -= 12; if (a < -6) a += 12;
    return {semi, deg, pc, name: plNoteName(l2 === 6 ? 6 : l2, a)};
  });
  return {name, root, q, tones};
}
// nazwy akordów po polsku do wyświetlenia (Bb → B, B → H)
function jzChordLabel(name) {
  return String(name).replace(/^([A-G])(b|#)?/, (x, L, a) => (L === "B" ? (a === "b" ? "B" : a === "#" ? "His" : "H") : L + (a === "b" ? ({E: "s", A: "s"}[L] ? "s" : "es") : a === "#" ? "is" : "")))
    .replace(/m7b5$/, "m7♭5").replace(/b9$/, "♭9");
}
const jzSym = (name) => String(name).replace(/^([A-G])b/, "$1♭").replace(/^([A-G])#/, "$1♯").replace(/m7b5$/, "m7♭5").replace(/7b9$/, "7♭9");
const jzToneByDeg = (c, d) => c.tones.find(t => t.deg === d);
// lewa ręka: podstawa w okolicy F2–E3, nad nią wybrane stopnie
function jzVoicing(name, kind) {
  const c = jzChord(name); if (!c) return [];
  let r = 36 + c.root; if (r < 40) r += 12;            // E2–D#3
  const up = (semi) => r + (semi % 12 === 0 ? 12 : semi % 12);
  const t3 = jzToneByDeg(c, 3) || jzToneByDeg(c, 4), t7 = jzToneByDeg(c, 7) || jzToneByDeg(c, 6), t5 = jzToneByDeg(c, 5);
  if (kind === "shell7") return [r, r + ((t7 ? t7.semi : 10) % 12)];
  if (kind === "shell3") return [r, r + (t3 ? t3.semi : 4)];
  if (kind === "guide") { const place = (t) => { let m = 48 + t.pc; while (m < 52) m += 12; while (m > 63) m -= 12; return m; }; return [r, place(t3 || {pc: (c.root + 4) % 12}), place(t7 || {pc: (c.root + 10) % 12})].sort((x, y) => x - y); }
  return [r, r + (t3 ? t3.semi : 4), r + (t5 ? t5.semi : 7), r + ((t7 ? t7.semi : 10) % 12 || 12)].sort((x, y) => x - y);
}
// akompaniament fortepianu do podkładu: tercja i septyma + 9 albo 13, w okolicy środkowego C
function jzCompNotes(name) {
  const c = jzChord(name); if (!c) return [];
  const pick = [3, 7, 6, 9].map(d => jzToneByDeg(c, d)).filter(Boolean).slice(0, 3);
  return pick.map(t => { let m = 48 + t.pc; while (m < 52) m += 12; while (m > 66) m -= 12; return m; }).sort((a, b) => a - b);
}
// czy trzymane klawisze to ten akord w żądanej postaci
function jzMatch(name, mode, held) {
  const c = jzChord(name); if (!c || held.length < 2) return false;
  const pcs = new Set(held.map(m => m % 12)), low = held[0] % 12;
  const pc = (d) => { const t = jzToneByDeg(c, d); return t ? t.pc : null; };
  const all = new Set(c.tones.map(t => t.pc));
  if (mode === "full") { if (pcs.size !== all.size) return false; for (const p of all) if (!pcs.has(p)) return false; return true; }
  const r = c.root, t3 = pc(3) !== null ? pc(3) : pc(4), t7 = pc(7) !== null ? pc(7) : pc(6);
  if (mode === "shell") {
    if (low !== r || !pcs.has(r)) return false;
    for (const p of pcs) if (p !== r && p !== t3 && p !== t7) return false;
    return pcs.has(t3) || pcs.has(t7);
  }
  if (mode === "guide") {
    if (!pcs.has(t3) || !pcs.has(t7)) return false;
    const ok = new Set([r, t3, t7, pc(9), pc(5)]);
    for (const p of pcs) if (!ok.has(p)) return false;
    return true;
  }
  return false;
}
const jzIsDom = (name) => { const c = jzChord(name); return !!c && ["7", "9", "13", "7b9", "7sus4"].includes(c.q); };
const jzShellKind = (name) => jzIsDom(name) ? "shell3" : "shell7";
function jzKbSvg(notes, lo, hi) {
  lo = lo || 36; hi = hi || 72;
  const on = new Set(notes), W = 12, H = 58; let x = 0, wh = "", bl = "";
  for (let m = lo; m <= hi; m++) {
    if ([1, 3, 6, 8, 10].includes(m % 12)) { bl += `<rect class="b${on.has(m) ? " on" : ""}" x="${x - 3.5}" y="0" width="7" height="${H * 0.62}" rx="1"/>`; continue; }
    wh += `<rect class="w${on.has(m) ? " on" : ""}" x="${x}" y="0" width="${W}" height="${H}" rx="1.5"/>`;
    if (m === 60) wh += `<circle class="cdot" cx="${x + W / 2}" cy="${H + 6}" r="2.5"/>`;
    x += W;
  }
  return `<svg class="mkb" viewBox="-1 -1 ${x + 2} ${H + 12}" aria-hidden="true">${wh}${bl}</svg>`;
}
function jzPlayChord(notes, t, dur, vol) { const c = ac(); t = t || c.currentTime + 0.02; notes.forEach((m, i) => tone(m, t + i * 0.012, dur || 1.4, vol || 0.15)); }

/* ============================== NUTY Z ABCJS ============================== */
// nuty utworu (czasy w całych nutach) – z abcjs, żeby łuki, akordy i znaki chromatyczne były policzone tak samo jak w nutach
const JZ_NOTES = {};
function jzNotes(id, abcIn) {
  if (JZ_NOTES[id]) return JZ_NOTES[id];
  const abc = abcIn || jzAbcById(id, 0); if (!abc || !window.ABCJS) return null;
  let host = document.getElementById("jz-hidden");
  if (!host) { host = document.createElement("div"); host.id = "jz-hidden"; host.style.cssText = "position:absolute;left:-9999px;top:0;width:600px;visibility:hidden"; document.body.appendChild(host); }
  try {
    const vo = window.ABCJS.renderAbc(host, abc, {add_classes: true})[0]; vo.setUpAudio();
    const out = [];
    vo.makeVoicesArray().forEach((voice, vi) => { for (const e of voice) { const a = e.elem && e.elem.abcelem; if (!a || a.el_type !== "note" || a.rest || !a.midiPitches) continue; for (const p of a.midiPitches) out.push({w: p.start, d: p.duration, p: p.pitch, v: vi}); } });
    let meter = null; try { meter = vo.getMeterFraction(); } catch (e) {}
    host.innerHTML = "";
    const bpm = (abcParse(abc) || {}).bpm || 100;
    return (JZ_NOTES[id] = {notes: out, bpm, beats: meter && meter.num || 4});
  } catch (e) { return null; }
}
// swing: ósemka na „i” przesuwa się na 2/3 miary (czas w całych nutach, miara = ćwierćnuta)
const JZ_RATIO = 0.64;
function jzSw(w) { const pos = w * 4, b = Math.floor(pos + 1e-6), f = pos - b; return Math.abs(f - 0.5) < 1e-3 ? (b + JZ_RATIO) / 4 : w; }
// pasek pianina (midiplay.js) woła to po zbudowaniu kroków: utwory swingowe sprawdzamy ze swingiem
function jzMpBuilt(src, built) {
  if (!src || !src.startsWith("jazz:")) return;
  const s = jzSongById(src.split(":")[1]); if (!s || !s.swing) return;
  for (const st of built.steps) { const w0 = st.w; st.w = jzSw(w0); for (const n of st.notes) n.d = jzSw(w0 + n.d) - st.w; }
}

/* ============================== DŹWIĘK: ZESPÓŁ ============================== */
let JZ_NOISE = null;
function jzNoise() {
  const c = ac(); if (JZ_NOISE && JZ_NOISE.sampleRate === c.sampleRate) return JZ_NOISE;
  const b = c.createBuffer(1, c.sampleRate, c.sampleRate), d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return (JZ_NOISE = b);
}
function jzOut() { const c = ac(); if (!JZ_BAND.out || JZ_BAND.out.context !== c) { JZ_BAND.out = c.createGain(); JZ_BAND.out.gain.value = 1; JZ_BAND.out.connect(c.destination); } return JZ_BAND.out; }
function jzHit(t, {type = "highpass", f = 7000, q = 0.7, dur = 0.05, vol = 0.05, att = 0.002}) {
  const c = ac(), s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
  s.buffer = jzNoise(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
  s.connect(fl); fl.connect(g); g.connect(jzOut());
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + att); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
}
const jzRide = (t, acc) => jzHit(t, {type: "bandpass", f: 6500, q: 1.2, dur: 0.45, vol: acc ? 0.05 : 0.032});
const jzHat = (t) => jzHit(t, {f: 8000, dur: 0.05, vol: 0.05});
const jzBrush = (t, vol) => jzHit(t, {type: "bandpass", f: 2600, q: 0.6, dur: 0.22, vol: vol || 0.02, att: 0.06});
const jzShaker = (t, acc) => jzHit(t, {f: 9000, dur: 0.04, vol: acc ? 0.03 : 0.016});
function jzRim(t) {
  const c = ac(), o = c.createOscillator(), g = c.createGain();
  o.type = "triangle"; o.frequency.value = 1750; o.connect(g); g.connect(jzOut());
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.09, t + 0.001); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
  o.start(t); o.stop(t + 0.06); jzHit(t, {type: "bandpass", f: 3000, dur: 0.03, vol: 0.03});
}
function jzKick(t, vol) {
  const c = ac(), o = c.createOscillator(), g = c.createGain();
  o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12); o.connect(g); g.connect(jzOut());
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.12, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
  o.start(t); o.stop(t + 0.3);
}
function jzBass(m, t, dur) {
  const c = ac(), o = c.createOscillator(), o2 = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
  o.type = "triangle"; o2.type = "sine"; o.frequency.value = freq(m); o2.frequency.value = freq(m);
  f.type = "lowpass"; f.frequency.value = 700; o.connect(f); o2.connect(f); f.connect(g); g.connect(jzOut());
  const v = 0.32, end = t + Math.max(0.15, dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.008); g.gain.exponentialRampToValueAtTime(v * 0.45, t + 0.18); g.gain.exponentialRampToValueAtTime(0.0001, end);
  o.start(t); o2.start(t); o.stop(end + 0.05); o2.stop(end + 0.05);
}
function jzComp(name, t, dur, vol) { for (const m of jzCompNotes(name)) tone(m, t, dur, vol || 0.075); }

/* podkład: pętla z akordami taktów; style swing (walking bass), waltz, ballad, bossa */
const JZ_BAND = {on: false, timer: null, chart: null, feel: "swing", bpm: 100, comp: true, bar: 0, next: 0, count: 0, src: null, out: null, gen: 0, prev: null, melody: null};
const JZ_FEEL_BEATS = {swing: 4, blues: 4, bossa: 4, waltz: 3, ballad: 3};
const JZ_FEEL_NAME = {swing: "swing", blues: "swing (blues)", bossa: "bossa nova", waltz: "jazz waltz", ballad: "ballada"};
function jzBassNote(pc, near) { let m = 28 + ((pc - 4 + 12) % 12); if (near !== undefined) { while (m + 12 <= 50 && Math.abs(m + 12 - near) < Math.abs(m - near)) m += 12; } return m; }
// takt podkładu: lista akordów; pozycja w miarach (at) z nut, a dla ręcznych list – po równo
function jzBarNorm(bar, N) { return bar.map((c, i) => typeof c === "string" ? {n: c, at: i * N / bar.length} : c); }
const jzBarName = (c) => typeof c === "string" ? c : c.n;
// akordy taktu → zdarzenia dźwiękowe od czasu t (sekundy); beat – sekundy na ćwierćnutę
function jzBarEvents(bar0, nextName, t, beat, feel, comp, countIn) {
  const N = JZ_FEEL_BEATS[feel] || 4, sw = feel === "bossa" ? 0.5 : JZ_RATIO;
  if (countIn) { for (let b = 0; b < N; b++) { if (feel === "bossa") jzRim(t + b * beat); else jzHat(t + b * beat); } return; }
  const bar = jzBarNorm(bar0, N);
  const chordAt = (b) => { let c = bar[0].n; for (const x of bar) if (x.at <= b + 1e-6) c = x.n; return c; };
  // perkusja
  for (let b = 0; b < N; b++) {
    const tb = t + b * beat;
    if (feel === "swing" || feel === "blues") { jzRide(tb, b % 2 === 1); if (b % 2 === 1) { jzRide(tb + sw * beat, false); jzHat(tb); } if (b === 0) jzKick(tb, 0.05); }
    else if (feel === "waltz") { jzRide(tb, b === 0); if (b === 1) jzRide(tb + sw * beat, false); if (b > 0) jzHat(tb); }
    else if (feel === "ballad") { jzBrush(tb, b === 0 ? 0.03 : 0.018); jzBrush(tb + sw * beat, 0.012); }
    else if (feel === "bossa") { jzShaker(tb, true); jzShaker(tb + 0.5 * beat, false); if (b === 0 || b === 2) jzKick(tb, 0.07); }
  }
  if (feel === "bossa") { const clave = JZ_BAND.bar % 2 === 0 ? [0, 1.5, 3] : [1, 2.5]; clave.forEach(p => jzRim(t + p * beat)); }
  // bas
  const c0 = jzChord(chordAt(0)), cn = jzChord(nextName) || c0;
  if (c0) {
    const prev = JZ_BAND.prev;
    if (feel === "swing" || feel === "blues" || feel === "waltz") {
      const line = [];
      for (let b = 0; b < N; b++) {
        const ch = jzChord(chordAt(b)) || c0, r = jzBassNote(ch.root, b ? line[b - 1] : prev);
        const changes = b === 0 || chordAt(b) !== chordAt(b - 1), nextChange = b === N - 1 || chordAt(b + 1) !== chordAt(b);
        let m;
        if (changes) m = r;
        else if (nextChange) { const nx = b === N - 1 ? cn : jzChord(chordAt(b + 1)) || ch, nr = jzBassNote(nx.root, line[b - 1]); m = nr + (line[b - 1] > nr ? 1 : -1); }   // dojście chromatyczne
        else { const t3 = jzToneByDeg(ch, 3) || jzToneByDeg(ch, 4), t5 = jzToneByDeg(ch, 5); m = line[b - 1] + ((b % 2 ? (t5 ? t5.semi : 7) - (t3 ? t3.semi : 4) : (t3 ? t3.semi : 4))); if (m > 52) m -= 12; }
        line.push(m);
      }
      line.forEach((m, b) => jzBass(m, t + b * beat, beat * 0.9));
      JZ_BAND.prev = line[N - 1];
    } else if (feel === "ballad") {
      bar.forEach((x, k) => { const c = jzChord(x.n) || c0, r = jzBassNote(c.root, prev), end = k + 1 < bar.length ? bar[k + 1].at : N; jzBass(r, t + x.at * beat, (end - x.at) * beat * 0.95); JZ_BAND.prev = r; });
    } else if (feel === "bossa") {
      const root = jzBassNote(c0.root, prev), t5 = jzToneByDeg(c0, 5), c2 = jzChord(chordAt(2)) || c0, r2 = jzBassNote(c2.root, root);
      jzBass(root, t, 1.4 * beat); jzBass(root + (t5 ? t5.semi : 7), t + 1.5 * beat, (c2 === c0 ? 1.9 : 0.45) * beat);
      if (c2 !== c0) jzBass(r2, t + 2 * beat, 1.4 * beat);
      jzBass(c2 === c0 ? root : r2, t + 3.5 * beat, 0.45 * beat); JZ_BAND.prev = root;
    }
  }
  // fortepian
  if (comp) {
    const hit = (p, d) => jzComp(chordAt(p), t + p * beat, d * beat);
    if (bar.length > 1 && feel !== "bossa") bar.forEach((x, k) => hit(x.at, Math.min(1.5, (k + 1 < bar.length ? bar[k + 1].at : N) - x.at)));
    else if (feel === "swing" || feel === "blues") { hit(0, 1.2); hit(1 + sw, 0.6); }
    else if (feel === "waltz") { hit(1, 0.8); hit(2, 0.6); }
    else if (feel === "ballad") hit(0, N * 0.95);
    else if (feel === "bossa") { hit(0, 1.2); hit(1.5, 0.8); if (bar.length > 1) hit(2, 1); else hit(2.5, 0.5); }
  }
}
function jzBandStart(chart, feel, bpm, src) {
  jzBandStop(); ac();
  const c = ac();
  Object.assign(JZ_BAND, {on: true, chart, feel, bpm, src, bar: -1, count: 1, prev: undefined, gen: JZ_BAND.gen + 1, next: c.currentTime + 0.15});
  const gen = JZ_BAND.gen;
  JZ_BAND.timer = setInterval(() => {
    if (!JZ_BAND.on || JZ_BAND.gen !== gen) return;
    const beat = 60 / JZ_BAND.bpm, N = JZ_FEEL_BEATS[JZ_BAND.feel] || 4;
    while (JZ_BAND.next < ac().currentTime + 0.3) {
      const t = JZ_BAND.next;
      if (JZ_BAND.bar < 0) { jzBarEvents([], null, t, beat, JZ_BAND.feel, false, true); JZ_BAND.bar = 0; }
      else {
        const ch = JZ_BAND.chart, i = JZ_BAND.bar % ch.length;
        jzBarEvents(ch[i], jzBarName(ch[(i + 1) % ch.length][0]), t, beat, JZ_BAND.feel, JZ_BAND.comp, false);
        const shown = i, delay = Math.max(0, (t - ac().currentTime) * 1000);
        setTimeout(() => { if (JZ_BAND.on && JZ_BAND.gen === gen) jzBandPaint(shown); }, delay);
        JZ_BAND.bar++;
      }
      JZ_BAND.next = t + N * beat;
    }
  }, 40);
  if (!wake) keepAwake();
  jzBandUi();
}
function jzBandStop() {
  if (JZ_BAND.timer) clearInterval(JZ_BAND.timer);
  JZ_BAND.timer = null; const was = JZ_BAND.on; JZ_BAND.on = false; JZ_BAND.gen++;
  if (JZ_BAND.out) { try { const g = JZ_BAND.out; g.gain.setTargetAtTime(0.0001, ac().currentTime, 0.03); setTimeout(() => g.disconnect(), 300); } catch (e) {} JZ_BAND.out = null; }
  if (was) { jzBandPaint(-1); jzBandUi(); if (timerState.i === null && !metro.on) releaseAwake(); }
}
function jzBandPaint(i) { document.querySelectorAll("#view .jzchart [data-bar]").forEach(el => el.classList.toggle("on", +el.dataset.bar === i)); }
function jzBandUi() { document.querySelectorAll('#view [data-act="jz-band"]').forEach(b => { const on = JZ_BAND.on && JZ_BAND.src === b.dataset.src; b.classList.toggle("primary", on); b.setAttribute("aria-pressed", String(on)); b.textContent = on ? "■ Stop" : "▶ Graj podkład"; }); }

// akordy utworu z nut (głos RH): lista taktów z akordami i ich pozycją w miarach; przedtakt pomijamy
function jzChartFromAbc(abc) {
  const line = (abc.split("\n").find(l => l.startsWith("[V:RH]")) || "").slice(6);
  const meter = (abc.match(/^M:(\d+)\/(\d+)/m) || [0, 4, 4]), barLen = +meter[1] * 8 / +meter[2];
  const bars = line.split("|").map(x => x.replace(/\]$/, "").trim()).filter(x => x && x !== "]");
  const out = []; let last = null;
  bars.forEach((b, bi) => {
    const re = /"([^"]+)"|(\[[^\]]+\]|[\^_=]?[A-Ga-gz][,']*)(\d*)(\/?)(\d*)/g; let m, t = 0; const ch = [];
    while ((m = re.exec(b))) {
      if (m[1] !== undefined) { if (jzChord(m[1])) ch.push({n: m[1], at: t / 2}); continue; }
      let d = m[3] ? +m[3] : 1; if (m[4]) d = d / (m[5] ? +m[5] : 2); t += d;
    }
    if (bi === 0 && t < barLen - 0.01 && !ch.length) return;    // przedtakt
    const bar = ch.length && ch[0].at === 0 ? ch : last ? [{n: last, at: 0}].concat(ch) : ch;
    if (bar.length) { out.push(bar); last = bar[bar.length - 1].n; }
  });
  return out;
}
function jzSongChart(s) { return s ? (s.chart || (s.abc ? jzChartFromAbc(s.abc) : null)) : null; }
const jzSongBpm = (s) => s.bpm || (jzNotes(s.id) ? Math.round(Math.min(jzNotes(s.id).bpm, 110) * 0.8) : 90);
const jzBandFeel = (s) => s.feel === "blues" ? "swing" : s.feel;

/* odsłuch utworu z aplikacji: fortepian (obie ręce), ze swingiem albo prosto; opcjonalnie z basem i perkusją */
const JZ_PLAY = {on: false, id: null, mode: null};
function jzPlaySong(id, mode) {
  jzPlayStop(); jzBandStop();
  const s = jzSongById(id), N = jzNotes(id); if (!s || !N) { toast("Nuty jeszcze się nie wczytały – spróbuj za chwilę"); return; }
  const swing = s.swing && mode !== "straight", bpm = Math.min(N.bpm, s.feel === "ballad" ? 84 : 116), whole = 4 * 60 / bpm;
  const T = (w) => (swing ? jzSw(w) : w) * whole;
  const items = N.notes.map(n => ({t: T(n.w), fn: (t) => tone(n.p, t, Math.max(0.2, (T(n.w + n.d) - T(n.w)) * (n.v ? 0.95 : 1.05)), n.v ? 0.11 : 0.2)}));
  Object.assign(JZ_PLAY, {on: true, id, mode});
  playQueue(items, () => { JZ_PLAY.on = false; jzPlayUi(); });
  jzPlayUi();
}
function jzPlayStop() { if (JZ_PLAY.on) { stopQueue(); JZ_PLAY.on = false; jzPlayUi(); } }
function jzPlayUi() { document.querySelectorAll('#view [data-act="jz-play"]').forEach(b => { const on = JZ_PLAY.on && JZ_PLAY.id === b.dataset.id && JZ_PLAY.mode === b.dataset.mode; b.classList.toggle("primary", on); b.setAttribute("aria-pressed", String(on)); }); }
// porównanie swingu: pierwsze dwa takty prosto, potem ze swingiem
function jzSwingDemo(id) {
  jzPlayStop(); jzBandStop();
  const s = jzSongById(id), N = jzNotes(id); if (!N) { toast("Nuty jeszcze się nie wczytały"); return; }
  const bpm = Math.min(N.bpm, 104), whole = 4 * 60 / bpm, len = (N.beats / 4) * 2, gap = len * whole + 0.8;
  const mel = N.notes.filter(n => n.v === 0 && n.w < len - 1e-6);
  const items = [];
  mel.forEach(n => items.push({t: n.w * whole, fn: (t) => tone(n.p, t, Math.max(0.2, n.d * whole), 0.2)}));
  mel.forEach(n => items.push({t: gap + jzSw(n.w) * whole, fn: (t) => tone(n.p, t, Math.max(0.2, (jzSw(n.w + n.d) - jzSw(n.w)) * whole), 0.2)}));
  for (let b = 0; b < len * 4; b++) { items.push({t: b * whole / 4, fn: (t) => click(t, b % N.beats === 0)}); items.push({t: gap + b * whole / 4, fn: (t) => click(t, b % N.beats === 0)}); }
  JZ_PLAY.on = true; JZ_PLAY.id = id; JZ_PLAY.mode = "demo";
  playQueue(items, () => { JZ_PLAY.on = false; jzPlayUi(); });
  toast("Najpierw prosto, potem ze swingiem");
}

/* ============================== ĆWICZENIE AKORDÓW ============================== */
const JZD = {u: null, items: [], i: 0, t0: 0, show: false, ok: false, misses: 0, done: false, unsub: null, timer: null};
function jzDrillStart(uid) {
  const u = JZ_UNITS.find(x => x.id === uid); if (!u) return;
  let items = u.drill.items.slice();
  if (!u.drill.seq) { for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; } items = items.slice(0, 8); }
  Object.assign(JZD, {u: uid, items, i: 0, t0: performance.now(), show: false, ok: false, done: false, misses: 0});
  if (!JZD.unsub && typeof midiListen === "function") JZD.unsub = midiListen(jzDrillMidi);
  jzDrillPaint();
}
function jzDrillMidi(ev) {
  if (!JZD.u || JZD.done || ev.type !== "on") return;
  clearTimeout(JZD.timer);
  JZD.timer = setTimeout(() => {
    const u = JZ_UNITS.find(x => x.id === JZD.u); if (!u || JZD.done) return;
    const held = midiHeldNotes();
    if (jzMatch(JZD.items[JZD.i], u.drill.mode, held)) jzDrillNext(true);
    else if (held.length >= (u.drill.mode === "full" ? jzChord(JZD.items[JZD.i]).tones.length : 2)) { JZD.misses++; jzDrillPaint("Jeszcze nie – " + held.map(m => MIDI_NAMES[m % 12].split("/")[0]).join(" · ")); }
  }, 140);
}
function jzDrillNext(byPiano) {
  if (byPiano) { const n = midiHeldNotes(); JZD.lastOk = n; }
  JZD.i++; JZD.show = false;
  if (JZD.i >= JZD.items.length) {
    JZD.done = true;
    const sec = Math.round((performance.now() - JZD.t0) / 1000), D = jzS().drill, r = D[JZD.u] || {};
    if (mpReady()) { r.best = r.best ? Math.min(r.best, sec) : sec; r.n = (r.n || 0) + 1; r.d = todayKey(); D[JZD.u] = r; save(); }
    JZD.sec = sec;
  }
  jzDrillPaint(byPiano ? "✓ Dobrze!" : "");
}
function jzDrillHtml(u) {
  const r = jzS().drill[u.id];
  return `<div class="card stack" id="jzdrill">
    <div class="spread"><h3>Ćwiczenie akordów</h3>${r && r.best ? `<span class="pill own">najlepiej ${r.best} s</span>` : ""}</div>
    <p class="small muted" style="margin:0">${u.drill.hint} ${mpReady() ? "Pianino jest połączone – aplikacja sama sprawdzi akord i przejdzie dalej." : "Bez pianina przez USB: zagraj akord, sprawdź się przyciskiem „Pokaż” i przejdź dalej."}</p>
    <div id="jzdrill-body"></div>
  </div>`;
}
function jzDrillPaint(msg) {
  const el = document.getElementById("jzdrill-body"); if (!el) return;
  const u = JZ_UNITS.find(x => x.id === (JZD.u || JZV.u));
  if (!JZD.u || JZD.u !== u.id) { el.innerHTML = `<div class="row"><button class="btn primary" data-act="jz-drill" data-u="${u.id}">Zacznij (${u.drill.seq ? u.drill.items.length : 8} akordów)</button></div>`; return; }
  if (JZD.done) {
    el.innerHTML = `<p><b>Gotowe!</b> ${JZD.items.length} akordów w ${JZD.sec} s${JZD.misses ? `, pomyłki: ${JZD.misses}` : ""}.</p>
      <div class="row"><button class="btn primary" data-act="jz-drill" data-u="${u.id}">Jeszcze raz</button></div>`;
    return;
  }
  const name = JZD.items[JZD.i], c = jzChord(name), mode = u.drill.mode;
  const want = mode === "full" ? c.tones.map(t => t.name).join(" – ") : mode === "guide" ? [jzToneByDeg(c, 3) || jzToneByDeg(c, 4), jzToneByDeg(c, 7) || jzToneByDeg(c, 6)].map(t => t.name).join(" + ") + " (tercja + septyma)" : `${c.tones[0].name} + ${(jzToneByDeg(c, 7) || jzToneByDeg(c, 6)).name} (1–7) albo ${c.tones[0].name} + ${(jzToneByDeg(c, 3) || jzToneByDeg(c, 4)).name} (1–3)`;
  const vo = mode === "full" ? jzVoicing(name, "full").map(m => m + 12) : mode === "guide" ? jzVoicing(name, "guide") : jzVoicing(name, jzShellKind(name));
  el.innerHTML = `<div class="jzchord"><span class="mono small muted">${JZD.i + 1} / ${JZD.items.length}</span><b>${esc(jzSym(name))}</b><span class="small muted">po polsku: ${esc(jzChordLabel(name))}</span></div>
    ${u.drill.seq && JZD.items[JZD.i + 1] ? `<p class="small muted" style="margin:0;text-align:center">następny: ${esc(jzSym(JZD.items[JZD.i + 1]))}</p>` : ""}
    <p class="small jzmsg" role="status">${msg || ""}</p>
    ${JZD.show ? `<p class="small" style="margin:0"><b>${esc(want)}</b></p>${jzKbSvg(vo, 36, 72)}` : ""}
    <div class="row">${JZD.show ? "" : `<button class="btn sm" data-act="jz-drill-show">Pokaż</button>`}
      <button class="btn sm" data-act="jz-drill-hear" data-c="${esc(name)}" data-m="${mode}">▶ Posłuchaj</button>
      <button class="btn sm ${mpReady() ? "ghost" : "primary"}" data-act="jz-drill-next">${mpReady() ? "Pomiń" : "Dalej"}</button></div>`;
}

/* ============================== WIDOKI ============================== */
const JZV = {view: "home", u: null, sec: "song", swap: false};
function jzDayInfo(key) {
  const u = jzUnitFor(key), d = Math.max(0, jzDaysBetween(u.from, key)), len = jzDaysBetween(u.from, u.to) + 1;
  return {u, d, len, idx: JZ_UNITS.indexOf(u)};
}
function jzTodayTasks(key) {
  const {u, d} = jzDayInfo(key), s = jzSong(u, key), J = jzS(), st = jzStage(s.id);
  const firstListen = u.listen.find(id => !J.heard[id]);
  const t = [];
  if (!J.lesson[u.id]) t.push({min: 5, sec: "lesson", txt: `<b>Teoria:</b> lekcja „${esc(u.title)}”.`, btn: "Otwórz lekcję"});
  else t.push({min: 5, sec: "drill", txt: `<b>Akordy:</b> ${u.drill.seq ? "przejdź całą sekwencję" : "8 losowych akordów"} – ${esc(u.drill.hint.split(".")[0].toLowerCase())}.`, btn: "Ćwicz akordy"});
  const hint = st === 0 ? (s.kind === "app" ? "posłuchaj w aplikacji" : "posłuchaj odsłuchu na MuseScore") + " i rozczytaj pierwsze 4 takty, każdą ręką osobno." : st === 1 ? "rozczytuj dalej po 4 takty; lewa ręka z nazwami akordów na głos." : st === 2 ? "razem wolno, potem z podkładem zespołu w wolnym tempie." : st === 3 ? (s.swing ? "w tempie ze swingiem, z podkładem; dopracuj akcenty na 2 i 4." : "w tempie, z podkładem; synkopy równo.") : "zagraj z pamięci z podkładem i dodaj coś od siebie (wypełnienie, inne zakończenie).";
  t.push({min: 10, sec: "song", txt: `<b>${esc(s.title)}:</b> ${hint}`, btn: "Otwórz utwór"});
  const rot = d % 3;
  const back = u.all ? u.songs.map(jzSongById).find(x => x.id !== s.id && jzStage(x.id) > 0 && u.songs.indexOf(x.id) < u.songs.indexOf(s.id)) : null;
  if (back && rot === 0) t.push({min: 5, sec: "song", txt: `<b>Powtórka:</b> ${esc(back.title)} – zagraj całość raz, w tempie.`, btn: "Otwórz utwór"});
  else if (u.id === "u6") t.push({min: 5, sec: "arr", txt: `<b>Aranżacja:</b> zaplanuj albo przećwicz intro, solo i zakończenie.`, btn: "Moja aranżacja"});
  else if ((rot === 1 || d === 0) && firstListen) { const L = JZ_LISTEN[firstListen]; t.push({min: 5, sec: "listen", txt: `<b>Słuchanie:</b> ${esc(L.who)} – „${esc(L.title)}”.`, btn: "Słuchaj"}); }
  else if (rot === 2 && s.kind === "app" && s.swing && st < 3) t.push({min: 5, sec: "song", txt: `<b>Swing:</b> posłuchaj porównania „prosto → swing” i zagraj pierwsze 2 takty na oba sposoby.`, btn: "Porównaj"});
  else t.push({min: 5, sec: "band", txt: `<b>Improwizacja:</b> ${u.improv.replace(/<[^>]+>/g, "").split(".")[0]}.`, btn: "Podkład"});
  return t;
}
function jzBlockBody(b) {
  const key = todayKey(), {u, d, len, idx} = jzDayInfo(key), tasks = jzTodayTasks(key);
  return `<div><h3 style="font-size:1.15rem">${esc(u.title)}</h3><p class="meta">Jazzy Christmas · temat ${idx + 1} z ${JZ_UNITS.length} · dzień ${d + 1} z ${len}</p></div>
    <ol class="tips">${tasks.map(t => `<li>${t.txt} <span class="muted small">(${t.min} min)</span> <button class="btn sm ghost" data-act="jz-go" data-u="${u.id}" data-sec="${t.sec}">${t.btn} ›</button></li>`).join("")}</ol>
    <p class="small muted">To dodatkowe 20 minut ponad Twój plan. Wszystko z tego tematu jest w zakładce Jazz.</p>`;
}
function jzStageHtml(s) {
  const st = jzStage(s.id), names = JZ_STAGES.slice(1).map((n, i) => jzStageName(i + 1, s));
  return `<div class="stack" style="gap:8px">
    <div class="ladder stage t-music" role="img" aria-label="Etap: ${jzStageName(st, s)}">${names.map((n, i) => `<span class="${i + 1 < st ? "on" : i + 1 === st ? "cur" : ""}">${n}</span>`).join("")}</div>
    <div class="row">${st < 4 ? `<button class="btn sm primary" data-act="jz-stage" data-id="${s.id}" data-s="${st + 1}">${st === 0 ? "Zaczynam: rozczytuję" : "Dalej: " + jzStageName(st + 1, s)}</button>` : `<span class="pill own">gotowe ✓</span>`}
    ${st > 0 ? `<button class="btn sm ghost" data-act="jz-stage" data-id="${s.id}" data-s="${st - 1}">Cofnij etap</button>` : ""}</div></div>`;
}
function jzMsHtml(s, u) {
  const list = (h, arr, tag) => arr && arr.length ? `<details ${tag === "ul" ? "open" : ""}><summary>${h}</summary><${tag} class="tips small" style="margin-top:6px">${arr.map(x => `<li>${x}</li>`).join("")}</${tag}></details>` : "";
  const ch = jzSongChart(s);
  return `<div class="stack" style="gap:8px">
    <div class="extlinks"><a class="btn sm primary" href="${s.url}" target="_blank" rel="noopener">Otwórz nuty na MuseScore</a>
    <a href="https://open.spotify.com/search/${encodeURIComponent(s.title)}" target="_blank" rel="noopener">posłuchaj na Spotify</a></div>
    <p class="small" style="margin:0">${s.pg} ${s.pg === 1 ? "strona" : s.pg < 5 ? "strony" : "stron"} · trudność ${s.lvl}${s.chords ? " · symbole akordów nad nutami" : ""}${s.off ? " · nuty oficjalne – pełna wersja w ramach subskrypcji MuseScore" : ""}</p>
    ${s.note ? `<p class="small" style="margin:0">${s.note}</p>` : ""}
    ${list("Teoria na tym utworze", s.an, "ul")}
    ${list("Jak ćwiczyć", s.steps, "ol")}
    ${ch ? `<details><summary>Podkład zespołu do tego utworu</summary><div style="margin-top:6px">${jzBandHtml(ch, jzBandFeel(s), jzSongBpm(s), "song:" + s.id, "Zespół gra akordy tego utworu w pętli – Ty grasz melodię z nut, a lewą ręką bas i guide tones albo nic.")}</div></details>` : ""}</div>`;
}
function jzSongCard(s, u, head) {
  if (s.kind !== "app") return `<div class="card stack">${head}${jzMsHtml(s, u)}${jzStageHtml(s)}</div>`;
  const src = "jazz:" + s.id + ":0";
  return `<div class="card stack">${head}
    <div class="row"><button class="btn sm" data-act="jz-play" data-id="${s.id}" data-mode="${s.swing ? "swing" : "plain"}">▶ Posłuchaj</button>
      ${s.swing ? `<button class="btn sm" data-act="jz-play" data-id="${s.id}" data-mode="straight">▶ Bez swingu</button><button class="btn sm" data-act="jz-demo" data-id="${s.id}">Prosto → swing</button>` : ""}
      <button class="btn sm ghost" data-act="jz-stopall">■ Stop</button></div>
    <div><div class="abc" data-abc="${s.id}:0"></div><div class="row">${mpUiHtml(src)}</div>
    ${s.swing ? `<p class="small muted" style="margin:0">Ósemki graj swingowo (długa–krótka). Pasek pianina w trybie „Z metronomem” też sprawdza swing.</p>` : `<p class="small muted" style="margin:0">Ósemki równe – bez swingu.</p>`}
    ${s.parts ? `<details><summary>Ćwicz fragmentami z pianinem</summary><div class="stack" style="margin-top:6px">
      <p class="small muted" style="margin:0">Każdy fragment ma własny pasek pianina: „Nuty czekają” albo „Z metronomem”, prawa, lewa lub obie ręce. Pianino podłączasz kablem USB do telefonu albo laptopa (Chrome lub Edge) i łączysz w Narzędziach → Pianino przez USB.</p>
      ${s.parts.map((p, k) => `<div><p class="small" style="margin:0 0 4px"><b>${esc(p.name)}</b>${p.note ? ` <span class="muted">· ${esc(p.note)}</span>` : ""}</p><div class="abc" data-abc="${s.id}:${k + 1}"></div><div class="row">${mpUiHtml("jazz:" + s.id + ":" + (k + 1))}</div>`).join("")}
    </div></details>` : ""}
    <details open><summary>Teoria na tym utworze</summary><ul class="tips small" style="margin-top:6px">${s.an.map(x => `<li>${x}</li>`).join("")}</ul></details>
    <details><summary>Jak ćwiczyć</summary><ol class="tips small" style="margin-top:6px">${s.steps.map(x => `<li>${x}</li>`).join("")}</ol></details>
    <details><summary>Podkład zespołu do tego utworu</summary><div style="margin-top:6px">${jzBandHtml(jzSongChart(s), jzBandFeel(s), jzSongBpm(s), "song:" + s.id, "Zespół gra akordy tego utworu w pętli – Ty grasz melodię z lewą ręką albo samą melodię.")}</div></details>
    ${jzStageHtml(s)}</div>`;
}
const jzSongHead = (s, extra) => `<div class="spread" style="align-items:flex-start"><div><h3>${esc(s.title)}</h3><p class="meta">${esc(s.by)}${s.key ? " · " + s.key : ""} · ${JZ_FEEL_NAME[s.feel] || s.feel}</p></div>${extra || ""}</div>`;
function jzSongHtml(u) {
  const s = jzSong(u);
  const alts = u.songs.map(jzSongById).filter(Boolean);
  // temat z kilkoma utworami do nauczenia: wszystkie karty po kolei, dzisiejszy oznaczony
  if (u.all) {
    const len = jzDaysBetween(u.from, u.to) + 1, per = Math.ceil(len / alts.length);
    const dt = (k, add) => { const d = new Date(k + "T12:00"); d.setDate(d.getDate() + add); return d.toLocaleDateString("pl-PL", {day: "numeric", month: "long"}); };
    return `<div class="card stack"><p class="small" style="margin:0">W tym temacie uczysz się <b>wszystkich ${alts.length} utworów</b>: ${alts.map((a, i) => `<b>${esc(a.title)}</b> (${dt(u.from, i * per)} – ${dt(u.from, Math.min(len - 1, (i + 1) * per - 1))})`).join(", potem ")}. Wcześniejszy utwór wraca w planie na powtórki.</p></div>
      ${alts.map(a => jzSongCard(a, u, jzSongHead(a, a.id === s.id ? `<span class="pill own">dziś</span>` : `<button class="btn sm ghost" data-act="jz-pick" data-u="${u.id}" data-id="${a.id}">Ćwiczę dziś ten</button>`))).join("")}`;
  }
  const head = jzSongHead(s, alts.length > 1 ? `<button class="btn sm ghost" data-act="jz-swap" aria-expanded="${JZV.swap}">Zamień utwór</button>` : "") +
    (JZV.swap ? `<div class="lessonlist jzswap">${alts.map(a => `<button data-act="jz-pick" data-u="${u.id}" data-id="${a.id}" aria-pressed="${a.id === s.id}"><span>${esc(a.title)} <span class="muted small">· ${a.kind === "app" ? "nuty w aplikacji, sprawdzanie z pianinem" : "MuseScore"}${jzStage(a.id) ? " · " + jzStageName(jzStage(a.id), a) : ""}</span></span>${a.id === s.id ? `<span class="ok">✓</span>` : `<span class="muted">›</span>`}</button>`).join("")}</div>` : "");
  return jzSongCard(s, u, head);
}
const JZ_BPM = {};
function jzBandHtml(chart, feel, bpm, src, txt) {
  if (!chart || !chart.length) return "";
  const v = JZ_BPM[src] || bpm, on = JZ_BAND.on && JZ_BAND.src === src;
  return `<div class="stack" style="gap:8px">
    ${txt ? `<p class="small muted" style="margin:0">${txt}</p>` : ""}
    <div class="jzchart" aria-label="Akordy podkładu">${chart.map((b, i) => `<span data-bar="${i}">${b.map(c => esc(jzSym(jzBarName(c)))).join(" ")}</span>`).join("")}</div>
    <div class="metroline"><span class="small muted">${JZ_FEEL_NAME[feel] || feel}</span>
      <button class="btn sm" data-act="jz-bpm" data-src="${src}" data-d="-6" aria-label="Wolniej">−</button><span class="mono small">♩ = <b data-jzbpm="${src}">${v}</b></span>
      <button class="btn sm" data-act="jz-bpm" data-src="${src}" data-d="6" aria-label="Szybciej">+</button>
      <label class="small row" style="gap:4px"><input type="checkbox" data-act="jz-comp" ${JZ_BAND.comp ? "checked" : ""}> fortepian</label></div>
    <div class="row"><button class="btn ${on ? "primary" : ""}" data-act="jz-band" data-src="${src}" data-feel="${feel}" data-bpm="${v}" aria-pressed="${on}">${on ? "■ Stop" : "▶ Graj podkład"}</button></div>
    <p class="small muted" style="margin:0">Przed startem jeden takt odliczania. Zaznacz „fortepian”, gdy improwizujesz prawą ręką; odznacz, gdy sama grasz akordy.</p></div>`;
}
function jzLessonHtml(u) {
  const J = jzS();
  return `<article class="card stack lesson">
    <h2>${esc(u.title)}</h2><p class="meta">Lekcja · temat ${JZ_UNITS.indexOf(u) + 1} z ${JZ_UNITS.length}</p>
    ${u.lesson}
    ${u.abc.map((a, k) => `<div><div class="abc" data-abc="jzl-${u.id}:${k}"></div><div class="row"><button class="btn sm" data-act="jz-ex" data-u="${u.id}" data-k="${k}">▶ Posłuchaj przykładu</button></div>${a.cap ? `<p class="small muted" style="margin:0">${a.cap}</p>` : ""}</div>`).join("")}
    <h4>Sprawdź się</h4>${u.check.map((c, qi) => `<div class="check-q"><span>${c.q}</span><div class="opts">${c.opts.map((o, oi) => `<button type="button" data-act="chk" data-id="jz:${u.id}" data-q="${qi}" data-o="${oi}">${o}</button>`).join("")}</div><p class="small muted" id="why-${qi}" role="status" style="margin:0"></p></div>`).join("")}
    <div class="row">${J.lesson[u.id] ? `<span class="pill own">przeczytana ✓</span>` : `<button class="btn sm primary" data-act="jz-lesson-done" data-u="${u.id}">Lekcja przeczytana ✓</button>`}
    <button class="btn sm ghost" data-act="jz-sec" data-sec="song">Do utworu ›</button></div></article>`;
}
function jzListenHtml(u) {
  const J = jzS();
  return `<div class="card stack"><h3>Słuchanie</h3><p class="small muted" style="margin:0">Linki otwierają wyszukiwanie na Spotify. Wybierz nagranie podanego wykonawcy.</p>
    ${u.listen.map(id => { const L = JZ_LISTEN[id]; return `<div class="stack jzlisten" style="gap:6px">
      <div class="spread"><b>${esc(L.who)} – ${esc(L.title)}</b>${J.heard[id] ? `<span class="ok">✓</span>` : ""}</div>
      <p class="small muted" style="margin:0">${esc(L.from)}</p>
      <ul class="tips small">${L.tips.map(x => `<li>${x}</li>`).join("")}</ul>
      <div class="row"><a class="btn sm primary" href="https://open.spotify.com/search/${encodeURIComponent(L.q)}" target="_blank" rel="noopener">▶ Spotify</a>
      <button class="btn sm ${J.heard[id] ? "" : "ghost"}" data-act="jz-heard" data-id="${id}" aria-pressed="${!!J.heard[id]}">${J.heard[id] ? "Wysłuchane ✓ (cofnij)" : "Wysłuchane ✓"}</button></div></div>`; }).join("")}
  </div>`;
}
function jzArrHtml() {
  const A = jzS().arr, opts = JZ_UNITS[JZ_UNITS.length - 1].songs.map(jzSongById), sel = A.song || opts[0].id;
  const f = (k, label, ph) => `<label class="stack" style="gap:4px"><span class="small"><b>${label}</b></span><textarea data-act="jz-arr" data-k="${k}" rows="2" placeholder="${ph}">${esc(A[k] || "")}</textarea></label>`;
  const ch = (k, label) => `<label class="row small" style="gap:6px"><input type="checkbox" data-act="jz-arr-c" data-k="${k}" ${A[k] ? "checked" : ""}> ${label}</label>`;
  return `<div class="card stack"><h3>Moja aranżacja</h3>
    <label class="small row" style="gap:6px">Utwór <select data-act="jz-arr-song">${opts.map(s => `<option value="${s.id}" ${s.id === sel ? "selected" : ""}>${esc(s.title)}</option>`).join("")}</select></label>
    ${f("intro", "Intro", "np. ostatnie 4 takty albo Gm7–C7 × 2")}
    ${f("solo", "Środek", "np. chorus improwizacji na bluesie albo temat oktawę wyżej z wypełnieniami")}
    ${f("end", "Zakończenie", "np. tag Am7–D7–Gm7–C7 × 2 i F6/9")}
    ${ch("c1", "Całość zagrana z podkładem bez zatrzymania")} ${ch("c2", "Nagrane telefonem")} ${ch("c3", "Odsłuchane: rytm, lewa ręka, melodia")}
    ${f("note", "Co usłyszałam na nagraniu", "co wyszło, co poprawić")}
  </div>`;
}
function jzHome() {
  const key = todayKey(), on = key >= JZ_START && key <= JZ_END, cur = jzUnitFor(key), J = jzS();
  const total = jzDaysBetween(JZ_START, JZ_END) + 1, done = Math.min(total, Math.max(0, jzDaysBetween(JZ_START, key) + 1));
  return `<section class="stack">
    <div class="card stack jzhead">
      <div class="spread"><h2>Jazzy Christmas</h2><span class="pill">${on ? "dzień " + done + " z " + total : jzArchived() ? "archiwum" : "od 21 listopada"}</span></div>
      <p class="small muted" style="margin:0">21 listopada – 15 stycznia · 20 minut dziennie ponad plan · swing, akordy jazzowe, blues, ballada, bossa nova i Twoja aranżacja.</p>
      <div class="bar t-music"><span style="width:${Math.round(done / total * 100)}%"></span></div>
      ${jzArchived() ? `<p class="small">Moduł zakończony. Wszystko zostaje tutaj – lekcje, utwory, podkłady i ćwiczenia akordów działają dalej.</p>` : ""}
    </div>
    ${JZ_UNITS.map((u, i) => {
      const s = jzSong(u), st = jzStage(s.id), isCur = on && u === cur, r = J.drill[u.id];
      const dt = (k) => new Date(k + "T12:00").toLocaleDateString("pl-PL", {day: "numeric", month: "short"});
      return `<button class="card jzunit ${isCur ? "cur" : ""}" data-act="jz-unit" data-u="${u.id}">
        <div class="spread"><b>${i + 1}. ${esc(u.title)}</b><span class="small muted">${dt(u.from)} – ${dt(u.to)}</span></div>
        <span class="small muted">${esc(u.short)}</span>
        <span class="small">${J.lesson[u.id] ? "lekcja ✓ · " : ""}${esc(s.title)}: ${jzStageName(st, s)}${r && r.best ? " · akordy " + r.best + " s" : ""}${isCur ? " · <b>teraz</b>" : ""}</span></button>`;
    }).join("")}
  </section>`;
}
const JZ_SECS = [["lesson", "Lekcja"], ["song", "Utwór"], ["drill", "Akordy"], ["band", "Podkład"], ["listen", "Słuchanie"]];
function jzUnitView() {
  const u = JZ_UNITS.find(x => x.id === JZV.u) || JZ_UNITS[0], i = JZ_UNITS.indexOf(u);
  const secs = u.id === "u6" ? JZ_SECS.concat([["arr", "Aranżacja"]]) : JZ_SECS;
  const sec = secs.some(s => s[0] === JZV.sec) ? JZV.sec : "song";
  let body = "";
  if (sec === "lesson") body = jzLessonHtml(u);
  if (sec === "song") body = jzSongHtml(u);
  if (sec === "drill") body = jzDrillHtml(u);
  if (sec === "band") { const s = jzSong(u), ch = jzSongChart(s);
    body = `<div class="card stack"><h3>Improwizacja</h3><p class="small">${u.improv}</p>${jzBandHtml(u.band.chart, u.band.feel, u.band.bpm, "unit:" + u.id, "Ćwiczenie tematu – krótka pętla akordów.")}</div>
    ${ch ? `<div class="card stack"><h3>Podkład: ${esc(s.title)}</h3>${jzBandHtml(ch, jzBandFeel(s), jzSongBpm(s), "song:" + s.id, "")}</div>` : ""}`; }
  if (sec === "listen") body = jzListenHtml(u);
  if (sec === "arr") body = jzArrHtml();
  const prev = JZ_UNITS[i - 1], next = JZ_UNITS[i + 1];
  return `<section class="stack">
    <div class="spread"><button class="btn sm ghost" data-act="jz-home">‹ Jazzy Christmas</button><span class="small muted">temat ${i + 1} z ${JZ_UNITS.length}</span></div>
    <div><h2 style="margin:0">${esc(u.title)}</h2><p class="small muted" style="margin:2px 0 0">${esc(u.short)}</p></div>
    <div class="seg jzsecs" role="group" aria-label="Część tematu">${secs.map(([k, n]) => `<button data-act="jz-sec" data-sec="${k}" aria-pressed="${k === sec}">${n}</button>`).join("")}</div>
    ${body}
    <div class="row">${prev ? `<button class="btn sm ghost" data-act="jz-unit" data-u="${prev.id}">‹ ${esc(prev.title)}</button>` : ""}${next ? `<button class="btn sm ghost" data-act="jz-unit" data-u="${next.id}">${esc(next.title)} ›</button>` : ""}</div>
  </section>`;
}
function jzView() { return JZV.view === "unit" ? jzUnitView() : jzHome(); }
// nuty w zwiniętym <details> (fragmenty utworu) rysujemy dopiero po rozwinięciu – abcjs potrzebuje szerokości
document.addEventListener("toggle", (e) => { if (TAB === "jazz" && e.target.open && e.target.querySelector && e.target.querySelector('[data-abc^="jz"]')) { jzAfter(); if (typeof mpBars === "function") mpBars(); } }, true);
function jzAfter() {
  document.querySelectorAll('#view [data-abc^="jz"]').forEach(el => {
    if (el.offsetParent === null) return;
    const [id, k] = el.dataset.abc.split(":"), abc = jzAbcById(id, k);
    if (abc) begRender(el, abc);
  });
  if (document.getElementById("jzdrill-body")) jzDrillPaint();
  jzBandUi(); jzPlayUi();
}
function jzArchiveCard() {
  if (isBeg()) return "";
  return `<div class="card stack"><div class="spread"><h3>${jzArchived() ? "Archiwum: " : ""}Jazzy Christmas</h3><span class="small muted">${todayKey() < JZ_START ? "start 21 listopada" : "21.11 – 15.01"}</span></div>
    <p class="small muted" style="margin:0">Moduł jazzowy: swing, akordy septymowe, blues, ballada, bossa nova – lekcje, utwory, podkłady i ćwiczenia akordów.</p>
    <div><button class="btn sm primary" data-act="goto" data-tab="jazz">Otwórz</button></div></div>`;
}
// zakładka Jazz w pasku na dole: w czasie trwania modułu, potem tylko z karty archiwum w Nauce
function jzTabVisible() { const k = todayKey(); return !isBeg() && !ONBOARD && k >= JZ_START && k <= JZ_END; }

/* ============================== ZDARZENIA ============================== */
document.addEventListener("click", (e) => {
  const t = e.target.closest && e.target.closest("[data-act]"); if (!t) return;
  switch (t.dataset.act) {
    case "jz-go": JZV.view = "unit"; JZV.u = t.dataset.u; JZV.sec = t.dataset.sec; JZV.swap = false; TAB = "jazz"; render(); window.scrollTo(0, 0); break;
    case "jz-home": JZV.view = "home"; jzBandStop(); jzPlayStop(); render(); window.scrollTo(0, 0); break;
    case "jz-unit": JZV.view = "unit"; JZV.u = t.dataset.u; JZV.swap = false; if (!JZV.sec) JZV.sec = "song"; render(); window.scrollTo(0, 0); break;
    case "jz-sec": JZV.sec = t.dataset.sec; JZV.swap = false; jzBandStop(); jzPlayStop(); render(); window.scrollTo(0, 0); break;
    case "jz-swap": JZV.swap = !JZV.swap; render(); break;
    case "jz-pick": { const u = t.dataset.u, id = t.dataset.id, prev = jzS().pick[u]; JZV.swap = false; jzBandStop(); jzPlayStop();
      withUndo("Utwór: " + jzSongById(id).title, () => { jzS().pick[u] = id; }); void prev; break; }
    case "jz-stage": { const s = jzSongById(t.dataset.id), v = +t.dataset.s; withUndo(s.title + ": " + jzStageName(v, s), () => { jzS().songs[s.id] = v; }); break; }
    case "jz-lesson-done": jzS().lesson[t.dataset.u] = true; save(); toast("Lekcja zaliczona"); render(); break;
    case "jz-heard": { const J = jzS(), id = t.dataset.id; if (J.heard[id]) delete J.heard[id]; else J.heard[id] = true; save(); render(); break; }
    case "jz-play": ac(); if (JZ_PLAY.on && JZ_PLAY.id === t.dataset.id && JZ_PLAY.mode === t.dataset.mode) jzPlayStop(); else jzPlaySong(t.dataset.id, t.dataset.mode); break;
    case "jz-demo": ac(); jzSwingDemo(t.dataset.id); break;
    case "jz-stopall": jzPlayStop(); jzBandStop(); break;
    case "jz-ex": { ac(); jzPlayStop(); jzBandStop(); const u = JZ_UNITS.find(x => x.id === t.dataset.u), a = u && u.abc[+t.dataset.k]; if (!a) break;
      const N = jzNotes("ex:" + u.id + ":" + t.dataset.k, a.src); if (!N) break; const whole = 4 * 60 / N.bpm;
      playQueue(N.notes.map(n => ({t: n.w * whole, fn: (tt) => tone(n.p, tt, Math.max(0.3, n.d * whole * 1.05), 0.16)}))); break; }
    case "jz-band": { ac(); jzPlayStop(); const src = t.dataset.src;
      if (JZ_BAND.on && JZ_BAND.src === src) { jzBandStop(); break; }
      let chart = null;
      if (src.startsWith("unit:")) chart = JZ_UNITS.find(x => x.id === src.slice(5)).band.chart;
      else chart = jzSongChart(jzSongById(src.slice(5)));
      if (chart) jzBandStart(chart, t.dataset.feel, JZ_BPM[src] || +t.dataset.bpm, src); break; }
    case "jz-bpm": { const src = t.dataset.src, el = document.querySelector(`[data-jzbpm="${src}"]`), cur = JZ_BPM[src] || (el ? +el.textContent : 100);
      const v = Math.max(50, Math.min(200, cur + +t.dataset.d)); JZ_BPM[src] = v;
      document.querySelectorAll(`[data-jzbpm="${src}"]`).forEach(x => x.textContent = v);
      document.querySelectorAll(`[data-act="jz-band"][data-src="${src}"]`).forEach(x => x.dataset.bpm = v);
      if (JZ_BAND.on && JZ_BAND.src === src) JZ_BAND.bpm = v; break; }
    case "jz-drill": ac(); jzDrillStart(t.dataset.u); break;
    case "jz-drill-show": JZD.show = true; jzDrillPaint(); break;
    case "jz-drill-next": jzDrillNext(false); break;
    case "jz-drill-hear": { const u = JZ_UNITS.find(x => x.id === JZD.u), name = t.dataset.c, m = t.dataset.m;
      jzPlayChord(m === "full" ? jzVoicing(name, "full").map(x => x + 12) : m === "guide" ? jzVoicing(name, "guide") : jzVoicing(name, jzShellKind(name))); void u; break; }
  }
});
document.addEventListener("change", (e) => {
  const t = e.target; if (!t || !t.dataset) return;
  if (t.dataset.act === "jz-comp") { JZ_BAND.comp = t.checked; document.querySelectorAll('[data-act="jz-comp"]').forEach(x => x.checked = t.checked); }
  if (t.dataset.act === "jz-arr-song") { jzS().arr.song = t.value; save(); }
  if (t.dataset.act === "jz-arr-c") { jzS().arr[t.dataset.k] = t.checked; save(); }
});
document.addEventListener("input", (e) => {
  const t = e.target; if (!t || !t.dataset || t.dataset.act !== "jz-arr") return;
  jzS().arr[t.dataset.k] = t.value; clearTimeout(jzArrHtml.tm); jzArrHtml.tm = setTimeout(save, 600);
});
document.addEventListener("visibilitychange", () => { if (document.hidden) { jzBandStop(); jzPlayStop(); } });
