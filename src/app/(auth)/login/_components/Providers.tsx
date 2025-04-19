'use client';

import { FaDiscord } from 'react-icons/fa';

import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

interface ProvidersProps {
  isPending: boolean;
}

const Providers: React.FC<ProvidersProps> = ({ isPending }) => {
  return (
    <div>
      <Button
        onClick={() =>
          signIn('discord', {
            redirect: true,
            redirectTo: '/platform',
          })
        }
        disabled={isPending}
        variant="ghost"
        className="cursor-pointer"
      >
        <FaDiscord />
        <span>Sign in with Discord</span>
      </Button>
    </div>
  );
};

export default Providers;
