import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/api/', '/_next/', '/private/'],
    },
    sitemap: 'https://www.whispers-within.in/sitemap.xml',
  }
}
