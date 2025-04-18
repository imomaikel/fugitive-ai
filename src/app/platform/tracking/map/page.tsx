import PageWrapper from '../../_components/PageWrapper';
import CustomMap from './_components/CustomMap';

const TrackingMapPage = async () => {
  return (
    <PageWrapper
      previousPages={[
        {
          href: '/platform/tracking',
          label: 'Tracking',
        },
      ]}
      pageName="Map"
      containerClassName="p-0 rounded-bl-2xl overflow-hidden rounded-br-2xl"
    >
      <div className="absolute bottom-0 left-0 h-full w-full overflow-clip">
        <div className="h-full w-full">
          <CustomMap />
        </div>
      </div>
    </PageWrapper>
  );
};

export default TrackingMapPage;
