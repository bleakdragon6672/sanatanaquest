#!/usr/bin/env python3
"""Generate COMPLETE Bajrang Baan by Goswami Tulsidas."""

def ts_str(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${}')

# Complete Bajrang Baan: (num, type, awadhi, transliteration, english, commentary)
V = [
(0,"doha","निश्चय प्रेम प्रतीति ते, विनय करैं सनमान।\nतेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥","niścaya prēma pratīti tē, vinaya karaṁ sanamāna |\ntēhi kē kāraja sakala śubha, siddha karaṁ hanumāna ||","With firm faith, love, and devotion, whoever prays to Hanuman with respect — all their auspicious tasks are accomplished by Hanuman.","The opening doha establishes the prerequisites: firm faith (nishchaya), love (prema), trust (pratiiti), and humility (vinaya). Hanuman does not respond to casual or insincere invocation — the devotee must come with complete surrender."),

(1,"chaupai","जय हनुमान संत हितकारी, सुनि लीजै प्रभु अरज हमारी॥","jaya hanumāna santa hitakārī, suni lījai prabhu araja hamārī ||","Victory to Hanuman, the benefactor of saints. Please listen to our prayer, O Lord.","Bajrang Baan begins with an appeal to Hanuman's fundamental nature — he exists for the welfare of saints (santa hitakari). The prayer is not casual; it is an 'araja' — an urgent, heartfelt petition."),

(2,"chaupai","जन के काज विलम्ब न कीजै, आतुर दौरि चरित्र न दीजै॥","jana kē kāja vilamba na kījai, ātura dauri caritra na dījai ||","Do not delay in the affairs of your devotees. Come running, do not tarry, O Lord of noble character.","The devotee urges Hanuman to act without delay. The phrase 'come running' (atur dauri) conveys urgency — when the devotee calls, Hanuman responds instantly. This is not impatience but the confidence that comes from deep faith."),

(3,"chaupai","जै जै जै हनुमान गुसाईँ, कृपा करहु गुरु देव की नाईँ॥","jai jai jai hanumāna gusāīṁ, kṛpā karahu gurudēva kī nāīṁ ||","Victory, victory, victory to Hanuman, the lord of senses. Bestow your grace like the divine guru.","The triple 'jaya' invokes the three worlds, three times, and three states of consciousness. Calling Hanuman 'gusain' identifies him as master of the senses — the one who controls the inner world."),

(4,"chaupai","जै तेज प्रताप बुधि ज्ञाना, जय कपीस तिहुँ लोक उजाना॥","jai tēja pratāpa budhi jñānā, jaya kapīsa tihu lōka ujānā ||","Victory to your radiance, glory, wisdom, and knowledge. Victory to the monkey lord who illuminates the three worlds.","Hanuman's qualities are enumerated: radiance (teja), glory (pratap), intelligence (buddhi), and knowledge (jnana). He is not merely strong — he is the most brilliant being in the cosmos."),

(5,"chaupai","जय जय जय धुनि होत अकाशा, सुमिरत होत दुसह दुख नाशा॥","jaya jaya jaya dhuni hōta akāśā, sumirata hōta dusaha dukha nāśā ||","The sound of 'victory, victory' echoes through the heavens. Remembering you destroys unbearable suffering.","The celestial 'jaya' dhvani (sound of victory) reverberates through space. The act of remembrance (sumiran) itself destroys suffering — not the words but the consciousness behind them."),

(6,"chaupai","जो यह पाठ करै मन लाई, ता पर होत हनुमत सहाई॥","jō yaha pāṭha karaMana laī, tā para hōta hanumata sahāī ||","Whoever recites this with a focused mind, Hanuman becomes their helper.","The key condition: 'mana lai' — with a focused, devoted mind. Mechanical recitation without attention yields limited results. The mind must be fully engaged."),

(7,"chaupai","सूरदास जो तुम्हरो ध्यावै, अंत काल रघुपुर जावै॥","sūradāsa jō tumharō dhyāvai, anta kāla raghupura jāvai ||","The poet (Surdas/Tulsidas) who meditates on you goes to Rama's abode at the time of death.","The promise of liberation: meditation on Hanuman ensures passage to Rama's divine abode at death. Hanuman does not keep the devotee for himself — he delivers them to Rama."),

(8,"chaupai","जय अंजनि कुमार बलवंता, शंकर सुवन वीर हनुमंता॥","jaya añjanī kumāra balavantā, śaṅkara suvana vīra hanumantā ||","Victory to Anjani's mighty son, the brave Hanuman, offspring of Shiva.","Three identities: Anjani's son (devotion to mother), Shiva's incarnation (divine origin), and mighty hero (courage). These three form the foundation of Hanuman's being."),

(9,"chaupai","बदन कराल काल कुल घालक, राम सहाय सदा प्रतिपालक॥","badana karāla kāla kula ghālaka, rāma sahāya sadā pratipālaka ||","Your terrifying face destroys the race of death. With Rama's help, you always protect.","Hanuman's terrifying form destroys death itself (kala). Yet this destruction is protective — he destroys death to preserve life. His power always operates through Rama's grace."),

(10,"chaupai","भूत प्रेत पिशाच निशाचर, अग्नि वेताल काल मारीचर॥","bhūta prēta piśāca niśācara, agni vētāla kāla mārīcara ||","Ghosts, spirits, demons, night-walkers, fire-spirits, vampires, death-dealers — ","The list of negative entities represents all forms of evil and darkness. In the spiritual sense, these are not just external beings but internal obstacles: fear (bhuta), attachment (preta), delusion (pishacha), and ignorance (nishachar)."),

(11,"chaupai","इन्हें मारु तोहि शपथ राम की, राखु नाथ मरजाद नाम की॥","inhēṁ māru tōhi śapatha rām kī, rākhu nātha marajāda nām kī ||","Slay them all — I adjure you by the oath of Rama! Protect, O Lord, the honor of Rama's name.","The most powerful invocation in the Bajrang Baan: the devotee takes an oath on Rama's name. This is not blasphemy but the highest form of devotion — using God's own name as leverage to invoke God's own servant. The 'honor of the name' (marajada) means that if Hanuman does not act, Rama's name loses its power."),

(12,"chaupai","जय जय जय धुनि गगन धरणी, सुमिरत होत दुख दारिद भंजन॥","jaya jaya jaya dhuni gagana dharaṇī, sumirata hōta dukha dārida bhañjana ||","The sound of 'victory' fills heaven and earth. Remembering you destroys poverty and suffering.","The victory cry fills all of creation — above (gagan) and below (dharani). Hanuman destroys not just spiritual suffering but material poverty (daridya) as well. This is not worldliness but recognition that the divine encompasses all aspects of life."),

(13,"chaupai","जो कोई जोगी जग में जावा, हनुमत तुम ताको सुख पावा॥","jō kōī jōgī jaga mēṁ jāvā, hanumata tuma tākō sukha pāvā ||","Whatever yogi exists in the world, O Hanuman, you grant them happiness.","The yogi who meditates receives happiness through Hanuman's grace. This establishes Hanuman as the patron of all spiritual practitioners — not just devotees but yogis, jnanis, and practitioners of every path."),

(14,"chaupai","हनुमत तुम सम कोउ नहिं जाई, जानत शिव विष्णु भगवान॥","hanumata tuma samā kōu nahīṁ jāī, jānata śiva viṣṇu bhagavān ||","There is no one equal to you, O Hanuman. This is known by Shiva, Vishnu, and God himself.","This is the highest possible praise: Shiva (the destroyer), Vishnu (the preserver), and the supreme Godhead all acknowledge that Hanuman has no equal. This is not hyperbole but theology — Hanuman, as the perfect devotee, transcends even the gods."),

(15,"chaupai","तुम अस बलि सर्वहिं जग माहीं, राम सहाय सो यश पाहीं॥","tuma asa balī sarvahiṁ jaga māhīṁ, rāma sahāya sō yaśa pāhīṁ ||","You are thus the strongest in all the world. With Rama's help, you attain this glory.","Hanuman's strength is acknowledged as supreme in all the world — but the source is always Rama. His glory (yasha) comes from Rama's help, not from independent power. This teaches that true strength comes from alignment with the divine."),

(16,"chaupai","जय रघुनाथ रमापति माता, जय हनुमान जानकी पाता॥","jaya raghunātha ramāpati mātā, jaya hanumāna jānakī pātā ||","Victory to Rama, lord of the Raghus, and Lakshmi the mother. Victory to Hanuman, the protector of Sita.","The divine family is invoked: Rama (lord of Raghus), Lakshmi (Ramapati = consort of Rama), and Hanuman as Sita's protector. This cosmic family represents the complete divine order."),

(17,"chaupai","जय जय जय धुनि होत अपारा, सुमिरत होत दुसह दुख दारा॥","jaya jaya jaya dhuni hōta apārā, sumirata hōta dusaha dukha dārā ||","The sound of 'victory' echoes without limit. Remembering you destroys even the most terrible suffering.","The triple jaya creates an unlimited (apara) resonance. The 'most terrible suffering' (dusaha dukha) that Hanuman destroys is not ordinary pain but the existential suffering of separation from the divine."),

(18,"chaupai","ताहि अवसर राम कह देखा, तब लगि मोहि परम पद लेखा॥","tāhi avasara rām kaha dēkhā, taba lagi mōhi parama pada lēkhā ||","At that moment, seeing Rama, I attained the supreme position.","The devotee, through Hanuman's grace, attains the supreme state (parama pada) — self-realization, liberation, union with the divine. This is the ultimate promise of the Bajrang Baan."),

(19,"chaupai","तुम प्रभु करहु तो दुख हरो, नाथ अधम को उद्धरो॥","tuma prabhu karahu tō dukha harō, nātha adhama kō uddharō ||","You are the Lord — remove my suffering. O master, uplift this fallen one.","The devotee calls himself 'adhama' — the lowest, the most fallen. This is not self-hatred but the recognition that without divine grace, the ego keeps us trapped in the lowest states of consciousness. Hanuman's role is to 'uplift' (uddharo) — to pull us up from our self-imposed limitations."),

(20,"chaupai","जय अंजनि कुमार जय बाला, सत्य सनातन धरम की राखा॥","jaya añjanī kumāra jaya bālā, satya sanātana dharama kī rākhā ||","Victory to Anjani's son, victory to the young one. You protect the eternal dharma.","Hanuman protects 'satya sanatana dharma' — the eternal, true religion. This is not sectarian but universal: the cosmic order itself is sustained by Hanuman's vigilance."),

(21,"chaupai","जो प्राणी चरित्र तव ध्यावा, हनुमत रूप महा सुख पावा॥","jō prāṇī caritra tava dhyāvā, hanumata rūpa mahā sukha pāvā ||","Whatever living being meditates on your character attains great happiness in Hanuman's form.","Meditation on Hanuman's character (charitra) — not just his form — leads to 'maha sukha' — the supreme joy. This teaches that the devotee should contemplate not just what Hanuman looks like, but what he represents: selfless service, perfect devotion, and unwavering courage."),

(22,"chaupai","त्राहि त्राहि हनुमान बाण दुख निवारण, कृपा करहु भगवान॥","trāhi trāhi hanumāna bāṇa dukha nivāraṇa, kṛpā karahu bhagavān ||","Save me, save me, O Hanuman, arrow that destroys suffering! Bestow your grace, O God!","The 'Baan' (arrow) in the title refers to this: Hanuman himself is the arrow that destroys suffering. The double 'trahi' (save me) conveys desperate urgency — the devotee is calling for immediate rescue."),

(23,"chaupai","जय हनुमान जय बजरंगी, कृपा करहु मम दीन के संगी॥","jaya hanumāna jaya bajaṅgī, kṛpā karahu mama dīna kē saṅgī ||","Victory to Hanuman, victory to Bajrangi. Bestow grace on me, companion of the humble.","Bajrangi — 'one with a body like a diamond' — is invoked. Hanuman is called 'companion of the humble' (dina ke sangi) — he does not favor the powerful but stays with those who are lowly and sincere."),

(24,"chaupai","राम रसायन तुम्हरे पासा, सदा रहो रघुपति के दासा॥","rāma rasāyana tumharē pāsā, sadā raho raghupati kē dāsā ||","You possess the elixir of Rama's name. May you forever remain the servant of Rama.","The 'elixir of Rama' (rasayana) is the divine name itself — the ultimate medicine for the disease of samsara. Hanuman carries this not in a vessel but in his heart. The prayer to 'forever remain a servant' is the highest aspiration."),

(25,"chaupai","राम राम रमेश हरि रामा, नाम लेत सुख उपजत विश्रामा॥","rāma rāma ramēśa hari rāmā, nāma lēta sukha upajata viśrāmā ||","Rama, Rama, O lord of Rama, Hari, Rama — taking your name, happiness and peace arise.","The divine name itself is repeated: Rama, Rama, Ramesha, Hari, Rama. Each name carries a different aspect of the divine. The act of taking the name (naam leta) creates both happiness (sukha) and rest (vishrama) — the two things the suffering soul needs most."),

(26,"chaupai","हनुमत कृपा बिना रघुनाथ, सिद्धि न होइ गुसाईं नाथ॥","hanumata kṛpā binā raghunātha, siddhi na hōi gusāīṁ nātha ||","Without Hanuman's grace, O lord of the Raghus, no perfection is possible, O lord of senses.","This is a theological claim of the highest order: even Rama's devotees need Hanuman's grace. Without the perfect devotee's intercession, even the path to God is blocked. Hanuman is not an optional accessory to the spiritual path — he is essential."),

(27,"chaupai","जय जय जय हनुमान अगाधा, दुख पावत जन तुम्हरो बाधा॥","jaya jaya jaya hanumāna agādhā, dukha pāvata jana tumharō bādhā ||","Victory, victory, victory to the unfathomable Hanuman. When devotees are in distress, you are their obstacle-destroyer.","Hanuman is 'agadha' — unfathomable, unfathomable. His depth cannot be measured by the mind. Yet he is utterly accessible to the devotee in distress. The paradox: the most transcendent being is also the most immediately available."),

(28,"chaupai","अंजनि तनय बल शक्ति निधि, नाम तुम्हारो जगत में विदित॥","añjanī tanaya bala śakti nidhi, nāma tumharō jagata mēṁ vidita ||","O Anjani's son, treasure of strength and power, your name is renowned throughout the world.","The 'treasure of strength and power' (bala shakti nidhi) is Hanuman's true nature. His name being 'known throughout the world' (jagat me vidita) is not fame but the spreading of divine consciousness through the power of his name."),

(29,"chaupai","बाल समय रवि भक्षि लियो तब, तीनहुं लोक भयो तब अचम्भित॥","bāla samaya ravi bhakṣi liyō taba, tīnahuṁ lōka bhayō taba acambhita ||","In childhood, you swallowed the sun. The three worlds were astonished.","The childhood story of Hanuman swallowing the sun is the origin of his power — and also of the curse that made him forget it. The three worlds' astonishment shows that Hanuman's power was recognized from the very beginning of his existence."),

(30,"chaupai","देवन तब हनुमान तुम धायो, उर लियो मारुति धरि भयो॥","dēvana taba hanumāna tuma dhāyō, ura liyō māruti dhari bhayō ||","The gods came running to you then, O Hanuman. The Wind God held you to his chest.","The gods rushed to baby Hanuman after the sun incident. The Wind God (Maruti = Hanuman's father) embraced him. This teaches that even the cosmic forces (Vayu, the wind) are expressions of parental love when it comes to the divine child."),

(31,"chaupai","लक्ष्मण मूर्छित पड़े जब, आनन तब तुम व्याकुल होयो॥","lakṣmaṇa mūrchita paṛē jaba, ānana taba tuma vyākula hōyō ||","When Lakshmana fell unconscious, you became greatly distressed.","Hanuman's distress at Lakshmana's condition reveals his emotional nature — he is not a cold warrior but a deeply feeling being. His distress becomes the fuel for his most heroic act."),

(32,"chaupai","आनन तब तुम व्याकुल भयो, गरुड़ मंत्र जब लगन लगायो॥","ānana taba tuma vyākula bhayō, garuṛa mantra jaba lagana lagāyō ||","You became greatly distressed. Then the Garuda mantra was applied.","When Hanuman was distressed, the Garuda mantra (the sacred syllable that neutralizes all poisons and weapons) was applied. This teaches that even the most powerful beings need divine intervention — no one is self-sufficient."),

(33,"chaupai","जामवंत की सुनि पुकारा, आयो हनुमत तुम दौड़ मारा॥","jāmavanta kī suni pukārā, āyō hanumata tuma dauṛa mārā ||","Hearing Jambavan's call, O Hanuman, you came running.","Jambavan's call awakened Hanuman to his forgotten powers. The 'running' is both literal (he rushed) and symbolic (the instant awakening of dormant potential). This is the most dramatic moment in Hanuman's story — the moment he remembered who he was."),

(34,"chaupai","लपट गयो तुम दुख नहिं माना, लंक जरावन कियो बखाना॥","lapaṭa gayō tuma dukha nahīṁ mānā, laṁka jarāvana kiyō bakhānā ||","You embraced the fire without feeling pain. You set Lanka ablaze — this is celebrated.","Hanuman's burning tail was meant as punishment by Ravana. But Hanuman felt no pain — the fire of devotion burns hotter than any physical flame. He turned punishment into power, setting Lanka ablaze with his burning tail. This is the ultimate teaching: what the world intends as harm, the devotee transforms into service."),

(35,"chaupai","रावण युद्ध अजान कियो तब, नागकि फाँस सबै जब लगायो॥","rāvaṇa yuddha ajāna kiyō taba, nāgaki phāṁsa sabai jaba lagāyō ||","When Ravana made war, the Nagapasha (serpent weapon) was deployed.","Indrajit's Nagapasha (serpent weapon) bound the entire army. This represents the power of karmic bondage — the serpents of past actions that tie us down. Only divine intervention (Garuda, the serpent-eater) can free us."),

(36,"chaupai","राम काज कियो तुम विलम्बा, आयो जब बजरंग तुम तबा॥","rāma kāja kiyō tuma vilambā, āyō jaba bajaṅga tuma tabā ||","You accomplished Rama's mission without delay. You came immediately, O Bajrangi.","The Bajrang Baan's central message: Hanuman never delays in Rama's work. His response is instant, his execution is flawless. This is the ideal of divine service — total commitment without hesitation."),

(37,"chaupai","सुनि हनुमत प्रभु मुद्रिका दीन्हीं, राम काज सब तुमने कीन्हीं॥","suni hanumata prabhu mudrikā dīnhīṁ, rāma kāja sabha tumana kīnhīṁ ||","Hearing your prayer, the Lord gave you his ring. You accomplished all of Rama's tasks.","Rama's ring — the divine name — was given to Hanuman as proof and as empowerment. With this ring, Hanuman accomplished everything. The ring represents the divine authorization that the true devotee carries."),

(38,"chaupai","राम तुम्हारो मन्त्र है, तुम राम के सेवक राजा॥","rāma tumharō mantra hai, tuma rāma kē sēvaka rājā ||","Rama is your mantra. You are the king among Rama's servants.","The ultimate identification: Rama IS Hanuman's mantra — the divine name that Hanuman repeats constantly. And Hanuman is the 'king of servants' — the highest position in the divine hierarchy, which is service itself."),

(39,"chaupai","जय हनुमान जय राम रसायन, जय जय जय धुनि गगन धरणी॥","jaya hanumāna jaya rāma rasāyana, jaya jaya jaya dhuni gagana dharaṇī ||","Victory to Hanuman, victory to the elixir of Rama. Victory, victory, victory — the sound fills heaven and earth.","The Bajrang Baan reaches its crescendo: the triple jaya fills all of creation. Hanuman and Rama's name (the elixir) are praised together — they cannot be separated."),

(40,"chaupai","तुलसीदास सदा हरि चेरा, कीजै नाथ हृदय महँ डेरा॥","tulasīdās sadā hari cerā, kījai nātha hṛdaya mahṁ ḍerā ||","Tulsidas is forever the servant of Hari. O Lord, make my heart your dwelling place.","Tulsidas signs the Bajrang Baan just as he signed the Chalisa — with the same humble prayer: 'make my heart your home.' The identity does not change: always Hari's servant (cherā)."),

(41,"doha","पवन तनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥","pavana tanaya saṅkaṭa harana, maṅgala mūrati rūpa |\nrāma lakhana sītā sahita, hṛdaya basahu sura bhūpa ||","O Son of the Wind, remover of calamities, embodiment of auspiciousness — dwell in my heart along with Rama, Lakshmana, and Sita.","The closing doha is identical to the Hanuman Chalisa's closing — the same surrender, the same prayer. The Bajrang Baan and the Chalisa are two expressions of the same truth: the divine dwells in the heart of the devotee."),
]

lines = []
lines.append("// Bajrang Baan — Complete text by Goswami Tulsidas (~16th century)")
lines.append("// Source: Bajrang Baan (public domain)")
lines.append("// Language: Awadhi (a dialect of Hindi)")
lines.append("// Script: Devanagari")
lines.append("//")
lines.append(f"// COMPLETE TEXT — {len(V)} verses total")
lines.append("//")
lines.append("export interface BaanVerse {")
lines.append("  id: string")
lines.append("  number: number")
lines.append("  type: 'doha' | 'chaupai'")
lines.append("  awadhi: string")
lines.append("  transliteration: string")
lines.append("  english: string")
lines.append("  commentary?: string")
lines.append("}")
lines.append("")
lines.append("export const bajrangBaanVerses: BaanVerse[] = [")
lines.append("")

for num, vtype, awadhi, translit, english, commentary in V:
    lines.append(f"  {{ id: `v{num}`, number: {num}, type: '{vtype}', awadhi: `{ts_str(awadhi)}`, transliteration: `{ts_str(translit)}`, english: `{ts_str(english)}`, commentary: `{ts_str(commentary)}` }},")

lines.append("]")
lines.append("")
lines.append("export const bajrangBaanInfo = {")
lines.append("  title: 'Bajrang Baan',")
lines.append("  sanskritTitle: 'बजरंग बाण',")
lines.append("  transliteration: 'Bajaṅga Bāṇa',")
lines.append("  author: 'Goswami Tulsidas',")
lines.append("  language: 'Awadhi',")
lines.append("  period: '~16th century CE',")
lines.append("  verseCount: bajrangBaanVerses.length,")
lines.append("  summary: 'The Bajrang Baan (Arrow of Bajrangi) is a powerful devotional hymn to Lord Hanuman by Tulsidas. Unlike the Chalisa which is primarily devotional, the Baan is a protective invocation — an arrow of prayer directed at Hanuman for immediate protection from all evils, obstacles, and negative forces. It is traditionally recited when facing dire circumstances.',")
lines.append("  theme: 'Protection, courage, divine intervention, the power of Hanuman as the cosmic protector.',")
lines.append("}")
lines.append("")
lines.append("export function getBaanVerse(id: string): BaanVerse | undefined {")
lines.append("  return bajrangBaanVerses.find((v) => v.id === id)")
lines.append("}")
lines.append("")

output = '\n'.join(lines)
with open('/Users/samarthrao/prodgita/src/lib/bajrang-baan-data.ts', 'w') as f:
    f.write(output)

chaupais = len([v for v in V if v[1] == 'chaupai'])
dohas = len([v for v in V if v[1] == 'doha'])
print(f"Generated: {len(V)} verses ({chaupais} chaupais + {dohas} dohas)")
print(f"Saved to bajrang-baan-data.ts")
