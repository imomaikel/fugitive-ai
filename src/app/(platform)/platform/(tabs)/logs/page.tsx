import { api } from '@/trpc/server';

import PageWrapper from '../../_components/PageWrapper';
import LogsTable from './_components/Table';

const LogsPage = async () => {
  const data = await api.fugitive.getAllLogs();

  return (
    <PageWrapper pageName="Logs" description="Easily browse, search, and filter all application logs">
      <LogsTable data={data?.logs || []} />
    </PageWrapper>
  );
};

export default LogsPage;
