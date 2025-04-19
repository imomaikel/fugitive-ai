import PageWrapper from '../../../_components/PageWrapper';
import FugitiveForm from '../_components/FugitiveForm';

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
