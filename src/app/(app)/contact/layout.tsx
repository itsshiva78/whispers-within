import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact & Support | Whispers Within',
  description: 'Get in touch with the Whispers Within team. Report abuse, ask questions, request features, or share feedback. We respond within 24-48 hours.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Support | Whispers Within',
    description: 'Reach the Whispers Within team for support, abuse reports, or feedback.',
    url: 'https://www.whispers-within.in/contact',
    siteName: 'Whispers Within',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
