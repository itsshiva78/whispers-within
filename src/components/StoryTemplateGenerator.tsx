'use client';

import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Share2, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

type StoryTemplateGeneratorProps = {
  username: string;
  profileUrl: string;
  onClose: () => void;
};

const templates = [
  {
    name: 'Violet Dream',
    bg: 'linear-gradient(145deg, #0d0b14 0%, #1a1035 35%, #2d1b69 65%, #0d0b14 100%)',
    glow1: 'rgba(139,92,246,0.4)',
    glow2: 'rgba(99,102,241,0.3)',
    accent: '#a78bfa',
  },
  {
    name: 'Midnight Gold',
    bg: 'linear-gradient(145deg, #0d0b14 0%, #1a1510 35%, #2a1f0a 65%, #0d0b14 100%)',
    glow1: 'rgba(251,191,36,0.35)',
    glow2: 'rgba(245,158,11,0.25)',
    accent: '#fbbf24',
  },
  {
    name: 'Ocean Depths',
    bg: 'linear-gradient(145deg, #0d0b14 0%, #0f1a3e 35%, #0d2847 65%, #0d0b14 100%)',
    glow1: 'rgba(59,130,246,0.35)',
    glow2: 'rgba(14,165,233,0.25)',
    accent: '#60a5fa',
  },
];

export function StoryTemplateGenerator({ username, profileUrl, onClose }: StoryTemplateGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const t = templates[selectedTemplate];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3, quality: 1 });
      const link = document.createElement('a');
      link.download = `whispers-story-${Date.now()}.png`;
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
      const file = new File([blob], 'whispers-story.png', { type: 'image/png' });
      if (navigator.share) {
        await navigator.share({ title: 'Send me anonymous messages!', text: `Send me anonymous whispers 👀\n${profileUrl}`, files: [file] });
      } else { handleDownload(); }
    } catch (err) { console.error('Error:', err); }
    finally { setIsGenerating(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="min-h-full flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md flex flex-col items-center gap-5 my-8 animate-in fade-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute -top-5 -right-2 md:-right-5 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Template Selector */}
        <div className="flex gap-2">
          {templates.map((tmpl, i) => (
            <button key={i} onClick={() => setSelectedTemplate(i)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedTemplate === i
                  ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  : 'bg-white/5 text-white/50 border border-transparent hover:bg-white/10'
              }`}>
              {tmpl.name}
            </button>
          ))}
        </div>

        {/* THE STORY CARD (9:16 for Instagram Stories) */}
        <div ref={cardRef}
          style={{
            width: '360px', height: '640px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', padding: '40px 28px',
            background: t.bg, borderRadius: '20px',
            position: 'relative', overflow: 'hidden',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
          }}>
          {/* Glow effects */}
          <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
            width: '300px', height: '300px', background: `radial-gradient(circle, ${t.glow1} 0%, transparent 70%)`, borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-60px', right: '-40px',
            width: '200px', height: '200px', background: `radial-gradient(circle, ${t.glow2} 0%, transparent 70%)`, borderRadius: '50%' }} />

          {/* Brand */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' as const, marginBottom: '40px' }}>
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', margin: '0 auto 16px' }}>🤫</div>
            <p style={{ fontSize: '14px', color: t.accent, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: 0 }}>
              Whispers Within
            </p>
          </div>

          {/* Main CTA */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' as const, marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
              Send me an<br />anonymous<br />message
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', margin: 0, fontWeight: 500 }}>
              be honest, i can handle it 👀
            </p>
          </div>

          {/* Link Box */}
          <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
            <div style={{ background: 'rgba(139,92,246,0.12)', borderRadius: '16px', padding: '20px',
              border: '1px solid rgba(139,92,246,0.25)', textAlign: 'center' as const }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '0 0 6px', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '1px' }}>
                Tap ☝️ or visit
              </p>
              <p style={{ fontSize: '18px', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                whispers-within.in/u/{username}
              </p>
            </div>
          </div>

          {/* Swipe Up hint */}
          <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' as const }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0, fontWeight: 500 }}>↑ Link in bio ↑</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full max-w-[360px]">
          <Button onClick={handleDownload} disabled={isGenerating}
            className="flex-1 bg-secondary/80 hover:bg-secondary text-foreground border border-border/30 h-12 text-base font-semibold rounded-xl" variant="outline">
            <Download className="mr-2 h-5 w-5" /> Save
          </Button>
          <Button onClick={handleShare} disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white h-12 text-base font-semibold rounded-xl shadow-lg shadow-violet-500/20">
            <Share2 className="mr-2 h-5 w-5" /> Share
          </Button>
        </div>
      </div>
      </div>
    </div>
  );
}
