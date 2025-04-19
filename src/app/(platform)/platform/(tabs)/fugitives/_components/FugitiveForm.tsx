'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { api } from '@/trpc/react';
import { useRouter } from '@bprogress/next/app';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { errorToast, getFugitiveStatusDescription } from '@/lib/utils';
import { type FugitiveSchema, FugitiveValidator } from '@/lib/validators';

interface FugitiveFormProps {
  mode: 'ADD' | 'EDIT';
  defaultValues?: FugitiveSchema;
}

const FugitiveForm: React.FC<FugitiveFormProps> = ({ defaultValues, mode }) => {
  const router = useRouter();

  const form = useForm<FugitiveSchema>({
    resolver: zodResolver(FugitiveValidator),
    defaultValues: {
      id: null,
      fullName: '',
      gender: 'male',
      status: 'wanted',
      dangerLevel: 'low',
      birthDate: null,
      identifyNumber: '',
      nationality: '',
      appearance: '',
      notes: '',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (!defaultValues) return;
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const { mutate: addFugitive, isPending: isAdding } = api.fugitive.add.useMutation({
    onError: errorToast,
    onSuccess: (response) => {
      if (response?.success) {
        toast.success('Fugitive added successfully');
        // TODO: Consider redirecting to the fugitive[id] page or to a interactive map
        router.push('/platform/fugitives');
      } else {
        errorToast(undefined);
      }
    },
  });

  const { mutate: updateFugitive, isPending: isUpdating } = api.fugitive.update.useMutation({
    onError: errorToast,
    onSuccess: (response) => {
      if (response?.success) {
        toast.success('Fugitive updated successfully');
        router.refresh();
      } else {
        errorToast(undefined);
      }
    },
  });

  const handleFormSubmit = (values: FugitiveSchema) => {
    if (mode === 'ADD') {
      addFugitive(values);
    } else {
      updateFugitive(values);
    }
  };

  const isPending = isAdding || isUpdating;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dangerLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danger Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select danger level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="extreme">Extreme</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Birth Date</FormLabel>
                  <DateTimePicker
                    granularity="day"
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    disabled={isPending}
                    className="w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="identifyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter ID number" {...field} value={field.value ?? ''} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Input placeholder="Enter nationality" {...field} value={field.value ?? ''} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {Object.values(FugitiveValidator.pick({ status: true }).shape.status.Enum).map((status, idx) => (
                      <FormItem key={`status-${idx}`} className="flex items-center space-y-0 space-x-2">
                        <FormControl>
                          <RadioGroupItem value={status} />
                        </FormControl>
                        <div>
                          <FormLabel className="cursor-pointer font-normal capitalize">{status}</FormLabel>
                          <FormDescription className="text-muted-foreground">
                            {getFugitiveStatusDescription(status)}
                          </FormDescription>
                        </div>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appearance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appearance</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Describe physical appearance"
                    className="min-h-[80px]"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Additional notes"
                    className="min-h-[80px]"
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" disabled={isPending}>
              <Link href="/platform/fugitives">See all Fugitives</Link>
            </Button>
            <Button type="submit" className="min-w-[30%] cursor-pointer" disabled={isPending}>
              {mode === 'ADD' ? 'Add Fugitive' : 'Update Fugitive'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FugitiveForm;

// TODO: Assign location to a fugitive
