import type { ReactNode } from 'react';
import Script from 'next/script';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}
