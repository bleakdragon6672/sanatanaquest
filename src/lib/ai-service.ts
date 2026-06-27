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

// Use only Z.AI GLM-4.7 Flash (no fallback)
const PRIMARY_MODEL = 'glm-4.7-flash'

function getProviderConfig(): { provider: AIProvider; apiKey: string; baseUrl: string; models: string[] } {
  const provider: AIProvider = 'zai'
  const apiKey = process.env.ZAI_API_KEY
  if (!apiKey) {
    throw new Error('ZAI_API_KEY is not set in environment variables')
  }

  const baseUrl = process.env.ZAI_BASE_URL ?? 'https://api.z.ai/v1'

  return { provider, apiKey, baseUrl, models: [PRIMARY_MODEL] }
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
      console.error(`Z.AI API error (${response.status}): ${errorBody}`)
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
