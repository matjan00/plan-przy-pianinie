"use strict";
/* Rozszerzone wskazówki do utworów (klucze = id z PIECES w index.html).
   m: oznaczenia w nutach (tempo, dynamika, artykulacja, ozdobniki) i jak je wykonać; t/i: dodatkowa technika i interpretacja.
   STYLE: zasady wykonawcze epoki dla list A/B/C; etiudy mają własne wpisy, bo pochodzą z różnych epok. */

const STYLE = {
A: [
  "<b>Brak oznaczeń w oryginale.</b> Bach prawie nie wpisywał tempa ani dynamiki – <i>f</i>, <i>p</i>, łuki i palcowanie w wielu wydaniach dodał redaktor. W wydaniu Urtext tego nie ma i decyzje są Twoje.",
  "<b>Dynamika tarasowa i naturalna:</b> zamiast długich crescend myśl blokami (fraza ciszej / głośniej) i pozwól linii melodycznej rosnąć do góry i opadać w dół. Dysonans (np. septyma, opóźnienie) lekko mocniej, rozwiązanie ciszej.",
  "<b>Tryl (tr, wężyk)</b> zaczynaj od <b>górnej</b> nuty pomocniczej i na miarę (razem z basem). Długi tryl może zacząć wolniej i przyspieszyć, kończy się zwykle zakończeniem (dwie nuty) lub zatrzymaniem na nucie głównej.",
  "<b>Mordent</b> (wężyk przekreślony): nuta główna – dolna sąsiednia – główna, szybko i na miarę. <b>Krótki tryl</b> (wężyk bez kreski): górna – główna – górna – główna, szybko, z zatrzymaniem na głównej.",
  "<b>Artykulacja:</b> ósemki zwykle lekko oderwane (non legato), szesnastki legato lub portato – ważne, żeby ten sam motyw był zawsze artykułowany tak samo w obu rękach.",
  "<b>Pedał:</b> najlepiej bez albo bardzo krótki, tylko dla koloru – legato robisz palcami."
],
B: [
  "<b>Tempo w nazwie części</b> (Allegro, Andante, Spiritoso…) mówi też o charakterze, nie tylko o szybkości. <b>Alla breve</b> (¢) = licz na 2, nie na 4 – muzyka ma płynąć w dłuższych łukach.",
  "<b>Dynamika klasyczna:</b> <i>f</i> i <i>p</i> są kontrastami jak zmiana instrumentów w orkiestrze – zmieniaj je od razu, nie stopniowo, chyba że stoi <i>cresc.</i> lub <i>dim.</i>. <i>Forte</i> u Mozarta czy Clementiego to pełny, ale nigdy twardy dźwięk.",
  "<b>sf / sfz</b> (sforzato) – akcent względem otoczenia: w <i>p</i> to wyraźne podkreślenie, nie uderzenie. <b>fp</b> – mocno i od razu cicho.",
  "<b>Łuki</b> u klasyków to artykulacja: pierwsza nuta pod łukiem lekko cięższa, ostatnia krótsza i lżejsza (oddech). Kropka = staccato krótkie i lekkie, klin (kreseczka) = staccato mocniejsze.",
  "<b>Przednutnik długi</b> (mała nutka bez kreski) zabiera zwykle połowę wartości nuty głównej i gra się go na miarę, z akcentem; rozwiązanie ciszej. <b>Przednutnik krótki</b> (przekreślony) – bardzo szybko, na miarę.",
  "<b>Tryl</b> w Mozarcie i Clementim zaczyna się zwykle od górnej nuty, w Beethovenie często od głównej; kończy się zakończeniem (nuta dolna + główna). <b>Obiegnik</b> (∾) – górna, główna, dolna, główna.",
  "<b>Pedał:</b> oszczędnie, krótko, głównie dla połączenia akordów lub barwy w <i>p</i>; przebiegi i basso Albertiego bez pedału."
],
C: [
  "<b>Włoskie i niemieckie określenia charakteru</b> (dolce, espressivo, cantabile, sotto voce, „Nicht schnell”) są równie ważne jak tempo – przeczytaj je przed pierwszym zagraniem i zapisz nad nutami tłumaczenie.",
  "<b>Rubato:</b> „kradziony czas” – melodia może się zatrzymać na ważnej nucie i przyspieszyć potem, ale lewa ręka trzyma puls. Rubato ma wynikać z frazy, nie z trudnych miejsc.",
  "<b>Ozdobniki u Chopina</b> (przednutniki, tryle, ozdobne biegniki drobnymi nutkami) grane są zwykle <b>na miarę</b>, razem z basem. Długie ozdobne pasaże zaczynaj spokojnie, rozpędzaj w środku, zwolnij przed nutą docelową – i nie przesuwaj przez nie lewej ręki.",
  "<b>Dynamika romantyczna</b> jest falująca: <i>cresc.</i> i <i>dim.</i> (widełki) kształtują frazę. Widełki pod jedną nutą lub krótką grupą u Chopina i Schumanna często znaczą raczej <b>akcent ekspresyjny / rozciągnięcie czasu</b> niż głośność.",
  "<b>Pedał</b> zmieniaj „z opóźnieniem” (synkopowo): klawisz w dół → pedał w górę i od razu w dół. Wskazówki pedalizacji w nutach (<i>Ped.</i> i ✱) traktuj poważnie, ale sprawdzaj uchem na swoim instrumencie.",
  "<b>Smorzando, calando, morendo</b> – zamieranie: ciszej <i>i</i> wolniej. <b>Ritenuto</b> – od razu wolniej; <b>ritardando / rallentando</b> – stopniowo wolniej; <b>a tempo</b> – powrót do tempa."
]
};

const NOTES = {
/* ---------- GRADE 5 ---------- */
"bwv939": {
  m: ["Tempo nie jest wpisane – wybierz spokojny, równy ruch, w którym słyszysz każdą zmianę harmonii.",
      "Dynamikę zaplanuj sam: zacznij <i>mf</i>, w środku (oddalenie od C-dur) trochę więcej napięcia, końcowa kadencja spokojnie.",
      "Ostatni akord trzymaj pełną wartość – bez fermaty, jeśli jej nie ma w nutach."],
  t: ["Akord łamany graj jednym ruchem ręki z lekkim obrotem nadgarstka, zamiast „wybijać” każdy palec osobno."],
  i: ["Dźwięki basu na początku taktu to filary harmonii – lekko pełniejsze niż reszta figury."]
},
"bwv927": {
  m: ["Brak tempa w oryginale – to praeambulum, czyli „przygrywka”: żywo, ale bez gonienia.",
      "Tryle i ozdobniki przy kadencjach: od górnej nuty, na miarę, krótko.",
      "Jeśli wydanie ma wpisane <i>f</i> i <i>p</i>, sprawdź, czy to nie dodatek redaktora (zwykle w nawiasach lub mniejszą czcionką)."],
  t: ["Przy figurach szesnastkowych zostaw palce blisko klawiszy – ruch z palców, nadgarstek tylko podąża."],
  i: ["Fragment z nutą trzymaną w basie (punkt organowy) buduje napięcie – utrzymaj go, nie zwalniaj przed powrotem do F-dur."]
},
"bwv941": {
  m: ["Tempo nieoznaczone – płynny ruch; tryl lub mordent przy kadencji zawsze na miarę.",
      "Molowa tonacja nie znaczy „wolno i ciężko” – ruch ma płynąć jak u lutnisty."],
  t: ["Przejścia kciuka w trójkach rób bez szarpnięcia – kciuk przygotowany pod dłonią zanim go potrzebujesz."],
  i: ["Każde wejście w nową tonację (np. G-dur, a-moll) zagraj odrobinę inną barwą – to „rozdziały” tego utworu."]
},
"clem36-3": {
  m: ["<b>Spiritoso</b> – z werwą, z duchem. Alla breve (¢): licz na 2, półnuty to puls.",
      "Początek <i>f</i> – pełno i dziarsko; odpowiedzi w <i>p</i> zmieniaj od razu, bez przejściowego <i>diminuendo</i>.",
      "Staccato kropki – krótko i lekko z nadgarstka; nuty pod łukiem legato z „oddechem” na ostatniej.",
      "Ozdobniki (jeśli są w Twoim wydaniu): krótki przednutnik szybko i na miarę."],
  t: ["Przebiegi gamowe kończ lekko – ostatnia nuta przebiegu nie może być akcentem.",
      "W basso Albertiego kciuk gra najciszej; najważniejszy jest najniższy dźwięk."],
  i: ["Przetworzenie jest krótkie i dramatyczne (tonacje molowe) – pokaż zmianę nastroju zanim wróci temat."]
},
"kuhlau55-1": {
  m: ["<b>Allegro</b> – żywo i radośnie; puls marszowy na 4.",
      "Kontrasty <i>f</i> / <i>p</i> nagłe, jak dialog dwóch grup orkiestry.",
      "Staccato i akcenty (&gt;) w temacie wyraźnie różne: staccato lekko, akcent z ciężaru, nie ze stuknięcia.",
      "Na końcu ekspozycji i części: nie zwalniaj, chyba że stoi <i>rit.</i> – klasyczny finał kończy się w tempie."],
  t: ["Akordy łamane w temacie (C–E–G) graj jednym łukiem ręki, palce przygotowane nad klawiszami."],
  i: ["Drugi temat (w G-dur) zagraj śpiewniej i cieplej niż energiczny pierwszy."]
},
"beet-anh5": {
  m: ["<b>Moderato</b> – umiarkowanie; nie przyspieszaj, to spokojna, śpiewna muzyka.",
      "Ozdobniki (przednutniki, obiegniki): u Beethovena na miarę, lekko; obiegnik ∾ = górna, główna, dolna, główna – równo w czasie, nie „wrzucony”.",
      "Łuki 2-nutowe: pierwsza nuta cięższa, druga lżejsza i krótsza (westchnienie).",
      "<i>p</i> i <i>dolce</i> – miękko, ale z głosem; <i>f</i> nigdy twarde."],
  t: ["Ćwicz ozdobnik najpierw jako zwykłe nuty w rytmie, potem przyspieszaj, aż stanie się ozdobą."],
  i: ["Fraza 4-taktowa: szczyt zwykle w 3. takcie, koniec ciszej."]
},
"chopin-walc-a": {
  m: ["Tempo walca: wolny, melancholijny walc – licz „na raz”, nie na trzy, żeby frazy płynęły.",
      "Akcenty (&gt;) i widełki na pojedynczych nutach melodii – raczej ekspresja i lekkie przytrzymanie niż głośność.",
      "Ozdobniki (przednutniki) na miarę, razem z basem, miękko.",
      "<i>Ped.</i> i ✱ zwykle w każdym takcie – zmieniaj na basie, czyli na „raz”."],
  t: ["Skok basu do akordu: ruch łukiem blisko klawiatury, nie w górę."],
  i: ["Gdy temat wraca po części A-dur, zagraj go jakby wspomnienie – odrobinę ciszej lub z inną barwą."]
},
"chopin-cantabile": {
  m: ["<b>Cantabile</b> – śpiewnie: każda nuta melodii ma się łączyć z następną jak w głosie.",
      "Drobne nutki ozdobne graj jak wokalistka: na miarę, swobodnie, z lekkim rozciągnięciem czasu, bez przesuwania lewej ręki.",
      "Dynamika w zakresie <i>p</i>–<i>mf</i>; widełki kształtują frazę, a nie robią efektu.",
      "Ostatni akord pod fermatą lub w <i>pp</i> – trzymaj, aż wybrzmi, pedał puść dopiero po ciszy."],
  t: ["Długa nuta melodii musi przetrwać – zagraj ją pełniej niż nuty krótkie, bo fortepian wygasa."],
  i: ["Ułóż sobie, która nuta frazy jest „szczytem”, i prowadź do niej cały oddech."]
},
"schumann-verlust": {
  m: ["<b>Nicht schnell</b> – nie szybko. Schumann pisze określenia po niemiecku; zapisz tłumaczenie nad nutami.",
      "<b>sf</b> (sforzato) w <i>p</i>: wyraźny, bolesny akcent, ale nie walnięcie – to ból, nie złość.",
      "Krótkie łuki: ostatnia nuta pod łukiem krótko i ciszej, z oddechem.",
      "Końcowe takty: ciszej i spokojniej; ostatni akord trzymaj pełną wartość."],
  t: ["Gdy melodia przechodzi do lewej ręki, prawa od razu cichnie – ćwicz taką „zamianę ról”."],
  i: ["Myśl o tekście „pierwsza strata” (dziecko traci ptaszka): pierwsze takty pytające, sforzata – płacz, koniec – pogodzenie."]
},
"grieg-arietta": {
  m: ["<b>Poco andante e sostenuto</b> – dość spokojnie, z podtrzymanym, pełnym dźwiękiem.",
      "Początek <i>p</i>, dolce: melodia ciepła, szesnastki akompaniamentu ledwie słyszalne.",
      "Widełki <i>cresc.</i>/<i>dim.</i> obejmują całe frazy – szczyt w środku, nie na początku.",
      "Na końcu <i>ritardando</i> i fermata: zwalniaj stopniowo, ostatnia nuta niech wybrzmi do ciszy."],
  t: ["Górna nuta prawej ręki to melodia – lekko przechyl dłoń w stronę 4. i 5. palca."],
  i: ["Grieg cytuje tę melodię w swoim ostatnim utworze cyklu (op. 71) – to „motto” całych Utworów lirycznych, graj je z czułością."]
},
"burg15": {
  m: ["Szybkie tempo (<b>Allegro con brio</b> w większości wydań) – z ogniem, ale lekko.",
      "Staccato w akordach prawej ręki – bardzo krótko; prawa ręka cicho, melodia w lewej.",
      "<i>cresc.</i> zaczynaj z <i>p</i> – wtedy masz dokąd rosnąć. Sforzata pokazują dramat.",
      "Część w C-dur jaśniej, <i>dolce</i>; powrót c-moll znów tajemniczo."],
  t: ["Akordy staccato rób „odbiciem” z nadgarstka, palce stoją w kształcie akordu."],
  i: ["Kontrast nastroju (moll – dur – moll) jest najważniejszy: to ballada, czyli opowieść."]
},
"burg18": {
  m: ["<b>Agitato</b> – niespokojnie, z poruszeniem; ale dynamika często <i>p</i> – niepokój cichy.",
      "Łuki nad figurami dzielonymi między ręce: grupa ma brzmieć jak jedna linia.",
      "Akordy staccato na końcu grup – krótko, lekko, bez akcentu."],
  t: ["Przejęcie figury z ręki do ręki ćwicz na jednym takcie w pętli, aż nie usłyszysz szwu."],
  i: ["Fraza pyta i odpowiada: pierwsza grupa wyżej/głośniej, druga cichsza."]
},
"burg20": {
  m: ["<b>Allegro vivace</b>, 6/8 – żywo, w dwóch pulsach na takt.",
      "Staccato w ósemkach lekko i sprężyście; akcenty na raz (i na cztery) dają taneczny skok.",
      "<i>pp</i> i <i>ff</i> – duże kontrasty; <i>cresc.</i> buduj wraz z rosnącym rejestrem.",
      "Końcowe akordy <i>ff</i> krótko i zdecydowanie, bez zwalniania."],
  t: ["Przeskoki ręki: ruch zaczyna się już w trakcie ostatniej nuty, nie po niej."],
  i: ["Tarantela to taniec szybki i wirujący – energia z rytmu, nie z głośności."]
},
"burg24": {
  m: ["Szybkie, lekkie tempo – szesnastki prawej ręki <i>pp</i>, <i>leggiero</i>.",
      "Melodia lewej ręki (przekładanej nad prawą) – <i>legato</i>, wyraźniej niż akompaniament.",
      "Widełki w melodii prowadzą frazę; nie dodawaj akcentu na nucie po przełożeniu ręki."],
  t: ["Przełożenie lewej ręki rób łukiem, nisko nad klawiaturą – patrz na nutę docelową zanim ręka wystartuje."],
  i: ["Wyobraź sobie lot ptaka: szesnastki to powietrze, melodia lewej ręki to sylwetka jaskółki."]
},
"burg25": {
  m: ["Żwawe, marszowe tempo; rytm punktowany ostry – szesnastka po ósemce z kropką naprawdę krótka.",
      "Staccato w akordach krótkie, z nadgarstka; akcenty &gt; pełnym ciężarem ręki.",
      "Część środkowa często <i>dolce</i> / <i>legato</i> – inny charakter, więcej śpiewu.",
      "Zakończenie <i>f</i>: dumnie i pewnie, tempo do końca."],
  t: ["Nie skracaj ósemki z kropką – częsty błąd to zamiana rytmu punktowanego w triolę."],
  i: ["Rycerz jest dostojny, nie hałaśliwy – <i>forte</i> pełne, ale z kontrolą."]
},
/* ---------- GRADE 6 ---------- */
"bwv999": {
  m: ["Brak tempa i dynamiki w oryginale (utwór lutniowy). Wybierz płynne tempo, w którym bas brzmi pełno.",
      "3/4: poczuj „raz” w każdym takcie – to bas na mocnej części.",
      "Zakończenie w G-dur (dominanta c-moll) – pytanie, a nie kropka; ostatni akord trzymaj i daj mu wybrzmieć."],
  t: ["Lewa ręka gra tylko jeden dźwięk na takt – trzymaj go palcem do końca taktu zamiast pedału."],
  i: ["Kolejne takty to podróż harmoniczna: zaznacz ołówkiem miejsca największego napięcia (zmniejszone akordy)."]
},
"bwv926": {
  m: ["3/4, bez tempa w oryginale – płynnie, jak żywy taniec.",
      "Środkowa część z akordami (pisanymi skrótowo w niektórych źródłach) – graj je zgodnie z rozpisaniem w Twoim wydaniu, rytmicznie.",
      "Ozdobniki przy kadencjach od górnej nuty; ostatni akord bez nadmiernego zwolnienia."],
  t: ["Figury trójkowe: kciuk lekki, żeby „raz” nie był przypadkowym akcentem kciuka, tylko świadomym."],
  i: ["Kontrast faktur (figuracje – akordy) pokaż barwą, nie głośnością."]
},
"clem36-4": {
  m: ["<b>Con spirito</b> – z duchem, ochoczo.",
      "Dynamika blokowa: <i>f</i> i <i>p</i> zmieniaj nagle; <i>cresc.</i> tylko tam, gdzie jest napisane.",
      "Łuki 2-nutowe – westchnienia (ciężko–lekko); staccato krótkie i dworskie.",
      "Tryle (jeśli w wydaniu): od górnej nuty, z zakończeniem."],
  t: ["W tercjach słuchaj, czy obie nuty uderzają jednocześnie – nagraj się i sprawdź."],
  i: ["Pierwszy temat „dworski ukłon”, drugi lżejszy i bardziej figlarny."]
},
"kuhlau20-1": {
  m: ["<b>Allegro</b> – żywo, z blaskiem.",
      "<b>fp</b>: zagraj mocno pierwszą nutę i natychmiast przejdź do <i>p</i>.",
      "<b>sf</b> w szybkich przebiegach – krótki akcent, bez zwalniania.",
      "Staccato w temacie lekko; nuty z łukiem w drugim temacie śpiewnie."],
  t: ["Gamy w dół: przekładaj 3. lub 4. palec nad kciukiem wcześnie, łokieć nie wystaje."],
  i: ["Przetworzenie i repriza: tę samą muzykę w reprizie zagraj świadomie, nie mechanicznie – szukaj drobnych różnic."]
},
"chopin-prel7": {
  m: ["<b>Andantino</b> – trochę żywiej niż andante; spokojny, ale wciąż taneczny (rytm mazurka).",
      "<b>p dolce</b> – słodko, miękko. Cała miniatura mieści się w małej skali dynamiki.",
      "Pedał wpisany przez Chopina na każdy dwutakt / takt – zmieniaj dokładnie tam, gdzie zmienia się harmonia.",
      "Rozłożone akordy (falista linia): rozkładaj szybko od dołu, górny dźwięk trafia na miarę."],
  t: ["Wielki akord w kulminacji: ułóż rękę przed graniem, dźwięk z ciężaru ramienia, nie z uderzenia."],
  i: ["Rytm ósemki z kropką + szesnastka ma być miękki – to wspomnienie tańca, nie marsz."]
},
"chopin-prel4": {
  m: ["<b>Largo</b> – bardzo wolno i szeroko. <b>p espressivo</b> – cicho, ale z wyrazem.",
      "<b>stretto</b> – przyspieszenie i zagęszczenie w kulminacji; potem <i>dim.</i> i powrót do spokoju.",
      "<b>smorzando</b> (zamierając) przed końcem – ciszej i wolniej; pauza z fermatą to część muzyki, wytrzymaj ją.",
      "Ostatnie akordy <i>pp</i>, bardzo powoli – każdy niech wybrzmi."],
  t: ["Akordy lewej ręki: palce stale na klawiszach, zmieniaj tylko ten, który się rusza – reszta jakby przyklejona."],
  i: ["Melodia ma mało nut – właśnie dlatego każda długa nuta musi „mówić”. Ozdobnik w melodii lekko, bez pośpiechu."]
},
"grieg-walc": {
  m: ["<b>Allegro moderato</b> – umiarkowanie żywo, walc o ludowym, lekko surowym charakterze.",
      "Staccato i akcenty w melodii – krótko, z charakterem; widełki na dwóch nutach jak westchnienie.",
      "Część A-dur – <i>dolce</i>, legato, cieplejszy dźwięk; wróć do staccato w powrocie tematu.",
      "Koda: <i>pp</i> i zwolnienie – nie przedłużaj nadmiernie."],
  t: ["Akordy na 2 i 3 lewej ręki zawsze lżejsze niż bas na 1."],
  i: ["Grieg to nie Chopin: mniej rubata, więcej prostoty i rytmu."]
},
"tchaik-dream": {
  m: ["Spokojne, umiarkowane tempo; melodia <i>cantabile</i>, akompaniament <i>p</i> lub <i>pp</i>.",
      "Długie widełki <i>cresc.</i> – planuj je na cały 8-taktowy łuk.",
      "<i>rit.</i> przy końcach fraz – zwalniaj w ostatnim takcie, nie wcześniej.",
      "Zakończenie <i>pp</i>, <i>morendo</i> – jakby sen się rozwiewał."],
  t: ["Nuty melodii, które mają łuk przez kreskę taktową, trzymaj pełną wartość – nie skracaj ich przy zmianie pedału."],
  i: ["Kulminacja to jedyny moment pełnego dźwięku – oszczędzaj <i>forte</i> właśnie na nią."]
},
"burg109-2": {
  m: ["<b>Leggiero</b> (jeśli w wydaniu) – lekko; dynamika zwykle <i>p</i>–<i>mf</i>.",
      "Łuki nad grupami szesnastek – grupa jako jeden gest, ostatnia nuta lżejsza.",
      "Akcenty tylko tam, gdzie są wpisane – reszta równa, „perlista”."],
  t: ["Pracuj nad równością: graj grupy z akcentem na kolejnych nutach (1., 2., 3., 4.), potem bez akcentów."],
  i: ["Perły mają lśnić – jasny, ale nie głośny dźwięk; więcej palców, mniej ramienia."]
},
"heller47-1": {
  m: ["Przeczytaj określenie tempa i charakteru nad pierwszym taktem – w etiudach Hellera zawsze mówi, jaki nastrój budować.",
      "Widełki w melodii (często ukrytej w figuracji) – prowadzą frazę; reszta figuracji ciszej.",
      "<i>rit.</i> i <i>a tempo</i> – zwolnienie przy końcu frazy i wyraźny powrót."],
  t: ["Kciuk w akordach łamanych gra lżej – nie robi akcentu przy zmianie pozycji."],
  i: ["Traktuj etiudę jak utwór liryczny – zaśpiewaj ukrytą melodię."]
},
"heller47-3": {
  m: ["Odczytaj tempo i charakter z nagłówka; zwykle śpiewnie mimo ruchu.",
      "Łuk nad figurą dzieloną między ręce – brzmi jak jedna ręka.",
      "Pedał krótki, zmieniany z harmonią; <i>dim.</i> na końcach fraz."],
  t: ["Ostatnia nuta jednej ręki i pierwsza drugiej – tej samej głośności."],
  i: ["Kulminację zaplanuj w jednym miejscu utworu, nie w każdej frazie."]
},
/* ---------- GRADE 7 ---------- */
"inv4": {
  m: ["Metrum 3/8 – licz „na raz” w takcie (ćwierćnuta z kropką), wtedy szesnastki płyną.",
      "Długie tryle na nutach trzymanych: od górnej nuty, równo, cały czas wartości – drugą ręką nie zwalniaj.",
      "Brak dynamiki w oryginale: zaplanuj ją z harmonią (moll – napięcie, kadencje w dur – rozjaśnienie)."],
  t: ["Tryl ćwicz najpierw w rytmie (np. 4 szesnastki), potem 6, potem swobodnie – zawsze na tle drugiej ręki."],
  i: ["Tam, gdzie jedna ręka trzyma długą nutę, druga gra temat – to on jest na pierwszym planie."]
},
"inv8": {
  m: ["Metrum 3/4, tempo żywe, bez oznaczenia w oryginale.",
      "Skoki tematu (akord rozłożony w górę) – non legato/staccato; szesnastki legato. Tak samo w obu rękach.",
      "Tryl w kadencji przed końcem od górnej nuty, krótko."],
  t: ["Gdy ręce grają ten sam motyw w odstępie taktu, słuchaj, czy artykulacja jest identyczna."],
  i: ["Kanon to rozmowa: druga ręka „powtarza” – niech nie przekrzykuje pierwszej."]
},
"inv1": {
  m: ["Brak tempa – umiarkowany, „mówiący” ruch.",
      "<b>Mordenty</b> (w źródłach przy ósemkach tematu): główna – dolna – główna, na miarę i krótko. Niektóre wydania mają też wersję z triolami – graj tę, która jest w Twoich nutach.",
      "Tryl w przedostatnim takcie: od górnej nuty, z zakończeniem."],
  t: ["Mordent ćwicz na stałym palcowaniu (np. 3-2-3), lekko, z palców."],
  i: ["Motyw w odwróceniu brzmi jak odpowiedź – zagraj go tym samym gestem, tylko „w lustrze”."]
},
"kv545-1": {
  m: ["<b>Allegro</b> – żywo, ale lekko i przejrzyście; puls na 4, frazy 2- i 4-taktowe.",
      "<i>f</i> i <i>p</i> nagle; brak <i>ff</i> – Mozartowskie <i>forte</i> jest pełne, nie ostre.",
      "Tryle (np. w drugim temacie) – od górnej nuty, z zakończeniem, w tempie.",
      "Łuki: ostatnia nuta frazy lekko odjęta, krótsza – „oddech” przed następną."],
  t: ["Gamy w przetworzeniu: zagraj je najpierw jako gamy z kciukiem bez akcentu, z metronomem."],
  i: ["Temat otwierający to śpiew – Alberti pod nim ma być jak smyczki grające <i>pp</i>."]
},
"clem36-6": {
  m: ["<b>Allegro con spirito</b> – żywo, z temperamentem.",
      "Wyraźne <i>f</i>/<i>p</i>; <b>sf</b> na akcentowanych nutach – krótko, z nadgarstka.",
      "Tryle i przednutniki krótko, na miarę.",
      "Staccato w oktawach lewej ręki – sprężyście, z nadgarstka, nie z ramienia."],
  t: ["Tercje w szybkim tempie: luźny nadgarstek, lekko „wahadłowy” ruch."],
  i: ["Najbardziej orkiestrowa sonatina – myśl: <i>forte</i> to tutti, <i>piano</i> to flet solo."]
},
"beet49-2": {
  m: ["<b>Allegro ma non troppo</b> – żywo, ale nie za szybko; alla breve, licz na 2.",
      "Triole w lewej ręce równe i ciche; w temacie akordowym <i>f</i> pełno, potem <i>p</i> od razu.",
      "Beethoven pisze <b>sf</b> i <b>fp</b> bardzo celowo – zaznacz je ołówkiem i wykonuj każdy.",
      "Przednutniki i tryle: lekko, na miarę."],
  t: ["Przejścia między triolami a ósemkami (rytm 3 kontra 2) ćwicz osobno, licząc na głos."],
  i: ["Drugi temat w D-dur śpiewnie, legato – kontrast do dziarskiego otwarcia."]
},
"chopin-prel6": {
  m: ["<b>Lento assai</b> – bardzo wolno.",
      "<b>sotto voce</b> / <i>p</i> – półgłosem; melodia w lewej ręce pełna, ale nie głośna.",
      "Widełki <i>cresc.</i>/<i>dim.</i> w melodii lewej ręki – oddech frazy.",
      "Zakończenie <i>pp</i>, smutno; ostatnie akordy powoli, bez gwałtownego puszczenia pedału."],
  t: ["Powtarzane akordy prawej ręki: klawisz do połowy wraca, palce nie odrywają się – „trzymaj” klawisze."],
  i: ["Utwór grano na pogrzebie Chopina – nie dramatyzuj, smutek jest cichy i godny."]
},
"chopin-prel20": {
  m: ["<b>Largo</b> – bardzo wolno, szeroko, jak chorał.",
      "<b>ff</b> pierwsza fraza → <b>p</b> druga → <b>pp</b> trzecia (powtórzenie) – trzy plany dźwiękowe to cały utwór.",
      "W drugiej frazie (i jej powtórzeniu) jest słynna wątpliwość: es czy e w jednym z akordów – zagraj tak, jak masz w swoim wydaniu, i posłuchaj różnicy.",
      "Ostatni akord pod fermatą – trzymaj aż wybrzmi; pedał puść powoli."],
  t: ["<i>ff</i> z ciężaru całej ręki i ramienia, zawsze z rozluźnionym nadgarstkiem po uderzeniu."],
  i: ["Rytm z kropką w każdej ćwierćnucie – nie skracaj go, to krok pochodu żałobnego."]
},
"chopin-maz-g": {
  m: ["<b>Cantabile</b> – śpiewnie; tempo mazurka, ale bez pośpiechu.",
      "Akcenty (&gt;) często na 2. lub 3. mierze – charakter mazurka; nie wyrównuj ich.",
      "Przednutniki i krótkie tryle: na miarę, lekko, zgodnie z rytmem tańca.",
      "Część środkowa w jasnej tonacji – inny kolor, często <i>dolce</i>."],
  t: ["Lewa ręka: bas na raz krótszy, akord lżejszy – bez „um-pa-pa” jak w walcu."],
  i: ["Rubato mazurkowe: lekko wydłużona 1. lub 2. miara taktu, tak jak w tańcu – posłuchaj polskich wykonawców."]
},
"grieg-elfin": {
  m: ["<b>Molto allegro</b> – bardzo szybko; w większości wydań <b>sempre staccato</b> i <i>pp</i> przez długi czas.",
      "Nagłe <i>f</i> lub akcenty – jak błysk; potem od razu wróć do <i>pp</i>.",
      "Końcowe takty znikają (<i>pp</i>, <i>dim.</i>) – elfy uciekają."],
  t: ["Staccato z palców (nie z ramienia), klawisz dotknięty tylko do połowy – tak zachowasz i tempo, i <i>pp</i>."],
  i: ["Psotny, fantastyczny charakter – liczy się lekkość, nie szybkość."]
},
"heller47-15": {
  m: ["Odczytaj tempo i charakter z nagłówka – to etiuda śpiewna, nie wirtuozowska.",
      "<i>cantabile</i>/<i>espressivo</i> w melodii, akompaniament <i>p</i>.",
      "<i>rit.</i> na końcach dużych fraz i <i>a tempo</i> – wyraźnie."],
  t: ["Melodia i akompaniament w jednej ręce: palce melodii z ciężarem, pozostałe ledwo dotykają."],
  i: ["Kulminacja to jeden punkt – do niego prowadź długie <i>cresc.</i>"]
},
"czerny636-1": {
  m: ["Tempo w nagłówku (często z metronomem Czernego) – to cel, nie start.",
      "Dynamika prosta (<i>f</i>, <i>p</i>, widełki) – pilnuj jej mimo koncentracji na palcach.",
      "Łuki nad grupami: grupa legato, bez akcentu na kciuku."],
  t: ["Przy powtarzanych figurach zmieniaj palcowanie tylko wtedy, gdy wpisano inne."],
  i: ["Nawet etiuda ma frazę: zagraj ją jak sonatinę, nie jak ćwiczenie."]
},
/* ---------- GRADE 8 ---------- */
"inv13": {
  m: ["Brak tempa w oryginale – umiarkowanie, w poczuciu ćwierćnuty, nie szesnastki.",
      "Tryle i ozdobniki przy kadencjach od górnej nuty.",
      "Dynamika z harmonii: ciąg kwintowy (sekwencje) prowadź z kierunkiem, kadencje z oddechem."],
  t: ["Ósemki lewej ręki w drugiej części non legato, szesnastki legato – stała artykulacja."],
  i: ["Akordy zmniejszone przed końcem – momenty największego napięcia, zagraj je z czasem."]
},
"wtk846": {
  m: ["Brak tempa i dynamiki u Bacha – wszystko wynika z harmonii.",
      "Długi punkt organowy na G (przed końcem) – dominanta: napięcie rośnie, nie spada.",
      "Ostatnie takty na pedale C – rozluźnienie; końcowy akord bez fermaty, ale z czasem na wybrzmienie."],
  t: ["Pierwsze dwie nuty każdej grupy (lewa ręka) trzymaj palcami – to „bas i tenor”, nie tylko figura."],
  i: ["Zaplanuj dynamikę dla każdego taktu w skali 1–5 według napięcia akordu – i graj według tej mapy."]
},
"inv14": {
  m: ["Brak tempa w oryginale – spokojnie, bo trzydziestodwójki muszą być eleganckie, nie pośpieszne.",
      "Ozdobniki (tryle, mordenty) liczne – od górnej nuty, na miarę; lepiej krótszy tryl, ale równy.",
      "Dynamika z kierunku linii; kadencje lekko oddechem."],
  t: ["Trzydziestodwójki ćwicz w grupach do pierwszej nuty następnej miary (zatrzymanie na niej)."],
  i: ["Ozdobny, wytworny charakter – wdzięk ważniejszy niż blask."]
},
"beet49-1": {
  m: ["<b>Andante</b>, 2/4 – idącym krokiem, nie za wolno; licz ósemki tylko w trudnych miejscach.",
      "<i>p</i> na początku – smutna, prosta melodia; <b>sf</b> Beethovena to bolesne akcenty.",
      "<i>cresc.</i> prowadzące do <i>f</i> i nagłe <i>p</i> po nim – typowy beethovenowski kontrast; nie zaczynaj <i>p</i> stopniowo.",
      "Ozdobniki w melodii (obiegniki, przednutniki) – lekko, w czasie."],
  t: ["Szesnastki akompaniamentu w lewej ręce bardzo równe i ciche – ćwicz je z metronomem."],
  i: ["Drugi temat (B-dur) – chwilowe pocieszenie; repriza w g-moll bardziej rezygnacyjna."]
},
"kv545-3": {
  m: ["<b>Rondo. Allegretto</b> – lekko żywo; alla breve, licz na 2.",
      "Staccato i krótkie łuki 2-nutowe w temacie – figlarnie, ostatnia nuta pod łukiem krótka.",
      "<i>f</i>/<i>p</i> nagłe; nie dodawaj romantycznych crescend.",
      "Tryle i przednutniki lekko, od górnej nuty."],
  t: ["Powtarzane dźwięki zmieniaj palcami (np. 3-2-1), nie jednym palcem."],
  i: ["Epizody w molu są krótkie – lekko zaciemnij barwę, ale nie tragicznie."]
},
"chopin-walc-h": {
  m: ["<b>Moderato</b> – umiarkowany, melancholijny walc.",
      "Przednutniki i ozdobne nutki w melodii na miarę, z basem; obiegniki (∾) miękko.",
      "Widełki i <i>rubato</i> w melodii, ale lewa ręka utrzymuje takt 3/4.",
      "Zwróć uwagę na <i>dolce</i>, <i>sostenuto</i> i <i>Ped.</i> w Twoim wydaniu – Chopin dokładnie pedalizował walce."],
  t: ["Skoki basu przygotuj okiem i ręką już w trakcie ostatniego akordu taktu."],
  i: ["Środkowa część w H-dur – nagle jaśniej i bardziej prosto, mniej rubata."]
},
"chopin-maz-b": {
  m: ["<b>Vivace</b> – żywo; akcenty &gt; i <b>fz</b> na słabych częściach taktu to serce mazurka.",
      "Ozdobniki (przednutniki, tryle) krótko, energicznie, na miarę.",
      "Część środkowa: bas burdonowy (kwinta trzymana jak dudy) – <i>sotto voce</i>, z lekko „egzotyczną” melodią.",
      "<i>Ped.</i> krótko na akcentach – nie zamazuj rytmu."],
  t: ["Skoki prawej ręki w temacie: nie patrz na klawiaturę za późno – oko prowadzi rękę."],
  i: ["To radosny wiejski taniec – zadziorność ważniejsza niż elegancja salonowa."]
},
"chopin-noct-cis": {
  m: ["<b>Lento con gran espressione</b> – wolno, z wielką ekspresją.",
      "Długie biegniki drobnymi nutkami (np. kilkadziesiąt nut w czasie jednego akordu) – rozpocznij spokojnie, przyspiesz w środku, zwolnij przed celem; lewa ręka czeka.",
      "Tryle w melodii od głównej nuty lub od górnej – zgodnie z Twoim wydaniem; zawsze śpiewnie.",
      "Zakończenie: wznoszący się biegnik <i>pp</i> i ostatni akord – niech wybrzmi do ciszy."],
  t: ["Biegniki ćwicz w grupach przypisanych do konkretnych akordów lewej ręki – podziel je ołówkiem na „paczki”."],
  i: ["Środek z cytatem z Koncertu f-moll (i fragmentem pieśni „Życzenie”) – lżej, jak wspomnienie innego świata."]
},
"czerny299-1": {
  m: ["Tempo Czernego (metronom w nagłówku) jest bardzo szybkie – to cel na koniec, nie na start.",
      "Dynamika: <i>f</i>/<i>p</i> i widełki – grupy w górę lekko rosną, w dół maleją.",
      "Łuki nad gamami – jedna linia legato, bez akcentów przy zmianie pozycji."],
  t: ["Kciuk podkładaj od razu po zagraniu, nie w ostatniej chwili – pod dłonią „czeka” na swój klawisz."],
  i: ["Klarowność i blask – lepiej wolniej, ale czysto i z dynamiką."]
},
"czerny299-2": {
  m: ["Tempo z nagłówka; <i>leggiero</i> w przebiegach.",
      "Akordy lewej ręki krótko (staccato), <i>p</i> – nie przykrywaj przebiegów.",
      "Widełki idą za kształtem przebiegu; akcenty tylko tam, gdzie są."],
  t: ["Gdy przebieg zmienia kierunek, nadgarstek prowadzi zmianę – palce nie muszą się wyciągać."],
  i: ["Myśl w długich łukach (4–8 taktów) – etiuda ma swoją kulminację."]
},
"czerny299-3": {
  m: ["Tempo z nagłówka; <i>legato</i> akordów łamanych.",
      "Widełki obejmują całe fale akordów – dźwięk rośnie w górę, maleje w dół.",
      "<i>Ped.</i> (jeśli wpisany) zmieniaj z harmonią – akordy łamane nie mogą się zlewać."],
  t: ["Rozciągnięcie ręki ma trwać chwilę – po każdej grupie dłoń wraca do naturalnego kształtu."],
  i: ["Pełny dźwięk bez forsowania – z ciężaru, nie z siły palców."]
}
};
