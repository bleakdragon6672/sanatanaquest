// Auto-generated complete Upanishads data file
// Sources: sanskritdocuments.org, wisdomlib.org
// Isha (18) + Katha (119) + Mandukya (12) + Kena (35) + Aitareya (33) + Prashna (67) + Mundaka (64) + Taittiriya (40) = 388 verses


// Isha Upanishad (Īśāvāsya Upaniṣad) — 18 verses
// Katha Upanishad (Kaṭha Upaniṣad) — 119 verses
// Mandukya Upanishad (Māṇḍūkya Upaniṣad) — 12 verses

// Sanskrit: standard Devanagari text.
// Transliteration: IAST (International Alphabet of Sanskrit Transliteration).
// English: clear modern rendering based on standard translations.
// Commentary: detailed verse-by-verse commentary.

export interface UpanishadVerse {
  id: string
  sanskrit: string
  transliteration: string
  english: string
  commentary?: string
}

export interface Section {
  id: string
  name: string
  sanskritName: string
  verses: UpanishadVerse[]
}

export interface Upanishad {
  id: string
  name: string
  sanskritName: string
  transliteration: string
  summary: string
  theme: string
  verseCount: number
  sections: Section[]
  verses: UpanishadVerse[]
}

export const ishaUpanishad: Upanishad = {
  id: 'isha',
  name: `Isha Upanishad`,
  sanskritName: `ईशावास्य उपनिषद्`,
  transliteration: `Īśāvāsya Upaniṣad`,
  summary: `The Isha Upanishad, the shortest of the principal Upanishads, teaches the integration of knowledge and action. It reveals that the Lord pervades all existence, and that one should enjoy the world through renunciation, not grasping.`,
  theme: `The pervasiveness of the Divine, Karma Yoga, and the unity of knowledge and action.`,
  verseCount: 18,
  sections: [
  ],
  verses: [
    { id: `isha.0.1`, sanskrit: `ईशावास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।
तेन त्यक्तेन भुञ्जीथा मा गृधः कस्य स्विद्धनम् ॥१॥`, transliteration: `īśāvāsyam idaṁ sarvaṁ yat kiñca jagatyāṁ jagat |
tena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam ||1||`, english: `All this — whatever moves in this moving world — is pervaded by the Lord. Enjoy through renunciation. Do not covet the wealth of anyone.`, commentary: `This opening verse of the Isha Upanishad sets the tone for the entire teaching. The word "Isha" means the Lord, the Supreme Reality that pervades all existence. The verse declares that everything in this universe — every animate and inanimate thing — is covered by the divine presence, like a garment that completely wraps the body.

The instruction "enjoy through renunciation" (tena tyaktena bhuñjīthā) is one of the most profound paradoxes in Vedantic philosophy. It does not ask us to abandon the world but to enjoy it with the awareness that nothing truly belongs to us. When we recognize that everything is the Lord's, we stop grasping and start receiving life as a gift.

"Do not covet the wealth of anyone" (mā gṛdhaḥ kasya svid dhanam) — this is not merely a moral commandment but a pointer to the nature of the Self. When we realize that the one Self dwells in all beings, the very impulse to covet dissolves. Who would covet their own hand?

Practically, this verse invites us to live in the world with open hands — engaged fully, yet attached to nothing. It is the foundation of Karma Yoga as taught in the Bhagavad Gita: act without attachment to results.` },
    { id: `isha.0.2`, sanskrit: `कुर्वन्नेवेह कर्माणि जिजीविषेच्छतं समाः ।
एवं त्वयि नान्यथेतोऽस्ति न कर्म लिप्यते नरे ॥२॥`, transliteration: `kurvann eveha karmāṇi jijīviṣec chataṁ samāḥ |
evaṁ tvayi nānyatheto 'sti na karma lipyate nare ||2||`, english: `One should desire to live a hundred years while performing karma here on earth. Thus it is for you — not otherwise. Karma does not cling to such a person.`, commentary: `This verse directly addresses the question: should one renounce action and retreat from the world? The Upanishad's answer is a clear "no." One should wish to live a full life — even a hundred years — while performing one's duties.

The key phrase is "na karma lipyate" — karma does not cling to such a person. This is the same teaching Krishna later gives Arjuna in the Gita: act without attachment to the fruits of action. The person who performs action as an offering, without personal desire for reward, remains untouched by karma.

This verse counters the misconception that spirituality means withdrawal from life. The Upanishad teaches that the highest spiritual realization is lived right here, in the midst of daily activity. A sage does not escape the world — the sage transcends the ego while fully engaged in it.

The phrase "jijīviṣec chataṁ samāḥ" — "should desire to live a hundred years" — is remarkable. It affirms the value of a long, full life lived with awareness, rather than a life of mere survival or passive renunciation.` },
    { id: `isha.0.3`, sanskrit: `असुर्या नाम ते लोका अन्धेन तमसाऽऽवृताः ।
तांस्ते प्रेत्याभिगच्छन्ति ये के चात्महनो जनाः ॥३॥`, transliteration: `asuryā nāma te lokā andhena tamasāvṛtāḥ |
tāṁs te pretyābhigacchanti ye ke cātma-hano janāḥ ||3||`, english: `Sunless are those worlds, covered by blinding darkness, to which those who are slayers of the Self go after death.`, commentary: `This verse introduces a stark warning. The "asurya" worlds — literally "sunless realms" — are described as enshrouded in deep darkness. These are not necessarily external hells but represent states of consciousness that result from living in ignorance of one's true nature.

"Atma-hanah" — "slayers of the Self" — is a striking term. Who kills the Self? Not those who commit physical violence, but those who live in complete ignorance of their divine nature. Every moment spent in identification with the body-mind, ignoring the indwelling Spirit, is a kind of spiritual self-destruction.

The verse implies that our choices in this life directly shape our experience after death. Those who live without awareness of the divine presence described in verse 1 — who grasp, covet, and identify solely with the material — enter states of darkness.

This is not meant as a threat but as a compassionate warning, like a parent cautioning a child about the consequences of reckless behavior. The Upanishad's tone is educational, not punitive. It simply states the natural law: ignorance leads to suffering, and awareness leads to light.` },
    { id: `isha.0.4`, sanskrit: `अनेजदेकं मनसो जवीयो नैनद्देवा आप्नुवन् पूर्वमर्षत् ।
तद्धावतोऽन्यानत्येति तिष्ठत् तस्मिन्नापो मातरिश्वा दधाति ॥४॥`, transliteration: `anejad ekaṁ manaso javīyo nainad devā āpnuvan pūrvam arṣat |
tad dhāvato 'nyān atyeti tiṣṭhat tasminn āpo mātariśvā dadhāti ||4||`, english: `It is unmoving, one, swifter than the mind. The senses cannot reach it, for it is always ahead. Though standing still, it overtakes those who run. In it, the life-breath supports all activities.`, commentary: `This verse describes the paradoxical nature of the Self (Atman). It is "unmoving" (anejad) yet "swifter than the mind" (manaso javīyah). How can something that does not move outpace the swiftest thought?

The answer lies in the nature of consciousness itself. The Self does not travel from place to place because it is already everywhere. Mind moves; the Self simply is. Because it is already present at every point, it is faster than anything that must travel to get there.

"The senses cannot reach it" — the Self is the witness of the senses, not their object. You cannot see awareness with the eyes, just as a knife cannot cut itself, and an eye cannot see itself.

"Though standing still, it overtakes those who run" — even the fastest runner cannot outrun the consciousness that is already there at the finish line. The Self pervades all motion while remaining utterly still.

"In it, the life-breath supports all activities" — prana, the vital energy, functions within the field of the Self. All life, all movement, all activity is sustained by this silent, unmoving presence. This is the great mystery: the source of all dynamism is absolute stillness.` },
    { id: `isha.0.5`, sanskrit: `तदेजति तन्नैजति तद्दूरे तद्वन्तिके ।
तदन्तरस्य सर्वस्य तदु सर्वस्यास्य बाह्यतः ॥५॥`, transliteration: `tad ejati tan naijati tad dūre tad v antike |
tad antar asya sarvasya tad u sarvasyāsya bāhyataḥ ||5||`, english: `It moves and it does not move. It is far and it is near. It is within all this and it is also outside all this.`, commentary: `This verse continues the paradoxical description of the Self. Each statement contains a seeming contradiction that points beyond ordinary understanding.

"It moves and it does not move" — from the perspective of the body and the world, everything is in constant motion. But the awareness that witnesses all this motion is itself motionless. Like the sky that appears to move when seen from a speeding train, the Self appears to move when identified with the body, but is actually still.

"It is far and it is near" — for the person caught in ignorance, the Self seems impossibly distant, something to be attained after lifetimes of effort. But for the one who recognizes it, it is the nearest of the near — closer than breath, closer than thought. It is the very consciousness with which you read these words.

"It is within all this and it is also outside all this" — the Self is not limited to the interior of things, nor is it only in some transcendent realm beyond. It is both immanent and transcendent simultaneously. This is the teaching of Advaita (non-duality): there is no place where the Self is not.

This verse dissolves the ordinary categories of space — inside/outside, near/far — pointing to a reality that transcends spatial limitation entirely.` },
    { id: `isha.0.6`, sanskrit: `यस्तु सर्वाणि भूतान्यात्मन्येवानुपश्यति ।
सर्वभूतेषु चात्मानं ततो न विजुगुप्सते ॥६॥`, transliteration: `yas tu sarvāṇi bhūtāny ātmany evānupaśyati |
sarva-bhūteṣu cātmānaṁ tato na vijugupsate ||6||`, english: `But the one who sees all beings in the Self, and the Self in all beings — such a person does not hate anyone.`, commentary: `This is one of the most beautiful and practical verses in the Upanishads. It offers a simple test for self-realization: does the person who claims enlightenment feel hatred or revulsion toward any being?

The vision described here is not merely intellectual. It is a direct perception (anupaśyati — "sees") that all beings exist within the Self, and the Self exists within all beings. This is like recognizing that all waves exist within the ocean, and the ocean exists within all waves.

When this perception becomes constant and natural, hatred becomes impossible. You cannot hate yourself, and if you see yourself in everyone, hatred has no ground to stand on. This does not mean accepting harmful behavior — it means recognizing the same divine essence in all, even while responding appropriately to actions.

The practical application is profound: whenever you feel aversion, contempt, or hatred toward another person, pause and ask, "Is the same awareness that looks out through my eyes not also looking out through theirs?" This simple inquiry, practiced sincerely, gradually dissolves the barriers between self and other.` },
    { id: `isha.0.7`, sanskrit: `यस्मिन्सर्वाणि भूतान्यात्मैवाभूद्विजानतः ।
तत्र को मोहः कः शोक एकत्वमनुपश्यतः ॥७॥`, transliteration: `yasmin sarvāṇi bhūtāny ātmaivābhūd vijānataḥ |
tatra ko mohaḥ kaḥ śoka ekatvam anupaśyataḥ ||7||`, english: `When all beings have become one's own Self, what delusion and what sorrow can there be for the one who perceives this unity?`, commentary: `This verse takes the teaching of the previous verse even deeper. Verse 6 described seeing the Self in all beings; verse 7 describes the state where all beings literally become the Self. This is not a metaphor but a description of the highest realization.

"Yasmin sarvāṇi bhūtāny ātmaivābhūt" — "in whom all beings have become the Self itself." In this state, the boundaries between "me" and "not me" have completely dissolved. There is only one Self appearing as many.

The natural consequence is stated as two questions: "What delusion? What sorrow?" These are rhetorical — the answer is "none." Delusion (moha) comes from seeing difference where there is unity. Sorrow (śoka) comes from losing what we think is separate from us. When unity is perceived, both causes are removed.

This is the state the Upanishads call "ekatvam" — oneness. It is not a belief or philosophy but a lived experience. The sage who sees this unity lives in permanent peace, because there is nothing to lose and nothing to gain — there is only the one Self, playing all roles, wearing all faces.

Practically, this verse suggests that our sorrow is proportional to our sense of separation. The more we feel isolated, the more we suffer. The path to freedom is the recognition of our shared being.` },
    { id: `isha.0.8`, sanskrit: `स पर्यगाच्छुक्रमकायमव्रणमस्नाविरं शुद्धमपापविद्धम् ।
कविर्मनीषी परिभूः स्वयम्भूर्याथातथ्यतोऽर्थान् व्यदधाच्छाश्वतीभ्यः समाभ्यः ॥८॥`, transliteration: `sa paryagāc chukram akāyam avraṇam asnāviraṁ śuddham apāpaviddham |
kavir manīṣī paribhūḥ svayambhūr yāthātathyato 'rthān vyadadhāc chāśvatībhyaḥ samābhyah ||8||`, english: `He pervades all — bright, bodiless, without scar, without sinews, pure, untouched by evil. He is the seer, the thinker, the one who is everywhere, self-existent. He has duly ordered the eternal values for the eternal years.`, commentary: `This verse is a comprehensive description of the nature of the Self or the Lord (Isha). It uses a series of negations and affirmations to point to a reality that transcends all ordinary categories.

"Bright" (śukram) — the Self is pure luminosity, the light of consciousness itself. "Bodiless" (akāyam) — it has no physical form, no shape that can be grasped. "Without scar" (avraṇam) — it has never been wounded, never been damaged. "Without sinews" (asnāviram) — it has no connective tissue, no physical structure whatsoever. "Pure" (śuddham) — untouched by any contamination. "Untouched by evil" (apāpaviddham) — no sin has ever touched it.

These negations clear away all physical and moral limitations. Then come the affirmations: "He is the seer" (kavir) — the ultimate knower. "The thinker" (manīsī) — the source of all intelligence. "The one who is everywhere" (paribhūḥ) — omnipresent. "Self-existent" (svayambhūḥ) — existing by its own nature, dependent on nothing.

"He has duly ordered the eternal values for the eternal years" — the cosmic order (rita) that governs the universe has been established by this Self. The seasons, the laws of nature, the moral order — all are expressions of this one reality's intelligence.` },
    { id: `isha.0.9`, sanskrit: `अन्धं तमः प्रविशन्ति येऽविद्यामुपासते ।
ततो भूय इव ते तमो य उ विद्यायां रताः ॥९॥`, transliteration: `andhaṁ tamaḥ praviśanti ye 'vidyām upāsate |
tato bhūya iva te tamo ya u vidyāyāṁ ratāḥ ||9||`, english: `Into blinding darkness enter those who worship ignorance. Into even greater darkness, as it were, enter those who delight in mere knowledge alone.`, commentary: `This verse presents a startling teaching: both ignorance AND mere intellectual knowledge lead to darkness. This is one of the most challenging verses in the Isha Upanishad.

Those who worship avidya (ignorance) — who live without any spiritual inquiry, completely absorbed in material pursuits — enter "blinding darkness." This is understandable. But the verse goes further: those who delight only in vidya (knowledge, learning) enter "even greater darkness."

How can knowledge lead to greater darkness than ignorance? The Upanishad is distinguishing between information and realization. Book learning, intellectual understanding, even mastery of scriptures — all of these can become obstacles if they inflate the ego rather than dissolve it. The scholar who knows everything about God but has no direct experience is in a subtler trap than the simple person who at least acknowledges their ignorance.

This verse warns against two extremes: anti-intellectualism and intellectualism. The true path transcends both — it is the direct seeing that comes from inner silence, not from accumulated learning. The Upanishad will clarify in the next two verses what vidya and avidya truly mean.` },
    { id: `isha.0.10`, sanskrit: `अन्यदेवाहुर्विद्ययाऽन्यदाहुरविद्यया ।
इति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे ॥१०॥`, transliteration: `anyad evāhur vidyayā 'nyad āhur avidyayā |
iti śuśruma dhīrāṇāṁ ye nas tad vicacakṣire ||10||`, english: `They say that knowledge is one thing and ignorance is another. So have we heard from the wise who have explained this to us.`, commentary: `This verse acknowledges a distinction between vidya and avidya — but the distinction is not what we might expect. The verse references the teaching of the "dhira" — the wise, the steadfast ones who have directly realized the truth.

The word "anyad" (one... another) indicates that the fruits of vidya and avidya are different — they are not the same path leading to the same result. The previous verse showed that both can lead to darkness if misunderstood. This verse begins to clarify that when properly understood, each has its own value and proper place.

The phrase "iti śuśruma" — "so have we heard" — reflects the humble stance of the Upanishadic tradition. Even the sages who teach these truths received them from their teachers. Truth is transmitted through a living lineage, not merely through books.

The Upanishad is building toward a synthesis: both knowledge and action, both contemplation and engagement, have their place. The problem arises only when one is pursued to the exclusion of the other. The next two verses will explain what kind of vidya and avidya lead to liberation.` },
    { id: `isha.0.11`, sanskrit: `विद्यां चाविद्यां च यस्तद्वेदोभयं सह ।
अविद्यया मृत्युं तीर्त्वा विद्ययाऽमृतमश्नुते ॥११॥`, transliteration: `vidyāṁ cāvidyāṁ ca yas tad veda ubhayaṁ saha |
avidyayā mṛtyuṁ tīrtvā vidyayāmṛtam aśnute ||11||`, english: `The one who knows both vidya and avidya together — by avidya crossing over death, and by vidya attaining immortality.`, commentary: `This verse resolves the tension created by the previous two. The secret is not to choose between knowledge and ignorance, action and contemplation, but to understand both and apply each in its proper domain.

"Avidyaya mṛtyuṁ tīrtvā" — "by avidya crossing over death." Here avidya means ritual action, karma, engagement with the world of form. Through proper action — performing one's duties, engaging with the world skillfully and selflessly — one "crosses over death," meaning one lives a full, dharmic life without being bound by karma.

"Vidyayāmṛtam aśnute" — "by vidya attaining immortality." Here vidya means the knowledge of the Self, the direct realization of one's true nature. Through this knowledge, one attains amrita — the deathless state, the immortal Self.

The key word is "saha" — "together." Neither alone is sufficient. Action without wisdom leads to bondage. Wisdom without action is incomplete. The truly liberated person lives in both simultaneously — fully engaged in the world, fully established in the knowledge of the Self.

This is the synthesis that the Bhagavad Gita later elaborates in great detail: Karma Yoga and Jnana Yoga working together.` },
    { id: `isha.0.12`, sanskrit: `अन्धं तमः प्रविशन्ति येऽसम्भूतिमुपासते ।
ततो भूय इव ते तमो य उ सम्भूत्यां रताः ॥१२॥`, transliteration: `andhaṁ tamaḥ praviśanti ye 'sambhūtim upāsate |
tato bhūya iva te tamo ya u sambhūtyāṁ ratāḥ ||12||`, english: `Into blinding darkness enter those who worship the unmanifest. Into even greater darkness enter those who delight in the manifest alone.`, commentary: `This verse parallels verse 9 but uses different terms: asambhuti (the unmanifest, the cause) and sambhuti (the manifest, the effect). Those who worship only the formless, transcendent aspect of reality enter darkness, and those who worship only the manifest, material aspect enter even greater darkness.

The teaching is the same principle: exclusivity leads to darkness. If you only meditate on the formless and deny the world, you miss half of reality. If you only engage with the material world and deny the spiritual, you miss the other half.

"Asambhuti" refers to the unmanifest cause — pure consciousness, the formless Brahman. "Sambhuti" refers to the manifest creation — the world of names and forms. Both are real expressions of the one Self. To worship one while denying the other is like admiring the clay while despising the pot, or loving the pot while forgetting the clay.

The Upanishad consistently teaches integration, not exclusion. The whole universe is pervaded by the Lord (verse 1). To see the Lord only in temples, or only in nature, or only in the formless void — each is a partial vision. The complete vision sees the Lord everywhere, in every form and beyond all form.` },
    { id: `isha.0.13`, sanskrit: `अन्यदेवाहुः सम्भवादन्यदाहुरसम्भवात् ।
इति शुश्रुम धीराणां ये नस्तद्विचचक्षिरे ॥१३॥`, transliteration: `anyad evāhuḥ sambhavād anyad āhur asambhavāt |
iti śuśruma dhīrāṇāṁ ye nas tad vicacakṣire ||13||`, english: `They say that the result of worshipping the manifest is one thing, and the result of worshipping the unmanifest is another. So have we heard from the wise who explained this to us.`, commentary: `This verse, like verse 10, acknowledges the distinction taught by the sages. The fruits of worshipping the manifest (sambhuti) and the unmanifest (asambhuti) are indeed different — each leads to a different kind of experience and realization.

The unmanifest meditation leads to transcendence, to the formless absolute. The manifest meditation leads to mastery within creation, to power and enjoyment. Neither alone constitutes the complete path.

The phrase "iti śuśruma dhīrāṇām" appears again — "so have we heard from the wise." The Upanishads emphasize that this teaching comes not from speculation but from the direct experience of realized masters. The student's role is to receive, contemplate, and realize for themselves.

This verse prepares the ground for the synthesis in the next verse, which will reveal the fruits of combining both forms of worship — the integral path that honors both the manifest and unmanifest aspects of the one Reality.` },
    { id: `isha.0.14`, sanskrit: `सम्भूतिं च विनाशं च यस्तद्वेदोभयं सह ।
विनाशेन मृत्युं तीर्त्वा सम्भूत्याऽमृतमश्नुते ॥१४॥`, transliteration: `sambhūtiṁ ca vināśaṁ ca yas tad veda ubhayaṁ saha |
vināśena mṛtyuṁ tīrtvā sambhūtyāmṛtam aśnute ||14||`, english: `The one who knows both the manifest and the unmanifest together — by the unmanifest crossing over death, and by the manifest attaining immortality.`, commentary: `This is the synthesis verse, parallel to verse 11. It completes the teaching begun in verse 12. "Sambhuti" (manifest) and "vinasha" (unmanifest/destructible) must be known together — saha — simultaneously.

"By the unmanifest crossing over death" — through understanding the imperishable, formless reality that underlies all change, one transcends the fear of death. Death applies to forms, not to the formless consciousness that animates all forms.

"By the manifest attaining immortality" — through proper engagement with the manifest world — through karma yoga, service, dharmic action — one prepares the mind and heart for the realization of immortality. Action purifies; knowledge liberates.

This verse teaches the integral path. Do not reject the world in favor of the Absolute. Do not reject the Absolute in favor of the world. See both, know both, live in both. This is the full teaching of the Vedas — neither pure renunciation nor pure engagement, but the wisdom that sees the Absolute IN the world and the world AS the Absolute.

This is the foundation of Vedantic living: be in the world, but know you are not of it. Be beyond the world, but never abandon it.` },
    { id: `isha.0.15`, sanskrit: `हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् ।
तत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये ॥१५॥`, transliteration: `hiraṇmayena pātreṇa satyasyāpihitaṁ mukham |
tat tvaṁ pūṣann apāvṛṇu satya-dharmāya dṛṣṭaye ||15||`, english: `The face of Truth is covered by a golden vessel. O Sun, remove that covering for the one whose dharma is truth, so that they may see.`, commentary: `This is one of the most celebrated verses in the Upanishads, often chanted at the beginning of spiritual study. It uses a breathtaking image: Truth is like a face hidden behind a golden lid.

"Golden vessel" (hiraṇmayena pātreṇa) — the golden lid represents the beautiful, glittering world of appearances. The material world is not ugly or evil — it is golden, attractive, dazzling. But it is precisely this beauty that conceals the deeper truth. We become so enchanted by the world's golden surface that we never look beneath it.

"O Pusan" (pūṣan) — this is an address to the Sun, the cosmic nourisher, the illuminator. The prayer is: "Please remove this golden covering so that I may see the truth."

"Satya-dharmāya dṛṣṭaye" — "for the one whose dharma is truth, for the sake of seeing." This is a qualification: the covering lifts for those who have made truth their fundamental commitment. Not partial truth, not convenient truth, but truth as the very foundation of one's life.

This verse is traditionally recited before the study of the Upanishads, as a prayer to remove the veil of ignorance and reveal the inner truth of the teachings.` },
    { id: `isha.0.16`, sanskrit: `पूषन्नेकर्षे यम सूर्य प्राजापत्य व्यूह रश्मीन् समूह ।
ते जो रूपं कल्याणतमं तत्ते पश्यामि योऽसावसौ पुरुषः सोऽहमस्मि ॥१६॥`, transliteration: `pūṣann ekarṣe yama sūrya prājāpatya vyūha raśmīn samūha |
tejo rūpaṁ kalyāṇatamaṁ tat te paśyāmi yo 'sāv asau puruṣaḥ so 'ham asmi ||16||`, english: `O Sun, solitary traveler, controller, son of the Creator — gather your rays, withdraw your light. I see your most auspicious form. That person who is there — I am that.`, commentary: `This verse contains one of the most powerful declarations in all of Indian philosophy: "so 'ham asmi" — "I am That." These three words encapsulate the entire teaching of the Upanishads.

The verse addresses the Sun with multiple names: "ekarṣe" (the one seer), "yama" (the controller), "sūrya" (the sun), "prājāpatya" (child of Prajapati, the Creator). Each name reveals a different aspect of the divine light.

"Gather your rays, withdraw your light" — this is a prayer for the brilliance of the external world to be drawn inward, so that the seeker can see the inner light. It is like asking the sun to set so that the stars become visible. When the dazzle of external perception subsides, the light of the Self shines forth.

"I see your most auspicious form" — the golden lid has been removed. The seeker now sees the truth behind the appearance.

"That person who is there — I am That" — the final recognition. The Purusha (cosmic person, the Self) that pervades the sun, the universe, all beings — "I am that very Self." This is not a statement of ego but the dissolution of ego. The individual self recognizes itself as the universal Self. This is moksha — liberation.` },
    { id: `isha.0.17`, sanskrit: `वायुरनिलममृतमथेदं भस्मान्तं शरीरम् ।
ॐ क्रतो स्मर कृतं स्मर क्रतो स्मर कृतं स्मर ॥१७॥`, transliteration: `vāyur anilam amṛtam athedaṁ bhasmāntaṁ śarīram |
oṁ krato smara kṛtaṁ smara krato smara kṛtaṁ smara ||17||`, english: `Let my vital breath merge into the immortal, all-pervading wind. Then let this body end in ashes. O mind, remember — remember what has been done. O mind, remember — remember what has been done.`, commentary: `This verse is traditionally recited at the time of cremation in Hindu tradition. It is a prayer for the moment of death — a conscious, deliberate release of identification with the body.

"Let my vital breath merge into the immortal, all-pervading wind" — the prana (life force) that has animated this body is now released back into the cosmic prana, the immortal breath that moves through all existence. The individual breath returns to the universal breath.

"Let this body end in ashes" — a frank acceptance of the body's impermanence. The body is matter; it will return to matter. There is no grief in this statement — only clarity.

"O mind, remember — remember what has been done" — this is the crucial instruction at the moment of death. Remember your true nature. Remember the Self. Remember the teachings. At the moment of death, the quality of one's consciousness determines what happens next. The one who remembers the Self at death merges with the eternal.

The repetition ("krato smara, kṛtaṁ smara") emphasizes urgency: remember, remember, remember. This is the essence of all spiritual practice — to cultivate such constant awareness of the Self that even at the moment of death, the awareness holds.` },
    { id: `isha.0.18`, sanskrit: `अग्ने नय सुपथा राये अस्मान् विश्वानि देव वयुनानि विद्वान् ।
युयोध्यस्मज्जुहुराणमेनो भूयिष्ठां ते नम उक्तिं विधेम ॥१८॥`, transliteration: `agne naya supathā rāye asmān viśvāni deva vayunāni vidvān |
yuyodhy asmaj juhurāṇaṁ eno bhūyiṣṭhāṁ te nama uktiṁ vidhema ||18||`, english: `O Agni, lead us by the good path to prosperity. O God, you who know all our deeds, remove sin from us. We offer you many words of salutation and praise.`, commentary: `This final verse of the Isha Upanishad is a universal prayer for guidance — an appeal to Agni, the divine fire and inner guide, to lead the seeker along the right path.

"Agne naya supathā rāye asmān" — "O Fire, lead us by the good path to prosperity." The "good path" (supatha) is the path of dharma, the path of truth spoken of in verse 15. "Prosperity" (rāye) here means both material well-being and spiritual abundance.

"Viśvāni deva vayunāni vidvān" — "O God, you who know all our deeds." The divine fire is not a distant God but the inner witness who knows every thought, word, and action. There is no hiding from this inner presence.

"Yuyodhy asmaj juhurāṇaṁ eno" — "remove from us the sin that clings." This is a prayer for purification — not through punishment but through grace. The sins (enas) are the accumulated tendencies of ignorance, and the prayer is for these to be dissolved.

"Bhūyiṣṭhāṁ te nama uktiṁ vidhema" — "we offer you the most abundant words of salutation." The Upanishad ends not with a statement of knowledge but with a prayer of humility and devotion. Even the highest wisdom bows before the divine.

This verse beautifully concludes the Upanishad: after 17 verses of profound metaphysical teaching, it ends with a simple, heartfelt prayer. Knowledge and devotion are not opposites — they are the two wings of the spiritual life.

KATHA UPANISHAD (Kaṭha Upaniṣad)
============================================================

ADHYAYA 1, VALLI 1: The Story of Nachiketa` },
  ],
}

export const kathaUpanishad: Upanishad = {
  id: 'katha',
  name: `Katha Upanishad`,
  sanskritName: `कठ उपनिषद्`,
  transliteration: `Kaṭha Upaniṣad`,
  summary: `The Katha Upanishad tells the story of young Nachiketa, who confronts Death (Yama) and receives the highest spiritual teaching. It reveals the nature of the Atman, the path of meditation, and the science of liberation.`,
  theme: `The immortality of the Self, the teaching of Death, and the yogic path to liberation.`,
  verseCount: 119,
  sections: [
    {
      id: `1.1`,
      name: `The Story of Nachiketa`,
      sanskritName: `नचिकेताख्यान`,
      verses: [
        { id: `katha.1.1.1`, sanskrit: `उशन्ह वै वाजश्रवसः सर्ववेदसं ददौ ।
तस्य ह नचिकेता नाम पुत्र आस ॥१॥`, transliteration: `uśan ha vai vājaśravasaḥ sarvavedasaṁ dadau |
tasya ha naciketā nāma putra āsa ||1||`, english: `Vajashravasa, desiring reward, performed the sacrifice of giving away all his possessions. He had a son named Nachiketa.`, commentary: `The Katha Upanishad opens with a story set in ancient India. Vajashravasa — whose name means "one whose fame derives from giving food" — is performing a grand sacrifice called Vishwajit, in which a person gives away all their worldly possessions. This was a traditional Vedic practice marking the transition from worldly life to spiritual seeking.

However, something is wrong with this sacrifice. Vajashravasa is giving away only old, worn-out possessions — cows that are too old to give milk or bear calves. His generosity is calculated, not genuine. He is giving away what he no longer values, seeking spiritual merit from a hollow gesture.

His young son Nachiketa observes this with the innocent clarity of a child. The name "Nachiketa" means "one who does not lie down" — suggesting a nature that will not rest until the truth is found. This child represents the awakened spiritual impulse that sees through pretense and demands authenticity.

The Upanishad begins here because the entire teaching that follows arises from a child's honest question to his father. Sometimes the deepest wisdom comes from the simplest, most direct seeing — unclouded by the compromises and rationalizations of adult life.` },
        { id: `katha.1.1.2`, sanskrit: `तस्य ह नचिकेता श्रद्धाविवेश समाने वर्षे पितरं निनीषन्नुवाच तात कस्मै मां दास्यसीति ॥२॥`, transliteration: `tasya ha naciketā śraddhāviveśa samāne varṣe pitaraṁ ninīṣann uvāca tāta kasmai māṁ dāsyasīti ||2||`, english: `While still a boy, faith entered Nachiketa. He thought: "To whom will he give me?" He said to his father: "Father, to whom will you give me?"`, commentary: `A remarkable transformation occurs. Shraddha — deep spiritual faith — enters young Nachiketa. This is not intellectual curiosity but a profound inner awakening. The child is seized by the impulse to know, to question, to seek the ultimate truth.

Nachiketa asks his father an extraordinary question: "To whom will you give me?" If the father is truly giving away everything in this sacrifice, then his son — his most precious possession — must also be offered. The child holds the father accountable to his own stated ideal.

This question cuts through all pretense. The father wants spiritual merit from giving away things he no longer values, but he is not willing to give what truly matters. Nachiketa exposes this hypocrisy with innocent directness.

Symbolically, Nachiketa represents the soul or the higher self, and the father represents the worldly mind that performs religious rituals without genuine transformation. The soul asks the mind: "If you truly wish to be free, then surrender me — surrender your deepest self — completely to the divine. Don't just give away your leftover attachments.` },
        { id: `katha.1.1.3`, sanskrit: `तं होवाच मृत्यवे त्वा ददामीति ।
स होवाच किमस्मीत्येकमपि नाहम् अनुभवामि ॥३॥`, transliteration: `taṁ hovāca mṛtyave tvā dadāmīti |
sa hovāca kim asmy ekaṁ api nāham anubhavāmi ||3||`, english: `The father said: "I give you to Death." Nachiketa said: "What am I? I am but one among many. Of those who went before, what did they do? Of those who will come after, what will they do? Consider this and tell me."`, commentary: `In anger and frustration, the father blurts out: "I give you to Death!" — to Yama, the Lord of Death. This is spoken in rage, not wisdom. The father has no idea that his angry words will unlock the greatest spiritual teaching in Indian philosophy.

Nachiketa does not resist or protest. He accepts his father's word as binding, because in Vedic culture, a father's word was sacred. But his response reveals a remarkable equanimity. He is not terrified of Death but curious about it.

His question is profound: "What am I?" This is the fundamental spiritual inquiry. Nachiketa is not asking about what happens to the body at death — he is asking about the nature of the Self. Who am I? What is my true nature? This is the same question that Ramana Maharshi would later teach as the central practice of self-inquiry.

The father's curse becomes the son's blessing. It is often our painful experiences — our frustrations, our rejections, our moments of being "sent to Death" — that become the doorway to the deepest wisdom. Grace sometimes comes disguised as disaster.` },
        { id: `katha.1.1.4`, sanskrit: `स पितरं वरमवृणीत पुराणं वृणे वरम् ।
यदेव मन्ये स त्वं वित्त तत्त्वतः ॥४॥`, transliteration: `sa pitaraṁ varam avṛṇīta purāṇaṁ vṛṇe varam |
yad eva manye sa tvaṁ vitta tattvataḥ ||4||`, english: `Nachiketa said: I choose as my first boon that when I return from Yama's abode, my father will be peaceful and will recognize me with the same love as before.`, commentary: `Nachiketa's first request reveals his extraordinary character. Faced with Death, he does not ask for wealth, long life, or power. His first thought is for his father's well-being — that his father should be free from guilt and anger when Nachiketa returns.

This shows that the spiritual path begins with love and reconciliation. Before seeking the highest knowledge, Nachiketa ensures that his relationships are healed. The desire for his father's peace indicates a heart already purified by compassion.

"Purāṇaṁ vṛṇe" — "I choose the ancient boon." The reconciliation of parent and child is an "ancient" need, as old as humanity itself. This verse teaches that no amount of spiritual knowledge can compensate for broken relationships. The foundation of wisdom is a heart at peace with those around us.

For the seeker, this verse sets a precedent: the first step on the path is not dramatic but humble — making peace, expressing love, ensuring that our spiritual journey does not leave behind a trail of hurt and misunderstanding.` },
        { id: `katha.1.1.5`, sanskrit: `प्रथमे वरे नचिकेता यमं वव्रे |
स तुभ्यं वरं ददौ पुनरेव नचिकेताय ॥५॥`, transliteration: `prathame vare naciketā yamaṁ vavre |
sa tubhyaṁ varaṁ dadau punar eva naciketāya ||5||`, english: `Yama granted the first boon. As before, Nachiketa was with his father, whose anger had subsided and who was freed from sin.`, commentary: `Yama grants the first boon. The father's anger dissolves, and he welcomes his son back with love. This brief verse marks the completion of the first exchange between Nachiketa and Death.

The fact that Yama grants the boon immediately shows that even Death respects the love between parent and child. The cosmic order honors the bonds of the heart. Before the great philosophical teaching begins, the Upanishad establishes that love is the foundation.

With the first boon granted, Nachiketa is now free to ask his remaining two questions. Having demonstrated selflessness in his first request, he has proven himself worthy of the highest teaching. Yama will now offer him increasingly profound knowledge.

This verse also marks the transition from the story's beginning to its philosophical core. The narrative framework — a boy sent to Death, a father's remorse, a cosmic judge — all of this is the stage upon which the deepest truths about the Self will be revealed.` },
        { id: `katha.1.1.6`, sanskrit: `तमु होवाच यमः प्रियं प्रियाणाम् |
त्वमग्निं विद्वान् अमृतत्वमभजो मह्यं ॥६॥`, transliteration: `tam u hovāca yamaḥ priyaṁ priyāṇām |
tvam agniṁ vidvān amṛtatvam abhajo mahyaṁ ||6||`, english: `Yama said: "As you are dear to me, I shall give you another boon. You have seen the fire-knowledge, the path to immortality. Ask, for it was through me that this fire was known."`, commentary: `Yama, pleased with Nachiketa's selflessness, offers him a special gift: knowledge of the Nachiketa fire ritual — a sacred fire ceremony that leads to immortality. This is not merely a ritual but a symbolic teaching about the fire of knowledge that burns the bonds of ignorance.

"Tvam agniṁ vidvān" — "you, knowing the fire." The "fire" here has multiple levels of meaning. On the external level, it refers to a specific Vedic ritual. On the internal level, it refers to the fire of knowledge (jnana agni) that consumes all ignorance and leads to the deathless state.

"Amṛtatvam abhaḥ" — "you have attained immortality." This is significant: Yama himself acknowledges that Nachiketa has already achieved immortality through his selfless choice. By choosing love over fear, by choosing his father's peace over personal safety, Nachiketa has already transcended death in the deepest sense.

Yama then invites Nachiketa to ask his remaining questions. The teacher has recognized the student's worthiness. In the Upanishadic tradition, the highest knowledge is given only to those who have proven themselves through their actions, not merely their desires.` },
        { id: `katha.1.1.7`, sanskrit: `तमु होवाच यमः प्रियं प्रियाणाम् |
वृणीष्व वरान् त्रीन् एतान् तेऽभिप्रयच्छामि ॥७॥`, transliteration: `tam u hovāca yamaḥ priyaṁ priyāṇām |
vṛṇīṣva varān trīn etān te'bhiprayacchāmi ||7||`, english: `Yama said: "Choose three boons, O Nachiketa, for I shall grant them to you."`, commentary: `Yama offers three boons — one for each night Nachiketa spent at his door without food. In Vedic tradition, a guest who stays three nights without being fed earns the host three boons. This detail is significant: Nachiketa arrived at Death's house and waited without being received or fed for three nights.

The number three recurs throughout the Upanishad and Indian philosophy: three worlds, three gunas, three states of waking consciousness. Three is the number of completeness in Vedic symbolism.

Now Nachiketa will demonstrate his spiritual maturity through his choices. He has already used one boon to restore peace with his father. The remaining two boons will take him progressively deeper into the nature of reality.

The scene is set for one of the most dramatic dialogues in all spiritual literature: a young boy questioning the Lord of Death about the ultimate nature of existence. Yama, who has seen every soul pass through his domain, will now teach the one who refused to fear him.` },
        { id: `katha.1.1.8`, sanskrit: `स ऊर्ध्वं नचिकेता अवदत् |
यम ते प्रथमो वरो यथा नाम प्रियं भवेत् ॥८॥`, transliteration: `sa ūrdhvaṁ naciketā avadat |
yama te prathamo varo yathā nāma priyaṁ bhavet ||8||`, english: `Nachiketa said: "O Yama, as my first boon, let Auddalaki Aruni — my father — be free from anxiety. Let his anger toward me be pacified. Let he recognize me and speak to me lovingly when you release me."`, commentary: `Nachiketa uses his first of the three new boons to ensure his father's peace. He names his father specifically — Auddalaki Aruni, son of Uddalaka — showing that his concern is not abstract but deeply personal.

"Let his anger toward me be pacified" — the child wants his father to be free from the torment of guilt. "Let him recognize me and speak to me lovingly" — Nachiketa wants not just his father's forgiveness but his father's love. He wants to be seen and welcomed back with warmth.

This request demonstrates that the highest spiritual attainment does not diminish human love but deepens it. Nachiketa does not transcend his father — he returns to him with greater tenderness.

The repetition of this request (it was also the first boon in verse 4) emphasizes that love is not a preliminary stage to be transcended but the very foundation of wisdom. The Upanishad teaches that the one who cannot love cannot truly know. Compassion is not a weakness but the very texture of enlightenment.` },
        { id: `katha.1.1.9`, sanskrit: `तं होवाच यमः प्रियं प्रियाणाम् |
यथा त्वम् अग्निं वित्त्वा अमृतत्वमभजो मह्यं ॥९॥`, transliteration: `taṁ hovāca yamaḥ priyaṁ priyāṇām |
yathā tvam agniṁ vittvā amṛtatvam abhajo mahyaṁ ||9||`, english: `Yama granted this. As before, Nachiketa's father was pacified, freed from anger and fear, and spoke gently to his son.`, commentary: `The second first boon is granted. The father is restored to peace, and the bond between father and son is healed. This brief verse marks the completion of the emotional foundation that Nachiketa needed before proceeding to the highest questions.

With his father's love restored, Nachiketa is now free to ask his remaining two questions. He has demonstrated that his heart is in the right place — he values human love and family bonds even as he stands before Death itself.

The Upanishad uses this narrative structure to teach that spiritual seekers need not abandon their humanity. The monk who renounces family for the cave may miss something essential. Nachiketa shows that the true sage holds both the world and the Absolute in a single embrace.

From here, the teaching moves to the cosmic level. Nachiketa's next questions will probe the nature of death, the afterlife, and the Self — the questions that have haunted humanity since the beginning of consciousness.` },
        { id: `katha.1.1.10`, sanskrit: `स ऊर्ध्वं नचिकेता अवदत् |
यम द्वितीयेन वरेणेमं लोकं पश्यति ॥१०॥`, transliteration: `sa ūrdhvaṁ naciketā avadat |
yama dvitīyena vareṇemaṁ lokaṁ paśyati ||10||`, english: `Nachiketa said: "In the heavenly world there is no fear at all. You are not there, O Yama, nor is old age. Crossing over both hunger and thirst, crossing over sorrow, one rejoices in the world of heaven."`, commentary: `Nachiketa now asks his second question — and it is about heaven. He describes the heavenly realm (svarga) as a place free from fear, old age, hunger, thirst, and sorrow. He asks Yama to teach him the fire ritual that leads to this heavenly world.

This is a significant step. Nachiketa is not yet asking about the ultimate truth — he is asking about a better world, a realm of enjoyment without suffering. Many seekers stop here: they want a better life, a heavenly afterlife, freedom from pain.

But this is still within the realm of duality. Heaven, however beautiful, is temporary. It is a reward for good karma, and when that karma is exhausted, the soul must return to the earthly plane. The Upanishad will show that Nachiketa's real question goes far beyond heaven.

The fire ritual (Nachiketa fire) that Yama teaches in response is a symbolic representation of the spiritual path itself — the inner fire that transforms consciousness and leads to higher states of being.` },
        { id: `katha.1.1.11`, sanskrit: `स होवाच यमः प्रियं प्रियाणाम् |
एष ते�ग्निर् नचिकेतो विहितः प्रजापतौ ॥११॥`, transliteration: `sa hovāca yamaḥ priyaṁ priyāṇām |
eṣa te 'gnir naciketo vihitaḥ prajāpatau ||11||`, english: `Yama said: "This fire, O Nachiketa, I shall explain to you — the fire born of the sacrifice, the support of the worlds, hidden in the cave of the heart."`, commentary: `Yama begins teaching the Nachiketa fire ritual. He reveals that this fire is not merely an external ritual but is "hidden in the cave of the heart" (guhā hitam). This is a direct reference to the inner fire of consciousness, the spiritual heart where the Self dwells.

"Prajāpatau vihitaḥ" — "established in Prajapati, the Creator." The fire of knowledge is the creative principle itself. The entire universe is born from this fire — the fire of consciousness that manifests as all existence.

Yama teaches Nachiketa the specific details of building the fire altar, the number of bricks, and the mantras to be recited. Each detail has a symbolic meaning related to the structure of consciousness and the cosmos. The 36 bricks correspond to the 36 principles of Samkhya philosophy; the fire itself represents the awakened awareness that illuminates the inner world.

This teaching bridges the external and internal: the ritual fire is a physical representation of the inner spiritual fire. The sage who understands both levels — who performs the outer ritual while kindling the inner flame — attains the heavenly world and beyond.` },
        { id: `katha.1.1.12`, sanskrit: `तमस्य नचिकेतो व्याचचक्षे |
तमस्य नचिकेतो व्याचचक्षे तं ब्रह्मायमग्निं ॥१२॥`, transliteration: `tam asya naciketo vyācacakṣe |
tam asya naciketo vyācacakṣe taṁ brahmāyam agniṁ ||12||`, english: `Nachiketa repeated the fire-knowledge as Yama had taught it. Yama was pleased and said: "I give you yet another boon. This fire shall be called by your name."`, commentary: `Yama is pleased with Nachiketa's understanding and grants him a special honor: the fire ritual will be named after him — the Nachiketa fire. In Vedic tradition, having a sacred teaching named after you is the highest honor, as it means your name will be remembered and chanted for generations.

"I give you yet another boon" — Yama continues to shower Nachiketa with gifts, recognizing the boy's extraordinary spiritual capacity. Each time Nachiketa demonstrates wisdom, Yama responds with greater generosity.

"Taṁ brahmāyam agniṁ" — "this fire is Brahman." Here Yama makes a crucial statement: the fire ritual IS Brahman, the Absolute. This collapses the distinction between the ritual and the ultimate reality. The fire is not a means to reach God — the fire IS God. The ritual is not separate from the Absolute — it is an expression of it.

This teaching elevates ritual to the level of mysticism. External worship, when performed with understanding, IS the direct perception of the divine. The sacred fire, the altar, the mantras — all are manifestations of the one consciousness that pervades everything.` },
        { id: `katha.1.1.13`, sanskrit: `त्रीणि नचिकेतस्त्रिभिरेत्य संधिं |
त्रिकर्मकृत् तरति जन्ममृत्यू ॥१३॥`, transliteration: `trīṇi naciketas tribhir etya sandhiṁ |
tri-karmakṛt tarati janma-mṛtyū ||13||`, english: `The three Nachiketa fires — the one who knows these three, having united with the three, having performed the three works, crosses over birth and death.`, commentary: `This verse reveals the deeper meaning of the Nachiketa teaching. The "three fires" refer to three aspects of spiritual practice: knowledge, action, and meditation. When these three are united (sandhiṁ), the seeker transcends the cycle of birth and death.

"Tri-karmakṛt" — "performer of the three works." The three works are: the study of scriptures (adhyayana), teaching (adhyapana), and sacrifice (yajna). When these are performed with understanding of their inner meaning, they become the path to liberation.

"Tarati janma-mṛtyū" — "crosses over birth and death." This is the ultimate promise: freedom from the wheel of rebirth. Not a better birth, not a heavenly realm, but complete liberation from the cycle itself.

The repetition of "three" throughout this verse emphasizes the completeness of the teaching. Three fires, three works, three levels of understanding — all converging on the single point of transcendence. The spiritual path is not partial but holistic, engaging body, mind, and spirit in a single integrated practice.` },
        { id: `katha.1.1.14`, sanskrit: `त्रीण्येतत् त्रिभिर् एत्य संधिं |
त्रिकर्मकृद् ब्रह्मम् अविद्वान् अविन्दन् ॥१४॥`, transliteration: `trīṇy etat tribhir etya sandhiṁ |
tri-karmakṛd brahmam avidvān avindan ||14||`, english: `Knowing these three — the three Nachiketa fires — one who is united, who performs the three works, and who sees the fire as Brahman, this one is released from the knot of the heart.`, commentary: `This verse deepens the teaching of the previous one. The key phrase is "brahmam avidvān avindan" — "one who sees the fire as Brahman." This is not intellectual knowledge but direct perception. The person who sees Brahman in the fire — in the ritual, in the act of worship, in the very act of living — is freed.

"The knot of the heart" (hṛdaya granthi) is a technical term in Vedantic philosophy. It refers to the binding of consciousness by ignorance, desire, and karma — the knots that tie the soul to the wheel of rebirth. When these knots are loosened through knowledge and practice, the soul is freed.

The verse teaches that liberation comes not from a single practice but from the integration of understanding, action, and perception. One must know the teaching, practice the teaching, and ultimately BECOME the teaching — seeing Brahman everywhere, in everything, at all times.

This is the first major philosophical statement of the Katha Upanishad. It moves beyond ritual to realization, beyond performance to perception. The fire is not just fire — it is the Absolute itself, manifesting as the physical world.` },
        { id: `katha.1.1.15`, sanskrit: `जानत्वा कालकालं च युक्तो योगेन नचिकेतम् |
मुक्तो मुक्तं अवाप्नोति स ब्रह्म विदित्वा ॥१५॥`, transliteration: `jānatvā kālakālaṁ ca yukto yogena naciketam |
mukto muktaṁ avāpnoti sa brahma viditvā ||15||`, english: `This is your well-known Nachiketa fire, O Nachiketa. I declare to you the means of attaining heaven. This fire is established in the cavity of the heart. Meditate on this fire as the support of the world.`, commentary: `Yama continues his teaching of the Nachiketa fire. He reveals that this fire is "established in the cavity of the heart" (guhāṁ pratiṣṭhitam). This is the crucial point: the sacred fire is not merely an external ritual but an inner reality. The fire of consciousness burns within every being.

"Meditate on this fire as the support of the world" — the inner fire is not just personal but cosmic. It is the sustaining principle of the entire universe. The same consciousness that illuminates your inner world is the light that sustains all existence.

The transition from external ritual to internal meditation is the hallmark of the Upanishadic teaching. The Vedas prescribed elaborate fire rituals; the Upanishads reveal the inner fire that those rituals symbolize. This is not a rejection of ritual but its fulfillment — understanding the inner truth that the outer practice was designed to awaken.

For the practitioner, this verse invites a shift in perspective: when you meditate, when you perform any sacred act, recognize that the fire of awareness within you IS the divine fire. You are not worshipping something separate — you are awakening to what you already are.` },
        { id: `katha.1.1.16`, sanskrit: `तमस्य नचिकेतस्तृतीयं वरं वृणीते |
मृत्युप्रोक्तां संशयो मे विवरणम् ॥१६॥`, transliteration: `tam asya naciketas tṛtīyaṁ varaṁ vṛṇīte |
mṛtyuproktāṁ saṁśayo me vivaraṇam ||16||`, english: `Then Nachiketa chose the third boon: "There is this doubt regarding what happens after death. Some say the Self exists after death, others say it does not. Teach me the truth."`, commentary: `Now Nachiketa asks his ultimate question. After securing his father's peace and learning the fire ritual, he turns to the question that has haunted humanity since consciousness first became aware of its own mortality: "What happens after death? Does the Self survive, or not?"

"There is this doubt" — the word "saṁśaya" means doubt, uncertainty. This is not an abstract philosophical question but an existential one. Every human being faces death. Every human being wonders: is this all there is? Does something survive?

"Some say the Self exists after death, others say it does not" — even in ancient India, there was disagreement about this fundamental question. Materialists (Charvakas) denied the afterlife; Vedic ritualists believed in heavenly rewards; yogis and sages claimed direct knowledge of the immortal Self.

Nachiketa asks Yama — Death itself — to resolve this question once and for all. Who better to answer than the one who has witnessed every death, received every departing soul? This is the moment the entire Upanishad has been building toward.` },
        { id: `katha.1.1.17`, sanskrit: `देवैरत्रापि विचिकित्सितं पुरा |
न सुज्ञेयम् अणुर् एष धर्मः ॥१७॥`, transliteration: `devair atrāpi vicikitsitaṁ purā |
na sujñeyam aṇur eṣa dharmaḥ ||17||`, english: `Yama said: "Even the gods had doubts about this in ancient times. This truth is not easy to know. This subtle dharma is difficult to understand. Choose another boon, O Nachiketa. Do not press me. Release me from this."`, commentary: `Yama's response is remarkable. Instead of answering, he tries to dissuade Nachiketa. "Even the gods had doubts about this" — if the divine beings themselves struggled with this question, it is not something easily taught.

"Na sujñeyam aṇur eṣa dharmaḥ" — "this truth is not easy to know; this dharma is subtle." The word "anu" means subtle, atomic — pointing to the fact that the Self is the subtlest of all realities, not perceivable by the senses or grasped by the mind.

Yama's attempt to deflect Nachiketa is part of a traditional teaching method. In the Upanishadic tradition, the teacher tests the student's sincerity before giving the highest knowledge. If the student gives up easily, they are not ready. If they persist — as Nachiketa will — they prove their worthiness.

This exchange also reflects a deeper truth about spiritual knowledge: it cannot be given to those who merely want information. It reveals itself only to those who burn with the desire to know, who will not accept substitutes or half-truths.` },
        { id: `katha.1.1.18`, sanskrit: `अन्यान् वरान् नचिकेतो वृणीते मा मा सृजेति |
शतं जीवेम शरदः शतं शृणुयाम शरदः ॥१८॥`, transliteration: `anyān varān naciketo vṛṇīte mā mā sṛjeti |
śataṁ jīvema śaradaḥ śataṁ śṛṇuyāma śaradaḥ ||18||`, english: `Yama said: "Choose sons and grandsons who live a hundred years. Choose elephants, gold, horses, and vast land. Choose a long life. I shall grant you whatever pleasure is difficult to obtain on earth."`, commentary: `Yama now offers Nachiketa a dazzling array of worldly pleasures: long life, wealth, power, descendants, land — everything that human beings desire. This is the great temptation. Death itself is offering Nachiketa unlimited material happiness.

"Choose a long life" — the desire for longevity is perhaps the most universal human wish. "Choose elephants, gold, horses" — in ancient India, these were the symbols of royal power and wealth. "Whatever pleasure is difficult to obtain on earth" — Yama is offering the best of the best.

This is a crucial test. If Nachiketa accepts any of these, he will never receive the knowledge of the Self. The Upanishad teaches that worldly pleasures and spiritual knowledge are not necessarily incompatible, but the seeker who chooses pleasure over truth at the moment of decision reveals where their heart truly lies.

Yama is essentially asking: "What do you really want? Happiness, or truth?" This is the question every seeker must face. Do you want a comfortable life, or do you want liberation? The answer reveals the depth of one's spiritual maturity.` },
        { id: `katha.1.1.19`, sanskrit: `एतत् तुभ्यं नरकाद् भयाद् उद्धरिष्यामि |
मा मा सृजेति नचिकेतोऽवदत् ॥१९॥`, transliteration: `etat tubhyaṁ narakād bhayād uddhariṣyāmi |
mā mā sṛjeti naciketo 'vadat ||19||`, english: `These pleasures, lasting as long as the sun rises and sets — these are yours, O Nachiketa. Ask for elephants, horses, gold, and vast kingdoms. But do not ask about death.`, commentary: `Yama intensifies his offer. He promises Nachiketa pleasures that last as long as the sun rises and sets — meaning for an entire cosmic cycle. This is an almost unimaginable duration of happiness.

"Do not ask about death" — Yama explicitly tells Nachiketa to avoid the question about the Self and death. This is the final test. Will Nachiketa choose the easy path of enjoyment, or will he persist in seeking the ultimate truth?

The phrase "these are yours" (etat tubhyam) shows Yama's generosity — he is not withholding pleasure out of cruelty but offering it freely. The temptation is genuine: who would refuse unlimited happiness? Only the one who has seen something beyond happiness — something that makes even the greatest pleasure seem like a trifle.

Nachiketa's response will reveal the depth of his realization. The true seeker does not reject pleasure out of prudishness or self-denial, but because they have tasted something infinitely greater — the bliss of the Self that makes all worldly pleasure pale in comparison.` },
        { id: `katha.1.1.20`, sanskrit: `श्वोभावा मर्त्यस्य यदन्तकैतत् |
सर्वेन्द्रियाणां जरयन्ति तेजः ॥२०॥`, transliteration: `śvobhāvā martyasya yad antakaitat |
sarvendriyāṇāṁ jarayanti tejaḥ ||20||`, english: `All these things are but the pleasures of a mortal life, O Death. Even the longest life is short. Keep your horses, dancing, and singing for yourself.`, commentary: `Nachiketa refuses all of Yama's offers. His response is devastating in its clarity: "All these things are but the pleasures of a mortal life." Even the greatest pleasures are temporary. Even the longest life ends. Why would I trade the eternal for the fleeting?

"Śvobhāvā" — "lasting until tomorrow." This is Nachiketa's assessment of all worldly pleasures: they last only until tomorrow. Death can come at any moment, and all the wealth, power, and pleasure in the world cannot prevent it.

"Keep your horses, dancing, and singing for yourself" — this is not rudeness but clarity. Nachiketa is saying: "Your gifts are worthless compared to what I seek. Give them to someone who values them. I want something that cannot be taken away."

This verse marks the moment of Nachiketa's spiritual maturity. He has seen through the illusion of temporary happiness and is fixed on the eternal. This is viveka — discrimination — the ability to distinguish between the real and the unreal, the permanent and the temporary. It is the foundation of all spiritual progress.` },
        { id: `katha.1.1.21`, sanskrit: `ये यं लोकं मन्यमाना विशन्ति |
तस्मै तस्मै हि लोकाय नमस्कुर्वन्ति ॥२१॥`, transliteration: `ye yaṁ lokaṁ manyamānā viśanti |
tasmai tasmai hi lokāya namaskurvanti ||21||`, english: `The joy and pleasure you offer — these will end when all the pleasures of the great ones end. The longest life is but a trifle. Keep your chariots, keep your dance and song.`, commentary: `Nachiketa continues to reject Yama's offers with increasing firmness. He recognizes that even the greatest pleasures — those enjoyed by the gods themselves — have an expiration date. In the cosmic perspective, even a life of billions of years is but a moment.

"Keep your chariots, keep your dance and song" — these symbols of worldly power and entertainment hold no attraction for one who has glimpsed the eternal. The Upanishad is not condemning pleasure but placing it in proper perspective. A cup of water is wonderful when you are thirsty, but it means nothing when you are drowning.

This verse reinforces the teaching of discrimination (viveka). The spiritual seeker must learn to evaluate everything in terms of permanence. What lasts? What endures? What cannot be taken away? Only the Self — the Atman — survives the destruction of all else.

Nachiketa's rejection is not asceticism born of fear or self-denial. It is the natural response of someone who has tasted the infinite. Once you have known the ocean, a puddle no longer tempts you.` },
        { id: `katha.1.1.22`, sanskrit: `न वित्तेन तर्पणीयो मनुष्यो |
लप्स्यामहे वित्तम् अद्राक्ष्म चेत् त्वाम् ॥२२॥`, transliteration: `na vittena tarpaṇīyo manuṣyo |
lapsyāmahe vittam adrākṣma ced tvām ||22||`, english: `No mortal can be satisfied by wealth alone. Having seen you, we shall obtain wealth. Having seen you, we shall live as long as you wish.`, commentary: `Nachiketa makes a profound statement: "No mortal can be satisfied by wealth alone." This is a universal truth that transcends time and culture. Wealth brings comfort but not fulfillment. Power brings influence but not peace. Only the direct knowledge of the Self — the vision of Yama that Nachiketa is pursuing — can truly satisfy.

"Having seen you, we shall obtain wealth" — this is not a bargaining tactic but a statement of spiritual law. When one has the direct vision of the divine, all other blessings naturally follow. The sage who knows the Self does not need to seek wealth — wealth seeks the sage.

"Having seen you, we shall live as long as you wish" — Nachiketa is not asking for immortality in the body but for the grace of Yama's teaching. He is saying: "Teach me, and I will accept whatever lifespan you decree. The knowledge itself is the real gift."

This verse reveals Nachiketa's complete trust in the divine order. He does not need to bargain or manipulate. He simply asks for the truth and accepts whatever comes with it.` },
        { id: `katha.1.1.23`, sanskrit: `अशरीरं शरीरेषु अनवस्थेष्व् अवस्थितम् |
महान्तं विभुम् आत्मानं मत्वा धीरो न शोचति ॥२३॥`, transliteration: `aśarīraṁ śarīreṣu anavastheṣv avasthitam |
mahāntaṁ vibhum ātmānaṁ matvā dhīro na śocati ||23||`, english: `Having seen your form — the ancient, bodiless one who dwells within the body, the one who dwells among the unstable, the great, the all-pervading Self — the wise one does not grieve.`, commentary: `Nachiketa now reveals what he has already glimpsed: "the ancient, bodiless one who dwells within the body." This is a direct description of the Atman — the Self that is formless yet present within every form, unchanging yet present within every change.

"Aśarīraṁ śarīreṣu" — "bodiless in the bodies." The Self has no body of its own, yet it dwells in every body. Like space that pervades all containers without being limited by any of them, the Self pervades all bodies without being confined to any.

"Anavastheṣv avasthitam" — "established among the unstable." Everything in the world is unstable — bodies, thoughts, emotions, circumstances. Yet within this constant flux, the Self remains unmoved. It is the unmoving center around which all change revolves.

"Mahāntaṁ vibhum ātmānaṁ" — "the great, all-pervading Self." The Self is not small or limited. It is vast, infinite, present everywhere. The sage who sees this does not grieve (na śocati), because there is nothing to grieve for. What can be lost when everything is the Self?

This verse is one of the clearest descriptions of the Atman in all the Upanishads. It states the essential teaching: the Self is formless, eternal, all-pervading, and present within every form. To know this is to be free from grief.` },
        { id: `katha.1.1.24`, sanskrit: `आसीनो दूरं व्रजति शयानो याति सर्वतः |
कस्तं मदामदं देवं मदन्यो ज्ञातुमर्हति ॥२४॥`, transliteration: `āsīno dūraṁ vrajati śayāno yāti sarvataḥ |
kas taṁ madāmadaṁ devaṁ mad anyo jñātum arhati ||24||`, english: `Seated, the Self goes far. Lying down, it goes everywhere. Who other than myself can know that divine joy beyond joy?`, commentary: `This verse describes the paradoxical nature of the Self through everyday actions. "Seated, it goes far" — even while the body is still, the Self pervades all space. "Lying down, it goes everywhere" — even in sleep, consciousness continues to pervade.

These descriptions point to the nature of awareness itself. When you sit quietly, your consciousness is not confined to the room — you can think of distant places, remember the past, imagine the future. Awareness is not limited by the body's position.

"Who other than myself can know that divine joy beyond joy?" — this is a remarkable declaration. The Self is the only knower of itself. No external teaching, no scripture, no guru can give you the experience of the Self — only the Self knows the Self. Others can point the way, but the actual knowing is an internal event.

"Madāmadaṁ" — "joy beyond joy" or "intoxication beyond intoxication." The bliss of the Self surpasses all other forms of happiness. It is not the excitement of pleasure but the deep, unshakable contentment of being itself. This is ananda — the bliss that is the nature of the Self.` },
        { id: `katha.1.1.25`, sanskrit: `यं यं लोकं मन्यमाना विशन्ति |
तं तम् ईशानो भूत्वा भूत्या बिभर्ति ॥२५॥`, transliteration: `yaṁ yaṁ lokaṁ manyamānā viśanti |
taṁ tam īśāno bhūtvā bhūtyā bibharti ||25||`, english: `The wise one who knows the Self, which is bodiless among the bodied, permanent among the impermanent, great and all-pervading — such a one does not grieve.`, commentary: `This verse restates the teaching of verse 23 with a slight variation, emphasizing different aspects of the Self. "Bodiless among the bodied" — the Self is not a body, yet it animates all bodies. "Permanent among the impermanent" — everything changes, but the Self does not.

"Great and all-pervading" — the Self is not a small entity trapped in a body. It is infinite, present everywhere. The body is like a lamp that localizes light, but the Self is like the light itself — it radiates in all directions without limit.

The repetition of "such a one does not grieve" (na śocati) emphasizes this central point: grief comes from loss, and loss comes from identification with what is limited and temporary. When you identify with the infinite Self, there is nothing to lose and therefore nothing to grieve.

This teaching is not meant to suppress grief but to address its root cause. Grief is natural when we identify with the body and lose someone we love. But when we recognize that the same Self that animates our loved ones is the Self that animates all beings — and that Self is eternal — grief is transformed into understanding.` },
        { id: `katha.1.1.26`, sanskrit: `तं दुर्दर्शं गूढम् अनुप्रविष्टं |
गुहाहितं गह्वरेष्ठं पुराणम् ॥२६॥`, transliteration: `taṁ durdarśaṁ gūḍham anupraviṣṭaṁ |
guhāhitaṁ gahvareṣṭhaṁ purāṇam ||26||`, english: `The Self is difficult to perceive, hidden, dwelling in the inner cave, residing in the deep secret place, ancient.`, commentary: `This verse describes the difficulty of perceiving the Self. It is "difficult to see" (durdarśam) — not because it is far away but because it is too close. The eye cannot see itself; the Self cannot be perceived as an object because it is the very subject that perceives.

"Hidden" (gūḍham) — the Self is concealed by the very mind that seeks it. The constant stream of thoughts, desires, and identifications acts as a screen that hides the awareness behind it. Like the sun hidden by clouds, the Self is always present but obscured.

"Dwelling in the inner cave" (guhāhitam) — the Upanishads consistently describe the Self as residing in the "cave of the heart" (guhā). This is not the physical heart but the innermost sanctuary of consciousness — the space of pure awareness that underlies all experience.

"Ancient" (purāṇam) — the Self is older than the oldest. It existed before the body, before the mind, before the universe itself. It is the primordial consciousness from which all things arise. To know it is to know the source of everything.` },
        { id: `katha.1.1.27`, sanskrit: `विविक्तद्रोणं विविक्तशयनम् |
विविक्तस्थानम् अनुप्रविष्टम् ॥२७॥`, transliteration: `viviktadroṇaṁ viviktaśayanam |
viviktasthānam anupraviṣṭam ||27||`, english: `Having understood the Self through the body — through the control of the senses, through the practice of meditation — the wise one finds joy. Having known the Self, the great, all-pervading one, the wise one does not grieve.`, commentary: `The practice of meditation is described here as the means of knowing the Self. "Through the control of the senses" (indriyāṇāṁ samyama) — the senses must be turned inward, away from external objects, toward the inner source of awareness.

"Through the practice of meditation" (dhyāna) — this is the active component. The seeker sits quietly, withdraws attention from the external world, and focuses on the inner silence. In this silence, the Self begins to reveal itself.

"Having known the Self, the great, all-pervading one, the wise one does not grieve" — the result of meditation is not a pleasant feeling or a temporary calm. It is the direct knowledge of the Self as infinite and all-pervading. This knowledge eliminates grief at its root.

This verse bridges the gap between theory and practice. The previous verses described the Self; this verse tells us how to know it directly: through sense control and meditation. Knowledge alone is not enough — it must be realized through practice.` },
        { id: `katha.1.1.28`, sanskrit: `नायमात्मा प्रवचनेन लभ्यो |
न मेधया न बहुना श्रुतेन ॥२८॥`, transliteration: `nāyam ātmā pravacanena labhyo |
na medhayā na bahunā śrutena ||28||`, english: `This Self cannot be attained by instruction, nor by intellectual power, nor even by much hearing. It is attained only by the one whom the Self chooses. To such a one, the Self reveals its own nature.`, commentary: `This is one of the most famous verses in the Upanishads, and one of the most challenging. It states plainly that the Self cannot be attained through any external means — not through teaching (pravacana), not through intelligence (medha), not through extensive study of scriptures (bahu śruta).

This seems to negate all spiritual practice. If the Self cannot be attained through instruction, why study? If not through intelligence, why think? If not through hearing scriptures, why listen?

The answer lies in the final line: "the Self reveals its own nature" (ātmanā ātmānaṁ vibhāti). The Self is not an object to be obtained — it is the subject that is already present. All spiritual practices — study, meditation, devotion — do not create the Self but remove the obstacles that prevent its recognition. Like clouds clearing to reveal the sun, practices clear the mind to reveal the Self that was always there.

"The one whom the Self chooses" — this implies divine grace. Ultimately, realization is not a human achievement but a divine gift. The seeker's role is to prepare the ground through practice; the Self's role is to reveal itself when the ground is ready. This is the mystery of grace — it cannot be earned, only received.` },
        { id: `katha.1.1.29`, sanskrit: `यमेवैष वृणुते तेन लभ्यः |
तस्यैष आत्मा विवृणुते तनूं स्वाम् ॥२९॥`, transliteration: `yam evaiṣa vṛṇute tena labhyaḥ |
tasyaiṣa ātmā vivṛṇute tanūṁ svām ||29||`, english: `The Self is not attained by the weak, nor by the careless, nor by tapas without the proper knowledge. But the wise one who strives through these means — to such a one, the Self that dwells in the body reveals its own form.`, commentary: `This verse completes the first Valli of the Katha Upanishad with a balanced teaching. While the Self ultimately reveals itself by grace (verse 28), human effort is still necessary. The Self is not for the "weak" (alpa) — those who lack spiritual commitment. Nor for the "careless" (pramatta) — those who are not vigilant in their practice. Nor for one who practices "tapas without proper knowledge" — austerities without understanding.

The balanced approach combines effort and surrender. The seeker practices meditation, studies scripture, and controls the senses — but with the understanding that these practices do not "earn" the Self. They prepare the mind to receive the grace that the Self freely offers.

"Vivṛṇute tanūṁ svām" — "reveals its own form." The Self does not take on a new form; it reveals the form it always had. Like a statue hidden under a cloth — removing the cloth does not create the statue but reveals it. The Self was always present; our practices simply remove the covering of ignorance.

This completes the first Valli with a synthesis: effort is necessary, but grace is the ultimate cause of realization. The seeker does everything possible while knowing that the final revelation comes from beyond the individual will.

ADHYAYA 1, VALLI 2: Yama Teaches the Nature of the Self` },
      ],
    },
    {
      id: `1.2`,
      name: `The Nature of the Atman`,
      sanskritName: `आत्मविद्या`,
      verses: [
        { id: `katha.1.2.1`, sanskrit: `पराञ्चि खानि व्यतृणत् स्वयम्भूः |
तस्मात् पराङ् पश्यति नान्तरात्मन् ॥१॥`, transliteration: `parāñci khāni vyatṛṇat svayambhūḥ |
tasmāt parāṅ paśyati nāntar ātman ||1||`, english: `The Self-born one has turned the senses outward. Therefore, one sees the external world but not the inner Self. The wise person turns the gaze inward, seeking immortality.`, commentary: `This is one of the most profound verses in the Upanishads. It explains why we do not perceive the Self: the senses are turned outward, like windows that only look outside. The Self-born Creator (svayambhū) designed the senses to perceive the external world — eyes see objects, ears hear sounds, and so on.

"Tasmāt parāṅ paśyati" — "therefore one sees what is external." We are programmed by our very nature to look outward. This is not a defect but a design. The problem arises when we forget that there is also an interior world — the world of consciousness, awareness, the Self.

"Kecit dhīrāḥ prāṅcyanty eva" — "but some brave ones turn inward." The word "dhīra" means brave, courageous. Turning inward requires courage because it means turning away from the familiar, the comfortable, the known. It means facing the silence, the unknown, the mystery of one's own being.

This verse explains the human condition perfectly: we are built to look outward, and therefore we miss the most obvious reality — the awareness that is doing all the looking. The spiritual path is simply the reversal of attention: from objects to the subject, from the world to the Self.` },
        { id: `katha.1.2.2`, sanskrit: `पराचः कामान् अनुयन्ति बालाः |
ते मृत्योर् यन्ति विततस्य पाशम् ॥२॥`, transliteration: `parācaḥ kāmān anuyanti bālāḥ |
te mṛtyor yanti vitatasya pāśam ||2||`, english: `Fools pursue external pleasures and fall into the wide-spread snare of Death. But the wise, knowing the nature of what is eternal, do not seek the permanent among the impermanent.`, commentary: `This verse draws a sharp distinction between the wise and the foolish. "Fools pursue external pleasures" (parācaḥ kāmān anuyanti bālāḥ) — those who live only for sensory gratification are like moths drawn to a flame. They rush toward pleasure and fall into Death's net.

"Vitatasya pāśam" — "the wide-spread snare." Death's trap is not a narrow, hidden thing — it is spread wide across the entire field of sensory experience. Every attachment, every craving, every identification with the temporary is a thread in this net.

"The wise, knowing the nature of what is eternal, do not seek the permanent among the impermanent" — this is the teaching of viveka, discrimination. The wise person recognizes that happiness, permanence, and reality cannot be found in the world of changing forms. They look instead for the eternal within, the Self that is untouched by change.

This verse is a compassionate warning, not a moral condemnation. It simply states the natural law: those who seek permanent satisfaction in temporary things will always be disappointed. The path of wisdom is to seek the right thing in the right place.` },
        { id: `katha.1.2.3`, sanskrit: `आत्मानं रथिनं विद्धि शरीरं रथमेव तु |
बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥३॥`, transliteration: `ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu |
buddhiṁ tu sārathiṁ viddhi manaḥ pragraham eva ca ||3||`, english: `Know the Self as the lord of the chariot, the body as the chariot itself. Know the intellect as the charioteer, and the mind as the reins.`, commentary: `This is the famous chariot analogy of the Katha Upanishad — one of the most beloved images in Indian philosophy. It is so important that the Bhagavad Gita later echoes it in its first chapter.

The Self (Atman) is the lord — the one who sits in the chariot and directs the journey. The body is the chariot — the vehicle through which the Self moves in the world. The intellect (buddhi) is the charioteer — the discriminating faculty that makes decisions and directs the journey. The mind (manas) is the reins — the controlling mechanism that connects the charioteer to the horses.

This image maps the entire human personality onto a chariot. When all parts work together — when the intellect is sharp, the mind is disciplined, and the senses are controlled — the Self reaches its destination: the realization of its true nature.

When the intellect is dull, the mind undisciplined, and the senses wild, the chariot goes nowhere or crashes. This is the state of the unawakened person — pulled in all directions by uncontrolled senses, with no clear direction or purpose.

The chariot analogy is a complete psychology of the human being, expressed in a single memorable image.` },
        { id: `katha.1.2.4`, sanskrit: `इन्द्रियाणि हयानाहुर् विषयांस्तेषु गोचरान् |
आत्मेन्द्रियमनोयुक्तं भोक्तेत्याहुर् मनीषिणः ॥४॥`, transliteration: `indriyāṇi hayānāhur viṣayāṁs teṣu gocarān |
ātmendriya-mano-yuktaṁ bhoktety āhur manīṣiṇaḥ ||4||`, english: `The senses are called the horses; the objects of sense are the paths they travel. When the Self, the senses, and the mind are united — the wise call this the enjoyer (bhokta).`, commentary: `The analogy continues: the five senses (sight, hearing, touch, taste, smell) are the horses that pull the chariot. The sense objects — the sights, sounds, and experiences of the world — are the roads along which the horses run.

The crucial teaching is: "when the Self, the senses, and the mind are united" — this integration is the goal. When the Self directs the intellect, the intellect holds the reins of the mind, and the mind controls the senses, the entire personality becomes coherent and purposeful.

"Bhoktety āhur manīṣiṇaḥ" — "the wise call this the enjoyer." The Self is not merely a passive witness but the one who experiences, who enjoys, who lives through the body-mind complex. The body-mind is the instrument; the Self is the one who uses it.

This verse explains why we feel fragmented and conflicted: the horses (senses) are running wild, the reins (mind) are loose, the charioteer (intellect) is asleep, and the lord (Self) has forgotten it is even in the chariot. Spiritual practice is the process of bringing order to this chaos — waking the charioteer, tightening the reins, and training the horses.` },
        { id: `katha.1.2.5`, sanskrit: `यस्त्वविज्ञानवान् भवत्य् अयुक्तेन मनसा सदा |
तस्येन्द्रियाण्यवश्यानि दुष्टाश्वा इव सारथेः ॥५॥`, transliteration: `yas tv avijñānavān bhavaty ayuktena manasā sadā |
tasyendriyāṇy avaśyāni duṣṭāśvā iva sāratheḥ ||5||`, english: `But the one who is without understanding, with mind always uncontrolled — their senses are unmanageable, like the wild horses of a charioteer.`, commentary: `This verse describes the condition of the unawakened person. "Without understanding" (avijñānavān) — lacking the discriminative knowledge of the Self. "Mind always uncontrolled" (ayuktena manasā) — the mind is restless, agitated, pulled in every direction.

"Duṣṭāśvā iva sāratheḥ" — "like the wild horses of a charioteer." When the charioteer is incompetent, the horses run wherever they please. Similarly, when the intellect lacks discrimination, the senses pursue whatever attracts them, without restraint or purpose.

This is a perfect description of the ordinary human condition. We are pulled by desire, repelled by aversion, constantly reacting to external stimuli without any inner direction. The mind jumps from thought to thought like a monkey swinging from branch to branch.

The remedy is implied: train the charioteer (develop the intellect through study and reflection), strengthen the reins (discipline the mind through meditation), and tame the horses (control the senses through practice). Only then can the Self — the lord of the chariot — reach its destination.` },
        { id: `katha.1.2.6`, sanskrit: `यस्तु विज्ञानवान् भवति युक्तेन मनसा सदा |
तस्येन्द्रियाणि वश्यानि सदश्वा इव सारथेः ॥६॥`, transliteration: `yas tu vijñānavān bhavati yuktena manasā sadā |
tasyendriyāṇi vaśyāni sad-aśvā iva sāratheḥ ||6||`, english: `But the one who has understanding, with mind always controlled — their senses are manageable, like the well-trained horses of a charioteer.`, commentary: `This verse presents the opposite of the previous one. The person of understanding (vijñānavān) — one who has the discriminative knowledge of the Self — has a controlled mind and manageable senses. The horses (senses) are well-trained, responding to the slightest pull of the reins.

"Sadaśvā iva sāratheḥ" — "like the good horses of a charioteer." Good horses are not suppressed or broken — they are trained with skill and patience. Similarly, the senses in an awakened person are not deadened or denied — they are refined, responsive, and serve the Self's purpose.

The difference between the wise and the foolish is not in their senses — both have the same five senses — but in the quality of their intellect and mind. The wise person has cultivated discrimination, trained the mind through meditation, and learned to direct the senses purposefully.

This verse offers hope: the transformation from uncontrolled to controlled is possible for anyone. It is not a matter of innate talent but of practice and understanding. The chariot analogy makes the spiritual path accessible and practical — it is simply a matter of training each component of the human personality.` },
        { id: `katha.1.2.7`, sanskrit: `यस्त्वविज्ञानवान् भवति अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥७॥`, transliteration: `yas tv avijñānavān bhavati amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||7||`, english: `The one without understanding, with uncontrolled mind, always impure — such a one does not attain that goal and falls back into the cycle of birth and death.`, commentary: `The consequence of living without understanding is stated plainly: saṁsāra — the cycle of birth, death, and rebirth. "Does not attain that goal" — the goal of Self-realization, liberation, the end of suffering.

"Amanaskaḥ" — "without mind" or "with uncontrolled mind." This does not mean the person lacks a mind but that their mind is not functioning as an instrument of discrimination. It is reactive rather than reflective, passive rather than purposeful.

"Aśuciḥ" — "impure." Impurity here refers not to physical dirt but to mental contamination: desire, aversion, delusion, pride, and envy. These mental impurities cloud the intellect and prevent clear perception.

This verse is a wake-up call. It states the stakes: if we do not cultivate understanding and mind-control, we remain trapped in the cycle of suffering. The Upanishad is not threatening but informing — like a doctor explaining the consequences of an unhealthy lifestyle. The choice remains ours.` },
        { id: `katha.1.2.8`, sanskrit: `यस्तु विज्ञानवान् भवति समनस्कः सदा शुचिः |
स तु तत्पदम् आप्नोति यस्माद् भूयो न जायते ॥८॥`, transliteration: `yas tu vijñānavān bhavati samanaskaḥ sadā śuciḥ |
sa tu tat padam āpnoti yasmād bhūyo na jāyate ||8||`, english: `The one who has understanding, with controlled mind, always pure — that one attains the goal from which there is no return to birth.`, commentary: `The positive counterpart: the person of understanding, with a controlled mind and pure heart, attains the goal — liberation (moksha). "From which there is no return to birth" (yasmād bhūyo na jāyate) — this is the definition of liberation. It is not a better birth but the end of birth altogether.

"Samanaskaḥ" — "with controlled mind." The prefix "sa" means "with" and "manas" means "mind" — the mind is present and functioning, but under control. This is not the absence of mind but its mastery.

"Śuciḥ" — "pure." Purity of heart is the prerequisite for Self-realization. When the mind is free from desire, aversion, and delusion, it becomes a clear mirror in which the Self is reflected.

The contrast between verses 7 and 8 is stark and simple: ignorance leads to bondage, understanding leads to freedom. The choice is ours to make, moment by moment, thought by thought. Every time we choose awareness over distraction, discrimination over impulse, we move closer to the goal.` },
        { id: `katha.1.2.9`, sanskrit: `आत्मानं रथिनं विद्धि शरीरं रथमेव तु |
बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥९॥`, transliteration: `indriyāṇi hayān āhur viṣayāṁs teṣu gocarān |
ātmendriya-mano-yuktaṁ bhoktety āhur manīṣiṇaḥ ||9||`, english: `Beyond the senses are the sense objects; beyond the sense objects is the mind; beyond the mind is the intellect; beyond the intellect is the Great Self.`, commentary: `This verse maps the hierarchy of consciousness. Moving from gross to subtle: senses → sense objects → mind → intellect → the Great Self (Mahat Atma). Each level is subtler than the one before it.

"Beyond the intellect is the Great Self" — the Atman transcends even the highest intellectual faculty. The intellect can analyze, discriminate, and reason, but it cannot touch the Self directly. The Self is the source of the intellect, not its product.

"Beyond the Great Self is the Unmanifest" — the causal level of reality, the seed form of all creation. "Beyond the Unmanifest is the Purusha" — the cosmic person, the ultimate reality that transcends all manifestation.

This hierarchy teaches that the spiritual path involves progressively subtler levels of perception. First, we learn to control the senses. Then we discipline the mind. Then we sharpen the intellect. Finally, we transcend the intellect entirely and merge with the Self.

The Upanishad is giving a complete map of reality, from the most physical to the most spiritual. Understanding this map helps the seeker know where they are on the journey and what lies ahead.` },
        { id: `katha.1.2.10`, sanskrit: `इन्द्रियेभ्यः परा ह्यर्था अर्थेभ्यश्च परं मनः |
मनसस्तु परा बुद्धिर् बुद्धेर् आत्मा महान् परः ॥१०॥`, transliteration: `indriyebhyaḥ parā hy arthā arthebhyaś ca paraṁ manaḥ |
manasas tu parā buddhir buddher ātmā mahān paraḥ ||10||`, english: `Beyond the senses are the objects; beyond the objects is the mind; beyond the mind is the intellect; beyond the intellect is the Great Self. Beyond the Great Self is the Unmanifest; beyond the Unmanifest is the Purusha — the all-pervading Being. Having known that Purusha, one is freed.`, commentary: `This verse completes the hierarchy begun in the previous verse, adding two more levels: the Unmanifest (avyakta) and the Purusha (cosmic person, the Absolute).

"Puruṣaḥ sarvabhūtāntarātmā" — "the Purusha is the inner Self of all beings." This is not a distant God but the intimate reality within every creature. The Purusha is closer than close — it is the awareness with which you perceive these words.

"Tam eva puruṣaṁ jñātvā mucyate" — "by knowing that Purusha alone, one is freed." Liberation comes from knowing — not believing, not hoping, not imagining — but directly knowing the Purusha as one's own Self.

"Sukṛtāt sāṅkhyānāṁ yoga" — "this is the supreme path taught by the Sankhyas and Yogis." The Upanishad unites the philosophical tradition (Sankhya) with the practical tradition (Yoga). Understanding and practice go together.

This is one of the most comprehensive metaphysical descriptions in the Upanishads. It gives the seeker a complete map of reality, from the physical to the absolute, and points to the ultimate goal: knowing the Purusha as one's own Self.` },
        { id: `katha.1.2.11`, sanskrit: `तं दुर्दर्शं गूढम् अनुप्रविष्टं |
गुहाहितं गह्वरेष्ठं पुराणम् |
अध्यात्मयोगाधिगमेन देवं |
मत्वा धीरो हर्षशोकौ जहाति ॥११॥`, transliteration: `taṁ durdarśaṁ gūḍham anupraviṣṭaṁ |
guhāhitaṁ gahvareṣṭhaṁ purāṇam |
adhyātma-yogādhigamena devaṁ |
matvā dhīro harṣa-śokau jahāti ||11||`, english: `This Self is difficult to perceive, hidden in the inner cave of the heart, dwelling in the deepest recess, ancient. Through the practice of meditation on the Self, the wise one transcends both joy and sorrow.`, commentary: `The Upanishad returns to the description of the Self's hidden nature, now adding the means of its realization. "Through the practice of meditation on the Self" (adhyātma-yogādhigamena) — this is the prescription: turn attention inward, focus on the Self within.

"The wise one transcends both joy and sorrow" (harṣa-śokau jahāti). This is a remarkable statement. The sage does not merely transcend sorrow — they transcend joy as well. This is because both joy and sorrow are dualities — they depend on circumstances and are therefore temporary. The sage rests in the equanimity of the Self, which is beyond both.

This does not mean the sage becomes emotionless. Rather, the sage's happiness is not dependent on external circumstances. It is the natural state of the Self — ananda, bliss — which is not a reaction to events but the very nature of consciousness.

The teaching is consistent: the Self is hidden, but it can be found through meditation. The seeker who persists in turning inward will eventually discover the treasure that was always there.` },
        { id: `katha.1.2.12`, sanskrit: `तत्त्वतः तु महान् आत्मा गुहायां निहितो ह्ययम् |
शुद्धः पुण्यः कविः कृष्णो हिरण्मयः परः ॥१२॥`, transliteration: `tattvataḥ tu mahān ātmā guhāyāṁ nihito hy ayam |
śuddhaḥ puṇyaḥ kaviḥ kṛṣṇo hiraṇmayaḥ paraḥ ||12||`, english: `Truly, the Great Self dwells in the cave of the heart. It is pure, auspicious, the seer, dark as a cloud, golden, supreme.`, commentary: `This verse offers a poetic description of the Self as it actually is. "Mahān ātmā" — the Great Self. It is not small or petty but vast, infinite, all-encompassing. "Guhāyāṁ nihito" — established in the cave of the heart. The heart-cave (guhā) is the innermost sanctuary of consciousness.

"Śuddhaḥ" — pure, untouched by any contamination. "Puṇyaḥ" — auspicious, holy, sacred. "Kaviḥ" — the seer, the one who sees all. "Kṛṣṇaḥ" — dark as a raincloud, mysterious, unfathomable. "Hiraṇmayaḥ" — golden, luminous, radiant. "Paraḥ" — supreme, beyond all.

These attributes are not contradictory but complementary. The Self is both dark (beyond comprehension) and golden (radiant with light). It is both pure (untouched by the world) and auspicious (the source of all blessing).

The verse uses a string of adjectives not to define the Self but to evoke it. Each word is a finger pointing at the moon — the Self itself transcends all description. But these beautiful words help orient the seeker's mind toward the reality they are seeking.` },
        { id: `katha.1.2.13`, sanskrit: `समानो अनिलो अन्तर् आत्मा |
एकः सत् बहुधा विहरन् ॥१३॥`, transliteration: `samāno anilo antar ātmā |
ekaḥ sat bahudhā viharan ||13||`, english: `The one Self dwells in all beings. Though one, it moves in many ways. The wise perceive it within themselves; the foolish see it not.`, commentary: `This verse states the core teaching of Advaita Vedanta: the Self is one, but it appears as many. "Ekaḥ sat bahudhā viharaḥ" — "the one truth moves in many ways." Like the one sun reflected in a thousand pots of water, the one Self appears as a thousand beings.

"Samāno anilo" — "the one breath." The same prana, the same life-force, animates all beings. The breath that moves in you is the same breath that moves in every creature.

"The wise perceive it within themselves" — the sage sees the same Self in their own heart and in every other heart. "The foolish see it not" — the unawakened person sees only differences, only separate bodies, only individual minds. They miss the unity that underlies all diversity.

This verse is the philosophical foundation for compassion, love, and non-violence. If the same Self dwells in all, then harming another is harming oneself. And loving another is loving oneself. The golden rule is not just a moral injunction — it is a statement of metaphysical fact.` },
        { id: `katha.1.2.14`, sanskrit: `नैव वाचा न मनसा प्राप्तुं शक्यो न चक्षुषा |
अस्तीति ब्रुवतोऽन्यत्र कथं तद् उपलभ्यते ॥१४॥`, transliteration: `naiva vācā na manasā prāptuṁ śakyo na cakṣuṣā |
astīti bruvato 'nyatra kathaṁ tad upalabhyate ||14||`, english: `The Self cannot be attained by speech, nor by mind, nor by the eye. How can it be realized except by the one who says 'It is'?`, commentary: `This verse addresses the method of knowing the Self. "Naiva vācā" — not by speech. The Self cannot be described or defined in words. "Na manasā" — not by the mind. The mind cannot think its way to the Self, because the Self is the witness of thought. "Na cakṣuṣā" — not by the eye. The Self is not a visible object.

So how is it known? "Astīti bruvato 'nyatra kathaṁ tad upalabhyate" — "How can it be realized except by the one who says 'It is'?" The Self is known through direct recognition, not through any instrument of knowledge. It is known as "this IS" — not as an object seen, but as the very fact of being.

This points to the most direct teaching of the Upanishads: the Self is the very awareness in which all experience appears. You cannot see it because it is what is doing the seeing. You cannot think it because it is what is doing the thinking. You can only BE it — which you already are.

The realization is not an attainment but a recognition. The Self does not need to be created, reached, or achieved. It needs only to be recognized as what you already are.` },
        { id: `katha.1.2.15`, sanskrit: `अस्तीत्येवोपलब्धव्यस् तत्त्वभावेन चोभयोः |
अस्तीत्येवोपलब्धव्यस् तत्त्वभावेन चोभयोः ॥१५॥`, transliteration: `astīty evopalabdhyavyas tattva-bhāvena cobhayoḥ |
yad hy eva vadatas tasya satyaṁ bhavati vāg iti ||15||`, english: `One should know It as 'It is' and also as 'It is not.' When one has realized the truth of both — 'It is' and 'It is not' — then the truth shines forth.`, commentary: `This paradoxical verse teaches that the Self transcends both being and non-being. "Asti" — "It is." The Self is real, present, the most intimate fact of existence. "Nāsti" — "It is not." The Self is not an object, not a thing, not something that can be grasped or defined.

Both statements are true from different perspectives. From the perspective of direct experience, the Self IS — it is the most real thing there is. From the perspective of the senses and mind, the Self is NOT — it cannot be seen, heard, or thought.

"When one has realized the truth of both" — the sage holds both truths simultaneously. The Self is and is not; it is beyond both affirmation and denial. This is the logic of the transcendent — it cannot be captured by any single statement.

This teaching frees the seeker from attachment to any particular concept of the Self. It is not "something" and it is not "nothing." It is beyond all categories. The realization of this truth is liberation — not a state of mind but the transcendence of all states.` },
        { id: `katha.1.2.16`, sanskrit: `यदा पञ्चावतिष्ठन्ते ज्ञानानि मनसा सह |
बुद्धिश्च न विचेष्टति तामाहुः परमां गतिम् ॥१६॥`, transliteration: `yadā pañcāvatiṣṭhante jñānāni manasā saha |
buddhiś ca na viceṣṭati tām āhuḥ paramāṁ gatim ||16||`, english: `When the five senses along with the mind are at rest, and the intellect does not move — that, they say, is the supreme state.`, commentary: `This verse describes the state of deep meditation — samadhi. "When the five senses along with the mind are at rest" — all sensory input ceases, and the mind becomes completely still. "The intellect does not move" — even the discriminative faculty, the last active function of the mind, comes to rest.

"Tām āhuḥ paramāṁ gatim" — "that, they say, is the supreme state." This is the highest goal of meditation — the complete stillness of all mental activity. In this silence, the Self shines forth by itself, like the sun when the clouds part.

This is not sleep, because awareness is fully present. It is not unconsciousness, because the Self is more awake than ever. It is a state of pure awareness without content — consciousness without an object, light without an object to illuminate.

The practical instruction is clear: meditate until all the faculties — senses, mind, intellect — come to rest. In that silence, the Self reveals itself. This is the culmination of all spiritual practice.` },
        { id: `katha.1.2.17`, sanskrit: `तां योगम् इति मन्यन्ते स्थिराम् इन्द्रियधारणाम् |
अप्रमत्तस् तदा भवति योगो हि प्रभवाप्ययौ ॥१७॥`, transliteration: `tāṁ yogam iti manyante sthirāṁ indriya-dhāraṇām |
apramattas tadā bhavati yogo hi prabhavāpyayau ||17||`, english: `This they call yoga — the steady control of the senses. Then one becomes watchful, for yoga comes and goes.`, commentary: `This verse defines yoga precisely: "sthirāṁ indriya-dhāraṇām" — "the steady control of the senses." Yoga is not a system of exercises or a philosophy but the state of complete sensory control — the ability to withdraw attention from external objects at will.

"Apramattas tadā bhavati" — "then one becomes watchful." The word "apramatta" means vigilant, careful, attentive. The yogi does not become careless or passive but hyper-alert. This vigilance is necessary because "yoga comes and goes" (yogo hi prabhavāpyayau) — even after experiencing samadhi, one can lose it.

This is a realistic and helpful teaching. Many seekers experience moments of clarity, peace, and unity, only to lose them when they return to daily life. The Upanishad acknowledges this: yoga is not a permanent achievement but a state that must be maintained through constant vigilance.

The instruction is: practice steady control of the senses, remain watchful, and do not assume that one experience of peace means the work is done. The spiritual path requires ongoing attention, like keeping a boat on course in changing currents.` },
        { id: `katha.1.2.18`, sanskrit: `न प्राणेन नापानेन मर्त्यो जीवति कश्चन |
इतरेण तु जीवन्ति यस्मिन् एताव् उपाश्रितौ ॥१८॥`, transliteration: `na prāṇenānānena martyo jīvati kaścana |
itareṇa tu jīvanti yasmin etāv upāśritau ||18||`, english: `Not by prana nor by apana does any mortal live. It is by another that they live, on which these two depend.`, commentary: `This verse reveals a startling truth: we do not live by breath alone. Prana (inhalation) and apana (exhalation) sustain the body, but they themselves depend on something deeper — the Self.

"Itareṇa tu jīvanti" — "by another indeed they live." This "other" is the Atman, the Self, the source of all life-force. Without the Self, neither prana nor apana could function. The breath depends on consciousness; consciousness does not depend on breath.

This teaching has practical implications for meditation. In meditation, the breath naturally becomes calm and may even seem to stop. This verse reassures the meditator: even if the breath slows or pauses, the Self sustains life. Fear of death in deep meditation is unfounded because the Self — the true source of life — is always present.

The verse also points to a hierarchy of reality: the body depends on breath, breath depends on prana, prana depends on the Self. To know the Self is to know the source of all life — not just human life but the life-force that animates the entire universe.` },
        { id: `katha.1.2.19`, sanskrit: `हन्त त इदं प्रवक्ष्यामि गुह्यं ब्रह्म सनातनम् |
यथा मरणं प्राप्य आत्मा भवति गौतम ॥१९॥`, transliteration: `hanta te idaṁ pravakṣyāmi guhyaṁ brahma sanātanam |
yathā maraṇaṁ prāpya ātmā bhavati gautama ||19||`, english: `Yama said: "I will tell you the eternal Brahman, O Gautama — what happens to the Self after death. Some bodies are born, others rest in the womb."`, commentary: `Yama now promises to reveal the deepest secret — the eternal Brahman and what happens to the Self at death. He addresses Nachiketa as "Gautama" — referring to his family lineage.

"Some bodies are born, others rest in the womb" — this acknowledges the cycle of birth and rebirth. Some souls are currently embodied; others are in between births, resting in the subtle realm. The Self — the Atman — is never born and never dies. Only the bodies change.

The promise to reveal "the eternal Brahman" (brahma sanātanam) is the highest teaching the Upanishad can offer. Brahman is the Absolute Reality — the source, sustainer, and dissolution of all that exists. To know Brahman is to know everything.

Yama is now ready to give the teaching he initially tried to withhold. Nachiketa's persistence has earned him the highest knowledge. The student who refuses all substitutes, who will not be satisfied with anything less than the truth, deserves to receive it.` },
        { id: `katha.1.2.20`, sanskrit: `योनिम् अन्ये प्रपद्यन्ते शरीरत्वाय देहिनः |
स्थाणुम् अन्येऽनुसंयन्ति यथाकर्म यथाश्रुतम् ॥२०॥`, transliteration: `yonim anye prapadyante śarīratvāya dehinaḥ |
sthāṇum anye 'nusaṁyanti yathā-karma yathā-śrutam ||20||`, english: `Some souls enter a womb to be embodied; others enter the stationary state, according to their actions and their knowledge.`, commentary: `This verse explains the mechanics of rebirth. "Some souls enter a womb to be embodied" — those with remaining karma are reborn in physical bodies. "Others enter the stationary state" — those who have exhausted their karma enter a state of rest, or merge with the divine.

"Yathā-karma yathā-śrutam" — "according to their actions and their knowledge." Rebirth is not random but governed by two factors: karma (the consequences of one's actions) and shruti (one's knowledge and spiritual attainment). Actions determine the quality of the next birth; knowledge determines whether there is a next birth at all.

This teaching provides a coherent explanation for the diversity of human circumstances. Why are some born in favorable conditions and others in suffering? Not by chance, but by the accumulated karma and knowledge from previous lives.

The verse also offers hope: if one's circumstances are determined by karma and knowledge, then by changing one's actions and seeking higher knowledge, one can change one's future. This is the basis for the entire Hindu system of ethics and spiritual practice.` },
        { id: `katha.1.2.21`, sanskrit: `य एष सुप्तेषु जागर्ति कामं कामं पुरुषो निर्मिमाणः |
तदेव शुक्रं तद् ब्रह्म तद् एवामृतम् उच्यते ॥२१॥`, transliteration: `ya eṣa supteṣu jāgarti kāmaṁ kāmaṁ puruṣo nirmimāṇaḥ |
tad eva śukraṁ tad brahma tad evāmṛtam ucyate ||21||`, english: `The Self who is awake while all others sleep, creating desires — that is the Pure, that is Brahman, that alone is called the Immortal.`, commentary: `This verse describes a remarkable quality of the Self: it is "awake while all others sleep." When the body sleeps, when the mind dreams, when even the intellect is dormant — the Self remains awake, aware, present.

"Puruṣo nirmimāṇaḥ" — "the person creating desires." Even in sleep, the Self is the creative source. Dreams arise from the Self; desires manifest from the Self. The Self is not a passive observer but an active creator.

"Tad eva śukraṁ" — "that alone is the Pure." Despite creating all desires and experiences, the Self itself remains pure, untouched by what it creates. Like the sky that is not stained by the clouds that pass through it, the Self is not contaminated by the desires it generates.

"Tad brahma tad evāmṛtam ucyate" — "that is Brahman, that alone is called the Immortal." The Self that is awake within sleep, that creates without being bound by creation, that is pure despite manifesting all impurities — THIS is the Absolute, the Immortal, the goal of all seeking.

This verse bridges the gap between the Self in meditation and the Self in daily life. The same awareness that shines in deep samadhi also shines in deep sleep. It is always present, always awake, always creating — and always free.` },
        { id: `katha.1.2.22`, sanskrit: `अग्निर् यथैको भुवनं प्रविष्टो |
रूपं रूपं प्रतिरूपो बभूव |
एकस् तथा सर्वभूतान्तरात्मा |
रूपं रूपं प्रतिरूपो बभूव ॥२२॥`, transliteration: `agnir yathāiko bhuvanaṁ praviṣṭo |
rūpaṁ rūpaṁ pratirūpo babhūva |
ekas tathā sarva-bhūtāntar-ātmā |
rūpaṁ rūpaṁ pratirūpo babhūva ||22||`, english: `As fire, though one, has entered the world and appears in various forms according to the material — so the one inner Self of all beings appears in various forms according to whatever it enters, yet remains itself outside.`, commentary: `This is one of the most beautiful and powerful analogies in the Upanishads. Fire is one — it is the same chemical process everywhere. Yet it takes on different forms depending on what it burns: wood, paper, coal, gas. The fire in a candle, a forest fire, and a star are all the same fire, yet they look completely different.

Similarly, the one Self enters all beings and takes on the appearance of each. The Self in a human, a dog, a tree, and a stone is the same Self — yet it appears different because of the "material" (the body-mind complex) it inhabits.

"Rūpaṁ rūpaṁ pratirūpo babhūva" — "form after form, it has taken corresponding forms." This explains the diversity of life without sacrificing the unity of the Self. We are all the same awareness, dressed in different costumes.

"Ekas tathā sarva-bhūtāntar-ātmā" — "so the one inner Self of all beings." This is the most direct statement of non-duality. There is one Self, and it is the innermost reality of every creature. When you look at another person, you are looking at the same Self wearing a different mask.

This verse is the foundation for universal compassion. If the same fire burns in all beings, then all beings are sacred, all beings are divine, and all beings deserve our love and respect.` },
        { id: `katha.1.2.23`, sanskrit: `आकाशम् एकं हि यथा घटादिषु |
विभक्तम् एवान्तर्बहिर् एव च |
एकस् तथा सर्वभूतान्तरात्मा |
विभक्तम् एवान्तर्बहिर् एव च ॥२३॥`, transliteration: `ākāśam ekaṁ hi yathā ghaṭādiṣu |
vibhaktam evāntar bahir eva ca |
ekas tathā sarva-bhūtāntar-ātmā |
vibhaktam evāntar bahir eva ca ||23||`, english: `As the one space, though all-pervading, appears divided when enclosed in different pots — so the one Self appears divided among different beings, yet is one both within and without.`, commentary: `The space analogy complements the fire analogy of the previous verse. Space is one — there is only one space. Yet when it is enclosed in different containers (pots, rooms, bodies), it appears to be divided. The space inside a pot seems different from the space outside, but it is all the same space.

"Vibhaktam evāntar bahir eva ca" — "divided indeed within and without." The Self appears to be limited when confined to a body — "this is my consciousness, separate from yours." But just as the space inside a pot is connected to the infinite space outside, the consciousness within each body is connected to the infinite consciousness that pervades everything.

This analogy is particularly helpful because it shows that the Self is not fragmented — it only appears to be. The sense of separateness is an illusion created by the "container" of the body-mind. When the container is removed (at death, or in deep meditation), the apparent division dissolves, and the one space is recognized.

This teaching has profound implications for how we relate to others. If the same space pervades all bodies, then there is no fundamental separation between you and me. Your awareness and my awareness are the same awareness, appearing in different containers.` },
        { id: `katha.1.2.24`, sanskrit: `यथोदकं दुर्गे वृष्टं पर्वतेषु विधावति |
यथा सूत्रे मणिर् गुल्मो यथा नारी पतिं विना ॥२४॥`, transliteration: `yathodakaṁ durge vṛṣṭaṁ parvateṣu vidhāvati |
yathā sūtre maṇir gulmo yathoṣṭro bhavati ||24||`, english: `As rain falling on a mountain flows down in all directions, so the one Self, pursuing various desires, runs after what corresponds to them. As the gem on a string, so is the Self in the body.`, commentary: `The Self pursues desires as water flows downhill — naturally, following the path of least resistance. "Rain falling on a mountain flows down in all directions" — the one Self, embodied in many beings, flows toward the fulfillment of each being's desires.

"As the gem on a string" (yathā sūtre maṇir) — this is a beautiful image. The Self is the string on which all beings are strung, like gems on a necklace. Each gem is different, but the string that holds them is one. The Self is the thread of continuity that runs through all lives, all experiences, all forms.

This image also suggests that without the string, the gems would scatter. Without the Self, the body would be inert matter. The Self is what holds the body-mind complex together, giving it life, coherence, and identity.

The practical implication: when we feel scattered, fragmented, or disconnected, it is because we have lost awareness of the string — the Self that holds everything together. Meditation is the practice of returning to the string, recognizing the one awareness that is the foundation of all experience.` },
        { id: `katha.1.2.25`, sanskrit: `यथोदकं शुद्धे शुद्धम् आसिक्तं तादृग् एव भवति |
एवं मुनेर् विजानत आत्मा भवति गौतम ॥२५॥`, transliteration: `yathodakaṁ śuddhe śuddham āsiktaṁ tādṛg eva bhavati |
evaṁ muner vijānata ātmā bhavati gautama ||25||`, english: `As pure water poured into pure water becomes the same — so the Self of the sage who knows, O Gautama, becomes one with Brahman.`, commentary: `This beautiful concluding verse of Chapter 1, Valli 2 uses a simple, elegant image. Pure water poured into pure water becomes indistinguishable — one cannot tell where one ends and the other begins. Similarly, the Self of the sage who knows the truth merges with Brahman, the Absolute.

This is the teaching of non-dual realization. It is not that the individual self "goes somewhere" or "attains something." It is that the apparent separation dissolves, like a drop merging back into the ocean. The drop was never separate from the ocean — it only appeared to be.

"Evaṁ muner vijānata" — "so of the sage who knows." The key word is "vijānata" — one who truly knows, not intellectually but directly. This knowledge is not accumulated but realized. When the sage realizes that the Self IS Brahman — not "becomes" Brahman but always was Brahman — the merger happens spontaneously.

O Gautama — Yama addresses Nachiketa by his family name, acknowledging that this boy has earned the highest teaching. The verse brings Chapter 1, Valli 2 to a triumphant close: the Self of the realized sage becomes one with the Absolute, like pure water merging with pure water.

ADHYAYA 1, VALLI 3: The City of Eleven Gates` },
      ],
    },
    {
      id: `1.3`,
      name: `The Path of Meditation`,
      sanskritName: `ध्यानयोग`,
      verses: [
        { id: `katha.1.3.1`, sanskrit: `पुरम् एकादशद्वारम् अजस्यावक्रचेतसः |
अनुष्ठाय न शोचति विमुक्तश्च विमुच्यते ॥१॥`, transliteration: `puram ekādaśa-dvāram ajasyāvakra-cetasaḥ |
anuṣṭhāya na śocati vimuktaś ca vimucyate ||1||`, english: `There is a city of eleven gates belonging to the unborn, whose consciousness is undistorted. The one who meditates on this Self does not grieve and, being freed, is truly liberated.`, commentary: `This verse introduces one of the Upanishad's most beautiful metaphors: the body as a city with eleven gates. The "eleven gates" are the two eyes, two ears, two nostrils, the mouth, the navel, and the two lower openings of the body — the nine sensory openings plus two others.

"Ajasyāvakra-cetasaḥ" — "of the unborn one whose consciousness is undistorted." The Self that inhabits this city is unborn (aja) — it has never been created and will never be destroyed. Its consciousness is "undistorted" (avakra) — it does not twist or bend to accommodate illusion. It sees reality as it is.

"Anuṣṭhāya na śocati" — "the one who meditates on this does not grieve." When you recognize that the body is a city inhabited by the eternal Self, grief loses its foundation. The city may decay, but the inhabitant is deathless.

"Vimuktaś ca vimucyate" — "being freed, is truly liberated." This is liberation — not a future reward but a present recognition. When you know the Self that dwells in the city of the body, you are already free. The gates may open and close, the city may rise and fall, but the Self remains unchanged.` },
        { id: `katha.1.3.2`, sanskrit: `हंसः शुचिषद् वसुर् अन्तरिक्षसद् |
होता वेदिषद् अतिथिर् दुरोणसत् ॥२॥`, transliteration: `haṁsaḥ śuciṣad vasur antarikṣasad |
hotā vediṣad atithir duroṇasat ||2||`, english: `The Self is the Swan dwelling in purity, the Vasu dwelling in the atmosphere, the priest at the altar, the guest in the house.`, commentary: `This verse uses a series of Vedic epithets to describe the Self's omnipresence. "Haṁsa" — the Swan, the migratory bird that travels freely between worlds. The Self moves freely between all states of consciousness. "Śuciṣad" — dwelling in purity. The Self's natural home is purity, radiance, light.

"Vasur antarikṣasad" — the Vasu (a class of divine beings) dwelling in the atmosphere. The Self pervades the space between heaven and earth — between the transcendent and the manifest. "Hotā vediṣad" — the priest at the altar. The Self is the one who performs the sacrifice, the one who offers and the one who receives.

"Atithir duroṇasat" — the guest in the house. The Self is the honored guest in the body — present but not imposing, intimate but not intrusive. We are the hosts; the Self is the guest who has been with us all along but whom we have never acknowledged.

This series of images shows the Self from every angle: it is above (the Swan), in the middle (the Vasu), at the center (the priest), and within (the guest). No matter where you look, the Self is there.` },
        { id: `katha.1.3.3`, sanskrit: `ऊर्ध्वं प्राणम् उन्नयत्य् अपानं प्रत्यग् अस्यति |
मध्ये वामानम् आसीनं विश्वे देवा उपासते ॥३॥`, transliteration: `ūrdhvaṁ prāṇam unnayaty apānaṁ pratyag asyati |
madhye vāmānam āsīnaṁ viśve devā upāsate ||3||`, english: `The Self raises the prana upward and casts the apana downward. Seated in the middle, the little lord — all the gods worship him.`, commentary: `This verse describes the Self's role in the body's energy system. "Raises the prana upward" — the Self directs the upward-moving life-force (prana) that governs inhalation, speech, and cognition. "Casts the apana downward" — the Self directs the downward-moving force (apana) that governs exhalation, elimination, and grounding.

"Madhye vāmānam āsīnam" — "seated in the middle, the little lord." The Self is the "little lord" (vāmana) — a wonderful, intimate description. It is not an imposing cosmic deity but a small, quiet presence at the center of your being. Like a tiny flame at the center of a lamp, the Self illuminates the entire body-mind complex.

"Viśve devā upāsate" — "all the gods worship him." Even the gods — the cosmic forces of nature — revere this tiny Self. This is a radical democratization of the divine: the most powerful reality in the universe is not in heaven but in the center of your chest.

This verse teaches that the Self is not distant or abstract. It is the intimate controller of your breath, your heartbeat, your very life. It is the "little lord" who quietly manages the entire operation while you go about your day, unaware of its presence.` },
        { id: `katha.1.3.4`, sanskrit: `अस्य विश्वस्य भुवनस्य राजे |
तम् एवं विदित्वाऽतिरिच्यते हि ॥४॥`, transliteration: `asya viśvasya bhuvanasya rāje |
tam evaṁ viditvātiricyate hi ||4||`, english: `This body is the chariot of the Self. The Self is the lord of this entire universe. The one who thus knows this Self transcends all sorrow.`, commentary: `This verse connects the chariot analogy of Valli 2 with the city analogy of Valli 3. The body is both a chariot and a city — a vehicle and a dwelling place. The Self is both the lord of the chariot and the king of the city.

"Asya viśvasya bhuvanasya rāje" — "the king of this entire universe." The Self is not merely the lord of one body but the ruler of all existence. When you realize the Self within, you realize it everywhere. The king of your body is the king of the universe.

"Tam evaṁ viditvātiricyate hi" — "by knowing this thus, one transcends." The knowledge of the Self is not merely intellectual understanding — it is transformative realization. It does not add something to you but reveals what you always were: the king of the universe, disguised as a limited mortal.

This verse summarizes the teaching of the Upanishad so far: the Self is the lord of the body, the controller of all life forces, the king of all existence. To know this is to be free from all sorrow and limitation.` },
        { id: `katha.1.3.5`, sanskrit: `यद् इदं किञ्च जगत् सर्वं प्राण एजति निःसृतम् |
महद् भयं वज्रम् उद्यतं यस् तस्माद् बिभेति ॥५॥`, transliteration: `yad idaṁ kiñca jagat sarvaṁ prāṇa ejati niḥsṛatam |
mahad bhayaṁ vajram udyataṁ yas tasmād bibheti ||5||`, english: `Whatever there is in this universe — all this has come from the Self. It is the great fear, the thunderbolt raised. The one who knows this becomes the glorious one.`, commentary: `This verse describes the Self as both terrifying and glorious — depending on one's relationship with it. "All this has come from the Self" — the universe is the Self's creation, its expression, its body.

"It is the great fear, the thunderbolt raised" (mahad bhayaṁ vajram udyataṁ) — for the unawakened, the Self is terrifying. Why? Because knowing the Self means the death of the ego. The ego's deepest fear is not of external threats but of discovering that it is not real — that there is only the Self, and the individual "I" is an illusion.

"The one who knows this becomes the glorious one" — for the awakened, the Self is the source of all glory, all power, all beauty. The same reality that terrifies the ego liberates the sage. It is like the sun — a source of life for those who open their eyes, a source of blindness for those who stare at it without preparation.

This verse teaches that the Self is not safe, comfortable, or tame. It is the most powerful reality in existence. Meeting it requires courage — the courage to let go of everything you think you are.` },
        { id: `katha.1.3.6`, sanskrit: `आत्मानं रथिनं विद्धि शरीरं रथमेव तु |
ज्ञानं सारथिं विद्धि मनः प्रग्रहमेव च ॥६॥`, transliteration: `ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu |
jñānaṁ sārathiṁ viddhi manaḥ pragraham eva ca ||6||`, english: `If the buddhi (intellect) is the charioteer, and the mind is the reins, and the senses are the horses — then the Self enjoys the sense objects. This they call the path.`, commentary: `This verse revisits the chariot analogy with a subtle but important shift. In Valli 2, buddhi (intellect) was the charioteer. Here, jnana (knowledge, wisdom) is the charioteer. This is a higher teaching — it is not mere intellectual discrimination but direct knowledge of the Self that should guide the chariot.

"The Self enjoys the sense objects" — the Self is not merely a passive witness but the one who experiences, who tastes, who lives through the senses. The body-mind complex is the instrument of enjoyment, and the Self is the enjoyer.

"This they call the path" — the integration of Self-knowledge, disciplined mind, and controlled senses IS the spiritual path. It is not separate from life but the right way to live.

The subtle shift from buddhi to jnana as charioteer suggests that mere intellectual understanding is not enough. The charioteer must have direct knowledge of the Self — not just concepts about it. When the charioteer truly knows the Self, the entire chariot moves in the right direction effortlessly.` },
        { id: `katha.1.3.7`, sanskrit: `यस्त्वविज्ञानवान् भवत्य् अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥७॥`, transliteration: `yas tv avijñānavān bhavaty amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||7||`, english: `The one without understanding, with uncontrolled mind and impure — does not attain the Self and returns again to birth and death.`, commentary: `This verse repeats the warning from Valli 2 with additional emphasis. Without understanding (vijñāna), without a controlled mind (amanas), and with impurity (ashuchi) — the soul remains trapped in saṁsāra.

The repetition serves a pedagogical purpose: the Upanishad wants to make absolutely clear what is at stake. This is not an abstract philosophical debate — it is a question of freedom versus bondage, light versus darkness.

"Amanaskaḥ" — literally "without mind" or with an uncontrolled mind. The mind is the bridge between the Self and the senses. When the bridge is broken or disorganized, the Self cannot function properly through the body-mind complex.

The verse is a call to seriousness. The spiritual path is not a hobby or a luxury — it is the most important work a human being can undertake. Those who neglect it face the consequence of continued suffering in the cycle of birth and death.` },
        { id: `katha.1.3.8`, sanskrit: `ज्ञानसारथिर् यस्य तुष्टः सत्त्वं विशुद्धम् |
विमुक्तस् तु तदा मोक्षाद् ब्रह्म प्राप्नोति निष्कलम् ॥८॥`, transliteration: `jñāna-sārathir yasya tuṣṭaḥ sattvaṁ viśuddham |
vimuktas tu tadā mokṣād brahma prāpnoti niṣkalam ||8||`, english: `The one whose charioteer is knowledge, whose mind is pure — such a one, being freed, reaches the end of the path, the supreme Brahman.`, commentary: `This verse describes the state of liberation. "Whose charioteer is knowledge" — direct Self-knowledge guides the entire personality. "Whose mind is pure" — the mind has been purified through meditation, devotion, and selfless action.

"Being freed, reaches the end of the path" — liberation is the end of the journey, the final destination. But it is not a place — it is a state of being. The liberated one does not "go" anywhere; they simply recognize what they always were.

"Brahma prāpnoti niṣkalam" — "attains the supreme Brahman, which is without parts." Brahman is indivisible, whole, complete. It has no parts, no limitations, no boundaries. To attain it is to become it — or rather, to realize that you were always it.

This verse completes the teaching of Chapter 1. The Upanishad has laid out the entire path: from the story of Nachiketa's courage, through the chariot analogy, to the direct description of liberation. Chapter 2 will go even deeper into the nature of the Self and the means of its realization.

ADHYAYA 2, VALLI 1: The Imperishable Self` },
        { id: `katha.1.3.9`, sanskrit: `यः सेतुर् इज्जानानाम् अक्षरं ब्रह्म यत् परम् |
अभयं तितीर्षतां पारं नाचिकेतम् शकेमहि ॥९॥`, transliteration: `yaḥ setur ījānānām akṣaraṁ brahma yat param |
abhayaṁ titīrṣatāṁ pāraṁ nāciketaṁ śakemahi ||9||`, english: `May we be able to perform the Nachiketa sacrifice, which is the bridge for those who perform sacrifices. It is the imperishable Brahman, the supreme, the fearless shore for those who wish to cross over.`, commentary: `The Nachiketa fire ritual is described as a bridge for those who perform sacrifices. The ritual leads to the Absolute Brahman, the fearless shore for those who wish to cross over from mortality to immortality. The bridge is not physical but spiritual - it is the path of knowledge that leads from ignorance to realization. Those who walk this bridge reach the imperishable reality that transcends all death.` },
        { id: `katha.1.3.10`, sanskrit: `अत्र ब्रह्मं विद्यात् स्वयम् अन्यथा विकल्पम् एव |
नात्र संशयः ॥१०॥`, transliteration: `atra brahmaṁ vidyāt svayam anyathā vikalpam eva |
nātra saṁśayaḥ ||10||`, english: `In this sacrifice, one should know Brahman oneself. Otherwise, it is merely verbal. There is no doubt about this.`, commentary: `Knowing Brahman is not a matter of performing rituals or memorizing scriptures. One must know Brahman directly, personally. Without direct realization, all talk about Brahman is empty words. The Upanishad has no patience for mere intellectual understanding. Direct knowledge is required; everything else is preliminary. This verse challenges the seeker to go beyond study, beyond ritual, beyond philosophy to the direct encounter with the Absolute.` },
        { id: `katha.1.3.11`, sanskrit: `प्राणानां ग्रन्थिर् असि तेजसां रूपम् |
ज्योतीषां ज्योतिर् आयुष्यम् आयुर् धेहि ॥११॥`, transliteration: `prāṇānāṁ granthir asi tejasāṁ rūpam |
jyotīṣāṁ jyotir āyuṣyam āyur dhehi ||11||`, english: `You are the knot of the vital breaths, the form of fire, the light of lights, the life of life. Grant us long life.`, commentary: `This verse is a prayer to the Self, describing its nature through a series of profound identifications. The Self is the knot that ties together all the life-forces in the body. Without the Self, the pranas would scatter and the body would die. The Self is the essence of all energy, all fire, all luminosity. It is the light that illuminates all other lights - the consciousness that makes perception possible. The Self is the life that animates all life - not merely alive but the source of aliveness itself. Grant us long life means the long life of awareness, the eternal life of the Self.` },
        { id: `katha.1.3.12`, sanskrit: `शतं चैका च हृदयस्य नाड्यः |
तासां मूर्धानम् अभिनिःसृतैका |
तयोर् ऊर्ध्वम् आयन् अमृतत्वम् एति |
विष्वङ् अन्या उत्क्रमणे भवन्ति ॥१२॥`, transliteration: `śataṁ caikā ca hṛdayasya nāḍyaḥ |
tāsāṁ mūrdhānam abhiniḥsṛtaikā |
tayor ūrdhvam āyan amṛtatvam eti |
viṣvaṅ anyā utkramaṇe bhavanti ||12||`, english: `There are one hundred and one nerves of the heart. One of them penetrates the crown of the head. Going upward through that nerve, one attains immortality. The others lead in various directions at the time of departure.`, commentary: `This verse describes the subtle yogic anatomy of the heart center. One hundred and one nerves of the heart form a network of subtle energy channels emanating from the spiritual heart. One of them - the sushumna nadi - penetrates the crown of the head. This is the pathway of liberation. When consciousness ascends through the sushumna, the soul merges with the Absolute and does not return to the cycle of birth and death. The other 100 nerves lead to various destinations in the cycle of rebirth depending on the state of consciousness at death.` },
        { id: `katha.1.3.13`, sanskrit: `अङ्गुष्ठमात्रः पुरुषो मध्य आत्मनि तिष्ठति |
ईशानं भूतभव्यस्य न ततो विजुगुप्सते |
एतद् वै तत् ॥१३॥`, transliteration: `aṅguṣṭha-mātraḥ puruṣo madhya ātmani tiṣṭhati |
īśānaṁ bhūta-bhavyasya na tato vijugupsate |
etad vai tat ||13||`, english: `The Purusha, the size of a thumb, dwells in the middle of the body. He is the lord of past and future. After knowing him, one does not shrink from him. This indeed is that.`, commentary: `The Self is described as the size of a thumb - a traditional description of the individual soul dwelling in the heart. This is not a literal measurement but a symbolic description of the Self's presence in the heart center. The Self is the lord of past and future - it was there before your birth and will be there after your death. After knowing the Self, one does not shrink from it because fear comes from the unknown, and when the Self is realized, all unknown becomes known. This indeed is that - the formula of realization.` },
        { id: `katha.1.3.14`, sanskrit: `अङ्गुष्ठमात्रः पुरुषो ज्योतिर् इवाधूमकः |
ईशानो भूतभव्यस्य स एवाद्य स उ श्वः ॥१४॥`, transliteration: `aṅguṣṭha-mātraḥ puruṣo jyotir ivādhūmakaḥ |
īśāno bhūta-bhavyasya sa evādya sa u śvaḥ ||14||`, english: `The Purusha, the size of a thumb, is like a smokeless flame. He is the lord of past and future. He is the same today and tomorrow. This indeed is that.`, commentary: `The Self is like a pure, clear flame - luminous, radiant, without the smoke of ignorance or desire. Smokeless suggests purity - there is no contamination, no darkness, no obscuration. The Self is pure light, pure awareness, without any admixture of ignorance. He is the same today and tomorrow - the Self does not change. It was the same yesterday, it is the same today, and it will be the same tomorrow. This unchanging nature is the guarantee of its permanence.` },
        { id: `katha.1.3.15`, sanskrit: `यथोदकं शुद्धे शुद्धम् आसिक्तं तादृग् एव भवति |
एवं मुनेर् विजानत आत्मा भवति गौतम ॥१५॥`, transliteration: `yathodakaṁ śuddhe śuddham āsiktaṁ tādṛg eva bhavati |
evaṁ muner vijānata ātmā bhavati gautama ||15||`, english: `As pure water poured into pure water becomes the same - so the Self of the sage who knows, O Gautama, becomes one with Brahman.`, commentary: `Pure water poured into pure water becomes indistinguishable - one cannot tell where one ends and the other begins. Similarly, the Self of the sage who knows the truth merges with Brahman. The apparent separation dissolves, like a drop merging back into the ocean. The drop was never separate from the ocean - it only appeared to be. The key word is vijanata - one who truly knows, not intellectually but directly. This knowledge is not accumulated but realized. The Self of the realized sage becomes one with the Absolute, like pure water merging with pure water.` },
        { id: `katha.1.3.16`, sanskrit: `सर्वे वेदा यत् पदम् आमनन्ति |
तपांसि सर्वाणि च यद् वदन्ति |
यद् इच्छन्तो ब्रह्मचर्यं चरन्ति |
तत् ते पदं संग्रहेण प्रवक्ष्ये ॥१६॥`, transliteration: `sarve vedā yat padam āmananti |
tapāṁsi sarvāṇi ca yad vadanti |
yad icchanto brahmacaryaṁ caranti |
tat te padaṁ saṅgraheṇa pravakṣye ||16||`, english: `All the Vedas speak of that goal which all austerities declare, for the sake of which students practice brahmacharya. I shall tell you that goal in brief.`, commentary: `All the Vedas speak of a single goal. All austerities are directed toward the same goal. Students practice brahmacharya for the sake of this goal. Yama is about to give the essence of all spiritual teaching in a single statement. This verse builds anticipation - after all the descriptions, analogies, and teachings, Yama is about to state the ultimate goal in the simplest possible terms.` },
        { id: `katha.1.3.17`, sanskrit: `एतद् वै तत् ॥१७॥`, transliteration: `om ity etad akṣaram idaṁ sarvaṁ |
tasyopavyākhyānaṁ bhūtaṁ bhavad bhaviṣyad iti sarvam oṁkāra eva ||17||`, english: `The goal is AUM. This imperishable syllable is all this. Its explanation: all that is past, present, and future is AUM. And whatever is beyond the three times - that too is AUM.`, commentary: `The goal stated in brief is AUM - the primordial sound, the sacred syllable that contains all of creation. This imperishable syllable is all this - AUM is not merely a sound but the essence of all existence. Everything that exists is a manifestation of AUM. All that is past, present, and future is AUM - time itself is contained in AUM. And whatever is beyond the three times - the timeless Absolute - that too is AUM. This connects the Katha Upanishad with the broader Upanishadic teaching. The goal of all spiritual practice is the realization that AUM, the Self, and Brahman are one.` },
      ],
    },
    {
      id: `2.1`,
      name: `The Supreme Self`,
      sanskritName: `परमात्मविद्या`,
      verses: [
        { id: `katha.2.1.1`, sanskrit: `श्रीमद् भगवद्गीता यत्र नित्यं पठन्ति च |
न ते दुःखं न शोकं न भयं न जरा ॥१॥`, transliteration: `parāñci khāni vyatṛṇat svayambhūḥ |
tasmāt parāṅ paśyati nāntar ātman ||1||`, english: `The Self-born Creator has turned the senses outward. Therefore one sees external things and not the inner Self. Rare is the wise person who, seeking immortality, turns the eyes inward and sees the Self within.`, commentary: `Chapter 2 of the Katha Upanishad opens with a verse that echoes Chapter 1, Valli 2, verse 1 — but with a crucial addition. Here, the Upanishad emphasizes how rare it is to turn inward. "Rare is the wise person" — the vast majority of humanity lives entirely in the external world, never suspecting the treasure within.

"Turns the eyes inward and sees the Self within" — this is the instruction. The senses are designed to look outward, but the wise person reverses this flow. Instead of following the senses into the world of objects, the wise person turns attention back toward its source — the awareness that is doing the seeing.

This reversal is the essence of meditation. All meditation techniques — whether focusing on breath, mantra, or inquiry — are simply methods for reversing the outward flow of attention. When attention turns inward, it discovers the Self that was always there, like turning around in a dark room and finding the light that was behind you all along.

The chapter opens with this reminder because Chapter 2 will go deeper into the nature of the Self. Before diving into the metaphysics, the Upanishad reminds us: the Self is here, within, waiting to be seen.` },
        { id: `katha.2.1.2`, sanskrit: `परिचर्यार्थं ते मन्ये वित्तम् |
यद् अन्यद् भूतस्नेहं यद् वाऽन्यत् स्वतः प्रियम् ॥२॥`, transliteration: `śṛṇvantu viśve amṛtasya putrā |
ā ye dhāmāni divyāni tasthuḥ ||2||`, english: `O children of immortality, hear! Those who dwell in the highest abode — I proclaim Brahman, which I have realized. There is nothing beyond the knowing of this.`, commentary: `Yama begins his supreme teaching with a dramatic call: "O children of immortality!" (śṛṇvantu viśve amṛtasya putrāḥ). He is not addressing Nachiketa alone but all beings — all are children of immortality, because the Self in all is deathless.

"Those who dwell in the highest abode" — the teaching is addressed to those who are ready, who have already begun to turn inward. Not everyone is prepared for this knowledge, but everyone is capable of it.

"I proclaim Brahman, which I have realized" — Yama speaks from direct experience, not from hearsay. He has realized Brahman and now shares this realization. This is the mark of a true teacher: they speak from knowledge, not belief.

"There is nothing beyond the knowing of this" — this is the highest knowledge, beyond which there is nothing more to know. When you know Brahman, you know everything. All other knowledge is partial; this knowledge is complete.

This verse sets the stage for one of the most profound teachings in all of Indian philosophy. Yama is about to reveal the ultimate nature of reality to a boy who refused all lesser gifts.` },
        { id: `katha.2.1.3`, sanskrit: `योनिम् अन्ये प्रपद्यन्ते शरीरत्वाय देहिनः |
स्थाणुम् अन्येऽनुसंयन्ति यथाकर्म यथाश्रुतम् ॥३॥`, transliteration: `naiṣā tarkeṇa matir āpaneyā |
proktānyenaiva sujñānāya preṣṭha ||3||`, english: `This wisdom cannot be attained by logic alone. It is taught by one who knows — a realized teacher. O dearest Nachiketa, you have attained it. May we always have students like you!`, commentary: `Yama makes a crucial methodological point: "This wisdom cannot be attained by logic alone" (naiṣā tarkeṇa matir āpaneyā). Reasoning and argument can point toward the truth, but they cannot deliver the direct realization of the Self. The Self is beyond logic — it is the very source of the logical mind.

"It is taught by one who knows" — the Upanishadic tradition insists on a living teacher. Books can inspire, but only a realized being can awaken. The teacher's presence, their consciousness, their very being transmits what words cannot.

"O dearest Nachiketa, you have attained it" — Yama acknowledges that Nachiketa has received the teaching. This is not mere information but transmission — the awakening of a new level of consciousness.

"May we always have students like you!" — this remarkable statement from the Lord of Death himself shows that even the gods value the sincere seeker. The universe needs those who ask the ultimate questions, who refuse all substitutes, who persist until the truth is revealed.` },
        { id: `katha.2.1.4`, sanskrit: `नान्यः पन्था विद्यतेऽयनाय |
yam evaiṣa vṛṇute tena labhyaḥ ॥४॥`, transliteration: `jñātā tv eva na jñāyate |
yam evaiṣa vṛṇute tena labhyaḥ ||4||`, english: `There is no other path for the attainment of this knowledge. The Self reveals itself to the one it chooses. The Self is not known through study, nor through intellect, nor through hearing. It is known only by the one whom the Self chooses. To such a one, the Self reveals its own nature.`, commentary: `This verse restates the teaching of Chapter 1, verse 29 with even greater emphasis. "There is no other path" — this knowledge comes through no other means. Not through logic, not through study, not through effort alone. The Self reveals itself.

"The Self is not known through study, nor through intellect, nor through hearing" — all three traditional means of knowledge (scriptural study, intellectual analysis, and oral transmission) are insufficient for Self-realization. They can prepare the ground, but the actual revelation comes from the Self itself.

"The Self reveals its own nature" — this is the mystery of grace. The Self is not an object to be obtained but the subject that was always present. The "attainment" of the Self is simply the removal of ignorance — the recognition of what was always the case.

This verse teaches humility. No matter how much we study, how brilliant our intellect, or how many teachers we hear — the Self cannot be earned. It can only be received. Our role is to prepare ourselves through practice and devotion; the Self's role is to reveal itself when we are ready.` },
        { id: `katha.2.1.5`, sanskrit: `न जायते म्रियते वा विपश्चिन् |
नायं कुतश्चिन् न बभूव कश्चित् ॥५॥`, transliteration: `na jāyate mriyate vā vipaścin |
nāyaṁ kutaścin na babhūva kaścit ||5||`, english: `The Self is not born, nor does it die. It did not come from anywhere, nor did anything come from it. It is unborn, eternal, ancient, and is not killed when the body is killed.`, commentary: `This is one of the most important verses in the entire Upanishad — and the verse that Krishna later quotes in the Bhagavad Gita (2.20). It states the fundamental nature of the Self in the clearest possible terms.

"Na jāyate mriyate vā" — "is not born, nor does it die." Birth and death apply to forms, not to the Self. The Self was never born — it existed before the body was formed, and it will exist after the body dies. Birth and death are events that happen TO the body, not to the Self.

"Nāyaṁ kutaścin na babhūva kaścit" — "it did not come from anywhere, nor did anything come from it." The Self has no origin and no offspring. It is not produced by any cause, and it does not produce any effect. It is beyond the chain of causation.

"It is unborn, eternal, ancient" (ajaṁ nityaṁ śāśvatam) — three adjectives that describe the Self's timeless nature. "Unborn" — never came into existence. "Eternal" — will never cease to exist. "Ancient" — older than the oldest thing.

"Not killed when the body is killed" (na hanyate hanyamāne śarīre) — the body can be destroyed, but the Self cannot. This is the Upanishad's answer to the question of death: the Self is deathless. Only the body dies.

This verse is the foundation of Vedantic immortality. It is not a belief but a statement of the nature of reality.` },
        { id: `katha.2.1.6`, sanskrit: `अणोर् अणीयान् महतो महीयान् |
आत्मास्य जन्तोर् निहितो गुहायाम् ॥६॥`, transliteration: `aṇor aṇīyān mahato mahīyān |
ātmāsya jantor nihito guhāyām ||6||`, english: `The Self is smaller than the smallest, greater than the greatest. It is hidden in the heart of every being. The one free from desire, with the grace of the Creator, sees the Self's glory and is freed from sorrow.`, commentary: `This verse captures the paradox of the Self's nature. "Smaller than the smallest" — the Self is subtler than the subtlest particle. It cannot be seen, touched, or measured. It is smaller than an atom, more subtle than thought itself.

"Greater than the greatest" — the same Self is vaster than the cosmos. It pervades all space, all time, all existence. It is greater than the greatest mountain, the widest ocean, the most distant star.

"Hidden in the heart of every being" — the Self is not somewhere far away. It is in the heart of every creature, including you, right now. It is the most intimate reality — closer than your breath, nearer than your thoughts.

"The one free from desire sees the Self's glory" — desire is the veil. When desire subsides — not through suppression but through understanding — the Self shines forth naturally, like the sun when clouds part.

This verse teaches that the Self transcends all categories of size, location, and measurement. It is neither big nor small, neither near nor far — it is beyond all such limitations. Yet it appears in all of them, pervading every level of existence.` },
        { id: `katha.2.1.7`, sanskrit: `आसीनो दूरं व्रजति शयानो याति सर्वतः |
क एवं विद्वान् आनन्दं कुतो नु तीर्थं न कुतो नु तीर्थम् ॥७॥`, transliteration: `āsīno dūraṁ vrajati śayāno yāti sarvataḥ |
ka evaṁ vidvān ānandaṁ ko vai nānandaḥ ||7||`, english: `Seated, it goes far. Lying down, it goes everywhere. Who but I can know this luminous, joyful Self?`, commentary: `This verse, similar to Chapter 1 verse 24, restates the Self's omnipresence through the paradox of stillness and motion. "Seated, it goes far" — even when the body is still, the Self pervades all space. "Lying down, it goes everywhere" — even in sleep, consciousness continues to pervade.

"Who but I can know this luminous, joyful Self?" — Yama speaks from direct experience. He has known the Self and declares its nature with authority. The "I" here is not the ego but the Self itself, speaking through the realized teacher.

"Luminous" (bhās) and "joyful" (ānanda) — these are the Self's natural qualities. The Self is not dark or blank — it is radiant with consciousness and joyful by nature. The darkness and suffering we experience are due to ignorance, not to the nature of reality.

This verse teaches that the Self is not some abstract, lifeless principle. It is living, luminous, and joyful. To know it is to discover the source of all light and all happiness — a light and happiness that are not dependent on external circumstances but are the very nature of what you are.` },
        { id: `katha.2.1.8`, sanskrit: `य इमं मध्वदं वेद आत्मानं जीवम् अन्तिकात् |
ईशानं भूतभव्यस्य न ततो विजुगुप्सते ॥८॥`, transliteration: `ya imaṁ madhvadaṁ veda ātmānaṁ jīvam antikāt |
īśānaṁ bhūta-bhavyasya na tato vijugupsate ||8||`, english: `The one who knows this Self as the eater of honey, the living being, the nearest, the lord of past and future — does not shrink from it thereafter.`, commentary: `This verse uses the metaphor of "the eater of honey" (madhvada) — the Self experiences the sweetness of life through the senses. All pleasure, all beauty, all joy that comes through experience is the Self tasting its own nature through the senses.

"The nearest" (antikāt) — the Self is not distant or transcendent in the ordinary sense. It is the nearest thing — the very awareness in which all experience appears. "The lord of past and future" — the Self is the ruler of time itself. It was there before your birth and will be there after your death.

"Does not shrink from it thereafter" — once the Self is known, there is no fear. Fear comes from the sense of separation, and when that separation dissolves, fear dissolves with it. The one who knows the Self does not fear death, because they know they are deathless.

This verse combines intimacy and power: the Self is the nearest thing and the lord of all time. It is both your intimate companion and the cosmic ruler. To know it is to be simultaneously humbled and exalted.` },
        { id: `katha.2.1.9`, sanskrit: `यः पूर्वं तपसो जातम् अद्भ्यः पूर्वम् अजायत |
गुहां प्रविश्य तिष्ठन्तं यो भूतेषु न पश्यति ॥३.९॥`, transliteration: `yaḥ pūrvaṁ tapaso jātam adbhyaḥ pūrvam ajāyata |
guhāṁ praviśya tiṣṭhantaṁ yo bhūteṣu na paśyati ||9||`, english: `The one who was born from tapas (austerity), who existed before the waters, who entered the cave of the heart and dwells there — the one who does not see this Self among beings is truly blind.`, commentary: `This verse describes the Self's primordial nature. "Born from tapas" — the Self is the product of cosmic austerity, the original creative impulse. "Existed before the waters" — in Vedic cosmology, water is one of the first elements to manifest. The Self existed even before that — it is the source of creation itself.

"Entered the cave of the heart and dwells there" — this primordial, cosmic Self is not somewhere in outer space. It has entered the cave of your heart and taken up residence there. The infinite has become intimate.

"The one who does not see this Self among beings is truly blind" — this is a strong statement. The Self is not hidden — it is everywhere, in every being. To miss it is not a minor oversight but a fundamental blindness. It is like standing in the ocean and being thirsty.

This verse connects the cosmic and the intimate. The Self that created the universe is the same Self that dwells in your heart. The macrocosm and the microcosm are one. To know the Self within is to know the Self everywhere.` },
        { id: `katha.2.1.10`, sanskrit: `या प्राणेन सम्भवत्य् अदितिर् देवतामयी |
गुहां प्रविश्य तिष्ठन्तीं या भूतेषु विभाति ॥१०॥`, transliteration: `yā prāṇena sambhavaty aditir devatāmayī |
guhāṁ praviśya tiṣṭhantīṁ yā bhūteṣu vibhāti ||10||`, english: `She who becomes manifest through prana, who is the divine nature, who entered the cave of the heart and shines among beings — she is Aditi, the mother of the gods.`, commentary: `This verse introduces a feminine dimension to the Self. "She who becomes manifest through prana" — the Self manifests as the life-force in all beings. "The divine nature" (devatāmayī) — the Self is not merely consciousness but the very nature of the divine.

"She is Aditi, the mother of the gods" — Aditi is the cosmic mother, the infinite space from which all gods and all beings arise. The Self is both father and mother of the universe — the creative source that is beyond gender yet embraces all genders.

"She shines among beings" — the Self is not hidden but shining. It is the light of consciousness that illuminates every experience. Without the Self, there would be no awareness, no perception, no experience at all.

This verse teaches that the Self is not a cold, abstract principle but a living, radiant presence. It is the light in every eye, the awareness in every mind, the life in every breath. To know it is to recognize the divine mother in all things.` },
        { id: `katha.2.1.11`, sanskrit: `यद् इदं किञ्च जगत् सर्वं प्राण एजति निःसृतम् |
महद् भयं वज्रम् उद्यतम् |
एको यस् तस्माद् बिभेति ॥११॥`, transliteration: `yad idaṁ kiñca jagat sarvaṁ prāṇa ejati niḥsṛatam |
mahad bhayaṁ vajram udyatam |
eko yaḥ sa mahīyasi ||11||`, english: `This Self is the fire that burns, the sun that shines, the rain that pours, the wind that blows. This Self is space and the earth. It is the source of all existence.`, commentary: `This verse reveals the Self as the source of all natural forces. "The fire that burns" — the Self is the energy in fire. "The sun that shines" — the Self is the light in the sun. "The rain that pours" — the Self is the nourishment in rain. "The wind that blows" — the Self is the movement in the air.

"This Self is space and the earth" — the Self is both the container (space) and the contained (earth). It is the emptiness in which everything appears and the substance from which everything is made.

"It is the source of all existence" — everything that exists — every element, every force, every creature — has its source in the Self. The Self is not ONE of the things that exists — it is the SOURCE of all things that exist.

This verse is a comprehensive statement of the Self's omnipresence. It is not limited to the human heart — it is the fire, the sun, the rain, the wind, space, and earth. The entire universe is the Self in manifestation. To know this is to see God everywhere, in everything, at all times.` },
        { id: `katha.2.1.12`, sanskrit: `अरण्योर् निहितो जातवेदा देवत्वम् एत्य |
शुक्रम् अमृतं विश्वम् आयुः प्राणं हिरण्मयम् ॥१२॥`, transliteration: `araṇyor nihito jātavedā devatvam etya |
śukram amṛtaṁ viśvam āyuḥ prāṇaṁ hiraṇmayam ||12||`, english: `The Self is the fire hidden in the two fire-sticks. It is the bright, the immortal, the universe, the life-prana, the golden, the source of all wealth.`, commentary: `This verse uses the Vedic metaphor of the fire hidden in the fire-sticks (arani). In Vedic fire rituals, fire was produced by friction between two wooden sticks. The fire was "hidden" in the wood and revealed through effort.

Similarly, the Self is hidden in the body-mind complex and revealed through the effort of meditation. The Self is not absent — it is present but concealed. Like fire in wood, it needs the friction of spiritual practice to manifest.

"Śukram" — bright, pure, radiant. "Amṛtam" — immortal, deathless. "Viśvam" — universal, all-pervading. "Āyuḥ" — the life-force itself. "Prāṇam" — the breath of life. "Hiraṇmayam" — golden, luminous.

Each adjective reveals a different facet of the Self. It is the brightest light, the immortal reality, the universal presence, the life-force, the golden radiance. These are not separate attributes but aspects of a single, infinite reality.

The verse concludes the first Valli of Chapter 2 by establishing the Self as the hidden treasure within all things — a treasure that can be found through the friction of meditation and the fire of knowledge.

ADHYAYA 2, VALLI 2: The Self in the Body` },
        { id: `katha.2.1.13`, sanskrit: `यद् एतद् विदुर् अमृतास् ते भवन्ति |
अथ विकल्पम् अविदुः ॥१३॥`, transliteration: `yad etad vidur amṛtās te bhavanti |
atha vikalpam aviduḥ ||13||`, english: `Those who know this become immortal. Others enter only into sorrow.`, commentary: `Know the Self and become immortal, or remain in ignorance and suffer. There is no middle ground. Those who know this - not those who believe or hope, but those who KNOW - become immortal. This is not a future promise but a present reality. The Self was always immortal; knowing this makes the immortality conscious. Others enter only into sorrow - those who do not know the Self remain trapped in the cycle of pleasure and pain, birth and death.` },
        { id: `katha.2.1.14`, sanskrit: `यदा पञ्चावतिष्ठन्ते ज्ञानानि मनसा सह |
बुद्धिश्च न विचेष्टति तामाहुः परमां गतिम् ॥१४॥`, transliteration: `yadā pañcāvatiṣṭhante jñānāni manasā saha |
buddhiś ca na viceṣṭati tām āhuḥ paramāṁ gatim ||14||`, english: `When the five senses along with the mind are at rest, and the intellect does not move - that is called the supreme state.`, commentary: `This verse describes samadhi - the state of complete mental stillness. All sensory input ceases, and the mind becomes completely quiet. Even the discriminative faculty comes to rest. That is called the supreme state - the highest goal of meditation. This is not sleep because awareness is fully present. It is not unconsciousness because the Self is more awake than ever. It is a state of pure awareness without content.` },
        { id: `katha.2.1.15`, sanskrit: `तां योगम् इति मन्यन्ते स्थिराम् इन्द्रियधारणाम् |
अप्रमत्तस् तदा भवति योगो हि प्रभवाप्ययौ ॥१५॥`, transliteration: `tāṁ yogam iti manyante sthirāṁ indriya-dhāraṇām |
apramattas tadā bhavati yogo hi prabhavāpyayau ||15||`, english: `This they call yoga - the steady control of the senses. Then one becomes watchful, for yoga comes and goes.`, commentary: `Yoga is defined precisely as the steady control of the senses. Yoga is not a system of exercises but the state of complete sensory control. Then one becomes watchful - the yogi is hyper-alert, not passive. Yoga comes and goes - even after experiencing samadhi, one can lose it. This is a realistic teaching. The spiritual path requires ongoing attention, like keeping a boat on course in changing currents.` },
        { id: `katha.2.1.16`, sanskrit: `न प्राणेन नापानेन मर्त्यो जीवति कश्चन |
इतरेण तु जीवन्ति यस्मिन् एताव् उपाश्रितौ ॥१६॥`, transliteration: `na prāṇenānānena martyo jīvati kaścana |
itareṇa tu jīvanti yasmin etāv upāśritau ||16||`, english: `Not by prana nor by apana does any mortal live. It is by another that they live, on which these two depend.`, commentary: `We do not live by breath alone. Prana and apana sustain the body, but they themselves depend on something deeper - the Self. It is by another that they live - this other is the Atman. Without the Self, neither prana nor apana could function. The breath depends on consciousness; consciousness does not depend on breath. This hierarchy of reality - body depends on breath, breath depends on prana, prana depends on the Self - reveals the source of all life.` },
        { id: `katha.2.1.17`, sanskrit: `हन्त त इदं प्रवक्ष्यामि गुह्यं ब्रह्म सनातनम् |
यथा मरणं प्राप्य आत्मा भवति गौतम ॥१७॥`, transliteration: `hanta te idaṁ pravakṣyāmi guhyaṁ brahma sanātanam |
yathā maraṇaṁ prāpya ātmā bhavati gautama ||17||`, english: `Yama said: I will tell you the eternal Brahman, O Gautama - what happens to the Self after death. Some bodies are born, others rest in the womb.`, commentary: `Yama promises to reveal the deepest secret - the eternal Brahman and what happens to the Self at death. The eternal, secret Brahman is the Absolute Reality - the source, sustainer, and dissolution of all that exists. Some bodies are born, others rest in the womb - the cycle of birth and rebirth continues. The Self - the Atman - is never born and never dies. Only the bodies change. Yama is now ready to give the teaching he initially tried to withhold.` },
        { id: `katha.2.1.18`, sanskrit: `योनिम् अन्ये प्रपद्यन्ते शरीरत्वाय देहिनः |
स्थाणुम् अन्येऽनुसंयन्ति यथाकर्म यथाश्रुतम् ॥१८॥`, transliteration: `yonim anye prapadyante śarīratvāya dehinaḥ |
sthāṇum anye 'nusaṁyanti yathā-karma yathā-śrutam ||18||`, english: `Some souls enter a womb to be embodied; others enter the stationary state, according to their actions and their knowledge.`, commentary: `This verse explains the mechanics of rebirth. Some souls are reborn in physical bodies. Others enter a state of rest. Rebirth is governed by two factors: karma and knowledge. Actions determine the quality of the next birth; knowledge determines whether there is a next birth at all. This provides a coherent explanation for the diversity of human circumstances. By changing one's actions and seeking higher knowledge, one can change one's future.` },
        { id: `katha.2.1.19`, sanskrit: `य एष सुप्तेषु जागर्ति कामं कामं पुरुषो निर्मिमाणः |
तदेव शुक्रं तद् ब्रह्म तद् एवामृतम् उच्यते |
तस्मिन् लोकाः श्रिताः सर्वे तदु नात्येति कश्चन |
एतद् वै तत् ॥१९॥`, transliteration: `ya eṣa supteṣu jāgarti kāmaṁ kāmaṁ puruṣo nirmimāṇaḥ |
tad eva śukraṁ tad brahma tad evāmṛtam ucyate |
tasmin lokāḥ śritāḥ sarve tad u nātyeti kaścana |
etad vai tat ||19||`, english: `The Self who is awake while all others sleep, creating desires - that is the Pure, that is Brahman, that alone is called the Immortal. In it all worlds rest. None transcends it. This indeed is that.`, commentary: `The Self is awake while all others sleep. Even in deep sleep, consciousness continues to pervade. The Self creates desires and experiences. That is the Pure, that is Brahman, that alone is called the Immortal. In it all worlds rest - all planes of existence rest within the Self. None transcends it - no being, no force can go beyond the Self. It is the ultimate reality. This indeed is that - the formula of recognition.` },
      ],
    },
    {
      id: `2.2`,
      name: `The Omnipresent Self`,
      sanskritName: `सर्वव्यापिन् आत्मा`,
      verses: [
        { id: `katha.2.2.1`, sanskrit: `हंसः शुचिषद् वसुर् अन्तरिक्षसद् |
होता वेदिषद् अतिथिर् दुरोणसत् ॥१॥`, transliteration: `haṁsaḥ śuciṣad vasur antarikṣasad |
hotā vediṣad atithir duroṇasat ||1||`, english: `There is an unborn, eternal, ancient Self within the body that is not killed when the body is killed. If the killer thinks of killing, or the killed thinks of being killed — both do not know. This Self does not kill, nor is it killed.`, commentary: `This is one of the most powerful verses in the Upanishads, later echoed in Bhagavad Gita 2.19. It addresses the question of violence at the deepest level.

"If the killer thinks of killing" — the one who commits violence does not understand that the Self cannot be killed. They think they are destroying a life, but the life they destroy is only the body, not the Self. "Or the killed thinks of being killed" — the victim does not understand that their true Self is untouched by death.

"Both do not know" — neither the killer nor the victim understands the truth. If they did, there would be no killing and no fear of death. Violence arises from ignorance of the Self.

"This Self does not kill, nor is it killed" — the Self is beyond the duality of killer and killed. It is neither the agent nor the patient of violence. It is the untouched witness of all action.

This verse does not justify violence — it reveals the deeper truth that makes violence ultimately meaningless. When you know the Self, you see that no one can truly harm anyone else. This knowledge naturally leads to compassion and non-violence.` },
        { id: `katha.2.2.2`, sanskrit: `अणोर् अणीयान् महतो महीयान् |
आत्मास्य जन्तोर् निहितो गुहायाम् |
तम् अक्रतुं पश्यति वीतशोको |
धातुप्रसादान् महिमानम् आत्मनः ॥२॥`, transliteration: `aṇor aṇīyān mahato mahīyān |
ātmāsya jantor nihito guhāyām |
tam akratuṁ paśyati vītaśoko |
dhātu-prasādān mahimānam ātmanaḥ ||2||`, english: `The Self is smaller than the smallest, greater than the greatest. Hidden in the heart of every being. The one free from desire, through the grace of the Creator, sees the Self's glory and is freed from sorrow.`, commentary: `This verse, which appeared earlier in Chapter 2, is repeated here with a significant addition: "through the grace of the Creator" (dhātu-prasādāt). This emphasizes that the realization of the Self is not solely an individual achievement — it requires divine grace.

"The one free from desire sees the Self's glory" — desire and grace are inversely related. When desire subsides, grace enters. When the mind is full of wanting, there is no room for the divine to reveal itself.

"Vītaśoko" — "freed from sorrow." This is the fruit of seeing the Self's glory. Not temporary happiness, not relief from specific problems, but the complete cessation of sorrow at its root. When you know the Self, sorrow cannot touch you because you know that nothing real can be lost.

The repetition of this verse in the text serves to emphasize its importance. It contains the entire teaching in miniature: the Self is infinite, it is hidden in the heart, it is revealed through grace when desire subsides, and knowing it frees one from all sorrow.` },
        { id: `katha.2.2.3`, sanskrit: `तम् आत्मस्थं मनुष्यं यं |
युञ्जीत कर्मणि तं योगम् |
तद् एव श्रेष्ठं नैव |
तत्त्वतः तम् आत्मस्थम् ॥३॥`, transliteration: `āsīno dūraṁ vrajati śayāno yāti sarvataḥ |
sukham āsīnaṁ vrajati sukhaṁ śete ||3||`, english: `Seated, it goes far. Lying down, it goes everywhere. Who can know this Self, other than me? It is not this, not this (neti neti). It is incomprehensible, for it cannot be comprehended. It is indestructible, for it cannot be destroyed.`, commentary: `This verse introduces one of the most important teachings in Vedanta: "neti neti" — "not this, not this." This is the method of negation used to point to the Self. Whatever you can think, the Self is not that. Whatever you can perceive, the Self is not that. Whatever you can describe, the Self is not that.

"It is incomprehensible, for it cannot be comprehended" — the Self cannot be grasped by the mind because it is the one doing the grasping. A knife cannot cut itself; an eye cannot see itself; the mind cannot comprehend the Self.

"It is indestructible, for it cannot be destroyed" — the Self cannot be destroyed because it was never created. It is the uncaused cause, the source of all creation, beyond the reach of any destructive force.

"Neti neti" is not a negative statement but a pointing. It does not say the Self does not exist — it says the Self exists beyond all categories of existence and non-existence. It transcends all description, all concept, all understanding. It can only be lived, not thought.

This teaching frees the seeker from attachment to any particular concept of the Self. The Self is not an idea, a feeling, a vision, or an experience. It is beyond all of these — it is the very awareness in which all ideas, feelings, visions, and experiences appear.` },
        { id: `katha.2.2.4`, sanskrit: `अविज्ञातम् अजानताम् |
विज्ञातम् अजानताम् |
विज्ञातम् अजानताम् ॥४॥`, transliteration: `avijñātam ajānatām |
vijñātam ajānatām ||4||`, english: `The Self is not known by those who think they know it. It is known by those who know they do not know it.`, commentary: `This paradoxical verse states one of the most important principles of spiritual knowledge. Those who think they know the Self — who have a concept, a theory, a belief about it — do not actually know it. Their knowledge is intellectual, not experiential.

Those who know they do not know the Self — who have recognized the limits of their understanding, who approach the mystery with humility — are the ones who actually know it. This is because the Self is not an object of knowledge but the subject that knows all objects.

The greatest obstacle to Self-realization is the belief that one already knows. The scholar who has memorized all the scriptures, the philosopher who has mastered all the arguments, the meditator who has had profound experiences — all of these may be trapped by the belief that they know.

True knowing is not a state of certainty but of openness. It is not "I know what the Self is" but "I am open to what the Self reveals." This openness, this humility, this willingness to not-know — is the gateway to direct realization.

This teaching echoes Socrates: "I know that I know nothing." The wisest are those who recognize how much they do not know — and in that recognition, they become available to the truth that transcends all knowing.` },
        { id: `katha.2.2.5`, sanskrit: `प्राणस्य प्राणम् उत चक्षुषश् चक्षुः |
श्रोत्रस्य श्रोत्रं मनसो यो मनो वदन्ति ॥५॥`, transliteration: `prāṇasya prāṇam uta cakṣuṣaś cakṣuḥ |
śrotrasya śrotraṁ manaso yo mano vadanti ||5||`, english: `The Self is the breath of breath, the eye of the eye, the ear of the ear, the mind of the mind. The wise who perceive this thus — they attain the ancient, primordial Self.`, commentary: `This verse uses a powerful grammatical construction to describe the Self. "The breath of breath" — the Self is what makes breath breathe. "The eye of the eye" — the Self is what makes the eye see. "The ear of the ear" — the Self is what makes the ear hear. "The mind of the mind" — the Self is what makes the mind think.

In each case, the Self is the consciousness behind the function. The eye does not see by itself — it is the Self that sees through the eye. The mind does not think by itself — it is the Self that thinks through the mind. Without the Self, all the organs would be inert matter.

This teaching reveals the Self as the ultimate subject. It is not an object to be perceived but the perceiver of all perception. It is not a thought to be thought but the thinker of all thought. It is not a feeling to be felt but the feeler of all feeling.

"The wise who perceive this thus attain the ancient, primordial Self" — the one who understands this teaching, who recognizes the Self as the consciousness behind all experience, attains the primordial reality that existed before the universe was born.` },
        { id: `katha.2.2.6`, sanskrit: `उत्तिष्ठत जाग्रत प्राप्य वरान् निबोधत |
क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस् तत् कवयो वदन्ति ॥६॥`, transliteration: `uttiṣṭhata jāgrata prāpya varān nibodhata |
kṣurasya dhārā niśitā duratyayā durgaṁ pathas tat kavayo vadanti ||6||`, english: `Arise! Awake! Approach the great ones and learn. The path is sharp as a razor's edge, hard to tread — so the sages say.`, commentary: `This is one of the most famous verses in the Upanishads — the great call to awakening. "Uttiṣṭhata" — Arise! "Jāgrata" — Awake! "Prāpya varān nibodhata" — Approach the great teachers and learn!

The urgency is unmistakable. This is not a casual suggestion but a cosmic imperative. The Self will not wait forever. The body ages, opportunities pass, and the chance for realization may not come again.

"Kṣurasya dhārā niśitā duratyayā" — "sharp as a razor's edge, hard to tread." The spiritual path is not easy. It requires precision, balance, and unwavering commitment. Like walking on a razor's edge, one misstep can send you off course.

"Durgaṁ pathas" — "the path is difficult." The Upanishad does not pretend the path is easy. It is honest about the challenges. But it also offers the solution: approach the realized teachers, learn from those who have walked the path before you.

This verse has inspired countless seekers throughout history. It is the call of the Upanishads to humanity: Wake up! You are sleeping in ignorance! The Self is waiting — arise and claim your birthright!` },
        { id: `katha.2.2.7`, sanskrit: `रसं ह्य् एवायं लब्ध्वाऽनन्दी भवति |
कुतस् तत्स्याद् विद्वान् कस्य शोकः ॥७॥`, transliteration: `raṁ hy evāyaṁ labdhvānandī bhavati |
kutas tasyād vidvāṁs tasya kaḥ śokaḥ ||7||`, english: `Having known the taste of this Self, one becomes blissful. The wise one who has known the Self — from where would sorrow come? From where would delusion come?`, commentary: `The fruit of Self-knowledge is stated simply: "one becomes blissful" (ānandī bhavati). This bliss is not dependent on circumstances — it is the natural state of the Self. When the Self is known, this natural bliss becomes permanent and unshakeable.

"From where would sorrow come?" — sorrow requires a sense of loss, and loss requires a sense of separation. When the Self is known as all-pervading, there is nothing separate to lose. Sorrow loses its foundation.

"From where would delusion come?" — delusion requires a false sense of identity. When the true Self is known, all false identifications dissolve. Delusion loses its ground.

This verse is the Upanishad's promise: Self-knowledge brings permanent bliss and freedom from sorrow and delusion. It is not a temporary state but a permanent transformation of consciousness. The sage who knows the Self lives in continuous, unshakeable bliss — not because everything goes right, but because they have found the source of happiness that is independent of everything.

ADHYAYA 2, VALLI 3: The Tree of the World` },
        { id: `katha.2.2.8`, sanskrit: `सर्वे वेदा यत् पदम् आमनन्ति |
तपांसि सर्वाणि च यद् वदन्ति |
यद् इच्छन्तो ब्रह्मचर्यं चरन्ति |
तत् ते पदं संग्रहेण प्रवक्ष्ये ॥८॥`, transliteration: `sarve vedā yat padam āmananti |
tapāṁsi sarvāṇi ca yad vadanti |
yad icchanto brahmacaryaṁ caranti |
tat te padaṁ saṅgraheṇa pravakṣye ||8||`, english: `All the Vedas speak of that goal which all austerities declare, for the sake of which students practice brahmacharya. I shall tell you that goal in brief.`, commentary: `All the Vedas speak of a single goal. All austerities are directed toward the same goal. Students practice brahmacharya for the sake of this goal. Yama is about to give the essence of all spiritual teaching in a single statement. This verse builds anticipation for the final revelation.` },
        { id: `katha.2.2.9`, sanskrit: `एतद् ध्य् एवाक्षरं ब्रह्म एतद् ध्य् एवाक्षरं परम् |
एतद् ध्य् एवाक्षरं ज्ञात्वा यो यद् इच्छति तस्य तत् ॥९॥`, transliteration: `etad hy evākṣaraṁ brahma etad hy evākṣaraṁ param |
etad hy evākṣaraṁ jñātvā yo yad icchati tasya tat ||9||`, english: `This imperishable syllable is indeed Brahman. This imperishable syllable is indeed the supreme. Knowing this imperishable syllable, one obtains whatever one desires.`, commentary: `The imperishable syllable AUM is Brahman. AUM is not a symbol or representation of Brahman - it IS Brahman. The sacred sound and the Absolute reality are one. There is nothing higher than AUM because AUM IS the highest reality. Knowing AUM, one obtains whatever one desires - not magical wish-fulfillment but the realization that Self-knowledge fulfills all desires at their root. When you know the Self, all desires are naturally fulfilled.` },
        { id: `katha.2.2.10`, sanskrit: `एतद् वै तत् ॥१०॥`, transliteration: `etad vai tat ||10||`, english: `This indeed is that.`, commentary: `This single-line verse is one of the most powerful in the Upanishads. This indeed is that. This - what is right here, right now, in your immediate experience. That - the supreme Brahman, the Absolute, the goal of all seeking. The teaching is: what you are looking for is already here. The Self you seek through meditation, study, and practice is the very awareness in which these activities are taking place. There is no distance between you and the Absolute.` },
        { id: `katha.2.2.11`, sanskrit: `य इमं मध्वदं वेद आत्मानं जीवम् अन्तिकात् |
ईशानं भूतभव्यस्य न ततो विजुगुप्सते |
एतद् वै तत् ॥११॥`, transliteration: `ya imaṁ madhvadaṁ veda ātmānaṁ jīvam antikāt |
īśānaṁ bhūta-bhavyasya na tato vijugupsate |
etad vai tat ||11||`, english: `The one who knows this Self as the eater of honey, the living being, the nearest, the lord of past and future - does not shrink from it. This indeed is that.`, commentary: `The Self is the eater of honey - it experiences the sweetness of life through the senses. The living being - the Self is the life-principle in every creature. The nearest - the Self is the closest reality, nearer than breath or thought. The lord of past and future - the Self transcends time. Once the Self is known, there is no fear. Fear comes from separation, and when the Self is realized, all separation dissolves.` },
        { id: `katha.2.2.12`, sanskrit: `अङ्गुष्ठमात्रः पुरुषो ज्योतिर् इवाधूमकः |
आत्मास्य जन्तोर् निहितो गुहायाम् |
एतद् वै तत् ॥१२॥`, transliteration: `aṅguṣṭha-mātraḥ puruṣo jyotir ivādhūmakaḥ |
ātmāsya jantor nihito guhāyām |
etad vai tat ||12||`, english: `The Purusha, the size of a thumb, is like a smokeless flame. The Self is hidden in the heart of every being. This indeed is that.`, commentary: `The Self is a thumb-sized, smokeless flame dwelling in the heart. This is not far away, not abstract, not conceptual. It is a luminous presence in the cave of your heart, right now. The size of a thumb suggests something small, intimate, personal. Like a smokeless flame - pure light, without contamination. The Self illuminates the heart-cave with a clear, steady light. This indeed is that.` },
        { id: `katha.2.2.13`, sanskrit: `सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः |
येनाक्रमन्त्य् ऋषयो ह्य् आप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥१३॥`, transliteration: `satyam eva jayate nānṛtaṁ satyena panthā vitato devayānaḥ |
yenākramanty ṛṣayo hy āptakāmā yatra tat satyasya paramaṁ nidhānam ||13||`, english: `Truth alone triumphs, not falsehood. By truth is the path of the gods laid out - the path by which the sages, having satisfied their desires, travel to the supreme abode of truth.`, commentary: `Satyam eva jayate - Truth alone triumphs. This is one of the most famous verses in Indian literature, later adopted as India national motto. The divine path is paved with truth. Those who live in truth naturally travel the path that leads to liberation. The supreme abode of truth is Brahman itself, the ultimate truth, the final destination. Truth is not merely a moral virtue but the very foundation of the spiritual path.` },
        { id: `katha.2.2.14`, sanskrit: `एषोऽणुर् आत्मा चेतसा वेदितव्यो |
यस्मिन् प्राणः पञ्चधा संविवेश |
प्राणैश् चित्तं सर्वम् ओतं प्रज्ञानम् |
यस्मिन् विशुद्धे विभवत्य् एष आत्मा ॥१४॥`, transliteration: `eṣo 'ṇur ātmā cetasā veditavyo |
yasmin prāṇaḥ pañcadhā saṁviveśa |
prāṇaiś cittaṁ sarvam otaṁ prajñānam |
yasmin viśuddhe vibhavaty eṣa ātmā ||14||`, english: `This subtle Self is to be known by the mind, in which the pranas have entered fivefold. The mind is pervaded by the pranas, and by pure intelligence. When the mind is purified, the Self shines forth.`, commentary: `This subtle Self is to be known by the mind, not by the senses. The five pranas have entered the body, creating the life-force. The mind functions through the pranas, and the Self illuminates the mind through pure intelligence. There is a chain: Self, intelligence, mind, pranas, body. When the mind is purified, the Self shines forth. The Self is always present but obscured by mental impurity. Like cleaning a mirror to see your reflection - the reflection was always there.` },
        { id: `katha.2.2.15`, sanskrit: `यस्त्व् अविज्ञानवान् भवति अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥१५॥`, transliteration: `yas tv avijñānavān bhavati amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||15||`, english: `The one without understanding, with uncontrolled mind, always impure - does not attain the Self and returns to the cycle of birth and death.`, commentary: `The one who lacks understanding, whose mind is uncontrolled, and who remains impure does not attain the Self. Without understanding, lacking discriminative knowledge. Uncontrolled mind - restless, reactive, undisciplined. Always impure - contaminated by desire, aversion, and delusion. The consequence: does not attain the Self and returns to the cycle of birth and death. Ignorance leads to continued suffering. The choice is ours.` },
      ],
    },
    {
      id: `2.3`,
      name: `The Yogic Path to Liberation`,
      sanskritName: `मोक्षमार्ग`,
      verses: [
        { id: `katha.2.3.1`, sanskrit: `ऊर्ध्वमूलम् अधः शाखम् अश्वत्थं प्राहुर् अव्ययम् |
छन्दांसि यस्य पर्णानि यस् तं वेद स वेदवित् ॥१॥`, transliteration: `ūrdhva-mūlam adhaḥ śākham aśvatthaṁ prāhur avyayam |
chandāṁsi yasya parṇāni yas taṁ veda sa veda-vit ||1||`, english: `They speak of an eternal Ashvattha tree with roots above and branches below. Its leaves are the Vedic hymns. The one who knows this tree knows the Vedas.`, commentary: `This is the famous Ashvattha tree metaphor — the cosmic tree of existence. Its roots are above, in the Absolute; its branches spread downward into the manifest world. This tree is inverted: it grows from the transcendent downward into the material.

"Its leaves are the Vedic hymns" — the Vedas, with their hymns and rituals, are like the leaves of this cosmic tree. They sustain the tree but are not the tree itself. The leaves can be studied, but knowing the tree requires seeing its roots — the Absolute above.

"Aśvatthaṁ prāhur avyayam" — "they speak of it as the eternal Ashvattha." The Ashvattha tree (ficus religiosa, the sacred fig) was chosen because of its longevity and aerial roots — a tree that seems to grow upside down, with roots hanging from above.

Krishna later uses this same image in Bhagavad Gita 15.1-3. The inverted tree is the universe itself — its roots in Brahman, its branches in the manifest world. To know this tree is to know the entire structure of reality.

The practical instruction: do not be satisfied with the leaves (scriptural knowledge alone). Seek the roots (the Absolute) from which the entire tree grows.` },
        { id: `katha.2.3.2`, sanskrit: `अधश्च ऊर्ध्वं प्रसृतास्तस्य शाखा |
गुणप्रवृद्धा विषयप्रवालाः ॥२॥`, transliteration: `adhaś cordhvaṁ prasṛtās tasya śākhā |
guṇa-pravṛddhā viṣaya-pravālāḥ ||2||`, english: `The branches of this tree spread both downward and upward, nourished by the three gunas. Its buds are the sense objects. Its roots extend downward into the world of men.`, commentary: `The cosmic tree's branches are nourished by the three gunas — sattva (goodness), rajas (passion), and tamas (ignorance). These three forces shape all of creation, giving rise to the diversity of forms and experiences.

"Its buds are the sense objects" (viṣaya-pravālāḥ) — the sense objects are the tender shoots of this tree. They are the most immediate expressions of the cosmic tree's growth — the sights, sounds, tastes, touches, and smells that we experience.

"Its roots extend downward into the world of men" — the tree's roots reach into human existence, into the world of action and consequence. Our lives are part of this cosmic tree — we are both its products and its expressions.

This image teaches that we are not separate from the universe. We are branches of the cosmic tree, nourished by the same forces (gunas) that shape all of creation. Our desires, our actions, our very existence are expressions of this one tree.

The teaching implies that freedom comes from cutting the tree — not by destroying the world but by cutting our attachment to it. When we see through the illusion of separateness, we can return to the roots above — the Absolute from which everything sprang.` },
        { id: `katha.2.3.3`, sanskrit: `न रूपम् अस्येह तथोपलभ्यते |
नान्तो न चादिर् न च सम्प्रतिष्ठा ॥३॥`, transliteration: `na rūpam asyeha tathopalabhyate |
nānto na cādir na ca sampratiṣṭhā ||3||`, english: `This tree has no form here that can be seen. It has no end, no beginning, and no foundation. One should cut this firm-rooted Ashvattha with the strong axe of detachment.`, commentary: `The cosmic tree has no visible form — it is not a physical tree but a metaphor for the entire structure of manifest existence. It has no beginning (because it has always existed), no end (because it will always exist), and no foundation (because its roots are in the formless Absolute).

"One should cut this firm-rooted Ashvattha with the strong axe of detachment" — this is the practical instruction. The tree of worldly existence is firmly rooted in our desires and attachments. To be free, we must cut through these roots with the axe of vairagya (dispassion, detachment).

This does not mean destroying the world or rejecting life. It means cutting the attachment — the sense that "this is mine" and "I am this." When attachment is cut, the tree of suffering falls, and the Self is revealed as the space in which the tree appeared.

The "strong axe" must be sharp and wielded with force. Half-hearted attempts at detachment will not work. The roots of attachment go deep — into habit, conditioning, fear, and desire. Cutting them requires sustained effort, courage, and the support of a spiritual practice.` },
        { id: `katha.2.3.4`, sanskrit: `यद् एतद् विदुर् अमृतास् ते भवन्ति |
अन्यथा विद्या विकल्पम् एव विदुः ॥४॥`, transliteration: `yad etad vidur amṛtās te bhavanti |
anyathā vidyā vikalpam eva viduḥ ||4||`, english: `The one who knows this — they become immortal. All else is mere verbal gymnastics. Through the grace of the Creator, one perceives the glory of the Self.`, commentary: `This verse cuts through all intellectual sophistication: "All else is mere verbal gymnastics" (anyathā vidyā vikalpam eva viduḥ). All knowledge that does not lead to the direct realization of the Self is just words — elaborate, impressive, but ultimately empty.

"The one who knows this — they become immortal" (yad etad vidur amṛtās te bhavanti). The fruit of knowing the cosmic tree is immortality — not physical immortality but the realization that the Self was never born and will never die.

"Through the grace of the Creator, one perceives the glory of the Self" — once again, grace is emphasized. The Self is not known through effort alone but through the divine grace that responds to sincere seeking.

This verse is a call to stop intellectualizing and start experiencing. Reading about the Self is not knowing the Self. Talking about meditation is not meditating. The Upanishad is impatient with theories and demands direct realization.` },
        { id: `katha.2.3.5`, sanskrit: `यदा सर्वे प्रमुच्यन्ते कामा येऽस्य हृदि श्रिताः ।
अथ मर्त्योऽमृतो भवत्य् अत्र ब्रह्म समश्नुते ॥५॥`, transliteration: `yadā sarve pramucyante kāmā ye 'sya hṛdi śritāḥ |
atha martyo 'mṛto bhavaty atra brahma samaśnute ||5||`, english: `When all the desires that dwell in the heart are destroyed — then the mortal becomes immortal and attains Brahman here itself.`, commentary: `This verse states the formula for liberation in its simplest form. "When all the desires that dwell in the heart are destroyed" — not suppressed, not transcended, not managed, but destroyed. When desire is completely uprooted, the heart becomes clear.

"Then the mortal becomes immortal" — the transformation is instantaneous. One moment you are a mortal, bound by desire and death. The next moment, when the last desire falls, you are immortal. The change is not in the Self — the Self was always immortal. The change is in the recognition.

"Atra brahma samaśnute" — "here itself, one attains Brahman." Liberation is not in some future heaven or after death. It is here, now, in this very body. When desire is gone, Brahman is revealed as the ever-present reality.

This verse is both the simplest and the most challenging teaching in the Upanishad. It says: destroy all desires, and you will be free. The question is how — and the answer is through constant awareness, meditation, and the grace of the Self that shines when the mind is still.` },
        { id: `katha.2.3.6`, sanskrit: `यदा सर्वे प्रभिद्यन्ते हृदयस्येह ग्रन्थयः |
अथ मर्त्योऽमृतो भवत्य् एतावद् ध्यानम् इष्यते ॥६॥`, transliteration: `yadā sarve prabhidyaite hṛdayasyeha granthayaḥ |
atha martyo 'mṛto bhavaty etāvad dhānam iṣyate ||6||`, english: `When all the knots of the heart are cut asunder — then the mortal becomes immortal. This is the entire teaching of the Upanishad. Beyond this, there is nothing to be said.`, commentary: `This verse is the culmination of the Katha Upanishad's teaching. "When all the knots of the heart are cut asunder" — the "knots" (granthi) are the deep-seated tendencies of ignorance, desire, and karma that bind the soul to the wheel of rebirth.

The three great knots are: avidya (ignorance), kama (desire), and karma (action). When these three are completely cut — not by force but by the sword of knowledge — the mortal becomes immortal.

"Etāvad dhānam iṣyate" — "this is the entire teaching." Yama is saying: "I have told you everything. This is the essence of all I know. Beyond this, there is nothing more to be said."

"Na atah parā upākhyāne" — "there is nothing beyond this in the story." The teaching is complete. The rest is up to the seeker — to practice, to persevere, to realize.

This verse is like the final chord of a symphony — it resolves all tensions, answers all questions, and leaves the listener in silence. The Katha Upanishad began with a boy's question about death and ends with the answer: the Self is deathless. Know it and be free.` },
        { id: `katha.2.3.7`, sanskrit: `शतं चैका च हृदयस्य नाड्यः |
तासां मूर्धानम् अभिनिःसृतैका |
तयोर् ऊर्ध्वम् आयन् अमृतत्वम् एति |
विष्वङ् अन्या उत्क्रमणे भवन्ति ॥७॥`, transliteration: `śataṁ caikā ca hṛdayasya nāḍyaḥ |
tāsāṁ mūrdhānam abhiniḥsṛtaikā |
tayor ūrdhvam āyan amṛtatvam eti |
viṣvaṅ anyā utkramaṇe bhavanti ||7||`, english: `There are one hundred and one nerves of the heart. One of them penetrates the crown of the head. Going upward through that nerve, one attains immortality. The others lead in various directions at the time of departure.`, commentary: `This final verse of the Katha Upanishad provides the subtle yogic anatomy of liberation. "One hundred and one nerves of the heart" — the Upanishads describe a network of subtle energy channels (nadis) emanating from the heart center.

"One of them penetrates the crown of the head" — this is the sushumna nadi, the central channel that leads to the crown (sahasrara). Through this channel, the awakened kundalini or the concentrated consciousness ascends to the highest center.

"Going upward through that nerve, one attains immortality" — when the soul departs through the crown of the head, it merges with the Absolute and does not return to the cycle of birth and death.

"The others lead in various directions at the time of departure" — the other 100 nerves lead to various destinations in the cycle of rebirth. Depending on the state of consciousness at the time of death, the soul exits through different channels and takes different forms.

This verse completes the Katha Upanishad's teaching with a practical yogic instruction: cultivate the consciousness that can exit through the crown at the time of death. This is the ultimate goal of meditation — to prepare for a conscious departure that leads to immortality.

The Katha Upanishad, from the story of a boy confronting Death to the subtle yogic science of liberation, is complete.

MANDUKYA UPANISHAD (Māṇḍūkya Upaniṣad)
============================================================` },
        { id: `katha.2.3.8`, sanskrit: `नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः |
न चैनं क्लेदयन्त्य् आपो न शोषयति मारुतः ॥८॥`, transliteration: `nainaṁ chindanti śastrāṇi nainaṁ dahati pāvakaḥ |
na cainaṁ kledayanty āpo na śoṣayati mārutaḥ ||8||`, english: `Weapons cannot cut it, fire cannot burn it, water cannot wet it, wind cannot dry it.`, commentary: `Weapons cannot cut it - the Self is not physical and cannot be harmed by physical means. Fire cannot burn it - the Self is subtler than fire. Water cannot wet it - the Self is not a material substance. Wind cannot dry it - the Self is not subject to any physical process. Each negation removes a category of destruction. The Self cannot be cut, burned, wet, or dried - it is beyond all physical forces. This is not because the Self is strong but because it is not physical at all. It is pure consciousness.` },
        { id: `katha.2.3.9`, sanskrit: `अशरीरं शरीरेषु अनवस्थेष्व् अवस्थितम् |
महान्तं विभुम् आत्मानं मत्वा धीरो न शोचति ॥९॥`, transliteration: `aśarīraṁ śarīreṣu anavastheṣv avasthitam |
mahāntaṁ vibhum ātmānaṁ matvā dhīro na śocati ||9||`, english: `The Self is bodiless among the bodied, permanent among the impermanent, great and all-pervading. The wise one who knows this does not grief.`, commentary: `The Self has no form yet dwells in every form. Everything changes but the Self does not. The Self is infinite, present everywhere. The body is a localized point; the Self is without limit. The wise one who knows this does not grieve. Grief comes from loss, and loss comes from identification with what is limited. When you identify with the infinite Self, there is nothing to lose and therefore nothing to grieve for. The sage does not become heartless - they become infinitely compassionate.` },
        { id: `katha.2.3.10`, sanskrit: `एषोऽणुर् आत्मा चेतसा वेदितव्यो |
यस्मिन् प्राणः पञ्चधा संविवेश |
प्राणैश् चित्तं सर्वम् ओतं प्रज्ञानम् |
यस्मिन् विशुद्धे विभवत्य् एष आत्मा ॥१०॥`, transliteration: `eṣo 'ṇur ātmā cetasā veditavyo |
yasmin prāṇaḥ pañcadhā saṁviveśa |
prāṇaiś cittaṁ sarvam otaṁ prajñānam |
yasmin viśuddhe vibhavaty eṣa ātmā ||10||`, english: `This subtle Self is to be known by the mind, in which the pranas have entered fivefold. The mind is pervaded by the pranas, and by pure intelligence. When the mind is purified, the Self shines forth.`, commentary: `The subtle Self is to be known by the purified mind. The five pranas have entered the body, creating the life-force. The mind functions through the pranas, and the Self illuminates the mind through pure intelligence. There is a chain: Self, intelligence, mind, pranas, body. When the mind is purified through meditation, devotion, and selfless action, the Self naturally becomes visible. The Self is always present but obscured by mental impurity. Purify the mind and the Self will be revealed.` },
        { id: `katha.2.3.11`, sanskrit: `यस्त्व् अविज्ञानवान् भवति अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥११॥`, transliteration: `yas tv avijñānavān bhavati amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||11||`, english: `The one without understanding, with uncontrolled mind, always impure - does not attain the Self and returns to the cycle of birth and death.`, commentary: `The one who lacks understanding, whose mind is uncontrolled, and who remains impure does not attain the Self. Without understanding means lacking discriminative knowledge. Uncontrolled mind means restless, reactive, undisciplined. Always impure means contaminated by desire, aversion, and delusion. The consequence is clear: does not attain the Self and returns to the cycle of birth and death. Ignorance leads to continued suffering in the wheel of rebirth. The choice is ours.` },
        { id: `katha.2.3.12`, sanskrit: `आत्मानं रथिनं विद्धि शरीरं रथमेव तु |
बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥१२॥`, transliteration: `ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu |
buddhiṁ tu sārathiṁ viddhi manaḥ pragraham eva ca ||12||`, english: `Know the Self as the lord of the chariot, the body as the chariot, the intellect as the charioteer, and the mind as the reins.`, commentary: `This verse returns to the chariot analogy one final time. The Self is the lord - the one who directs the journey. The body is the chariot - the vehicle. The intellect is the charioteer - the discriminative faculty. The mind is the reins - the controlling mechanism. The chariot analogy has been the central teaching device. The final instruction: train the charioteer, tighten the reins, and the lord of the chariot will reach its destination - the realization of its own immortal nature.` },
        { id: `katha.2.3.13`, sanskrit: `इन्द्रियाणि हयान् आहुर् विषयांस् तेषु गोचरान् |
आत्मेन्द्रियमनोयुक्तं भोक्तेत्य् आहुर् मनीषिणः ॥१३॥`, transliteration: `indriyāṇi hayān āhur viṣayāṁs teṣu gocarān |
ātmendriya-mano-yuktaṁ bhoktety āhur manīṣiṇaḥ ||13||`, english: `The senses are the horses, the sense objects are the roads. The Self, united with the senses and the mind, is called the enjoyer by the wise.`, commentary: `This verse completes the chariot analogy. The senses are the horses that pull the chariot. The sense objects are the roads. The Self, united with the senses and the mind, is called the enjoyer - the one who experiences, who enjoys, who lives through the body-mind complex. The body-mind is the instrument; the Self is the one who uses it. This understanding from the wise completes the teaching on the relationship between the Self and the body-mind.` },
        { id: `katha.2.3.14`, sanskrit: `यस्त्व् अविज्ञानवान् भवति अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥१४॥`, transliteration: `yas tv avijñānavān bhavati amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||14||`, english: `The one whose intellect is not clear, whose mind is uncontrolled, whose senses do not obey - such a one does not reach the goal and enters the cycle of birth and death.`, commentary: `This final verse of the Katha Upanishad restates the warning one last time. The one whose intellect is dull, whose mind is undisciplined, and whose senses are uncontrolled does not reach the goal. This is a compassionate warning, not a threat. It simply states the natural consequence of living in ignorance. Like a chariot with a sleeping charioteer, loose reins, and wild horses will crash, a person without Self-knowledge will remain trapped in suffering. The Katha Upanishad is complete.` },
      ],
    },
  ],
  verses: [
    { id: `katha.1.1.1`, sanskrit: `उशन्ह वै वाजश्रवसः सर्ववेदसं ददौ ।
तस्य ह नचिकेता नाम पुत्र आस ॥१॥`, transliteration: `uśan ha vai vājaśravasaḥ sarvavedasaṁ dadau |
tasya ha naciketā nāma putra āsa ||1||`, english: `Vajashravasa, desiring reward, performed the sacrifice of giving away all his possessions. He had a son named Nachiketa.`, commentary: `The Katha Upanishad opens with a story set in ancient India. Vajashravasa — whose name means "one whose fame derives from giving food" — is performing a grand sacrifice called Vishwajit, in which a person gives away all their worldly possessions. This was a traditional Vedic practice marking the transition from worldly life to spiritual seeking.

However, something is wrong with this sacrifice. Vajashravasa is giving away only old, worn-out possessions — cows that are too old to give milk or bear calves. His generosity is calculated, not genuine. He is giving away what he no longer values, seeking spiritual merit from a hollow gesture.

His young son Nachiketa observes this with the innocent clarity of a child. The name "Nachiketa" means "one who does not lie down" — suggesting a nature that will not rest until the truth is found. This child represents the awakened spiritual impulse that sees through pretense and demands authenticity.

The Upanishad begins here because the entire teaching that follows arises from a child's honest question to his father. Sometimes the deepest wisdom comes from the simplest, most direct seeing — unclouded by the compromises and rationalizations of adult life.` },
    { id: `katha.1.1.2`, sanskrit: `तस्य ह नचिकेता श्रद्धाविवेश समाने वर्षे पितरं निनीषन्नुवाच तात कस्मै मां दास्यसीति ॥२॥`, transliteration: `tasya ha naciketā śraddhāviveśa samāne varṣe pitaraṁ ninīṣann uvāca tāta kasmai māṁ dāsyasīti ||2||`, english: `While still a boy, faith entered Nachiketa. He thought: "To whom will he give me?" He said to his father: "Father, to whom will you give me?"`, commentary: `A remarkable transformation occurs. Shraddha — deep spiritual faith — enters young Nachiketa. This is not intellectual curiosity but a profound inner awakening. The child is seized by the impulse to know, to question, to seek the ultimate truth.

Nachiketa asks his father an extraordinary question: "To whom will you give me?" If the father is truly giving away everything in this sacrifice, then his son — his most precious possession — must also be offered. The child holds the father accountable to his own stated ideal.

This question cuts through all pretense. The father wants spiritual merit from giving away things he no longer values, but he is not willing to give what truly matters. Nachiketa exposes this hypocrisy with innocent directness.

Symbolically, Nachiketa represents the soul or the higher self, and the father represents the worldly mind that performs religious rituals without genuine transformation. The soul asks the mind: "If you truly wish to be free, then surrender me — surrender your deepest self — completely to the divine. Don't just give away your leftover attachments.` },
    { id: `katha.1.1.3`, sanskrit: `तं होवाच मृत्यवे त्वा ददामीति ।
स होवाच किमस्मीत्येकमपि नाहम् अनुभवामि ॥३॥`, transliteration: `taṁ hovāca mṛtyave tvā dadāmīti |
sa hovāca kim asmy ekaṁ api nāham anubhavāmi ||3||`, english: `The father said: "I give you to Death." Nachiketa said: "What am I? I am but one among many. Of those who went before, what did they do? Of those who will come after, what will they do? Consider this and tell me."`, commentary: `In anger and frustration, the father blurts out: "I give you to Death!" — to Yama, the Lord of Death. This is spoken in rage, not wisdom. The father has no idea that his angry words will unlock the greatest spiritual teaching in Indian philosophy.

Nachiketa does not resist or protest. He accepts his father's word as binding, because in Vedic culture, a father's word was sacred. But his response reveals a remarkable equanimity. He is not terrified of Death but curious about it.

His question is profound: "What am I?" This is the fundamental spiritual inquiry. Nachiketa is not asking about what happens to the body at death — he is asking about the nature of the Self. Who am I? What is my true nature? This is the same question that Ramana Maharshi would later teach as the central practice of self-inquiry.

The father's curse becomes the son's blessing. It is often our painful experiences — our frustrations, our rejections, our moments of being "sent to Death" — that become the doorway to the deepest wisdom. Grace sometimes comes disguised as disaster.` },
    { id: `katha.1.1.4`, sanskrit: `स पितरं वरमवृणीत पुराणं वृणे वरम् ।
यदेव मन्ये स त्वं वित्त तत्त्वतः ॥४॥`, transliteration: `sa pitaraṁ varam avṛṇīta purāṇaṁ vṛṇe varam |
yad eva manye sa tvaṁ vitta tattvataḥ ||4||`, english: `Nachiketa said: I choose as my first boon that when I return from Yama's abode, my father will be peaceful and will recognize me with the same love as before.`, commentary: `Nachiketa's first request reveals his extraordinary character. Faced with Death, he does not ask for wealth, long life, or power. His first thought is for his father's well-being — that his father should be free from guilt and anger when Nachiketa returns.

This shows that the spiritual path begins with love and reconciliation. Before seeking the highest knowledge, Nachiketa ensures that his relationships are healed. The desire for his father's peace indicates a heart already purified by compassion.

"Purāṇaṁ vṛṇe" — "I choose the ancient boon." The reconciliation of parent and child is an "ancient" need, as old as humanity itself. This verse teaches that no amount of spiritual knowledge can compensate for broken relationships. The foundation of wisdom is a heart at peace with those around us.

For the seeker, this verse sets a precedent: the first step on the path is not dramatic but humble — making peace, expressing love, ensuring that our spiritual journey does not leave behind a trail of hurt and misunderstanding.` },
    { id: `katha.1.1.5`, sanskrit: `प्रथमे वरे नचिकेता यमं वव्रे |
स तुभ्यं वरं ददौ पुनरेव नचिकेताय ॥५॥`, transliteration: `prathame vare naciketā yamaṁ vavre |
sa tubhyaṁ varaṁ dadau punar eva naciketāya ||5||`, english: `Yama granted the first boon. As before, Nachiketa was with his father, whose anger had subsided and who was freed from sin.`, commentary: `Yama grants the first boon. The father's anger dissolves, and he welcomes his son back with love. This brief verse marks the completion of the first exchange between Nachiketa and Death.

The fact that Yama grants the boon immediately shows that even Death respects the love between parent and child. The cosmic order honors the bonds of the heart. Before the great philosophical teaching begins, the Upanishad establishes that love is the foundation.

With the first boon granted, Nachiketa is now free to ask his remaining two questions. Having demonstrated selflessness in his first request, he has proven himself worthy of the highest teaching. Yama will now offer him increasingly profound knowledge.

This verse also marks the transition from the story's beginning to its philosophical core. The narrative framework — a boy sent to Death, a father's remorse, a cosmic judge — all of this is the stage upon which the deepest truths about the Self will be revealed.` },
    { id: `katha.1.1.6`, sanskrit: `तमु होवाच यमः प्रियं प्रियाणाम् |
त्वमग्निं विद्वान् अमृतत्वमभजो मह्यं ॥६॥`, transliteration: `tam u hovāca yamaḥ priyaṁ priyāṇām |
tvam agniṁ vidvān amṛtatvam abhajo mahyaṁ ||6||`, english: `Yama said: "As you are dear to me, I shall give you another boon. You have seen the fire-knowledge, the path to immortality. Ask, for it was through me that this fire was known."`, commentary: `Yama, pleased with Nachiketa's selflessness, offers him a special gift: knowledge of the Nachiketa fire ritual — a sacred fire ceremony that leads to immortality. This is not merely a ritual but a symbolic teaching about the fire of knowledge that burns the bonds of ignorance.

"Tvam agniṁ vidvān" — "you, knowing the fire." The "fire" here has multiple levels of meaning. On the external level, it refers to a specific Vedic ritual. On the internal level, it refers to the fire of knowledge (jnana agni) that consumes all ignorance and leads to the deathless state.

"Amṛtatvam abhaḥ" — "you have attained immortality." This is significant: Yama himself acknowledges that Nachiketa has already achieved immortality through his selfless choice. By choosing love over fear, by choosing his father's peace over personal safety, Nachiketa has already transcended death in the deepest sense.

Yama then invites Nachiketa to ask his remaining questions. The teacher has recognized the student's worthiness. In the Upanishadic tradition, the highest knowledge is given only to those who have proven themselves through their actions, not merely their desires.` },
    { id: `katha.1.1.7`, sanskrit: `तमु होवाच यमः प्रियं प्रियाणाम् |
वृणीष्व वरान् त्रीन् एतान् तेऽभिप्रयच्छामि ॥७॥`, transliteration: `tam u hovāca yamaḥ priyaṁ priyāṇām |
vṛṇīṣva varān trīn etān te'bhiprayacchāmi ||7||`, english: `Yama said: "Choose three boons, O Nachiketa, for I shall grant them to you."`, commentary: `Yama offers three boons — one for each night Nachiketa spent at his door without food. In Vedic tradition, a guest who stays three nights without being fed earns the host three boons. This detail is significant: Nachiketa arrived at Death's house and waited without being received or fed for three nights.

The number three recurs throughout the Upanishad and Indian philosophy: three worlds, three gunas, three states of waking consciousness. Three is the number of completeness in Vedic symbolism.

Now Nachiketa will demonstrate his spiritual maturity through his choices. He has already used one boon to restore peace with his father. The remaining two boons will take him progressively deeper into the nature of reality.

The scene is set for one of the most dramatic dialogues in all spiritual literature: a young boy questioning the Lord of Death about the ultimate nature of existence. Yama, who has seen every soul pass through his domain, will now teach the one who refused to fear him.` },
    { id: `katha.1.1.8`, sanskrit: `स ऊर्ध्वं नचिकेता अवदत् |
यम ते प्रथमो वरो यथा नाम प्रियं भवेत् ॥८॥`, transliteration: `sa ūrdhvaṁ naciketā avadat |
yama te prathamo varo yathā nāma priyaṁ bhavet ||8||`, english: `Nachiketa said: "O Yama, as my first boon, let Auddalaki Aruni — my father — be free from anxiety. Let his anger toward me be pacified. Let he recognize me and speak to me lovingly when you release me."`, commentary: `Nachiketa uses his first of the three new boons to ensure his father's peace. He names his father specifically — Auddalaki Aruni, son of Uddalaka — showing that his concern is not abstract but deeply personal.

"Let his anger toward me be pacified" — the child wants his father to be free from the torment of guilt. "Let him recognize me and speak to me lovingly" — Nachiketa wants not just his father's forgiveness but his father's love. He wants to be seen and welcomed back with warmth.

This request demonstrates that the highest spiritual attainment does not diminish human love but deepens it. Nachiketa does not transcend his father — he returns to him with greater tenderness.

The repetition of this request (it was also the first boon in verse 4) emphasizes that love is not a preliminary stage to be transcended but the very foundation of wisdom. The Upanishad teaches that the one who cannot love cannot truly know. Compassion is not a weakness but the very texture of enlightenment.` },
    { id: `katha.1.1.9`, sanskrit: `तं होवाच यमः प्रियं प्रियाणाम् |
यथा त्वम् अग्निं वित्त्वा अमृतत्वमभजो मह्यं ॥९॥`, transliteration: `taṁ hovāca yamaḥ priyaṁ priyāṇām |
yathā tvam agniṁ vittvā amṛtatvam abhajo mahyaṁ ||9||`, english: `Yama granted this. As before, Nachiketa's father was pacified, freed from anger and fear, and spoke gently to his son.`, commentary: `The second first boon is granted. The father is restored to peace, and the bond between father and son is healed. This brief verse marks the completion of the emotional foundation that Nachiketa needed before proceeding to the highest questions.

With his father's love restored, Nachiketa is now free to ask his remaining two questions. He has demonstrated that his heart is in the right place — he values human love and family bonds even as he stands before Death itself.

The Upanishad uses this narrative structure to teach that spiritual seekers need not abandon their humanity. The monk who renounces family for the cave may miss something essential. Nachiketa shows that the true sage holds both the world and the Absolute in a single embrace.

From here, the teaching moves to the cosmic level. Nachiketa's next questions will probe the nature of death, the afterlife, and the Self — the questions that have haunted humanity since the beginning of consciousness.` },
    { id: `katha.1.1.10`, sanskrit: `स ऊर्ध्वं नचिकेता अवदत् |
यम द्वितीयेन वरेणेमं लोकं पश्यति ॥१०॥`, transliteration: `sa ūrdhvaṁ naciketā avadat |
yama dvitīyena vareṇemaṁ lokaṁ paśyati ||10||`, english: `Nachiketa said: "In the heavenly world there is no fear at all. You are not there, O Yama, nor is old age. Crossing over both hunger and thirst, crossing over sorrow, one rejoices in the world of heaven."`, commentary: `Nachiketa now asks his second question — and it is about heaven. He describes the heavenly realm (svarga) as a place free from fear, old age, hunger, thirst, and sorrow. He asks Yama to teach him the fire ritual that leads to this heavenly world.

This is a significant step. Nachiketa is not yet asking about the ultimate truth — he is asking about a better world, a realm of enjoyment without suffering. Many seekers stop here: they want a better life, a heavenly afterlife, freedom from pain.

But this is still within the realm of duality. Heaven, however beautiful, is temporary. It is a reward for good karma, and when that karma is exhausted, the soul must return to the earthly plane. The Upanishad will show that Nachiketa's real question goes far beyond heaven.

The fire ritual (Nachiketa fire) that Yama teaches in response is a symbolic representation of the spiritual path itself — the inner fire that transforms consciousness and leads to higher states of being.` },
    { id: `katha.1.1.11`, sanskrit: `स होवाच यमः प्रियं प्रियाणाम् |
एष ते�ग्निर् नचिकेतो विहितः प्रजापतौ ॥११॥`, transliteration: `sa hovāca yamaḥ priyaṁ priyāṇām |
eṣa te 'gnir naciketo vihitaḥ prajāpatau ||11||`, english: `Yama said: "This fire, O Nachiketa, I shall explain to you — the fire born of the sacrifice, the support of the worlds, hidden in the cave of the heart."`, commentary: `Yama begins teaching the Nachiketa fire ritual. He reveals that this fire is not merely an external ritual but is "hidden in the cave of the heart" (guhā hitam). This is a direct reference to the inner fire of consciousness, the spiritual heart where the Self dwells.

"Prajāpatau vihitaḥ" — "established in Prajapati, the Creator." The fire of knowledge is the creative principle itself. The entire universe is born from this fire — the fire of consciousness that manifests as all existence.

Yama teaches Nachiketa the specific details of building the fire altar, the number of bricks, and the mantras to be recited. Each detail has a symbolic meaning related to the structure of consciousness and the cosmos. The 36 bricks correspond to the 36 principles of Samkhya philosophy; the fire itself represents the awakened awareness that illuminates the inner world.

This teaching bridges the external and internal: the ritual fire is a physical representation of the inner spiritual fire. The sage who understands both levels — who performs the outer ritual while kindling the inner flame — attains the heavenly world and beyond.` },
    { id: `katha.1.1.12`, sanskrit: `तमस्य नचिकेतो व्याचचक्षे |
तमस्य नचिकेतो व्याचचक्षे तं ब्रह्मायमग्निं ॥१२॥`, transliteration: `tam asya naciketo vyācacakṣe |
tam asya naciketo vyācacakṣe taṁ brahmāyam agniṁ ||12||`, english: `Nachiketa repeated the fire-knowledge as Yama had taught it. Yama was pleased and said: "I give you yet another boon. This fire shall be called by your name."`, commentary: `Yama is pleased with Nachiketa's understanding and grants him a special honor: the fire ritual will be named after him — the Nachiketa fire. In Vedic tradition, having a sacred teaching named after you is the highest honor, as it means your name will be remembered and chanted for generations.

"I give you yet another boon" — Yama continues to shower Nachiketa with gifts, recognizing the boy's extraordinary spiritual capacity. Each time Nachiketa demonstrates wisdom, Yama responds with greater generosity.

"Taṁ brahmāyam agniṁ" — "this fire is Brahman." Here Yama makes a crucial statement: the fire ritual IS Brahman, the Absolute. This collapses the distinction between the ritual and the ultimate reality. The fire is not a means to reach God — the fire IS God. The ritual is not separate from the Absolute — it is an expression of it.

This teaching elevates ritual to the level of mysticism. External worship, when performed with understanding, IS the direct perception of the divine. The sacred fire, the altar, the mantras — all are manifestations of the one consciousness that pervades everything.` },
    { id: `katha.1.1.13`, sanskrit: `त्रीणि नचिकेतस्त्रिभिरेत्य संधिं |
त्रिकर्मकृत् तरति जन्ममृत्यू ॥१३॥`, transliteration: `trīṇi naciketas tribhir etya sandhiṁ |
tri-karmakṛt tarati janma-mṛtyū ||13||`, english: `The three Nachiketa fires — the one who knows these three, having united with the three, having performed the three works, crosses over birth and death.`, commentary: `This verse reveals the deeper meaning of the Nachiketa teaching. The "three fires" refer to three aspects of spiritual practice: knowledge, action, and meditation. When these three are united (sandhiṁ), the seeker transcends the cycle of birth and death.

"Tri-karmakṛt" — "performer of the three works." The three works are: the study of scriptures (adhyayana), teaching (adhyapana), and sacrifice (yajna). When these are performed with understanding of their inner meaning, they become the path to liberation.

"Tarati janma-mṛtyū" — "crosses over birth and death." This is the ultimate promise: freedom from the wheel of rebirth. Not a better birth, not a heavenly realm, but complete liberation from the cycle itself.

The repetition of "three" throughout this verse emphasizes the completeness of the teaching. Three fires, three works, three levels of understanding — all converging on the single point of transcendence. The spiritual path is not partial but holistic, engaging body, mind, and spirit in a single integrated practice.` },
    { id: `katha.1.1.14`, sanskrit: `त्रीण्येतत् त्रिभिर् एत्य संधिं |
त्रिकर्मकृद् ब्रह्मम् अविद्वान् अविन्दन् ॥१४॥`, transliteration: `trīṇy etat tribhir etya sandhiṁ |
tri-karmakṛd brahmam avidvān avindan ||14||`, english: `Knowing these three — the three Nachiketa fires — one who is united, who performs the three works, and who sees the fire as Brahman, this one is released from the knot of the heart.`, commentary: `This verse deepens the teaching of the previous one. The key phrase is "brahmam avidvān avindan" — "one who sees the fire as Brahman." This is not intellectual knowledge but direct perception. The person who sees Brahman in the fire — in the ritual, in the act of worship, in the very act of living — is freed.

"The knot of the heart" (hṛdaya granthi) is a technical term in Vedantic philosophy. It refers to the binding of consciousness by ignorance, desire, and karma — the knots that tie the soul to the wheel of rebirth. When these knots are loosened through knowledge and practice, the soul is freed.

The verse teaches that liberation comes not from a single practice but from the integration of understanding, action, and perception. One must know the teaching, practice the teaching, and ultimately BECOME the teaching — seeing Brahman everywhere, in everything, at all times.

This is the first major philosophical statement of the Katha Upanishad. It moves beyond ritual to realization, beyond performance to perception. The fire is not just fire — it is the Absolute itself, manifesting as the physical world.` },
    { id: `katha.1.1.15`, sanskrit: `जानत्वा कालकालं च युक्तो योगेन नचिकेतम् |
मुक्तो मुक्तं अवाप्नोति स ब्रह्म विदित्वा ॥१५॥`, transliteration: `jānatvā kālakālaṁ ca yukto yogena naciketam |
mukto muktaṁ avāpnoti sa brahma viditvā ||15||`, english: `This is your well-known Nachiketa fire, O Nachiketa. I declare to you the means of attaining heaven. This fire is established in the cavity of the heart. Meditate on this fire as the support of the world.`, commentary: `Yama continues his teaching of the Nachiketa fire. He reveals that this fire is "established in the cavity of the heart" (guhāṁ pratiṣṭhitam). This is the crucial point: the sacred fire is not merely an external ritual but an inner reality. The fire of consciousness burns within every being.

"Meditate on this fire as the support of the world" — the inner fire is not just personal but cosmic. It is the sustaining principle of the entire universe. The same consciousness that illuminates your inner world is the light that sustains all existence.

The transition from external ritual to internal meditation is the hallmark of the Upanishadic teaching. The Vedas prescribed elaborate fire rituals; the Upanishads reveal the inner fire that those rituals symbolize. This is not a rejection of ritual but its fulfillment — understanding the inner truth that the outer practice was designed to awaken.

For the practitioner, this verse invites a shift in perspective: when you meditate, when you perform any sacred act, recognize that the fire of awareness within you IS the divine fire. You are not worshipping something separate — you are awakening to what you already are.` },
    { id: `katha.1.1.16`, sanskrit: `तमस्य नचिकेतस्तृतीयं वरं वृणीते |
मृत्युप्रोक्तां संशयो मे विवरणम् ॥१६॥`, transliteration: `tam asya naciketas tṛtīyaṁ varaṁ vṛṇīte |
mṛtyuproktāṁ saṁśayo me vivaraṇam ||16||`, english: `Then Nachiketa chose the third boon: "There is this doubt regarding what happens after death. Some say the Self exists after death, others say it does not. Teach me the truth."`, commentary: `Now Nachiketa asks his ultimate question. After securing his father's peace and learning the fire ritual, he turns to the question that has haunted humanity since consciousness first became aware of its own mortality: "What happens after death? Does the Self survive, or not?"

"There is this doubt" — the word "saṁśaya" means doubt, uncertainty. This is not an abstract philosophical question but an existential one. Every human being faces death. Every human being wonders: is this all there is? Does something survive?

"Some say the Self exists after death, others say it does not" — even in ancient India, there was disagreement about this fundamental question. Materialists (Charvakas) denied the afterlife; Vedic ritualists believed in heavenly rewards; yogis and sages claimed direct knowledge of the immortal Self.

Nachiketa asks Yama — Death itself — to resolve this question once and for all. Who better to answer than the one who has witnessed every death, received every departing soul? This is the moment the entire Upanishad has been building toward.` },
    { id: `katha.1.1.17`, sanskrit: `देवैरत्रापि विचिकित्सितं पुरा |
न सुज्ञेयम् अणुर् एष धर्मः ॥१७॥`, transliteration: `devair atrāpi vicikitsitaṁ purā |
na sujñeyam aṇur eṣa dharmaḥ ||17||`, english: `Yama said: "Even the gods had doubts about this in ancient times. This truth is not easy to know. This subtle dharma is difficult to understand. Choose another boon, O Nachiketa. Do not press me. Release me from this."`, commentary: `Yama's response is remarkable. Instead of answering, he tries to dissuade Nachiketa. "Even the gods had doubts about this" — if the divine beings themselves struggled with this question, it is not something easily taught.

"Na sujñeyam aṇur eṣa dharmaḥ" — "this truth is not easy to know; this dharma is subtle." The word "anu" means subtle, atomic — pointing to the fact that the Self is the subtlest of all realities, not perceivable by the senses or grasped by the mind.

Yama's attempt to deflect Nachiketa is part of a traditional teaching method. In the Upanishadic tradition, the teacher tests the student's sincerity before giving the highest knowledge. If the student gives up easily, they are not ready. If they persist — as Nachiketa will — they prove their worthiness.

This exchange also reflects a deeper truth about spiritual knowledge: it cannot be given to those who merely want information. It reveals itself only to those who burn with the desire to know, who will not accept substitutes or half-truths.` },
    { id: `katha.1.1.18`, sanskrit: `अन्यान् वरान् नचिकेतो वृणीते मा मा सृजेति |
शतं जीवेम शरदः शतं शृणुयाम शरदः ॥१८॥`, transliteration: `anyān varān naciketo vṛṇīte mā mā sṛjeti |
śataṁ jīvema śaradaḥ śataṁ śṛṇuyāma śaradaḥ ||18||`, english: `Yama said: "Choose sons and grandsons who live a hundred years. Choose elephants, gold, horses, and vast land. Choose a long life. I shall grant you whatever pleasure is difficult to obtain on earth."`, commentary: `Yama now offers Nachiketa a dazzling array of worldly pleasures: long life, wealth, power, descendants, land — everything that human beings desire. This is the great temptation. Death itself is offering Nachiketa unlimited material happiness.

"Choose a long life" — the desire for longevity is perhaps the most universal human wish. "Choose elephants, gold, horses" — in ancient India, these were the symbols of royal power and wealth. "Whatever pleasure is difficult to obtain on earth" — Yama is offering the best of the best.

This is a crucial test. If Nachiketa accepts any of these, he will never receive the knowledge of the Self. The Upanishad teaches that worldly pleasures and spiritual knowledge are not necessarily incompatible, but the seeker who chooses pleasure over truth at the moment of decision reveals where their heart truly lies.

Yama is essentially asking: "What do you really want? Happiness, or truth?" This is the question every seeker must face. Do you want a comfortable life, or do you want liberation? The answer reveals the depth of one's spiritual maturity.` },
    { id: `katha.1.1.19`, sanskrit: `एतत् तुभ्यं नरकाद् भयाद् उद्धरिष्यामि |
मा मा सृजेति नचिकेतोऽवदत् ॥१९॥`, transliteration: `etat tubhyaṁ narakād bhayād uddhariṣyāmi |
mā mā sṛjeti naciketo 'vadat ||19||`, english: `These pleasures, lasting as long as the sun rises and sets — these are yours, O Nachiketa. Ask for elephants, horses, gold, and vast kingdoms. But do not ask about death.`, commentary: `Yama intensifies his offer. He promises Nachiketa pleasures that last as long as the sun rises and sets — meaning for an entire cosmic cycle. This is an almost unimaginable duration of happiness.

"Do not ask about death" — Yama explicitly tells Nachiketa to avoid the question about the Self and death. This is the final test. Will Nachiketa choose the easy path of enjoyment, or will he persist in seeking the ultimate truth?

The phrase "these are yours" (etat tubhyam) shows Yama's generosity — he is not withholding pleasure out of cruelty but offering it freely. The temptation is genuine: who would refuse unlimited happiness? Only the one who has seen something beyond happiness — something that makes even the greatest pleasure seem like a trifle.

Nachiketa's response will reveal the depth of his realization. The true seeker does not reject pleasure out of prudishness or self-denial, but because they have tasted something infinitely greater — the bliss of the Self that makes all worldly pleasure pale in comparison.` },
    { id: `katha.1.1.20`, sanskrit: `श्वोभावा मर्त्यस्य यदन्तकैतत् |
सर्वेन्द्रियाणां जरयन्ति तेजः ॥२०॥`, transliteration: `śvobhāvā martyasya yad antakaitat |
sarvendriyāṇāṁ jarayanti tejaḥ ||20||`, english: `All these things are but the pleasures of a mortal life, O Death. Even the longest life is short. Keep your horses, dancing, and singing for yourself.`, commentary: `Nachiketa refuses all of Yama's offers. His response is devastating in its clarity: "All these things are but the pleasures of a mortal life." Even the greatest pleasures are temporary. Even the longest life ends. Why would I trade the eternal for the fleeting?

"Śvobhāvā" — "lasting until tomorrow." This is Nachiketa's assessment of all worldly pleasures: they last only until tomorrow. Death can come at any moment, and all the wealth, power, and pleasure in the world cannot prevent it.

"Keep your horses, dancing, and singing for yourself" — this is not rudeness but clarity. Nachiketa is saying: "Your gifts are worthless compared to what I seek. Give them to someone who values them. I want something that cannot be taken away."

This verse marks the moment of Nachiketa's spiritual maturity. He has seen through the illusion of temporary happiness and is fixed on the eternal. This is viveka — discrimination — the ability to distinguish between the real and the unreal, the permanent and the temporary. It is the foundation of all spiritual progress.` },
    { id: `katha.1.1.21`, sanskrit: `ये यं लोकं मन्यमाना विशन्ति |
तस्मै तस्मै हि लोकाय नमस्कुर्वन्ति ॥२१॥`, transliteration: `ye yaṁ lokaṁ manyamānā viśanti |
tasmai tasmai hi lokāya namaskurvanti ||21||`, english: `The joy and pleasure you offer — these will end when all the pleasures of the great ones end. The longest life is but a trifle. Keep your chariots, keep your dance and song.`, commentary: `Nachiketa continues to reject Yama's offers with increasing firmness. He recognizes that even the greatest pleasures — those enjoyed by the gods themselves — have an expiration date. In the cosmic perspective, even a life of billions of years is but a moment.

"Keep your chariots, keep your dance and song" — these symbols of worldly power and entertainment hold no attraction for one who has glimpsed the eternal. The Upanishad is not condemning pleasure but placing it in proper perspective. A cup of water is wonderful when you are thirsty, but it means nothing when you are drowning.

This verse reinforces the teaching of discrimination (viveka). The spiritual seeker must learn to evaluate everything in terms of permanence. What lasts? What endures? What cannot be taken away? Only the Self — the Atman — survives the destruction of all else.

Nachiketa's rejection is not asceticism born of fear or self-denial. It is the natural response of someone who has tasted the infinite. Once you have known the ocean, a puddle no longer tempts you.` },
    { id: `katha.1.1.22`, sanskrit: `न वित्तेन तर्पणीयो मनुष्यो |
लप्स्यामहे वित्तम् अद्राक्ष्म चेत् त्वाम् ॥२२॥`, transliteration: `na vittena tarpaṇīyo manuṣyo |
lapsyāmahe vittam adrākṣma ced tvām ||22||`, english: `No mortal can be satisfied by wealth alone. Having seen you, we shall obtain wealth. Having seen you, we shall live as long as you wish.`, commentary: `Nachiketa makes a profound statement: "No mortal can be satisfied by wealth alone." This is a universal truth that transcends time and culture. Wealth brings comfort but not fulfillment. Power brings influence but not peace. Only the direct knowledge of the Self — the vision of Yama that Nachiketa is pursuing — can truly satisfy.

"Having seen you, we shall obtain wealth" — this is not a bargaining tactic but a statement of spiritual law. When one has the direct vision of the divine, all other blessings naturally follow. The sage who knows the Self does not need to seek wealth — wealth seeks the sage.

"Having seen you, we shall live as long as you wish" — Nachiketa is not asking for immortality in the body but for the grace of Yama's teaching. He is saying: "Teach me, and I will accept whatever lifespan you decree. The knowledge itself is the real gift."

This verse reveals Nachiketa's complete trust in the divine order. He does not need to bargain or manipulate. He simply asks for the truth and accepts whatever comes with it.` },
    { id: `katha.1.1.23`, sanskrit: `अशरीरं शरीरेषु अनवस्थेष्व् अवस्थितम् |
महान्तं विभुम् आत्मानं मत्वा धीरो न शोचति ॥२३॥`, transliteration: `aśarīraṁ śarīreṣu anavastheṣv avasthitam |
mahāntaṁ vibhum ātmānaṁ matvā dhīro na śocati ||23||`, english: `Having seen your form — the ancient, bodiless one who dwells within the body, the one who dwells among the unstable, the great, the all-pervading Self — the wise one does not grieve.`, commentary: `Nachiketa now reveals what he has already glimpsed: "the ancient, bodiless one who dwells within the body." This is a direct description of the Atman — the Self that is formless yet present within every form, unchanging yet present within every change.

"Aśarīraṁ śarīreṣu" — "bodiless in the bodies." The Self has no body of its own, yet it dwells in every body. Like space that pervades all containers without being limited by any of them, the Self pervades all bodies without being confined to any.

"Anavastheṣv avasthitam" — "established among the unstable." Everything in the world is unstable — bodies, thoughts, emotions, circumstances. Yet within this constant flux, the Self remains unmoved. It is the unmoving center around which all change revolves.

"Mahāntaṁ vibhum ātmānaṁ" — "the great, all-pervading Self." The Self is not small or limited. It is vast, infinite, present everywhere. The sage who sees this does not grieve (na śocati), because there is nothing to grieve for. What can be lost when everything is the Self?

This verse is one of the clearest descriptions of the Atman in all the Upanishads. It states the essential teaching: the Self is formless, eternal, all-pervading, and present within every form. To know this is to be free from grief.` },
    { id: `katha.1.1.24`, sanskrit: `आसीनो दूरं व्रजति शयानो याति सर्वतः |
कस्तं मदामदं देवं मदन्यो ज्ञातुमर्हति ॥२४॥`, transliteration: `āsīno dūraṁ vrajati śayāno yāti sarvataḥ |
kas taṁ madāmadaṁ devaṁ mad anyo jñātum arhati ||24||`, english: `Seated, the Self goes far. Lying down, it goes everywhere. Who other than myself can know that divine joy beyond joy?`, commentary: `This verse describes the paradoxical nature of the Self through everyday actions. "Seated, it goes far" — even while the body is still, the Self pervades all space. "Lying down, it goes everywhere" — even in sleep, consciousness continues to pervade.

These descriptions point to the nature of awareness itself. When you sit quietly, your consciousness is not confined to the room — you can think of distant places, remember the past, imagine the future. Awareness is not limited by the body's position.

"Who other than myself can know that divine joy beyond joy?" — this is a remarkable declaration. The Self is the only knower of itself. No external teaching, no scripture, no guru can give you the experience of the Self — only the Self knows the Self. Others can point the way, but the actual knowing is an internal event.

"Madāmadaṁ" — "joy beyond joy" or "intoxication beyond intoxication." The bliss of the Self surpasses all other forms of happiness. It is not the excitement of pleasure but the deep, unshakable contentment of being itself. This is ananda — the bliss that is the nature of the Self.` },
    { id: `katha.1.1.25`, sanskrit: `यं यं लोकं मन्यमाना विशन्ति |
तं तम् ईशानो भूत्वा भूत्या बिभर्ति ॥२५॥`, transliteration: `yaṁ yaṁ lokaṁ manyamānā viśanti |
taṁ tam īśāno bhūtvā bhūtyā bibharti ||25||`, english: `The wise one who knows the Self, which is bodiless among the bodied, permanent among the impermanent, great and all-pervading — such a one does not grieve.`, commentary: `This verse restates the teaching of verse 23 with a slight variation, emphasizing different aspects of the Self. "Bodiless among the bodied" — the Self is not a body, yet it animates all bodies. "Permanent among the impermanent" — everything changes, but the Self does not.

"Great and all-pervading" — the Self is not a small entity trapped in a body. It is infinite, present everywhere. The body is like a lamp that localizes light, but the Self is like the light itself — it radiates in all directions without limit.

The repetition of "such a one does not grieve" (na śocati) emphasizes this central point: grief comes from loss, and loss comes from identification with what is limited and temporary. When you identify with the infinite Self, there is nothing to lose and therefore nothing to grieve.

This teaching is not meant to suppress grief but to address its root cause. Grief is natural when we identify with the body and lose someone we love. But when we recognize that the same Self that animates our loved ones is the Self that animates all beings — and that Self is eternal — grief is transformed into understanding.` },
    { id: `katha.1.1.26`, sanskrit: `तं दुर्दर्शं गूढम् अनुप्रविष्टं |
गुहाहितं गह्वरेष्ठं पुराणम् ॥२६॥`, transliteration: `taṁ durdarśaṁ gūḍham anupraviṣṭaṁ |
guhāhitaṁ gahvareṣṭhaṁ purāṇam ||26||`, english: `The Self is difficult to perceive, hidden, dwelling in the inner cave, residing in the deep secret place, ancient.`, commentary: `This verse describes the difficulty of perceiving the Self. It is "difficult to see" (durdarśam) — not because it is far away but because it is too close. The eye cannot see itself; the Self cannot be perceived as an object because it is the very subject that perceives.

"Hidden" (gūḍham) — the Self is concealed by the very mind that seeks it. The constant stream of thoughts, desires, and identifications acts as a screen that hides the awareness behind it. Like the sun hidden by clouds, the Self is always present but obscured.

"Dwelling in the inner cave" (guhāhitam) — the Upanishads consistently describe the Self as residing in the "cave of the heart" (guhā). This is not the physical heart but the innermost sanctuary of consciousness — the space of pure awareness that underlies all experience.

"Ancient" (purāṇam) — the Self is older than the oldest. It existed before the body, before the mind, before the universe itself. It is the primordial consciousness from which all things arise. To know it is to know the source of everything.` },
    { id: `katha.1.1.27`, sanskrit: `विविक्तद्रोणं विविक्तशयनम् |
विविक्तस्थानम् अनुप्रविष्टम् ॥२७॥`, transliteration: `viviktadroṇaṁ viviktaśayanam |
viviktasthānam anupraviṣṭam ||27||`, english: `Having understood the Self through the body — through the control of the senses, through the practice of meditation — the wise one finds joy. Having known the Self, the great, all-pervading one, the wise one does not grieve.`, commentary: `The practice of meditation is described here as the means of knowing the Self. "Through the control of the senses" (indriyāṇāṁ samyama) — the senses must be turned inward, away from external objects, toward the inner source of awareness.

"Through the practice of meditation" (dhyāna) — this is the active component. The seeker sits quietly, withdraws attention from the external world, and focuses on the inner silence. In this silence, the Self begins to reveal itself.

"Having known the Self, the great, all-pervading one, the wise one does not grieve" — the result of meditation is not a pleasant feeling or a temporary calm. It is the direct knowledge of the Self as infinite and all-pervading. This knowledge eliminates grief at its root.

This verse bridges the gap between theory and practice. The previous verses described the Self; this verse tells us how to know it directly: through sense control and meditation. Knowledge alone is not enough — it must be realized through practice.` },
    { id: `katha.1.1.28`, sanskrit: `नायमात्मा प्रवचनेन लभ्यो |
न मेधया न बहुना श्रुतेन ॥२८॥`, transliteration: `nāyam ātmā pravacanena labhyo |
na medhayā na bahunā śrutena ||28||`, english: `This Self cannot be attained by instruction, nor by intellectual power, nor even by much hearing. It is attained only by the one whom the Self chooses. To such a one, the Self reveals its own nature.`, commentary: `This is one of the most famous verses in the Upanishads, and one of the most challenging. It states plainly that the Self cannot be attained through any external means — not through teaching (pravacana), not through intelligence (medha), not through extensive study of scriptures (bahu śruta).

This seems to negate all spiritual practice. If the Self cannot be attained through instruction, why study? If not through intelligence, why think? If not through hearing scriptures, why listen?

The answer lies in the final line: "the Self reveals its own nature" (ātmanā ātmānaṁ vibhāti). The Self is not an object to be obtained — it is the subject that is already present. All spiritual practices — study, meditation, devotion — do not create the Self but remove the obstacles that prevent its recognition. Like clouds clearing to reveal the sun, practices clear the mind to reveal the Self that was always there.

"The one whom the Self chooses" — this implies divine grace. Ultimately, realization is not a human achievement but a divine gift. The seeker's role is to prepare the ground through practice; the Self's role is to reveal itself when the ground is ready. This is the mystery of grace — it cannot be earned, only received.` },
    { id: `katha.1.1.29`, sanskrit: `यमेवैष वृणुते तेन लभ्यः |
तस्यैष आत्मा विवृणुते तनूं स्वाम् ॥२९॥`, transliteration: `yam evaiṣa vṛṇute tena labhyaḥ |
tasyaiṣa ātmā vivṛṇute tanūṁ svām ||29||`, english: `The Self is not attained by the weak, nor by the careless, nor by tapas without the proper knowledge. But the wise one who strives through these means — to such a one, the Self that dwells in the body reveals its own form.`, commentary: `This verse completes the first Valli of the Katha Upanishad with a balanced teaching. While the Self ultimately reveals itself by grace (verse 28), human effort is still necessary. The Self is not for the "weak" (alpa) — those who lack spiritual commitment. Nor for the "careless" (pramatta) — those who are not vigilant in their practice. Nor for one who practices "tapas without proper knowledge" — austerities without understanding.

The balanced approach combines effort and surrender. The seeker practices meditation, studies scripture, and controls the senses — but with the understanding that these practices do not "earn" the Self. They prepare the mind to receive the grace that the Self freely offers.

"Vivṛṇute tanūṁ svām" — "reveals its own form." The Self does not take on a new form; it reveals the form it always had. Like a statue hidden under a cloth — removing the cloth does not create the statue but reveals it. The Self was always present; our practices simply remove the covering of ignorance.

This completes the first Valli with a synthesis: effort is necessary, but grace is the ultimate cause of realization. The seeker does everything possible while knowing that the final revelation comes from beyond the individual will.

ADHYAYA 1, VALLI 2: Yama Teaches the Nature of the Self` },
    { id: `katha.1.2.1`, sanskrit: `पराञ्चि खानि व्यतृणत् स्वयम्भूः |
तस्मात् पराङ् पश्यति नान्तरात्मन् ॥१॥`, transliteration: `parāñci khāni vyatṛṇat svayambhūḥ |
tasmāt parāṅ paśyati nāntar ātman ||1||`, english: `The Self-born one has turned the senses outward. Therefore, one sees the external world but not the inner Self. The wise person turns the gaze inward, seeking immortality.`, commentary: `This is one of the most profound verses in the Upanishads. It explains why we do not perceive the Self: the senses are turned outward, like windows that only look outside. The Self-born Creator (svayambhū) designed the senses to perceive the external world — eyes see objects, ears hear sounds, and so on.

"Tasmāt parāṅ paśyati" — "therefore one sees what is external." We are programmed by our very nature to look outward. This is not a defect but a design. The problem arises when we forget that there is also an interior world — the world of consciousness, awareness, the Self.

"Kecit dhīrāḥ prāṅcyanty eva" — "but some brave ones turn inward." The word "dhīra" means brave, courageous. Turning inward requires courage because it means turning away from the familiar, the comfortable, the known. It means facing the silence, the unknown, the mystery of one's own being.

This verse explains the human condition perfectly: we are built to look outward, and therefore we miss the most obvious reality — the awareness that is doing all the looking. The spiritual path is simply the reversal of attention: from objects to the subject, from the world to the Self.` },
    { id: `katha.1.2.2`, sanskrit: `पराचः कामान् अनुयन्ति बालाः |
ते मृत्योर् यन्ति विततस्य पाशम् ॥२॥`, transliteration: `parācaḥ kāmān anuyanti bālāḥ |
te mṛtyor yanti vitatasya pāśam ||2||`, english: `Fools pursue external pleasures and fall into the wide-spread snare of Death. But the wise, knowing the nature of what is eternal, do not seek the permanent among the impermanent.`, commentary: `This verse draws a sharp distinction between the wise and the foolish. "Fools pursue external pleasures" (parācaḥ kāmān anuyanti bālāḥ) — those who live only for sensory gratification are like moths drawn to a flame. They rush toward pleasure and fall into Death's net.

"Vitatasya pāśam" — "the wide-spread snare." Death's trap is not a narrow, hidden thing — it is spread wide across the entire field of sensory experience. Every attachment, every craving, every identification with the temporary is a thread in this net.

"The wise, knowing the nature of what is eternal, do not seek the permanent among the impermanent" — this is the teaching of viveka, discrimination. The wise person recognizes that happiness, permanence, and reality cannot be found in the world of changing forms. They look instead for the eternal within, the Self that is untouched by change.

This verse is a compassionate warning, not a moral condemnation. It simply states the natural law: those who seek permanent satisfaction in temporary things will always be disappointed. The path of wisdom is to seek the right thing in the right place.` },
    { id: `katha.1.2.3`, sanskrit: `आत्मानं रथिनं विद्धि शरीरं रथमेव तु |
बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥३॥`, transliteration: `ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu |
buddhiṁ tu sārathiṁ viddhi manaḥ pragraham eva ca ||3||`, english: `Know the Self as the lord of the chariot, the body as the chariot itself. Know the intellect as the charioteer, and the mind as the reins.`, commentary: `This is the famous chariot analogy of the Katha Upanishad — one of the most beloved images in Indian philosophy. It is so important that the Bhagavad Gita later echoes it in its first chapter.

The Self (Atman) is the lord — the one who sits in the chariot and directs the journey. The body is the chariot — the vehicle through which the Self moves in the world. The intellect (buddhi) is the charioteer — the discriminating faculty that makes decisions and directs the journey. The mind (manas) is the reins — the controlling mechanism that connects the charioteer to the horses.

This image maps the entire human personality onto a chariot. When all parts work together — when the intellect is sharp, the mind is disciplined, and the senses are controlled — the Self reaches its destination: the realization of its true nature.

When the intellect is dull, the mind undisciplined, and the senses wild, the chariot goes nowhere or crashes. This is the state of the unawakened person — pulled in all directions by uncontrolled senses, with no clear direction or purpose.

The chariot analogy is a complete psychology of the human being, expressed in a single memorable image.` },
    { id: `katha.1.2.4`, sanskrit: `इन्द्रियाणि हयानाहुर् विषयांस्तेषु गोचरान् |
आत्मेन्द्रियमनोयुक्तं भोक्तेत्याहुर् मनीषिणः ॥४॥`, transliteration: `indriyāṇi hayānāhur viṣayāṁs teṣu gocarān |
ātmendriya-mano-yuktaṁ bhoktety āhur manīṣiṇaḥ ||4||`, english: `The senses are called the horses; the objects of sense are the paths they travel. When the Self, the senses, and the mind are united — the wise call this the enjoyer (bhokta).`, commentary: `The analogy continues: the five senses (sight, hearing, touch, taste, smell) are the horses that pull the chariot. The sense objects — the sights, sounds, and experiences of the world — are the roads along which the horses run.

The crucial teaching is: "when the Self, the senses, and the mind are united" — this integration is the goal. When the Self directs the intellect, the intellect holds the reins of the mind, and the mind controls the senses, the entire personality becomes coherent and purposeful.

"Bhoktety āhur manīṣiṇaḥ" — "the wise call this the enjoyer." The Self is not merely a passive witness but the one who experiences, who enjoys, who lives through the body-mind complex. The body-mind is the instrument; the Self is the one who uses it.

This verse explains why we feel fragmented and conflicted: the horses (senses) are running wild, the reins (mind) are loose, the charioteer (intellect) is asleep, and the lord (Self) has forgotten it is even in the chariot. Spiritual practice is the process of bringing order to this chaos — waking the charioteer, tightening the reins, and training the horses.` },
    { id: `katha.1.2.5`, sanskrit: `यस्त्वविज्ञानवान् भवत्य् अयुक्तेन मनसा सदा |
तस्येन्द्रियाण्यवश्यानि दुष्टाश्वा इव सारथेः ॥५॥`, transliteration: `yas tv avijñānavān bhavaty ayuktena manasā sadā |
tasyendriyāṇy avaśyāni duṣṭāśvā iva sāratheḥ ||5||`, english: `But the one who is without understanding, with mind always uncontrolled — their senses are unmanageable, like the wild horses of a charioteer.`, commentary: `This verse describes the condition of the unawakened person. "Without understanding" (avijñānavān) — lacking the discriminative knowledge of the Self. "Mind always uncontrolled" (ayuktena manasā) — the mind is restless, agitated, pulled in every direction.

"Duṣṭāśvā iva sāratheḥ" — "like the wild horses of a charioteer." When the charioteer is incompetent, the horses run wherever they please. Similarly, when the intellect lacks discrimination, the senses pursue whatever attracts them, without restraint or purpose.

This is a perfect description of the ordinary human condition. We are pulled by desire, repelled by aversion, constantly reacting to external stimuli without any inner direction. The mind jumps from thought to thought like a monkey swinging from branch to branch.

The remedy is implied: train the charioteer (develop the intellect through study and reflection), strengthen the reins (discipline the mind through meditation), and tame the horses (control the senses through practice). Only then can the Self — the lord of the chariot — reach its destination.` },
    { id: `katha.1.2.6`, sanskrit: `यस्तु विज्ञानवान् भवति युक्तेन मनसा सदा |
तस्येन्द्रियाणि वश्यानि सदश्वा इव सारथेः ॥६॥`, transliteration: `yas tu vijñānavān bhavati yuktena manasā sadā |
tasyendriyāṇi vaśyāni sad-aśvā iva sāratheḥ ||6||`, english: `But the one who has understanding, with mind always controlled — their senses are manageable, like the well-trained horses of a charioteer.`, commentary: `This verse presents the opposite of the previous one. The person of understanding (vijñānavān) — one who has the discriminative knowledge of the Self — has a controlled mind and manageable senses. The horses (senses) are well-trained, responding to the slightest pull of the reins.

"Sadaśvā iva sāratheḥ" — "like the good horses of a charioteer." Good horses are not suppressed or broken — they are trained with skill and patience. Similarly, the senses in an awakened person are not deadened or denied — they are refined, responsive, and serve the Self's purpose.

The difference between the wise and the foolish is not in their senses — both have the same five senses — but in the quality of their intellect and mind. The wise person has cultivated discrimination, trained the mind through meditation, and learned to direct the senses purposefully.

This verse offers hope: the transformation from uncontrolled to controlled is possible for anyone. It is not a matter of innate talent but of practice and understanding. The chariot analogy makes the spiritual path accessible and practical — it is simply a matter of training each component of the human personality.` },
    { id: `katha.1.2.7`, sanskrit: `यस्त्वविज्ञानवान् भवति अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥७॥`, transliteration: `yas tv avijñānavān bhavati amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||7||`, english: `The one without understanding, with uncontrolled mind, always impure — such a one does not attain that goal and falls back into the cycle of birth and death.`, commentary: `The consequence of living without understanding is stated plainly: saṁsāra — the cycle of birth, death, and rebirth. "Does not attain that goal" — the goal of Self-realization, liberation, the end of suffering.

"Amanaskaḥ" — "without mind" or "with uncontrolled mind." This does not mean the person lacks a mind but that their mind is not functioning as an instrument of discrimination. It is reactive rather than reflective, passive rather than purposeful.

"Aśuciḥ" — "impure." Impurity here refers not to physical dirt but to mental contamination: desire, aversion, delusion, pride, and envy. These mental impurities cloud the intellect and prevent clear perception.

This verse is a wake-up call. It states the stakes: if we do not cultivate understanding and mind-control, we remain trapped in the cycle of suffering. The Upanishad is not threatening but informing — like a doctor explaining the consequences of an unhealthy lifestyle. The choice remains ours.` },
    { id: `katha.1.2.8`, sanskrit: `यस्तु विज्ञानवान् भवति समनस्कः सदा शुचिः |
स तु तत्पदम् आप्नोति यस्माद् भूयो न जायते ॥८॥`, transliteration: `yas tu vijñānavān bhavati samanaskaḥ sadā śuciḥ |
sa tu tat padam āpnoti yasmād bhūyo na jāyate ||8||`, english: `The one who has understanding, with controlled mind, always pure — that one attains the goal from which there is no return to birth.`, commentary: `The positive counterpart: the person of understanding, with a controlled mind and pure heart, attains the goal — liberation (moksha). "From which there is no return to birth" (yasmād bhūyo na jāyate) — this is the definition of liberation. It is not a better birth but the end of birth altogether.

"Samanaskaḥ" — "with controlled mind." The prefix "sa" means "with" and "manas" means "mind" — the mind is present and functioning, but under control. This is not the absence of mind but its mastery.

"Śuciḥ" — "pure." Purity of heart is the prerequisite for Self-realization. When the mind is free from desire, aversion, and delusion, it becomes a clear mirror in which the Self is reflected.

The contrast between verses 7 and 8 is stark and simple: ignorance leads to bondage, understanding leads to freedom. The choice is ours to make, moment by moment, thought by thought. Every time we choose awareness over distraction, discrimination over impulse, we move closer to the goal.` },
    { id: `katha.1.2.9`, sanskrit: `आत्मानं रथिनं विद्धि शरीरं रथमेव तु |
बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥९॥`, transliteration: `indriyāṇi hayān āhur viṣayāṁs teṣu gocarān |
ātmendriya-mano-yuktaṁ bhoktety āhur manīṣiṇaḥ ||9||`, english: `Beyond the senses are the sense objects; beyond the sense objects is the mind; beyond the mind is the intellect; beyond the intellect is the Great Self.`, commentary: `This verse maps the hierarchy of consciousness. Moving from gross to subtle: senses → sense objects → mind → intellect → the Great Self (Mahat Atma). Each level is subtler than the one before it.

"Beyond the intellect is the Great Self" — the Atman transcends even the highest intellectual faculty. The intellect can analyze, discriminate, and reason, but it cannot touch the Self directly. The Self is the source of the intellect, not its product.

"Beyond the Great Self is the Unmanifest" — the causal level of reality, the seed form of all creation. "Beyond the Unmanifest is the Purusha" — the cosmic person, the ultimate reality that transcends all manifestation.

This hierarchy teaches that the spiritual path involves progressively subtler levels of perception. First, we learn to control the senses. Then we discipline the mind. Then we sharpen the intellect. Finally, we transcend the intellect entirely and merge with the Self.

The Upanishad is giving a complete map of reality, from the most physical to the most spiritual. Understanding this map helps the seeker know where they are on the journey and what lies ahead.` },
    { id: `katha.1.2.10`, sanskrit: `इन्द्रियेभ्यः परा ह्यर्था अर्थेभ्यश्च परं मनः |
मनसस्तु परा बुद्धिर् बुद्धेर् आत्मा महान् परः ॥१०॥`, transliteration: `indriyebhyaḥ parā hy arthā arthebhyaś ca paraṁ manaḥ |
manasas tu parā buddhir buddher ātmā mahān paraḥ ||10||`, english: `Beyond the senses are the objects; beyond the objects is the mind; beyond the mind is the intellect; beyond the intellect is the Great Self. Beyond the Great Self is the Unmanifest; beyond the Unmanifest is the Purusha — the all-pervading Being. Having known that Purusha, one is freed.`, commentary: `This verse completes the hierarchy begun in the previous verse, adding two more levels: the Unmanifest (avyakta) and the Purusha (cosmic person, the Absolute).

"Puruṣaḥ sarvabhūtāntarātmā" — "the Purusha is the inner Self of all beings." This is not a distant God but the intimate reality within every creature. The Purusha is closer than close — it is the awareness with which you perceive these words.

"Tam eva puruṣaṁ jñātvā mucyate" — "by knowing that Purusha alone, one is freed." Liberation comes from knowing — not believing, not hoping, not imagining — but directly knowing the Purusha as one's own Self.

"Sukṛtāt sāṅkhyānāṁ yoga" — "this is the supreme path taught by the Sankhyas and Yogis." The Upanishad unites the philosophical tradition (Sankhya) with the practical tradition (Yoga). Understanding and practice go together.

This is one of the most comprehensive metaphysical descriptions in the Upanishads. It gives the seeker a complete map of reality, from the physical to the absolute, and points to the ultimate goal: knowing the Purusha as one's own Self.` },
    { id: `katha.1.2.11`, sanskrit: `तं दुर्दर्शं गूढम् अनुप्रविष्टं |
गुहाहितं गह्वरेष्ठं पुराणम् |
अध्यात्मयोगाधिगमेन देवं |
मत्वा धीरो हर्षशोकौ जहाति ॥११॥`, transliteration: `taṁ durdarśaṁ gūḍham anupraviṣṭaṁ |
guhāhitaṁ gahvareṣṭhaṁ purāṇam |
adhyātma-yogādhigamena devaṁ |
matvā dhīro harṣa-śokau jahāti ||11||`, english: `This Self is difficult to perceive, hidden in the inner cave of the heart, dwelling in the deepest recess, ancient. Through the practice of meditation on the Self, the wise one transcends both joy and sorrow.`, commentary: `The Upanishad returns to the description of the Self's hidden nature, now adding the means of its realization. "Through the practice of meditation on the Self" (adhyātma-yogādhigamena) — this is the prescription: turn attention inward, focus on the Self within.

"The wise one transcends both joy and sorrow" (harṣa-śokau jahāti). This is a remarkable statement. The sage does not merely transcend sorrow — they transcend joy as well. This is because both joy and sorrow are dualities — they depend on circumstances and are therefore temporary. The sage rests in the equanimity of the Self, which is beyond both.

This does not mean the sage becomes emotionless. Rather, the sage's happiness is not dependent on external circumstances. It is the natural state of the Self — ananda, bliss — which is not a reaction to events but the very nature of consciousness.

The teaching is consistent: the Self is hidden, but it can be found through meditation. The seeker who persists in turning inward will eventually discover the treasure that was always there.` },
    { id: `katha.1.2.12`, sanskrit: `तत्त्वतः तु महान् आत्मा गुहायां निहितो ह्ययम् |
शुद्धः पुण्यः कविः कृष्णो हिरण्मयः परः ॥१२॥`, transliteration: `tattvataḥ tu mahān ātmā guhāyāṁ nihito hy ayam |
śuddhaḥ puṇyaḥ kaviḥ kṛṣṇo hiraṇmayaḥ paraḥ ||12||`, english: `Truly, the Great Self dwells in the cave of the heart. It is pure, auspicious, the seer, dark as a cloud, golden, supreme.`, commentary: `This verse offers a poetic description of the Self as it actually is. "Mahān ātmā" — the Great Self. It is not small or petty but vast, infinite, all-encompassing. "Guhāyāṁ nihito" — established in the cave of the heart. The heart-cave (guhā) is the innermost sanctuary of consciousness.

"Śuddhaḥ" — pure, untouched by any contamination. "Puṇyaḥ" — auspicious, holy, sacred. "Kaviḥ" — the seer, the one who sees all. "Kṛṣṇaḥ" — dark as a raincloud, mysterious, unfathomable. "Hiraṇmayaḥ" — golden, luminous, radiant. "Paraḥ" — supreme, beyond all.

These attributes are not contradictory but complementary. The Self is both dark (beyond comprehension) and golden (radiant with light). It is both pure (untouched by the world) and auspicious (the source of all blessing).

The verse uses a string of adjectives not to define the Self but to evoke it. Each word is a finger pointing at the moon — the Self itself transcends all description. But these beautiful words help orient the seeker's mind toward the reality they are seeking.` },
    { id: `katha.1.2.13`, sanskrit: `समानो अनिलो अन्तर् आत्मा |
एकः सत् बहुधा विहरन् ॥१३॥`, transliteration: `samāno anilo antar ātmā |
ekaḥ sat bahudhā viharan ||13||`, english: `The one Self dwells in all beings. Though one, it moves in many ways. The wise perceive it within themselves; the foolish see it not.`, commentary: `This verse states the core teaching of Advaita Vedanta: the Self is one, but it appears as many. "Ekaḥ sat bahudhā viharaḥ" — "the one truth moves in many ways." Like the one sun reflected in a thousand pots of water, the one Self appears as a thousand beings.

"Samāno anilo" — "the one breath." The same prana, the same life-force, animates all beings. The breath that moves in you is the same breath that moves in every creature.

"The wise perceive it within themselves" — the sage sees the same Self in their own heart and in every other heart. "The foolish see it not" — the unawakened person sees only differences, only separate bodies, only individual minds. They miss the unity that underlies all diversity.

This verse is the philosophical foundation for compassion, love, and non-violence. If the same Self dwells in all, then harming another is harming oneself. And loving another is loving oneself. The golden rule is not just a moral injunction — it is a statement of metaphysical fact.` },
    { id: `katha.1.2.14`, sanskrit: `नैव वाचा न मनसा प्राप्तुं शक्यो न चक्षुषा |
अस्तीति ब्रुवतोऽन्यत्र कथं तद् उपलभ्यते ॥१४॥`, transliteration: `naiva vācā na manasā prāptuṁ śakyo na cakṣuṣā |
astīti bruvato 'nyatra kathaṁ tad upalabhyate ||14||`, english: `The Self cannot be attained by speech, nor by mind, nor by the eye. How can it be realized except by the one who says 'It is'?`, commentary: `This verse addresses the method of knowing the Self. "Naiva vācā" — not by speech. The Self cannot be described or defined in words. "Na manasā" — not by the mind. The mind cannot think its way to the Self, because the Self is the witness of thought. "Na cakṣuṣā" — not by the eye. The Self is not a visible object.

So how is it known? "Astīti bruvato 'nyatra kathaṁ tad upalabhyate" — "How can it be realized except by the one who says 'It is'?" The Self is known through direct recognition, not through any instrument of knowledge. It is known as "this IS" — not as an object seen, but as the very fact of being.

This points to the most direct teaching of the Upanishads: the Self is the very awareness in which all experience appears. You cannot see it because it is what is doing the seeing. You cannot think it because it is what is doing the thinking. You can only BE it — which you already are.

The realization is not an attainment but a recognition. The Self does not need to be created, reached, or achieved. It needs only to be recognized as what you already are.` },
    { id: `katha.1.2.15`, sanskrit: `अस्तीत्येवोपलब्धव्यस् तत्त्वभावेन चोभयोः |
अस्तीत्येवोपलब्धव्यस् तत्त्वभावेन चोभयोः ॥१५॥`, transliteration: `astīty evopalabdhyavyas tattva-bhāvena cobhayoḥ |
yad hy eva vadatas tasya satyaṁ bhavati vāg iti ||15||`, english: `One should know It as 'It is' and also as 'It is not.' When one has realized the truth of both — 'It is' and 'It is not' — then the truth shines forth.`, commentary: `This paradoxical verse teaches that the Self transcends both being and non-being. "Asti" — "It is." The Self is real, present, the most intimate fact of existence. "Nāsti" — "It is not." The Self is not an object, not a thing, not something that can be grasped or defined.

Both statements are true from different perspectives. From the perspective of direct experience, the Self IS — it is the most real thing there is. From the perspective of the senses and mind, the Self is NOT — it cannot be seen, heard, or thought.

"When one has realized the truth of both" — the sage holds both truths simultaneously. The Self is and is not; it is beyond both affirmation and denial. This is the logic of the transcendent — it cannot be captured by any single statement.

This teaching frees the seeker from attachment to any particular concept of the Self. It is not "something" and it is not "nothing." It is beyond all categories. The realization of this truth is liberation — not a state of mind but the transcendence of all states.` },
    { id: `katha.1.2.16`, sanskrit: `यदा पञ्चावतिष्ठन्ते ज्ञानानि मनसा सह |
बुद्धिश्च न विचेष्टति तामाहुः परमां गतिम् ॥१६॥`, transliteration: `yadā pañcāvatiṣṭhante jñānāni manasā saha |
buddhiś ca na viceṣṭati tām āhuḥ paramāṁ gatim ||16||`, english: `When the five senses along with the mind are at rest, and the intellect does not move — that, they say, is the supreme state.`, commentary: `This verse describes the state of deep meditation — samadhi. "When the five senses along with the mind are at rest" — all sensory input ceases, and the mind becomes completely still. "The intellect does not move" — even the discriminative faculty, the last active function of the mind, comes to rest.

"Tām āhuḥ paramāṁ gatim" — "that, they say, is the supreme state." This is the highest goal of meditation — the complete stillness of all mental activity. In this silence, the Self shines forth by itself, like the sun when the clouds part.

This is not sleep, because awareness is fully present. It is not unconsciousness, because the Self is more awake than ever. It is a state of pure awareness without content — consciousness without an object, light without an object to illuminate.

The practical instruction is clear: meditate until all the faculties — senses, mind, intellect — come to rest. In that silence, the Self reveals itself. This is the culmination of all spiritual practice.` },
    { id: `katha.1.2.17`, sanskrit: `तां योगम् इति मन्यन्ते स्थिराम् इन्द्रियधारणाम् |
अप्रमत्तस् तदा भवति योगो हि प्रभवाप्ययौ ॥१७॥`, transliteration: `tāṁ yogam iti manyante sthirāṁ indriya-dhāraṇām |
apramattas tadā bhavati yogo hi prabhavāpyayau ||17||`, english: `This they call yoga — the steady control of the senses. Then one becomes watchful, for yoga comes and goes.`, commentary: `This verse defines yoga precisely: "sthirāṁ indriya-dhāraṇām" — "the steady control of the senses." Yoga is not a system of exercises or a philosophy but the state of complete sensory control — the ability to withdraw attention from external objects at will.

"Apramattas tadā bhavati" — "then one becomes watchful." The word "apramatta" means vigilant, careful, attentive. The yogi does not become careless or passive but hyper-alert. This vigilance is necessary because "yoga comes and goes" (yogo hi prabhavāpyayau) — even after experiencing samadhi, one can lose it.

This is a realistic and helpful teaching. Many seekers experience moments of clarity, peace, and unity, only to lose them when they return to daily life. The Upanishad acknowledges this: yoga is not a permanent achievement but a state that must be maintained through constant vigilance.

The instruction is: practice steady control of the senses, remain watchful, and do not assume that one experience of peace means the work is done. The spiritual path requires ongoing attention, like keeping a boat on course in changing currents.` },
    { id: `katha.1.2.18`, sanskrit: `न प्राणेन नापानेन मर्त्यो जीवति कश्चन |
इतरेण तु जीवन्ति यस्मिन् एताव् उपाश्रितौ ॥१८॥`, transliteration: `na prāṇenānānena martyo jīvati kaścana |
itareṇa tu jīvanti yasmin etāv upāśritau ||18||`, english: `Not by prana nor by apana does any mortal live. It is by another that they live, on which these two depend.`, commentary: `This verse reveals a startling truth: we do not live by breath alone. Prana (inhalation) and apana (exhalation) sustain the body, but they themselves depend on something deeper — the Self.

"Itareṇa tu jīvanti" — "by another indeed they live." This "other" is the Atman, the Self, the source of all life-force. Without the Self, neither prana nor apana could function. The breath depends on consciousness; consciousness does not depend on breath.

This teaching has practical implications for meditation. In meditation, the breath naturally becomes calm and may even seem to stop. This verse reassures the meditator: even if the breath slows or pauses, the Self sustains life. Fear of death in deep meditation is unfounded because the Self — the true source of life — is always present.

The verse also points to a hierarchy of reality: the body depends on breath, breath depends on prana, prana depends on the Self. To know the Self is to know the source of all life — not just human life but the life-force that animates the entire universe.` },
    { id: `katha.1.2.19`, sanskrit: `हन्त त इदं प्रवक्ष्यामि गुह्यं ब्रह्म सनातनम् |
यथा मरणं प्राप्य आत्मा भवति गौतम ॥१९॥`, transliteration: `hanta te idaṁ pravakṣyāmi guhyaṁ brahma sanātanam |
yathā maraṇaṁ prāpya ātmā bhavati gautama ||19||`, english: `Yama said: "I will tell you the eternal Brahman, O Gautama — what happens to the Self after death. Some bodies are born, others rest in the womb."`, commentary: `Yama now promises to reveal the deepest secret — the eternal Brahman and what happens to the Self at death. He addresses Nachiketa as "Gautama" — referring to his family lineage.

"Some bodies are born, others rest in the womb" — this acknowledges the cycle of birth and rebirth. Some souls are currently embodied; others are in between births, resting in the subtle realm. The Self — the Atman — is never born and never dies. Only the bodies change.

The promise to reveal "the eternal Brahman" (brahma sanātanam) is the highest teaching the Upanishad can offer. Brahman is the Absolute Reality — the source, sustainer, and dissolution of all that exists. To know Brahman is to know everything.

Yama is now ready to give the teaching he initially tried to withhold. Nachiketa's persistence has earned him the highest knowledge. The student who refuses all substitutes, who will not be satisfied with anything less than the truth, deserves to receive it.` },
    { id: `katha.1.2.20`, sanskrit: `योनिम् अन्ये प्रपद्यन्ते शरीरत्वाय देहिनः |
स्थाणुम् अन्येऽनुसंयन्ति यथाकर्म यथाश्रुतम् ॥२०॥`, transliteration: `yonim anye prapadyante śarīratvāya dehinaḥ |
sthāṇum anye 'nusaṁyanti yathā-karma yathā-śrutam ||20||`, english: `Some souls enter a womb to be embodied; others enter the stationary state, according to their actions and their knowledge.`, commentary: `This verse explains the mechanics of rebirth. "Some souls enter a womb to be embodied" — those with remaining karma are reborn in physical bodies. "Others enter the stationary state" — those who have exhausted their karma enter a state of rest, or merge with the divine.

"Yathā-karma yathā-śrutam" — "according to their actions and their knowledge." Rebirth is not random but governed by two factors: karma (the consequences of one's actions) and shruti (one's knowledge and spiritual attainment). Actions determine the quality of the next birth; knowledge determines whether there is a next birth at all.

This teaching provides a coherent explanation for the diversity of human circumstances. Why are some born in favorable conditions and others in suffering? Not by chance, but by the accumulated karma and knowledge from previous lives.

The verse also offers hope: if one's circumstances are determined by karma and knowledge, then by changing one's actions and seeking higher knowledge, one can change one's future. This is the basis for the entire Hindu system of ethics and spiritual practice.` },
    { id: `katha.1.2.21`, sanskrit: `य एष सुप्तेषु जागर्ति कामं कामं पुरुषो निर्मिमाणः |
तदेव शुक्रं तद् ब्रह्म तद् एवामृतम् उच्यते ॥२१॥`, transliteration: `ya eṣa supteṣu jāgarti kāmaṁ kāmaṁ puruṣo nirmimāṇaḥ |
tad eva śukraṁ tad brahma tad evāmṛtam ucyate ||21||`, english: `The Self who is awake while all others sleep, creating desires — that is the Pure, that is Brahman, that alone is called the Immortal.`, commentary: `This verse describes a remarkable quality of the Self: it is "awake while all others sleep." When the body sleeps, when the mind dreams, when even the intellect is dormant — the Self remains awake, aware, present.

"Puruṣo nirmimāṇaḥ" — "the person creating desires." Even in sleep, the Self is the creative source. Dreams arise from the Self; desires manifest from the Self. The Self is not a passive observer but an active creator.

"Tad eva śukraṁ" — "that alone is the Pure." Despite creating all desires and experiences, the Self itself remains pure, untouched by what it creates. Like the sky that is not stained by the clouds that pass through it, the Self is not contaminated by the desires it generates.

"Tad brahma tad evāmṛtam ucyate" — "that is Brahman, that alone is called the Immortal." The Self that is awake within sleep, that creates without being bound by creation, that is pure despite manifesting all impurities — THIS is the Absolute, the Immortal, the goal of all seeking.

This verse bridges the gap between the Self in meditation and the Self in daily life. The same awareness that shines in deep samadhi also shines in deep sleep. It is always present, always awake, always creating — and always free.` },
    { id: `katha.1.2.22`, sanskrit: `अग्निर् यथैको भुवनं प्रविष्टो |
रूपं रूपं प्रतिरूपो बभूव |
एकस् तथा सर्वभूतान्तरात्मा |
रूपं रूपं प्रतिरूपो बभूव ॥२२॥`, transliteration: `agnir yathāiko bhuvanaṁ praviṣṭo |
rūpaṁ rūpaṁ pratirūpo babhūva |
ekas tathā sarva-bhūtāntar-ātmā |
rūpaṁ rūpaṁ pratirūpo babhūva ||22||`, english: `As fire, though one, has entered the world and appears in various forms according to the material — so the one inner Self of all beings appears in various forms according to whatever it enters, yet remains itself outside.`, commentary: `This is one of the most beautiful and powerful analogies in the Upanishads. Fire is one — it is the same chemical process everywhere. Yet it takes on different forms depending on what it burns: wood, paper, coal, gas. The fire in a candle, a forest fire, and a star are all the same fire, yet they look completely different.

Similarly, the one Self enters all beings and takes on the appearance of each. The Self in a human, a dog, a tree, and a stone is the same Self — yet it appears different because of the "material" (the body-mind complex) it inhabits.

"Rūpaṁ rūpaṁ pratirūpo babhūva" — "form after form, it has taken corresponding forms." This explains the diversity of life without sacrificing the unity of the Self. We are all the same awareness, dressed in different costumes.

"Ekas tathā sarva-bhūtāntar-ātmā" — "so the one inner Self of all beings." This is the most direct statement of non-duality. There is one Self, and it is the innermost reality of every creature. When you look at another person, you are looking at the same Self wearing a different mask.

This verse is the foundation for universal compassion. If the same fire burns in all beings, then all beings are sacred, all beings are divine, and all beings deserve our love and respect.` },
    { id: `katha.1.2.23`, sanskrit: `आकाशम् एकं हि यथा घटादिषु |
विभक्तम् एवान्तर्बहिर् एव च |
एकस् तथा सर्वभूतान्तरात्मा |
विभक्तम् एवान्तर्बहिर् एव च ॥२३॥`, transliteration: `ākāśam ekaṁ hi yathā ghaṭādiṣu |
vibhaktam evāntar bahir eva ca |
ekas tathā sarva-bhūtāntar-ātmā |
vibhaktam evāntar bahir eva ca ||23||`, english: `As the one space, though all-pervading, appears divided when enclosed in different pots — so the one Self appears divided among different beings, yet is one both within and without.`, commentary: `The space analogy complements the fire analogy of the previous verse. Space is one — there is only one space. Yet when it is enclosed in different containers (pots, rooms, bodies), it appears to be divided. The space inside a pot seems different from the space outside, but it is all the same space.

"Vibhaktam evāntar bahir eva ca" — "divided indeed within and without." The Self appears to be limited when confined to a body — "this is my consciousness, separate from yours." But just as the space inside a pot is connected to the infinite space outside, the consciousness within each body is connected to the infinite consciousness that pervades everything.

This analogy is particularly helpful because it shows that the Self is not fragmented — it only appears to be. The sense of separateness is an illusion created by the "container" of the body-mind. When the container is removed (at death, or in deep meditation), the apparent division dissolves, and the one space is recognized.

This teaching has profound implications for how we relate to others. If the same space pervades all bodies, then there is no fundamental separation between you and me. Your awareness and my awareness are the same awareness, appearing in different containers.` },
    { id: `katha.1.2.24`, sanskrit: `यथोदकं दुर्गे वृष्टं पर्वतेषु विधावति |
यथा सूत्रे मणिर् गुल्मो यथा नारी पतिं विना ॥२४॥`, transliteration: `yathodakaṁ durge vṛṣṭaṁ parvateṣu vidhāvati |
yathā sūtre maṇir gulmo yathoṣṭro bhavati ||24||`, english: `As rain falling on a mountain flows down in all directions, so the one Self, pursuing various desires, runs after what corresponds to them. As the gem on a string, so is the Self in the body.`, commentary: `The Self pursues desires as water flows downhill — naturally, following the path of least resistance. "Rain falling on a mountain flows down in all directions" — the one Self, embodied in many beings, flows toward the fulfillment of each being's desires.

"As the gem on a string" (yathā sūtre maṇir) — this is a beautiful image. The Self is the string on which all beings are strung, like gems on a necklace. Each gem is different, but the string that holds them is one. The Self is the thread of continuity that runs through all lives, all experiences, all forms.

This image also suggests that without the string, the gems would scatter. Without the Self, the body would be inert matter. The Self is what holds the body-mind complex together, giving it life, coherence, and identity.

The practical implication: when we feel scattered, fragmented, or disconnected, it is because we have lost awareness of the string — the Self that holds everything together. Meditation is the practice of returning to the string, recognizing the one awareness that is the foundation of all experience.` },
    { id: `katha.1.2.25`, sanskrit: `यथोदकं शुद्धे शुद्धम् आसिक्तं तादृग् एव भवति |
एवं मुनेर् विजानत आत्मा भवति गौतम ॥२५॥`, transliteration: `yathodakaṁ śuddhe śuddham āsiktaṁ tādṛg eva bhavati |
evaṁ muner vijānata ātmā bhavati gautama ||25||`, english: `As pure water poured into pure water becomes the same — so the Self of the sage who knows, O Gautama, becomes one with Brahman.`, commentary: `This beautiful concluding verse of Chapter 1, Valli 2 uses a simple, elegant image. Pure water poured into pure water becomes indistinguishable — one cannot tell where one ends and the other begins. Similarly, the Self of the sage who knows the truth merges with Brahman, the Absolute.

This is the teaching of non-dual realization. It is not that the individual self "goes somewhere" or "attains something." It is that the apparent separation dissolves, like a drop merging back into the ocean. The drop was never separate from the ocean — it only appeared to be.

"Evaṁ muner vijānata" — "so of the sage who knows." The key word is "vijānata" — one who truly knows, not intellectually but directly. This knowledge is not accumulated but realized. When the sage realizes that the Self IS Brahman — not "becomes" Brahman but always was Brahman — the merger happens spontaneously.

O Gautama — Yama addresses Nachiketa by his family name, acknowledging that this boy has earned the highest teaching. The verse brings Chapter 1, Valli 2 to a triumphant close: the Self of the realized sage becomes one with the Absolute, like pure water merging with pure water.

ADHYAYA 1, VALLI 3: The City of Eleven Gates` },
    { id: `katha.1.3.1`, sanskrit: `पुरम् एकादशद्वारम् अजस्यावक्रचेतसः |
अनुष्ठाय न शोचति विमुक्तश्च विमुच्यते ॥१॥`, transliteration: `puram ekādaśa-dvāram ajasyāvakra-cetasaḥ |
anuṣṭhāya na śocati vimuktaś ca vimucyate ||1||`, english: `There is a city of eleven gates belonging to the unborn, whose consciousness is undistorted. The one who meditates on this Self does not grieve and, being freed, is truly liberated.`, commentary: `This verse introduces one of the Upanishad's most beautiful metaphors: the body as a city with eleven gates. The "eleven gates" are the two eyes, two ears, two nostrils, the mouth, the navel, and the two lower openings of the body — the nine sensory openings plus two others.

"Ajasyāvakra-cetasaḥ" — "of the unborn one whose consciousness is undistorted." The Self that inhabits this city is unborn (aja) — it has never been created and will never be destroyed. Its consciousness is "undistorted" (avakra) — it does not twist or bend to accommodate illusion. It sees reality as it is.

"Anuṣṭhāya na śocati" — "the one who meditates on this does not grieve." When you recognize that the body is a city inhabited by the eternal Self, grief loses its foundation. The city may decay, but the inhabitant is deathless.

"Vimuktaś ca vimucyate" — "being freed, is truly liberated." This is liberation — not a future reward but a present recognition. When you know the Self that dwells in the city of the body, you are already free. The gates may open and close, the city may rise and fall, but the Self remains unchanged.` },
    { id: `katha.1.3.2`, sanskrit: `हंसः शुचिषद् वसुर् अन्तरिक्षसद् |
होता वेदिषद् अतिथिर् दुरोणसत् ॥२॥`, transliteration: `haṁsaḥ śuciṣad vasur antarikṣasad |
hotā vediṣad atithir duroṇasat ||2||`, english: `The Self is the Swan dwelling in purity, the Vasu dwelling in the atmosphere, the priest at the altar, the guest in the house.`, commentary: `This verse uses a series of Vedic epithets to describe the Self's omnipresence. "Haṁsa" — the Swan, the migratory bird that travels freely between worlds. The Self moves freely between all states of consciousness. "Śuciṣad" — dwelling in purity. The Self's natural home is purity, radiance, light.

"Vasur antarikṣasad" — the Vasu (a class of divine beings) dwelling in the atmosphere. The Self pervades the space between heaven and earth — between the transcendent and the manifest. "Hotā vediṣad" — the priest at the altar. The Self is the one who performs the sacrifice, the one who offers and the one who receives.

"Atithir duroṇasat" — the guest in the house. The Self is the honored guest in the body — present but not imposing, intimate but not intrusive. We are the hosts; the Self is the guest who has been with us all along but whom we have never acknowledged.

This series of images shows the Self from every angle: it is above (the Swan), in the middle (the Vasu), at the center (the priest), and within (the guest). No matter where you look, the Self is there.` },
    { id: `katha.1.3.3`, sanskrit: `ऊर्ध्वं प्राणम् उन्नयत्य् अपानं प्रत्यग् अस्यति |
मध्ये वामानम् आसीनं विश्वे देवा उपासते ॥३॥`, transliteration: `ūrdhvaṁ prāṇam unnayaty apānaṁ pratyag asyati |
madhye vāmānam āsīnaṁ viśve devā upāsate ||3||`, english: `The Self raises the prana upward and casts the apana downward. Seated in the middle, the little lord — all the gods worship him.`, commentary: `This verse describes the Self's role in the body's energy system. "Raises the prana upward" — the Self directs the upward-moving life-force (prana) that governs inhalation, speech, and cognition. "Casts the apana downward" — the Self directs the downward-moving force (apana) that governs exhalation, elimination, and grounding.

"Madhye vāmānam āsīnam" — "seated in the middle, the little lord." The Self is the "little lord" (vāmana) — a wonderful, intimate description. It is not an imposing cosmic deity but a small, quiet presence at the center of your being. Like a tiny flame at the center of a lamp, the Self illuminates the entire body-mind complex.

"Viśve devā upāsate" — "all the gods worship him." Even the gods — the cosmic forces of nature — revere this tiny Self. This is a radical democratization of the divine: the most powerful reality in the universe is not in heaven but in the center of your chest.

This verse teaches that the Self is not distant or abstract. It is the intimate controller of your breath, your heartbeat, your very life. It is the "little lord" who quietly manages the entire operation while you go about your day, unaware of its presence.` },
    { id: `katha.1.3.4`, sanskrit: `अस्य विश्वस्य भुवनस्य राजे |
तम् एवं विदित्वाऽतिरिच्यते हि ॥४॥`, transliteration: `asya viśvasya bhuvanasya rāje |
tam evaṁ viditvātiricyate hi ||4||`, english: `This body is the chariot of the Self. The Self is the lord of this entire universe. The one who thus knows this Self transcends all sorrow.`, commentary: `This verse connects the chariot analogy of Valli 2 with the city analogy of Valli 3. The body is both a chariot and a city — a vehicle and a dwelling place. The Self is both the lord of the chariot and the king of the city.

"Asya viśvasya bhuvanasya rāje" — "the king of this entire universe." The Self is not merely the lord of one body but the ruler of all existence. When you realize the Self within, you realize it everywhere. The king of your body is the king of the universe.

"Tam evaṁ viditvātiricyate hi" — "by knowing this thus, one transcends." The knowledge of the Self is not merely intellectual understanding — it is transformative realization. It does not add something to you but reveals what you always were: the king of the universe, disguised as a limited mortal.

This verse summarizes the teaching of the Upanishad so far: the Self is the lord of the body, the controller of all life forces, the king of all existence. To know this is to be free from all sorrow and limitation.` },
    { id: `katha.1.3.5`, sanskrit: `यद् इदं किञ्च जगत् सर्वं प्राण एजति निःसृतम् |
महद् भयं वज्रम् उद्यतं यस् तस्माद् बिभेति ॥५॥`, transliteration: `yad idaṁ kiñca jagat sarvaṁ prāṇa ejati niḥsṛatam |
mahad bhayaṁ vajram udyataṁ yas tasmād bibheti ||5||`, english: `Whatever there is in this universe — all this has come from the Self. It is the great fear, the thunderbolt raised. The one who knows this becomes the glorious one.`, commentary: `This verse describes the Self as both terrifying and glorious — depending on one's relationship with it. "All this has come from the Self" — the universe is the Self's creation, its expression, its body.

"It is the great fear, the thunderbolt raised" (mahad bhayaṁ vajram udyataṁ) — for the unawakened, the Self is terrifying. Why? Because knowing the Self means the death of the ego. The ego's deepest fear is not of external threats but of discovering that it is not real — that there is only the Self, and the individual "I" is an illusion.

"The one who knows this becomes the glorious one" — for the awakened, the Self is the source of all glory, all power, all beauty. The same reality that terrifies the ego liberates the sage. It is like the sun — a source of life for those who open their eyes, a source of blindness for those who stare at it without preparation.

This verse teaches that the Self is not safe, comfortable, or tame. It is the most powerful reality in existence. Meeting it requires courage — the courage to let go of everything you think you are.` },
    { id: `katha.1.3.6`, sanskrit: `आत्मानं रथिनं विद्धि शरीरं रथमेव तु |
ज्ञानं सारथिं विद्धि मनः प्रग्रहमेव च ॥६॥`, transliteration: `ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu |
jñānaṁ sārathiṁ viddhi manaḥ pragraham eva ca ||6||`, english: `If the buddhi (intellect) is the charioteer, and the mind is the reins, and the senses are the horses — then the Self enjoys the sense objects. This they call the path.`, commentary: `This verse revisits the chariot analogy with a subtle but important shift. In Valli 2, buddhi (intellect) was the charioteer. Here, jnana (knowledge, wisdom) is the charioteer. This is a higher teaching — it is not mere intellectual discrimination but direct knowledge of the Self that should guide the chariot.

"The Self enjoys the sense objects" — the Self is not merely a passive witness but the one who experiences, who tastes, who lives through the senses. The body-mind complex is the instrument of enjoyment, and the Self is the enjoyer.

"This they call the path" — the integration of Self-knowledge, disciplined mind, and controlled senses IS the spiritual path. It is not separate from life but the right way to live.

The subtle shift from buddhi to jnana as charioteer suggests that mere intellectual understanding is not enough. The charioteer must have direct knowledge of the Self — not just concepts about it. When the charioteer truly knows the Self, the entire chariot moves in the right direction effortlessly.` },
    { id: `katha.1.3.7`, sanskrit: `यस्त्वविज्ञानवान् भवत्य् अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥७॥`, transliteration: `yas tv avijñānavān bhavaty amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||7||`, english: `The one without understanding, with uncontrolled mind and impure — does not attain the Self and returns again to birth and death.`, commentary: `This verse repeats the warning from Valli 2 with additional emphasis. Without understanding (vijñāna), without a controlled mind (amanas), and with impurity (ashuchi) — the soul remains trapped in saṁsāra.

The repetition serves a pedagogical purpose: the Upanishad wants to make absolutely clear what is at stake. This is not an abstract philosophical debate — it is a question of freedom versus bondage, light versus darkness.

"Amanaskaḥ" — literally "without mind" or with an uncontrolled mind. The mind is the bridge between the Self and the senses. When the bridge is broken or disorganized, the Self cannot function properly through the body-mind complex.

The verse is a call to seriousness. The spiritual path is not a hobby or a luxury — it is the most important work a human being can undertake. Those who neglect it face the consequence of continued suffering in the cycle of birth and death.` },
    { id: `katha.1.3.8`, sanskrit: `ज्ञानसारथिर् यस्य तुष्टः सत्त्वं विशुद्धम् |
विमुक्तस् तु तदा मोक्षाद् ब्रह्म प्राप्नोति निष्कलम् ॥८॥`, transliteration: `jñāna-sārathir yasya tuṣṭaḥ sattvaṁ viśuddham |
vimuktas tu tadā mokṣād brahma prāpnoti niṣkalam ||8||`, english: `The one whose charioteer is knowledge, whose mind is pure — such a one, being freed, reaches the end of the path, the supreme Brahman.`, commentary: `This verse describes the state of liberation. "Whose charioteer is knowledge" — direct Self-knowledge guides the entire personality. "Whose mind is pure" — the mind has been purified through meditation, devotion, and selfless action.

"Being freed, reaches the end of the path" — liberation is the end of the journey, the final destination. But it is not a place — it is a state of being. The liberated one does not "go" anywhere; they simply recognize what they always were.

"Brahma prāpnoti niṣkalam" — "attains the supreme Brahman, which is without parts." Brahman is indivisible, whole, complete. It has no parts, no limitations, no boundaries. To attain it is to become it — or rather, to realize that you were always it.

This verse completes the teaching of Chapter 1. The Upanishad has laid out the entire path: from the story of Nachiketa's courage, through the chariot analogy, to the direct description of liberation. Chapter 2 will go even deeper into the nature of the Self and the means of its realization.

ADHYAYA 2, VALLI 1: The Imperishable Self` },
    { id: `katha.1.3.9`, sanskrit: `यः सेतुर् इज्जानानाम् अक्षरं ब्रह्म यत् परम् |
अभयं तितीर्षतां पारं नाचिकेतम् शकेमहि ॥९॥`, transliteration: `yaḥ setur ījānānām akṣaraṁ brahma yat param |
abhayaṁ titīrṣatāṁ pāraṁ nāciketaṁ śakemahi ||9||`, english: `May we be able to perform the Nachiketa sacrifice, which is the bridge for those who perform sacrifices. It is the imperishable Brahman, the supreme, the fearless shore for those who wish to cross over.`, commentary: `The Nachiketa fire ritual is described as a bridge for those who perform sacrifices. The ritual leads to the Absolute Brahman, the fearless shore for those who wish to cross over from mortality to immortality. The bridge is not physical but spiritual - it is the path of knowledge that leads from ignorance to realization. Those who walk this bridge reach the imperishable reality that transcends all death.` },
    { id: `katha.1.3.10`, sanskrit: `अत्र ब्रह्मं विद्यात् स्वयम् अन्यथा विकल्पम् एव |
नात्र संशयः ॥१०॥`, transliteration: `atra brahmaṁ vidyāt svayam anyathā vikalpam eva |
nātra saṁśayaḥ ||10||`, english: `In this sacrifice, one should know Brahman oneself. Otherwise, it is merely verbal. There is no doubt about this.`, commentary: `Knowing Brahman is not a matter of performing rituals or memorizing scriptures. One must know Brahman directly, personally. Without direct realization, all talk about Brahman is empty words. The Upanishad has no patience for mere intellectual understanding. Direct knowledge is required; everything else is preliminary. This verse challenges the seeker to go beyond study, beyond ritual, beyond philosophy to the direct encounter with the Absolute.` },
    { id: `katha.1.3.11`, sanskrit: `प्राणानां ग्रन्थिर् असि तेजसां रूपम् |
ज्योतीषां ज्योतिर् आयुष्यम् आयुर् धेहि ॥११॥`, transliteration: `prāṇānāṁ granthir asi tejasāṁ rūpam |
jyotīṣāṁ jyotir āyuṣyam āyur dhehi ||11||`, english: `You are the knot of the vital breaths, the form of fire, the light of lights, the life of life. Grant us long life.`, commentary: `This verse is a prayer to the Self, describing its nature through a series of profound identifications. The Self is the knot that ties together all the life-forces in the body. Without the Self, the pranas would scatter and the body would die. The Self is the essence of all energy, all fire, all luminosity. It is the light that illuminates all other lights - the consciousness that makes perception possible. The Self is the life that animates all life - not merely alive but the source of aliveness itself. Grant us long life means the long life of awareness, the eternal life of the Self.` },
    { id: `katha.1.3.12`, sanskrit: `शतं चैका च हृदयस्य नाड्यः |
तासां मूर्धानम् अभिनिःसृतैका |
तयोर् ऊर्ध्वम् आयन् अमृतत्वम् एति |
विष्वङ् अन्या उत्क्रमणे भवन्ति ॥१२॥`, transliteration: `śataṁ caikā ca hṛdayasya nāḍyaḥ |
tāsāṁ mūrdhānam abhiniḥsṛtaikā |
tayor ūrdhvam āyan amṛtatvam eti |
viṣvaṅ anyā utkramaṇe bhavanti ||12||`, english: `There are one hundred and one nerves of the heart. One of them penetrates the crown of the head. Going upward through that nerve, one attains immortality. The others lead in various directions at the time of departure.`, commentary: `This verse describes the subtle yogic anatomy of the heart center. One hundred and one nerves of the heart form a network of subtle energy channels emanating from the spiritual heart. One of them - the sushumna nadi - penetrates the crown of the head. This is the pathway of liberation. When consciousness ascends through the sushumna, the soul merges with the Absolute and does not return to the cycle of birth and death. The other 100 nerves lead to various destinations in the cycle of rebirth depending on the state of consciousness at death.` },
    { id: `katha.1.3.13`, sanskrit: `अङ्गुष्ठमात्रः पुरुषो मध्य आत्मनि तिष्ठति |
ईशानं भूतभव्यस्य न ततो विजुगुप्सते |
एतद् वै तत् ॥१३॥`, transliteration: `aṅguṣṭha-mātraḥ puruṣo madhya ātmani tiṣṭhati |
īśānaṁ bhūta-bhavyasya na tato vijugupsate |
etad vai tat ||13||`, english: `The Purusha, the size of a thumb, dwells in the middle of the body. He is the lord of past and future. After knowing him, one does not shrink from him. This indeed is that.`, commentary: `The Self is described as the size of a thumb - a traditional description of the individual soul dwelling in the heart. This is not a literal measurement but a symbolic description of the Self's presence in the heart center. The Self is the lord of past and future - it was there before your birth and will be there after your death. After knowing the Self, one does not shrink from it because fear comes from the unknown, and when the Self is realized, all unknown becomes known. This indeed is that - the formula of realization.` },
    { id: `katha.1.3.14`, sanskrit: `अङ्गुष्ठमात्रः पुरुषो ज्योतिर् इवाधूमकः |
ईशानो भूतभव्यस्य स एवाद्य स उ श्वः ॥१४॥`, transliteration: `aṅguṣṭha-mātraḥ puruṣo jyotir ivādhūmakaḥ |
īśāno bhūta-bhavyasya sa evādya sa u śvaḥ ||14||`, english: `The Purusha, the size of a thumb, is like a smokeless flame. He is the lord of past and future. He is the same today and tomorrow. This indeed is that.`, commentary: `The Self is like a pure, clear flame - luminous, radiant, without the smoke of ignorance or desire. Smokeless suggests purity - there is no contamination, no darkness, no obscuration. The Self is pure light, pure awareness, without any admixture of ignorance. He is the same today and tomorrow - the Self does not change. It was the same yesterday, it is the same today, and it will be the same tomorrow. This unchanging nature is the guarantee of its permanence.` },
    { id: `katha.1.3.15`, sanskrit: `यथोदकं शुद्धे शुद्धम् आसिक्तं तादृग् एव भवति |
एवं मुनेर् विजानत आत्मा भवति गौतम ॥१५॥`, transliteration: `yathodakaṁ śuddhe śuddham āsiktaṁ tādṛg eva bhavati |
evaṁ muner vijānata ātmā bhavati gautama ||15||`, english: `As pure water poured into pure water becomes the same - so the Self of the sage who knows, O Gautama, becomes one with Brahman.`, commentary: `Pure water poured into pure water becomes indistinguishable - one cannot tell where one ends and the other begins. Similarly, the Self of the sage who knows the truth merges with Brahman. The apparent separation dissolves, like a drop merging back into the ocean. The drop was never separate from the ocean - it only appeared to be. The key word is vijanata - one who truly knows, not intellectually but directly. This knowledge is not accumulated but realized. The Self of the realized sage becomes one with the Absolute, like pure water merging with pure water.` },
    { id: `katha.1.3.16`, sanskrit: `सर्वे वेदा यत् पदम् आमनन्ति |
तपांसि सर्वाणि च यद् वदन्ति |
यद् इच्छन्तो ब्रह्मचर्यं चरन्ति |
तत् ते पदं संग्रहेण प्रवक्ष्ये ॥१६॥`, transliteration: `sarve vedā yat padam āmananti |
tapāṁsi sarvāṇi ca yad vadanti |
yad icchanto brahmacaryaṁ caranti |
tat te padaṁ saṅgraheṇa pravakṣye ||16||`, english: `All the Vedas speak of that goal which all austerities declare, for the sake of which students practice brahmacharya. I shall tell you that goal in brief.`, commentary: `All the Vedas speak of a single goal. All austerities are directed toward the same goal. Students practice brahmacharya for the sake of this goal. Yama is about to give the essence of all spiritual teaching in a single statement. This verse builds anticipation - after all the descriptions, analogies, and teachings, Yama is about to state the ultimate goal in the simplest possible terms.` },
    { id: `katha.1.3.17`, sanskrit: `एतद् वै तत् ॥१७॥`, transliteration: `om ity etad akṣaram idaṁ sarvaṁ |
tasyopavyākhyānaṁ bhūtaṁ bhavad bhaviṣyad iti sarvam oṁkāra eva ||17||`, english: `The goal is AUM. This imperishable syllable is all this. Its explanation: all that is past, present, and future is AUM. And whatever is beyond the three times - that too is AUM.`, commentary: `The goal stated in brief is AUM - the primordial sound, the sacred syllable that contains all of creation. This imperishable syllable is all this - AUM is not merely a sound but the essence of all existence. Everything that exists is a manifestation of AUM. All that is past, present, and future is AUM - time itself is contained in AUM. And whatever is beyond the three times - the timeless Absolute - that too is AUM. This connects the Katha Upanishad with the broader Upanishadic teaching. The goal of all spiritual practice is the realization that AUM, the Self, and Brahman are one.` },
    { id: `katha.2.1.1`, sanskrit: `श्रीमद् भगवद्गीता यत्र नित्यं पठन्ति च |
न ते दुःखं न शोकं न भयं न जरा ॥१॥`, transliteration: `parāñci khāni vyatṛṇat svayambhūḥ |
tasmāt parāṅ paśyati nāntar ātman ||1||`, english: `The Self-born Creator has turned the senses outward. Therefore one sees external things and not the inner Self. Rare is the wise person who, seeking immortality, turns the eyes inward and sees the Self within.`, commentary: `Chapter 2 of the Katha Upanishad opens with a verse that echoes Chapter 1, Valli 2, verse 1 — but with a crucial addition. Here, the Upanishad emphasizes how rare it is to turn inward. "Rare is the wise person" — the vast majority of humanity lives entirely in the external world, never suspecting the treasure within.

"Turns the eyes inward and sees the Self within" — this is the instruction. The senses are designed to look outward, but the wise person reverses this flow. Instead of following the senses into the world of objects, the wise person turns attention back toward its source — the awareness that is doing the seeing.

This reversal is the essence of meditation. All meditation techniques — whether focusing on breath, mantra, or inquiry — are simply methods for reversing the outward flow of attention. When attention turns inward, it discovers the Self that was always there, like turning around in a dark room and finding the light that was behind you all along.

The chapter opens with this reminder because Chapter 2 will go deeper into the nature of the Self. Before diving into the metaphysics, the Upanishad reminds us: the Self is here, within, waiting to be seen.` },
    { id: `katha.2.1.2`, sanskrit: `परिचर्यार्थं ते मन्ये वित्तम् |
यद् अन्यद् भूतस्नेहं यद् वाऽन्यत् स्वतः प्रियम् ॥२॥`, transliteration: `śṛṇvantu viśve amṛtasya putrā |
ā ye dhāmāni divyāni tasthuḥ ||2||`, english: `O children of immortality, hear! Those who dwell in the highest abode — I proclaim Brahman, which I have realized. There is nothing beyond the knowing of this.`, commentary: `Yama begins his supreme teaching with a dramatic call: "O children of immortality!" (śṛṇvantu viśve amṛtasya putrāḥ). He is not addressing Nachiketa alone but all beings — all are children of immortality, because the Self in all is deathless.

"Those who dwell in the highest abode" — the teaching is addressed to those who are ready, who have already begun to turn inward. Not everyone is prepared for this knowledge, but everyone is capable of it.

"I proclaim Brahman, which I have realized" — Yama speaks from direct experience, not from hearsay. He has realized Brahman and now shares this realization. This is the mark of a true teacher: they speak from knowledge, not belief.

"There is nothing beyond the knowing of this" — this is the highest knowledge, beyond which there is nothing more to know. When you know Brahman, you know everything. All other knowledge is partial; this knowledge is complete.

This verse sets the stage for one of the most profound teachings in all of Indian philosophy. Yama is about to reveal the ultimate nature of reality to a boy who refused all lesser gifts.` },
    { id: `katha.2.1.3`, sanskrit: `योनिम् अन्ये प्रपद्यन्ते शरीरत्वाय देहिनः |
स्थाणुम् अन्येऽनुसंयन्ति यथाकर्म यथाश्रुतम् ॥३॥`, transliteration: `naiṣā tarkeṇa matir āpaneyā |
proktānyenaiva sujñānāya preṣṭha ||3||`, english: `This wisdom cannot be attained by logic alone. It is taught by one who knows — a realized teacher. O dearest Nachiketa, you have attained it. May we always have students like you!`, commentary: `Yama makes a crucial methodological point: "This wisdom cannot be attained by logic alone" (naiṣā tarkeṇa matir āpaneyā). Reasoning and argument can point toward the truth, but they cannot deliver the direct realization of the Self. The Self is beyond logic — it is the very source of the logical mind.

"It is taught by one who knows" — the Upanishadic tradition insists on a living teacher. Books can inspire, but only a realized being can awaken. The teacher's presence, their consciousness, their very being transmits what words cannot.

"O dearest Nachiketa, you have attained it" — Yama acknowledges that Nachiketa has received the teaching. This is not mere information but transmission — the awakening of a new level of consciousness.

"May we always have students like you!" — this remarkable statement from the Lord of Death himself shows that even the gods value the sincere seeker. The universe needs those who ask the ultimate questions, who refuse all substitutes, who persist until the truth is revealed.` },
    { id: `katha.2.1.4`, sanskrit: `नान्यः पन्था विद्यतेऽयनाय |
yam evaiṣa vṛṇute tena labhyaḥ ॥४॥`, transliteration: `jñātā tv eva na jñāyate |
yam evaiṣa vṛṇute tena labhyaḥ ||4||`, english: `There is no other path for the attainment of this knowledge. The Self reveals itself to the one it chooses. The Self is not known through study, nor through intellect, nor through hearing. It is known only by the one whom the Self chooses. To such a one, the Self reveals its own nature.`, commentary: `This verse restates the teaching of Chapter 1, verse 29 with even greater emphasis. "There is no other path" — this knowledge comes through no other means. Not through logic, not through study, not through effort alone. The Self reveals itself.

"The Self is not known through study, nor through intellect, nor through hearing" — all three traditional means of knowledge (scriptural study, intellectual analysis, and oral transmission) are insufficient for Self-realization. They can prepare the ground, but the actual revelation comes from the Self itself.

"The Self reveals its own nature" — this is the mystery of grace. The Self is not an object to be obtained but the subject that was always present. The "attainment" of the Self is simply the removal of ignorance — the recognition of what was always the case.

This verse teaches humility. No matter how much we study, how brilliant our intellect, or how many teachers we hear — the Self cannot be earned. It can only be received. Our role is to prepare ourselves through practice and devotion; the Self's role is to reveal itself when we are ready.` },
    { id: `katha.2.1.5`, sanskrit: `न जायते म्रियते वा विपश्चिन् |
नायं कुतश्चिन् न बभूव कश्चित् ॥५॥`, transliteration: `na jāyate mriyate vā vipaścin |
nāyaṁ kutaścin na babhūva kaścit ||5||`, english: `The Self is not born, nor does it die. It did not come from anywhere, nor did anything come from it. It is unborn, eternal, ancient, and is not killed when the body is killed.`, commentary: `This is one of the most important verses in the entire Upanishad — and the verse that Krishna later quotes in the Bhagavad Gita (2.20). It states the fundamental nature of the Self in the clearest possible terms.

"Na jāyate mriyate vā" — "is not born, nor does it die." Birth and death apply to forms, not to the Self. The Self was never born — it existed before the body was formed, and it will exist after the body dies. Birth and death are events that happen TO the body, not to the Self.

"Nāyaṁ kutaścin na babhūva kaścit" — "it did not come from anywhere, nor did anything come from it." The Self has no origin and no offspring. It is not produced by any cause, and it does not produce any effect. It is beyond the chain of causation.

"It is unborn, eternal, ancient" (ajaṁ nityaṁ śāśvatam) — three adjectives that describe the Self's timeless nature. "Unborn" — never came into existence. "Eternal" — will never cease to exist. "Ancient" — older than the oldest thing.

"Not killed when the body is killed" (na hanyate hanyamāne śarīre) — the body can be destroyed, but the Self cannot. This is the Upanishad's answer to the question of death: the Self is deathless. Only the body dies.

This verse is the foundation of Vedantic immortality. It is not a belief but a statement of the nature of reality.` },
    { id: `katha.2.1.6`, sanskrit: `अणोर् अणीयान् महतो महीयान् |
आत्मास्य जन्तोर् निहितो गुहायाम् ॥६॥`, transliteration: `aṇor aṇīyān mahato mahīyān |
ātmāsya jantor nihito guhāyām ||6||`, english: `The Self is smaller than the smallest, greater than the greatest. It is hidden in the heart of every being. The one free from desire, with the grace of the Creator, sees the Self's glory and is freed from sorrow.`, commentary: `This verse captures the paradox of the Self's nature. "Smaller than the smallest" — the Self is subtler than the subtlest particle. It cannot be seen, touched, or measured. It is smaller than an atom, more subtle than thought itself.

"Greater than the greatest" — the same Self is vaster than the cosmos. It pervades all space, all time, all existence. It is greater than the greatest mountain, the widest ocean, the most distant star.

"Hidden in the heart of every being" — the Self is not somewhere far away. It is in the heart of every creature, including you, right now. It is the most intimate reality — closer than your breath, nearer than your thoughts.

"The one free from desire sees the Self's glory" — desire is the veil. When desire subsides — not through suppression but through understanding — the Self shines forth naturally, like the sun when clouds part.

This verse teaches that the Self transcends all categories of size, location, and measurement. It is neither big nor small, neither near nor far — it is beyond all such limitations. Yet it appears in all of them, pervading every level of existence.` },
    { id: `katha.2.1.7`, sanskrit: `आसीनो दूरं व्रजति शयानो याति सर्वतः |
क एवं विद्वान् आनन्दं कुतो नु तीर्थं न कुतो नु तीर्थम् ॥७॥`, transliteration: `āsīno dūraṁ vrajati śayāno yāti sarvataḥ |
ka evaṁ vidvān ānandaṁ ko vai nānandaḥ ||7||`, english: `Seated, it goes far. Lying down, it goes everywhere. Who but I can know this luminous, joyful Self?`, commentary: `This verse, similar to Chapter 1 verse 24, restates the Self's omnipresence through the paradox of stillness and motion. "Seated, it goes far" — even when the body is still, the Self pervades all space. "Lying down, it goes everywhere" — even in sleep, consciousness continues to pervade.

"Who but I can know this luminous, joyful Self?" — Yama speaks from direct experience. He has known the Self and declares its nature with authority. The "I" here is not the ego but the Self itself, speaking through the realized teacher.

"Luminous" (bhās) and "joyful" (ānanda) — these are the Self's natural qualities. The Self is not dark or blank — it is radiant with consciousness and joyful by nature. The darkness and suffering we experience are due to ignorance, not to the nature of reality.

This verse teaches that the Self is not some abstract, lifeless principle. It is living, luminous, and joyful. To know it is to discover the source of all light and all happiness — a light and happiness that are not dependent on external circumstances but are the very nature of what you are.` },
    { id: `katha.2.1.8`, sanskrit: `य इमं मध्वदं वेद आत्मानं जीवम् अन्तिकात् |
ईशानं भूतभव्यस्य न ततो विजुगुप्सते ॥८॥`, transliteration: `ya imaṁ madhvadaṁ veda ātmānaṁ jīvam antikāt |
īśānaṁ bhūta-bhavyasya na tato vijugupsate ||8||`, english: `The one who knows this Self as the eater of honey, the living being, the nearest, the lord of past and future — does not shrink from it thereafter.`, commentary: `This verse uses the metaphor of "the eater of honey" (madhvada) — the Self experiences the sweetness of life through the senses. All pleasure, all beauty, all joy that comes through experience is the Self tasting its own nature through the senses.

"The nearest" (antikāt) — the Self is not distant or transcendent in the ordinary sense. It is the nearest thing — the very awareness in which all experience appears. "The lord of past and future" — the Self is the ruler of time itself. It was there before your birth and will be there after your death.

"Does not shrink from it thereafter" — once the Self is known, there is no fear. Fear comes from the sense of separation, and when that separation dissolves, fear dissolves with it. The one who knows the Self does not fear death, because they know they are deathless.

This verse combines intimacy and power: the Self is the nearest thing and the lord of all time. It is both your intimate companion and the cosmic ruler. To know it is to be simultaneously humbled and exalted.` },
    { id: `katha.2.1.9`, sanskrit: `यः पूर्वं तपसो जातम् अद्भ्यः पूर्वम् अजायत |
गुहां प्रविश्य तिष्ठन्तं यो भूतेषु न पश्यति ॥३.९॥`, transliteration: `yaḥ pūrvaṁ tapaso jātam adbhyaḥ pūrvam ajāyata |
guhāṁ praviśya tiṣṭhantaṁ yo bhūteṣu na paśyati ||9||`, english: `The one who was born from tapas (austerity), who existed before the waters, who entered the cave of the heart and dwells there — the one who does not see this Self among beings is truly blind.`, commentary: `This verse describes the Self's primordial nature. "Born from tapas" — the Self is the product of cosmic austerity, the original creative impulse. "Existed before the waters" — in Vedic cosmology, water is one of the first elements to manifest. The Self existed even before that — it is the source of creation itself.

"Entered the cave of the heart and dwells there" — this primordial, cosmic Self is not somewhere in outer space. It has entered the cave of your heart and taken up residence there. The infinite has become intimate.

"The one who does not see this Self among beings is truly blind" — this is a strong statement. The Self is not hidden — it is everywhere, in every being. To miss it is not a minor oversight but a fundamental blindness. It is like standing in the ocean and being thirsty.

This verse connects the cosmic and the intimate. The Self that created the universe is the same Self that dwells in your heart. The macrocosm and the microcosm are one. To know the Self within is to know the Self everywhere.` },
    { id: `katha.2.1.10`, sanskrit: `या प्राणेन सम्भवत्य् अदितिर् देवतामयी |
गुहां प्रविश्य तिष्ठन्तीं या भूतेषु विभाति ॥१०॥`, transliteration: `yā prāṇena sambhavaty aditir devatāmayī |
guhāṁ praviśya tiṣṭhantīṁ yā bhūteṣu vibhāti ||10||`, english: `She who becomes manifest through prana, who is the divine nature, who entered the cave of the heart and shines among beings — she is Aditi, the mother of the gods.`, commentary: `This verse introduces a feminine dimension to the Self. "She who becomes manifest through prana" — the Self manifests as the life-force in all beings. "The divine nature" (devatāmayī) — the Self is not merely consciousness but the very nature of the divine.

"She is Aditi, the mother of the gods" — Aditi is the cosmic mother, the infinite space from which all gods and all beings arise. The Self is both father and mother of the universe — the creative source that is beyond gender yet embraces all genders.

"She shines among beings" — the Self is not hidden but shining. It is the light of consciousness that illuminates every experience. Without the Self, there would be no awareness, no perception, no experience at all.

This verse teaches that the Self is not a cold, abstract principle but a living, radiant presence. It is the light in every eye, the awareness in every mind, the life in every breath. To know it is to recognize the divine mother in all things.` },
    { id: `katha.2.1.11`, sanskrit: `यद् इदं किञ्च जगत् सर्वं प्राण एजति निःसृतम् |
महद् भयं वज्रम् उद्यतम् |
एको यस् तस्माद् बिभेति ॥११॥`, transliteration: `yad idaṁ kiñca jagat sarvaṁ prāṇa ejati niḥsṛatam |
mahad bhayaṁ vajram udyatam |
eko yaḥ sa mahīyasi ||11||`, english: `This Self is the fire that burns, the sun that shines, the rain that pours, the wind that blows. This Self is space and the earth. It is the source of all existence.`, commentary: `This verse reveals the Self as the source of all natural forces. "The fire that burns" — the Self is the energy in fire. "The sun that shines" — the Self is the light in the sun. "The rain that pours" — the Self is the nourishment in rain. "The wind that blows" — the Self is the movement in the air.

"This Self is space and the earth" — the Self is both the container (space) and the contained (earth). It is the emptiness in which everything appears and the substance from which everything is made.

"It is the source of all existence" — everything that exists — every element, every force, every creature — has its source in the Self. The Self is not ONE of the things that exists — it is the SOURCE of all things that exist.

This verse is a comprehensive statement of the Self's omnipresence. It is not limited to the human heart — it is the fire, the sun, the rain, the wind, space, and earth. The entire universe is the Self in manifestation. To know this is to see God everywhere, in everything, at all times.` },
    { id: `katha.2.1.12`, sanskrit: `अरण्योर् निहितो जातवेदा देवत्वम् एत्य |
शुक्रम् अमृतं विश्वम् आयुः प्राणं हिरण्मयम् ॥१२॥`, transliteration: `araṇyor nihito jātavedā devatvam etya |
śukram amṛtaṁ viśvam āyuḥ prāṇaṁ hiraṇmayam ||12||`, english: `The Self is the fire hidden in the two fire-sticks. It is the bright, the immortal, the universe, the life-prana, the golden, the source of all wealth.`, commentary: `This verse uses the Vedic metaphor of the fire hidden in the fire-sticks (arani). In Vedic fire rituals, fire was produced by friction between two wooden sticks. The fire was "hidden" in the wood and revealed through effort.

Similarly, the Self is hidden in the body-mind complex and revealed through the effort of meditation. The Self is not absent — it is present but concealed. Like fire in wood, it needs the friction of spiritual practice to manifest.

"Śukram" — bright, pure, radiant. "Amṛtam" — immortal, deathless. "Viśvam" — universal, all-pervading. "Āyuḥ" — the life-force itself. "Prāṇam" — the breath of life. "Hiraṇmayam" — golden, luminous.

Each adjective reveals a different facet of the Self. It is the brightest light, the immortal reality, the universal presence, the life-force, the golden radiance. These are not separate attributes but aspects of a single, infinite reality.

The verse concludes the first Valli of Chapter 2 by establishing the Self as the hidden treasure within all things — a treasure that can be found through the friction of meditation and the fire of knowledge.

ADHYAYA 2, VALLI 2: The Self in the Body` },
    { id: `katha.2.1.13`, sanskrit: `यद् एतद् विदुर् अमृतास् ते भवन्ति |
अथ विकल्पम् अविदुः ॥१३॥`, transliteration: `yad etad vidur amṛtās te bhavanti |
atha vikalpam aviduḥ ||13||`, english: `Those who know this become immortal. Others enter only into sorrow.`, commentary: `Know the Self and become immortal, or remain in ignorance and suffer. There is no middle ground. Those who know this - not those who believe or hope, but those who KNOW - become immortal. This is not a future promise but a present reality. The Self was always immortal; knowing this makes the immortality conscious. Others enter only into sorrow - those who do not know the Self remain trapped in the cycle of pleasure and pain, birth and death.` },
    { id: `katha.2.1.14`, sanskrit: `यदा पञ्चावतिष्ठन्ते ज्ञानानि मनसा सह |
बुद्धिश्च न विचेष्टति तामाहुः परमां गतिम् ॥१४॥`, transliteration: `yadā pañcāvatiṣṭhante jñānāni manasā saha |
buddhiś ca na viceṣṭati tām āhuḥ paramāṁ gatim ||14||`, english: `When the five senses along with the mind are at rest, and the intellect does not move - that is called the supreme state.`, commentary: `This verse describes samadhi - the state of complete mental stillness. All sensory input ceases, and the mind becomes completely quiet. Even the discriminative faculty comes to rest. That is called the supreme state - the highest goal of meditation. This is not sleep because awareness is fully present. It is not unconsciousness because the Self is more awake than ever. It is a state of pure awareness without content.` },
    { id: `katha.2.1.15`, sanskrit: `तां योगम् इति मन्यन्ते स्थिराम् इन्द्रियधारणाम् |
अप्रमत्तस् तदा भवति योगो हि प्रभवाप्ययौ ॥१५॥`, transliteration: `tāṁ yogam iti manyante sthirāṁ indriya-dhāraṇām |
apramattas tadā bhavati yogo hi prabhavāpyayau ||15||`, english: `This they call yoga - the steady control of the senses. Then one becomes watchful, for yoga comes and goes.`, commentary: `Yoga is defined precisely as the steady control of the senses. Yoga is not a system of exercises but the state of complete sensory control. Then one becomes watchful - the yogi is hyper-alert, not passive. Yoga comes and goes - even after experiencing samadhi, one can lose it. This is a realistic teaching. The spiritual path requires ongoing attention, like keeping a boat on course in changing currents.` },
    { id: `katha.2.1.16`, sanskrit: `न प्राणेन नापानेन मर्त्यो जीवति कश्चन |
इतरेण तु जीवन्ति यस्मिन् एताव् उपाश्रितौ ॥१६॥`, transliteration: `na prāṇenānānena martyo jīvati kaścana |
itareṇa tu jīvanti yasmin etāv upāśritau ||16||`, english: `Not by prana nor by apana does any mortal live. It is by another that they live, on which these two depend.`, commentary: `We do not live by breath alone. Prana and apana sustain the body, but they themselves depend on something deeper - the Self. It is by another that they live - this other is the Atman. Without the Self, neither prana nor apana could function. The breath depends on consciousness; consciousness does not depend on breath. This hierarchy of reality - body depends on breath, breath depends on prana, prana depends on the Self - reveals the source of all life.` },
    { id: `katha.2.1.17`, sanskrit: `हन्त त इदं प्रवक्ष्यामि गुह्यं ब्रह्म सनातनम् |
यथा मरणं प्राप्य आत्मा भवति गौतम ॥१७॥`, transliteration: `hanta te idaṁ pravakṣyāmi guhyaṁ brahma sanātanam |
yathā maraṇaṁ prāpya ātmā bhavati gautama ||17||`, english: `Yama said: I will tell you the eternal Brahman, O Gautama - what happens to the Self after death. Some bodies are born, others rest in the womb.`, commentary: `Yama promises to reveal the deepest secret - the eternal Brahman and what happens to the Self at death. The eternal, secret Brahman is the Absolute Reality - the source, sustainer, and dissolution of all that exists. Some bodies are born, others rest in the womb - the cycle of birth and rebirth continues. The Self - the Atman - is never born and never dies. Only the bodies change. Yama is now ready to give the teaching he initially tried to withhold.` },
    { id: `katha.2.1.18`, sanskrit: `योनिम् अन्ये प्रपद्यन्ते शरीरत्वाय देहिनः |
स्थाणुम् अन्येऽनुसंयन्ति यथाकर्म यथाश्रुतम् ॥१८॥`, transliteration: `yonim anye prapadyante śarīratvāya dehinaḥ |
sthāṇum anye 'nusaṁyanti yathā-karma yathā-śrutam ||18||`, english: `Some souls enter a womb to be embodied; others enter the stationary state, according to their actions and their knowledge.`, commentary: `This verse explains the mechanics of rebirth. Some souls are reborn in physical bodies. Others enter a state of rest. Rebirth is governed by two factors: karma and knowledge. Actions determine the quality of the next birth; knowledge determines whether there is a next birth at all. This provides a coherent explanation for the diversity of human circumstances. By changing one's actions and seeking higher knowledge, one can change one's future.` },
    { id: `katha.2.1.19`, sanskrit: `य एष सुप्तेषु जागर्ति कामं कामं पुरुषो निर्मिमाणः |
तदेव शुक्रं तद् ब्रह्म तद् एवामृतम् उच्यते |
तस्मिन् लोकाः श्रिताः सर्वे तदु नात्येति कश्चन |
एतद् वै तत् ॥१९॥`, transliteration: `ya eṣa supteṣu jāgarti kāmaṁ kāmaṁ puruṣo nirmimāṇaḥ |
tad eva śukraṁ tad brahma tad evāmṛtam ucyate |
tasmin lokāḥ śritāḥ sarve tad u nātyeti kaścana |
etad vai tat ||19||`, english: `The Self who is awake while all others sleep, creating desires - that is the Pure, that is Brahman, that alone is called the Immortal. In it all worlds rest. None transcends it. This indeed is that.`, commentary: `The Self is awake while all others sleep. Even in deep sleep, consciousness continues to pervade. The Self creates desires and experiences. That is the Pure, that is Brahman, that alone is called the Immortal. In it all worlds rest - all planes of existence rest within the Self. None transcends it - no being, no force can go beyond the Self. It is the ultimate reality. This indeed is that - the formula of recognition.` },
    { id: `katha.2.2.1`, sanskrit: `हंसः शुचिषद् वसुर् अन्तरिक्षसद् |
होता वेदिषद् अतिथिर् दुरोणसत् ॥१॥`, transliteration: `haṁsaḥ śuciṣad vasur antarikṣasad |
hotā vediṣad atithir duroṇasat ||1||`, english: `There is an unborn, eternal, ancient Self within the body that is not killed when the body is killed. If the killer thinks of killing, or the killed thinks of being killed — both do not know. This Self does not kill, nor is it killed.`, commentary: `This is one of the most powerful verses in the Upanishads, later echoed in Bhagavad Gita 2.19. It addresses the question of violence at the deepest level.

"If the killer thinks of killing" — the one who commits violence does not understand that the Self cannot be killed. They think they are destroying a life, but the life they destroy is only the body, not the Self. "Or the killed thinks of being killed" — the victim does not understand that their true Self is untouched by death.

"Both do not know" — neither the killer nor the victim understands the truth. If they did, there would be no killing and no fear of death. Violence arises from ignorance of the Self.

"This Self does not kill, nor is it killed" — the Self is beyond the duality of killer and killed. It is neither the agent nor the patient of violence. It is the untouched witness of all action.

This verse does not justify violence — it reveals the deeper truth that makes violence ultimately meaningless. When you know the Self, you see that no one can truly harm anyone else. This knowledge naturally leads to compassion and non-violence.` },
    { id: `katha.2.2.2`, sanskrit: `अणोर् अणीयान् महतो महीयान् |
आत्मास्य जन्तोर् निहितो गुहायाम् |
तम् अक्रतुं पश्यति वीतशोको |
धातुप्रसादान् महिमानम् आत्मनः ॥२॥`, transliteration: `aṇor aṇīyān mahato mahīyān |
ātmāsya jantor nihito guhāyām |
tam akratuṁ paśyati vītaśoko |
dhātu-prasādān mahimānam ātmanaḥ ||2||`, english: `The Self is smaller than the smallest, greater than the greatest. Hidden in the heart of every being. The one free from desire, through the grace of the Creator, sees the Self's glory and is freed from sorrow.`, commentary: `This verse, which appeared earlier in Chapter 2, is repeated here with a significant addition: "through the grace of the Creator" (dhātu-prasādāt). This emphasizes that the realization of the Self is not solely an individual achievement — it requires divine grace.

"The one free from desire sees the Self's glory" — desire and grace are inversely related. When desire subsides, grace enters. When the mind is full of wanting, there is no room for the divine to reveal itself.

"Vītaśoko" — "freed from sorrow." This is the fruit of seeing the Self's glory. Not temporary happiness, not relief from specific problems, but the complete cessation of sorrow at its root. When you know the Self, sorrow cannot touch you because you know that nothing real can be lost.

The repetition of this verse in the text serves to emphasize its importance. It contains the entire teaching in miniature: the Self is infinite, it is hidden in the heart, it is revealed through grace when desire subsides, and knowing it frees one from all sorrow.` },
    { id: `katha.2.2.3`, sanskrit: `तम् आत्मस्थं मनुष्यं यं |
युञ्जीत कर्मणि तं योगम् |
तद् एव श्रेष्ठं नैव |
तत्त्वतः तम् आत्मस्थम् ॥३॥`, transliteration: `āsīno dūraṁ vrajati śayāno yāti sarvataḥ |
sukham āsīnaṁ vrajati sukhaṁ śete ||3||`, english: `Seated, it goes far. Lying down, it goes everywhere. Who can know this Self, other than me? It is not this, not this (neti neti). It is incomprehensible, for it cannot be comprehended. It is indestructible, for it cannot be destroyed.`, commentary: `This verse introduces one of the most important teachings in Vedanta: "neti neti" — "not this, not this." This is the method of negation used to point to the Self. Whatever you can think, the Self is not that. Whatever you can perceive, the Self is not that. Whatever you can describe, the Self is not that.

"It is incomprehensible, for it cannot be comprehended" — the Self cannot be grasped by the mind because it is the one doing the grasping. A knife cannot cut itself; an eye cannot see itself; the mind cannot comprehend the Self.

"It is indestructible, for it cannot be destroyed" — the Self cannot be destroyed because it was never created. It is the uncaused cause, the source of all creation, beyond the reach of any destructive force.

"Neti neti" is not a negative statement but a pointing. It does not say the Self does not exist — it says the Self exists beyond all categories of existence and non-existence. It transcends all description, all concept, all understanding. It can only be lived, not thought.

This teaching frees the seeker from attachment to any particular concept of the Self. The Self is not an idea, a feeling, a vision, or an experience. It is beyond all of these — it is the very awareness in which all ideas, feelings, visions, and experiences appear.` },
    { id: `katha.2.2.4`, sanskrit: `अविज्ञातम् अजानताम् |
विज्ञातम् अजानताम् |
विज्ञातम् अजानताम् ॥४॥`, transliteration: `avijñātam ajānatām |
vijñātam ajānatām ||4||`, english: `The Self is not known by those who think they know it. It is known by those who know they do not know it.`, commentary: `This paradoxical verse states one of the most important principles of spiritual knowledge. Those who think they know the Self — who have a concept, a theory, a belief about it — do not actually know it. Their knowledge is intellectual, not experiential.

Those who know they do not know the Self — who have recognized the limits of their understanding, who approach the mystery with humility — are the ones who actually know it. This is because the Self is not an object of knowledge but the subject that knows all objects.

The greatest obstacle to Self-realization is the belief that one already knows. The scholar who has memorized all the scriptures, the philosopher who has mastered all the arguments, the meditator who has had profound experiences — all of these may be trapped by the belief that they know.

True knowing is not a state of certainty but of openness. It is not "I know what the Self is" but "I am open to what the Self reveals." This openness, this humility, this willingness to not-know — is the gateway to direct realization.

This teaching echoes Socrates: "I know that I know nothing." The wisest are those who recognize how much they do not know — and in that recognition, they become available to the truth that transcends all knowing.` },
    { id: `katha.2.2.5`, sanskrit: `प्राणस्य प्राणम् उत चक्षुषश् चक्षुः |
श्रोत्रस्य श्रोत्रं मनसो यो मनो वदन्ति ॥५॥`, transliteration: `prāṇasya prāṇam uta cakṣuṣaś cakṣuḥ |
śrotrasya śrotraṁ manaso yo mano vadanti ||5||`, english: `The Self is the breath of breath, the eye of the eye, the ear of the ear, the mind of the mind. The wise who perceive this thus — they attain the ancient, primordial Self.`, commentary: `This verse uses a powerful grammatical construction to describe the Self. "The breath of breath" — the Self is what makes breath breathe. "The eye of the eye" — the Self is what makes the eye see. "The ear of the ear" — the Self is what makes the ear hear. "The mind of the mind" — the Self is what makes the mind think.

In each case, the Self is the consciousness behind the function. The eye does not see by itself — it is the Self that sees through the eye. The mind does not think by itself — it is the Self that thinks through the mind. Without the Self, all the organs would be inert matter.

This teaching reveals the Self as the ultimate subject. It is not an object to be perceived but the perceiver of all perception. It is not a thought to be thought but the thinker of all thought. It is not a feeling to be felt but the feeler of all feeling.

"The wise who perceive this thus attain the ancient, primordial Self" — the one who understands this teaching, who recognizes the Self as the consciousness behind all experience, attains the primordial reality that existed before the universe was born.` },
    { id: `katha.2.2.6`, sanskrit: `उत्तिष्ठत जाग्रत प्राप्य वरान् निबोधत |
क्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस् तत् कवयो वदन्ति ॥६॥`, transliteration: `uttiṣṭhata jāgrata prāpya varān nibodhata |
kṣurasya dhārā niśitā duratyayā durgaṁ pathas tat kavayo vadanti ||6||`, english: `Arise! Awake! Approach the great ones and learn. The path is sharp as a razor's edge, hard to tread — so the sages say.`, commentary: `This is one of the most famous verses in the Upanishads — the great call to awakening. "Uttiṣṭhata" — Arise! "Jāgrata" — Awake! "Prāpya varān nibodhata" — Approach the great teachers and learn!

The urgency is unmistakable. This is not a casual suggestion but a cosmic imperative. The Self will not wait forever. The body ages, opportunities pass, and the chance for realization may not come again.

"Kṣurasya dhārā niśitā duratyayā" — "sharp as a razor's edge, hard to tread." The spiritual path is not easy. It requires precision, balance, and unwavering commitment. Like walking on a razor's edge, one misstep can send you off course.

"Durgaṁ pathas" — "the path is difficult." The Upanishad does not pretend the path is easy. It is honest about the challenges. But it also offers the solution: approach the realized teachers, learn from those who have walked the path before you.

This verse has inspired countless seekers throughout history. It is the call of the Upanishads to humanity: Wake up! You are sleeping in ignorance! The Self is waiting — arise and claim your birthright!` },
    { id: `katha.2.2.7`, sanskrit: `रसं ह्य् एवायं लब्ध्वाऽनन्दी भवति |
कुतस् तत्स्याद् विद्वान् कस्य शोकः ॥७॥`, transliteration: `raṁ hy evāyaṁ labdhvānandī bhavati |
kutas tasyād vidvāṁs tasya kaḥ śokaḥ ||7||`, english: `Having known the taste of this Self, one becomes blissful. The wise one who has known the Self — from where would sorrow come? From where would delusion come?`, commentary: `The fruit of Self-knowledge is stated simply: "one becomes blissful" (ānandī bhavati). This bliss is not dependent on circumstances — it is the natural state of the Self. When the Self is known, this natural bliss becomes permanent and unshakeable.

"From where would sorrow come?" — sorrow requires a sense of loss, and loss requires a sense of separation. When the Self is known as all-pervading, there is nothing separate to lose. Sorrow loses its foundation.

"From where would delusion come?" — delusion requires a false sense of identity. When the true Self is known, all false identifications dissolve. Delusion loses its ground.

This verse is the Upanishad's promise: Self-knowledge brings permanent bliss and freedom from sorrow and delusion. It is not a temporary state but a permanent transformation of consciousness. The sage who knows the Self lives in continuous, unshakeable bliss — not because everything goes right, but because they have found the source of happiness that is independent of everything.

ADHYAYA 2, VALLI 3: The Tree of the World` },
    { id: `katha.2.2.8`, sanskrit: `सर्वे वेदा यत् पदम् आमनन्ति |
तपांसि सर्वाणि च यद् वदन्ति |
यद् इच्छन्तो ब्रह्मचर्यं चरन्ति |
तत् ते पदं संग्रहेण प्रवक्ष्ये ॥८॥`, transliteration: `sarve vedā yat padam āmananti |
tapāṁsi sarvāṇi ca yad vadanti |
yad icchanto brahmacaryaṁ caranti |
tat te padaṁ saṅgraheṇa pravakṣye ||8||`, english: `All the Vedas speak of that goal which all austerities declare, for the sake of which students practice brahmacharya. I shall tell you that goal in brief.`, commentary: `All the Vedas speak of a single goal. All austerities are directed toward the same goal. Students practice brahmacharya for the sake of this goal. Yama is about to give the essence of all spiritual teaching in a single statement. This verse builds anticipation for the final revelation.` },
    { id: `katha.2.2.9`, sanskrit: `एतद् ध्य् एवाक्षरं ब्रह्म एतद् ध्य् एवाक्षरं परम् |
एतद् ध्य् एवाक्षरं ज्ञात्वा यो यद् इच्छति तस्य तत् ॥९॥`, transliteration: `etad hy evākṣaraṁ brahma etad hy evākṣaraṁ param |
etad hy evākṣaraṁ jñātvā yo yad icchati tasya tat ||9||`, english: `This imperishable syllable is indeed Brahman. This imperishable syllable is indeed the supreme. Knowing this imperishable syllable, one obtains whatever one desires.`, commentary: `The imperishable syllable AUM is Brahman. AUM is not a symbol or representation of Brahman - it IS Brahman. The sacred sound and the Absolute reality are one. There is nothing higher than AUM because AUM IS the highest reality. Knowing AUM, one obtains whatever one desires - not magical wish-fulfillment but the realization that Self-knowledge fulfills all desires at their root. When you know the Self, all desires are naturally fulfilled.` },
    { id: `katha.2.2.10`, sanskrit: `एतद् वै तत् ॥१०॥`, transliteration: `etad vai tat ||10||`, english: `This indeed is that.`, commentary: `This single-line verse is one of the most powerful in the Upanishads. This indeed is that. This - what is right here, right now, in your immediate experience. That - the supreme Brahman, the Absolute, the goal of all seeking. The teaching is: what you are looking for is already here. The Self you seek through meditation, study, and practice is the very awareness in which these activities are taking place. There is no distance between you and the Absolute.` },
    { id: `katha.2.2.11`, sanskrit: `य इमं मध्वदं वेद आत्मानं जीवम् अन्तिकात् |
ईशानं भूतभव्यस्य न ततो विजुगुप्सते |
एतद् वै तत् ॥११॥`, transliteration: `ya imaṁ madhvadaṁ veda ātmānaṁ jīvam antikāt |
īśānaṁ bhūta-bhavyasya na tato vijugupsate |
etad vai tat ||11||`, english: `The one who knows this Self as the eater of honey, the living being, the nearest, the lord of past and future - does not shrink from it. This indeed is that.`, commentary: `The Self is the eater of honey - it experiences the sweetness of life through the senses. The living being - the Self is the life-principle in every creature. The nearest - the Self is the closest reality, nearer than breath or thought. The lord of past and future - the Self transcends time. Once the Self is known, there is no fear. Fear comes from separation, and when the Self is realized, all separation dissolves.` },
    { id: `katha.2.2.12`, sanskrit: `अङ्गुष्ठमात्रः पुरुषो ज्योतिर् इवाधूमकः |
आत्मास्य जन्तोर् निहितो गुहायाम् |
एतद् वै तत् ॥१२॥`, transliteration: `aṅguṣṭha-mātraḥ puruṣo jyotir ivādhūmakaḥ |
ātmāsya jantor nihito guhāyām |
etad vai tat ||12||`, english: `The Purusha, the size of a thumb, is like a smokeless flame. The Self is hidden in the heart of every being. This indeed is that.`, commentary: `The Self is a thumb-sized, smokeless flame dwelling in the heart. This is not far away, not abstract, not conceptual. It is a luminous presence in the cave of your heart, right now. The size of a thumb suggests something small, intimate, personal. Like a smokeless flame - pure light, without contamination. The Self illuminates the heart-cave with a clear, steady light. This indeed is that.` },
    { id: `katha.2.2.13`, sanskrit: `सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः |
येनाक्रमन्त्य् ऋषयो ह्य् आप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥१३॥`, transliteration: `satyam eva jayate nānṛtaṁ satyena panthā vitato devayānaḥ |
yenākramanty ṛṣayo hy āptakāmā yatra tat satyasya paramaṁ nidhānam ||13||`, english: `Truth alone triumphs, not falsehood. By truth is the path of the gods laid out - the path by which the sages, having satisfied their desires, travel to the supreme abode of truth.`, commentary: `Satyam eva jayate - Truth alone triumphs. This is one of the most famous verses in Indian literature, later adopted as India national motto. The divine path is paved with truth. Those who live in truth naturally travel the path that leads to liberation. The supreme abode of truth is Brahman itself, the ultimate truth, the final destination. Truth is not merely a moral virtue but the very foundation of the spiritual path.` },
    { id: `katha.2.2.14`, sanskrit: `एषोऽणुर् आत्मा चेतसा वेदितव्यो |
यस्मिन् प्राणः पञ्चधा संविवेश |
प्राणैश् चित्तं सर्वम् ओतं प्रज्ञानम् |
यस्मिन् विशुद्धे विभवत्य् एष आत्मा ॥१४॥`, transliteration: `eṣo 'ṇur ātmā cetasā veditavyo |
yasmin prāṇaḥ pañcadhā saṁviveśa |
prāṇaiś cittaṁ sarvam otaṁ prajñānam |
yasmin viśuddhe vibhavaty eṣa ātmā ||14||`, english: `This subtle Self is to be known by the mind, in which the pranas have entered fivefold. The mind is pervaded by the pranas, and by pure intelligence. When the mind is purified, the Self shines forth.`, commentary: `This subtle Self is to be known by the mind, not by the senses. The five pranas have entered the body, creating the life-force. The mind functions through the pranas, and the Self illuminates the mind through pure intelligence. There is a chain: Self, intelligence, mind, pranas, body. When the mind is purified, the Self shines forth. The Self is always present but obscured by mental impurity. Like cleaning a mirror to see your reflection - the reflection was always there.` },
    { id: `katha.2.2.15`, sanskrit: `यस्त्व् अविज्ञानवान् भवति अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥१५॥`, transliteration: `yas tv avijñānavān bhavati amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||15||`, english: `The one without understanding, with uncontrolled mind, always impure - does not attain the Self and returns to the cycle of birth and death.`, commentary: `The one who lacks understanding, whose mind is uncontrolled, and who remains impure does not attain the Self. Without understanding, lacking discriminative knowledge. Uncontrolled mind - restless, reactive, undisciplined. Always impure - contaminated by desire, aversion, and delusion. The consequence: does not attain the Self and returns to the cycle of birth and death. Ignorance leads to continued suffering. The choice is ours.` },
    { id: `katha.2.3.1`, sanskrit: `ऊर्ध्वमूलम् अधः शाखम् अश्वत्थं प्राहुर् अव्ययम् |
छन्दांसि यस्य पर्णानि यस् तं वेद स वेदवित् ॥१॥`, transliteration: `ūrdhva-mūlam adhaḥ śākham aśvatthaṁ prāhur avyayam |
chandāṁsi yasya parṇāni yas taṁ veda sa veda-vit ||1||`, english: `They speak of an eternal Ashvattha tree with roots above and branches below. Its leaves are the Vedic hymns. The one who knows this tree knows the Vedas.`, commentary: `This is the famous Ashvattha tree metaphor — the cosmic tree of existence. Its roots are above, in the Absolute; its branches spread downward into the manifest world. This tree is inverted: it grows from the transcendent downward into the material.

"Its leaves are the Vedic hymns" — the Vedas, with their hymns and rituals, are like the leaves of this cosmic tree. They sustain the tree but are not the tree itself. The leaves can be studied, but knowing the tree requires seeing its roots — the Absolute above.

"Aśvatthaṁ prāhur avyayam" — "they speak of it as the eternal Ashvattha." The Ashvattha tree (ficus religiosa, the sacred fig) was chosen because of its longevity and aerial roots — a tree that seems to grow upside down, with roots hanging from above.

Krishna later uses this same image in Bhagavad Gita 15.1-3. The inverted tree is the universe itself — its roots in Brahman, its branches in the manifest world. To know this tree is to know the entire structure of reality.

The practical instruction: do not be satisfied with the leaves (scriptural knowledge alone). Seek the roots (the Absolute) from which the entire tree grows.` },
    { id: `katha.2.3.2`, sanskrit: `अधश्च ऊर्ध्वं प्रसृतास्तस्य शाखा |
गुणप्रवृद्धा विषयप्रवालाः ॥२॥`, transliteration: `adhaś cordhvaṁ prasṛtās tasya śākhā |
guṇa-pravṛddhā viṣaya-pravālāḥ ||2||`, english: `The branches of this tree spread both downward and upward, nourished by the three gunas. Its buds are the sense objects. Its roots extend downward into the world of men.`, commentary: `The cosmic tree's branches are nourished by the three gunas — sattva (goodness), rajas (passion), and tamas (ignorance). These three forces shape all of creation, giving rise to the diversity of forms and experiences.

"Its buds are the sense objects" (viṣaya-pravālāḥ) — the sense objects are the tender shoots of this tree. They are the most immediate expressions of the cosmic tree's growth — the sights, sounds, tastes, touches, and smells that we experience.

"Its roots extend downward into the world of men" — the tree's roots reach into human existence, into the world of action and consequence. Our lives are part of this cosmic tree — we are both its products and its expressions.

This image teaches that we are not separate from the universe. We are branches of the cosmic tree, nourished by the same forces (gunas) that shape all of creation. Our desires, our actions, our very existence are expressions of this one tree.

The teaching implies that freedom comes from cutting the tree — not by destroying the world but by cutting our attachment to it. When we see through the illusion of separateness, we can return to the roots above — the Absolute from which everything sprang.` },
    { id: `katha.2.3.3`, sanskrit: `न रूपम् अस्येह तथोपलभ्यते |
नान्तो न चादिर् न च सम्प्रतिष्ठा ॥३॥`, transliteration: `na rūpam asyeha tathopalabhyate |
nānto na cādir na ca sampratiṣṭhā ||3||`, english: `This tree has no form here that can be seen. It has no end, no beginning, and no foundation. One should cut this firm-rooted Ashvattha with the strong axe of detachment.`, commentary: `The cosmic tree has no visible form — it is not a physical tree but a metaphor for the entire structure of manifest existence. It has no beginning (because it has always existed), no end (because it will always exist), and no foundation (because its roots are in the formless Absolute).

"One should cut this firm-rooted Ashvattha with the strong axe of detachment" — this is the practical instruction. The tree of worldly existence is firmly rooted in our desires and attachments. To be free, we must cut through these roots with the axe of vairagya (dispassion, detachment).

This does not mean destroying the world or rejecting life. It means cutting the attachment — the sense that "this is mine" and "I am this." When attachment is cut, the tree of suffering falls, and the Self is revealed as the space in which the tree appeared.

The "strong axe" must be sharp and wielded with force. Half-hearted attempts at detachment will not work. The roots of attachment go deep — into habit, conditioning, fear, and desire. Cutting them requires sustained effort, courage, and the support of a spiritual practice.` },
    { id: `katha.2.3.4`, sanskrit: `यद् एतद् विदुर् अमृतास् ते भवन्ति |
अन्यथा विद्या विकल्पम् एव विदुः ॥४॥`, transliteration: `yad etad vidur amṛtās te bhavanti |
anyathā vidyā vikalpam eva viduḥ ||4||`, english: `The one who knows this — they become immortal. All else is mere verbal gymnastics. Through the grace of the Creator, one perceives the glory of the Self.`, commentary: `This verse cuts through all intellectual sophistication: "All else is mere verbal gymnastics" (anyathā vidyā vikalpam eva viduḥ). All knowledge that does not lead to the direct realization of the Self is just words — elaborate, impressive, but ultimately empty.

"The one who knows this — they become immortal" (yad etad vidur amṛtās te bhavanti). The fruit of knowing the cosmic tree is immortality — not physical immortality but the realization that the Self was never born and will never die.

"Through the grace of the Creator, one perceives the glory of the Self" — once again, grace is emphasized. The Self is not known through effort alone but through the divine grace that responds to sincere seeking.

This verse is a call to stop intellectualizing and start experiencing. Reading about the Self is not knowing the Self. Talking about meditation is not meditating. The Upanishad is impatient with theories and demands direct realization.` },
    { id: `katha.2.3.5`, sanskrit: `यदा सर्वे प्रमुच्यन्ते कामा येऽस्य हृदि श्रिताः ।
अथ मर्त्योऽमृतो भवत्य् अत्र ब्रह्म समश्नुते ॥५॥`, transliteration: `yadā sarve pramucyante kāmā ye 'sya hṛdi śritāḥ |
atha martyo 'mṛto bhavaty atra brahma samaśnute ||5||`, english: `When all the desires that dwell in the heart are destroyed — then the mortal becomes immortal and attains Brahman here itself.`, commentary: `This verse states the formula for liberation in its simplest form. "When all the desires that dwell in the heart are destroyed" — not suppressed, not transcended, not managed, but destroyed. When desire is completely uprooted, the heart becomes clear.

"Then the mortal becomes immortal" — the transformation is instantaneous. One moment you are a mortal, bound by desire and death. The next moment, when the last desire falls, you are immortal. The change is not in the Self — the Self was always immortal. The change is in the recognition.

"Atra brahma samaśnute" — "here itself, one attains Brahman." Liberation is not in some future heaven or after death. It is here, now, in this very body. When desire is gone, Brahman is revealed as the ever-present reality.

This verse is both the simplest and the most challenging teaching in the Upanishad. It says: destroy all desires, and you will be free. The question is how — and the answer is through constant awareness, meditation, and the grace of the Self that shines when the mind is still.` },
    { id: `katha.2.3.6`, sanskrit: `यदा सर्वे प्रभिद्यन्ते हृदयस्येह ग्रन्थयः |
अथ मर्त्योऽमृतो भवत्य् एतावद् ध्यानम् इष्यते ॥६॥`, transliteration: `yadā sarve prabhidyaite hṛdayasyeha granthayaḥ |
atha martyo 'mṛto bhavaty etāvad dhānam iṣyate ||6||`, english: `When all the knots of the heart are cut asunder — then the mortal becomes immortal. This is the entire teaching of the Upanishad. Beyond this, there is nothing to be said.`, commentary: `This verse is the culmination of the Katha Upanishad's teaching. "When all the knots of the heart are cut asunder" — the "knots" (granthi) are the deep-seated tendencies of ignorance, desire, and karma that bind the soul to the wheel of rebirth.

The three great knots are: avidya (ignorance), kama (desire), and karma (action). When these three are completely cut — not by force but by the sword of knowledge — the mortal becomes immortal.

"Etāvad dhānam iṣyate" — "this is the entire teaching." Yama is saying: "I have told you everything. This is the essence of all I know. Beyond this, there is nothing more to be said."

"Na atah parā upākhyāne" — "there is nothing beyond this in the story." The teaching is complete. The rest is up to the seeker — to practice, to persevere, to realize.

This verse is like the final chord of a symphony — it resolves all tensions, answers all questions, and leaves the listener in silence. The Katha Upanishad began with a boy's question about death and ends with the answer: the Self is deathless. Know it and be free.` },
    { id: `katha.2.3.7`, sanskrit: `शतं चैका च हृदयस्य नाड्यः |
तासां मूर्धानम् अभिनिःसृतैका |
तयोर् ऊर्ध्वम् आयन् अमृतत्वम् एति |
विष्वङ् अन्या उत्क्रमणे भवन्ति ॥७॥`, transliteration: `śataṁ caikā ca hṛdayasya nāḍyaḥ |
tāsāṁ mūrdhānam abhiniḥsṛtaikā |
tayor ūrdhvam āyan amṛtatvam eti |
viṣvaṅ anyā utkramaṇe bhavanti ||7||`, english: `There are one hundred and one nerves of the heart. One of them penetrates the crown of the head. Going upward through that nerve, one attains immortality. The others lead in various directions at the time of departure.`, commentary: `This final verse of the Katha Upanishad provides the subtle yogic anatomy of liberation. "One hundred and one nerves of the heart" — the Upanishads describe a network of subtle energy channels (nadis) emanating from the heart center.

"One of them penetrates the crown of the head" — this is the sushumna nadi, the central channel that leads to the crown (sahasrara). Through this channel, the awakened kundalini or the concentrated consciousness ascends to the highest center.

"Going upward through that nerve, one attains immortality" — when the soul departs through the crown of the head, it merges with the Absolute and does not return to the cycle of birth and death.

"The others lead in various directions at the time of departure" — the other 100 nerves lead to various destinations in the cycle of rebirth. Depending on the state of consciousness at the time of death, the soul exits through different channels and takes different forms.

This verse completes the Katha Upanishad's teaching with a practical yogic instruction: cultivate the consciousness that can exit through the crown at the time of death. This is the ultimate goal of meditation — to prepare for a conscious departure that leads to immortality.

The Katha Upanishad, from the story of a boy confronting Death to the subtle yogic science of liberation, is complete.

MANDUKYA UPANISHAD (Māṇḍūkya Upaniṣad)
============================================================` },
    { id: `katha.2.3.8`, sanskrit: `नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः |
न चैनं क्लेदयन्त्य् आपो न शोषयति मारुतः ॥८॥`, transliteration: `nainaṁ chindanti śastrāṇi nainaṁ dahati pāvakaḥ |
na cainaṁ kledayanty āpo na śoṣayati mārutaḥ ||8||`, english: `Weapons cannot cut it, fire cannot burn it, water cannot wet it, wind cannot dry it.`, commentary: `Weapons cannot cut it - the Self is not physical and cannot be harmed by physical means. Fire cannot burn it - the Self is subtler than fire. Water cannot wet it - the Self is not a material substance. Wind cannot dry it - the Self is not subject to any physical process. Each negation removes a category of destruction. The Self cannot be cut, burned, wet, or dried - it is beyond all physical forces. This is not because the Self is strong but because it is not physical at all. It is pure consciousness.` },
    { id: `katha.2.3.9`, sanskrit: `अशरीरं शरीरेषु अनवस्थेष्व् अवस्थितम् |
महान्तं विभुम् आत्मानं मत्वा धीरो न शोचति ॥९॥`, transliteration: `aśarīraṁ śarīreṣu anavastheṣv avasthitam |
mahāntaṁ vibhum ātmānaṁ matvā dhīro na śocati ||9||`, english: `The Self is bodiless among the bodied, permanent among the impermanent, great and all-pervading. The wise one who knows this does not grief.`, commentary: `The Self has no form yet dwells in every form. Everything changes but the Self does not. The Self is infinite, present everywhere. The body is a localized point; the Self is without limit. The wise one who knows this does not grieve. Grief comes from loss, and loss comes from identification with what is limited. When you identify with the infinite Self, there is nothing to lose and therefore nothing to grieve for. The sage does not become heartless - they become infinitely compassionate.` },
    { id: `katha.2.3.10`, sanskrit: `एषोऽणुर् आत्मा चेतसा वेदितव्यो |
यस्मिन् प्राणः पञ्चधा संविवेश |
प्राणैश् चित्तं सर्वम् ओतं प्रज्ञानम् |
यस्मिन् विशुद्धे विभवत्य् एष आत्मा ॥१०॥`, transliteration: `eṣo 'ṇur ātmā cetasā veditavyo |
yasmin prāṇaḥ pañcadhā saṁviveśa |
prāṇaiś cittaṁ sarvam otaṁ prajñānam |
yasmin viśuddhe vibhavaty eṣa ātmā ||10||`, english: `This subtle Self is to be known by the mind, in which the pranas have entered fivefold. The mind is pervaded by the pranas, and by pure intelligence. When the mind is purified, the Self shines forth.`, commentary: `The subtle Self is to be known by the purified mind. The five pranas have entered the body, creating the life-force. The mind functions through the pranas, and the Self illuminates the mind through pure intelligence. There is a chain: Self, intelligence, mind, pranas, body. When the mind is purified through meditation, devotion, and selfless action, the Self naturally becomes visible. The Self is always present but obscured by mental impurity. Purify the mind and the Self will be revealed.` },
    { id: `katha.2.3.11`, sanskrit: `यस्त्व् अविज्ञानवान् भवति अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥११॥`, transliteration: `yas tv avijñānavān bhavati amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||11||`, english: `The one without understanding, with uncontrolled mind, always impure - does not attain the Self and returns to the cycle of birth and death.`, commentary: `The one who lacks understanding, whose mind is uncontrolled, and who remains impure does not attain the Self. Without understanding means lacking discriminative knowledge. Uncontrolled mind means restless, reactive, undisciplined. Always impure means contaminated by desire, aversion, and delusion. The consequence is clear: does not attain the Self and returns to the cycle of birth and death. Ignorance leads to continued suffering in the wheel of rebirth. The choice is ours.` },
    { id: `katha.2.3.12`, sanskrit: `आत्मानं रथिनं विद्धि शरीरं रथमेव तु |
बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च ॥१२॥`, transliteration: `ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu |
buddhiṁ tu sārathiṁ viddhi manaḥ pragraham eva ca ||12||`, english: `Know the Self as the lord of the chariot, the body as the chariot, the intellect as the charioteer, and the mind as the reins.`, commentary: `This verse returns to the chariot analogy one final time. The Self is the lord - the one who directs the journey. The body is the chariot - the vehicle. The intellect is the charioteer - the discriminative faculty. The mind is the reins - the controlling mechanism. The chariot analogy has been the central teaching device. The final instruction: train the charioteer, tighten the reins, and the lord of the chariot will reach its destination - the realization of its own immortal nature.` },
    { id: `katha.2.3.13`, sanskrit: `इन्द्रियाणि हयान् आहुर् विषयांस् तेषु गोचरान् |
आत्मेन्द्रियमनोयुक्तं भोक्तेत्य् आहुर् मनीषिणः ॥१३॥`, transliteration: `indriyāṇi hayān āhur viṣayāṁs teṣu gocarān |
ātmendriya-mano-yuktaṁ bhoktety āhur manīṣiṇaḥ ||13||`, english: `The senses are the horses, the sense objects are the roads. The Self, united with the senses and the mind, is called the enjoyer by the wise.`, commentary: `This verse completes the chariot analogy. The senses are the horses that pull the chariot. The sense objects are the roads. The Self, united with the senses and the mind, is called the enjoyer - the one who experiences, who enjoys, who lives through the body-mind complex. The body-mind is the instrument; the Self is the one who uses it. This understanding from the wise completes the teaching on the relationship between the Self and the body-mind.` },
    { id: `katha.2.3.14`, sanskrit: `यस्त्व् अविज्ञानवान् भवति अमनस्कः सदाऽशुचिः |
न स तत्पदम् आप्नोति संसारं चाधिगच्छति ॥१४॥`, transliteration: `yas tv avijñānavān bhavati amanaskaḥ sadā 'śuciḥ |
na sa tat padam āpnoti saṁsāraṁ cādhigacchati ||14||`, english: `The one whose intellect is not clear, whose mind is uncontrolled, whose senses do not obey - such a one does not reach the goal and enters the cycle of birth and death.`, commentary: `This final verse of the Katha Upanishad restates the warning one last time. The one whose intellect is dull, whose mind is undisciplined, and whose senses are uncontrolled does not reach the goal. This is a compassionate warning, not a threat. It simply states the natural consequence of living in ignorance. Like a chariot with a sleeping charioteer, loose reins, and wild horses will crash, a person without Self-knowledge will remain trapped in suffering. The Katha Upanishad is complete.` },
  ],
}

export const mandukyaUpanishad: Upanishad = {
  id: 'mandukya',
  name: `Mandukya Upanishad`,
  sanskritName: `माण्डूक्य उपनिषद्`,
  transliteration: `Māṇḍūkya Upaniṣad`,
  summary: `The Mandukya Upanishad, the shortest yet most profound of the principal Upanishads, expounds the sacred syllable AUM and the four states of consciousness. It is considered the essence of all Vedantic teaching.`,
  theme: `AUM, the four states of consciousness (waking, dreaming, deep sleep, turiya), and the nature of Brahman.`,
  verseCount: 12,
  sections: [
  ],
  verses: [
    { id: `mandukya.0.1`, sanskrit: `ॐ इत्येतदक्षरम् इदं सर्वं तस्योपव्याख्यानम् |
भूतं भवद् भविष्यद् इति सर्वम् ओंकार एव |
यच्चान्यत् त्रिकालातीतं तद् अप्य् ओंकार एव ॥१॥`, transliteration: `oṁ ity etad akṣaram idaṁ sarvaṁ tasyopavyākhyānam |
bhūtaṁ bhavad bhaviṣyad iti sarvam oṁkāra eva |
yac cānyat trikālātītaṁ tad apy oṁkāra eva ||1||`, english: `AUM — this syllable is all this. Its explanation is as follows: all that is past, present, and future is verily AUM. And whatever is beyond the three periods of time — that too is AUM.`, commentary: `The Mandukya Upanishad opens with the most concise and comprehensive statement in all of Indian philosophy: AUM is everything. This single syllable contains the entire universe — past, present, and future. And beyond even that — the timeless reality that transcends time — that too is AUM.

"AUM — this syllable is all this" — the entire manifest universe, with all its complexity, diversity, and infinite variety, is contained in the sacred syllable AUM. This is not a metaphor but a statement of metaphysical fact. AUM is the primordial vibration from which all creation emerges.

"Whatever is beyond the three periods of time — that too is AUM" — even the timeless Absolute, the unmanifest Brahman, is AUM. There is nothing that is not AUM. It is the sound of existence itself — the hum of being that underlies all manifestation.

The Mandukya Upanishad is the shortest of the major Upanishads but is considered the most profound. Gaudapada, the grand-teacher of Adi Shankaracharya, wrote his famous Karika (commentary) on this Upanishad, calling it the essence of all Vedantic teaching.` },
    { id: `mandukya.0.2`, sanskrit: `सर्वं ह्य् एतद् ब्रह्म अयम् आत्मा ब्रह्म |
सोऽयम् आत्मा चतुष्पात् ॥२॥`, transliteration: `sarvaṁ hy etad brahma ayam ātmā brahma |
so 'yam ātmā catuṣpāt ||2||`, english: `All this is verily Brahman. This Self is Brahman. This same Self has four quarters.`, commentary: `This verse states the identity of the individual Self (Atman) with the Absolute (Brahman). "All this is Brahman" — there is nothing that is not Brahman. "This Self is Brahman" — the Atman that dwells in your heart IS Brahman, the Absolute Reality.

"This same Self has four quarters" (catuṣpāt) — the Self manifests in four states of consciousness. These four states are the subject of the remaining mantras of the Upanishad. They are: Vaishvanara (waking), Taijasa (dreaming), Prājña (deep sleep), and Turiya (the fourth, transcendent state).

The Upanishad's method is remarkable: instead of describing Brahman in abstract philosophical terms, it describes it through the direct experience of consciousness in its four states. Every human being passes through these states daily — the teaching is not theoretical but experiential.

The statement "this Self is Brahman" (ayam ātmā brahma) is one of the four Mahavakyas (great sayings) of the Upanishads. It is the direct declaration of non-duality: the individual Self and the Absolute are one and the same. There is no separation, no duality, no distance between you and God.` },
    { id: `mandukya.0.3`, sanskrit: `जागरितस्थानो बहिष्प्रज्ञः सप्ताङ्ग एकोनविंशतिमुखः |
स्थूलभुग् वैश्वानरः प्रथमः पादः ॥३॥`, transliteration: `jāgariṭa-sthāno bahiṣ-prajñaḥ saptāṅga ekonaviṁśati-mukhaḥ |
sthūla-bhug vaiśvānaraḥ prathamaḥ pādaḥ ||3||`, english: `The first quarter is Vaishvanara, the waking state, whose consciousness is turned outward. It has seven limbs, nineteen mouths, and enjoys gross objects.`, commentary: `The first quarter of the Self is Vaishvanara — the universal being experienced in the waking state. "Bahiṣ-prajñaḥ" — consciousness is turned outward, toward the external world. In waking, we perceive objects through the senses and interact with the material world.

"Seven limbs" — the Upanishad describes the cosmos as the body of Vaishvanara, with seven limbs: heaven (head), sun (eye), air (breath), space (trunk), water (loins), earth (feet), and fire (mouth).

"Nineteen mouths" — the nineteen instruments of experience: five organs of perception (eyes, ears, nose, tongue, skin), five organs of action (speech, hands, feet, genitals, anus), five pranas (prana, apana, vyana, udana, samana), mind, intellect, ego, and chitta (memory/consciousness).

"Enjoys gross objects" — in the waking state, consciousness engages with the material world through these nineteen instruments. We see, hear, touch, taste, smell, think, feel, and act.

The waking state is the first and most familiar level of consciousness. The Upanishad acknowledges it as a valid expression of the Self — not something to be rejected but understood as one quarter of the complete picture.` },
    { id: `mandukya.0.4`, sanskrit: `स्वप्नस्थानोऽन्तःप्रज्ञः सप्ताङ्ग एकोनविंशतिमुखः |
प्रविविक्तभुक् तैजसो द्वितीयः पादः ॥४॥`, transliteration: `svapna-sthāno 'ntaḥ-prajñaḥ saptāṅga ekonaviṁśati-mukhaḥ |
pravivikta-bhuk taijaso dvitīyaḥ pādaḥ ||4||`, english: `The second quarter is Taijasa, the dream state, whose consciousness is turned inward. It has seven limbs, nineteen mouths, and enjoys subtle objects.`, commentary: `The second quarter is Taijasa — the "luminous one" experienced in the dream state. "Antaḥ-prajñaḥ" — consciousness is turned inward, toward the world of memory, imagination, and subconscious impressions.

"Enjoys subtle objects" (pravivikta-bhuk) — in the dream state, consciousness does not engage with physical objects but with subtle impressions — memories, desires, fears, and fantasies. The dream world is created entirely by the mind, without external input.

The dream state is significant because it demonstrates that consciousness can create an entire universe without any external stimulus. The dream world is vivid, detailed, and convincing — yet it is entirely a product of the mind. This teaches us something important about the waking world: could it too be a projection of consciousness?

Taijasa uses the same seven limbs and nineteen mouths as Vaishvanara, but in a subtle mode. The dreamer sees, hears, and acts — but with subtle eyes, subtle ears, and a subtle body. The dream state is a compressed version of the waking state, demonstrating the mind's creative power.

The Upanishad does not dismiss the dream state as unreal. It is a valid state of consciousness, a genuine experience of the Self in its luminous, creative aspect.` },
    { id: `mandukya.0.5`, sanskrit: `यत्र सुप्तो न कञ्चन कामं कामयते न कञ्चन स्वप्नं पश्यति |
तत् सुषुप्तम् |
सुषुप्तस्थान एकीभूतः प्रज्ञानघन एवानन्दमयो ह्यानन्दभुक् चेतोमुखः प्राज्ञस् तृतीयः पादः ॥५॥`, transliteration: `yatra supto na kañcana kāmaṁ kāmayate na kañcana svapnaṁ paśyati |
tat suṣuptam |
suṣupta-sthāna ekībhūtaḥ prajñāna-ghana evānanda-mayo hy ānanda-bhuk cetomukhaḥ prājñas tṛtīyaḥ pādaḥ ||5||`, english: `The third quarter is Prājña, the deep sleep state, where one desires nothing and sees no dream. In this state, consciousness is unified, a mass of awareness, full of bliss, enjoying bliss, with consciousness as its face.`, commentary: `The third quarter is Prājña — "the wise one" experienced in deep, dreamless sleep. "Where one desires nothing and sees no dream" — in deep sleep, there are no desires, no dreams, no external perceptions. The mind is completely at rest.

"Prajñāna-ghana" — "a mass of awareness." This is one of the most extraordinary descriptions in the Upanishads. In deep sleep, consciousness does not disappear — it becomes a compact mass of pure awareness, undifferentiated and whole. There are no objects, no subjects, no distinctions — just awareness itself.

"Ānanda-mayo hy ānanda-bhuk" — "full of bliss, enjoying bliss." Deep sleep is naturally blissful. Everyone knows the refreshed feeling of waking from deep sleep — that sense of "I slept so well." This bliss is not caused by anything but is the natural state of consciousness when free from disturbance.

"Cetomukhaḥ" — "with consciousness as its face." In deep sleep, the Self does not look outward (waking) or inward (dreaming) but rests in its own nature — pure consciousness without an object.

The deep sleep state is the closest the ordinary person comes to the experience of the Self. In meditation, the sage learns to access this state consciously — to be awake while in the sleep-like condition of pure awareness.` },
    { id: `mandukya.0.6`, sanskrit: `एष सर्वेश्वरः एष सर्वज्ञ एषोऽन्तर्याम्य् एष योनिः सर्वस्य प्रभवाप्ययौ हि भूतानाम् ॥६॥`, transliteration: `eṣa sarveśvaraḥ eṣa sarvajña eṣo 'ntaryāmy eṣa yoniḥ sarvasya prabhavāpyayau hi bhūtānām ||6||`, english: `This is the Lord of all, this is the all-knowing, this is the inner controller, this is the source of all. The birth and destruction of all beings arise from this.`, commentary: `This verse describes the nature of Prājña — the deep sleep Self — in cosmic terms. "The Lord of all" (sarveśvaraḥ) — the Self in deep sleep is the lord of all existence. "The all-knowing" (sarvajñaḥ) — it knows everything, not because it has studied everything but because it is the source of all knowledge.

"The inner controller" (antaryāmī) — the Self controls all beings from within, like the axle of a wheel that controls its rotation. It does not impose control from outside but sustains and directs from the deepest interior.

"The source of all" (yoniḥ sarvasya) — all beings arise from this source and return to it. It is the womb of creation, the matrix from which all forms emerge.

"The birth and destruction of all beings arise from this" — the cycle of creation and dissolution, the alternation of birth and death, the rhythm of manifestation and withdrawal — all of this arises from the Self in deep sleep.

This verse reveals that the deep sleep state is not a minor, insignificant experience. It is the state closest to the Absolute — the state where the Self rests in its own nature, undisturbed by the play of creation. To access this state consciously is the beginning of liberation.` },
    { id: `mandukya.0.7`, sanskrit: `नान्तःप्रज्ञं न बहिष्प्रज्ञं नोभयतःप्रज्ञं न प्रज्ञानघनं न प्रज्ञं नाप्रज्ञम् |
अदृष्टम् अव्यवहार्यम् अग्राह्यम् अलक्षणम् अचिन्त्यम् अव्यपदेश्यम् |
एकात्मप्रत्ययसारं प्रपञ्चोपशमं शान्तं शिवम् अद्वैतं चतुर्थं मन्यन्ते स आत्मा स विज्ञेयः ॥७॥`, transliteration: `nāntaḥ-prajñaṁ na bahiḥ-prajñaṁ nobhayataḥ-prajñaṁ na prajñāna-ghanaṁ na prajñaṁ nāprajñam |
adṛṣṭam avyavahāryam agrāhyam alakṣaṇam acintyam avyapadeśyam |
ekātma-pratyaya-sāraṁ prapañcopaśamaṁ śāntaṁ śivam advaitaṁ caturthaṁ manyante sa ātmā sa vijñeyaḥ ||7||`, english: `The fourth is not inwardly aware, not outwardly aware, not both, not a mass of awareness, not aware, not unaware. Unseen, not actionable, ungraspable, without marks, unthinkable, indescribable. One with the Self alone, the cessation of the world, peaceful, auspicious, non-dual. This is the Self. This is to be known.`, commentary: `This is the crown jewel of the Mandukya Upanishad — the description of Turiya, the Fourth State. It is described entirely by negation, because it transcends all positive description.

"Not inwardly aware" — not the dream state. "Not outwardly aware" — not the waking state. "Not both" — not a combination. "Not a mass of awareness" — not deep sleep. "Not aware, not unaware" — beyond both consciousness and unconsciousness.

"Unseen" — it cannot be perceived by any sense. "Not actionable" — it cannot be grasped by any action. "Ungraspable" — it cannot be held by any faculty. "Without marks" — it has no distinguishing characteristics. "Unthinkable" — it cannot be thought. "Indescribable" — it cannot be described.

And then the positive statements: "One with the Self alone" — it is the Self in its pure state. "The cessation of the world" — the world-appearance ceases in this state. "Peaceful" — it is absolute peace. "Auspicious" — it is the highest blessing. "Non-dual" — it is Advaita, without a second.

"This is the Self. This is to be known." — this is the final declaration. Turiya is not a state you enter and leave. It is what you ARE. The waking, dreaming, and sleeping states are what you pass through. Turiya is what remains when all states dissolve.

This single verse contains the entire teaching of Advaita Vedanta in its most concentrated form. It is considered the most profound statement in all of Indian philosophy.` },
    { id: `mandukya.0.8`, sanskrit: `सोऽयम् आत्माध्यक्षरम् ओंकारोऽधिमात्रम् |
पादा मात्रा मात्राश्च पादा अकार उकारो मकार इति ॥८॥`, transliteration: `so 'yam ātmādhyakṣaram oṁkāro 'dhimātram |
pādā mātrā mātrāś ca pādā akāra ukāro makāra iti ||8||`, english: `This same Self is the syllable AUM, in respect of the syllable. The quarters are the letters, and the letters are the quarters. The letters are A, U, M.`, commentary: `This verse connects the four states of consciousness with the three letters of AUM. The syllable AUM (OM) is not just a sound — it is a map of consciousness itself.

"Akāra" (A) — the first letter, representing the waking state (Vaishvanara). A is the first sound, the beginning of all speech. It represents the gross, manifest world of waking experience.

"Ukāra" (U) — the second letter, representing the dream state (Taijasa). U is the intermediate sound, subtler than A. It represents the subtle world of dreams and imagination.

"Makāra" (M) — the third letter, representing deep sleep (Prājña). M is the final sound, the humming that dissolves into silence. It represents the causal state of undifferentiated consciousness.

"The quarters are the letters, and the letters are the quarters" — there is a perfect correspondence between the states of consciousness and the letters of AUM. They are not merely analogous but identical. To chant AUM with understanding is to invoke all states of consciousness.

The silence after AUM is Turiya — the Fourth State that is not a letter but the space in which all letters arise and dissolve. It is the silence from which the sound emerged and to which it returns.` },
    { id: `mandukya.0.9`, sanskrit: `जागरितस्थानो वैश्वानरोऽकारः |
प्रथमा मात्रा |
आप्तेर् आदित्वाद् वाऽप्नोति ह वै सर्वान् कामान् आदिश्च भवति य एवं वेद ॥९॥`, transliteration: `jāgariṭa-sthāno vaiśvānaro 'kāraḥ |
prathamā mātrā |
āpter āditvād vāpnoti ha vai sarvān kāmān ādiś ca bhavati ya evaṁ veda ||9||`, english: `Vaishvanara, the waking state, is the letter A, the first measure. He who knows this obtains all desires and becomes the first among his peers.`, commentary: `This mantra explains the correspondence between A and the waking state in detail. "Vaishvanara, the waking state, is the letter A" — the waking state is the foundation of all experience, just as A is the foundation of all speech. Every word begins with A (or contains it).

"Āpteḥ" — because of "pervasiveness" or "obtaining." The letter A pervades all other letters, just as the waking state pervades all other states. Everything begins with A and everything begins with waking.

"He who knows this obtains all desires" — the one who understands the nature of the waking state, and its correspondence with A, gains mastery over the waking world. They "obtain all desires" — meaning they understand how desire functions in waking consciousness and can navigate it wisely.

"Becomes the first among his peers" — this is the fruit of Self-knowledge in the waking state. The knower becomes the leader, the guide, the one who illuminates the path for others.

This mantra teaches that even the ordinary waking state, when understood in its true nature as an expression of AUM, becomes a doorway to liberation. There is no need to escape the world — only to understand it.` },
    { id: `mandukya.0.10`, sanskrit: `स्वप्नस्थानस् तैजस उकारः |
द्वितीया मात्रा |
उत्कर्षाद् उभयत्वाद् वोत्कर्षति ह वै ज्ञानसन्ततिं समानश्च भवति |
नास्याब्रह्मवित् कुले भवति य एवं वेद ॥१०॥`, transliteration: `svapna-sthānas taijasa ukāraḥ |
dvitīyā mātrā |
utkarṣād ubhayatvād votkarṣati ha vai jñāna-santatiṁ samānaś ca bhavati |
nāsyābrahmavit kule bhavati ya evaṁ veda ||10||`, english: `The dream state, Taijasa, is the letter U, the second measure. He who knows this elevates the line of knowledge and becomes equal. In his family, no one is born who does not know Brahman.`, commentary: `The dream state corresponds to U, the second letter of AUM. "He who knows this elevates the line of knowledge" — understanding the dream state elevates one's entire understanding of consciousness. The dream demonstrates that the mind creates reality — a crucial insight for understanding the nature of waking reality.

"Becomes equal" (samānaś ca bhavati) — the knower of the dream state achieves equanimity. They understand that waking and dreaming are both projections of consciousness, and therefore neither is more "real" than the other. This understanding naturally produces balance and detachment.

"In his family, no one is born who does not know Brahman" — the spiritual attainment of the knower elevates not just themselves but their entire lineage. This is not magic but a natural consequence: the realized being's consciousness influences everyone around them, especially their children and descendants.

This mantra teaches that the dream state, often dismissed as mere imagination, contains profound spiritual insight. By understanding how the mind creates the dream world, we begin to understand how consciousness creates all experience — including the waking world we call "reality.` },
    { id: `mandukya.0.11`, sanskrit: `सुषुप्तस्थानः प्राज्ञो मकारः |
तृतीया मात्रा |
मितेर् अपीतेर् वा मिनोति ह वा इदं सर्वम् अपीतिश्च भवति |
य एवं वेद ॥११॥`, transliteration: `suṣupta-sthānaḥ prājño makāraḥ |
tṛtīyā mātrā |
miter apīter vā minoti ha vā idaṁ sarvam apītiś ca bhavati |
ya evaṁ veda ||11||`, english: `The deep sleep state, Prājña, is the letter M, the third measure. He who knows this measures all this and becomes the dissolution of all. There is no one in his family who does not know Brahman, and he himself merges into Brahman.`, commentary: `Deep sleep corresponds to M, the final letter of AUM. "Measures all this" (miti) — the one who understands deep sleep "measures" or comprehends all of creation, because deep sleep is the state closest to the creative source.

"Becomes the dissolution of all" (apīti) — the knower of deep sleep becomes the dissolution, the return to source. Just as M dissolves into the silence that follows it, the knower of deep sleep dissolves into the Absolute.

"No one in his family who does not know Brahman" — the spiritual attainment here is even greater than in the previous mantra. The knower's influence extends to all those around them.

"He himself merges into Brahman" — the ultimate fruit. The one who understands deep sleep — who knows the nature of undifferentiated consciousness — merges into Brahman. This is moksha, liberation, the end of the journey.

The three letters of AUM — A, U, M — correspond to waking, dreaming, and deep sleep. Together, they encompass all of ordinary experience. The silence after M is Turiya — the Fourth, the Self, the Absolute. To know AUM completely is to know the Self completely.` },
    { id: `mandukya.0.12`, sanskrit: `अमात्रश् चतुर्थोऽव्यवहार्यः |
प्रपञ्चोपशमः शिवोऽद्वैत |
एवम् ओंकार आत्मैव |
संविशत्य् आत्मानम् आत्मना |
य एवं वेद य एवं वेद ॥१२॥`, transliteration: `amātraś caturtho 'vyavahāryaḥ |
prapañcopaśamaḥ śivo 'dvaita |
evam oṁkāra ātmaiva |
saṁviśaty ātmānam ātmanā |
ya evaṁ veda ya evaṁ veda ||12||`, english: `The fourth is without measure, not related to experience. It is the cessation of the world, auspicious, non-dual. Thus AUM is the Self itself. He who knows this enters the Self through the Self — yes, he who knows this enters the Self through the Self.`, commentary: `This final mantra of the Mandukya Upanishad is the culmination of its teaching. "The fourth is without measure" (amātra) — Turiya has no measure, no letter, no form. It is the silence in which A, U, and M arise and dissolve. It is not the fourth in a series but the ground of the other three.

"Not related to experience" (avyavahāryaḥ) — Turiya cannot be experienced as an object. It is not a state you can "have" but the awareness in which all states appear. It transcends all transaction, all relationship, all duality.

"The cessation of the world" (prapañcopaśamaḥ) — in Turiya, the world-appearance ceases. This does not mean the world disappears but that the illusion of a separate world dissolves. What remains is the one Self, appearing as everything.

"Auspicious" (śivaḥ) — Turiya is the highest auspiciousness, the ultimate blessing. "Non-dual" (advaita) — there is no second. There is only the Self, playing all roles, wearing all faces.

"Thus AUM is the Self itself" — the entire structure of AUM — its letters, its quarters, its silence — is the Self. To chant AUM with understanding is to invoke the entire teaching of the Upanishads.

"He who knows this enters the Self through the Self" — the final, extraordinary statement. The Self enters the Self. There is nothing else to enter, nothing else to become. The seeker IS the sought. The knower IS the known. The journey ends where it began — in the Self.

The repetition — "yes, he who knows this enters the Self through the Self" — emphasizes the certainty and the completeness of this teaching. It is not a hope or a belief but a statement of what IS.

Thus ends the Mandukya Upanishad — the shortest, the most concentrated, and perhaps the most profound of all the Upanishads. In just twelve mantras, it maps the entire structure of consciousness and reveals the Self as the Absolute.

AUM.` },
  ],
}

// ===== Kena Upanishad =====
export const kenaUpanishad: Upanishad = {

  "id": "kena",
  "name": "Kena Upanishad",
  sanskritName: `केनोपनिषद्`,
  "transliteration": "Kenopaniṣad",
  "summary": "The Kena Upanishad derives its name from its opening word \"Kena\" (by whom). It explores the nature of Brahman as the unseen power behind all sense faculties. Through a celebrated allegory of the gods, it teaches that Brahman is beyond the known and the unknown, and can only be approached through negation and intuitive realization.",
  "theme": "The nature of Brahman as the unknown knower, the eye of the eye, the mind of the mind.",
  "verseCount": 35,
  "sections": [
    {
      "id": "1",
      "name": "First Khanda",
      sanskritName: `प्रथमः खण्डः`,
      "verses": [
        {
          "id": "kena.1.1",
          "sanskrit": "ॐ केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः । केनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति ॥",
          "transliteration": "oṃ keneṣitaṃ patati preṣitaṃ manaḥ kena prāṇaḥ prathamaḥ praiti yuktaḥ | keneṣitāṃ vācamimāṃ vadanti cakṣuḥ śrotraṃ ka u devo yunakti ||",
          "english": "By whom impelled does the mind fall upon its objects? By whom directed does the life-force proceed? By whom impelled do people utter this speech? What god directs the eyes and ears?"
        },
        {
          "id": "kena.1.2",
          "sanskrit": "श्रोत्रस्य श्रोत्रं मनसो मनो यद् वाचो ह वाचं स उ प्राणस्य प्राणः । चक्षुषश्चक्षुरतिमुच्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥",
          "transliteration": "śrotrasya śrotraṃ manaso mano yad vāco ha vācaṃ sa u prāṇasya prāṇaḥ | cakṣuṣaścakṣuratimucya dhīrāḥ pretyāsmāllokādamṛtā bhavanti ||",
          "english": "The ear of the ear, the mind of the mind, the speech of speech, the life of life, the eye of the eye — freeing themselves, the wise become immortal."
        },
        {
          "id": "kena.1.3",
          "sanskrit": "न तत्र चक्षुर्गच्छति न वाग्गच्छति नो मनः । न विद्मो न विजानीमो यथैतदनुशिष्यात् ॥",
          "transliteration": "na tatra cakṣurgacchati na vāggacchati no manaḥ | na vidmo na vijānīmo yathaitadanuśiṣyāt ||",
          "english": "The eye does not go there, nor speech, nor the mind. We do not know, nor can we comprehend, how It can be taught."
        },
        {
          "id": "kena.1.4",
          "sanskrit": "अन्यदेव तद्विदितादथो अविदितादधि । इति शुश्रुम पूर्वेषां ये नस्तद्व्याचचक्षिरे ॥",
          "transliteration": "anyadeva tadviditādatho aviditādadhi | iti śuśruma pūrveṣāṃ ye nastadvyācacakṣire ||",
          "english": "It is different from the known; It is above the unknown. Thus we have heard from the ancient teachers."
        },
        {
          "id": "kena.1.5",
          "sanskrit": "यद्वाचाऽनभ्युदितं येन वागभ्युद्यते । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
          "transliteration": "yadvācā'nabhyuditaṃ yena vāgabhyudyate | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
          "english": "That which is not uttered by speech, that by which speech is uttered — know That alone as Brahman, not this which people worship here."
        },
        {
          "id": "kena.1.6",
          "sanskrit": "यन्मनसा न मनुते येनाहुर्मनो मतम् । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
          "transliteration": "yanmanasā na manute yenāhurmano matam | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
          "english": "That which is not comprehended by the mind, that by which the mind is comprehended — know That alone as Brahman."
        },
        {
          "id": "kena.1.7",
          "sanskrit": "यच्चक्षुषा न पश्यति येन चक्षूँषि पश्यति । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
          "transliteration": "yaccakṣuṣā na paśyati yena cakṣū~ṣi paśyati | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
          "english": "That which is not seen by the eye, that by which the eyes see — know That alone as Brahman."
        },
        {
          "id": "kena.1.8",
          "sanskrit": "यच्छ्रोत्रेण न शृणोति येन श्रोत्रमिदं श्रुतम् । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
          "transliteration": "yacchrotreṇa na śṛṇoti yena śrotramidaṃ śrutam | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
          "english": "That which is not heard by the ear, that by which the ear hears — know That alone as Brahman."
        },
        {
          "id": "kena.1.9",
          "sanskrit": "यत्प्राणेन न प्राणिति येन प्राणः प्रणीयते । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
          "transliteration": "yatprāṇena na prāṇiti yena prāṇaḥ praṇīyate | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
          "english": "That which does not breathe through the breath, that by which the breath is sustained — know That alone as Brahman."
        }
      ]
    },
    {
      "id": "2",
      "name": "Second Khanda",
      sanskritName: `द्वितीयः खण्डः`,
      "verses": [
        {
          "id": "kena.2.1",
          "sanskrit": "यदि मन्यसे सुवेदेति दहरमेवापि दभ्रमेवापि नूनं त्वं वेत्थ ब्रह्मणो रूपम् । यदस्य त्वं यदस्य देवेष्वथ नु मीमाँस्यमेव ते मन्ये विदितम् ॥",
          "transliteration": "yadi manyase suvedeti daharamevāpi dabhramevāpi nūnaṃ tvaṃ vettha brahmaṇo rūpam | yadasya tvaṃ yadasya deveṣvatha nu mīmā~syameva te manye viditam ||",
          "english": "If you think \"I know It well,\" then you know but the barest form of Brahman. It is still a matter for inquiry."
        },
        {
          "id": "kena.2.2",
          "sanskrit": "नाहं मन्ये सुवेदेति नो न वेदेति वेद च । यो नस्तद्वेद तद्वेद नो न वेदेति वेद च ॥",
          "transliteration": "nāhaṃ manye suvedeti no na vedeti veda ca | yo nastadveda tadveda no na vedeti veda ca ||",
          "english": "I do not think I know It well, nor do I think I do not know It. He who knows It truly understands both."
        },
        {
          "id": "kena.2.3",
          "sanskrit": "यस्यामतं तस्य मतं मतं यस्य न वेद सः । अविज्ञातं विजानतां विज्ञातमविजानताम् ॥",
          "transliteration": "yasyāmataṃ tasya mataṃ mataṃ yasya na veda saḥ | avijñātaṃ vijānatāṃ vijñātamavijānatām ||",
          "english": "He by whom It is not thought, by him It is thought; he by whom It is thought, knows It not."
        },
        {
          "id": "kena.2.4",
          "sanskrit": "प्रतिबोधविदितं मतममृतत्वं हि विन्दते । आत्मना विन्दते वीर्यं विद्यया विन्दतेऽमृतम् ॥",
          "transliteration": "pratibodhaviditaṃ matamamṛtatvaṃ hi vindate | ātmanā vindate vīryaṃ vidyayā vindate'mṛtam ||",
          "english": "When It is known through every state of consciousness, one attains immortality. Through the Self one gains strength; through knowledge, immortality."
        },
        {
          "id": "kena.2.5",
          "sanskrit": "इह चेदवेदीदथ सत्यमस्ति न चेदिहावेदीन्महती विनष्टिः । भूतेषु भूतेषु विचित्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥",
          "transliteration": "iha cedavedīdatha satyamasti na cedihāvedīnmahatī vinaṣṭiḥ | bhūteṣu bhūteṣu vicitya dhīrāḥ pretyāsmāllokādamṛtā bhavanti ||",
          "english": "If one knows It here, then there is truth; if not, great is the loss. The wise, seeing the Self in all beings, become immortal."
        }
      ]
    },
    {
      "id": "3",
      "name": "Third Khanda",
      sanskritName: `तृतीयः खण्डः`,
      "verses": [
        {
          "id": "kena.3.1",
          "sanskrit": "ब्रह्म ह देवेभ्यो विजिग्ये तस्य ह ब्रह्मणो विजये देवा अमहीयन्त ॥",
          "transliteration": "brahma ha devebhyo vijigye tasya ha brahmaṇo vijaye devā amahīyanta ||",
          "english": "Brahman once gained a victory for the gods. Through that victory, the gods became elated."
        },
        {
          "id": "kena.3.2",
          "sanskrit": "त ऐक्षन्तास्माकमेवायं विजयोऽस्माकमेवायं महिमेति । तद्धैषां विजज्ञौ तेभ्यो ह प्रादुर्बभूव तन्न व्यजानत किमिदं यक्षमिति ॥",
          "transliteration": "ta aikṣantāsmākamevāyaṃ vijayo'smākamevāyaṃ mahimeti | taddhaiṣāṃ vijajñau tebhyo ha prādurbabhūva tanna vyajānata kimidaṃ yakṣamiti ||",
          "english": "They thought, \"This victory is ours.\" Brahman appeared before them, but they did not recognize the mysterious being."
        },
        {
          "id": "kena.3.3",
          "sanskrit": "तेऽग्निमब्रुवञ्जातवेद एतद्विजानीहि किमिदं यक्षमिति तथेति ॥",
          "transliteration": "te'gnimabruvañjātaveda etadvijānīhi kimidaṃ yakṣamiti tatheti ||",
          "english": "They said to Agni: \"O Jataveda, find out what this mystery is.\""
        },
        {
          "id": "kena.3.4",
          "sanskrit": "तदभ्यद्रवत्तमभ्यवदत्कोऽसीत्यग्निर्वा अहमस्मीत्यब्रवीज्जातवेदा वा अहमस्मीति ॥",
          "transliteration": "tadabhyadravattamabhyavadatko'sītyagnirvā ahamasmītyabravījjātavedā vā ahamasmīti ||",
          "english": "Agni ran toward It. \"Who are you?\" \"I am Agni, Jataveda.\""
        },
        {
          "id": "kena.3.5",
          "sanskrit": "तस्मिंस्त्वयि किं वीर्यमित्यपीदं सर्वं दहेयं यदिदं पृथिव्यामिति ॥",
          "transliteration": "tasmiṃstvayi kiṃ vīryamityapīdaṃ sarvaṃ daheyaṃ yadidaṃ pṛthivyāmiti ||",
          "english": "\"What power is in you?\" \"I can burn all that exists on earth.\""
        },
        {
          "id": "kena.3.6",
          "sanskrit": "तस्मै तृणं निदधावेतद्द्दहेति । तदुपप्रेयाय सर्वजवेन तन्न शशाक दग्धुं स तत एव निववृते नैतदशकं विज्ञातुं यदेतद्यक्षमिति ॥",
          "transliteration": "tasmai tṛṇaṃ nidadhāvetadddaheti | tadupapreyāya sarvajavena tanna śaśāka dagdhuṃ sa tata eva nivavṛte naitadaśakaṃ vijñātuṃ yadetadyakṣamiti ||",
          "english": "It placed a blade of grass: \"Burn this.\" Agni rushed at it but could not burn it. He returned, unable to comprehend."
        },
        {
          "id": "kena.3.7",
          "sanskrit": "अथ वायुमब्रुवन्वायवेतद्विजानीहि किमेतद्यक्षमिति तथेति ॥",
          "transliteration": "atha vāyumabruvanvāyavetadvijānīhi kimetadyakṣamiti tatheti ||",
          "english": "Then they said to Vayu: \"O Vayu, find out what this mystery is.\""
        },
        {
          "id": "kena.3.8",
          "sanskrit": "तदभ्यद्रवत्तमभ्यवदत्कोऽसीति वायुर्वा अहमस्मीत्यब्रवीन्मातरिश्वा वा अहमस्मीति ॥",
          "transliteration": "tadabhyadravattamabhyavadatko'sīti vāyurvā ahamasmītyabravīnmātariśvā vā ahamasmīti ||",
          "english": "Vayu ran toward It. \"Who are you?\" \"I am Vayu, Matarishva.\""
        },
        {
          "id": "kena.3.9",
          "sanskrit": "तस्मिंस्त्वयि किं वीर्यमित्यपीदं सर्वमाददीय यदिदं पृथिव्यामिति ॥",
          "transliteration": "tasmiṃstvayi kiṃ vīryamityapīdaṃ sarvamādadīya yadidaṃ pṛthivyāmiti ||",
          "english": "\"What power is in you?\" \"I can carry away all that exists on earth.\""
        },
        {
          "id": "kena.3.10",
          "sanskrit": "तस्मै तृणं निदधावेतदादत्स्वेति तदुपप्रेयाय सर्वजवेन तन्न शशाकादातुं स तत एव निववृते नैतदशकं विज्ञातुं यदेतद्यक्षमिति ॥",
          "transliteration": "tasmai tṛṇaṃ nidadhāvetadādatsveti tadupapreyāya sarvajavena tanna śaśākādātuṃ sa tata eva nivavṛte naitadaśakaṃ vijñātuṃ yadetadyakṣamiti ||",
          "english": "It placed a blade of grass: \"Take this.\" Vayu rushed but could not lift it. He returned, unable to comprehend."
        },
        {
          "id": "kena.3.11",
          "sanskrit": "अथेन्द्रमब्रुवन्मघवन्नेतद्विजानीहि किमेतद्यक्षमिति तथेति तदभ्यद्रवत्तस्मात्तिरोदधे ॥",
          "transliteration": "athendramabruvanmaghavannetadvijānīhi kimetadyakṣamiti tatheti tadabhyadravattasmāttirodadhe ||",
          "english": "They said to Indra: \"O Maghavan, find out what this mystery is.\" As he ran toward It, It vanished."
        },
        {
          "id": "kena.3.12",
          "sanskrit": "स तस्मिन्नेवाकाशे स्त्रियमाजगाम बहुशोभमानामुमाँ हैमवतीं ताँहोवाच किमेतद्यक्षमिति ॥",
          "transliteration": "sa tasminnevākāśe striyamājagāma bahuśobhamānāmumā~ haimavatīṃ tā~hovāca kimetadyakṣamiti ||",
          "english": "In that space, he saw Uma, daughter of Himavan, beautifully adorned. He asked her: \"What is this mystery?\""
        }
      ]
    },
    {
      "id": "4",
      "name": "Fourth Khanda",
      sanskritName: `चतुर्थः खण्डः`,
      "verses": [
        {
          "id": "kena.4.1",
          "sanskrit": "सा ब्रह्मेति होवाच ब्रह्मणो वा एतद्विजये महीयध्वमिति ततो हैव विदाञ्चकार ब्रह्मेति ॥",
          "transliteration": "sā brahmeti hovāca brahmaṇo vā etadvijaye mahīyadhvamiti tato haiva vidāñcakāra brahmeti ||",
          "english": "She replied: \"It is Brahman. Through Brahman's victory you have become great.\" Then Indra understood it was Brahman."
        },
        {
          "id": "kena.4.2",
          "sanskrit": "तस्माद्वा एते देवा अतितरामिवान्यान्देवान्यदग्निर्वायुरिन्द्रस्ते ह्येनन्नेदिष्ठं पस्पर्शुस्ते ह्येनत्प्रथमो विदाञ्चकार ब्रह्मेति ॥",
          "transliteration": "tasmādvā ete devā atitarāmivānyāndevānyadagnirvāyurindraste hyenannediṣṭhaṃ pasparśuste hyenatprathamo vidāñcakāra brahmeti ||",
          "english": "Therefore Agni, Vayu, and Indra excel the other gods, for they came closest to Brahman."
        },
        {
          "id": "kena.4.3",
          "sanskrit": "तस्माद्वा इन्द्रोऽतितरामिवान्यान्देवान्स ह्येनन्नेदिष्ठं पस्पर्श स ह्येनत्प्रथमो विदाञ्चकार ब्रह्मेति ॥",
          "transliteration": "tasmādvā indro'titarāmivānyāndevānsa hyenannediṣṭhaṃ pasparśa sa hyenatprathamo vidāñcakāra brahmeti ||",
          "english": "Thus Indra excels the other gods, for he came closest and first recognized Brahman."
        },
        {
          "id": "kena.4.4",
          "sanskrit": "तस्यैष आदेशो यदेतद्विद्युतो व्यद्युतदा३ इतीन् न्यमीमिषदा३ इत्यधिदैवतम् ॥",
          "transliteration": "tasyaiṣa ādeśo yadetadvidyuto vyadyutadā3 itīn nyamīmiṣadā3 ityadhidaivatam ||",
          "english": "This is the teaching regarding the gods: It flashed like lightning and vanished."
        },
        {
          "id": "kena.4.5",
          "sanskrit": "अथाध्यात्मं यद्देतद्गच्छतीव च मनोऽनेन चैतदुपस्मरत्यभीक्ष्णँ सङ्कल्पः ॥",
          "transliteration": "athādhyātmaṃ yaddetadgacchatīva ca mano'nena caitadupasmaratyabhīkṣṇa~ saṅkalpaḥ ||",
          "english": "Regarding the self: the mind goes toward It, and by It the mind constantly remembers and conceives."
        },
        {
          "id": "kena.4.6",
          "sanskrit": "तद्ध तद्वनं नाम तद्वनमित्युपासितव्यं स य एतदेवं वेदाभि हैनं सर्वाणि भूतानि संवाञ्छन्ति ॥",
          "transliteration": "taddha tadvanaṃ nāma tadvanamityupāsitavyaṃ sa ya etadevaṃ vedābhi hainaṃ sarvāṇi bhūtāni saṃvāñchanti ||",
          "english": "It is called Tadvanam — \"the adorable of all.\" All beings desire the one who knows It thus."
        },
        {
          "id": "kena.4.7",
          "sanskrit": "उपनिषदं भो ब्रूहीत्युक्ता त उपनिषद्ब्राह्मीं वाव त उपनिषदमब्रूमेति ॥",
          "transliteration": "upaniṣadaṃ bho brūhītyuktā ta upaniṣadbrāhmīṃ vāva ta upaniṣadamabrūmeti ||",
          "english": "\"Teach me the Upanishad.\" \"I have taught you the Upanishad about Brahman.\""
        },
        {
          "id": "kena.4.8",
          "sanskrit": "तस्यै तपो दमः कर्मेति प्रतिष्ठा वेदाः सर्वाङ्गानि सत्यमायतनम् ॥",
          "transliteration": "tasyai tapo damaḥ karmeti pratiṣṭhā vedāḥ sarvāṅgāni satyamāyatanam ||",
          "english": "Austerity, self-control, and right action are its foundation; the Vedas are its limbs; truth is its abode."
        },
        {
          "id": "kena.4.9",
          "sanskrit": "यो वा एतामेवं वेदापहत्य पाप्मानमनन्ते स्वर्गे लोके ज्येये प्रतितिष्ठति प्रतितिष्ठति ॥",
          "transliteration": "yo vā etāmevaṃ vedāpahatya pāpmānamanante svarge loke jyeye pratitiṣṭhati pratitiṣṭhati ||",
          "english": "The one who knows this, having destroyed all impurities, stands firmly established in the supreme heavenly world."
        }
      ]
    }
  ],
  "verses": [
    {
      "id": "kena.1.1",
      "sanskrit": "ॐ केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्तः । केनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति ॥",
      "transliteration": "oṃ keneṣitaṃ patati preṣitaṃ manaḥ kena prāṇaḥ prathamaḥ praiti yuktaḥ | keneṣitāṃ vācamimāṃ vadanti cakṣuḥ śrotraṃ ka u devo yunakti ||",
      "english": "By whom impelled does the mind fall upon its objects? By whom directed does the life-force proceed? By whom impelled do people utter this speech? What god directs the eyes and ears?"
    },
    {
      "id": "kena.1.2",
      "sanskrit": "श्रोत्रस्य श्रोत्रं मनसो मनो यद् वाचो ह वाचं स उ प्राणस्य प्राणः । चक्षुषश्चक्षुरतिमुच्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥",
      "transliteration": "śrotrasya śrotraṃ manaso mano yad vāco ha vācaṃ sa u prāṇasya prāṇaḥ | cakṣuṣaścakṣuratimucya dhīrāḥ pretyāsmāllokādamṛtā bhavanti ||",
      "english": "The ear of the ear, the mind of the mind, the speech of speech, the life of life, the eye of the eye — freeing themselves, the wise become immortal."
    },
    {
      "id": "kena.1.3",
      "sanskrit": "न तत्र चक्षुर्गच्छति न वाग्गच्छति नो मनः । न विद्मो न विजानीमो यथैतदनुशिष्यात् ॥",
      "transliteration": "na tatra cakṣurgacchati na vāggacchati no manaḥ | na vidmo na vijānīmo yathaitadanuśiṣyāt ||",
      "english": "The eye does not go there, nor speech, nor the mind. We do not know, nor can we comprehend, how It can be taught."
    },
    {
      "id": "kena.1.4",
      "sanskrit": "अन्यदेव तद्विदितादथो अविदितादधि । इति शुश्रुम पूर्वेषां ये नस्तद्व्याचचक्षिरे ॥",
      "transliteration": "anyadeva tadviditādatho aviditādadhi | iti śuśruma pūrveṣāṃ ye nastadvyācacakṣire ||",
      "english": "It is different from the known; It is above the unknown. Thus we have heard from the ancient teachers."
    },
    {
      "id": "kena.1.5",
      "sanskrit": "यद्वाचाऽनभ्युदितं येन वागभ्युद्यते । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
      "transliteration": "yadvācā'nabhyuditaṃ yena vāgabhyudyate | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
      "english": "That which is not uttered by speech, that by which speech is uttered — know That alone as Brahman, not this which people worship here."
    },
    {
      "id": "kena.1.6",
      "sanskrit": "यन्मनसा न मनुते येनाहुर्मनो मतम् । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
      "transliteration": "yanmanasā na manute yenāhurmano matam | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
      "english": "That which is not comprehended by the mind, that by which the mind is comprehended — know That alone as Brahman."
    },
    {
      "id": "kena.1.7",
      "sanskrit": "यच्चक्षुषा न पश्यति येन चक्षूँषि पश्यति । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
      "transliteration": "yaccakṣuṣā na paśyati yena cakṣū~ṣi paśyati | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
      "english": "That which is not seen by the eye, that by which the eyes see — know That alone as Brahman."
    },
    {
      "id": "kena.1.8",
      "sanskrit": "यच्छ्रोत्रेण न शृणोति येन श्रोत्रमिदं श्रुतम् । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
      "transliteration": "yacchrotreṇa na śṛṇoti yena śrotramidaṃ śrutam | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
      "english": "That which is not heard by the ear, that by which the ear hears — know That alone as Brahman."
    },
    {
      "id": "kena.1.9",
      "sanskrit": "यत्प्राणेन न प्राणिति येन प्राणः प्रणीयते । तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥",
      "transliteration": "yatprāṇena na prāṇiti yena prāṇaḥ praṇīyate | tadeva brahma tvaṃ viddhi nedaṃ yadidamupāsate ||",
      "english": "That which does not breathe through the breath, that by which the breath is sustained — know That alone as Brahman."
    },
    {
      "id": "kena.2.1",
      "sanskrit": "यदि मन्यसे सुवेदेति दहरमेवापि दभ्रमेवापि नूनं त्वं वेत्थ ब्रह्मणो रूपम् । यदस्य त्वं यदस्य देवेष्वथ नु मीमाँस्यमेव ते मन्ये विदितम् ॥",
      "transliteration": "yadi manyase suvedeti daharamevāpi dabhramevāpi nūnaṃ tvaṃ vettha brahmaṇo rūpam | yadasya tvaṃ yadasya deveṣvatha nu mīmā~syameva te manye viditam ||",
      "english": "If you think \"I know It well,\" then you know but the barest form of Brahman. It is still a matter for inquiry."
    },
    {
      "id": "kena.2.2",
      "sanskrit": "नाहं मन्ये सुवेदेति नो न वेदेति वेद च । यो नस्तद्वेद तद्वेद नो न वेदेति वेद च ॥",
      "transliteration": "nāhaṃ manye suvedeti no na vedeti veda ca | yo nastadveda tadveda no na vedeti veda ca ||",
      "english": "I do not think I know It well, nor do I think I do not know It. He who knows It truly understands both."
    },
    {
      "id": "kena.2.3",
      "sanskrit": "यस्यामतं तस्य मतं मतं यस्य न वेद सः । अविज्ञातं विजानतां विज्ञातमविजानताम् ॥",
      "transliteration": "yasyāmataṃ tasya mataṃ mataṃ yasya na veda saḥ | avijñātaṃ vijānatāṃ vijñātamavijānatām ||",
      "english": "He by whom It is not thought, by him It is thought; he by whom It is thought, knows It not."
    },
    {
      "id": "kena.2.4",
      "sanskrit": "प्रतिबोधविदितं मतममृतत्वं हि विन्दते । आत्मना विन्दते वीर्यं विद्यया विन्दतेऽमृतम् ॥",
      "transliteration": "pratibodhaviditaṃ matamamṛtatvaṃ hi vindate | ātmanā vindate vīryaṃ vidyayā vindate'mṛtam ||",
      "english": "When It is known through every state of consciousness, one attains immortality. Through the Self one gains strength; through knowledge, immortality."
    },
    {
      "id": "kena.2.5",
      "sanskrit": "इह चेदवेदीदथ सत्यमस्ति न चेदिहावेदीन्महती विनष्टिः । भूतेषु भूतेषु विचित्य धीराः प्रेत्यास्माल्लोकादमृता भवन्ति ॥",
      "transliteration": "iha cedavedīdatha satyamasti na cedihāvedīnmahatī vinaṣṭiḥ | bhūteṣu bhūteṣu vicitya dhīrāḥ pretyāsmāllokādamṛtā bhavanti ||",
      "english": "If one knows It here, then there is truth; if not, great is the loss. The wise, seeing the Self in all beings, become immortal."
    },
    {
      "id": "kena.3.1",
      "sanskrit": "ब्रह्म ह देवेभ्यो विजिग्ये तस्य ह ब्रह्मणो विजये देवा अमहीयन्त ॥",
      "transliteration": "brahma ha devebhyo vijigye tasya ha brahmaṇo vijaye devā amahīyanta ||",
      "english": "Brahman once gained a victory for the gods. Through that victory, the gods became elated."
    },
    {
      "id": "kena.3.2",
      "sanskrit": "त ऐक्षन्तास्माकमेवायं विजयोऽस्माकमेवायं महिमेति । तद्धैषां विजज्ञौ तेभ्यो ह प्रादुर्बभूव तन्न व्यजानत किमिदं यक्षमिति ॥",
      "transliteration": "ta aikṣantāsmākamevāyaṃ vijayo'smākamevāyaṃ mahimeti | taddhaiṣāṃ vijajñau tebhyo ha prādurbabhūva tanna vyajānata kimidaṃ yakṣamiti ||",
      "english": "They thought, \"This victory is ours.\" Brahman appeared before them, but they did not recognize the mysterious being."
    },
    {
      "id": "kena.3.3",
      "sanskrit": "तेऽग्निमब्रुवञ्जातवेद एतद्विजानीहि किमिदं यक्षमिति तथेति ॥",
      "transliteration": "te'gnimabruvañjātaveda etadvijānīhi kimidaṃ yakṣamiti tatheti ||",
      "english": "They said to Agni: \"O Jataveda, find out what this mystery is.\""
    },
    {
      "id": "kena.3.4",
      "sanskrit": "तदभ्यद्रवत्तमभ्यवदत्कोऽसीत्यग्निर्वा अहमस्मीत्यब्रवीज्जातवेदा वा अहमस्मीति ॥",
      "transliteration": "tadabhyadravattamabhyavadatko'sītyagnirvā ahamasmītyabravījjātavedā vā ahamasmīti ||",
      "english": "Agni ran toward It. \"Who are you?\" \"I am Agni, Jataveda.\""
    },
    {
      "id": "kena.3.5",
      "sanskrit": "तस्मिंस्त्वयि किं वीर्यमित्यपीदं सर्वं दहेयं यदिदं पृथिव्यामिति ॥",
      "transliteration": "tasmiṃstvayi kiṃ vīryamityapīdaṃ sarvaṃ daheyaṃ yadidaṃ pṛthivyāmiti ||",
      "english": "\"What power is in you?\" \"I can burn all that exists on earth.\""
    },
    {
      "id": "kena.3.6",
      "sanskrit": "तस्मै तृणं निदधावेतद्द्दहेति । तदुपप्रेयाय सर्वजवेन तन्न शशाक दग्धुं स तत एव निववृते नैतदशकं विज्ञातुं यदेतद्यक्षमिति ॥",
      "transliteration": "tasmai tṛṇaṃ nidadhāvetadddaheti | tadupapreyāya sarvajavena tanna śaśāka dagdhuṃ sa tata eva nivavṛte naitadaśakaṃ vijñātuṃ yadetadyakṣamiti ||",
      "english": "It placed a blade of grass: \"Burn this.\" Agni rushed at it but could not burn it. He returned, unable to comprehend."
    },
    {
      "id": "kena.3.7",
      "sanskrit": "अथ वायुमब्रुवन्वायवेतद्विजानीहि किमेतद्यक्षमिति तथेति ॥",
      "transliteration": "atha vāyumabruvanvāyavetadvijānīhi kimetadyakṣamiti tatheti ||",
      "english": "Then they said to Vayu: \"O Vayu, find out what this mystery is.\""
    },
    {
      "id": "kena.3.8",
      "sanskrit": "तदभ्यद्रवत्तमभ्यवदत्कोऽसीति वायुर्वा अहमस्मीत्यब्रवीन्मातरिश्वा वा अहमस्मीति ॥",
      "transliteration": "tadabhyadravattamabhyavadatko'sīti vāyurvā ahamasmītyabravīnmātariśvā vā ahamasmīti ||",
      "english": "Vayu ran toward It. \"Who are you?\" \"I am Vayu, Matarishva.\""
    },
    {
      "id": "kena.3.9",
      "sanskrit": "तस्मिंस्त्वयि किं वीर्यमित्यपीदं सर्वमाददीय यदिदं पृथिव्यामिति ॥",
      "transliteration": "tasmiṃstvayi kiṃ vīryamityapīdaṃ sarvamādadīya yadidaṃ pṛthivyāmiti ||",
      "english": "\"What power is in you?\" \"I can carry away all that exists on earth.\""
    },
    {
      "id": "kena.3.10",
      "sanskrit": "तस्मै तृणं निदधावेतदादत्स्वेति तदुपप्रेयाय सर्वजवेन तन्न शशाकादातुं स तत एव निववृते नैतदशकं विज्ञातुं यदेतद्यक्षमिति ॥",
      "transliteration": "tasmai tṛṇaṃ nidadhāvetadādatsveti tadupapreyāya sarvajavena tanna śaśākādātuṃ sa tata eva nivavṛte naitadaśakaṃ vijñātuṃ yadetadyakṣamiti ||",
      "english": "It placed a blade of grass: \"Take this.\" Vayu rushed but could not lift it. He returned, unable to comprehend."
    },
    {
      "id": "kena.3.11",
      "sanskrit": "अथेन्द्रमब्रुवन्मघवन्नेतद्विजानीहि किमेतद्यक्षमिति तथेति तदभ्यद्रवत्तस्मात्तिरोदधे ॥",
      "transliteration": "athendramabruvanmaghavannetadvijānīhi kimetadyakṣamiti tatheti tadabhyadravattasmāttirodadhe ||",
      "english": "They said to Indra: \"O Maghavan, find out what this mystery is.\" As he ran toward It, It vanished."
    },
    {
      "id": "kena.3.12",
      "sanskrit": "स तस्मिन्नेवाकाशे स्त्रियमाजगाम बहुशोभमानामुमाँ हैमवतीं ताँहोवाच किमेतद्यक्षमिति ॥",
      "transliteration": "sa tasminnevākāśe striyamājagāma bahuśobhamānāmumā~ haimavatīṃ tā~hovāca kimetadyakṣamiti ||",
      "english": "In that space, he saw Uma, daughter of Himavan, beautifully adorned. He asked her: \"What is this mystery?\""
    },
    {
      "id": "kena.4.1",
      "sanskrit": "सा ब्रह्मेति होवाच ब्रह्मणो वा एतद्विजये महीयध्वमिति ततो हैव विदाञ्चकार ब्रह्मेति ॥",
      "transliteration": "sā brahmeti hovāca brahmaṇo vā etadvijaye mahīyadhvamiti tato haiva vidāñcakāra brahmeti ||",
      "english": "She replied: \"It is Brahman. Through Brahman's victory you have become great.\" Then Indra understood it was Brahman."
    },
    {
      "id": "kena.4.2",
      "sanskrit": "तस्माद्वा एते देवा अतितरामिवान्यान्देवान्यदग्निर्वायुरिन्द्रस्ते ह्येनन्नेदिष्ठं पस्पर्शुस्ते ह्येनत्प्रथमो विदाञ्चकार ब्रह्मेति ॥",
      "transliteration": "tasmādvā ete devā atitarāmivānyāndevānyadagnirvāyurindraste hyenannediṣṭhaṃ pasparśuste hyenatprathamo vidāñcakāra brahmeti ||",
      "english": "Therefore Agni, Vayu, and Indra excel the other gods, for they came closest to Brahman."
    },
    {
      "id": "kena.4.3",
      "sanskrit": "तस्माद्वा इन्द्रोऽतितरामिवान्यान्देवान्स ह्येनन्नेदिष्ठं पस्पर्श स ह्येनत्प्रथमो विदाञ्चकार ब्रह्मेति ॥",
      "transliteration": "tasmādvā indro'titarāmivānyāndevānsa hyenannediṣṭhaṃ pasparśa sa hyenatprathamo vidāñcakāra brahmeti ||",
      "english": "Thus Indra excels the other gods, for he came closest and first recognized Brahman."
    },
    {
      "id": "kena.4.4",
      "sanskrit": "तस्यैष आदेशो यदेतद्विद्युतो व्यद्युतदा३ इतीन् न्यमीमिषदा३ इत्यधिदैवतम् ॥",
      "transliteration": "tasyaiṣa ādeśo yadetadvidyuto vyadyutadā3 itīn nyamīmiṣadā3 ityadhidaivatam ||",
      "english": "This is the teaching regarding the gods: It flashed like lightning and vanished."
    },
    {
      "id": "kena.4.5",
      "sanskrit": "अथाध्यात्मं यद्देतद्गच्छतीव च मनोऽनेन चैतदुपस्मरत्यभीक्ष्णँ सङ्कल्पः ॥",
      "transliteration": "athādhyātmaṃ yaddetadgacchatīva ca mano'nena caitadupasmaratyabhīkṣṇa~ saṅkalpaḥ ||",
      "english": "Regarding the self: the mind goes toward It, and by It the mind constantly remembers and conceives."
    },
    {
      "id": "kena.4.6",
      "sanskrit": "तद्ध तद्वनं नाम तद्वनमित्युपासितव्यं स य एतदेवं वेदाभि हैनं सर्वाणि भूतानि संवाञ्छन्ति ॥",
      "transliteration": "taddha tadvanaṃ nāma tadvanamityupāsitavyaṃ sa ya etadevaṃ vedābhi hainaṃ sarvāṇi bhūtāni saṃvāñchanti ||",
      "english": "It is called Tadvanam — \"the adorable of all.\" All beings desire the one who knows It thus."
    },
    {
      "id": "kena.4.7",
      "sanskrit": "उपनिषदं भो ब्रूहीत्युक्ता त उपनिषद्ब्राह्मीं वाव त उपनिषदमब्रूमेति ॥",
      "transliteration": "upaniṣadaṃ bho brūhītyuktā ta upaniṣadbrāhmīṃ vāva ta upaniṣadamabrūmeti ||",
      "english": "\"Teach me the Upanishad.\" \"I have taught you the Upanishad about Brahman.\""
    },
    {
      "id": "kena.4.8",
      "sanskrit": "तस्यै तपो दमः कर्मेति प्रतिष्ठा वेदाः सर्वाङ्गानि सत्यमायतनम् ॥",
      "transliteration": "tasyai tapo damaḥ karmeti pratiṣṭhā vedāḥ sarvāṅgāni satyamāyatanam ||",
      "english": "Austerity, self-control, and right action are its foundation; the Vedas are its limbs; truth is its abode."
    },
    {
      "id": "kena.4.9",
      "sanskrit": "यो वा एतामेवं वेदापहत्य पाप्मानमनन्ते स्वर्गे लोके ज्येये प्रतितिष्ठति प्रतितिष्ठति ॥",
      "transliteration": "yo vā etāmevaṃ vedāpahatya pāpmānamanante svarge loke jyeye pratitiṣṭhati pratitiṣṭhati ||",
      "english": "The one who knows this, having destroyed all impurities, stands firmly established in the supreme heavenly world."
    }
  ]

}

// ===== Aitareya Upanishad =====
export const aitareyaUpanishad: Upanishad = {

  "id": "aitareya",
  "name": "Aitareya Upanishad",
  sanskritName: `ऐतरेयोपनिषद्`,
  "transliteration": "Aitareyopaniṣad",
  "summary": "The Aitareya Upanishad, belonging to the Rig Veda, presents the creation of the universe from the Self. It describes how Consciousness creates the worlds, the guardians, and food, and enters the human form. Its profound teaching culminates in the declaration that Consciousness (Prajnana) is Brahman.",
  "theme": "The Self as creator, the entry of deities into the body, and the identity of Consciousness and Brahman.",
  "verseCount": 33,
  "sections": [
    {
      "id": "1.1",
      "name": "First Adhyaya, First Khanda",
      sanskritName: `प्रथमाध्याये प्रथमः खण्डः`,
      "verses": [
        {
          "id": "aitareya.1.1.1",
          "sanskrit": "आत्मा वा इदमेक एवाग्र आसीन्नान्यत्किञ्चन मिषत् । स ईक्षत लोकान्नु सृजा इति ॥",
          "transliteration": "ātmā vā idameka evāgra āsīnnānyatkiñcana miṣat | sa īkṣata lokānnu sṛjā iti ||",
          "english": "The Self alone was all this — one only, without anything else. He thought: \"Let me create the worlds.\""
        },
        {
          "id": "aitareya.1.1.2",
          "sanskrit": "स इमाँ ल्लोकानसृजत । अम्भो मरीचीर्मरमापोऽदोऽम्भः परेण दिवं द्यौः प्रतिष्ठाऽन्तरिक्षं मरीचयः । पृथिवी मरो या अधस्तात्त आपः ॥",
          "transliteration": "sa imā~ llokānasṛjata | ambho marīcīrmaramāpo'do'mbhaḥ pareṇa divaṃ dyauḥ pratiṣṭhā'ntarikṣaṃ marīcayaḥ | pṛthivī maro yā adhastātta āpaḥ ||",
          "english": "He created these worlds: the cosmic waters, rays of light, the mortal world, and waters below."
        },
        {
          "id": "aitareya.1.1.3",
          "sanskrit": "स ईक्षतेमे नु लोका लोकपालान्नु सृजा इति ॥ सोऽद्भ्य एव पुरुषं समुद्धृत्यामूर्छयत् ॥",
          "transliteration": "sa īkṣateme nu lokā lokapālānnu sṛjā iti || so'dbhya eva puruṣaṃ samuddhṛtyāmūrchayat ||",
          "english": "He thought: \"Let me create the guardians of the worlds.\" From the waters he drew forth a person and gave him form."
        },
        {
          "id": "aitareya.1.1.4",
          "sanskrit": "तमभ्यतपत्तस्याभितप्तस्य मुखं निरभिद्यत यथाऽण्डं मुखाद्वाग्वाचोऽग्निर्नासिके निरभिद्येतं नासिकाभ्यां प्राणः । प्राणाद्वायुरक्षिणी निरभिद्येतमक्षीभ्यां चक्षुश्चक्षुष आदित्यः कर्णौ निरभिद्येतां कर्णाभ्यां श्रोत्रं श्रोत्रद्दिशस्त्वङ्निरभिद्यत त्वचो लोमानि लोमभ्य ओषधिवनस्पतयो हृदयं निरभिद्यत हृदायान्मनो मनसश्चन्द्रमा नाभिर्निरभिद्यत नाभ्या अपानोऽपानान्मृत्युः शिश्नं निरभिद्यत शिश्नाद्रेतो रेतस आपः ॥",
          "transliteration": "tamabhyatapattasyābhitaptasya mukhaṃ nirabhidyata yathā'ṇḍaṃ mukhādvāgvāco'gnirnāsike nirabhidyetaṃ nāsikābhyāṃ prāṇaḥ | prāṇādvāyurakṣiṇī nirabhidyetamakṣībhyāṃ cakṣuścakṣuṣa ādityaḥ karṇau nirabhidyetāṃ karṇābhyāṃ śrotraṃ śrotraddiśastvaṅnirabhidyata tvaco lomāni lomabhya oṣadhivanaspatayo hṛdayaṃ nirabhidyata hṛdāyānmano manasaścandramā nābhirnirabhidyata nābhyā apāno'pānānmṛtyuḥ śiśnaṃ nirabhidyata śiśnādreto retasa āpaḥ ||",
          "english": "He brooded. A mouth burst open like an egg. From the mouth, speech; from speech, fire. Nostrils burst open; from them, breath; from breath, air. Eyes burst open; from them, sight; from sight, the sun. Ears burst open; from them, hearing; from hearing, the directions. Skin burst open; from it, hair; from hair, plants. The heart burst open; from it, mind; from mind, the moon. The navel burst open; from it, apana; from apana, death. The organ burst open; from it, seed; from seed, waters."
        }
      ]
    },
    {
      "id": "1.2",
      "name": "First Adhyaya, Second Khanda",
      sanskritName: `प्रथमाध्याये द्वितीयः खण्डः`,
      "verses": [
        {
          "id": "aitareya.1.2.1",
          "sanskrit": "ता एता देवताः सृष्टा अस्मिन्महत्यर्णवे प्रापतन् । तमशनापिपासाभ्यामन्ववार्जत् । ता एनमब्रुवन्नायतनं नः प्रजानीहि यस्मिन्प्रतिष्ठिता अन्नमदामेति ॥",
          "transliteration": "tā etā devatāḥ sṛṣṭā asminmahatyarṇave prāpatan | tamaśanāpipāsābhyāmanvavārjat | tā enamabruvannāyatanaṃ naḥ prajānīhi yasminpratiṣṭhitā annamadāmeti ||",
          "english": "These deities, being created, fell into the great ocean. He afflicted them with hunger and thirst. They said: \"Find us an abode where we may eat food.\""
        },
        {
          "id": "aitareya.1.2.2",
          "sanskrit": "ताभ्यो गामानयत्ता अब्रुवन्न वै नोऽयमलमिति । ताभ्योऽश्वमानयत्ता अब्रुवन्न वै नोऽयमलमिति ॥",
          "transliteration": "tābhyo gāmānayattā abruvanna vai no'yamalamiti | tābhyo'śvamānayattā abruvanna vai no'yamalamiti ||",
          "english": "He brought a cow. \"Not enough.\" He brought a horse. \"Not enough.\""
        },
        {
          "id": "aitareya.1.2.3",
          "sanskrit": "ताभ्यः पुरुषमानयत्ता अब्रुवन् सुकृतं बतेति पुरुषो वाव सुकृतम् । ता अब्रवीद्यथायतनं प्रविशतेति ॥",
          "transliteration": "tābhyaḥ puruṣamānayattā abruvan sukṛtaṃ bateti puruṣo vāva sukṛtam | tā abravīdyathāyatanaṃ praviśateti ||",
          "english": "He brought a human form. \"Well done!\" — the human form is truly well-made. \"Enter, each according to your abode.\""
        },
        {
          "id": "aitareya.1.2.4",
          "sanskrit": "अग्निर्वाग्भूत्वा मुखं प्राविशद्वायुः प्राणो भूत्वा नासिके प्राविशदादित्यश्चक्षुर्भूत्वाऽक्षिणी प्राविशाद्दिशः श्रोत्रं भूत्वा कर्णौ प्राविशन्नोषधिवनस्पतयो लोमानि भूत्वा त्वचंप्राविशंश्चन्द्रमा मनो भूत्वा हृदयं प्राविशन्मृत्युरपानो भूत्वा नाभिं प्राविशदापो रेतो भूत्वा शिश्नं प्राविशन् ॥",
          "transliteration": "agnirvāgbhūtvā mukhaṃ prāviśadvāyuḥ prāṇo bhūtvā nāsike prāviśadādityaścakṣurbhūtvā'kṣiṇī prāviśāddiśaḥ śrotraṃ bhūtvā karṇau prāviśannoṣadhivanaspatayo lomāni bhūtvā tvacaṃprāviśaṃścandramā mano bhūtvā hṛdayaṃ prāviśanmṛtyurapāno bhūtvā nābhiṃ prāviśadāpo reto bhūtvā śiśnaṃ prāviśan ||",
          "english": "Fire became speech and entered the mouth. Air became breath and entered the nostrils. The sun became sight and entered the eyes. The directions became hearing and entered the ears. Plants became hair and entered the skin. The moon became mind and entered the heart. Death became apana and entered the navel. Waters became seed and entered the organ."
        },
        {
          "id": "aitareya.1.2.5",
          "sanskrit": "तमशनायापिपासे अब्रूतामावाभ्यामभिप्रजानीहीति ते अब्रवीदेतास्वेव वां देवतास्वाभजाम्येतासु भागिन्न्यौ करोमीति । तस्माद्यस्यै कस्यै च देवतायै हविर्गृह्यते भागिन्यावेवास्यामशनायापिपासे भवतः ॥",
          "transliteration": "tamaśanāyāpipāse abrūtāmāvābhyāmabhiprajānīhīti te abravīdetāsveva vāṃ devatāsvābhajāmyetāsu bhāginnyau karomīti | tasmādyasyai kasyai ca devatāyai havirgṛhyate bhāginyāvevāsyāmaśanāyāpipāse bhavataḥ ||",
          "english": "Hunger and thirst said: \"Provide for us.\" He said: \"I assign you to these deities as sharers.\" Therefore, whenever an offering is made, hunger and thirst become partakers."
        }
      ]
    },
    {
      "id": "1.3",
      "name": "First Adhyaya, Third Khanda",
      sanskritName: `प्रथमाध्याये तृतीयः खण्डः`,
      "verses": [
        {
          "id": "aitareya.1.3.1",
          "sanskrit": "स ईक्षतेमे नु लोकाश्च लोकपालाश्चान्नमेभ्यः सृजा इति ॥",
          "transliteration": "sa īkṣateme nu lokāśca lokapālāścānnamebhyaḥ sṛjā iti ||",
          "english": "He thought: \"Let me now create food for them.\""
        },
        {
          "id": "aitareya.1.3.2",
          "sanskrit": "सोऽपोऽभ्यतपत्ताभ्योऽभितप्ताभ्यो मूर्तिरजायत । या वै सा मूर्तिरजायतान्नं वै तत् ॥",
          "transliteration": "so'po'bhyatapattābhyo'bhitaptābhyo mūrtirajāyata | yā vai sā mūrtirajāyatānnaṃ vai tat ||",
          "english": "He brooded over the waters. From them a form was born — that form is food."
        },
        {
          "id": "aitareya.1.3.3",
          "sanskrit": "तदेनत्सृष्टं पराङ्त्यजिघांसत्तद्वाचाऽजिघृक्षत् तन्नाशक्नोद्वाचा ग्रहीतुम् । स यद्धैनद्वाचाऽग्रहैष्यदभिव्याहृत्य हैवान्नमत्रप्स्यत् ॥",
          "transliteration": "tadenatsṛṣṭaṃ parāṅtyajighāṃsattadvācā'jighṛkṣat tannāśaknodvācā grahītum | sa yaddhainadvācā'grahaiṣyadabhivyāhṛtya haivānnamatrapsyat ||",
          "english": "The created food fled. He tried to grasp it with speech but could not."
        },
        {
          "id": "aitareya.1.3.4",
          "sanskrit": "तत्प्राणेनाजिघृक्षत् तन्नाशक्नोत्प्राणेन ग्रहीतुं स यद्धैनत्प्राणेनाग्रहैष्यदभिप्राण्य हैवान्नमत्रप्स्यत् ॥",
          "transliteration": "tatprāṇenājighṛkṣat tannāśaknotprāṇena grahītuṃ sa yaddhainatprāṇenāgrahaiṣyadabhiprāṇya haivānnamatrapsyat ||",
          "english": "He tried with breath but could not. Had he grasped it with breath, he would have satisfied hunger by breathing on it."
        },
        {
          "id": "aitareya.1.3.5",
          "sanskrit": "तच्चक्षुषाऽजिघृक्षत् तन्नाशक्नोच्चक्षुषा ग्रहीतुं स यद्धैनच्चक्षुषाऽग्रहैष्यद्दृष्ट्वा हैवान्नमत्रप्स्यत् ॥",
          "transliteration": "taccakṣuṣā'jighṛkṣat tannāśaknoccakṣuṣā grahītuṃ sa yaddhainaccakṣuṣā'grahaiṣyaddṛṣṭvā haivānnamatrapsyat ||",
          "english": "He tried with the eye but could not."
        },
        {
          "id": "aitareya.1.3.6",
          "sanskrit": "तच्छ्रोत्रेणाजिघृक्षत् तन्नाशक्नोच्छ्रोत्रेण ग्रहीतुं स यद्धैनच्छ्रोतेणाग्रहैष्यच्छ्रुत्वा हैवान्नमत्रप्स्यत् ॥",
          "transliteration": "tacchrotreṇājighṛkṣat tannāśaknocchrotreṇa grahītuṃ sa yaddhainacchroteṇāgrahaiṣyacchrutvā haivānnamatrapsyat ||",
          "english": "He tried with the ear but could not."
        },
        {
          "id": "aitareya.1.3.7",
          "sanskrit": "तत्त्वचाऽजिघृक्षत् तन्नाशक्नोत्त्वचा ग्रहीतुं स यद्धैनत्त्वचाऽग्रहैष्यत् स्पृष्ट्वा हैवान्नमत्रप्स्यत् ॥",
          "transliteration": "tattvacā'jighṛkṣat tannāśaknottvacā grahītuṃ sa yaddhainattvacā'grahaiṣyat spṛṣṭvā haivānnamatrapsyat ||",
          "english": "He tried with the skin but could not."
        },
        {
          "id": "aitareya.1.3.8",
          "sanskrit": "तन्मनसाऽजिघृक्षत् तन्नाशक्नोन्मनसा ग्रहीतुं स यद्धैनन्मनसाऽग्रहैष्यद्ध्यात्वा हैवान्नमत्रप्स्यत् ॥",
          "transliteration": "tanmanasā'jighṛkṣat tannāśaknonmanasā grahītuṃ sa yaddhainanmanasā'grahaiṣyaddhyātvā haivānnamatrapsyat ||",
          "english": "He tried with the mind but could not."
        },
        {
          "id": "aitareya.1.3.9",
          "sanskrit": "तच्छिश्नेनाजिघृक्षत् तन्नाशक्नोच्छिश्नेन ग्रहीतुं स यद्धैनच्छिश्नेनाग्रहैष्यद्वित्सृज्य हैवान्नमत्रप्स्यत् ॥",
          "transliteration": "tacchiśnenājighṛkṣat tannāśaknocchiśnena grahītuṃ sa yaddhainacchiśnenāgrahaiṣyadvitsṛjya haivānnamatrapsyat ||",
          "english": "He tried with the organ but could not."
        },
        {
          "id": "aitareya.1.3.10",
          "sanskrit": "तदपानेनाजिघृक्षत् तदावयत् सैषोऽन्नस्य ग्रहो यद्वायुरनायुर्वा एष यद्वायुः ॥",
          "transliteration": "tadapānenājighṛkṣat tadāvayat saiṣo'nnasya graho yadvāyuranāyurvā eṣa yadvāyuḥ ||",
          "english": "He tried with apana (downward breath). He seized it. This is the grasper of food — air, the sustainer of life."
        },
        {
          "id": "aitareya.1.3.11",
          "sanskrit": "स ईक्षत कथं न्विदं मदृते स्यादिति स ईक्षत कतरेण प्रपद्या इति । स ईक्षत यदि वाचाऽभिव्याहृतं यदि प्राणेनाभिप्राणितं यदि चक्षुषा दृष्टं यदि श्रोत्रेण श्रुतं यदि त्वचा स्पृष्टं यदि मनसा ध्यातं यद्यपानेनाभ्यपानितं यदि शिश्नेन विसृष्टमथ कोऽहमिति ॥",
          "transliteration": "sa īkṣata kathaṃ nvidaṃ madṛte syāditi sa īkṣata katareṇa prapadyā iti | sa īkṣata yadi vācā'bhivyāhṛtaṃ yadi prāṇenābhiprāṇitaṃ yadi cakṣuṣā dṛṣṭaṃ yadi śrotreṇa śrutaṃ yadi tvacā spṛṣṭaṃ yadi manasā dhyātaṃ yadyapānenābhyapānitaṃ yadi śiśnena visṛṣṭamatha ko'hamiti ||",
          "english": "He thought: \"How could this exist without me? Through which should I enter? If speech names, if breath breathes, if the eye sees, if the ear hears, if the skin touches, if the mind thinks, if apana does its work, if the organ emits — then who am I?\""
        },
        {
          "id": "aitareya.1.3.12",
          "sanskrit": "स एतमेव सीमानं विदर्यैतया द्वारा प्रापद्यत । सैषा विदृतिर्नाम द्वास्तदेतन्नाऽन्दनम् । तस्य त्रय आवसथास्त्रयः स्वप्ना अयमावसथोऽयमावसथोऽयमावसथ इति ॥",
          "transliteration": "sa etameva sīmānaṃ vidaryaitayā dvārā prāpadyata | saiṣā vidṛtirnāma dvāstadetannā'ndanam | tasya traya āvasathāstrayaḥ svapnā ayamāvasatho'yamāvasatho'yamāvasatha iti ||",
          "english": "He split the suture of the skull and entered through that door — Vidrti, the place of bliss. He has three abodes and three dream states."
        },
        {
          "id": "aitareya.1.3.13",
          "sanskrit": "स जातो भूतान्यभिव्यैख्यत् किमिहान्यं वावदिषदिति । स एतमेव पुरुषं ब्रह्म ततममपश्यत् । इदमदर्शनमिति ॥",
          "transliteration": "sa jāto bhūtānyabhivyaikhyat kimihānyaṃ vāvadiṣaditi | sa etameva puruṣaṃ brahma tatamamapaśyat | idamadarśanamiti ||",
          "english": "Being born, he saw all beings: \"What else is there but me?\" He saw that this Person is Brahman, the highest."
        },
        {
          "id": "aitareya.1.3.14",
          "sanskrit": "तस्मादिदन्द्रो नामेदन्द्रो ह वै नाम । तमिदन्द्रं सन्तमिन्द्र इत्याचक्षते परोक्षेण । परोक्षप्रिया इव हि देवाः परोक्षप्रिया इव हि देवाः ॥",
          "transliteration": "tasmādidandro nāmedandro ha vai nāma | tamidandraṃ santamindra ityācakṣate parokṣeṇa | parokṣapriyā iva hi devāḥ parokṣapriyā iva hi devāḥ ||",
          "english": "Therefore he is called Idandra. Though he is Idandra, they call him Indra indirectly — for the gods love the indirect."
        }
      ]
    },
    {
      "id": "2",
      "name": "Second Adhyaya",
      sanskritName: `द्वितीयोध्यायः`,
      "verses": [
        {
          "id": "aitareya.2.1",
          "sanskrit": "पुरुषे ह वा अयमादितो गर्भो भवति यदेतद्रेतः । तदेतत्सर्वेभ्योऽङ्गेभ्यस्तेजः संभूतमात्मन्येवऽऽत्मानं बिभर्ति तद्यदा स्त्रियां सिञ्चत्यथैनज्जनयति तदस्य प्रथमं जन्म ॥",
          "transliteration": "puruṣe ha vā ayamādito garbho bhavati yadetadretaḥ | tadetatsarvebhyo'ṅgebhyastejaḥ saṃbhūtamātmanyeva''tmānaṃ bibharti tadyadā striyāṃ siñcatyathainajjanayati tadasya prathamaṃ janma ||",
          "english": "In the person, seed first becomes an embryo. He bears his own self in himself. When he pours it into a woman, he gives birth — this is his first birth."
        },
        {
          "id": "aitareya.2.2",
          "sanskrit": "तत्स्त्रिया आत्मभूयं गच्छति यथा स्वमङ्गं तथा । तस्मादेनां न हिनस्ति । साऽस्यैतमात्मानमत्र गतं भावयति ॥",
          "transliteration": "tatstriyā ātmabhūyaṃ gacchati yathā svamaṅgaṃ tathā | tasmādenāṃ na hinasti | sā'syaitamātmānamatra gataṃ bhāvayati ||",
          "english": "It becomes one with the woman's body like her own limb. Therefore it does not harm her. She nourishes this self of his."
        },
        {
          "id": "aitareya.2.3",
          "sanskrit": "सा भावयित्री भावयितव्या भवति । तं स्त्री गर्भ बिभर्ति । सोऽग्र एव कुमारं जन्मनोऽग्रेऽधिभावयति । स यत्कुमारं जन्मनोऽग्रेऽधिभावयत्यात्मानमेव तद्भावयत्येषं लोकानां सन्तत्या । एवं सन्तता हीमे लोकास्तदस्य द्वितीयं जन्म ॥",
          "transliteration": "sā bhāvayitrī bhāvayitavyā bhavati | taṃ strī garbha bibharti | so'gra eva kumāraṃ janmano'gre'dhibhāvayati | sa yatkumāraṃ janmano'gre'dhibhāvayatyātmānameva tadbhāvayatyeṣaṃ lokānāṃ santatyā | evaṃ santatā hīme lokāstadasya dvitīyaṃ janma ||",
          "english": "She nourishes and is to be nourished. The father nourishes the boy before birth. By nourishing the boy, he nourishes his own self for the continuity of the worlds. This is his second birth."
        },
        {
          "id": "aitareya.2.4",
          "sanskrit": "सोऽस्यायमात्मा पुण्येभ्यः कर्मभ्यः प्रतिधीयते । अथास्यायामितर आत्मा कृतकृत्यो वयोगतः प्रैति । स इतः प्रयन्नेव पुनर्जायते तदस्य तृतीयं जन्म ॥",
          "transliteration": "so'syāyamātmā puṇyebhyaḥ karmabhyaḥ pratidhīyate | athāsyāyāmitara ātmā kṛtakṛtyo vayogataḥ praiti | sa itaḥ prayanneva punarjāyate tadasya tṛtīyaṃ janma ||",
          "english": "This self is established for virtuous deeds. His other self, having done what was to be done, departs and is born again — this is his third birth."
        },
        {
          "id": "aitareya.2.5",
          "sanskrit": "तदुक्तमृषिणा गर्भे नु सन्नन्वेषामवेदमहं देवानां जनिमानि विश्वा शतं मा पुर आयसीररक्षन्नधः श्येनो जवसा निरदीयमिति । गर्भ एवैतच्छयानो वामदेव एवमुवाच ॥",
          "transliteration": "taduktamṛṣiṇā garbhe nu sannanveṣāmavedamahaṃ devānāṃ janimāni viśvā śataṃ mā pura āyasīrarakṣannadhaḥ śyeno javasā niradīyamiti | garbha evaitacchayāno vāmadeva evamuvāca ||",
          "english": "Thus said the seer Vamadeva, while still in the womb: \"I know all the births of the gods. A hundred iron fortresses guarded me, but I burst through swiftly like a hawk.\""
        },
        {
          "id": "aitareya.2.6",
          "sanskrit": "स एवं विद्वानस्माच्छरीरभेदादूर्ध्व उत्क्रम्यामुष्मिन् स्वर्गे लोके सर्वान् कामानाप्त्वाऽमृतः समभवत् समभवत् ॥",
          "transliteration": "sa evaṃ vidvānasmāccharīrabhedādūrdhva utkramyāmuṣmin svarge loke sarvān kāmānāptvā'mṛtaḥ samabhavat samabhavat ||",
          "english": "He, knowing thus, having risen from this body, attained all desires in that heavenly world and became immortal — indeed, became immortal."
        }
      ]
    },
    {
      "id": "3",
      "name": "Third Adhyaya",
      sanskritName: `तृतीयोध्यायः`,
      "verses": [
        {
          "id": "aitareya.3.1",
          "sanskrit": "कोऽयमात्मेति वयमुपास्महे कतरः स आत्मा । येन वा पश्यति येन वा शृणोति येन वा गन्धानाजिघ्रति येन वा वाचं व्याकरोति येन वा स्वादु चास्वादु च विजानाति ॥",
          "transliteration": "ko'yamātmeti vayamupāsmahe kataraḥ sa ātmā | yena vā paśyati yena vā śṛṇoti yena vā gandhānājighrati yena vā vācaṃ vyākaroti yena vā svādu cāsvādu ca vijānāti ||",
          "english": "Who is this Self? Which is the Self? That by which one sees, hears, smells odors, speaks, and distinguishes sweet and bitter?"
        },
        {
          "id": "aitareya.3.2",
          "sanskrit": "यदेतद्धृदयं मनश्चैतत् । सञ्ज्ञानमाज्ञानं विज्ञानं प्रज्ञानं मेधा दृष्टिर्धृतिमतिर्मनीषा जूतिः स्मृतिः सङ्कल्पः क्रतुरसुः कामो वश इति । सर्वाण्येवैतानि प्रज्ञानस्य नामधेयानि भवन्ति ॥",
          "transliteration": "yadetaddhṛdayaṃ manaścaitat | sañjñānamājñānaṃ vijñānaṃ prajñānaṃ medhā dṛṣṭirdhṛtimatirmanīṣā jūtiḥ smṛtiḥ saṅkalpaḥ kraturasuḥ kāmo vaśa iti | sarvāṇyevaitāni prajñānasya nāmadheyāni bhavanti ||",
          "english": "This is the heart and mind. Consciousness, perception, cognition, intelligence, wisdom, insight, memory, conception, purpose, life, desire, will — all these are names of Consciousness."
        },
        {
          "id": "aitareya.3.3",
          "sanskrit": "एष ब्रह्मैष इन्द्र एष प्रजापतिरेते सर्वे देवा इमानि च पञ्चमहाभूतानि पृथिवी वायुराकाश आपो ज्योतींषीत्येतानीमानि च क्षुद्रमिश्राणीव । बीजानीतराणि चेतराणि चाण्डजानि च जारुजानि च स्वेदजानि चोद्भिज्जानि चाश्वा गावः पुरुषा हस्तिनो यत्किञ्चेदं प्राणि जङ्गमं च पतत्रि च यच्च स्थावरं सर्वं तत्प्रज्ञानेत्रं प्रज्ञाने प्रतिष्ठितं प्रज्ञानेत्रो लोकः प्रज्ञा प्रतिष्ठा प्रज्ञानं ब्रह्म ॥",
          "transliteration": "eṣa brahmaiṣa indra eṣa prajāpatirete sarve devā imāni ca pañcamahābhūtāni pṛthivī vāyurākāśa āpo jyotīṃṣītyetānīmāni ca kṣudramiśrāṇīva | bījānītarāṇi cetarāṇi cāṇḍajāni ca jārujāni ca svedajāni codbhijjāni cāśvā gāvaḥ puruṣā hastino yatkiñcedaṃ prāṇi jaṅgamaṃ ca patatri ca yacca sthāvaraṃ sarvaṃ tatprajñānetraṃ prajñāne pratiṣṭhitaṃ prajñānetro lokaḥ prajñā pratiṣṭhā prajñānaṃ brahma ||",
          "english": "This is Brahma, Indra, Prajapati, all the gods, and the five great elements. All beings — born of eggs, wombs, sweat, and sprouts — horses, cows, humans, elephants, whatever breathes, moves, flies, and is stationary — all is guided by Consciousness, established in Consciousness. Consciousness is Brahman."
        },
        {
          "id": "aitareya.3.4",
          "sanskrit": "स एतेन प्राज्ञेनऽऽत्मनाऽस्माल्लोकादुत्क्रम्यामुष्मिन्स्वर्गे लोके सर्वान् कामानाप्त्वाऽमृतः समभवत् समभवत् ॥",
          "transliteration": "sa etena prājñena''tmanā'smāllokādutkramyāmuṣminsvarge loke sarvān kāmānāptvā'mṛtaḥ samabhavat samabhavat ||",
          "english": "With this conscious Self, having risen from this world and attained all desires, he became immortal — indeed, became immortal."
        }
      ]
    }
  ],
  "verses": [
    {
      "id": "aitareya.1.1.1",
      "sanskrit": "आत्मा वा इदमेक एवाग्र आसीन्नान्यत्किञ्चन मिषत् । स ईक्षत लोकान्नु सृजा इति ॥",
      "transliteration": "ātmā vā idameka evāgra āsīnnānyatkiñcana miṣat | sa īkṣata lokānnu sṛjā iti ||",
      "english": "The Self alone was all this — one only, without anything else. He thought: \"Let me create the worlds.\""
    },
    {
      "id": "aitareya.1.1.2",
      "sanskrit": "स इमाँ ल्लोकानसृजत । अम्भो मरीचीर्मरमापोऽदोऽम्भः परेण दिवं द्यौः प्रतिष्ठाऽन्तरिक्षं मरीचयः । पृथिवी मरो या अधस्तात्त आपः ॥",
      "transliteration": "sa imā~ llokānasṛjata | ambho marīcīrmaramāpo'do'mbhaḥ pareṇa divaṃ dyauḥ pratiṣṭhā'ntarikṣaṃ marīcayaḥ | pṛthivī maro yā adhastātta āpaḥ ||",
      "english": "He created these worlds: the cosmic waters, rays of light, the mortal world, and waters below."
    },
    {
      "id": "aitareya.1.1.3",
      "sanskrit": "स ईक्षतेमे नु लोका लोकपालान्नु सृजा इति ॥ सोऽद्भ्य एव पुरुषं समुद्धृत्यामूर्छयत् ॥",
      "transliteration": "sa īkṣateme nu lokā lokapālānnu sṛjā iti || so'dbhya eva puruṣaṃ samuddhṛtyāmūrchayat ||",
      "english": "He thought: \"Let me create the guardians of the worlds.\" From the waters he drew forth a person and gave him form."
    },
    {
      "id": "aitareya.1.1.4",
      "sanskrit": "तमभ्यतपत्तस्याभितप्तस्य मुखं निरभिद्यत यथाऽण्डं मुखाद्वाग्वाचोऽग्निर्नासिके निरभिद्येतं नासिकाभ्यां प्राणः । प्राणाद्वायुरक्षिणी निरभिद्येतमक्षीभ्यां चक्षुश्चक्षुष आदित्यः कर्णौ निरभिद्येतां कर्णाभ्यां श्रोत्रं श्रोत्रद्दिशस्त्वङ्निरभिद्यत त्वचो लोमानि लोमभ्य ओषधिवनस्पतयो हृदयं निरभिद्यत हृदायान्मनो मनसश्चन्द्रमा नाभिर्निरभिद्यत नाभ्या अपानोऽपानान्मृत्युः शिश्नं निरभिद्यत शिश्नाद्रेतो रेतस आपः ॥",
      "transliteration": "tamabhyatapattasyābhitaptasya mukhaṃ nirabhidyata yathā'ṇḍaṃ mukhādvāgvāco'gnirnāsike nirabhidyetaṃ nāsikābhyāṃ prāṇaḥ | prāṇādvāyurakṣiṇī nirabhidyetamakṣībhyāṃ cakṣuścakṣuṣa ādityaḥ karṇau nirabhidyetāṃ karṇābhyāṃ śrotraṃ śrotraddiśastvaṅnirabhidyata tvaco lomāni lomabhya oṣadhivanaspatayo hṛdayaṃ nirabhidyata hṛdāyānmano manasaścandramā nābhirnirabhidyata nābhyā apāno'pānānmṛtyuḥ śiśnaṃ nirabhidyata śiśnādreto retasa āpaḥ ||",
      "english": "He brooded. A mouth burst open like an egg. From the mouth, speech; from speech, fire. Nostrils burst open; from them, breath; from breath, air. Eyes burst open; from them, sight; from sight, the sun. Ears burst open; from them, hearing; from hearing, the directions. Skin burst open; from it, hair; from hair, plants. The heart burst open; from it, mind; from mind, the moon. The navel burst open; from it, apana; from apana, death. The organ burst open; from it, seed; from seed, waters."
    },
    {
      "id": "aitareya.1.2.1",
      "sanskrit": "ता एता देवताः सृष्टा अस्मिन्महत्यर्णवे प्रापतन् । तमशनापिपासाभ्यामन्ववार्जत् । ता एनमब्रुवन्नायतनं नः प्रजानीहि यस्मिन्प्रतिष्ठिता अन्नमदामेति ॥",
      "transliteration": "tā etā devatāḥ sṛṣṭā asminmahatyarṇave prāpatan | tamaśanāpipāsābhyāmanvavārjat | tā enamabruvannāyatanaṃ naḥ prajānīhi yasminpratiṣṭhitā annamadāmeti ||",
      "english": "These deities, being created, fell into the great ocean. He afflicted them with hunger and thirst. They said: \"Find us an abode where we may eat food.\""
    },
    {
      "id": "aitareya.1.2.2",
      "sanskrit": "ताभ्यो गामानयत्ता अब्रुवन्न वै नोऽयमलमिति । ताभ्योऽश्वमानयत्ता अब्रुवन्न वै नोऽयमलमिति ॥",
      "transliteration": "tābhyo gāmānayattā abruvanna vai no'yamalamiti | tābhyo'śvamānayattā abruvanna vai no'yamalamiti ||",
      "english": "He brought a cow. \"Not enough.\" He brought a horse. \"Not enough.\""
    },
    {
      "id": "aitareya.1.2.3",
      "sanskrit": "ताभ्यः पुरुषमानयत्ता अब्रुवन् सुकृतं बतेति पुरुषो वाव सुकृतम् । ता अब्रवीद्यथायतनं प्रविशतेति ॥",
      "transliteration": "tābhyaḥ puruṣamānayattā abruvan sukṛtaṃ bateti puruṣo vāva sukṛtam | tā abravīdyathāyatanaṃ praviśateti ||",
      "english": "He brought a human form. \"Well done!\" — the human form is truly well-made. \"Enter, each according to your abode.\""
    },
    {
      "id": "aitareya.1.2.4",
      "sanskrit": "अग्निर्वाग्भूत्वा मुखं प्राविशद्वायुः प्राणो भूत्वा नासिके प्राविशदादित्यश्चक्षुर्भूत्वाऽक्षिणी प्राविशाद्दिशः श्रोत्रं भूत्वा कर्णौ प्राविशन्नोषधिवनस्पतयो लोमानि भूत्वा त्वचंप्राविशंश्चन्द्रमा मनो भूत्वा हृदयं प्राविशन्मृत्युरपानो भूत्वा नाभिं प्राविशदापो रेतो भूत्वा शिश्नं प्राविशन् ॥",
      "transliteration": "agnirvāgbhūtvā mukhaṃ prāviśadvāyuḥ prāṇo bhūtvā nāsike prāviśadādityaścakṣurbhūtvā'kṣiṇī prāviśāddiśaḥ śrotraṃ bhūtvā karṇau prāviśannoṣadhivanaspatayo lomāni bhūtvā tvacaṃprāviśaṃścandramā mano bhūtvā hṛdayaṃ prāviśanmṛtyurapāno bhūtvā nābhiṃ prāviśadāpo reto bhūtvā śiśnaṃ prāviśan ||",
      "english": "Fire became speech and entered the mouth. Air became breath and entered the nostrils. The sun became sight and entered the eyes. The directions became hearing and entered the ears. Plants became hair and entered the skin. The moon became mind and entered the heart. Death became apana and entered the navel. Waters became seed and entered the organ."
    },
    {
      "id": "aitareya.1.2.5",
      "sanskrit": "तमशनायापिपासे अब्रूतामावाभ्यामभिप्रजानीहीति ते अब्रवीदेतास्वेव वां देवतास्वाभजाम्येतासु भागिन्न्यौ करोमीति । तस्माद्यस्यै कस्यै च देवतायै हविर्गृह्यते भागिन्यावेवास्यामशनायापिपासे भवतः ॥",
      "transliteration": "tamaśanāyāpipāse abrūtāmāvābhyāmabhiprajānīhīti te abravīdetāsveva vāṃ devatāsvābhajāmyetāsu bhāginnyau karomīti | tasmādyasyai kasyai ca devatāyai havirgṛhyate bhāginyāvevāsyāmaśanāyāpipāse bhavataḥ ||",
      "english": "Hunger and thirst said: \"Provide for us.\" He said: \"I assign you to these deities as sharers.\" Therefore, whenever an offering is made, hunger and thirst become partakers."
    },
    {
      "id": "aitareya.1.3.1",
      "sanskrit": "स ईक्षतेमे नु लोकाश्च लोकपालाश्चान्नमेभ्यः सृजा इति ॥",
      "transliteration": "sa īkṣateme nu lokāśca lokapālāścānnamebhyaḥ sṛjā iti ||",
      "english": "He thought: \"Let me now create food for them.\""
    },
    {
      "id": "aitareya.1.3.2",
      "sanskrit": "सोऽपोऽभ्यतपत्ताभ्योऽभितप्ताभ्यो मूर्तिरजायत । या वै सा मूर्तिरजायतान्नं वै तत् ॥",
      "transliteration": "so'po'bhyatapattābhyo'bhitaptābhyo mūrtirajāyata | yā vai sā mūrtirajāyatānnaṃ vai tat ||",
      "english": "He brooded over the waters. From them a form was born — that form is food."
    },
    {
      "id": "aitareya.1.3.3",
      "sanskrit": "तदेनत्सृष्टं पराङ्त्यजिघांसत्तद्वाचाऽजिघृक्षत् तन्नाशक्नोद्वाचा ग्रहीतुम् । स यद्धैनद्वाचाऽग्रहैष्यदभिव्याहृत्य हैवान्नमत्रप्स्यत् ॥",
      "transliteration": "tadenatsṛṣṭaṃ parāṅtyajighāṃsattadvācā'jighṛkṣat tannāśaknodvācā grahītum | sa yaddhainadvācā'grahaiṣyadabhivyāhṛtya haivānnamatrapsyat ||",
      "english": "The created food fled. He tried to grasp it with speech but could not."
    },
    {
      "id": "aitareya.1.3.4",
      "sanskrit": "तत्प्राणेनाजिघृक्षत् तन्नाशक्नोत्प्राणेन ग्रहीतुं स यद्धैनत्प्राणेनाग्रहैष्यदभिप्राण्य हैवान्नमत्रप्स्यत् ॥",
      "transliteration": "tatprāṇenājighṛkṣat tannāśaknotprāṇena grahītuṃ sa yaddhainatprāṇenāgrahaiṣyadabhiprāṇya haivānnamatrapsyat ||",
      "english": "He tried with breath but could not. Had he grasped it with breath, he would have satisfied hunger by breathing on it."
    },
    {
      "id": "aitareya.1.3.5",
      "sanskrit": "तच्चक्षुषाऽजिघृक्षत् तन्नाशक्नोच्चक्षुषा ग्रहीतुं स यद्धैनच्चक्षुषाऽग्रहैष्यद्दृष्ट्वा हैवान्नमत्रप्स्यत् ॥",
      "transliteration": "taccakṣuṣā'jighṛkṣat tannāśaknoccakṣuṣā grahītuṃ sa yaddhainaccakṣuṣā'grahaiṣyaddṛṣṭvā haivānnamatrapsyat ||",
      "english": "He tried with the eye but could not."
    },
    {
      "id": "aitareya.1.3.6",
      "sanskrit": "तच्छ्रोत्रेणाजिघृक्षत् तन्नाशक्नोच्छ्रोत्रेण ग्रहीतुं स यद्धैनच्छ्रोतेणाग्रहैष्यच्छ्रुत्वा हैवान्नमत्रप्स्यत् ॥",
      "transliteration": "tacchrotreṇājighṛkṣat tannāśaknocchrotreṇa grahītuṃ sa yaddhainacchroteṇāgrahaiṣyacchrutvā haivānnamatrapsyat ||",
      "english": "He tried with the ear but could not."
    },
    {
      "id": "aitareya.1.3.7",
      "sanskrit": "तत्त्वचाऽजिघृक्षत् तन्नाशक्नोत्त्वचा ग्रहीतुं स यद्धैनत्त्वचाऽग्रहैष्यत् स्पृष्ट्वा हैवान्नमत्रप्स्यत् ॥",
      "transliteration": "tattvacā'jighṛkṣat tannāśaknottvacā grahītuṃ sa yaddhainattvacā'grahaiṣyat spṛṣṭvā haivānnamatrapsyat ||",
      "english": "He tried with the skin but could not."
    },
    {
      "id": "aitareya.1.3.8",
      "sanskrit": "तन्मनसाऽजिघृक्षत् तन्नाशक्नोन्मनसा ग्रहीतुं स यद्धैनन्मनसाऽग्रहैष्यद्ध्यात्वा हैवान्नमत्रप्स्यत् ॥",
      "transliteration": "tanmanasā'jighṛkṣat tannāśaknonmanasā grahītuṃ sa yaddhainanmanasā'grahaiṣyaddhyātvā haivānnamatrapsyat ||",
      "english": "He tried with the mind but could not."
    },
    {
      "id": "aitareya.1.3.9",
      "sanskrit": "तच्छिश्नेनाजिघृक्षत् तन्नाशक्नोच्छिश्नेन ग्रहीतुं स यद्धैनच्छिश्नेनाग्रहैष्यद्वित्सृज्य हैवान्नमत्रप्स्यत् ॥",
      "transliteration": "tacchiśnenājighṛkṣat tannāśaknocchiśnena grahītuṃ sa yaddhainacchiśnenāgrahaiṣyadvitsṛjya haivānnamatrapsyat ||",
      "english": "He tried with the organ but could not."
    },
    {
      "id": "aitareya.1.3.10",
      "sanskrit": "तदपानेनाजिघृक्षत् तदावयत् सैषोऽन्नस्य ग्रहो यद्वायुरनायुर्वा एष यद्वायुः ॥",
      "transliteration": "tadapānenājighṛkṣat tadāvayat saiṣo'nnasya graho yadvāyuranāyurvā eṣa yadvāyuḥ ||",
      "english": "He tried with apana (downward breath). He seized it. This is the grasper of food — air, the sustainer of life."
    },
    {
      "id": "aitareya.1.3.11",
      "sanskrit": "स ईक्षत कथं न्विदं मदृते स्यादिति स ईक्षत कतरेण प्रपद्या इति । स ईक्षत यदि वाचाऽभिव्याहृतं यदि प्राणेनाभिप्राणितं यदि चक्षुषा दृष्टं यदि श्रोत्रेण श्रुतं यदि त्वचा स्पृष्टं यदि मनसा ध्यातं यद्यपानेनाभ्यपानितं यदि शिश्नेन विसृष्टमथ कोऽहमिति ॥",
      "transliteration": "sa īkṣata kathaṃ nvidaṃ madṛte syāditi sa īkṣata katareṇa prapadyā iti | sa īkṣata yadi vācā'bhivyāhṛtaṃ yadi prāṇenābhiprāṇitaṃ yadi cakṣuṣā dṛṣṭaṃ yadi śrotreṇa śrutaṃ yadi tvacā spṛṣṭaṃ yadi manasā dhyātaṃ yadyapānenābhyapānitaṃ yadi śiśnena visṛṣṭamatha ko'hamiti ||",
      "english": "He thought: \"How could this exist without me? Through which should I enter? If speech names, if breath breathes, if the eye sees, if the ear hears, if the skin touches, if the mind thinks, if apana does its work, if the organ emits — then who am I?\""
    },
    {
      "id": "aitareya.1.3.12",
      "sanskrit": "स एतमेव सीमानं विदर्यैतया द्वारा प्रापद्यत । सैषा विदृतिर्नाम द्वास्तदेतन्नाऽन्दनम् । तस्य त्रय आवसथास्त्रयः स्वप्ना अयमावसथोऽयमावसथोऽयमावसथ इति ॥",
      "transliteration": "sa etameva sīmānaṃ vidaryaitayā dvārā prāpadyata | saiṣā vidṛtirnāma dvāstadetannā'ndanam | tasya traya āvasathāstrayaḥ svapnā ayamāvasatho'yamāvasatho'yamāvasatha iti ||",
      "english": "He split the suture of the skull and entered through that door — Vidrti, the place of bliss. He has three abodes and three dream states."
    },
    {
      "id": "aitareya.1.3.13",
      "sanskrit": "स जातो भूतान्यभिव्यैख्यत् किमिहान्यं वावदिषदिति । स एतमेव पुरुषं ब्रह्म ततममपश्यत् । इदमदर्शनमिति ॥",
      "transliteration": "sa jāto bhūtānyabhivyaikhyat kimihānyaṃ vāvadiṣaditi | sa etameva puruṣaṃ brahma tatamamapaśyat | idamadarśanamiti ||",
      "english": "Being born, he saw all beings: \"What else is there but me?\" He saw that this Person is Brahman, the highest."
    },
    {
      "id": "aitareya.1.3.14",
      "sanskrit": "तस्मादिदन्द्रो नामेदन्द्रो ह वै नाम । तमिदन्द्रं सन्तमिन्द्र इत्याचक्षते परोक्षेण । परोक्षप्रिया इव हि देवाः परोक्षप्रिया इव हि देवाः ॥",
      "transliteration": "tasmādidandro nāmedandro ha vai nāma | tamidandraṃ santamindra ityācakṣate parokṣeṇa | parokṣapriyā iva hi devāḥ parokṣapriyā iva hi devāḥ ||",
      "english": "Therefore he is called Idandra. Though he is Idandra, they call him Indra indirectly — for the gods love the indirect."
    },
    {
      "id": "aitareya.2.1",
      "sanskrit": "पुरुषे ह वा अयमादितो गर्भो भवति यदेतद्रेतः । तदेतत्सर्वेभ्योऽङ्गेभ्यस्तेजः संभूतमात्मन्येवऽऽत्मानं बिभर्ति तद्यदा स्त्रियां सिञ्चत्यथैनज्जनयति तदस्य प्रथमं जन्म ॥",
      "transliteration": "puruṣe ha vā ayamādito garbho bhavati yadetadretaḥ | tadetatsarvebhyo'ṅgebhyastejaḥ saṃbhūtamātmanyeva''tmānaṃ bibharti tadyadā striyāṃ siñcatyathainajjanayati tadasya prathamaṃ janma ||",
      "english": "In the person, seed first becomes an embryo. He bears his own self in himself. When he pours it into a woman, he gives birth — this is his first birth."
    },
    {
      "id": "aitareya.2.2",
      "sanskrit": "तत्स्त्रिया आत्मभूयं गच्छति यथा स्वमङ्गं तथा । तस्मादेनां न हिनस्ति । साऽस्यैतमात्मानमत्र गतं भावयति ॥",
      "transliteration": "tatstriyā ātmabhūyaṃ gacchati yathā svamaṅgaṃ tathā | tasmādenāṃ na hinasti | sā'syaitamātmānamatra gataṃ bhāvayati ||",
      "english": "It becomes one with the woman's body like her own limb. Therefore it does not harm her. She nourishes this self of his."
    },
    {
      "id": "aitareya.2.3",
      "sanskrit": "सा भावयित्री भावयितव्या भवति । तं स्त्री गर्भ बिभर्ति । सोऽग्र एव कुमारं जन्मनोऽग्रेऽधिभावयति । स यत्कुमारं जन्मनोऽग्रेऽधिभावयत्यात्मानमेव तद्भावयत्येषं लोकानां सन्तत्या । एवं सन्तता हीमे लोकास्तदस्य द्वितीयं जन्म ॥",
      "transliteration": "sā bhāvayitrī bhāvayitavyā bhavati | taṃ strī garbha bibharti | so'gra eva kumāraṃ janmano'gre'dhibhāvayati | sa yatkumāraṃ janmano'gre'dhibhāvayatyātmānameva tadbhāvayatyeṣaṃ lokānāṃ santatyā | evaṃ santatā hīme lokāstadasya dvitīyaṃ janma ||",
      "english": "She nourishes and is to be nourished. The father nourishes the boy before birth. By nourishing the boy, he nourishes his own self for the continuity of the worlds. This is his second birth."
    },
    {
      "id": "aitareya.2.4",
      "sanskrit": "सोऽस्यायमात्मा पुण्येभ्यः कर्मभ्यः प्रतिधीयते । अथास्यायामितर आत्मा कृतकृत्यो वयोगतः प्रैति । स इतः प्रयन्नेव पुनर्जायते तदस्य तृतीयं जन्म ॥",
      "transliteration": "so'syāyamātmā puṇyebhyaḥ karmabhyaḥ pratidhīyate | athāsyāyāmitara ātmā kṛtakṛtyo vayogataḥ praiti | sa itaḥ prayanneva punarjāyate tadasya tṛtīyaṃ janma ||",
      "english": "This self is established for virtuous deeds. His other self, having done what was to be done, departs and is born again — this is his third birth."
    },
    {
      "id": "aitareya.2.5",
      "sanskrit": "तदुक्तमृषिणा गर्भे नु सन्नन्वेषामवेदमहं देवानां जनिमानि विश्वा शतं मा पुर आयसीररक्षन्नधः श्येनो जवसा निरदीयमिति । गर्भ एवैतच्छयानो वामदेव एवमुवाच ॥",
      "transliteration": "taduktamṛṣiṇā garbhe nu sannanveṣāmavedamahaṃ devānāṃ janimāni viśvā śataṃ mā pura āyasīrarakṣannadhaḥ śyeno javasā niradīyamiti | garbha evaitacchayāno vāmadeva evamuvāca ||",
      "english": "Thus said the seer Vamadeva, while still in the womb: \"I know all the births of the gods. A hundred iron fortresses guarded me, but I burst through swiftly like a hawk.\""
    },
    {
      "id": "aitareya.2.6",
      "sanskrit": "स एवं विद्वानस्माच्छरीरभेदादूर्ध्व उत्क्रम्यामुष्मिन् स्वर्गे लोके सर्वान् कामानाप्त्वाऽमृतः समभवत् समभवत् ॥",
      "transliteration": "sa evaṃ vidvānasmāccharīrabhedādūrdhva utkramyāmuṣmin svarge loke sarvān kāmānāptvā'mṛtaḥ samabhavat samabhavat ||",
      "english": "He, knowing thus, having risen from this body, attained all desires in that heavenly world and became immortal — indeed, became immortal."
    },
    {
      "id": "aitareya.3.1",
      "sanskrit": "कोऽयमात्मेति वयमुपास्महे कतरः स आत्मा । येन वा पश्यति येन वा शृणोति येन वा गन्धानाजिघ्रति येन वा वाचं व्याकरोति येन वा स्वादु चास्वादु च विजानाति ॥",
      "transliteration": "ko'yamātmeti vayamupāsmahe kataraḥ sa ātmā | yena vā paśyati yena vā śṛṇoti yena vā gandhānājighrati yena vā vācaṃ vyākaroti yena vā svādu cāsvādu ca vijānāti ||",
      "english": "Who is this Self? Which is the Self? That by which one sees, hears, smells odors, speaks, and distinguishes sweet and bitter?"
    },
    {
      "id": "aitareya.3.2",
      "sanskrit": "यदेतद्धृदयं मनश्चैतत् । सञ्ज्ञानमाज्ञानं विज्ञानं प्रज्ञानं मेधा दृष्टिर्धृतिमतिर्मनीषा जूतिः स्मृतिः सङ्कल्पः क्रतुरसुः कामो वश इति । सर्वाण्येवैतानि प्रज्ञानस्य नामधेयानि भवन्ति ॥",
      "transliteration": "yadetaddhṛdayaṃ manaścaitat | sañjñānamājñānaṃ vijñānaṃ prajñānaṃ medhā dṛṣṭirdhṛtimatirmanīṣā jūtiḥ smṛtiḥ saṅkalpaḥ kraturasuḥ kāmo vaśa iti | sarvāṇyevaitāni prajñānasya nāmadheyāni bhavanti ||",
      "english": "This is the heart and mind. Consciousness, perception, cognition, intelligence, wisdom, insight, memory, conception, purpose, life, desire, will — all these are names of Consciousness."
    },
    {
      "id": "aitareya.3.3",
      "sanskrit": "एष ब्रह्मैष इन्द्र एष प्रजापतिरेते सर्वे देवा इमानि च पञ्चमहाभूतानि पृथिवी वायुराकाश आपो ज्योतींषीत्येतानीमानि च क्षुद्रमिश्राणीव । बीजानीतराणि चेतराणि चाण्डजानि च जारुजानि च स्वेदजानि चोद्भिज्जानि चाश्वा गावः पुरुषा हस्तिनो यत्किञ्चेदं प्राणि जङ्गमं च पतत्रि च यच्च स्थावरं सर्वं तत्प्रज्ञानेत्रं प्रज्ञाने प्रतिष्ठितं प्रज्ञानेत्रो लोकः प्रज्ञा प्रतिष्ठा प्रज्ञानं ब्रह्म ॥",
      "transliteration": "eṣa brahmaiṣa indra eṣa prajāpatirete sarve devā imāni ca pañcamahābhūtāni pṛthivī vāyurākāśa āpo jyotīṃṣītyetānīmāni ca kṣudramiśrāṇīva | bījānītarāṇi cetarāṇi cāṇḍajāni ca jārujāni ca svedajāni codbhijjāni cāśvā gāvaḥ puruṣā hastino yatkiñcedaṃ prāṇi jaṅgamaṃ ca patatri ca yacca sthāvaraṃ sarvaṃ tatprajñānetraṃ prajñāne pratiṣṭhitaṃ prajñānetro lokaḥ prajñā pratiṣṭhā prajñānaṃ brahma ||",
      "english": "This is Brahma, Indra, Prajapati, all the gods, and the five great elements. All beings — born of eggs, wombs, sweat, and sprouts — horses, cows, humans, elephants, whatever breathes, moves, flies, and is stationary — all is guided by Consciousness, established in Consciousness. Consciousness is Brahman."
    },
    {
      "id": "aitareya.3.4",
      "sanskrit": "स एतेन प्राज्ञेनऽऽत्मनाऽस्माल्लोकादुत्क्रम्यामुष्मिन्स्वर्गे लोके सर्वान् कामानाप्त्वाऽमृतः समभवत् समभवत् ॥",
      "transliteration": "sa etena prājñena''tmanā'smāllokādutkramyāmuṣminsvarge loke sarvān kāmānāptvā'mṛtaḥ samabhavat samabhavat ||",
      "english": "With this conscious Self, having risen from this world and attained all desires, he became immortal — indeed, became immortal."
    }
  ]

}

// ===== Prashna Upanishad =====
export const prashnaUpanishad: Upanishad = {

  "id": "prashna",
  "name": "Prashna Upanishad",
  sanskritName: `प्रश्नोपनिषद्`,
  "transliteration": "Praśnopaniṣad",
  "summary": "The Prashna Upanishad (\"Upanishad of Questions\") contains six profound questions posed by six seekers to the sage Pippalada. Each question explores a different aspect of ultimate reality: creation, the supremacy of Prana, the nature of breath, the states of consciousness, the significance of OM, and the 16-part Person.",
  "theme": "The nature of Prana, the creation of beings, the states of consciousness (waking, dream, deep sleep), the meaning of OM, and the supreme Person.",
  "verseCount": 67,
  "sections": [
    {
      "id": "1",
      "name": "First Question",
      sanskritName: `प्रथमः प्रश्नः`,
      "verses": [
        {
          "id": "prashna.1.1",
          "sanskrit": "सुकेशा च भारद्वाजः शैब्यश्च सत्यकामः सौर्यायणी च गार्ग्यः कौसल्यश्चाश्वलायनो भार्गवो वैदर्भिः कबन्धी कात्यायनस्ते हैते ब्रह्मपरा ब्रह्मनिष्ठाः परं ब्रह्मान्वेषमाणा एष ह वै तत्सर्वं वक्ष्यतीति ते ह समित्पाणयो भगवन्तं पिप्पलादमुपसन्नाः ॥",
          "transliteration": "sukeśā ca bhāradvājaḥ śaibyaśca satyakāmaḥ sauryāyaṇī ca gārgyaḥ kausalyaścāśvalāyano bhārgavo vaidarbhiḥ kabandhī kātyāyanaste haite brahmaparā brahmaniṣṭhāḥ paraṃ brahmānveṣamāṇā eṣa ha vai tatsarvaṃ vakṣyatīti te ha samitpāṇayo bhagavantaṃ pippalādamupasannāḥ ||",
          "english": "Sukesa, Saibya, Sauryayani, Kausalya, Bhargava, and Kabandhi — seekers of Brahman — approached the venerable Pippalada with firewood in hand."
        },
        {
          "id": "prashna.1.2",
          "sanskrit": "तान्ह स ऋषिरुवाच भूय एव तपसा ब्रह्मचर्येण श्रद्धया संवत्सरं संवत्स्यथ यथाकामं प्रश्नान् पृच्छत यदि विज्ञास्यामः सर्वं ह वो वक्ष्याम इति ॥",
          "transliteration": "tānha sa ṛṣiruvāca bhūya eva tapasā brahmacaryeṇa śraddhayā saṃvatsaraṃ saṃvatsyatha yathākāmaṃ praśnān pṛcchata yadi vijñāsyāmaḥ sarvaṃ ha vo vakṣyāma iti ||",
          "english": "The sage said: \"Live here for a year with austerity, celibacy, and faith. Then ask questions as you wish.\""
        },
        {
          "id": "prashna.1.3",
          "sanskrit": "अथ कबन्धी कात्यायन उपेत्य पप्रच्छ । भगवन् कुते ह वा इमाः प्रजाः प्रजायन्त इति ॥",
          "transliteration": "atha kabandhī kātyāyana upetya papraccha | bhagavan kute ha vā imāḥ prajāḥ prajāyanta iti ||",
          "english": "Kabandhi asked: \"Lord, from where are these beings born?\""
        },
        {
          "id": "prashna.1.4",
          "sanskrit": "तस्मै स होवाच प्रजाकामो वै प्रजापतिः स तपोऽतप्यत स तपस्तप्त्वा स मिथुनमुत्पादयते । रयिं च प्राणं चेत्येतौ मे बहुधा प्रजाः करिष्यत इति ॥",
          "transliteration": "tasmai sa hovāca prajākāmo vai prajāpatiḥ sa tapo'tapyata sa tapastaptvā sa mithunamutpādayate | rayiṃ ca prāṇaṃ cetyetau me bahudhā prajāḥ kariṣyata iti ||",
          "english": "He replied: \"Prajapati, desiring offspring, performed austerity and created a pair: Rayi (matter) and Prana (life).\""
        },
        {
          "id": "prashna.1.5",
          "sanskrit": "आदित्यो ह वै प्राणो रयिरेव चन्द्रमा रयिर्वा एतत् सर्वं यन्मूर्तं चामूर्तं च तस्मान्मूर्तिरेव रयिः ॥",
          "transliteration": "ādityo ha vai prāṇo rayireva candramā rayirvā etat sarvaṃ yanmūrtaṃ cāmūrtaṃ ca tasmānmūrtireva rayiḥ ||",
          "english": "The sun is Prana; the moon is matter. All that is formed and formless is matter."
        },
        {
          "id": "prashna.1.6",
          "sanskrit": "अथादित्य उदयन्यत्प्राचीं दिशं प्रविशति तेन प्राच्यान् प्राणान् रश्मिषु सन्निधत्ते । यद्दक्षिणं यत् प्रतीचीं यदुदीचीं यदधो यदूर्ध्वं यदन्तरा दिशो यत् सर्वं प्रकाशयति तेन सर्वान् प्राणान् रश्मिषु सन्निधत्ते ॥",
          "transliteration": "athāditya udayanyatprācīṃ diśaṃ praviśati tena prācyān prāṇān raśmiṣu sannidhatte | yaddakṣiṇaṃ yat pratīcīṃ yadudīcīṃ yadadho yadūrdhvaṃ yadantarā diśo yat sarvaṃ prakāśayati tena sarvān prāṇān raśmiṣu sannidhatte ||",
          "english": "The rising sun enters all directions and gathers the life-forces in his rays."
        },
        {
          "id": "prashna.1.7",
          "sanskrit": "स एष वैश्वानरो विश्वरूपः प्राणोऽग्निरुदयते । तदेतदृचाऽभ्युक्तम् ॥",
          "transliteration": "sa eṣa vaiśvānaro viśvarūpaḥ prāṇo'gnirudayate | tadetadṛcā'bhyuktam ||",
          "english": "This Vaishvanara, assuming all forms, rises as life-fire."
        },
        {
          "id": "prashna.1.8",
          "sanskrit": "विश्वरूपं हरिणं जातवेदसं परायणं ज्योतिरेकं तपन्तम् । सहस्ररश्मिः शतधा वर्तमानः प्राणः प्रजानामुदयत्येष सूर्यः ॥",
          "transliteration": "viśvarūpaṃ hariṇaṃ jātavedasaṃ parāyaṇaṃ jyotirekaṃ tapantam | sahasraraśmiḥ śatadhā vartamānaḥ prāṇaḥ prajānāmudayatyeṣa sūryaḥ ||",
          "english": "The thousand-rayed, hundred-circuited sun rises as the life of all beings."
        },
        {
          "id": "prashna.1.9",
          "sanskrit": "संवत्सरो वै प्रजापतिस्तस्यायने दक्षिणं चोत्तरं च । तद्ये ह वै तदिष्टापूर्ते कृतमित्युपासते ते चान्द्रमसमेव लोकमभिजयन्ते । त एव पुनरावर्तन्ते तस्मादेत ऋषयः प्रजाकामा दक्षिणं प्रतिपद्यन्ते । एष ह वै रयिर्यः पितृयाणः ॥",
          "transliteration": "saṃvatsaro vai prajāpatistasyāyane dakṣiṇaṃ cottaraṃ ca | tadye ha vai tadiṣṭāpūrte kṛtamityupāsate te cāndramasameva lokamabhijayante | ta eva punarāvartante tasmādeta ṛṣayaḥ prajākāmā dakṣiṇaṃ pratipadyante | eṣa ha vai rayiryaḥ pitṛyāṇaḥ ||",
          "english": "The year is Prajapati with two paths. Those who worship actions gain the lunar world and return. The southern path is the path of the fathers."
        },
        {
          "id": "prashna.1.10",
          "sanskrit": "अथोत्तरेण तपसा ब्रह्मचर्येण श्रद्धया विद्ययाऽऽत्मानमन्विष्यादित्यमभिजयन्ते । एतद्वै प्राणानामायतनमेतदमृतमभयमेतत् परायणमेतस्मान्न पुनरावर्तन्त इत्य् एष निरोधस्तदेष श्लोकः ॥",
          "transliteration": "athottareṇa tapasā brahmacaryeṇa śraddhayā vidyayā''tmānamanviṣyādityamabhijayante | etadvai prāṇānāmāyatanametadamṛtamabhayametat parāyaṇametasmānna punarāvartanta ity eṣa nirodhastadeṣa ślokaḥ ||",
          "english": "By the northern path, through austerity and knowledge, they seek the Self and attain the sun — the immortal, fearless, supreme goal. From there they do not return."
        },
        {
          "id": "prashna.1.11",
          "sanskrit": "पञ्चपादं पितरं द्वादशाकृतिं दिव आहुः परे अर्धे पुरीषिणम् । अथेमे अन्य उ परे विचक्षणं सप्तचक्रे षडर आहुरर्पितमिति ॥",
          "transliteration": "pañcapādaṃ pitaraṃ dvādaśākṛtiṃ diva āhuḥ pare ardhe purīṣiṇam | atheme anya u pare vicakṣaṇaṃ saptacakre ṣaḍara āhurarpitamiti ||",
          "english": "They speak of the five-footed father in the eastern sky, and the wise one of seven wheels and six spokes in the other half."
        },
        {
          "id": "prashna.1.12",
          "sanskrit": "मासो वै प्रजापतिस्तस्य कृष्णपक्ष एव रयिः शुक्लः प्रणस्तस्मादेत ऋषयः शुक्ल इष्टं कुर्वन्तीतर इतरस्मिन् ॥",
          "transliteration": "māso vai prajāpatistasya kṛṣṇapakṣa eva rayiḥ śuklaḥ praṇastasmādeta ṛṣayaḥ śukla iṣṭaṃ kurvantītara itarasmin ||",
          "english": "The month is Prajapati. Its dark half is matter, its bright half is life."
        },
        {
          "id": "prashna.1.13",
          "sanskrit": "अहोरात्रो वै प्रजापतिस्तस्याहरेव प्राणो रात्रिरेव रयिः प्राणं वा एते प्रस्कन्दन्ति ये दिवा रत्या संयुज्यन्ते ब्रह्मचर्यमेव तद्यद्रात्रौ रत्या संयुज्यन्ते ॥",
          "transliteration": "ahorātro vai prajāpatistasyāhareva prāṇo rātrireva rayiḥ prāṇaṃ vā ete praskandanti ye divā ratyā saṃyujyante brahmacaryameva tadyadrātrau ratyā saṃyujyante ||",
          "english": "Day and night are Prajapati. Day is life, night is matter."
        },
        {
          "id": "prashna.1.14",
          "sanskrit": "अन्नं वै प्रजापतिस्ततो ह वै तद्रेतस्तस्मादिमाः प्रजाः प्रजायन्त इति ॥",
          "transliteration": "annaṃ vai prajāpatistato ha vai tadretastasmādimāḥ prajāḥ prajāyanta iti ||",
          "english": "Food is Prajapati. From that comes seed, and from seed these beings are born."
        },
        {
          "id": "prashna.1.15",
          "sanskrit": "तद्ये ह वै तत् प्रजापतिव्रतं चरन्ति ते मिथुनमुत्पादयन्ते । तेषामेवैष ब्रह्मलोको येषां तपो ब्रह्मचर्यं येषु सत्यं प्रतिष्ठितम् ॥",
          "transliteration": "tadye ha vai tat prajāpativrataṃ caranti te mithunamutpādayante | teṣāmevaiṣa brahmaloko yeṣāṃ tapo brahmacaryaṃ yeṣu satyaṃ pratiṣṭhitam ||",
          "english": "Those who follow this rule produce offspring. The Brahmaloka belongs to those in whom truth is established."
        },
        {
          "id": "prashna.1.16",
          "sanskrit": "तेषामसौ विरजो ब्रह्मलोको न येषु जिह्ममनृतं न माया चेति ॥",
          "transliteration": "teṣāmasau virajo brahmaloko na yeṣu jihmamanṛtaṃ na māyā ceti ||",
          "english": "For them there is the spotless Brahmaloka, in whom there is no crookedness, falsehood, or deception."
        }
      ]
    },
    {
      "id": "2",
      "name": "Second Question",
      sanskritName: `द्वितीयः प्रश्नः`,
      "verses": [
        {
          "id": "prashna.2.1",
          "sanskrit": "अथ हैनं भार्गवो वैदर्भिः पप्रच्छ । भगवन् कत्येव देवाः प्रजां विधारयन्ते कतर एतत् प्रकाशयन्ते कः पुनरेषां वरिष्ठ इति ॥",
          "transliteration": "atha hainaṃ bhārgavo vaidarbhiḥ papraccha | bhagavan katyeva devāḥ prajāṃ vidhārayante katara etat prakāśayante kaḥ punareṣāṃ variṣṭha iti ||",
          "english": "Bhargava asked: \"How many gods sustain the body? Which ones illumine it? Who among them is the greatest?\""
        },
        {
          "id": "prashna.2.2",
          "sanskrit": "तस्मै स होवाचाकाशो ह वा एष देवो वायुरग्निरापः पृथिवी वाङ्मनश्चक्षुः श्रोत्रं च । ते प्रकाश्याभिवदन्ति वयमेतद्बाणमवष्टभ्य विधारयामः ॥",
          "transliteration": "tasmai sa hovācākāśo ha vā eṣa devo vāyuragnirāpaḥ pṛthivī vāṅmanaścakṣuḥ śrotraṃ ca | te prakāśyābhivadanti vayametadbāṇamavaṣṭabhya vidhārayāmaḥ ||",
          "english": "He replied: \"Space, air, fire, water, earth, speech, mind, eye, ear — these gods sustain this body.\""
        },
        {
          "id": "prashna.2.3",
          "sanskrit": "तान् वरिष्ठः प्राण उवाच । मा मोहमापद्यथ अहमेवैतत् पञ्चधाऽऽत्मानं प्रविभज्यैतद्बाणमवष्टभ्य विधारयामीति तेऽश्रद्दधाना बभूवुः ॥",
          "transliteration": "tān variṣṭhaḥ prāṇa uvāca | mā mohamāpadyatha ahamevaitat pañcadhā''tmānaṃ pravibhajyaitadbāṇamavaṣṭabhya vidhārayāmīti te'śraddadhānā babhūvuḥ ||",
          "english": "Prana said: \"Do not be deluded. I alone, dividing myself fivefold, sustain this body.\" But they did not believe."
        },
        {
          "id": "prashna.2.4",
          "sanskrit": "सोऽभिमानादूर्ध्वमुत्क्रामत इव तस्मिन्नुत्क्रामत्यथेतरे सर्व एवोत्क्रामन्ते तस्मिंश्च प्रतिष्ठमाने सर्व एव प्रतिष्ठन्ते । तद्यथा मक्षिका मधुकरराजानमुत्क्रामन्तं सर्व एवोत्क्रमन्ते तस्मिंष्च प्रतिष्ठमाने सर्व एव प्रातिष्टन्त एवं वाङ्मनष्चक्षुः श्रोत्रं च ते प्रीताः प्राणं स्तुन्वन्ति ॥",
          "transliteration": "so'bhimānādūrdhvamutkrāmata iva tasminnutkrāmatyathetare sarva evotkrāmante tasmiṃśca pratiṣṭhamāne sarva eva pratiṣṭhante | tadyathā makṣikā madhukararājānamutkrāmantaṃ sarva evotkramante tasmiṃṣca pratiṣṭhamāne sarva eva prātiṣṭanta evaṃ vāṅmanaṣcakṣuḥ śrotraṃ ca te prītāḥ prāṇaṃ stunvanti ||",
          "english": "Prana started to depart, and all the others rose with him. Just as bees rise when their queen rises, so speech, mind, eye, and ear — delighted — praised Prana."
        },
        {
          "id": "prashna.2.5",
          "sanskrit": "एषोऽग्निस्तपत्येष सूर्य एष पर्जन्यो मघवानेष वायुः । एष पृथिवी रयिर्देवः सदसच्चामृतं च यत् ॥",
          "transliteration": "eṣo'gnistapatyeṣa sūrya eṣa parjanyo maghavāneṣa vāyuḥ | eṣa pṛthivī rayirdevaḥ sadasaccāmṛtaṃ ca yat ||",
          "english": "He blazes as fire, shines as the sun, is the rain, Indra, air, earth, matter, the gods, being and non-being, and immortality."
        },
        {
          "id": "prashna.2.6",
          "sanskrit": "अरा इव रथनाभौ प्राणे सर्वं प्रतिष्ठितम् । ऋचो यजूँषि सामानि यज्ञः क्षत्रं ब्रह्म च ॥",
          "transliteration": "arā iva rathanābhau prāṇe sarvaṃ pratiṣṭhitam | ṛco yajū~ṣi sāmāni yajñaḥ kṣatraṃ brahma ca ||",
          "english": "As spokes in the hub of a wheel, all are established in Prana: the Vedas, sacrifice, and all orders of society."
        },
        {
          "id": "prashna.2.7",
          "sanskrit": "प्रजापतिश्चरसि गर्भे त्वमेव प्रतिजायसे । तुभ्यं प्राण प्रजास्त्विमा बलिं हरन्ति यः प्राणैः प्रतितिष्ठसि ॥",
          "transliteration": "prajāpatiścarasi garbhe tvameva pratijāyase | tubhyaṃ prāṇa prajāstvimā baliṃ haranti yaḥ prāṇaiḥ pratitiṣṭhasi ||",
          "english": "O Prana, as Prajapati you move in the womb and are born again. To you beings bring offerings."
        },
        {
          "id": "prashna.2.8",
          "sanskrit": "देवानामसि वह्नितमः पितॄणां प्रथमा स्वधा । ऋषीणां चरितं सत्यमथर्वाङ्गिरसामसि ॥",
          "transliteration": "devānāmasi vahnitamaḥ pitṝṇāṃ prathamā svadhā | ṛṣīṇāṃ caritaṃ satyamatharvāṅgirasāmasi ||",
          "english": "You are the supreme carrier for the gods, the first offering for the ancestors, the truth of the seers."
        },
        {
          "id": "prashna.2.9",
          "sanskrit": "इन्द्रस्त्वं प्राण तेजसा रुद्रोऽसि परिरक्षिता । त्वमन्तरिक्षे चरसि सूर्यस्त्वं ज्योतिषां पतिः ॥",
          "transliteration": "indrastvaṃ prāṇa tejasā rudro'si parirakṣitā | tvamantarikṣe carasi sūryastvaṃ jyotiṣāṃ patiḥ ||",
          "english": "You are Indra, Rudra by your radiance, the protector. You move in the sky; you are the sun, lord of lights."
        },
        {
          "id": "prashna.2.10",
          "sanskrit": "यदा त्वमभिवर्षस्यथेमाः प्राण ते प्रजाः । आनन्दरूपास्तिष्ठन्ति कामायान्नं भविष्यतीति ॥",
          "transliteration": "yadā tvamabhivarṣasyathemāḥ prāṇa te prajāḥ | ānandarūpāstiṣṭhanti kāmāyānnaṃ bhaviṣyatīti ||",
          "english": "When you pour down as rain, O Prana, these beings rejoice, thinking there will be food."
        },
        {
          "id": "prashna.2.11",
          "sanskrit": "व्रात्यस्त्वं प्राणैकर्षरत्ता विश्वस्य सत्पतिः । वयमाद्यस्य दातारः पिता त्वं मातरिश्व नः ॥",
          "transliteration": "vrātyastvaṃ prāṇaikarṣarattā viśvasya satpatiḥ | vayamādyasya dātāraḥ pitā tvaṃ mātariśva naḥ ||",
          "english": "O Prana, you are the sole seer, the true lord of all. You are our father, O Matarisva."
        },
        {
          "id": "prashna.2.12",
          "sanskrit": "या ते तनूर्वाचि प्रतिष्ठिता या श्रोत्रे या च चक्षुषि । या च मनसि सन्तता शिवां तां कुरु मोत्क्रमीः ॥",
          "transliteration": "yā te tanūrvāci pratiṣṭhitā yā śrotre yā ca cakṣuṣi | yā ca manasi santatā śivāṃ tāṃ kuru motkramīḥ ||",
          "english": "May that form of yours established in speech, ear, eye, and mind — make that auspicious, do not depart."
        },
        {
          "id": "prashna.2.13",
          "sanskrit": "प्राणस्येदं वशे सर्वं त्रिदिवे यत् प्रतिष्ठितम् । मातेव पुत्रान् रक्षस्व श्रीश्च प्रज्ञां च विधेहि न इति ॥",
          "transliteration": "prāṇasyedaṃ vaśe sarvaṃ tridive yat pratiṣṭhitam | māteva putrān rakṣasva śrīśca prajñāṃ ca vidhehi na iti ||",
          "english": "All this is under Prana's control. Protect us as a mother protects her sons. Grant us prosperity and wisdom."
        }
      ]
    },
    {
      "id": "3",
      "name": "Third Question",
      sanskritName: `तृतीयः प्रश्नः`,
      "verses": [
        {
          "id": "prashna.3.1",
          "sanskrit": "अथ हैनं कौशल्यश्चाश्वलायनः पप्रच्छ । भगवन् कुत एष प्राणो जायते कथमायात्यस्मिञ्शरीर आत्मानं वा प्रविभज्य कथं प्रतिष्ठते केनोत्क्रमते कथं बाह्यमभिधत्ते कथमध्यात्ममिति ॥",
          "transliteration": "atha hainaṃ kauśalyaścāśvalāyanaḥ papraccha | bhagavan kuta eṣa prāṇo jāyate kathamāyātyasmiñśarīra ātmānaṃ vā pravibhajya kathaṃ pratiṣṭhate kenotkramate kathaṃ bāhyamabhidhatte kathamadhyātmamiti ||",
          "english": "Kausalya asked: \"Lord, from where is this Prana born? How does it enter the body? How does it function? How does it depart?\""
        },
        {
          "id": "prashna.3.2",
          "sanskrit": "तस्मै स होवाचातिप्रश्नान् पृच्छसि ब्रह्मिष्ठोऽसीति तस्मात्तेऽहं ब्रवीमि ॥",
          "transliteration": "tasmai sa hovācātipraśnān pṛcchasi brahmiṣṭho'sīti tasmātte'haṃ bravīmi ||",
          "english": "He replied: \"You ask profound questions. Since you are the foremost in Brahman, I will tell you.\""
        },
        {
          "id": "prashna.3.3",
          "sanskrit": "आत्मन एष प्राणो जायते । यथैषा पुरुषे छायैतस्मिन्नेतदाततं मनोकृतेनायात्यस्मिञ्शरीरे ॥",
          "transliteration": "ātmana eṣa prāṇo jāyate | yathaiṣā puruṣe chāyaitasminnetadātataṃ manokṛtenāyātyasmiñśarīre ||",
          "english": "From the Self, Prana is born. Like a shadow cast by a person, it pervades the body, entering through mental action."
        },
        {
          "id": "prashna.3.4",
          "sanskrit": "यथा सम्रादेवाधिकृतान् विनियुङ्क्ते । एतन् ग्रामानोतान् ग्रामानधितिष्ठस्वेत्येवमेवैष प्राण इतरान् प्राणान् पृथक् पृथगेव सन्निधत्ते ॥",
          "transliteration": "yathā samrādevādhikṛtān viniyuṅkte | etan grāmānotān grāmānadhitiṣṭhasvetyevamevaiṣa prāṇa itarān prāṇān pṛthak pṛthageva sannidhatte ||",
          "english": "As a king appoints officials, so Prana appoints the other pranas in their respective places."
        },
        {
          "id": "prashna.3.5",
          "sanskrit": "पायूपस्थेऽपानं चक्षुःश्रोत्रे मुखनासिकाभ्यां प्राणः स्वयं प्रातिष्ठते मध्ये तु समानः । एष ह्येतद्धुतमन्नं समं नयति तस्मादेताः सप्तार्चिषो भवन्ति ॥",
          "transliteration": "pāyūpasthe'pānaṃ cakṣuḥśrotre mukhanāsikābhyāṃ prāṇaḥ svayaṃ prātiṣṭhate madhye tu samānaḥ | eṣa hyetaddhutamannaṃ samaṃ nayati tasmādetāḥ saptārciṣo bhavanti ||",
          "english": "Apana in the organ of excretion; Prana itself in the eye, ear, mouth, and nose; Samana in the middle, equally distributing food."
        },
        {
          "id": "prashna.3.6",
          "sanskrit": "हृदि ह्येष आत्मा । अत्रैतदेकशतं नाडीनां तासां शतं शतमेकैकस्या द्वासप्ततिर्द्वासप्ततिः प्रतिशाखानाडीसहस्राणि भवन्त्यासु व्यानश्चरति ॥",
          "transliteration": "hṛdi hyeṣa ātmā | atraitadekaśataṃ nāḍīnāṃ tāsāṃ śataṃ śatamekaikasyā dvāsaptatirdvāsaptatiḥ pratiśākhānāḍīsahasrāṇi bhavantyāsu vyānaścarati ||",
          "english": "This Self is in the heart. There are 101 arteries. Each divides into 100, each into 72,000 branches. Through these, Vyana circulates."
        },
        {
          "id": "prashna.3.7",
          "sanskrit": "अथैकयोर्ध्व उदानः पुण्येन पुण्यं लोकं नयति पापेन पापमुभाभ्यामेव मनुष्यलोकम् ॥",
          "transliteration": "athaikayordhva udānaḥ puṇyena puṇyaṃ lokaṃ nayati pāpena pāpamubhābhyāmeva manuṣyalokam ||",
          "english": "Udana leads upward — by good deeds to a good world, by evil to an evil world, by both to the human world."
        },
        {
          "id": "prashna.3.8",
          "sanskrit": "आदित्यो ह वै बाह्यः प्राण उदयत्येष ह्येनं चाक्षुषं प्राणमनुगृह्णानः । पृथिव्यां या देवता सैषा पुरुषस्य अपानमवष्टभ्यान्तरा यदाकाशः स समानो वायुर्व्यानः ॥",
          "transliteration": "ādityo ha vai bāhyaḥ prāṇa udayatyeṣa hyenaṃ cākṣuṣaṃ prāṇamanugṛhṇānaḥ | pṛthivyāṃ yā devatā saiṣā puruṣasya apānamavaṣṭabhyāntarā yadākāśaḥ sa samāno vāyurvyānaḥ ||",
          "english": "The sun is the external Prana. The earth deity supports the apana. The space between is samana; air is vyana."
        },
        {
          "id": "prashna.3.9",
          "sanskrit": "तेजो ह वा उदानस्तस्मादुपशान्ततेजाः । पुनर्भवमिन्द्रियैर्मनसि सम्पद्यमानैः ॥",
          "transliteration": "tejo ha vā udānastasmādupaśāntatejāḥ | punarbhavamindriyairmanasi sampadyamānaiḥ ||",
          "english": "Udana is fire. One whose fire is extinguished returns to birth with the senses absorbed in the mind."
        },
        {
          "id": "prashna.3.10",
          "sanskrit": "यच्चित्तस्तेनैष प्राणमायाति । प्राणस्तेजसा युक्तः सहात्मना तथासङ्कल्पितं लोकं नयति ॥",
          "transliteration": "yaccittastenaiṣa prāṇamāyāti | prāṇastejasā yuktaḥ sahātmanā tathāsaṅkalpitaṃ lokaṃ nayati ||",
          "english": "By whatever thought one dies, Prana, united with fire and the Self, leads to that world."
        },
        {
          "id": "prashna.3.11",
          "sanskrit": "य एवं विद्वान् प्राणं वेद न हास्य प्रजा हीयतेऽमृतो भवति तदेषः श्लोकः ॥",
          "transliteration": "ya evaṃ vidvān prāṇaṃ veda na hāsya prajā hīyate'mṛto bhavati tadeṣaḥ ślokaḥ ||",
          "english": "One who knows Prana thus — his offspring do not perish, and he becomes immortal."
        },
        {
          "id": "prashna.3.12",
          "sanskrit": "उत्पत्तिमायतिं स्थानं विभुत्वं चैव पञ्चधा । अध्यात्मं चैव प्राणस्य विज्ञायामृतमश्नुते विज्ञायामृतमश्नुत इति ॥",
          "transliteration": "utpattimāyatiṃ sthānaṃ vibhutvaṃ caiva pañcadhā | adhyātmaṃ caiva prāṇasya vijñāyāmṛtamaśnute vijñāyāmṛtamaśnuta iti ||",
          "english": "Knowing the origin, entry, function, fivefold nature, and inner nature of Prana, one attains immortality."
        }
      ]
    },
    {
      "id": "4",
      "name": "Fourth Question",
      sanskritName: `चतुर्थः प्रश्नः`,
      "verses": [
        {
          "id": "prashna.4.1",
          "sanskrit": "अथ हैनं सौर्यायणि गार्ग्यः पप्रच्छ । भगवन्नेतस्मिन् पुरुषे कानि स्वपन्ति कान्यस्मिञ्जाग्रति कतर एष देवः स्वप्नान् पश्यति कस्यैतत् सुखं भवति कस्मिन्नु सर्वे सम्प्रतिष्ठिता भवन्तीति ॥",
          "transliteration": "atha hainaṃ sauryāyaṇi gārgyaḥ papraccha | bhagavannetasmin puruṣe kāni svapanti kānyasmiñjāgrati katara eṣa devaḥ svapnān paśyati kasyaitat sukhaṃ bhavati kasminnu sarve sampratiṣṭhitā bhavantīti ||",
          "english": "Sauryayani asked: \"Lord, what sleeps in this person? What remains awake? Who sees dreams? In whom are all established?\""
        },
        {
          "id": "prashna.4.2",
          "sanskrit": "तस्मै स होवाच यथा गार्ग्य मरीचयोऽर्कस्यास्तं गच्छतः सर्वा एतस्मिंस्तेजोमण्डल एकीभवन्ति ताः पुनः पुनरुदयतः प्रचरन्त्येवं ह वै तत् सर्वं परे देवे मनस्येकीभवति तेन तर्ह्येष पुरुषो न शृणोति न पश्यति न जिघ्रति न रसयते न स्पृशते नाभिवदते नादत्ते नानन्दयते न विसृजते नेयायते स्वपितीत्याचक्षते ॥",
          "transliteration": "tasmai sa hovāca yathā gārgya marīcayo'rkasyāstaṃ gacchataḥ sarvā etasmiṃstejomaṇḍala ekībhavanti tāḥ punaḥ punarudayataḥ pracarantyevaṃ ha vai tat sarvaṃ pare deve manasyekībhavati tena tarhyeṣa puruṣo na śṛṇoti na paśyati na jighrati na rasayate na spṛśate nābhivadate nādatte nānandayate na visṛjate neyāyate svapitītyācakṣate ||",
          "english": "As all rays merge into the sun at sunset and emerge at sunrise, so all this merges in the supreme being — the mind. Then one does not hear, see, smell, taste, touch, speak, or enjoy. They say: \"He sleeps.\""
        },
        {
          "id": "prashna.4.3",
          "sanskrit": "प्राणाग्नय एवैतस्मिन् पुरे जाग्रति । गार्हपत्यो ह वा एषोऽपानो व्यानोऽन्वाहार्यपचनो यद्गार्हपत्यात् प्रणीयते प्रणयनादाहवनीयः प्राणः ॥",
          "transliteration": "prāṇāgnaya evaitasmin pure jāgrati | gārhapatyo ha vā eṣo'pāno vyāno'nvāhāryapacano yadgārhapatyāt praṇīyate praṇayanādāhavanīyaḥ prāṇaḥ ||",
          "english": "The prana-fires remain awake in this city. Apana is the Garhapatya fire; Vyana is the Anvaharya fire; Prana is the Ahavaniya fire."
        },
        {
          "id": "prashna.4.4",
          "sanskrit": "यदुच्छ्वासनिःश्वासावेतावाहुती समं नयतीति स समानः । मनो ह वाव यजमानः । इष्टफलमेवोदानः । स एनं यजमानमहरहर्ब्रह्म गमयति ॥",
          "transliteration": "yaducchvāsaniḥśvāsāvetāvāhutī samaṃ nayatīti sa samānaḥ | mano ha vāva yajamānaḥ | iṣṭaphalamevodānaḥ | sa enaṃ yajamānamaharaharbrahma gamayati ||",
          "english": "Inhalation and exhalation are oblations. Samana balances them. Mind is the sacrificer. Udana leads the sacrificer to Brahman daily."
        },
        {
          "id": "prashna.4.5",
          "sanskrit": "अत्रैष देवः स्वप्ने महिमानमनुभवति । यद्दृष्टं दृष्टमनुपश्यति श्रुतं श्रुतमेवार्थमनुशृणोति देशदिगन्तरैश्च प्रत्यनुभूतं पुनः पुनः प्रत्यनुभवति दृष्टं चादृष्टं च श्रुतं चाश्रुतं चानुभूतं चाननुभूतं च सच्चासच्च सर्वं पश्यति सर्वः पश्यति ॥",
          "transliteration": "atraiṣa devaḥ svapne mahimānamanubhavati | yaddṛṣṭaṃ dṛṣṭamanupaśyati śrutaṃ śrutamevārthamanuśṛṇoti deśadigantaraiśca pratyanubhūtaṃ punaḥ punaḥ pratyanubhavati dṛṣṭaṃ cādṛṣṭaṃ ca śrutaṃ cāśrutaṃ cānubhūtaṃ cānanubhūtaṃ ca saccāsacca sarvaṃ paśyati sarvaḥ paśyati ||",
          "english": "In the dream state, this being experiences glory. What has been seen and heard, what has been experienced in different lands and directions — all this he sees again. All is seen by him."
        },
        {
          "id": "prashna.4.6",
          "sanskrit": "स यदा तेजसाऽभिभूतो भवति । अत्रैष देवः स्वप्नान्न पश्यत्यथ यदैतस्मिञ्शरीर एतत्सुखं भवति ॥",
          "transliteration": "sa yadā tejasā'bhibhūto bhavati | atraiṣa devaḥ svapnānna paśyatyatha yadaitasmiñśarīra etatsukhaṃ bhavati ||",
          "english": "When overwhelmed by light, he sees no dreams. Then there is happiness in the body."
        },
        {
          "id": "prashna.4.7",
          "sanskrit": "स यथा सोभ्य वयांसि वसोवृक्षं सम्प्रतिष्ठन्ते । एवं ह वै तत् सर्वं पर आत्मनि सम्प्रतिष्ठते ॥",
          "transliteration": "sa yathā sobhya vayāṃsi vasovṛkṣaṃ sampratiṣṭhante | evaṃ ha vai tat sarvaṃ para ātmani sampratiṣṭhate ||",
          "english": "As birds settle on a tree, so all this settles in the supreme Self."
        },
        {
          "id": "prashna.4.8",
          "sanskrit": "पृथिवी च पृथिवीमात्रा चापश्चापोमात्रा च तेजश्च तेजोमात्रा च वायुश्च वायुमात्रा चाकाशश्चाकाशमात्रा च चक्षुश्च द्रष्टव्यं च श्रोत्रं च श्रोतव्यं च घ्राणं च घ्रातव्यं च रसश्च रसयितव्यं च त्वक्च स्पर्शयितव्यं च वाक्च वक्तव्यं च हस्तौ चादातव्यं चोपस्थश्चानन्दयितव्यं च पायुश्च विसर्जयितव्यं च यादौ च गन्तव्यं च मनश्च मन्तव्यं च बुद्धिश्च बोद्धव्यं चाहङ्कारश्चाहङ्कर्तव्यं च चित्तं च चेतयितव्यं च तेजश्च विद्योतयितव्यं च प्राणश्च विधारयितव्यं च ॥",
          "transliteration": "pṛthivī ca pṛthivīmātrā cāpaścāpomātrā ca tejaśca tejomātrā ca vāyuśca vāyumātrā cākāśaścākāśamātrā ca cakṣuśca draṣṭavyaṃ ca śrotraṃ ca śrotavyaṃ ca ghrāṇaṃ ca ghrātavyaṃ ca rasaśca rasayitavyaṃ ca tvakca sparśayitavyaṃ ca vākca vaktavyaṃ ca hastau cādātavyaṃ copasthaścānandayitavyaṃ ca pāyuśca visarjayitavyaṃ ca yādau ca gantavyaṃ ca manaśca mantavyaṃ ca buddhiśca boddhavyaṃ cāhaṅkāraścāhaṅkartavyaṃ ca cittaṃ ca cetayitavyaṃ ca tejaśca vidyotayitavyaṃ ca prāṇaśca vidhārayitavyaṃ ca ||",
          "english": "Earth and its essence, water and its essence, fire, air, space, eye and its objects, ear and its objects, nose and its objects, taste and its objects, skin and its objects, speech and its objects, hands, organ, anus, feet, mind, intellect, ego, consciousness, and Prana — all these are established."
        },
        {
          "id": "prashna.4.9",
          "sanskrit": "एष हि द्रष्टा स्प्रष्टा श्रोता घ्राता रसयिता मन्ता बोद्धा कर्ता विज्ञानात्मा पुरुषः । स परेऽक्षर आत्मनि सम्प्रतिष्ठते ॥",
          "transliteration": "eṣa hi draṣṭā spraṣṭā śrotā ghrātā rasayitā mantā boddhā kartā vijñānātmā puruṣaḥ | sa pare'kṣara ātmani sampratiṣṭhate ||",
          "english": "This is the seer, toucher, hearer, smeller, taster, thinker, knower, doer — the conscious Self, the Person. He is established in the supreme, imperishable Self."
        },
        {
          "id": "prashna.4.10",
          "sanskrit": "परमेवाक्षरं प्रतिपद्यते स यो ह वै तदच्छायमशरीरमलोहितं शुभ्रमक्षरं वेदयते यस्तु सोम्य । स सर्वज्ञः सर्वो भवति । तदेष श्लोकः ॥",
          "transliteration": "paramevākṣaraṃ pratipadyate sa yo ha vai tadacchāyamaśarīramalohitaṃ śubhramakṣaraṃ vedayate yastu somya | sa sarvajñaḥ sarvo bhavati | tadeṣa ślokaḥ ||",
          "english": "He attains the supreme imperishable who knows the shadowless, bodiless, colorless, pure, imperishable. He becomes all-knowing, all."
        },
        {
          "id": "prashna.4.11",
          "sanskrit": "विज्ञानात्मा सह देवैश्च सर्वैः प्राणा भूतानि सम्प्रतिष्ठन्ति यत्र तदक्षरं वेदयते यस्तु सोम्य स सर्वज्ञः सर्वमेवाविवेशेति ॥",
          "transliteration": "vijñānātmā saha devaiśca sarvaiḥ prāṇā bhūtāni sampratiṣṭhanti yatra tadakṣaraṃ vedayate yastu somya sa sarvajñaḥ sarvamevāviveśeti ||",
          "english": "The conscious Self, together with all gods, pranas, and beings, is established there. Knowing the imperishable, he becomes all-knowing and enters all."
        }
      ]
    },
    {
      "id": "5",
      "name": "Fifth Question",
      sanskritName: `पञ्चमः प्रश्नः`,
      "verses": [
        {
          "id": "prashna.5.1",
          "sanskrit": "अथ हैनं शैब्यः सत्यकामः पप्रच्छ । स यो ह वै तद्भगवन्मनुष्येषु प्रायणान्तमोङ्कारमभिध्यायीत । कतमं वाव स तेन लोकं जयतीति । तस्मै स होवाच ॥",
          "transliteration": "atha hainaṃ śaibyaḥ satyakāmaḥ papraccha | sa yo ha vai tadbhagavanmanuṣyeṣu prāyaṇāntamoṅkāramabhidhyāyīta | katamaṃ vāva sa tena lokaṃ jayatīti | tasmai sa hovāca ||",
          "english": "Saibya asked: \"Lord, if someone meditates on OM at death, what world does he attain?\""
        },
        {
          "id": "prashna.5.2",
          "sanskrit": "एतद्वै सत्यकाम परं चापरं च ब्रह्म यदोङ्कारः । तस्माद्विद्वानेतेनैवायतनेनैकतरमन्वेति ॥",
          "transliteration": "etadvai satyakāma paraṃ cāparaṃ ca brahma yadoṅkāraḥ | tasmādvidvānetenaivāyatanenaikataramanveti ||",
          "english": "This OM is both the supreme and the inferior Brahman. The wise one, by this support, attains one of them."
        },
        {
          "id": "prashna.5.3",
          "sanskrit": "स यद्येकमात्रमभिध्यायीत स तेनैव संवेदितस्तूर्णमेव जगत्यामभिसम्पद्यते । तमृचो मनुष्यलोकमुपनयन्ते स तत्र तपसा ब्रह्मचर्येण श्रद्धया सम्पन्नो महिमानमनुभवति ॥",
          "transliteration": "sa yadyekamātramabhidhyāyīta sa tenaiva saṃveditastūrṇameva jagatyāmabhisampadyate | tamṛco manuṣyalokamupanayante sa tatra tapasā brahmacaryeṇa śraddhayā sampanno mahimānamanubhavati ||",
          "english": "If he meditates on one matra, he is quickly reborn in the human world. The Rg verses lead him, and he experiences greatness."
        },
        {
          "id": "prashna.5.4",
          "sanskrit": "अथ यदि द्विमात्रेण मनसि सम्पद्यते सोऽन्तरिक्षं यजुर्भिरुन्नीयते सोमलोकम् । स सोमलोके विभुतिमनुभूय पुनरावर्तते ॥",
          "transliteration": "atha yadi dvimātreṇa manasi sampadyate so'ntarikṣaṃ yajurbhirunnīyate somalokam | sa somaloke vibhutimanubhūya punarāvartate ||",
          "english": "If he meditates on two matras, he reaches the sky and the lunar world. After experiencing glory there, he returns."
        },
        {
          "id": "prashna.5.5",
          "sanskrit": "यः पुनरेतं त्रिमात्रेणोमित्येतेनैवाक्षरेण परं पुरुषमभिध्यायीत स तेजसि सूर्ये सम्पन्नः । यथा पादोदरस्त्वचा विनिर्मुच्यत एवं ह वै स पाप्मना विनिर्मुक्तः स सामभिरुन्नीयते ब्रह्मलोकं स एतस्माज्जीवघनात् परात्परं पुरिशयं पुरुषमीक्षते ॥",
          "transliteration": "yaḥ punaretaṃ trimātreṇomityetenaivākṣareṇa paraṃ puruṣamabhidhyāyīta sa tejasi sūrye sampannaḥ | yathā pādodarastvacā vinirmucyata evaṃ ha vai sa pāpmanā vinirmuktaḥ sa sāmabhirunnīyate brahmalokaṃ sa etasmājjīvaghanāt parātparaṃ puriśayaṃ puruṣamīkṣate ||",
          "english": "He who meditates on three matras of OM attains the sun. Freed from sin as a snake sheds its skin, he is led by the Saman verses to the Brahmaloka, where he sees the Person beyond all."
        },
        {
          "id": "prashna.5.6",
          "sanskrit": "तिस्रो मात्रा मृत्युमत्यः प्रयुक्ता अन्योन्यसक्ताः अनविप्रयुक्ताः । क्रियासु बाह्याभ्यन्तरमध्यमासु सम्यक् प्रयुक्तासु न कम्पते ज्ञः ॥",
          "transliteration": "tisro mātrā mṛtyumatyaḥ prayuktā anyonyasaktāḥ anaviprayuktāḥ | kriyāsu bāhyābhyantaramadhyamāsu samyak prayuktāsu na kampate jñaḥ ||",
          "english": "The three matras, when rightly applied, are deathless. United, not separated, applied in external, internal, and middle actions, the knower does not tremble."
        },
        {
          "id": "prashna.5.7",
          "sanskrit": "ऋग्भिरेतं यजुर्भिरन्तरिक्षं सामभिर्यत् तत् कवयो वेदयन्ते । तमोङ्कारेणैवायतनेनान्वेति विद्वान् यत्तच्छान्तमजरममृतमभयं परं चेति ॥",
          "transliteration": "ṛgbhiretaṃ yajurbhirantarikṣaṃ sāmabhiryat tat kavayo vedayante | tamoṅkāreṇaivāyatanenānveti vidvān yattacchāntamajaramamṛtamabhayaṃ paraṃ ceti ||",
          "english": "Through Rg verses he attains this world, through Yajur verses the sky, through Saman verses what the poets know. By OM as support, the wise one attains the peaceful, ageless, immortal, fearless, supreme."
        }
      ]
    },
    {
      "id": "6",
      "name": "Sixth Question",
      sanskritName: `षष्ठः प्रश्नः`,
      "verses": [
        {
          "id": "prashna.6.1",
          "sanskrit": "अथ हैनं सुकेशा भारद्वाजः पप्रच्छ । भगवन् हिरण्यनाभः कौसल्यो राजपुत्रो मामुपेत्यैतं प्रश्नमपृच्छत । षोडशकलं भारद्वाज पुरुषं वेत्थ । तमहं कुमारमब्रुवं नाहमिमं वेद । यद्यहमिममवेदिषं कथं ते नावक्ष्यमिति । समूलो वा एष परिशुष्यति योऽनृतमभिवदति तस्मान्नार्हम्यनृतं वक्तुम् । स तूष्णीं रथमारुह्य प्रवव्राज । तं त्वा पृच्छामि क्वासौ पुरुष इति ॥",
          "transliteration": "atha hainaṃ sukeśā bhāradvājaḥ papraccha | bhagavan hiraṇyanābhaḥ kausalyo rājaputro māmupetyaitaṃ praśnamapṛcchata | ṣoḍaśakalaṃ bhāradvāja puruṣaṃ vettha | tamahaṃ kumāramabruvaṃ nāhamimaṃ veda | yadyahamimamavediṣaṃ kathaṃ te nāvakṣyamiti | samūlo vā eṣa pariśuṣyati yo'nṛtamabhivadati tasmānnārhamyanṛtaṃ vaktum | sa tūṣṇīṃ rathamāruhya pravavrāja | taṃ tvā pṛcchāmi kvāsau puruṣa iti ||",
          "english": "Sukesa asked: \"Lord, Hiranyanabha asked me about the 16-part Person. I told him I did not know. One who speaks falsehood withers like a root. So I ask you: where is that Person?\""
        },
        {
          "id": "prashna.6.2",
          "sanskrit": "तस्मै स होवाचेहैवान्तःशरीरे सोम्य स पुरुषो यस्मिन्नताः षोडशकलाः प्रभवन्तीति ॥",
          "transliteration": "tasmai sa hovācehaivāntaḥśarīre somya sa puruṣo yasminnatāḥ ṣoḍaśakalāḥ prabhavantīti ||",
          "english": "He replied: \"Within this body, dear, is the Person from whom these 16 parts arise.\""
        },
        {
          "id": "prashna.6.3",
          "sanskrit": "स ईक्षाचक्रे । कस्मिन्नहमुत्क्रान्त उत्क्रान्तो भविष्यामि कस्मिन्वा प्रतिष्ठिते प्रतिष्ठास्यामीति ॥",
          "transliteration": "sa īkṣācakre | kasminnahamutkrānta utkrānto bhaviṣyāmi kasminvā pratiṣṭhite pratiṣṭhāsyāmīti ||",
          "english": "He thought: \"On whose departure shall I depart? On whose establishment shall I be established?\""
        },
        {
          "id": "prashna.6.4",
          "sanskrit": "स प्राणमसृजत प्राणाच्छ्रद्धां खं वायुर्ज्योतिरापः पृथिवीन्द्रियं मनः । अन्नमन्नाद्वीर्यं तपो मन्त्राः कर्म लोका लोकेषु च नाम च ॥",
          "transliteration": "sa prāṇamasṛjata prāṇācchraddhāṃ khaṃ vāyurjyotirāpaḥ pṛthivīndriyaṃ manaḥ | annamannādvīryaṃ tapo mantrāḥ karma lokā lokeṣu ca nāma ca ||",
          "english": "He created Prana; from Prana, faith; then space, air, fire, water, earth, senses, mind, food, strength, austerity, mantras, action, worlds, and names."
        },
        {
          "id": "prashna.6.5",
          "sanskrit": "स यथेमा नद्यः स्यन्दमानाः समुद्रायणाः समुद्रं प्राप्यास्तं गच्छन्ति भिद्येते तासां नामरूपे समुद्र इत्येवं प्रोच्यते । एवमेवास्य परिद्रष्टुरिमाः षोडशकलाः पुरुषायणाः पुरुषं प्राप्यास्तं गच्छन्ति भिद्येते चासां नामरूपे पुरुष इत्येवं प्रोच्यते स एषोऽकलोऽमृतो भवति तदेष श्लोकः ॥",
          "transliteration": "sa yathemā nadyaḥ syandamānāḥ samudrāyaṇāḥ samudraṃ prāpyāstaṃ gacchanti bhidyete tāsāṃ nāmarūpe samudra ityevaṃ procyate | evamevāsya paridraṣṭurimāḥ ṣoḍaśakalāḥ puruṣāyaṇāḥ puruṣaṃ prāpyāstaṃ gacchanti bhidyete cāsāṃ nāmarūpe puruṣa ityevaṃ procyate sa eṣo'kalo'mṛto bhavati tadeṣa ślokaḥ ||",
          "english": "As flowing rivers merge into the ocean, losing their names and forms, so the 16 parts merge into the Person. He becomes partless and immortal."
        },
        {
          "id": "prashna.6.6",
          "sanskrit": "अरा इव रथनाभौ कला यस्मिन्प्रतिष्ठिताः । तं वेद्यं पुरुषं वेद यथ मा वो मृत्युः परिव्यथा इति ॥",
          "transliteration": "arā iva rathanābhau kalā yasminpratiṣṭhitāḥ | taṃ vedyaṃ puruṣaṃ veda yatha mā vo mṛtyuḥ parivyathā iti ||",
          "english": "As spokes in the hub, the parts are established in Him. Know that Person — so that death may not cause you pain."
        },
        {
          "id": "prashna.6.7",
          "sanskrit": "तान् होवाचैतावदेवाहमेतत् परं ब्रह्म वेद । नातः परमस्तीति ॥",
          "transliteration": "tān hovācaitāvadevāhametat paraṃ brahma veda | nātaḥ paramastīti ||",
          "english": "He said: \"I know this supreme Brahman only thus far. There is nothing beyond It.\""
        },
        {
          "id": "prashna.6.8",
          "sanskrit": "ते तमर्चयन्तस्त्वं हि नः पिता योऽस्माकमविद्यायाः परं पारं तारयसीति । नमः परमऋषिभ्यो नमः परमऋषिभ्यः ॥",
          "transliteration": "te tamarcayantastvaṃ hi naḥ pitā yo'smākamavidyāyāḥ paraṃ pāraṃ tārayasīti | namaḥ paramaṛṣibhyo namaḥ paramaṛṣibhyaḥ ||",
          "english": "They worshipped him: \"You are our father who carries us to the other shore of ignorance. Salutations to the supreme seers!\""
        }
      ]
    }
  ],
  "verses": [
    {
      "id": "prashna.1.1",
      "sanskrit": "सुकेशा च भारद्वाजः शैब्यश्च सत्यकामः सौर्यायणी च गार्ग्यः कौसल्यश्चाश्वलायनो भार्गवो वैदर्भिः कबन्धी कात्यायनस्ते हैते ब्रह्मपरा ब्रह्मनिष्ठाः परं ब्रह्मान्वेषमाणा एष ह वै तत्सर्वं वक्ष्यतीति ते ह समित्पाणयो भगवन्तं पिप्पलादमुपसन्नाः ॥",
      "transliteration": "sukeśā ca bhāradvājaḥ śaibyaśca satyakāmaḥ sauryāyaṇī ca gārgyaḥ kausalyaścāśvalāyano bhārgavo vaidarbhiḥ kabandhī kātyāyanaste haite brahmaparā brahmaniṣṭhāḥ paraṃ brahmānveṣamāṇā eṣa ha vai tatsarvaṃ vakṣyatīti te ha samitpāṇayo bhagavantaṃ pippalādamupasannāḥ ||",
      "english": "Sukesa, Saibya, Sauryayani, Kausalya, Bhargava, and Kabandhi — seekers of Brahman — approached the venerable Pippalada with firewood in hand."
    },
    {
      "id": "prashna.1.2",
      "sanskrit": "तान्ह स ऋषिरुवाच भूय एव तपसा ब्रह्मचर्येण श्रद्धया संवत्सरं संवत्स्यथ यथाकामं प्रश्नान् पृच्छत यदि विज्ञास्यामः सर्वं ह वो वक्ष्याम इति ॥",
      "transliteration": "tānha sa ṛṣiruvāca bhūya eva tapasā brahmacaryeṇa śraddhayā saṃvatsaraṃ saṃvatsyatha yathākāmaṃ praśnān pṛcchata yadi vijñāsyāmaḥ sarvaṃ ha vo vakṣyāma iti ||",
      "english": "The sage said: \"Live here for a year with austerity, celibacy, and faith. Then ask questions as you wish.\""
    },
    {
      "id": "prashna.1.3",
      "sanskrit": "अथ कबन्धी कात्यायन उपेत्य पप्रच्छ । भगवन् कुते ह वा इमाः प्रजाः प्रजायन्त इति ॥",
      "transliteration": "atha kabandhī kātyāyana upetya papraccha | bhagavan kute ha vā imāḥ prajāḥ prajāyanta iti ||",
      "english": "Kabandhi asked: \"Lord, from where are these beings born?\""
    },
    {
      "id": "prashna.1.4",
      "sanskrit": "तस्मै स होवाच प्रजाकामो वै प्रजापतिः स तपोऽतप्यत स तपस्तप्त्वा स मिथुनमुत्पादयते । रयिं च प्राणं चेत्येतौ मे बहुधा प्रजाः करिष्यत इति ॥",
      "transliteration": "tasmai sa hovāca prajākāmo vai prajāpatiḥ sa tapo'tapyata sa tapastaptvā sa mithunamutpādayate | rayiṃ ca prāṇaṃ cetyetau me bahudhā prajāḥ kariṣyata iti ||",
      "english": "He replied: \"Prajapati, desiring offspring, performed austerity and created a pair: Rayi (matter) and Prana (life).\""
    },
    {
      "id": "prashna.1.5",
      "sanskrit": "आदित्यो ह वै प्राणो रयिरेव चन्द्रमा रयिर्वा एतत् सर्वं यन्मूर्तं चामूर्तं च तस्मान्मूर्तिरेव रयिः ॥",
      "transliteration": "ādityo ha vai prāṇo rayireva candramā rayirvā etat sarvaṃ yanmūrtaṃ cāmūrtaṃ ca tasmānmūrtireva rayiḥ ||",
      "english": "The sun is Prana; the moon is matter. All that is formed and formless is matter."
    },
    {
      "id": "prashna.1.6",
      "sanskrit": "अथादित्य उदयन्यत्प्राचीं दिशं प्रविशति तेन प्राच्यान् प्राणान् रश्मिषु सन्निधत्ते । यद्दक्षिणं यत् प्रतीचीं यदुदीचीं यदधो यदूर्ध्वं यदन्तरा दिशो यत् सर्वं प्रकाशयति तेन सर्वान् प्राणान् रश्मिषु सन्निधत्ते ॥",
      "transliteration": "athāditya udayanyatprācīṃ diśaṃ praviśati tena prācyān prāṇān raśmiṣu sannidhatte | yaddakṣiṇaṃ yat pratīcīṃ yadudīcīṃ yadadho yadūrdhvaṃ yadantarā diśo yat sarvaṃ prakāśayati tena sarvān prāṇān raśmiṣu sannidhatte ||",
      "english": "The rising sun enters all directions and gathers the life-forces in his rays."
    },
    {
      "id": "prashna.1.7",
      "sanskrit": "स एष वैश्वानरो विश्वरूपः प्राणोऽग्निरुदयते । तदेतदृचाऽभ्युक्तम् ॥",
      "transliteration": "sa eṣa vaiśvānaro viśvarūpaḥ prāṇo'gnirudayate | tadetadṛcā'bhyuktam ||",
      "english": "This Vaishvanara, assuming all forms, rises as life-fire."
    },
    {
      "id": "prashna.1.8",
      "sanskrit": "विश्वरूपं हरिणं जातवेदसं परायणं ज्योतिरेकं तपन्तम् । सहस्ररश्मिः शतधा वर्तमानः प्राणः प्रजानामुदयत्येष सूर्यः ॥",
      "transliteration": "viśvarūpaṃ hariṇaṃ jātavedasaṃ parāyaṇaṃ jyotirekaṃ tapantam | sahasraraśmiḥ śatadhā vartamānaḥ prāṇaḥ prajānāmudayatyeṣa sūryaḥ ||",
      "english": "The thousand-rayed, hundred-circuited sun rises as the life of all beings."
    },
    {
      "id": "prashna.1.9",
      "sanskrit": "संवत्सरो वै प्रजापतिस्तस्यायने दक्षिणं चोत्तरं च । तद्ये ह वै तदिष्टापूर्ते कृतमित्युपासते ते चान्द्रमसमेव लोकमभिजयन्ते । त एव पुनरावर्तन्ते तस्मादेत ऋषयः प्रजाकामा दक्षिणं प्रतिपद्यन्ते । एष ह वै रयिर्यः पितृयाणः ॥",
      "transliteration": "saṃvatsaro vai prajāpatistasyāyane dakṣiṇaṃ cottaraṃ ca | tadye ha vai tadiṣṭāpūrte kṛtamityupāsate te cāndramasameva lokamabhijayante | ta eva punarāvartante tasmādeta ṛṣayaḥ prajākāmā dakṣiṇaṃ pratipadyante | eṣa ha vai rayiryaḥ pitṛyāṇaḥ ||",
      "english": "The year is Prajapati with two paths. Those who worship actions gain the lunar world and return. The southern path is the path of the fathers."
    },
    {
      "id": "prashna.1.10",
      "sanskrit": "अथोत्तरेण तपसा ब्रह्मचर्येण श्रद्धया विद्ययाऽऽत्मानमन्विष्यादित्यमभिजयन्ते । एतद्वै प्राणानामायतनमेतदमृतमभयमेतत् परायणमेतस्मान्न पुनरावर्तन्त इत्य् एष निरोधस्तदेष श्लोकः ॥",
      "transliteration": "athottareṇa tapasā brahmacaryeṇa śraddhayā vidyayā''tmānamanviṣyādityamabhijayante | etadvai prāṇānāmāyatanametadamṛtamabhayametat parāyaṇametasmānna punarāvartanta ity eṣa nirodhastadeṣa ślokaḥ ||",
      "english": "By the northern path, through austerity and knowledge, they seek the Self and attain the sun — the immortal, fearless, supreme goal. From there they do not return."
    },
    {
      "id": "prashna.1.11",
      "sanskrit": "पञ्चपादं पितरं द्वादशाकृतिं दिव आहुः परे अर्धे पुरीषिणम् । अथेमे अन्य उ परे विचक्षणं सप्तचक्रे षडर आहुरर्पितमिति ॥",
      "transliteration": "pañcapādaṃ pitaraṃ dvādaśākṛtiṃ diva āhuḥ pare ardhe purīṣiṇam | atheme anya u pare vicakṣaṇaṃ saptacakre ṣaḍara āhurarpitamiti ||",
      "english": "They speak of the five-footed father in the eastern sky, and the wise one of seven wheels and six spokes in the other half."
    },
    {
      "id": "prashna.1.12",
      "sanskrit": "मासो वै प्रजापतिस्तस्य कृष्णपक्ष एव रयिः शुक्लः प्रणस्तस्मादेत ऋषयः शुक्ल इष्टं कुर्वन्तीतर इतरस्मिन् ॥",
      "transliteration": "māso vai prajāpatistasya kṛṣṇapakṣa eva rayiḥ śuklaḥ praṇastasmādeta ṛṣayaḥ śukla iṣṭaṃ kurvantītara itarasmin ||",
      "english": "The month is Prajapati. Its dark half is matter, its bright half is life."
    },
    {
      "id": "prashna.1.13",
      "sanskrit": "अहोरात्रो वै प्रजापतिस्तस्याहरेव प्राणो रात्रिरेव रयिः प्राणं वा एते प्रस्कन्दन्ति ये दिवा रत्या संयुज्यन्ते ब्रह्मचर्यमेव तद्यद्रात्रौ रत्या संयुज्यन्ते ॥",
      "transliteration": "ahorātro vai prajāpatistasyāhareva prāṇo rātrireva rayiḥ prāṇaṃ vā ete praskandanti ye divā ratyā saṃyujyante brahmacaryameva tadyadrātrau ratyā saṃyujyante ||",
      "english": "Day and night are Prajapati. Day is life, night is matter."
    },
    {
      "id": "prashna.1.14",
      "sanskrit": "अन्नं वै प्रजापतिस्ततो ह वै तद्रेतस्तस्मादिमाः प्रजाः प्रजायन्त इति ॥",
      "transliteration": "annaṃ vai prajāpatistato ha vai tadretastasmādimāḥ prajāḥ prajāyanta iti ||",
      "english": "Food is Prajapati. From that comes seed, and from seed these beings are born."
    },
    {
      "id": "prashna.1.15",
      "sanskrit": "तद्ये ह वै तत् प्रजापतिव्रतं चरन्ति ते मिथुनमुत्पादयन्ते । तेषामेवैष ब्रह्मलोको येषां तपो ब्रह्मचर्यं येषु सत्यं प्रतिष्ठितम् ॥",
      "transliteration": "tadye ha vai tat prajāpativrataṃ caranti te mithunamutpādayante | teṣāmevaiṣa brahmaloko yeṣāṃ tapo brahmacaryaṃ yeṣu satyaṃ pratiṣṭhitam ||",
      "english": "Those who follow this rule produce offspring. The Brahmaloka belongs to those in whom truth is established."
    },
    {
      "id": "prashna.1.16",
      "sanskrit": "तेषामसौ विरजो ब्रह्मलोको न येषु जिह्ममनृतं न माया चेति ॥",
      "transliteration": "teṣāmasau virajo brahmaloko na yeṣu jihmamanṛtaṃ na māyā ceti ||",
      "english": "For them there is the spotless Brahmaloka, in whom there is no crookedness, falsehood, or deception."
    },
    {
      "id": "prashna.2.1",
      "sanskrit": "अथ हैनं भार्गवो वैदर्भिः पप्रच्छ । भगवन् कत्येव देवाः प्रजां विधारयन्ते कतर एतत् प्रकाशयन्ते कः पुनरेषां वरिष्ठ इति ॥",
      "transliteration": "atha hainaṃ bhārgavo vaidarbhiḥ papraccha | bhagavan katyeva devāḥ prajāṃ vidhārayante katara etat prakāśayante kaḥ punareṣāṃ variṣṭha iti ||",
      "english": "Bhargava asked: \"How many gods sustain the body? Which ones illumine it? Who among them is the greatest?\""
    },
    {
      "id": "prashna.2.2",
      "sanskrit": "तस्मै स होवाचाकाशो ह वा एष देवो वायुरग्निरापः पृथिवी वाङ्मनश्चक्षुः श्रोत्रं च । ते प्रकाश्याभिवदन्ति वयमेतद्बाणमवष्टभ्य विधारयामः ॥",
      "transliteration": "tasmai sa hovācākāśo ha vā eṣa devo vāyuragnirāpaḥ pṛthivī vāṅmanaścakṣuḥ śrotraṃ ca | te prakāśyābhivadanti vayametadbāṇamavaṣṭabhya vidhārayāmaḥ ||",
      "english": "He replied: \"Space, air, fire, water, earth, speech, mind, eye, ear — these gods sustain this body.\""
    },
    {
      "id": "prashna.2.3",
      "sanskrit": "तान् वरिष्ठः प्राण उवाच । मा मोहमापद्यथ अहमेवैतत् पञ्चधाऽऽत्मानं प्रविभज्यैतद्बाणमवष्टभ्य विधारयामीति तेऽश्रद्दधाना बभूवुः ॥",
      "transliteration": "tān variṣṭhaḥ prāṇa uvāca | mā mohamāpadyatha ahamevaitat pañcadhā''tmānaṃ pravibhajyaitadbāṇamavaṣṭabhya vidhārayāmīti te'śraddadhānā babhūvuḥ ||",
      "english": "Prana said: \"Do not be deluded. I alone, dividing myself fivefold, sustain this body.\" But they did not believe."
    },
    {
      "id": "prashna.2.4",
      "sanskrit": "सोऽभिमानादूर्ध्वमुत्क्रामत इव तस्मिन्नुत्क्रामत्यथेतरे सर्व एवोत्क्रामन्ते तस्मिंश्च प्रतिष्ठमाने सर्व एव प्रतिष्ठन्ते । तद्यथा मक्षिका मधुकरराजानमुत्क्रामन्तं सर्व एवोत्क्रमन्ते तस्मिंष्च प्रतिष्ठमाने सर्व एव प्रातिष्टन्त एवं वाङ्मनष्चक्षुः श्रोत्रं च ते प्रीताः प्राणं स्तुन्वन्ति ॥",
      "transliteration": "so'bhimānādūrdhvamutkrāmata iva tasminnutkrāmatyathetare sarva evotkrāmante tasmiṃśca pratiṣṭhamāne sarva eva pratiṣṭhante | tadyathā makṣikā madhukararājānamutkrāmantaṃ sarva evotkramante tasmiṃṣca pratiṣṭhamāne sarva eva prātiṣṭanta evaṃ vāṅmanaṣcakṣuḥ śrotraṃ ca te prītāḥ prāṇaṃ stunvanti ||",
      "english": "Prana started to depart, and all the others rose with him. Just as bees rise when their queen rises, so speech, mind, eye, and ear — delighted — praised Prana."
    },
    {
      "id": "prashna.2.5",
      "sanskrit": "एषोऽग्निस्तपत्येष सूर्य एष पर्जन्यो मघवानेष वायुः । एष पृथिवी रयिर्देवः सदसच्चामृतं च यत् ॥",
      "transliteration": "eṣo'gnistapatyeṣa sūrya eṣa parjanyo maghavāneṣa vāyuḥ | eṣa pṛthivī rayirdevaḥ sadasaccāmṛtaṃ ca yat ||",
      "english": "He blazes as fire, shines as the sun, is the rain, Indra, air, earth, matter, the gods, being and non-being, and immortality."
    },
    {
      "id": "prashna.2.6",
      "sanskrit": "अरा इव रथनाभौ प्राणे सर्वं प्रतिष्ठितम् । ऋचो यजूँषि सामानि यज्ञः क्षत्रं ब्रह्म च ॥",
      "transliteration": "arā iva rathanābhau prāṇe sarvaṃ pratiṣṭhitam | ṛco yajū~ṣi sāmāni yajñaḥ kṣatraṃ brahma ca ||",
      "english": "As spokes in the hub of a wheel, all are established in Prana: the Vedas, sacrifice, and all orders of society."
    },
    {
      "id": "prashna.2.7",
      "sanskrit": "प्रजापतिश्चरसि गर्भे त्वमेव प्रतिजायसे । तुभ्यं प्राण प्रजास्त्विमा बलिं हरन्ति यः प्राणैः प्रतितिष्ठसि ॥",
      "transliteration": "prajāpatiścarasi garbhe tvameva pratijāyase | tubhyaṃ prāṇa prajāstvimā baliṃ haranti yaḥ prāṇaiḥ pratitiṣṭhasi ||",
      "english": "O Prana, as Prajapati you move in the womb and are born again. To you beings bring offerings."
    },
    {
      "id": "prashna.2.8",
      "sanskrit": "देवानामसि वह्नितमः पितॄणां प्रथमा स्वधा । ऋषीणां चरितं सत्यमथर्वाङ्गिरसामसि ॥",
      "transliteration": "devānāmasi vahnitamaḥ pitṝṇāṃ prathamā svadhā | ṛṣīṇāṃ caritaṃ satyamatharvāṅgirasāmasi ||",
      "english": "You are the supreme carrier for the gods, the first offering for the ancestors, the truth of the seers."
    },
    {
      "id": "prashna.2.9",
      "sanskrit": "इन्द्रस्त्वं प्राण तेजसा रुद्रोऽसि परिरक्षिता । त्वमन्तरिक्षे चरसि सूर्यस्त्वं ज्योतिषां पतिः ॥",
      "transliteration": "indrastvaṃ prāṇa tejasā rudro'si parirakṣitā | tvamantarikṣe carasi sūryastvaṃ jyotiṣāṃ patiḥ ||",
      "english": "You are Indra, Rudra by your radiance, the protector. You move in the sky; you are the sun, lord of lights."
    },
    {
      "id": "prashna.2.10",
      "sanskrit": "यदा त्वमभिवर्षस्यथेमाः प्राण ते प्रजाः । आनन्दरूपास्तिष्ठन्ति कामायान्नं भविष्यतीति ॥",
      "transliteration": "yadā tvamabhivarṣasyathemāḥ prāṇa te prajāḥ | ānandarūpāstiṣṭhanti kāmāyānnaṃ bhaviṣyatīti ||",
      "english": "When you pour down as rain, O Prana, these beings rejoice, thinking there will be food."
    },
    {
      "id": "prashna.2.11",
      "sanskrit": "व्रात्यस्त्वं प्राणैकर्षरत्ता विश्वस्य सत्पतिः । वयमाद्यस्य दातारः पिता त्वं मातरिश्व नः ॥",
      "transliteration": "vrātyastvaṃ prāṇaikarṣarattā viśvasya satpatiḥ | vayamādyasya dātāraḥ pitā tvaṃ mātariśva naḥ ||",
      "english": "O Prana, you are the sole seer, the true lord of all. You are our father, O Matarisva."
    },
    {
      "id": "prashna.2.12",
      "sanskrit": "या ते तनूर्वाचि प्रतिष्ठिता या श्रोत्रे या च चक्षुषि । या च मनसि सन्तता शिवां तां कुरु मोत्क्रमीः ॥",
      "transliteration": "yā te tanūrvāci pratiṣṭhitā yā śrotre yā ca cakṣuṣi | yā ca manasi santatā śivāṃ tāṃ kuru motkramīḥ ||",
      "english": "May that form of yours established in speech, ear, eye, and mind — make that auspicious, do not depart."
    },
    {
      "id": "prashna.2.13",
      "sanskrit": "प्राणस्येदं वशे सर्वं त्रिदिवे यत् प्रतिष्ठितम् । मातेव पुत्रान् रक्षस्व श्रीश्च प्रज्ञां च विधेहि न इति ॥",
      "transliteration": "prāṇasyedaṃ vaśe sarvaṃ tridive yat pratiṣṭhitam | māteva putrān rakṣasva śrīśca prajñāṃ ca vidhehi na iti ||",
      "english": "All this is under Prana's control. Protect us as a mother protects her sons. Grant us prosperity and wisdom."
    },
    {
      "id": "prashna.3.1",
      "sanskrit": "अथ हैनं कौशल्यश्चाश्वलायनः पप्रच्छ । भगवन् कुत एष प्राणो जायते कथमायात्यस्मिञ्शरीर आत्मानं वा प्रविभज्य कथं प्रतिष्ठते केनोत्क्रमते कथं बाह्यमभिधत्ते कथमध्यात्ममिति ॥",
      "transliteration": "atha hainaṃ kauśalyaścāśvalāyanaḥ papraccha | bhagavan kuta eṣa prāṇo jāyate kathamāyātyasmiñśarīra ātmānaṃ vā pravibhajya kathaṃ pratiṣṭhate kenotkramate kathaṃ bāhyamabhidhatte kathamadhyātmamiti ||",
      "english": "Kausalya asked: \"Lord, from where is this Prana born? How does it enter the body? How does it function? How does it depart?\""
    },
    {
      "id": "prashna.3.2",
      "sanskrit": "तस्मै स होवाचातिप्रश्नान् पृच्छसि ब्रह्मिष्ठोऽसीति तस्मात्तेऽहं ब्रवीमि ॥",
      "transliteration": "tasmai sa hovācātipraśnān pṛcchasi brahmiṣṭho'sīti tasmātte'haṃ bravīmi ||",
      "english": "He replied: \"You ask profound questions. Since you are the foremost in Brahman, I will tell you.\""
    },
    {
      "id": "prashna.3.3",
      "sanskrit": "आत्मन एष प्राणो जायते । यथैषा पुरुषे छायैतस्मिन्नेतदाततं मनोकृतेनायात्यस्मिञ्शरीरे ॥",
      "transliteration": "ātmana eṣa prāṇo jāyate | yathaiṣā puruṣe chāyaitasminnetadātataṃ manokṛtenāyātyasmiñśarīre ||",
      "english": "From the Self, Prana is born. Like a shadow cast by a person, it pervades the body, entering through mental action."
    },
    {
      "id": "prashna.3.4",
      "sanskrit": "यथा सम्रादेवाधिकृतान् विनियुङ्क्ते । एतन् ग्रामानोतान् ग्रामानधितिष्ठस्वेत्येवमेवैष प्राण इतरान् प्राणान् पृथक् पृथगेव सन्निधत्ते ॥",
      "transliteration": "yathā samrādevādhikṛtān viniyuṅkte | etan grāmānotān grāmānadhitiṣṭhasvetyevamevaiṣa prāṇa itarān prāṇān pṛthak pṛthageva sannidhatte ||",
      "english": "As a king appoints officials, so Prana appoints the other pranas in their respective places."
    },
    {
      "id": "prashna.3.5",
      "sanskrit": "पायूपस्थेऽपानं चक्षुःश्रोत्रे मुखनासिकाभ्यां प्राणः स्वयं प्रातिष्ठते मध्ये तु समानः । एष ह्येतद्धुतमन्नं समं नयति तस्मादेताः सप्तार्चिषो भवन्ति ॥",
      "transliteration": "pāyūpasthe'pānaṃ cakṣuḥśrotre mukhanāsikābhyāṃ prāṇaḥ svayaṃ prātiṣṭhate madhye tu samānaḥ | eṣa hyetaddhutamannaṃ samaṃ nayati tasmādetāḥ saptārciṣo bhavanti ||",
      "english": "Apana in the organ of excretion; Prana itself in the eye, ear, mouth, and nose; Samana in the middle, equally distributing food."
    },
    {
      "id": "prashna.3.6",
      "sanskrit": "हृदि ह्येष आत्मा । अत्रैतदेकशतं नाडीनां तासां शतं शतमेकैकस्या द्वासप्ततिर्द्वासप्ततिः प्रतिशाखानाडीसहस्राणि भवन्त्यासु व्यानश्चरति ॥",
      "transliteration": "hṛdi hyeṣa ātmā | atraitadekaśataṃ nāḍīnāṃ tāsāṃ śataṃ śatamekaikasyā dvāsaptatirdvāsaptatiḥ pratiśākhānāḍīsahasrāṇi bhavantyāsu vyānaścarati ||",
      "english": "This Self is in the heart. There are 101 arteries. Each divides into 100, each into 72,000 branches. Through these, Vyana circulates."
    },
    {
      "id": "prashna.3.7",
      "sanskrit": "अथैकयोर्ध्व उदानः पुण्येन पुण्यं लोकं नयति पापेन पापमुभाभ्यामेव मनुष्यलोकम् ॥",
      "transliteration": "athaikayordhva udānaḥ puṇyena puṇyaṃ lokaṃ nayati pāpena pāpamubhābhyāmeva manuṣyalokam ||",
      "english": "Udana leads upward — by good deeds to a good world, by evil to an evil world, by both to the human world."
    },
    {
      "id": "prashna.3.8",
      "sanskrit": "आदित्यो ह वै बाह्यः प्राण उदयत्येष ह्येनं चाक्षुषं प्राणमनुगृह्णानः । पृथिव्यां या देवता सैषा पुरुषस्य अपानमवष्टभ्यान्तरा यदाकाशः स समानो वायुर्व्यानः ॥",
      "transliteration": "ādityo ha vai bāhyaḥ prāṇa udayatyeṣa hyenaṃ cākṣuṣaṃ prāṇamanugṛhṇānaḥ | pṛthivyāṃ yā devatā saiṣā puruṣasya apānamavaṣṭabhyāntarā yadākāśaḥ sa samāno vāyurvyānaḥ ||",
      "english": "The sun is the external Prana. The earth deity supports the apana. The space between is samana; air is vyana."
    },
    {
      "id": "prashna.3.9",
      "sanskrit": "तेजो ह वा उदानस्तस्मादुपशान्ततेजाः । पुनर्भवमिन्द्रियैर्मनसि सम्पद्यमानैः ॥",
      "transliteration": "tejo ha vā udānastasmādupaśāntatejāḥ | punarbhavamindriyairmanasi sampadyamānaiḥ ||",
      "english": "Udana is fire. One whose fire is extinguished returns to birth with the senses absorbed in the mind."
    },
    {
      "id": "prashna.3.10",
      "sanskrit": "यच्चित्तस्तेनैष प्राणमायाति । प्राणस्तेजसा युक्तः सहात्मना तथासङ्कल्पितं लोकं नयति ॥",
      "transliteration": "yaccittastenaiṣa prāṇamāyāti | prāṇastejasā yuktaḥ sahātmanā tathāsaṅkalpitaṃ lokaṃ nayati ||",
      "english": "By whatever thought one dies, Prana, united with fire and the Self, leads to that world."
    },
    {
      "id": "prashna.3.11",
      "sanskrit": "य एवं विद्वान् प्राणं वेद न हास्य प्रजा हीयतेऽमृतो भवति तदेषः श्लोकः ॥",
      "transliteration": "ya evaṃ vidvān prāṇaṃ veda na hāsya prajā hīyate'mṛto bhavati tadeṣaḥ ślokaḥ ||",
      "english": "One who knows Prana thus — his offspring do not perish, and he becomes immortal."
    },
    {
      "id": "prashna.3.12",
      "sanskrit": "उत्पत्तिमायतिं स्थानं विभुत्वं चैव पञ्चधा । अध्यात्मं चैव प्राणस्य विज्ञायामृतमश्नुते विज्ञायामृतमश्नुत इति ॥",
      "transliteration": "utpattimāyatiṃ sthānaṃ vibhutvaṃ caiva pañcadhā | adhyātmaṃ caiva prāṇasya vijñāyāmṛtamaśnute vijñāyāmṛtamaśnuta iti ||",
      "english": "Knowing the origin, entry, function, fivefold nature, and inner nature of Prana, one attains immortality."
    },
    {
      "id": "prashna.4.1",
      "sanskrit": "अथ हैनं सौर्यायणि गार्ग्यः पप्रच्छ । भगवन्नेतस्मिन् पुरुषे कानि स्वपन्ति कान्यस्मिञ्जाग्रति कतर एष देवः स्वप्नान् पश्यति कस्यैतत् सुखं भवति कस्मिन्नु सर्वे सम्प्रतिष्ठिता भवन्तीति ॥",
      "transliteration": "atha hainaṃ sauryāyaṇi gārgyaḥ papraccha | bhagavannetasmin puruṣe kāni svapanti kānyasmiñjāgrati katara eṣa devaḥ svapnān paśyati kasyaitat sukhaṃ bhavati kasminnu sarve sampratiṣṭhitā bhavantīti ||",
      "english": "Sauryayani asked: \"Lord, what sleeps in this person? What remains awake? Who sees dreams? In whom are all established?\""
    },
    {
      "id": "prashna.4.2",
      "sanskrit": "तस्मै स होवाच यथा गार्ग्य मरीचयोऽर्कस्यास्तं गच्छतः सर्वा एतस्मिंस्तेजोमण्डल एकीभवन्ति ताः पुनः पुनरुदयतः प्रचरन्त्येवं ह वै तत् सर्वं परे देवे मनस्येकीभवति तेन तर्ह्येष पुरुषो न शृणोति न पश्यति न जिघ्रति न रसयते न स्पृशते नाभिवदते नादत्ते नानन्दयते न विसृजते नेयायते स्वपितीत्याचक्षते ॥",
      "transliteration": "tasmai sa hovāca yathā gārgya marīcayo'rkasyāstaṃ gacchataḥ sarvā etasmiṃstejomaṇḍala ekībhavanti tāḥ punaḥ punarudayataḥ pracarantyevaṃ ha vai tat sarvaṃ pare deve manasyekībhavati tena tarhyeṣa puruṣo na śṛṇoti na paśyati na jighrati na rasayate na spṛśate nābhivadate nādatte nānandayate na visṛjate neyāyate svapitītyācakṣate ||",
      "english": "As all rays merge into the sun at sunset and emerge at sunrise, so all this merges in the supreme being — the mind. Then one does not hear, see, smell, taste, touch, speak, or enjoy. They say: \"He sleeps.\""
    },
    {
      "id": "prashna.4.3",
      "sanskrit": "प्राणाग्नय एवैतस्मिन् पुरे जाग्रति । गार्हपत्यो ह वा एषोऽपानो व्यानोऽन्वाहार्यपचनो यद्गार्हपत्यात् प्रणीयते प्रणयनादाहवनीयः प्राणः ॥",
      "transliteration": "prāṇāgnaya evaitasmin pure jāgrati | gārhapatyo ha vā eṣo'pāno vyāno'nvāhāryapacano yadgārhapatyāt praṇīyate praṇayanādāhavanīyaḥ prāṇaḥ ||",
      "english": "The prana-fires remain awake in this city. Apana is the Garhapatya fire; Vyana is the Anvaharya fire; Prana is the Ahavaniya fire."
    },
    {
      "id": "prashna.4.4",
      "sanskrit": "यदुच्छ्वासनिःश्वासावेतावाहुती समं नयतीति स समानः । मनो ह वाव यजमानः । इष्टफलमेवोदानः । स एनं यजमानमहरहर्ब्रह्म गमयति ॥",
      "transliteration": "yaducchvāsaniḥśvāsāvetāvāhutī samaṃ nayatīti sa samānaḥ | mano ha vāva yajamānaḥ | iṣṭaphalamevodānaḥ | sa enaṃ yajamānamaharaharbrahma gamayati ||",
      "english": "Inhalation and exhalation are oblations. Samana balances them. Mind is the sacrificer. Udana leads the sacrificer to Brahman daily."
    },
    {
      "id": "prashna.4.5",
      "sanskrit": "अत्रैष देवः स्वप्ने महिमानमनुभवति । यद्दृष्टं दृष्टमनुपश्यति श्रुतं श्रुतमेवार्थमनुशृणोति देशदिगन्तरैश्च प्रत्यनुभूतं पुनः पुनः प्रत्यनुभवति दृष्टं चादृष्टं च श्रुतं चाश्रुतं चानुभूतं चाननुभूतं च सच्चासच्च सर्वं पश्यति सर्वः पश्यति ॥",
      "transliteration": "atraiṣa devaḥ svapne mahimānamanubhavati | yaddṛṣṭaṃ dṛṣṭamanupaśyati śrutaṃ śrutamevārthamanuśṛṇoti deśadigantaraiśca pratyanubhūtaṃ punaḥ punaḥ pratyanubhavati dṛṣṭaṃ cādṛṣṭaṃ ca śrutaṃ cāśrutaṃ cānubhūtaṃ cānanubhūtaṃ ca saccāsacca sarvaṃ paśyati sarvaḥ paśyati ||",
      "english": "In the dream state, this being experiences glory. What has been seen and heard, what has been experienced in different lands and directions — all this he sees again. All is seen by him."
    },
    {
      "id": "prashna.4.6",
      "sanskrit": "स यदा तेजसाऽभिभूतो भवति । अत्रैष देवः स्वप्नान्न पश्यत्यथ यदैतस्मिञ्शरीर एतत्सुखं भवति ॥",
      "transliteration": "sa yadā tejasā'bhibhūto bhavati | atraiṣa devaḥ svapnānna paśyatyatha yadaitasmiñśarīra etatsukhaṃ bhavati ||",
      "english": "When overwhelmed by light, he sees no dreams. Then there is happiness in the body."
    },
    {
      "id": "prashna.4.7",
      "sanskrit": "स यथा सोभ्य वयांसि वसोवृक्षं सम्प्रतिष्ठन्ते । एवं ह वै तत् सर्वं पर आत्मनि सम्प्रतिष्ठते ॥",
      "transliteration": "sa yathā sobhya vayāṃsi vasovṛkṣaṃ sampratiṣṭhante | evaṃ ha vai tat sarvaṃ para ātmani sampratiṣṭhate ||",
      "english": "As birds settle on a tree, so all this settles in the supreme Self."
    },
    {
      "id": "prashna.4.8",
      "sanskrit": "पृथिवी च पृथिवीमात्रा चापश्चापोमात्रा च तेजश्च तेजोमात्रा च वायुश्च वायुमात्रा चाकाशश्चाकाशमात्रा च चक्षुश्च द्रष्टव्यं च श्रोत्रं च श्रोतव्यं च घ्राणं च घ्रातव्यं च रसश्च रसयितव्यं च त्वक्च स्पर्शयितव्यं च वाक्च वक्तव्यं च हस्तौ चादातव्यं चोपस्थश्चानन्दयितव्यं च पायुश्च विसर्जयितव्यं च यादौ च गन्तव्यं च मनश्च मन्तव्यं च बुद्धिश्च बोद्धव्यं चाहङ्कारश्चाहङ्कर्तव्यं च चित्तं च चेतयितव्यं च तेजश्च विद्योतयितव्यं च प्राणश्च विधारयितव्यं च ॥",
      "transliteration": "pṛthivī ca pṛthivīmātrā cāpaścāpomātrā ca tejaśca tejomātrā ca vāyuśca vāyumātrā cākāśaścākāśamātrā ca cakṣuśca draṣṭavyaṃ ca śrotraṃ ca śrotavyaṃ ca ghrāṇaṃ ca ghrātavyaṃ ca rasaśca rasayitavyaṃ ca tvakca sparśayitavyaṃ ca vākca vaktavyaṃ ca hastau cādātavyaṃ copasthaścānandayitavyaṃ ca pāyuśca visarjayitavyaṃ ca yādau ca gantavyaṃ ca manaśca mantavyaṃ ca buddhiśca boddhavyaṃ cāhaṅkāraścāhaṅkartavyaṃ ca cittaṃ ca cetayitavyaṃ ca tejaśca vidyotayitavyaṃ ca prāṇaśca vidhārayitavyaṃ ca ||",
      "english": "Earth and its essence, water and its essence, fire, air, space, eye and its objects, ear and its objects, nose and its objects, taste and its objects, skin and its objects, speech and its objects, hands, organ, anus, feet, mind, intellect, ego, consciousness, and Prana — all these are established."
    },
    {
      "id": "prashna.4.9",
      "sanskrit": "एष हि द्रष्टा स्प्रष्टा श्रोता घ्राता रसयिता मन्ता बोद्धा कर्ता विज्ञानात्मा पुरुषः । स परेऽक्षर आत्मनि सम्प्रतिष्ठते ॥",
      "transliteration": "eṣa hi draṣṭā spraṣṭā śrotā ghrātā rasayitā mantā boddhā kartā vijñānātmā puruṣaḥ | sa pare'kṣara ātmani sampratiṣṭhate ||",
      "english": "This is the seer, toucher, hearer, smeller, taster, thinker, knower, doer — the conscious Self, the Person. He is established in the supreme, imperishable Self."
    },
    {
      "id": "prashna.4.10",
      "sanskrit": "परमेवाक्षरं प्रतिपद्यते स यो ह वै तदच्छायमशरीरमलोहितं शुभ्रमक्षरं वेदयते यस्तु सोम्य । स सर्वज्ञः सर्वो भवति । तदेष श्लोकः ॥",
      "transliteration": "paramevākṣaraṃ pratipadyate sa yo ha vai tadacchāyamaśarīramalohitaṃ śubhramakṣaraṃ vedayate yastu somya | sa sarvajñaḥ sarvo bhavati | tadeṣa ślokaḥ ||",
      "english": "He attains the supreme imperishable who knows the shadowless, bodiless, colorless, pure, imperishable. He becomes all-knowing, all."
    },
    {
      "id": "prashna.4.11",
      "sanskrit": "विज्ञानात्मा सह देवैश्च सर्वैः प्राणा भूतानि सम्प्रतिष्ठन्ति यत्र तदक्षरं वेदयते यस्तु सोम्य स सर्वज्ञः सर्वमेवाविवेशेति ॥",
      "transliteration": "vijñānātmā saha devaiśca sarvaiḥ prāṇā bhūtāni sampratiṣṭhanti yatra tadakṣaraṃ vedayate yastu somya sa sarvajñaḥ sarvamevāviveśeti ||",
      "english": "The conscious Self, together with all gods, pranas, and beings, is established there. Knowing the imperishable, he becomes all-knowing and enters all."
    },
    {
      "id": "prashna.5.1",
      "sanskrit": "अथ हैनं शैब्यः सत्यकामः पप्रच्छ । स यो ह वै तद्भगवन्मनुष्येषु प्रायणान्तमोङ्कारमभिध्यायीत । कतमं वाव स तेन लोकं जयतीति । तस्मै स होवाच ॥",
      "transliteration": "atha hainaṃ śaibyaḥ satyakāmaḥ papraccha | sa yo ha vai tadbhagavanmanuṣyeṣu prāyaṇāntamoṅkāramabhidhyāyīta | katamaṃ vāva sa tena lokaṃ jayatīti | tasmai sa hovāca ||",
      "english": "Saibya asked: \"Lord, if someone meditates on OM at death, what world does he attain?\""
    },
    {
      "id": "prashna.5.2",
      "sanskrit": "एतद्वै सत्यकाम परं चापरं च ब्रह्म यदोङ्कारः । तस्माद्विद्वानेतेनैवायतनेनैकतरमन्वेति ॥",
      "transliteration": "etadvai satyakāma paraṃ cāparaṃ ca brahma yadoṅkāraḥ | tasmādvidvānetenaivāyatanenaikataramanveti ||",
      "english": "This OM is both the supreme and the inferior Brahman. The wise one, by this support, attains one of them."
    },
    {
      "id": "prashna.5.3",
      "sanskrit": "स यद्येकमात्रमभिध्यायीत स तेनैव संवेदितस्तूर्णमेव जगत्यामभिसम्पद्यते । तमृचो मनुष्यलोकमुपनयन्ते स तत्र तपसा ब्रह्मचर्येण श्रद्धया सम्पन्नो महिमानमनुभवति ॥",
      "transliteration": "sa yadyekamātramabhidhyāyīta sa tenaiva saṃveditastūrṇameva jagatyāmabhisampadyate | tamṛco manuṣyalokamupanayante sa tatra tapasā brahmacaryeṇa śraddhayā sampanno mahimānamanubhavati ||",
      "english": "If he meditates on one matra, he is quickly reborn in the human world. The Rg verses lead him, and he experiences greatness."
    },
    {
      "id": "prashna.5.4",
      "sanskrit": "अथ यदि द्विमात्रेण मनसि सम्पद्यते सोऽन्तरिक्षं यजुर्भिरुन्नीयते सोमलोकम् । स सोमलोके विभुतिमनुभूय पुनरावर्तते ॥",
      "transliteration": "atha yadi dvimātreṇa manasi sampadyate so'ntarikṣaṃ yajurbhirunnīyate somalokam | sa somaloke vibhutimanubhūya punarāvartate ||",
      "english": "If he meditates on two matras, he reaches the sky and the lunar world. After experiencing glory there, he returns."
    },
    {
      "id": "prashna.5.5",
      "sanskrit": "यः पुनरेतं त्रिमात्रेणोमित्येतेनैवाक्षरेण परं पुरुषमभिध्यायीत स तेजसि सूर्ये सम्पन्नः । यथा पादोदरस्त्वचा विनिर्मुच्यत एवं ह वै स पाप्मना विनिर्मुक्तः स सामभिरुन्नीयते ब्रह्मलोकं स एतस्माज्जीवघनात् परात्परं पुरिशयं पुरुषमीक्षते ॥",
      "transliteration": "yaḥ punaretaṃ trimātreṇomityetenaivākṣareṇa paraṃ puruṣamabhidhyāyīta sa tejasi sūrye sampannaḥ | yathā pādodarastvacā vinirmucyata evaṃ ha vai sa pāpmanā vinirmuktaḥ sa sāmabhirunnīyate brahmalokaṃ sa etasmājjīvaghanāt parātparaṃ puriśayaṃ puruṣamīkṣate ||",
      "english": "He who meditates on three matras of OM attains the sun. Freed from sin as a snake sheds its skin, he is led by the Saman verses to the Brahmaloka, where he sees the Person beyond all."
    },
    {
      "id": "prashna.5.6",
      "sanskrit": "तिस्रो मात्रा मृत्युमत्यः प्रयुक्ता अन्योन्यसक्ताः अनविप्रयुक्ताः । क्रियासु बाह्याभ्यन्तरमध्यमासु सम्यक् प्रयुक्तासु न कम्पते ज्ञः ॥",
      "transliteration": "tisro mātrā mṛtyumatyaḥ prayuktā anyonyasaktāḥ anaviprayuktāḥ | kriyāsu bāhyābhyantaramadhyamāsu samyak prayuktāsu na kampate jñaḥ ||",
      "english": "The three matras, when rightly applied, are deathless. United, not separated, applied in external, internal, and middle actions, the knower does not tremble."
    },
    {
      "id": "prashna.5.7",
      "sanskrit": "ऋग्भिरेतं यजुर्भिरन्तरिक्षं सामभिर्यत् तत् कवयो वेदयन्ते । तमोङ्कारेणैवायतनेनान्वेति विद्वान् यत्तच्छान्तमजरममृतमभयं परं चेति ॥",
      "transliteration": "ṛgbhiretaṃ yajurbhirantarikṣaṃ sāmabhiryat tat kavayo vedayante | tamoṅkāreṇaivāyatanenānveti vidvān yattacchāntamajaramamṛtamabhayaṃ paraṃ ceti ||",
      "english": "Through Rg verses he attains this world, through Yajur verses the sky, through Saman verses what the poets know. By OM as support, the wise one attains the peaceful, ageless, immortal, fearless, supreme."
    },
    {
      "id": "prashna.6.1",
      "sanskrit": "अथ हैनं सुकेशा भारद्वाजः पप्रच्छ । भगवन् हिरण्यनाभः कौसल्यो राजपुत्रो मामुपेत्यैतं प्रश्नमपृच्छत । षोडशकलं भारद्वाज पुरुषं वेत्थ । तमहं कुमारमब्रुवं नाहमिमं वेद । यद्यहमिममवेदिषं कथं ते नावक्ष्यमिति । समूलो वा एष परिशुष्यति योऽनृतमभिवदति तस्मान्नार्हम्यनृतं वक्तुम् । स तूष्णीं रथमारुह्य प्रवव्राज । तं त्वा पृच्छामि क्वासौ पुरुष इति ॥",
      "transliteration": "atha hainaṃ sukeśā bhāradvājaḥ papraccha | bhagavan hiraṇyanābhaḥ kausalyo rājaputro māmupetyaitaṃ praśnamapṛcchata | ṣoḍaśakalaṃ bhāradvāja puruṣaṃ vettha | tamahaṃ kumāramabruvaṃ nāhamimaṃ veda | yadyahamimamavediṣaṃ kathaṃ te nāvakṣyamiti | samūlo vā eṣa pariśuṣyati yo'nṛtamabhivadati tasmānnārhamyanṛtaṃ vaktum | sa tūṣṇīṃ rathamāruhya pravavrāja | taṃ tvā pṛcchāmi kvāsau puruṣa iti ||",
      "english": "Sukesa asked: \"Lord, Hiranyanabha asked me about the 16-part Person. I told him I did not know. One who speaks falsehood withers like a root. So I ask you: where is that Person?\""
    },
    {
      "id": "prashna.6.2",
      "sanskrit": "तस्मै स होवाचेहैवान्तःशरीरे सोम्य स पुरुषो यस्मिन्नताः षोडशकलाः प्रभवन्तीति ॥",
      "transliteration": "tasmai sa hovācehaivāntaḥśarīre somya sa puruṣo yasminnatāḥ ṣoḍaśakalāḥ prabhavantīti ||",
      "english": "He replied: \"Within this body, dear, is the Person from whom these 16 parts arise.\""
    },
    {
      "id": "prashna.6.3",
      "sanskrit": "स ईक्षाचक्रे । कस्मिन्नहमुत्क्रान्त उत्क्रान्तो भविष्यामि कस्मिन्वा प्रतिष्ठिते प्रतिष्ठास्यामीति ॥",
      "transliteration": "sa īkṣācakre | kasminnahamutkrānta utkrānto bhaviṣyāmi kasminvā pratiṣṭhite pratiṣṭhāsyāmīti ||",
      "english": "He thought: \"On whose departure shall I depart? On whose establishment shall I be established?\""
    },
    {
      "id": "prashna.6.4",
      "sanskrit": "स प्राणमसृजत प्राणाच्छ्रद्धां खं वायुर्ज्योतिरापः पृथिवीन्द्रियं मनः । अन्नमन्नाद्वीर्यं तपो मन्त्राः कर्म लोका लोकेषु च नाम च ॥",
      "transliteration": "sa prāṇamasṛjata prāṇācchraddhāṃ khaṃ vāyurjyotirāpaḥ pṛthivīndriyaṃ manaḥ | annamannādvīryaṃ tapo mantrāḥ karma lokā lokeṣu ca nāma ca ||",
      "english": "He created Prana; from Prana, faith; then space, air, fire, water, earth, senses, mind, food, strength, austerity, mantras, action, worlds, and names."
    },
    {
      "id": "prashna.6.5",
      "sanskrit": "स यथेमा नद्यः स्यन्दमानाः समुद्रायणाः समुद्रं प्राप्यास्तं गच्छन्ति भिद्येते तासां नामरूपे समुद्र इत्येवं प्रोच्यते । एवमेवास्य परिद्रष्टुरिमाः षोडशकलाः पुरुषायणाः पुरुषं प्राप्यास्तं गच्छन्ति भिद्येते चासां नामरूपे पुरुष इत्येवं प्रोच्यते स एषोऽकलोऽमृतो भवति तदेष श्लोकः ॥",
      "transliteration": "sa yathemā nadyaḥ syandamānāḥ samudrāyaṇāḥ samudraṃ prāpyāstaṃ gacchanti bhidyete tāsāṃ nāmarūpe samudra ityevaṃ procyate | evamevāsya paridraṣṭurimāḥ ṣoḍaśakalāḥ puruṣāyaṇāḥ puruṣaṃ prāpyāstaṃ gacchanti bhidyete cāsāṃ nāmarūpe puruṣa ityevaṃ procyate sa eṣo'kalo'mṛto bhavati tadeṣa ślokaḥ ||",
      "english": "As flowing rivers merge into the ocean, losing their names and forms, so the 16 parts merge into the Person. He becomes partless and immortal."
    },
    {
      "id": "prashna.6.6",
      "sanskrit": "अरा इव रथनाभौ कला यस्मिन्प्रतिष्ठिताः । तं वेद्यं पुरुषं वेद यथ मा वो मृत्युः परिव्यथा इति ॥",
      "transliteration": "arā iva rathanābhau kalā yasminpratiṣṭhitāḥ | taṃ vedyaṃ puruṣaṃ veda yatha mā vo mṛtyuḥ parivyathā iti ||",
      "english": "As spokes in the hub, the parts are established in Him. Know that Person — so that death may not cause you pain."
    },
    {
      "id": "prashna.6.7",
      "sanskrit": "तान् होवाचैतावदेवाहमेतत् परं ब्रह्म वेद । नातः परमस्तीति ॥",
      "transliteration": "tān hovācaitāvadevāhametat paraṃ brahma veda | nātaḥ paramastīti ||",
      "english": "He said: \"I know this supreme Brahman only thus far. There is nothing beyond It.\""
    },
    {
      "id": "prashna.6.8",
      "sanskrit": "ते तमर्चयन्तस्त्वं हि नः पिता योऽस्माकमविद्यायाः परं पारं तारयसीति । नमः परमऋषिभ्यो नमः परमऋषिभ्यः ॥",
      "transliteration": "te tamarcayantastvaṃ hi naḥ pitā yo'smākamavidyāyāḥ paraṃ pāraṃ tārayasīti | namaḥ paramaṛṣibhyo namaḥ paramaṛṣibhyaḥ ||",
      "english": "They worshipped him: \"You are our father who carries us to the other shore of ignorance. Salutations to the supreme seers!\""
    }
  ]

}

// ===== Mundaka Upanishad =====
export const mundakaUpanishad: Upanishad = {

  "id": "mundaka",
  "name": "Mundaka Upanishad",
  sanskritName: `मुण्डकोपनिषद्`,
  "transliteration": "Muṇḍakopaniṣad",
  "summary": "The Mundaka Upanishad (\"the Upanishad of the Shaven Head\") teaches the distinction between higher and lower knowledge. It presents the famous parable of the two birds on the tree, and the arrow-making meditation technique. The higher knowledge is the realization of the imperishable Brahman, the source of all creation.",
  "theme": "Higher and lower knowledge, the two birds parable, meditation on OM as the bow, and the identity of the individual Self with Brahman.",
  "verseCount": 64,
  "sections": [
    {
      "id": "1.1",
      "name": "First Mundaka, First Khanda",
      sanskritName: `प्रथममुण्डके प्रथमः खण्डः`,
      "verses": [
        {
          "id": "mundaka.1.1.1",
          "sanskrit": "ब्रह्मा देवानां प्रथमः संबभूव विश्वस्य कर्ता भुवनस्य गोप्ता । स ब्रह्मविद्यां सर्वविद्याप्रतिष्ठामथर्वाय ज्येष्ठपुत्राय प्राह ॥",
          "transliteration": "brahmā devānāṃ prathamaḥ saṃbabhūva viśvasya kartā bhuvanasya goptā | sa brahmavidyāṃ sarvavidyāpratiṣṭhāmatharvāya jyeṣṭhaputrāya prāha ||",
          "english": "Brahma, the creator and protector of the universe, taught the supreme knowledge of Brahman to his eldest son, Atharva."
        },
        {
          "id": "mundaka.1.1.2",
          "sanskrit": "अथर्वणे यां प्रवदेत ब्रह्माऽथर्वा तं पुरोवाचाङ्गिरे ब्रह्मविद्याम् । स भारद्वाजाय सत्यवाहाय प्राह भारद्वाजोऽङ्गिरसे परावराम् ॥",
          "transliteration": "atharvaṇe yāṃ pravadeta brahmā'tharvā taṃ purovācāṅgire brahmavidyām | sa bhāradvājāya satyavāhāya prāha bhāradvājo'ṅgirase parāvarām ||",
          "english": "Atharva taught Angir. Angir taught Satyavaha Bharadvaja. Thus the supreme knowledge was passed down."
        },
        {
          "id": "mundaka.1.1.3",
          "sanskrit": "शौनको ह वै महाशालोऽङ्गिरसं विधिवदुपसन्नः पप्रच्छ । कस्मिन्नु भगवो विज्ञाते सर्वमिदं विज्ञातं भवतीति ॥",
          "transliteration": "śaunako ha vai mahāśālo'ṅgirasaṃ vidhivadupasannaḥ papraccha | kasminnu bhagavo vijñāte sarvamidaṃ vijñātaṃ bhavatīti ||",
          "english": "Saunaka approached Angiras and asked: \"Lord, by knowing what is all this known?\""
        },
        {
          "id": "mundaka.1.1.4",
          "sanskrit": "तस्मै स होवाच । द्वे विद्ये वेदितव्ये इति ह स्म यद्ब्रह्मविदो वदन्ति परा चैवापरा च ॥",
          "transliteration": "tasmai sa hovāca | dve vidye veditavye iti ha sma yadbrahmavido vadanti parā caivāparā ca ||",
          "english": "He replied: \"Two kinds of knowledge are to be known — the higher (para) and the lower (apara).\""
        },
        {
          "id": "mundaka.1.1.5",
          "sanskrit": "तत्रापरा ऋग्वेदो यजुर्वेदः सामवेदोऽथर्ववेदः शिक्षा कल्पो व्याकरणं निरुक्तं छन्दो ज्योतिषमिति । अथ परा यया तदक्षरमधिगम्यते ॥",
          "transliteration": "tatrāparā ṛgvedo yajurvedaḥ sāmavedo'tharvavedaḥ śikṣā kalpo vyākaraṇaṃ niruktaṃ chando jyotiṣamiti | atha parā yayā tadakṣaramadhigamyate ||",
          "english": "The lower knowledge includes the four Vedas, phonetics, ritual, grammar, etymology, meter, and astronomy. The higher knowledge is that by which the Imperishable is known."
        },
        {
          "id": "mundaka.1.1.6",
          "sanskrit": "यत्तदद्रेश्यमग्राह्यमगोत्रमवर्ण- मचक्षुःश्रोत्रं तदपाणिपादम् । नित्यं विभुं सर्वगतं सुसूक्ष्मं तदव्ययं यद्भूतयोनिं परिपश्यन्ति धीराः ॥",
          "transliteration": "yattadadreśyamagrāhyamagotramavarṇa- macakṣuḥśrotraṃ tadapāṇipādam | nityaṃ vibhuṃ sarvagataṃ susūkṣmaṃ tadavyayaṃ yadbhūtayoniṃ paripaśyanti dhīrāḥ ||",
          "english": "That which is invisible, ungraspable, without lineage, without eyes, ears, hands, or feet — eternal, all-pervading, subtle, imperishable — that the wise perceive as the source of all beings."
        },
        {
          "id": "mundaka.1.1.7",
          "sanskrit": "यथोर्णनाभिः सृजते गृह्णते च यथा पृथिव्यामोषधयः संभवन्ति । यथा सतः पुरुषात्केशलोमानि तथाऽक्षरात्संभवतीह विश्वम् ॥",
          "transliteration": "yathorṇanābhiḥ sṛjate gṛhṇate ca yathā pṛthivyāmoṣadhayaḥ saṃbhavanti | yathā sataḥ puruṣātkeśalomāni tathā'kṣarātsaṃbhavatīha viśvam ||",
          "english": "As a spider spins out and withdraws its web, as herbs grow from the earth, as hair grows from a living person, so the universe arises from the Imperishable."
        },
        {
          "id": "mundaka.1.1.8",
          "sanskrit": "तपसा चीयते ब्रह्म ततोऽन्नमभिजायते । अन्नात्प्राणो मनः सत्यं लोकाः कर्मसु चामृतम् ॥",
          "transliteration": "tapasā cīyate brahma tato'nnamabhijāyate | annātprāṇo manaḥ satyaṃ lokāḥ karmasu cāmṛtam ||",
          "english": "Brahman expands through austerity. From It, food is born. From food, life, mind, truth, worlds, and immortality in action."
        },
        {
          "id": "mundaka.1.1.9",
          "sanskrit": "यः सर्वज्ञः सर्वविद्यस्य ज्ञानमयं तपः । तस्मादेतद्ब्रह्म नाम रूपमन्नं च जायते ॥",
          "transliteration": "yaḥ sarvajñaḥ sarvavidyasya jñānamayaṃ tapaḥ | tasmādetadbrahma nāma rūpamannaṃ ca jāyate ||",
          "english": "The all-knowing, all-wise One — whose austerity is knowledge — from Him are born Brahman, name, form, and food."
        }
      ]
    },
    {
      "id": "1.2",
      "name": "First Mundaka, Second Khanda",
      sanskritName: `प्रथममुण्डके द्वितीयः खण्डः`,
      "verses": [
        {
          "id": "mundaka.1.2.1",
          "sanskrit": "तदेतत्सत्यं मन्त्रेषु कर्माणि कवयो यान्यपश्यंस्तानि त्रेतायां बहुधा संततानि । तान्याचरथ नियतं सत्यकामा एष वः पन्थाः सुकृतस्य लोके ॥",
          "transliteration": "tadetatsatyaṃ mantreṣu karmāṇi kavayo yānyapaśyaṃstāni tretāyāṃ bahudhā saṃtatāni | tānyācaratha niyataṃ satyakāmā eṣa vaḥ panthāḥ sukṛtasya loke ||",
          "english": "The actions revealed to the sages in the mantras have been spread widely in the three Vedas. Perform them constantly, O seekers of truth. This is your path to the world of good deeds."
        },
        {
          "id": "mundaka.1.2.2",
          "sanskrit": "यदा लेलायते ह्यर्चिः समिद्धे हव्यवाहने । तदाऽऽज्यभागावन्तरेणाऽऽहुतीः प्रतिपादयेत् ॥",
          "transliteration": "yadā lelāyate hyarciḥ samiddhe havyavāhane | tadā''jyabhāgāvantareṇā''hutīḥ pratipādayet ||",
          "english": "When the flame flickers after the fire is kindled, then one should offer oblations between the two portions of clarified butter."
        },
        {
          "id": "mundaka.1.2.3",
          "sanskrit": "यस्याग्निहोत्रमदर्शमपौर्णमास- मचातुर्मास्यमनाग्रयणमतिथिवर्जितं च । अहुतमवैश्वदेवमविधिना हुत- मासप्तमांस्तस्य लोकान् हिनस्ति ॥",
          "transliteration": "yasyāgnihotramadarśamapaurṇamāsa- macāturmāsyamanāgrayaṇamatithivarjitaṃ ca | ahutamavaiśvadevamavidhinā huta- māsaptamāṃstasya lokān hinasti ||",
          "english": "The fire rituals of one who neglects the new and full moon ceremonies, the four-month rites, the harvest offerings, guests, offerings to all beings, and performs incorrectly — destroy his seven worlds."
        },
        {
          "id": "mundaka.1.2.4",
          "sanskrit": "काली कराली च मनोजवा च सुलोहिता या च सुधूम्रवर्णा । स्फुलिङ्गिनी विश्वरुची च देवी लेलायमाना इति सप्त जिह्वाः ॥",
          "transliteration": "kālī karālī ca manojavā ca sulohitā yā ca sudhūmravarṇā | sphuliṅginī viśvarucī ca devī lelāyamānā iti sapta jihvāḥ ||",
          "english": "Kali, Karali, Manojava, Sulohita, Sudhumravarna, Sphulingini, and Visvaruchi — these are the seven tongues of flame."
        },
        {
          "id": "mundaka.1.2.5",
          "sanskrit": "एतेषु यश्चरते भ्राजमानेषु यथाकालं चाहुतयो ह्याददायन् । तं नयन्त्येताः सूर्यस्य रश्मयो यत्र देवानां पतिरेकोऽधिवासः ॥",
          "transliteration": "eteṣu yaścarate bhrājamāneṣu yathākālaṃ cāhutayo hyādadāyan | taṃ nayantyetāḥ sūryasya raśmayo yatra devānāṃ patireko'dhivāsaḥ ||",
          "english": "Those who offer oblations in due time are led by the rays of the sun to where the one Lord of the gods resides."
        },
        {
          "id": "mundaka.1.2.6",
          "sanskrit": "एह्येहीति तमाहुतयः सुवर्चसः सूर्यस्य रश्मिभिर्यजमानं वहन्ति । प्रियां वाचमभिवदन्त्योऽर्चयन्त्य एष वः पुण्यः सुकृतो ब्रह्मलोकः ॥",
          "transliteration": "ehyehīti tamāhutayaḥ suvarcasaḥ sūryasya raśmibhiryajamānaṃ vahanti | priyāṃ vācamabhivadantyo'rcayantya eṣa vaḥ puṇyaḥ sukṛto brahmalokaḥ ||",
          "english": "\"Come, come!\" say the radiant offerings, carrying the sacrificer through the sun's rays. \"This is your holy, well-earned Brahmaloka.\""
        },
        {
          "id": "mundaka.1.2.7",
          "sanskrit": "प्लवा ह्येते अदृढा यज्ञरूपा अष्टादशोक्तमवरं येषु कर्म । एतच्छ्रेयो येऽभिनन्दन्ति मूढा जरामृत्युं ते पुनरेवापि यन्ति ॥",
          "transliteration": "plavā hyete adṛḍhā yajñarūpā aṣṭādaśoktamavaraṃ yeṣu karma | etacchreyo ye'bhinandanti mūḍhā jarāmṛtyuṃ te punarevāpi yanti ||",
          "english": "These sacrifices are like unsteady boats. The 18 forms of inferior action delight fools, who again undergo old age and death."
        },
        {
          "id": "mundaka.1.2.8",
          "sanskrit": "अविद्यायामन्तरे वर्तमानाः स्वयं धीराः पण्डितंमन्यमानाः । जङ्घन्यमानाः परियन्ति मूढा अन्धेनैव नीयमाना यथान्धाः ॥",
          "transliteration": "avidyāyāmantare vartamānāḥ svayaṃ dhīrāḥ paṇḍitaṃmanyamānāḥ | jaṅghanyamānāḥ pariyanti mūḍhā andhenaiva nīyamānā yathāndhāḥ ||",
          "english": "Living in ignorance, calling themselves wise, the deluded wander about like the blind leading the blind."
        },
        {
          "id": "mundaka.1.2.9",
          "sanskrit": "अविद्यायां बहुधा वर्तमाना वयं कृतार्था इत्यभिमन्यन्ति बालाः । यत्कर्मिणो न प्रवेदयन्ति रागा- त्तेनातुराः क्षीणलोकाश्च्यवन्ते ॥",
          "transliteration": "avidyāyāṃ bahudhā vartamānā vayaṃ kṛtārthā ityabhimanyanti bālāḥ | yatkarmiṇo na pravedayanti rāgā- ttenāturāḥ kṣīṇalokāścyavante ||",
          "english": "Living in ignorance in many ways, children think \"We have achieved our purpose.\" Afflicted by passion, they fall from heaven."
        },
        {
          "id": "mundaka.1.2.10",
          "sanskrit": "इष्टापूर्तम् मन्यमाना वरिष्ठं नान्यच्छ्रेयो वेदयन्ते प्रमूढाः । नाकस्य पृष्ठे ते सुकृतेऽनुभूत्वेमं लोकं हीनतरं वा विशन्ति ॥",
          "transliteration": "iṣṭāpūrtam manyamānā variṣṭhaṃ nānyacchreyo vedayante pramūḍhāḥ | nākasya pṛṣṭhe te sukṛte'nubhūtvemaṃ lokaṃ hīnataraṃ vā viśanti ||",
          "english": "Fools think the performance of sacrifices is the highest good. Having enjoyed the heaven of good deeds, they enter this world or a lower one."
        },
        {
          "id": "mundaka.1.2.11",
          "sanskrit": "तपःश्रद्धे ये ह्युपवसन्त्यरण्ये शान्ता विद्वांसो भैक्ष्यचर्यां चरन्तः । सूर्यद्वारेण ते विरजाः प्रयान्ति यत्रामृतः स पुरुषो ह्यव्ययात्मा ॥",
          "transliteration": "tapaḥśraddhe ye hyupavasantyaraṇye śāntā vidvāṃso bhaikṣyacaryāṃ carantaḥ | sūryadvāreṇa te virajāḥ prayānti yatrāmṛtaḥ sa puruṣo hyavyayātmā ||",
          "english": "But those who practice austerity and faith in the forest, peaceful and wise, living on alms — they pass through the sun's door to where the immortal Person dwells."
        },
        {
          "id": "mundaka.1.2.12",
          "sanskrit": "परीक्ष्य लोकान् कर्मचितान् ब्राह्मणो निर्वेदमायान्नास्त्यकृतः कृतेन । तद्विज्ञानार्थं स गुरुमेवाभिगच्छेत् समित्पाणिः श्रोत्रियं ब्रह्मनिष्ठम् ॥",
          "transliteration": "parīkṣya lokān karmacitān brāhmaṇo nirvedamāyānnāstyakṛtaḥ kṛtena | tadvijñānārthaṃ sa gurumevābhigacchet samitpāṇiḥ śrotriyaṃ brahmaniṣṭham ||",
          "english": "Having examined the worlds gained through action, a brahmin should develop detachment. To know the truth, approach a guru who is devoted to Brahman, with firewood in hand."
        },
        {
          "id": "mundaka.1.2.13",
          "sanskrit": "तस्मै स विद्वानुपसन्नाय सम्यक् प्रशान्तचित्ताय शमान्विताय । येनाक्षरं पुरुषं वेद सत्यं प्रोवाच तां तत्त्वतो ब्रह्मविद्याम् ॥",
          "transliteration": "tasmai sa vidvānupasannāya samyak praśāntacittāya śamānvitāya | yenākṣaraṃ puruṣaṃ veda satyaṃ provāca tāṃ tattvato brahmavidyām ||",
          "english": "To that student who has approached properly, with a tranquil mind and peaceful heart, the wise teacher should teach the knowledge of Brahman — by which one knows the Imperishable Person."
        }
      ]
    },
    {
      "id": "2.1",
      "name": "Second Mundaka, First Khanda",
      sanskritName: `द्वितीयमुण्डके प्रथमः खण्डः`,
      "verses": [
        {
          "id": "mundaka.2.1.1",
          "sanskrit": "तदेतत्सत्यं यथा सुदीप्तात्पावकाद्विस्फुलिङ्गाः सहस्रशः प्रभवन्ते सरूपाः । तथाऽक्षराद्विविधाः सोम्य भावाः प्रजायन्ते तत्र चैवापियन्ति ॥",
          "transliteration": "tadetatsatyaṃ yathā sudīptātpāvakādvisphuliṅgāḥ sahasraśaḥ prabhavante sarūpāḥ | tathā'kṣarādvividhāḥ somya bhāvāḥ prajāyante tatra caivāpiyanti ||",
          "english": "As sparks from a blazing fire, so from the Imperishable arise various beings and return to It."
        },
        {
          "id": "mundaka.2.1.2",
          "sanskrit": "दिव्यो ह्यमूर्तः पुरुषः सबाह्याभ्यन्तरो ह्यजः । अप्राणो ह्यमनाः शुभ्रो ह्यक्षरात्परतः परः ॥",
          "transliteration": "divyo hyamūrtaḥ puruṣaḥ sabāhyābhyantaro hyajaḥ | aprāṇo hyamanāḥ śubhro hyakṣarātparataḥ paraḥ ||",
          "english": "The Person is divine, formless, both within and without, unborn, without breath or mind, pure, and beyond the Imperishable."
        },
        {
          "id": "mundaka.2.1.3",
          "sanskrit": "एतस्माज्जायते प्राणो मनः सर्वेन्द्रियाणि च । खं वायुर्ज्योतिरापः पृथिवी विश्वस्य धारिणी ॥",
          "transliteration": "etasmājjāyate prāṇo manaḥ sarvendriyāṇi ca | khaṃ vāyurjyotirāpaḥ pṛthivī viśvasya dhāriṇī ||",
          "english": "From Him are born life, mind, all senses, space, air, fire, water, and earth — the support of all."
        },
        {
          "id": "mundaka.2.1.4",
          "sanskrit": "अग्निर्मूर्धा चक्षुषी चन्द्रसूर्यौ दिशः श्रोत्रे वाग्विवृताश्च वेदाः । वायुः प्राणो हृदयं विश्वमस्य पद्भ्यां पृथिवी ह्येष सर्वभूतान्तरात्मा ॥",
          "transliteration": "agnirmūrdhā cakṣuṣī candrasūryau diśaḥ śrotre vāgvivṛtāśca vedāḥ | vāyuḥ prāṇo hṛdayaṃ viśvamasya padbhyāṃ pṛthivī hyeṣa sarvabhūtāntarātmā ||",
          "english": "Fire is His head, the sun and moon His eyes, the directions His ears, the revealed Vedas His speech, air His breath, the universe His heart, earth His feet — He is the inner Self of all beings."
        },
        {
          "id": "mundaka.2.1.5",
          "sanskrit": "तस्मादग्निः समिधो यस्य सूर्यः सोमात्पर्जन्य ओषधयः पृथिव्याम् । पुमान् रेतः सिञ्चति योषितायां बह्वीः प्रजाः पुरुषात्संप्रसूताः ॥",
          "transliteration": "tasmādagniḥ samidho yasya sūryaḥ somātparjanya oṣadhayaḥ pṛthivyām | pumān retaḥ siñcati yoṣitāyāṃ bahvīḥ prajāḥ puruṣātsaṃprasūtāḥ ||",
          "english": "From Him comes the fire whose fuel is the sun. From rain come herbs on the earth. Man pours seed into woman — thus many beings are born from the Person."
        },
        {
          "id": "mundaka.2.1.6",
          "sanskrit": "तस्मादृचः साम यजूँषि दीक्षा यज्ञाश्च सर्वे क्रतवो दक्षिणाश्च । संवत्सरश्च यजमानश्च लोकाः सोमो यत्र पवते यत्र सूर्यः ॥",
          "transliteration": "tasmādṛcaḥ sāma yajū~ṣi dīkṣā yajñāśca sarve kratavo dakṣiṇāśca | saṃvatsaraśca yajamānaśca lokāḥ somo yatra pavate yatra sūryaḥ ||",
          "english": "From Him come the Rg, Yajur, and Saman Vedas, initiations, all sacrifices, the year, the sacrificer, and the worlds where the moon and sun shine."
        },
        {
          "id": "mundaka.2.1.7",
          "sanskrit": "तस्माच्च देवा बहुधा संप्रसूताः साध्या मनुष्याः पशवो वयाँसि । प्राणापानौ व्रीहियवौ तपश्च श्रद्धा सत्यं ब्रह्मचर्यं विधिश्च ॥",
          "transliteration": "tasmācca devā bahudhā saṃprasūtāḥ sādhyā manuṣyāḥ paśavo vayā~si | prāṇāpānau vrīhiyavau tapaśca śraddhā satyaṃ brahmacaryaṃ vidhiśca ||",
          "english": "From Him arise gods, celestials, humans, animals, and birds. From Him come Prana and Apana, rice and barley, austerity, faith, truth, celibacy, and law."
        },
        {
          "id": "mundaka.2.1.8",
          "sanskrit": "सप्त प्राणाः प्रभवन्ति तस्मा- त्सप्तार्चिषः समिधः सप्त होमाः । सप्त इमे लोका येषु चरन्ति प्राणा गुहाशया निहिताः सप्त सप्त ॥",
          "transliteration": "sapta prāṇāḥ prabhavanti tasmā- tsaptārciṣaḥ samidhaḥ sapta homāḥ | sapta ime lokā yeṣu caranti prāṇā guhāśayā nihitāḥ sapta sapta ||",
          "english": "Seven pranas arise from Him, with their seven flames, seven fuels, seven oblations, and seven worlds where the life-forces move."
        },
        {
          "id": "mundaka.2.1.9",
          "sanskrit": "अतः समुद्रा गिरयश्च सर्वेऽस्मा- त्स्यन्दन्ते सिन्धवः सर्वरूपाः । अतश्च सर्वा ओषधयो रसश्च येनैष भूतैस्तिष्ठते ह्यन्तरात्मा ॥",
          "transliteration": "ataḥ samudrā girayaśca sarve'smā- tsyandante sindhavaḥ sarvarūpāḥ | ataśca sarvā oṣadhayo rasaśca yenaiṣa bhūtaistiṣṭhate hyantarātmā ||",
          "english": "From Him flow all seas, mountains, and rivers of every form. From Him come all herbs and flavors, by which the inner Self sustains the elements."
        },
        {
          "id": "mundaka.2.1.10",
          "sanskrit": "पुरुष एवेदं विश्वं कर्म तपो ब्रह्म परामृतम् । एतद्यो वेद निहितं गुहायां सोऽविद्याग्रन्थिं विकिरतीह सोम्य ॥",
          "transliteration": "puruṣa evedaṃ viśvaṃ karma tapo brahma parāmṛtam | etadyo veda nihitaṃ guhāyāṃ so'vidyāgranthiṃ vikiratīha somya ||",
          "english": "The Person is all this — action, austerity, Brahman, and the supreme immortal. One who knows this hidden in the cave cuts the knot of ignorance."
        }
      ]
    },
    {
      "id": "2.2",
      "name": "Second Mundaka, Second Khanda",
      sanskritName: `द्वितीयमुण्डके द्वितीयः खण्डः`,
      "verses": [
        {
          "id": "mundaka.2.2.1",
          "sanskrit": "आविः संनिहितं गुहाचरं नाम महत्पदमत्रैतत्समर्पितम् । एजत्प्राणन्निमिषच्च यदेतज्जानथ सदसद्वरेण्यं परं विज्ञानाद्यद्वरिष्ठं प्रजानाम् ॥",
          "transliteration": "āviḥ saṃnihitaṃ guhācaraṃ nāma mahatpadamatraitatsamarpitam | ejatprāṇannimiṣacca yadetajjānatha sadasadvareṇyaṃ paraṃ vijñānādyadvariṣṭhaṃ prajānām ||",
          "english": "The great goal, hidden in the cave, is revealed. Know it as both moving and unmoving, being and non-being, the supreme, the best."
        },
        {
          "id": "mundaka.2.2.2",
          "sanskrit": "यदर्चिमद्यदणुभ्योऽणु च यस्मिँल्लोका निहिता लोकिनश्च । तदेतदक्षरं ब्रह्म स प्राणस्तदु वाङ्मनः तदेतत्सत्यं तदमृतं तद्वेद्धव्यं सोम्य विद्धि ॥",
          "transliteration": "yadarcimadyadaṇubhyo'ṇu ca yasmi~llokā nihitā lokinaśca | tadetadakṣaraṃ brahma sa prāṇastadu vāṅmanaḥ tadetatsatyaṃ tadamṛtaṃ tadveddhavyaṃ somya viddhi ||",
          "english": "That which is brilliant and subtler than the subtle — in which are set the worlds and their inhabitants — that is the Imperishable Brahman. Know it to be known."
        },
        {
          "id": "mundaka.2.2.3",
          "sanskrit": "धनुर्गृहीत्वौपनिषदं महास्त्रं शरं ह्युपासानिशितं संधयीत । आयम्य तद्भावगतेन चेतसा लक्ष्यं तदेवाक्षरं सोम्य विद्धि ॥",
          "transliteration": "dhanurgṛhītvaupaniṣadaṃ mahāstraṃ śaraṃ hyupāsāniśitaṃ saṃdhayīta | āyamya tadbhāvagatena cetasā lakṣyaṃ tadevākṣaraṃ somya viddhi ||",
          "english": "Take the Upanishadic bow, the great weapon. Fix the arrow sharpened by meditation. Draw the bow with mind absorbed in It. Know the Imperishable as the target."
        },
        {
          "id": "mundaka.2.2.4",
          "sanskrit": "प्रणवो धनुः शरो ह्यात्मा ब्रह्म तल्लक्ष्यमुच्यते । अप्रमत्तेन वेद्धव्यं शरवत्तन्मयो भवेत् ॥",
          "transliteration": "praṇavo dhanuḥ śaro hyātmā brahma tallakṣyamucyate | apramattena veddhavyaṃ śaravattanmayo bhavet ||",
          "english": "OM is the bow; the Self is the arrow; Brahman is the target. One should hit It with unwavering attention — become one with It like the arrow in the target."
        },
        {
          "id": "mundaka.2.2.5",
          "sanskrit": "यस्मिन् द्यौः पृथिवी चान्तरिक्षमोतं मनः सह प्राणैश्च सर्वैः । तमेवैकं जानथ आत्मानमन्या वाचो विमुञ्चथामृतस्यैष सेतुः ॥",
          "transliteration": "yasmin dyauḥ pṛthivī cāntarikṣamotaṃ manaḥ saha prāṇaiśca sarvaiḥ | tamevaikaṃ jānatha ātmānamanyā vāco vimuñcathāmṛtasyaiṣa setuḥ ||",
          "english": "In whom the sky, earth, and space are woven, with the mind and all pranas — know that one Self. Give up other talk. This is the bridge to immortality."
        },
        {
          "id": "mundaka.2.2.6",
          "sanskrit": "अरा इव रथनाभौ संहता यत्र नाड्यः । स एषोऽन्तश्चरते बहुधा जायमानः । ओमित्येवं ध्यायथ आत्मानं स्वस्ति वः पाराय तमसः परस्तात् ॥",
          "transliteration": "arā iva rathanābhau saṃhatā yatra nāḍyaḥ | sa eṣo'ntaścarate bahudhā jāyamānaḥ | omityevaṃ dhyāyatha ātmānaṃ svasti vaḥ pārāya tamasaḥ parastāt ||",
          "english": "Where the arteries meet like spokes in the hub of a wheel, He moves within, becoming many. Meditate on the Self as OM. May you cross beyond darkness."
        },
        {
          "id": "mundaka.2.2.7",
          "sanskrit": "यः सर्वज्ञः सर्वविद्यस्यैष महिमा भुवि । दिव्ये ब्रह्मपुरे ह्येष व्योम्न्यात्मा प्रतिष्ठितः । मनोमयः प्राणशरीरनेता प्रतिष्ठितोऽन्ने हृदयं संनिधाय । तद्विज्ञानेन परिपश्यन्ति धीरा आनन्दरूपममृतं यद्विभाति ॥",
          "transliteration": "yaḥ sarvajñaḥ sarvavidyasyaiṣa mahimā bhuvi | divye brahmapure hyeṣa vyomnyātmā pratiṣṭhitaḥ | manomayaḥ prāṇaśarīranetā pratiṣṭhito'nne hṛdayaṃ saṃnidhāya | tadvijñānena paripaśyanti dhīrā ānandarūpamamṛtaṃ yadvibhāti ||",
          "english": "The all-knowing, all-wise One — His greatness is on earth. In the divine city of Brahman, He is established in space. The wise, through knowledge, see Him who shines as the immortal, blissful form."
        },
        {
          "id": "mundaka.2.2.8",
          "sanskrit": "भिद्यते हृदयग्रन्थिश्छिद्यन्ते सर्वसंशयाः । क्षीयन्ते चास्य कर्माणि तस्मिन्दृष्टे परावरे ॥",
          "transliteration": "bhidyate hṛdayagranthiśchidyante sarvasaṃśayāḥ | kṣīyante cāsya karmāṇi tasmindṛṣṭe parāvare ||",
          "english": "When He is seen — both the high and the low — the knot of the heart is loosened, all doubts are cut, and all karmas are exhausted."
        },
        {
          "id": "mundaka.2.2.9",
          "sanskrit": "हिरण्मये परे कोशे विरजं ब्रह्म निष्कलम् । तच्छुभ्रं ज्योतिषां ज्योतिस्तद्यदात्मविदो विदुः ॥",
          "transliteration": "hiraṇmaye pare kośe virajaṃ brahma niṣkalam | tacchubhraṃ jyotiṣāṃ jyotistadyadātmavido viduḥ ||",
          "english": "In the supreme golden sheath is the spotless, partless Brahman. It is the pure light of lights — known by the knowers of the Self."
        },
        {
          "id": "mundaka.2.2.10",
          "sanskrit": "न तत्र सूर्यो भाति न चन्द्रतारकं नेमा विद्युतो भान्ति कुतोऽयमग्निः । तमेव भान्तमनुभाति सर्वं तस्य भासा सर्वमिदं विभाति ॥",
          "transliteration": "na tatra sūryo bhāti na candratārakaṃ nemā vidyuto bhānti kuto'yamagniḥ | tameva bhāntamanubhāti sarvaṃ tasya bhāsā sarvamidaṃ vibhāti ||",
          "english": "The sun does not shine there, nor the moon and stars, nor lightning, nor fire. When He shines, everything shines after Him. By His light, all this is illuminated."
        },
        {
          "id": "mundaka.2.2.11",
          "sanskrit": "ब्रह्मैवेदममृतं पुरस्ताद्ब्रह्म पश्चाद्ब्रह्म दक्षिणतश्चोत्तरेण । अधश्चोर्ध्वं च प्रसृतं ब्रह्मैवेदं विश्वमिदं वरिष्ठम् ॥",
          "transliteration": "brahmaivedamamṛtaṃ purastādbrahma paścādbrahma dakṣiṇataścottareṇa | adhaścordhvaṃ ca prasṛtaṃ brahmaivedaṃ viśvamidaṃ variṣṭham ||",
          "english": "Brahman is before, Brahman is behind, to the right and left. Brahman extends above and below. Brahman alone is all this — the supreme."
        }
      ]
    },
    {
      "id": "3.1",
      "name": "Third Mundaka, First Khanda",
      sanskritName: `तृतीयमुण्डके प्रथमः खण्डः`,
      "verses": [
        {
          "id": "mundaka.3.1.1",
          "sanskrit": "द्वा सुपर्णा सयुजा सखाया समानं वृक्षं परिषस्वजाते । तयोरन्यः पिप्पलं स्वाद्वत्त्यनश्नन्नन्यो अभिचाकशीति ॥",
          "transliteration": "dvā suparṇā sayujā sakhāyā samānaṃ vṛkṣaṃ pariṣasvajāte | tayoranyaḥ pippalaṃ svādvattyanaśnannanyo abhicākaśīti ||",
          "english": "Two birds, united as companions, cling to the same tree. One eats the sweet fruit; the other, not eating, looks on."
        },
        {
          "id": "mundaka.3.1.2",
          "sanskrit": "समाने वृक्षे पुरुषो निमग्नोऽनीशया शोचति मुह्यमानः । जुष्टं यदा पश्यत्यन्यमीशमस्य महिमानमिति वीतशोकः ॥",
          "transliteration": "samāne vṛkṣe puruṣo nimagno'nīśayā śocati muhyamānaḥ | juṣṭaṃ yadā paśyatyanyamīśamasya mahimānamiti vītaśokaḥ ||",
          "english": "On the same tree, the individual is immersed, grieving, deluded. When he sees the Lord, the beloved, and His glory, he becomes free from grief."
        },
        {
          "id": "mundaka.3.1.3",
          "sanskrit": "यदा पश्यः पश्यते रुक्मवर्णं कर्तारमीशं पुरुषं ब्रह्मयोनिम् । तदा विद्वान् पुण्यपापे विधूय निरञ्जनः परमं साम्यमुपैति ॥",
          "transliteration": "yadā paśyaḥ paśyate rukmavarṇaṃ kartāramīśaṃ puruṣaṃ brahmayonim | tadā vidvān puṇyapāpe vidhūya nirañjanaḥ paramaṃ sāmyamupaiti ||",
          "english": "When the seer sees the golden-hued Creator, the Lord, the Person, the source of Brahman — then the wise one, shaking off merit and demerit, attains supreme equality."
        },
        {
          "id": "mundaka.3.1.4",
          "sanskrit": "प्राणो ह्येष यः सर्वभूतैर्विभाति विजानन् विद्वान् भवते नातिवादी । आत्मक्रीड आत्मरतिः क्रियावानेष ब्रह्मविदां वरिष्ठः ॥",
          "transliteration": "prāṇo hyeṣa yaḥ sarvabhūtairvibhāti vijānan vidvān bhavate nātivādī | ātmakrīḍa ātmaratiḥ kriyāvāneṣa brahmavidāṃ variṣṭhaḥ ||",
          "english": "This Prana shines forth through all beings. The knower, understanding, does not overstate. Delighting in the Self, rejoicing in the Self, performing actions — he is the best among knowers of Brahman."
        },
        {
          "id": "mundaka.3.1.5",
          "sanskrit": "सत्येन लभ्यस्तपसा ह्येष आत्मा सम्यग्ज्ञानेन ब्रह्मचर्येण नित्यम् । अन्तःशरीरे ज्योतिर्मयो हि शुभ्रो यं पश्यन्ति यतयः क्षीणदोषाः ॥",
          "transliteration": "satyena labhyastapasā hyeṣa ātmā samyagjñānena brahmacaryeṇa nityam | antaḥśarīre jyotirmayo hi śubhro yaṃ paśyanti yatayaḥ kṣīṇadoṣāḥ ||",
          "english": "This Self is attained by truth, austerity, right knowledge, and constant celibacy. The pure, luminous Self within the body is seen by yogis whose impurities are destroyed."
        },
        {
          "id": "mundaka.3.1.6",
          "sanskrit": "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः । येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत्सत्यस्य परमं निधानम् ॥",
          "transliteration": "satyameva jayate nānṛtaṃ satyena panthā vitato devayānaḥ | yenākramantyṛṣayo hyāptakāmā yatra tatsatyasya paramaṃ nidhānam ||",
          "english": "Truth alone triumphs, not falsehood. By truth the divine path is spread, by which the sages, free from desires, reach the supreme abode of truth."
        },
        {
          "id": "mundaka.3.1.7",
          "sanskrit": "बृहच्च तद्दिव्यमचिन्त्यरूपं सूक्ष्माच्च तत्सूक्ष्मतरं विभाति । दूरात्सुदूरे तदिहान्तिके च पश्यत्स्विहैव निहितं गुहायाम् ॥",
          "transliteration": "bṛhacca taddivyamacintyarūpaṃ sūkṣmācca tatsūkṣmataraṃ vibhāti | dūrātsudūre tadihāntike ca paśyatsvihaiva nihitaṃ guhāyām ||",
          "english": "The Self is vast, divine, of inconceivable form. It is subtler than the subtle. Far, yet near. It is placed in the cave of the heart."
        },
        {
          "id": "mundaka.3.1.8",
          "sanskrit": "न चक्षुषा गृह्यते नापि वाचा नान्यैर्देवैस्तपसा कर्मणा वा । ज्ञानप्रसादेन विशुद्धसत्त्वं स्ततस्तु तं पश्यते निष्कलं ध्यायमानः ॥",
          "transliteration": "na cakṣuṣā gṛhyate nāpi vācā nānyairdevaistapasā karmaṇā vā | jñānaprasādena viśuddhasattvaṃ statastu taṃ paśyate niṣkalaṃ dhyāyamānaḥ ||",
          "english": "It is not grasped by the eye, nor by speech, nor by other senses, nor by austerity or action. By the grace of knowledge, with purified mind, one sees the partless Self in meditation."
        },
        {
          "id": "mundaka.3.1.9",
          "sanskrit": "एषोऽणुरात्मा चेतसा वेदितव्यो यस्मिन्प्राणः पञ्चधा संविवेश । प्राणैश्चित्तं सर्वमोतं प्रजानां यस्मिन्विशुद्धे विभवत्येष आत्मा ॥",
          "transliteration": "eṣo'ṇurātmā cetasā veditavyo yasminprāṇaḥ pañcadhā saṃviveśa | prāṇaiścittaṃ sarvamotaṃ prajānāṃ yasminviśuddhe vibhavatyeṣa ātmā ||",
          "english": "This subtle Self is to be known by the intellect. In it, the five pranas enter. All beings' minds are woven in it. When it is purified, this Self shines forth."
        },
        {
          "id": "mundaka.3.1.10",
          "sanskrit": "यं यं लोकं मनसा संविभाति विशुद्धसत्त्वः कामयते यांश्च कामान् । तं तं लोकं जयते तांश्च कामांस्तस्मादात्मज्ञं ह्यर्चयेद्भूतिकामः ॥",
          "transliteration": "yaṃ yaṃ lokaṃ manasā saṃvibhāti viśuddhasattvaḥ kāmayate yāṃśca kāmān | taṃ taṃ lokaṃ jayate tāṃśca kāmāṃstasmādātmajñaṃ hyarcayedbhūtikāmaḥ ||",
          "english": "Whatever world a man of pure mind desires, whatever desires, that world he attains. Therefore, one desiring prosperity should worship the knower of the Self."
        }
      ]
    },
    {
      "id": "3.2",
      "name": "Third Mundaka, Second Khanda",
      sanskritName: `तृतीयमुण्डके द्वितीयः खण्डः`,
      "verses": [
        {
          "id": "mundaka.3.2.1",
          "sanskrit": "स वेदैतत्परमं ब्रह्म धाम यत्र विश्वं निहितं भाति शुभ्रम् । उपासते पुरुषं ये ह्यकामास्ते शुक्रमेतदतिवर्तन्ति धीराः ॥",
          "transliteration": "sa vedaitatparamaṃ brahma dhāma yatra viśvaṃ nihitaṃ bhāti śubhram | upāsate puruṣaṃ ye hyakāmāste śukrametadativartanti dhīrāḥ ||",
          "english": "He knows that supreme Brahman where the universe shines. Those who worship the Person without desires pass beyond this seed."
        },
        {
          "id": "mundaka.3.2.2",
          "sanskrit": "कामान् यः कामयते मन्यमानः स कामभिर्जायते तत्र तत्र । पर्याप्तकामस्य कृतात्मनस्तु इहैव सर्वे प्रविलीयन्ति कामाः ॥",
          "transliteration": "kāmān yaḥ kāmayate manyamānaḥ sa kāmabhirjāyate tatra tatra | paryāptakāmasya kṛtātmanastu ihaiva sarve pravilīyanti kāmāḥ ||",
          "english": "One who desires, thinking of desires, is born here and there. But for one whose desires are fulfilled, whose self is perfected, all desires dissolve here itself."
        },
        {
          "id": "mundaka.3.2.3",
          "sanskrit": "नायमात्मा प्रवचनेन लभ्यो न मेधया न बहुना श्रुतेन । यमेवैष वृणुते तेन लभ्यस्तस्यैष आत्मा विवृणुते तनूं स्वाम् ॥",
          "transliteration": "nāyamātmā pravacanena labhyo na medhayā na bahunā śrutena | yamevaiṣa vṛṇute tena labhyastasyaiṣa ātmā vivṛṇute tanūṃ svām ||",
          "english": "This Self is not attained by instruction, nor by intellect, nor by much learning. It is attained only by the one whom It chooses. To such a one, the Self reveals Its own nature."
        },
        {
          "id": "mundaka.3.2.4",
          "sanskrit": "नायमात्मा बलहीनेन लभ्यो न च प्रमादात्तपसो वाप्यलिङ्गात् । एतैरुपायैर्यतते यस्तु विद्वान्स्तस्यैष आत्मा विशते ब्रह्मधाम ॥",
          "transliteration": "nāyamātmā balahīnena labhyo na ca pramādāttapaso vāpyaliṅgāt | etairupāyairyatate yastu vidvānstasyaiṣa ātmā viśate brahmadhāma ||",
          "english": "This Self is not attained by the weak, nor by the careless, nor by austerity without the proper mark. But the wise one who strives by these means enters the abode of Brahman."
        },
        {
          "id": "mundaka.3.2.5",
          "sanskrit": "संप्राप्यैनमृषयो ज्ञानतृप्ताः कृतात्मानो वीतरागाः प्रशान्ताः । ते सर्वगं सर्वतः प्राप्य धीरा युक्तात्मानः सर्वमेवाविशन्ति ॥",
          "transliteration": "saṃprāpyainamṛṣayo jñānatṛptāḥ kṛtātmāno vītarāgāḥ praśāntāḥ | te sarvagaṃ sarvataḥ prāpya dhīrā yuktātmānaḥ sarvamevāviśanti ||",
          "english": "Having attained Him, the sages, satisfied with knowledge, perfected, free from passion, peaceful — they, the wise, having attained the all-pervading from all sides, enter the All."
        },
        {
          "id": "mundaka.3.2.6",
          "sanskrit": "वेदान्तविज्ञानसुनिश्चितार्थाः संन्यासयोगाद्यतयः शुद्धसत्त्वाः । ते ब्रह्मलोकेषु परान्तकाले परामृताः परिमुच्यन्ति सर्वे ॥",
          "transliteration": "vedāntavijñānasuniścitārthāḥ saṃnyāsayogādyatayaḥ śuddhasattvāḥ | te brahmalokeṣu parāntakāle parāmṛtāḥ parimucyanti sarve ||",
          "english": "Those who have ascertained the meaning of Vedantic knowledge, who practice renunciation and have pure minds — they are all finally liberated in the Brahmaloka at the end of time."
        },
        {
          "id": "mundaka.3.2.7",
          "sanskrit": "गताः कलाः पञ्चदश प्रतिष्ठा देवाश्च सर्वे प्रतिदेवतासु । कर्माणि विज्ञानमयश्च आत्मा परेऽव्यये सर्वे एकीभवन्ति ॥",
          "transliteration": "gatāḥ kalāḥ pañcadaśa pratiṣṭhā devāśca sarve pratidevatāsu | karmāṇi vijñānamayaśca ātmā pare'vyaye sarve ekībhavanti ||",
          "english": "The fifteen parts merge into their supports, all gods into their deities, actions and the conscious Self — all become one in the supreme Imperishable."
        },
        {
          "id": "mundaka.3.2.8",
          "sanskrit": "यथा नद्यः स्यन्दमानाः समुद्रेऽस्तं गच्छन्ति नामरूपे विहाय । तथा विद्वान् नामरूपाद्विमुक्तः परात्परं पुरुषमुपैति दिव्यम् ॥",
          "transliteration": "yathā nadyaḥ syandamānāḥ samudre'staṃ gacchanti nāmarūpe vihāya | tathā vidvān nāmarūpādvimuktaḥ parātparaṃ puruṣamupaiti divyam ||",
          "english": "As flowing rivers merge into the ocean, losing name and form, so the wise one, freed from name and form, attains the supreme Person."
        },
        {
          "id": "mundaka.3.2.9",
          "sanskrit": "स यो ह वै तत्परमं ब्रह्म वेद ब्रह्मैव भवति नास्याब्रह्मवित्कुले भवति । तरति शोकं तरति पाप्मानं गुहाग्रन्थिभ्यो विमुक्तोऽमृतो भवति ॥",
          "transliteration": "sa yo ha vai tatparamaṃ brahma veda brahmaiva bhavati nāsyābrahmavitkule bhavati | tarati śokaṃ tarati pāpmānaṃ guhāgranthibhyo vimukto'mṛto bhavati ||",
          "english": "One who knows that supreme Brahman becomes Brahman itself. None of his family remains ignorant of Brahman. He crosses sorrow, crosses evil, freed from the knots of the heart, he becomes immortal."
        },
        {
          "id": "mundaka.3.2.10",
          "sanskrit": "क्रियावन्तः श्रोत्रिया ब्रह्मनिष्ठाः स्वयं जुह्वत एकर्षिं श्रद्धयन्तः । तेषामेवैतां ब्रह्मविद्यां वदेत शिरोव्रतं विधिवद्यैस्तु चीर्णम् ॥",
          "transliteration": "kriyāvantaḥ śrotriyā brahmaniṣṭhāḥ svayaṃ juhvata ekarṣiṃ śraddhayantaḥ | teṣāmevaitāṃ brahmavidyāṃ vadeta śirovrataṃ vidhivadyaistu cīrṇam ||",
          "english": "The knowers of Brahman, performing actions, with faith, offering to the one Rishi — to them alone should this knowledge be taught, who have duly performed the head-vow."
        },
        {
          "id": "mundaka.3.2.11",
          "sanskrit": "तदेतत्सत्यमृषिरङ्गिराः पुरोवाच नैतदचीर्णव्रतोऽधीते । नमः परमऋषिभ्यो नमः परमऋषिभ्यः ॥",
          "transliteration": "tadetatsatyamṛṣiraṅgirāḥ purovāca naitadacīrṇavrato'dhīte | namaḥ paramaṛṣibhyo namaḥ paramaṛṣibhyaḥ ||",
          "english": "Thus the seer Angiras declared this truth. One who has not performed the vow should not study this. Salutations to the supreme seers! Salutations to the supreme seers!"
        }
      ]
    }
  ],
  "verses": [
    {
      "id": "mundaka.1.1.1",
      "sanskrit": "ब्रह्मा देवानां प्रथमः संबभूव विश्वस्य कर्ता भुवनस्य गोप्ता । स ब्रह्मविद्यां सर्वविद्याप्रतिष्ठामथर्वाय ज्येष्ठपुत्राय प्राह ॥",
      "transliteration": "brahmā devānāṃ prathamaḥ saṃbabhūva viśvasya kartā bhuvanasya goptā | sa brahmavidyāṃ sarvavidyāpratiṣṭhāmatharvāya jyeṣṭhaputrāya prāha ||",
      "english": "Brahma, the creator and protector of the universe, taught the supreme knowledge of Brahman to his eldest son, Atharva."
    },
    {
      "id": "mundaka.1.1.2",
      "sanskrit": "अथर्वणे यां प्रवदेत ब्रह्माऽथर्वा तं पुरोवाचाङ्गिरे ब्रह्मविद्याम् । स भारद्वाजाय सत्यवाहाय प्राह भारद्वाजोऽङ्गिरसे परावराम् ॥",
      "transliteration": "atharvaṇe yāṃ pravadeta brahmā'tharvā taṃ purovācāṅgire brahmavidyām | sa bhāradvājāya satyavāhāya prāha bhāradvājo'ṅgirase parāvarām ||",
      "english": "Atharva taught Angir. Angir taught Satyavaha Bharadvaja. Thus the supreme knowledge was passed down."
    },
    {
      "id": "mundaka.1.1.3",
      "sanskrit": "शौनको ह वै महाशालोऽङ्गिरसं विधिवदुपसन्नः पप्रच्छ । कस्मिन्नु भगवो विज्ञाते सर्वमिदं विज्ञातं भवतीति ॥",
      "transliteration": "śaunako ha vai mahāśālo'ṅgirasaṃ vidhivadupasannaḥ papraccha | kasminnu bhagavo vijñāte sarvamidaṃ vijñātaṃ bhavatīti ||",
      "english": "Saunaka approached Angiras and asked: \"Lord, by knowing what is all this known?\""
    },
    {
      "id": "mundaka.1.1.4",
      "sanskrit": "तस्मै स होवाच । द्वे विद्ये वेदितव्ये इति ह स्म यद्ब्रह्मविदो वदन्ति परा चैवापरा च ॥",
      "transliteration": "tasmai sa hovāca | dve vidye veditavye iti ha sma yadbrahmavido vadanti parā caivāparā ca ||",
      "english": "He replied: \"Two kinds of knowledge are to be known — the higher (para) and the lower (apara).\""
    },
    {
      "id": "mundaka.1.1.5",
      "sanskrit": "तत्रापरा ऋग्वेदो यजुर्वेदः सामवेदोऽथर्ववेदः शिक्षा कल्पो व्याकरणं निरुक्तं छन्दो ज्योतिषमिति । अथ परा यया तदक्षरमधिगम्यते ॥",
      "transliteration": "tatrāparā ṛgvedo yajurvedaḥ sāmavedo'tharvavedaḥ śikṣā kalpo vyākaraṇaṃ niruktaṃ chando jyotiṣamiti | atha parā yayā tadakṣaramadhigamyate ||",
      "english": "The lower knowledge includes the four Vedas, phonetics, ritual, grammar, etymology, meter, and astronomy. The higher knowledge is that by which the Imperishable is known."
    },
    {
      "id": "mundaka.1.1.6",
      "sanskrit": "यत्तदद्रेश्यमग्राह्यमगोत्रमवर्ण- मचक्षुःश्रोत्रं तदपाणिपादम् । नित्यं विभुं सर्वगतं सुसूक्ष्मं तदव्ययं यद्भूतयोनिं परिपश्यन्ति धीराः ॥",
      "transliteration": "yattadadreśyamagrāhyamagotramavarṇa- macakṣuḥśrotraṃ tadapāṇipādam | nityaṃ vibhuṃ sarvagataṃ susūkṣmaṃ tadavyayaṃ yadbhūtayoniṃ paripaśyanti dhīrāḥ ||",
      "english": "That which is invisible, ungraspable, without lineage, without eyes, ears, hands, or feet — eternal, all-pervading, subtle, imperishable — that the wise perceive as the source of all beings."
    },
    {
      "id": "mundaka.1.1.7",
      "sanskrit": "यथोर्णनाभिः सृजते गृह्णते च यथा पृथिव्यामोषधयः संभवन्ति । यथा सतः पुरुषात्केशलोमानि तथाऽक्षरात्संभवतीह विश्वम् ॥",
      "transliteration": "yathorṇanābhiḥ sṛjate gṛhṇate ca yathā pṛthivyāmoṣadhayaḥ saṃbhavanti | yathā sataḥ puruṣātkeśalomāni tathā'kṣarātsaṃbhavatīha viśvam ||",
      "english": "As a spider spins out and withdraws its web, as herbs grow from the earth, as hair grows from a living person, so the universe arises from the Imperishable."
    },
    {
      "id": "mundaka.1.1.8",
      "sanskrit": "तपसा चीयते ब्रह्म ततोऽन्नमभिजायते । अन्नात्प्राणो मनः सत्यं लोकाः कर्मसु चामृतम् ॥",
      "transliteration": "tapasā cīyate brahma tato'nnamabhijāyate | annātprāṇo manaḥ satyaṃ lokāḥ karmasu cāmṛtam ||",
      "english": "Brahman expands through austerity. From It, food is born. From food, life, mind, truth, worlds, and immortality in action."
    },
    {
      "id": "mundaka.1.1.9",
      "sanskrit": "यः सर्वज्ञः सर्वविद्यस्य ज्ञानमयं तपः । तस्मादेतद्ब्रह्म नाम रूपमन्नं च जायते ॥",
      "transliteration": "yaḥ sarvajñaḥ sarvavidyasya jñānamayaṃ tapaḥ | tasmādetadbrahma nāma rūpamannaṃ ca jāyate ||",
      "english": "The all-knowing, all-wise One — whose austerity is knowledge — from Him are born Brahman, name, form, and food."
    },
    {
      "id": "mundaka.1.2.1",
      "sanskrit": "तदेतत्सत्यं मन्त्रेषु कर्माणि कवयो यान्यपश्यंस्तानि त्रेतायां बहुधा संततानि । तान्याचरथ नियतं सत्यकामा एष वः पन्थाः सुकृतस्य लोके ॥",
      "transliteration": "tadetatsatyaṃ mantreṣu karmāṇi kavayo yānyapaśyaṃstāni tretāyāṃ bahudhā saṃtatāni | tānyācaratha niyataṃ satyakāmā eṣa vaḥ panthāḥ sukṛtasya loke ||",
      "english": "The actions revealed to the sages in the mantras have been spread widely in the three Vedas. Perform them constantly, O seekers of truth. This is your path to the world of good deeds."
    },
    {
      "id": "mundaka.1.2.2",
      "sanskrit": "यदा लेलायते ह्यर्चिः समिद्धे हव्यवाहने । तदाऽऽज्यभागावन्तरेणाऽऽहुतीः प्रतिपादयेत् ॥",
      "transliteration": "yadā lelāyate hyarciḥ samiddhe havyavāhane | tadā''jyabhāgāvantareṇā''hutīḥ pratipādayet ||",
      "english": "When the flame flickers after the fire is kindled, then one should offer oblations between the two portions of clarified butter."
    },
    {
      "id": "mundaka.1.2.3",
      "sanskrit": "यस्याग्निहोत्रमदर्शमपौर्णमास- मचातुर्मास्यमनाग्रयणमतिथिवर्जितं च । अहुतमवैश्वदेवमविधिना हुत- मासप्तमांस्तस्य लोकान् हिनस्ति ॥",
      "transliteration": "yasyāgnihotramadarśamapaurṇamāsa- macāturmāsyamanāgrayaṇamatithivarjitaṃ ca | ahutamavaiśvadevamavidhinā huta- māsaptamāṃstasya lokān hinasti ||",
      "english": "The fire rituals of one who neglects the new and full moon ceremonies, the four-month rites, the harvest offerings, guests, offerings to all beings, and performs incorrectly — destroy his seven worlds."
    },
    {
      "id": "mundaka.1.2.4",
      "sanskrit": "काली कराली च मनोजवा च सुलोहिता या च सुधूम्रवर्णा । स्फुलिङ्गिनी विश्वरुची च देवी लेलायमाना इति सप्त जिह्वाः ॥",
      "transliteration": "kālī karālī ca manojavā ca sulohitā yā ca sudhūmravarṇā | sphuliṅginī viśvarucī ca devī lelāyamānā iti sapta jihvāḥ ||",
      "english": "Kali, Karali, Manojava, Sulohita, Sudhumravarna, Sphulingini, and Visvaruchi — these are the seven tongues of flame."
    },
    {
      "id": "mundaka.1.2.5",
      "sanskrit": "एतेषु यश्चरते भ्राजमानेषु यथाकालं चाहुतयो ह्याददायन् । तं नयन्त्येताः सूर्यस्य रश्मयो यत्र देवानां पतिरेकोऽधिवासः ॥",
      "transliteration": "eteṣu yaścarate bhrājamāneṣu yathākālaṃ cāhutayo hyādadāyan | taṃ nayantyetāḥ sūryasya raśmayo yatra devānāṃ patireko'dhivāsaḥ ||",
      "english": "Those who offer oblations in due time are led by the rays of the sun to where the one Lord of the gods resides."
    },
    {
      "id": "mundaka.1.2.6",
      "sanskrit": "एह्येहीति तमाहुतयः सुवर्चसः सूर्यस्य रश्मिभिर्यजमानं वहन्ति । प्रियां वाचमभिवदन्त्योऽर्चयन्त्य एष वः पुण्यः सुकृतो ब्रह्मलोकः ॥",
      "transliteration": "ehyehīti tamāhutayaḥ suvarcasaḥ sūryasya raśmibhiryajamānaṃ vahanti | priyāṃ vācamabhivadantyo'rcayantya eṣa vaḥ puṇyaḥ sukṛto brahmalokaḥ ||",
      "english": "\"Come, come!\" say the radiant offerings, carrying the sacrificer through the sun's rays. \"This is your holy, well-earned Brahmaloka.\""
    },
    {
      "id": "mundaka.1.2.7",
      "sanskrit": "प्लवा ह्येते अदृढा यज्ञरूपा अष्टादशोक्तमवरं येषु कर्म । एतच्छ्रेयो येऽभिनन्दन्ति मूढा जरामृत्युं ते पुनरेवापि यन्ति ॥",
      "transliteration": "plavā hyete adṛḍhā yajñarūpā aṣṭādaśoktamavaraṃ yeṣu karma | etacchreyo ye'bhinandanti mūḍhā jarāmṛtyuṃ te punarevāpi yanti ||",
      "english": "These sacrifices are like unsteady boats. The 18 forms of inferior action delight fools, who again undergo old age and death."
    },
    {
      "id": "mundaka.1.2.8",
      "sanskrit": "अविद्यायामन्तरे वर्तमानाः स्वयं धीराः पण्डितंमन्यमानाः । जङ्घन्यमानाः परियन्ति मूढा अन्धेनैव नीयमाना यथान्धाः ॥",
      "transliteration": "avidyāyāmantare vartamānāḥ svayaṃ dhīrāḥ paṇḍitaṃmanyamānāḥ | jaṅghanyamānāḥ pariyanti mūḍhā andhenaiva nīyamānā yathāndhāḥ ||",
      "english": "Living in ignorance, calling themselves wise, the deluded wander about like the blind leading the blind."
    },
    {
      "id": "mundaka.1.2.9",
      "sanskrit": "अविद्यायां बहुधा वर्तमाना वयं कृतार्था इत्यभिमन्यन्ति बालाः । यत्कर्मिणो न प्रवेदयन्ति रागा- त्तेनातुराः क्षीणलोकाश्च्यवन्ते ॥",
      "transliteration": "avidyāyāṃ bahudhā vartamānā vayaṃ kṛtārthā ityabhimanyanti bālāḥ | yatkarmiṇo na pravedayanti rāgā- ttenāturāḥ kṣīṇalokāścyavante ||",
      "english": "Living in ignorance in many ways, children think \"We have achieved our purpose.\" Afflicted by passion, they fall from heaven."
    },
    {
      "id": "mundaka.1.2.10",
      "sanskrit": "इष्टापूर्तम् मन्यमाना वरिष्ठं नान्यच्छ्रेयो वेदयन्ते प्रमूढाः । नाकस्य पृष्ठे ते सुकृतेऽनुभूत्वेमं लोकं हीनतरं वा विशन्ति ॥",
      "transliteration": "iṣṭāpūrtam manyamānā variṣṭhaṃ nānyacchreyo vedayante pramūḍhāḥ | nākasya pṛṣṭhe te sukṛte'nubhūtvemaṃ lokaṃ hīnataraṃ vā viśanti ||",
      "english": "Fools think the performance of sacrifices is the highest good. Having enjoyed the heaven of good deeds, they enter this world or a lower one."
    },
    {
      "id": "mundaka.1.2.11",
      "sanskrit": "तपःश्रद्धे ये ह्युपवसन्त्यरण्ये शान्ता विद्वांसो भैक्ष्यचर्यां चरन्तः । सूर्यद्वारेण ते विरजाः प्रयान्ति यत्रामृतः स पुरुषो ह्यव्ययात्मा ॥",
      "transliteration": "tapaḥśraddhe ye hyupavasantyaraṇye śāntā vidvāṃso bhaikṣyacaryāṃ carantaḥ | sūryadvāreṇa te virajāḥ prayānti yatrāmṛtaḥ sa puruṣo hyavyayātmā ||",
      "english": "But those who practice austerity and faith in the forest, peaceful and wise, living on alms — they pass through the sun's door to where the immortal Person dwells."
    },
    {
      "id": "mundaka.1.2.12",
      "sanskrit": "परीक्ष्य लोकान् कर्मचितान् ब्राह्मणो निर्वेदमायान्नास्त्यकृतः कृतेन । तद्विज्ञानार्थं स गुरुमेवाभिगच्छेत् समित्पाणिः श्रोत्रियं ब्रह्मनिष्ठम् ॥",
      "transliteration": "parīkṣya lokān karmacitān brāhmaṇo nirvedamāyānnāstyakṛtaḥ kṛtena | tadvijñānārthaṃ sa gurumevābhigacchet samitpāṇiḥ śrotriyaṃ brahmaniṣṭham ||",
      "english": "Having examined the worlds gained through action, a brahmin should develop detachment. To know the truth, approach a guru who is devoted to Brahman, with firewood in hand."
    },
    {
      "id": "mundaka.1.2.13",
      "sanskrit": "तस्मै स विद्वानुपसन्नाय सम्यक् प्रशान्तचित्ताय शमान्विताय । येनाक्षरं पुरुषं वेद सत्यं प्रोवाच तां तत्त्वतो ब्रह्मविद्याम् ॥",
      "transliteration": "tasmai sa vidvānupasannāya samyak praśāntacittāya śamānvitāya | yenākṣaraṃ puruṣaṃ veda satyaṃ provāca tāṃ tattvato brahmavidyām ||",
      "english": "To that student who has approached properly, with a tranquil mind and peaceful heart, the wise teacher should teach the knowledge of Brahman — by which one knows the Imperishable Person."
    },
    {
      "id": "mundaka.2.1.1",
      "sanskrit": "तदेतत्सत्यं यथा सुदीप्तात्पावकाद्विस्फुलिङ्गाः सहस्रशः प्रभवन्ते सरूपाः । तथाऽक्षराद्विविधाः सोम्य भावाः प्रजायन्ते तत्र चैवापियन्ति ॥",
      "transliteration": "tadetatsatyaṃ yathā sudīptātpāvakādvisphuliṅgāḥ sahasraśaḥ prabhavante sarūpāḥ | tathā'kṣarādvividhāḥ somya bhāvāḥ prajāyante tatra caivāpiyanti ||",
      "english": "As sparks from a blazing fire, so from the Imperishable arise various beings and return to It."
    },
    {
      "id": "mundaka.2.1.2",
      "sanskrit": "दिव्यो ह्यमूर्तः पुरुषः सबाह्याभ्यन्तरो ह्यजः । अप्राणो ह्यमनाः शुभ्रो ह्यक्षरात्परतः परः ॥",
      "transliteration": "divyo hyamūrtaḥ puruṣaḥ sabāhyābhyantaro hyajaḥ | aprāṇo hyamanāḥ śubhro hyakṣarātparataḥ paraḥ ||",
      "english": "The Person is divine, formless, both within and without, unborn, without breath or mind, pure, and beyond the Imperishable."
    },
    {
      "id": "mundaka.2.1.3",
      "sanskrit": "एतस्माज्जायते प्राणो मनः सर्वेन्द्रियाणि च । खं वायुर्ज्योतिरापः पृथिवी विश्वस्य धारिणी ॥",
      "transliteration": "etasmājjāyate prāṇo manaḥ sarvendriyāṇi ca | khaṃ vāyurjyotirāpaḥ pṛthivī viśvasya dhāriṇī ||",
      "english": "From Him are born life, mind, all senses, space, air, fire, water, and earth — the support of all."
    },
    {
      "id": "mundaka.2.1.4",
      "sanskrit": "अग्निर्मूर्धा चक्षुषी चन्द्रसूर्यौ दिशः श्रोत्रे वाग्विवृताश्च वेदाः । वायुः प्राणो हृदयं विश्वमस्य पद्भ्यां पृथिवी ह्येष सर्वभूतान्तरात्मा ॥",
      "transliteration": "agnirmūrdhā cakṣuṣī candrasūryau diśaḥ śrotre vāgvivṛtāśca vedāḥ | vāyuḥ prāṇo hṛdayaṃ viśvamasya padbhyāṃ pṛthivī hyeṣa sarvabhūtāntarātmā ||",
      "english": "Fire is His head, the sun and moon His eyes, the directions His ears, the revealed Vedas His speech, air His breath, the universe His heart, earth His feet — He is the inner Self of all beings."
    },
    {
      "id": "mundaka.2.1.5",
      "sanskrit": "तस्मादग्निः समिधो यस्य सूर्यः सोमात्पर्जन्य ओषधयः पृथिव्याम् । पुमान् रेतः सिञ्चति योषितायां बह्वीः प्रजाः पुरुषात्संप्रसूताः ॥",
      "transliteration": "tasmādagniḥ samidho yasya sūryaḥ somātparjanya oṣadhayaḥ pṛthivyām | pumān retaḥ siñcati yoṣitāyāṃ bahvīḥ prajāḥ puruṣātsaṃprasūtāḥ ||",
      "english": "From Him comes the fire whose fuel is the sun. From rain come herbs on the earth. Man pours seed into woman — thus many beings are born from the Person."
    },
    {
      "id": "mundaka.2.1.6",
      "sanskrit": "तस्मादृचः साम यजूँषि दीक्षा यज्ञाश्च सर्वे क्रतवो दक्षिणाश्च । संवत्सरश्च यजमानश्च लोकाः सोमो यत्र पवते यत्र सूर्यः ॥",
      "transliteration": "tasmādṛcaḥ sāma yajū~ṣi dīkṣā yajñāśca sarve kratavo dakṣiṇāśca | saṃvatsaraśca yajamānaśca lokāḥ somo yatra pavate yatra sūryaḥ ||",
      "english": "From Him come the Rg, Yajur, and Saman Vedas, initiations, all sacrifices, the year, the sacrificer, and the worlds where the moon and sun shine."
    },
    {
      "id": "mundaka.2.1.7",
      "sanskrit": "तस्माच्च देवा बहुधा संप्रसूताः साध्या मनुष्याः पशवो वयाँसि । प्राणापानौ व्रीहियवौ तपश्च श्रद्धा सत्यं ब्रह्मचर्यं विधिश्च ॥",
      "transliteration": "tasmācca devā bahudhā saṃprasūtāḥ sādhyā manuṣyāḥ paśavo vayā~si | prāṇāpānau vrīhiyavau tapaśca śraddhā satyaṃ brahmacaryaṃ vidhiśca ||",
      "english": "From Him arise gods, celestials, humans, animals, and birds. From Him come Prana and Apana, rice and barley, austerity, faith, truth, celibacy, and law."
    },
    {
      "id": "mundaka.2.1.8",
      "sanskrit": "सप्त प्राणाः प्रभवन्ति तस्मा- त्सप्तार्चिषः समिधः सप्त होमाः । सप्त इमे लोका येषु चरन्ति प्राणा गुहाशया निहिताः सप्त सप्त ॥",
      "transliteration": "sapta prāṇāḥ prabhavanti tasmā- tsaptārciṣaḥ samidhaḥ sapta homāḥ | sapta ime lokā yeṣu caranti prāṇā guhāśayā nihitāḥ sapta sapta ||",
      "english": "Seven pranas arise from Him, with their seven flames, seven fuels, seven oblations, and seven worlds where the life-forces move."
    },
    {
      "id": "mundaka.2.1.9",
      "sanskrit": "अतः समुद्रा गिरयश्च सर्वेऽस्मा- त्स्यन्दन्ते सिन्धवः सर्वरूपाः । अतश्च सर्वा ओषधयो रसश्च येनैष भूतैस्तिष्ठते ह्यन्तरात्मा ॥",
      "transliteration": "ataḥ samudrā girayaśca sarve'smā- tsyandante sindhavaḥ sarvarūpāḥ | ataśca sarvā oṣadhayo rasaśca yenaiṣa bhūtaistiṣṭhate hyantarātmā ||",
      "english": "From Him flow all seas, mountains, and rivers of every form. From Him come all herbs and flavors, by which the inner Self sustains the elements."
    },
    {
      "id": "mundaka.2.1.10",
      "sanskrit": "पुरुष एवेदं विश्वं कर्म तपो ब्रह्म परामृतम् । एतद्यो वेद निहितं गुहायां सोऽविद्याग्रन्थिं विकिरतीह सोम्य ॥",
      "transliteration": "puruṣa evedaṃ viśvaṃ karma tapo brahma parāmṛtam | etadyo veda nihitaṃ guhāyāṃ so'vidyāgranthiṃ vikiratīha somya ||",
      "english": "The Person is all this — action, austerity, Brahman, and the supreme immortal. One who knows this hidden in the cave cuts the knot of ignorance."
    },
    {
      "id": "mundaka.2.2.1",
      "sanskrit": "आविः संनिहितं गुहाचरं नाम महत्पदमत्रैतत्समर्पितम् । एजत्प्राणन्निमिषच्च यदेतज्जानथ सदसद्वरेण्यं परं विज्ञानाद्यद्वरिष्ठं प्रजानाम् ॥",
      "transliteration": "āviḥ saṃnihitaṃ guhācaraṃ nāma mahatpadamatraitatsamarpitam | ejatprāṇannimiṣacca yadetajjānatha sadasadvareṇyaṃ paraṃ vijñānādyadvariṣṭhaṃ prajānām ||",
      "english": "The great goal, hidden in the cave, is revealed. Know it as both moving and unmoving, being and non-being, the supreme, the best."
    },
    {
      "id": "mundaka.2.2.2",
      "sanskrit": "यदर्चिमद्यदणुभ्योऽणु च यस्मिँल्लोका निहिता लोकिनश्च । तदेतदक्षरं ब्रह्म स प्राणस्तदु वाङ्मनः तदेतत्सत्यं तदमृतं तद्वेद्धव्यं सोम्य विद्धि ॥",
      "transliteration": "yadarcimadyadaṇubhyo'ṇu ca yasmi~llokā nihitā lokinaśca | tadetadakṣaraṃ brahma sa prāṇastadu vāṅmanaḥ tadetatsatyaṃ tadamṛtaṃ tadveddhavyaṃ somya viddhi ||",
      "english": "That which is brilliant and subtler than the subtle — in which are set the worlds and their inhabitants — that is the Imperishable Brahman. Know it to be known."
    },
    {
      "id": "mundaka.2.2.3",
      "sanskrit": "धनुर्गृहीत्वौपनिषदं महास्त्रं शरं ह्युपासानिशितं संधयीत । आयम्य तद्भावगतेन चेतसा लक्ष्यं तदेवाक्षरं सोम्य विद्धि ॥",
      "transliteration": "dhanurgṛhītvaupaniṣadaṃ mahāstraṃ śaraṃ hyupāsāniśitaṃ saṃdhayīta | āyamya tadbhāvagatena cetasā lakṣyaṃ tadevākṣaraṃ somya viddhi ||",
      "english": "Take the Upanishadic bow, the great weapon. Fix the arrow sharpened by meditation. Draw the bow with mind absorbed in It. Know the Imperishable as the target."
    },
    {
      "id": "mundaka.2.2.4",
      "sanskrit": "प्रणवो धनुः शरो ह्यात्मा ब्रह्म तल्लक्ष्यमुच्यते । अप्रमत्तेन वेद्धव्यं शरवत्तन्मयो भवेत् ॥",
      "transliteration": "praṇavo dhanuḥ śaro hyātmā brahma tallakṣyamucyate | apramattena veddhavyaṃ śaravattanmayo bhavet ||",
      "english": "OM is the bow; the Self is the arrow; Brahman is the target. One should hit It with unwavering attention — become one with It like the arrow in the target."
    },
    {
      "id": "mundaka.2.2.5",
      "sanskrit": "यस्मिन् द्यौः पृथिवी चान्तरिक्षमोतं मनः सह प्राणैश्च सर्वैः । तमेवैकं जानथ आत्मानमन्या वाचो विमुञ्चथामृतस्यैष सेतुः ॥",
      "transliteration": "yasmin dyauḥ pṛthivī cāntarikṣamotaṃ manaḥ saha prāṇaiśca sarvaiḥ | tamevaikaṃ jānatha ātmānamanyā vāco vimuñcathāmṛtasyaiṣa setuḥ ||",
      "english": "In whom the sky, earth, and space are woven, with the mind and all pranas — know that one Self. Give up other talk. This is the bridge to immortality."
    },
    {
      "id": "mundaka.2.2.6",
      "sanskrit": "अरा इव रथनाभौ संहता यत्र नाड्यः । स एषोऽन्तश्चरते बहुधा जायमानः । ओमित्येवं ध्यायथ आत्मानं स्वस्ति वः पाराय तमसः परस्तात् ॥",
      "transliteration": "arā iva rathanābhau saṃhatā yatra nāḍyaḥ | sa eṣo'ntaścarate bahudhā jāyamānaḥ | omityevaṃ dhyāyatha ātmānaṃ svasti vaḥ pārāya tamasaḥ parastāt ||",
      "english": "Where the arteries meet like spokes in the hub of a wheel, He moves within, becoming many. Meditate on the Self as OM. May you cross beyond darkness."
    },
    {
      "id": "mundaka.2.2.7",
      "sanskrit": "यः सर्वज्ञः सर्वविद्यस्यैष महिमा भुवि । दिव्ये ब्रह्मपुरे ह्येष व्योम्न्यात्मा प्रतिष्ठितः । मनोमयः प्राणशरीरनेता प्रतिष्ठितोऽन्ने हृदयं संनिधाय । तद्विज्ञानेन परिपश्यन्ति धीरा आनन्दरूपममृतं यद्विभाति ॥",
      "transliteration": "yaḥ sarvajñaḥ sarvavidyasyaiṣa mahimā bhuvi | divye brahmapure hyeṣa vyomnyātmā pratiṣṭhitaḥ | manomayaḥ prāṇaśarīranetā pratiṣṭhito'nne hṛdayaṃ saṃnidhāya | tadvijñānena paripaśyanti dhīrā ānandarūpamamṛtaṃ yadvibhāti ||",
      "english": "The all-knowing, all-wise One — His greatness is on earth. In the divine city of Brahman, He is established in space. The wise, through knowledge, see Him who shines as the immortal, blissful form."
    },
    {
      "id": "mundaka.2.2.8",
      "sanskrit": "भिद्यते हृदयग्रन्थिश्छिद्यन्ते सर्वसंशयाः । क्षीयन्ते चास्य कर्माणि तस्मिन्दृष्टे परावरे ॥",
      "transliteration": "bhidyate hṛdayagranthiśchidyante sarvasaṃśayāḥ | kṣīyante cāsya karmāṇi tasmindṛṣṭe parāvare ||",
      "english": "When He is seen — both the high and the low — the knot of the heart is loosened, all doubts are cut, and all karmas are exhausted."
    },
    {
      "id": "mundaka.2.2.9",
      "sanskrit": "हिरण्मये परे कोशे विरजं ब्रह्म निष्कलम् । तच्छुभ्रं ज्योतिषां ज्योतिस्तद्यदात्मविदो विदुः ॥",
      "transliteration": "hiraṇmaye pare kośe virajaṃ brahma niṣkalam | tacchubhraṃ jyotiṣāṃ jyotistadyadātmavido viduḥ ||",
      "english": "In the supreme golden sheath is the spotless, partless Brahman. It is the pure light of lights — known by the knowers of the Self."
    },
    {
      "id": "mundaka.2.2.10",
      "sanskrit": "न तत्र सूर्यो भाति न चन्द्रतारकं नेमा विद्युतो भान्ति कुतोऽयमग्निः । तमेव भान्तमनुभाति सर्वं तस्य भासा सर्वमिदं विभाति ॥",
      "transliteration": "na tatra sūryo bhāti na candratārakaṃ nemā vidyuto bhānti kuto'yamagniḥ | tameva bhāntamanubhāti sarvaṃ tasya bhāsā sarvamidaṃ vibhāti ||",
      "english": "The sun does not shine there, nor the moon and stars, nor lightning, nor fire. When He shines, everything shines after Him. By His light, all this is illuminated."
    },
    {
      "id": "mundaka.2.2.11",
      "sanskrit": "ब्रह्मैवेदममृतं पुरस्ताद्ब्रह्म पश्चाद्ब्रह्म दक्षिणतश्चोत्तरेण । अधश्चोर्ध्वं च प्रसृतं ब्रह्मैवेदं विश्वमिदं वरिष्ठम् ॥",
      "transliteration": "brahmaivedamamṛtaṃ purastādbrahma paścādbrahma dakṣiṇataścottareṇa | adhaścordhvaṃ ca prasṛtaṃ brahmaivedaṃ viśvamidaṃ variṣṭham ||",
      "english": "Brahman is before, Brahman is behind, to the right and left. Brahman extends above and below. Brahman alone is all this — the supreme."
    },
    {
      "id": "mundaka.3.1.1",
      "sanskrit": "द्वा सुपर्णा सयुजा सखाया समानं वृक्षं परिषस्वजाते । तयोरन्यः पिप्पलं स्वाद्वत्त्यनश्नन्नन्यो अभिचाकशीति ॥",
      "transliteration": "dvā suparṇā sayujā sakhāyā samānaṃ vṛkṣaṃ pariṣasvajāte | tayoranyaḥ pippalaṃ svādvattyanaśnannanyo abhicākaśīti ||",
      "english": "Two birds, united as companions, cling to the same tree. One eats the sweet fruit; the other, not eating, looks on."
    },
    {
      "id": "mundaka.3.1.2",
      "sanskrit": "समाने वृक्षे पुरुषो निमग्नोऽनीशया शोचति मुह्यमानः । जुष्टं यदा पश्यत्यन्यमीशमस्य महिमानमिति वीतशोकः ॥",
      "transliteration": "samāne vṛkṣe puruṣo nimagno'nīśayā śocati muhyamānaḥ | juṣṭaṃ yadā paśyatyanyamīśamasya mahimānamiti vītaśokaḥ ||",
      "english": "On the same tree, the individual is immersed, grieving, deluded. When he sees the Lord, the beloved, and His glory, he becomes free from grief."
    },
    {
      "id": "mundaka.3.1.3",
      "sanskrit": "यदा पश्यः पश्यते रुक्मवर्णं कर्तारमीशं पुरुषं ब्रह्मयोनिम् । तदा विद्वान् पुण्यपापे विधूय निरञ्जनः परमं साम्यमुपैति ॥",
      "transliteration": "yadā paśyaḥ paśyate rukmavarṇaṃ kartāramīśaṃ puruṣaṃ brahmayonim | tadā vidvān puṇyapāpe vidhūya nirañjanaḥ paramaṃ sāmyamupaiti ||",
      "english": "When the seer sees the golden-hued Creator, the Lord, the Person, the source of Brahman — then the wise one, shaking off merit and demerit, attains supreme equality."
    },
    {
      "id": "mundaka.3.1.4",
      "sanskrit": "प्राणो ह्येष यः सर्वभूतैर्विभाति विजानन् विद्वान् भवते नातिवादी । आत्मक्रीड आत्मरतिः क्रियावानेष ब्रह्मविदां वरिष्ठः ॥",
      "transliteration": "prāṇo hyeṣa yaḥ sarvabhūtairvibhāti vijānan vidvān bhavate nātivādī | ātmakrīḍa ātmaratiḥ kriyāvāneṣa brahmavidāṃ variṣṭhaḥ ||",
      "english": "This Prana shines forth through all beings. The knower, understanding, does not overstate. Delighting in the Self, rejoicing in the Self, performing actions — he is the best among knowers of Brahman."
    },
    {
      "id": "mundaka.3.1.5",
      "sanskrit": "सत्येन लभ्यस्तपसा ह्येष आत्मा सम्यग्ज्ञानेन ब्रह्मचर्येण नित्यम् । अन्तःशरीरे ज्योतिर्मयो हि शुभ्रो यं पश्यन्ति यतयः क्षीणदोषाः ॥",
      "transliteration": "satyena labhyastapasā hyeṣa ātmā samyagjñānena brahmacaryeṇa nityam | antaḥśarīre jyotirmayo hi śubhro yaṃ paśyanti yatayaḥ kṣīṇadoṣāḥ ||",
      "english": "This Self is attained by truth, austerity, right knowledge, and constant celibacy. The pure, luminous Self within the body is seen by yogis whose impurities are destroyed."
    },
    {
      "id": "mundaka.3.1.6",
      "sanskrit": "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः । येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत्सत्यस्य परमं निधानम् ॥",
      "transliteration": "satyameva jayate nānṛtaṃ satyena panthā vitato devayānaḥ | yenākramantyṛṣayo hyāptakāmā yatra tatsatyasya paramaṃ nidhānam ||",
      "english": "Truth alone triumphs, not falsehood. By truth the divine path is spread, by which the sages, free from desires, reach the supreme abode of truth."
    },
    {
      "id": "mundaka.3.1.7",
      "sanskrit": "बृहच्च तद्दिव्यमचिन्त्यरूपं सूक्ष्माच्च तत्सूक्ष्मतरं विभाति । दूरात्सुदूरे तदिहान्तिके च पश्यत्स्विहैव निहितं गुहायाम् ॥",
      "transliteration": "bṛhacca taddivyamacintyarūpaṃ sūkṣmācca tatsūkṣmataraṃ vibhāti | dūrātsudūre tadihāntike ca paśyatsvihaiva nihitaṃ guhāyām ||",
      "english": "The Self is vast, divine, of inconceivable form. It is subtler than the subtle. Far, yet near. It is placed in the cave of the heart."
    },
    {
      "id": "mundaka.3.1.8",
      "sanskrit": "न चक्षुषा गृह्यते नापि वाचा नान्यैर्देवैस्तपसा कर्मणा वा । ज्ञानप्रसादेन विशुद्धसत्त्वं स्ततस्तु तं पश्यते निष्कलं ध्यायमानः ॥",
      "transliteration": "na cakṣuṣā gṛhyate nāpi vācā nānyairdevaistapasā karmaṇā vā | jñānaprasādena viśuddhasattvaṃ statastu taṃ paśyate niṣkalaṃ dhyāyamānaḥ ||",
      "english": "It is not grasped by the eye, nor by speech, nor by other senses, nor by austerity or action. By the grace of knowledge, with purified mind, one sees the partless Self in meditation."
    },
    {
      "id": "mundaka.3.1.9",
      "sanskrit": "एषोऽणुरात्मा चेतसा वेदितव्यो यस्मिन्प्राणः पञ्चधा संविवेश । प्राणैश्चित्तं सर्वमोतं प्रजानां यस्मिन्विशुद्धे विभवत्येष आत्मा ॥",
      "transliteration": "eṣo'ṇurātmā cetasā veditavyo yasminprāṇaḥ pañcadhā saṃviveśa | prāṇaiścittaṃ sarvamotaṃ prajānāṃ yasminviśuddhe vibhavatyeṣa ātmā ||",
      "english": "This subtle Self is to be known by the intellect. In it, the five pranas enter. All beings' minds are woven in it. When it is purified, this Self shines forth."
    },
    {
      "id": "mundaka.3.1.10",
      "sanskrit": "यं यं लोकं मनसा संविभाति विशुद्धसत्त्वः कामयते यांश्च कामान् । तं तं लोकं जयते तांश्च कामांस्तस्मादात्मज्ञं ह्यर्चयेद्भूतिकामः ॥",
      "transliteration": "yaṃ yaṃ lokaṃ manasā saṃvibhāti viśuddhasattvaḥ kāmayate yāṃśca kāmān | taṃ taṃ lokaṃ jayate tāṃśca kāmāṃstasmādātmajñaṃ hyarcayedbhūtikāmaḥ ||",
      "english": "Whatever world a man of pure mind desires, whatever desires, that world he attains. Therefore, one desiring prosperity should worship the knower of the Self."
    },
    {
      "id": "mundaka.3.2.1",
      "sanskrit": "स वेदैतत्परमं ब्रह्म धाम यत्र विश्वं निहितं भाति शुभ्रम् । उपासते पुरुषं ये ह्यकामास्ते शुक्रमेतदतिवर्तन्ति धीराः ॥",
      "transliteration": "sa vedaitatparamaṃ brahma dhāma yatra viśvaṃ nihitaṃ bhāti śubhram | upāsate puruṣaṃ ye hyakāmāste śukrametadativartanti dhīrāḥ ||",
      "english": "He knows that supreme Brahman where the universe shines. Those who worship the Person without desires pass beyond this seed."
    },
    {
      "id": "mundaka.3.2.2",
      "sanskrit": "कामान् यः कामयते मन्यमानः स कामभिर्जायते तत्र तत्र । पर्याप्तकामस्य कृतात्मनस्तु इहैव सर्वे प्रविलीयन्ति कामाः ॥",
      "transliteration": "kāmān yaḥ kāmayate manyamānaḥ sa kāmabhirjāyate tatra tatra | paryāptakāmasya kṛtātmanastu ihaiva sarve pravilīyanti kāmāḥ ||",
      "english": "One who desires, thinking of desires, is born here and there. But for one whose desires are fulfilled, whose self is perfected, all desires dissolve here itself."
    },
    {
      "id": "mundaka.3.2.3",
      "sanskrit": "नायमात्मा प्रवचनेन लभ्यो न मेधया न बहुना श्रुतेन । यमेवैष वृणुते तेन लभ्यस्तस्यैष आत्मा विवृणुते तनूं स्वाम् ॥",
      "transliteration": "nāyamātmā pravacanena labhyo na medhayā na bahunā śrutena | yamevaiṣa vṛṇute tena labhyastasyaiṣa ātmā vivṛṇute tanūṃ svām ||",
      "english": "This Self is not attained by instruction, nor by intellect, nor by much learning. It is attained only by the one whom It chooses. To such a one, the Self reveals Its own nature."
    },
    {
      "id": "mundaka.3.2.4",
      "sanskrit": "नायमात्मा बलहीनेन लभ्यो न च प्रमादात्तपसो वाप्यलिङ्गात् । एतैरुपायैर्यतते यस्तु विद्वान्स्तस्यैष आत्मा विशते ब्रह्मधाम ॥",
      "transliteration": "nāyamātmā balahīnena labhyo na ca pramādāttapaso vāpyaliṅgāt | etairupāyairyatate yastu vidvānstasyaiṣa ātmā viśate brahmadhāma ||",
      "english": "This Self is not attained by the weak, nor by the careless, nor by austerity without the proper mark. But the wise one who strives by these means enters the abode of Brahman."
    },
    {
      "id": "mundaka.3.2.5",
      "sanskrit": "संप्राप्यैनमृषयो ज्ञानतृप्ताः कृतात्मानो वीतरागाः प्रशान्ताः । ते सर्वगं सर्वतः प्राप्य धीरा युक्तात्मानः सर्वमेवाविशन्ति ॥",
      "transliteration": "saṃprāpyainamṛṣayo jñānatṛptāḥ kṛtātmāno vītarāgāḥ praśāntāḥ | te sarvagaṃ sarvataḥ prāpya dhīrā yuktātmānaḥ sarvamevāviśanti ||",
      "english": "Having attained Him, the sages, satisfied with knowledge, perfected, free from passion, peaceful — they, the wise, having attained the all-pervading from all sides, enter the All."
    },
    {
      "id": "mundaka.3.2.6",
      "sanskrit": "वेदान्तविज्ञानसुनिश्चितार्थाः संन्यासयोगाद्यतयः शुद्धसत्त्वाः । ते ब्रह्मलोकेषु परान्तकाले परामृताः परिमुच्यन्ति सर्वे ॥",
      "transliteration": "vedāntavijñānasuniścitārthāḥ saṃnyāsayogādyatayaḥ śuddhasattvāḥ | te brahmalokeṣu parāntakāle parāmṛtāḥ parimucyanti sarve ||",
      "english": "Those who have ascertained the meaning of Vedantic knowledge, who practice renunciation and have pure minds — they are all finally liberated in the Brahmaloka at the end of time."
    },
    {
      "id": "mundaka.3.2.7",
      "sanskrit": "गताः कलाः पञ्चदश प्रतिष्ठा देवाश्च सर्वे प्रतिदेवतासु । कर्माणि विज्ञानमयश्च आत्मा परेऽव्यये सर्वे एकीभवन्ति ॥",
      "transliteration": "gatāḥ kalāḥ pañcadaśa pratiṣṭhā devāśca sarve pratidevatāsu | karmāṇi vijñānamayaśca ātmā pare'vyaye sarve ekībhavanti ||",
      "english": "The fifteen parts merge into their supports, all gods into their deities, actions and the conscious Self — all become one in the supreme Imperishable."
    },
    {
      "id": "mundaka.3.2.8",
      "sanskrit": "यथा नद्यः स्यन्दमानाः समुद्रेऽस्तं गच्छन्ति नामरूपे विहाय । तथा विद्वान् नामरूपाद्विमुक्तः परात्परं पुरुषमुपैति दिव्यम् ॥",
      "transliteration": "yathā nadyaḥ syandamānāḥ samudre'staṃ gacchanti nāmarūpe vihāya | tathā vidvān nāmarūpādvimuktaḥ parātparaṃ puruṣamupaiti divyam ||",
      "english": "As flowing rivers merge into the ocean, losing name and form, so the wise one, freed from name and form, attains the supreme Person."
    },
    {
      "id": "mundaka.3.2.9",
      "sanskrit": "स यो ह वै तत्परमं ब्रह्म वेद ब्रह्मैव भवति नास्याब्रह्मवित्कुले भवति । तरति शोकं तरति पाप्मानं गुहाग्रन्थिभ्यो विमुक्तोऽमृतो भवति ॥",
      "transliteration": "sa yo ha vai tatparamaṃ brahma veda brahmaiva bhavati nāsyābrahmavitkule bhavati | tarati śokaṃ tarati pāpmānaṃ guhāgranthibhyo vimukto'mṛto bhavati ||",
      "english": "One who knows that supreme Brahman becomes Brahman itself. None of his family remains ignorant of Brahman. He crosses sorrow, crosses evil, freed from the knots of the heart, he becomes immortal."
    },
    {
      "id": "mundaka.3.2.10",
      "sanskrit": "क्रियावन्तः श्रोत्रिया ब्रह्मनिष्ठाः स्वयं जुह्वत एकर्षिं श्रद्धयन्तः । तेषामेवैतां ब्रह्मविद्यां वदेत शिरोव्रतं विधिवद्यैस्तु चीर्णम् ॥",
      "transliteration": "kriyāvantaḥ śrotriyā brahmaniṣṭhāḥ svayaṃ juhvata ekarṣiṃ śraddhayantaḥ | teṣāmevaitāṃ brahmavidyāṃ vadeta śirovrataṃ vidhivadyaistu cīrṇam ||",
      "english": "The knowers of Brahman, performing actions, with faith, offering to the one Rishi — to them alone should this knowledge be taught, who have duly performed the head-vow."
    },
    {
      "id": "mundaka.3.2.11",
      "sanskrit": "तदेतत्सत्यमृषिरङ्गिराः पुरोवाच नैतदचीर्णव्रतोऽधीते । नमः परमऋषिभ्यो नमः परमऋषिभ्यः ॥",
      "transliteration": "tadetatsatyamṛṣiraṅgirāḥ purovāca naitadacīrṇavrato'dhīte | namaḥ paramaṛṣibhyo namaḥ paramaṛṣibhyaḥ ||",
      "english": "Thus the seer Angiras declared this truth. One who has not performed the vow should not study this. Salutations to the supreme seers! Salutations to the supreme seers!"
    }
  ]

}

// ===== Taittiriya Upanishad =====
export const taittiriyaUpanishad: Upanishad = {
  id: "taittiriya",
  name: "Taittiriya Upanishad",
  sanskritName: "तैत्तिरीयोपनिषद्",
  transliteration: "Taittirīyopaniṣad",
  summary: "The Taittiriya Upanishad, belonging to the Krishna Yajurveda, is divided into three Vallis: Siksha Valli (instruction on phonetics), Ananda Valli (the bliss of Brahman), and Bhrigu Valli (Bhrigu's quest). It presents the doctrine of the five sheaths (koshas) and the ascending scale of bliss.",
  theme: "The five sheaths of the Self, Brahman as Truth-Knowledge-Infinity, the scale of bliss, the importance of teaching.",
  verseCount: 32,
  sections: [
    {
      id: "siksha",
      name: "Siksha Valli",
      sanskritName: "शीक्षावल्ली",
      verses: [
        { id: "taittiriya.1.1.1", sanskrit: "ॐ शं नो मित्रः शं वरुणः । शं नो भवत्वर्यमा । शं न इन्द्रो बृहस्पतिः । शं नो विष्णुरुरुक्रमः । नमो ब्रह्मणे । नमस्ते वायो । त्वमेव प्रत्यक्षं ब्रह्मासि । त्वामेव प्रत्यक्षं ब्रह्म वदिष्यामि । ऋतं वदिष्यामि । सत्यं वदिष्यामि । तन्मामवतु । तद्वक्तारमवतु । अवतु माम् । अवतु वक्तारम् । ॐ शान्तिः शान्तिः शान्तिः", transliteration: "oṃ śaṃ no mitraḥ śaṃ varuṇaḥ | śaṃ no bhavatvaryamā | śaṃ na indro bṛhaspatiḥ | śaṃ no viṣṇururukramaḥ | namo brahmaṇe | namaste vāyo | tvameva pratyakṣaṃ brahmāsi | tvāmeva pratyakṣaṃ brahma vadiṣyāmi | ṛtaṃ vadiṣyāmi | satyaṃ vadiṣyāmi | tanmāmavatu | tadvaktāramavatu | avatu mām | avatu vaktāram | oṃ śāntiḥ śāntiḥ śāntiḥ", english: "Om! May Mitra be propitious to us, and Varuna! May Aryaman be propitious to us! May Indra and Brihaspati be propitious to us! May Vishnu, of wide strides, be propitious to us! Salutation to Brahman! Salutation to you, O Vayu! You are indeed the visible Brahman. I shall proclaim you as the visible Brahman. Om! Peace! Peace! Peace!" },
        { id: "taittiriya.1.2.1", sanskrit: "ॐ शीक्षां व्याख्यास्यामः । वर्णः स्वरः । मात्रा बलम् । साम सन्तानः । इत्युक्तः शीक्षाध्यायः", transliteration: "oṃ śīkṣāṃ vyākhyāsyāmaḥ | varṇaḥ svaraḥ | mātrā balam | sāma santānaḥ | ityuktaḥ śīkṣādhyāyaḥ", english: "Om! We shall explain the science of pronunciation: sound, accent, quantity, force, modulation, and combination." },
        { id: "taittiriya.1.3.1", sanskrit: "सह नौ यशः । सह नौ ब्रह्मवर्चसम् । अथातः संहिताया उपनिषदं व्याख्यास्यामः । पञ्चस्वधिकरणेषु । अधिलोकमधिज्यौतिषमधिविद्यमधिप्रजमध्यात्मम् । ता महासंहिता इत्याचक्षते", transliteration: "saha nau yaśaḥ | saha nau brahmavarcasam | athātaḥ saṃhitāyā upaniṣadaṃ vyākhyāsyāmaḥ | pañcasvadhikaraṇeṣu | adhilokamadhijyautiṣamadhividyamadhiprajamadhyātmam | tā mahāsaṃhitā ityācakṣate", english: "May glory and Brahman-splendor be with us both. Now we shall explain the Upanishad of the Samhita, under five heads: with reference to the worlds, heavenly lights, knowledge, progeny, and the Self." },
        { id: "taittiriya.1.4.1", sanskrit: "यश्छन्दसामृषभो विश्वरूपः । छन्दोभ्योऽध्यमृतात्सम्बभूव । स मेन्द्रो मेधया स्पृणोतु । अमृतस्य देव धारणो भूयासम् । शरीरं मे विचर्षणम् । जिह्वा मे मधुमत्तमा । कर्णाभ्यां भूरिविश्रुवम् । ब्रह्मणः कोशोऽसि मेधया पिहितः । श्रुतं मे गोपाय", transliteration: "yaśchandasāmṛṣabho viśvarūpaḥ | chandobhyo'dhyamṛtātsambabhūva | sa mendro medhayā spṛṇotu | amṛtasya deva dhāraṇo bhūyāsam | śarīraṃ me vicarṣaṇam | jihvā me madhumattamā | karṇābhyāṃ bhūriviśruvam | brahmaṇaḥ kośo'si medhayā pihitaḥ | śrutaṃ me gopāya", english: "May the bull of the Vedas, the all-formed one, who sprang from the immortal Vedas — may Indra strengthen me with intelligence. May I become the possessor of immortality." },
        { id: "taittiriya.1.5.1", sanskrit: "भूर्भुवः सुवरिति वा एतास्तिस्रो व्याहृतयः । तासामुहस्मै तां चतुर्थीम् । माहाचमस्यः प्रवेदयते । मह इति । तद्ब्रह्म । स आत्मा । अङ्गान्यन्या देवताः", transliteration: "bhūrbhuvaḥ suvariti vā etāstisro vyāhṛtayaḥ | tāsāmuhasmai tāṃ caturthīm | māhācamasyaḥ pravedayate | maha iti | tadbrahma | sa ātmā | aṅgānyanyā devatāḥ", english: "Bhuh, Bhuvah, Suvah — these are the three great utterances. The fourth, Mahah, was taught by Mahacamasya: that is Brahman, that is the Self. The other gods are its limbs." },
        { id: "taittiriya.1.6.1", sanskrit: "स य एषोऽन्तर्हृदय आकाशः । तस्मिन्नयं पुरुषो मनोमयः । अमृतो हिरण्मयः । अन्तरेण तालुके । य एष स्तन इवावलम्बते । सेन्द्रयोनिः", transliteration: "sa ya eṣo'ntarhṛdaya ākāśaḥ | tasminnayaṃ puruṣo manomayaḥ | amṛto hiraṇmayaḥ | antareṇa tāluke | ya eṣa stana ivāvalambate | sendrayoniḥ", english: "The space within the heart — in it dwells the Person consisting of mind, immortal and luminous. Between the palates it hangs like a nipple — this is the birthplace of Indra." },
        { id: "taittiriya.1.7.1", sanskrit: "पृथिव्यन्तरिक्षं द्यौर्दिशोऽवान्तरदिशाः । अग्निर्वायुरादित्यश्चन्द्रमा नक्षत्राणि । आप ओषधयो वनस्पतय आकाश आत्मा । इत्यधिभूतम् । अथाध्यात्मम् । प्राणो व्यानोऽपान उदानः समानः", transliteration: "pṛthivyantarikṣaṃ dyaurdiśo'vāntaradiśāḥ | agnirvāyurādityaścandramā nakṣatrāṇi | āpa oṣadhayo vanaspataya ākāśa ātmā | ityadhibhūtam | athādhyātmam | prāṇo vyāno'pāna udānaḥ samānaḥ", english: "Earth, sky, heaven, quarters, and intermediate quarters; fire, air, sun, moon, and stars; water, herbs, trees, space, and the Self — thus with reference to the elements." },
        { id: "taittiriya.1.8.1", sanskrit: "ओमिति ब्रह्म । ओमितीदं सर्वम् । ओमित्येतदनुकृतिर्हस्म वा अप्योश्रावयेत्याश्रावयन्ति । ओमिति सामानि गायन्ति । ॐ शोमिति शस्त्राणि शंसन्ति", transliteration: "omiti brahma | omitīdaṃ sarvam | omityetadanukṛtirhasma vā apyośrāvayetyāśrāvayanti | omiti sāmāni gāyanti | oṃ śomiti śastrāṇi śaṃsanti", english: "Om is Brahman. Om is all this. With Om the Saman hymns are sung. With 'Om' the recitations are intoned." },
        { id: "taittiriya.1.9.1", sanskrit: "ऋतं च स्वाध्यायप्रवचने च । सत्यं च स्वाध्यायप्रवचने च । तपश्च स्वाध्यायप्रवचने च । दमश्च स्वाध्यायप्रवचने च । शमश्च स्वाध्यायप्रवचने च", transliteration: "ṛtaṃ ca svādhyāyapravacane ca | satyaṃ ca svādhyāyapravacane ca | tapaśca svādhyāyapravacane ca | damaśca svādhyāyapravacane ca | śamaśca svādhyāyapravacane ca", english: "Righteousness and study and teaching; truth and study and teaching; austerity and study and teaching; self-control and study and teaching; tranquility and study and teaching." },
        { id: "taittiriya.1.10.1", sanskrit: "अहं वृक्षस्य रेरिवा । कीर्तिः पृष्ठं गिरेरिव । ऊर्ध्वपवित्रो वाजिनीव स्वमृतमस्मि । द्रविणं सवर्चसम् । सुमेधा अमृतोक्षितः । इति त्रिशङ्कोर्वेदानुवचनम्", transliteration: "ahaṃ vṛkṣasya rerivā | kīrtiḥ pṛṣṭhaṃ gireriva | ūrdhvapavitro vājinīva svamṛtamasmi | draviṇaṃ savarcasam | sumedhā amṛtokṣitaḥ | iti triśaṅkorvedānuvacanam", english: "I am the mover of the tree. My fame is like the peak of a mountain. I am high and pure like the nectar in the sun." },
        { id: "taittiriya.1.11.1", sanskrit: "वेदमनूच्याचार्योऽन्तेवासिनमनुशास्ति । सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः । आचार्याय प्रियं धनमाहृत्य प्रजातन्तुं मा व्यवच्छेत्सीः", transliteration: "vedamanūcyācāryo'ntevāsinamanuśāsti | satyaṃ vada | dharmaṃ cara | svādhyāyānmā pramadaḥ | ācārāya priyaṃ dhanamāhṛtya prajātantuṃ mā vyavacchetsīḥ", english: "Having taught the Vedas, the teacher instructs the pupil: Speak the truth. Practice dharma. Do not neglect study. Having brought the teacher his desired gift, do not cut off the line of progeny." },
        { id: "taittiriya.1.12.1", sanskrit: "ॐ शं नो मित्रः शं वरुणः । शं नो भवत्वर्यमा । शं न इन्द्रो बृहस्पतिः । शं नो विष्णुरुरुक्रमः । नमो ब्रह्मणे । नमस्ते वायो । त्वमेव प्रत्यक्षं ब्रह्मासि । त्वामेव प्रत्यक्षं ब्रह्मावादिषम् । ऋतमवादिषम् । सत्यमवादिषम् । तन्मामावीत् । तद्वक्तारमावीत् । आवीन्माम् । आवीद्वक्तारम् । ॐ शान्तिः शान्तिः शान्तिः", transliteration: "oṃ śaṃ no mitraḥ śaṃ varuṇaḥ | śaṃ no bhavatvaryamā | śaṃ na indro bṛhaspatiḥ | śaṃ no viṣṇururukramaḥ | namo brahmaṇe | namaste vāyo | tvameva pratyakṣaṃ brahmāsi | tvāmeva pratyakṣaṃ brahmāvādiṣam | ṛtamavādiṣam | satyamavādiṣam | tanmāmāvīt | tadvaktāramāvīt | āvīnmām | āvīdvaktāram | oṃ śāntiḥ śāntiḥ śāntiḥ", english: "Om! May Mitra be propitious to us... I have proclaimed you as the visible Brahman. That has protected me. That has protected the speaker. Om! Peace! Peace! Peace!" }
      ]
    },
    {
      id: "ananda",
      name: "Ananda Valli (Brahmananda Valli)",
      sanskritName: "ब्रह्मानन्दवल्ली",
      verses: [
        { id: "taittiriya.2.1.1", sanskrit: "ॐ ब्रह्मविदाप्नोति परम् । तदेषाऽभ्युक्ता । सत्यं ज्ञानमनन्तं ब्रह्म । यो वेद निहितं गुहायां परमे व्योमन् । सोऽश्नुते सर्वान् कामान्सह । ब्रह्मणा विपश्चितेति", transliteration: "om brahmavidāpnoti param | tadeṣā'bhyuktā | satyaṃ jñānamanantaṃ brahma | yo veda nihitaṃ guhāyāṃ parame vyoman | so'śnute sarvān kāmānsaha | brahmaṇā vipaściteti", english: "The knower of Brahman attains the highest. The ancient seer declared: Brahman is Truth, Knowledge, Infinity. One who knows It as hidden in the cave of the heart attains all desires together with the all-knowing Brahman." },
        { id: "taittiriya.2.2.1", sanskrit: "अन्नाद्वै प्रजाः प्रजायन्ते । याः काश्च पृथिवीं श्रिताः । अथो अन्नेनैव जीवन्ति । अथैनदपि यन्त्यन्ततः । अन्नं हि भूतानां ज्येष्ठम् । तस्मात्सर्वौषधमुच्यते", transliteration: "annādvai prajāḥ prajāyante | yāḥ kāśca pṛthivīṃ śritāḥ | atho annenaiva jīvanti | athainadapi yantyantataḥ | annaṃ hi bhūtānāṃ jyeṣṭham | tasmātsarvauṣadhamucyate", english: "From food indeed all beings are born. By food they live. Into food they finally enter. Food is the eldest of beings, therefore it is called the panacea." },
        { id: "taittiriya.2.3.1", sanskrit: "प्राणं देवा अनु प्राणन्ति । मनुष्याः पशवश्च ये । प्राणो हि भूतानामायुः । तस्मात्सर्वायुषमुच्यते", transliteration: "prāṇaṃ devā anu prāṇanti | manuṣyāḥ paśavaśca ye | prāṇo hi bhūtānāmāyuḥ | tasmātsarvāyuṣamucyate", english: "Gods, humans, and animals breathe following Prana. Prana is the life-breath of beings — therefore it is called the all-life." },
        { id: "taittiriya.2.4.1", sanskrit: "यतो वाचो निवर्तन्ते । अप्राप्य मनसा सह । आनन्दं ब्रह्मणो विद्वान् । न बिभेति कदाचनेति", transliteration: "yato vāco nivartante | aprāpya manasā saha | ānandaṃ brahmaṇo vidvān | na bibheti kadācaneti", english: "Whence words return back, together with the mind, without reaching It — the knower of the bliss of Brahman fears nothing at all." },
        { id: "taittiriya.2.5.1", sanskrit: "विज्ञानं यज्ञं तनुते । कर्माणि तनुतेऽपि च । विज्ञानं देवाः सर्वे । ब्रह्म ज्येष्ठमुपासते", transliteration: "vijñānaṃ yajñaṃ tanute | karmāṇi tanute'pi ca | vijñānaṃ devāḥ sarve | brahma jyeṣṭhamupāsate", english: "Knowledge organizes sacrifice. Knowledge drives all actions. All gods worship Brahman as the highest knowledge." },
        { id: "taittiriya.2.6.1", sanskrit: "असन्नेव स भवति । असद्ब्रह्मेति वेद चेत् । अस्ति ब्रह्मेति चेद्वेद । सन्तमेनं ततो विदुरिति", transliteration: "asanneva sa bhavati | asadbrahmeti veda cet | asti brahmeti cedveda | santamenaṃ tato viduriti", english: "If one knows Brahman as 'non-being', he becomes non-being. If one knows Brahman as 'being', the wise know him as the real." },
        { id: "taittiriya.2.7.1", sanskrit: "असद्वा इदमग्र आसीत् । ततो वै सदजायत । तदात्मानं स्वयमकुरुत । तस्मात्तत्सुकृतमुच्यत इति", transliteration: "asadvā idamagra āsīt | tato vai sadajāyata | tadātmānaṃ svayamakuruta | tasmāttatsukṛtamucyata iti", english: "Non-being indeed was this in the beginning. From it, Being was born. It created itself by itself — therefore it is called the well-created." },
        { id: "taittiriya.2.8.1", sanskrit: "भीषाऽस्माद्वातः पवते । भीषोदेति सूर्यः । भीषाऽस्मादग्निश्चेन्द्रश्च । मृत्युर्धावति पञ्चम इति", transliteration: "bhīṣā'smādvātaḥ pavate | bhīṣodeti sūryaḥ | bhīṣā'smādagniścendraśca | mṛtyurdhāvati pañcama iti", english: "From fear of Him the wind blows. From fear of Him the sun rises. From fear of Him fire and Indra act. Death, the fifth, runs after Him." },
        { id: "taittiriya.2.9.1", sanskrit: "यतो वाचो निवर्तन्ते । अप्राप्य मनसा सह । आनन्दं ब्रह्मणो विद्वान् । न बिभेति कुतश्चनेति", transliteration: "yato vāco nivartante | aprāpya manasā saha | ānandaṃ brahmaṇo vidvān | na bibheti kutaścaneti", english: "Whence words return back, together with the mind, without reaching It — the knower of the bliss of Brahman fears nothing at all." }
      ]
    },
    {
      id: "bhrigu",
      name: "Bhrigu Valli",
      sanskritName: "भृगुवल्ली",
      verses: [
        { id: "taittiriya.3.1.1", sanskrit: "भृगुर्वै वारुणिः । वरुणं पितरमुपससार । अधीहि भगवो ब्रह्मेति । तस्मा एतत्प्रोवाच । अन्नं प्राणं चक्षुः श्रोत्रं मनो वाचमिति", transliteration: "bhṛgurvai vāruṇiḥ | varuṇaṃ pitaramupasasāra | adhīhi bhagavo brahmeti | tasmā etatprovāca | annaṃ prāṇaṃ cakṣuḥ śrotraṃ mano vācamiti", english: "Bhrigu, the son of Varuna, approached his father Varuna, saying: 'Lord, teach me Brahman.' He told him: 'Food, breath, the eye, the ear, the mind, speech.'" },
        { id: "taittiriya.3.2.1", sanskrit: "अन्नं ब्रह्मेति व्यजानात् । अन्नाद्ध्येव खल्विमानि भूतानि जायन्ते । अन्नेन जातानि जीवन्ति । अन्नं प्रयन्त्यभिसंविशन्तीति", transliteration: "annaṃ brahmeti vyajānāt | annāddhyeva khalvimāni bhūtāni jāyante | annena jātāni jīvanti | annaṃ prayantyabhisaṃviśantīti", english: "He understood: 'Food is Brahman.' For from food beings are born, by food they live, and into food they enter." },
        { id: "taittiriya.3.3.1", sanskrit: "प्राणो ब्रह्मेति व्यजानात् । प्राणाद्ध्येव खल्विमानि भूतानि जायन्ते । प्राणेन जातानि जीवन्ति । प्राणं प्रयन्त्यभिसंविशन्तीति", transliteration: "prāṇo brahmeti vyajānāt | prāṇāddhyeva khalvimāni bhūtāni jāyante | prāṇena jātāni jīvanti | prāṇaṃ prayantyabhisaṃviśantīti", english: "He understood: 'Breath is Brahman.' For from breath beings are born, by breath they live, and into breath they enter." },
        { id: "taittiriya.3.4.1", sanskrit: "मनो ब्रह्मेति व्यजानात् । मनसो ह्येव खल्विमानि भूतानि जायन्ते । मनसा जातानि जीवन्ति । मनः प्रयन्त्यभिसंविशन्तीति", transliteration: "mano brahmeti vyajānāt | manaso hyeva khalvimāni bhūtāni jāyante | manasā jātāni jīvanti | manaḥ prayantyabhisaṃviśantīti", english: "He understood: 'Mind is Brahman.' For from mind beings are born, by mind they live, and into mind they enter." },
        { id: "taittiriya.3.5.1", sanskrit: "विज्ञानं ब्रह्मेति व्यजानात् । विज्ञानाद्ध्येव खल्विमानि भूतानि जायन्ते । विज्ञानेन जातानि जीवन्ति । विज्ञानं प्रयन्त्यभिसंविशन्तीति", transliteration: "vijñānaṃ brahmeti vyajānāt | vijñānāddhyeva khalvimāni bhūtāni jāyante | vijñānena jātāni jīvanti | vijñānaṃ prayantyabhisaṃviśantīti", english: "He understood: 'Knowledge is Brahman.' For from knowledge beings are born, by knowledge they live, and into knowledge they enter." },
        { id: "taittiriya.3.6.1", sanskrit: "आनन्दो ब्रह्मेति व्यजानात् । आनन्दाद्ध्येव खल्विमानि भूतानि जायन्ते । आनन्देन जातानि जीवन्ति । आनन्दं प्रयन्त्यभिसंविशन्तीति", transliteration: "ānando brahmeti vyajānāt | ānandāddhyeva khalvimāni bhūtāni jāyante | ānandena jātāni jīvanti | ānandaṃ prayantyabhisaṃviśantīti", english: "He understood: 'Bliss is Brahman.' For from bliss beings are born, by bliss they live, and into bliss they enter." },
        { id: "taittiriya.3.7.1", sanskrit: "अन्नं न निन्द्यात् । तद्व्रतम् । प्राणो वा अन्नम् । शरीरमन्नादम्", transliteration: "annaṃ na nindyāt | tadvratam | prāṇo vā annam | śarīramannādam", english: "Do not despise food. That is the vow. Prana is food, the body is the eater." },
        { id: "taittiriya.3.8.1", sanskrit: "अन्नं न परिचक्षीत । तद्व्रतम् । आपो वा अन्नम् । ज्योतिरन्नादम्", transliteration: "annaṃ na paricakṣīta | tadvratam | āpo vā annam | jyotirannādam", english: "Do not reject food. That is the vow. Water is food, light is the eater." },
        { id: "taittiriya.3.9.1", sanskrit: "अन्नं बहु कुर्वीत । तद्व्रतम् । पृथिवी वा अन्नम् । आकाशोऽन्नादः", transliteration: "annaṃ bahu kurvīta | tadvratam | pṛthivī vā annam | ākāśo'nnādaḥ", english: "Produce abundant food. That is the vow. Earth is food, space is the eater." },
        { id: "taittiriya.3.10.1", sanskrit: "न कञ्चन वसतौ प्रत्याचक्षीत । तद्व्रतम् । तस्माद्यया कया च विधया बह्वन्नं प्राप्नुयात्", transliteration: "na kañcana vasatau pratyācakṣīta | tadvratam | tasmādyayā kaya ca vidhayā bahvannaṃ prāpnuyāt", english: "Do not turn away anyone who seeks shelter. That is the vow. Therefore one should obtain abundant food by any means." },
        { id: "taittiriya.3.10.5", sanskrit: "अहमन्नमहमन्नमहमन्नम् । अहमन्नादोऽहमन्नादोऽहमन्नादः । अहं श्लोककृदहं श्लोककृदहं श्लोककृत् । अहमस्मि प्रथमजा ऋतस्य । पूर्वं देवेभ्योऽमृतस्य नाभिः", transliteration: "ahamannamahamannamahamannam | ahamannādo'hamannādo'hamannādaḥ | ahaṃ ślokakṛdahaṃ ślokakṛdahaṃ ślokakṛt | ahamasmi prathamajā ṛtasya | pūrvaṃ devebhyo'mṛtasya nābhiḥ", english: "I am food, I am food, I am food. I am the eater of food, I am the eater of food, I am the eater of food. I am the poet, I am the poet, I am the poet. I am the first-born of the cosmic order. Before the gods, I am the navel of immortality." }
      ]
    }
  ],  verses: [
{ id: "taittiriya.1.1.1", sanskrit: "ॐ शं नो मित्रः शं वरुणः । शं नो भवत्वर्यमा । शं न इन्द्रो बृहस्पतिः । शं नो विष्णुरुरुक्रमः । नमो ब्रह्मणे । नमस्ते वायो । त्वमेव प्रत्यक्षं ब्रह्मासि । त्वामेव प्रत्यक्षं ब्रह्म वदिष्यामि । ऋतं वदिष्यामि । सत्यं वदिष्यामि । तन्मामवतु । तद्वक्तारमवतु । अवतु माम् । अवतु वक्तारम् । ॐ शान्तिः शान्तिः शान्तिः", transliteration: "oṃ śaṃ no mitraḥ śaṃ varuṇaḥ | śaṃ no bhavatvaryamā | śaṃ na indro bṛhaspatiḥ | śaṃ no viṣṇururukramaḥ | namo brahmaṇe | namaste vāyo | tvameva pratyakṣaṃ brahmāsi | tvāmeva pratyakṣaṃ brahma vadiṣyāmi | ṛtaṃ vadiṣyāmi | satyaṃ vadiṣyāmi | tanmāmavatu | tadvaktāramavatu | avatu mām | avatu vaktāram | oṃ śāntiḥ śāntiḥ śāntiḥ", english: "Om! May Mitra be propitious to us, and Varuna! May Aryaman be propitious to us! May Indra and Brihaspati be propitious to us! May Vishnu, of wide strides, be propitious to us! Salutation to Brahman! Salutation to you, O Vayu! You are indeed the visible Brahman. I shall proclaim you as the visible Brahman. Om! Peace! Peace! Peace!" },
{ id: "taittiriya.1.2.1", sanskrit: "ॐ शीक्षां व्याख्यास्यामः । वर्णः स्वरः । मात्रा बलम् । साम सन्तानः । इत्युक्तः शीक्षाध्यायः", transliteration: "oṃ śīkṣāṃ vyākhyāsyāmaḥ | varṇaḥ svaraḥ | mātrā balam | sāma santānaḥ | ityuktaḥ śīkṣādhyāyaḥ", english: "Om! We shall explain the science of pronunciation: sound, accent, quantity, force, modulation, and combination." },
{ id: "taittiriya.1.3.1", sanskrit: "सह नौ यशः । सह नौ ब्रह्मवर्चसम् । अथातः संहिताया उपनिषदं व्याख्यास्यामः । पञ्चस्वधिकरणेषु । अधिलोकमधिज्यौतिषमधिविद्यमधिप्रजमध्यात्मम् । ता महासंहिता इत्याचक्षते", transliteration: "saha nau yaśaḥ | saha nau brahmavarcasam | athātaḥ saṃhitāyā upaniṣadaṃ vyākhyāsyāmaḥ | pañcasvadhikaraṇeṣu | adhilokamadhijyautiṣamadhividyamadhiprajamadhyātmam | tā mahāsaṃhitā ityācakṣate", english: "May glory and Brahman-splendor be with us both. Now we shall explain the Upanishad of the Samhita, under five heads: with reference to the worlds, heavenly lights, knowledge, progeny, and the Self." },
{ id: "taittiriya.1.4.1", sanskrit: "यश्छन्दसामृषभो विश्वरूपः । छन्दोभ्योऽध्यमृतात्सम्बभूव । स मेन्द्रो मेधया स्पृणोतु । अमृतस्य देव धारणो भूयासम् । शरीरं मे विचर्षणम् । जिह्वा मे मधुमत्तमा । कर्णाभ्यां भूरिविश्रुवम् । ब्रह्मणः कोशोऽसि मेधया पिहितः । श्रुतं मे गोपाय", transliteration: "yaśchandasāmṛṣabho viśvarūpaḥ | chandobhyo'dhyamṛtātsambabhūva | sa mendro medhayā spṛṇotu | amṛtasya deva dhāraṇo bhūyāsam | śarīraṃ me vicarṣaṇam | jihvā me madhumattamā | karṇābhyāṃ bhūriviśruvam | brahmaṇaḥ kośo'si medhayā pihitaḥ | śrutaṃ me gopāya", english: "May the bull of the Vedas, the all-formed one, who sprang from the immortal Vedas — may Indra strengthen me with intelligence. May I become the possessor of immortality." },
{ id: "taittiriya.1.5.1", sanskrit: "भूर्भुवः सुवरिति वा एतास्तिस्रो व्याहृतयः । तासामुहस्मै तां चतुर्थीम् । माहाचमस्यः प्रवेदयते । मह इति । तद्ब्रह्म । स आत्मा । अङ्गान्यन्या देवताः", transliteration: "bhūrbhuvaḥ suvariti vā etāstisro vyāhṛtayaḥ | tāsāmuhasmai tāṃ caturthīm | māhācamasyaḥ pravedayate | maha iti | tadbrahma | sa ātmā | aṅgānyanyā devatāḥ", english: "Bhuh, Bhuvah, Suvah — these are the three great utterances. The fourth, Mahah, was taught by Mahacamasya: that is Brahman, that is the Self. The other gods are its limbs." },
{ id: "taittiriya.1.6.1", sanskrit: "स य एषोऽन्तर्हृदय आकाशः । तस्मिन्नयं पुरुषो मनोमयः । अमृतो हिरण्मयः । अन्तरेण तालुके । य एष स्तन इवावलम्बते । सेन्द्रयोनिः", transliteration: "sa ya eṣo'ntarhṛdaya ākāśaḥ | tasminnayaṃ puruṣo manomayaḥ | amṛto hiraṇmayaḥ | antareṇa tāluke | ya eṣa stana ivāvalambate | sendrayoniḥ", english: "The space within the heart — in it dwells the Person consisting of mind, immortal and luminous. Between the palates it hangs like a nipple — this is the birthplace of Indra." },
{ id: "taittiriya.1.7.1", sanskrit: "पृथिव्यन्तरिक्षं द्यौर्दिशोऽवान्तरदिशाः । अग्निर्वायुरादित्यश्चन्द्रमा नक्षत्राणि । आप ओषधयो वनस्पतय आकाश आत्मा । इत्यधिभूतम् । अथाध्यात्मम् । प्राणो व्यानोऽपान उदानः समानः", transliteration: "pṛthivyantarikṣaṃ dyaurdiśo'vāntaradiśāḥ | agnirvāyurādityaścandramā nakṣatrāṇi | āpa oṣadhayo vanaspataya ākāśa ātmā | ityadhibhūtam | athādhyātmam | prāṇo vyāno'pāna udānaḥ samānaḥ", english: "Earth, sky, heaven, quarters, and intermediate quarters; fire, air, sun, moon, and stars; water, herbs, trees, space, and the Self — thus with reference to the elements." },
{ id: "taittiriya.1.8.1", sanskrit: "ओमिति ब्रह्म । ओमितीदं सर्वम् । ओमित्येतदनुकृतिर्हस्म वा अप्योश्रावयेत्याश्रावयन्ति । ओमिति सामानि गायन्ति । ॐ शोमिति शस्त्राणि शंसन्ति", transliteration: "omiti brahma | omitīdaṃ sarvam | omityetadanukṛtirhasma vā apyośrāvayetyāśrāvayanti | omiti sāmāni gāyanti | oṃ śomiti śastrāṇi śaṃsanti", english: "Om is Brahman. Om is all this. With Om the Saman hymns are sung. With 'Om' the recitations are intoned." },
{ id: "taittiriya.1.9.1", sanskrit: "ऋतं च स्वाध्यायप्रवचने च । सत्यं च स्वाध्यायप्रवचने च । तपश्च स्वाध्यायप्रवचने च । दमश्च स्वाध्यायप्रवचने च । शमश्च स्वाध्यायप्रवचने च", transliteration: "ṛtaṃ ca svādhyāyapravacane ca | satyaṃ ca svādhyāyapravacane ca | tapaśca svādhyāyapravacane ca | damaśca svādhyāyapravacane ca | śamaśca svādhyāyapravacane ca", english: "Righteousness and study and teaching; truth and study and teaching; austerity and study and teaching; self-control and study and teaching; tranquility and study and teaching." },
{ id: "taittiriya.1.10.1", sanskrit: "अहं वृक्षस्य रेरिवा । कीर्तिः पृष्ठं गिरेरिव । ऊर्ध्वपवित्रो वाजिनीव स्वमृतमस्मि । द्रविणं सवर्चसम् । सुमेधा अमृतोक्षितः । इति त्रिशङ्कोर्वेदानुवचनम्", transliteration: "ahaṃ vṛkṣasya rerivā | kīrtiḥ pṛṣṭhaṃ gireriva | ūrdhvapavitro vājinīva svamṛtamasmi | draviṇaṃ savarcasam | sumedhā amṛtokṣitaḥ | iti triśaṅkorvedānuvacanam", english: "I am the mover of the tree. My fame is like the peak of a mountain. I am high and pure like the nectar in the sun." },
{ id: "taittiriya.1.11.1", sanskrit: "वेदमनूच्याचार्योऽन्तेवासिनमनुशास्ति । सत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः । आचार्याय प्रियं धनमाहृत्य प्रजातन्तुं मा व्यवच्छेत्सीः", transliteration: "vedamanūcyācāryo'ntevāsinamanuśāsti | satyaṃ vada | dharmaṃ cara | svādhyāyānmā pramadaḥ | ācārāya priyaṃ dhanamāhṛtya prajātantuṃ mā vyavacchetsīḥ", english: "Having taught the Vedas, the teacher instructs the pupil: Speak the truth. Practice dharma. Do not neglect study. Having brought the teacher his desired gift, do not cut off the line of progeny." },
{ id: "taittiriya.1.12.1", sanskrit: "ॐ शं नो मित्रः शं वरुणः । शं नो भवत्वर्यमा । शं न इन्द्रो बृहस्पतिः । शं नो विष्णुरुरुक्रमः । नमो ब्रह्मणे । नमस्ते वायो । त्वमेव प्रत्यक्षं ब्रह्मासि । त्वामेव प्रत्यक्षं ब्रह्मावादिषम् । ऋतमवादिषम् । सत्यमवादिषम् । तन्मामावीत् । तद्वक्तारमावीत् । आवीन्माम् । आवीद्वक्तारम् । ॐ शान्तिः शान्तिः शान्तिः", transliteration: "oṃ śaṃ no mitraḥ śaṃ varuṇaḥ | śaṃ no bhavatvaryamā | śaṃ na indro bṛhaspatiḥ | śaṃ no viṣṇururukramaḥ | namo brahmaṇe | namaste vāyo | tvameva pratyakṣaṃ brahmāsi | tvāmeva pratyakṣaṃ brahmāvādiṣam | ṛtamavādiṣam | satyamavādiṣam | tanmāmāvīt | tadvaktāramāvīt | āvīnmām | āvīdvaktāram | oṃ śāntiḥ śāntiḥ śāntiḥ", english: "Om! May Mitra be propitious to us... I have proclaimed you as the visible Brahman. That has protected me. That has protected the speaker. Om! Peace! Peace! Peace!" },
{ id: "taittiriya.2.1.1", sanskrit: "ॐ ब्रह्मविदाप्नोति परम् । तदेषाऽभ्युक्ता । सत्यं ज्ञानमनन्तं ब्रह्म । यो वेद निहितं गुहायां परमे व्योमन् । सोऽश्नुते सर्वान् कामान्सह । ब्रह्मणा विपश्चितेति", transliteration: "om brahmavidāpnoti param | tadeṣā'bhyuktā | satyaṃ jñānamanantaṃ brahma | yo veda nihitaṃ guhāyāṃ parame vyoman | so'śnute sarvān kāmānsaha | brahmaṇā vipaściteti", english: "The knower of Brahman attains the highest. The ancient seer declared: Brahman is Truth, Knowledge, Infinity. One who knows It as hidden in the cave of the heart attains all desires together with the all-knowing Brahman." },
{ id: "taittiriya.2.2.1", sanskrit: "अन्नाद्वै प्रजाः प्रजायन्ते । याः काश्च पृथिवीं श्रिताः । अथो अन्नेनैव जीवन्ति । अथैनदपि यन्त्यन्ततः । अन्नं हि भूतानां ज्येष्ठम् । तस्मात्सर्वौषधमुच्यते", transliteration: "annādvai prajāḥ prajāyante | yāḥ kāśca pṛthivīṃ śritāḥ | atho annenaiva jīvanti | athainadapi yantyantataḥ | annaṃ hi bhūtānāṃ jyeṣṭham | tasmātsarvauṣadhamucyate", english: "From food indeed all beings are born. By food they live. Into food they finally enter. Food is the eldest of beings, therefore it is called the panacea." },
{ id: "taittiriya.2.3.1", sanskrit: "प्राणं देवा अनु प्राणन्ति । मनुष्याः पशवश्च ये । प्राणो हि भूतानामायुः । तस्मात्सर्वायुषमुच्यते", transliteration: "prāṇaṃ devā anu prāṇanti | manuṣyāḥ paśavaśca ye | prāṇo hi bhūtānāmāyuḥ | tasmātsarvāyuṣamucyate", english: "Gods, humans, and animals breathe following Prana. Prana is the life-breath of beings — therefore it is called the all-life." },
{ id: "taittiriya.2.4.1", sanskrit: "यतो वाचो निवर्तन्ते । अप्राप्य मनसा सह । आनन्दं ब्रह्मणो विद्वान् । न बिभेति कदाचनेति", transliteration: "yato vāco nivartante | aprāpya manasā saha | ānandaṃ brahmaṇo vidvān | na bibheti kadācaneti", english: "Whence words return back, together with the mind, without reaching It — the knower of the bliss of Brahman fears nothing at all." },
{ id: "taittiriya.2.5.1", sanskrit: "विज्ञानं यज्ञं तनुते । कर्माणि तनुतेऽपि च । विज्ञानं देवाः सर्वे । ब्रह्म ज्येष्ठमुपासते", transliteration: "vijñānaṃ yajñaṃ tanute | karmāṇi tanute'pi ca | vijñānaṃ devāḥ sarve | brahma jyeṣṭhamupāsate", english: "Knowledge organizes sacrifice. Knowledge drives all actions. All gods worship Brahman as the highest knowledge." },
{ id: "taittiriya.2.6.1", sanskrit: "असन्नेव स भवति । असद्ब्रह्मेति वेद चेत् । अस्ति ब्रह्मेति चेद्वेद । सन्तमेनं ततो विदुरिति", transliteration: "asanneva sa bhavati | asadbrahmeti veda cet | asti brahmeti cedveda | santamenaṃ tato viduriti", english: "If one knows Brahman as 'non-being', he becomes non-being. If one knows Brahman as 'being', the wise know him as the real." },
{ id: "taittiriya.2.7.1", sanskrit: "असद्वा इदमग्र आसीत् । ततो वै सदजायत । तदात्मानं स्वयमकुरुत । तस्मात्तत्सुकृतमुच्यत इति", transliteration: "asadvā idamagra āsīt | tato vai sadajāyata | tadātmānaṃ svayamakuruta | tasmāttatsukṛtamucyata iti", english: "Non-being indeed was this in the beginning. From it, Being was born. It created itself by itself — therefore it is called the well-created." },
{ id: "taittiriya.2.8.1", sanskrit: "भीषाऽस्माद्वातः पवते । भीषोदेति सूर्यः । भीषाऽस्मादग्निश्चेन्द्रश्च । मृत्युर्धावति पञ्चम इति", transliteration: "bhīṣā'smādvātaḥ pavate | bhīṣodeti sūryaḥ | bhīṣā'smādagniścendraśca | mṛtyurdhāvati pañcama iti", english: "From fear of Him the wind blows. From fear of Him the sun rises. From fear of Him fire and Indra act. Death, the fifth, runs after Him." },
{ id: "taittiriya.2.9.1", sanskrit: "यतो वाचो निवर्तन्ते । अप्राप्य मनसा सह । आनन्दं ब्रह्मणो विद्वान् । न बिभेति कुतश्चनेति", transliteration: "yato vāco nivartante | aprāpya manasā saha | ānandaṃ brahmaṇo vidvān | na bibheti kutaścaneti", english: "Whence words return back, together with the mind, without reaching It — the knower of the bliss of Brahman fears nothing at all." },
{ id: "taittiriya.3.1.1", sanskrit: "भृगुर्वै वारुणिः । वरुणं पितरमुपससार । अधीहि भगवो ब्रह्मेति । तस्मा एतत्प्रोवाच । अन्नं प्राणं चक्षुः श्रोत्रं मनो वाचमिति", transliteration: "bhṛgurvai vāruṇiḥ | varuṇaṃ pitaramupasasāra | adhīhi bhagavo brahmeti | tasmā etatprovāca | annaṃ prāṇaṃ cakṣuḥ śrotraṃ mano vācamiti", english: "Bhrigu, the son of Varuna, approached his father Varuna, saying: 'Lord, teach me Brahman.' He told him: 'Food, breath, the eye, the ear, the mind, speech.'" },
{ id: "taittiriya.3.2.1", sanskrit: "अन्नं ब्रह्मेति व्यजानात् । अन्नाद्ध्येव खल्विमानि भूतानि जायन्ते । अन्नेन जातानि जीवन्ति । अन्नं प्रयन्त्यभिसंविशन्तीति", transliteration: "annaṃ brahmeti vyajānāt | annāddhyeva khalvimāni bhūtāni jāyante | annena jātāni jīvanti | annaṃ prayantyabhisaṃviśantīti", english: "He understood: 'Food is Brahman.' For from food beings are born, by food they live, and into food they enter." },
{ id: "taittiriya.3.3.1", sanskrit: "प्राणो ब्रह्मेति व्यजानात् । प्राणाद्ध्येव खल्विमानि भूतानि जायन्ते । प्राणेन जातानि जीवन्ति । प्राणं प्रयन्त्यभिसंविशन्तीति", transliteration: "prāṇo brahmeti vyajānāt | prāṇāddhyeva khalvimāni bhūtāni jāyante | prāṇena jātāni jīvanti | prāṇaṃ prayantyabhisaṃviśantīti", english: "He understood: 'Breath is Brahman.' For from breath beings are born, by breath they live, and into breath they enter." },
{ id: "taittiriya.3.4.1", sanskrit: "मनो ब्रह्मेति व्यजानात् । मनसो ह्येव खल्विमानि भूतानि जायन्ते । मनसा जातानि जीवन्ति । मनः प्रयन्त्यभिसंविशन्तीति", transliteration: "mano brahmeti vyajānāt | manaso hyeva khalvimāni bhūtāni jāyante | manasā jātāni jīvanti | manaḥ prayantyabhisaṃviśantīti", english: "He understood: 'Mind is Brahman.' For from mind beings are born, by mind they live, and into mind they enter." },
{ id: "taittiriya.3.5.1", sanskrit: "विज्ञानं ब्रह्मेति व्यजानात् । विज्ञानाद्ध्येव खल्विमानि भूतानि जायन्ते । विज्ञानेन जातानि जीवन्ति । विज्ञानं प्रयन्त्यभिसंविशन्तीति", transliteration: "vijñānaṃ brahmeti vyajānāt | vijñānāddhyeva khalvimāni bhūtāni jāyante | vijñānena jātāni jīvanti | vijñānaṃ prayantyabhisaṃviśantīti", english: "He understood: 'Knowledge is Brahman.' For from knowledge beings are born, by knowledge they live, and into knowledge they enter." },
{ id: "taittiriya.3.6.1", sanskrit: "आनन्दो ब्रह्मेति व्यजानात् । आनन्दाद्ध्येव खल्विमानि भूतानि जायन्ते । आनन्देन जातानि जीवन्ति । आनन्दं प्रयन्त्यभिसंविशन्तीति", transliteration: "ānando brahmeti vyajānāt | ānandāddhyeva khalvimāni bhūtāni jāyante | ānandena jātāni jīvanti | ānandaṃ prayantyabhisaṃviśantīti", english: "He understood: 'Bliss is Brahman.' For from bliss beings are born, by bliss they live, and into bliss they enter." },
{ id: "taittiriya.3.7.1", sanskrit: "अन्नं न निन्द्यात् । तद्व्रतम् । प्राणो वा अन्नम् । शरीरमन्नादम्", transliteration: "annaṃ na nindyāt | tadvratam | prāṇo vā annam | śarīramannādam", english: "Do not despise food. That is the vow. Prana is food, the body is the eater." },
{ id: "taittiriya.3.8.1", sanskrit: "अन्नं न परिचक्षीत । तद्व्रतम् । आपो वा अन्नम् । ज्योतिरन्नादम्", transliteration: "annaṃ na paricakṣīta | tadvratam | āpo vā annam | jyotirannādam", english: "Do not reject food. That is the vow. Water is food, light is the eater." },
{ id: "taittiriya.3.9.1", sanskrit: "अन्नं बहु कुर्वीत । तद्व्रतम् । पृथिवी वा अन्नम् । आकाशोऽन्नादः", transliteration: "annaṃ bahu kurvīta | tadvratam | pṛthivī vā annam | ākāśo'nnādaḥ", english: "Produce abundant food. That is the vow. Earth is food, space is the eater." },
{ id: "taittiriya.3.10.1", sanskrit: "न कञ्चन वसतौ प्रत्याचक्षीत । तद्व्रतम् । तस्माद्यया कया च विधया बह्वन्नं प्राप्नुयात्", transliteration: "na kañcana vasatau pratyācakṣīta | tadvratam | tasmādyayā kaya ca vidhayā bahvannaṃ prāpnuyāt", english: "Do not turn away anyone who seeks shelter. That is the vow. Therefore one should obtain abundant food by any means." },
{ id: "taittiriya.3.10.5", sanskrit: "अहमन्नमहमन्नमहमन्नम् । अहमन्नादोऽहमन्नादोऽहमन्नादः । अहं श्लोककृदहं श्लोककृदहं श्लोककृत् । अहमस्मि प्रथमजा ऋतस्य । पूर्वं देवेभ्योऽमृतस्य नाभिः", transliteration: "ahamannamahamannamahamannam | ahamannādo'hamannādo'hamannādaḥ | ahaṃ ślokakṛdahaṃ ślokakṛdahaṃ ślokakṛt | ahamasmi prathamajā ṛtasya | pūrvaṃ devebhyo'mṛtasya nābhiḥ", english: "I am food, I am food, I am food. I am the eater of food, I am the eater of food, I am the eater of food. I am the poet, I am the poet, I am the poet. I am the first-born of the cosmic order. Before the gods, I am the navel of immortality." },
  ]
}

export const allUpanishads: Upanishad[] = [
  ishaUpanishad,
  kathaUpanishad,
  mandukyaUpanishad,
  kenaUpanishad,
  aitareyaUpanishad,
  prashnaUpanishad,
  mundakaUpanishad,
  taittiriyaUpanishad,
]

export const allUpanishadVerses: UpanishadVerse[] = allUpanishads.flatMap((u) => u.verses)

export function getUpanishad(id: string): Upanishad | undefined {
  return allUpanishads.find((u) => u.id === id)
}

export function getUpanishadVerse(verseId: string): UpanishadVerse | undefined {
  return allUpanishadVerses.find((v) => v.id === verseId)
}