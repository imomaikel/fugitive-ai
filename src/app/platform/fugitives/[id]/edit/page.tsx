import React from 'react';

import { notFound } from 'next/navigation';

import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

import PageWrapper from '../../../_components/PageWrapper';
import FugitiveForm from '../../_components/FugitiveForm';

const FugitiveEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const fugitiveId = (await params).id;

  const [fugitiveDetails] = await db.select().from(fugitives).where(eq(fugitives.id, fugitiveId)).limit(1);

  if (!fugitiveDetails?.id) notFound();

  return (
    <PageWrapper
      previousPages={[
        {
          href: '/platform/fugitives',
          label: 'Fugitives',
        },
        {
          href: `/platform/fugitives/${fugitiveDetails.id}`,
          label: fugitiveDetails.fullName,
        },
      ]}
      pageName="Edit"
      description="Here you can edit fugitive details."
    >
      <div>
        <FugitiveForm mode="EDIT" defaultValues={fugitiveDetails} />
      </div>
    </PageWrapper>
  );
};

export default FugitiveEditPage;
