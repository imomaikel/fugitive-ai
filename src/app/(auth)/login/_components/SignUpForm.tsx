'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { signUpWithCredentials } from '@/server/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { type SignUpSchema, SignUpValidator } from '@/lib/validators';

import Providers from './Providers';

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpValidator),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpSchema) => {
    const toastId = toast.loading('Signing up...');

    startTransition(async () => {
      await signUpWithCredentials(data)
        .then((response) => {
          if (response?.success !== true) {
            toast.dismiss(toastId);
            toast.error(response?.message || 'Something went wrong');
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (error?.message === 'NEXT_REDIRECT') {
            toast.dismiss(toastId);
            toast.success('Successfully signed up');
          } else {
            toast.dismiss(toastId);
            toast.error('Something went wrong');
          }
        });
    });
  };

  return (
    <>
      <CardContent>
        {' '}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} type="email" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
              <span>Submit</span>
              <ArrowRight />
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-slate-800 pt-4">
        <Providers isPending={isPending} />
      </CardFooter>
    </>
  );
};

export default SignUpForm;
