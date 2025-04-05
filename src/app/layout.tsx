import { type Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import { TRPCReactProvider } from '@/trpc/react';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Fugitive AI',
  description: 'An AI assistant used to help you find your fugitive',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const quickSand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={`${quickSand.className} `}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
