import 'server-only';

import { captureTRPCError, createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { fugitiveLogs, fugitives } from '@/server/db/schema';
import type { FugitiveLogInsert } from '@/server/db/types';
import { TRPCError } from '@trpc/server';
import { format } from 'date-fns';
import { eq } from 'drizzle-orm';

import { translateFugitiveColumnName } from '@/lib/utils';
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
  update: protectedProcedure.input(FugitiveValidator).mutation(async ({ input, ctx }) => {
    try {
      const { db } = ctx;

      const fugitiveId = input?.id;

      if (!fugitiveId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
        });
      }

      await db.transaction(async (tx) => {
        const [originalFugitive] = await tx.select().from(fugitives).where(eq(fugitives.id, fugitiveId)).limit(1);

        if (!originalFugitive) {
          throw new TRPCError({
            code: 'NOT_FOUND',
          });
        }

        const [updatedFugitive] = await tx
          .update(fugitives)
          .set({
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
          .where(eq(fugitives.id, fugitiveId))
          .returning();

        if (!updatedFugitive) {
          throw new TRPCError({
            code: 'NOT_FOUND',
          });
        }

        const newLogs: FugitiveLogInsert[] = [];
        const skippedColumns: (keyof typeof originalFugitive)[] = [
          'createdAt',
          'updatedAt',
          'id',
          'addedByUserId',
          'addedByUserName',
        ];

        for (const key of Object.keys(originalFugitive) as (keyof typeof originalFugitive)[]) {
          if (skippedColumns.includes(key)) continue;
          const oldValue = String(originalFugitive[key]);

          if (oldValue !== String(updatedFugitive[key])) {
            const translatedColumn = translateFugitiveColumnName(key);
            const newValue =
              updatedFugitive[key] instanceof Date ? format(updatedFugitive[key], 'PPP') : String(updatedFugitive[key]);

            newLogs.push({
              fugitiveId,
              userId: ctx.session.user.id,
              message: `Changed "${translatedColumn}" to "${newValue}"`,
            });
          }
        }

        if (newLogs.length) {
          await tx.insert(fugitiveLogs).values(newLogs);
        }
      });

      return {
        success: true,
      };
    } catch (error) {
      captureTRPCError(error, 'Error updating fugitive');
    }
  }),
});
