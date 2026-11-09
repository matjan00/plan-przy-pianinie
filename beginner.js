"use strict";
/* Kurs od zera: osobny tryb aplikacji (S.mode === "beg") dla osób, które nigdy nie grały.
   Lekcje trafiają do LESSONS (ten sam mechanizm nut i pytań co teoria), melodie są w ABC i można je odsłuchać.
   Stan kursu: S.beg = {done:{id:true}, piece:id|null, notes:[{ok}]}, etapy utworów w S.pieces (id "bp-…"). */

const BEG_ETAPY = [
  {n: 1, name: "Pierwsze kroki", desc: "Postawa, klawiatura, palce i puls. Pierwsza melodia ze słuchu i z nut."},
  {n: 2, name: "Czytanie nut", desc: "Klucz wiolinowy i basowy, kroki i skoki, metrum 3/4, pauzy."},
  {n: 3, name: "Dwie ręce", desc: "Ręce razem, akompaniament, dynamika, ósemki, pozycja G."},
  {n: 4, name: "Pierwsze utwory", desc: "Kropka, gama z przekładaniem kciuka, akordy, pedał i samodzielna nauka utworu."}
];

const H4 = "X:1\nM:4/4\nL:1/4\n";
const BEG_LESSONS = [
/* ---------- ETAP 1 ---------- */
{id: "b1", etap: 1, title: "Siadamy do pianina",
 short: "Wysokość siedzenia, odległość od klawiatury i kształt dłoni. Bez tego później bolą ramiona.",
 goal: "Siadasz samodzielnie w dobrej pozycji bez zaglądania do lekcji, a dłoń spoczywa na klawiszach luźno.",
 body: `<p>Dobra postawa to połowa sukcesu: grasz dłużej, nic nie boli, a palce słuchają.</p>
 <ul><li><b>Wysokość:</b> przedramiona są mniej więcej poziomo, łokieć na wysokości klawiatury lub odrobinę wyżej. Jeśli siedzisz za nisko, podłóż poduszkę albo książkę.</li>
 <li><b>Odległość:</b> usiądź na przedniej połowie siedzenia, tak żeby łokcie były trochę przed tułowiem. Wyciągnięte ręce z zaciśniętymi pięściami powinny dotykać klapy pianina.</li>
 <li><b>Środek:</b> siedź na wprost środka klawiatury (zwykle pod logo).</li>
 <li><b>Stopy:</b> płasko na podłodze, prawa trochę do przodu, bo później będzie obsługiwać pedał.</li>
 <li><b>Dłoń:</b> opuść luźno rękę wzdłuż ciała – palce same się lekko zaokrąglą. W takim kształcie połóż je na klawiszach, jakby w dłoni była mała piłka.</li></ul>
 <p>Grasz <b>opuszkami</b> palców, nie płasko. Kciuk gra bokiem, przy paznokciu. Nadgarstek ani nie wisi, ani nie sterczy w górę.</p>`,
 piano: "Usiądź, połóż dłonie na kolanach, a potem przenieś je na klawiaturę bez zmiany kształtu. Powtórz 5 razy. Zagraj kilka dowolnych białych klawiszy każdym palcem po kolei, sprawdzając, czy ramiona są rozluźnione.",
 check: [
   {q: "Jak wysoko powinny być przedramiona?", opts: ["Mniej więcej poziomo", "Mocno w górę", "Nadgarstki poniżej klawiszy"], ok: 0},
   {q: "Czym naciskasz klawisz?", opts: ["Płaskim palcem", "Opuszką lekko zaokrąglonego palca", "Paznokciem"], ok: 1}
 ]},
{id: "b2", etap: 1, title: "Mapa klawiatury",
 short: "Czarne klawisze są w grupach po 2 i 3. Dzięki nim od razu znajdziesz każdą nutę.",
 goal: "Bez liczenia pokazujesz każde C, F i dowolny biały klawisz na całej klawiaturze.",
 body: `<p>Białe klawisze nazywają się po kolei: <b>C D E F G A H</b>, a potem znów C. Ta siódemka powtarza się na całej klawiaturze – każda powtórka to <b>oktawa</b>.</p>
 <p>Czarne klawisze tworzą <b>grupy po dwa i po trzy</b>. To Twoja mapa:</p>
 <ul><li><b>C</b> leży tuż przed (na lewo od) grupy dwóch czarnych klawiszy. Między nimi jest D, za nimi E.</li>
 <li><b>F</b> leży tuż przed grupą trzech czarnych. Dalej G, A, H.</li></ul>
 <p><b>Środkowe C</b> to C najbliżej środka pianina (zwykle pod logo). Od niego zaczyna się większość ćwiczeń.</p>
 <p>Uwaga na polską nazwę: biały klawisz między A a C to <b>H</b>. W angielskich nutach i w aplikacjach to „B”.</p>
 <p>W lewo dźwięki są niższe, w prawo wyższe.</p>`,
 piano: "Zagraj wszystkie C na klawiaturze od dołu do góry. Potem wszystkie F. Potem znajdź środkowe C i zagraj od niego w górę C D E F G A H C, mówiąc nazwy na głos.",
 check: [
   {q: "Gdzie leży C?", opts: ["Przed grupą dwóch czarnych klawiszy", "Przed grupą trzech czarnych", "Między dwoma czarnymi"], ok: 0, why: "Po lewej stronie pary czarnych klawiszy."},
   {q: "Jak po polsku nazywa się biały klawisz między A a C?", opts: ["B", "H", "G"], ok: 1}
 ]},
{id: "b3", etap: 1, title: "Numery palców i pozycja C – prawa ręka",
 short: "Kciuk to 1, mały palec to 5. Prawa ręka kładzie palce 1–5 na C D E F G od środkowego C.",
 goal: "Grasz C–G w górę i w dół równo, każdy palec na swoim klawiszu, bez patrzenia na numery.",
 body: `<p>W nutach nad dźwiękami często są małe cyfry – to <b>palcowanie</b>. W obu rękach liczy się tak samo: <b>1 = kciuk, 2 = wskazujący, 3 = środkowy, 4 = serdeczny, 5 = mały</b>.</p>
 <p><b>Pozycja C</b> dla prawej ręki: kciuk na środkowym C, a pozostałe palce na kolejnych białych klawiszach: D (2), E (3), F (4), G (5). Każdy palec ma swój klawisz i nie musisz przesuwać ręki.</p>
 <p>Naciskaj klawisz do dna, ale bez wciskania na siłę – ciężar ręki wystarczy. Kiedy jeden palec gra, pozostałe leżą luźno na swoich klawiszach.</p>`,
 abc: [{src: H4 + "K:C\n!1!C !2!D !3!E !4!F | !5!G4 | !5!G !4!F !3!E !2!D | !1!C4 |]", cap: "Pięć palców w górę i w dół. Cyfry nad nutami to numery palców."}],
 piano: "Zagraj ćwiczenie powyżej 5 razy, mówiąc na głos numery palców. Potem ze słowami nut: C, D, E, F, G. Zwróć uwagę, żeby 4. i 5. palec grały tak samo głośno jak pozostałe.",
 check: [
   {q: "Który palec ma numer 1?", opts: ["Mały palec", "Kciuk", "Wskazujący"], ok: 1},
   {q: "Który palec prawej ręki leży na E w pozycji C?", opts: ["2", "3", "4"], ok: 1, why: "C=1, D=2, E=3."}
 ]},
{id: "b4", etap: 1, title: "Lewa ręka w pozycji C",
 short: "Lewa ręka gra oktawę niżej: mały palec na C, kciuk na G.",
 goal: "Lewa ręka gra C–G i z powrotem równo, a numery palców nie mylą Ci się z prawą ręką.",
 body: `<p>Lewa ręka leży oktawę niżej niż prawa: znajdź C na lewo od środkowego C. Na nim kładziesz <b>mały palec (5)</b>, a dalej: D (4), E (3), F (2), G (1 – kciuk).</p>
 <p>Numery palców są w obu rękach takie same, ale lewa ręka jest lustrzanym odbiciem prawej. Grając w górę, lewa ręka idzie od 5 do 1, a prawa od 1 do 5. Na początku łatwo się pomylić – powiedz numer na głos, zanim zagrasz.</p>
 <p>Lewa ręka jest zwykle słabsza. Daj jej trochę więcej czasu i graj wolniej niż prawą.</p>`,
 abc: [{src: H4 + "K:C clef=bass\n!5!C, !4!D, !3!E, !2!F, | !1!G,4 | !1!G, !2!F, !3!E, !4!D, | !5!C,4 |]", cap: "Te same nuty co w prawej ręce, oktawę niżej, w kluczu basowym (o nim w etapie 2)."}],
 piano: "Lewą ręką C–G w górę i w dół 5 razy. Potem na zmianę: prawa ręka C–G, lewa ręka C–G. Na koniec zagraj obiema rękami naraz tylko C: lewa ręka piątym palcem, prawa kciukiem.",
 check: [
   {q: "Którym palcem lewa ręka gra C w pozycji C?", opts: ["1 (kciuk)", "5 (mały palec)", "3"], ok: 1},
   {q: "Grając w górę C D E F G, lewa ręka używa palców…", opts: ["1 2 3 4 5", "5 4 3 2 1"], ok: 1}
 ]},
{id: "b5", etap: 1, title: "Puls i długość dźwięków",
 short: "Ćwierćnuta, półnuta i cała nuta. Takt i liczenie na 4.",
 goal: "Grasz ćwiczenie z metronomem na 60, licząc na głos i trzymając dokładnie długie nuty.",
 body: `<p>Muzyka ma równy <b>puls</b> – jak kroki albo tykanie zegara. Metronom tyka właśnie puls. Długość dźwięku mierzymy w uderzeniach pulsu:</p>
 <div class="tablewrap"><table><tr><th>Nuta</th><th>Wygląd</th><th>Trwa</th><th>Liczysz</th></tr>
 <tr><td>ćwierćnuta</td><td>czarna główka z laską</td><td>1 uderzenie</td><td>raz</td></tr>
 <tr><td>półnuta</td><td>pusta główka z laską</td><td>2 uderzenia</td><td>raz-dwa</td></tr>
 <tr><td>cała nuta</td><td>pusta główka bez laski</td><td>4 uderzenia</td><td>raz-dwa-trzy-czte-ry</td></tr></table></div>
 <p>Pionowe kreski dzielą muzykę na <b>takty</b>. Liczby na początku (4/4) to <b>metrum</b>: w każdym takcie są 4 ćwierćnuty. Licz „raz, dwa, trzy, cztery” i zaczynaj od nowa w każdym takcie. Na „raz” wypada najmocniejsze uderzenie.</p>
 <p>Najczęstszy błąd: puszczanie długiej nuty za wcześnie. Trzymaj klawisz, aż doliczysz do końca.</p>`,
 abc: [{src: H4 + "Q:1/4=60\nK:C\nC C C C | C2 C2 | C4 | E E E E | E2 E2 | E4 | G G G2 | G2 G G | C4 |]", cap: "Ćwierćnuty, półnuty i całe nuty. Najpierw klaszcz rytm, licząc, potem graj."}],
 piano: "Włącz metronom na 60. Klaszcz ćwiczenie, licząc na głos. Potem graj prawą ręką (C kciukiem, E trzecim, G piątym). Potem to samo lewą ręką oktawę niżej.",
 check: [
   {q: "Ile uderzeń trwa półnuta?", opts: ["1", "2", "4"], ok: 1},
   {q: "Ile ćwierćnut mieści się w takcie 4/4?", opts: ["3", "4", "2"], ok: 1}
 ]},
{id: "b6", etap: 1, title: "Pierwsza melodia: Oda do radości",
 short: "Melodia Beethovena w pozycji C, tylko prawa ręka. Pierwszy prawdziwy utwór.",
 goal: "Grasz Odę od początku do końca w równym tempie, bez zatrzymywania się.",
 body: `<p>Oda do radości z IX Symfonii Beethovena mieści się cała w pięciu palcach pozycji C. Kciuk na środkowym C i nie przesuwasz ręki.</p>
 <p>Nowość: w 4. i 8. takcie jest <b>ćwierćnuta z kropką i ósemka</b> („E – D”). Na razie zagraj ją ze słuchu: pierwsza nuta dłuższa, druga krótka, jak „taaa-ta”. Odsłuchaj, zanim zagrasz.</p>
 <p>Jak ćwiczyć: najpierw takty 1–2 (aż wyjdą 3 razy z rzędu), potem 3–4, potem połącz. Melodia składa się z dwóch prawie takich samych połówek – różni się tylko zakończenie.</p>`,
 abc: [{src: H4 + "Q:1/4=80\nK:C\n!3!E E !4!F !5!G | G !4!F !3!E !2!D | !1!C C !2!D !3!E | E3/2 D/2 D2 | E E F G | G F E D | C C D E | D3/2 C/2 C2 |]", cap: "Oda do radości – prawa ręka. Tempo zacznij od ♩ = 60."}],
 piano: "Odsłuchaj melodię dwa razy, śpiewając. Potem graj po dwa takty. Utwór jest też w zakładce Utwory – tam zaznaczasz postęp.",
 check: [
   {q: "Ile różnych dźwięków ma Oda do radości w tej wersji?", opts: ["5 (C–G)", "7", "8"], ok: 0},
   {q: "Jak ćwiczyć nowy fragment?", opts: ["Grać od początku do końca, aż wyjdzie", "Małymi kawałkami, potem łączyć", "Jak najszybciej"], ok: 1}
 ]},
/* ---------- ETAP 2 ---------- */
{id: "b7", etap: 2, title: "Pięciolinia i klucz wiolinowy",
 short: "Nuty prawej ręki: środkowe C na linii dodanej, potem D, E, F, G.",
 goal: "W quizie nut rozpoznajesz C, D, E, F, G w kluczu wiolinowym (8 z 10).",
 body: `<p>Nuty zapisujemy na <b>pięciolinii</b>: 5 linii i 4 pola między nimi, liczone od dołu. Im wyżej nuta, tym wyższy dźwięk. Nuta może leżeć <b>na linii</b> (linia przecina główkę) albo <b>w polu</b> (między liniami).</p>
 <p><b>Klucz wiolinowy</b> (ten zakręcony) zaczyna się na 2. linii – tam jest G. Używa go prawa ręka.</p>
 <ul><li><b>Środkowe C</b> leży pod pięciolinią, na krótkiej <b>linii dodanej</b>.</li>
 <li><b>D</b> wisi pod pięciolinią (pod 1. linią).</li>
 <li><b>E</b> na 1. linii, <b>F</b> w 1. polu, <b>G</b> na 2. linii.</li></ul>
 <p>Każdy kolejny dźwięk to kolejne miejsce: linia, pole, linia, pole… Nie ucz się wszystkich nut naraz – wystarczy znać kilka „kotwic” (środkowe C, G na 2. linii) i liczyć od nich.</p>`,
 abc: [{src: H4 + "K:C\nC D E F | G4 | G F E D | C4 |]\nw: C D E F G G F E D C", cap: "Pozycja C prawej ręki w nutach. Pod nutami ich nazwy."}],
 piano: "Zagraj ćwiczenie, patrząc tylko w nuty, nie na ręce. Potem zrób quiz „Czytanie nut” w planie dnia.",
 check: [
   {q: "Gdzie leży środkowe C w kluczu wiolinowym?", opts: ["Na 1. linii", "Na linii dodanej pod pięciolinią", "W 3. polu"], ok: 1},
   {q: "Jaka nuta leży na 2. linii klucza wiolinowego?", opts: ["E", "F", "G"], ok: 2, why: "Klucz wiolinowy to klucz G – owija się wokół 2. linii."}
 ]},
{id: "b8", etap: 2, title: "Klucz basowy – nuty lewej ręki",
 short: "Lewa ręka czyta w kluczu basowym. Pozycja C: C w 2. polu, G na 4. linii.",
 goal: "W quizie rozpoznajesz C–G w obu kluczach (8 z 10).",
 body: `<p><b>Klucz basowy</b> wygląda jak odwrócone C z dwiema kropkami. Kropki otaczają 4. linię – tam leży <b>F</b> (dlatego to klucz F). Używa go lewa ręka.</p>
 <p>Pozycja C lewej ręki w kluczu basowym:</p>
 <ul><li><b>C</b> w 2. polu (palec 5),</li><li><b>D</b> na 3. linii, <b>E</b> w 3. polu, <b>F</b> na 4. linii (między kropkami), <b>G</b> w 4. polu (kciuk).</li></ul>
 <p>Te same nuty wyglądają w kluczu basowym inaczej niż w wiolinowym – to normalne, że na początku się mylą. Pomaga jedna kotwica: <b>F między kropkami</b>.</p>`,
 abc: [{src: H4 + "K:C clef=bass\nC, D, E, F, | G,4 | G, F, E, D, | C,4 |]\nw: C D E F G G F E D C", cap: "Pozycja C lewej ręki w kluczu basowym."}],
 piano: "Lewą ręką zagraj ćwiczenie, patrząc w nuty. Potem prawą ręką ćwiczenie z poprzedniej lekcji i lewą to – zobacz, jak te same dźwięki wyglądają w dwóch kluczach.",
 check: [
   {q: "Gdzie leży F w kluczu basowym?", opts: ["Na 4. linii, między kropkami", "Na 1. linii", "W 1. polu"], ok: 0},
   {q: "Który klucz czyta zwykle lewa ręka?", opts: ["Wiolinowy", "Basowy"], ok: 1}
 ]},
{id: "b9", etap: 2, title: "Kroki i skoki",
 short: "Nie musisz nazywać każdej nuty: patrz, czy melodia idzie w górę czy w dół, krokiem czy skokiem.",
 goal: "Czytasz nową melodię w pozycji C, kierując się krokami i skokami, bez nazywania każdej nuty.",
 body: `<p>Dobry czytelnik nut nie literuje każdej nuty, tylko widzi <b>kształt melodii</b>:</p>
 <ul><li><b>Powtórzenie</b> – nuta w tym samym miejscu: ten sam klawisz.</li>
 <li><b>Krok (sekunda)</b> – z linii do sąsiedniego pola albo z pola na sąsiednią linię: sąsiedni klawisz, sąsiedni palec.</li>
 <li><b>Skok (tercja)</b> – z linii na następną linię albo z pola do następnego pola: przeskakujesz jeden klawisz i jeden palec.</li></ul>
 <p>Wystarczy znać pierwszą nutę, a resztę czytasz jak mapę: w górę, w dół, krok, skok. Tak czyta się szybciej i nie trzeba patrzeć na ręce.</p>`,
 abc: [{src: H4 + "K:C\nC D E C | E F G2 | G E C E | D4 | C E G E | F D E C | D E D2 | C4 |]", cap: "Kroki i skoki w pozycji C. Zanim zagrasz, nazwij każdy ruch: krok w górę, skok w dół…"}],
 piano: "Najpierw powiedz same ruchy (krok, skok, powtórzenie), dopiero potem graj. Graj wolno, ale bez zatrzymywania się.",
 check: [
   {q: "Nuta na linii, a następna na kolejnej linii wyżej – to…", opts: ["krok", "skok (tercja)", "powtórzenie"], ok: 1},
   {q: "Z linii do sąsiedniego pola – to…", opts: ["krok (sekunda)", "skok"], ok: 0}
 ]},
{id: "b10", etap: 2, title: "Metrum 3/4 i półnuta z kropką",
 short: "Trzy ćwierćnuty w takcie – rytm walca. Kropka przedłuża nutę o połowę.",
 goal: "Grasz ćwiczenie w 3/4, licząc „raz-dwa-trzy”, a półnuta z kropką trwa pełne 3 uderzenia.",
 body: `<p>W metrum <b>3/4</b> w każdym takcie są trzy ćwierćnuty. Liczysz „<b>raz</b>-dwa-trzy, <b>raz</b>-dwa-trzy” – jak walc. „Raz” jest najmocniejsze.</p>
 <p><b>Kropka</b> obok nuty przedłuża ją o połowę jej długości. Półnuta (2) + połowa (1) = <b>3 uderzenia</b>. Półnuta z kropką wypełnia cały takt 3/4.</p>`,
 abc: [{src: "X:1\nM:3/4\nL:1/4\nQ:1/4=72\nK:C\nC D E | F3 | G F E | D3 | E D C | D E F | E D D | C3 |]", cap: "Ćwiczenie w 3/4. Akcentuj lekko „raz” w każdym takcie."}],
 piano: "Klaszcz rytm z metronomem na 72, licząc. Potem graj prawą ręką. Na koniec lewą ręką oktawę niżej.",
 check: [
   {q: "Ile uderzeń trwa półnuta z kropką?", opts: ["2", "3", "4"], ok: 1},
   {q: "Ile ćwierćnut jest w takcie 3/4?", opts: ["3", "4", "6"], ok: 0}
 ]},
{id: "b11", etap: 2, title: "Pauzy i ręce na zmianę",
 short: "Pauza to zaplanowana cisza, która też trwa określoną liczbę uderzeń. Melodia przechodzi z ręki do ręki.",
 goal: "Grasz ćwiczenie dwiema rękami na zmianę bez przerw w pulsie, licząc pauzy.",
 body: `<p><b>Pauza</b> to cisza o określonej długości – liczysz ją tak samo jak nuty:</p>
 <ul><li><b>pauza ćwierćnutowa</b> (zygzak) – 1 uderzenie,</li>
 <li><b>pauza półnutowa</b> (prostokącik leżący <i>na</i> 3. linii) – 2 uderzenia,</li>
 <li><b>pauza całonutowa</b> (prostokącik wiszący <i>pod</i> 4. linią) – cały takt.</li></ul>
 <p>W ćwiczeniu melodia przechodzi z prawej ręki do lewej i z powrotem. Gdy jedna ręka ma pauzę, liczysz dalej i przygotowujesz drugą rękę na klawiszach.</p>`,
 abc: [{src: H4 + "Q:1/4=72\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] C D E2 | z4 | E F G2 | z4 | G F E D | C4 |]\n[V:LH] z4 | G, F, E,2 | z4 | E, D, C,2 | z4 | C,4 |]", cap: "Prawa ręka (góra) i lewa (dół) na zmianę. W ostatnim takcie obie ręce razem."}],
 piano: "Licz na głos przez całe ćwiczenie, także w taktach z pauzą. Najpierw wolno (♩ = 60).",
 check: [
   {q: "Ile trwa pauza całonutowa w takcie 4/4?", opts: ["1 uderzenie", "2 uderzenia", "cały takt"], ok: 2},
   {q: "Co robisz w czasie pauzy?", opts: ["Czekam, aż mi się przypomni", "Liczę dalej i przygotowuję rękę", "Pomijam ją"], ok: 1}
 ]},
/* ---------- ETAP 3 ---------- */
{id: "b12", etap: 3, title: "Ręce razem",
 short: "Prawa ręka gra melodię, lewa trzyma długie nuty. Najważniejsza umiejętność pianisty.",
 goal: "Grasz ćwiczenie dwiema rękami razem, wolno i bez zatrzymywania.",
 body: `<p>Granie dwiema rękami naraz jest trudne dla każdego na początku – mózg musi się tego nauczyć. Metoda, która zawsze działa:</p>
 <ol><li>Każda ręka osobno, aż gra pewnie.</li>
 <li>Razem <b>bardzo wolno</b> – połowa tempa, w którym grasz jedną ręką.</li>
 <li>Patrz na miejsca, w których obie ręce zaczynają razem – tam „spotykają się” ręce. Pomiędzy nimi lewa tylko trzyma.</li>
 <li>Nie przyspieszaj, dopóki nie wyjdzie 3 razy z rzędu.</li></ol>`,
 abc: [{src: H4 + "Q:1/4=60\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] C D E F | G4 | G F E D | C4 | E E D D | C4 |]\n[V:LH] C,4 | C,4 | G,4 | C,4 | G,4 | C,4 |]", cap: "Lewa ręka trzyma całe nuty, prawa gra ćwierćnuty."}],
 piano: "Najpierw prawa ręka 3 razy, lewa 3 razy. Potem razem na ♩ = 50–60. Licz na głos – to bardzo pomaga.",
 check: [
   {q: "Jak zacząć granie rękami razem?", opts: ["W docelowym tempie", "Bardzo wolno, po opanowaniu rąk osobno", "Od razu bez nut"], ok: 1}
 ]},
{id: "b13", etap: 3, title: "Akompaniament: C i G w lewej ręce",
 short: "Dwa dźwięki basu wystarczą, żeby zagrać z akompaniamentem Odę do radości i „Błyszcz, gwiazdko”.",
 goal: "Grasz Odę do radości z lewą ręką (wersja w Utworach).",
 body: `<p>Większość prostych melodii da się zagrać z akompaniamentem z dwóch–trzech akordów. Najprostsza wersja to sam <b>bas</b>: jeden dźwięk w lewej ręce na takt.</p>
 <ul><li><b>C</b> (palec 5) – brzmi „u siebie”, spokojnie. To <b>tonika</b>.</li>
 <li><b>G</b> (kciuk) – brzmi „w napięciu”, chce wrócić do C. To <b>dominanta</b>.</li>
 <li><b>F</b> (palec 2) – brzmi „w drodze”. To <b>subdominanta</b>.</li></ul>
 <p>Posłuchaj, jak bas zmienia charakter tej samej melodii. Uszy szybko zaczną same słyszeć, kiedy przejść na G, a kiedy wrócić do C.</p>`,
 abc: [{src: H4 + "Q:1/4=72\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] C D E F | G F E D | C E D2 | C4 |]\n[V:LH] C,4 | G,4 | C,2 G,2 | C,4 |]", cap: "C – G – C i G – C. Ostatni takt: powrót do domu."}],
 piano: "Zagraj ćwiczenie, a potem w zakładce Utwory: „Oda do radości – z lewą ręką” i „Błyszcz, gwiazdko”.",
 check: [
   {q: "Który dźwięk basu brzmi „u siebie” w C-dur?", opts: ["C", "G", "F"], ok: 0},
   {q: "Który bas chce wrócić do C?", opts: ["G (dominanta)", "C", "E"], ok: 0}
 ]},
{id: "b14", etap: 3, title: "Głośno, cicho, legato i staccato",
 short: "Dynamika (p, mf, f) i artykulacja zmieniają ćwiczenie w muzykę.",
 goal: "Grasz to samo ćwiczenie cicho i głośno, legato i staccato, i słychać różnicę.",
 body: `<p><b>Dynamika</b> – jak głośno grać. Oznaczenia są włoskie:</p>
 <ul><li><b><i>p</i></b> (piano) – cicho, <b><i>mf</i></b> (mezzo forte) – średnio głośno, <b><i>f</i></b> (forte) – głośno.</li>
 <li><b>crescendo</b> (rozwierające się „widełki” &lt;) – coraz głośniej, <b>diminuendo</b> (&gt;) – coraz ciszej.</li></ul>
 <p>Głośność zależy od <b>szybkości</b> naciśnięcia klawisza, nie od siły nacisku na dnie. Cicho = powoli i blisko klawisza, głośno = szybciej, z ciężarem ręki.</p>
 <p><b>Artykulacja</b> – jak łączyć dźwięki:</p>
 <ul><li><b>legato</b> (łuk nad nutami) – płynnie, jeden palec puszcza klawisz dokładnie wtedy, gdy następny naciska,</li>
 <li><b>staccato</b> (kropka nad lub pod nutą) – krótko, jakby klawisz był gorący.</li></ul>`,
 abc: [{src: H4 + "Q:1/4=72\nK:C\n!p!(C D E F | G4) | !f!(G F E D | C4) | !mf!.C .E .G2 | .G .E .C2 | !crescendo(!C D E F | !crescendo)!G4 |]", cap: "Cicho legato, głośno legato, staccato, crescendo."}],
 piano: "Zagraj ćwiczenie dokładnie z oznaczeniami. Nagraj się telefonem i posłuchaj – czy p i f naprawdę się różnią?",
 check: [
   {q: "Co oznacza „p”?", opts: ["Głośno", "Cicho", "Pedał"], ok: 1},
   {q: "Kropka nad nutą to…", opts: ["staccato – krótko", "legato", "dłuższa nuta"], ok: 0, why: "Kropka obok nuty (z prawej) przedłuża ją, a kropka nad lub pod nutą oznacza staccato."}
 ]},
{id: "b15", etap: 3, title: "Ósemki",
 short: "Dwie ósemki na jedno uderzenie. Liczysz „raz-i, dwa-i”.",
 goal: "Grasz ćwiczenie z ósemkami równo z metronomem, licząc „raz-i”.",
 body: `<p><b>Ósemka</b> trwa pół uderzenia: na jedno „tyknięcie” metronomu przypadają dwie. Pojedyncza ósemka ma chorągiewkę, a kilka ósemek łączy się belką.</p>
 <p>Licz: „<b>raz</b>-i, <b>dwa</b>-i, <b>trzy</b>-i, <b>czte</b>-ry-i”. Liczba wypada na uderzenie metronomu, „i” dokładnie w połowie.</p>
 <p>Obie ósemki mają być równe – nie „taa-ta”, tylko „ta-ta”. Pauza ósemkowa wygląda jak mała siódemka z kropką.</p>`,
 abc: [{src: H4 + "Q:1/4=66\nK:C\nC/D/ E/F/ G2 | G/F/ E/D/ C2 | C/C/ D/D/ E/E/ F/F/ | G4 | E/F/ G E C | D/E/ F D2 | E/D/ C/D/ E D | C4 |]", cap: "Ósemki w pozycji C."}],
 piano: "Klaszcz rytm, licząc „raz-i”. Potem graj prawą ręką na ♩ = 60, potem lewą oktawę niżej. Na koniec zagraj w Utworach „Panie Janie”.",
 check: [
   {q: "Ile ósemek trwa tyle co jedna ćwierćnuta?", opts: ["1", "2", "4"], ok: 1},
   {q: "Jak liczysz ósemki w 4/4?", opts: ["raz-dwa-trzy-cztery", "raz-i, dwa-i, trzy-i, cztery-i"], ok: 1}
 ]},
{id: "b16", etap: 3, title: "Pozycja G i krzyżyk",
 short: "Ręka przesuwa się na G. Krzyżyk podnosi dźwięk o pół tonu – czarny klawisz Fis.",
 goal: "Grasz ćwiczenie w pozycji G obiema rękami i pamiętasz o Fis.",
 body: `<p><b>Pozycja G</b>: prawa ręka kciukiem na G nad środkowym C, palce na G A H C D. Lewa ręka oktawę niżej: mały palec na G, kciuk na D.</p>
 <p><b>Krzyżyk ♯</b> podnosi dźwięk o <b>półton</b> – na najbliższy klawisz w prawo (zwykle czarny). F z krzyżykiem to <b>Fis</b>: czarny klawisz między F a G. Nazwy z krzyżykiem kończą się na „-is”: Cis, Dis, Fis, Gis, Ais.</p>
 <p>Krzyżyk zapisany na początku pięciolinii (przy kluczu) to <b>znak przykluczowy</b>: działa w całym utworze. Krzyżyk na linii F oznacza tonację <b>G-dur</b> – każde F gramy jako Fis.</p>
 <p>W pozycji G nie ma F, ale w melodiach trochę szerszych już tak – zobaczysz w ćwiczeniu.</p>`,
 abc: [{src: H4 + "Q:1/4=72\nK:G\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] G A B c | d4 | d c B A | G4 | G F G A | B2 G2 | A F G2 | G4 |]\n[V:LH] G,,4 | D,4 | D,4 | G,,4 | G,,4 | G,,4 | D,4 | G,,4 |]", cap: "G-dur: krzyżyk przy kluczu. W 5. i 7. takcie prawa ręka sięga kciukiem w dół na Fis."}],
 piano: "Znajdź wszystkie Fis na klawiaturze. Potem zagraj ćwiczenie: ręce osobno, potem razem. W Utworach czeka „Mary Had a Little Lamb” w pozycji G.",
 check: [
   {q: "Co robi krzyżyk?", opts: ["Podnosi dźwięk o półton", "Obniża dźwięk o półton", "Wydłuża nutę"], ok: 0},
   {q: "Krzyżyk przy kluczu na linii F oznacza, że…", opts: ["tylko pierwsze F jest Fis", "każde F w utworze gramy jako Fis"], ok: 1}
 ]},
/* ---------- ETAP 4 ---------- */
{id: "b17", etap: 4, title: "Ćwierćnuta z kropką",
 short: "Rytm „taaa-ta”: ćwierćnuta z kropką (1½) i ósemka (½).",
 goal: "Grasz ćwiczenie równo z metronomem, a ósemka po kropce nie jest za wcześnie.",
 body: `<p>Kropka przedłuża nutę o połowę: ćwierćnuta (1) + połowa (½) = <b>1½ uderzenia</b>. Po niej zwykle stoi ósemka (½), razem 2 uderzenia.</p>
 <p>Licz: „<b>raz</b> – i – <b>dwa</b>-<u>i</u>”: ćwierćnutę z kropką grasz na „raz” i trzymasz przez „i” oraz „dwa”, a ósemkę grasz dopiero na „i” po dwójce.</p>
 <p>Ten rytm już znasz ze słuchu – był w Odzie do radości („E – D D”). Teraz czytasz go z nut.</p>`,
 abc: [{src: H4 + "Q:1/4=66\nK:C\nC3/2 D/ E2 | E3/2 F/ G2 | G3/2 F/ E D | C4 | E3/2 E/ D3/2 D/ | C3/2 D/ E2 | D3/2 C/ D E | C4 |]", cap: "Ćwierćnuta z kropką i ósemka."}],
 piano: "Klaszcz, licząc ósemkami („raz-i-dwa-i”), potem graj. Teraz możesz zagrać w Utworach refren „Jingle Bells”.",
 check: [
   {q: "Ile trwa ćwierćnuta z kropką?", opts: ["1 uderzenie", "1½ uderzenia", "2 uderzenia"], ok: 1}
 ]},
{id: "b18", etap: 4, title: "Podkładanie kciuka: gama C-dur",
 short: "Żeby wyjść poza pięć palców, kciuk przechodzi pod dłonią. Gama C-dur jedną oktawą.",
 goal: "Grasz gamę C-dur jedną oktawą każdą ręką osobno, równo i bez szarpnięcia przy kciuku.",
 body: `<p><b>Gama</b> to osiem kolejnych dźwięków od C do C. Pięć palców nie wystarczy, więc kciuk <b>przechodzi pod dłonią</b>.</p>
 <p><b>Prawa ręka w górę:</b> C(1) D(2) E(3), kciuk pod spód na F(1), G(2) A(3) H(4) C(5). W dół odwrotnie: C(5) H(4) A(3) G(2) F(1), trzeci palec przechodzi nad kciukiem na E(3), D(2) C(1).</p>
 <p><b>Lewa ręka w górę:</b> C(5) D(4) E(3) F(2) G(1), trzeci palec nad kciukiem na A(3), H(2) C(1). W dół: C(1) H(2) A(3), kciuk pod spód na G(1), F(2) E(3) D(4) C(5).</p>
 <p>Kciuk zaczyna wędrówkę wcześniej – już kiedy grasz 2. palcem, kciuk przesuwa się pod dłoń. Łokieć i nadgarstek się nie wykręcają.</p>`,
 abc: [{src: H4 + "Q:1/4=60\nK:C\n!1!C !2!D !3!E !1!F | !2!G !3!A !4!B !5!c | !5!c !4!B !3!A !2!G | !1!F !3!E !2!D !1!C |]", cap: "Gama C-dur prawą ręką z palcowaniem."},
       {src: H4 + "Q:1/4=60\nK:C clef=bass\n!5!C, !4!D, !3!E, !2!F, | !1!G, !3!A, !2!B, !1!C | !1!C !2!B, !3!A, !1!G, | !2!F, !3!E, !4!D, !5!C, |]", cap: "Gama C-dur lewą ręką."}],
 piano: "Najpierw samo przejście kciuka: E–F w prawej ręce (3–1) 10 razy, powoli. Potem cała gama, każda ręka osobno, ♩ = 60.",
 check: [
   {q: "Na jaki dźwięk prawa ręka podkłada kciuk w gamie C-dur w górę?", opts: ["E", "F", "G"], ok: 1},
   {q: "Kiedy kciuk zaczyna przechodzić pod dłoń?", opts: ["Dopiero gdy ma grać", "Wcześniej, podczas grania poprzednich palców"], ok: 1}
 ]},
{id: "b19", etap: 4, title: "Akordy C, F i G",
 short: "Trzy akordy w lewej ręce, które pasują do setek piosenek.",
 goal: "Lewa ręka zmienia akordy C – F – G – C płynnie, bez patrzenia na klawiaturę.",
 body: `<p><b>Akord</b> to kilka dźwięków granych razem. Najprostszy akord – <b>trójdźwięk</b> – to dźwięki co drugi klawisz: C-E-G.</p>
 <p>Żeby ręka nie skakała, akordy F i G gramy w wygodnym ułożeniu, blisko C:</p>
 <ul><li><b>C</b>: C-E-G (palce 5-3-1),</li>
 <li><b>F</b>: C-F-A (palce 5-2-1) – mały palec zostaje na C, reszta przesuwa się w górę,</li>
 <li><b>G</b>: H-D-G (palce 5-3-1) – mały palec schodzi na H, kciuk zostaje na G.</li></ul>
 <p>Z tymi trzema akordami zagrasz akompaniament do wielu piosenek. Gdy prawa ręka gra melodię, lewa trzyma akord przez cały takt.</p>`,
 abc: [{src: H4 + "Q:1/4=60\nK:C clef=bass\n[C,E,G,]4 | [C,F,A,]4 | [B,,D,G,]4 | [C,E,G,]4 | [C,E,G,]2 [C,F,A,]2 | [B,,D,G,]2 [C,E,G,]2 |]", cap: "C – F – G – C w lewej ręce."}],
 piano: "Zmieniaj akordy C–F–C–G–C na 4 uderzenia każdy. Kiedy wychodzi płynnie, graj na 2 uderzenia. Potem spróbuj zagrać melodię „Błyszcz, gwiazdko” z tymi akordami zamiast pojedynczych basów.",
 check: [
   {q: "Z jakich dźwięków składa się akord C?", opts: ["C-D-E", "C-E-G", "C-F-A"], ok: 1}
 ]},
{id: "b20", etap: 4, title: "Pedał – pierwsze kroki",
 short: "Prawy pedał przedłuża dźwięki. Naciskaj go zaraz po akordzie, nie razem z nim.",
 goal: "Łączysz pedałem akordy C – F – G – C bez „brudu” i bez dziur w brzmieniu.",
 body: `<p><b>Prawy pedał</b> podnosi tłumiki: dźwięki brzmią dalej po puszczeniu klawiszy. Dzięki temu łączysz akordy, których palce nie połączą.</p>
 <p>Pięta zostaje na podłodze, pedał naciskasz przednią częścią stopy, do końca i bez stukania.</p>
 <p>Najważniejsza zasada – <b>pedał po akordzie</b>: zagraj akord, <i>potem</i> naciśnij pedał. Przy zmianie akordu: zagraj nowy akord i <i>w tej chwili</i> podnieś pedał, a zaraz go znów naciśnij. Stopa jest zawsze „o krok spóźniona” wobec ręki. To się nazywa pedał synkopowany.</p>
 <p>Więcej (z ćwiczeniami) jest w kursie pedału w zakładce Nauka.</p>`,
 abc: [{src: H4 + "Q:1/4=56\nK:C clef=bass\n[C,E,G,]4 | [C,F,A,]4 | [B,,D,G,]4 | [C,E,G,]4 |]", cap: "Akordy z poprzedniej lekcji, teraz połączone pedałem."}],
 piano: "Zagraj akordy C–F–G–C, każdy przez cały takt, i połącz je pedałem: akord – pedał w dół – nowy akord – pedał w górę i od razu w dół. Słuchaj, czy akordy się nie mieszają.",
 check: [
   {q: "Kiedy naciskasz pedał?", opts: ["Przed akordem", "Zaraz po zagraniu akordu", "Razem z akordem, z całej siły"], ok: 1}
 ]},
{id: "b21", etap: 4, title: "Jak samodzielnie nauczyć się utworu",
 short: "Metoda, która działa z każdym nowym utworem: z książki, z MuseScore, z aplikacji.",
 goal: "Wybierasz pierwszy utwór z książki albo z MuseScore i dodajesz go w zakładce Utwory.",
 body: `<p>Od teraz uczysz się utworów z prawdziwych nut. Za każdym razem tak samo:</p>
 <ol><li><b>Przejrzyj nuty</b>: metrum, znaki przy kluczu, najkrótsze wartości, miejsca, które się powtarzają.</li>
 <li><b>Posłuchaj</b> nagrania (YouTube, MuseScore ma odtwarzacz), żeby wiedzieć, jak ma brzmieć.</li>
 <li><b>Podziel</b> utwór na fragmenty po 2–4 takty.</li>
 <li>Każdy fragment <b>ręce osobno</b>, potem <b>razem wolno</b>. Wpisz ołówkiem palcowanie, jeśli go nie ma.</li>
 <li><b>Łącz</b> fragmenty: 1+2, potem 1+2+3…</li>
 <li>Dopiero gdy całość idzie bez zatrzymywania – <b>podnoś tempo</b> z metronomem.</li></ol>
 <p>Lepiej 15 minut codziennie niż godzina raz w tygodniu – mózg uczy się ruchów w czasie snu między ćwiczeniami.</p>`,
 piano: "Wejdź w zakładkę Utwory i wybierz coś z sekcji „Z książek i z MuseScore”. Dodaj tytuł w „Moje utwory”, żeby plan dnia go podsuwał.",
 check: [
   {q: "Kiedy podnosić tempo?", opts: ["Od pierwszego dnia", "Gdy całość idzie wolno bez zatrzymywania", "Nigdy"], ok: 1}
 ]}
];
BEG_LESSONS.forEach(l => { LESSONS[l.id] = l; });

/* Melodie do grania. need = lekcja, po której utwór się odblokowuje. */
const BEG_PIECES = [
 {id: "bp-oda", need: "b6", name: "Oda do radości", by: "L. van Beethoven", hands: "prawa ręka", pos: "pozycja C",
  abc: H4 + "Q:1/4=80\nK:C\n!3!E E !4!F !5!G | G F E D | !1!C C D E | E3/2 D/2 D2 | E E F G | G F E D | C C D E | D3/2 C/2 C2 |]",
  tips: ["Kciuk na środkowym C, ręka się nie przesuwa.", "„E – D D” w 4. takcie: pierwsza nuta dłuższa.", "Druga połowa jest prawie taka sama jak pierwsza – różni się tylko zakończenie."]},
 {id: "bp-lune", need: "b6", name: "Przy blasku księżyca (Au clair de la lune)", by: "piosenka francuska", hands: "prawa ręka", pos: "pozycja C",
  abc: H4 + "Q:1/4=80\nK:C\n!1!C C C !2!D | !3!E2 !2!D2 | !1!C E D D | C4 | C C C D | E2 D2 | C E D D | C4 |]",
  tips: ["Półnuty trzymaj pełne 2 uderzenia.", "W 3. takcie skok C–E: palec 1 na 3."]},
 {id: "bp-london", need: "b9", name: "Most londyński (London Bridge)", by: "piosenka angielska", hands: "prawa ręka", pos: "pozycja C + A",
  abc: H4 + "Q:1/4=88\nK:C\n!4!G !5!A !4!G !3!F | !2!E !3!F !4!G2 | !1!D !2!E !3!F2 | !2!E !3!F !4!G2 | G A G F | E F G2 | !1!D2 !4!G2 | !2!E2 !1!C2 |]",
  tips: ["Tu ręka zaczyna wyżej: kciuk na D, piąty palec sięga do A.", "Ostatnie takty: D (1) – G (4) – E (2) – C (1) – kciuk przesuwa się w dół na C."]},
 {id: "bp-kotek", need: "b10", name: "Wlazł kotek na płotek", by: "piosenka ludowa", hands: "prawa ręka", pos: "pozycja C, 3/4",
  abc: "X:1\nM:3/4\nL:1/4\nQ:1/4=96\nK:C\n!5!G !3!E E | !4!F !2!D D | !1!C !3!E !5!G | G3 | G E E | F D D | C E C | C3 |]",
  tips: ["Licz „raz-dwa-trzy”, akcent na „raz”.", "Półnuta z kropką na końcu każdej połowy – trzymaj 3 uderzenia."]},
 {id: "bp-twinkle", need: "b13", name: "Błyszcz, gwiazdko (Ah, vous dirai-je, maman)", by: "melodia francuska, wariacje pisał na nią Mozart", hands: "obie ręce", pos: "pozycja C + A",
  abc: H4 + "Q:1/4=80\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] !1!C C !4!G G | !5!A A !4!G2 | !3!F F !2!E E | D D C2 | !4!G G !3!F F | E E D2 | G G F F | E E D2 | C C G G | A A G2 | F F E E | D D C2 |]\n[V:LH] C,4 | F,2 C,2 | F,2 C,2 | G,2 C,2 | C,2 F,2 | C,2 G,2 | C,2 F,2 | C,2 G,2 | C,4 | F,2 C,2 | F,2 C,2 | G,2 C,2 |]",
  tips: ["Prawa ręka: po C kciukiem przeskok na G czwartym palcem, żeby piąty sięgnął A.", "Lewa ręka: C (5), F (2), G (1) – nie przesuwaj ręki.", "Najpierw same ręce, potem razem bardzo wolno."]},
 {id: "bp-oda2", need: "b13", name: "Oda do radości – z lewą ręką", by: "L. van Beethoven", hands: "obie ręce", pos: "pozycja C",
  abc: H4 + "Q:1/4=80\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] E E F G | G F E D | C C D E | E3/2 D/2 D2 | E E F G | G F E D | C C D E | D3/2 C/2 C2 |]\n[V:LH] C,4 | G,4 | C,4 | G,4 | C,4 | G,4 | C,4 | G,2 C,2 |]",
  tips: ["Melodię już znasz – skup się na tym, żeby lewa ręka zmieniała się dokładnie na „raz”.", "Bas cicho, melodia wyraźnie."]},
 {id: "bp-janie", need: "b15", name: "Panie Janie (Frère Jacques)", by: "kanon francuski", hands: "prawa ręka", pos: "pozycja C, ósemki",
  abc: H4 + "Q:1/4=88\nK:C\n!1!C !2!D !3!E !1!C | C D E C | !3!E !4!F !5!G2 | E F G2 | !3!G/!4!A/ !3!G/!2!F/ !1!E !1!C | G/A/ G/F/ E C | !2!C !1!G, !2!C2 | C G, C2 |]",
  tips: ["Takty 5–6: ręka przesuwa się wyżej (kciuk na E), żeby sięgnąć A.", "Ostatnie takty: kciuk schodzi pod środkowe C, na G.", "To kanon – możesz grać z kimś, kto zaczyna 2 takty później!"]},
 {id: "bp-mary", need: "b16", name: "Mary Had a Little Lamb", by: "piosenka amerykańska", hands: "obie ręce", pos: "pozycja G",
  abc: H4 + "Q:1/4=88\nK:G\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] !3!B !2!A !1!G A | B B B2 | A A A2 | B !5!d d2 | B A G A | B B B B | A A B A | G4 |]\n[V:LH] G,,4 | G,,4 | D,4 | G,,4 | G,,4 | G,,4 | D,4 | G,,4 |]",
  tips: ["Prawa ręka w pozycji G: kciuk na G, piąty palec na D.", "Lewa ręka: G (5) i D (1)."]},
 {id: "bp-jingle", need: "b17", name: "Jingle Bells – refren", by: "J. Pierpont", hands: "prawa ręka", pos: "pozycja C, ćwierćnuta z kropką",
  abc: H4 + "Q:1/4=100\nK:C\n!3!E E E2 | E E E2 | E !5!G !1!C3/2 !2!D/ | !3!E4 | !4!F F F3/2 F/ | F E E E/E/ | E D D E | D2 G2 | E E E2 | E E E2 | E G C3/2 D/ | E4 | F F F F | F E E E/E/ | G G F D | C4 |]",
  tips: ["Takt 3: z G (5) na C (1) – szybki ruch kciuka, ręka się nie przesuwa.", "Ćwierćnuta z kropką: „taaa-ta”.", "Lewa ręka (dla chętnych): C przez cały utwór, G w taktach 7–8 i 15."]}
];

/* Utwory z książek, które są w domu, i MuseScore. etap: od kiedy. */
const BEG_BOOKS = [
 {etap: 3, name: "Famous classical and traditional folk songs for beginners (Štefánik)", how: "Zacznij od pierwszych utworów w książce – są w pozycji pięciu palców. Graj po kolei."},
 {etap: 4, name: "Łatwa klasyka na fortepian (Biskupska, Bruce)", how: "Wybieraj utwory z początku książki, z niewielką liczbą znaków przy kluczu."},
 {etap: 4, name: "Dla Celiny (Lic) i Dla Marceliny (Wiśniewski)", how: "Krótkie utwory dla dzieci – dobre jako pierwsze „prawdziwe” utwory z obiema rękami."}
];
const MS_SEARCH = (q) => "https://musescore.com/sheetmusic?complexity=1&text=" + encodeURIComponent(q);
const MS_IDEAS = ["Ode to joy easy piano", "Twinkle twinkle little star piano beginner", "Jingle bells easy piano", "Lulajże Jezuniu łatwe", "Sto lat piano easy", "Minuet in G easy piano", "Brahms lullaby easy piano", "Canon in D easy piano"];

/* ============================== STAN ============================== */
const isBeg = () => S.mode === "beg";
function begS() { if (!S.beg) S.beg = {done: {}, piece: null, notes: []}; return S.beg; }
function begLessonIdx() { const B = begS(); const i = BEG_LESSONS.findIndex(l => !B.done[l.id]); return i < 0 ? BEG_LESSONS.length : i; }
function begCurLesson() { return BEG_LESSONS[begLessonIdx()] || null; }
function begEtap() { const l = begCurLesson(); return l ? l.etap : 4; }
function begDone(id) { return !!begS().done[id]; }
function begUnlocked(p) { return begDone(p.need); }
function begPiece() {
  const B = begS();
  if (B.piece) { const p = BEG_PIECES.find(x => x.id === B.piece); if (p && st(p.id) < 4) return p; }
  return BEG_PIECES.find(p => begUnlocked(p) && st(p.id) > 0 && st(p.id) < 4) || BEG_PIECES.find(p => begUnlocked(p) && st(p.id) < 4) || null;
}
function begProgress() {
  const l = BEG_LESSONS.filter(x => begDone(x.id)).length / BEG_LESSONS.length;
  const p = BEG_PIECES.filter(x => st(x.id) >= 4).length / BEG_PIECES.length;
  return 0.7 * l + 0.3 * p;
}
function begNotesAcc() { const L = (begS().notes || []).slice(-30); return L.length ? L.filter(x => x.ok).length / L.length : 0; }

/* rodzaj formy: "m" lub "f" – w kursie od zera piszemy bezosobowo, ale gdzie się nie da, decyduje S.g */
const gx = (f, m) => (S.g === "m" ? m : f);

/* ============================== PLAN DNIA ============================== */
const BEG_BLOCKS = {
  bwarm: {name: "Rozgrzewka palców", grp: "tech", ab: "Pa"},
  blesson: {name: "Lekcja", grp: "mind", ab: "Le"},
  bnotes: {name: "Czytanie nut", grp: "mind", ab: "Nu"},
  brhythm: {name: "Rytm", grp: "mind", ab: "Ry"},
  bpiece: {name: "Utwór", grp: "music", ab: "Ut"},
  brepeat: {name: "Powtórka: to, co już umiesz", grp: "music", ab: "Po"}
};
function begGenPlan(key, minutes) {
  const idx = S.sessions, L = begLessonIdx(), piece = begPiece();
  let w = {bwarm: 3, blesson: 7, bnotes: 3, brhythm: 3, bpiece: 6, brepeat: 4};
  if (!begDone("b5")) delete w.brhythm;
  if (!piece) { w.blesson += w.bpiece; delete w.bpiece; }
  if (L >= BEG_LESSONS.length) { delete w.blesson; w.bpiece = (w.bpiece || 0) + 5; w.brepeat += 3; }
  const known = BEG_PIECES.filter(p => st(p.id) >= 3);
  if (minutes < 30 || !known.length) delete w.brepeat;
  if (minutes <= 15) { if (w.brhythm && w.bnotes) { if (idx % 2) delete w.bnotes; else delete w.brhythm; } }
  const order = ["bwarm", "blesson", "bnotes", "brhythm", "bpiece", "brepeat"].filter(k => w[k]);
  const sum = order.reduce((a, k) => a + w[k], 0);
  const blocks = order.map(k => ({type: k, min: Math.max(2, Math.round(w[k] * minutes / sum)), done: false}));
  const diff = minutes - blocks.reduce((a, b) => a + b.min, 0);
  blocks.reduce((a, b) => b.min > a.min ? b : a, blocks[0]).min += diff;
  for (const b of blocks) {
    if (b.type === "brepeat") b.items = known.sort((a, c) => hash(key + a.id) - hash(key + c.id)).slice(0, 2).map(p => p.id);
  }
  return {minutes, blocks, counted: false, beg: true};
}
const WARM = {
  1: ["Pozycja C, prawa ręka: palce 1-2-3-4-5-4-3-2-1, wolno, każdy dźwięk tak samo głośno.", "To samo lewą ręką (palce 5-4-3-2-1-2-3-4-5).", "„Kapiący kran”: każdy palec po kolei gra 4 razy ten sam klawisz, reszta leży luźno."],
  2: ["Pozycja C, każda ręka osobno: C-D-E-D-C, D-E-F-E-D, E-F-G-F-E, potem w dół.", "Skoki: C-E-G-E-C (palce 1-3-5) w prawej, C-E-G w lewej (5-3-1).", "Raz legato (płynnie), raz staccato (krótko)."],
  3: ["Pozycja C, ręce razem w ruchu równoległym: obie ręce C-D-E-F-G (prawa 1→5, lewa 5→1).", "Ruch przeciwny: oba kciuki na środkowym C, prawa ręka idzie w górę (C-D-E-F-G), lewa w dół (C-H-A-G-F), tymi samymi palcami.", "To samo w pozycji G."],
  4: ["Gama C-dur jedną oktawą, każda ręka osobno, potem razem (ćwierćnuty, ♩ = 60).", "Akordy C – F – G – C w lewej ręce, a prawa gra C-E-G rozłożone.", "Pięć palców w pozycji G i F (w F pamiętaj: H jest obniżone do B, czarny klawisz)."]
};
function begBlockBody(b) {
  const E = begEtap();
  if (b.type === "bwarm") {
    return `<p class="small">Krótko i spokojnie – to rozgrzewka, nie trening siły. Ramiona luźne, palce zaokrąglone.</p>
      <ol class="tips">${WARM[E].map(x => `<li>${x}</li>`).join("")}</ol>
      ${metroInline(60, "bwarm")}`;
  }
  if (b.type === "blesson") {
    const l = begCurLesson();
    if (!l) return `<p>Wszystkie lekcje kursu za Tobą. Teraz utwory z książek i MuseScore.</p>`;
    const i = BEG_LESSONS.indexOf(l);
    return `<div><h3 style="font-size:1.15rem">${l.title}</h3><p class="meta">Etap ${l.etap}: ${BEG_ETAPY[l.etap - 1].name} · lekcja ${i + 1} z ${BEG_LESSONS.length}</p></div>
      <p class="small">${l.short}</p>
      <div class="box tip small"><b>Cel lekcji:</b> ${l.goal}</div>
      ${l.abc ? `<div class="abc" data-abc="${l.id}:0"></div><div class="row"><button class="btn sm" data-act="b-play" data-src="lesson:${l.id}:0">▶ Posłuchaj</button><button class="btn sm ghost" data-act="b-stop">Stop</button></div>` : ""}
      <p class="small muted">Jedna lekcja może trwać kilka dni – to normalne. Odhacz ją, gdy cel lekcji jest spełniony.</p>
      <div class="row"><button class="btn sm primary" data-act="b-lesson" data-id="${l.id}">Otwórz lekcję</button>
      <button class="btn sm ghost" data-act="b-ldone" data-id="${l.id}">Cel osiągnięty ✓</button></div>`;
  }
  if (b.type === "bnotes") {
    const kb = !begDone("b7");
    return `<p class="small">${kb ? "Pokazuję klawisz – podaj jego nazwę. Szukaj grup czarnych klawiszy: C przed dwoma, F przed trzema." : "Pokazuję nutę na pięciolinii – podaj jej nazwę. Najpierw znajdź „kotwicę” (środkowe C, G na 2. linii, F między kropkami basu), potem licz."}</p>
      <p class="small muted">${(begS().notes || []).length ? "Celność z ostatnich odpowiedzi: <b>" + pct(begNotesAcc()) + "</b>" : ""}</p>
      <div id="bq-inline">${b.done ? `<p class="small muted">Zrobione na dziś.</p>` : `<button class="btn sm primary" data-act="b-quiz" data-q="${kb ? "bkeys" : "bnotes"}">Zacznij (10 pytań)</button>`}</div>`;
  }
  if (b.type === "brhythm") {
    return `<p class="small">Posłuchaj krótkiego rytmu, a potem wystukaj go na dużym przycisku. Licz w myślach „raz-dwa-trzy-cztery”.</p>
      <div id="bq-inline">${b.done ? `<p class="small muted">Zrobione na dziś.</p>` : `<button class="btn sm primary" data-act="b-quiz" data-q="ear-clap">Zacznij (4 rytmy)</button>`}</div>`;
  }
  if (b.type === "bpiece") {
    const p = begPiece();
    if (!p) return `<p>Wszystkie melodie z aplikacji są opanowane. Wybierz utwór z książki w zakładce Utwory.</p>`;
    return begPieceHtml(p, true);
  }
  if (b.type === "brepeat") {
    const items = (b.items || []).map(id => BEG_PIECES.find(p => p.id === id)).filter(Boolean);
    return `<p class="small">Zagraj jeszcze raz utwory, które już znasz – tym razem z jednym celem: równe tempo, wyraźna melodia albo bez patrzenia na ręce.</p>
      <ul class="tips">${items.map(p => `<li><b>${p.name}</b> <span class="muted small">· ${p.pos}</span> <button class="btn sm ghost" data-act="b-play" data-src="piece:${p.id}">▶</button></li>`).join("")}</ul>
      ${S.my.length ? `<p class="small">Albo coś z Twoich utworów: ${S.my.slice(0, 3).map(m => esc(m.name)).join(", ")}.</p>` : ""}`;
  }
  return "";
}
function begPieceHtml(p, inPlan) {
  const s = st(p.id);
  return `<div class="stack" style="gap:8px"><div><h3 style="font-size:1.15rem">${p.name}</h3>
    <p class="meta">${p.by} · ${p.hands} · ${p.pos}</p></div>
    <div class="abc" data-babc="${p.id}"></div>
    <div class="row"><button class="btn sm" data-act="b-play" data-src="piece:${p.id}">▶ Posłuchaj</button><button class="btn sm ghost" data-act="b-stop">Stop</button>
      ${ytLink(p.name.replace(/\s*\(.*\)/, "") + " easy piano tutorial", "YouTube")}</div>
    ${inPlan ? `<p class="note"><b>Dziś:</b> ${BEG_STEP[s]}</p>` : ""}
    ${stageHtml(p)}
    <ul class="tips small">${p.tips.map(t => `<li>${t}</li>`).join("")}</ul>
    ${inPlan ? metroInline(60, "bpiece") : ""}
    </div>`;
}
const BEG_STEP = [
  "Posłuchaj utworu 2 razy i zacznij: przeczytaj nuty, znajdź pozycję ręki, zagraj pierwsze 2 takty.",
  "Po 2 takty, każda ręka osobno, wolno. Gdy fragment wyjdzie 3 razy z rzędu – następny.",
  "Graj całość (ręce razem, jeśli są) wolno, bez zatrzymywania się. Metronom na 50–60.",
  "Podnoś tempo o kilka uderzeń dziennie. Dodaj dynamikę: melodia wyraźnie, bas ciszej.",
  "Opanowany! Wraca w powtórkach."
];

/* ============================== WIDOKI ============================== */
function begViewProgress() {
  const tot = begProgress(), E = begEtap();
  const days = []; for (let i = 13; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); const k = todayKey(d); const pl = S.plans[k]; const m = pl ? pl.blocks.filter(b => b.done).reduce((a, b) => a + b.min, 0) : 0; days.push({k, m, d}); }
  const max = Math.max(30, ...days.map(x => x.m)), week = days.slice(7).reduce((a, b) => a + b.m, 0), streak = streakDays();
  return `<section class="stack">
  <div class="card stack">
    <h2>Kurs od zera</h2>
    <div class="row" style="align-items:flex-end;gap:14px"><span class="big">${pct(tot)}</span><span class="muted">kursu za Tobą</span></div>
    <div class="bar"><span style="width:${pct(tot)}"></span></div>
    <div class="keys" aria-label="Etapy kursu">${BEG_ETAPY.map(e => `<div class="key t-mind ${e.n < E || begLessonIdx() >= BEG_LESSONS.length ? "done" : ""} ${e.n === E ? "now" : ""}" style="flex-grow:1"><b class="ab">${e.n}</b></div>`).join("")}</div>
    <p class="small muted">Etap ${E}: ${BEG_ETAPY[E - 1].name}. ${BEG_ETAPY[E - 1].desc}</p>
  </div>
  <div class="minis">
    <div class="mini"><div class="small muted">Ten tydzień</div><div class="v">${week} min</div></div>
    <div class="mini"><div class="small muted">Dni z rzędu</div><div class="v">${streak}</div></div>
    <div class="mini"><div class="small muted">Wszystkie sesje</div><div class="v">${S.sessions}</div></div>
  </div>
  <div class="card stack">
    <h3>Ostatnie 14 dni</h3>
    <ul class="daykeys" aria-label="Minuty przy pianinie w ostatnich 14 dniach">${days.map((x, i) => `<li class="${x.m ? "" : "zero"} ${i === days.length - 1 ? "today" : ""} ${x.d.getDay() === 0 ? "sun" : ""}"><i style="height:${Math.round(x.m / max * 100)}%"></i><span aria-hidden="true">${x.d.getDate()}</span><span class="sr-only">${x.d.toLocaleDateString("pl-PL", {day: "numeric", month: "long"})}: ${x.m} min</span></li>`).join("")}</ul>
    <p class="small muted" style="margin:0">Im głębiej wciśnięty klawisz, tym dłużej trwała sesja. Pełny klawisz = ${max} min. Lepiej krótko codziennie niż długo raz w tygodniu.</p>
  </div>
  <div class="card stack">
    <h3>Lekcje</h3>
    <p class="small muted">Odhacz lekcję, gdy jej cel jest spełniony. Możesz też cofnąć odhaczenie.</p>
    ${BEG_ETAPY.map(e => `<details ${e.n === E ? "open" : ""}><summary>Etap ${e.n}: ${e.name} <span class="muted small">(${BEG_LESSONS.filter(l => l.etap === e.n && begDone(l.id)).length}/${BEG_LESSONS.filter(l => l.etap === e.n).length})</span></summary>
      <div class="stack" style="gap:6px;margin-top:8px">${BEG_LESSONS.filter(l => l.etap === e.n).map(l => `<button class="check t-mind" data-act="b-ltoggle" data-id="${l.id}" aria-pressed="${begDone(l.id)}" style="justify-content:flex-start;border-radius:12px;text-align:left"><span class="box">✓</span>${l.title}</button>`).join("")}</div></details>`).join("")}
  </div>
  <div class="card stack">
    <h3>Utwory</h3>
    ${BEG_PIECES.map(p => `<div class="stack t-music" style="gap:4px"><div class="spread"><span>${p.name}${begUnlocked(p) ? "" : ` <span class="pill">po lekcji ${BEG_LESSONS.findIndex(l => l.id === p.need) + 1}</span>`}</span><span class="small muted">${STATUS[st(p.id)]}</span></div><div class="bar"><span style="width:${st(p.id) * 25}%"></span></div></div>`).join("")}
  </div>
  ${accountCard()}
  ${installCard()}
  <details class="card"><summary>Ustawienia</summary>
    <div class="stack" style="margin-top:10px">
      <label class="spread"><span>Forma zwracania się</span><select data-act="b-gender"><option value="m" ${S.g === "m" ? "selected" : ""}>grałeś, zalogowany</option><option value="f" ${S.g !== "m" ? "selected" : ""}>grałaś, zalogowana</option></select></label>
      <p class="small muted">Gdy kurs od zera będzie za łatwy, możesz przejść na program RCM Grade 5–8 (dla zaawansowanych). Postęp w kursie zostaje zapisany.</p>
      <div><button class="btn sm ghost" data-act="b-mode" data-m="adv">Przełącz na program Grade 5–8</button></div>
      <button class="btn sm ghost" data-act="reset-ask">Zacznij od nowa…</button>
      <div id="reset-confirm"></div>
    </div>
  </details>
  </section>`;
}
function begViewRep() {
  const E = begEtap(), cur = begPiece();
  return `<section class="stack">
    <h2>Utwory</h2>
    <p class="small muted">Melodie w aplikacji odblokowują się po kolejnych lekcjach. Stuknij, żeby zobaczyć nuty i posłuchać.</p>
    <div class="card pieces">${BEG_PIECES.map(p => {
      const s = st(p.id), open = begUnlocked(p), isAct = cur && cur.id === p.id;
      return `<details class="piece"${isAct ? " open" : ""}><summary><span class="pn">${p.name}</span>
        <span class="minikeys t-music" aria-hidden="true">${[1, 2, 3, 4].map(i => `<i class="${i <= s ? "on" : ""}"></i>`).join("")}</span>
        ${isAct ? `<span class="pill own">w planie</span>` : open ? "" : `<span class="pill">po lekcji ${BEG_LESSONS.findIndex(l => l.id === p.need) + 1}</span>`}</summary>
        <div class="stack" style="gap:10px;padding:2px 0 6px">${begPieceHtml(p, false)}
        ${open && s < 4 && !isAct ? `<div><button class="btn sm" data-act="b-activate" data-id="${p.id}">Ucz się teraz – ustaw w planie</button></div>` : ""}</div></details>`;
    }).join("")}</div>
    <div class="listhead"><span class="lt">📖</span><h3>Z książek i z MuseScore</h3><span class="small muted">od etapu 3</span></div>
    <div class="card stack">
      ${BEG_BOOKS.map(b => `<div class="stack" style="gap:2px;${b.etap > E ? "opacity:.6" : ""}"><b>${b.name}</b><span class="small">${b.how}</span>${b.etap > E ? `<span class="small muted">Na razie za wcześnie – od etapu ${b.etap}.</span>` : ""}</div>`).join("")}
      <div class="stack" style="gap:4px"><b>MuseScore</b><span class="small">Łatwe aranżacje (filtr „Beginner”). Wybieraj takie, które mają jedną stronę i mało znaków przy kluczu. Pomysły:</span>
      <div class="extlinks">${MS_IDEAS.map(q => `<a class="pill" href="${MS_SEARCH(q)}" target="_blank" rel="noopener">${esc(q.replace(/ (easy|piano|beginner|łatwe).*$/i, ""))}</a>`).join(" ")}</div></div>
    </div>
    <div class="listhead"><span class="lt">♪</span><h3>Moje utwory</h3><span class="small muted">do powtórek</span></div>
    <div class="card stack">
      ${S.my.map(m => `<div class="spread"><span>${esc(m.name)}</span><button class="btn sm ghost" data-act="mydel" data-id="${m.id}" aria-label="Usuń: ${esc(m.name)}">Usuń</button></div>`).join("") || `<p class="small muted" style="margin:0">Dodaj tu utwory z książek i MuseScore, których się uczysz.</p>`}
      <form class="row" id="myform"><input type="text" id="myname" placeholder="Štefánik – Ach, mój rozmarynie" style="flex:1"><button class="btn primary sm" type="submit">Dodaj</button></form>
    </div>
  </section>`;
}
function begLearnHome() {
  const E = begEtap();
  return `<section class="stack">
    <h2>Nauka</h2>
    <div class="card stack">
      <div class="spread"><h3>Kurs od zera</h3><span class="mono small">${BEG_LESSONS.filter(l => begDone(l.id)).length}/${BEG_LESSONS.length}</span></div>
      <p class="small muted">Lekcje po kolei: krótkie wyjaśnienie, nuty z odsłuchem, zadanie przy pianinie i pytania sprawdzające.</p>
      ${BEG_ETAPY.map(e => `<details ${e.n === E ? "open" : ""}><summary>Etap ${e.n}: ${e.name} <span class="muted small">(${BEG_LESSONS.filter(l => l.etap === e.n && begDone(l.id)).length}/${BEG_LESSONS.filter(l => l.etap === e.n).length})</span></summary>
        <div class="lessonlist">${BEG_LESSONS.filter(l => l.etap === e.n).map(l => `<button data-act="b-lesson" data-id="${l.id}"><span>${BEG_LESSONS.indexOf(l) + 1}. ${l.title}</span>${begDone(l.id) ? `<span class="ok">✓</span>` : `<span class="muted">›</span>`}</button>`).join("")}</div></details>`).join("")}
    </div>
    ${listenCard()}
    ${E >= 4 ? `<div class="card stack"><h3>Kurs pedału</h3><p class="small muted">Rozwinięcie lekcji o pedale – dla chętnych.</p><div class="lessonlist">${PEDAL.slice(0, 4).map((l, i) => `<button data-act="pedal-open" data-id="${l.id}"><span>${i + 1}. ${l.title}</span>${S.pedal.done[l.id] ? `<span class="ok">✓</span>` : `<span class="muted">›</span>`}</button>`).join("")}</div></div>` : ""}
  </section>`;
}
function begLessonView(id) {
  const i = BEG_LESSONS.findIndex(l => l.id === id), l = BEG_LESSONS[i];
  if (!l) return begLearnHome();
  const next = BEG_LESSONS[i + 1], prev = BEG_LESSONS[i - 1];
  const unlocks = BEG_PIECES.filter(p => p.need === id);
  return `<section class="stack">
    <div><button class="btn sm ghost" data-act="learn-home">‹ Nauka</button></div>
    <article class="card stack lesson">
      <h2>${l.title}</h2>
      <p class="meta">Etap ${l.etap}: ${BEG_ETAPY[l.etap - 1].name} · lekcja ${i + 1} z ${BEG_LESSONS.length}</p>
      ${l.body}
      ${(l.abc || []).map((a, k) => `<div><div class="abc" data-abc="${id}:${k}"></div>${a.cap ? `<p class="small muted" style="margin:0">${a.cap}</p>` : ""}
        <div class="row" style="margin-top:6px"><button class="btn sm" data-act="b-play" data-src="lesson:${id}:${k}">▶ Posłuchaj</button><button class="btn sm ghost" data-act="b-stop">Stop</button></div></div>`).join("")}
      ${l.piano ? `<div class="box tip"><b>Przy pianinie:</b> ${l.piano}</div>` : ""}
      <div class="box"><b>Cel lekcji:</b> ${l.goal}</div>
      ${l.check ? `<h4>Sprawdź się</h4>${l.check.map((c, qi) => `<div class="check-q"><span>${c.q}</span><div class="opts">${c.opts.map((o, oi) => `<button type="button" data-act="chk" data-id="${id}" data-q="${qi}" data-o="${oi}">${o}</button>`).join("")}</div><p class="small muted" id="why-${qi}" role="status" style="margin:0"></p></div>`).join("")}` : ""}
      ${unlocks.length ? `<p class="small">Po tej lekcji odblokujesz w Utworach: <b>${unlocks.map(p => p.name).join(", ")}</b>.</p>` : ""}
      <div class="row">
        ${begDone(id) ? `<button class="btn sm" data-act="b-ldone" data-id="${id}">Zaliczona ✓ (cofnij)</button>` : `<button class="btn sm primary" data-act="b-ldone" data-id="${id}">Cel osiągnięty ✓</button>`}
        ${prev ? `<button class="btn sm ghost" data-act="b-lesson" data-id="${prev.id}">‹ Poprzednia</button>` : ""}
        ${next ? `<button class="btn sm ghost" data-act="b-lesson" data-id="${next.id}">Następna ›</button>` : ""}
      </div>
    </article></section>`;
}
function begToolsCard() {
  return `<details class="card"><summary>Nuty w domu i co się przyda</summary><div class="stack" style="margin-top:10px">
    <p class="small"><b>Na start wystarczy aplikacja:</b> wszystkie lekcje i pierwsze melodie mają nuty na ekranie i odsłuch.</p>
    <p class="small"><b>Od etapu 3:</b> Štefánik „Famous classical and traditional folk songs for beginners”. <b>Od etapu 4:</b> „Łatwa klasyka na fortepian”, „Dla Celiny”, „Dla Marceliny”.</p>
    <p class="small"><b>MuseScore:</b> szukaj z filtrem trudności „Beginner”. Jedna strona, najwyżej jeden znak przy kluczu, najkrótsze wartości to ósemki.</p>
    <p class="small"><b>Jeśli chcesz kupić podręcznik:</b> dobrą szkołą dla dorosłych jest Faber „Adult Piano Adventures – All-in-One Lesson Book 1” albo Alfred „Adult All-in-One Course, Level 1”. Kurs w aplikacji idzie podobną drogą, więc można je łączyć.</p>
    <p class="small muted">Ćwiczenie „Czytanie a vista” wyżej ustaw na poziom 1 – to krótkie melodie w pozycji C i G.</p>
  </div></details>`;
}

/* ============================== POWITANIE ============================== */
let ONBOARD = false, onbStep = "home", TRANSFER = null;
function onboardView() {
  if (onbStep === "beg") return `<section class="stack">
    <div class="card stack">
      <h2>Kurs od zera</h2>
      <p>21 krótkich lekcji w 4 etapach: od tego, jak usiąść przy pianinie, przez czytanie nut, po pierwsze utwory dwiema rękami. Codzienny plan na 15–45 minut.</p>
      <label class="stack" style="gap:6px"><span class="small">Jak się do Ciebie zwracać?</span>
        <div class="seg" role="group" aria-label="Forma"><button data-act="onb-g" data-g="m" aria-pressed="${S.g === "m"}">grałeś</button><button data-act="onb-g" data-g="f" aria-pressed="${S.g !== "m"}">grałaś</button></div></label>
      <label class="stack" style="gap:6px"><span class="small">Ile czasu dziennie?</span>
        <div class="seg" role="group" aria-label="Minuty">${[15, 20, 30, 45].map(m => `<button data-act="onb-min" data-m="${m}" aria-pressed="${S.minutes === m}">${m} min</button>`).join("")}</div></label>
      <div class="row"><button class="btn primary" data-act="onb-start">Zaczynam</button><button class="btn ghost" data-act="onb-back">Wróć</button></div>
      <p class="small muted">Po starcie zaloguj się swoim kontem Google (przycisk „Zaloguj” u góry), żeby postęp był bezpieczny i dostępny na innych urządzeniach.</p>
    </div></section>`;
  return `<section class="stack">
    <div class="card stack">
      <h2>Witaj przy pianinie</h2>
      ${SYNC.user ? `<p>Zalogowano jako <b>${esc(SYNC.user.email || "")}</b>. To konto nie ma jeszcze postępu. Od czego zaczynamy?</p>` : `<p>Na tym urządzeniu nie ma jeszcze żadnego postępu. Od czego zaczynamy?</p>`}
      <button class="btn primary" data-act="onb-beg" style="justify-content:flex-start;text-align:left">Zaczynam od zera – nigdy nie grałem/grałam</button>
      <button class="btn" data-act="onb-adv" style="justify-content:flex-start;text-align:left">Gram już – program RCM Grade 5–8</button>
      ${TRANSFER && SYNC.user ? `<button class="btn ghost" data-act="onb-transfer" style="justify-content:flex-start;text-align:left">Przenieś na to konto postęp z tego urządzenia (${esc(stateSummary(TRANSFER))})</button>` : ""}
      ${SYNC.configured && !SYNC.user ? `<button class="btn ghost" data-act="glogin" style="justify-content:flex-start;text-align:left">Mam już konto – zaloguj przez Google</button>` : ""}
    </div></section>`;
}
function startBeginner() {
  const keep = {g: S.g, minutes: S.minutes};
  S = defaultState(); Object.assign(S, keep, {mode: "beg", my: [], pieces: {}, beg: {done: {}, piece: null, notes: []}, plans: {}});
  if (SYNC.user) S.uid = SYNC.user.uid;
  ONBOARD = false; onbStep = "home"; TRANSFER = null; save(); TAB = "today"; render(); window.scrollTo(0, 0);
}

/* ============================== QUIZY ============================== */
const KB_W = ["C", "D", "E", "F", "G", "A", "H"];
function kbSvg(hi) {
  const n = 14, W = 22, H = 96;
  let s = `<svg class="staff" viewBox="0 0 ${n * W + 2} ${H + 2}" role="img" aria-label="Klawiatura z zaznaczonym klawiszem">`;
  for (let i = 0; i < n; i++) s += `<rect x="${1 + i * W}" y="1" width="${W}" height="${H}" rx="2" fill="${i === hi ? "var(--accent)" : "#fff"}" stroke="#666"/>`;
  for (let i = 0; i < n; i++) { const l = i % 7; if (l === 2 || l === 6) continue; s += `<rect x="${1 + i * W + W * 0.65}" y="1" width="${W * 0.7}" height="${H * 0.6}" rx="2" fill="#222"/>`; }
  return s + "</svg>";
}
EXTRA_QUIZ["bkeys"] = function (host) {
  const hi = Math.floor(Math.random() * 14), ans = KB_W[hi % 7];
  Q.cur = {answer: ans};
  host.innerHTML = `<div class="stack">${kbSvg(hi)}<p class="small" style="text-align:center">Jaki to klawisz? <span class="muted">· pytanie ${Q.count + 1} z ${Q.max} · wynik ${Q.score}</span></p><div class="answers">${KB_W.map(o => `<button data-act="q-ans" data-a="${o}">${o}</button>`).join("")}</div></div>`;
};
function bnotesRange() {
  const E = begEtap();
  if (!begDone("b8")) return {treble: [-2, 2], bass: null};
  if (E <= 2) return {treble: [-2, 2], bass: [3, 7]};
  if (E === 3) return {treble: [-2, 6], bass: [0, 10]};
  return {treble: [-3, 9], bass: [-2, 10]};
}
EXTRA_QUIZ["bnotes"] = function (host) {
  const R = bnotesRange(), clef = R.bass && Math.random() < 0.5 ? "bass" : "treble", r = R[clef];
  const s = r[0] + Math.floor(Math.random() * (r[1] - r[0] + 1)), base = clef === "treble" ? 2 : 4;
  Q.cur = {answer: LET[((base + s) % 7 + 7) % 7]};
  host.innerHTML = `<div class="stack">${staffSvg([{s, x: 200}], clef)}<p class="small" style="text-align:center">Jaka to nuta? <span class="muted">· pytanie ${Q.count + 1} z ${Q.max} · wynik ${Q.score}</span></p><div class="answers">${LET.map(o => `<button data-act="q-ans" data-a="${o}">${o}</button>`).join("")}</div></div>`;
};
function begQuiz(type) {
  const plan = todayPlan(), bt = type === "ear-clap" ? "brhythm" : "bnotes";
  const opts = {onDone: (sc, mx) => {
    const host = document.getElementById("bq-inline");
    if (host) host.innerHTML = `<p><b>Wynik: ${sc} z ${mx}.</b> ${sc >= mx * 0.8 ? "Świetnie!" : "Jutro będzie lepiej – to normalne na początku."}</p>`;
    const b = plan.blocks.find(x => x.type === bt);
    if (b && !b.done) setTimeout(() => markBlock(b, true), 1500);
  }};
  if (type === "ear-clap") { opts.level = 2; opts.max = 4; }
  quizStart(type, "bq-inline", true, opts);
}
/* zapis celności czytania nut */
function begLogAnswer(ok) { if (Q.type === "bnotes" || Q.type === "bkeys") { const B = begS(); B.notes.push({ok}); if (B.notes.length > 200) B.notes = B.notes.slice(-200); } }

/* ============================== ODSŁUCH ABC ============================== */
// Prosty parser podzbioru ABC używanego w kursie: nuty, ,', akordy [..], długości (2, 3/2, /, /2), pauzy z, znaki ^ _ =, K: C/G/F.
const ABC_PC = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11};
const ABC_KEY = {C: {}, G: {F: 1}, F: {B: -1}, D: {F: 1, C: 1}};
function abcParse(src) {
  const lines = src.split("\n"); let key = {}, bpm = 80; const voices = {};
  let cur = "1";
  for (const raw of lines) {
    let line = raw.trim(); if (!line || line.startsWith("%")) continue;
    const h = line.match(/^([A-Za-z]):(.*)$/);
    if (h && !line.startsWith("[V:")) {
      if (h[1] === "K") key = ABC_KEY[h[2].trim().split(/\s/)[0]] || {};
      if (h[1] === "Q") { const m = h[2].match(/=(\d+)/); if (m) bpm = +m[1]; }
      if (h[1] === "V") cur = h[2].trim().split(/\s/)[0];
      continue;
    }
    const vm = line.match(/^\[V:(\w+)\]/); if (vm) { cur = vm[1]; line = line.slice(vm[0].length); }
    voices[cur] = (voices[cur] || "") + " " + line;
  }
  const out = [];
  for (const v in voices) {
    let s = voices[v].replace(/![^!]*!/g, "").replace(/"[^"]*"/g, ""), t = 0, acc = {};
    const re = /(\[[^\]]+\]|[\^_=]?[A-Ga-gz][,']*)(\d*)(\/?)(\d*)|(\|)/g; let m;
    while ((m = re.exec(s))) {
      if (m[5]) { acc = {}; continue; }
      let d = m[2] ? +m[2] : 1; if (m[3]) d = d / (m[4] ? +m[4] : 2);
      const toks = m[1].startsWith("[") ? m[1].slice(1, -1).match(/[\^_=]?[A-Ga-g][,']*/g) || [] : [m[1]];
      if (toks[0] !== "z") for (const tk of toks) {
        const mm = tk.match(/([\^_=]?)([A-Ga-g])([,']*)/), L = mm[2].toUpperCase();
        let midi = 60 + ABC_PC[L] + (mm[2] === L ? 0 : 12);
        for (const c of mm[3]) midi += c === "," ? -12 : 12;
        let a = key[L] || 0;
        if (mm[1]) { a = mm[1] === "^" ? 1 : mm[1] === "_" ? -1 : 0; acc[L + midi] = a; } else if (acc[L + midi] !== undefined) a = acc[L + midi];
        out.push({t, d, midi: midi + a, v});
      }
      t += d;
    }
  }
  return {notes: out, bpm};
}
function begAbc(src) {
  const [kind, id, k] = src.split(":");
  if (kind === "piece") { const p = BEG_PIECES.find(x => x.id === id); return p && p.abc; }
  const l = BEG_LESSONS.find(x => x.id === id); return l && l.abc && l.abc[+k] && l.abc[+k].src;
}
function begPlay(src) {
  const abc = begAbc(src); if (!abc) return;
  const P = abcParse(abc), u = 60 / Math.min(P.bpm, 88);
  const voices = [...new Set(P.notes.map(n => n.v))];
  playQueue(P.notes.map(n => ({t: n.t * u, fn: (t) => tone(n.midi, t, Math.max(0.3, n.d * u * 1.05), voices.length > 1 && n.v !== voices[0] ? 0.13 : 0.2)})));
}
// łamanie na systemy po kilka taktów, żeby nuty były czytelne na telefonie (głosy [V:..] łamane równo)
const NL = String.fromCharCode(10);
function abcWrap(src, per) {
  const head = [], vs = {}, order = [];
  for (const line of src.split(NL)) {
    const vm = line.match(/^\[V:(\w+)\]\s*(.*)$/);
    if (vm) { if (!vs[vm[1]]) { vs[vm[1]] = ""; order.push(vm[1]); } vs[vm[1]] += " " + vm[2]; continue; }
    if (/^w:/.test(line)) return src;
    if (/^([A-Za-z]:|%%)/.test(line) || !line.trim()) { head.push(line); continue; }
    if (!vs[""]) { vs[""] = ""; order.push(""); } vs[""] += " " + line;
  }
  const bars = {}; let n = 0;
  for (const v of order) { bars[v] = vs[v].replace(/\|\]\s*$/, "").split("|").map(x => x.trim()).filter(Boolean); n = Math.max(n, bars[v].length); }
  if (n <= per) return src;
  let out = head.join(NL) + NL;
  for (let i = 0; i < n; i += per) {
    const end = i + per >= n ? " |]" : " |";
    for (const v of order) out += (v ? "[V:" + v + "] " : "") + bars[v].slice(i, i + per).join(" | ") + end + NL;
  }
  return out;
}
function begRender(el, src) { renderAbcInto(el, abcWrap(src, (el.clientWidth || 340) < 420 ? 2 : 4)); }
function begAfter() {
  document.querySelectorAll("[data-babc]").forEach(el => { const p = BEG_PIECES.find(x => x.id === el.dataset.babc); if (p && el.offsetParent !== null) begRender(el, p.abc); });
  document.querySelectorAll("#view [data-abc]").forEach(el => { const [id, k] = el.dataset.abc.split(":"); if (!/^b\d/.test(id) || el.offsetParent === null) return; const L = LESSONS[id]; if (L && L.abc && L.abc[+k]) begRender(el, L.abc[+k].src); });
}
// nuty w zwiniętym <details> rysujemy dopiero po rozwinięciu (abcjs potrzebuje szerokości)
document.addEventListener("toggle", (e) => { if (e.target.open && e.target.querySelector && e.target.querySelector("[data-babc],[data-abc]")) begAfter(); }, true);

/* ============================== ZDARZENIA ============================== */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-act]"); if (!t) return;
  const a = t.dataset.act;
  switch (a) {
    case "onb-beg": onbStep = "beg"; if (![15, 20, 30, 45].includes(S.minutes)) S.minutes = 20; if (!S.g || S.g === "f") S.g = "m"; render(); break;
    case "onb-back": onbStep = "home"; render(); break;
    case "onb-g": S.g = t.dataset.g; render(); break;
    case "onb-min": S.minutes = +t.dataset.m; render(); break;
    case "onb-start": startBeginner(); toast("Pierwsza lekcja czeka w planie dnia"); break;
    case "onb-adv": ONBOARD = false; TRANSFER = null; S.mode = "adv"; if (SYNC.user) S.uid = SYNC.user.uid; save(); render(); break;
    case "onb-transfer": if (TRANSFER) { S = TRANSFER; TRANSFER = null; if (SYNC.user) S.uid = SYNC.user.uid; ONBOARD = false; save(); render(); toast("Postęp przeniesiony na to konto"); } break;
    case "b-lesson": LEARN.view = "blesson"; LEARN.id = t.dataset.id; TAB = "learn"; render(); window.scrollTo(0, 0); break;
    case "b-ldone": { const id = t.dataset.id, was = begDone(id);
      withUndo(was ? "Lekcja znów do zrobienia" : "Lekcja zaliczona", () => { begS().done[id] = !was; });
      if (!was) { const un = BEG_PIECES.filter(p => p.need === id); if (un.length) setTimeout(() => toast("Nowy utwór w zakładce Utwory: " + un[0].name), 2600); }
      break; }
    case "b-ltoggle": { const id = t.dataset.id; begS().done[id] = !begDone(id); save(); render(); break; }
    case "b-activate": { const p = BEG_PIECES.find(x => x.id === t.dataset.id); begS().piece = p.id; if (!st(p.id)) S.pieces[p.id] = {s: 1}; save(); toast("Ustawiono w planie: " + p.name); render(); break; }
    case "b-play": ac(); begPlay(t.dataset.src); break;
    case "b-stop": stopQueue(); break;
    case "b-quiz": ac(); begQuiz(t.dataset.q); break;
    case "b-mode": withUndo(t.dataset.m === "beg" ? "Kurs od zera" : "Program Grade 5–8", () => { S.mode = t.dataset.m; if (S.mode === "beg") begS(); S.plans[todayKey()] = undefined; delete S.plans[todayKey()]; }); break;
  }
});
document.addEventListener("change", (e) => {
  if (e.target.dataset && e.target.dataset.act === "b-gender") { S.g = e.target.value; save(); render(); }
});
