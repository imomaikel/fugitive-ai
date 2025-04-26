import { notFound } from 'next/navigation';

import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

import PageWrapper from '../../../_components/PageWrapper';
import Tracking from './_components/Tracking';

const FugitiveTrackingPage = async ({ params }: { params: Promise<{ fugitiveId: string }> }) => {
  const fugitiveId = (await params).fugitiveId;
  const [fugitive] = await db.select().from(fugitives).where(eq(fugitives.id, fugitiveId)).limit(1);

  if (!fugitive?.id) notFound();

  return (
    <PageWrapper
      pageName={fugitive.fullName}
      previousPages={[
        {
          label: 'AI Tracking',
          href: '/platform/ai-tracking',
        },
      ]}
    >
      <Tracking fugitive={fugitive} />
    </PageWrapper>
  );
};

export default FugitiveTrackingPage;
