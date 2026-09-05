import type { Metadata } from 'next';
import { BLOG_INDEX_ARTICLES } from '@/data/blogIndex';
import BlogClient from '@/components/BlogClient';

export const metadata: Metadata = {
  title: 'Blog & Guides | Whispers Within - Anonymous Messaging Platform',
  description: 'Read articles, guides, and insights about anonymous messaging, digital privacy, online safety, and making the most of Whispers Within. Tips, tutorials, and thought-provoking reads.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog & Guides | Whispers Within - Anonymous Messaging Platform',
    description: 'Articles, guides, and insights about anonymous messaging, privacy, and online safety.',
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Whispers Within Blog & Guides',
  description: 'Articles, guides, and insights about anonymous messaging, privacy, online safety, and social feedback.',
  url: 'https://www.whispers-within.in/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Whispers Within',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.whispers-within.in/logo.png',
    },
  },
  blogPost: BLOG_INDEX_ARTICLES.slice(0, 25).map((article) => ({
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    url: `https://www.whispers-within.in/blog/${article.slug}`,
    datePublished: new Date(article.date).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Shiva',
      url: 'https://www.whispers-within.in/about',
    },
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient articles={BLOG_INDEX_ARTICLES} />
    </>
  );
}
