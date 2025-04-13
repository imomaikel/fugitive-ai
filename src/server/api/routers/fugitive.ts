import 'server-only';

import { captureTRPCError, createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { fugitives } from '@/server/db/schema';

import { FugitiveValidator } from '@/lib/validators';

export const fugitiveRouter = createTRPCRouter({
  add: protectedProcedure.input(FugitiveValidator).mutation(async ({ input, ctx }) => {
    try {
      const { db } = ctx;

      const newFugitive = await db
        .insert(fugitives)
        .values({
          fullName: input.fullName,
          gender: input.gender,
          dangerLevel: input.dangerLevel,
          status: input.status,
          birthDate: input.birthDate || null,
          identifyNumber: input.identifyNumber || null,
          nationality: input.nationality || null,
          appearance: input.appearance || null,
          notes: input.notes || null,
          addedByUserId: ctx.session.user.id,
          addedByUserName: ctx.session.user.name || 'Unknown user',
        })
        .returning();

      const newFugitiveId = newFugitive[0]?.id;

      if (!newFugitiveId) {
        throw new Error('Error while adding fugitive');
      }

      return {
        success: true,
        newFugitiveId,
      };
    } catch (error) {
      captureTRPCError(error, 'Error adding fugitive');
    }
  }),
});
