import { ai } from '@/server/ai';
import { PredictionSchema } from '@/server/ai/schemas';
import { fugitives, locationHistory, predictionLogs } from '@/server/db/schema';
import { differenceInMinutes } from 'date-fns';
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
  predict: protectedProcedure
    .input(
      z.object({
        fugitiveId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fugitiveId } = input;
      const { db } = ctx;
      try {
        const [[fugitive], previousLocations, previousPredictions] = await Promise.all([
          db.select().from(fugitives).where(eq(fugitives.id, fugitiveId)).limit(1),
          db.select().from(locationHistory).where(eq(locationHistory.fugitiveId, fugitiveId)),
          db
            .select()
            .from(predictionLogs)
            .where(eq(predictionLogs.fugitiveId, fugitiveId))
            .orderBy(desc(predictionLogs.createdAt)),
        ]);

        if (!fugitive?.id) {
          return { success: false, message: 'Fugitive not found' };
        }

        if (!previousLocations.length) {
          return { success: false, message: 'No previous locations found. Add at least one location.' };
        }

        const mostRecentPrediction = previousPredictions[0];
        if (mostRecentPrediction) {
          const diff = differenceInMinutes(new Date(), mostRecentPrediction.createdAt);
          if (diff < 10) {
            return { success: false, message: 'Please wait 10 minutes before making another prediction.' };
          }
        }

        await db
          .update(fugitives)
          .set({
            whilePredicting: true,
          })
          .where(eq(fugitives.id, fugitiveId));

        const predictionRequest = await ai.predict({
          appearance: fugitive.appearance || 'Unknown',
          gender: fugitive.gender || 'Unknown',
          nationality: fugitive.nationality || 'Unknown',
          lastKnownLocations: previousLocations.map((loc) => ({
            placeName: loc.place ?? 'Unknown place',
            context: loc.context ?? 'No notes',
            lat: loc.latitude ?? 'Unknown latitude',
            lon: loc.longitude ?? 'Unknown longitude',
            date: loc.createdAt.toISOString(),
          })),
        });

        const choice = predictionRequest.choices[0];

        if (!choice?.message.content) {
          console.log('No choice found in AI response:');
          console.log(predictionRequest);
          return { success: false, message: 'Could not predict.' };
        }

        const parsedOutput = PredictionSchema.safeParse(JSON.parse(choice.message.content));

        if (!parsedOutput.success) {
          console.log('Failed to parse AI response:');
          console.log(choice.message.content);
          return { success: false, message: 'Could not predict.' };
        }

        const prediction = parsedOutput.data;

        await db.insert(predictionLogs).values({
          fugitiveId,
          userId: ctx.session.user.id,
          city: prediction.city,
          country: prediction.country,
          location: prediction.location,
          reasoning: prediction.reasoning,
        });

        return { success: true, prediction };
      } catch (error) {
        captureTRPCError(error, 'Error predicting');
      } finally {
        await db
          .update(fugitives)
          .set({
            whilePredicting: false,
          })
          .where(eq(fugitives.id, fugitiveId));
      }
    }),
  getPreviousPredictions: protectedProcedure
    .input(
      z.object({
        fugitiveId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const { fugitiveId } = input;
        const { db } = ctx;

        const previousPredictions = await db
          .select({
            id: predictionLogs.id,
            createdAt: predictionLogs.createdAt,
            city: predictionLogs.city,
            country: predictionLogs.country,
            location: predictionLogs.location,
            reasoning: predictionLogs.reasoning,
          })
          .from(predictionLogs)
          .where(eq(predictionLogs.fugitiveId, fugitiveId))
          .orderBy(desc(predictionLogs.createdAt));

        return {
          previousPredictions,
          lastPrediction: previousPredictions[0]?.createdAt,
        };
      } catch (error) {
        captureTRPCError(error, 'Error getting previous predictions');
      }
    }),
});
