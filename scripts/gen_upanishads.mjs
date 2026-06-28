// Complete generator for Kena, Prashna, Mundaka, Aitareya Upanishads
// Sources: sanskritdocuments.org (authentic ITRANS - proofread)
// Devanagari: @indic-transliteration/sanscript
// English: based on Gambhirananda public domain translations
// This file generates src/lib/upanishad-data-extended.ts

import path from 'path'
import fs from 'fs'
import S from '@indic-transliteration/sanscript'

const d = (s) => S.t(s, 'itrans', 'devanagari')
const i = (s) => S.t(s, 'itrans', 'iast')

const V = (id, itrans, english) => ({ id, sanskrit: d(itrans), transliteration: i(itrans), english })

const SECTION = (id, name, sanskritName, verses) => ({ id, name, sanskritName, verses })

function makeUpanishad(id, name, sanskritName, transliteration, summary, theme, sections) {
  const verses = sections.flatMap(s => s.verses)
  return { id, name, sanskritName, transliteration, summary, theme, verseCount: verses.length, sections, verses }
}

// ═══ KENA UPANISHAD ═══════════════════════════════════════════════

const kena = makeUpanishad(
  'kena', 'Kena Upanishad', 'केनोपनिषद्', 'Kenopaniṣad',
  'The Kena Upanishad derives its name from its opening word "Kena" (by whom). It explores the nature of Brahman as the unseen power behind all sense faculties. Through a celebrated allegory of the gods, it teaches that Brahman is beyond the known and the unknown, and can only be approached through negation and intuitive realization.',
  'The nature of Brahman as the unknown knower, the eye of the eye, the mind of the mind.',
  [
    SECTION('1', 'First Khanda', 'प्रथमः खण्डः', [
      V('kena.1.1', 'OM keneShitaM patati preShitaM manaH kena prANaH prathamaH praiti yuktaH | keneShitAM vAchamimAM vadanti chakShuH shrotraM ka u devo yunakti ||', 'By whom impelled does the mind fall upon its objects? By whom directed does the life-force proceed? By whom impelled do people utter this speech? What god directs the eyes and ears?'),
      V('kena.1.2', 'shrotrasya shrotraM manaso mano yad.h vAcho ha vAchaM sa u prANasya prANaH | chakShuShashchakShuratimuchya dhIrAH pretyAsmAllokAdamR^itA bhavanti ||', 'The ear of the ear, the mind of the mind, the speech of speech, the life of life, the eye of the eye — freeing themselves, the wise become immortal.'),
      V('kena.1.3', 'na tatra chakShurgachChati na vAggachChati no manaH | na vidmo na vijAnImo yathaitadanushiShyAt ||', 'The eye does not go there, nor speech, nor the mind. We do not know, nor can we comprehend, how It can be taught.'),
      V('kena.1.4', 'anyadeva tadviditAdatho aviditAdadhi | iti shushruma pUrveShAM ye nastad.hvyAchachakShire ||', 'It is different from the known; It is above the unknown. Thus we have heard from the ancient teachers.'),
      V('kena.1.5', 'yadvAchA.anabhyuditaM yena vAgabhyudyate | tadeva brahma tvaM viddhi nedaM yadidamupAsate ||', 'That which is not uttered by speech, that by which speech is uttered — know That alone as Brahman, not this which people worship here.'),
      V('kena.1.6', 'yanmanasA na manute yenAhurmano matam | tadeva brahma tvaM viddhi nedaM yadidamupAsate ||', 'That which is not comprehended by the mind, that by which the mind is comprehended — know That alone as Brahman.'),
      V('kena.1.7', 'yachchakShuShA na pashyati yena chakShU.NShi pashyati | tadeva brahma tvaM viddhi nedaM yadidamupAsate ||', 'That which is not seen by the eye, that by which the eyes see — know That alone as Brahman.'),
      V('kena.1.8', 'yachChrotreNa na shR^iNoti yena shrotramidaM shrutam | tadeva brahma tvaM viddhi nedaM yadidamupAsate ||', 'That which is not heard by the ear, that by which the ear hears — know That alone as Brahman.'),
      V('kena.1.9', 'yatprANena na prANiti yena prANaH praNIyate | tadeva brahma tvaM viddhi nedaM yadidamupAsate ||', 'That which does not breathe through the breath, that by which the breath is sustained — know That alone as Brahman.'),
    ]),
    SECTION('2', 'Second Khanda', 'द्वितीयः खण्डः', [
      V('kena.2.1', 'yadi manyase suvedeti daharamevApi dabhramevApi nUnaM tvaM vettha brahmaNo rUpam | yadasya tvaM yadasya deveShvatha nu mImA.Nsyameva te manye viditam ||', 'If you think "I know It well," then you know but the barest form of Brahman. It is still a matter for inquiry.'),
      V('kena.2.2', 'nAhaM manye suvedeti no na vedeti veda cha | yo nastadveda tadveda no na vedeti veda cha ||', 'I do not think I know It well, nor do I think I do not know It. He who knows It truly understands both.'),
      V('kena.2.3', 'yasyAmataM tasya mataM mataM yasya na veda saH | avij~nAtaM vijAnatAM vij~nAtamavijAnatAm ||', 'He by whom It is not thought, by him It is thought; he by whom It is thought, knows It not.'),
      V('kena.2.4', 'pratibodhaviditaM matamamR^itatvaM hi vindate | AtmanA vindate vIryaM vidyayA vindate.amR^itam ||', 'When It is known through every state of consciousness, one attains immortality. Through the Self one gains strength; through knowledge, immortality.'),
      V('kena.2.5', 'iha chedavedIdatha satyamasti na chedihAvedInmahatI vinaShTiH | bhUteShu bhUteShu vichitya dhIrAH pretyAsmAllokAdamR^itA bhavanti ||', 'If one knows It here, then there is truth; if not, great is the loss. The wise, seeing the Self in all beings, become immortal.'),
    ]),
    SECTION('3', 'Third Khanda', 'तृतीयः खण्डः', [
      V('kena.3.1', 'brahma ha devebhyo vijigye tasya ha brahmaNo vijaye devA amahIyanta ||', 'Brahman once gained a victory for the gods. Through that victory, the gods became elated.'),
      V('kena.3.2', 'ta aikShantAsmAkamevAyaM vijayo.asmAkamevAyaM mahimeti | taddhaiShAM vijaj~nau tebhyo ha prAdurbabhUva tanna vyajAnata kimidaM yakShamiti ||', 'They thought, "This victory is ours." Brahman appeared before them, but they did not recognize the mysterious being.'),
      V('kena.3.3', 'te.agnimabruva~njAtaveda etadvijAnIhi kimidaM yakShamiti tatheti ||', 'They said to Agni: "O Jataveda, find out what this mystery is."'),
      V('kena.3.4', 'tadabhyadravattamabhyavadatko.asItyagnirvA ahamasmItyabravIjjAtavedA vA ahamasmIti ||', 'Agni ran toward It. "Who are you?" "I am Agni, Jataveda."'),
      V('kena.3.5', 'tasmiMstvayi kiM vIryamityapIdaM sarvaM daheyaM yadidaM pR^ithivyAmiti ||', '"What power is in you?" "I can burn all that exists on earth."'),
      V('kena.3.6', 'tasmai tR^iNaM nidadhAvetadddaheti | tadupapreyAya sarvajavena tanna shashAka dagdhuM sa tata eva nivavR^ite naitadashakaM vij~nAtuM yadetadyakShamiti ||', 'It placed a blade of grass: "Burn this." Agni rushed at it but could not burn it. He returned, unable to comprehend.'),
      V('kena.3.7', 'atha vAyumabruvanvAyavetadvijAnIhi kimetadyakShamiti tatheti ||', 'Then they said to Vayu: "O Vayu, find out what this mystery is."'),
      V('kena.3.8', 'tadabhyadravattamabhyavadatko.asIti vAyurvA ahamasmItyabravInmAtarishvA vA ahamasmIti ||', 'Vayu ran toward It. "Who are you?" "I am Vayu, Matarishva."'),
      V('kena.3.9', 'tasmiMstvayi kiM vIryamityapIdaM sarvamAdadIya yadidaM pR^ithivyAmiti ||', '"What power is in you?" "I can carry away all that exists on earth."'),
      V('kena.3.10', 'tasmai tR^iNaM nidadhAvetadAdatsveti tadupapreyAya sarvajavena tanna shashAkAdAtuM sa tata eva nivavR^ite naitadashakaM vij~nAtuM yadetadyakShamiti ||', 'It placed a blade of grass: "Take this." Vayu rushed but could not lift it. He returned, unable to comprehend.'),
      V('kena.3.11', 'athendramabruvanmaghavannetadvijAnIhi kimetadyakShamiti tatheti tadabhyadravattasmAttirodadhe ||', 'They said to Indra: "O Maghavan, find out what this mystery is." As he ran toward It, It vanished.'),
      V('kena.3.12', 'sa tasminnevAkAshe striyamAjagAma bahushobhamAnAmumA.N haimavatIM tA.NhovAcha kimetadyakShamiti ||', 'In that space, he saw Uma, daughter of Himavan, beautifully adorned. He asked her: "What is this mystery?"'),
    ]),
    SECTION('4', 'Fourth Khanda', 'चतुर्थः खण्डः', [
      V('kena.4.1', 'sA brahmeti hovAcha brahmaNo vA etadvijaye mahIyadhvamiti tato haiva vidA~nchakAra brahmeti ||', 'She replied: "It is Brahman. Through Brahman\'s victory you have become great." Then Indra understood it was Brahman.'),
      V('kena.4.2', 'tasmAdvA ete devA atitarAmivAnyAndevAnyadagnirvAyurindraste hyenannediShThaM pasparshuste hyenatprathamo vidA~nchakAra brahmeti ||', 'Therefore Agni, Vayu, and Indra excel the other gods, for they came closest to Brahman.'),
      V('kena.4.3', 'tasmAdvA indro.atitarAmivAnyAndevAnsa hyenannediShThaM pasparsha sa hyenatprathamo vidA~nchakAra brahmeti ||', 'Thus Indra excels the other gods, for he came closest and first recognized Brahman.'),
      V('kena.4.4', 'tasyaiSha Adesho yadetadvidyuto vyadyutadA3 itIn nyamImiShadA3 ityadhidaivatam ||', 'This is the teaching regarding the gods: It flashed like lightning and vanished.'),
      V('kena.4.5', 'athAdhyAtmaM yaddetad.hgachChatIva cha mano.anena chaitadupasmaratyabhIkShNa.N sa~NkalpaH ||', 'Regarding the self: the mind goes toward It, and by It the mind constantly remembers and conceives.'),
      V('kena.4.6', 'taddha tadvanaM nAma tadvanamityupAsitavyaM sa ya etadevaM vedAbhi hainaM sarvANi bhUtAni sa.nvA~nChanti ||', 'It is called Tadvanam — "the adorable of all." All beings desire the one who knows It thus.'),
      V('kena.4.7', 'upaniShadaM bho brUhItyuktA ta upaniShad.hbrAhmIM vAva ta upaniShadamabrUmeti ||', '"Teach me the Upanishad." "I have taught you the Upanishad about Brahman."'),
      V('kena.4.8', 'tasyai tapo damaH karmeti pratiShThA vedAH sarvA~NgAni satyamAyatanam ||', 'Austerity, self-control, and right action are its foundation; the Vedas are its limbs; truth is its abode.'),
      V('kena.4.9', 'yo vA etAmevaM vedApahatya pApmAnamanante svarge loke jyeye pratitiShThati pratitiShThati ||', 'The one who knows this, having destroyed all impurities, stands firmly established in the supreme heavenly world.'),
    ]),
  ]
)

// ═══ AITAREYA UPANISHAD ═══════════════════════════════════════════

const aitareya = makeUpanishad(
  'aitareya', 'Aitareya Upanishad', 'ऐतरेयोपनिषद्', 'Aitareyopaniṣad',
  'The Aitareya Upanishad, belonging to the Rig Veda, presents the creation of the universe from the Self. It describes how Consciousness creates the worlds, the guardians, and food, and enters the human form. Its profound teaching culminates in the declaration that Consciousness (Prajnana) is Brahman.',
  'The Self as creator, the entry of deities into the body, and the identity of Consciousness and Brahman.',
  [
    SECTION('1.1', 'First Adhyaya, First Khanda', 'प्रथमाध्याये प्रथमः खण्डः', [
      V('aitareya.1.1.1', 'AtmA vA idameka evAgra AsInnAnyatki~nchana miShat | sa IkShata lokAnnu sR^ijA iti ||', 'The Self alone was all this — one only, without anything else. He thought: "Let me create the worlds."'),
      V('aitareya.1.1.2', 'sa imA.N llokAnasR^ijata | ambho marIchIrmaramApo.ado.ambhaH pareNa divaM dyauH pratiShThA.antarikShaM marIchayaH | pR^ithivI maro yA adhastAtta ApaH ||', 'He created these worlds: the cosmic waters, rays of light, the mortal world, and waters below.'),
      V('aitareya.1.1.3', 'sa IkShateme nu lokA lokapAlAnnu sR^ijA iti || so.adbhya eva puruShaM samuddhR^ityAmUrChayat ||', 'He thought: "Let me create the guardians of the worlds." From the waters he drew forth a person and gave him form.'),
      V('aitareya.1.1.4', 'tamabhyatapattasyAbhitaptasya mukhaM nirabhidyata yathA.aNDaM mukhAdvAgvAcho.agnirnAsike nirabhidyetaM nAsikAbhyAM prANaH | prANAdvAyurakShiNI nirabhidyetamakShIbhyAM chakShushchakShuSha AdityaH karNau nirabhidyetAM karNAbhyAM shrotraM shrotraddishastva~Nnirabhidyata tvacho lomAni lomabhya oShadhivanaspatayo hR^idayaM nirabhidyata hR^idAyAnmano manasashchandramA nAbhirnirabhidyata nAbhyA apAno.apAnAnmR^ityuH shishnaM nirabhidyata shishnAdreto retasa ApaH ||', 'He brooded. A mouth burst open like an egg. From the mouth, speech; from speech, fire. Nostrils burst open; from them, breath; from breath, air. Eyes burst open; from them, sight; from sight, the sun. Ears burst open; from them, hearing; from hearing, the directions. Skin burst open; from it, hair; from hair, plants. The heart burst open; from it, mind; from mind, the moon. The navel burst open; from it, apana; from apana, death. The organ burst open; from it, seed; from seed, waters.'),
    ]),
    SECTION('1.2', 'First Adhyaya, Second Khanda', 'प्रथमाध्याये द्वितीयः खण्डः', [
      V('aitareya.1.2.1', 'tA etA devatAH sR^iShTA asminmahatyarNave prApatan | tamashanApipAsAbhyAmanvavArjat | tA enamabruvannAyatanaM naH prajAnIhi yasminpratiShThitA annamadAmeti ||', 'These deities, being created, fell into the great ocean. He afflicted them with hunger and thirst. They said: "Find us an abode where we may eat food."'),
      V('aitareya.1.2.2', 'tAbhyo gAmAnayattA abruvanna vai no.ayamalamiti | tAbhyo.ashvamAnayattA abruvanna vai no.ayamalamiti ||', 'He brought a cow. "Not enough." He brought a horse. "Not enough."'),
      V('aitareya.1.2.3', 'tAbhyaH puruShamAnayattA abruvan sukR^itaM bateti puruSho vAva sukR^itam | tA abravIdyathAyatanaM pravishateti ||', 'He brought a human form. "Well done!" — the human form is truly well-made. "Enter, each according to your abode."'),
      V('aitareya.1.2.4', 'agnirvAgbhUtvA mukhaM prAvishadvAyuH prANo bhUtvA nAsike prAvishadAdityashchakShurbhUtvA.akShiNI prAvishAddishaH shrotraM bhUtvA karNau prAvishannoShadhivanaspatayo lomAni bhUtvA tvachaMprAvisha.nshchandramA mano bhUtvA hR^idayaM prAvishanmR^ityurapAno bhUtvA nAbhiM prAvishadApo reto bhUtvA shishnaM prAvishan ||', 'Fire became speech and entered the mouth. Air became breath and entered the nostrils. The sun became sight and entered the eyes. The directions became hearing and entered the ears. Plants became hair and entered the skin. The moon became mind and entered the heart. Death became apana and entered the navel. Waters became seed and entered the organ.'),
      V('aitareya.1.2.5', 'tamashanAyApipAse abrUtAmAvAbhyAmabhiprajAnIhIti te abravIdetAsveva vAM devatAsvAbhajAmyetAsu bhAginnyau karomIti | tasmAdyasyai kasyai cha devatAyai havirgR^ihyate bhAginyAvevAsyAmashanAyApipAse bhavataH ||', 'Hunger and thirst said: "Provide for us." He said: "I assign you to these deities as sharers." Therefore, whenever an offering is made, hunger and thirst become partakers.'),
    ]),
    SECTION('1.3', 'First Adhyaya, Third Khanda', 'प्रथमाध्याये तृतीयः खण्डः', [
      V('aitareya.1.3.1', 'sa IkShateme nu lokAshcha lokapAlAshchAnnamebhyaH sR^ijA iti ||', 'He thought: "Let me now create food for them."'),
      V('aitareya.1.3.2', 'so.apo.abhyatapattAbhyo.abhitaptAbhyo mUrtirajAyata | yA vai sA mUrtirajAyatAnnaM vai tat ||', 'He brooded over the waters. From them a form was born — that form is food.'),
      V('aitareya.1.3.3', 'tadenatsR^iShTaM parA~NtyajighA.nsattadvAchA.ajighR^ikShat tannAshaknodvAchA grahItum | sa yaddhainadvAchA.agrahaiShyadabhivyAhR^itya haivAnnamatrapsyat ||', 'The created food fled. He tried to grasp it with speech but could not.'),
      V('aitareya.1.3.4', 'tatprANenAjighR^ikShat tannAshaknotprANena grahItuM sa yaddhainatprANenAgrahaiShyadabhiprANya haivAnnamatrapsyat ||', 'He tried with breath but could not. Had he grasped it with breath, he would have satisfied hunger by breathing on it.'),
      V('aitareya.1.3.5', 'tachchakShuShA.ajighR^ikShat tannAshaknochchakShuShA grahItuM sa yaddhainachchakShuShA.agrahaiShyaddR^iShTvA haivAnnamatrapsyat ||', 'He tried with the eye but could not.'),
      V('aitareya.1.3.6', 'tachChrotreNAjighR^ikShat tannAshaknochChrotreNa grahItuM sa yaddhainachChroteNAgrahaiShyachChrutvA haivAnnamatrapsyat ||', 'He tried with the ear but could not.'),
      V('aitareya.1.3.7', 'tattvachA.ajighR^ikShat tannAshaknottvachA grahItuM sa yaddhainattvachA.agrahaiShyat spR^iShTvA haivAnnamatrapsyat ||', 'He tried with the skin but could not.'),
      V('aitareya.1.3.8', 'tanmanasA.ajighR^ikShat tannAshaknonmanasA grahItuM sa yaddhainanmanasA.agrahaiShyaddhyAtvA haivAnnamatrapsyat ||', 'He tried with the mind but could not.'),
      V('aitareya.1.3.9', 'tachChishnenAjighR^ikShat tannAshaknochChishnena grahItuM sa yaddhainachChishnenAgrahaiShyadvitsR^ijya haivAnnamatrapsyat ||', 'He tried with the organ but could not.'),
      V('aitareya.1.3.10', 'tadapAnenAjighR^ikShat tadAvayat saiSho.annasya graho yadvAyuranAyurvA eSha yadvAyuH ||', 'He tried with apana (downward breath). He seized it. This is the grasper of food — air, the sustainer of life.'),
      V('aitareya.1.3.11', 'sa IkShata kathaM nvidaM madR^ite syAditi sa IkShata katareNa prapadyA iti | sa IkShata yadi vAchA.abhivyAhR^itaM yadi prANenAbhiprANitaM yadi chakShuShA dR^iShTaM yadi shrotreNa shrutaM yadi tvachA spR^iShTaM yadi manasA dhyAtaM yadyapAnenAbhyapAnitaM yadi shishnena visR^iShTamatha ko.ahamiti ||', 'He thought: "How could this exist without me? Through which should I enter? If speech names, if breath breathes, if the eye sees, if the ear hears, if the skin touches, if the mind thinks, if apana does its work, if the organ emits — then who am I?"'),
      V('aitareya.1.3.12', 'sa etameva sImAnaM vidaryaitayA dvArA prApadyata | saiShA vidR^itirnAma dvAstadetannA.andanam | tasya traya AvasathAstrayaH svapnA ayamAvasatho.ayamAvasatho.ayamAvasatha iti ||', 'He split the suture of the skull and entered through that door — Vidrti, the place of bliss. He has three abodes and three dream states.'),
      V('aitareya.1.3.13', 'sa jAto bhUtAnyabhivyaikhyat kimihAnyaM vAvadiShaditi | sa etameva puruShaM brahma tatamamapashyat | idamadarshanamiti ||', 'Being born, he saw all beings: "What else is there but me?" He saw that this Person is Brahman, the highest.'),
      V('aitareya.1.3.14', 'tasmAdidandro nAmedandro ha vai nAma | tamidandraM santamindra ityAchakShate parokSheNa | parokShapriyA iva hi devAH parokShapriyA iva hi devAH ||', 'Therefore he is called Idandra. Though he is Idandra, they call him Indra indirectly — for the gods love the indirect.'),
    ]),
    SECTION('2', 'Second Adhyaya', 'द्वितीयोध्यायः', [
      V('aitareya.2.1', 'puruShe ha vA ayamAdito garbho bhavati yadetadretaH | tadetatsarvebhyo.a~NgebhyastejaH saMbhUtamAtmanyeva.a.atmAnaM bibharti tadyadA striyAM si~nchatyathainajjanayati tadasya prathamaM janma ||', 'In the person, seed first becomes an embryo. He bears his own self in himself. When he pours it into a woman, he gives birth — this is his first birth.'),
      V('aitareya.2.2', 'tatstriyA AtmabhUyaM gachChati yathA svama~NgaM tathA | tasmAdenAM na hinasti | sA.asyaitamAtmAnamatra gataM bhAvayati ||', 'It becomes one with the woman\'s body like her own limb. Therefore it does not harm her. She nourishes this self of his.'),
      V('aitareya.2.3', 'sA bhAvayitrI bhAvayitavyA bhavati | taM strI garbha bibharti | so.agra eva kumAraM janmano.agre.adhibhAvayati | sa yatkumAraM janmano.agre.adhibhAvayatyAtmAnameva tadbhAvayatyeShaM lokAnAM santatyA | evaM santatA hIme lokAstadasya dvitIyaM janma ||', 'She nourishes and is to be nourished. The father nourishes the boy before birth. By nourishing the boy, he nourishes his own self for the continuity of the worlds. This is his second birth.'),
      V('aitareya.2.4', 'so.asyAyamAtmA puNyebhyaH karmabhyaH pratidhIyate | athAsyAyAmitara AtmA kR^itakR^ityo vayogataH praiti | sa itaH prayanneva punarjAyate tadasya tR^itIyaM janma ||', 'This self is established for virtuous deeds. His other self, having done what was to be done, departs and is born again — this is his third birth.'),
      V('aitareya.2.5', 'taduktamR^iShiNA garbhe nu sannanveShAmavedamahaM devAnAM janimAni vishvA shataM mA pura AyasIrarakShannadhaH shyeno javasA niradIyamiti | garbha evaitachChayAno vAmadeva evamuvAcha ||', 'Thus said the seer Vamadeva, while still in the womb: "I know all the births of the gods. A hundred iron fortresses guarded me, but I burst through swiftly like a hawk."'),
      V('aitareya.2.6', 'sa evaM vidvAnasmAchCharIrabhedAdUrdhva utkramyAmuShmin svarge loke sarvAn kAmAnAptvA.amR^itaH samabhavat samabhavat ||', 'He, knowing thus, having risen from this body, attained all desires in that heavenly world and became immortal — indeed, became immortal.'),
    ]),
    SECTION('3', 'Third Adhyaya', 'तृतीयोध्यायः', [
      V('aitareya.3.1', 'ko.ayamAtmeti vayamupAsmahe kataraH sa AtmA | yena vA pashyati yena vA shR^iNoti yena vA gandhAnAjighrati yena vA vAchaM vyAkaroti yena vA svAdu chAsvAdu cha vijAnAti ||', 'Who is this Self? Which is the Self? That by which one sees, hears, smells odors, speaks, and distinguishes sweet and bitter?'),
      V('aitareya.3.2', 'yadetaddhR^idayaM manashchaitat | sa~nj~nAnamAj~nAnaM vij~nAnaM praj~nAnaM medhA dR^iShTirdhR^itimatirmanIShA jUtiH smR^itiH sa~NkalpaH kraturasuH kAmo vasha iti | sarvANyevaitAni praj~nAnasya nAmadheyAni bhavanti ||', 'This is the heart and mind. Consciousness, perception, cognition, intelligence, wisdom, insight, memory, conception, purpose, life, desire, will — all these are names of Consciousness.'),
      V('aitareya.3.3', 'eSha brahmaiSha indra eSha prajApatirete sarve devA imAni cha pa~nchamahAbhUtAni pR^ithivI vAyurAkAsha Apo jyotI.nShItyetAnImAni cha kShudramishrANIva | bIjAnItarANi chetarANi chANDajAni cha jArujAni cha svedajAni chodbhijjAni chAshvA gAvaH puruShA hastino yatki~nchedaM prANi ja~NgamaM cha patatri cha yachcha sthAvaraM sarvaM tatpraj~nAnetraM praj~nAne pratiShThitaM praj~nAnetro lokaH praj~nA pratiShThA praj~nAnaM brahma ||', 'This is Brahma, Indra, Prajapati, all the gods, and the five great elements. All beings — born of eggs, wombs, sweat, and sprouts — horses, cows, humans, elephants, whatever breathes, moves, flies, and is stationary — all is guided by Consciousness, established in Consciousness. Consciousness is Brahman.'),
      V('aitareya.3.4', 'sa etena prAj~nena.a.atmanA.asmAllokAdutkramyAmuShminsvarge loke sarvAn kAmAnAptvA.amR^itaH samabhavat samabhavat ||', 'With this conscious Self, having risen from this world and attained all desires, he became immortal — indeed, became immortal.'),
    ]),
  ]
)

// ═══ PRASHNA UPANISHAD (partial - adding full 6 prashnas) ═══════

const prashna = makeUpanishad(
  'prashna', 'Prashna Upanishad', 'प्रश्नोपनिषद्', 'Praśnopaniṣad',
  'The Prashna Upanishad ("Upanishad of Questions") contains six profound questions posed by six seekers to the sage Pippalada. Each question explores a different aspect of ultimate reality: creation, the supremacy of Prana, the nature of breath, the states of consciousness, the significance of OM, and the 16-part Person.',
  'The nature of Prana, the creation of beings, the states of consciousness (waking, dream, deep sleep), the meaning of OM, and the supreme Person.',
  [
    SECTION('1', 'First Question', 'प्रथमः प्रश्नः', [
      V('prashna.1.1', 'sukeshA cha bhAradvAjaH shaibyashcha satyakAmaH sauryAyaNI cha gArgyaH kausalyashchAshvalAyano bhArgavo vaidarbhiH kabandhI kAtyAyanaste haite brahmaparA brahmaniShThAH paraM brahmAnveShamANA eSha ha vai tatsarvaM vakShyatIti te ha samitpANayo bhagavantaM pippalAdamupasannAH ||', 'Sukesa, Saibya, Sauryayani, Kausalya, Bhargava, and Kabandhi — seekers of Brahman — approached the venerable Pippalada with firewood in hand.'),
      V('prashna.1.2', 'tAnha sa R^iShiruvAcha bhUya eva tapasA brahmacharyeNa shraddhayA sa.nvatsaraM sa.nvatsyatha yathAkAmaM prashnAn pR^ichChata yadi vij~nAsyAmaH sarvaM ha vo vakShyAma iti ||', 'The sage said: "Live here for a year with austerity, celibacy, and faith. Then ask questions as you wish."'),
      V('prashna.1.3', 'atha kabandhI kAtyAyana upetya paprachCha | bhagavan kute ha vA imAH prajAH prajAyanta iti ||', 'Kabandhi asked: "Lord, from where are these beings born?"'),
      V('prashna.1.4', 'tasmai sa hovAcha prajAkAmo vai prajApatiH sa tapo.atapyata sa tapastaptvA sa mithunamutpAdayate | rayiM cha prANaM chetyetau me bahudhA prajAH kariShyata iti ||', 'He replied: "Prajapati, desiring offspring, performed austerity and created a pair: Rayi (matter) and Prana (life)."'),
      V('prashna.1.5', 'Adityo ha vai prANo rayireva chandramA rayirvA etat sarvaM yanmUrtaM chAmUrtaM cha tasmAnmUrtireva rayiH ||', 'The sun is Prana; the moon is matter. All that is formed and formless is matter.'),
      V('prashna.1.6', 'athAditya udayanyatprAchIM dishaM pravishati tena prAchyAn prANAn rashmiShu sannidhatte | yaddakShiNaM yat pratIchIM yadudIchIM yadadho yadUrdhvaM yadantarA disho yat sarvaM prakAshayati tena sarvAn prANAn rashmiShu sannidhatte ||', 'The rising sun enters all directions and gathers the life-forces in his rays.'),
      V('prashna.1.7', 'sa eSha vaishvAnaro vishvarUpaH prANo.agnirudayate | tadetadR^ichA.abhyuktam ||', 'This Vaishvanara, assuming all forms, rises as life-fire.'),
      V('prashna.1.8', 'vishvarUpaM hariNaM jAtavedasaM parAyaNaM jyotirekaM tapantam | sahasrarashmiH shatadhA vartamAnaH prANaH prajAnAmudayatyeSha sUryaH ||', 'The thousand-rayed, hundred-circuited sun rises as the life of all beings.'),
      V('prashna.1.9', 'sa.nvatsaro vai prajApatistasyAyane dakShiNaM chottaraM cha | tadye ha vai tadiShTApUrte kR^itamityupAsate te chAndramasameva lokamabhijayante | ta eva punarAvartante tasmAdeta R^iShayaH prajAkAmA dakShiNaM pratipadyante | eSha ha vai rayiryaH pitR^iyANaH ||', 'The year is Prajapati with two paths. Those who worship actions gain the lunar world and return. The southern path is the path of the fathers.'),
      V('prashna.1.10', 'athottareNa tapasA brahmacharyeNa shraddhayA vidyayA.a.atmAnamanviShyAdityamabhijayante | etadvai prANAnAmAyatanametadamR^itamabhayametat parAyaNametasmAnna punarAvartanta ity eSha nirodhastadeSha shlokaH ||', 'By the northern path, through austerity and knowledge, they seek the Self and attain the sun — the immortal, fearless, supreme goal. From there they do not return.'),
      V('prashna.1.11', 'pa~nchapAdaM pitaraM dvAdashAkR^itiM diva AhuH pare ardhe purIShiNam | atheme anya u pare vichakShaNaM saptachakre ShaDara Ahurarpitamiti ||', 'They speak of the five-footed father in the eastern sky, and the wise one of seven wheels and six spokes in the other half.'),
      V('prashna.1.12', 'mAso vai prajApatistasya kR^iShNapakSha eva rayiH shuklaH praNastasmAdeta R^iShayaH shukla iShTaM kurvantItara itarasmin ||', 'The month is Prajapati. Its dark half is matter, its bright half is life.'),
      V('prashna.1.13', 'ahorAtro vai prajApatistasyAhareva prANo rAtrireva rayiH prANaM vA ete praskandanti ye divA ratyA sa.nyujyante brahmacharyameva tadyadrAtrau ratyA sa.nyujyante ||', 'Day and night are Prajapati. Day is life, night is matter.'),
      V('prashna.1.14', 'annaM vai prajApatistato ha vai tadretastasmAdimAH prajAH prajAyanta iti ||', 'Food is Prajapati. From that comes seed, and from seed these beings are born.'),
      V('prashna.1.15', 'tadye ha vai tat prajApativrataM charanti te mithunamutpAdayante | teShAmevaiSha brahmaloko yeShAM tapo brahmacharyaM yeShu satyaM pratiShThitam ||', 'Those who follow this rule produce offspring. The Brahmaloka belongs to those in whom truth is established.'),
      V('prashna.1.16', 'teShAmasau virajo brahmaloko na yeShu jihmamanR^itaM na mAyA cheti ||', 'For them there is the spotless Brahmaloka, in whom there is no crookedness, falsehood, or deception.'),
    ]),
    SECTION('2', 'Second Question', 'द्वितीयः प्रश्नः', [
      V('prashna.2.1', 'atha hainaM bhArgavo vaidarbhiH paprachCha | bhagavan katyeva devAH prajAM vidhArayante katara etat prakAshayante kaH punareShAM variShTha iti ||', 'Bhargava asked: "How many gods sustain the body? Which ones illumine it? Who among them is the greatest?"'),
      V('prashna.2.2', 'tasmai sa hovAchAkAsho ha vA eSha devo vAyuragnirApaH pR^ithivI vA~NmanashchakShuH shrotraM cha | te prakAshyAbhivadanti vayametadbANamavaShTabhya vidhArayAmaH ||', 'He replied: "Space, air, fire, water, earth, speech, mind, eye, ear — these gods sustain this body."'),
      V('prashna.2.3', 'tAn variShThaH prANa uvAcha | mA mohamApadyatha ahamevaitat pa~nchadhA.a.atmAnaM pravibhajyaitadbANamavaShTabhya vidhArayAmIti te.ashraddadhAnA babhUvuH ||', 'Prana said: "Do not be deluded. I alone, dividing myself fivefold, sustain this body." But they did not believe.'),
      V('prashna.2.4', 'so.abhimAnAdUrdhvamutkrAmata iva tasminnutkrAmatyathetare sarva evotkrAmante tasmiMshcha pratiShThamAne sarva eva pratiShThante | tadyathA makShikA madhukararAjAnamutkrAmantaM sarva evotkramante tasmiMShcha pratiShThamAne sarva eva prAtiShTanta evaM vA~NmanaShchakShuH shrotraM cha te prItAH prANa.n stunvanti ||', 'Prana started to depart, and all the others rose with him. Just as bees rise when their queen rises, so speech, mind, eye, and ear — delighted — praised Prana.'),
      V('prashna.2.5', 'eSho.agnistapatyeSha sUrya eSha parjanyo maghavAneSha vAyuH | eSha pR^ithivI rayirdevaH sadasachchAmR^itaM cha yat ||', 'He blazes as fire, shines as the sun, is the rain, Indra, air, earth, matter, the gods, being and non-being, and immortality.'),
      V('prashna.2.6', 'arA iva rathanAbhau prANe sarvaM pratiShThitam | R^icho yajU{\\m+}Shi sAmAni yaj~naH kShatraM brahma cha ||', 'As spokes in the hub of a wheel, all are established in Prana: the Vedas, sacrifice, and all orders of society.'),
      V('prashna.2.7', 'prajApatishcharasi garbhe tvameva pratijAyase | tubhyaM prANa prajAstvimA baliM haranti yaH prANaiH pratitiShThasi ||', 'O Prana, as Prajapati you move in the womb and are born again. To you beings bring offerings.'),
      V('prashna.2.8', 'devAnAmasi vahnitamaH pitR^INAM prathamA svadhA | R^iShINAM charitaM satyamatharvA~NgirasAmasi ||', 'You are the supreme carrier for the gods, the first offering for the ancestors, the truth of the seers.'),
      V('prashna.2.9', 'indrastvaM prANa tejasA rudro.asi parirakShitA | tvamantarikShe charasi sUryastvaM jyotiShAM patiH ||', 'You are Indra, Rudra by your radiance, the protector. You move in the sky; you are the sun, lord of lights.'),
      V('prashna.2.10', 'yadA tvamabhivarShasyathemAH prANa te prajAH | AnandarUpAstiShThanti kAmAyAnnaM bhaviShyatIti ||', 'When you pour down as rain, O Prana, these beings rejoice, thinking there will be food.'),
      V('prashna.2.11', 'vrAtyastvaM prANaikarSharattA vishvasya satpatiH | vayamAdyasya dAtAraH pitA tvaM mAtarishva naH ||', 'O Prana, you are the sole seer, the true lord of all. You are our father, O Matarisva.'),
      V('prashna.2.12', 'yA te tanUrvAchi pratiShThitA yA shrotre yA cha chakShuShi | yA cha manasi santatA shivAM tAM kuru motkramIH ||', 'May that form of yours established in speech, ear, eye, and mind — make that auspicious, do not depart.'),
      V('prashna.2.13', 'prANasyedaM vashe sarvaM tridive yat pratiShThitam | mAteva putrAn rakShasva shrIshcha praj~nAM cha vidhehi na iti ||', 'All this is under Prana\'s control. Protect us as a mother protects her sons. Grant us prosperity and wisdom.'),
    ]),
    SECTION('3', 'Third Question', 'तृतीयः प्रश्नः', [
      V('prashna.3.1', 'atha hainaM kaushalyashchAshvalAyanaH paprachCha | bhagavan kuta eSha prANo jAyate kathamAyAtyasmi~nsharIra AtmAnaM vA pravibhajya kathaM pratiShThate kenotkramate kathaM bAhyamabhidhatte kathamadhyAtmamiti ||', 'Kausalya asked: "Lord, from where is this Prana born? How does it enter the body? How does it function? How does it depart?"'),
      V('prashna.3.2', 'tasmai sa hovAchAtiprashnAn pR^ichChasi brahmiShTho.asIti tasmAtte.ahaM bravImi ||', 'He replied: "You ask profound questions. Since you are the foremost in Brahman, I will tell you."'),
      V('prashna.3.3', 'Atmana eSha prANo jAyate | yathaiShA puruShe ChAyaitasminnetadAtataM manokR^itenAyAtyasmi~nsharIre ||', 'From the Self, Prana is born. Like a shadow cast by a person, it pervades the body, entering through mental action.'),
      V('prashna.3.4', 'yathA samrAdevAdhikR^itAn viniyu~Nkte | etan grAmAnotAn grAmAnadhitiShThasvetyevamevaiSha prANa itarAn prANAn pR^ithak pR^ithageva sannidhatte ||', 'As a king appoints officials, so Prana appoints the other pranas in their respective places.'),
      V('prashna.3.5', 'pAyUpasthe.apAnaM chakShuHshrotre mukhanAsikAbhyAM prANaH svayaM prAtiShThate madhye tu samAnaH | eSha hyetaddhutamannaM samaM nayati tasmAdetAH saptArchiSho bhavanti ||', 'Apana in the organ of excretion; Prana itself in the eye, ear, mouth, and nose; Samana in the middle, equally distributing food.'),
      V('prashna.3.6', 'hR^idi hyeSha AtmA | atraitadekashataM nADInAM tAsAM shataM shatamekaikasyA dvAsaptatirdvAsaptatiH pratishAkhAnADIsahasrANi bhavantyAsu vyAnashcharati ||', 'This Self is in the heart. There are 101 arteries. Each divides into 100, each into 72,000 branches. Through these, Vyana circulates.'),
      V('prashna.3.7', 'athaikayordhva udAnaH puNyena puNyaM lokaM nayati pApena pApamubhAbhyAmeva manuShyalokam ||', 'Udana leads upward — by good deeds to a good world, by evil to an evil world, by both to the human world.'),
      V('prashna.3.8', 'Adityo ha vai bAhyaH prANa udayatyeSha hyenaM chAkShuShaM prANamanugR^ihNAnaH | pR^ithivyAM yA devatA saiShA puruShasya apAnamavaShTabhyAntarA yadAkAshaH sa samAno vAyurvyAnaH ||', 'The sun is the external Prana. The earth deity supports the apana. The space between is samana; air is vyana.'),
      V('prashna.3.9', 'tejo ha vA udAnastasmAdupashAntatejAH | punarbhavamindriyairmanasi sampadyamAnaiH ||', 'Udana is fire. One whose fire is extinguished returns to birth with the senses absorbed in the mind.'),
      V('prashna.3.10', 'yachchittastenaiSha prANamAyAti | prANastejasA yuktaH sahAtmanA tathAsa~NkalpitaM lokaM nayati ||', 'By whatever thought one dies, Prana, united with fire and the Self, leads to that world.'),
      V('prashna.3.11', 'ya evaM vidvAn prANaM veda na hAsya prajA hIyate.amR^ito bhavati tadeShaH shlokaH ||', 'One who knows Prana thus — his offspring do not perish, and he becomes immortal.'),
      V('prashna.3.12', 'utpattimAyatiM sthAnaM vibhutvaM chaiva pa~nchadhA | adhyAtmaM chaiva prANasya vij~nAyAmR^itamashnute vij~nAyAmR^itamashnuta iti ||', 'Knowing the origin, entry, function, fivefold nature, and inner nature of Prana, one attains immortality.'),
    ]),
    SECTION('4', 'Fourth Question', 'चतुर्थः प्रश्नः', [
      V('prashna.4.1', 'atha hainaM sauryAyaNi gArgyaH paprachCha | bhagavannetasmin puruShe kAni svapanti kAnyasmi~njAgrati katara eSha devaH svapnAn pashyati kasyaitat sukhaM bhavati kasminnu sarve sampratiShThitA bhavantIti ||', 'Sauryayani asked: "Lord, what sleeps in this person? What remains awake? Who sees dreams? In whom are all established?"'),
      V('prashna.4.2', 'tasmai sa hovAcha yathA gArgya marIchayo.arkasyAstaM gachChataH sarvA etasmi.nstejomaNDala ekIbhavanti tAH punaH punarudayataH pracharantyevaM ha vai tat sarvaM pare deve manasyekIbhavati tena tarhyeSha puruSho na shR^iNoti na pashyati na jighrati na rasayate na spR^ishate nAbhivadate nAdatte nAnandayate na visR^ijate neyAyate svapitItyAchakShate ||', 'As all rays merge into the sun at sunset and emerge at sunrise, so all this merges in the supreme being — the mind. Then one does not hear, see, smell, taste, touch, speak, or enjoy. They say: "He sleeps."'),
      V('prashna.4.3', 'prANAgnaya evaitasmin pure jAgrati | gArhapatyo ha vA eSho.apAno vyAno.anvAhAryapachano yadgArhapatyAt praNIyate praNayanAdAhavanIyaH prANaH ||', 'The prana-fires remain awake in this city. Apana is the Garhapatya fire; Vyana is the Anvaharya fire; Prana is the Ahavaniya fire.'),
      V('prashna.4.4', 'yaduchChvAsaniHshvAsAvetAvAhutI samaM nayatIti sa samAnaH | mano ha vAva yajamAnaH | iShTaphalamevodAnaH | sa enaM yajamAnamaharaharbrahma gamayati ||', 'Inhalation and exhalation are oblations. Samana balances them. Mind is the sacrificer. Udana leads the sacrificer to Brahman daily.'),
      V('prashna.4.5', 'atraiSha devaH svapne mahimAnamanubhavati | yaddR^iShTaM dR^iShTamanupashyati shrutaM shrutamevArthamanushR^iNoti deshadigantaraishcha pratyanubhUtaM punaH punaH pratyanubhavati dR^iShTaM chAdR^iShTaM cha shrutaM chAshrutaM chAnubhUtaM chAnanubhUtaM cha sachchAsachcha sarvaM pashyati sarvaH pashyati ||', 'In the dream state, this being experiences glory. What has been seen and heard, what has been experienced in different lands and directions — all this he sees again. All is seen by him.'),
      V('prashna.4.6', 'sa yadA tejasA.abhibhUto bhavati | atraiSha devaH svapnAnna pashyatyatha yadaitasmi~nsharIra etatsukhaM bhavati ||', 'When overwhelmed by light, he sees no dreams. Then there is happiness in the body.'),
      V('prashna.4.7', 'sa yathA sobhya vayA.nsi vasovR^ikShaM sampratiShThante | evaM ha vai tat sarvaM para Atmani sampratiShThate ||', 'As birds settle on a tree, so all this settles in the supreme Self.'),
      V('prashna.4.8', 'pR^ithivI cha pR^ithivImAtrA chApashchApomAtrA cha tejashcha tejomAtrA cha vAyushcha vAyumAtrA chAkAshashchAkAshamAtrA cha chakShushcha draShTavyaM cha shrotraM cha shrotavyaM cha ghrANaM cha ghrAtavyaM cha rasashcha rasayitavyaM cha tvakcha sparshayitavyaM cha vAkcha vaktavyaM cha hastau chAdAtavyaM chopasthashchAnandayitavyaM cha pAyushcha visarjayitavyaM cha yAdau cha gantavyaM cha manashcha mantavyaM cha buddhishcha boddhavyaM chAha~NkArashchAha~NkartavyaM cha chittaM cha chetayitavyaM cha tejashcha vidyotayitavyaM cha prANashcha vidhArayitavyaM cha ||', 'Earth and its essence, water and its essence, fire, air, space, eye and its objects, ear and its objects, nose and its objects, taste and its objects, skin and its objects, speech and its objects, hands, organ, anus, feet, mind, intellect, ego, consciousness, and Prana — all these are established.'),
      V('prashna.4.9', 'eSha hi draShTA spraShTA shrotA ghrAtA rasayitA mantA boddhA kartA vij~nAnAtmA puruShaH | sa pare.akShara Atmani sampratiShThate ||', 'This is the seer, toucher, hearer, smeller, taster, thinker, knower, doer — the conscious Self, the Person. He is established in the supreme, imperishable Self.'),
      V('prashna.4.10', 'paramevAkSharaM pratipadyate sa yo ha vai tadachChAyamasharIramalohitaM shubhramakSharaM vedayate yastu somya | sa sarvaj~naH sarvo bhavati | tadeSha shlokaH ||', 'He attains the supreme imperishable who knows the shadowless, bodiless, colorless, pure, imperishable. He becomes all-knowing, all.'),
      V('prashna.4.11', 'vij~nAnAtmA saha devaishcha sarvaiH prANA bhUtAni sampratiShThanti yatra tadakSharaM vedayate yastu somya sa sarvaj~naH sarvamevAvivesheti ||', 'The conscious Self, together with all gods, pranas, and beings, is established there. Knowing the imperishable, he becomes all-knowing and enters all.'),
    ]),
    SECTION('5', 'Fifth Question', 'पञ्चमः प्रश्नः', [
      V('prashna.5.1', 'atha hainaM shaibyaH satyakAmaH paprachCha | sa yo ha vai tadbhagavanmanuShyeShu prAyaNAntamo~NkAramabhidhyAyIta | katamaM vAva sa tena lokaM jayatIti | tasmai sa hovAcha ||', 'Saibya asked: "Lord, if someone meditates on OM at death, what world does he attain?"'),
      V('prashna.5.2', 'etadvai satyakAma paraM chAparaM cha brahma yado~NkAraH | tasmAdvidvAnetenaivAyatanenaikataramanveti ||', 'This OM is both the supreme and the inferior Brahman. The wise one, by this support, attains one of them.'),
      V('prashna.5.3', 'sa yadyekamAtramabhidhyAyIta sa tenaiva sa.nveditastUrNameva jagatyAmabhisampadyate | tamR^icho manuShyalokamupanayante sa tatra tapasA brahmacharyeNa shraddhayA sampanno mahimAnamanubhavati ||', 'If he meditates on one matra, he is quickly reborn in the human world. The Rg verses lead him, and he experiences greatness.'),
      V('prashna.5.4', 'atha yadi dvimAtreNa manasi sampadyate so.antarikShaM yajurbhirunnIyate somalokam | sa somaloke vibhutimanubhUya punarAvartate ||', 'If he meditates on two matras, he reaches the sky and the lunar world. After experiencing glory there, he returns.'),
      V('prashna.5.5', 'yaH punaretaM trimAtreNomityetenaivAkShareNa paraM puruShamabhidhyAyIta sa tejasi sUrye sampannaH | yathA pAdodarastvachA vinirmuchyata evaM ha vai sa pApmanA vinirmuktaH sa sAmabhirunnIyate brahmalokaM sa etasmAjjIvaghanAt parAtparaM purishayaM puruShamIkShate ||', 'He who meditates on three matras of OM attains the sun. Freed from sin as a snake sheds its skin, he is led by the Saman verses to the Brahmaloka, where he sees the Person beyond all.'),
      V('prashna.5.6', 'tisro mAtrA mR^ityumatyaH prayuktA anyonyasaktAH anaviprayuktAH | kriyAsu bAhyAbhyantaramadhyamAsu samyak prayuktAsu na kampate j~naH ||', 'The three matras, when rightly applied, are deathless. United, not separated, applied in external, internal, and middle actions, the knower does not tremble.'),
      V('prashna.5.7', 'R^igbhiretaM yajurbhirantarikShaM sAmabhiryat tat kavayo vedayante | tamo~NkAreNaivAyatanenAnveti vidvAn yattachChAntamajaramamR^itamabhayaM paraM cheti ||', 'Through Rg verses he attains this world, through Yajur verses the sky, through Saman verses what the poets know. By OM as support, the wise one attains the peaceful, ageless, immortal, fearless, supreme.'),
    ]),
    SECTION('6', 'Sixth Question', 'षष्ठः प्रश्नः', [
      V('prashna.6.1', 'atha hainaM sukeshA bhAradvAjaH paprachCha | bhagavan hiraNyanAbhaH kausalyo rAjaputro mAmupetyaitaM prashnamapR^ichChata | ShoDashakalaM bhAradvAja puruShaM vettha | tamahaM kumAramabruvaM nAhamimaM veda | yadyahamimamavediShaM kathaM te nAvakShyamiti | samUlo vA eSha parishuShyati yo.anR^itamabhivadati tasmAnnArhamyanR^itaM vaktum | sa tUShNIM rathamAruhya pravavrAja | taM tvA pR^ichChAmi kvAsau puruSha iti ||', 'Sukesa asked: "Lord, Hiranyanabha asked me about the 16-part Person. I told him I did not know. One who speaks falsehood withers like a root. So I ask you: where is that Person?"'),
      V('prashna.6.2', 'tasmai sa hovAchehaivAntaHsharIre somya sa puruSho yasminnatAH ShoDashakalAH prabhavantIti ||', 'He replied: "Within this body, dear, is the Person from whom these 16 parts arise."'),
      V('prashna.6.3', 'sa IkShAchakre | kasminnahamutkrAnta utkrAnto bhaviShyAmi kasminvA pratiShThite pratiShThAsyAmIti ||', 'He thought: "On whose departure shall I depart? On whose establishment shall I be established?"'),
      V('prashna.6.4', 'sa prANamasR^ijata prANAchChraddhAM khaM vAyurjyotirApaH pR^ithivIndriyaM manaH | annamannAdvIryaM tapo mantrAH karma lokA lokeShu cha nAma cha ||', 'He created Prana; from Prana, faith; then space, air, fire, water, earth, senses, mind, food, strength, austerity, mantras, action, worlds, and names.'),
      V('prashna.6.5', 'sa yathemA nadyaH syandamAnAH samudrAyaNAH samudraM prApyAstaM gachChanti bhidyete tAsAM nAmarUpe samudra ityevaM prochyate | evamevAsya paridraShTurimAH ShoDashakalAH puruShAyaNAH puruShaM prApyAstaM gachChanti bhidyete chAsAM nAmarUpe puruSha ityevaM prochyate sa eSho.akalo.amR^ito bhavati tadeSha shlokaH ||', 'As flowing rivers merge into the ocean, losing their names and forms, so the 16 parts merge into the Person. He becomes partless and immortal.'),
      V('prashna.6.6', 'arA iva rathanAbhau kalA yasminpratiShThitAH | taM vedyaM puruShaM veda yatha mA vo mR^ityuH parivyathA iti ||', 'As spokes in the hub, the parts are established in Him. Know that Person — so that death may not cause you pain.'),
      V('prashna.6.7', 'tAn hovAchaitAvadevAhametat paraM brahma veda | nAtaH paramastIti ||', 'He said: "I know this supreme Brahman only thus far. There is nothing beyond It."'),
      V('prashna.6.8', 'te tamarchayantastvaM hi naH pitA yo.asmAkamavidyAyAH paraM pAraM tArayasIti | namaH paramaR^iShibhyo namaH paramaR^iShibhyaH ||', 'They worshipped him: "You are our father who carries us to the other shore of ignorance. Salutations to the supreme seers!"'),
    ]),
  ]
)

// ═══ MUNDAKA UPANISHAD (3 Mundakas, 6 Khandas) ═══════════════════

const mundaka = makeUpanishad(
  'mundaka', 'Mundaka Upanishad', 'मुण्डकोपनिषद्', 'Muṇḍakopaniṣad',
  'The Mundaka Upanishad ("the Upanishad of the Shaven Head") teaches the distinction between higher and lower knowledge. It presents the famous parable of the two birds on the tree, and the arrow-making meditation technique. The higher knowledge is the realization of the imperishable Brahman, the source of all creation.',
  'Higher and lower knowledge, the two birds parable, meditation on OM as the bow, and the identity of the individual Self with Brahman.',
  [
    SECTION('1.1', 'First Mundaka, First Khanda', 'प्रथममुण्डके प्रथमः खण्डः', [
      V('mundaka.1.1.1', 'brahmA devAnAM prathamaH sa.nbabhUva vishvasya kartA bhuvanasya goptA | sa brahmavidyAM sarvavidyApratiShThAmatharvAya jyeShThaputrAya prAha ||', 'Brahma, the creator and protector of the universe, taught the supreme knowledge of Brahman to his eldest son, Atharva.'),
      V('mundaka.1.1.2', 'atharvaNe yAM pravadeta brahmA.atharvA taM purovAchA~Ngire brahmavidyAm | sa bhAradvAjAya satyavAhAya prAha bhAradvAjo.a~Ngirase parAvarAm ||', 'Atharva taught Angir. Angir taught Satyavaha Bharadvaja. Thus the supreme knowledge was passed down.'),
      V('mundaka.1.1.3', 'shaunako ha vai mahAshAlo.a~NgirasaM vidhivadupasannaH paprachCha | kasminnu bhagavo vij~nAte sarvamidaM vij~nAtaM bhavatIti ||', 'Saunaka approached Angiras and asked: "Lord, by knowing what is all this known?"'),
      V('mundaka.1.1.4', 'tasmai sa hovAcha | dve vidye veditavye iti ha sma yadbrahmavido vadanti parA chaivAparA cha ||', 'He replied: "Two kinds of knowledge are to be known — the higher (para) and the lower (apara)."'),
      V('mundaka.1.1.5', 'tatrAparA R^igvedo yajurvedaH sAmavedo.atharvavedaH shikShA kalpo vyAkaraNaM niruktaM Chando jyotiShamiti | atha parA yayA tadakSharamadhigamyate ||', 'The lower knowledge includes the four Vedas, phonetics, ritual, grammar, etymology, meter, and astronomy. The higher knowledge is that by which the Imperishable is known.'),
      V('mundaka.1.1.6', 'yattadadreshyamagrAhyamagotramavarNa\\- machakShuHshrotraM tadapANipAdam | nityaM vibhuM sarvagataM susUkShmaM tadavyayaM yadbhUtayoniM paripashyanti dhIrAH ||', 'That which is invisible, ungraspable, without lineage, without eyes, ears, hands, or feet — eternal, all-pervading, subtle, imperishable — that the wise perceive as the source of all beings.'),
      V('mundaka.1.1.7', 'yathorNanAbhiH sR^ijate gR^ihNate cha yathA pR^ithivyAmoShadhayaH sa.nbhavanti | yathA sataH puruShAtkeshalomAni tathA.akSharAtsa.nbhavatIha vishvam ||', 'As a spider spins out and withdraws its web, as herbs grow from the earth, as hair grows from a living person, so the universe arises from the Imperishable.'),
      V('mundaka.1.1.8', 'tapasA chIyate brahma tato.annamabhijAyate | annAtprANo manaH satyaM lokAH karmasu chAmR^itam ||', 'Brahman expands through austerity. From It, food is born. From food, life, mind, truth, worlds, and immortality in action.'),
      V('mundaka.1.1.9', 'yaH sarvaj~naH sarvavidyasya j~nAnamayaM tapaH | tasmAdetadbrahma nAma rUpamannaM ca jAyate ||', 'The all-knowing, all-wise One — whose austerity is knowledge — from Him are born Brahman, name, form, and food.'),
    ]),
    SECTION('1.2', 'First Mundaka, Second Khanda', 'प्रथममुण्डके द्वितीयः खण्डः', [
      V('mundaka.1.2.1', 'tadetatsatyaM mantreShu karmANi kavayo yAnyapashyaMstAni tretAyAM bahudhA sa.ntatAni | tAnyAcharatha niyataM satyakAmA eSha vaH panthAH sukR^itasya loke ||', 'The actions revealed to the sages in the mantras have been spread widely in the three Vedas. Perform them constantly, O seekers of truth. This is your path to the world of good deeds.'),
      V('mundaka.1.2.2', 'yadA lelAyate hyarchiH samiddhe havyavAhane | tadA.a.ajyabhAgAvantareNA.a.ahutIH pratipAdayet ||', 'When the flame flickers after the fire is kindled, then one should offer oblations between the two portions of clarified butter.'),
      V('mundaka.1.2.3', 'yasyAgnihotramadarshamapaurNamAsa\\- machAturmAsyamanAgrayaNamatithivarjitaM cha | ahutamavaishvadevamavidhinA huta\\- mAsaptamAMstasya lokAn hinasti ||', 'The fire rituals of one who neglects the new and full moon ceremonies, the four-month rites, the harvest offerings, guests, offerings to all beings, and performs incorrectly — destroy his seven worlds.'),
      V('mundaka.1.2.4', 'kAlI karAlI cha manojavA cha sulohitA yA cha sudhUmravarNA | sphuli~NginI vishvaruchI cha devI lelAyamAnA iti sapta jihvAH ||', 'Kali, Karali, Manojava, Sulohita, Sudhumravarna, Sphulingini, and Visvaruchi — these are the seven tongues of flame.'),
      V('mundaka.1.2.5', 'eteShu yashcharate bhrAjamAneShu yathAkAlaM chAhutayo hyAdadAyan | taM nayantyetAH sUryasya rashmayo yatra devAnAM patireko.adhivAsaH ||', 'Those who offer oblations in due time are led by the rays of the sun to where the one Lord of the gods resides.'),
      V('mundaka.1.2.6', 'ehyehIti tamAhutayaH suvarchasaH sUryasya rashmibhiryajamAnaM vahanti | priyAM vAchamabhivadantyo.archayantya eSha vaH puNyaH sukR^ito brahmalokaH ||', '"Come, come!" say the radiant offerings, carrying the sacrificer through the sun\'s rays. "This is your holy, well-earned Brahmaloka."'),
      V('mundaka.1.2.7', 'plavA hyete adR^iDhA yaj~narUpA aShTAdashoktamavaraM yeShu karma | etachChreyo ye.abhinandanti mUDhA jarAmR^ityuM te punarevApi yanti ||', 'These sacrifices are like unsteady boats. The 18 forms of inferior action delight fools, who again undergo old age and death.'),
      V('mundaka.1.2.8', 'avidyAyAmantare vartamAnAH svayaM dhIrAH paNDitaMmanyamAnAH | ja~NghanyamAnAH pariyanti mUDhA andhenaiva nIyamAnA yathAndhAH ||', 'Living in ignorance, calling themselves wise, the deluded wander about like the blind leading the blind.'),
      V('mundaka.1.2.9', 'avidyAyAM bahudhA vartamAnA vayaM kR^itArthA ityabhimanyanti bAlAH | yatkarmiNo na pravedayanti rAgA\\- ttenAturAH kShINalokAshchyavante ||', 'Living in ignorance in many ways, children think "We have achieved our purpose." Afflicted by passion, they fall from heaven.'),
      V('mundaka.1.2.10', 'iShTApUrtam manyamAnA variShThaM nAnyachChreyo vedayante pramUDhAH | nAkasya pR^iShThe te sukR^ite.anubhUtvemaM lokaM hInataraM vA vishanti ||', 'Fools think the performance of sacrifices is the highest good. Having enjoyed the heaven of good deeds, they enter this world or a lower one.'),
      V('mundaka.1.2.11', 'tapaHshraddhe ye hyupavasantyaraNye shAntA vidvAMso bhaikShyacharyAM charantaH | sUryadvAreNa te virajAH prayAnti yatrAmR^itaH sa puruSho hyavyayAtmA ||', 'But those who practice austerity and faith in the forest, peaceful and wise, living on alms — they pass through the sun\'s door to where the immortal Person dwells.'),
      V('mundaka.1.2.12', 'parIkShya lokAn karmachitAn brAhmaNo nirvedamAyAnnAstyakR^itaH kR^itena | tadvij~nAnArthaM sa gurumevAbhigachChet samitpANiH shrotriyaM brahmaniShTham ||', 'Having examined the worlds gained through action, a brahmin should develop detachment. To know the truth, approach a guru who is devoted to Brahman, with firewood in hand.'),
      V('mundaka.1.2.13', 'tasmai sa vidvAnupasannAya samyak prashAntachittAya shamAnvitAya | yenAkSharaM puruShaM veda satyaM provAcha tAM tattvato brahmavidyAm ||', 'To that student who has approached properly, with a tranquil mind and peaceful heart, the wise teacher should teach the knowledge of Brahman — by which one knows the Imperishable Person.'),
    ]),
    SECTION('2.1', 'Second Mundaka, First Khanda', 'द्वितीयमुण्डके प्रथमः खण्डः', [
      V('mundaka.2.1.1', 'tadetatsatyaM yathA sudIptAtpAvakAdvisphuli~NgAH sahasrashaH prabhavante sarUpAH | tathA.akSharAdvividhAH somya bhAvAH prajAyante tatra chaivApiyanti ||', 'As sparks from a blazing fire, so from the Imperishable arise various beings and return to It.'),
      V('mundaka.2.1.2', 'divyo hyamUrtaH puruShaH sabAhyAbhyantaro hyajaH | aprANo hyamanAH shubhro hyakSharAtparataH paraH ||', 'The Person is divine, formless, both within and without, unborn, without breath or mind, pure, and beyond the Imperishable.'),
      V('mundaka.2.1.3', 'etasmAjjAyate prANo manaH sarvendriyANi cha | khaM vAyurjyotirApaH pR^ithivI vishvasya dhAriNI ||', 'From Him are born life, mind, all senses, space, air, fire, water, and earth — the support of all.'),
      V('mundaka.2.1.4', 'agnirmUrdhA chakShuShI chandrasUryau dishaH shrotre vAgvivR^itAshcha vedAH | vAyuH prANo hR^idayaM vishvamasya padbhyAM pR^ithivI hyeSha sarvabhUtAntarAtmA ||', 'Fire is His head, the sun and moon His eyes, the directions His ears, the revealed Vedas His speech, air His breath, the universe His heart, earth His feet — He is the inner Self of all beings.'),
      V('mundaka.2.1.5', 'tasmAdagniH samidho yasya sUryaH somAtparjanya oShadhayaH pR^ithivyAm | pumAn retaH si~nchati yoShitAyAM bahvIH prajAH puruShAtsa.nprasUtAH ||', 'From Him comes the fire whose fuel is the sun. From rain come herbs on the earth. Man pours seed into woman — thus many beings are born from the Person.'),
      V('mundaka.2.1.6', 'tasmAdR^ichaH sAma yajU{\\m+}Shi dIkShA yaj~nAshcha sarve kratavo dakShiNAshcha | saMvatsarashcha yajamAnashcha lokAH somo yatra pavate yatra sUryaH ||', 'From Him come the Rg, Yajur, and Saman Vedas, initiations, all sacrifices, the year, the sacrificer, and the worlds where the moon and sun shine.'),
      V('mundaka.2.1.7', 'tasmAchcha devA bahudhA sa.nprasUtAH sAdhyA manuShyAH pashavo vayA{\\m+}si | prANApAnau vrIhiyavau tapashcha shraddhA satyaM brahmacharyaM vidhishcha ||', 'From Him arise gods, celestials, humans, animals, and birds. From Him come Prana and Apana, rice and barley, austerity, faith, truth, celibacy, and law.'),
      V('mundaka.2.1.8', 'sapta prANAH prabhavanti tasmA\\- tsaptArchiShaH samidhaH sapta homAH | sapta ime lokA yeShu charanti prANA guhAshayA nihitAH sapta sapta ||', 'Seven pranas arise from Him, with their seven flames, seven fuels, seven oblations, and seven worlds where the life-forces move.'),
      V('mundaka.2.1.9', 'ataH samudrA girayashcha sarve.asmA\\- tsyandante sindhavaH sarvarUpAH | atashcha sarvA oShadhayo rasashcha yenaiSha bhUtaistiShThate hyantarAtmA ||', 'From Him flow all seas, mountains, and rivers of every form. From Him come all herbs and flavors, by which the inner Self sustains the elements.'),
      V('mundaka.2.1.10', 'puruSha evedaM vishvaM karma tapo brahma parAmR^itam | etadyo veda nihitaM guhAyAM so.avidyAgranthiM vikiratIha somya ||', 'The Person is all this — action, austerity, Brahman, and the supreme immortal. One who knows this hidden in the cave cuts the knot of ignorance.'),
    ]),
    SECTION('2.2', 'Second Mundaka, Second Khanda', 'द्वितीयमुण्डके द्वितीयः खण्डः', [
      V('mundaka.2.2.1', 'AviH sa.nnihitaM guhAcharaM nAma mahatpadamatraitatsamarpitam | ejatprANannimiShachcha yadetajjAnatha sadasadvareNyaM paraM vij~nAnAdyadvariShThaM prajAnAm ||', 'The great goal, hidden in the cave, is revealed. Know it as both moving and unmoving, being and non-being, the supreme, the best.'),
      V('mundaka.2.2.2', 'yadarchimadyadaNubhyo.aNu cha yasmi.NllokA nihitA lokinashcha | tadetadakSharaM brahma sa prANastadu vA~NmanaH tadetatsatyaM tadamR^itaM tadveddhavyaM somya viddhi ||', 'That which is brilliant and subtler than the subtle — in which are set the worlds and their inhabitants — that is the Imperishable Brahman. Know it to be known.'),
      V('mundaka.2.2.3', 'dhanurgR^ihItvaupaniShadaM mahAstraM sharaM hyupAsAnishitaM sa.ndhayIta | Ayamya tadbhAvagatena chetasA lakShyaM tadevAkSharaM somya viddhi ||', 'Take the Upanishadic bow, the great weapon. Fix the arrow sharpened by meditation. Draw the bow with mind absorbed in It. Know the Imperishable as the target.'),
      V('mundaka.2.2.4', 'praNavo dhanuH sharo hyAtmA brahma tallakShyamuchyate | apramattena veddhavyaM sharavattanmayo bhavet ||', 'OM is the bow; the Self is the arrow; Brahman is the target. One should hit It with unwavering attention — become one with It like the arrow in the target.'),
      V('mundaka.2.2.5', 'yasmin dyauH pR^ithivI chAntarikShamotaM manaH saha prANaishcha sarvaiH | tamevaikaM jAnatha AtmAnamanyA vAcho vimu~nchathAmR^itasyaiSha setuH ||', 'In whom the sky, earth, and space are woven, with the mind and all pranas — know that one Self. Give up other talk. This is the bridge to immortality.'),
      V('mundaka.2.2.6', 'arA iva rathanAbhau saMhatA yatra nADyaH | sa eSho.antashcharate bahudhA jAyamAnaH | omityevaM dhyAyatha AtmAnaM svasti vaH pArAya tamasaH parastAt ||', 'Where the arteries meet like spokes in the hub of a wheel, He moves within, becoming many. Meditate on the Self as OM. May you cross beyond darkness.'),
      V('mundaka.2.2.7', 'yaH sarvaj~naH sarvavidyasyaiSha mahimA bhuvi | divye brahmapure hyeSha vyomnyAtmA pratiShThitaH | manomayaH prANasharIranetA pratiShThito.anne hR^idayaM sa.nnidhAya | tadvij~nAnena paripashyanti dhIrA AnandarUpamamR^itaM yadvibhAti ||', 'The all-knowing, all-wise One — His greatness is on earth. In the divine city of Brahman, He is established in space. The wise, through knowledge, see Him who shines as the immortal, blissful form.'),
      V('mundaka.2.2.8', 'bhidyate hR^idayagranthishChidyante sarvasaMshayAH | kShIyante chAsya karmANi tasmindR^iShTe parAvare ||', 'When He is seen — both the high and the low — the knot of the heart is loosened, all doubts are cut, and all karmas are exhausted.'),
      V('mundaka.2.2.9', 'hiraNmaye pare koshe virajaM brahma niShkalam | tachChubhraM jyotiShAM jyotistadyadAtmavido viduH ||', 'In the supreme golden sheath is the spotless, partless Brahman. It is the pure light of lights — known by the knowers of the Self.'),
      V('mundaka.2.2.10', 'na tatra sUryo bhAti na chandratArakaM nemA vidyuto bhAnti kuto.ayamagniH | tameva bhAntamanubhAti sarvaM tasya bhAsA sarvamidaM vibhAti ||', 'The sun does not shine there, nor the moon and stars, nor lightning, nor fire. When He shines, everything shines after Him. By His light, all this is illuminated.'),
      V('mundaka.2.2.11', 'brahmaivedamamR^itaM purastAdbrahma pashchAdbrahma dakShiNatashchottareNa | adhashchordhvaM cha prasR^itaM brahmaivedaM vishvamidaM variShTham ||', 'Brahman is before, Brahman is behind, to the right and left. Brahman extends above and below. Brahman alone is all this — the supreme.'),
    ]),
    SECTION('3.1', 'Third Mundaka, First Khanda', 'तृतीयमुण्डके प्रथमः खण्डः', [
      V('mundaka.3.1.1', 'dvA suparNA sayujA sakhAyA samAnaM vR^ikShaM pariShasvajAte | tayoranyaH pippalaM svAdvattyanashnannanyo abhichAkashIti ||', 'Two birds, united as companions, cling to the same tree. One eats the sweet fruit; the other, not eating, looks on.'),
      V('mundaka.3.1.2', 'samAne vR^ikShe puruSho nimagno.anIshayA shochati muhyamAnaH | juShTaM yadA pashyatyanyamIshamasya mahimAnamiti vItashokaH ||', 'On the same tree, the individual is immersed, grieving, deluded. When he sees the Lord, the beloved, and His glory, he becomes free from grief.'),
      V('mundaka.3.1.3', 'yadA pashyaH pashyate rukmavarNaM kartAramIshaM puruShaM brahmayonim | tadA vidvAn puNyapApe vidhUya nira~njanaH paramaM sAmyamupaiti ||', 'When the seer sees the golden-hued Creator, the Lord, the Person, the source of Brahman — then the wise one, shaking off merit and demerit, attains supreme equality.'),
      V('mundaka.3.1.4', 'prANo hyeSha yaH sarvabhUtairvibhAti vijAnan vidvAn bhavate nAtivAdI | AtmakrIDa AtmaratiH kriyAvAneSha brahmavidAM variShThaH ||', 'This Prana shines forth through all beings. The knower, understanding, does not overstate. Delighting in the Self, rejoicing in the Self, performing actions — he is the best among knowers of Brahman.'),
      V('mundaka.3.1.5', 'satyena labhyastapasA hyeSha AtmA samyagj~nAnena brahmacharyeNa nityam | antaHsharIre jyotirmayo hi shubhro yaM pashyanti yatayaH kShINadoShAH ||', 'This Self is attained by truth, austerity, right knowledge, and constant celibacy. The pure, luminous Self within the body is seen by yogis whose impurities are destroyed.'),
      V('mundaka.3.1.6', 'satyameva jayate nAnR^itaM satyena panthA vitato devayAnaH | yenAkramantyR^iShayo hyAptakAmA yatra tatsatyasya paramaM nidhAnam ||', 'Truth alone triumphs, not falsehood. By truth the divine path is spread, by which the sages, free from desires, reach the supreme abode of truth.'),
      V('mundaka.3.1.7', 'bR^ihachcha taddivyamachintyarUpaM sUkShmAchcha tatsUkShmataraM vibhAti | dUrAtsudUre tadihAntike cha pashyatsvihaiva nihitaM guhAyAm ||', 'The Self is vast, divine, of inconceivable form. It is subtler than the subtle. Far, yet near. It is placed in the cave of the heart.'),
      V('mundaka.3.1.8', 'na chakShuShA gR^ihyate nApi vAchA nAnyairdevaistapasA karmaNA vA | j~nAnaprasAdena vishuddhasattvaM statastu taM pashyate niShkalaM dhyAyamAnaH ||', 'It is not grasped by the eye, nor by speech, nor by other senses, nor by austerity or action. By the grace of knowledge, with purified mind, one sees the partless Self in meditation.'),
      V('mundaka.3.1.9', 'eSho.aNurAtmA chetasA veditavyo yasminprANaH pa~nchadhA saMvivesha | prANaishchittaM sarvamotaM prajAnAM yasminvishuddhe vibhavatyeSha AtmA ||', 'This subtle Self is to be known by the intellect. In it, the five pranas enter. All beings\' minds are woven in it. When it is purified, this Self shines forth.'),
      V('mundaka.3.1.10', 'yaM yaM lokaM manasA saMvibhAti vishuddhasattvaH kAmayate yAMshcha kAmAn | taM taM lokaM jayate tAMshcha kAmAMstasmAdAtmaj~naM hyarchayedbhUtikAmaH ||', 'Whatever world a man of pure mind desires, whatever desires, that world he attains. Therefore, one desiring prosperity should worship the knower of the Self.'),
    ]),
    SECTION('3.2', 'Third Mundaka, Second Khanda', 'तृतीयमुण्डके द्वितीयः खण्डः', [
      V('mundaka.3.2.1', 'sa vedaitatparamaM brahma dhAma yatra vishvaM nihitaM bhAti shubhram | upAsate puruShaM ye hyakAmAste shukrametadativartanti dhIrAH ||', 'He knows that supreme Brahman where the universe shines. Those who worship the Person without desires pass beyond this seed.'),
      V('mundaka.3.2.2', 'kAmAn yaH kAmayate manyamAnaH sa kAmabhirjAyate tatra tatra | paryAptakAmasya kR^itAtmanastu ihaiva sarve pravilIyanti kAmAH ||', 'One who desires, thinking of desires, is born here and there. But for one whose desires are fulfilled, whose self is perfected, all desires dissolve here itself.'),
      V('mundaka.3.2.3', 'nAyamAtmA pravachanena labhyo na medhayA na bahunA shrutena | yamevaiSha vR^iNute tena labhyastasyaiSha AtmA vivR^iNute tanUM svAm ||', 'This Self is not attained by instruction, nor by intellect, nor by much learning. It is attained only by the one whom It chooses. To such a one, the Self reveals Its own nature.'),
      V('mundaka.3.2.4', 'nAyamAtmA balahInena labhyo na cha pramAdAttapaso vApyali~NgAt | etairupAyairyatate yastu vidvAnstasyaiSha AtmA vishate brahmadhAma ||', 'This Self is not attained by the weak, nor by the careless, nor by austerity without the proper mark. But the wise one who strives by these means enters the abode of Brahman.'),
      V('mundaka.3.2.5', 'sa.nprApyainamR^iShayo j~nAnatR^iptAH kR^itAtmAno vItarAgAH prashAntAH | te sarvagaM sarvataH prApya dhIrA yuktAtmAnaH sarvamevAvishanti ||', 'Having attained Him, the sages, satisfied with knowledge, perfected, free from passion, peaceful — they, the wise, having attained the all-pervading from all sides, enter the All.'),
      V('mundaka.3.2.6', 'vedAntavij~nAnasunishchitArthAH sa.nnyAsayogAdyatayaH shuddhasattvAH | te brahmalokeShu parAntakAle parAmR^itAH parimuchyanti sarve ||', 'Those who have ascertained the meaning of Vedantic knowledge, who practice renunciation and have pure minds — they are all finally liberated in the Brahmaloka at the end of time.'),
      V('mundaka.3.2.7', 'gatAH kalAH pa~nchadasha pratiShThA devAshcha sarve pratidevatAsu | karmANi vij~nAnamayashcha AtmA pare.avyaye sarve ekIbhavanti ||', 'The fifteen parts merge into their supports, all gods into their deities, actions and the conscious Self — all become one in the supreme Imperishable.'),
      V('mundaka.3.2.8', 'yathA nadyaH syandamAnAH samudre.astaM gachChanti nAmarUpe vihAya | tathA vidvAn nAmarUpAdvimuktaH parAtparaM puruShamupaiti divyam ||', 'As flowing rivers merge into the ocean, losing name and form, so the wise one, freed from name and form, attains the supreme Person.'),
      V('mundaka.3.2.9', 'sa yo ha vai tatparamaM brahma veda brahmaiva bhavati nAsyAbrahmavitkule bhavati | tarati shokaM tarati pApmAnaM guhAgranthibhyo vimukto.amR^ito bhavati ||', 'One who knows that supreme Brahman becomes Brahman itself. None of his family remains ignorant of Brahman. He crosses sorrow, crosses evil, freed from the knots of the heart, he becomes immortal.'),
      V('mundaka.3.2.10', 'kriyAvantaH shrotriyA brahmaniShThAH svayaM juhvata ekarShiM shraddhayantaH | teShAmevaitAM brahmavidyAM vadeta shirovrataM vidhivadyaistu chIrNam ||', 'The knowers of Brahman, performing actions, with faith, offering to the one Rishi — to them alone should this knowledge be taught, who have duly performed the head-vow.'),
      V('mundaka.3.2.11', 'tadetatsatyamR^iShira~NgirAH purovAcha naitadachIrNavrato.adhIte | namaH paramaR^iShibhyo namaH paramaR^iShibhyaH ||', 'Thus the seer Angiras declared this truth. One who has not performed the vow should not study this. Salutations to the supreme seers! Salutations to the supreme seers!'),
    ]),
  ]
)

// Clean up LaTeX artifacts from ITRANS strings
function cleanItrans(s) {
  return s.replace(/\\{\\s*m\\+\\s*\\}/g, '')
           .replace(/\\{\\s*m[+\\s]*\\}/g, '')
           .replace(/\\{\\\\m\\+\\}/g, '')
           .replace(/\\[\\d+[a-z]*\\]/gi, '')
}

// ── Generate TypeScript output ──────────────────────────────────

function upanishadToTS(u) {
  const json = JSON.stringify(u, null, 2)
    .replace(/"sanskritName": "([^"]+)"/g, (m, s) => `sanskritName: \`${s}\``)
  return `export const ${u.id}Upanishad: Upanishad = ${json}`
}

const ts = `// Extended Upanishads data file - auto-generated from authentic ITRANS sources
// Sources: sanskritdocuments.org (proofread ITRANS), translated by Swami Gambhirananda
// Devanagari generated using @indic-transliteration/sanscript

${upanishadToTS(kena)}

${upanishadToTS(aitareya)}

${upanishadToTS(prashna)}

${upanishadToTS(mundaka)}

export const extendedUpanishads = [kenaUpanishad, aitareyaUpanishad, prashnaUpanishad, mundakaUpanishad]
`

fs.writeFileSync('src/lib/upanishad-data-extended.ts', ts, 'utf8')
console.log(`Generated data file successfully!
Kena: ${kena.verses.length} verses
Aitareya: ${aitareya.verses.length} verses
Prashna: ${prashna.verses.length} verses
Mundaka: ${mundaka.verses.length} verses
Total: ${kena.verses.length + aitareya.verses.length + prashna.verses.length + mundaka.verses.length} verses`)
