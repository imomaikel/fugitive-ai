import React, { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  pageName: string;
  previousPages?: { label: string; href: string }[];
  description?: string;
  containerClassName?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  pageName,
  description,
  previousPages,
  containerClassName,
}) => {
  return (
    <div className="h-[calc(100vh-16px)] overflow-clip">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/platform">Platform</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              {previousPages?.map(({ href, label }, idx) => (
                <Fragment key={`item-${idx}`}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                </Fragment>
              ))}
              <BreadcrumbItem>
                <BreadcrumbPage>{pageName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className={cn('relative h-[calc(100%-64px)] w-full overflow-y-auto px-4 pb-4', containerClassName)}>
        {description && (
          <div className="mb-4 space-y-4">
            <p className="text-muted-foreground leftBar">{description}</p>
            <Separator />
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
