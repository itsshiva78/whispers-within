import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Zap, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '100% Free Forever | Whispers Within - No Subscriptions or Paywalls',
  description: 'Whispers Within is 100% free forever. No subscriptions, no microtransactions, and no credit card required. Enjoy unlimited anonymous feedback and hint reveals.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: '100% Free Forever | Whispers Within',
    description: 'No subscriptions, no microtransactions. Completely free anonymous messaging and confessions for everyone.',
    url: 'https://www.whispers-within.in/pricing',
  },
};

export default function PricingPage() {
  const freeFeatures = [
    'Unlimited anonymous whispers received & sent',
    'Custom shareable profile link (whispers-within.in/u/you)',
    'Full sender hint & clue reveals at zero cost',
    'Post & react freely on the public Confession Wall',
    'Built-in Instagram & Snapchat Story Template Generator',
    'Real-time AI content moderation & abuse protection',
    'Manage, delete, and organize messages in your private dashboard',
    'Zero subscriptions, zero credit card requirements, zero recurring fees',
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-6">
            <Sparkles className="h-4 w-4" /> 100% Free Forever
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Honest conversations should <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">never be behind a paywall.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whispers Within is completely free. No recurring charges, no locked features, and no surprise debits. Every creator, student, and user gets full access to everything.
          </p>
        </div>
      </section>

      {/* Single Free Plan Card */}
      <section className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="p-8 md:p-12 rounded-3xl border border-violet-500/30 relative transition-all duration-300 shadow-2xl shadow-violet-500/10"
          style={{ background: 'rgba(21, 18, 31, 0.85)', backdropFilter: 'blur(20px)' }}>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-8 border-b border-white/10">
            <div>
              <span className="inline-block text-xs font-mono font-bold uppercase tracking-wider text-violet-400 mb-1">
                Community Edition
              </span>
              <h2 className="text-3xl font-extrabold text-foreground flex items-center gap-2">
                All Access Pass <Zap className="h-6 w-6 text-amber-400 fill-amber-400" />
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Full features unlocked for every single user.</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-5xl font-black text-foreground">₹0</span>
              <span className="text-muted-foreground font-medium ml-2">/ forever</span>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <p className="font-semibold text-xs uppercase tracking-wider text-violet-300 mb-4">Everything included at zero cost:</p>
            {freeFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-foreground/90 text-sm sm:text-base leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          <Link href="/sign-up" className="block w-full">
            <Button className="w-full py-7 text-lg rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-xl shadow-violet-500/25 transition-all hover:scale-[1.01]">
              Get Your Free Link Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust & Transparency Banner */}
      <section className="max-w-4xl mx-auto mt-16 px-6 text-center">
        <div className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-white/5 border border-white/5 text-muted-foreground text-sm">
          <Shield className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>Zero payment details required. No credit cards, no UPI autopay mandates, completely free forever.</span>
        </div>
      </section>
    </div>
  );
}
