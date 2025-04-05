import React from 'react';

import { HydrateClient } from '@/trpc/server';

const HomePage = () => {
  return <HydrateClient>HomePage</HydrateClient>;
};

export default HomePage;
