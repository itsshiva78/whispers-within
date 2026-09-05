'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Send, Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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
  const username = decodeURIComponent(params.username || '');
  const [completion, setCompletion] = useState(initialMessageString);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);

  const fetchSuggestions = async () => {
    setIsSuggestLoading(true);
    try {
      const response = await axios.post('/api/suggest-messages');
      if (typeof response.data === 'string') {
        setCompletion(response.data);
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch message suggestions', variant: 'destructive' });
    } finally {
      setIsSuggestLoading(false);
    }
  };

  const form = useForm<z.infer<typeof messageSchema>>({ resolver: zodResolver(messageSchema) });
  const messageContent = form.watch('content');
  const handleMessageClick = (message: string) => form.setValue('content', message);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', { ...data, username });
      toast({ title: response.data.message, variant: 'default' });
      form.reset({ ...form.getValues(), content: '' });
      setIsSent(true);
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

        {/* Success or Message Form */}
        {isSent ? (
          <div
            className="rounded-2xl p-8 mb-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300"
            style={{
              background: 'rgba(21, 18, 31, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139,92,246,0.2)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            }}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Whisper Sent Anonymously! 🤫
              </h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Your message was delivered secretly to <strong className="text-violet-300">@{username}</strong>. They will never know who sent it!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-violet-500/15 to-indigo-500/10 border border-violet-500/25 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider">
                🔥 It&apos;s Your Turn!
              </span>
              <h3 className="text-lg font-bold text-foreground">
                Want to know what your friends secretly think about you?
              </h3>
              <p className="text-xs text-muted-foreground">
                Create your personal whisper link, add it to your Instagram or WhatsApp story, and get anonymous compliments & secrets!
              </p>
              <Link href="/sign-up" className="block pt-2">
                <Button className="w-full h-12 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02]">
                  Claim Your Free Link (Takes 20s) 🚀
                </Button>
              </Link>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsSent(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Send another whisper to @{username}
              </button>
            </div>
          </div>
        ) : (
          /* Message Form */
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="senderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Name (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Leave a hint..."
                            className="h-12 rounded-xl border-0 bg-background/80 text-foreground text-sm focus-visible:ring-1 focus-visible:ring-primary"
                            {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                  <FormField control={form.control} name="senderGender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-wider text-muted-foreground">Gender (Optional)</FormLabel>
                        <FormControl>
                          <select
                            className="flex h-12 w-full items-center justify-between rounded-xl border-0 bg-background/80 px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option className="bg-background text-foreground" value="">Secret 🤫</option>
                            <option className="bg-background text-foreground" value="Male">Male 👦</option>
                            <option className="bg-background text-foreground" value="Female">Female 👧</option>
                            <option className="bg-background text-foreground" value="Other">Other 🏳️‍🌈</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                </div>
                <div className="flex justify-center">
                  <Button type="submit" disabled={isLoading || !messageContent}
                    className="h-12 px-8 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02]">
                    {isLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>) : (<><Send className="mr-2 h-4 w-4" /> Send Whisper</>)}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* Suggestions */}
        <div className="space-y-4">
          <Button onClick={fetchSuggestions} disabled={isSuggestLoading}
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
              {parseStringMessages(completion).map((message, index) => (
                <Button key={index} variant="ghost" onClick={() => handleMessageClick(message)}
                  className="justify-start text-left h-auto py-3 px-4 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-violet-500/10 transition-all whitespace-normal">
                  {message}
                </Button>
              ))}
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
