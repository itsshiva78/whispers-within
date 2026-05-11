import type { Metadata } from 'next';
import { Shield, Heart, Eye, Code, Sparkles, Users, Lock, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Our Mission, Story & Values',
  description: 'Learn about Whispers Within — the anonymous feedback platform built to foster honest conversations. Discover our mission, values, safety measures, and the story behind the platform.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | Our Mission & Story',
    description: 'Discover the story behind Whispers Within and our commitment to honest, anonymous feedback.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Heart className="h-3.5 w-3.5" /> Our Story
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">
            About Whispers Within
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe the most meaningful words are often the ones left unspoken. Whispers Within exists to give those words a voice — safely, privately, and anonymously.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20" style={{ background: 'rgba(13, 11, 20, 0.8)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold mb-6">The Story Behind Whispers Within</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Whispers Within was born from a simple observation: people hold back their truest thoughts — compliments they are too shy to give, feelings they are scared to express, and feedback they think might be too honest. Social media has made it easier than ever to connect, yet somehow we&apos;re more filtered than ever before.
                </p>
                <p>
                  Founded in 2026 by Shiva, a developer and student passionate about building technology that connects people authentically, Whispers Within started as a small project to help college friends share anonymous feedback. The idea was straightforward — what if there was a safe, beautiful platform where people could say what they truly mean, without worrying about judgment or awkwardness?
                </p>
                <p>
                  What began as a campus experiment quickly resonated with thousands of users across India. Today, Whispers Within powers over 10,000 anonymous messages, a thriving Confession Wall community, and a growing movement toward more honest digital communication.
                </p>
              </div>
            </div>
            <div className="rounded-2xl p-8 text-center"
              style={{ background: 'rgba(21, 18, 31, 0.6)', border: '1px solid rgba(139,92,246,0.1)' }}>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/20">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Shiva</h3>
              <p className="text-violet-400 text-sm font-medium mb-4">Founder & Developer</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A developer and student passionate about building meaningful technology. Shiva built Whispers Within to bridge the gap between what people think and what they actually say — using modern web technology to create a platform that is both secure and delightful to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold mb-4">Our Mission & Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              At Whispers Within, everything we build is guided by four core principles that shape how our platform works and how we serve our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Lock,
                title: 'Privacy Without Compromise',
                desc: 'We believe anonymity is a fundamental right in digital communication. Our platform is architected from the ground up to ensure sender identities are never stored, tracked, or exposed. We do not use tracking cookies for senders, we do not log IP addresses, and we do not sell any data to third parties. Privacy is not a feature — it is our foundation.',
              },
              {
                icon: Heart,
                title: 'Honesty Fosters Connection',
                desc: 'When people can speak freely, remarkable things happen. Friendships deepen, crushes are confessed, genuine feedback is shared, and communities grow stronger. We believe that honesty — even when it is anonymous — creates more meaningful connections than performative social media posts ever could.',
              },
              {
                icon: Shield,
                title: 'Safety Enables Freedom',
                desc: 'True free expression requires safety. Our multi-layered AI moderation system automatically detects and blocks harassment, hate speech, threats, and other harmful content before it reaches users. We give every user full control over their experience — including the ability to toggle messages on/off and delete anything at any time.',
              },
              {
                icon: Users,
                title: 'Community-Driven Development',
                desc: 'Whispers Within is built transparently and shaped by the community that uses it. We actively listen to user feedback, prioritize features our community requests, and continuously improve the platform based on real usage patterns. Our code is open source, reflecting our commitment to transparency and trust.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Keep You Safe */}
      <section className="py-20" style={{ background: 'rgba(13, 11, 20, 0.8)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold mb-4">How We Keep You Safe</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Anonymity is a powerful tool, and with great power comes great responsibility. Here is a detailed look at the safety infrastructure behind Whispers Within.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                icon: Zap,
                title: 'Real-Time AI Content Moderation',
                desc: 'Every single message submitted through Whispers Within passes through our AI-powered moderation pipeline before it is delivered. This system is trained on a broad dataset of harmful content patterns and can detect harassment, hate speech, explicit threats, doxxing attempts, and other forms of abuse. Flagged messages are silently blocked — they never reach the recipient.',
              },
              {
                icon: Eye,
                title: 'User-Level Controls',
                desc: 'Every user has granular control over their experience. You can turn message acceptance on or off with a single toggle. You can delete individual messages or clear your entire inbox at once. You can share your link selectively, only on platforms where you want to receive messages. Your experience, your rules — always.',
              },
              {
                icon: Code,
                title: 'Secure, Modern Technology Stack',
                desc: 'Whispers Within is built with Next.js, secured with NextAuth.js for authentication, and connected to MongoDB with encrypted connections. All traffic is served over HTTPS with modern TLS encryption. We follow industry-standard security practices including input sanitization, CSRF protection, and secure session management to protect your data.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start p-6 rounded-2xl"
                style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Philosophy */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center mx-auto mb-6">
            <Code className="h-8 w-8 text-violet-400" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4">Built in the Open</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Whispers Within is an open-source project. We believe that transparency is the cornerstone of trust — especially for a platform that handles sensitive, anonymous communication. By making our code publicly available, we invite scrutiny, welcome contributions, and demonstrate that our privacy promises are backed by real, verifiable implementation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our technology stack includes Next.js for the frontend and server-side rendering, MongoDB for data persistence, NextAuth.js for secure authentication, and AI-powered content moderation. The entire platform is designed to be lightweight, fast, and accessible from any device with a modern web browser — no app downloads required.
          </p>
        </div>
      </section>
    </div>
  );
}
