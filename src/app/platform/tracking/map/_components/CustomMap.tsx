'use client';

import React, { useState } from 'react';
import { RiCriminalFill } from 'react-icons/ri';
import { Map, Marker, type MarkerEvent } from 'react-map-gl/maplibre';

import { api } from '@/trpc/react';
import { useRouter } from '@bprogress/next/app';
import { Loader2 } from 'lucide-react';
import type { MapMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { cn, errorToast } from '@/lib/utils';

import Preview from './Preview';

interface CustomMapProps {
  markers: {
    fugitiveId: string;
    latitude: number;
    longitude: number;
  }[];
  fugitiveSelected?: {
    id: string;
    fullName: string;
  };
}

const CustomMap: React.FC<CustomMapProps> = ({ markers, fugitiveSelected }) => {
  const [fugitiveIdToPreview, setFugitiveIdToPreview] = useState<string | null>(null);
  const router = useRouter();

  const hasFugitiveSelected = !!fugitiveSelected?.id;

  const { mutate: setLocation, isPending } = api.fugitive.setLocation.useMutation({
    onError: errorToast,
    onSuccess: (response) => {
      if (response?.success) {
        toast.success('Location of fugitive has been set');
        router.replace('/platform/tracking/map');
      } else {
        errorToast('Error setting location');
      }
    },
  });

  const handleMarkerClick = (event: MarkerEvent<MouseEvent>, fugitiveId: string) => {
    event.originalEvent.stopPropagation();
    setFugitiveIdToPreview(fugitiveId);
  };

  const handleMapClick = (event: MapMouseEvent) => {
    if (!hasFugitiveSelected || isPending) return;

    setLocation({
      id: fugitiveSelected.id,
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        dragPan={!isPending}
        cursor={isPending ? 'default' : 'grab'}
        onClick={handleMapClick}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        {hasFugitiveSelected && (
          <div className="absolute top-6 flex w-full flex-col items-center justify-center">
            {isPending ? (
              <Loader2 className="size-12 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  Click anywhere to set the location of the fugitive ({fugitiveSelected.fullName})
                </span>
                <Button variant="outline" onClick={() => router.replace('/platform/tracking/map')}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
        {markers.map(({ fugitiveId, latitude, longitude }) => (
          <Marker
            key={`marker-${fugitiveId}`}
            latitude={latitude}
            longitude={longitude}
            anchor="bottom"
            onClick={(event) => handleMarkerClick(event, fugitiveId)}
          >
            <svg height={32} viewBox="0 0 32 32" className="cursor-pointer">
              <RiCriminalFill
                size={32}
                className={cn(
                  'fill-destructive transition-colors',
                  fugitiveIdToPreview === fugitiveId && 'fill-primary',
                )}
              />
            </svg>
          </Marker>
        ))}
      </Map>
      <Preview fugitiveIdToPreview={fugitiveIdToPreview} onClose={() => setFugitiveIdToPreview(null)} />
    </>
  );
};

export default CustomMap;
