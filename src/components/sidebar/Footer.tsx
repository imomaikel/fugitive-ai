import ThemeToggler from '../ThemeToggler';
import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar';

const SidebarFooterContent = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <ThemeToggler />
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarFooterContent;
