import PageWrapper from '../../_components/PageWrapper';
import AddFugitiveForm from './_components/Form';

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
          <AddFugitiveForm />
        </div>
      </div>
    </PageWrapper>
  );
};

export default NewFugitivePage;
