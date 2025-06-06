import React from 'react';

import { api } from '@/trpc/react';
import { toast } from 'sonner';

import Loader from '@/components/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn, errorToast, relativeDate } from '@/lib/utils';

interface PreviousLocationsProps {
  fugitiveId: string;
}

const PreviousLocations: React.FC<PreviousLocationsProps> = ({ fugitiveId }) => {
  const { data: previousLocations, isLoading, refetch } = api.tracking.getPreviousLocations.useQuery({ fugitiveId });
  const { mutate: deletePreviousLocation, isPending: isDeleting } = api.tracking.deletePreviousLocation.useMutation({
    onError: errorToast,
    onSuccess: async (response) => {
      if (response?.success) {
        toast.success('Location deleted successfully');
        await refetch();
      } else {
        errorToast(undefined);
      }
    },
  });

  const handleDeleteLocation = (locationId: string) => {
    if (isDeleting) return;
    deletePreviousLocation({ fugitiveId, locationId });
  };

  const noPreviousLocations = previousLocations?.length === 0 && !isLoading;

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Previous Locations</CardTitle>
        <CardDescription>The previous locations of this fugitive</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[300px] overflow-y-auto">
          {isLoading && <Loader className="size-16" />}
          {noPreviousLocations && <p className="text-muted-foreground">No previous locations found</p>}
          <ul className="marker:text-primary list-disc space-y-2 pl-4">
            {previousLocations?.map((location) => (
              <li key={location.id}>
                <p>{location.place}</p>
                <div className="flex flex-col">
                  <span className="text-sm">{location.context}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-xs">{relativeDate(location.createdAt)}</span>
                    <span
                      role="button"
                      aria-label="click to delete"
                      className={cn('text-muted-foreground text-xs select-none', !isDeleting && 'cursor-pointer')}
                      onDoubleClick={() => handleDeleteLocation(location.id)}
                    >
                      Double click to delete
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PreviousLocations;
