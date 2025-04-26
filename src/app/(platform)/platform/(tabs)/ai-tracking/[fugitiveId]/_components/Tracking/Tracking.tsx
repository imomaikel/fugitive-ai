import React from 'react';

import type { FugitiveRaw } from '@/server/db/types';

interface TrackingProps {
  fugitive: FugitiveRaw;
}

const Tracking: React.FC<TrackingProps> = ({ fugitive }) => {
  return <div>Tracking {fugitive.fullName}</div>;
};

export default Tracking;
