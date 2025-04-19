import { type DefaultSession, type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from '@/server/db';
import { accounts, users } from '@/server/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

import { SignInValidator } from '@/lib/validators';

import edgeConfig from './edge-config';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
      // latitude: number;
      // longitude: number;
      // zoom: number;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const parsedData = SignInValidator.safeParse(credentials).data;
        if (!parsedData) return null;

        const { email, password } = parsedData;

        const [userData] = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (!userData?.password) return null;

        const passwordsMatch = await bcrypt.compare(password, userData.password);
        if (!passwordsMatch) return null;

        return {
          email: userData.email,
          name: userData.name,
          id: userData.id,
        };
      },
    }),
    ...edgeConfig.providers,
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;

      return token;
    },
  },
} satisfies NextAuthConfig;
