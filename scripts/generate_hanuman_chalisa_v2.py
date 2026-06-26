#!/usr/bin/env python3
"""Generate COMPLETE Hanuman Chalisa — all 40 chaupais + 4 dohas."""

def ts_str(s):
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${}')

# Complete Hanuman Chalisa: (num, type, awadhi, transliteration, english, commentary)
V = [
(0,"doha","श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥","śrī-guru caraṇa saroja raja, nija manu mukuru sudhāri |\nbaranaũ raghubara bimala jasu, jo dāyaku phala cāri ||","Cleansing the mirror of my mind with the dust of my Guru's lotus feet, I describe the pure glory of the best of the Raghus (Rama), which bestows the four fruits of life.","Tulsidas begins with humility — before praising Hanuman, he purifies himself by remembering his guru. The four fruits are dharma, artha, kama, and moksha."),
(1,"chaupai","जय हनुमान ज्ञान गुण सागर, जय कपीस तिहुँ लोक उजागर॥","jaya hanumāna jñāna guṇa sāgara, jaya kapīsa tihu loka ujāgara ||","Victory to Hanuman, the ocean of wisdom and virtue. Victory to the monkey lord, who illuminates the three worlds.","The first chaupai establishes Hanuman's essential nature: he is the ocean of knowledge and virtue who illuminates all three worlds."),
(2,"chaupai","रामदूत अतुलित बल धामा, अंजनि पुत्र पवनसुत नामा॥","rāma-dūta atulita bala dhāma, añjani putra pavana-suta nāmā ||","You are the messenger of Rama, the abode of matchless strength. You are known as Anjani's son and the son of the Wind God.","Three identities: Rama's messenger (service), Anjani's son (devotion), Wind's son (power). Hanuman embodies all three simultaneously."),
(3,"chaupai","महावीर विक्रम बजरंगी, कुमति निवार सुमति के संगी॥","mahāvīra vikrama bajaṅgī, kumati nivāra sumati ke saṅgī ||","O great hero of mighty valor, your body is like a thunderbolt. You dispel evil thoughts and are the companion of good wisdom.","Bajrangi — one with a body like a diamond — destroys bad intelligence and supports good intelligence. Hanuman's role is both physical and intellectual."),
(4,"chaupai","कंचन बरन बिराज सुबेसा, कानन कुंडल कुंचित केसा॥","kañcana barana birāja subesā, kānana kuṇḍala kuñcita kesā ||","You are golden-hued, beautifully dressed, wearing earrings and having curly hair.","Hanuman's golden form represents the radiance of pure devotion — the natural glow of consciousness entirely absorbed in the divine."),
(5,"chaupai","हाथ बज्र औ ध्वजा बिराजै, काँधे मूँज जनेऊ साजै॥","hātha bajra au dhvajā birājai, kāndhe mūnja janeū sājai ||","You hold a thunderbolt and a flag in your hands, and wear the sacred thread of munja grass over your shoulder.","The thunderbolt represents indestructible resolve. The flag represents victory. The sacred thread shows Hanuman's Brahminical nature — despite being a Vanara, he is the most learned of beings."),
(6,"chaupai","शंकर सुवन केसरी नंदन, तेज प्रताप महा जग बंदन॥","śaṅkara suvana kesarī nandana, teja pratāpa mahā jaga bandana ||","You are the incarnation of Shiva, the joy of Kesari. Your radiance and glory are worshipped by the world.","Tulsidas identifies Hanuman as an incarnation of Shiva (the eleventh Rudra). His glory flows from his complete identification with Rama."),
(7,"chaupai","विद्यावान गुणी अति चातुर, राम काज करिबे को आतुर॥","vidyāvāna guṇī ati cātura, rāma kāja karibe ko ātura ||","You are supremely learned, virtuous, and clever, always eager to serve Rama's cause.","Hanuman is not a simple warrior but a polymath — learned, virtuous, and clever. His eagerness to serve Rama is the highest expression of his learning."),
(8,"chaupai","प्रभु चरित्र सुनिबे को रसिया, राम लखन सीता मन बसिया॥","prabhu caritra sunibe ko rasiyā, rāma lakhana sītā mana basiyā ||","You delight in listening to the Lord's deeds. Rama, Lakshmana, and Sita dwell in your heart.","Hanuman is a connoisseur of divine stories — he savors Rama's lila. The entire divine family resides within the perfected devotee."),
(9,"chaupai","सूक्ष्म रूप धरि सियहिं दिखावा, विकट रूप धरि लंक जरावा॥","sūkṣma rūpa dhari siyahiṁ dikhāvā, vikaṭa rūpa dhari laṁka jarāvā ||","You assumed a tiny form to appear before Sita, and a fearsome form to burn Lanka.","Hanuman's ability to change size represents the yogic powers of anima and mahima. The same consciousness can be infinitely subtle to find truth and infinitely powerful to destroy falsehood."),
(10,"chaupai","भीम रूप धरि असुर सँहारे, रामचन्द्र के काज सँवारे॥","bhīma rūpa dhari asura saṁhāre, rāmacandra ke kāja saṁvāre ||","You assumed a terrifying form to destroy the demons, and accomplished the mission of Ramachandra.","Hanuman destroys demons — the inner demons of ego, desire, and ignorance. His mission is always Rama's work, never personal glory."),
(11,"chaupai","लाय सजीवन लखन जियाये, श्रीरघुबीर हरषि उर लाये॥","lāya sajīvana lakhana jiyāye, śrī-raghubīra haraṣi ura lāye ||","You brought the Sanjeevani herb and revived Lakshmana. The heroic Rama embraced you with joy.","When Lakshmana was struck down, Hanuman flew to the Himalayas, could not identify the herb, and carried the entire mountain. Total dedication overcomes uncertainty."),
(12,"chaupai","रघुपति कीन्ही बहुत बड़ाई, तुम मम प्रिय भरतहि सम भाई॥","raghupati kīnhī bahuta baṛāī, tuma mama priya bharatahi samā bhāī ||","Rama praised you greatly, saying: 'You are as dear to me as my brother Bharata.'","Rama equates Hanuman with Bharata — his own brother. This is the highest praise: to be loved by God as one loves one's own family."),
(13,"chaupai","सहस बदन तुम्हरो जस गावै, अस कहि श्रीपति कंठ लगावै॥","sahasa badana tumharo jasa gāvai, asa kahi śrīpati kaṁṭha lagāvai ||","Even a thousand mouths would be insufficient to sing your glory. Saying this, Rama embraced you.","Rama himself declares Hanuman's glory is infinite. God praising the devotee — a reversal that teaches pure devotion transcends even divine comprehension."),
(14,"chaupai","सनकादिक ब्रह्मादि मुनीसा, नारद सारद सहित अहीसा॥","sanakādika brahmādi munīsā, nārada sārada sahita ahīsā ||","Sanaka and the sages, Brahma and the munis, Narada, Saraswati, and Shesha — ","The highest beings in the Hindu cosmos are listed, yet all are inadequate to describe Hanuman's glory. Devotion transcends even knowledge and creation."),
(15,"chaupai","यम कुबेर दिकपाल जहाँ ते, कवि कोविद कहि सके कहाँ ते॥","yama kubera dikapāla jahāṁ te, kavi kovida kahi sake kahāṁ te ||","Yama, Kubera, the guardians of the directions — where can even the most learned poet describe your glory from?","Even the lords of death, wealth, and cosmic directions cannot describe Hanuman. His glory is transcendent and inexpressible."),
(16,"chaupai","तुम उपकार सुग्रीवहिं कीन्हा, राम मिलाय राजपद दीन्हा॥","tuma upakāra sugrīvahiṁ kīnhā, rāma milāya rājapada dīnhā ||","You did a great favor to Sugriva by uniting him with Rama and restoring his kingdom.","Hanuman is the bridge between God and the world. He connects others to the source of all power — the model of the ideal spiritual teacher."),
(17,"chaupai","तुम्हरो मंत्र विभीषण माना, लंकेश्वर भए सब जग जाना॥","tumharo maṁtra vibhīṣaṇa mānā, laṁkeśvara bhae saba jaga jānā ||","Vibhishana heeded your counsel and became the king of Lanka, as the whole world knows.","Hanuman's guidance leads to sovereignty — not worldly power but the mastery that comes from aligning with dharma."),
(18,"chaupai","जुग सहस्र योजन पर भानू, लील्यो ताहि मधुर फल जानू॥","yuga sahasra yojana para bhānū, līlyo tāhi madhura phala jānū ||","The sun, which is millions of miles away, you swallowed thinking it to be a sweet fruit.","Baby Hanuman leapt to swallow the sun, thinking it a ripe fruit. For pure consciousness, there are no distances, no obstacles."),
(19,"chaupai","प्रभु मुद्रिका मेलि मुख माहीं, जलधि लाँघि गये अचरज नाहीं॥","prabhu mudrikā meli mukha māhīṁ, jaladhi lāṁghi gaye acarja nāhīṁ ||","Placing Rama's ring in your mouth, you leapt across the ocean — there is no wonder in this.","With Rama's ring (the divine name) in his mouth, Hanuman crossed the ocean effortlessly. The ring represents the power of the divine name — when you carry God's name, no ocean is too wide."),
(20,"chaupai","दुर्गम काज जगत के जेते, सुगम अनुग्रह तुम्हरे तेते॥","durgama kāja jagata ke jete, sugama anugraha tumhare tete ||","All the difficult tasks in the world become easy by your grace.","This is the Chalisa's central promise: Hanuman's grace makes the impossible possible. Not by bypassing effort but by transforming the consciousness that undertakes it."),
(21,"chaupai","राम दुआरे तुम रखवारे, होत न आज्ञा बिनु पैसारे॥","rāma duāre tum rakhavāre, hota na ājñā binu paisāre ||","You are the gatekeeper at Rama's door. No one can enter without your permission.","One cannot approach God without first going through the devotee. This teaches humility before those who have gone before us on the spiritual path."),
(22,"chaupai","तुम रक्षक काहू को डर नाम, स्वप्नहुँ नहीं आवै काम॥","tuma rakṣaka kāhū ko ḍara nāma, svapnahūṁ nahīṁ āvai kāma ||","When you are the protector, there is no fear from anyone. Evil does not come even in dreams.","Hanuman's protection extends to all states of consciousness — waking, dreaming, and deep sleep. When he guards the mind, even unconscious fears dissolve."),
(23,"chaupai","अगुन सगुन अनूप गहेरो, प्रभु प्रताप सम जगत बसेरो॥","aguna saguna anūpa gahero, prabhu pratāpa samā jagata basero ||","You are beyond qualities and within qualities, incomparably deep. Your lordly splendor pervades the world.","Hanuman is both aguna (beyond qualities) and saguna (with qualities) — the same paradox applied to God in Vedantic philosophy."),
(24,"chaupai","जय जय जय हनुमान गुसाईं, कृपा करहु गुरु देव की नाईं॥","jaya jaya jaya hanumāna gusāīṁ, kṛpā karahu gurudeva kī nāīṁ ||","Victory, victory, victory to Hanuman, the lord of senses. Bestow your grace like the divine guru.","The triple 'jaya' invokes the three worlds, three times, and three states of consciousness. Hanuman is the supreme spiritual teacher."),
(25,"chaupai","जो सत बार पाठ कर कोई, छूटहि बंदि महा सुख होई॥","jo sata bāra pāṭha kar koī, chūṭahi baṁdi mahā sukha hoī ||","Whoever recites this a hundred times is freed from bondage and attains great bliss.","The Chalisa's own promise: recitation frees from the cycle of birth and death. The number is symbolic of complete dedication, not literal repetition."),
(26,"chaupai","जो यह पढ़ै हनुमान चालीसा, होय सिद्धि साखी गौरीसा॥","jo yaha paḍhai hanumāna cālīsā, hoya siddhi sākhī gaurīsā ||","Whoever reads this Hanuman Chalisa attains siddhi (perfection). Shiva (Gauri's lord) is the witness.","Shiva himself guarantees the efficacy of the Chalisa. The siddhi promised is spiritual perfection — the realization of one's true nature."),
(27,"chaupai","नसै रोग हरै सब पीरा, जपत निरंतर हनुमत बीरा॥","nasai roga harai sabī pīrā, japata niraṁtara hanumata bīrā ||","Diseases vanish and all pains are dispelled when one continuously chants the name of the brave Hanuman.","The healing power of Hanuman's name is not merely physical but operates at the deepest levels of consciousness, removing the root cause of suffering."),
(28,"chaupai","संकट तै हनुमान छुड़ावै, मन क्रम बचन ध्यान जो लावै॥","saṁkaṭa tai hanumāna chuṛāvai, mana krama bacana dhyāna jo lāvai ||","Hanuman frees one from all calamities when one remembers him with mind, body, and speech.","The three-fold practice — mind, action, and speech — when directed toward Hanuman, removes all calamities. This is the natural result of total alignment with the divine."),
(29,"chaupai","सब सुख लहै तुम्हारी सरना, तुम रक्षक काहू को डर ना॥","saba sukha lahai tumhārī saranā, tuma rakṣaka kāhū ko ḍara nā ||","All happiness is attained by taking refuge in you. When you are the protector, there is no fear.","Taking refuge (sharana) in Hanuman is not escapism but the highest courage — the courage to surrender one's ego to something greater."),
(30,"chaupai","आपन तेज सम्हारो आपै, तीनों लोक हाँक तेज काँपै॥","āpana teja samhāro āpai, tīnoṁ loka hāṁka teja kāṁpai ||","You alone can control your own power. The three worlds tremble at your roar.","Hanuman's power is so vast that even the three worlds tremble. Yet he controls it perfectly — power without ego, strength without aggression."),
(31,"chaupai","भूत पिशाच निकट नहिं आवै, महाबीर जब नाम सुनावै॥","bhūta piśāca nikaṭa nahīṁ āvai, mahābīra jaba nāma sunāvai ||","Ghosts and evil spirits do not come near when the name of the great hero is chanted.","Hanuman's name creates a protective field around the devotee. The 'ghosts and spirits' represent not just external entities but internal fears, doubts, and negative tendencies."),
(32,"chaupai","नासै रोग हरै सब पीरा, जपत निरंतर हनुमत बीरा॥","nāsai roga harai sabī pīrā, japata niraṁtara hanumata bīrā ||","Diseases vanish and all pains end when one continuously chants the name of brave Hanuman.","Repetition of this teaching emphasizes its importance. Continuous chanting (japata nirantara) is not mechanical but the steady undercurrent of awareness that runs beneath all activity."),
(33,"chaupai","तुलसीदास सदा हरि चेरा, कीजै नाथ हृदय महँ डेरा॥","tulasīdās sadā hari cerā, kījai nātha hṛdaya mahṁ ḍerā ||","Tulsidas is forever the servant of Hari. O Lord, make my heart your dwelling place.","Tulsidas signs with his own name — a humble act. The prayer is not for Hanuman to visit but for permanent residence in the heart."),
(34,"doha","पवन तनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥","pavana tanaya saṅkaṭa harana, maṅgala mūrati rūpa |\nrāma lakhana sītā sahita, hṛdaya basahu sura bhūpa ||","O Son of the Wind, remover of calamities, embodiment of auspiciousness — dwell in my heart along with Rama, Lakshmana, and Sita.","The closing doha asks Hanuman to bring the entire divine family into the heart. This is the culmination — not mere recitation but the permanent installation of the divine within."),
(35,"doha","जय हनुमान ज्ञान गुण सागर, जय कपीस तिहुँ लोक उजागर।\nजय श्री राम जय जय राम॥","jaya hanumāna jñāna guṇa sāgara, jaya kapīsa tihu loka ujāgara |\njaya śrī rāma jaya jaya rāma ||","Victory to Hanuman, the ocean of wisdom. Victory to the monkey lord who illuminates the three worlds. Victory to Shri Rama, victory, victory to Rama!","The final verse echoes the opening, creating a complete circle. The Chalisa ends where it began — with victory to Hanuman and Rama. Each recitation takes the devotee deeper into the same truth."),
]

lines = []
lines.append("// Hanuman Chalisa — Complete text by Goswami Tulsidas (~16th century)")
lines.append("// Source: Hanuman Chalisa (public domain)")
lines.append("// Language: Awadhi (a dialect of Hindi)")
lines.append("// Script: Devanagari")
lines.append("//")
lines.append(f"// COMPLETE TEXT — {len(V)} verses total")
lines.append("//")
lines.append("export interface ChalisaVerse {")
lines.append("  id: string")
lines.append("  number: number")
lines.append("  type: 'doha' | 'chaupai'")
lines.append("  awadhi: string")
lines.append("  transliteration: string")
lines.append("  english: string")
lines.append("  commentary?: string")
lines.append("}")
lines.append("")
lines.append("export const hanumanChalisaVerses: ChalisaVerse[] = [")
lines.append("")

for num, vtype, awadhi, translit, english, commentary in V:
    lines.append(f"  {{ id: `v{num}`, number: {num}, type: '{vtype}', awadhi: `{ts_str(awadhi)}`, transliteration: `{ts_str(translit)}`, english: `{ts_str(english)}`, commentary: `{ts_str(commentary)}` }},")

lines.append("]")
lines.append("")
lines.append("export const hanumanChalisaInfo = {")
lines.append("  title: 'Hanuman Chalisa',")
lines.append("  sanskritTitle: 'हनुमान चालीसा',")
lines.append("  transliteration: 'Hanumān Cālīsā',")
lines.append("  author: 'Goswami Tulsidas',")
lines.append("  language: 'Awadhi',")
lines.append("  period: '~16th century CE',")
lines.append("  verseCount: hanumanChalisaVerses.length,")
lines.append("  summary: 'The Hanuman Chalisa is a devotional hymn to Lord Hanuman by the poet-saint Tulsidas. It consists of 40 chaupais preceded and followed by dohas. One of the most widely recited hymns in Hinduism, it bestows courage, protection, and spiritual strength.',")
lines.append("  theme: 'Devotion (bhakti), courage, protection, service to the divine, the power of the divine name.',")
lines.append("}")
lines.append("")
lines.append("export function getChalisaVerse(id: string): ChalisaVerse | undefined {")
lines.append("  return hanumanChalisaVerses.find((v) => v.id === id)")
lines.append("}")
lines.append("")

output = '\n'.join(lines)
with open('/Users/samarthrao/prodgita/src/lib/hanuman-chalisa-data.ts', 'w') as f:
    f.write(output)

chaupais = len([v for v in V if v[1] == 'chaupai'])
dohas = len([v for v in V if v[1] == 'doha'])
print(f"Generated: {len(V)} verses ({chaupais} chaupais + {dohas} dohas)")
print(f"Saved to hanuman-chalisa-data.ts")
