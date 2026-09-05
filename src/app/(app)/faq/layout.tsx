import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about Whispers Within — how anonymous messaging works, privacy protections, account management, the Confession Wall, and 100% free community features.',
  alternates: {
    canonical: 'https://www.whispers-within.in/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions',
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
        text: 'Yes, Whispers Within is 100% free forever. This includes creating an account, receiving anonymous messages, managing your dashboard, posting on the Confession Wall, and unlocking sender clues and device hints with zero paywalls.',
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
        text: 'The Whispers Within Confession Wall is a public, community-driven space where users can post anonymous confessions, secrets, and thoughts for the whole community to read. Confessions are moderated by AI and community guidelines. Users can react to confessions (like/love), and unlock hints and clues completely free.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are all features really free forever?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Whispers Within is a 100% free community platform. There are no recurring subscription fees, no paywalls, and no hidden UPI mandates. All features—including message hints, clues, and story templates—are available to everyone at no cost.',
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
