import type { FugitiveStatus } from '@/server/db/types';
import { type ClassValue, clsx } from 'clsx';
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
