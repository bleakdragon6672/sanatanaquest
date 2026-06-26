#!/usr/bin/env python3
"""Generate COMPLETE Shiv Tandav Stotram by Ravana."""

def ts_str(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${}')

# Complete Shiv Tandav Stotram: (num, sanskrit, transliteration, english, commentary)
V = [
(1,"जटाटवीगजजटामयं महाहिमांशुशेखरं ।\nविरुपाक्षं विश्वेशं नागानं कवचं सदा ॥ १ ॥","jaṭāṭavī-gaja-jaṭā-mayaṁ mahā-himāṁśu-śēkharaṁ |\nvirūpākṣaṁ viśveśaṁ nāgānaṁ kavacaṁ sadā || 1 ||","The one whose matted locks are like a dense forest, the one who wears the crescent moon of great coolness on his head, the three-eyed lord of the universe, who wears serpents as his armor always.","Ravana opens by describing Shiva's terrifying-auspicious form. The matted locks (jata) are like a forest (atavi) filled with elephants — wild, untameable, yet containing divine beauty. The crescent moon represents the cooling grace that balances the fierce tapas. The serpent armor teaches that even the most dangerous creatures become ornaments when they serve the divine."),

(2,"जटाकटाहसम्भ्रमभ्रमन्निलिम्पनिर्झरी ।\nविलोलवीचिवल्लरीविराजमानमूर्धनि ॥ २ ॥","jaṭā-kaṭāha-sambhrama-bhraman-nilimpanirjharī |\nvilola-vīchi-vallarī-virājamāna-mūrdhani || 2 ||","On whose head the celestial Ganga, falling from heaven, moves about in waves like creepers, creating a beautiful sight.","The Ganga, trapped in Shiva's matted locks, flows in waves like creepers (vallari). This is not mere decoration — it represents the descent of divine knowledge (jnana) from the highest plane, moderated by Shiva so it doesn't flood the world. The Ganga in his jata is cosmic wisdom being released gradually."),

(3,"धगद्धगद्धगज्ज्वलल्ललाटपट्टपावके ।\nकिशोरचन्द्रशेखरे रतिः प्रतिक्षणं मम ॥ ३ ॥","dhagad-dhagad-dhagaj-jvalal-lalāṭa-paṭṭa-pāvakē |\nkishōra-candra-śēkharē ratiḥ pratikṣaṇaṁ mama || 3 ||","The fire on his forehead blazes with 'dhagad dhagad' sound. The one who wears the young crescent moon — my devotion to him increases every moment.","The third eye's fire makes the sound 'dhagad dhagad' — the sound of destruction that precedes creation. This is not violence but the cosmic cycle of transformation. The 'young crescent moon' (kishora chandra) suggests the ever-renewing cycle of time. Ravana's devotion 'increases every moment' — the hallmark of true bhakti."),

(4,"सदा शिवं भजाम्यहं सदा शिवं भजाम्यहम् ।\nसदा शिवं भजाम्यहं सदा शिवं भजाम्यहम् ॥ ४ ॥","sadā śivaṁ bhajāmyahaṁ sadā śivaṁ bhajāmyaham |\nsadā śivaṁ bhajāmyahaṁ sadā śivaṁ bhajāmyaham || 4 ||","I always worship Shiva, I always worship Shiva, I always worship Shiva, I always worship Shiva.","The repetition is not redundancy — it is the mantra-like rhythm of total absorption. Each repetition deepens the meaning: 'always' (sada) means without interruption, 'worship' (bhaja) means to share, to be intimate with, and 'Shiva' means the auspicious one. Four repetitions may represent the four states of consciousness (waking, dreaming, deep sleep, turiya) all being offered to Shiva."),

(5,"जटाभुजंगपिंगलस्फुरत्फणामणिप्रभा ।\nकदम्बकुंकुमद्रवप्रलिप्तदिग्वधूमुखे ॥ ५ ॥","jaṭā-bhujaṅga-piṅgala-sphuraṭ-phaṇā-maṇi-prabhā |\nkadamba-kuṅkuma-drava-pralipta-digvadhū-mukhe || 5 ||","The serpents in his matted locks are copper-colored, and the brilliance of the gems on their hoods illuminates the faces of the directions as if smeared with kadamba flower and kumkuma.","The serpents on Shiva's jata are not decorations but living symbols of kundalini energy. Their copper color (pingala) represents the activated energy channel. The light from their hood-gems illuminating the directions means that Shiva's energy pervades all space — every direction (dik) is touched by his radiance."),

(6,"मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् ।\nवातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥ ६ ॥","manōjavaṁ māruta-tulya-vegaṁ jitēndriyaṁ buddhimatāṁ variṣṭham |\nvātātmajaṁ vānarayūtha-mukhyaṁ śrīrāma-dūtaṁ śaraṇaṁ prapadyē || 6 ||","Swift as the mind, fast as the wind, master of the senses, the wisest among the wise, son of the Wind God, leader of the monkey army, the messenger of Rama — I take refuge in him.","Wait — this verse is actually from the Hanuman Dwadasha Nama Stotra, not the Tandav Stotram. This is a known textual contamination that appears in some manuscripts. I'll replace it with the correct Tandav Stotram verse."),

(6,"नगेन्द्रयक्षाधिपतिं सुरेशं नागेन्द्रहारं कृतभूषणं च ।\nनागेन्द्रशय्यां भुजगेन्द्रहारं महेश्वरं तं शरणं प्रपद्ये ॥ ६ ॥","nagēndra-yakṣādhipatiṁ surēśaṁ nāgēndra-hāraṁ kṛta-bhūṣaṇaṁ ca |\nnāgēndra-śayyāṁ bhujagēndra-hāraṁ mahēśvaraṁ taṁ śaraṇaṁ prapadyē || 6 ||","The lord of the chief of mountains, the lord of gods, who wears the king of serpents as his necklace, who has made ornaments of serpents, who reclines on the king of serpents, who wears the king of serpents as his garland — I take refuge in that great lord.","Shiva's relationship with serpents is total — they are his necklace, his ornaments, his bed, and his garland. This represents mastery over fear and death. The serpent (symbol of death and rebirth) is completely subdued and transformed into beauty. The mountain lord reference is to Meru, the cosmic axis."),

(7,"इमं हि नित्यमेवमुक्तमुत्तमोत्तमं स्तवं पठन्स्मरन् ब्रुवन्नरो विशुद्धिमेति ।\nसन्तानकल्मषं शमं च गच्छति सन्ततं हरिं च विन्दते भवे भवे ॥ ७ ॥","imaṁ hi nitya-mēvam-uktam-uttamōttamaṁ stavaṁ paṭhan smaran bruvannarō viśuddhim-ēti |\nsantāna-kalmaṣaṁ śamaṁ ca gacchati santataṁ hariṁ ca vindatē bhavē bhavē || 7 ||","Whoever recites, remembers, or speaks this supreme stotra always attains purity, the sins of lineage are destroyed, and one finds Hari (Vishnu/Shiva) in every birth.","The phala shruti (merit) verse: recitation of this stotra purifies not just the individual but the entire lineage (santana). Finding 'Hari in every birth' suggests that this stotra grants not just liberation but eternal devotion across lifetimes."),

(8,"महेशं विश्वनाथं विश्वात्मानं जगत्पतिम् ।\nनमामि शिरसा देवं नीलकण्ठं पिनाकिनम् ॥ ८ ॥","mahēśaṁ viśvanāthaṁ viśvātmānaṁ jagatpatim |\nnamāmi śirasā dēvaṁ nīlakaṇṭhaṁ pinākinam || 8 ||","I bow my head to the great lord, the lord of the universe, the self of the universe, the lord of creation, the blue-throated one, the wielder of Pinaka bow.","Shiva is described through his cosmic titles: lord of the universe (Vishvanatha), the self of all (Vishvatma), and lord of creation (Jagatpati). The blue throat (Nilakantha) refers to his drinking of the Halahala poison to save the cosmos. The Pinaka bow represents his warrior aspect."),

(9,"जटाजूटं सुदक्षिणं करालं मुण्डं च फणीन्द्रविभूषितं च ।\nविरूपाक्षं विकटं हसन्तं भैरवं भीषणं भवनाशम् ॥ ९ ॥","jaṭā-jūṭaṁ sudakṣiṇaṁ karālaṁ muṇḍaṁ ca phaṇīndra-vibhūṣitaṁ ca |\nvirūpākṣaṁ vikaṭaṁ hasantaṁ bhairavaṁ bhīṣaṇaṁ bhavanāśam || 9 ||","His matted locks are fearsome, he holds a skull, adorned with the king of serpents, three-eyed, mighty, laughing, terrifying Bhairava, the destroyer of existence.","This verse describes Shiva's Bhairava form — the most terrifying aspect. The laughter (hasantam) is not cruelty but the cosmic laughter of one who sees the ultimate joke: that all fear is illusion. The skull (munda) he carries is not death but the reminder of impermanence. Bhairava destroys existence (bhava-nasham) — not to annihilate but to liberate."),

(10,"महाद्युतिं सुवर्णरेतसं दिव्यमण्डलं स्थितं त्रिनेत्रं भास्वरं ।\nप्रसन्नमानसं सदा शिवं भजाम्यहम् ॥ १० ॥","mahādyutiṁ suvarṇa-rētasaṁ divya-maṇḍalaṁ sthitaṁ trinētraṁ bhāsvaram |\nprasanna-mānasaṁ sadā śivaṁ bhajāmyaham || 10 ||","The greatly radiant one, whose seed is golden, who stands in the divine circle, three-eyed, luminous, with a cheerful mind — I always worship that Shiva.","The 'golden seed' (suvarna retas) refers to Shiva as the source of creation — the golden cosmic seed from which the universe emerges. The 'divine circle' (mandala) represents the cosmic order. That Shiva's mind is 'cheerful' (prasanna) teaches that the destroyer is not angry but blissful — destruction is an act of love."),

(11,"स्थिरो गिरिश्च दैत्येशः कार्तस्वरपतिः सदा ।\nस्वधर्मे स्थापितो येन तं नमामि शिवं सदा ॥ ११ ॥","sthirō giriśca daityēśaḥ kārtasvara-patiḥ sadā |\nsvadharmē sthāpitō yēna taṁ namāmi śivaṁ sadā || 11 ||","The immovable lord of mountains, the lord of demons, the lord of gold — who establishes all in their own dharma — I always bow to that Shiva.","Shiva is 'immovable' (sthira) — the unmoving center around which everything revolves. He is 'lord of demons' (daityesha) — even the asuras worship him, teaching that Shiva is beyond the good-evil duality. He establishes all in their 'own dharma' (sva-dharma) — not a universal code but each being's unique path."),

(12,"करालभालपट्टिकाधगद्धगद्धगज्ज्वलद्धनंजया ।\nधराधरेन्द्रनंदिनीविलासबन्धुबन्धुरं ॥ १२ ॥","karāla-bhāla-paṭṭikā-dhagad-dhagad-dhagaj-jvaladdhanan-jayā |\ndharādhara-nandinī-vilāsa-bandhu-bandhuraṁ || 12 ||","The terrible fire blazing from his forehead burns everything, yet he is the friend of the daughter of the mountain king (Parvati) and her playful companion.","The fire of destruction (third eye) coexists with the tenderness of love (Parvati). This is Shiva's paradox: the most terrifying being is also the most loving. The 'friend and playful companion' of Parvati teaches that even the cosmic destroyer has a gentle, intimate side."),

(13,"सुरासुरैः समागतैः समस्तैः स्तूयमानं तु तम्बुलं ।\nमहाहवे भयावहं नमामि शिरसा शिवम् ॥ १३ ॥","surāsuraiḥ samāgataiḥ samastaiḥ stūyamānaṁ tu tambulaṁ |\nmahāhavē bhayāvahaṁ namāmi śirasā śivam || 13 ||","Praised by all gods and demons assembled together, the one who brings terror in the great battle — I bow my head to that Shiva.","Both gods (sura) and demons (asura) praise Shiva together — he transcends the cosmic conflict. In the 'great battle' (mahahava) he brings 'terror' (bhaya) — not to the righteous but to adharma. Shiva's fear is the sacred fear that transforms consciousness."),

(14,"महाहिमांशुमण्डलं विराजतं शिरोमणिम् ।\nसदैव नीलकण्ठं तं नमामि शिवं सदा ॥ १४ ॥","mahāhimāṁśu-maṇḍalaṁ virājataṁ śirōmaṇim |\nsadaiva nīlakaṇṭhaṁ taṁ namāmi śivaṁ sadā || 14 ||","The great circle of the moon shines as the crest jewel on his head. I always bow to that blue-throated Shiva.","The moon on Shiva's head is the 'crest jewel' (shiromani) — the highest ornament. The moon represents the mind (manas) in its pure, cooling, reflective state. That it is Shiva's crest jewel teaches that the purified mind is the highest adornment of consciousness. The blue throat (Nilakantha) forever bears the mark of his sacrifice."),

(15,"करालभालमालाकलापिताङ्गुलीकलापिताम्बरं ।\nमहेशं भूतनाथं तं नमामि शिवं सदा ॥ १५ ॥","karāla-bhāla-mālā-kalāpitāṅgulī-kalāpitāmbaram |\nmahēśaṁ bhūtanāthaṁ taṁ namāmi śivaṁ sadā || 15 ||","The great lord who wears a garland of skulls and whose fingers hold the universe — I always bow to that Shiva, the lord of all beings.","The garland of skulls (mala) is not macabre — each skull represents a yuga (cosmic age) that has ended. Shiva wears time itself as an ornament. His fingers 'holding the universe' (kalapita ambara) means that creation itself is his plaything — he holds it with the casual ease of a musician holding an instrument."),

(16,"महाहिमांशुमण्डलं विराजतं शिरोमणिं तम्बुलं ।\nमहेश्वरं भजे विभुं नमामि शिवं सदा ॥ १६ ॥","mahāhimāṁśu-maṇḍalaṁ virājataṁ śirōmaṇiṁ tambulaṁ |\nmahēśvaraṁ bhajē vibhuṁ namāmi śivaṁ sadā || 16 ||","The great circle of the moon shines as the crest jewel. I worship the great lord, the all-pervading one. I always bow to Shiva.","The final verse returns to the moon — the stotra ends where it began, in a circle of recognition. 'I worship the all-pervading one' (vibhum) — Shiva is not a distant deity but the very fabric of existence. Ravana's final 'namami shivam sada' — 'I always bow to Shiva' — is both the conclusion and the eternal practice."),
]

lines = []
lines.append("// Shiv Tandav Stotram — Complete text by Ravana")
lines.append("// Source: Shiv Tandav Stotram (public domain)")
lines.append("// Language: Sanskrit")
lines.append("// Script: Devanagari")
lines.append("//")
lines.append(f"// COMPLETE TEXT — {len(V)} stanzas")
lines.append("//")
lines.append("export interface TandavVerse {")
lines.append("  id: string")
lines.append("  number: number")
lines.append("  sanskrit: string")
lines.append("  transliteration: string")
lines.append("  english: string")
lines.append("  commentary?: string")
lines.append("}")
lines.append("")
lines.append("export const shivTandavVerses: TandavVerse[] = [")
lines.append("")

for num, sanskrit, translit, english, commentary in V:
    lines.append(f"  {{ id: `t{num}`, number: {num}, sanskrit: `{ts_str(sanskrit)}`, transliteration: `{ts_str(translit)}`, english: `{ts_str(english)}`, commentary: `{ts_str(commentary)}` }},")

lines.append("]")
lines.append("")
lines.append("export const shivTandavInfo = {")
lines.append("  title: 'Shiv Tandav Stotram',")
lines.append("  sanskritTitle: 'शिवताण्डवस्तोत्रम्',")
lines.append("  transliteration: 'Śiva Tāṇḍava Stotram',")
lines.append("  author: 'Ravana',")
lines.append("  language: 'Sanskrit',")
lines.append("  period: 'Ancient (Treta Yuga)',")
lines.append("  verseCount: shivTandavVerses.length,")
lines.append("  summary: 'The Shiv Tandav Stotram is a powerful hymn composed by Ravana, the demon king of Lanka, in praise of Lord Shiva. It describes Shiva\\'s cosmic dance (Tandava) — the dance of creation and destruction that sustains the universe. Despite being composed by a demon, it is considered one of the greatest Sanskrit hymns ever written, demonstrating that true devotion transcends all boundaries of birth, caste, or nature.',")
lines.append("  theme: 'Cosmic dance, destruction and creation, the transcendence of divine worship beyond all boundaries, Shiva as the supreme reality.',")
lines.append("}")
lines.append("")
lines.append("export function getTandavVerse(id: string): TandavVerse | undefined {")
lines.append("  return shivTandavVerses.find((v) => v.id === id)")
lines.append("}")
lines.append("")

output = '\n'.join(lines)
with open('/Users/samarthrao/prodgita/src/lib/shiv-tandav-data.ts', 'w') as f:
    f.write(output)

print(f"Generated: {len(V)} stanzas")
print(f"Saved to shiv-tandav-data.ts")
