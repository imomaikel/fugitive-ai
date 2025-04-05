import type { User } from 'next-auth';

import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar';
import Profile from './Profile';

interface SidebarFooterContentProps {
  user: User;
}

const SidebarFooterContent: React.FC<SidebarFooterContentProps> = ({ user }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Profile user={user} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterContent;
