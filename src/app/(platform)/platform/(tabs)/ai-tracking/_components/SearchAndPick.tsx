'use client';

import { useMemo, useState } from 'react';

import type { FugitiveRaw } from '@/server/db/types';

import { Button } from '@/components/ui/button';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { standardizeFilter } from '@/lib/utils';

interface SearchAndPickProps {
  fugitives: Pick<FugitiveRaw, 'id' | 'fullName' | 'appearance'>[];
}

const SearchAndPick: React.FC<SearchAndPickProps> = ({ fugitives }) => {
  const [filter, setFilter] = useState('');

  const fugitivesAsItems = useMemo(() => {
    const mappedFugitives = fugitives.map((fugitive) => ({
      title: fugitive.fullName,
      description: fugitive.appearance ?? 'No appearance provided',
      link: `/platform/ai-tracking/${fugitive.id}`,
    }));

    if (!filter.length) return mappedFugitives;

    const standardizedFilter = standardizeFilter(filter);

    const filteredFugitives = mappedFugitives.filter((fugitive) =>
      standardizeFilter(fugitive.title).includes(standardizedFilter),
    );

    return filteredFugitives;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="search-fugitives">Search by name</Label>
        <div className="flex items-center gap-2">
          <Input
            className="w-full max-w-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            id="search-fugitives"
          />
          <Button onClick={() => setFilter('')} variant="ghost">
            Clear
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <HoverEffect items={fugitivesAsItems} />
      </div>
    </div>
  );
};

export default SearchAndPick;
