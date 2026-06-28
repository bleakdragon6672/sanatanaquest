// ── Unified AI Service Layer ────────────────────────────────────────
// Provider-agnostic interface for AI completions with automatic failover.
// Falls through: NVIDIA → Groq → HuggingFace → OpenRouter → Google Gemini
// The frontend never depends on a specific provider.

import {
  createProviderConfigs,
  callProvider,
  isRetryableError,
  type CommonRequest,
} from './ai-providers'

export type AIProvider = 'nvidia' | 'groq' | 'huggingface' | 'openrouter' | 'google'

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

// ── Main Service Function ───────────────────────────────────────────

export async function createChatCompletion(
  request: AICompletionRequest,
): Promise<AICompletionResponse> {
  const temperature = request.temperature ?? 0.7
  const maxTokens = request.max_tokens ?? 1024
  const messages = request.messages

  const providers = createProviderConfigs()

  if (providers.length === 0) {
    throw new Error(
      'No AI providers configured. Set at least one API key (e.g. OPENROUTER_API_KEY, GROQ_API_KEY, etc.)',
    )
  }

  const common: CommonRequest = { messages, temperature, max_tokens: maxTokens }
  let lastError: Error | null = null

  for (const provider of providers) {
    const label = `${provider.name} (${provider.model})`
    console.log(`[AI] Trying ${label}...`)

    try {
      const result = await callProvider(provider, common)

      return {
        content: result.content,
        model: result.model,
        provider: provider.name as AIProvider,
      }
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err))

      if (!isRetryableError(err)) {
        // Non-retryable (e.g. invalid API key, bad request) — skip provider
        console.warn(`[AI] ${label} non-retryable error: ${lastError.message}`)
        continue
      }

      // Retryable (rate-limit, server error, network) — try next provider
      const isLast = provider === providers[providers.length - 1]
      if (!isLast) {
        console.warn(
          `[AI] ${label} failed (${lastError.message}). Switching to next provider...`,
        )
        continue
      }

      // All providers exhausted
      console.error(`[AI] All providers failed. Last error: ${lastError.message}`)
      throw new Error(
        'All AI providers are currently busy. Please try again in a minute.',
      )
    }
  }

  throw new Error(
    'All AI providers are currently busy. Please try again in a minute.',
  )
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
