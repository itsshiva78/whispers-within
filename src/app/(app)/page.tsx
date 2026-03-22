'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, Sparkles, Eye, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

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
        <section className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[85vh] px-6 lg:px-12 pt-20 pb-32">
          <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Anonymous messaging reimagined
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Speak freely.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 animate-gradient">Stay hidden.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-lg leading-relaxed">
              Send and receive anonymous messages. Discover what people truly think — without revealing who you are.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl shadow-violet-500/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30">
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/confessions">
                <Button variant="outline" size="lg" className="bg-secondary/50 hover:bg-secondary text-foreground border-border/50 font-semibold text-lg px-8 py-6 rounded-xl transition-all hover:scale-105">
                  🔥 Confession Wall
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Messages */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24 -mt-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-violet-500 to-indigo-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trending Whispers</h2>
          </div>

          <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full">
            <CarouselContent className="-ml-4">
              {messages.map((message, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="h-full p-1">
                    <Card className="border-0 text-card-foreground transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full min-h-[180px] flex flex-col justify-between group rounded-xl"
                      style={{
                        background: 'rgba(21, 18, 31, 0.6)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(139,92,246,0.08)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                      }}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex items-center justify-between text-foreground/90">
                          {message.title}
                          <MessageCircle className="h-4 w-4 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors line-clamp-3 leading-relaxed">
                          {message.content}
                        </p>
                        <p className="mt-4 text-xs font-medium text-muted-foreground/50 pt-3 border-t border-border/20 uppercase tracking-wider">
                          {message.received}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
                { icon: Shield, title: 'Total Anonymity', desc: 'Your identity is encrypted and never revealed. Speak your truth safely.' },
                { icon: Eye, title: 'Real Insights', desc: 'Get honest feedback from friends, coworkers, and the community.' },
                { icon: Sparkles, title: 'AI Moderation', desc: 'Our advanced AI ensures messages are free while abuse is checked.' },
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to discover the truth?</h2>
            <p className="text-muted-foreground text-lg mb-10">Create your profile and start receiving anonymous whispers today.</p>
            <Link href="/sign-up">
              <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-lg px-10 py-6 rounded-xl shadow-xl shadow-violet-500/20 transition-all hover:scale-105">
                Get Started Free <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
