import 'server-only';

import { env } from '@/env';
import OpenAI from 'openai';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';

class OpenAIClient {
  private client: OpenAI;
  private model: ChatCompletionCreateParamsBase['model'];

  constructor() {
    this.client = new OpenAI({
      apiKey: env.OPEN_AI_API_KEY,
    });
    this.model = 'gpt-4.1-mini';
  }
}

const ai = new OpenAIClient();
export { ai };
