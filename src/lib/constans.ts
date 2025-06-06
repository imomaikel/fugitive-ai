import type { IconType } from 'react-icons';
import { FaHome } from 'react-icons/fa';
import { RiCriminalFill } from 'react-icons/ri';

import { Brain, FileText, MapPinned } from 'lucide-react';

export const SIDEBAR_TABS: {
  label: string;
  Icon: IconType;
  href: `/platform/${string}`;
  subMenus?: {
    label: string;
    href: `/platform/${string}`;
  }[];
}[] = [
  {
    label: 'Home',
    Icon: FaHome,
    href: '/platform/',
  },
  {
    label: 'Fugitives',
    Icon: RiCriminalFill,
    href: '/platform/fugitives',
    subMenus: [
      {
        href: '/platform/fugitives',
        label: 'All Fugitives',
      },
      {
        href: '/platform/fugitives/new',
        label: 'Add New',
      },
    ],
  },
  {
    label: 'Interactive Map',
    Icon: MapPinned,
    href: '/platform/interactive-map',
  },
  {
    label: 'AI Tracking',
    Icon: Brain,
    href: '/platform/ai-tracking',
  },
  {
    label: 'Logs',
    Icon: FileText,
    href: '/platform/logs',
  },
] as const;
