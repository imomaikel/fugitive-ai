import { z } from 'zod';

export const PredictionSchema = z.object({
  city: z.string(),
  country: z.string(),
  location: z.string(),
  reasoning: z.string(),
});
