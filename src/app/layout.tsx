import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Outfit } from 'next/font/google';
import dynamic from 'next/dynamic';
import Script from 'next/script';
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
  alternates: {
    canonical: '/',
  },
  keywords: ['anonymous messaging', 'anonymous feedback', 'confession platform', 'anonymous questions', 'NGL alternative', 'honest feedback India', 'anonymous confession wall'],
  authors: [{ name: 'Whispers Within Team', url: 'https://www.whispers-within.in/about' }],
  creator: 'Whispers Within',
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

// Organization JSON-LD — critical E-E-A-T trust signal for Google AdSense & Search
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Whispers Within',
  url: 'https://www.whispers-within.in',
  logo: 'https://www.whispers-within.in/logo.png',
  description: "India's most trusted anonymous messaging and confession platform.",
  foundingDate: '2026',
  founder: {
    '@type': 'Person',
    name: 'Shiva',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'shivasap27@gmail.com',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://www.whispers-within.in/about',
    'https://www.whispers-within.in/blog',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <AuthProvider>
          <FloatingParticles />
          {children}
          <Toaster />
        </AuthProvider>
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4666306883399247"
        />
      </body>
    </html>
  );
}
