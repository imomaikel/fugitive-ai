/* eslint-disable @typescript-eslint/no-unused-vars */
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { fugitives, users } from './schema';

// Select
const UserSchema = createSelectSchema(users);
const FugitiveSchema = createSelectSchema(fugitives);

export type UserRaw = z.infer<typeof UserSchema>;
export type FugitiveRaw = z.infer<typeof FugitiveSchema>;

// Insert
export const FugitiveInsertSchema = createInsertSchema(fugitives).omit({ id: true, createdAt: true, updatedAt: true });

export type FugitiveInsert = z.infer<typeof FugitiveInsertSchema>;
