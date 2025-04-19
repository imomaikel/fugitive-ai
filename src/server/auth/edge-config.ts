import type { NextAuthConfig } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

import { env } from '@/env';

export default {
  providers: [
    DiscordProvider({
      clientId: env.AUTH_DISCORD_ID,
      clientSecret: env.AUTH_DISCORD_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
