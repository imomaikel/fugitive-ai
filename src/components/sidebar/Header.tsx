import Image from 'next/image';

import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar';

const SidebarHeaderContent = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="hover:bg-primary-foreground flex items-center overflow-hidden rounded-md transition-colors">
          <Image width={64} height={64} src="/logo-no-bg.webp" alt="Logo" className="max-size-[64px] object-contain" />
          <div className="pointer-events-none flex flex-1 flex-col items-center justify-center whitespace-nowrap data-[state=open]:hidden">
            <h1 className="text-xl font-semibold">Fugitive AI</h1>
            <p className="text-muted-foreground text-xs">Track fugitives</p>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarHeaderContent;
