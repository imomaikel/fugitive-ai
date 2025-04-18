import React from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FlyToCoordsProps {
  handleFly: (lat: number, lng: number) => void;
}

const FlyToCoords: React.FC<FlyToCoordsProps> = ({ handleFly }) => {
  const [lat, setLat] = React.useState('');
  const [lng, setLng] = React.useState('');

  const handleSubmit = () => {
    try {
      const parsedLat = parseFloat(lat);
      const parsedLng = parseFloat(lng);

      if (isNaN(parsedLat) || isNaN(parsedLng)) {
        throw new Error('Invalid coordinates!');
      }

      toast.info('Flying to coordinates...', {
        duration: 1_000,
      });
      handleFly(parsedLat, parsedLng);
    } catch {
      toast.error('Invalid coordinates!');
    }
  };

  return (
    <div className="bg-background absolute top-2 right-2 space-y-3 rounded-md border p-3 opacity-75">
      <Input placeholder="Latitude" onChange={(e) => setLat(e.target.value)} type="number" />
      <Input placeholder="Longitude" onChange={(e) => setLng(e.target.value)} type="number" />
      <Button variant="secondary" className="w-full" onClick={handleSubmit}>
        Fly
      </Button>
    </div>
  );
};

export default FlyToCoords;
