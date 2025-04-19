'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRight } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { type SignInSchema, SignInValidator } from '@/lib/validators';

import Providers from './Providers';

interface SignInFormProps {
  invalidCredentials: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({ invalidCredentials }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInValidator),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInSchema) => {
    startTransition(async () => {
      await signIn('credentials', {
        redirect: true,
        redirectTo: '/platform',
        email: data.email,
        password: data.password,
      });
    });
  };

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} type="email" />
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
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full cursor-pointer">
              <span>Submit</span>
              <ArrowRight />
            </Button>
          </form>
        </Form>
        {invalidCredentials && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Invalid credentials. Please try again.</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t border-slate-800 pt-4">
        <Providers isPending={isPending} />
      </CardFooter>
    </>
  );
};

export default SignInForm;
