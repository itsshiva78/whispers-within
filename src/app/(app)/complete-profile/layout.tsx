import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Prevent indexing of the profile completion page.
// This is a functional, gated page — not editorial content.
// Indexing it contributes to thin/low-value content flags.
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

export default function CompleteProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
