// Bhagavad Gita — Complete structure: all 18 chapters, real verses.
// Source: Public domain translations (paraphrased for clarity).
// Each chapter includes key representative verses plus complete metadata.
// Verses follow the standard numbering. For chapters with very long verse
// counts we include the most spiritually central verses, with accurate
// Sanskrit, transliteration, and English meaning.

export interface Verse {
  id: string // e.g. "1.1"
  chapter: number
  verse: number
  sanskrit: string
  transliteration: string
  english: string
  meaning?: string // short meaning note
}

export interface Chapter {
  number: number
  name: string // English name
  sanskritName: string
  transliteration: string
  verseCount: number
  summary: string
  theme: string
  verses: Verse[]
}

export const gitaChapters: Chapter[] = [
  {
    number: 1,
    name: "Arjuna's Dilemma",
    sanskritName: "अर्जुनविषादयोग",
    transliteration: "Arjuna-viṣāda-yoga",
    verseCount: 47,
    theme: "Despondency, duty, and the moral crisis of Arjuna on the battlefield.",
    summary:
      "On the battlefield of Kurukshetra, Arjuna sees his own kinsmen arrayed against him and is overcome with grief and confusion. He lays down his bow, refusing to fight, setting the stage for Krishna's divine instruction.",
    verses: [
      {
        id: "1.1",
        chapter: 1,
        verse: 1,
        sanskrit: "धृतराष्ट्र उवाच।\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
        transliteration:
          "dhṛtarāṣṭra uvāca\n dharmakṣetre kurukṣetre samavetā yuyutsavaḥ\n māmakāḥ pāṇḍavāścaiva kimakurvata sañjaya",
        english:
          "Dhritarashtra said: O Sanjaya, assembled on the sacred field of Kurukshetra, the field of dharma, eager to fight, what did my sons and the sons of Pandu do?",
        meaning:
          "The blind king Dhritarashtra asks his advisor Sanjaya to narrate the events of the battlefield. The mention of 'field of dharma' is significant — this war is not merely political but a contest of righteousness.",
      },
      {
        id: "1.2",
        chapter: 1,
        verse: 2,
        sanskrit: "सञ्जय उवाच।\nदृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥",
        transliteration:
          "sañjaya uvāca\n dṛṣṭvā tu pāṇḍavānīkaṃ vyūḍhaṃ duryodhanastadā\n ācāryamupasaṅgamya rājā vacanamabravīt",
        english:
          "Sanjaya said: Seeing the Pandava army arrayed in battle formation, King Duryodhana then approached his teacher Drona and spoke these words.",
      },
      {
        id: "1.20",
        chapter: 1,
        verse: 20,
        sanskrit: "अथ व्यवस्थितान् दृष्ट्वा धार्तराष्ट्रान् कपिध्वजः।\nप्रवृत्ते शस्त्रसम्पाते धनुरुद्यम्य पाण्डवः॥",
        transliteration:
          "atha vyavasthitān dṛṣṭvā dhārtarāṣṭrān kapidhvajaḥ\n pravṛtte śastrasampāte dhanurudyamya pāṇḍavaḥ",
        english:
          "Then, seeing the sons of Dhritarashtra arrayed, Arjuna — whose banner bore the symbol of Hanuman — raised his bow as the weapons were about to clash.",
      },
      {
        id: "1.21",
        chapter: 1,
        verse: 21,
        sanskrit: "हृषीकेशं तदा वाक्यमिदमाह महीपते।\nअर्जुन उवाच।\nसेनयोरुभयोर्मध्ये रथं स्थापय मेऽच्युत॥",
        transliteration:
          "hṛṣīkeśaṃ tadā vākyamidamāha mahīpate\n arjuna uvāca\n senayorubhayormadhye rathaṃ sthāpaya me'cyuta",
        english:
          "Arjuna said: O Achyuta (Krishna), place my chariot between the two armies,",
      },
      {
        id: "1.28",
        chapter: 1,
        verse: 28,
        sanskrit: "दृष्ट्वेमं स्वजनं कृष्ण युयुत्सुं समुपस्थितम्।\nसीदन्ति मम गात्राणि मुखं च परिशुष्यति॥",
        transliteration:
          "dṛṣṭvemam svajanaṃ kṛṣṇa yuyutsuṃ samupasthitam\n sīdanti mama gātrāṇi mukhaṃ ca pariśuṣyati",
        english:
          "Seeing these kinsmen, O Krishna, arrayed and eager for battle, my limbs fail, my mouth dries up,",
        meaning:
          "Arjuna's physical symptoms reveal the depth of his psychological crisis — this is the moment the spiritual teaching begins.",
      },
      {
        id: "1.29",
        chapter: 1,
        verse: 29,
        sanskrit: "वेपथुश्च शरीरे मे रोमहर्षश्च जायते।\nगाण्डीवं स्रंसते हस्तात्त्वक्चैव परिदह्यते॥",
        transliteration:
          "vepathuśca śarīre me romaharṣaśca jāyate\ngāṇḍīvaṃ sraṃsate hastāttvakcaiva paridahyate",
        english:
          "My body trembles, my hair stands on end. The Gandiva bow slips from my hand, and my skin burns.",
      },
      {
        id: "1.47",
        chapter: 1,
        verse: 47,
        sanskrit: "सञ्जय उवाच।\nएवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसम्पिन्नमानसः॥",
        transliteration:
          "sañjaya uvāca\n evamuktvārjunaḥ saṅkhye rathopastha upāviśat\n visṛjya saśaraṃ cāpaṃ śokasampinnamānasaḥ",
        english:
          "Sanjaya said: Having spoken thus on the battlefield, Arjuna sat down in the chariot, casting aside his bow and arrows, his mind overwhelmed with sorrow.",
        meaning:
          "This verse marks the end of Arjuna's collapse and the perfect setup for the Gita's teaching — when the student is ready, the teacher speaks.",
      },
    ],
  },
  {
    number: 2,
    name: "Sankhya Yoga — Transcendent Knowledge",
    sanskritName: "सांख्ययोग",
    transliteration: "Sāṅkhya-yoga",
    verseCount: 72,
    theme: "The immortality of the soul, the path of wisdom, and the call to selfless action.",
    summary:
      "Krishna begins his teaching by explaining the eternal nature of the Atman (soul), which is neither born nor dies. He reveals the principle of Nishkama Karma — action without attachment to results — and delivers the famous verse 'karmanye vadhikaraste' calling Arjuna to his duty.",
    verses: [
      {
        id: "2.13",
        chapter: 2,
        verse: 13,
        sanskrit: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥",
        transliteration:
          "dehino'sminyathā dehe kaumāraṃ yauvanaṃ jarā\n tathā dehāntaraprāptirdhīrastatra na muhyati",
        english:
          "Just as the embodied soul passes through childhood, youth, and old age in this body, so too does it pass to another body. The wise are not deluded by this.",
        meaning:
          "The soul (atman) is the constant experiencer; the body changes but the conscious witness within remains. Birth and death are merely transitions.",
      },
      {
        id: "2.14",
        chapter: 2,
        verse: 14,
        sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
        transliteration:
          "mātrāsparśāstu kaunteya śītoṣṇasukhaduḥkhadāḥ\n āgamāpāyino'nityāstāṃstitikṣasva bhārata",
        english:
          "O son of Kunti, the contacts of the senses with their objects give rise to cold and heat, pleasure and pain. They come and go and are impermanent. Endure them, O Bharata.",
        meaning:
          "Pleasure and pain are temporary experiences arising from sense contact. The wise endure them without being disturbed.",
      },
      {
        id: "2.15",
        chapter: 2,
        verse: 15,
        sanskrit: "यं हि न व्यथयन्त्येते पुरुषं पुरुषर्षभ।\nसमदुःखसुखं धीरं सोऽमृतत्वाय कल्पते॥",
        transliteration:
          "yaṃ hi na vyathayantyete puruṣaṃ puruṣarṣabha\n samaduḥkhasukhaṃ dhīraṃ so'mṛtatvāya kalpate",
        english:
          "O best of men, the wise person whom these do not distress — who is equipoised in happiness and sorrow — becomes eligible for liberation.",
      },
      {
        id: "2.20",
        chapter: 2,
        verse: 20,
        sanskrit: "न जायते म्रियते वा कदाचि\nन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥",
        transliteration:
          "na jāyate mriyate vā kadācin\n nāyaṃ bhūtvā bhavitā vā na bhūyaḥ\n ajo nityaḥ śāśvato'yaṃ purāṇo\n na hanyate hanyamāne śarīre",
        english:
          "The soul is never born, nor does it ever die. It has not come into being, nor will it come into being, nor will it ever cease to be. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
        meaning:
          "The atman — the conscious Self — is eternal. It exists beyond birth, death, and time. Physical death does not affect it.",
      },
      {
        id: "2.22",
        chapter: 2,
        verse: 22,
        sanskrit: "वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णा\nन्यन्यानि संयाति नवानि देही॥",
        transliteration:
          "vāsāṃsi jīrṇāni yathā vihāya\n navāni gṛhṇāti naro'parāṇi\n tathā śarīrāṇi vihāya jīrṇā\n nyanyāni saṃyāti navāni dehī",
        english:
          "As a person sheds worn-out garments and puts on new ones, so the embodied soul casts off worn-out bodies and enters new ones.",
        meaning:
          "The body is like clothing for the soul. Reincarnation is the natural process of changing bodies, just as we change clothes.",
      },
      {
        id: "2.47",
        chapter: 2,
        verse: 47,
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        transliteration:
          "karmaṇyevādhikāraste mā phaleṣu kadācana\n mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi",
        english:
          "You have a right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results, nor be attached to inaction.",
        meaning:
          "The most famous verse of the Gita. Karma Yoga — act with full dedication, but surrender attachment to outcomes. This frees the mind from anxiety and purifies action.",
      },
      {
        id: "2.48",
        chapter: 2,
        verse: 48,
        sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
        transliteration:
          "yogasthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya\n siddhyasiddhyoḥ samo bhūtvā samatvaṃ yoga ucyate",
        english:
          "Perform your duty established in yoga, abandoning attachment, O Dhananjaya. Be equipoised in success and failure. Such evenness of mind is called yoga.",
        meaning:
          "Yoga here means equanimity of mind. Act with full effort but remain undisturbed by success or failure.",
      },
      {
        id: "2.62",
        chapter: 2,
        verse: 62,
        sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥",
        transliteration:
          "dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate\n saṅgātsañjāyate kāmaḥ kāmātkrodho'bhijāyate",
        english:
          "When a person dwells on sense objects, attachment arises. From attachment comes desire, and from desire arises anger.",
        meaning:
          "The descent of the mind: contemplation → attachment → desire → anger → delusion → loss of memory → ruin of discrimination → destruction.",
      },
      {
        id: "2.63",
        chapter: 2,
        verse: 63,
        sanskrit: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥",
        transliteration:
          "krodhādbhavati sammohaḥ sammohātsmṛtivibhramaḥ\n smṛtibhraṃśād buddhināśo buddhināśātpraṇaśyati",
        english:
          "From anger comes delusion; from delusion, loss of memory; from loss of memory, destruction of discrimination; and from destruction of discrimination, one perishes.",
      },
      {
        id: "2.66",
        chapter: 2,
        verse: 66,
        sanskrit: "नास्ति बुद्धिरयुक्तस्य न चायुक्तस्य भावना।\nन चाभावयतः शान्तिरशान्तस्य कुतः सुखम्॥",
        transliteration:
          "nāsti buddhirayuktasya na cāyuktasya bhāvanā\n na cābhāvayataḥ śāntiraśāntasya kutaḥ sukham",
        english:
          "There is no wisdom for the uncontrolled, nor meditation for the uncontrolled. Without meditation there is no peace, and without peace, how can there be happiness?",
        meaning:
          "Self-mastery is the foundation of all higher life. Without discipline, no wisdom, peace, or happiness is possible.",
      },
      {
        id: "2.70",
        chapter: 2,
        verse: 70,
        sanskrit: "आपूर्यमाणमचलप्रतिष्ठं\nसमुद्रमापः प्रविशन्ति यद्वत्।\nतद्वत्कामा यं प्रविशन्ति सर्वे\nस शान्तिमाप्नोति न कामकामी॥",
        transliteration:
          "āpūryamāṇamacalapratiṣṭhaṃ\n samudramāpaḥ praviśanti yadvat\n tadvat kāmā yaṃ praviśanti sarve\n sa śāntimāpnoti na kāmakāmī",
        english:
          "As rivers flow into the ocean, which is ever being filled but remains unmoved, so all desires flow into the person of steady wisdom — they attain peace, not the one who runs after desires.",
      },
    ],
  },
  {
    number: 3,
    name: "Karma Yoga — The Path of Action",
    sanskritName: "कर्मयोग",
    transliteration: "Karma-yoga",
    verseCount: 43,
    theme: "Selfless action as a path to liberation; the necessity of duty.",
    summary:
      "Krishna explains that no one can remain without action even for a moment, and that one must perform their prescribed duties selflessly as a sacrifice. He reveals the principle of yajna (sacrifice) and the danger of letting the senses overpower the mind.",
    verses: [
      {
        id: "3.5",
        chapter: 3,
        verse: 5,
        sanskrit: "न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत्।\nकार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः॥",
        transliteration:
          "na hi kaścitkṣaṇamapi jātu tiṣṭhyakarmakṛt\n kāryate hyavaśaḥ karma sarvaḥ prakṛtijairguṇaiḥ",
        english:
          "No one can remain without action even for a moment, for everyone is helplessly driven by the qualities of nature (gunas).",
        meaning:
          "Inaction is impossible. Even to breathe is action. The question is not whether to act, but how to act — with attachment or without.",
      },
      {
        id: "3.19",
        chapter: 3,
        verse: 19,
        sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥",
        transliteration:
          "tasmādasaktaḥ satataṃ kāryaṃ karma samācara\n asakto hyācarankarma paramāpnoti pūruṣaḥ",
        english:
          "Therefore, always perform your prescribed duty without attachment, for by performing one's duty without attachment, one attains the Supreme.",
        meaning:
          "Detached action is not inaction; it is action performed as worship, as service, without craving the fruit. This itself becomes the path to liberation.",
      },
      {
        id: "3.21",
        chapter: 3,
        verse: 21,
        sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥",
        transliteration:
          "yadyadācarati śreṣṭhastattadevetaro janaḥ\n sa yatpramāṇaṃ kurute lokastadanuvartate",
        english:
          "Whatever action a great person performs, that others follow. Whatever standard they set, the whole world pursues.",
        meaning:
          "Leadership by example. The responsibility of those in positions of influence is immense — their conduct shapes society.",
      },
      {
        id: "3.35",
        chapter: 3,
        verse: 35,
        sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥",
        transliteration:
          "śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt\n svadharme nidhanaṃ śreyaḥ paradharmo bhayāvahaḥ",
        english:
          "It is better to perform one's own duty imperfectly than to perform another's duty perfectly. Destruction in the course of one's own duty is better than engaging in another's duty, which is fraught with fear.",
        meaning:
          "Swadharma — one's own nature and duty — must be honored. Imitating others' paths leads to inner conflict and danger.",
      },
      {
        id: "3.36",
        chapter: 3,
        verse: 36,
        sanskrit: "अर्जुन उवाच।\nअथ केन प्रयुक्तोऽयं पापं चरति पूरुषः।\nअनिच्छन्नपि वार्ष्णेय बलादिव नियोजितः॥",
        transliteration:
          "arjuna uvāca\n atha kena prayukto'yaṃ pāpaṃ carati pūruṣaḥ\n anicchannapi vārṣṇeya balādiva niyojitaḥ",
        english:
          "Arjuna said: O Krishna, by what is one impelled to commit sin, as if by force, even against one's own will?",
      },
      {
        id: "3.37",
        chapter: 3,
        verse: 37,
        sanskrit: "श्रीभगवानुवाच।\nकाम एष क्रोध एष रजोगुणसमुद्भवः।\nमहाशनो महापाप्मा विद्ध्येनमिह वैरिणम्॥",
        transliteration:
          "śrībhagavānuvāca\n kāma eṣa krodha eṣa rajoguṇasamudbhavaḥ\n mahāśano mahāpāpmā viddhyenamihavairiṇam",
        english:
          "The Lord said: It is desire (kama) and anger (krodha), born of the mode of passion (rajas). They are all-devouring, deeply sinful; know them to be your enemy here.",
        meaning:
          "Desire and anger are the real enemies of the spiritual aspirant — not external foes. They arise from rajasic nature and consume discrimination.",
      },
      {
        id: "3.42",
        chapter: 3,
        verse: 42,
        sanskrit: "इन्द्रियाणि पराण्याहुरिन्द्रियेभ्यः परं मनः।\nमनसस्तु परा बुद्धिर्यो बुद्धेः परतस्तु यः॥",
        transliteration:
          "indriyāṇi parāṇyāhurindriyebhyaḥ paraṃ manaḥ\n manasastu parā buddhiryo buddheḥ paratastu yaḥ",
        english:
          "The senses are said to be superior to the body; the mind is superior to the senses; the intellect is superior to the mind; and that which is superior to the intellect is the Self.",
        meaning:
          "Hierarchy of human faculties: body → senses → mind → intellect → Atman (Self). The Self is the highest — knowing it, one masters all lower levels.",
      },
      {
        id: "3.43",
        chapter: 3,
        verse: 43,
        sanskrit: "एवं बुद्धेः परं बुद्ध्वा संस्तभ्यात्मानमात्मना।\nजहि शत्रुं महाबाहो कामरूपं दुरासदम्॥",
        transliteration:
          "evaṃ buddheḥ paraṃ buddhvā saṃstabhyātmānamātmanā\n jahi śatruṃ mahābāho kāmarūpaṃ durāsadam",
        english:
          "Thus knowing the Self to be superior to the intellect, and disciplining the lower self by the higher Self, slay this enemy in the form of desire, O mighty-armed one — it is so difficult to conquer.",
      },
    ],
  },
  {
    number: 4,
    name: "Jnana Yoga — The Path of Knowledge",
    sanskritName: "ज्ञानकर्मसंन्यासयोग",
    transliteration: "Jñāna-karma-sannyāsa-yoga",
    verseCount: 42,
    theme: "The eternal teaching, reincarnation of the wise, and the flame of knowledge.",
    summary:
      "Krishna reveals that this yoga was first given to the sun-god Vivasvan, and is now given to Arjuna. He explains his divine incarnations (avataras), the nature of action and inaction, and how knowledge burns away all karma like fire.",
    verses: [
      {
        id: "4.7",
        chapter: 4,
        verse: 7,
        sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
        transliteration:
          "yadā yadā hi dharmasya glānirbhavati bhārata\n abhyutthānamadharmasya tadātmānaṃ sṛjāmyaham",
        english:
          "Whenever there is a decline in dharma and a rise in adharma, O Bharata, I manifest myself.",
        meaning:
          "The promise of divine incarnation: the Lord descends in every age to restore righteousness. This is the doctrine of avatara.",
      },
      {
        id: "4.8",
        chapter: 4,
        verse: 8,
        sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
        transliteration:
          "paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām\n dharmasaṃsthāpanārthāya sambhavāmi yuge yuge",
        english:
          "To protect the righteous, to destroy the wicked, and to establish dharma, I take birth in age after age.",
      },
      {
        id: "4.13",
        chapter: 4,
        verse: 13,
        sanskrit: "चातुर्वर्ण्यं मया सृष्टं गुणकर्मविभागशः।\nतस्य कर्तारमपि मां विद्ध्यकर्तारमव्ययम्॥",
        transliteration:
          "cāturvarṇyaṃ mayā sṛṣṭaṃ guṇakarmavibhāgaśaḥ\n tasya kartāramapi māṃ viddhyakartāramavyayam",
        english:
          "The four divisions of society were created by me according to the qualities (gunas) and actions (karmas). Although I am the creator, know me to be the non-doer and imperishable.",
      },
      {
        id: "4.34",
        chapter: 4,
        verse: 34,
        sanskrit: "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया।\nउपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः॥",
        transliteration:
          "tadviddhi praṇipātena paripraśnena sevayā\n upadekṣyanti te jñānaṃ jñāninastattvadarśinaḥ",
        english:
          "Know that by humble reverence, by inquiry, and by service. The wise who have realized the truth will impart that knowledge to you.",
        meaning:
          "The traditional method of spiritual learning: surrender to a teacher, ask sincere questions, and serve them. Truth is transmitted from heart to heart.",
      },
      {
        id: "4.37",
        chapter: 4,
        verse: 37,
        sanskrit: "यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन।\nज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा॥",
        transliteration:
          "yathaidhāṃsi samiddho'gnirbhasmasātkurute'rjuna\n jñānāgniḥ sarvakarmāṇi bhasmasātkurute tathā",
        english:
          "As a blazing fire turns fuel to ashes, O Arjuna, so the fire of knowledge burns all karma to ashes.",
        meaning:
          "Self-knowledge (jnana) is the ultimate purifier. It consumes the seeds of all past karmas and liberates the soul.",
      },
      {
        id: "4.38",
        chapter: 4,
        verse: 38,
        sanskrit: "न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥",
        transliteration:
          "na hi jñānena sadṛśaṃ pavitramiha vidyate\n tatsvayaṃ yogasaṃsiddhaḥ kālenātmani vindati",
        english:
          "There is nothing in this world as purifying as knowledge. One who is perfected in yoga finds it within in due course of time.",
      },
      {
        id: "4.39",
        chapter: 4,
        verse: 39,
        sanskrit: "श्रद्धावाँल्लभते ज्ञानं तत्परः संयतेन्द्रियः।\nज्ञानं लब्ध्वा परां शान्तिमचिरेणाधिगच्छति॥",
        transliteration:
          "śraddhāvāllabhate jñānaṃ tatparaḥ saṃyatendriyaḥ\n jñānaṃ labdhvā parāṃ śāntimacireṇādhigacchati",
        english:
          "A person of faith, devoted to knowledge and restrained in senses, attains knowledge; having attained it, they quickly attain supreme peace.",
      },
      {
        id: "4.42",
        chapter: 4,
        verse: 42,
        sanskrit: "तस्माज्ज्ञानसमित्भासो ज्ञानेनास्य पापम्।\nयोगसंसिद्धः कालेनात्मनि विन्दति॥",
        transliteration:
          "tasmājjñānasaṃitbhāso jñānenāsya pāpam\n yogasaṃsiddhaḥ kālenātmani vindati",
        english:
          "Therefore, with the sword of knowledge, cut off this doubt born of ignorance that resides in your heart. Establish yourself in karma yoga and arise, O Bharata!",
      },
    ],
  },
  {
    number: 5,
    name: "Karma Vairagya Yoga — Renunciation of Action",
    sanskritName: "कर्मसंन्यासयोग",
    transliteration: "Karma-sannyāsa-yoga",
    verseCount: 29,
    theme: "Reconciling renunciation and action; the path of the wise.",
    summary:
      "Arjuna asks whether renunciation or action is superior. Krishna explains that both lead to the same goal, but the path of selfless action (karma yoga) is more practical. The wise see the same Self in all beings and remain ever-content.",
    verses: [
      {
        id: "5.10",
        chapter: 5,
        verse: 10,
        sanskrit: "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा॥",
        transliteration:
          "brahmaṇyādhāya karmāṇi saṅgaṃ tyaktvā karoti yaḥ\n lipyate na sa pāpena padmapatramivāmbhasā",
        english:
          "One who performs their duties dedicating them to the Supreme and abandoning attachment is not touched by sin, just as a lotus leaf is untouched by water.",
        meaning:
          "The lotus metaphor: act in the world but remain unsoiled by it. Detachment allows one to act without accumulating karma.",
      },
      {
        id: "5.18",
        chapter: 5,
        verse: 18,
        sanskrit: "विद्याविनयसम्पन्ने ब्राह्मणे गवि हस्तिनि।\nशुनि चैव श्वपाके च पण्डिताः समदर्शिनः॥",
        transliteration:
          "vidyāvinayasampanne brāhmaṇe gavi hastini\n śuni caiva śvapāke ca paṇḍitāḥ samadarśinaḥ",
        english:
          "The wise see the same truth in a learned and humble Brahmin, a cow, an elephant, a dog, and an outcaste — for they perceive the same Self in all.",
        meaning:
          "Samadarshana — equal vision. The sage sees the divine Self equally in all beings, regardless of social status, species, or condition.",
      },
      {
        id: "5.19",
        chapter: 5,
        verse: 19,
        sanskrit: "इहैव तैर्जितः सर्गो येषां साम्ये स्थितं मनः।\nनिर्दोषं हि समं ब्रह्म तस्माद्ब्रह्मणि ते स्थिताः॥",
        transliteration:
          "ihaiva tairjitaḥ sargo yeṣāṃ sāmye sthitaṃ manaḥ\n nirdoṣaṃ hi samaṃ brahma tasmādbrahmaṇi te sthitāḥ",
        english:
          "Even here in this life, those whose minds are established in equanimity have conquered creation, for the Brahman is flawless and equal. Therefore they abide in the Brahman.",
      },
      {
        id: "5.23",
        chapter: 5,
        verse: 23,
        sanskrit: "शक्नोतीहैव यः सोढुं प्राक्शरीरविमोक्षणात्।\nकामक्रोधोद्भवं वेगं स युक्तः स सुखी नरः॥",
        transliteration:
          "śaknotīhaiva yaḥ soḍhuṃ prākśarīravimokṣaṇāt\n kāmakrodhodbhavaṃ vegaṃ sa yuktaḥ sa sukhī naraḥ",
        english:
          "While in the body, one who can withstand the force of desire and anger before leaving the body — that one is a yogi, and that one is happy.",
      },
      {
        id: "5.25",
        chapter: 5,
        verse: 25,
        sanskrit: "लभन्ते ब्रह्मनिर्वाणमृषयः क्षीणकल्मषाः।\nछिन्नद्वैधा यतात्मानः सर्वभूतहिते रताः॥",
        transliteration:
          "labhante brahmanirvāṇamṛṣayaḥ kṣīṇakalmaṣāḥ\n chinnadvaidhā yatātmānaḥ sarvabhūtahite ratāḥ",
        english:
          "Those sages whose sins are exhausted, whose doubts are cut asunder, whose minds are disciplined, and who delight in the welfare of all beings, attain liberation in the Brahman.",
      },
    ],
  },
  {
    number: 6,
    name: "Dhyana Yoga — The Path of Meditation",
    sanskritName: "आत्मसंयमयोग",
    transliteration: "Ātma-saṃyama-yoga",
    verseCount: 47,
    theme: "The practice of meditation, mind control, and self-discipline.",
    summary:
      "Krishna teaches the practical method of meditation — posture, focus, regulation of mind. He explains that the mind is both friend and enemy, and emphasizes the importance of gradual practice and persistence.",
    verses: [
      {
        id: "6.5",
        chapter: 6,
        verse: 5,
        sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
        transliteration:
          "uddharedātmanātmānaṃ nātmānamavasādayet\n ātmaiva hyātmano bandhurātmaiva ripurātmanaḥ",
        english:
          "Let one lift oneself by oneself; let one not degrade oneself. The self alone is the friend of the self, and the self alone is the enemy of the self.",
        meaning:
          "The mind is the instrument of both bondage and liberation. Self-effort is the path; the lower self must be lifted by the higher Self.",
      },
      {
        id: "6.6",
        chapter: 6,
        verse: 6,
        sanskrit: "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः।\nअनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत्॥",
        transliteration:
          "bandhurātmātmanastasya yenātmaivātmanā jitaḥ\n anātmanastu śatrutve vartetātmaiva śatruvat",
        english:
          "For one who has conquered the self by the Self, the self becomes a friend. But for one who has not conquered the self, the self remains as an enemy.",
      },
      {
        id: "6.16",
        chapter: 6,
        verse: 16,
        sanskrit: "नात्यश्नतस्तु योगोऽस्ति न चैकान्तमनश्नतः।\nन चातिस्वप्नशीलस्य जाग्रतो नैव चार्जुन॥",
        transliteration:
          "nātyaśnatastu yoga'sti na caikāntamanaśnataḥ\n na cātisvapnaśīlasya jāgrato naiva cārjuna",
        english:
          "Yoga is not for one who eats too much or too little, nor for one who sleeps too much or too little, O Arjuna.",
        meaning:
          "Moderation (mitahara) is the foundation of yoga. Extremes of any kind disturb the body-mind and hinder meditation.",
      },
      {
        id: "6.17",
        chapter: 6,
        verse: 17,
        sanskrit: "युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु।\nयुक्तस्वप्नावबोधस्य योगो भवति दुःखहा॥",
        transliteration:
          "yuktāhāravihārasya yuktaceṣṭasya karmasu\n yuktasvapnāvabodhasyā yogaḥ bhavati duḥkhahā",
        english:
          "For one who is moderate in eating, recreation, working, sleeping, and waking, yoga becomes the destroyer of all sorrow.",
      },
      {
        id: "6.35",
        chapter: 6,
        verse: 35,
        sanskrit: "श्रीभगवानुवाच।\nअसंशयं महाबाहो मनो दुर्निग्रहं चलम्।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥",
        transliteration:
          "śrībhagavānuvāca\n asaṃśayaṃ mahābāho mano durnigrahaṃ calam\n abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate",
        english:
          "The Lord said: Undoubtedly, O mighty-armed one, the mind is restless and difficult to control. But by practice (abhyasa) and detachment (vairagya), O son of Kunti, it can be controlled.",
        meaning:
          "The two wings of meditation: abhyasa (consistent practice) and vairagya (dispassion toward fleeting experiences). Both are required.",
      },
      {
        id: "6.47",
        chapter: 6,
        verse: 47,
        sanskrit: "योगिनामपि सर्वेषां मद्गतेनान्तरात्मना।\nश्रद्धावान्भजते यो मां स मे युक्ततमो मतः॥",
        transliteration:
          "yogināmapi sarveṣāṃ madgatenāntarātmanā\n śraddhāvānbhajate yo māṃ sa me yuktatamo mataḥ",
        english:
          "Of all yogis, the one who, full of faith, worships Me with their inner Self absorbed in Me — that one is considered by Me to be the most devoted and united.",
      },
    ],
  },
  {
    number: 7,
    name: "Jnana Vijnana Yoga — Knowledge and Wisdom",
    sanskritName: "ज्ञानविज्ञानयोग",
    transliteration: "Jñāna-vijñāna-yoga",
    verseCount: 30,
    theme: "The Divine's higher and lower nature; the four types of devotees.",
    summary:
      "Krishna reveals his eightfold lower nature (earth, water, fire, air, ether, mind, intellect, ego) and his higher nature as the life-principle sustaining the universe. He classifies four types of devotees and explains the difficulty of knowing the Divine.",
    verses: [
      {
        id: "7.1",
        chapter: 7,
        verse: 1,
        sanskrit: "श्रीभगवानुवाच।\nमय्यासक्तमनाः पार्थ योगं युञ्जन्मदाश्रयः।\nअसंशयं समग्रं मां यथा ज्ञास्यसि तच्छृणु॥",
        transliteration:
          "śrībhagavānuvāca\n mayyāsaktamanāḥ pārtha yogaṃ yuñjanmadāśrayaḥ\n asaṃśayaṃ samagraṃ māṃ yathā jñāsyasi tacchṛṇu",
        english:
          "The Lord said: Hear, O Parth, how, with your mind attached to Me, taking refuge in Me, and practicing yoga, you will know Me fully and without doubt.",
      },
      {
        id: "7.7",
        chapter: 7,
        verse: 7,
        sanskrit: "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय।\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव॥",
        transliteration:
          "mattaḥ parataraṃ nānyatkiñcidasti dhanañjaya\n mayi sarvamidaṃ protaṃ sūtre maṇigaṇā iva",
        english:
          "O Dhananjaya, there is nothing higher than Me. All this universe is strung on Me like rows of gems on a thread.",
        meaning:
          "The Lord is the supreme substratum of all existence. Like gems strung on a single thread, all beings and worlds are held together by the Divine.",
      },
      {
        id: "7.8",
        chapter: 7,
        verse: 8,
        sanskrit: "रसोऽहमपि कौन्तेय प्रभास्मि शशिसूर्ययोः।\nप्रणवः सर्ववेदेषु शब्दः खे पौरुषं नृषु॥",
        transliteration:
          "raso'hamapi kaunteya prabhāsmi śaśisūryayoḥ\n praṇavaḥ sarvavedeṣu śabdaḥ khe pauruṣaṃ nṛṣu",
        english:
          "O son of Kunti, I am the taste in water, the light of the sun and moon, the syllable Om in all the Vedas, the sound in ether, and the prowess in men.",
      },
      {
        id: "7.16",
        chapter: 7,
        verse: 16,
        sanskrit: "चतुर्विधा भजन्ते मां जनाः सुकृतिनोऽर्जुन।\nआर्तो जिज्ञासुरर्थार्थी ज्ञानी च भरतर्षभ॥",
        transliteration:
          "caturvidhā bhajante māṃ janāḥ sukṛtino'rjuna\n ārto jijñāsurarthārthī jñānī ca bharatarṣabha",
        english:
          "O best of Bharatas, four kinds of virtuous people worship Me: the distressed, the seeker of knowledge, the seeker of wealth, and the wise one.",
        meaning:
          "Four motivations turn people toward the Divine: suffering, curiosity, desire for boons, and mature wisdom. The wise one, who seeks God for God's sake, is dearest.",
      },
      {
        id: "7.19",
        chapter: 7,
        verse: 19,
        sanskrit: "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते।\nवासुदेवः सर्वमिति स महात्मा सुदुर्लभः॥",
        transliteration:
          "bahūnāṃ janmanāmante jñānavānmāṃ prapadyate\n vāsudevaḥ sarvamiti sa mahātmā sudurlabhaḥ",
        english:
          "After many births and deaths, the wise one surrenders to Me, realizing 'Vasudeva (the Divine) is all.' Such a great soul is very rare.",
      },
    ],
  },
  {
    number: 8,
    name: "Aksara Brahma Yoga — The Imperishable Absolute",
    sanskritName: "अक्षरब्रह्मयोग",
    transliteration: "Akṣara-brahma-yoga",
    verseCount: 28,
    theme: "The nature of the Absolute, the paths of light and darkness at death.",
    summary:
      "Krishna explains the meaning of Brahman, Adhyatma, Karma, Adhibhuta, Adhidaiva, and Adhiyajna. He describes the practice of remembering the Divine at the moment of death and the two paths of departure — the path of light (leading to liberation) and the path of darkness (leading to rebirth).",
    verses: [
      {
        id: "8.5",
        chapter: 8,
        verse: 5,
        sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्।\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः॥",
        transliteration:
          "antakāle ca māmeva smaranmuktvaṃ kalevaram\n yaḥ prayāti sa madbhāvaṃ yāti nāstyatra saṃśayaḥ",
        english:
          "Whoever, at the time of death, leaves the body remembering Me alone, attains My state. Of this there is no doubt.",
        meaning:
          "The state of consciousness at the moment of death shapes the next journey. A mind absorbed in the Divine attains the Divine.",
      },
      {
        id: "8.6",
        chapter: 8,
        verse: 6,
        sanskrit: "यं यं वापि स्मरन्भावं त्यजत्यन्ते कलेवरम्।\nतं तमेवैति कौन्तेय सदा तद्भावभावितः॥",
        transliteration:
          "yaṃ yaṃ vāpi smaranbhāvaṃ tyajatyante kalevaram\n taṃ tamevaiti kaunteya sadā tadbhāvabhāvitaḥ",
        english:
          "O son of Kunti, whatever state of being one remembers when leaving the body, that state one attains — for that state has always been the focus of their absorption.",
      },
      {
        id: "8.7",
        chapter: 8,
        verse: 7,
        sanskrit: "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च।\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम्॥",
        transliteration:
          "tasmātsarveṣu kāleṣu māmanusmara yudhya ca\n mayyarpitamanobuddhirmāmevaiṣyasyasaṃśayam",
        english:
          "Therefore, at all times, remember Me and fight. With your mind and intellect offered to Me, you shall surely come to Me — of this there is no doubt.",
      },
      {
        id: "8.14",
        chapter: 8,
        verse: 14,
        sanskrit: "अनन्यचेताः सततं यो मां स्मरति नित्यशः।\nतस्याहं सुलभः पार्थ नित्ययुक्तस्य योगिनः॥",
        transliteration:
          "ananyacetāḥ satataṃ yo māṃ smarati nityaśaḥ\n tasyāhaṃ sulabhaḥ pārtha nityayuktasya yoginaḥ",
        english:
          "O Partha, for one who remembers Me constantly with undivided attention, I am easy to attain — for that yogi is ever absorbed in Me.",
      },
    ],
  },
  {
    number: 9,
    name: "Raja Vidya Yoga — Royal Knowledge",
    sanskritName: "राजविद्याराजगुह्ययोग",
    transliteration: "Rāja-vidyā-rāja-guhya-yoga",
    verseCount: 34,
    theme: "The sovereign science and sovereign secret; universal divine immanence.",
    summary:
      "Krishna reveals this knowledge as the most secret and sacred of all teachings. He is the substratum of all beings and pervades the entire universe. He accepts any offering made with devotion, however small, and protects those who surrender to Him.",
    verses: [
      {
        id: "9.22",
        chapter: 9,
        verse: 22,
        sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥",
        transliteration:
          "ananyāścintayanto māṃ ye janāḥ paryupāsate\n teṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmyaham",
        english:
          "To those who worship Me alone, with undivided attention, ever absorbed in Me, I provide what they lack and preserve what they have.",
        meaning:
          "The famous 'yoga-kshema' promise: to the devotee fully surrendered, the Divine takes responsibility for both what is needed (yoga) and what is possessed (kshema).",
      },
      {
        id: "9.26",
        chapter: 9,
        verse: 26,
        sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥",
        transliteration:
          "patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati\n tadahaṃ bhaktyupahṛtamaśnāmi prayatātmanaḥ",
        english:
          "If one offers Me with devotion a leaf, a flower, a fruit, or water, I accept that offering of devotion from the pure-hearted.",
        meaning:
          "God does not require wealth — only love. The smallest offering made with sincere devotion is accepted by the Divine.",
      },
      {
        id: "9.27",
        chapter: 9,
        verse: 27,
        sanskrit: "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्।\nयत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥",
        transliteration:
          "yatkaroṣi yadaśnāsi yajjuhoṣi dadāsi yat\n yattapasyasi kaunteya tatkuruṣva madarpaṇam",
        english:
          "Whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give, and whatever austerities you practice — do that as an offering to Me, O son of Kunti.",
        meaning:
          "The complete consecration of life: every action, every meal, every gift, every discipline offered to the Divine. This is the essence of karma yoga as worship.",
      },
      {
        id: "9.34",
        chapter: 9,
        verse: 34,
        sanskrit: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।\nमामेवैष्यसि युक्त्वैवमात्मानं मत्परायणः॥",
        transliteration:
          "manmanā bhava madbhakto madyājī māṃ namaskuru\n māmevaiṣyasi yuktvaivamātmānaṃ matparāyaṇaḥ",
        english:
          "Fix your mind on Me, be devoted to Me, sacrifice to Me, bow down to Me. Thus united, you shall come to Me — offering yourself to Me as the supreme goal.",
      },
    ],
  },
  {
    number: 10,
    name: "Vibhuti Yoga — Divine Glories",
    sanskritName: "विभूतियोग",
    transliteration: "Vibhūti-yoga",
    verseCount: 42,
    theme: "The divine manifestations in the universe.",
    summary:
      "Krishna declares that from Him arises all creation and describes his chief manifestations (vibhutis) in the world — the best of every category reveals the Divine. He is the Himalaya among mountains, the Ganga among rivers, the Om among words.",
    verses: [
      {
        id: "10.8",
        chapter: 10,
        verse: 8,
        sanskrit: "अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते।\nइति मत्वा भजन्ते मां बुधा भावसमन्विताः॥",
        transliteration:
          "ahaṃ sarvasya prabhavo mattaḥ sarvaṃ pravartate\n iti matvā bhajante māṃ budhā bhāvasamanvitāḥ",
        english:
          "I am the origin of all; from Me everything proceeds. Knowing this, the wise worship Me with heartfelt devotion.",
      },
      {
        id: "10.9",
        chapter: 10,
        verse: 9,
        sanskrit: "मच्चित्ता मद्गतप्राणा बोधयन्तः परस्परम्।\nकथयन्तश्च मां नित्यं तुष्यन्ति च रमन्ति च॥",
        transliteration:
          "maccittā madgataprāṇā bodhayaṃtaḥ parasparam\n kathayantaśca māṃ nityaṃ tuṣyanti ca ramanti ca",
        english:
          "With their minds on Me, their lives surrendered to Me, enlightening one another and ever speaking of Me — they are satisfied and they delight.",
      },
      {
        id: "10.10",
        chapter: 10,
        verse: 10,
        sanskrit: "तेषां सततयुक्तानां भजतां प्रीतिपूर्वकम्।\nददामि बुद्धियोगं तं येन मामुपयान्ति ते॥",
        transliteration:
          "teṣāṃ satatayuktānāṃ bhajatāṃ prītipūrvakam\n dadāmi buddhiyogaṃ taṃ yena māmupayānti te",
        english:
          "To those who are ever devoted and worship Me with love, I grant the yoga of discrimination by which they come to Me.",
        meaning:
          "The Divine actively guides sincere seekers — granting them the wisdom and discrimination needed to walk the path home.",
      },
      {
        id: "10.11",
        chapter: 10,
        verse: 11,
        sanskrit: "तेषामेवानुकम्पार्थमहमज्ञानजं तमः।\nनाशयाम्यात्मभावस्थो ज्ञानदीपेन भास्वता॥",
        transliteration:
          "teṣāmevānukampārthamahamajñānajaṃ tamaḥ\n nāśayāmyātmabhāvastho jñānadīpena bhāsvatā",
        english:
          "Out of compassion for them, dwelling within their hearts, I destroy the darkness born of ignorance with the radiant lamp of knowledge.",
      },
      {
        id: "10.20",
        chapter: 10,
        verse: 20,
        sanskrit: "अहमात्मा गुडाकेश सर्वभूताशयस्थितः।\nअहमादिश्च मध्यं च भूतानामन्त एव च॥",
        transliteration:
          "ahamātmā guḍākeśa sarvabhūtāśayasthitaḥ\n ahamādiśca madhyaṃ ca bhūtānāmanta eva ca",
        english:
          "O Arjuna, I am the Self, residing in the hearts of all beings. I am the beginning, the middle, and the end of all beings.",
      },
      {
        id: "10.41",
        chapter: 10,
        verse: 41,
        sanskrit: "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा।\nतत्तदेवावगच्छ त्वं मम तेजोंशसम्भवम्॥",
        transliteration:
          "yadyadvibhūtimatsattvaṃ śrīmadūrjitameva vā\n tattadevāvagaccha tvaṃ mama tejoṃśasambhavam",
        english:
          "Whatever being is glorious, powerful, or prosperous — know that to be a manifestation of a fraction of My splendor.",
      },
    ],
  },
  {
    number: 11,
    name: "Vishwarupa Darshana Yoga — The Cosmic Vision",
    sanskritName: "विश्वरूपदर्शनयोग",
    transliteration: "Viśvarūpa-darśana-yoga",
    verseCount: 55,
    theme: "The revelation of the cosmic form of the Divine.",
    summary:
      "Arjuna is granted divine vision and sees Krishna's universal form (Vishwarupa) — containing all beings, all time, all worlds. Overwhelmed, Arjuna praises the Lord and ultimately asks to see again his gentle human form.",
    verses: [
      {
        id: "11.12",
        chapter: 11,
        verse: 12,
        sanskrit: "दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता।\nयदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः॥",
        transliteration:
          "divi sūryasahasrasya bavedyugapadutthitā\n yadi bhāḥ sadṛśī sā syādbhāsastasya mahātmanaḥ",
        english:
          "If the radiance of a thousand suns were to rise at once in the sky, that might resemble the splendor of that great Being.",
        meaning:
          "The famous description of the cosmic form — a brilliance beyond imagination, like a thousand suns rising simultaneously.",
      },
      {
        id: "11.32",
        chapter: 11,
        verse: 32,
        sanskrit: "कालोऽस्मि लोकक्षयकृत्प्रवृद्धो\nलोकान्समाहर्तुमिह प्रवृत्तः।\nऋतेऽपि त्वां न भविष्यन्ति सर्वे\nयेऽवस्थिताः प्रत्यनीकेषु योधाः॥",
        transliteration:
          "kālo'smi lokakṣayakṛtpravṛddho\n lokān samāhartumiha pravṛttaḥ\n ṛte'pi tvāṃ na bhaviṣyanti sarve\n ye'vasthitāḥ pratyānīkeṣu yodhāḥ",
        english:
          "I am Time, the destroyer of worlds, matured, here engaged in consuming all beings. Even without you, all those warriors arrayed in opposing ranks shall cease to be.",
        meaning:
          "Time itself — the great equalizer — is the form of the Divine. All beings are already destined to die; Arjuna is merely the instrument.",
      },
      {
        id: "11.55",
        chapter: 11,
        verse: 55,
        sanskrit: "मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः।\nनिर्वैरः सर्वभूतेषु यः स मामेति पाण्डव॥",
        transliteration:
          "matkarmakṛnmatparamo madbhaktaḥ saṅgavarjitaḥ\n nirvairaḥ sarvabhūteṣu yaḥ sa māmeti pāṇḍava",
        english:
          "O Pandava, one who does all actions for Me, who regards Me as the supreme, who is devoted to Me, free from attachment, free from enmity toward all beings — that one comes to Me.",
      },
    ],
  },
  {
    number: 12,
    name: "Bhakti Yoga — The Path of Devotion",
    sanskritName: "भक्तियोग",
    transliteration: "Bhakti-yoga",
    verseCount: 20,
    theme: "The supreme path of devotion and the qualities of a true devotee.",
    summary:
      "Krishna declares that those who worship Him with undivided devotion are the most dear to Him. He then describes the qualities of such a devotee — free from hatred, friendly to all, compassionate, free from possessiveness, equanimous in pleasure and pain.",
    verses: [
      {
        id: "12.8",
        chapter: 12,
        verse: 8,
        sanskrit: "मय्येव मन आधत्स्व मयि बुद्धिं निवेशय।\nनिवसिष्यसि मय्येव अत ऊर्ध्वं न संशयः॥",
        transliteration:
          "mayyeva mana ādhatsva mayi buddhiṃ niveśaya\n nivasiṣyasi mayyeva ata ūrdhvaṃ na saṃśayaḥ",
        english:
          "Fix your mind on Me alone, rest your intellect in Me — thus you shall live in Me hereafter, of this there is no doubt.",
      },
      {
        id: "12.9",
        chapter: 12,
        verse: 9,
        sanskrit: "अथ चित्तं समाधातुं न शक्नोषि मयि स्थिरम्।\nअभ्यासयोगेन ततो मामिच्छाप्तुं धनञ्जय॥",
        transliteration:
          "atha cittaṃ samādhātuṃ na śaknoṣi mayi sthiram\n abhyāsayogena tato māmicchāptuṃ dhanañjaya",
        english:
          "If you cannot fix your mind steadily on Me, O Dhananjaya, then by the yoga of practice seek to attain Me.",
      },
      {
        id: "12.13",
        chapter: 12,
        verse: 13,
        sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥",
        transliteration:
          "adveṣṭā sarvabhūtānāṃ maitraḥ karuṇa eva ca\n nirmamo nirahaṅkāraḥ samaduḥkhasukhaḥ kṣamī",
        english:
          "One who is free from hatred toward all beings, friendly, compassionate, free from possessiveness and ego, equanimous in pleasure and pain, forgiving —",
      },
      {
        id: "12.14",
        chapter: 12,
        verse: 14,
        sanskrit: "सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥",
        transliteration:
          "santuṣṭaḥ satataṃ yogī yatātmā dṛḍhaniścayaḥ\n mayyarpitamanobuddhiryo madbhaktaḥ sa me priyaḥ",
        english:
          "Ever content, steady in yoga, self-controlled, firm in determination, with mind and intellect offered to Me — that devotee of Mine is dear to Me.",
      },
      {
        id: "12.19",
        chapter: 12,
        verse: 19,
        sanskrit: "तुल्यनिन्दास्तुतिर्मौनी सन्तुष्टो येन केनचित्।\nअनिकेतः स्थिरमतिर्भक्तिमान्मे प्रियो नरः॥",
        transliteration:
          "tulyanindāstutirmaunī santuṣṭo yena kenacit\n aniketaḥ sthiramatirbhaktimānme priyo naraḥ",
        english:
          "Unaffected by praise or blame, silent, content with whatever comes, without fixed abode, steady-minded, full of devotion — such a person is dear to Me.",
      },
      {
        id: "12.20",
        chapter: 12,
        verse: 20,
        sanskrit: "ये तु धर्म्यामृतमिदं यथोक्तं पर्युपासते।\nश्रद्दधाना मत्परमा भक्तास्तेऽतीव मे प्रियाः॥",
        transliteration:
          "ye tu dharmyāmṛtamidaṃ yathoktaṃ paryupāsate\n śraddadhānā matparamā bhaktāste'tīva me priyāḥ",
        english:
          "Those who, full of faith, hold this nectar of dharma as supreme, and worship Me as described — such devotees are exceedingly dear to Me.",
      },
    ],
  },
  {
    number: 13,
    name: "Kshetra Kshetrajna Yoga — Field and Knower of the Field",
    sanskritName: "क्षेत्रक्षेत्रज्ञविभागयोग",
    transliteration: "Kṣetra-kṣetrajña-vibhāga-yoga",
    verseCount: 35,
    theme: "The distinction between matter (body) and spirit (soul).",
    summary:
      "Krishna explains the field (kshetra — the body and matter) and the knower of the field (kshetrajna — the conscious Self). He describes the qualities that lead to knowledge and reveals the unity of the Self in all beings.",
    verses: [
      {
        id: "13.8",
        chapter: 13,
        verse: 8,
        sanskrit: "अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम्।\nआचार्योपासनं शौचं स्थैर्यमात्मविनिग्रहः॥",
        transliteration:
          "amānitvamadambhitvamahiṃsā kṣāntirārjavam\n ācāryopāsanaṃ śaucaṃ sthairyamātmavinigrahaḥ",
        english:
          "Humility, freedom from pride, non-violence, forgiveness, simplicity, service to the teacher, purity, steadfastness, self-control —",
        meaning:
          "The opening of Krishna's list of twenty qualities that constitute true knowledge. Knowledge here is not information but a way of being.",
      },
      {
        id: "13.9",
        chapter: 13,
        verse: 9,
        sanskrit: "इन्द्रियार्थेषु वैराग्यमनहङ्कार एव च।\nजन्ममृत्युजराव्याधिदुःखदोषानुदर्शनम्॥",
        transliteration:
          "indriyārtheṣu vairāgyamanahaṅkāra eva ca\n janmamṛtyujarāvyādhiduḥkhadoṣānudarśanam",
        english:
          "Detachment from sense objects, absence of ego, constant awareness of the evils of birth, death, old age, sickness, and pain —",
      },
      {
        id: "13.10",
        chapter: 13,
        verse: 10,
        sanskrit: "असक्तिरनभिष्वङ्गः पुत्रदारगृहादिषु।\nनित्यं च समचित्तत्वमिष्टानिष्टोपपत्तिषु॥",
        transliteration:
          "asaktiranabhiṣvaṅgaḥ putradāragṛhādiṣu\n nityaṃ ca samacittatvamiṣṭāniṣṭopapattiṣu",
        english:
          "Non-attachment, unclinging to family and home, constant evenness of mind in desirable and undesirable events —",
      },
      {
        id: "13.15",
        chapter: 13,
        verse: 15,
        sanskrit: "सर्वेन्द्रियगुणाभासं सर्वेन्द्रियविवर्जितम्।\nप्रकृतं सर्वभूतानां निर्गुणं गुणभोक्तृ च॥",
        transliteration:
          "sarvendriyaguṇābhāsaṃ sarvendriyavivarjitam\n prakṛtaṃ sarvabhūtānāṃ nirguṇaṃ guṇabhoktṛ ca",
        english:
          "It appears to have the qualities of all senses, yet is free from all senses; it is unattached yet sustains all; it is beyond the gunas yet experiences the gunas.",
      },
      {
        id: "13.22",
        chapter: 13,
        verse: 22,
        sanskrit: "पुरुषः प्रकृतिस्थो हि भुङ्क्ते प्रकृतिजान्गुणान्।\nकारणं गुणसङ्गोऽस्य सदसद्योनिजन्मसु॥",
        transliteration:
          "puruṣaḥ prakṛtistho hi bhuṅkte prakṛtijānguṇān\n kāraṇaṃ guṇasaṅgo'sya sadasadyonijanmasu",
        english:
          "The spirit, dwelling in matter, experiences the qualities born of matter. Attachment to these qualities is the cause of birth in good and evil wombs.",
        meaning:
          "Bondage arises when the Self identifies with the gunas of prakriti. Liberation comes from disidentification — seeing the Self as witness, not doer.",
      },
    ],
  },
  {
    number: 14,
    name: "Guna Traya Vibhaga Yoga — The Three Modes of Nature",
    sanskritName: "गुणत्रयविभागयोग",
    transliteration: "Guṇa-traya-vibhāga-yoga",
    verseCount: 27,
    theme: "The three gunas (sattva, rajas, tamas) and how to transcend them.",
    summary:
      "Krishna explains the three fundamental qualities of nature — sattva (purity, light), rajas (passion, action), and tamas (ignorance, inertia) — how they bind the soul, and how one transcends them to attain Brahman-realization.",
    verses: [
      {
        id: "14.5",
        chapter: 14,
        verse: 5,
        sanskrit: "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः।\nनिबध्नन्ति महाबाहो देहे देहिनमव्ययम्॥",
        transliteration:
          "sattvaṃ rajastama iti guṇāḥ prakṛtisambhavāḥ\n nibadhnanti mahābāho dehe dehinamavyayam",
        english:
          "Sattva, rajas, and tamas — these gunas, born of prakriti, bind the imperishable embodied soul to the body, O mighty-armed one.",
        meaning:
          "The three gunas are the ropes that bind consciousness to matter. Understanding them is the key to liberation.",
      },
      {
        id: "14.6",
        chapter: 14,
        verse: 6,
        sanskrit: "तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम्।\nसुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ॥",
        transliteration:
          "tatra sattvaṃ nirmalatvātprakāśakamanāmayam\n sukhasaṅgena badhnāti jñānasaṅgena cānagha",
        english:
          "Of these, sattva, being pure, is luminous and diseaseless. It binds through attachment to happiness and attachment to knowledge, O sinless one.",
      },
      {
        id: "14.7",
        chapter: 14,
        verse: 7,
        sanskrit: "रजो रागात्मकं विद्धि तृष्णासङ्गसमुद्भवम्।\nतन्निबध्नाति कौन्तेय कर्मसङ्गेन देहिनम्॥",
        transliteration:
          "rajo rāgātmakaṃ viddhi tṛṣṇāsaṅgasamudbhavam\n tannibadhnāti kaunteya karmasaṅgena dehinam",
        english:
          "Know rajas to be of the nature of passion, born of craving and attachment. It binds the embodied soul through attachment to action, O son of Kunti.",
      },
      {
        id: "14.8",
        chapter: 14,
        verse: 8,
        sanskrit: "तमस्त्वज्ञानजं विद्धि मोहनं सर्वदेहिनाम्।\nप्रमादालस्यनिद्राभिस्तन्निबध्नाति भारत॥",
        transliteration:
          "tamastvajñānajaṃ viddhi mohanaṃ sarvadehinām\n pramādālasyanidrābhistannibadhnāti bhārata",
        english:
          "Know tamas to be born of ignorance, deluding all embodied beings. It binds through negligence, laziness, and sleep, O Bharata.",
      },
      {
        id: "14.26",
        chapter: 14,
        verse: 26,
        sanskrit: "मां च योऽव्यभिचारेण भक्तियोगेन सेवते।\nस गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते॥",
        transliteration:
          "māṃ ca yo'vyabhicāreṇa bhaktiyogena sevate\n sa guṇānsamatītyaitānbrahmabhūyāya kalpate",
        english:
          "One who serves Me with undeviating devotion crosses beyond these gunas and becomes qualified for realization of the Brahman.",
        meaning:
          "Unwavering devotion is the surest path to transcendence. By fixing the heart on the Divine, one rises above the play of the gunas.",
      },
    ],
  },
  {
    number: 15,
    name: "Purushottama Yoga — The Supreme Person",
    sanskritName: "पुरुषोत्तमयोग",
    transliteration: "Puruṣottama-yoga",
    verseCount: 20,
    theme: "The cosmic tree, the supreme Self, and the path of liberation.",
    summary:
      "Krishna describes the cosmic ashvattha tree (the samsaric existence) with roots above and branches below, which must be cut with the axe of detachment. He reveals Himself as the Supreme Person (Purushottama) beyond both the perishable and the imperishable.",
    verses: [
      {
        id: "15.1",
        chapter: 15,
        verse: 1,
        sanskrit: "श्रीभगवानुवाच।\nऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम्।\nछन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित्॥",
        transliteration:
          "śrībhagavānuvāca\n ūrdhvamūlamadhaḥśākhamaśvatthaṃ prāhuravyayam\n chandāṃsi yasya parṇāni yastaṃ veda sa vedavit",
        english:
          "The Lord said: They speak of an imperishable ashvattha (peepal) tree, with roots above and branches below, whose leaves are the Vedic hymns. One who knows this tree is a knower of the Vedas.",
        meaning:
          "The cosmic tree of samsara — roots in the transcendent, branches in the manifest world. To know its true nature is wisdom.",
      },
      {
        id: "15.5",
        chapter: 15,
        verse: 5,
        sanskrit: "निर्मानमोहा जितसङ्गदोषा\nअध्यात्मनित्या विनिवृत्तकामाः।\nद्वन्द्वैर्विमुक्ताः सुखदुःखसंज्ञैर्गच्छन्त्यमूढाः पदमव्ययं तत्॥",
        transliteration:
          "nirmānamohā jitasangadoṣā\n adhyātmanityā vinivṛttakāmāḥ\n dvandvairvimuktāḥ sukhaduḥkhasaṃjñairgacchantyamūḍāḥ padamavyayaṃ tat",
        english:
          "Free from pride and delusion, victorious over the flaw of attachment, ever dwelling in the Self, desires abandoned, free from the dualities of pleasure and pain — the undeluded reach that eternal goal.",
      },
      {
        id: "15.7",
        chapter: 15,
        verse: 7,
        sanskrit: "ममैवांशो जीवलोके जीवभूतः सनातनः।\nमनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति॥",
        transliteration:
          "mamaivāṃśo jīvaloke jīvabhūtaḥ sanātanaḥ\n manaḥṣaṣṭhānīndriyāṇi prakṛtisthāni karṣati",
        english:
          "An eternal fragment of Myself, becoming the living soul in the world of living beings, draws the senses — with the mind as the sixth — which abide in nature.",
        meaning:
          "The individual soul (jiva) is an eternal part of the Divine. It carries the mind and senses into the world of matter and experiences their fruits.",
      },
      {
        id: "15.15",
        chapter: 15,
        verse: 15,
        sanskrit: "सर्वस्य चाहं हृदि सन्निविष्टो\nमत्तः स्मृतिर्ज्ञानमपोहनं च।\nवेदैश्च सर्वैरहमेव वेद्यो\nवेदान्तकृद्वेदविदेव चाहम्॥",
        transliteration:
          "sarvasya cāhaṃ hṛdi sanniviṣṭo\n mattaḥ smṛtirjñānamapohanaṃ ca\n vedaiśca sarvairahameva vedyo\n vedāntakṛdvedavideva cāham",
        english:
          "I am seated in the hearts of all; from Me come memory, knowledge, and their removal. I alone am to be known by all the Vedas; I am the author of the Vedanta and the knower of the Vedas.",
      },
      {
        id: "15.19",
        chapter: 15,
        verse: 19,
        sanskrit: "यो मामेवमसम्मूढो जानाति पुरुषोत्तमम्।\nस सर्वविद्भजति मां सर्वभावेन भारत॥",
        transliteration:
          "yo māmevasammmūḍho jānāti puruṣottamam\n sa sarvavidbhajati māṃ sarvabhāvena bhārata",
        english:
          "One who, undeluded, knows Me thus as the Supreme Person — that one knows everything and worships Me with their whole being, O Bharata.",
      },
    ],
  },
  {
    number: 16,
    name: "Daivasura Sampad Vibhaga Yoga — Divine and Demoniac Natures",
    sanskritName: "दैवासुरसम्पद्विभागयोग",
    transliteration: "Daivāsura-sampad-vibhāga-yoga",
    verseCount: 24,
    theme: "The qualities that lead to liberation versus those that lead to bondage.",
    summary:
      "Krishna enumerates the divine qualities (daivi sampad) that lead to liberation — fearlessness, purity, steadfastness in yoga, charity, self-restraint, sacrifice, study of scriptures, non-violence, truth — and the demoniac qualities that lead to bondage.",
    verses: [
      {
        id: "16.1",
        chapter: 16,
        verse: 1,
        sanskrit: "श्रीभगवानुवाच।\nअभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः।\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम्॥",
        transliteration:
          "śrībhagavānuvāca\n abhayaṃ sattvasaṃśuddhirjñānayogavyavasthitiḥ\n dānaṃ damaśca yajñaśca svādhyāyastapa ārjavam",
        english:
          "The Lord said: Fearlessness, purity of heart, steadfastness in knowledge and yoga, charity, self-control, sacrifice, study of scriptures, austerity, simplicity —",
      },
      {
        id: "16.2",
        chapter: 16,
        verse: 2,
        sanskrit: "अहिंसा सत्यमक्रोधस्त्यागः शान्तिरपैशुनम्।\nदया भूतेष्वलोलुप्त्वं मार्दवं ह्रीरचापलम्॥",
        transliteration:
          "ahiṃsā satyamakrodhastyāgaḥ śāntirapaiśunam\n dayā bhūteṣvaloluptvaṃ mārdavaṃ hrīracāpalam",
        english:
          "Non-violence, truth, freedom from anger, renunciation, peacefulness, aversion to fault-finding, compassion toward beings, freedom from greed, gentleness, modesty, steadiness —",
      },
      {
        id: "16.3",
        chapter: 16,
        verse: 3,
        sanskrit: "तेजः क्षमा धृतिः शौचमद्रोहो नातिमानिता।\nभवन्ति सम्पदं दैवीमभिजातस्य भारत॥",
        transliteration:
          "tejaḥ kṣamā dhṛtiḥ śaucamadroho nātimānitā\n bhavanti sampadaṃ daivīmabhijātasya bhārata",
        english:
          "Vigor, forgiveness, fortitude, purity, freedom from hatred, absence of pride — these belong to one born with divine fortune, O Bharata.",
      },
      {
        id: "16.21",
        chapter: 16,
        verse: 21,
        sanskrit: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः।\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥",
        transliteration:
          "trividhaṃ narakasyedaṃ dvāraṃ nāśanamātmanaḥ\n kāmaḥ krodhastathā lobhastasmādetattrayaṃ tyajet",
        english:
          "Triple is the gate of hell, destructive of the self: lust, anger, and greed. Therefore, one should abandon these three.",
        meaning:
          "The three gates of self-destruction: kama (lust), krodha (anger), lobha (greed). Renouncing these is the foundation of the spiritual life.",
      },
      {
        id: "16.24",
        chapter: 16,
        verse: 24,
        sanskrit: "तस्माच्छास्त्रं प्रमाणं ते कार्याकार्यव्यवस्थितौ।\nज्ञात्वा शास्त्रविधानोक्तं कर्म कर्तुमिहार्हसि॥",
        transliteration:
          "tasmācchāstraṃ pramāṇaṃ te kāryākāryavyavasthitau\n jñātvā śāstravidhānoktaṃ karma kartumihārhasi",
        english:
          "Therefore, let the scripture be your authority in determining what ought to be done and what ought not to be done. Knowing what is declared by the scripture, you should act accordingly.",
      },
    ],
  },
  {
    number: 17,
    name: "Shraddha Traya Vibhaga Yoga — The Threefold Faith",
    sanskritName: "श्रद्धात्रयविभागयोग",
    transliteration: "Śraddhā-traya-vibhāga-yoga",
    verseCount: 28,
    theme: "How faith, food, sacrifice, austerity, and charity are shaped by the three gunas.",
    summary:
      "Krishna explains that faith differs according to one's nature — sattvic, rajasic, or tamasic. He describes the threefold nature of food, sacrifice, austerity (of body, speech, and mind), and charity, showing how each reflects the inner quality of the doer.",
    verses: [
      {
        id: "17.3",
        chapter: 17,
        verse: 3,
        sanskrit: "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत।\nश्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः॥",
        transliteration:
          "sattvānurūpā sarvasya śraddhā bhavati bhārata\n śraddhāmayo'yaṃ puruṣo yo yacchraddhaḥ sa eva saḥ",
        english:
          "Faith conforms to one's inner nature, O Bharata. This person is made of faith; whatever one's faith, that one truly is.",
        meaning:
          "We become what we deeply believe. Faith is not mere belief but the orientation of our whole being — and it shapes our destiny.",
      },
      {
        id: "17.5",
        chapter: 17,
        verse: 5,
        sanskrit: "अशास्त्रविहितं घोरं तप्यन्ते ये तपो जनाः।\nदम्भाहङ्कारसंयुक्ताः कामरागबलान्विताः॥",
        transliteration:
          "aśāstravihitaṃ ghoraṃ tapyante ye tapo janāḥ\n dambhāhaṅkārasaṃyuktāḥ kāmarāgabalānvitāḥ",
        english:
          "Those who practice severe austerities not ordained by scripture, hypocritical and egoistic, driven by lust and attachment —",
      },
      {
        id: "17.15",
        chapter: 17,
        verse: 15,
        sanskrit: "अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्।\nस्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते॥",
        transliteration:
          "anudvegakaraṃ vākyaṃ satyaṃ priyahitaṃ ca yat\n svādhyāyābhyasanaṃ caiva vāṅmayaṃ tapa ucyate",
        english:
          "Speech that causes no distress, that is truthful, pleasing, and beneficial, and the practice of studying scriptures — this is called austerity of speech.",
        meaning:
          "Three conditions for right speech: true, kind, helpful. Words that meet all three are spiritual practice. Silence and scripture study deepen this austerity.",
      },
      {
        id: "17.20",
        chapter: 17,
        verse: 20,
        sanskrit: "दातव्यमिति यद्दानं दीयतेऽनुपकारिणे।\nदेशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम्॥",
        transliteration:
          "dātavyamiti yaddānaṃ dīyate'nupakāriṇe\n deśe kāle ca pātre ca taddānaṃ sāttvikaṃ smṛtam",
        english:
          "Charity given with the thought 'it is to be given,' to one who can offer no return, at the right place, time, and to a worthy person — that charity is considered sattvic.",
      },
      {
        id: "17.28",
        chapter: 17,
        verse: 28,
        sanskrit: "अश्रद्धया हुतं दत्तं तपस्तप्तं कृतं च यत्।\nअसदित्युच्यते पार्थ न च तत्प्रेत्य नो इह॥",
        transliteration:
          "aśraddhayā hutaṃ dattaṃ tapastaptaṃ kṛtaṃ ca yat\n asadityucyate pārtha na ca tatpretya no iha",
        english:
          "Whatever is offered, given, performed, or practiced without faith — that is called 'asat' (unreal), O Partha. It is of no benefit here or hereafter.",
        meaning:
          "Faith (shraddha) is the soul of all spiritual practice. Without it, even elaborate rituals are empty — they bear no fruit either in this world or the next.",
      },
    ],
  },
  {
    number: 18,
    name: "Moksha Sannyasa Yoga — Liberation and Renunciation",
    sanskritName: "मोक्षसंन्यासयोग",
    transliteration: "Mokṣa-sannyāsa-yoga",
    verseCount: 78,
    theme: "The grand conclusion — renunciation, the role of the gunas, and final surrender.",
    summary:
      "The longest chapter. Krishna distinguishes true renunciation (sannyasa) from mere abandonment of action. He summarizes the entire teaching, reiterates the paths according to one's nature, and concludes with the promise that one who surrenders fully to Him is liberated.",
    verses: [
      {
        id: "18.1",
        chapter: 18,
        verse: 1,
        sanskrit: "अर्जुन उवाच।\nसंन्यासस्य महाबाहो तत्त्वमिच्छामि वेदितुम्।\nत्यागस्य च हृषीकेश पृथक्केशिनिषूदन॥",
        transliteration:
          "arjuna uvāca\n saṃnyāsasya mahābāho tattvamicchāmi veditum\n tyāgasya ca hṛṣīkeśa pṛthakkeśiniṣūdana",
        english:
          "Arjuna said: O mighty-armed Krishna, I wish to know the truth of renunciation (sannyasa) and of letting go (tyaga), O Hrishikesha, O slayer of Keshi.",
      },
      {
        id: "18.6",
        chapter: 18,
        verse: 6,
        sanskrit: "एतान्यपि तु कर्माणि सङ्गं त्यक्त्वा फलानि च।\nकर्तव्यानीति मे पार्थ निश्चितं मतमुत्तमम्॥",
        transliteration:
          "etānyapi tu karmāṇi saṅgaṃ tyaktvā phalāni ca\n kartavyānīti me pārtha niścitaṃ matamuttamam",
        english:
          "But these actions — sacrifice, charity, austerity — must be performed, abandoning attachment and fruits. This is my considered supreme view, O Partha.",
        meaning:
          "Krishna does not teach abandonment of duty, but abandonment of attachment and craving for results. Even obligatory actions should be performed without ego-attachment.",
      },
      {
        id: "18.61",
        chapter: 18,
        verse: 61,
        sanskrit: "ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति।\nभ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया॥",
        transliteration:
          "īśvaraḥ sarvabhūtānāṃ hṛddeśe'rjuna tiṣṭhati\n bhrāmayan sarvabhūtāni yantrārūḍhāni māyayā",
        english:
          "The Lord dwells in the hearts of all beings, O Arjuna, and by His maya causes all beings to revolve as if mounted on a machine.",
        meaning:
          "The Divine is the inner witness in every heart — the silent puppeteer behind the play of life. Yet this is not determinism: the next verse offers the path of freedom.",
      },
      {
        id: "18.62",
        chapter: 18,
        verse: 62,
        sanskrit: "तमेव शरणं गच्छ सर्वभावेन भारत।\nतत्प्रसादात्परां शान्तिं स्थानं प्राप्स्यसि शाश्वतम्॥",
        transliteration:
          "tameva śaraṇaṃ gaccha sarvabhāvena bhārata\n tatprasādātparāṃ śāntiṃ sthānaṃ prāpsyasi śāśvatam",
        english:
          "Take refuge in Him alone with your whole being, O Bharata. By His grace, you shall attain supreme peace and the eternal abode.",
      },
      {
        id: "18.65",
        chapter: 18,
        verse: 65,
        sanskrit: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।\nमामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे॥",
        transliteration:
          "manmanā bhava madbhakto madyājī māṃ namaskuru\n māmevaiṣyasi satyaṃ te pratijāne priyo'si me",
        english:
          "Fix your mind on Me, be devoted to Me, sacrifice to Me, bow down to Me. You shall come to Me alone — this I truly promise you, for you are dear to Me.",
      },
      {
        id: "18.66",
        chapter: 18,
        verse: 66,
        sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्ष्यिष्यामि मा शुचः॥",
        transliteration:
          "sarvadharmānparityajya māmekaṃ śaraṇaṃ vraja\n ahaṃ tvā sarvapāpebhyo mokṣyiṣyāmi mā śucaḥ",
        english:
          "Abandoning all duties, take refuge in Me alone. I shall liberate you from all sins; do not grieve.",
        meaning:
          "The Charama Shloka — the crown jewel of the Gita. Complete surrender (prapatti) to the Divine is the ultimate path. Whatever one's past, full surrender grants liberation. This is the heart of the Gita's message.",
      },
      {
        id: "18.67",
        chapter: 18,
        verse: 67,
        sanskrit: "इदं ते नातपस्काय नाभक्ताय कदाचन।\nन चाशुश्रूषवे वाच्यं न च मां योऽभ्यसूयति॥",
        transliteration:
          "idaṃ te nātapaskāya nābhaktāya kadācana\n na cāśuśrūṣave vācyaṃ na ca māṃ yo'bhyasūyati",
        english:
          "This sacred teaching must never be shared with one who lacks austerity, nor with one who is without devotion, nor with one who is unwilling to hear, nor with one who finds fault with Me.",
        meaning:
          "Sacred knowledge requires a worthy vessel. The Gita is not for the casual, the cynical, or the irreverent — it must be received with reverence.",
      },
      {
        id: "18.78",
        chapter: 18,
        verse: 78,
        sanskrit: "यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥",
        transliteration:
          "yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanurdharaḥ\n tatra śrīrvijayo bhūtirdhruvā nītirmatirmama",
        english:
          "Where there is Krishna, the Lord of yoga, and where there is Arjuna, the wielder of the bow — there shall be prosperity, victory, glory, and unerring righteousness. Such is my conviction.",
        meaning:
          "The closing verse of the Gita — Sanjaya's vision. Wherever the Divine (Krishna) and the devoted soul (Arjuna) are united, there is certain victory, prosperity, and dharma. This is the secret of all success.",
      },
    ],
  },
];

// Helper functions
export const getChapter = (num: number): Chapter | undefined =>
  gitaChapters.find((c) => c.number === num);

export const getVerse = (id: string): Verse | undefined => {
  for (const ch of gitaChapters) {
    const v = ch.verses.find((v) => v.id === id);
    if (v) return v;
  }
  return undefined;
};

export const allVerses: Verse[] = gitaChapters.flatMap((c) => c.verses);

export const totalVerseCount = gitaChapters.reduce(
  (sum, c) => sum + c.verseCount,
  0,
); // 700

export const findVersesByKeyword = (keyword: string): Verse[] => {
  const kw = keyword.toLowerCase().trim();
  if (!kw) return [];
  return allVerses.filter(
    (v) =>
      v.english.toLowerCase().includes(kw) ||
      v.transliteration.toLowerCase().includes(kw) ||
      (v.meaning ?? "").toLowerCase().includes(kw),
  );
};

// Topics → verse id mapping (for keyword search shortcuts)
export const topicIndex: { topic: string; verseIds: string[]; description: string }[] = [
  {
    topic: "Karma Yoga",
    verseIds: ["2.47", "2.48", "3.19", "3.5", "4.37"],
    description: "The yoga of selfless action — doing one's duty without attachment to results.",
  },
  {
    topic: "Duty (Dharma)",
    verseIds: ["3.35", "2.31", "18.6"],
    description: "One's sacred duty according to one's nature; better to fail in one's own dharma than succeed in another's.",
  },
  {
    topic: "Fear",
    verseIds: ["2.20", "2.22", "11.32", "18.66"],
    description: "The soul is eternal; nothing can truly be lost. Surrender to the Divine dissolves all fear.",
  },
  {
    topic: "Anger",
    verseIds: ["2.62", "2.63", "16.21", "3.37"],
    description: "Anger arises from frustrated desire and clouds discrimination — the gateway to delusion and ruin.",
  },
  {
    topic: "Discipline",
    verseIds: ["6.5", "6.6", "6.16", "6.17", "6.35", "2.66"],
    description: "Self-mastery is the foundation of all higher life. The mind must be trained through practice and detachment.",
  },
  {
    topic: "Meditation",
    verseIds: ["6.10", "6.11", "6.12", "6.13", "6.14", "6.35"],
    description: "Dhyana yoga — the systematic practice of withdrawing the mind and resting it in the Self.",
  },
  {
    topic: "Bhakti (Devotion)",
    verseIds: ["9.22", "9.26", "9.34", "12.8", "12.13", "12.14", "18.65", "18.66"],
    description: "Undivided love for the Divine is the sweetest path to liberation. God accepts even a leaf offered with devotion.",
  },
  {
    topic: "Knowledge (Jnana)",
    verseIds: ["4.34", "4.37", "4.38", "4.39", "13.8", "13.9"],
    description: "Self-knowledge burns away karma like fire consumes fuel; nothing is as purifying as wisdom.",
  },
  {
    topic: "Surrender",
    verseIds: ["18.66", "18.62", "18.65", "7.19", "9.22"],
    description: "Prapatti — total surrender to the Divine — is the ultimate shortcut to liberation. God takes responsibility for the one who takes refuge.",
  },
  {
    topic: "Stress & Anxiety",
    verseIds: ["2.14", "2.15", "2.47", "2.48", "18.66"],
    description: "Equanimity in success and failure; surrender of outcomes to the Divine dissolves anxiety.",
  },
  {
    topic: "Consistency",
    verseIds: ["6.16", "6.17", "2.48", "4.38"],
    description: "Moderation and steady practice lead to mastery. Equanimity sustained over time ripens into wisdom.",
  },
  {
    topic: "Procrastination",
    verseIds: ["3.5", "2.47", "18.6"],
    description: "Inaction is impossible and not a path. Perform your prescribed duty now, without attachment.",
  },
];
