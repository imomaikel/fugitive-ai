import { type AdapterAccount } from 'next-auth/adapters';

import { relations, sql } from 'drizzle-orm';
import { index, pgEnum, pgTable, primaryKey } from 'drizzle-orm/pg-core';

/*****************/
/***** ENUMS *****/
/*****************/
export const GenderEnum = pgEnum('gender', ['male', 'female']);
export const DangerLevelEnum = pgEnum('danger_level', ['low', 'medium', 'high', 'extreme']);
export const FugitiveStatusEnum = pgEnum('fugitive_status', [
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
]);

/******************/
/***** Tables *****/
/******************/

export const users = pgTable('user', (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: d.varchar({ length: 255 }),
  image: d.varchar({ length: 255 }),
  emailVerified: d
    .timestamp({
      mode: 'date',
      withTimezone: true,
    })
    .default(sql`CURRENT_TIMESTAMP`),

  email: d.varchar({ length: 255 }).notNull(),
}));

export const accounts = pgTable(
  'account',
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),

    session_state: d.varchar({ length: 255 }),
    token_type: d.varchar({ length: 255 }),
    scope: d.varchar({ length: 255 }),
    expires_at: d.integer(),
    refresh_token: d.text(),
    access_token: d.text(),
    id_token: d.text(),

    type: d.varchar({ length: 255 }).$type<AdapterAccount['type']>().notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    provider: d.varchar({ length: 255 }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.provider, t.providerAccountId] }), index('account_user_id_idx').on(t.userId)],
);

export const sessions = pgTable(
  'session',
  (d) => ({
    sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),

    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),

    expires: d.timestamp({ mode: 'date', withTimezone: true }).notNull(),
  }),
  (t) => [index('t_user_id_idx').on(t.userId)],
);

export const fugitives = pgTable('fugitive', (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  fullName: d.varchar({ length: 255 }).notNull(),
  gender: GenderEnum().notNull(),
  dangerLevel: DangerLevelEnum().notNull(),

  birthDate: d.timestamp({ mode: 'date', withTimezone: true }),
  identifyNumber: d.varchar({ length: 255 }).unique(),
  nationality: d.varchar({ length: 255 }),
  appearance: d.text(),
  notes: d.text(),

  addedByUserId: d.varchar({ length: 255 }).references(() => users.id, { onDelete: 'set null' }),
  addedByUserName: d.varchar({ length: 255 }).notNull(),

  latitude: d.doublePrecision(),
  longitude: d.doublePrecision(),

  status: FugitiveStatusEnum().notNull(),

  createdAt: d.timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: d
    .timestamp({ mode: 'date', withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}));

export const fugitiveLogs = pgTable('fugitive_log', (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  fugitiveId: d
    .varchar({ length: 255 })
    .notNull()
    .references(() => fugitives.id, { onDelete: 'cascade' }),
  userId: d.varchar({ length: 255 }).references(() => users.id, { onDelete: 'set null' }),

  message: d.text().notNull(),

  createdAt: d.timestamp({ mode: 'date', withTimezone: true }).defaultNow().notNull(),
}));

/*****************/
/*** Relations ***/
/*****************/

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  fugitives: many(fugitives),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const fugitivesRelations = relations(fugitives, ({ one, many }) => ({
  addedByUser: one(users, { fields: [fugitives.addedByUserId], references: [users.id] }),
  logs: many(fugitiveLogs),
}));

export const fugitiveLogsRelations = relations(fugitiveLogs, ({ one }) => ({
  fugitive: one(fugitives, { fields: [fugitiveLogs.fugitiveId], references: [fugitives.id] }),
  user: one(users, { fields: [fugitiveLogs.userId], references: [users.id] }),
}));
