import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export function generateMetadata({ params }: { params: { username: string } }): Metadata {
  const username = decodeURIComponent(params.username || 'someone');
  const title = `🤫 Send an anonymous whisper to @${username}!`;
  const description = `Send honest feedback, secret confessions, or compliments to @${username} completely anonymously on Whispers Within. 100% free & private.`;
  const ogImageUrl = `https://www.whispers-within.in/api/og?username=${encodeURIComponent(username)}`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.whispers-within.in/u/${encodeURIComponent(username)}`,
      siteName: 'Whispers Within',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Send an anonymous whisper to @${username}`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function UserProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
