"use strict";
/* Treści do nauki: lekcje teorii (klucze = id tematów z THEORY w index.html) i kurs pedału.
   abc: przykłady w notacji ABC rysowane przez abcjs; check: pytania sprawdzające (ok = indeks poprawnej odpowiedzi). */

const LESSONS = {
/* ---------------- LEVEL 1 ---------------- */
"th1-staff": {
  body: `<p>Nuty zapisujemy na <b>pięciolinii</b>: pięć linii i cztery pola między nimi. Im wyżej nuta, tym wyższy dźwięk. Linie i pola liczymy od dołu.</p>
  <p><b>Klucz wiolinowy</b> (G) zaczyna się na 2. linii i mówi, że tam leży <b>G</b> nad środkowym C. Używa go zwykle prawa ręka. <b>Klucz basowy</b> (F) ma dwie kropki wokół 4. linii – tam leży <b>F</b> pod środkowym C. Używa go zwykle lewa ręka.</p>
  <p><b>Linie dodane</b> to krótkie kreski nad lub pod pięciolinią dla dźwięków, które się nie mieszczą. Środkowe C leży na pierwszej linii dodanej pod kluczem wiolinowym i na pierwszej linii dodanej nad kluczem basowym – to ten sam klawisz.</p>
  <h4>Ściągawka</h4>
  <ul><li>Wiolinowy, linie od dołu: <b>E G H D F</b>; pola: <b>F A C E</b>.</li>
  <li>Basowy, linie od dołu: <b>G H D F A</b>; pola: <b>A C E G</b>.</li></ul>
  <p>Pamiętaj o polskich nazwach: biały klawisz między A a C to <b>H</b>, a <b>B</b> to H obniżone (czarny klawisz).</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] C D E F | G A B c |]\n[V:LH] C, D, E, F, | G, A, B, C |]", cap: "Gama C-dur w obu kluczach: od środkowego C w górę (wiolinowy) i oktawę niżej (basowy)."}],
  piano: "Znajdź środkowe C (zwykle pod logo pianina). Zagraj je prawą ręką, a potem lewą – to ta sama nuta w obu kluczach.",
  check: [
    {q: "Jaka nuta leży na 2. linii klucza wiolinowego?", opts: ["E", "G", "H"], ok: 1, why: "Klucz wiolinowy owija się wokół 2. linii – stąd nazwa klucz G."},
    {q: "Jak nazywa się po polsku biały klawisz między A a C?", opts: ["B", "H", "Bes"], ok: 1, why: "B to w polskim nazewnictwie H obniżone o półton."}
  ]
},
"th1-dur": {
  body: `<p>Długość dźwięku zależy od wyglądu nuty. Każda kolejna wartość trwa połowę poprzedniej:</p>
  <div class="tablewrap"><table><tr><th>Nuta</th><th>Pauza</th><th>Trwa (w 4/4)</th></tr>
  <tr><td>cała nuta</td><td>pauza całonutowa</td><td>4 uderzenia</td></tr>
  <tr><td>półnuta</td><td>pauza półnutowa</td><td>2 uderzenia</td></tr>
  <tr><td>ćwierćnuta</td><td>pauza ćwierćnutowa</td><td>1 uderzenie</td></tr>
  <tr><td>ósemka</td><td>pauza ósemkowa</td><td>½ uderzenia</td></tr>
  <tr><td>szesnastka</td><td>pauza szesnastkowa</td><td>¼ uderzenia</td></tr></table></div>
  <p><b>Kropka</b> przy nucie przedłuża ją o połowę jej wartości: półnuta z kropką = 2 + 1 = 3 uderzenia, ćwierćnuta z kropką = 1½.</p>
  <p><b>Łuk</b> między dwiema nutami o tej samej wysokości łączy je w jeden dźwięk: grasz raz i trzymasz przez obie wartości. Łuk między różnymi nutami to co innego – oznacza legato.</p>`,
  abc: [{src: "X:1\nM:4/4\nL:1/4\nK:C\nc4 | c2 c2 | c c c c | c/2c/2 c/2c/2 c/4c/4c/4c/4 c |]", cap: "Cała nuta, półnuty, ćwierćnuty, ósemki, szesnastki."},
        {src: "X:1\nM:3/4\nL:1/4\nK:C\nc3 | c3/2 c/2 c | c2- c | z c z |]", cap: "Półnuta z kropką, ćwierćnuta z kropką i ósemka, łuk, pauzy."}],
  piano: "Graj C prawą ręką z metronomem na 60: kolejno 4 ćwierćnuty, 2 półnuty, 1 całą nutę, 8 ósemek. Licz na głos.",
  check: [
    {q: "Ile uderzeń trwa półnuta z kropką w metrum 3/4?", opts: ["2", "3", "4"], ok: 1, why: "Półnuta (2) plus połowa jej wartości (1)."},
    {q: "Dwie ćwierćnuty C połączone łukiem to…", opts: ["dwa uderzenia klawisza", "jeden dźwięk trwający 2 uderzenia", "legato"], ok: 1}
  ]
},
"th1-metr": {
  body: `<p><b>Metrum</b> to dwie liczby na początku utworu. Górna mówi, <b>ile</b> jest uderzeń w takcie, dolna – <b>jaka wartość</b> to jedno uderzenie (4 = ćwierćnuta, 8 = ósemka, 2 = półnuta).</p>
  <ul><li><b>2/4</b> – dwie ćwierćnuty w takcie: marsz, polka. Akcent na „raz”.</li>
  <li><b>3/4</b> – trzy ćwierćnuty: walc, menuet, mazurek. „RAZ-dwa-trzy”.</li>
  <li><b>4/4</b> (oznaczane też C) – cztery ćwierćnuty, najczęstsze. Akcent na „raz”, słabszy na „trzy”.</li></ul>
  <p><b>Kreska taktowa</b> dzieli muzykę na takty, a podwójna kreska kończy utwór lub jego część. Suma wartości w każdym takcie musi się zgadzać z metrum.</p>
  <p>Utwór może zaczynać się od niepełnego taktu – to <b>przedtakt</b>. Brakujące wartości są wtedy w ostatnim takcie.</p>`,
  abc: [{src: "X:1\nM:3/4\nL:1/4\nK:C\nG | c2 e | g2 e | d B G | c3 |]", cap: "Metrum 3/4 z przedtaktem."}],
  piano: "Zagraj Walc a-moll Chopina albo inny walc i licz głośno „raz-dwa-trzy”. Poczuj, że bas w lewej ręce wypada zawsze na „raz”.",
  check: [
    {q: "Co oznacza dolna liczba w metrum 3/4?", opts: ["Trzy takty", "Uderzeniem jest ćwierćnuta", "Tempo"], ok: 1},
    {q: "Ile ósemek mieści się w takcie 2/4?", opts: ["2", "4", "8"], ok: 1, why: "Dwie ćwierćnuty, każda to dwie ósemki."}
  ]
},
"th1-steps": {
  body: `<p><b>Półton</b> to najmniejsza odległość na klawiaturze: sąsiednie klawisze, bez żadnego pomiędzy (np. E–F, H–C, C–Cis). <b>Cały ton</b> to dwa półtony (np. C–D, E–Fis).</p>
  <p><b>Znaki chromatyczne</b> zmieniają wysokość nuty:</p>
  <ul><li><b>krzyżyk ♯</b> podwyższa o półton: C → Cis, F → Fis.</li>
  <li><b>bemol ♭</b> obniża o półton: E → Es, H → B, A → As.</li>
  <li><b>kasownik ♮</b> odwołuje krzyżyk lub bemol.</li></ul>
  <p>Znak przy nucie obowiązuje <b>do końca taktu</b> (dla tej samej wysokości). Polskie nazwy: dodajemy „-is” dla krzyżyka (Cis, Dis, Fis, Gis, Ais) i „-es” dla bemola (Des, Es, Ges, As, B). Wyjątki: Es, As i B.</p>
  <p>Ten sam klawisz może mieć dwie nazwy, np. Cis = Des. To <b>enharmonia</b>.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C\nC ^C D _E | E F ^F G | _B =B c2 |]", cap: "C, Cis, D, Es, E, F, Fis, G, B, H, C."}],
  piano: "Zagraj od C w górę wszystkie klawisze po kolei (białe i czarne) – to gama chromatyczna. Nazywaj każdy dźwięk na głos.",
  check: [
    {q: "Jak nazywa się E obniżone o półton?", opts: ["Eis", "Es", "Des"], ok: 1},
    {q: "Czy E–F to półton?", opts: ["Tak", "Nie, cały ton"], ok: 0, why: "Między E i F nie ma czarnego klawisza."}
  ]
},
"th1-scales": {
  body: `<p><b>Gama durowa</b> to osiem dźwięków od toniki do toniki w układzie: <b>cały – cały – pół – cały – cały – cały – pół</b>. Półtony wypadają między 3. a 4. i między 7. a 8. stopniem.</p>
  <ul><li><b>C-dur</b>: C D E F G A H C – same białe klawisze.</li>
  <li><b>G-dur</b>: G A H C D E <b>Fis</b> G – jeden krzyżyk.</li>
  <li><b>D-dur</b>: D E <b>Fis</b> G A H <b>Cis</b> D – dwa krzyżyki.</li>
  <li><b>F-dur</b>: F G A <b>B</b> C D E F – jeden bemol.</li></ul>
  <p>Znaki, których wymaga gama, piszemy raz na początku pięciolinii jako <b>znaki przykluczowe</b>. Obowiązują w całym utworze.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:G\nG A B c | d e f g |]", cap: "G-dur – Fis wynika ze znaku przykluczowego."},
        {src: "X:1\nL:1/4\nK:F\nF G A B | c d e f |]", cap: "F-dur – B wynika ze znaku przykluczowego."}],
  piano: "Grając dzisiejszą gamę, nazywaj w myślach stopnie (1, 2, 3…) i zauważ, gdzie wypadają półtony.",
  check: [
    {q: "Gdzie w gamie durowej są półtony?", opts: ["3–4 i 7–8", "2–3 i 6–7", "4–5 i 7–8"], ok: 0},
    {q: "Jaki znak ma F-dur?", opts: ["Fis", "B", "Es"], ok: 1}
  ]
},
"th1-int": {
  body: `<p><b>Interwał</b> to odległość między dwoma dźwiękami. Liczymy ją, licząc oba dźwięki i wszystkie nazwy liter pomiędzy:</p>
  <p>C–C <b>pryma</b> (1), C–D <b>sekunda</b> (2), C–E <b>tercja</b> (3), C–F <b>kwarta</b> (4), C–G <b>kwinta</b> (5), C–A <b>seksta</b> (6), C–H <b>septyma</b> (7), C–C <b>oktawa</b> (8).</p>
  <p>W nutach łatwo to zobaczyć: tercja, kwinta i septyma mają obie nuty na liniach albo obie w polach; sekunda, kwarta, seksta i oktawa – jedną na linii, drugą w polu.</p>
  <p>Interwał <b>melodyczny</b> to dźwięki po kolei, <b>harmoniczny</b> – razem.</p>`,
  abc: [{src: "X:1\nL:1/2\nK:C\n[CC] [CD] [CE] [CF] | [CG] [CA] [CB] [Cc] |]", cap: "Od prymy do oktawy (harmonicznie)."}],
  piano: "Rozpoznawaj interwały w utworze, który teraz grasz: znajdź w lewej ręce kwinty i oktawy.",
  check: [
    {q: "Jaki interwał tworzą D i A?", opts: ["kwarta", "kwinta", "seksta"], ok: 1, why: "D, E, F, G, A – pięć nazw."},
    {q: "Obie nuty na liniach, jedna linia przerwy. To…", opts: ["sekunda", "tercja", "kwarta"], ok: 1}
  ]
},
/* ---------------- LEVEL 2 ---------------- */
"th2-keys": {
  body: `<p>Każda tonacja durowa ma stały zestaw znaków. Do 3 znaków warto znać na pamięć:</p>
  <div class="tablewrap"><table><tr><th>Krzyżyki</th><th>Tonacja</th><th>Bemole</th><th>Tonacja</th></tr>
  <tr><td>0</td><td>C-dur</td><td>1 (B)</td><td>F-dur</td></tr>
  <tr><td>1 (Fis)</td><td>G-dur</td><td>2 (B, Es)</td><td>B-dur</td></tr>
  <tr><td>2 (Fis, Cis)</td><td>D-dur</td><td>3 (B, Es, As)</td><td>Es-dur</td></tr>
  <tr><td>3 (Fis, Cis, Gis)</td><td>A-dur</td><td></td><td></td></tr></table></div>
  <p>Krzyżyki pojawiają się zawsze w kolejności <b>F C G D A E H</b>, bemole odwrotnie: <b>H E A D G C F</b>.</p>
  <p>Sztuczki: przy krzyżykach tonika jest <b>półton nad ostatnim krzyżykiem</b> (ostatni Cis → D-dur). Przy bemolach tonika to <b>przedostatni bemol</b> (B, Es → B-dur).</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C\nx4 |[K:G] x4 |[K:D] x4 |[K:A] x4 |[K:F] x4 |[K:Bb] x4 |[K:Eb] x4 |]", cap: "C, G, D, A, F, B i Es-dur."}],
  piano: "Przed każdym czytaniem a vista najpierw nazwij tonację na głos.",
  check: [
    {q: "Dwa krzyżyki to…", opts: ["G-dur", "D-dur", "A-dur"], ok: 1},
    {q: "Bemole B i Es to…", opts: ["F-dur", "B-dur", "Es-dur"], ok: 1, why: "Przedostatni bemol to B."}
  ]
},
"th2-minor": {
  body: `<p>Każda tonacja durowa ma <b>równoległą molową</b> z tymi samymi znakami. Jej tonika leży <b>tercję małą niżej</b> (trzy półtony): C-dur ↔ a-moll, G-dur ↔ e-moll, F-dur ↔ d-moll.</p>
  <p><b>Gama molowa naturalna</b> używa tylko znaków przykluczowych: a-moll = A H C D E F G A. Układ: cały – pół – cały – cały – pół – cały – cały.</p>
  <p><b>Gama molowa harmoniczna</b> ma podwyższony <b>7. stopień</b> (w a-moll Gis). Dzięki temu pojawia się dźwięk prowadzący półton pod toniką, a między 6. i 7. stopniem charakterystyczna „orientalna” sekunda zwiększona (F–Gis).</p>
  <p>Podwyższony 7. stopień to znak przygodny w nutach, a nie przykluczowy – po nim rozpoznasz tonację molową.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:Am\nA B c d | e f g a |]", cap: "a-moll naturalna."}, {src: "X:1\nL:1/4\nK:Am\nA B c d | e f ^g a |]", cap: "a-moll harmoniczna – z Gis."}],
  piano: "Zagraj a-moll naturalną, a potem harmoniczną. Usłyszysz, jak Gis „ciągnie” do A.",
  check: [
    {q: "Jaka tonacja molowa jest równoległa do G-dur?", opts: ["g-moll", "e-moll", "h-moll"], ok: 1},
    {q: "Który stopień podwyższamy w molowej harmonicznej?", opts: ["6.", "7.", "3."], ok: 1}
  ]
},
"th2-triads": {
  body: `<p><b>Trójdźwięk</b> to trzy dźwięki ułożone tercjami: podstawa (pryma), tercja i kwinta. Na pięciolinii wygląda jak „bałwanek” – trzy nuty na kolejnych liniach albo w kolejnych polach.</p>
  <ul><li><b>Durowy</b>: tercja wielka + tercja mała (C–E–G). Brzmi jasno.</li>
  <li><b>Molowy</b>: tercja mała + tercja wielka (C–Es–G). Brzmi smutniej.</li></ul>
  <p>Różnica jest tylko w środkowym dźwięku. W gamie durowej na I, IV i V stopniu są trójdźwięki durowe, a na II, III i VI – molowe.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C\n[CEG]2 [C_EG]2 | [GBd]2 [G_Bd]2 |]", cap: "C-dur i c-moll, G-dur i g-moll."}],
  piano: "Zagraj trójdźwięk dur, a potem obniż środkowy dźwięk o półton. Rób tak z każdym białym klawiszem.",
  check: [
    {q: "Z jakich dźwięków składa się trójdźwięk F-dur?", opts: ["F A C", "F As C", "F G A"], ok: 0},
    {q: "Czym różni się trójdźwięk molowy od durowego?", opts: ["kwintą", "tercją", "podstawą"], ok: 1}
  ]
},
"th2-int": {
  body: `<p>Ta sama liczba interwału może mieć różną wielkość. Liczymy półtony:</p>
  <div class="tablewrap"><table><tr><th>Interwał</th><th>Półtony</th><th>Przykład</th></tr>
  <tr><td>sekunda mała / wielka</td><td>1 / 2</td><td>E–F / C–D</td></tr>
  <tr><td>tercja mała / wielka</td><td>3 / 4</td><td>A–C / C–E</td></tr>
  <tr><td>kwarta czysta</td><td>5</td><td>C–F</td></tr>
  <tr><td>kwinta czysta</td><td>7</td><td>C–G</td></tr>
  <tr><td>seksta mała / wielka</td><td>8 / 9</td><td>E–C / C–A</td></tr>
  <tr><td>septyma mała / wielka</td><td>10 / 11</td><td>G–F / C–H</td></tr>
  <tr><td>oktawa czysta</td><td>12</td><td>C–C</td></tr></table></div>
  <p>Szybki sposób: jeśli górny dźwięk należy do gamy durowej budowanej od dolnego, interwał jest <b>wielki</b> (2, 3, 6, 7) albo <b>czysty</b> (1, 4, 5, 8). O półton mniejszy – <b>mały</b>.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C\n[CE]2 [C_E]2 | [CA]2 [C_A]2 | [CB]2 [C_B]2 |]", cap: "Tercja wielka i mała, seksta wielka i mała, septyma wielka i mała."}],
  piano: "W kształceniu słuchu (zakładka Narzędzia) usłyszysz te same interwały – spróbuj zaśpiewać je przed odsłuchaniem.",
  check: [
    {q: "Ile półtonów ma tercja wielka?", opts: ["3", "4", "5"], ok: 1},
    {q: "D–F to tercja…", opts: ["wielka", "mała"], ok: 1, why: "W D-dur jest Fis, więc D–F jest o półton mniejsza."}
  ]
},
"th2-terms": {
  body: `<p>Oznaczenia wykonawcze pisze się po włosku. Najważniejsze:</p>
  <h4>Tempo</h4><ul><li><b>Largo, Lento, Adagio</b> – wolno; <b>Andante</b> – spokojnie, „idąc”; <b>Moderato</b> – umiarkowanie; <b>Allegro</b> – szybko, wesoło; <b>Presto</b> – bardzo szybko.</li>
  <li><b>ritardando (rit.)</b> – zwalniając; <b>accelerando</b> – przyspieszając; <b>a tempo</b> – wróć do tempa; <b>fermata</b> 𝄐 – zatrzymaj dźwięk dłużej.</li></ul>
  <h4>Dynamika</h4><ul><li><b>pp</b> pianissimo, <b>p</b> piano, <b>mp</b> mezzo piano, <b>mf</b> mezzo forte, <b>f</b> forte, <b>ff</b> fortissimo.</li>
  <li><b>crescendo</b> &lt; – coraz głośniej; <b>diminuendo</b> &gt; – coraz ciszej; <b>sf</b> sforzato – nagły akcent.</li></ul>
  <h4>Artykulacja</h4><ul><li><b>legato</b> (łuk) – płynnie, łącząc; <b>staccato</b> (kropka) – krótko; <b>tenuto</b> (kreska) – pełna wartość, z naciskiem; <b>akcent</b> &gt;.</li></ul>`,
  piano: "Przejrzyj nuty utworu, którego się uczysz, i przetłumacz wszystkie włoskie oznaczenia. Zaznacz je kolorem.",
  check: [
    {q: "Co znaczy „a tempo”?", opts: ["szybko", "wróć do poprzedniego tempa", "w takcie"], ok: 1},
    {q: "Co jest ciszej: mp czy mf?", opts: ["mp", "mf"], ok: 0}
  ]
},
/* ---------------- LEVEL 3 ---------------- */
"th3-keys": {
  body: `<p>Dochodzą tonacje do 4 znaków, durowe i molowe:</p>
  <div class="tablewrap"><table><tr><th>Znaki</th><th>Dur</th><th>Moll</th></tr>
  <tr><td>—</td><td>C</td><td>a</td></tr><tr><td>1♯</td><td>G</td><td>e</td></tr><tr><td>2♯</td><td>D</td><td>h</td></tr><tr><td>3♯</td><td>A</td><td>fis</td></tr><tr><td>4♯</td><td>E</td><td>cis</td></tr>
  <tr><td>1♭</td><td>F</td><td>d</td></tr><tr><td>2♭</td><td>B</td><td>g</td></tr><tr><td>3♭</td><td>Es</td><td>c</td></tr><tr><td>4♭</td><td>As</td><td>f</td></tr></table></div>
  <p><b>Dur czy moll?</b> Znaki są te same, więc sprawdź: (1) ostatnia nuta w basie – zwykle tonika; (2) znak przygodny podwyższający 7. stopień molowej (np. przy 1♯ pojawia się Dis → e-moll); (3) pierwszy i ostatni akord.</p>
  <p>W nazwach tonacji durowe piszemy wielką literą (E-dur), molowe – małą (cis-moll).</p>`,
  abc: [{src: "X:1\nL:1/4\nK:Em\nE G B e | ^d2 e2 |]", cap: "1 krzyżyk i Dis w melodii – to e-moll, a nie G-dur."}],
  piano: "W rozgrzewce przy tonacji dnia zagraj też równoległą molową i porównaj znaki.",
  check: [
    {q: "4 krzyżyki, a w nutach często His. Tonacja?", opts: ["E-dur", "cis-moll", "A-dur"], ok: 1, why: "His to podwyższony 7. stopień cis-moll."},
    {q: "Jaka tonacja molowa ma 3 bemole?", opts: ["c-moll", "g-moll", "f-moll"], ok: 0}
  ]
},
"th3-melodic": {
  body: `<p><b>Gama molowa melodyczna</b> w górę ma podwyższony <b>6. i 7. stopień</b>, a w dół wraca do postaci naturalnej.</p>
  <p>a-moll melodyczna: w górę A H C D E <b>Fis Gis</b> A, w dół A <b>G F</b> E D C H A.</p>
  <p>Po co? W harmonicznej między 6. a 7. stopniem jest „dziura” (sekunda zwiększona), trudna do zaśpiewania. Podwyższenie 6. stopnia wygładza melodię w górę, a w dół podwyższenia nie są potrzebne.</p>
  <p>Mamy więc trzy odmiany molowej: <b>naturalną, harmoniczną i melodyczną</b>. Wszystkie znajdziesz w „Gamach i pasażach”.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:Am\nA B c d | e ^f ^g a | a =g =f e | d c B A |]", cap: "a-moll melodyczna w górę i w dół."}],
  piano: "Graj dziś molową z tonacji dnia we wszystkich trzech odmianach, słuchając różnic.",
  check: [
    {q: "Które stopnie podwyższa molowa melodyczna w górę?", opts: ["tylko 7.", "6. i 7.", "3. i 6."], ok: 1},
    {q: "Jak wygląda molowa melodyczna w dół?", opts: ["jak naturalna", "jak harmoniczna", "jak w górę"], ok: 0}
  ]
},
"th3-degrees": {
  body: `<p>Dźwięki gamy numerujemy cyframi rzymskimi i mają nazwy:</p>
  <p><b>I</b> tonika, <b>II</b> supertonika, <b>III</b> medianta, <b>IV</b> subdominanta, <b>V</b> dominanta, <b>VI</b> submedianta, <b>VII</b> dźwięk prowadzący.</p>
  <p>Najważniejsze są trzy akordy: <b>T</b> (tonika, I), <b>S</b> (subdominanta, IV) i <b>D</b> (dominanta, V). Wystarczą do zharmonizowania większości prostych melodii.</p>
  <ul><li>T – spokój, „dom”.</li><li>S – oddalenie.</li><li>D – napięcie, które chce wrócić do T.</li></ul>
  <p>W C-dur: T = C–E–G, S = F–A–C, D = G–H–D. W a-moll dominanta jest durowa dzięki podwyższonemu 7. stopniowi: E–Gis–H.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C\n[CEG]2 [FAc]2 | [GBd]2 [CEG]2 |]", cap: "T – S – D – T w C-dur."}],
  piano: "Zagraj T–S–D–T w tonacji dnia lewą ręką, a prawą zaimprowizuj prostą melodię z dźwięków akordów.",
  check: [
    {q: "Który stopień to dominanta?", opts: ["IV", "V", "VII"], ok: 1},
    {q: "Subdominanta w G-dur to akord…", opts: ["C–E–G", "D–Fis–A", "G–H–D"], ok: 0}
  ]
},
"th3-compound": {
  body: `<p>W metrum <b>prostym</b> (2/4, 3/4, 4/4) uderzenie dzieli się na dwie części. W metrum <b>złożonym</b> (6/8, 9/8, 12/8) uderzenie to ćwierćnuta z kropką, która dzieli się na <b>trzy ósemki</b>.</p>
  <ul><li><b>6/8</b> – dwa uderzenia po trzy ósemki: „RAZ-i-a DWA-i-a”. Kołysanki, barkarole, tarantele.</li>
  <li><b>9/8</b> – trzy takie uderzenia; <b>12/8</b> – cztery.</li></ul>
  <p>Typowe rytmy w 6/8: trzy ósemki, ćwierćnuta + ósemka (jak galop), ćwierćnuta z kropką. Licz na dwa, nie na sześć, bo w szybkim tempie sześć to za dużo.</p>`,
  abc: [{src: "X:1\nM:6/8\nL:1/8\nK:C\nc3 c3 | ccc ccc | c2c c2c | c6 |]", cap: "Podstawowe rytmy 6/8."}],
  piano: "Etiuda Burgmüllera Tarantela (op. 100 nr 20) jest w 6/8. Wystukaj jej rytm, licząc na dwa.",
  check: [
    {q: "Ile uderzeń (pulsów) ma takt 6/8?", opts: ["6", "2", "3"], ok: 1},
    {q: "Na ile części dzieli się uderzenie w 6/8?", opts: ["2", "3", "4"], ok: 1}
  ]
},
"th3-int": {
  body: `<p>Budowanie interwału od dowolnego dźwięku w dwóch krokach:</p>
  <ol><li><b>Liczba</b>: odlicz litery (np. seksta od E: E F G A H <b>C</b>).</li>
  <li><b>Wielkość</b>: policz półtony albo sprawdź, czy górny dźwięk jest w gamie durowej od dolnego. W E-dur szóstym stopniem jest Cis, więc seksta wielka to E–Cis, a mała E–C.</li></ol>
  <p>Nigdy nie zmieniaj litery, żeby trafić w liczbę półtonów: tercja od D to zawsze jakieś F (F albo Fis), nigdy Ges.</p>
  <p>Interwały w dół buduj tak samo, licząc litery w dół.</p>`,
  abc: [{src: "X:1\nL:1/2\nK:C\n[E^c] [Ec] | [D^F] [DF] | [A,E] [A,^D] |]", cap: "E–Cis i E–C (seksty), D–Fis i D–F (tercje), A–E (kwinta czysta) i A–Dis (kwarta zwiększona)."}],
  piano: "Zbuduj od każdego dźwięku gamy dnia tercję wielką w górę i zagraj ją.",
  check: [
    {q: "Tercja wielka od H to…", opts: ["H–D", "H–Dis", "H–Es"], ok: 1},
    {q: "Kwinta czysta od F to…", opts: ["F–C", "F–Cis", "F–H"], ok: 0}
  ]
},
/* ---------------- LEVEL 4 ---------------- */
"th4-circle": {
  body: `<p><b>Koło kwintowe</b> porządkuje wszystkie tonacje. Idąc od C o kwintę w górę, dodajemy krzyżyk: C → G → D → A → E → H → Fis. Idąc o kwintę w dół, dodajemy bemol: C → F → B → Es → As → Des → Ges.</p>
  <div class="tablewrap"><table><tr><th>Znaki</th><th>Dur</th><th>Moll</th></tr>
  <tr><td>5♯</td><td>H</td><td>gis</td></tr><tr><td>6♯</td><td>Fis</td><td>dis</td></tr><tr><td>5♭</td><td>Des</td><td>b</td></tr><tr><td>6♭</td><td>Ges</td><td>es</td></tr></table></div>
  <p>Na dole koła Fis-dur i Ges-dur to te same klawisze (enharmonia). Sąsiednie tonacje na kole są <b>pokrewne</b> – różnią się jednym znakiem, więc łatwo między nimi modulować.</p>`,
  piano: "Rozgrzewka w aplikacji idzie właśnie po kole kwintowym. Zauważ, że każda kolejna tonacja ma jeden znak więcej.",
  check: [
    {q: "Jaka tonacja ma 5 krzyżyków?", opts: ["Fis-dur", "H-dur", "E-dur"], ok: 1},
    {q: "Jaka tonacja leży o kwintę w dół od F-dur?", opts: ["B-dur", "C-dur", "Es-dur"], ok: 0}
  ]
},
"th4-aug": {
  body: `<p>Interwał czysty powiększony o półton jest <b>zwiększony</b>, a pomniejszony – <b>zmniejszony</b>. Interwał wielki powiększony staje się zwiększony, mały pomniejszony – zmniejszony.</p>
  <ul><li>C–Fis – kwarta zwiększona (6 półtonów), <b>tryton</b>.</li>
  <li>C–Ges – kwinta zmniejszona (też 6 półtonów, inaczej zapisana).</li>
  <li>C–Gis – kwinta zwiększona; F–Gis – sekunda zwiększona (z molowej harmonicznej).</li>
  <li>Gis–F – septyma zmniejszona (9 półtonów).</li></ul>
  <p>Kwinta zmniejszona występuje naturalnie w gamie durowej między VII a IV stopniem (w C-dur H–F) – to źródło napięcia dominanty.</p>`,
  abc: [{src: "X:1\nL:1/2\nK:C\n[CG] [C^G] [C_G] | [CF] [C^F] | [B,F] |]", cap: "Kwinta czysta, zwiększona, zmniejszona; kwarta czysta, zwiększona; H–F."}],
  piano: "Zagraj C–Fis i C–Ges – to te same klawisze, ale inne nazwy, bo zależą od liter.",
  check: [
    {q: "Ile półtonów ma kwarta zwiększona?", opts: ["5", "6", "7"], ok: 1},
    {q: "F–Gis to…", opts: ["tercja mała", "sekunda zwiększona", "sekunda wielka"], ok: 1, why: "Litery F–G dają sekundę, a 3 półtony to sekunda zwiększona."}
  ]
},
"th4-inv": {
  body: `<p>Trójdźwięk może mieć na dole nie tylko podstawę:</p>
  <ul><li><b>postać zasadnicza</b> – podstawa na dole (C–E–G), oznaczenie 5/3;</li>
  <li><b>pierwszy przewrót</b>, <b>akord sekstowy</b> – tercja na dole (E–G–C), oznaczenie 6;</li>
  <li><b>drugi przewrót</b>, <b>akord kwartsekstowy</b> – kwinta na dole (G–C–E), oznaczenie 6/4.</li></ul>
  <p>Podstawę zawsze znajdziesz, układając dźwięki tercjami. Przewroty pozwalają płynnie przechodzić między akordami – ręka przesuwa się mniej.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C\n[CEG]2 [EGc]2 | [Gce]2 [ceg]2 |]", cap: "C-dur: postać zasadnicza, I przewrót, II przewrót, znów postać zasadnicza."}],
  piano: "W rozgrzewce graj trójdźwięki z przewrotami i nazywaj na głos, który dźwięk jest na dole.",
  check: [
    {q: "A–C–F to akord F-dur w…", opts: ["postaci zasadniczej", "I przewrocie", "II przewrocie"], ok: 1, why: "Na dole jest tercja (A)."},
    {q: "Jak nazywa się II przewrót?", opts: ["akord sekstowy", "akord kwartsekstowy"], ok: 1}
  ]
},
"th4-cad": {
  body: `<p><b>Kadencja</b> to zakończenie frazy – muzyczna „interpunkcja”.</p>
  <ul><li><b>Doskonała (autentyczna) V–I</b> – jak kropka. Najmocniejsze zakończenie.</li>
  <li><b>Plagalna IV–I</b> – łagodna, „amen” na końcu hymnów.</li></ul>
  <p>Rozpoznasz je po basie: kwinta w dół lub kwarta w górę do toniki (V–I) albo kwarta w dół (IV–I). W utworach klasycznych prawie każda część kończy się kadencją doskonałą.</p>`,
  abc: [{src: "X:1\nL:1/2\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] [GB] [Ec] | [Ac] [Gc] |]\n[V:LH] G, C, | F, C, |]", cap: "Kadencja doskonała (V–I) i plagalna (IV–I) w C-dur."}],
  piano: "Znajdź kadencje na końcach fraz w sonatinie, którą grasz. Zagraj same akordy kadencji.",
  check: [
    {q: "Kadencja doskonała to…", opts: ["IV–I", "V–I", "I–V"], ok: 1},
    {q: "„Amen” w hymnach to kadencja…", opts: ["plagalna", "doskonała"], ok: 0}
  ]
},
"th4-form": {
  body: `<p>Muzyka składa się z cegiełek:</p>
  <ul><li><b>Motyw</b> – najkrótszy charakterystyczny pomysł (kilka dźwięków).</li>
  <li><b>Fraza</b> – zwykle 4 takty, kończy się kadencją, jak zdanie.</li>
  <li><b>Okres</b> – dwie frazy: <b>poprzednik</b> (kończy się „pytająco”, na dominancie) i <b>następnik</b> (kończy się „odpowiedzią”, na tonice).</li></ul>
  <p>Formy małych utworów:</p>
  <ul><li><b>AB (dwuczęściowa)</b> – dwie różne części, często z powtórzeniami. Tańce barokowe, menuety Bacha.</li>
  <li><b>ABA (trzyczęściowa)</b> – temat, kontrast, powrót tematu. Wiele miniatur romantycznych, np. Walc a-moll Chopina.</li></ul>`,
  piano: "Podziel utwór, którego się uczysz, na frazy (zaznacz ołówkiem) i ustal, czy to forma AB czy ABA.",
  check: [
    {q: "Poprzednik okresu zwykle kończy się…", opts: ["na tonice", "na dominancie"], ok: 1},
    {q: "Temat – kontrast – powrót tematu to forma…", opts: ["AB", "ABA"], ok: 1}
  ]
},
/* ---------------- LEVEL 5 ---------------- */
"th5-all": {
  body: `<p>Komplet tonacji obejmuje do 7 znaków: <b>Cis-dur / ais-moll</b> (7♯) i <b>Ces-dur / as-moll</b> (7♭).</p>
  <p><b>Enharmonia tonacji</b>: H-dur (5♯) = Ces-dur (7♭), Fis-dur (6♯) = Ges-dur (6♭), Des-dur (5♭) = Cis-dur (7♯). Brzmią tak samo, a wybiera się zapis z mniejszą liczbą znaków albo ten, który pasuje do sąsiednich fragmentów.</p>
  <p>Jak szybko znaleźć tonację z dowolną liczbą znaków? Krzyżyki: tonika półton nad ostatnim. Bemole: przedostatni bemol. Molowa równoległa: tercja mała w dół.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C#\nx4 |[K:Cb] x4 |[K:F#] x4 |[K:Gb] x4 |]", cap: "Cis-dur, Ces-dur, Fis-dur, Ges-dur."}],
  piano: "W quizie znaków przykluczowych (Narzędzia) masz już tonacje do 7 znaków.",
  check: [
    {q: "Jaka tonacja durowa jest enharmoniczna z Ges-dur?", opts: ["Fis-dur", "F-dur", "G-dur"], ok: 0},
    {q: "6 bemoli, a w nutach D (podwyższony VII stopień). Tonacja?", opts: ["Ges-dur", "es-moll"], ok: 1}
  ]
},
"th5-intinv": {
  body: `<p>Przewrót interwału polega na przeniesieniu dolnego dźwięku o oktawę w górę (albo górnego w dół). C–E (tercja) po przewróceniu daje E–C (sekstę).</p>
  <p>Dwie zasady:</p>
  <ul><li><b>Liczby sumują się do 9</b>: 2↔7, 3↔6, 4↔5, 1↔8.</li>
  <li><b>Wielkość się odwraca</b>: wielki ↔ mały, zwiększony ↔ zmniejszony, czysty pozostaje czysty.</li></ul>
  <p>Przykład: tercja wielka C–E → seksta mała E–C. Kwarta zwiększona F–H → kwinta zmniejszona H–F.</p>
  <p>Przydaje się to do szybkiego nazywania dużych interwałów: zamiast liczyć septymę, nazwij jej przewrót (sekundę) i odwróć.</p>`,
  abc: [{src: "X:1\nL:1/2\nK:C\n[CE] [Ec] | [CA] [Ac] | [FB] [Bf] |]", cap: "Tercja wielka → seksta mała; seksta wielka → tercja mała; kwarta zwiększona → kwinta zmniejszona."}],
  piano: "Zagraj sekundę wielką C–D, potem przenieś C o oktawę w górę – usłysz septymę małą D–C.",
  check: [
    {q: "Przewrotem sekundy małej jest…", opts: ["septyma wielka", "septyma mała", "seksta wielka"], ok: 0},
    {q: "Przewrotem kwinty czystej jest…", opts: ["kwarta czysta", "kwarta zwiększona"], ok: 0}
  ]
},
"th5-d7": {
  body: `<p><b>Akord dominanty septymowej (D7)</b> to trójdźwięk dominanty z dodaną septymą małą: w C-dur <b>G–H–D–F</b>. Ma w sobie tryton H–F, dlatego mocno dąży do toniki.</p>
  <p>Typowe <b>rozwiązanie</b> do toniki:</p>
  <ul><li>dźwięk prowadzący H idzie w górę do C,</li><li>septyma F idzie w dół do E,</li><li>D idzie do C (albo E), G zostaje lub idzie do C.</li></ul>
  <p>D7 ma trzy przewroty: kwintsekstowy (H na dole), tercjokwartowy (D na dole) i sekundowy (F na dole – rozwiązuje się na akord sekstowy toniki).</p>
  <p>W tonacji molowej D7 też jest durowa z septymą: w a-moll E–Gis–H–D.</p>`,
  abc: [{src: "X:1\nL:1/2\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] [Bdf] [cce] |]\n[V:LH] G, C, |]", cap: "D7 w C-dur i rozwiązanie do toniki."}],
  piano: "W rozgrzewce graj D7 rozłożony w tonacji dnia i zawsze kończ rozwiązaniem do toniki.",
  check: [
    {q: "Z jakich dźwięków składa się D7 w G-dur?", opts: ["D–Fis–A–C", "D–F–A–C", "G–H–D–F"], ok: 0},
    {q: "Dokąd zwykle idzie septyma D7?", opts: ["w górę o sekundę", "w dół o sekundę"], ok: 1}
  ]
},
"th5-half": {
  body: `<p>Poza doskonałą i plagalną są jeszcze dwie kadencje:</p>
  <ul><li><b>Półzamknięta (połowiczna)</b> – kończy się na <b>dominancie</b> (I–V, IV–V, II–V). Brzmi jak przecinek albo pytanie. Typowa na końcu poprzednika.</li>
  <li><b>Zwodnicza</b> – po dominancie zamiast toniki przychodzi <b>VI stopień</b> (V–VI). Słuchacz czeka na koniec, a muzyka „oszukuje” i płynie dalej.</li></ul>
  <p>W C-dur kadencja zwodnicza to G-dur → a-moll. W a-moll: E-dur → F-dur.</p>`,
  abc: [{src: "X:1\nL:1/2\nK:C\n%%staves {RH LH}\nV:RH clef=treble\nV:LH clef=bass\n[V:RH] [Ec] [DB] | [DB] [Ec] |]\n[V:LH] C, G, | G, A, |]", cap: "Półzamknięta (I–V) i zwodnicza (V–VI)."}],
  piano: "W ćwiczeniach słuchu „Kadencje” rozpoznajesz te zakończenia ze słuchu – zagraj je najpierw sama.",
  check: [
    {q: "Kadencja kończąca się na V stopniu to…", opts: ["półzamknięta", "zwodnicza", "plagalna"], ok: 0},
    {q: "V–VI to kadencja…", opts: ["doskonała", "zwodnicza"], ok: 1}
  ]
},
"th5-trans": {
  body: `<p><b>Transpozycja</b> to przeniesienie melodii do innej tonacji – wszystkie dźwięki przesuwamy o ten sam interwał.</p>
  <p>Metoda w trzech krokach:</p>
  <ol><li>Ustal tonację wyjściową i docelową (np. z C-dur do G-dur – o kwintę w górę).</li>
  <li>Napisz nowe znaki przykluczowe.</li>
  <li>Przesuń każdą nutę o tyle samo stopni (o kwintę = 4 stopnie w górę albo kwartę w dół). Znaki przygodne zmieniaj proporcjonalnie: podwyższenie zostaje podwyższeniem.</li></ol>
  <p>Myślenie stopniami (1, 2, 3…) zamiast literami bardzo ułatwia transpozycję i czytanie a vista.</p>`,
  abc: [{src: "X:1\nL:1/4\nK:C\nC D E C | E F G2 |[K:G] G A B G | B c d2 |]", cap: "Ta sama melodia w C-dur i po transpozycji do G-dur."}],
  piano: "Zagraj ćwiczenie Hanona nr 1 w tonacji dnia – to też transpozycja.",
  check: [
    {q: "Melodia C–E–G po transpozycji do F-dur to…", opts: ["F–A–C", "F–As–C", "G–H–D"], ok: 0},
    {q: "Przy transpozycji o sekundę w górę dźwięk Fis zmienia się w…", opts: ["G", "Gis", "As"], ok: 1}
  ]
},
"th5-analysis": {
  body: `<p>Analiza krótkiego utworu w pięciu pytaniach:</p>
  <ol><li><b>Tonacja</b> – znaki, pierwszy i ostatni akord, znaki przygodne.</li>
  <li><b>Metrum i tempo</b> – co mówią o charakterze?</li>
  <li><b>Frazy i kadencje</b> – gdzie są oddechy, jakie kadencje je kończą?</li>
  <li><b>Forma</b> – AB, ABA, rondo? Gdzie wraca temat?</li>
  <li><b>Harmonia</b> – czy pojawia się modulacja (nowe znaki przygodne utrzymujące się przez kilka taktów)?</li></ol>
  <p>Przykład – Walc a-moll Chopina: a-moll, 3/4, forma ABA z częścią środkową w A-dur, frazy 8-taktowe kończone kadencjami doskonałymi.</p>`,
  piano: "Zrób tę analizę dla utworu, którego się uczysz, i zapisz ją ołówkiem na nutach. Uczenie się z pamięci pójdzie szybciej.",
  check: [
    {q: "Po czym najczęściej poznasz modulację?", opts: ["po nowych znakach przygodnych, które się utrzymują", "po zmianie metrum", "po zmianie dynamiki"], ok: 0}
  ]
},
/* ---------------- LEVEL 6 ---------------- */
"th6-roman": {
  body: `<p>Analiza harmoniczna oznacza akordy cyframi rzymskimi według stopnia, na którym leży ich podstawa. Wielkie cyfry to akordy durowe, małe – molowe: w C-dur <b>I ii iii IV V vi vii°</b> (° – zmniejszony).</p>
  <p>Przewroty dopisujemy cyframi: I6 (sekstowy), I6/4 (kwartsekstowy), V7, V6/5, V4/3, V4/2.</p>
  <p>Typowe połączenia: I – IV – V – I, I – vi – IV – V, ii – V – I. Kadencja z kwartsekstem: I6/4 – V – I (bardzo częsta u Mozarta).</p>`,
  abc: [{src: "X:1\nL:1/2\nK:C\n[CEG] [ACe] | [FAc] [GBd] | [CEG]2 |]", cap: "I – vi – IV – V – I."}],
  piano: "W pierwszych 8 taktach sonaty KV 545 zapisz cyfry rzymskie nad lewą ręką.",
  check: [{q: "Akord ii w C-dur to…", opts: ["D–F–A", "D–Fis–A", "E–G–H"], ok: 0}]
},
"th6-7th": {
  body: `<p>Akordy septymowe to trójdźwięki z dodaną septymą. Najważniejsze:</p>
  <ul><li><b>Dominantowy (V7)</b> – dur + septyma mała (G–H–D–F).</li>
  <li><b>Wielki durowy (Imaj7)</b> – dur + septyma wielka (C–E–G–H). Brzmienie jazzowe.</li>
  <li><b>Molowy (ii7)</b> – moll + septyma mała (D–F–A–C).</li>
  <li><b>Półzmniejszony (viiø7)</b> – zmniejszony + septyma mała (H–D–F–A).</li>
  <li><b>Zmniejszony (vii°7)</b> – same tercje małe (Gis–H–D–F w a-moll). Bardzo napięty, często w muzyce romantycznej.</li></ul>
  <p>Każdy ma 3 przewroty, oznaczane 6/5, 4/3, 4/2.</p>`,
  piano: "Zagraj septymowy zmniejszony od każdego białego klawisza – w romantycznych utworach zobaczysz go wszędzie.",
  check: [{q: "Akord złożony z samych tercji małych to…", opts: ["dominantowy", "zmniejszony septymowy", "wielki durowy"], ok: 1}]
},
"th6-mod": {
  body: `<p><b>Modulacja</b> to przejście do nowej tonacji. Najczęściej do <b>tonacji pokrewnych</b> – różniących się jednym znakiem: dominanty (C → G), subdominanty (C → F) i ich równoległych molowych (a, e, d).</p>
  <p>Jak ją rozpoznać: pojawia się nowy znak przygodny (Fis w C-dur → G-dur), który się utrzymuje, a fragment kończy się kadencją w nowej tonacji.</p>
  <p>W formie sonatowej ekspozycja moduluje z toniki do dominanty (w molowych – do równoległej durowej). W KV 545 drugi temat jest w G-dur, a repriza zaczyna się nietypowo w F-dur.</p>`,
  piano: "W sonatinie, którą grasz, zaznacz miejsce, gdzie pojawia się nowa tonacja drugiego tematu.",
  check: [{q: "Typowa modulacja w ekspozycji sonaty w C-dur prowadzi do…", opts: ["G-dur", "c-moll", "Es-dur"], ok: 0}]
},
"th6-nonchord": {
  body: `<p>W melodii nie wszystkie dźwięki należą do akordu. Dźwięki obce akordowi:</p>
  <ul><li><b>Przejściowy</b> – łączy krokami dwa dźwięki akordu (C–D–E nad akordem C).</li>
  <li><b>Pomocniczy (ozdobnikowy)</b> – odchodzi o krok i wraca (C–D–C).</li>
  <li><b>Opóźnienie</b> – dźwięk z poprzedniego akordu zatrzymany na mocnej części taktu, rozwiązuje się krokiem w dół. Bardzo wyraziste.</li>
  <li><b>Appoggiatura (przednutka)</b> – obcy dźwięk na mocnej części, rozwiązany krokiem. Typowe westchnienia u Mozarta i Chopina.</li>
  <li><b>Antycypacja</b> – dźwięk następnego akordu zagrany wcześniej.</li></ul>
  <p>W interpretacji dźwięki obce na mocnej części (opóźnienia, appoggiatury) zwykle lekko się podkreśla, a ich rozwiązanie gra ciszej.</p>`,
  piano: "Znajdź appoggiatury w melodii Chopina, którego grasz, i zagraj je z „westchnieniem”: dysonans mocniej, rozwiązanie ciszej.",
  check: [{q: "Dźwięk obcy na mocnej części, rozwiązany krokiem w dół, to najczęściej…", opts: ["dźwięk przejściowy", "appoggiatura lub opóźnienie", "antycypacja"], ok: 1}]
},
"th6-history": {
  body: `<h4>Barok (ok. 1600–1750)</h4><p>Bach, Händel, Scarlatti. Polifonia (kilka równorzędnych głosów), jednolity ruch, taneczne rytmy, ornamenty. Na fortepianie: klarowna artykulacja, oszczędny pedał, dynamika „tarasowa”.</p>
  <h4>Klasycyzm (ok. 1750–1820)</h4><p>Haydn, Mozart, Beethoven (wczesny), Clementi. Melodia z akompaniamentem (bas Albertiego), forma sonatowa, równowaga fraz. Przejrzystość, krótki pedał, wyraźne kontrasty dynamiczne.</p>
  <h4>Romantyzm (ok. 1820–1900)</h4><p>Chopin, Schumann, Liszt, Grieg, Czajkowski. Śpiewna melodia, bogata harmonia, rubato, miniatury charakterystyczne (nokturny, walce, mazurki). Długi pedał legato, szeroka dynamika.</p>`,
  piano: "Przypisz każdy utwór z Twojej listy do epoki i sprawdź, czy sposób grania (pedał, artykulacja) do niej pasuje.",
  check: [{q: "Rubato i długi pedał legato to cechy…", opts: ["baroku", "klasycyzmu", "romantyzmu"], ok: 2}]
},
/* ---------------- LEVEL 7 ---------------- */
"th7-sec": {
  body: `<p><b>Dominanta wtrącona</b> to dominanta nie do toniki, ale do innego akordu w tonacji. Zapis: V/V („dominanta dominanty”), V/ii, V/vi.</p>
  <p>W C-dur V/V to D-dur (D–Fis–A) prowadzący do G-dur. Fis to sygnał: chwilowo „udajemy” G-dur, ale nie modulujemy na stałe.</p>
  <p>Dominanty wtrącone dodają kolorytu i napięcia przed kadencją: I – V/V – V – I to bardzo częste zakończenie.</p>`,
  piano: "Szukaj w utworach znaku przygodnego, który znika po jednym akordzie – często to dominanta wtrącona.",
  check: [{q: "V/V w G-dur to akord…", opts: ["D-dur", "A-dur", "E-dur"], ok: 1}]
},
"th7-forms": {
  body: `<ul><li><b>Rondo</b> – temat główny powraca między epizodami: A B A C A. Często finały sonat (KV 545, cz. 3).</li>
  <li><b>Wariacje</b> – temat i jego przekształcenia (rytm, faktura, tryb, tempo).</li>
  <li><b>Forma sonatowa</b> – <b>ekspozycja</b> (temat I w tonice, łącznik, temat II w dominancie lub równoległej), <b>przetworzenie</b> (rozwijanie motywów, modulacje), <b>repriza</b> (oba tematy w tonice), czasem koda.</li></ul>
  <p>Znajomość formy pomaga w pamięciowym opanowaniu utworu: wiesz, co wraca i co się zmienia.</p>`,
  piano: "W pierwszej części KV 545 zaznacz: temat I, temat II, przetworzenie i reprizę.",
  check: [{q: "A B A C A to forma…", opts: ["sonatowa", "rondo", "wariacje"], ok: 1}]
},
"th7-voice": {
  body: `<p>W harmonii czterogłosowej (sopran, alt, tenor, bas) obowiązują zasady prowadzenia głosów:</p>
  <ul><li>dźwięki wspólne zostają w tym samym głosie,</li><li>pozostałe głosy idą do najbliższych dźwięków,</li>
  <li>unikamy równoległych kwint i oktaw między tymi samymi głosami,</li><li>dźwięk prowadzący idzie w górę do toniki, septyma – w dół.</li></ul>
  <p>Na fortepianie to zasada „najkrótszej drogi” – dlatego dobrze dobrane przewroty brzmią płynnie i są łatwiejsze do zagrania.</p>`,
  piano: "Zagraj I–IV–V–I tak, by prawa ręka poruszała się jak najmniej (przewroty).",
  check: [{q: "Czego unikamy w prowadzeniu głosów?", opts: ["dźwięków wspólnych", "równoległych kwint i oktaw", "ruchu krokami"], ok: 1}]
},
"th7-hist": {
  body: `<p>Poznaj kontekst kompozytorów, których grasz:</p>
  <ul><li><b>J.S. Bach (1685–1750)</b> – kantor w Lipsku. Inwencje pisał jako ćwiczenia dla syna: miały uczyć gry dwóch równorzędnych głosów i „śpiewnego” stylu.</li>
  <li><b>W.A. Mozart (1756–1791)</b> – Sonatę C-dur KV 545 opisał jako „małą sonatę dla początkujących”, choć wymaga dużej precyzji.</li>
  <li><b>F. Chopin (1810–1849)</b> – walce, mazurki i nokturny to jego osobisty dziennik. Mazurki czerpią z polskiego folkloru (akcenty na 2. lub 3. miarę).</li>
  <li><b>E. Grieg (1843–1907)</b> – Utwory liryczne to norweskie miniatury inspirowane muzyką ludową.</li></ul>`,
  piano: "Przed nauką nowego utworu przeczytaj krótko o jego powstaniu – łatwiej znaleźć charakter.",
  check: [{q: "Dla kogo Bach pisał Inwencje?", opts: ["dla syna, jako ćwiczenia", "na koncerty publiczne", "na organy"], ok: 0}]
},
/* ---------------- LEVEL 8 ---------------- */
"th8-chrom": {
  body: `<ul><li><b>Akord neapolitański (N6)</b> – durowy akord na obniżonym II stopniu, zwykle w I przewrocie: w a-moll D–F–B. Prowadzi do dominanty, typowy w muzyce molowej.</li>
  <li><b>Akordy zwiększone sekstowe</b> – z sekstą zwiększoną między obniżonym VI stopniem a podwyższonym IV (w a-moll F–Dis), rozchodzącą się do oktawy na dominancie. Odmiany: włoski, francuski, niemiecki.</li></ul>
  <p>Oba to sposoby na mocniejsze przygotowanie dominanty – usłyszysz je u Chopina i Beethovena.</p>`,
  piano: "Zagraj w a-moll: D–F–B (N6) → E–Gis–H (V) → A–C–E (i).",
  check: [{q: "Akord neapolitański leży na…", opts: ["obniżonym II stopniu", "podwyższonym IV", "VI stopniu"], ok: 0}]
},
"th8-counter": {
  body: `<p><b>Kontrapunkt</b> to sztuka łączenia niezależnych melodii. Rodzaje ruchu głosów: <b>równoległy</b> (w tym samym kierunku o ten sam interwał), <b>prosty</b> (w tym samym kierunku), <b>przeciwny</b> (w przeciwnych kierunkach – najbardziej niezależny) i <b>boczny</b> (jeden głos stoi).</p>
  <p>W Inwencjach Bacha głosy często idą ruchem przeciwnym, a motyw przechodzi z ręki do ręki (imitacja). Ćwicząc polifonię, graj każdy głos osobno i śpiewaj drugi.</p>`,
  piano: "W inwencji, którą grasz, zaznacz miejsca, gdzie ręce idą ruchem przeciwnym.",
  check: [{q: "Najbardziej niezależny rodzaj ruchu głosów to…", opts: ["równoległy", "przeciwny", "prosty"], ok: 1}]
},
"th8-fugue": {
  body: `<p><b>Fuga</b> to forma polifoniczna oparta na jednym temacie:</p>
  <ul><li><b>Ekspozycja</b> – temat wchodzi kolejno w każdym głosie. Pierwsze wejście to <b>temat</b> (dux), drugie – <b>odpowiedź</b> (comes) w tonacji dominanty.</li>
  <li><b>Kontrapunkt</b> – melodia towarzysząca odpowiedzi.</li>
  <li><b>Łączniki (epizody)</b> – fragmenty bez pełnego tematu, często sekwencje.</li>
  <li>Dalej przeprowadzenia tematu w innych tonacjach i powrót do toniki, czasem <b>stretto</b> (wejścia nakładają się).</li></ul>
  <p>Wszystko to znajdziesz w Twoim WTK I – zacznij od Fugi C-dur BWV 846 (4 głosy).</p>`,
  piano: "W Fudze C-dur z WTK zaznacz kolorem każde wejście tematu.",
  check: [{q: "Druga prezentacja tematu w fudze (w dominancie) to…", opts: ["odpowiedź", "epizod", "stretto"], ok: 0}]
},
"th8-hist": {
  body: `<h4>Impresjonizm (ok. 1890–1920)</h4><p>Debussy, Ravel. Barwa ważniejsza niż funkcje harmoniczne: skale całotonowe i pentatoniczne, akordy nonowe, równoległe akordy, pedał jako „mgła”. Tytuły obrazowe.</p>
  <h4>XX i XXI wiek</h4><p>Ogromna różnorodność: neoklasycyzm (Prokofiew), atonalność (Schönberg), muzyka ludowa (Bartók), jazz w muzyce klasycznej (Gershwin), minimalizm (Glass, Einaudi – powtarzalne figury, prosta harmonia).</p>
  <p>Utwory Einaudiego, które grasz, to minimalizm: liczy się równość akompaniamentu, balans i pedał, a nie wirtuozeria.</p>`,
  piano: "Porównaj pedał w utworze Einaudiego i w Preludium e-moll Chopina – w obu jest długi, ale z innego powodu.",
  check: [{q: "Powtarzalne figury i prosta harmonia to cechy…", opts: ["minimalizmu", "baroku", "impresjonizmu"], ok: 0}]
}
};

/* ---------------- KURS PEDAŁU ---------------- */
const PEDAL_SVG = `<svg viewBox="0 0 330 130" width="100%" style="max-width:420px" role="img" aria-label="Pedał synkopowany: stopa podnosi się w chwili uderzenia nowego akordu i zaraz opada">
  <text x="4" y="42" font-size="12" style="fill:currentColor">ręce</text>
  <text x="4" y="104" font-size="12" style="fill:currentColor">pedał</text>
  ${["C", "F", "G", "C"].map((c, i) => `<rect x="${50 + i * 68}" y="24" width="64" height="28" rx="4" style="fill:var(--c-tech-soft);stroke:var(--c-tech)"/><text x="${82 + i * 68}" y="43" font-size="13" text-anchor="middle" style="fill:currentColor">${c}</text>`).join("")}
  <path d="M46 84 H60 V108 H118 V84 H128 V108 H186 V84 H196 V108 H254 V84 H264 V108 H322" style="fill:none;stroke:var(--accent);stroke-width:3"/>
  <text x="46" y="78" font-size="10" style="fill:currentColor">w górze</text>
  <text x="270" y="124" font-size="10" style="fill:currentColor">wciśnięty</text>
</svg>`;

const PEDAL = [
{id: "p1", title: "Jak działa pedał i jak go naciskać",
 short: "Pedał prawy podnosi tłumiki, więc struny brzmią dalej po puszczeniu klawisza. Najpierw sama technika stopy.",
 body: `<p>Prawy pedał (forte, sustain) <b>podnosi wszystkie tłumiki</b>: dźwięki brzmią dalej po puszczeniu klawiszy i współbrzmią ze sobą. Dlatego pedał łączy dźwięki, ale też je miesza.</p>
 <h4>Postawa stopy</h4><ul><li><b>Pięta na podłodze</b> – cały czas. Ruch wykonuje kostka, a nie całe kolano.</li>
 <li>Pedał pod <b>śródstopiem</b> (przednia część stopy), nie pod palcami.</li>
 <li>Stopa <b>stale dotyka pedału</b> – nie odrywaj jej i nie stukaj.</li>
 <li>Lewa stopa stoi płasko z przodu, przy lewym pedale.</li></ul>
 <h4>Pianino cyfrowe</h4><p>Sprawdź w ustawieniach, czy pedał jest podłączony jako „sustain” i czy działa w dobrą stronę (wciśnięty = przedłużony dźwięk). Jeśli masz pedał ciągły (continuous), pianino obsługuje półpedał – przydaje się później.</p>`,
 drill: "Bez grania: włącz metronom na 60. Na „raz” wciśnij pedał do końca, na „dwa” puść do końca. Potem samo „i” między uderzeniami. Pięta zostaje na podłodze, ruch jest cichy.",
 check: [{q: "Co robi stopa przez cały czas grania?", opts: ["unosi się nad pedałem między naciśnięciami", "stale dotyka pedału, pięta na podłodze"], ok: 1}]},
{id: "p2", title: "Pedał prosty (rytmiczny)",
 short: "Pedał naciskany razem z dźwiękiem i puszczany razem z nim – do akordów staccato i efektów.",
 body: `<p><b>Pedał prosty</b>: wciskasz pedał <b>w tym samym momencie</b> co klawisze i puszczasz razem z nimi. Daje pełniejszy, bardziej rezonujący dźwięk pojedynczego akordu, ale <b>nie łączy</b> akordów ze sobą – między nimi powstaje dziura.</p>
 <p>Kiedy go używać: krótkie, akcentowane akordy, akord kończący utwór, efekty. W szybkich, tanecznych utworach z pedałem na „raz” (np. lewa ręka walca) zbliża się do pedału synkopowanego.</p>`,
 drill: "Graj akord C-dur obiema rękami na każde „raz” (metronom 60): klawisze i pedał w dół razem, po jednym uderzeniu oba w górę razem. Posłuchaj, że między akordami jest cisza.",
 check: [{q: "Czy pedał prosty łączy kolejne akordy legato?", opts: ["tak", "nie – między akordami powstaje przerwa"], ok: 1}]},
{id: "p3", title: "Pedał synkopowany – najważniejsza technika",
 short: "Stopa podnosi się dokładnie w chwili uderzenia nowego akordu i opada zaraz po nim. Ręce w dół, stopa w górę, stopa w dół.",
 body: `<p><b>Pedał synkopowany (opóźniony, legato)</b> łączy akordy bez przerwy i bez mieszania. To 90% pedalizacji w muzyce romantycznej.</p>
 <ol><li>Grasz pierwszy akord, a <b>chwilę po</b> nim wciskasz pedał.</li>
 <li>Grasz kolejny akord i <b>dokładnie w tej chwili podnosisz</b> pedał – stary dźwięk gaśnie, nowy trzymają palce.</li>
 <li><b>Zaraz potem</b> (na „i”) znowu wciskasz pedał – teraz łapie nowy akord.</li></ol>
 <p>Rytm ruchu: <b>ręce w dół – stopa w górę – stopa w dół</b>. Stopa jest zawsze „spóźniona” względem rąk, stąd nazwa.</p>
 ${PEDAL_SVG}
 <p>Najczęstszy błąd: wciskanie pedału <b>razem</b> z nowym akordem. Wtedy łapie jeszcze stary akord i powstaje brud.</p>`,
 abc: [{src: "X:1\nM:4/4\nL:1/4\nQ:1/4=60\nK:C\n\"^Ped. po uderzeniu\"[CEG]2 [CFA]2 | [B,DG]2 [CEG]2 |]", cap: "Akordy do ćwiczenia: C – F – G – C, po dwa uderzenia."}],
 drill: "Akordy C – F – G – C półnutami (metronom 60), prawą ręką. Licz na głos „RAZ (akord) – i (pedał w dół) – dwa – i”. Na kolejnym „RAZ” podnieś pedał razem z nowym akordem, na „i” znów wciśnij. 5 minut dziennie przez tydzień.",
 check: [{q: "Kiedy wciskasz pedał przy pedale synkopowanym?", opts: ["razem z nowym akordem", "chwilę po uderzeniu nowego akordu", "przed akordem"], ok: 1, why: "Gdy wciśniesz razem z akordem, pedał złapie jeszcze poprzedni dźwięk."}]},
{id: "p4", title: "Słuchanie: czysty czy brudny pedał",
 short: "Ucho jest najważniejszym narzędziem. Uczysz się słyszeć mieszające się harmonie i dziury w dźwięku.",
 body: `<p>Pedału nie da się zapisać dokładnie – trzeba go <b>słuchać</b>. Dwa błędy:</p>
 <ul><li><b>Brud</b> – pedał trzymany przez zmianę harmonii. Dźwięki z różnych akordów zlewają się w szum.</li>
 <li><b>Dziura</b> – pedał podniesiony za wcześnie albo wciśnięty za późno. Słychać przerwę albo suchy dźwięk.</li></ul>
 <p>Test: zagraj gamę C-dur w górę z wciśniętym pedałem – to brud. Potem zagraj ją z pedałem zmienianym synkopowo na każdą nutę – brzmi legato i czysto.</p>
 <p>Nagrywaj się. Na nagraniu brud słychać znacznie wyraźniej niż przy grze.</p>`,
 drill: "Melodia jednym palcem (np. C–D–E–F–G, ćwierćnuty, ♩ = 50) z pedałem synkopowanym zmienianym na każdą nutę. Graj celowo nonlegato palcami – legato ma dać wyłącznie pedał. Słuchaj, czy nie ma dziur ani zlewania.",
 check: [{q: "Co oznacza „brudny” pedał?", opts: ["dźwięki różnych harmonii zlewają się", "pedał wciśnięty za późno"], ok: 0}]},
{id: "p5", title: "Pedał a harmonia i bas",
 short: "Zasada: zmieniaj pedał, gdy zmienia się harmonia. Bas podpowiada, kiedy.",
 body: `<p>Podstawowa zasada: <b>jedna harmonia – jeden pedał</b>. Zmieniasz go, gdy zmienia się akord. Wskazówką jest zwykle <b>bas</b>: nowa nuta w basie to najczęściej moment zmiany.</p>
 <ul><li><b>Walc</b> (bas na „raz”, akordy na „dwa–trzy”): pedał zmieniasz na każde „raz”, synkopowo. Tak w Walcu a-moll Chopina.</li>
 <li><b>Akompaniament łamany</b> (np. Arietta Griega): pedał trzyma całą figurę jednej harmonii.</li>
 <li><b>Dźwięki przejściowe w melodii</b> przy długim pedale mogą się zlewać – wtedy pedał jest krótszy albo zmieniany częściej.</li></ul>`,
 drill: "Lewa ręka Walca a-moll Chopina („um-pa-pa”) sama, wolno. Pedał synkopowo na każdy bas (raz), podniesiony razem z kolejnym basem. Potem dodaj prawą rękę.",
 check: [{q: "Kiedy zwykle zmieniasz pedał w walcu?", opts: ["na każde „raz” z nowym basem", "co pół taktu", "co dwa takty"], ok: 0}]},
{id: "p6", title: "Głębokość pedału i półpedał",
 short: "Pedał nie jest włącznikiem. Płytszy pedał daje mniej rezonansu, a szybkie częściowe zmiany czyszczą dźwięk.",
 body: `<p>Pedał można wciskać na różną głębokość:</p>
 <ul><li><b>Pełny</b> – maksimum rezonansu.</li>
 <li><b>Półpedał</b> – tłumiki lekko dotykają strun: dźwięk jest bogatszy, ale mniej się miesza. Dobry do Mozarta i szybkich przebiegów.</li>
 <li><b>Szybkie częściowe zmiany („trzepotanie”)</b> – czyszczą górę, zostawiając trochę basu.</li></ul>
 <p>W pianinie cyfrowym działa to tylko z pedałem ciągłym (continuous). Ze zwykłym przełącznikiem pedał jest „wszystko albo nic” – wtedy kontrolujesz głównie czas zmiany.</p>`,
 drill: "Zagraj akord C w basie z pedałem, a potem prawą ręką gamę C-dur w górę. Spróbuj trzymać pedał tylko do połowy – sprawdź, czy dźwięk mniej się zlewa (jeśli Twój pedał to obsługuje).",
 check: [{q: "Do czego przydaje się półpedał?", opts: ["do mniej zlewającego się, lżejszego rezonansu", "do głośniejszej gry"], ok: 0}]},
{id: "p7", title: "Pedał w różnych stylach",
 short: "Barok prawie bez pedału, klasycyzm krótko i oszczędnie, romantyzm długo i legato.",
 body: `<ul><li><b>Barok</b> (Bach, Małe preludia, Inwencje) – klawesyn nie miał pedału. Legato i artykulację robią palce. Pedał najwyżej krótko, dla rezonansu na akcentach lub w kadencjach.</li>
 <li><b>Klasycyzm</b> (Clementi, Mozart KV 545) – pedał krótki, oszczędny, często tylko na pojedynczych akordach lub harmoniach. Przejrzystość ponad wszystko. Bas Albertiego zwykle bez pedału albo z bardzo płytkim.</li>
 <li><b>Romantyzm</b> (Chopin, Grieg, Czajkowski) – pedał synkopowany prawie bez przerwy, zmieniany z harmonią. Część brzmienia.</li>
 <li><b>Minimalizm</b> (Einaudi) – długi pedał na harmonię, ale słuchaj, żeby melodia się nie rozmywała.</li></ul>`,
 drill: "Zagraj kilka taktów Małego preludium Bacha bez pedału (legato palcami), potem kilka taktów Walca a-moll z pedałem synkopowanym. Porównaj, jak zmienia się Twoja praca palców.",
 check: [{q: "Jaki pedał pasuje do Inwencji Bacha?", opts: ["długi, legato", "prawie żaden – legato palcami"], ok: 1}]},
{id: "p8", title: "Lewy i środkowy pedał",
 short: "Lewy (una corda) zmienia barwę na cichszą i miękką. Środkowy (sostenuto) trzyma tylko wybrane dźwięki.",
 body: `<ul><li><b>Lewy pedał – una corda</b> („jedna struna”): w fortepianie przesuwa mechanizm tak, że młotek uderza mniej strun. Dźwięk jest cichszy i bardziej matowy. Oznaczenie <i>una corda</i>, odwołanie <i>tre corde</i>. To zmiana barwy, a nie sposób na granie cicho – pianissimo i tak robią palce.</li>
 <li><b>Środkowy – sostenuto</b>: trzyma tylko te dźwięki, które były wciśnięte w chwili naciśnięcia pedału. Np. długi bas, nad którym ręce grają bez pedału.</li></ul>
 <p>W pianinach cyfrowych zależy to od modelu: lewy często ścisza i zmienia barwę, środkowy bywa sostenuto. W programie RCM do Grade 8 wystarczy prawy pedał.</p>`,
 drill: "Sprawdź, czy Twoje pianino ma lewy i środkowy pedał, i co robią. Zagraj Preludium e-moll Chopina raz zwyczajnie, raz z una corda – usłysz różnicę barwy.",
 check: [{q: "Do czego służy una corda?", opts: ["zmienia barwę na cichszą i miękką", "przedłuża dźwięki"], ok: 0}]},
{id: "p9", title: "Plan pracy nad pedałem w utworze",
 short: "Najpierw bez pedału, potem zaplanuj pedał ołówkiem, dodaj go powoli i sprawdź na nagraniu.",
 body: `<ol><li><b>Ucz utworu bez pedału.</b> Legato, które da się zrobić palcami, rób palcami. Pedał nie może zasłaniać braków.</li>
 <li><b>Zaplanuj pedał ołówkiem</b>: zaznacz zmiany harmonii (bas). Tam będą zmiany pedału.</li>
 <li><b>Dodaj pedał w wolnym tempie</b>, najpierw z samą lewą ręką.</li>
 <li><b>Połącz ręce</b> i słuchaj: brud? dziury?</li>
 <li><b>Nagraj się</b> i odsłuchaj – oceniaj tylko pedał.</li>
 <li>W miejscach z dźwiękami przejściowymi lub szybką zmianą harmonii zdecyduj: krótszy pedał, półpedał albo bez pedału.</li></ol>
 <p>Ten plan stosuj do każdego nowego utworu z listy C.</p>`,
 drill: "Weź utwór z listy C, którego się uczysz. Zaznacz ołówkiem zmiany pedału w pierwszych 8 taktach, zagraj je wolno samą lewą ręką z pedałem, potem obiema rękami i nagraj.",
 check: [{q: "Od czego zaczynasz pracę nad pedałem w nowym utworze?", opts: ["od grania z pedałem od pierwszego dnia", "od nauki bez pedału i legato palcami"], ok: 1}]}
];
