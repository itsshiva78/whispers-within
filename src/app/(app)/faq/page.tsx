'use client';

import { useState } from 'react';
import { ChevronRight, HelpCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const faqCategories = [
  {
    name: 'Getting Started',
    emoji: '🚀',
    faqs: [
      {
        q: 'What is Whispers Within?',
        a: 'Whispers Within is an anonymous messaging and community platform that lets you receive honest, unfiltered feedback from friends, classmates, colleagues, and anyone else. You create a unique profile link, share it on social media or messaging apps, and anyone who visits your link can send you a message without revealing their identity. The platform also features a public Confession Wall where the community can share anonymous thoughts, secrets, and confessions in a safe, moderated environment.',
      },
      {
        q: 'How do I create an account?',
        a: 'Creating an account is simple and takes less than 30 seconds. Visit our sign-up page, enter your email address and choose a unique username. We will send you a verification code to confirm your email. Once verified, your account is active and your unique anonymous profile link is generated immediately. You can optionally complete your profile by adding your display name and gender — these are only used for your own dashboard, never shared with message senders.',
      },
      {
        q: 'Is Whispers Within free to use?',
        a: 'Yes, the core features of Whispers Within are completely free. This includes creating an account, receiving anonymous messages, managing your dashboard, and posting on the Confession Wall. The only paid feature is the optional "Whispers Pro" subscription, where you can pay to unlock hints and clues on the Confession Wall and your personal dashboard.',
      },
      {
        q: 'What devices does Whispers Within support?',
        a: 'Whispers Within is a fully responsive web application — it works on any device with a modern web browser. There is no app to download. It works perfectly on iPhones, Android phones, iPads, tablets, laptops, and desktop computers. Whether someone sends you a message from their phone or you check your dashboard on a laptop, the experience is optimized and beautiful on every screen size.',
      },
    ],
  },
  {
    name: 'Privacy & Anonymity',
    emoji: '🔒',
    faqs: [
      {
        q: 'Is the messaging really anonymous?',
        a: 'Yes, anonymity is the core foundation of Whispers Within. When someone sends you a message through your profile link, we do not require them to log in, we do not record their IP address, we do not set tracking cookies on their device, and we do not use any fingerprinting or identification technology. There is absolutely no way — not even for us as the platform operators — to identify who sent a specific message. The anonymity is by design, not by policy.',
      },
      {
        q: 'Can the receiver ever find out who sent a message?',
        a: 'No. The identity of message senders is never stored in our database, so there is no information to reveal, even if someone requested it. The optional "hints" feature on the Confession Wall is different — it only reveals clues that the sender themselves chose to provide (like a nickname or emoji). But for private anonymous messages sent through your profile link, the sender is completely untraceable.',
      },
      {
        q: 'What data do you collect about me?',
        a: 'For registered users, we collect your email address, username, and password (stored in hashed form). If you complete your profile, we also store your display name and gender preference. For message senders (who do not need accounts), we collect only the message content and basic optional metadata (device type like "Mobile" and time period like "Evening") for the hint feature. We do not collect IP addresses, location data, or any personally identifiable information from message senders. Full details are in our Privacy Policy.',
      },
      {
        q: 'Do you sell my data to third parties?',
        a: 'Absolutely not. We will never sell, trade, or rent your personal information to any third party. The data we collect is used solely for providing and improving the Whispers Within service. Our revenue model is based on advertising and optional premium features — not on selling user data. We believe in privacy as a fundamental right, not a commodity.',
      },
    ],
  },
  {
    name: 'Using the Platform',
    emoji: '💡',
    faqs: [
      {
        q: 'How do I share my link on Instagram Stories?',
        a: 'Whispers Within has a built-in Story Template Generator specifically designed for Instagram sharing. From your dashboard, click the "Share on IG" button to access beautiful, pre-designed story templates. Choose a template, and we will generate a high-quality story graphic with your unique link that you can directly save and share to your Instagram Story. You can also simply copy your link and paste it using the Instagram link sticker feature.',
      },
      {
        q: 'Can I turn off anonymous messages temporarily?',
        a: 'Yes. You have full control over when you receive messages. In your dashboard, there is an "Accept Messages" toggle switch. Turn it off to stop receiving new messages — your profile link will still be accessible, but visitors will see a message indicating that you are not currently accepting messages. You can turn it back on at any time with a single click.',
      },
      {
        q: 'How do I delete messages?',
        a: 'You can delete individual messages from your dashboard by clicking the delete icon on any message card. If you want to clear all messages at once, use the "Delete All" button which appears when you have messages in your inbox. Deleted messages are permanently removed from our servers and cannot be recovered. This gives you complete control over your message history.',
      },
      {
        q: 'What is the Confession Wall and how does it work?',
        a: 'The Confession Wall is a public community space where anyone can post anonymous confessions, secrets, thoughts, or stories. Each confession is categorized (Love, Funny, Deep, Regret, Secret, or General) so you can browse by mood. You can like confessions, share them as image cards, and interact with the community. Confession authors can optionally leave a hidden "hint" about their identity — these hints can be unlocked by other users through a paid reveal feature, adding a fun guessing-game element.',
      },
    ],
  },
  {
    name: 'Confession Wall & Hints',
    emoji: '🔥',
    faqs: [
      {
        q: 'How does the "Reveal Hint" feature work?',
        a: 'When someone posts a confession, they can optionally leave a hidden clue about their identity — this could be a nickname, an emoji, a riddle, or any other hint they choose. They can also optionally share their gender. These hints are hidden by default. Other users can upgrade to Whispers Pro (₹499) to unlock and see these hints globally for 30 days. Importantly, no real identity is ever revealed — only the clue that the sender voluntarily chose to leave. If a sender did not leave a hint, the revealed information will simply show "Anonymous".',
      },
      {
        q: 'What information is revealed when I pay for a hint?',
        a: 'When you unlock a hint, you will see: (1) The clue/hint that the confession sender chose to provide, (2) The gender they selected (if they chose to share it), and (3) Basic metadata like device type and time period. You will NOT see any real name, email, phone number, or any other personally identifiable information. The reveal feature is designed to be a fun social game, not a privacy violation.',
      },
      {
        q: 'Are confession payments refundable?',
        a: 'Payments for the Reveal Hint feature are generally non-refundable, as the digital content (the hint) is delivered instantly upon payment. However, if you experience a technical issue where payment was charged but the hint was not revealed, please contact our support team and we will investigate and resolve the issue. Payments are processed securely through Cashfree Payments, a trusted, RBI-licensed payment gateway.',
      },
    ],
  },
  {
    name: 'Safety & Moderation',
    emoji: '🛡️',
    faqs: [
      {
        q: 'How do you prevent abuse on the platform?',
        a: 'We employ a multi-layered approach to safety. First, every message passes through our AI-powered content moderation system that automatically detects and blocks harassment, hate speech, threats, doxxing attempts, and other harmful content before it reaches the recipient. Second, every user has the ability to toggle message acceptance on or off and delete any messages they find objectionable. Third, users can report severe abuse through our contact page, and our team reviews every report manually.',
      },
      {
        q: 'What happens if someone sends threatening or illegal messages?',
        a: 'Our AI moderation system is designed to intercept threatening and illegal content before delivery. If a threatening message bypasses our filters, we encourage users to report it immediately via our contact page. While we cannot identify anonymous senders (by design), we can block specific content patterns and take measures to protect affected users. In cases of credible threats to life or safety, we will cooperate with law enforcement to the extent legally required.',
      },
      {
        q: 'Is there a minimum age requirement?',
        a: 'Yes. You must be at least 13 years old to create an account and use Whispers Within. We do not knowingly collect personal information from children under 13. If we become aware that a user is under 13, we will take steps to deactivate their account and remove their data. If you believe a minor under 13 is using the platform, please contact us so we can take appropriate action.',
      },
    ],
  },
  {
    name: 'Technical & Account',
    emoji: '⚙️',
    faqs: [
      {
        q: 'I forgot my password. How do I reset it?',
        a: 'Navigate to the sign-in page and look for the "Forgot Password" option. Enter the email address associated with your account, and we will send you a password reset link. Click the link in the email to set a new password. For security, reset links expire after 24 hours. If you do not receive the email, check your spam folder or contact our support team.',
      },
      {
        q: 'Can I change my username after registration?',
        a: 'Currently, usernames cannot be changed after registration because your username is part of your unique profile link (whispers-within.in/u/yourname). Changing it would break any links you have already shared. We recommend choosing your username carefully during signup. If you absolutely need a different username, you would need to create a new account with a new email address.',
      },
      {
        q: 'How do I delete my account?',
        a: 'To delete your account and all associated data, please contact us at shivasap27@gmail.com with your account email address and a request for deletion. We will process your request within 30 days and permanently remove all your account data, received messages, and profile information from our servers. Please note that anonymous confessions you may have posted on the Confession Wall cannot be traced back to your account and will remain as community content.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            <HelpCircle className="h-3.5 w-3.5" /> Help Center
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Everything you need to know about Whispers Within. Browse by category or search for a specific question. Can not find your answer? <a href="/contact" className="text-violet-400 hover:underline">Contact us</a>.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="h-12 pl-12 rounded-xl border-0 bg-background/80 text-foreground focus-visible:ring-1 focus-visible:ring-primary shadow-lg"
              style={{ backdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.1)' }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {filteredCategories.map((category) => (
            <div key={category.name}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-2xl">{category.emoji}</span>
                {category.name}
              </h2>
              <div className="space-y-3">
                {category.faqs.map((faq, i) => {
                  const key = `${category.name}-${i}`;
                  return (
                    <div key={key} className="rounded-xl overflow-hidden transition-all duration-300"
                      style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                      <button
                        onClick={() => setOpenIndex(openIndex === key ? null : key)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                        <ChevronRight className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${openIndex === key ? 'rotate-90' : ''}`} />
                      </button>
                      {openIndex === key && (
                        <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
                          <p className="text-muted-foreground leading-relaxed text-sm">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-16 rounded-2xl"
              style={{ background: 'rgba(21, 18, 31, 0.4)', border: '1px dashed rgba(139,92,246,0.15)' }}>
              <HelpCircle className="h-12 w-12 text-violet-400/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No questions match your search.</p>
              <p className="text-sm text-muted-foreground/50 mt-1">Try a different keyword or <a href="/contact" className="text-violet-400 hover:underline">contact support</a>.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="text-center p-8 rounded-2xl" style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
            <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Our support team is ready to help. Whether you have a technical question, want to report an issue, or just want to share feedback — we would love to hear from you.
            </p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/20 transition-all hover:scale-105">
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
