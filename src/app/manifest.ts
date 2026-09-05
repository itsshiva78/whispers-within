import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Whispers Within - Anonymous Messaging',
    short_name: 'Whispers',
    description: "India's most trusted anonymous feedback and confession platform.",
    start_url: '/',
    display: 'standalone',
    background_color: '#090714',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
