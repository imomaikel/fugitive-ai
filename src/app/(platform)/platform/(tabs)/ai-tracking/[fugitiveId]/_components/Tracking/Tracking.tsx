'use client';

import type { FugitiveRaw } from '@/server/db/types';

import PreviousLocations from './PreviousLocations';

interface TrackingProps {
  fugitive: FugitiveRaw;
}

const Tracking: React.FC<TrackingProps> = ({ fugitive }) => {
  const fugitiveId = fugitive.id;

  return (
    <div>
      <PreviousLocations fugitiveId={fugitiveId} />
    </div>
  );
};

export default Tracking;
