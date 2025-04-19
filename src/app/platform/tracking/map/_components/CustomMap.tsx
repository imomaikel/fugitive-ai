'use client';

import React, { useCallback, useRef, useState } from 'react';
import { RiCriminalFill } from 'react-icons/ri';
import { Map, type MapRef, Marker, type MarkerEvent, type ViewStateChangeEvent } from 'react-map-gl/maplibre';

import { useTheme } from 'next-themes';

import { api } from '@/trpc/react';
import { useRouter } from '@bprogress/next/app';
import { debounce } from 'lodash';
import { Loader2 } from 'lucide-react';
import type { MapMouseEvent } from 'maplibre-gl';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { cn, errorToast } from '@/lib/utils';

import FlyToCoords from './FlyToCoords';
import Preview from './Preview';

import 'maplibre-gl/dist/maplibre-gl.css';

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
  initialMapView?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

const CustomMap: React.FC<CustomMapProps> = ({ markers, fugitiveSelected, initialMapView }) => {
  const [fugitiveIdToPreview, setFugitiveIdToPreview] = useState<string | null>(null);
  const mapRef = useRef<MapRef>(null);
  const { theme } = useTheme();
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

  const { mutate: rememberMapView } = api.fugitive.rememberMapView.useMutation();

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

  const handleFlyToCoordinates = (lat: number, lng: number) => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: 13,
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMoveEnv = useCallback(
    debounce((event: ViewStateChangeEvent) => {
      const {
        viewState: { latitude, longitude, zoom },
      } = event;

      rememberMapView({
        latitude,
        longitude,
        zoom,
      });
    }, 500),
    [],
  );

  return (
    <>
      <Map
        ref={mapRef}
        initialViewState={{
          bearing: 0,
          pitch: 0,
          ...initialMapView,
        }}
        dragPan={!isPending}
        onMoveEnd={handleMoveEnv}
        cursor={isPending ? 'default' : 'grab'}
        onClick={handleMapClick}
        mapStyle={
          theme === 'dark'
            ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
            : 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
        }
      >
        {!hasFugitiveSelected && <FlyToCoords handleFly={handleFlyToCoordinates} />}
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
