'use client';

import React from 'react';
import { RiCriminalFill } from 'react-icons/ri';

import Link from 'next/link';

import { db } from '@/server/db';
import { fugitives } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

import { Button } from '@/components/ui/button';

type Fugitive = {
  id: string;
  fullName: string;
  gender: 'male' | 'female';
  dangerLevel: 'low' | 'medium' | 'high' | 'extreme';
  birthDate: Date | null;
  identifyNumber: string | null;
  nationality: string | null;
  appearance?: string | null;
  notes?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type FugitivePageProps = {
  fugitiveDetails: Fugitive;
};

const FugitivePage: React.FC<FugitivePageProps> = ({ fugitiveDetails }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-6 sm:col-span-2 lg:col-span-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { label: 'Full name', value: fugitiveDetails.fullName },
            { label: 'Birth day', value: fugitiveDetails.birthDate?.toISOString().slice(0, 10) },
            { label: 'Identify Number', value: fugitiveDetails.identifyNumber },
            { label: 'Nationality', value: fugitiveDetails.nationality },
            { label: 'Added', value: fugitiveDetails.createdAt?.toISOString().slice(0, 10) },
            { label: 'Latest update', value: fugitiveDetails.updatedAt?.toISOString().slice(0, 10) },
            { label: 'Longitude', value: fugitiveDetails.longitude },
            { label: 'Latitude', value: fugitiveDetails.latitude },
          ].map((field, i) => (
            <div key={i}>
              <label className="text-muted-foreground mb-1 block text-sm font-medium">{field.label}</label>
              <div className="rounded-md border px-3 py-2 text-sm break-words text-white">{field.value}</div>
            </div>
          ))}
        </div>

        <div className="space-y-6 sm:col-span-2 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-h-[120px] rounded-md border p-4">
              <h3 className="text-muted-foreground mb-2 text-sm font-semibold">Appearance</h3>
              <p className="w-full text-sm break-words text-white">{fugitiveDetails.appearance}</p>
            </div>
            <div className="min-h-[120px] rounded-md border p-4">
              <h3 className="text-muted-foreground mb-2 text-sm font-semibold">Notes</h3>
              <p className="w-full text-sm break-words text-white">{fugitiveDetails.notes}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild type="button" className="py-7 text-base">
              <Link href={`/platform/ai-tracking/${fugitiveDetails.id}`}>
                Search for {fugitiveDetails.fullName} with AI!
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
        <div className="bg-muted flex aspect-[5/6] items-center justify-center overflow-hidden rounded-md border text-lg font-semibold text-white">
          <RiCriminalFill className="h-24 w-24 text-white sm:h-32 sm:w-32 md:h-40 md:w-40" />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          {[
            { label: 'Code name', value: fugitiveDetails.gender },
            { label: 'Risk', value: fugitiveDetails.dangerLevel },
            { label: 'Status', value: fugitiveDetails.status },
          ].map((item, i) => (
            <div key={i} className="flex-1">
              <label className="text-muted-foreground mb-1 block text-sm font-medium">{item.label}</label>
              <div
                className={`rounded-md border px-3 py-2 text-sm text-white ${
                  item.label === 'Status' ? 'bg-primary' : 'bg-transparent'
                }`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FugitivePage;
