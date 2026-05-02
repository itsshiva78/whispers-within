'use client';

import { useState } from 'react';
import { ChevronRight, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    q: 'Is Whispers Within really anonymous?',
    a: 'Absolutely. When someone sends you a whisper, we do not store any identifying information about the sender. There is no login required for the sender, no IP tracking, and no cookies placed on their device. The only metadata we collect is basic device type and time of message for the optional "hint" feature — and even that is never linked to any real identity.',
  },
  {
    q: 'How do I get my anonymous link?',
    a: 'Simply sign up with your email or social account, and we instantly generate a unique profile link like whispers-within.in/u/yourname. Share this link anywhere — Instagram stories, Snapchat, WhatsApp status, Twitter bio — and anyone who visits it can send you an anonymous message without needing to create an account.',
  },
  {
    q: 'What is the Confession Wall?',
    a: 'The Confession Wall is our public community space where anyone can post anonymous confessions, secrets, or thoughts. Posts are categorized (Love, Funny, Deep, Regret, Secret, General) and can be liked and shared. You can optionally leave a hidden "hint" about your identity that others can pay to reveal — it is a fun, gamified way to add intrigue.',
  },
  {
    q: 'How does the "Reveal Hint" feature work?',
    a: 'When posting a confession, senders can optionally leave a hidden clue (like a nickname or emoji) and their gender. Readers can upgrade to a Whispers Pro subscription (₹499) to unlock these hints across the entire platform. This creates a fun guessing-game element. Importantly, no real identity is ever revealed — only the clue the sender chose to leave.',
  },
  {
    q: 'Is my data safe?',
    a: 'We use industry-standard security practices including HTTPS encryption across the entire platform, secure authentication via NextAuth.js, and MongoDB with encrypted connections. We never sell your data to third parties. Our AI moderation system scans messages for harmful content to keep the community safe, but human staff never read your private messages.',
  },
  {
    q: 'Can I block or report abusive messages?',
    a: 'Yes. Every message you receive has a delete option, and you can toggle message acceptance on or off at any time from your dashboard. We also have AI-powered content moderation that automatically filters out overtly abusive, threatening, or harmful messages before they reach you. If something slips through, you can report it via our contact page.',
  },
];

export default function HomeFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-24 w-full">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="h-3.5 w-3.5" /> FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-5">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Got questions? We have got answers. Here are the most common things people ask about Whispers Within.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden transition-all duration-300"
              style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronRight className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-90' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-muted-foreground leading-relaxed text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/faq" className="inline-flex items-center gap-2 text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors">
            View all frequently asked questions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
