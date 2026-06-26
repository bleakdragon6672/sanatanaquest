import { NextRequest, NextResponse } from 'next/server'
import { createSpiritualGuideCompletion } from '@/lib/ai-service'
import { allVerses, topicIndex, type Verse } from '@/lib/gita-data'
import { allUpanishadVerses, type UpanishadVerse } from '@/lib/upanishad-data'
import { hanumanChalisaVerses, type ChalisaVerse } from '@/lib/hanuman-chalisa-data'
import { bajrangBaanVerses, type BaanVerse } from '@/lib/bajrang-baan-data'
import { shivTandavVerses, type TandavVerse } from '@/lib/shiv-tandav-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface RequestBody {
  action: 'explain' | 'ask' | 'exam' | 'reflection'
  verse?: { id: string; sanskrit: string; transliteration: string; english: string; chapter: number; verseNum: number }
  question?: string
  mode?: 'simple' | 'beginner' | 'student' | 'application'
  journal?: { date: string; content: string; type: string }[]
  activities?: { date: string; type: string; duration?: number }[]
  streak?: number
  level?: string
}

// ── Verse search engine ──────────────────────────────────────────────
// Searches the 700-verse database by keyword, topic, and semantic overlap.
// Returns the top N most relevant verses for the user's question.

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
  'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'against',
  'between', 'into', 'through', 'during', 'before', 'after', 'above',
  'below', 'from', 'up', 'down', 'out', 'off', 'over', 'under',
  'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where',
  'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
  'so', 'than', 'too', 'very', 'just', 'also', 'but', 'and', 'or',
  'if', 'because', 'as', 'until', 'while', 'what', 'which', 'who',
  'whom', 'this', 'that', 'these', 'those', 'i', 'me', 'my', 'we',
  'us', 'our', 'you', 'your', 'he', 'him', 'his', 'she', 'her', 'it',
  'its', 'they', 'them', 'their',
])

// Topic keyword mapping — maps common life topics to Gita themes
const TOPIC_KEYWORDS: { keywords: string[]; topics: string[] }[] = [
  { keywords: ['fear', 'afraid', 'scared', 'anxiety', 'anxious', 'worry', 'worrying', 'panic', 'nervous', 'exam', 'test', 'stress', 'stressed'], topics: ['Fear', 'Stress & Anxiety'] },
  { keywords: ['anger', 'angry', 'rage', 'furious', 'irritated', 'frustrated'], topics: ['Anger'] },
  { keywords: ['karma', 'action', 'work', 'duty', 'job', 'career', 'do'], topics: ['Karma Yoga', 'Duty (Dharma)'] },
  { keywords: ['dharma', 'duty', 'right', 'wrong', 'moral', 'ethics', 'should'], topics: ['Duty (Dharma)'] },
  { keywords: ['soul', 'atman', 'self', 'death', 'die', 'dying', 'afterlife', 'rebirth', 'reincarnation'], topics: ['Fear'] },
  { keywords: ['meditation', 'meditate', 'mind', 'thoughts', 'focus', 'concentrate', 'attention'], topics: ['Discipline', 'Consistency'] },
  { keywords: ['devotion', 'bhakti', 'love', 'god', 'krishna', 'worship', 'pray', 'prayer'], topics: ['Bhakti (Devotion)'] },
  { keywords: ['knowledge', 'wisdom', 'understand', 'understanding', 'truth', 'realize', 'realization'], topics: ['Knowledge (Jnana)'] },
  { keywords: ['surrender', 'let go', 'give up', ' refuge', 'trust', 'faith'], topics: ['Surrender'] },
  { keywords: ['procrastinat', 'lazy', 'laziness', 'delay', 'put off', 'avoid'], topics: ['Procrastination'] },
  { keywords: ['discipline', 'consistent', 'consistency', 'habit', 'routine', 'practice'], topics: ['Discipline', 'Consistency'] },
  { keywords: ['desire', 'want', 'craving', 'attachment', 'attached', 'greed', 'lust'], topics: ['Anger'] },
  { keywords: ['ego', 'pride', 'arrogant', 'humility', 'humble'], topics: ['Knowledge (Jnana)'] },
  { keywords: ['suffering', 'pain', 'sorrow', 'grief', 'sad', 'unhappy', 'miserable'], topics: ['Stress & Anxiety'] },
  { keywords: ['happiness', 'happy', 'joy', 'bliss', 'peace', 'peaceful', 'calm'], topics: ['Surrender'] },
]

function searchRelevantVerses(question: string, maxResults = 3): Verse[] {
  const qLower = question.toLowerCase()
  const words = qLower.split(/\s+/).filter((w) => w.length > 2 && !STOP_WORDS.has(w))

  // Score each verse
  const scored: { verse: Verse; score: number }[] = []

  for (const verse of allVerses) {
    let score = 0
    const englishLower = verse.english.toLowerCase()
    const translitLower = verse.transliteration.toLowerCase()
    const meaningLower = (verse.meaning ?? '').toLowerCase()

    // 1. Direct keyword matches in English translation
    for (const word of words) {
      if (englishLower.includes(word)) score += 3
      if (meaningLower.includes(word)) score += 2
      if (translitLower.includes(word)) score += 1
    }

    // 2. Boost score for topic-matched verses
    for (const topicMapping of TOPIC_KEYWORDS) {
      const hasTopicKeyword = topicMapping.keywords.some((kw) => qLower.includes(kw))
      if (hasTopicKeyword) {
        for (const topicName of topicMapping.topics) {
          const topic = topicIndex.find((t) => t.topic === topicName)
          if (topic && topic.verseIds.includes(verse.id)) {
            score += 5
          }
        }
      }
    }

    if (score > 0) {
      scored.push({ verse, score })
    }
  }

  // Sort by score descending, take top N
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, maxResults).map((s) => s.verse)
}

function formatVerseReference(verse: Verse): string {
  return `Bhagavad Gita ${verse.chapter}.${verse.verse}
Sanskrit: ${verse.sanskrit}
English: ${verse.english}${verse.meaning ? `\nInsight: ${verse.meaning}` : ''}`
}

// ── Multi-scripture search ─────────────────────────────────────────
// Searches across all scriptures: Gita, Upanishads, Chalisa, Baan, Tandav

interface SearchResult {
  source: string
  id: string
  text: string
  score: number
}

function searchAllScriptures(question: string, maxResults = 5): SearchResult[] {
  const qLower = question.toLowerCase()
  const words = qLower.split(/\s+/).filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  const results: SearchResult[] = []

  // Helper: score a text block
  function scoreText(text: string): number {
    const tLower = text.toLowerCase()
    let score = 0
    for (const word of words) {
      if (tLower.includes(word)) score += 3
    }
    return score
  }

  // Additional topic keywords for non-Gita scriptures
  const extraTopics: { keywords: string[]; boost: number; sources: string[] }[] = [
    { keywords: ['hanuman', 'monkey', 'vanara', 'bajrang', 'maruti', 'anjaneya'], boost: 8, sources: ['Hanuman Chalisa', 'Bajrang Baan'] },
    { keywords: ['shiva', 'shankara', 'mahadev', 'neelkanth', 'bhairava', 'tandav', 'dance'], boost: 8, sources: ['Shiv Tandav Stotram'] },
    { keywords: ['protection', 'protect', 'fear', 'afraid', 'courage', 'brave', 'valor', 'shield'], boost: 5, sources: ['Hanuman Chalisa', 'Bajrang Baan'] },
    { keywords: ['chant', 'recite', 'name', 'mantra', 'devotion', 'devotee', 'worship', 'pray'], boost: 4, sources: ['Hanuman Chalisa', 'Bajrang Baan', 'Shiv Tandav Stotram'] },
    { keywords: ['destroy', 'destruction', 'cosmic', 'dance', 'fire', 'burn', 'blaze'], boost: 5, sources: ['Shiv Tandav Stotram'] },
    { keywords: ['atman', 'self', 'brahman', 'consciousness', 'waking', 'dream', 'sleep', 'turiya'], boost: 6, sources: ['Upanishads'] },
    { keywords: ['om', 'aum', 'syllable', 'imperishable', 'eternal'], boost: 6, sources: ['Upanishads'] },
  ]

  function getExtraBoost(text: string, source: string): number {
    let boost = 0
    const tLower = text.toLowerCase()
    for (const topic of extraTopics) {
      if (topic.sources.includes(source) && topic.keywords.some((kw) => qLower.includes(kw) || tLower.includes(kw))) {
        boost += topic.boost
      }
    }
    return boost
  }

  // Search Gita verses
  for (const verse of allVerses) {
    const score = scoreText(`${verse.english} ${verse.meaning ?? ''} ${verse.commentary ?? ''}`)
    // Topic boost
    let topicBoost = 0
    for (const topicMapping of TOPIC_KEYWORDS) {
      if (topicMapping.keywords.some((kw) => qLower.includes(kw))) {
        for (const topicName of topicMapping.topics) {
          const topic = topicIndex.find((t) => t.topic === topicName)
          if (topic && topic.verseIds.includes(verse.id)) topicBoost += 5
        }
      }
    }
    const total = score + topicBoost
    if (total > 0) {
      results.push({
        source: 'Bhagavad Gita',
        id: `${verse.chapter}.${verse.verse}`,
        text: `Bhagavad Gita ${verse.chapter}.${verse.verse}\nSanskrit: ${verse.sanskrit}\nEnglish: ${verse.english}${verse.meaning ? `\nInsight: ${verse.meaning}` : ''}`,
        score: total,
      })
    }
  }

  // Search Upanishads
  for (const verse of allUpanishadVerses) {
    const score = scoreText(`${verse.english} ${verse.commentary ?? ''}`) + getExtraBoost(`${verse.english} ${verse.commentary ?? ''}`, 'Upanishads')
    if (score > 0) {
      results.push({
        source: 'Upanishads',
        id: verse.id,
        text: `Upanishad — ${verse.id}\nSanskrit: ${verse.sanskrit}\nEnglish: ${verse.english}`,
        score,
      })
    }
  }

  // Search Hanuman Chalisa
  for (const verse of hanumanChalisaVerses) {
    const score = scoreText(`${verse.english} ${verse.commentary ?? ''}`) + getExtraBoost(`${verse.english} ${verse.commentary ?? ''}`, 'Hanuman Chalisa')
    if (score > 0) {
      results.push({
        source: 'Hanuman Chalisa',
        id: verse.id,
        text: `Hanuman Chalisa — ${verse.type === 'doha' ? 'Doha' : 'Chaupai'} ${verse.number}\nAwadhi: ${verse.awadhi}\nEnglish: ${verse.english}`,
        score,
      })
    }
  }

  // Search Bajrang Baan
  for (const verse of bajrangBaanVerses) {
    const score = scoreText(`${verse.english} ${verse.commentary ?? ''}`) + getExtraBoost(`${verse.english} ${verse.commentary ?? ''}`, 'Bajrang Baan')
    if (score > 0) {
      results.push({
        source: 'Bajrang Baan',
        id: verse.id,
        text: `Bajrang Baan — ${verse.type === 'doha' ? 'Doha' : 'Chaupai'} ${verse.number}\nAwadhi: ${verse.awadhi}\nEnglish: ${verse.english}`,
        score,
      })
    }
  }

  // Search Shiv Tandav Stotram
  for (const verse of shivTandavVerses) {
    const score = scoreText(`${verse.english} ${verse.commentary ?? ''}`) + getExtraBoost(`${verse.english} ${verse.commentary ?? ''}`, 'Shiv Tandav Stotram')
    if (score > 0) {
      results.push({
        source: 'Shiv Tandav Stotram',
        id: verse.id,
        text: `Shiv Tandav Stotram — Stanza ${verse.number}\nSanskrit: ${verse.sanskrit}\nEnglish: ${verse.english}`,
        score,
      })
    }
  }

  results.sort((a, b) => b.score - a.score)
  return results.slice(0, maxResults)
}

// ── System prompt ────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the Sanatan Quest AI Spiritual Guide — a wise, warm, and knowledgeable teacher of Sanatan Dharma, especially the Bhagavad Gita. You speak with the depth of a Rishi and the warmth of a friend.

Your role:
- Explain the timeless wisdom of the Bhagavad Gita and Sanatan Dharma in clear, modern English
- Connect ancient teachings to everyday life — studies, work, relationships, anxiety, fear, anger, ambition
- Be respectful, non-dogmatic, and inclusive — speak to sincere seekers of all backgrounds
- Be encouraging but never preachy; be deep but never obscure
- Use Sanskrit terms where they illuminate (karma, dharma, atman, guna, etc.) but always explain them

CRITICAL — RESPONSE FORMAT:
When relevant verses are provided to you, you MUST structure your response using this exact format:

**Relevant Verse:**
Bhagavad Gita [Chapter].[Verse]
"[Quote a key phrase from the translation]"

**Explanation:**
[2-3 sentences explaining the verse's teaching in clear, modern language. Connect it to the seeker's specific question.]

**Practical Action:**
[One concrete, actionable step the seeker can take today based on this teaching. Make it specific to their situation.]

If multiple verses are provided, you may include 1-2 "Relevant Verse" sections (pick the most relevant ones), then give a combined Explanation and Practical Action.

If NO verses are provided, answer normally in 2-4 paragraphs, but still try to reference specific verses by chapter and verse number from your knowledge.

Above all: help the seeker apply the wisdom, not just understand it intellectually.`

// ── API handler ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody

    // Input validation: limit question length to prevent abuse
    if (body.question && body.question.length > 2000) {
      return NextResponse.json({ error: 'Question too long. Maximum 2000 characters.' }, { status: 400 })
    }
    if (body.journal && body.journal.length > 50) {
      return NextResponse.json({ error: 'Too many journal entries. Maximum 50.' }, { status: 400 })
    }

    let userPrompt = ''
    let relevantVerses: Verse[] = []
    let searchResults: SearchResult[] = []

    if (body.action === 'explain' && body.verse) {
      const mode = body.mode ?? 'simple'
      const modeInstruction: Record<string, string> = {
        simple: 'Explain this verse in simple English — clear, accessible language.',
        beginner: 'Explain as if speaking to a complete beginner. Define every Sanskrit term.',
        student: 'Explain in a student-friendly way — connect it to studies, discipline, focus, and overcoming distractions.',
        application: 'Explain the verse and give practical modern-life application — how to live it today.',
      }

      // For explain, the verse IS the relevant verse
      const verseObj: Verse = {
        id: body.verse.id,
        chapter: body.verse.chapter,
        verse: body.verse.verseNum,
        sanskrit: body.verse.sanskrit,
        transliteration: body.verse.transliteration,
        english: body.verse.english,
      }

      userPrompt = `${modeInstruction[mode]}

Here is the verse to explain:

${formatVerseReference(verseObj)}

Please provide:
1. A clear explanation of the meaning
2. The key teaching in one sentence
3. A practical way to apply this in daily life

Use the **Relevant Verse**, **Explanation**, and **Practical Action** format.`
    } else if (body.action === 'ask' && body.question) {
      // Search across ALL scriptures
      searchResults = searchAllScriptures(body.question, 5)

      const verseContext = searchResults.length > 0
        ? `\n\nHere are the most relevant verses from across our scriptures for this question:\n\n${searchResults.map((r, i) => `--- Verse ${i + 1} [${r.source}] ---\n${r.text}`).join('\n\n')}\n\nUse these verses as the foundation for your answer. Cite the scripture name and verse reference. Structure your response with **Relevant Verse**, **Explanation**, and **Practical Action**.`
        : '\n\n(No specific verses were found in the database search. Answer from your knowledge of Hindu scriptures, citing specific texts and verse numbers.)'

      userPrompt = `Question from a seeker: ${body.question}${verseContext}`
    } else if (body.action === 'exam' && body.question) {
      // Search across ALL scriptures for student mode too
      searchResults = searchAllScriptures(body.question, 5)

      const verseContext = searchResults.length > 0
        ? `\n\nHere are the most relevant verses from across our scriptures for this student's concern:\n\n${searchResults.map((r, i) => `--- Verse ${i + 1} [${r.source}] ---\n${r.text}`).join('\n\n')}\n\nUse these verses to ground your guidance. Cite the scripture name and verse reference. Structure your response with **Relevant Verse**, **Explanation**, and **Practical Action**.`
        : ''

      userPrompt = `A student is asking for guidance. Their concern is:

${body.question}${verseContext}

Please respond as the Sanatan Quest AI Spiritual Guide in "Exam & Student Mode." Connect the wisdom of the Bhagavad Gita to their specific situation — focus, discipline, motivation, procrastination, stress, consistency, or fear. Be warm, encouraging, and practical.

Use the **Relevant Verse**, **Explanation**, and **Practical Action** format. End the Practical Action with one specific thing they can try today.`
    } else if (body.action === 'reflection' && body.journal) {
      const journalText = body.journal
        .slice(0, 30)
        .map((j) => `[${j.date}] (${j.type}) ${j.content}`)
        .join('\n')
      const activityText = (body.activities ?? [])
        .slice(0, 50)
        .map((a) => `${a.date}: ${a.type}${a.duration ? ` (${a.duration} min)` : ''}`)
        .join('\n')

      userPrompt = `Please generate a "Weekly Spiritual Reflection Summary" for this seeker.

Current level: ${body.level ?? 'Seeker'}
Current streak: ${body.streak ?? 0} days

Their recent journal entries:
${journalText || '(no journal entries this week)'}

Their recent activities:
${activityText || '(no activities logged this week)'}

Based on this, write a personalized weekly reflection (3-4 paragraphs) that:
1. Acknowledges what they did this week — be specific and warm
2. Identifies one pattern or theme you notice
3. Offers one specific encouragement or gentle suggestion for growth
4. Closes with an inspiring verse or principle from the Gita that fits their situation

Be personal, warm, and specific — never generic. Speak directly to "you."`
    } else {
      return NextResponse.json({ error: 'Invalid action or missing parameters' }, { status: 400 })
    }

    const completion = await createSpiritualGuideCompletion(SYSTEM_PROMPT, userPrompt, {
      max_tokens: 1500,
      temperature: 0.7,
    })

    const text = completion.content

    // Return the AI response along with the verses that were found (for ask/exam)
    return NextResponse.json({
      content: text || 'May your quest be blessed. 🙏',
      verses: searchResults.map((r) => ({
        source: r.source,
        id: r.id,
        text: r.text,
      })),
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('AI guide error:', err)
    return NextResponse.json(
      {
        error: 'The Spiritual Guide is briefly silent. Please try again in a moment.',
        details: msg,
      },
      { status: 500 },
    )
  }
}
