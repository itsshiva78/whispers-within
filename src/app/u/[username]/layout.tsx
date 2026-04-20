import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Prevent Google from indexing individual user messaging pages.
// These are functional, interactive pages — not editorial content.
// Indexing them causes "thin content" and "low value content" AdSense violations.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function UserProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
