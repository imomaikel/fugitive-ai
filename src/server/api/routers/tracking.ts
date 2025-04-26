import { locationHistory } from '@/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { z } from 'zod';

import { captureTRPCError, createTRPCRouter, protectedProcedure } from '../trpc';

export const trackingRouter = createTRPCRouter({
  getPreviousLocations: protectedProcedure
    .input(
      z.object({
        fugitiveId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { fugitiveId } = input;
        const { db } = ctx;

        const previousLocations = await db
          .select()
          .from(locationHistory)
          .where(eq(locationHistory.fugitiveId, fugitiveId))
          .orderBy(desc(locationHistory.createdAt));

        return previousLocations;
      } catch (error) {
        captureTRPCError(error, 'Error getting previous locations');
      }
    }),
  deletePreviousLocation: protectedProcedure
    .input(
      z.object({
        fugitiveId: z.string().min(1),
        locationId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { fugitiveId, locationId } = input;
        const { db } = ctx;

        await db
          .delete(locationHistory)
          .where(and(eq(locationHistory.fugitiveId, fugitiveId), eq(locationHistory.id, locationId)));

        return { success: true };
      } catch (error) {
        captureTRPCError(error, 'Error deleting previous location');
      }
    }),
});
