'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2, CheckCircle2, XCircle, User, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const debouncedUsername = useDebounce(username, 300);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: '', email: '', password: '' },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
          const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${debouncedUsername}`);
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username');
        } finally { setIsCheckingUsername(false); }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);
      toast({ title: 'Success', description: response.data.message });
      router.replace(`/verify/${username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: 'Sign Up Failed', description: axiosError.response?.data.message, variant: 'destructive' });
    } finally { setIsSubmitting(false); }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try { await signIn('google', { callbackUrl: '/complete-profile' }); }
    catch { setIsGoogleLoading(false); }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-background">
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[150px] animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 -left-40 w-[500px] h-[500px] rounded-full blur-[130px] animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md mx-4 my-8">
        <div className="p-8 rounded-2xl space-y-7"
          style={{
            background: 'rgba(21, 18, 31, 0.7)', backdropFilter: 'blur(24px)',
            border: '1px solid rgba(139,92,246,0.1)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.4), 0 0 80px rgba(139,92,246,0.06)',
          }}>

          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/20">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create Your Identity</h1>
            <p className="text-sm text-muted-foreground">Step into the world of anonymous whispers</p>
          </div>

          <Button onClick={handleGoogleSignIn} disabled={isGoogleLoading}
            className="w-full h-12 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.02] bg-secondary/80 hover:bg-secondary border border-border/50 text-foreground" variant="outline">
            {isGoogleLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : (
              <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative flex items-center">
            <div className="flex-grow h-px bg-border/50" />
            <span className="px-4 text-xs uppercase tracking-widest text-muted-foreground/50">or</span>
            <div className="flex-grow h-px bg-border/50" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField name="username" control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Username</FormLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/50" />
                      <Input {...field} onChange={(e) => { field.onChange(e); setUsername(e.target.value); }}
                        className="h-12 rounded-xl border-0 bg-background/80 text-foreground pl-10 pr-10 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                        placeholder="Choose a unique username" />
                      {isCheckingUsername && <Loader2 className="absolute right-3 top-3.5 h-4 w-4 animate-spin text-muted-foreground" />}
                      {!isCheckingUsername && usernameMessage === 'Username is unique' && <CheckCircle2 className="absolute right-3 top-3.5 h-4 w-4 text-emerald-500" />}
                      {!isCheckingUsername && usernameMessage && usernameMessage !== 'Username is unique' && <XCircle className="absolute right-3 top-3.5 h-4 w-4 text-red-400" />}
                    </div>
                    {!isCheckingUsername && usernameMessage && (
                      <p className={`text-xs ${usernameMessage === 'Username is unique' ? 'text-emerald-500' : 'text-red-400'}`}>{usernameMessage}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField name="email" control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/50" />
                      <Input {...field} name="email" className="h-12 rounded-xl border-0 bg-background/80 text-foreground pl-10 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                        placeholder="your@email.com" />
                    </div>
                    <p className="text-xs text-muted-foreground/50">We&apos;ll send a verification code</p>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField name="password" control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Password</FormLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/50" />
                      <Input type="password" {...field} name="password" className="h-12 rounded-xl border-0 bg-background/80 text-foreground pl-10 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                        placeholder="••••••••" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
              <Button type="submit" disabled={isSubmitting}
                className="w-full h-12 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/20">
                {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</>) : 'Create Account'}
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already a member?{' '}
              <Link href="/sign-in" className="font-semibold text-violet-400 hover:text-violet-300 transition-colors">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
