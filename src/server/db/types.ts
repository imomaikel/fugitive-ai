/* eslint-disable @typescript-eslint/no-unused-vars */
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

import { fugitiveLogs, fugitives, locationHistory, users } from './schema';

// Select
const UserSchema = createSelectSchema(users);
const FugitiveSchema = createSelectSchema(fugitives);
const FugitiveLogsSchema = createSelectSchema(fugitiveLogs);
const LocationHistorySchema = createSelectSchema(locationHistory);

export type UserRaw = z.infer<typeof UserSchema>;
export type FugitiveRaw = z.infer<typeof FugitiveSchema>;
export type FugitiveLogRaw = z.infer<typeof FugitiveLogsSchema>;

// Insert
export const FugitiveInsertSchema = createInsertSchema(fugitives).omit({ id: true, createdAt: true, updatedAt: true });
export const FugitiveLogInsertSchema = createInsertSchema(fugitiveLogs).omit({ id: true, createdAt: true });
export const LocationHistoryInsertSchema = createInsertSchema(locationHistory).omit({ id: true, createdAt: true });

export type FugitiveInsert = z.infer<typeof FugitiveInsertSchema>;
export type FugitiveLogInsert = z.infer<typeof FugitiveLogInsertSchema>;
export type LocationHistoryInsert = z.infer<typeof LocationHistoryInsertSchema>;

// Enums
export type FugitiveStatus = z.infer<typeof FugitiveSchema>['status'];
