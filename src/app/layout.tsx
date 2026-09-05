import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Outfit } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

const FloatingParticles = dynamic(() => import('@/components/FloatingParticles'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Whispers Within | Anonymous Feedback & Confession Platform',
    template: '%s | Whispers Within',
  },
  description: "Whispers Within is India's most trusted anonymous messaging platform. Share honest feedback, post confessions anonymously, and discover what people really think — all with complete privacy and AI-powered safety. Join thousands of users having real conversations.",
  metadataBase: new URL('https://www.whispers-within.in'),
  keywords: ['anonymous messaging', 'anonymous feedback', 'confession platform', 'anonymous questions', 'NGL alternative', 'honest feedback India', 'anonymous confession wall', 'free anonymous messages'],
  authors: [{ name: 'Shiva', url: 'https://www.whispers-within.in/about' }],
  creator: 'Shiva',
  publisher: 'Whispers Within',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Whispers Within | Anonymous Feedback & Confession Platform',
    description: "India's most trusted anonymous messaging platform. Share honest feedback, post confessions, and have real conversations — privately and safely.",
    url: 'https://www.whispers-within.in',
    siteName: 'Whispers Within',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Whispers Within — Anonymous Feedback Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whispers Within | Anonymous Feedback Platform',
    description: "India's most trusted anonymous messaging and confession platform.",
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
  verification: {
    google: 'K5a05gOjY8xeMlGuw-ZO0jc5hL84EW0tG8uEe7p5rWg',
  },
};

// Unified Multi-Tier Schema Graph — E-E-A-T & Google Rich Results (FreeViralKit standard)
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Whispers Within',
      url: 'https://www.whispers-within.in',
      applicationCategory: 'SocialNetworkingApplication',
      operatingSystem: 'Web',
      description: "India's most trusted anonymous messaging and confession platform.",
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      author: {
        '@type': 'Person',
        name: 'Shiva',
        url: 'https://www.whispers-within.in/about',
      },
    },
    {
      '@type': 'Organization',
      name: 'Whispers Within',
      url: 'https://www.whispers-within.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.whispers-within.in/logo.png',
        width: 512,
        height: 512,
      },
      description: "India's most trusted anonymous messaging and confession platform.",
      foundingDate: '2026',
      founder: {
        '@type': 'Person',
        name: 'Shiva',
        url: 'https://www.whispers-within.in/about',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@whispers-within.in',
        contactType: 'customer support',
        availableLanguage: 'English',
      },
      sameAs: [
        'https://github.com/itsshiva78/whispers-within',
        'https://www.whispers-within.in/about',
        'https://www.whispers-within.in/blog',
      ],
    },
  ],
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4666306883399247" />
        {/* Preconnect to external domains — improves Core Web Vitals */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        {/* Google AdSense Official Site Verification & Auto-Ads Tag */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4666306883399247"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <AuthProvider>
          <FloatingParticles />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
