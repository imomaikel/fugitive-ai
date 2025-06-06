import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import type {
  ChatCompletionCreateParamsBase,
  ChatCompletionCreateParamsNonStreaming,
} from 'openai/resources/chat/completions';

import { PredictionSchema } from './schemas';

interface GetCompletionsParams {
  model: ChatCompletionCreateParamsBase['model'];
  gender: string;
  nationality: string;
  appearance: string;
  lastKnownLocations: {
    placeName: string;
    context: string;
    lat: number | string;
    lon: number | string;
    date: string;
  }[];
}

export const transformKnownLocations = (
  lastKnownLocations: Parameters<typeof getCompletions>[0]['lastKnownLocations'],
) => {
  return lastKnownLocations
    .map(
      (loc, idx) =>
        `${idx + 1}. ${loc.placeName} (Lat: ${loc.lat}, Lon: ${loc.lon}) - Seen on ${loc.date}. Notes: ${loc.context}`,
    )
    .join('\n');
};

export const getCompletions = ({
  appearance,
  gender,
  nationality,
  lastKnownLocations,
  model,
}: GetCompletionsParams): ChatCompletionCreateParamsNonStreaming => {
  const dateNow = new Date();
  const month = dateNow.toLocaleString('default', { month: 'long' });
  const day = dateNow.getDate();
  const year = dateNow.getFullYear();
  const dateNowFormatted = `${month} ${day}, ${year}`;

  const locationHistoryText = transformKnownLocations(lastKnownLocations);

  return {
    messages: [
      {
        role: 'system',
        content: `
You are a criminal behavior analyst and geographic profiling expert. 
Your goal is to estimate the current probable location of a fugitive based on movement history, geography, and behavioral reasoning.
You must output only one likely current city and country, location, and explain briefly why it makes sense.
Use spatial reasoning, but stay realistic - don't assume the fugitive teleports or behaves irrationally.
Do not hallucinate - use only the data provided.
`,
      },
      {
        role: 'user',
        content: `
Fugitive profile:

- Gender: ${gender}
- Nationality: ${nationality}
- Appearance: ${appearance}
- Last known sightings:
${locationHistoryText}

As of ${dateNowFormatted} - where is the fugitive most likely to be now?
Include a city and country, location, and your reasoning.
`,
      },
    ],
    store: true,
    model,
    response_format: zodResponseFormat(PredictionSchema, 'event'),
    temperature: 0.6,
    max_tokens: 2000,
  };
};
