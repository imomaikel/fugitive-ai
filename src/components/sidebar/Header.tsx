import Image from 'next/image';
import Link from 'next/link';

import { SidebarMenu, SidebarMenuItem } from '../ui/sidebar';

const SidebarHeaderContent = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/platform">
          <div className="hover:bg-sidebar-accent flex max-h-[64px] items-center overflow-hidden rounded-md transition-colors">
            <Image
              width={64}
              height={64}
              src="/logo-no-bg.webp"
              alt="Logo"
              className="aspect-square max-h-[64px] min-w-[30px] dark:mix-blend-plus-darker dark:brightness-150"
              loading="eager"
            />
            <div className="pointer-events-none flex flex-1 flex-col items-center justify-center px-4 whitespace-nowrap data-[state=open]:hidden">
              <h1 className="text-xl font-semibold">Fugitive AI</h1>
              <p className="text-muted-foreground text-xs">Track fugitives</p>
            </div>
          </div>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SidebarHeaderContent;
