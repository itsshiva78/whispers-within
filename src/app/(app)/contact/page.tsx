'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Shield, HelpCircle, AlertTriangle, Send, Loader2, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const supportCategories = [
  {
    icon: HelpCircle,
    title: 'General Questions',
    desc: 'Questions about how Whispers Within works, features, pricing, or anything else. We are happy to help you understand the platform better.',
  },
  {
    icon: Shield,
    title: 'Account & Security',
    desc: 'Issues with your account, login problems, password resets, or security concerns. We take your account security very seriously and prioritize these requests.',
  },
  {
    icon: AlertTriangle,
    title: 'Report Abuse',
    desc: 'Report abusive, harmful, or threatening messages. Our moderation team reviews every report carefully and takes swift action to maintain a safe community.',
  },
  {
    icon: MessageSquare,
    title: 'Feature Requests & Feedback',
    desc: 'Have an idea for a new feature, or feedback on how we can improve? We actively listen to our community and prioritize features based on user demand.',
  },
];

const supportFaqs = [
  {
    q: 'I forgot my password. How do I reset it?',
    a: 'Visit the sign-in page and click the "Forgot Password" link. Enter your registered email address, and we will send you a password reset link. The link expires in 24 hours for security reasons.',
  },
  {
    q: 'I am receiving abusive messages. What should I do?',
    a: 'You can immediately stop all incoming messages by toggling the "Accept Messages" switch off in your dashboard. You can also delete individual messages. If the abuse is severe, please report it to us using the form below and we will investigate.',
  },
  {
    q: 'Can I change my username?',
    a: 'Currently, usernames cannot be changed after registration as they are part of your unique profile link. We recommend choosing a username carefully during signup. If you need a different username, you can create a new account.',
  },
  {
    q: 'How long does a support response take?',
    a: 'We aim to respond to all support requests within 24-48 hours. Abuse reports and security-related inquiries are given highest priority and may be resolved faster.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', category: 'general', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending — in production, this could hit an API endpoint
    const mailtoLink = `mailto:shivasap27@gmail.com?subject=[${formData.category}] Support Request from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink, '_blank');
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contact & Support</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions, need help, or want to share feedback? Our team is here to assist you. We value every message and typically respond within 24-48 hours.
          </p>
        </div>
      </section>

      {/* Support Categories */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">How Can We Help You?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {supportCategories.map((cat, i) => (
              <div key={i} className="flex gap-4 items-start p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center shrink-0">
                  <cat.icon className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{cat.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Direct Email */}
      <section className="py-16" style={{ background: 'rgba(13, 11, 20, 0.8)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">Send Us a Message</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
            Fill out the form below and we will get back to you as soon as possible. For urgent issues, you can also email us directly.
          </p>

          {isSubmitted ? (
            <div className="text-center py-16 rounded-2xl"
              style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
              <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Thank you for reaching out. We have received your message and will respond within 24-48 hours. Please check the email client that opened to complete sending, if needed.
              </p>
              <Button onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', category: 'general', message: '' }); }}
                className="mt-6 bg-violet-600 hover:bg-violet-500 text-white rounded-xl">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8"
              style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Your Name</label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name" required
                    className="h-12 rounded-xl border-0 bg-background/80 text-foreground focus-visible:ring-1 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Email Address</label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com" required
                    className="h-12 rounded-xl border-0 bg-background/80 text-foreground focus-visible:ring-1 focus-visible:ring-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="flex h-12 w-full rounded-xl border-0 bg-background/80 px-3 py-2 text-sm text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-primary">
                  <option className="bg-background" value="general">General Question</option>
                  <option className="bg-background" value="account">Account & Security</option>
                  <option className="bg-background" value="abuse">Report Abuse</option>
                  <option className="bg-background" value="feature">Feature Request / Feedback</option>
                  <option className="bg-background" value="bug">Bug Report</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Message</label>
                <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your question, issue, or feedback in detail..."
                  required minLength={20}
                  className="resize-none min-h-[150px] rounded-xl border-0 bg-background/80 text-foreground focus-visible:ring-1 focus-visible:ring-primary" />
              </div>

              <Button type="submit" disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-violet-500/20">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
              </Button>
            </form>
          )}

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-violet-400" />
              <span>Direct email: </span>
              <a href="mailto:shivasap27@gmail.com" className="text-violet-400 hover:underline font-medium">shivasap27@gmail.com</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-violet-400" />
              <span>Response time: 24-48 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-3">Common Support Questions</h2>
          <p className="text-center text-muted-foreground mb-10">
            Before reaching out, check if your question is answered below. These are the most common support topics our users ask about.
          </p>

          <div className="space-y-4">
            {supportFaqs.map((faq, i) => (
              <div key={i} className="p-6 rounded-xl"
                style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 p-6 rounded-xl" style={{ background: 'rgba(21, 18, 31, 0.3)', border: '1px solid rgba(139,92,246,0.05)' }}>
            <p className="text-muted-foreground text-sm">
              Can&apos;t find what you&apos;re looking for? Visit our comprehensive <a href="/faq" className="text-violet-400 hover:underline font-medium">FAQ page</a> for detailed answers to over 15 common questions about Whispers Within.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
