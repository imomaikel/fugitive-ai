import PageWrapper from '../../_components/PageWrapper';

const NewFugitivePage = () => {
  return (
    <PageWrapper
      previousPages={[
        {
          href: '/platform/fugitives',
          label: 'Fugitives',
        },
      ]}
      pageName="Add New"
    >
      NewFugitivePage
    </PageWrapper>
  );
};

export default NewFugitivePage;
