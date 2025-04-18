'use client';

import { Map } from 'react-map-gl/maplibre';

const CustomMap = () => {
  return (
    <Map
      initialViewState={{
        latitude: 40,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
    ></Map>
  );
};

export default CustomMap;
