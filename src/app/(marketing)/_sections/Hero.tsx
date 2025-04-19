'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { SAMPLE_ARCS } from '@/data/arcs';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';

const World = dynamic(() => import('@/components/ui/globe').then((m) => m.World), {
  ssr: false,
});

const globeConfig = {
  pointSize: 4,
  globeColor: '#062056',
  showAtmosphere: true,
  atmosphereColor: '#FFFFFF',
  atmosphereAltitude: 0.1,
  emissive: '#062056',
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: 'rgba(255,255,255,0.7)',
  ambientLight: '#38bdf8',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#ffffff',
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const Hero = () => {
  return (
    <div className="relative flex h-screen max-h-[1080px] w-full flex-row items-center justify-center py-20">
      <div className="relative mx-auto h-full w-full max-w-7xl overflow-hidden px-4 md:h-[42rem]">
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 1,
          }}
          className="div"
        >
          <h1 className="text-center text-xl font-bold md:text-4xl">Every Move Leaves a Pattern. We Decode It.</h1>
          <div className="mt-2 flex flex-col items-center justify-center gap-6 md:flex-row">
            <p className="max-w-md text-center text-base font-normal md:text-lg">
              <span className="text-primary font-extrabold">FugitiveAI</span> analyzes locations, motives, and history
              to uncover where criminals are hiding — and why.
            </p>
            <Button className="z-50 cursor-pointer" asChild>
              <Link href="/platform">Get Started</Link>
            </Button>
          </div>
        </motion.div>
        <div className="absolute bottom-5 z-10 h-72 w-full md:-bottom-14 md:h-full">
          <World data={SAMPLE_ARCS} globeConfig={globeConfig} />
        </div>
      </div>
      <div className="to-background pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full bg-gradient-to-b from-transparent select-none" />
      <div className="pointer-events-none absolute -z-10 h-full w-full bg-[url(/logo-no-bg.webp)] bg-size-[32px] opacity-5"></div>
    </div>
  );
};

export default Hero;
