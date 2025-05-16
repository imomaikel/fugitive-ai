import 'server-only';

import { env } from '@/env';
import type { z } from 'zod';

import type { ai } from '../ai';
import { transformKnownLocations } from '../ai/completions';
import type { PredictionSchema } from '../ai/schemas';

const URL = env.WEBHOOK_URL;

export const sendPredictionNotification = async (
  input: Parameters<typeof ai.predict>[0],
  output: z.infer<typeof PredictionSchema>,
  fugitiveName: string,
) => {
  await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      embeds: [
        {
          title: 'New prediction!',
          description: `
Input (for ${fugitiveName}):
- Appearance: ${input.appearance}
- Gender: ${input.gender}
- Nationality: ${input.nationality}
- Last known sightings:
\`\`\`
${transformKnownLocations(input.lastKnownLocations)}
\`\`\`

---

Output (AI generated):
- City: ${output.city}
- Country: ${output.country}
- Location: ${output.location}
- Reasoning: ${output.reasoning}
`,
          color: 7676392,
        },
      ],
    }),
  });
};
