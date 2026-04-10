'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Heart, Loader2, Send, Flame, MessageCircle, Share2, Eye, Smartphone, Clock, Monitor, Lock, Sparkles } from 'lucide-react';
import { ConfessionShareCard } from '@/components/ConfessionShareCard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/react';
import { load } from '@cashfreepayments/cashfree-js';
import { Input } from '@/components/ui/input';

dayjs.extend(relativeTime);

const categories = [
  { value: 'all', label: '🔥 All', color: 'violet' },
  { value: 'love', label: '❤️ Love', color: 'pink' },
  { value: 'funny', label: '😂 Funny', color: 'yellow' },
  { value: 'deep', label: '🌊 Deep', color: 'blue' },
  { value: 'regret', label: '😔 Regret', color: 'gray' },
  { value: 'secret', label: '🤫 Secret', color: 'purple' },
  { value: 'general', label: '💬 General', color: 'green' },
];

interface ConfessionType {
  _id: string;
  content: string;
  category: string;
  likes: number;
  createdAt: string;
  senderDevice?: string;
  senderTimePeriod?: string;
  senderPlatform?: string;
  senderName?: string;
  senderGender?: string;
  isNameRevealed?: boolean;
}

export default function ConfessionWall() {
  const [confessions, setConfessions] = useState<ConfessionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [newConfession, setNewConfession] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderGender, setSenderGender] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [filterCategory, setFilterCategory] = useState('all');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [shareConfession, setShareConfession] = useState<ConfessionType | null>(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState<string | null>(null);
  const [showHintsId, setShowHintsId] = useState<string | null>(null);
  const { data: session } = useSession();
  const user = session?.user as any;
  const { toast } = useToast();

  const fetchConfessions = useCallback(async () => {
    try {
      const res = await axios.get(`/api/confessions?category=${filterCategory}&limit=50`);
      setConfessions(res.data.confessions);
    } catch { /* ignore */ }
    finally { setIsLoading(false); }
  }, [filterCategory]);

  useEffect(() => { fetchConfessions(); }, [fetchConfessions]);

  const handlePost = async () => {
    if (!newConfession.trim()) return;
    setIsPosting(true);
    try {
      await axios.post('/api/confessions', { 
        content: newConfession, 
        category: selectedCategory,
        senderName: senderName || 'Anonymous',
        senderGender: senderGender || ''
      });
      toast({ title: '🤫 Confession posted anonymously!' });
      setNewConfession('');
      setSenderName('');
      setSenderGender('');
      fetchConfessions();
    } catch {
      toast({ title: 'Error', description: 'Failed to post confession', variant: 'destructive' });
    } finally { setIsPosting(false); }
  };

  const handleRevealIdentity = async (confessionId: string) => {
    if (!session) {
      toast({ title: 'Please Sign In', description: 'You need to be logged in to reveal identities.', variant: 'destructive' });
      return;
    }

    setIsPaymentLoading(confessionId);
    try {
      // 1. Create order
      const { data } = await axios.post('/api/cashfree/create-order-confession', { confessionId });
      if (!data.success) {
        toast({ title: 'Failed to create order', description: data.message, variant: 'destructive' });
        setIsPaymentLoading(null);
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
          setIsPaymentLoading(null);
        }
        if (result.paymentDetails) {
          toast({ title: 'Payment Successful', description: 'Verifying...', variant: 'default' });
          axios.post('/api/cashfree/verify-confession', { orderId: data.order_id }).then(res => {
            if (res.data.success) {
              toast({ title: 'Unlocked!', description: 'You can now see who confessed.' });
              // Update local state to show unmasked info
              setConfessions(prev => prev.map(c => 
                c._id === confessionId ? { ...c, senderName: res.data.senderName, senderGender: res.data.senderGender, isNameRevealed: true } : c
              ));
            } else {
              toast({ title: 'Verification Failed', variant: 'destructive', description: res.data.message });
            }
          }).finally(() => {
            setIsPaymentLoading(null);
          });
        }
      });
    } catch (error: any) {
      toast({ title: 'Error', description: error.response?.data.message || 'Payment process failed', variant: 'destructive' });
      setIsPaymentLoading(null);
    }
  };

  const handleLike = async (id: string) => {
    if (likedIds.has(id)) return;
    try {
      const res = await axios.post(`/api/confessions/${id}/like`);
      setConfessions(prev => prev.map(c => c._id === id ? { ...c, likes: res.data.likes } : c));
      setLikedIds(prev => new Set(prev).add(id));
    } catch { /* ignore */ }
  };

  const getCategoryEmoji = (cat: string) => {
    const found = categories.find(c => c.value === cat);
    return found ? found.label.split(' ')[0] : '💬';
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center mb-5 border border-violet-500/10">
            <Flame className="h-7 w-7 md:h-8 md:h-8 text-violet-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Confession Wall</h1>
          <p className="text-muted-foreground text-sm md:text-lg">Post your secrets. No judgement. No identity.</p>
        </div>

        {/* Post New Confession */}
        <div className="rounded-2xl p-6 mb-8"
          style={{
            background: 'rgba(21, 18, 31, 0.6)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139,92,246,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
          <Textarea
            value={newConfession}
            onChange={(e) => setNewConfession(e.target.value)}
            placeholder="Write your confession anonymously..."
            maxLength={500}
            className="resize-none min-h-[100px] rounded-xl border-0 bg-background/80 text-foreground text-sm focus-visible:ring-1 focus-visible:ring-primary mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold ml-1">Give a Clue (Hidden 🤫)</label>
              <Input 
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Revealed only if someone pays..."
                className="h-11 rounded-xl border-0 bg-background/80 text-sm focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-extrabold ml-1">Gender (Hidden 🤫)</label>
              <select
                value={senderGender}
                onChange={(e) => setSenderGender(e.target.value)}
                className="flex h-11 w-full items-center justify-between rounded-xl border-0 bg-background/80 px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-primary shadow-sm"
              >
                <option value="">Secret 🤫</option>
                <option value="Male">Male 👦</option>
                <option value="Female">Female 👧</option>
                <option value="Other">Other 🏳️‍🌈</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.filter(c => c.value !== 'all').map(cat => (
                <button key={cat.value} onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      : 'bg-secondary/50 text-muted-foreground border border-transparent hover:bg-secondary'
                  }`}>
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-tighter">{newConfession.length}/500</span>
              <Button onClick={handlePost} disabled={isPosting || !newConfession.trim()}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/20 px-8 py-5 h-auto transition-transform hover:scale-[1.02] active:scale-95">
                {isPosting ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-5 w-5 mr-2" /> Confess</>}
              </Button>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="sticky top-[64px] z-20 py-4 -mx-4 px-4 bg-background/80 backdrop-blur-md border-b border-border/10 mb-6 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button key={cat.value} onClick={() => { setFilterCategory(cat.value); setIsLoading(true); }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                filterCategory === cat.value
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-secondary/40 text-muted-foreground border border-transparent hover:bg-secondary/60 active:scale-95'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Confessions Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
          </div>
        ) : confessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl"
            style={{ background: 'rgba(21, 18, 31, 0.4)', border: '1px dashed rgba(139,92,246,0.15)' }}>
            <MessageCircle className="h-12 w-12 text-violet-400/30 mb-4" />
            <p className="text-muted-foreground font-medium">No confessions yet</p>
            <p className="text-sm text-muted-foreground/50 mt-1">Be the first to confess!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {confessions.map((confession) => (
              <div key={confession._id} className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 group"
                style={{
                  background: 'rgba(21, 18, 31, 0.6)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(139,92,246,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCategoryEmoji(confession.category)}</span>
                    <button 
                      onClick={() => setShowHintsId(showHintsId === confession._id ? null : confession._id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all shadow-lg border ${
                        showHintsId === confession._id 
                          ? 'bg-amber-500/30 text-amber-300 border-amber-500/40 scale-95' 
                          : 'bg-amber-500/15 text-amber-400 border-amber-500/20 hover:bg-amber-500/25 hover:border-amber-500/30 animate-in fade-in duration-500'
                      }`}
                      title="Who is this?"
                    >
                      <div className="relative">
                        <Eye className="h-4 w-4" />
                        {!showHintsId && !confession.isNameRevealed && !user?.isPro && (
                          <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">Get a Hint</span>
                    </button>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-tighter">{dayjs(confession.createdAt).fromNow()}</span>
                </div>
                <p className="text-foreground/90 text-sm md:text-base leading-relaxed mb-5 font-medium">{confession.content}</p>

                {/* Hints Section */}
                {showHintsId === confession._id && (
                  <div className="mb-4 p-3 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300"
                    style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.1)' }}>
                    
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Eye className="h-3 w-3" /> Detailed Hints
                      </p>
                      {(confession.isNameRevealed || user?.isPro) && (
                        <span className="text-[9px] uppercase tracking-wider font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                          Unlocked
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { icon: Smartphone, label: 'Device', value: confession.senderDevice || 'Unknown' },
                        { icon: Clock, label: 'Sent At', value: confession.senderTimePeriod || 'Unknown' },
                        { icon: Monitor, label: 'Platform', value: confession.senderPlatform || 'Unknown' },
                      ].map((hint, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-2 rounded-xl border border-amber-500/5 shadow-inner" style={{ background: 'rgba(251,191,36,0.04)' }}>
                          <hint.icon className="h-3.5 w-3.5 text-amber-400/50 mb-1" />
                          <p className="text-[7px] text-amber-400/30 uppercase tracking-widest font-black text-center">{hint.label}</p>
                          <p className="text-[9px] font-black text-amber-300 mt-0.5 text-center leading-tight truncate w-full">{hint.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Reveal Action */}
                    <div className="pt-2 border-t border-amber-500/10">
                      {(confession.isNameRevealed || user?.isPro) ? (
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                            <Sparkles className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-amber-400/60 font-medium">Confessed By</p>
                            <p className="text-xs font-bold text-amber-300 flex items-center gap-2">
                              {confession.senderName || 'Anonymous'} 
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">{confession.senderGender || 'Secret'}</span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleRevealIdentity(confession._id)} 
                          disabled={isPaymentLoading === confession._id}
                          size="lg"
                          className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-amber-950 font-black shadow-lg shadow-amber-500/25 transition-transform active:scale-[0.98]"
                        >
                          {isPaymentLoading === confession._id ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Unlocking...</>
                          ) : (
                            <><Lock className="mr-2 h-4 w-4" /> Unlock Whispers Pro (₹499)</>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/50 text-muted-foreground capitalize">
                    {confession.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShareConfession(confession)}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground/50 hover:text-violet-400 transition-all">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleLike(confession._id)}
                      className={`flex items-center gap-1.5 text-sm transition-all ${
                        likedIds.has(confession._id)
                          ? 'text-pink-400'
                          : 'text-muted-foreground/50 hover:text-pink-400'
                      }`}>
                      <Heart className={`h-4 w-4 ${likedIds.has(confession._id) ? 'fill-pink-400' : ''}`} />
                      {confession.likes}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {shareConfession && (
          <ConfessionShareCard
            content={shareConfession.content}
            category={shareConfession.category}
            likes={shareConfession.likes}
            onClose={() => setShareConfession(null)}
          />
        )}
      </div>
    </div>
  );
}
