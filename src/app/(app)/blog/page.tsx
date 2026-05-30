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

export default function BlogPage() {
  return <BlogClient articles={BLOG_INDEX_ARTICLES} />;
}
