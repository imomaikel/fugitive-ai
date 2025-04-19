import React from 'react';

import type { Metadata } from 'next';

import { startCase } from 'lodash';

import PageWrapper from '../_components/PageWrapper';

export const metadata: Metadata = {
  title: startCase('Home '),
};

const PlatformPage = () => {
  return <PageWrapper pageName="Home">Platform Landing Page</PageWrapper>;
};

export default PlatformPage;
