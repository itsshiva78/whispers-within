import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Prevent indexing of the private user dashboard.
// This is a gated, personalised page with no public editorial content.
// Indexing it contributes to thin content flags on the AdSense review.
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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
