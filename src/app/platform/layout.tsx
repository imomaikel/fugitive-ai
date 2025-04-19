import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getUser } from '@/server/queries';

import AppSidebar from '@/components/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

interface PlatformLayoutProps {
  children: React.ReactNode;
}

const PlatformLayout: React.FC<PlatformLayoutProps> = async ({ children }) => {
  const [user, cookieStore] = await Promise.all([getUser(), cookies()]);

  if (!user?.id) {
    redirect('/login');
  }

  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default PlatformLayout;
