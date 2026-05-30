import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';
import { getPostBySlug, getAllSlugs } from '../data';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = getPostBySlug(params.slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `https://www.whispers-within.in/blog/${params.slug}` },
    authors: [{ name: 'Whispers Within Team', url: 'https://www.whispers-within.in/about' }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: new Date(article.date).toISOString(),
      authors: ['https://www.whispers-within.in/about'],
      url: `https://www.whispers-within.in/blog/${params.slug}`,
      siteName: 'Whispers Within',
      images: [{ url: 'https://www.whispers-within.in/logo.png', width: 800, height: 600, alt: article.title }],
    },
  };
}

function renderContent(content: string) {
  const blocks = content.split('\n\n');

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    // Horizontal rule
    if (trimmed === '---') {
      return <hr key={i} className="border-violet-500/10 my-8" />;
    }

    // H2 heading
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="text-2xl font-bold text-foreground pt-6">
          {trimmed.replace('## ', '')}
        </h2>
      );
    }

    // H3 heading (for FAQs)
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={i} className="text-lg font-semibold text-foreground pt-4">
          {trimmed.replace('### ', '')}
        </h3>
      );
    }

    // Bullet list
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter((line) => line.trim().startsWith('* ') || line.trim().startsWith('- '));
      return (
        <ul key={i} className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^[\*\-]\s*/, '')) }} />
          ))}
        </ul>
      );
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').filter((line) => /^\d+\.\s/.test(line.trim()));
      return (
        <ol key={i} className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^\d+\.\s*/, '')) }} />
          ))}
        </ol>
      );
    }

    // Image
    if (trimmed.startsWith('![')) {
      const altMatch = trimmed.match(/!\[([^\]]*)\]/);
      const srcMatch = trimmed.match(/\]\(([^)]+)\)/);
      if (srcMatch) {
        return (
          <figure key={i} className="my-6">
            <img
              src={srcMatch[1]}
              alt={altMatch?.[1] || ''}
              className="rounded-xl w-full object-cover max-h-[400px]"
              loading="lazy"
            />
          </figure>
        );
      }
    }

    // Regular paragraph — handle inline markdown
    return (
      <p
        key={i}
        className="text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
      />
    );
  });
}

/** Convert inline markdown (bold, italic, links) to HTML */
function formatInline(text: string): string {
  return text
    // Links: [text](url)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">$1</a>'
    )
    // Bold + Italic: ***text***
    .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Bold: **text**
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground">$1</strong>')
    // Italic: *text*
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getPostBySlug(params.slug);
  if (!article) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'Whispers Within Team',
      url: 'https://www.whispers-within.in/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Whispers Within',
      logo: { '@type': 'ImageObject', url: 'https://www.whispers-within.in/logo.png' },
    },
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    image: 'https://www.whispers-within.in/logo.png',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.whispers-within.in/blog/${params.slug}` },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <Clock className="h-3.5 w-3.5" /> {article.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <User className="h-3.5 w-3.5" /> {article.date}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">{article.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{article.description}</p>
        </header>

        {/* Article Content */}
        <div className="space-y-5">
          {renderContent(article.content)}
        </div>

        {/* Author Box */}
        <div className="mt-16 p-6 rounded-2xl flex items-center gap-5"
          style={{ background: 'rgba(21, 18, 31, 0.5)', border: '1px solid rgba(139,92,246,0.08)' }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg shadow-violet-500/20">
            S
          </div>
          <div>
            <p className="font-bold text-foreground mb-1">Written by the Whispers Within Team</p>
            <p className="text-sm text-muted-foreground">Insights, guides, and tips about anonymous messaging, privacy, and building honest digital communities.</p>
          </div>
        </div>

        {/* Related Articles CTA */}
        <div className="mt-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors">
            <BookOpen className="h-4 w-4" /> Browse all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
