import React from 'react';
import { RiCriminalFill } from 'react-icons/ri';

import { notFound } from 'next/navigation';

import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

import FugitivePage from '@/components/ui/fugitivePage';

import PageWrapper from '../../../_components/PageWrapper';

const FugitiveDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const fugitiveId = (await params).id;

  const [fugitiveDetails] = await db.select().from(fugitives).where(eq(fugitives.id, fugitiveId)).limit(1);

  if (!fugitiveDetails?.id) notFound();

  return (
    <PageWrapper
      previousPages={[{ href: '/platform/fugitives', label: 'Fugitives' }]}
      pageName={fugitiveDetails.fullName}
      description="Here you can view fugitive profile."
    >
      <FugitivePage fugitiveDetails={fugitiveDetails} />
    </PageWrapper>
  );
};

export default FugitiveDetailsPage;
