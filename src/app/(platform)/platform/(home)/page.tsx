import type { Metadata } from 'next';
import Image from 'next/image';

import { startCase } from 'lodash';

import { getLandingPageStatistics } from '@/lib/statistics';

import PageWrapper from '../_components/PageWrapper';
import PieChartWithData from './_components/PieChartWithData';
import RadarChartWithData from './_components/RadarChartWithData';

export const metadata: Metadata = {
  title: startCase('Home'),
};

const PlatformPage = async () => {
  const data = await getLandingPageStatistics();

  return (
    <PageWrapper pageName="Home">
      <div className="relative flex h-full flex-col justify-between gap-12">
        <div className="flex flex-col items-center justify-between gap-12 px-6 md:flex-row">
          <div className="relative max-w-xl">
            <h1 className="text-4xl font-semibold">
              Welcome to the <span className="text-primary">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-justify text-sm">
              This is your main hub where you&apos;ll find key stats, recent updates, and a quick overview of
              what&apos;s going on in the system. Use the sidebar on the left to jump between different sections like
              fugitive profiles, the live map, and reports. Everything here is designed to help you stay on top of the
              most important info at a glance.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-4xl font-extrabold">
              Fugitive<span className="text-primary animate-pulse">AI</span>
            </span>
            <Image
              width={128}
              height={128}
              src="/logo-no-bg.webp"
              alt="Logo"
              className="aspect-square max-h-[128px] min-w-[30px] dark:mix-blend-plus-darker dark:brightness-150"
              loading="eager"
            />
          </div>
        </div>

        <div className="relative h-full w-full">
          <div className="absolute h-full w-full">
            <div className="grid h-full w-full grid-cols-1 gap-6 md:grid-cols-2">
              <PieChartWithData data={data.pieChartData} />
              <RadarChartWithData data={data.radarChartData} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PlatformPage;
