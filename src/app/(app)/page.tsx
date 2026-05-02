import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ChevronRight, Shield, Sparkles, Eye, Lock, MessageCircle,
  Users, Zap, Instagram, HelpCircle, CheckCircle2, ArrowRight,
  Heart, Globe, BookOpen, Star, UserCheck, BellRing
} from 'lucide-react';
import HomeFaqSection from '@/components/HomeFaqSection';

export default function Home() {

  return (
    <>
      <main className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Is Whispers Within really anonymous?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolutely. When someone sends you a whisper, we do not store any identifying information about the sender. There is no login required for the sender, no IP tracking, and no cookies placed on their device.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I get my anonymous link?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Simply sign up with your email or social account, and we instantly generate a unique profile link. Share this link anywhere, and anyone who visits it can send you an anonymous message.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the Confession Wall?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The Confession Wall is our public community space where anyone can post anonymous confessions, secrets, or thoughts.',
                  },
                },
              ],
            }),
          }}
        />
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
              Get an anonymous link, share it on your Instagram or Snapchat story, and receive brutally honest, unfiltered secrets. Discover what your friends, classmates, and crushes really think about you — all in a safe, private space.
            </p>
            
            {/* Social Proof Numbers */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-2 text-xs sm:text-sm font-semibold text-muted-foreground/80">
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
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7 rounded-xl shadow-xl shadow-violet-500/20 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/30">
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
                <div className="p-5 sm:p-8 md:p-12 flex flex-col items-center">
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
                            Unlock Whispers Pro (₹499)
                         </Button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* HOW IT WORKS SECTION */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative z-10 py-24 w-full" style={{ background: 'rgba(13, 11, 20, 0.8)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Zap className="h-3.5 w-3.5" /> Simple Setup
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-5">How Whispers Within Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Getting started takes less than 30 seconds. No complicated setup, no app downloads required. Here is how you start receiving anonymous messages today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: '01',
                  icon: UserCheck,
                  title: 'Create Your Account',
                  desc: 'Sign up instantly with your email address. We will generate a unique anonymous profile link just for you — something like whispers-within.in/u/yourname. This link is your personal gateway to receiving honest, anonymous feedback from anyone.',
                },
                {
                  step: '02',
                  icon: Instagram,
                  title: 'Share Your Link Everywhere',
                  desc: 'Post your unique link on your Instagram story, Snapchat, WhatsApp status, Twitter bio, or anywhere your friends can see it. The more people who see your link, the more fascinating whispers you will receive. Our built-in Story Template Generator even creates eye-catching Instagram story graphics for you.',
                },
                {
                  step: '03',
                  icon: MessageCircle,
                  title: 'Receive Anonymous Whispers',
                  desc: 'Sit back and watch the messages roll in. Every whisper arrives completely anonymously — you will see what people truly think about you without filters. Manage all your whispers from a beautiful, intuitive dashboard where you can read, save, and share the best ones.',
                },
              ].map((item) => (
                <div key={item.step} className="relative flex flex-col items-center text-center space-y-5 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                  <span className="absolute -top-4 left-6 text-6xl font-black text-violet-500/10 select-none">{item.step}</span>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-indigo-500/30 transition-all shadow-lg">
                    <item.icon className="h-7 w-7 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* FEATURES / WHY US SECTION */}
        {/* ═══════════════════════════════════════════════════ */}
        <section id="features" className="relative z-10 py-24 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Star className="h-3.5 w-3.5" /> Why Choose Us
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-5">Built for Honest Conversations</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                In a world of curated feeds and filtered photos, genuine feedback is rare. Whispers Within creates a safe space where people can be completely honest with you — and you can finally hear what they have been holding back.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Total Anonymity Guaranteed',
                  desc: 'Your senders identity is never stored, tracked, or logged. We use zero-knowledge principles — even we cannot identify who sent a particular message. No IP addresses, no cookies, no tracking pixels.',
                },
                {
                  icon: Eye,
                  title: 'Real, Unfiltered Insights',
                  desc: 'Discover what your friends, classmates, colleagues, and crushes genuinely think about you. When people can speak without consequences, they share things they would never say face to face — compliments, confessions, and honest feedback.',
                },
                {
                  icon: Sparkles,
                  title: 'AI-Powered Smart Features',
                  desc: 'Our built-in AI assistant helps senders craft creative, funny, or meaningful messages. It also powers our content moderation system, automatically filtering out harmful or abusive messages before they reach your inbox.',
                },
                {
                  icon: BellRing,
                  title: 'Instant Notifications',
                  desc: 'Never miss a whisper. Get notified the moment someone sends you a message through your unique link. Check your dashboard anytime and see every new whisper organized chronologically in a clean, modern interface.',
                },
                {
                  icon: Heart,
                  title: 'Community Confession Wall',
                  desc: 'Beyond private whispers, our public Confession Wall lets anyone share secrets, funny stories, or heartfelt thoughts anonymously. Like, share, and interact with confessions from the entire community — with categories from Love to Deep to Funny.',
                },
                {
                  icon: Globe,
                  title: 'Works Everywhere',
                  desc: 'Whispers Within is a fully responsive web platform — no app download needed. It works perfectly on iOS, Android, desktop, or any device with a browser. Share your link anywhere and let the whispers flow in from any corner of the internet.',
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center group-hover:from-violet-500/30 group-hover:to-indigo-500/30 transition-all">
                    <item.icon className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* USE CASES SECTION */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative z-10 py-24 w-full" style={{ background: 'rgba(13, 11, 20, 0.8)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Users className="h-3.5 w-3.5" /> Popular Use Cases
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-5">How People Use Whispers Within</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                From Instagram Q&A games to workplace feedback, thousands of people use Whispers Within every day to spark honest conversations and meaningful connections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  emoji: '📸',
                  title: 'Instagram Story Q&A',
                  desc: 'Share your link on Instagram stories and let followers send you anonymous compliments, questions, or confessions. Our Story Template Generator creates beautiful share graphics automatically.',
                },
                {
                  emoji: '🎓',
                  title: 'Campus & College Feedback',
                  desc: 'Students use Whispers Within to get honest opinions from classmates — who has a crush on them, what people really think, and unfiltered campus confessions.',
                },
                {
                  emoji: '💼',
                  title: 'Workplace Honesty',
                  desc: 'Teams use anonymous messaging to share honest feedback about projects, management, and workplace culture without fear of professional repercussions.',
                },
                {
                  emoji: '💕',
                  title: 'Secret Crushes & Confessions',
                  desc: 'The most popular use case — people use Whispers Within to tell someone how they truly feel, confess a secret crush, or share something they have been holding in for years.',
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col space-y-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                  <span className="text-4xl">{item.emoji}</span>
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* TESTIMONIALS SECTION */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative z-10 py-24 w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Heart className="h-3.5 w-3.5" /> User Stories
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-5">Loved by Thousands</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Real stories from real people who discovered the power of anonymous feedback. Here is what our community has to say about their experience with Whispers Within.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: 'I shared my link on my Instagram story and within an hour I had 30+ messages. Some were hilarious, some were incredibly sweet. I never knew so many people had nice things to say about me!',
                  name: 'Ananya, 19',
                  role: 'College Student',
                },
                {
                  quote: 'Someone finally told me they had a crush on me for two years through Whispers Within. We have been talking every day since. This platform literally changed my love life.',
                  name: 'Rohit, 21',
                  role: 'Engineering Student',
                },
                {
                  quote: 'I use the Confession Wall to share things I cannot tell anyone in person. It is therapeutic to get it off my chest, and seeing others relate to my confessions makes me feel less alone.',
                  name: 'Priya, 22',
                  role: 'Design Student',
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col justify-between p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-foreground/90 leading-relaxed italic mb-6">&quot;{item.quote}&quot;</p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                      {item.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* SAFETY & TRUST SECTION */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative z-10 py-24 w-full" style={{ background: 'rgba(13, 11, 20, 0.8)' }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Shield className="h-3.5 w-3.5" /> Safety First
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-5">Your Safety Is Our Priority</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                Anonymity is powerful, but it requires responsibility. Here is how we ensure Whispers Within remains a safe, positive space for every user in our community.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: 'AI-Powered Content Moderation',
                  desc: 'Every message passes through our AI moderation layer before delivery. This system is trained to detect and filter out harassment, hate speech, explicit threats, and other harmful content in real-time. Messages flagged as abusive are automatically blocked — they never reach your inbox.',
                },
                {
                  icon: Lock,
                  title: 'End-to-End Encrypted Infrastructure',
                  desc: 'All data is transmitted over HTTPS with TLS 1.3 encryption. Our database connections are encrypted, and authentication is handled through industry-standard NextAuth.js with secure session management. We follow OWASP security guidelines to protect your account and personal information.',
                },
                {
                  icon: UserCheck,
                  title: 'User Controls & Message Management',
                  desc: 'You have full control over your experience. Toggle message acceptance on or off at any time. Delete individual messages or clear your entire inbox with one click. You decide who can reach you and what stays in your dashboard — your whispers, your rules.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start p-6 rounded-2xl transition-all duration-300 hover:translate-x-1"
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

        {/* ═══════════════════════════════════════════════════ */}
        {/* FAQ SECTION */}
        {/* ═══════════════════════════════════════════════════ */}
        <HomeFaqSection />

        {/* ═══════════════════════════════════════════════════ */}
        {/* CTA SECTION */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="relative z-10 py-24 w-full" style={{ background: 'rgba(13, 11, 20, 0.8)' }}>
          <div className="max-w-2xl mx-auto text-center px-6">
            <h2 className="text-4xl font-extrabold mb-6">Curious what they&apos;ll say?</h2>
            <p className="text-muted-foreground text-xl mb-10 leading-relaxed">Stop guessing. Create your free account, share your link, and discover the unfiltered truth in under a minute.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-6 sm:py-8 rounded-xl shadow-xl shadow-violet-500/20 transition-all hover:scale-105">
                  Get your link – It&apos;s Free <ChevronRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-violet-400 text-sm font-medium flex items-center gap-1.5 transition-colors">
                <BookOpen className="h-4 w-4" /> Read our blog
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
