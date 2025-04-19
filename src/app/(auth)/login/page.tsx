import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import SignInForm from './_components/SignInForm';
import SignUpForm from './_components/SignUpForm';

const AuthPage = async ({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ error: string | undefined; code: string | undefined } | undefined>;
}) => {
  const searchParams = await searchParamsPromise;

  const invalidCredentials = searchParams?.code === 'credentials' && searchParams?.error === 'CredentialsSignin';

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="border-b border-slate-800 py-4">
        <div className="flex w-full items-center justify-center gap-3">
          <h1 className="text-xl font-bold text-white">FugitiveAI</h1>
          <Link className="text-muted-foreground text-xs" href="/">
            Home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="container flex max-w-6xl flex-col gap-8 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl">
                Secure Access to <span className="text-primary">Advanced</span> Criminal Tracking
              </h1>
              <p className="max-w-lg text-lg text-slate-400 md:text-xl">
                Authorized personnel only. Access FugitiveAI&apos;s powerful tools to locate and track fugitives with
                AI-powered precision.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
                <div className="mt-1 rounded-full bg-blue-900/30 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">Military-Grade Security</h3>
                  <p className="text-sm text-slate-400">End-to-end encryption</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
                <div className="mt-1 rounded-full bg-blue-900/30 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M12 12v6" />
                    <path d="M10 14h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-white">Detailed Audit Logs</h3>
                  <p className="text-sm text-slate-400">Every action is recorded for accountability</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Tabs defaultValue="signin" className="w-full max-w-md">
              <TabsList className="grid w-full grid-cols-2 bg-slate-900">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <Card className="border-slate-800 bg-slate-900 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Sign in to your account</CardTitle>
                    <CardDescription>Enter your credentials to access the FugitiveAI platform</CardDescription>
                  </CardHeader>
                  <SignInForm invalidCredentials={invalidCredentials} />
                </Card>
              </TabsContent>

              <TabsContent value="signup">
                <Card className="border-slate-800 bg-slate-900 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Sign up to the platform</CardTitle>
                    <CardDescription>Create an account to access FugitiveAI</CardDescription>
                  </CardHeader>
                  <SignUpForm />
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
        <div className="flex w-full items-center justify-center">
          <p>© {new Date().getFullYear()} FugitiveAI</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
