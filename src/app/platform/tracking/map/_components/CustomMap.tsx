'use client';

import React, { useState } from 'react';
import { RiCriminalFill } from 'react-icons/ri';
import { Map, type MapEvent, Marker, type MarkerEvent } from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';

import { cn } from '@/lib/utils';

import Preview from './Preview';

interface CustomMapProps {
  markers: {
    fugitiveId: string;
    latitude: number;
    longitude: number;
  }[];
}

const CustomMap: React.FC<CustomMapProps> = ({ markers }) => {
  const [fugitiveIdToPreview, setFugitiveIdToPreview] = useState<string | null>(null);

  const handleMarkerClick = (event: MarkerEvent<MouseEvent>, fugitiveId: string) => {
    event.originalEvent.stopPropagation();
    setFugitiveIdToPreview(fugitiveId);
  };

  const handleMapClick = (event: MapEvent<MouseEvent>) => {
    // TODO
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
        onClick={handleMapClick}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
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
