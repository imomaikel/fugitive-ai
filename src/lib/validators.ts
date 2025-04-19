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
    'incarcerated',
    'executed',
  ]),

  birthDate: z.date().nullable(),
  identifyNumber: z.string().nullable(),
  nationality: z.string().nullable(),
  appearance: z.string().nullable(),
  notes: z.string().nullable(),
});
export type FugitiveSchema = z.infer<typeof FugitiveValidator>;

export const ViewStateChangeValidator = z.object({
  latitude: z.number(),
  longitude: z.number(),
  zoom: z.number(),
});
export type ViewStateChangeSchema = z.infer<typeof ViewStateChangeValidator>;

export const SignInValidator = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});
export type SignInSchema = z.infer<typeof SignInValidator>;

export const SignUpValidator = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
    return true;
  });
export type SignUpSchema = z.infer<typeof SignUpValidator>;
