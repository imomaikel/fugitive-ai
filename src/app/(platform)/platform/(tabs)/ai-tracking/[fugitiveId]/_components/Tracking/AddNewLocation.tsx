'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';

import { api } from '@/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { errorToast } from '@/lib/utils';
import { type AddNewLocationSchema, AddNewLocationValidator } from '@/lib/validators';

interface AddNewLocationProps {
  refetch: () => void;
  fugitiveId: string;
}

const AddNewLocation: React.FC<AddNewLocationProps> = ({ refetch, fugitiveId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<AddNewLocationSchema>({
    resolver: zodResolver(AddNewLocationValidator),
    defaultValues: {
      context: '',
      latitude: 0,
      longitude: 0,
      place: '',
      fugitiveId,
    },
  });

  const { mutate: addNewLocation, isPending } = api.tracking.addNewLocation.useMutation({
    onSuccess: () => {
      toast.success('Location added successfully');
      setIsOpen(false);
      form.reset();
      refetch();
    },
    onError: errorToast,
  });

  const onSubmit = (values: AddNewLocationSchema) => {
    addNewLocation(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="cursor-pointer">
          <FaPlus /> New
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add new location</DialogTitle>
          <DialogDescription>
            If the fugitive was last observed in a different location, please add the details here. This information
            will assist in tracing their movements more effectively.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Coffee Shop, 123 Main St, New York."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>Specify the location where the fugitive was last seen.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Context</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g. Fugitive entered the restroom and remained inside for approximately 20 minutes."
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>Describe the observed activity or behavior of the fugitive.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 40.7128"
                        {...field}
                        value={field.value === 0 ? '' : field.value}
                        disabled={isPending}
                        onChange={(e) => {
                          const parsedValue = parseFloat(e.target.value);
                          if (isNaN(parsedValue)) {
                            field.onChange(0);
                          } else {
                            field.onChange(parsedValue);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>Specify the latitude of the observed location.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. -74.0060"
                        {...field}
                        value={field.value === 0 ? '' : field.value}
                        disabled={isPending}
                        onChange={(e) => {
                          const parsedValue = parseFloat(e.target.value);
                          if (isNaN(parsedValue)) {
                            field.onChange(0);
                          } else {
                            field.onChange(parsedValue);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>Specify the longitude of the observed location.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
                Add
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewLocation;
