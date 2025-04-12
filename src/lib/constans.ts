import type { IconType } from 'react-icons';
import { FaHome } from 'react-icons/fa';
import { RiCriminalFill } from 'react-icons/ri';

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
        href: '/platform/fugitives/new',
        label: 'Add New',
      },
    ],
  },
] as const;
