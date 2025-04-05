'use client';

import { ThemeProvider } from 'next-themes';

import { TRPCReactProvider } from '@/trpc/react';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
