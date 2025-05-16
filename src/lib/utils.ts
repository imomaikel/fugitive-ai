import type { FugitiveRaw, FugitiveStatus } from '@/server/db/types';
import { type ClassValue, clsx } from 'clsx';
import { formatRelative } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getFugitiveStatusDescription = (status: FugitiveStatus) => {
  switch (status) {
    case 'wanted':
      return 'Actively sought, current location unknown.';
    case 'identified':
      return 'Identity confirmed, but location not yet determined.';
    case 'located':
      return 'Probable location has been determined.';
    case 'under surveillance':
      return 'Being monitored, but not yet apprehended.';
    case 'apprehended':
      return 'The individual has been captured by authorities.';
    case 'no longer wanted':
      return 'Case closed, mistaken identity, or deceased.';
    case 'suspected':
      return 'Preliminary status, added based on unconfirmed information.';
    case 'in hiding':
      return 'Confirmed attempts to evade capture.';
    case 'international warrant':
      return 'Subject of an INTERPOL/Europol notice.';
    case 'pending verification':
      return 'Temporary entry awaiting confirmation by authorities.';
    case 'incarcerated':
      return 'In prison or jail, awaiting trial.';
    case 'executed':
      return 'Sentenced to death.';
    default:
      return 'Unknown';
  }
};

/* eslint-disable */
export const errorToast = (message: any) => {
  let fixedMessage = 'Something went wrong';

  try {
    const zodErrors = message?.data?.zodError?.fieldErrors;
    if (typeof zodErrors === 'object') {
      const messages = Object.values(zodErrors).flatMap((error) => error);
      fixedMessage = messages.join(', ');
      return toast.error(fixedMessage);
    }

    if (typeof message === 'string' && message?.length > 0) {
      fixedMessage = message;
    } else if (typeof message?.message === 'string' && message?.message?.length > 0) fixedMessage = message?.message;
  } catch {}

  toast.error(fixedMessage);
};
/* eslint-enable */

const formatRelativeLocale = {
  lastWeek: "'Last' eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "'Today at' p",
  tomorrow: "'Tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'Pp',
} as const;
type relative = keyof typeof formatRelativeLocale;

export const relativeDate = (date: Date, baseDate?: Date) => {
  const relative = formatRelative(date, baseDate ?? new Date(), {
    locale: { ...enUS, formatRelative: (token: relative) => formatRelativeLocale[token] },
  });
  return relative;
};

export const translateFugitiveColumnName = (column: keyof FugitiveRaw) => {
  switch (column) {
    case 'fullName':
      return 'Full Name';
    case 'gender':
      return 'Gender';
    case 'dangerLevel':
      return 'Danger Level';
    case 'status':
      return 'Status';
    case 'identifyNumber':
      return 'ID Number';
    case 'nationality':
      return 'Nationality';
    case 'appearance':
      return 'Appearance';
    case 'notes':
      return 'Notes';
    case 'addedByUserName':
      return 'Added By';
    case 'birthDate':
      return 'Birth Date';
    default:
      return column;
  }
};

export const standardizeFilter = (filter: string) => {
  return filter.toLowerCase().replaceAll(' ', '-').replaceAll(' ', '');
};

export const calculateAge = (birth: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};
