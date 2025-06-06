'use client';

import type { FugitiveRaw } from '@/server/db/types';

import Predictions from './Predictions';
import PreviousLocations from './PreviousLocations';
import Profile from './Profile';

interface TrackingProps {
  fugitive: FugitiveRaw;
}

const Tracking: React.FC<TrackingProps> = ({ fugitive }) => {
  const fugitiveId = fugitive.id;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 w-full">
          <Profile fugitive={fugitive} />
        </div>
        <div className="h-full w-full">
          <PreviousLocations fugitiveId={fugitiveId} />
        </div>
      </div>
      <div className="w-full">
        <Predictions fugitiveId={fugitiveId} />
      </div>
    </div>
  );
};

export default Tracking;
