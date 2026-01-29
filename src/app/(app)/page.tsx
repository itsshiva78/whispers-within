'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, ChevronRight, Play, Info } from 'lucide-react';
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
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Dynamic Background with Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

        {/* Navbar Placeholder (will be transparent) */}
        {/* <nav className="relative z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
             <div className="text-primary font-bold text-2xl tracking-tighter">MYSTERY</div>
        </nav> */}

        {/* Hero Section */}
        <section className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[80vh] px-6 lg:px-12 pt-20 pb-32 md:pb-48">
          <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] drop-shadow-lg">
              Unlock the <span className="text-primary">Unknown</span>.
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 font-medium drop-shadow-md">
              Send and receive anonymous messages. Discover what people truly think, without the mask.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/sign-up">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-sm shadow-xl transition-transform transform hover:scale-105">
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="bg-gray-500/30 hover:bg-gray-500/50 text-white border-none font-semibold text-lg px-8 py-6 rounded-sm backdrop-blur-sm transition-transform transform hover:scale-105">
                  <Info className="mr-2 h-5 w-5" /> Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trending Now / Dashboard Preview Section */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24 -mt-16 md:-mt-24 space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white drop-shadow-sm pl-2 border-l-4 border-primary">
            Trending Mysteries
          </h2>

          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {messages.map((message, index) => (
                <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full">
                  <div className="h-full p-1">
                    <Card className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-primary/50 text-card-foreground shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20 cursor-pointer h-full min-h-[180px] flex flex-col justify-between group rounded-xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-bold flex items-center justify-between text-white/90">
                          {message.title}
                          <Mail className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors line-clamp-3 leading-relaxed">
                          {message.content}
                        </p>
                        <p className="mt-4 text-xs font-medium text-gray-500 pt-3 border-t border-white/5 uppercase tracking-wider">
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

        {/* Features / "More to Explore" */}
        <section className="relative z-10 bg-black/50 py-20 border-t border-gray-900 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl font-bold mb-12 text-center">Why join the mystery?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Total Anonymity", desc: "Your identity is encrypted and never revealed. Speak your truth safely." },
                { title: "Real Insights", desc: "Get honest feedback from friends, coworkers, and the community." },
                { title: "AI Moderation", desc: "Our advanced AI ensures that while messages are free, abuse is checked." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>
    </>
  );
}
