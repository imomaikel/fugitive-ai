'use client';

import { useState } from 'react';
import { ImMagicWand } from 'react-icons/im';

import { api } from '@/trpc/react';
import { useRouter } from '@bprogress/next/app';
import { toast } from 'sonner';

import { errorToast } from '@/lib/utils';

import { Button } from '../ui/button';
import { SidebarMenuButton } from '../ui/sidebar';

const Populate = () => {
  const [toastId, setToastId] = useState<string | number | null>(null);
  const router = useRouter();

  const dismissToast = () => {
    if (toastId) {
      toast.dismiss(toastId);
      setToastId(null);
    }
  };

  const { mutate: populateExampleData, isPending } = api.fugitive.populateExampleData.useMutation({
    onMutate: () => {
      const toastAlert = toast.loading('Populating example data...');
      setToastId(toastAlert);
    },
    onSuccess: (response) => {
      if (response?.success) {
        toast.success('Example data populated successfully.');
        router.refresh();
      } else {
        toast.error('Error populating example data.');
      }
      dismissToast();
    },
    onError: errorToast,
  });

  const handleClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to populate example data? It will add 13 fugitives to the list.',
    );
    if (!confirmed) return;

    populateExampleData();
  };

  return (
    <SidebarMenuButton
      className="hover:text-primary flex w-full cursor-pointer justify-center text-center"
      disabled={isPending}
      onClick={handleClick}
    >
      <ImMagicWand />
      <span>Add example data</span>
    </SidebarMenuButton>
  );
};

export default Populate;
