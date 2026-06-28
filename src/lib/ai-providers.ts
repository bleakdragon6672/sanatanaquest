// ── Multi-Provider AI Configuration ──────────────────────────────────
// Defines all supported AI providers with their request/response formats.
// Add a new provider by adding one entry to createProviderConfigs().

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface CommonRequest {
  messages: AIMessage[]
  temperature: number
  max_tokens: number
}

export interface ProviderResponse {
  content: string
  model: string
}

export interface AIProviderConfig {
  name: string
  apiKey: string | undefined
  baseURL: string
  model: string
  /** Convert the common request into this provider's wire format. */
  prepareRequest: (
    req: CommonRequest,
  ) => { url: string; headers: Record<string, string>; body: unknown }
  /** Extract content and model name from the raw response. */
  parseResponse: (rawBody: unknown) => ProviderResponse
  /** Check if this provider is properly configured (has API key). */
  isConfigured: boolean
}

// ── Error Classification ────────────────────────────────────────────

export class NonRetryableError extends Error {
  constructor(
    public provider: string,
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'NonRetryableError'
  }
}

export function isRetryableError(err: unknown): boolean {
  if (err instanceof NonRetryableError) return false
  // Network errors, timeouts, 429s, and 5xx are retryable
  return true
}

// ── Helper: format messages as a chat prompt for non-OpenAI providers ─

function messagesToPrompt(messages: AIMessage[]): string {
  return messages
    .map((m) => {
      switch (m.role) {
        case 'system':
          return `System: ${m.content}`
        case 'user':
          return `User: ${m.content}`
        case 'assistant':
          return `Assistant: ${m.content}`
      }
    })
    .join('\n\n')
}

// ── OpenAI-compatible provider factory ───────────────────────────────

function openAICompatible(
  name: string,
  apiKey: string | undefined,
  baseURL: string,
  model: string,
): AIProviderConfig {
  return {
    name,
    apiKey,
    baseURL,
    model,
    isConfigured: !!apiKey,
    prepareRequest(req: CommonRequest) {
      return {
        url: `${baseURL}/chat/completions`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey ?? ''}`,
        },
        body: {
          model,
          messages: req.messages,
          temperature: req.temperature,
          max_tokens: req.max_tokens,
        },
      }
    },
    parseResponse(rawBody: unknown): ProviderResponse {
      const body = rawBody as Record<string, unknown>
      const choices = body?.choices as Array<Record<string, unknown>> | undefined
      const message = choices?.[0]?.message as Record<string, unknown> | undefined
      return {
        content: (message?.content as string) ?? '',
        model: (body?.model as string) ?? model,
      }
    },
  }
}

// ── Provider Definitions ────────────────────────────────────────────

export function createProviderConfigs(): AIProviderConfig[] {
  const nvidiaKey = process.env.NVIDIA_API_KEY
  const groqKey = process.env.GROQ_API_KEY
  const hfKey = process.env.HF_API_KEY
  const openrouterKey = process.env.OPENROUTER_API_KEY
  const googleKey = process.env.GOOGLE_API_KEY

  const nvidiaBase =
    process.env.NVIDIA_BASE_URL ?? 'https://integrate.api.nvidia.com/v1'
  const openrouterBase =
    process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1'

  return [
    // 1. NVIDIA NIM (OpenAI-compatible)
    openAICompatible(
      'nvidia',
      nvidiaKey,
      nvidiaBase,
      'meta/llama-3.1-70b-instruct',
    ),

    // 2. Groq (OpenAI-compatible)
    openAICompatible(
      'groq',
      groqKey,
      'https://api.groq.com/openai/v1',
      'llama-3.3-70b-versatile',
    ),

    // 3. Hugging Face Inference API (non-OpenAI format)
    {
      name: 'huggingface',
      apiKey: hfKey,
      baseURL: 'https://api-inference.huggingface.co/models',
      model: 'mistralai/Mistral-7B-Instruct-v0.3',
      isConfigured: !!hfKey,
      prepareRequest(req: CommonRequest) {
        return {
          url: `${this.baseURL}/${this.model}/v1/chat/completions`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${hfKey ?? ''}`,
          },
          body: {
            model: this.model,
            messages: req.messages,
            temperature: req.temperature,
            max_tokens: req.max_tokens,
          },
        }
      },
      parseResponse(rawBody: unknown): ProviderResponse {
        const body = rawBody as Record<string, unknown>
        const choices = body?.choices as Array<Record<string, unknown>> | undefined
        const message = choices?.[0]?.message as Record<string, unknown> | undefined
        return {
          content: (message?.content as string) ?? '',
          model: (body?.model as string) ?? this.model,
        }
      },
    },

    // 4. OpenRouter (OpenAI-compatible with custom headers)
    {
      name: 'openrouter',
      apiKey: openrouterKey,
      baseURL: openrouterBase,
      model: process.env.AI_MODEL ?? 'qwen/qwen3-next-80b-a3b-instruct:free',
      isConfigured: !!openrouterKey,
      prepareRequest(req: CommonRequest) {
        return {
          url: `${openrouterBase}/chat/completions`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openrouterKey ?? ''}`,
            'HTTP-Referer': process.env.SITE_URL ?? 'https://sanatanaquest.app',
            'X-Title': 'SanatanaQuest Spiritual Guide',
          },
          body: {
            model: this.model,
            messages: req.messages,
            temperature: req.temperature,
            max_tokens: req.max_tokens,
          },
        }
      },
      parseResponse(rawBody: unknown): ProviderResponse {
        const body = rawBody as Record<string, unknown>
        const choices = body?.choices as Array<Record<string, unknown>> | undefined
        const message = choices?.[0]?.message as Record<string, unknown> | undefined
        return {
          content: (message?.content as string) ?? '',
          model: (body?.model as string) ?? this.model,
        }
      },
    },

    // 5. Google AI Studio / Gemini (non-OpenAI format — key in query param)
    {
      name: 'google',
      apiKey: googleKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta',
      model: 'gemini-2.0-flash',
      isConfigured: !!googleKey,
      prepareRequest(req: CommonRequest) {
        const systemMessages = req.messages.filter((m) => m.role === 'system')
        const nonSystemMessages = req.messages.filter((m) => m.role !== 'system')
        const systemInstruction = systemMessages
          .map((m) => m.content)
          .join('\n')

        return {
          url: `${this.baseURL}/models/${this.model}:generateContent?key=${this.apiKey}`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: {
            contents: nonSystemMessages.map((m) => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            })),
            ...(systemInstruction && {
              systemInstruction: { parts: [{ text: systemInstruction }] },
            }),
            generationConfig: {
              temperature: req.temperature,
              maxOutputTokens: req.max_tokens,
            },
          },
        }
      },
      parseResponse(rawBody: unknown): ProviderResponse {
        const body = rawBody as Record<string, unknown>
        const candidates = body?.candidates as Array<Record<string, unknown>> | undefined
        const content = candidates?.[0]?.content as Record<string, unknown> | undefined
        const parts = content?.parts as Array<Record<string, unknown>> | undefined
        return {
          content: parts?.map((p) => p.text as string).join('') ?? '',
          model: this.model,
        }
      },
    },
  ].filter((p) => p.isConfigured)
}

// ── Fallback Engine ──────────────────────────────────────────────────

export async function callProvider(
  provider: AIProviderConfig,
  req: CommonRequest,
  signal?: AbortSignal,
): Promise<ProviderResponse> {
  const { url, headers, body } = provider.prepareRequest(req)
  const timeoutMs = 30_000

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)

  // Link parent signal so the whole chain can be cancelled
  if (signal) {
    signal.addEventListener('abort', () => controller.abort(), { once: true })
  }

  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    })
  } catch (err: unknown) {
    // Network error or timeout — retryable
    throw err
  } finally {
    clearTimeout(timeout)
  }

  // Classify HTTP errors
  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error')
    const status = response.status

    if (status === 400 || status === 401 || status === 403 || status === 404) {
      throw new NonRetryableError(
        provider.name,
        status,
        `${provider.name} API error (${status}): ${errorText}`,
      )
    }

    // 429 or 5xx — retryable
    throw new Error(
      `${provider.name} API error (${status}): ${errorText}`,
    )
  }

  const rawBody = await response.json()
  const result = provider.parseResponse(rawBody)

  console.log(`[AI] ${provider.name} handled request (model: ${result.model})`)

  return result
}
