// ── Unified AI Service Layer ────────────────────────────────────────
// Provider-agnostic interface for AI completions.
// Primary: Google Gemini (free tier, 1,500 req/day)
// Fallback: OpenRouter free models
// The frontend never depends on a specific provider.

import { GoogleGenerativeAI } from '@google/generative-ai'

export type AIProvider = 'gemini' | 'openrouter'

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AICompletionRequest {
  messages: AIMessage[]
  model?: string
  temperature?: number
  max_tokens?: number
}

export interface AICompletionResponse {
  content: string
  model: string
  provider: AIProvider
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

// ── Configuration ───────────────────────────────────────────────────

// Default Gemini model for spiritual/QA use cases
// Override via GEMINI_MODEL env var (e.g. gemini-2.5-flash for newer)
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash'

// OpenRouter free models as fallback chain
const FALLBACK_MODELS = [
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'google/gemma-4-31b-it:free',
  'openai/gpt-oss-120b:free',
]

// Gemini client — lazily initialised on first use
let _geminiClient: GoogleGenerativeAI | null = null
function getGeminiClient(): GoogleGenerativeAI {
  if (!_geminiClient) {
    const key = process.env.GEMINI_KEY
    if (!key) throw new Error('GEMINI_API_KEY is not set')
    _geminiClient = new GoogleGenerativeAI(key)
  }
  return _geminiClient
}

function getOpenRouterConfig(): { apiKey: string; baseUrl: string; models: string[] } {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set in environment variables')
  const baseUrl = process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1'
  const primaryModel = process.env.AI_MODEL
  const models = primaryModel
    ? [primaryModel, ...FALLBACK_MODELS.filter((m) => m !== primaryModel)]
    : FALLBACK_MODELS
  return { apiKey, baseUrl, models }
}

// ── Gemini Provider ────────────────────────────────────────────────

async function callGemini(
  messages: AIMessage[],
  temperature: number,
  maxTokens: number,
): Promise<AICompletionResponse> {
  const client = getGeminiClient()
  const model = client.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
    },
  })

  // Gemini supports systemInstruction as a first-class parameter
  const systemMsg = messages.find((m) => m.role === 'system')
  const history = messages.filter((m) => m.role !== 'system')

  const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
  for (const msg of history) {
    contents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })
  }

  // Pass system instruction to the model config instead of polluting history
  let modelInstance
  if (systemMsg) {
    modelInstance = client.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: systemMsg.content,
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      },
    })
  } else {
    modelInstance = client.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      },
    })
  }

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Gemini request timed out after 30s')), 30_000),
  )

  try {
    const result = await Promise.race([
      modelInstance.generateContent({ contents }),
      timeoutPromise,
    ])

    const response = result.response
    const content = response.text()

    // Rough token estimate (4 chars ≈ 1 token)
    const totalChars = content.length + messages.reduce((s, m) => s + m.content.length, 0)
    const estimatedTokens = Math.ceil(totalChars / 4)

    return {
      content,
      model: GEMINI_MODEL,
      provider: 'gemini',
      usage: {
        prompt_tokens: Math.ceil(totalChars * 0.75),
        completion_tokens: Math.ceil(content.length / 4),
        total_tokens: estimatedTokens,
      },
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.message === 'Gemini request timed out after 30s') {
      throw err
    }
    // Check for 429 / rate limit
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('429') || msg.includes('RATE_LIMIT') || msg.includes('RESOURCE_EXHAUSTED')) {
      throw new Error(`Gemini rate-limited (429): ${msg}`)
    }
    throw new Error(`Gemini API error: ${msg}`)
  }
}

// ── OpenRouter Provider ─────────────────────────────────────────────

async function callOpenRouter(
  apiKey: string,
  baseUrl: string,
  model: string,
  messages: AIMessage[],
  temperature: number,
  maxTokens: number,
): Promise<AICompletionResponse> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000) // 30s timeout

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.SITE_URL ?? 'https://sanatanaquest.app',
        'X-Title': 'SanatanaQuest Spiritual Guide',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`OpenRouter API error (${response.status}): ${errorBody}`)
    }

    const data = await response.json()

    const content =
      data?.choices?.[0]?.message?.content ??
      data?.message?.content ??
      (typeof data === 'string' ? data : '')

    return {
      content,
      model: data?.model ?? model,
      provider: 'openrouter',
      usage: data?.usage,
    }
  } finally {
    clearTimeout(timeout)
  }
}

// ── Main Service Function ───────────────────────────────────────────
//
// Provider priority:
//   1. Gemini (free, 1,500 req/day) — used when GEMINI_API_KEY is set
//   2. OpenRouter free models — fallback when Gemini hits rate limits
//
// If GEMINI_API_KEY is NOT set, falls straight through to OpenRouter.

export async function createChatCompletion(
  request: AICompletionRequest,
): Promise<AICompletionResponse> {
  const temperature = request.temperature ?? 0.7
  const maxTokens = request.max_tokens ?? 1024

  // ── Try Gemini first ────────────────────────────────────────────
  const geminiKey = process.env.GEMINI_KEY
  console.error(`[AI] GEMINI_KEY present: ${!!geminiKey}, length: ${geminiKey?.length ?? 0}`)
  if (geminiKey) {
    try {
      console.error('[AI] Attempting Gemini call...')
      const result = await callGemini(request.messages, temperature, maxTokens)
      console.error('[AI] Gemini succeeded, provider:', result.provider)
      return result
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      const isRateLimit =
        msg.includes('429') ||
        msg.includes('RATE_LIMIT') ||
        msg.includes('RESOURCE_EXHAUSTED')

      if (isRateLimit) {
        console.error('[AI] Gemini rate-limited, falling back to OpenRouter...')
      } else {
        console.error(`[AI] Gemini error (${msg}), falling back to OpenRouter...`)
      }
    }
  } else {
    console.error('[AI] GEMINI_KEY not set, using OpenRouter directly.')
  }

  // ── Fallback: OpenRouter ────────────────────────────────────────
  const orConfig = getOpenRouterConfig()
  const models = request.model ? [request.model] : orConfig.models

  let lastError: Error | null = null

  for (const model of models) {
    try {
      return await callOpenRouter(
        orConfig.apiKey,
        orConfig.baseUrl,
        model,
        request.messages,
        temperature,
        maxTokens,
      )
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err))
      // Retry on rate limits AND transient server errors (5xx)
      const isRetryable =
        lastError.message.includes('429') ||
        lastError.message.includes('500') ||
        lastError.message.includes('502') ||
        lastError.message.includes('503') ||
        lastError.message.includes('504')
      if (isRetryable && model !== models[models.length - 1]) {
        console.warn(`OpenRouter model ${model} failed (${lastError.message}), trying next fallback...`)
        continue
      }
      throw lastError
    }
  }

  throw lastError ?? new Error('All AI models failed')
}

// ── Convenience Helper ──────────────────────────────────────────────

export async function createSpiritualGuideCompletion(
  systemPrompt: string,
  userPrompt: string,
  options?: { model?: string; temperature?: number; max_tokens?: number },
): Promise<AICompletionResponse> {
  return createChatCompletion({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    model: options?.model,
    temperature: options?.temperature,
    max_tokens: options?.max_tokens,
  })
}
