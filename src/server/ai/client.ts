import 'server-only';

import { env } from '@/env';
import OpenAI from 'openai';
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions.mjs';

import { getCompletions } from './completions';

class OpenAIClient {
  private client: OpenAI;
  private model: ChatCompletionCreateParamsBase['model'];

  constructor() {
    this.client = new OpenAI({
      apiKey: env.OPEN_AI_API_KEY,
    });
    this.model = 'gpt-4.1-mini';
  }

  async predict(props: Omit<Parameters<typeof getCompletions>[0], 'model'>) {
    const completions = getCompletions({
      ...props,
      model: this.model,
    });

    const result = await this.client.chat.completions.create(completions);
    return result;
  }
}

const ai = new OpenAIClient();
export { ai };
