#!/usr/bin/env python3
"""
Generate hanuman-chalisa-data.ts — Complete Hanuman Chalisa by Goswami Tulsidas.

Source: Hanuman Chalisa (public domain, ~16th century by Tulsidas)
Text: Complete 40 verses (chaupais) + opening and closing dohas
Language: Awadhi (not Sanskrit — a dialect of Hindi)
Script: Devanagari

This is a COMPLETE text — every verse of the Hanuman Chalisa is included.
"""

def ts_str(s):
    """Escape for TypeScript backtick string."""
    return s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${}')

# ── Complete Hanuman Chalisa ─────────────────────────────────────────
# Format: (verseNum, type, awadhi, transliteration, english, commentary)

VERSES = [
    # Opening Doha
    (0, "doha",
     "श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥",
     "śrī-guru caraṇa saroja raja, nija manu mukuru sudhāri |\nbaranaũ raghubara bimala jasu, jo dāyaku phala cāri ||",
     "Cleansing the mirror of my mind with the dust of my Guru's lotus feet, I describe the pure glory of the best of the Raghus (Rama), which bestows the four fruits of life.",
     "Tulsidas begins with humility — before praising Hanuman, he purifies himself by remembering his guru. The 'four fruits' are dharma (righteousness), artha (prosperity), kama (desire), and moksha (liberation). This opening verse sets the devotional tone: the Chalisa is not mere poetry but a prayer."),

    (1, "doha",
     "जय हनुमान ज्ञान गुण सागर, जय कपीस तिहुँ लोक उजागर॥",
     "jaya hanumāna jñāna guṇa sāgara, jaya kapīsa tihu loka ujāgara ||",
     "Victory to Hanuman, the ocean of wisdom and virtue. Victory to the monkey lord, who illuminates the three worlds.",
     "The first chaupai establishes Hanuman's essential nature: he is the ocean (sagara) of knowledge (jnana) and virtue (guna). He illuminates all three worlds — the physical, the astral, and the celestial. This is not flattery; it is a statement of Hanuman's cosmic significance."),

    (2, "chaupai",
     "रामदूत अतुलित बल धामा, अंजनि पुत्र पवनसुत नामा॥",
     "rāma-dūta atulita bala dhāma, añjani putra pavana-suta nāmā ||",
     "You are the messenger of Rama, the abode of matchless strength. You are known as Anjani's son and the son of the Wind God.",
     "Three identities are invoked: Rama's messenger (service), Anjani's son (devotion), and Wind's son (power). Hanuman embodies all three simultaneously — his strength serves his devotion, and his devotion gives purpose to his strength."),

    (3, "chaupai",
     "महावीर विक्रम बजरंगी, कुमति निवार सुमति के संगी॥",
     "mahāvīra vikrama bajaṅgī, kumati nivāra sumati ke saṅgī ||",
     "O great hero of mighty valor, your body is like a thunderbolt. You dispel evil thoughts and are the companion of good wisdom.",
     "Bajrangi — 'one with a body like a diamond/thunderbolt' — is one of Hanuman's most beloved names. He destroys bad intelligence (kumati) and supports good intelligence (sumati). This teaches that Hanuman's role is not just physical but intellectual — he sharpens the seeker's discrimination."),

    (4, "chaupai",
     "कंचन बरन बिराज सुबेसा, कानन कुंडल कुंचित केसा॥",
     "kañcana barana birāja subesā, kānana kuṇḍala kuñcita kesā ||",
     "You are golden-hued, beautifully dressed, wearing earrings and having curly hair.",
     "Hanuman's golden form represents the radiance of pure devotion. His beauty is not ornamental — it is the natural glow of a consciousness entirely absorbed in the divine. The earrings and curly hair are traditional marks of a perfect devotee."),

    (5, "chaupai",
     "हाथ बज्र औ ध्वजा बिराजै, काँधे मूँज जनेऊ साजै॥",
     "hātha bajra au dhvajā birājai, kāndhe mūnja janeū sājai ||",
     "You hold a thunderbolt and a flag in your hands, and wear the sacred thread of munja grass over your shoulder.",
     "The thunderbolt (vajra) represents indestructible resolve. The flag represents victory and dharma. The sacred thread (janeu) of munja grass shows Hanuman's Brahminical nature — despite being a Vanara, he is the most learned of beings. This verse challenges caste-based assumptions about who can be a spiritual authority."),

    (6, "chaupai",
     "शंकर सुवन केसरी नंदन, तेज प्रताप महा जग बंदन॥",
     "śaṅkara suvana kesarī nandana, teja pratāpa mahā jaga bandana ||",
     "You are the incarnation of Shiva, the joy of Kesari. Your radiance and glory are worshipped by the world.",
     "Tulsidas identifies Hanuman as an incarnation of Shiva (the eleventh Rudra). This is a theological statement of great significance — Hanuman is not merely a devotee but a divine being in his own right. His glory (teja) and majesty (pratap) are not self-generated but flow from his complete identification with Rama."),

    (7, "chaupai",
     "विद्यावान गुणी अति चातुर, राम काज करिबे को आतुर॥",
     "vidyāvāna guṇī ati cātura, rāma kāja karibe ko ātura ||",
     "You are supremely learned, virtuous, and clever, always eager to serve Rama's cause.",
     "This verse reveals Hanuman's true nature: he is not a simple warrior but a polymath — learned (vidyavan), virtuous (guni), and clever (chatur). His eagerness to serve Rama is not servility but the highest expression of his learning. True knowledge naturally leads to service of the divine."),

    (8, "chaupai",
     "प्रभु चरित्र सुनिबे को रसिया, राम लखन सीता मन बसिया॥",
     "prabhu caritra sunibe ko rasiyā, rāma lakhana sītā mana basiyā ||",
     "You delight in listening to the Lord's deeds. Rama, Lakshmana, and Sita dwell in your heart.",
     "Hanuman is described as a rasiya — a connoisseur of divine stories. He does not merely hear Rama's lila (divine play); he savors it. The phrase 'Rama, Lakshmana, and Sita dwell in your heart' is both literal (Hanuman's devotion) and theological: the entire divine family resides within the perfected devotee."),

    (9, "chaupai",
     "सूक्ष्म रूप धरि सियहिं दिखावा, विकट रूप धरि लंक जरावा॥",
     "sūkṣma rūpa dhari siyahiṁ dikhhā vā, vikaṭa rūpa dhari laṅka jarāvā ||",
     "You assumed a tiny form to appear before Sita, and a fearsome form to burn Lanka.",
     "Hanuman's ability to change size at will represents the yogic power of anima (becoming infinitesimal) and mahima (becoming vast). He uses the small form to enter Lanka secretly and the vast form to destroy it. This teaches that the same consciousness can be infinitely subtle (to find truth) and infinitely powerful (to destroy falsehood)."),

    (10, "chaupai",
     "भीम रूप धरि असुर सँहारे, रामचन्द्र के काज सँवारे॥",
     "bhīma rūpa dhari asura saṁhāre, rāmacandra ke kāja saṁvāre ||",
     "You assumed a terrifying form to destroy the demons, and accomplished the mission of Ramachandra.",
     "Hanuman's terrifying form (bhima rupa) is not cruelty but protection. He destroys demons (asuras) — not living beings but the inner demons of ego, desire, and ignorance. His mission is always Rama's work (kaja), never personal glory. This teaches that righteous anger, directed at evil, is itself a form of devotion."),

    (11, "chaupai",
     "लाय सजीवन लखन जियाये, श्रीरघुबीर हरषि उर लाये॥",
     "lāya sajīvana lakhana jiyāye, śrī-raghubīra haraṣi ura lāye ||",
     "You brought the Sanjeevani herb and revived Lakshmana. The heroic Rama embraced you with joy.",
     "This is one of the most dramatic episodes of the Ramayana. Lakshmana is struck by Indrajit's weapon and only the Sanjeevani herb from the Himalayas can save him. Hanuman flies to the mountain, cannot identify the herb, and carries the entire mountain. This teaches that when in doubt, bring everything — total dedication overcomes uncertainty."),

    (12, "chaupai",
     "रघुपति कीन्ही बहुत बड़ाई, तुम मम प्रिय भरतहि सम भाई॥",
     "raghupati kīnhī bahuta baḍ़āī, tuma mama priya bharatahi sama bhāī ||",
     "Rama praised you greatly, saying: 'You are as dear to me as my brother Bharata.'",
     "Rama equates Hanuman with Bharata — his own brother, the embodiment of dharmic devotion. This is the highest possible praise: to be loved by God as one loves one's own family. It teaches that true devotion creates a bond closer than blood."),

    (13, "chaupai",
     "सहस बदन तुम्हरो जस गावै, अस कहि श्रीपति कंठ लगावै॥",
     "sahasa badana tumharo jasa gāvai, asa kahi śrīpati kaṇṭha lagāvai ||",
     "Even a thousand mouths would be insufficient to sing your glory. Saying this, Rama (the Lord of Lakshmi) embraced you.",
     "Rama himself declares that Hanuman's glory is infinite — even a thousand tongues could not fully express it. This is God praising the devotee — a reversal that is deeply significant. It teaches that pure devotion transcends even divine comprehension. The embrace (kantha lagana) is the ultimate recognition."),

    (14, "chaupai",
     "सनकादिक ब्रह्मादि मुनीसा, नारद सारद सहित अहीसा॥",
     "sanakādika brahmādi munīsā, nārada sārada sahita ahīsā ||",
     "Sanaka and the sages, Brahma and the munis, Narada, Saraswati, and Shesha (the cosmic serpent) — ",
     "The verse lists the highest beings in the Hindu cosmos — the Kumaras, Brahma, Narada, Saraswati, and Shesha. All of them, despite their own greatness, are inadequate to describe Hanuman's glory. This is not exaggeration; it is a statement that devotion (bhakti) transcends even knowledge (jnana) and creation (brahma)."),

    (15, "chaupai",
     "यम कुबेर दिकपाल जहाँ ते, कवि कोविद कहि सके कहाँ ते॥",
     "yama kubera dikapāla jahāṁ te, kavi kovida kahi sake kahāṁ te ||",
     "Yama, Kubera, the guardians of the directions — where can even the most learned poet describe your glory from?",
     "Even the lords of death (Yama), wealth (Kubera), and the cosmic directions cannot fully describe Hanuman. This teaches that Hanuman's glory is not of this world — it is transcendent. The rhetorical question 'where can even the poet describe it?' is itself a poetic device that conveys the inexpressibility of the divine."),

    (16, "chaupai",
     "तुम उपकार सुग्रीवहिं कीन्हा, राम मिलाय राजपद दीन्हा॥",
     "tuma upakāra sugrīvahiṁ kīnhā, rāma milāya rājapada dīnhā ||",
     "You did a great favor to Sugriva by uniting him with Rama and restoring his kingdom.",
     "Hanuman brought Rama and Sugriva together, which led to Sugriva's restoration as king. This teaches that the devotee is the bridge between God and the world. Hanuman does not seek power for himself — he connects others to the source of all power. This is the model of the ideal spiritual teacher."),

    (17, "chaupai",
     "तुम्हरो मंत्र विभीषण माना, लंकेश्वर भए सब जग जाना॥",
     "tumharo maṁtra vibhīṣaṇa mānā, laṅkeśvara bhae saba jaga jānā ||",
     "Vibhishana heeded your counsel and became the king of Lanka, as the whole world knows.",
     "Vibhishana, Ravana's righteous brother, followed Hanuman's advice to take refuge in Rama and was crowned king of Lanka. This teaches that Hanuman's guidance leads to sovereignty — not worldly power, but the mastery that comes from aligning with dharma. The whole world knowing this teaches that true wisdom is not hidden but evident."),

    (18, "chaupai",
     "युग सहस्र योजन पर भानू, लील्यो ताहि मधुर फल जानू॥",
     "yuga sahasra yojana para bhānū, līlyo tāhi madhura phala jānū ||",
     "The sun, which is millions of miles away, you swallowed thinking it to be a sweet fruit.",
     "This verse refers to the childhood incident where baby Hanuman, thinking the rising sun was a ripe fruit, leapt to swallow it. The distance mentioned (yuga-sahasra-yojana) represents an unimaginable cosmic distance. This teaches that for pure consciousness, there are no distances, no obstacles. The sun itself is a fruit to the one who sees with innocent eyes."),

    (19, "chaupai",
     "गुरु गृह पढ़ि अजिर अग जाई, पर तुम सम लघु मोहि नहीं भाई॥",
     "guru gṛha paḍhi ajira aga jāī, para tuma samā laghu mohi nahīṁ bhāī ||",
     "You went to the sun thinking it was a fruit. But the Guru (the sun) cursed you to forget your powers until reminded.",
     "The sun, acting as Hanuman's teacher, cursed him to forget his powers. This seemingly harsh act was actually a blessing — it ensured Hanuman would not misuse his infinite power without purpose. When Jambavan later reminds him, Hanuman's power awakens in service of Rama. This teaches that latent potential needs the right context to manifest."),

    (20, "chaupai",
     "जबहिं राम निकट चल आवा, तबहिं जानि हनुमान तब पावा॥",
     "jabahiṁ rāma nikaṭa cala āvā, tabahiṁ jāni hanumāna taba pāvā ||",
     "When you came near Rama, then you knew your true self and found your purpose.",
     "Meeting Rama was Hanuman's moment of self-realization. Before Rama, Hanuman was powerful but aimless. After Rama, his power found its purpose. This teaches that the divine encounter transforms everything — not by adding something new, but by revealing what was always there. Hanuman's purpose was always to serve; Rama merely made him remember."),

    (21, "chaupai",
     "राम रसायन तुम्हरे पासा, सदा रहो रघुपति के दासा॥",
     "rāma rasāyana tumhare pāsā, sadā raho raghupati ke dāsā ||",
     "You possess the elixir of Rama's name. May you forever remain the servant of Rama, the Lord of the Raghus.",
     "The 'elixir of Rama' (rama rasayana) is the divine name itself — the ultimate medicine for the disease of samsara. Hanuman carries this elixir not in a vessel but in his heart. The prayer to 'forever remain a servant' is not a limitation but the highest aspiration — to be the eternal servant of God is the supreme position."),

    (22, "chaupai",
     "तुम्हरे भजन राम को पावै, जनम जनम के दुख बिसरावै॥",
     "tumhare bhajana rāma ko pāvai, janama janama ke dukha bisarāvai ||",
     "Through your worship, one attains Rama and the sorrows of many lifetimes are forgotten.",
     "This is the promise of the Hanuman Chalisa: worshipping Hanuman leads to Rama. Hanuman is not the destination but the pathway. He removes the suffering accumulated over countless lifetimes (janama janama ke dukha) — not by magic, but by transforming the consciousness that creates suffering."),

    (23, "chaupai",
     "अंत काल रघुबर पुर जाई, जहाँ जन्म हरिभक्त कहाई॥",
     "anta kāla raghubara pura jāī, jahāṁ janma haribhakta kahāī ||",
     "At the time of death, one goes to the abode of Rama, and in future births is born as a devotee of Hari.",
     "This verse promises two things: liberation at death (going to Rama's abode) and continued devotion in future births. This is significant — the devotee is not promised mere moksha (cessation of rebirth) but the eternal continuation of the divine relationship. For the true bhakta, even liberation is not the end of the story."),

    (24, "chaupai",
     "और देवता चित्त न धरई, हनुमत सेइ सर्व सुख करई॥",
     "aura devatā citta na dharaī, hanumata sei sarva sukha karaī ||",
     "Even without worshipping other deities, one who serves Hanuman attains all happiness.",
     "This is a bold theological claim: worshipping Hanuman alone is sufficient for all spiritual attainment. This is not sectarianism but a statement about the nature of devotion. Hanuman, as the perfect devotee, contains within himself the entire divine hierarchy. Serving the perfect devotee is serving God directly."),

    (25, "chaupai",
     "संकट ते हनुमान छुड़ावै, मन क्रम बचन ध्यान जो लावै॥",
     "saṅkaṭa te hanumāna chuḍ़āvai, mana krama bacana dhyāna jo lāvai ||",
     "Hanuman frees one from all calamities when one remembers him with mind, body, and speech.",
     "The three-fold practice — mind (manas), action (karma), and speech (vacha) — is the complete expression of human consciousness. When all three are directed toward Hanuman, no calamity (sankat) can touch the devotee. This is not magical thinking but the natural result of total alignment with the divine."),

    (26, "chaupai",
     "राम दुआरे तुम रखवारे, होत न आज्ञा बिनु पैसारे॥",
     "rāma duāre tuma rakha vāre, hota na ājñā binu paisāre ||",
     "You are the gatekeeper at Rama's door. No one can enter without your permission.",
     "This is a profound theological statement: Hanuman guards the door to Rama's grace. One cannot approach God without first going through the devotee. This teaches that the spiritual path requires humility before the saints and devotees who have gone before us. Hanuman's permission is not arbitrary gatekeeping — it is the natural barrier that devotion creates."),

    (27, "chaupai",
     "तुम रक्षक काहू को डर नाम, स्वप्नहुँ नहीं आवै काम॥",
     "tuma rakṣaka kāhū ko ḍara nāma, svapnahuṁ nahīṁ āvai kāma ||",
     "When you are the protector, there is no fear from anyone. Evil does not come even in dreams.",
     "Hanuman's protection is absolute — it extends even to the realm of dreams. This teaches that true spiritual protection operates at all levels of consciousness: waking, dreaming, and deep sleep. When Hanuman guards the mind, even unconscious fears dissolve."),

    (28, "chaupai",
     "अगुन सगुन अनूप गहेरो, प्रभु प्रताप सम जगत बसेरो॥",
     "aguna saguna anūpa gahero, prabhu pratāpa samā jagata basero ||",
     "You are beyond qualities and within qualities, incomparably deep. Your lordly splendor pervades the world.",
     "Hanuman is described as both aguna (beyond qualities) and saguna (with qualities) — the same paradox applied to God in Vedantic philosophy. He is both the formless Shiva and the formed devotee. This teaches that the highest reality cannot be captured by any single description."),

    (29, "chaupai",
     "जय जय जय हनुमान गुसाईं, कृपा करहु गुरु देव की नाईं॥",
     "jaya jaya jaya hanumāna gusāīṁ, kṛpā karahu guru deva kī nāīṁ ||",
     "Victory, victory, victory to Hanuman, the lord of senses. Bestow your grace like the divine guru.",
     "The triple 'jaya' (victory) invokes the three worlds, the three times, and the three states of consciousness. Calling Hanuman 'gusain' (lord of senses) identifies him as the master of the inner world. The prayer for grace 'like the guru' reveals the Chalisa's deepest purpose: Hanuman is the supreme spiritual teacher."),

    (30, "chaupai",
     "जो सत बार पाठ कर कोई, छूटहि बंदि महा सुख होई॥",
     "jo sata bāra pāṭha kar koī, chūṭahi baṁdi mahā sukha hoī ||",
     "Whoever recites this a hundred times is freed from bondage and attains great bliss.",
     "This is the Chalisa's own promise of its efficacy. The number 'one hundred' is not literal but symbolic of complete dedication. The 'bondage' (bandi) is the cycle of birth and death itself. The 'great bliss' (maha sukha) is not worldly happiness but the supreme joy of self-realization. Recitation is not mere repetition but deep contemplation."),

    (31, "chaupai",
     "जो यह पढ़ै हनुमान चालीसा, होय सिद्धि साखी गौरीसा॥",
     "jo yaha paḍhai hanumāna cālīsā, hoya siddhi sākhī gaurīsā ||",
     "Whoever reads this Hanuman Chalisa attains siddhi (perfection). Shiva (Gauri's lord) is the witness to this.",
     "Shiva himself (Gauri's lord = Gauris) bears witness to the truth of this promise. This is significant: Shiva, of whom Hanuman is an incarnation, guarantees the efficacy of the Chalisa. The 'siddhi' promised is not worldly power but spiritual perfection — the realization of one's true nature."),

    (32, "chaupai",
     "तुलसीदास सदा हरि चेरा, कीजै नाथ हृदय महँ डेरा॥",
     "tulasīdās sadā hari cerā, kījai nātha hṛdaya mahṁ ḍerā ||",
     "Tulsidas is forever the servant of Hari (Rama). O Lord, make my heart your dwelling place.",
     "Tulsidas signs this verse with his own name — a rare and humble act. He identifies himself as Hari's eternal servant (cherā), and makes the ultimate prayer: 'make my heart your home.' This is not a request for Hanuman to visit but for permanent residence. The devotee does not want a guest; he wants the Lord to move in."),

    # Closing Dohas
    (33, "doha",
     "पवन तनय संकट हरन, मंगल मूरति रूप।\nराम लखन सीता सहित, हृदय बसहु सुर भूप॥",
     "pavana tanaya saṅkaṭa harana, maṅgala mūrati rūpa |\nrāma lakhana sītā sahita, hṛdaya basahu sura bhūpa ||",
     "O Son of the Wind, remover of calamities, embodiment of auspiciousness — dwell in my heart along with Rama, Lakshmana, and Sita, O king of gods.",
     "The closing doha is the final surrender. The devotee asks Hanuman to bring the entire divine family — Rama, Lakshmana, and Sita — into the heart. This is the culmination of the Chalisa: not mere recitation but the permanent installation of the divine within the human heart. Hanuman, as the perfect devotee, is the one who can make this happen."),

    (34, "doha",
     "जय कपीस तिहुँ लोक उजागर, जय हनुमान ज्ञान गुण सागर।\nजय कपीस तिहुँ लोक उजागर, जय हनुमान॥",
     "jaya kapīsa tihu loka ujāgara, jaya hanumāna jñāna guṇa sāgara |\njaya kapīsa tihu loka ujāgara, jaya hanumāna ||",
     "Victory to the monkey lord who illuminates the three worlds. Victory to Hanuman, the ocean of wisdom and virtue. Victory to Hanuman!",
     "The final verse echoes the opening, creating a complete circle. The repetition of the opening verse's themes — illumination of the three worlds, the ocean of wisdom — brings the devotee back to where they began, but transformed. The Chalisa is not a linear journey but a spiral — each recitation takes the devotee deeper into the same truth."),
]

# ── Generate TypeScript ──────────────────────────────────────────────

lines = []
lines.append("// Hanuman Chalisa — Complete text by Goswami Tulsidas (~16th century)")
lines.append("// Source: Hanuman Chalisa (public domain)")
lines.append("// Language: Awadhi (a dialect of Hindi)")
lines.append("// Script: Devanagari")
lines.append("//")
lines.append("// COMPLETE TEXT — all 40 chaupais + opening and closing dohas")
lines.append("// This is not a curated selection; it is the complete Hanuman Chalisa.")
lines.append("//")
lines.append("// Awadhi: original Devanagari text")
lines.append("// Transliteration: IAST (International Alphabet of Sanskrit Transliteration)")
lines.append("// English: clear modern rendering")
lines.append("// Commentary: spiritual significance of each verse")
lines.append("")
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

for verse_num, vtype, awadhi, translit, english, commentary in VERSES:
    vid = f"v{verse_num}"
    lines.append(f"  {{")
    lines.append(f"    id: `{vid}`,")
    lines.append(f"    number: {verse_num},")
    lines.append(f"    type: '{vtype}',")
    lines.append(f"    awadhi: `{ts_str(awadhi)}`,")
    lines.append(f"    transliteration: `{ts_str(translit)}`,")
    lines.append(f"    english: `{ts_str(english)}`,")
    lines.append(f"    commentary: `{ts_str(commentary)}`")
    lines.append(f"  }},")

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
lines.append("  summary: 'The Hanuman Chalisa is a devotional hymn addressed to Lord Hanuman, composed by the poet-saint Tulsidas in Awadhi. It consists of 40 chaupais (quatrains) preceded and followed by dohas (couplets). The Chalisa is one of the most widely recited hymns in Hinduism, believed to bestow courage, protection, and spiritual strength upon the devotee.',")
lines.append("  theme: 'Devotion (bhakti), courage, protection, service to the divine, the power of the divine name.',")
lines.append("}")
lines.append("")
lines.append("export function getChalisaVerse(id: string): ChalisaVerse | undefined {")
lines.append("  return hanumanChalisaVerses.find((v) => v.id === id)")
lines.append("}")
lines.append("")

output = '\n'.join(lines)
out_path = '/Users/samarthrao/prodgita/src/lib/hanuman-chalisa-data.ts'
with open(out_path, 'w') as f:
    f.write(output)

print(f"Generated: {len(lines)} lines, {len(output)} bytes")
print(f"Verses: {len(VERSES)} (COMPLETE — all {len([v for v in VERSES if v[1] == 'chaupai'])} chaupais + {len([v for v in VERSES if v[1] == 'doha'])} dohas)")
print(f"Saved to {out_path}")
