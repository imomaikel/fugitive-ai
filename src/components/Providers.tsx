'use client';

import { ThemeProvider } from 'next-themes';

import { TRPCReactProvider } from '@/trpc/react';
import { ProgressProvider } from '@bprogress/next/app';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ProgressProvider height="2px" color="#7f22fe" options={{ showSpinner: false }} shallowRouting>
      <TRPCReactProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster position="top-center" offset={20} />
      </TRPCReactProvider>
    </ProgressProvider>
  );
};

export default Providers;
