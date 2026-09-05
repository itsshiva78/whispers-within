import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: ['/dashboard', '/api/', '/private/', '/sign-in', '/sign-up', '/verify/', '/complete-profile'],
      },
      {
        userAgent: ['Twitterbot', 'facebookexternalhit', 'WhatsApp', 'LinkedInBot'],
        allow: ['/', '/api/og'],
        disallow: ['/dashboard', '/private/'],
      },
    ],
    sitemap: 'https://www.whispers-within.in/sitemap.xml',
  };
}

