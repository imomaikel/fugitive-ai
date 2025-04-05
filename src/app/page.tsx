'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="m-6 flex w-fit flex-col gap-6">
      <Button onClick={() => signIn('discord')}>Sign In</Button>
      <Button asChild>
        <Link href="/platform">Open Platform</Link>
      </Button>
    </div>
  );
};

export default HomePage;
