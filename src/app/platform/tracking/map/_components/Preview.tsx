'use client';

import { RiCriminalFill } from 'react-icons/ri';

import Link from 'next/link';

import type { fugitiveRouter } from '@/server/api/routers/fugitive';
import { api } from '@/trpc/react';
import type { inferRouterOutputs } from '@trpc/server';
import { format } from 'date-fns';
import { CircleHelp, Loader2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { getFugitiveStatusDescription, relativeDate } from '@/lib/utils';

interface PreviewProps {
  fugitiveIdToPreview: string | null;
  onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({ fugitiveIdToPreview, onClose }) => {
  const { data: fugitive, isLoading } = api.fugitive.get.useQuery(
    {
      id: fugitiveIdToPreview ?? '',
    },
    {
      enabled: !!fugitiveIdToPreview,
    },
  );

  return (
    <Sheet open={!!fugitiveIdToPreview} onOpenChange={onClose}>
      <SheetContent className="overflow-x-clip overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Fugitive Profile</SheetTitle>
          <SheetDescription>Here you can see the clicked fugitive&apos;s profile.</SheetDescription>
        </SheetHeader>
        {fugitiveIdToPreview && contentRenderer(fugitive, isLoading, onClose)}
      </SheetContent>
    </Sheet>
  );
};

const contentRenderer = (
  fugitive: inferRouterOutputs<typeof fugitiveRouter>['get'],
  isLoading: boolean,
  handleClose: () => void,
) => {
  if (isLoading) {
    return (
      <div className="mt-16 flex w-full items-center justify-center">
        <Loader2 className="size-12 animate-spin" />
      </div>
    );
  }

  if (!fugitive) {
    return (
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-3">
        <p className="text-xl font-medium">Something went wrong!</p>
        <p>We could not find the selected fugitive.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 px-4">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <RiCriminalFill className="size-24" />
          <p className="text-2xl font-medium">{fugitive.fullName}</p>
          <div className="flex flex-wrap gap-1">
            <Badge className="uppercase" variant="outline">
              {fugitive.gender}
            </Badge>
            <Badge className="uppercase" variant="outline">
              {fugitive.dangerLevel} danger
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="cursor-default uppercase">
                    {fugitive.status}
                    <CircleHelp />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>{getFugitiveStatusDescription(fugitive.status)}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="space-y-2">
          {fugitive.birthDate && (
            <div className="flex items-center">
              <span>Birth Date</span>
              <div className="bg-primary-foreground/25 mx-4 flex h-px flex-1" />
              <span>{format(fugitive.birthDate, 'PPP')}</span>
            </div>
          )}
          <div className="flex items-center">
            <span>Identify Number</span>
            <div className="bg-primary-foreground/25 mx-4 flex h-px flex-1" />
            <span>{fugitive.identifyNumber}</span>
          </div>
          <div className="flex items-center">
            <span>Nationality</span>
            <div className="bg-primary-foreground/25 mx-4 flex h-px flex-1" />
            <span>{fugitive.nationality}</span>
          </div>
          <div className="flex items-center">
            <span>Latitude</span>
            <div className="bg-primary-foreground/25 mx-4 flex h-px flex-1" />
            <span>{fugitive.latitude}</span>
          </div>
          <div className="flex items-center">
            <span>Longitude</span>
            <div className="bg-primary-foreground/25 mx-4 flex h-px flex-1" />
            <span>{fugitive.longitude}</span>
          </div>
          <div className="flex items-center">
            <span>Updated</span>
            <div className="bg-primary-foreground/25 mx-4 flex h-px flex-1" />
            <span>{relativeDate(fugitive.updatedAt)}</span>
          </div>
          <div className="flex items-center">
            <span>Added</span>
            <div className="bg-primary-foreground/25 mx-4 flex h-px flex-1" />
            <span>{relativeDate(fugitive.createdAt)}</span>
          </div>
          {fugitive.appearance && (
            <div className="space-y-1">
              <p>Appearance</p>
              <Textarea value={fugitive.appearance} disabled className="h-auto resize-none" />
            </div>
          )}
          {fugitive.notes && (
            <div className="space-y-1">
              <p>Notes</p>
              <Textarea value={fugitive.notes} disabled className="h-auto resize-none" />
            </div>
          )}
        </div>
      </div>
      <SheetFooter className="flex flex-row">
        <Button variant="ghost" onClick={handleClose} className="cursor-pointer">
          Close
        </Button>
        <Button asChild className="flex flex-1">
          <Link href={`/platform/fugitives/${fugitive.id}`} className="cursor-pointer">
            More Details
          </Link>
        </Button>
      </SheetFooter>
    </>
  );
};

export default Preview;
