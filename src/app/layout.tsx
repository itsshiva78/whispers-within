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
    <html lang="en" className="dark">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4666306883399247" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
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
