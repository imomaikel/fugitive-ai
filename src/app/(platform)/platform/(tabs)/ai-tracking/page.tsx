import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';

import PageWrapper from '../../_components/PageWrapper';
import SearchAndPick from './_components/SearchAndPick';

const AiTrackingPage = async () => {
  const fugitiveList = await db
    .select({
      id: fugitives.id,
      fullName: fugitives.fullName,
      appearance: fugitives.appearance,
    })
    .from(fugitives);

  return (
    <PageWrapper pageName="AI Tracking" description="Here you can track your fugitives with AI.">
      <SearchAndPick fugitives={fugitiveList} />
    </PageWrapper>
  );
};

export default AiTrackingPage;
