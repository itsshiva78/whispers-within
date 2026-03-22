'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, Sparkles, Eye, Lock, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[200px] animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', animationDelay: '3s' }} />

        {/* Hero Section */}
        <section className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center min-h-[90vh] px-6 lg:px-12 pt-24 pb-20">
          <div className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-1000 flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              The ultimate anonymous feedback platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              What are people afraid <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 animate-gradient">to tell you?</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed mx-auto">
              Get an anonymous link, share it on your Instagram or Snapchat story, and receive brutally honest, unfiltered secrets.
            </p>
            
            {/* Social Proof Numbers */}
            <div className="flex items-center gap-6 py-2 text-sm font-semibold text-muted-foreground/80">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                10,000+ Whispers Sent
              </div>
              <div className="h-4 w-px bg-border/50"></div>
              <div className="flex items-center gap-2">
                <span className="text-violet-400">★</span>
                5,000+ Active Users
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-lg px-8 py-7 rounded-xl shadow-xl shadow-violet-500/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30">
                  Get your anonymous link in 30s <ChevronRight className="ml-2 h-5 w-5" />
               </Button>
              </Link>
            </div>
          </div>

          {/* App Dashboard Mockup / Demo */}
          <div className="mt-20 w-full max-w-4xl relative animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
             {/* Mockup Glow */}
             <div className="absolute inset-x-10 -inset-y-5 bg-gradient-to-r from-violet-500/30 to-indigo-500/30 blur-[100px] -z-10 rounded-[3rem]"></div>
             
             {/* Fake Browser Window */}
             <div className="rounded-2xl border border-white/10 shadow-2xl overflow-hidden bg-black/60 relative z-10" style={{ backdropFilter: 'blur(20px)' }}>
                {/* Window Header */}
                <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <div className="mx-auto text-xs font-medium text-white/30 tracking-wider">whispers-within.in/dashboard</div>
                </div>
                {/* Window Content (Fake Message) */}
                <div className="p-8 md:p-12 flex flex-col items-center">
                   <div className="w-full max-w-lg p-6 rounded-xl border border-violet-500/20 bg-violet-500/5 relative">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase text-muted-foreground/50 tracking-wider">New Whisper</span>
                        <span className="text-xs text-muted-foreground/50">Just now</span>
                      </div>
                      <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
                        &quot;I&apos;ve always had a huge crush on you but I was too shy to say it in person! You looked amazing yesterday. 🫣&quot;
                      </p>
                      
                      <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                               <Shield className="w-4 h-4 text-violet-400" />
                            </div>
                            <span className="text-sm font-medium text-white/50">Sender Hidden</span>
                         </div>
                         <Button size="sm" variant="outline" className="border-violet-500/30 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20">
                            <Lock className="w-4 h-4 mr-2"/>
                            Reveal Identity
                         </Button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative z-10 py-24 w-full" style={{ background: 'rgba(13, 11, 20, 0.8)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Whispers Within?</h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">Built for honest conversations in a world of filtered feeds.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Total Anonymity', desc: 'Your identity is encrypted and never revealed unless you choose to.' },
                { icon: Eye, title: 'Real Insights', desc: 'Get brutally honest feedback from friends, coworkers, and crushes.' },
                { icon: Sparkles, title: 'AI Assistant', desc: 'Generate creative, funny, or deep messages effortlessly with our built-in AI.' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    background: 'rgba(21, 18, 31, 0.5)',
                    border: '1px solid rgba(139,92,246,0.08)',
                  }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-indigo-500/30 transition-all">
                    <item.icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-24 w-full">
          <div className="max-w-2xl mx-auto text-center px-6">
            <h2 className="text-4xl font-extrabold mb-6">Curious what they&apos;ll say?</h2>
            <p className="text-muted-foreground text-xl mb-10">Stop guessing. Get your link and find out the truth right now.</p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xl px-12 py-8 rounded-xl shadow-xl shadow-violet-500/20 transition-all hover:scale-105">
                Get your link – It&apos;s Free <ChevronRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
