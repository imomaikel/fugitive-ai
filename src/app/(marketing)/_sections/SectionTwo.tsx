import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';

const SectionTwo = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="flex-1">
            <div className="relative h-[500px] w-full overflow-hidden rounded-xl border shadow-xl">
              <Image src="/map-preview.webp" alt="Interactive Crime Map" fill className="object-cover" />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold md:text-5xl">Interactive Tracking & Visualization</h2>
            <p className="text-xl text-slate-300">See what others miss with dynamic crime mapping</p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="text-primary h-8 w-8" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-100">Dynamic Crime Mapping</h3>
                  <p className="text-slate-300">
                    Visualize suspect sightings, potential escape routes, and risk zones on an intuitive, interactive
                    map.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-100">Crowd Intelligence Integration</h3>
                  <p className="text-slate-300">
                    Securely collect and validate witness reports, enhancing predictive accuracy while minimizing false
                    leads.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m8 22 4-10 4 10" />
                    <path d="M12 14v4" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-100">Geospatial Analytics</h3>
                  <p className="text-slate-300">
                    Identify patterns in movement and predict high-probability locations based on historical data.
                  </p>
                </div>
              </div>
            </div>

            <Button className="mt-6" size="lg" asChild>
              <Link href="/platform">
                Explore Mapping Features <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTwo;
