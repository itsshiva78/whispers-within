import type { ReactNode } from 'react';
import Script from 'next/script';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      <Script
        id="adsbygoogle-init-blog"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4666306883399247"
      />
      {children}
    </>
  );
}
