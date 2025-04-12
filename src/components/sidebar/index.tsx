import * as React from 'react';

import type { User } from 'next-auth';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

import SidebarFooterContent from './Footer';
import SidebarHeaderContent from './Header';

interface AppSidebarProps {
  props?: React.ComponentProps<typeof Sidebar>;
  user: User;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ props, user }) => {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarHeaderContent />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <SidebarFooterContent user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
