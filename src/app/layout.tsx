import { type Metadata } from 'next';
import { Quicksand } from 'next/font/google';

import Providers from '@/components/Providers';

import { cn } from '@/lib/utils';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Fugitive AI',
  description:
    'Fugitive AI is an AI-powered platform that assists in the identification, tracking, and location of fugitives. It uses cutting-edge artificial intelligence to provide accurate and reliable results.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const quickSand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning className={cn('scroll-smooth', quickSand.className)}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
