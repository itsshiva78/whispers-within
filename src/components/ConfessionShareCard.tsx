'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, X } from 'lucide-react';
import { Button } from './ui/button';

type ConfessionShareCardProps = {
  content: string;
  category: string;
  likes: number;
  onClose: () => void;
};

const categoryStyles: Record<string, { emoji: string; gradient: string }> = {
  love: { emoji: '❤️', gradient: 'linear-gradient(145deg, #0d0b14 0%, #2d1029 40%, #1a0f2e 100%)' },
  funny: { emoji: '😂', gradient: 'linear-gradient(145deg, #0d0b14 0%, #2a2510 40%, #1a1a0f 100%)' },
  deep: { emoji: '🌊', gradient: 'linear-gradient(145deg, #0d0b14 0%, #0f1a3e 40%, #0d1530 100%)' },
  regret: { emoji: '😔', gradient: 'linear-gradient(145deg, #0d0b14 0%, #1a1a24 40%, #15151f 100%)' },
  secret: { emoji: '🤫', gradient: 'linear-gradient(145deg, #0d0b14 0%, #1a1035 40%, #15102a 100%)' },
  general: { emoji: '💬', gradient: 'linear-gradient(145deg, #0d0b14 0%, #10182a 40%, #0d1520 100%)' },
};

export function ConfessionShareCard({ content, category, likes, onClose }: ConfessionShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const style = categoryStyles[category] || categoryStyles.general;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3, quality: 1 });
      const link = document.createElement('a');
      link.download = `confession-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { console.error('Error:', err); }
    finally { setIsGenerating(false); }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3, quality: 1 });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'confession.png', { type: 'image/png' });
      if (navigator.share) {
        await navigator.share({ title: 'Whispers Within — Confession', text: 'An anonymous confession 🤫', files: [file] });
      } else { handleDownload(); }
    } catch (err) { console.error('Error:', err); }
    finally { setIsGenerating(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute -top-2 -right-2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>

        {/* THE SHAREABLE CARD */}
        <div ref={cardRef}
          style={{
            width: '400px', minHeight: '480px', display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', padding: '40px 32px',
            background: style.gradient, borderRadius: '24px',
            position: 'relative', overflow: 'hidden',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
          }}>
          {/* Glow */}
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px',
            background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '160px', height: '160px',
            background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />

          {/* Brand */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🔥</div>
              <span style={{ fontSize: '18px', fontWeight: 700, background: 'linear-gradient(90deg, #a78bfa, #818cf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>Confession Wall</span>
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(226,224,234,0.4)', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' as const }}>
              Anonymous • {category}
            </p>
          </div>

          {/* Confession */}
          <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
            <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: '16px', padding: '28px 24px',
              border: '1px solid rgba(139,92,246,0.15)', width: '100%' }}>
              <div style={{ fontSize: '36px', textAlign: 'center' as const, marginBottom: '16px' }}>{style.emoji}</div>
              <p style={{ fontSize: content.length > 150 ? '15px' : '18px', color: '#e2e0ea',
                lineHeight: 1.7, margin: 0, fontWeight: 500, textAlign: 'center' as const, wordBreak: 'break-word' as const }}>
                &ldquo;{content}&rdquo;
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: 'rgba(226,224,234,0.4)' }}>❤️ {likes} likes</span>
            </div>
            <div style={{ background: 'rgba(139,92,246,0.12)', borderRadius: '12px', padding: '12px 16px',
              border: '1px solid rgba(139,92,246,0.25)', textAlign: 'center' as const }}>
              <p style={{ fontSize: '13px', color: '#a78bfa', margin: 0, fontWeight: 600 }}>Share your secrets anonymously 🤫</p>
              <p style={{ fontSize: '15px', color: '#e2e0ea', margin: '4px 0 0', fontWeight: 700 }}>whispers-within.in/confessions</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full max-w-[400px]">
          <Button onClick={handleDownload} disabled={isGenerating}
            className="flex-1 bg-secondary/80 hover:bg-secondary text-foreground border border-border/30 h-12 text-base font-semibold rounded-xl" variant="outline">
            <Download className="mr-2 h-5 w-5" /> Download
          </Button>
          <Button onClick={handleShare} disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white h-12 text-base font-semibold rounded-xl shadow-lg shadow-violet-500/20">
            <Share2 className="mr-2 h-5 w-5" /> Share
          </Button>
        </div>
      </div>
    </div>
  );
}
