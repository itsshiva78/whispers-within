import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/api/', '/private/', '/sign-in', '/sign-up', '/verify/', '/complete-profile'],
    },
    sitemap: 'https://www.whispers-within.in/sitemap.xml',
  }
}

