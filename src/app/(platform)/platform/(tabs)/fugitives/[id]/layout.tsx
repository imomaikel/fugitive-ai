import type { Metadata } from 'next';

import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { startCase } from 'lodash';

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const fugitiveId = (await params).id;

  const [fugitiveDetails] = await db.select().from(fugitives).where(eq(fugitives.id, fugitiveId)).limit(1);

  if (!fugitiveDetails?.id) {
    return {
      title: 'Fugitive AI',
    };
  }

  return {
    title: startCase(fugitiveDetails.fullName),
  };
};

const FugitivePageLayout = async ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default FugitivePageLayout;
