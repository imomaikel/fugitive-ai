import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { and, isNotNull, sql } from 'drizzle-orm';

import PageWrapper from '../../_components/PageWrapper';
import CustomMap from './_components/CustomMap';

const TrackingMapPage = async () => {
  const fugitiveMarkers = await db
    .select({
      fugitiveId: fugitives.id,
      latitude: sql<number>`${fugitives.latitude} as latitude`,
      longitude: sql<number>`${fugitives.longitude} as longitude`,
    })
    .from(fugitives)
    .where(and(isNotNull(fugitives.latitude), isNotNull(fugitives.longitude)));

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
          <CustomMap markers={fugitiveMarkers} />
        </div>
      </div>
    </PageWrapper>
  );
};

export default TrackingMapPage;
