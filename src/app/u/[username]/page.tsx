'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Send, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

const specialChar = '||';
const parseStringMessages = (messageString: string): string[] => messageString.split(specialChar);
const initialMessageString = "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const { complete, completion, isLoading: isSuggestLoading, error } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({ resolver: zodResolver(messageSchema) });
  const messageContent = form.watch('content');
  const handleMessageClick = (message: string) => form.setValue('content', message);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', { ...data, username });
      toast({ title: response.data.message, variant: 'default' });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: 'Error', description: axiosError.response?.data.message ?? 'Failed to send message', variant: 'destructive' });
    } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-[150px] animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />

      <div className="container mx-auto max-w-2xl px-4 py-10 relative z-10 mt-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center mb-5 border border-violet-500/10">
            <MessageCircle className="h-8 w-8 text-violet-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Send a Whisper to <span className="text-violet-400">@{username}</span>
          </h1>
          <p className="text-muted-foreground">Your identity will remain completely anonymous</p>
        </div>

        {/* Message Form */}
        <div className="rounded-2xl p-6 mb-8"
          style={{
            background: 'rgba(21, 18, 31, 0.6)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139,92,246,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Your Anonymous Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write something honest, kind, or mysterious..."
                        className="resize-none min-h-[120px] rounded-xl border-0 bg-background/80 text-foreground text-sm focus-visible:ring-1 focus-visible:ring-primary"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              <div className="flex justify-center">
                <Button type="submit" disabled={isLoading || !messageContent}
                  className="h-12 px-8 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02]">
                  {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>) : (<><Send className="mr-2 h-4 w-4" /> Send Whisper</>)}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          <Button onClick={() => complete('')} disabled={isSuggestLoading}
            className="rounded-xl bg-secondary/50 hover:bg-secondary border border-border/30 text-foreground font-medium" variant="outline">
            <Sparkles className="mr-2 h-4 w-4 text-violet-400" />
            {isSuggestLoading ? 'Thinking...' : 'Suggest Messages'}
          </Button>
          <p className="text-sm text-muted-foreground/50">Click on any suggestion below to use it</p>

          <div className="rounded-2xl overflow-hidden"
            style={{ background: 'rgba(21, 18, 31, 0.4)', border: '1px solid rgba(139,92,246,0.08)' }}>
            <div className="p-4 border-b border-border/20">
              <h3 className="text-sm font-semibold text-foreground/80">Suggested Whispers</h3>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {error ? (
                <p className="text-red-400 text-sm">{error.message}</p>
              ) : (
                parseStringMessages(completion).map((message, index) => (
                  <Button key={index} variant="ghost" onClick={() => handleMessageClick(message)}
                    className="justify-start text-left h-auto py-3 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-violet-500/10 transition-all whitespace-normal">
                    {message}
                  </Button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 pt-8 border-t border-border/20">
          <p className="text-muted-foreground mb-4">Want your own whisper board?</p>
          <Link href="/sign-up">
            <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02]">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
