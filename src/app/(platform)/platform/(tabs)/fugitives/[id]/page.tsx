import React from 'react';
import { RiCriminalFill } from 'react-icons/ri';

import { notFound } from 'next/navigation';

import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

import PageWrapper from '../../../_components/PageWrapper';

const FugitiveDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
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
      ]}
      pageName={fugitiveDetails.fullName}
      description="Here you can view fugitive profile."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { label: 'Full name', value: fugitiveDetails.fullName },
              { label: 'Birth day', value: fugitiveDetails.birthDate?.toLocaleDateString().split('T')[0] },
              { label: 'Identify Number', value: fugitiveDetails.identifyNumber },
              { label: 'Nationality', value: fugitiveDetails.nationality },
              { label: 'Added', value: fugitiveDetails.createdAt?.toLocaleDateString().split('T')[0] },
              { label: 'Latest update', value: fugitiveDetails.updatedAt?.toLocaleDateString().split('T')[0] },
              { label: 'Longitude', value: fugitiveDetails.longitude },
              { label: 'Latitude', value: fugitiveDetails.latitude },
            ].map((field, i) => (
              <div key={i}>
                <label className="text-muted-foreground mb-1 block text-sm font-medium">{field.label}</label>
                <div className="rounded-md border px-3 py-2 text-sm text-white">{field.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="min-h-[120px] rounded-md border p-4">
              <h3 className="text-muted-foreground mb-2 text-sm font-semibold">Appearance</h3>
              <p className="w-full overflow-hidden text-sm break-words text-white">{fugitiveDetails.appearance}</p>
            </div>
            <div className="min-h-[120px] rounded-md border p-4">
              <h3 className="text-muted-foreground mb-2 text-sm font-semibold">Notes</h3>
              <p className="w-full overflow-hidden text-sm break-words text-white">{fugitiveDetails.notes}</p>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col gap-4">
          <div className="bg-muted flex aspect-[5/6] items-center justify-center overflow-hidden rounded-md border text-lg font-semibold text-white">
            <RiCriminalFill className="h-40 w-40 text-white" />
          </div>

          <div className="flex flex-row gap-4">
            {[
              { label: 'Code name', value: fugitiveDetails.gender },
              { label: 'Risk', value: fugitiveDetails.dangerLevel },
              { label: 'Status', value: fugitiveDetails.status },
            ].map((item, i) => (
              <div key={i} className="flex-1">
                <label className="text-muted-foreground mb-1 block text-sm font-medium">{item.label}</label>
                <div
                  className={`rounded-md border px-3 py-2 text-sm text-white ${
                    item.label === 'Status' ? 'bg-primary' : 'bg-transparent'
                  }`}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default FugitiveDetailsPage;
