import type { Metadata } from 'next';

import { startCase } from 'lodash';

import PageWrapper from '../../../_components/PageWrapper';
import FugitiveForm from '../_components/FugitiveForm';

export const metadata: Metadata = {
  title: startCase('New Fugitive'),
};

const NewFugitivePage = async () => {
  return (
    <PageWrapper
      previousPages={[
        {
          href: '/platform/fugitives',
          label: 'Fugitives',
        },
      ]}
      pageName="Add New"
      description="Here you can add new fugitives to the system."
    >
      <div>
        <div></div>
        <div>
          <FugitiveForm mode="ADD" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default NewFugitivePage;
