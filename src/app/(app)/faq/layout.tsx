import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Whispers Within — how anonymous messaging works, privacy protections, account management, the Confession Wall, and our Pro subscription features.',
  alternates: {
    canonical: 'https://www.whispers-within.in/faq',
  },
  openGraph: {
    title: 'FAQ | Whispers Within',
    description: 'Everything you need to know about anonymous messaging, privacy, safety, and Whispers Within features.',
    url: 'https://www.whispers-within.in/faq',
    siteName: 'Whispers Within',
    type: 'website',
  },
};

// FAQ structured data — enables Google rich results (FAQ rich snippet in SERP)
// This is one of the strongest signals for content quality and authority
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Whispers Within?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Whispers Within is an anonymous messaging and community platform that lets you receive honest, unfiltered feedback from friends, classmates, colleagues, and anyone else. You create a unique profile link, share it on social media or messaging apps, and anyone who visits your link can send you a message without revealing their identity. The platform also features a public Confession Wall where the community can share anonymous thoughts, secrets, and confessions in a safe, moderated environment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Whispers Within completely anonymous?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Whispers Within is built with a privacy-first architecture. When you send an anonymous message, we do not collect your IP address, we do not set tracking cookies on you, and we do not require you to create an account. We collect only the minimum data necessary to deliver the message — the content of the message, a generalized device category, and a generalized time of day. The recipient cannot identify you from any information visible in their dashboard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Whispers Within free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the core features of Whispers Within are completely free. This includes creating an account, receiving anonymous messages, managing your dashboard, and posting on the Confession Wall. The only paid feature is the optional "Whispers Pro" subscription, which unlocks hints and clues about who sent you a message.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Whispers Within prevent harassment and harmful messages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every message submitted through Whispers Within passes through our AI-powered content moderation system before being delivered. This system detects and blocks threats, harassment, hate speech, sexually explicit content, and spam in real-time. Users also have full control over their message settings and can turn off message acceptance entirely at any time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I share my Whispers Within link on Instagram?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After signing up, your unique profile link is generated automatically at whispers-within.in/u/yourname. Use our built-in Story Template Generator in your dashboard (click "Share on IG") to create a beautiful, ready-to-post Instagram Story image with your link embedded. Download it and share it directly to your Instagram Story. You can also add an Instagram Link sticker pointing to your Whispers Within URL.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Confession Wall?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Whispers Within Confession Wall is a public, community-driven space where users can post anonymous confessions, secrets, and thoughts for the whole community to read. Confessions are moderated by AI and community guidelines. Users can react to confessions (like/love), and Pro subscribers can submit confessions to the featured section.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Whispers Pro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Whispers Pro is the premium subscription for Whispers Within, priced at ₹499/month. It unlocks advanced features including: Hint reveals (partial clues about who sent you a message), Ad-free browsing, Priority support, and access to exclusive Pro features on the Confession Wall.',
      },
    },
  ],
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
