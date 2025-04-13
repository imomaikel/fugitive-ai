import { Suspense } from 'react';

import Link from 'next/link';

import { Plus } from 'lucide-react';

import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';

import PageWrapper from '../_components/PageWrapper';
import FugitiveList from './_components/FugitiveList';

const FugitivesPage = async () => {
  return (
    <PageWrapper pageName="Fugitives">
      <div>
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold">All Fugitives</h2>
          <div className="bg-border/50 flex h-px w-fit flex-1" />
          <Button size="lg" asChild>
            <Link href="/platform/fugitives/new">
              <Plus className="animate-bounce" />
              <span>Add New</span>
            </Link>
          </Button>
        </div>
        <div className="mt-4">
          <Suspense fallback={<Loader />}>
            <FugitiveList />
          </Suspense>
        </div>
      </div>
    </PageWrapper>
  );
};

export default FugitivesPage;
