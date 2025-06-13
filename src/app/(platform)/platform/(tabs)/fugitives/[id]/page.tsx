import React from 'react';

import { notFound } from 'next/navigation';

import { db } from '@/server/db';
import { fugitives, locationHistory } from '@/server/db/schema';
import { desc, eq } from 'drizzle-orm';

import PageWrapper from '../../../_components/PageWrapper';
import FugitiveProfile from '../_components/FugitiveProfile';

const FugitiveDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const fugitiveId = (await params).id;

  const [[fugitiveDetails], fugitiveLocationHistory] = await Promise.all([
    db.select().from(fugitives).where(eq(fugitives.id, fugitiveId)).limit(1),
    db
      .select()
      .from(locationHistory)
      .where(eq(locationHistory.fugitiveId, fugitiveId))
      .orderBy(desc(locationHistory.createdAt)),
  ]);

  if (!fugitiveDetails?.id) notFound();

  return (
    <PageWrapper
      previousPages={[{ href: '/platform/fugitives', label: 'Fugitives' }]}
      pageName={fugitiveDetails.fullName}
      description="View the fugitive's profile here."
    >
      <FugitiveProfile fugitiveDetails={fugitiveDetails} locationHistory={fugitiveLocationHistory} />
    </PageWrapper>
  );
};

export default FugitiveDetailsPage;
