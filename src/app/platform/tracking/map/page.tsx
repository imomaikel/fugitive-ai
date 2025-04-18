import { notFound } from 'next/navigation';

import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { and, eq, isNotNull, sql } from 'drizzle-orm';
import { z } from 'zod';

import PageWrapper from '../../_components/PageWrapper';
import CustomMap from './_components/CustomMap';

const TrackingMapPage = async ({ searchParams }: { searchParams: Promise<{ fugitiveIdSelected: string }> }) => {
  const fugitiveIdSelected = z
    .string()
    .min(1)
    .safeParse((await searchParams).fugitiveIdSelected).data;

  const fugitiveMarkers = !fugitiveIdSelected
    ? await db
        .select({
          fugitiveId: fugitives.id,
          latitude: sql<number>`${fugitives.latitude} as latitude`,
          longitude: sql<number>`${fugitives.longitude} as longitude`,
        })
        .from(fugitives)
        .where(and(isNotNull(fugitives.latitude), isNotNull(fugitives.longitude)))
    : [];

  const [fugitive] = fugitiveIdSelected
    ? await db.select().from(fugitives).where(eq(fugitives.id, fugitiveIdSelected)).limit(1)
    : [];

  if (fugitiveIdSelected) {
    if (!fugitive?.id) {
      notFound();
    }
  }

  const fugitiveSelected = fugitive
    ? {
        id: fugitive.id,
        fullName: fugitive.fullName,
      }
    : undefined;

  return (
    <PageWrapper
      previousPages={[
        {
          href: '/platform/tracking',
          label: 'Tracking',
        },
      ]}
      pageName="Map"
      containerClassName="p-0 rounded-bl-2xl overflow-hidden rounded-br-2xl"
    >
      <div className="absolute bottom-0 left-0 h-full w-full overflow-clip">
        <div className="h-full w-full">
          <CustomMap markers={fugitiveMarkers} fugitiveSelected={fugitiveSelected} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default TrackingMapPage;
