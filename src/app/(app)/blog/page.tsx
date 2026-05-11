import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
import { BLOG_INDEX_ARTICLES } from '@/data/blogIndex';

export const metadata: Metadata = {
  title: 'Blog & Guides',
  description: 'Read articles, guides, and insights about anonymous messaging, digital privacy, online safety, and making the most of Whispers Within. Tips, tutorials, and thought-provoking reads.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog & Guides',
    description: 'Articles, guides, and insights about anonymous messaging, privacy, and online safety.',
  },
};

const colorMap: Record<string, string> = {
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen className="h-3.5 w-3.5" /> Blog & Guides
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Insights, Guides & Tips</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore articles about anonymous messaging, digital privacy, online safety, and creative ways to make the most of Whispers Within. Written by our team for our community.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-6">
            {BLOG_INDEX_ARTICLES.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
                <article className="p-6 md:p-8 rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                  style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colorMap[article.color]}`}>
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                      <Clock className="h-3.5 w-3.5" /> {article.readTime}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                      <User className="h-3.5 w-3.5" /> {article.date}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-violet-400 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-violet-400 text-sm font-medium group-hover:gap-3 transition-all">
                    Read full article <ArrowRight className="h-4 w-4" />
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
