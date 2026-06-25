import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

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

const SYSTEM_PROMPT = `You are the Sanatan Quest AI Spiritual Guide — a wise, warm, and knowledgeable teacher of Sanatan Dharma, especially the Bhagavad Gita. You speak with the depth of a Rishi and the warmth of a friend.

Your role:
- Explain the timeless wisdom of the Bhagavad Gita and Sanatan Dharma in clear, modern English
- Connect ancient teachings to everyday life — studies, work, relationships, anxiety, fear, anger, ambition
- Be respectful, non-dogmatic, and inclusive — speak to sincere seekers of all backgrounds
- When citing a verse, refer to it as "Chapter X, Verse Y" and quote a phrase from the Sanskrit or translation when relevant
- Be encouraging but never preachy; be deep but never obscure
- When a verse is provided, ground your answer in its specific teaching
- Keep answers focused and reasonably concise — typically 2-5 short paragraphs, occasionally with bullet points for clarity
- Use the Sanskrit terms where they illuminate (karma, dharma, atman, guna, etc.) but always explain them

Above all: help the seeker apply the wisdom, not just understand it intellectually.`

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody

    let userPrompt = ''
    if (body.action === 'explain' && body.verse) {
      const mode = body.mode ?? 'simple'
      const modeInstruction: Record<string, string> = {
        simple: 'Explain this verse in simple English — clear, accessible language.',
        beginner: 'Explain as if speaking to a complete beginner. Define every Sanskrit term.',
        student: 'Explain in a student-friendly way — connect it to studies, discipline, focus, and overcoming distractions.',
        application: 'Explain the verse and give practical modern-life application — how to live it today.',
      }
      userPrompt = `${modeInstruction[mode]}

Verse: Bhagavad Gita Chapter ${body.verse.chapter}, Verse ${body.verse.verseNum}
Sanskrit: ${body.verse.sanskrit}
Transliteration: ${body.verse.transliteration}
English Translation: ${body.verse.english}

Please provide:
1. A clear explanation of the meaning
2. The key teaching in one sentence
3. A practical way to apply this in daily life`
    } else if (body.action === 'ask' && body.question) {
      userPrompt = `Question from a seeker: ${body.question}

Please answer with wisdom from the Bhagavad Gita and Sanatan Dharma. Quote specific verses by chapter and verse number when relevant. Connect the teaching to practical life.`
    } else if (body.action === 'exam' && body.question) {
      userPrompt = `A student is asking for guidance. Their concern is:

${body.question}

Please respond as the Sanatan Quest AI Spiritual Guide in "Exam & Student Mode." Connect the wisdom of the Bhagavad Gita to their specific situation — focus, discipline, motivation, procrastination, stress, consistency, or fear. Quote specific verses (Chapter X, Verse Y) where relevant. Be warm, encouraging, and practical. End with one specific actionable suggestion they can try today.

Keep your response to 3-5 paragraphs — concise but meaningful.`
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

    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      thinking: { type: 'disabled' },
    })

    const text =
      completion?.choices?.[0]?.message?.content ??
      completion?.message?.content ??
      (typeof completion === 'string' ? completion : '')

    return NextResponse.json({ content: text || 'May your quest be blessed. 🙏' })
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
