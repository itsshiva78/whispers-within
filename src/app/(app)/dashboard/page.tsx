'use client';

import { MessageCard } from '@/components/MessageCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/model/User';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw, Copy, Link as LinkIcon, MessageCircle, Trash2, Sparkles, Share2 } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { StoryTemplateGenerator } from '@/components/StoryTemplateGenerator';
import { Instagram } from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

function UserDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [showStoryGenerator, setShowStoryGenerator] = useState(false);
  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => (message._id as unknown as string) !== messageId));
  };

  const { data: session } = useSession();
  const form = useForm({ resolver: zodResolver(AcceptMessageSchema) });
  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages');
      setValue('acceptMessages', response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: 'Error', description: axiosError.response?.data.message ?? 'Failed to fetch message settings', variant: 'destructive' });
    } finally { setIsSwitchLoading(false); }
  }, [setValue, toast]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');
      setMessages(response.data.messages || []);
      if (refresh) toast({ title: 'Refreshed Messages', description: 'Showing latest messages' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: 'Error', description: axiosError.response?.data.message ?? 'Failed to fetch messages', variant: 'destructive' });
    } finally { setIsLoading(false); setIsSwitchLoading(false); }
  }, [setIsLoading, setMessages, toast]);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessages();
  }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', { acceptMessages: !acceptMessages });
      setValue('acceptMessages', !acceptMessages);
      toast({ title: response.data.message, variant: 'default' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: 'Error', description: axiosError.response?.data.message ?? 'Failed to update message settings', variant: 'destructive' });
    }
  };

  if (!session || !session.user) return <div></div>;

  const user = session.user as User;
  const { username } = user;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({ title: 'URL Copied!', description: 'Profile URL has been copied to clipboard.' });
  };

  const handleDeleteAll = async () => {
    try {
      const response = await axios.delete<ApiResponse>('/api/delete-all-messages');
      if (response.data.success) {
        setMessages([]);
        toast({ title: 'All Cleared! 🧹', description: response.data.message });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: 'Error', description: axiosError.response?.data.message ?? 'Failed to delete messages', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your whispers and profile</p>
        </div>

        {/* Profile Link Card */}
        <div className="rounded-2xl p-6 mb-8"
          style={{
            background: 'rgba(21, 18, 31, 0.6)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139,92,246,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
          <div className="flex items-center gap-3 mb-4">
            <LinkIcon className="h-5 w-5 text-violet-400" />
            <h2 className="text-lg font-semibold text-foreground">Your Unique Link</h2>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 px-4 py-3 rounded-xl text-xs sm:text-sm text-muted-foreground font-mono break-all"
              style={{ background: 'rgba(13, 11, 20, 0.8)', border: '1px solid rgba(139,92,246,0.08)' }}>
              {profileUrl}
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={copyToClipboard}
                className="flex-1 sm:flex-none h-11 px-5 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground border border-border/30 font-medium">
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
              <Button onClick={() => setShowStoryGenerator(true)}
                className="flex-1 sm:flex-none h-11 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-500/15 font-medium transition-all hover:scale-105">
                <Instagram className="h-4 w-4 mr-2" /> Share on IG
              </Button>
            </div>
          </div>
        </div>

        {/* Gamification / Free Hint Progress */}
        {!user?.isPro && (
          <div className="rounded-2xl p-6 mb-8 overflow-hidden relative group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(21, 18, 31, 0.8) 0%, rgba(139, 92, 246, 0.05) 100%)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(139,92,246,0.15)',
              boxShadow: '0 8px 32px rgba(139,92,246,0.1)',
            }}
            onClick={() => setShowStoryGenerator(true)}
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-violet-600/10 blur-[40px] group-hover:bg-violet-600/20 transition-all duration-500" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
              <div>
                <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-400 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" /> Free Hint Quest
                </h3>
                <p className="text-sm text-muted-foreground/80">
                  Share your link on Instagram today to earn <strong className="text-violet-300">1 Free Hint Unlock</strong>!
                </p>
              </div>
              
              <div className="w-full sm:w-auto flex-shrink-0">
                <Button className="w-full sm:w-auto h-10 px-5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/20 transition-all group-hover:scale-105" onClick={(e) => { e.stopPropagation(); setShowStoryGenerator(true); }}>
                  <Share2 className="w-4 h-4 mr-2" /> Share Now to Claim
                </Button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-5">
              <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-2">
                <span>Shares Today</span>
                <span className="text-violet-300 font-bold">0 / 1</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full w-[10%]" />
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 rounded-xl px-5 py-3 w-full sm:w-auto"
            style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
            <Switch {...register('acceptMessages')} checked={acceptMessages} onCheckedChange={handleSwitchChange} disabled={isSwitchLoading} />
            <span className="text-sm font-medium text-foreground">
              Accept Messages: <span className={acceptMessages ? 'text-emerald-400' : 'text-muted-foreground'}>{acceptMessages ? 'On' : 'Off'}</span>
            </span>
          </div>
          <Button variant="outline" onClick={(e) => { e.preventDefault(); fetchMessages(true); }}
            className="h-10 px-4 rounded-xl bg-secondary/50 hover:bg-secondary border-border/30 text-foreground">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
            <span className="ml-2 text-sm">Refresh</span>
          </Button>
          {messages.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline"
                  className="h-10 px-4 rounded-xl bg-destructive/10 hover:bg-destructive/20 border-destructive/20 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                  <span className="ml-2 text-sm">Delete All</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent style={{ background: 'rgba(21, 18, 31, 0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(139,92,246,0.15)' }}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete all whispers?</AlertDialogTitle>
                  <AlertDialogDescription>This will permanently delete all {messages.length} whisper{messages.length !== 1 ? 's' : ''}. This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAll} className="rounded-lg bg-destructive text-destructive-foreground">Delete All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard key={String(message._id)} message={message} onMessageDelete={handleDeleteMessage} />
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center py-20 rounded-2xl"
              style={{ background: 'rgba(21, 18, 31, 0.4)', border: '1px dashed rgba(139,92,246,0.15)' }}>
              <MessageCircle className="h-12 w-12 text-violet-400/30 mb-4" />
              <p className="text-muted-foreground font-medium">No whispers yet</p>
              <p className="text-sm text-muted-foreground/50 mt-1">Share your link to start receiving messages</p>
            </div>
          )}
        </div>
      </div>

      {showStoryGenerator && (
        <StoryTemplateGenerator
          username={username || 'anonymous'}
          profileUrl={profileUrl}
          onClose={() => setShowStoryGenerator(false)}
        />
      )}
    </div>
  );
}

export default UserDashboard;
