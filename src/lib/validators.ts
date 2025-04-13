import { z } from 'zod';

export const FugitiveValidator = z.object({
  id: z.string().nullable(),
  fullName: z.string().min(1),
  gender: z.enum(['male', 'female']),
  dangerLevel: z.enum(['low', 'medium', 'high', 'extreme']),
  status: z.enum([
    'wanted',
    'identified',
    'located',
    'under surveillance',
    'apprehended',
    'no longer wanted',
    'suspected',
    'in hiding',
    'international warrant',
    'pending verification',
  ]),

  birthDate: z.date().nullable(),
  identifyNumber: z.string().nullable(),
  nationality: z.string().nullable(),
  appearance: z.string().nullable(),
  notes: z.string().nullable(),
});
export type FugitiveSchema = z.infer<typeof FugitiveValidator>;
