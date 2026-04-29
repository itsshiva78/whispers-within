import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// The confessions page is dynamic UGC — content changes constantly and is
// user-generated, not editorial. Indexing it can dilute the overall site
// quality score and contribute to "thin content" AdSense violations.
export const metadata: Metadata = {
  alternates: {
    canonical: '/confessions',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ConfessionsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
