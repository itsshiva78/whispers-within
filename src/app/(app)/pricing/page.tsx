import Link from 'next/link';
import { CheckCircle2, Zap, ArrowRight, Shield, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Pricing - Whispers Within Pro',
  description: 'Unlock hints, clues, and advanced analytics with Whispers Pro. Simple, transparent pricing with no recurring subscriptions.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-bold uppercase tracking-wider mb-6">
            <Crown className="h-4 w-4" /> Simple Pricing
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Uncover the secrets behind the whispers.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The core Whispers Within experience is always free. Upgrade to Pro when you are ready to see hints, device info, and more.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 relative z-10">
        
        {/* Free Tier */}
        <div className="p-8 md:p-10 rounded-3xl border border-white/5 transition-all duration-300"
          style={{ background: 'rgba(21, 18, 31, 0.4)' }}>
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <p className="text-muted-foreground">Everything you need to start receiving anonymous messages.</p>
          </div>
          
          <div className="mb-8">
            <span className="text-5xl font-extrabold">₹0</span>
            <span className="text-muted-foreground font-medium ml-2">/ forever</span>
          </div>

          <Link href="/sign-up" className="block w-full mb-10">
            <Button variant="outline" className="w-full py-6 text-lg rounded-xl border-white/10 hover:bg-white/5">
              Get Started Free
            </Button>
          </Link>

          <div className="space-y-4">
            <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">What&apos;s included:</p>
            {[
              'Unlimited anonymous messages',
              'Custom profile link',
              'Dashboard message management',
              'Post to the Confession Wall',
              'Instagram Story Generator',
              'AI Content Moderation',
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tier */}
        <div className="p-8 md:p-10 rounded-3xl border border-violet-500/30 relative transition-all duration-300 shadow-2xl shadow-violet-500/10"
          style={{ background: 'rgba(21, 18, 31, 0.8)' }}>
          
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            MOST POPULAR
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-violet-400 mb-2 flex items-center gap-2">
              Whispers Pro <Zap className="h-5 w-5" />
            </h3>
            <p className="text-muted-foreground">Unlock the full power of Whispers Within and reveal the hints.</p>
          </div>
          
          <div className="mb-8 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-foreground">₹499</span>
            <span className="text-muted-foreground font-medium">/ month</span>
          </div>

          <Link href="/sign-up" className="block w-full mb-10">
            <Button className="w-full py-6 text-lg rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-xl shadow-violet-500/20 transition-all hover:scale-[1.02]">
              Unlock Whispers Pro
            </Button>
          </Link>

          <div className="space-y-4">
            <p className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Everything in Basic, plus:</p>
            {[
              'Reveal hidden sender hints & clues',
              'See sender gender (if shared)',
              'View sender device type (iOS/Android/Web)',
              'Priority 24/7 Support',
              'Completely Ad-free experience',
              'Early access to new features',
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Trust Banner */}
      <section className="max-w-4xl mx-auto mt-20 px-6 text-center">
        <div className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-white/5 border border-white/5 text-muted-foreground">
          <Shield className="h-5 w-5 text-violet-400" />
          <span className="text-sm font-medium">Secure payments processed by Cashfree Payments. Cancel anytime.</span>
        </div>
      </section>
    </div>
  );
}
