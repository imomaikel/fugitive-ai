'use client';

import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-6 p-8">
      <Loader2 className="size-24 animate-spin" />
      <div className="flex flex-col">
        <span className="text-2xl font-medium">Please wait</span>
        <span className="text-muted-foreground animate-pulse tracking-wider duration-500">Loading....</span>
      </div>
    </div>
  );
};

export default Loader;
