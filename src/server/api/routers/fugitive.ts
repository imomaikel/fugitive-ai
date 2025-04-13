import 'server-only';

import { captureTRPCError, createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { fugitiveLogs, fugitives } from '@/server/db/schema';

import { FugitiveValidator } from '@/lib/validators';

export const fugitiveRouter = createTRPCRouter({
  add: protectedProcedure.input(FugitiveValidator).mutation(async ({ input, ctx }) => {
    try {
      const { db } = ctx;

      const newFugitiveId = await db.transaction(async (tx) => {
        const newFugitive = await tx
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

        const id = newFugitive[0]?.id;

        if (!id) {
          throw new Error('Error while adding fugitive');
        }

        await tx.insert(fugitiveLogs).values({
          fugitiveId: id,
          userId: ctx.session.user.id,
          message: `Added ${input.fullName} fugitive`,
        });

        return id;
      });

      return {
        success: true,
        newFugitiveId,
      };
    } catch (error) {
      captureTRPCError(error, 'Error adding fugitive');
    }
  }),
});
