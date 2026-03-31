'use client'

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X, Share2, Eye, Smartphone, Clock, Monitor, Lock, Loader2, Sparkles } from 'lucide-react';
import { Message } from '@/model/User';
import { load } from '@cashfreepayments/cashfree-js';
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
  const [showHints, setShowHints] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const msgAny = message as any;
  const [revealedData, setRevealedData] = useState<{name: string, gender: string} | null>(
    msgAny.isNameRevealed ? { name: msgAny.senderName || 'Anonymous', gender: msgAny.senderGender || 'Secret 🤫' } : null
  );
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

  const handleRevealIdentity = async () => {
    setIsPaymentLoading(true);
    try {
      // 1. Create order
      const { data } = await axios.post('/api/cashfree/create-order', { messageId: message._id });
      if (!data.success) {
        toast({ title: 'Failed to create order', variant: 'destructive' });
        setIsPaymentLoading(false);
        return;
      }

      // 2. Open Cashfree Popup
      const cashfree = await load({ mode: 'production' });
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: '_modal',
      };

      cashfree.checkout(checkoutOptions).then((result: any) => {
        if (result.error) {
          toast({ title: 'Payment Failed', description: result.error.message, variant: 'destructive' });
          setIsPaymentLoading(false);
        }
        if (result.redirect) {
          // It redirected, handle verification on reload
          console.log('Redirected to bank');
        }
        if (result.paymentDetails) {
          // Payment completed, verify on server
          toast({ title: 'Payment Successful', description: 'Verifying with server...', variant: 'default' });
          axios.post('/api/cashfree/verify', { orderId: data.order_id }).then(res => {
            if (res.data.success) {
              setRevealedData({ name: res.data.senderName, gender: res.data.senderGender });
              toast({ title: 'Unlocked!', description: res.data.message });
            } else {
              toast({ title: 'Verification Failed', variant: 'destructive', description: res.data.message });
            }
          }).finally(() => {
            setIsPaymentLoading(false);
          });
        }
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({ title: 'Error', description: axiosError.response?.data.message ?? 'Payment process failed', variant: 'destructive' });
      setIsPaymentLoading(false);
    }
  };

  const hints = [
    { icon: Smartphone, label: 'Device', value: msgAny.senderDevice || 'Unknown' },
    { icon: Clock, label: 'Sent At', value: msgAny.senderTimePeriod || 'Unknown' },
    { icon: Monitor, label: 'Platform', value: msgAny.senderPlatform || 'Unknown' },
  ];

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
                onClick={() => setShowHints(!showHints)}
                className={`h-8 w-8 rounded-lg ${showHints ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400/60 hover:text-amber-400'}`}
                title="Get a Hint">
                <Eye className="w-3.5 h-3.5" />
              </Button>
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
        <CardContent>
          {/* Who Sent This? Hints */}
          {showHints && (
            <div className="mt-2 p-3 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300"
              style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.1)' }}>
              
              <div className="flex justify-between items-center mb-3">
                <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" /> Get a Hint
                </p>
                {revealedData && (
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded animate-pulse">
                    Unlocked
                  </span>
                )}
              </div>

              <div className="flex gap-2 mb-3">
                {hints.map((hint, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-center py-2 rounded-lg border border-amber-500/5" style={{ background: 'rgba(251,191,36,0.04)' }}>
                    <hint.icon className="h-3.5 w-3.5 text-amber-400/50 mb-1" />
                    <p className="text-[9px] text-amber-400/40 uppercase tracking-widest font-medium">{hint.label}</p>
                    <p className="text-[11px] font-bold text-amber-300 mt-0.5">{hint.value}</p>
                  </div>
                ))}
              </div>

              {/* Identity Reveal Section */}
              <div className="mt-3 pt-3 border-t border-amber-500/10">
                {revealedData ? (
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-amber-400/60 font-medium">True Identity</p>
                      <p className="text-sm font-bold text-amber-300 flex items-center gap-2">
                        {revealedData.name} 
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">{revealedData.gender}</span>
                      </p>
                    </div>
                  </div>
                ) : (
                  <Button onClick={handleRevealIdentity} disabled={isPaymentLoading}
                    className="w-full h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-amber-950 font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]">
                    {isPaymentLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Unlocking...</>
                    ) : (
                      <><Lock className="mr-2 h-4 w-4" /> Reveal the Hint (₹199)</>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showShareCard && (
        <ShareCard messageContent={message.content} messageDate={message.createdAt}
          username={user?.username || 'anonymous'} onClose={() => setShowShareCard(false)} />
      )}
    </>
  );
}
