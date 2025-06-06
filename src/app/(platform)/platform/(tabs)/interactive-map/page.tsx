import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { db } from '@/server/db';
import { fugitives, users } from '@/server/db/schema';
import { getUser } from '@/server/queries';
import { and, eq, isNotNull, sql } from 'drizzle-orm';
import { startCase } from 'lodash';
import { z } from 'zod';

import PageWrapper from '../../_components/PageWrapper';
import CustomMap from './_components/CustomMap';

export const metadata: Metadata = {
  title: startCase('Interactive Map'),
};

const InteractiveMapPage = async ({ searchParams }: { searchParams: Promise<{ fugitiveIdSelected: string }> }) => {
  const user = await getUser();
  if (!user?.id) redirect('/login');

  const [userData] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);
  if (!userData) redirect('/login');

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
    <PageWrapper pageName="Interactive Map" containerClassName="p-0 rounded-bl-2xl overflow-hidden rounded-br-2xl">
      <div className="absolute bottom-0 left-0 h-full w-full overflow-clip">
        <div className="h-full w-full">
          <CustomMap
            markers={fugitiveMarkers}
            fugitiveSelected={fugitiveSelected}
            initialMapView={{
              latitude: userData?.latitude ?? 26.58532999181257,
              longitude: userData?.longitude ?? 4.4511524248129035,
              zoom: userData?.zoom ?? 0.9435509986888801,
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
};

export default InteractiveMapPage;
