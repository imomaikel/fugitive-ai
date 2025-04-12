import * as React from 'react';

import type { User } from 'next-auth';

import {
  Sidebar,
  SidebarContent as SidebarContentWrapper,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import SidebarContent from './Content';
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
      <SidebarContentWrapper>
        <SidebarContent />
      </SidebarContentWrapper>
      <SidebarFooter>
        <SidebarFooterContent user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
