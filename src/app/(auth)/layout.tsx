import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Prevent indexing of auth pages (sign-in, sign-up, verify).
// These are functional pages with no editorial value.
// Allowing Google to index them dilutes site quality and
// contributes to "low value content" AdSense violations.
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

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
