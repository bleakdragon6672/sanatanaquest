// ── Unified AI Service Layer ────────────────────────────────────────
// Provider-agnostic interface for AI completions.
// Currently supports OpenRouter and Z.AI (GLM-4.7 Flash).
// The frontend never depends on a specific provider.

export type AIProvider = 'openrouter' | 'zai'

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

// Free models ranked by quality for spiritual/conversational AI.
// The service tries each in order; on 429 rate-limit it falls back to the next.
const FALLBACK_MODELS = [
  'glm-4-flash', // Z.AI GLM-4.7 Flash
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'google/gemma-4-31b-it:free',
  'openai/gpt-oss-120b:free',
]

function getProviderConfig(): { provider: AIProvider; apiKey: string; baseUrl: string; models: string[] } {
  const provider: AIProvider = process.env.ZAI_API_KEY ? 'zai' : 'openrouter'
  const apiKey = process.env.ZAI_API_KEY || process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('ZAI_API_KEY or OPENROUTER_API_KEY is not set in environment variables')
  }

  const baseUrl = process.env.ZAI_BASE_URL ?? process.env.AI_BASE_URL ?? (provider === 'zai' ? 'https://api.z.ai/v1' : 'https://openrouter.ai/api/v1')
  const primaryModel = process.env.AI_MODEL
  // If user sets a custom model, use it first; otherwise use the default chain
  const models = primaryModel
    ? [primaryModel, ...FALLBACK_MODELS.filter((m) => m !== primaryModel)]
    : FALLBACK_MODELS

  return { provider, apiKey, baseUrl, models }
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

// ── Z.AI Provider ───────────────────────────────────────────────────

async function callZAI(
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
        // Z.AI may require additional headers - these are common for OpenAI-compatible APIs
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
      throw new Error(`Z.AI API error (${response.status}): ${errorBody}`)
    }

    const data = await response.json()

    const content =
      data?.choices?.[0]?.message?.content ??
      data?.message?.content ??
      (typeof data === 'string' ? data : '')

    return {
      content,
      model: data?.model ?? model,
      provider: 'zai',
      usage: data?.usage,
    }
  } finally {
    clearTimeout(timeout)
  }
}

// ── Main Service Function ───────────────────────────────────────────

export async function createChatCompletion(
  request: AICompletionRequest,
): Promise<AICompletionResponse> {
  const config = getProviderConfig()
  const temperature = request.temperature ?? 0.7
  const maxTokens = request.max_tokens ?? 1024

  // If caller specifies a model, try only that one
  const models = request.model ? [request.model] : config.models

  let lastError: Error | null = null

  for (const model of models) {
    try {
      const callApi =
        config.provider === 'zai' ? callZAI : callOpenRouter
      return await callApi(
        config.apiKey,
        config.baseUrl,
        model,
        request.messages,
        temperature,
        maxTokens,
      )
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err))
      const isRateLimit = lastError.message.includes('429')
      if (isRateLimit && model !== models[models.length - 1]) {
        console.warn(`AI model ${model} rate-limited, trying next fallback...`)
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
