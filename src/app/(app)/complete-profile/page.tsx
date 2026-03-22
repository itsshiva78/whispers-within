'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

export default function CompleteProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.replace('/sign-in');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      toast({ title: 'Name is required', description: 'Please enter at least 2 characters', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/complete-profile', { name: name.trim(), gender });
      if (response.data.success) {
        toast({ title: 'Profile Complete! 🎉', description: 'Welcome to Whispers Within' });
        router.replace('/dashboard');
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save profile', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-background">
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full blur-[150px] animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 -left-40 w-[500px] h-[500px] rounded-full blur-[130px] animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="p-8 rounded-2xl space-y-7"
          style={{
            background: 'rgba(21, 18, 31, 0.7)', backdropFilter: 'blur(24px)',
            border: '1px solid rgba(139,92,246,0.1)',
            boxShadow: '0 24px 48px rgba(0,0,0,0.4), 0 0 80px rgba(139,92,246,0.06)',
          }}>

          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">One Last Step!</h1>
            <p className="text-sm text-muted-foreground">Tell us a bit about yourself, <span className="text-violet-400 font-medium">@{session?.user?.username}</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Your Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/50" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What should we call you?"
                  className="h-12 rounded-xl border-0 bg-background/80 text-foreground pl-10 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                  required
                  minLength={2}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="flex h-12 w-full rounded-xl border-0 bg-background/80 px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <option className="bg-background text-foreground" value="">Prefer not to say</option>
                <option className="bg-background text-foreground" value="Male">Male 👦</option>
                <option className="bg-background text-foreground" value="Female">Female 👧</option>
                <option className="bg-background text-foreground" value="Other">Other 🏳️‍🌈</option>
              </select>
            </div>

            <Button type="submit" disabled={isSubmitting}
              className="w-full h-12 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/20">
              {isSubmitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</>) : 'Complete Profile ✨'}
            </Button>
          </form>

          <button
            onClick={() => router.replace('/dashboard')}
            className="w-full text-center text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Skip for now →
          </button>
        </div>
      </div>
    </div>
  );
}
