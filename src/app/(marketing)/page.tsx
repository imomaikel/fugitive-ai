'use client';

import { Separator } from '@/components/ui/separator';

import Hero from './_sections/Hero';
import SectionOne from './_sections/SectionOne';
import SectionTwo from './_sections/SectionTwo';

const HomePage = () => {
  return (
    <div className="dark">
      <Hero />
      <SectionOne />
      <Separator />
      <SectionTwo />
    </div>
  );
};

export default HomePage;
