'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Heart, Loader2, Send, Flame, MessageCircle } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
}

export default function ConfessionWall() {
  const [confessions, setConfessions] = useState<ConfessionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [newConfession, setNewConfession] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [filterCategory, setFilterCategory] = useState('all');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
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
      await axios.post('/api/confessions', { content: newConfession, category: selectedCategory });
      toast({ title: '🤫 Confession posted anonymously!' });
      setNewConfession('');
      fetchConfessions();
    } catch {
      toast({ title: 'Error', description: 'Failed to post confession', variant: 'destructive' });
    } finally { setIsPosting(false); }
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
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center mb-5 border border-violet-500/10">
            <Flame className="h-8 w-8 text-violet-400" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Confession Wall</h1>
          <p className="text-muted-foreground text-lg">Post your secrets. No judgement. No identity.</p>
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
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground/50">{newConfession.length}/500</span>
              <Button onClick={handlePost} disabled={isPosting || !newConfession.trim()}
                className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-violet-500/20 px-6">
                {isPosting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="h-4 w-4 mr-2" /> Confess</>}
              </Button>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button key={cat.value} onClick={() => { setFilterCategory(cat.value); setIsLoading(true); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                filterCategory === cat.value
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-secondary/30 text-muted-foreground border border-transparent hover:bg-secondary/50'
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
                  <span className="text-lg">{getCategoryEmoji(confession.category)}</span>
                  <span className="text-xs text-muted-foreground/40">{dayjs(confession.createdAt).fromNow()}</span>
                </div>
                <p className="text-foreground/90 leading-relaxed mb-4">{confession.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/50 text-muted-foreground capitalize">
                    {confession.category}
                  </span>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
