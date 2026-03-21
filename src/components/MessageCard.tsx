'use client'

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X, Share2 } from 'lucide-react';
import { Message } from '@/model/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ApiResponse } from '@/types/ApiResponse';
import { ShareCard } from './ShareCard';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();
  const [showShareCard, setShowShareCard] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as User;

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
      toast({ title: response.data.message });
      onMessageDelete(message._id as unknown as string);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: 'Error', description: axiosError.response?.data.message ?? 'Failed to delete message', variant: 'destructive' });
    }
  };

  return (
    <>
      <Card className="border-0 rounded-xl transition-all duration-300 hover:-translate-y-1 group"
        style={{
          background: 'rgba(21, 18, 31, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(139,92,246,0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        }}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-3">
            <CardTitle className="text-base font-medium text-foreground/90 leading-relaxed flex-1">
              {message.content}
            </CardTitle>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button variant="ghost" size="icon"
                onClick={() => setShowShareCard(true)}
                className="h-8 w-8 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-400"
                title="Share">
                <Share2 className="w-3.5 h-3.5" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent style={{ background: 'rgba(21, 18, 31, 0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(139,92,246,0.15)' }}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this whisper?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm} className="rounded-lg bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-2">
            {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
          </p>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      {showShareCard && (
        <ShareCard messageContent={message.content} messageDate={message.createdAt}
          username={user?.username || 'anonymous'} onClose={() => setShowShareCard(false)} />
      )}
    </>
  );
}
