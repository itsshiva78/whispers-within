import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Whispers Within | Real Feedback from Real People',
  description: 'Whispers Within is a platform for honest, weightless feedback. Send and receive messages anonymously.',
  metadataBase: new URL('https://www.whispers-within.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Whispers Within | Anonymous Feedback Platform',
    description: 'Real feedback from real people. Start your anonymous conversation today.',
    url: 'https://www.whispers-within.in',
    siteName: 'Whispers Within',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Whispers Within Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whispers Within | Anonymous Feedback Platform',
    description: 'Real feedback from real people. Start your anonymous conversation today.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4666306883399247" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

