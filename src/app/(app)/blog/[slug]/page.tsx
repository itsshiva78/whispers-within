import type { Metadata } from 'next';
import Image from 'next/image';
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
  const ogImageUrl = `https://www.whispers-within.in/api/og?title=${encodeURIComponent(article.title)}`;
  const canonicalUrl = `https://www.whispers-within.in/blog/${params.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: canonicalUrl },
    authors: [{ name: 'Shiva', url: 'https://www.whispers-within.in/about' }],
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: new Date(article.date).toISOString(),
      authors: ['https://www.whispers-within.in/about'],
      url: canonicalUrl,
      siteName: 'Whispers Within',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
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
          <figure key={i} className="my-6 relative w-full h-[400px]">
            <Image
              src={srcMatch[1]}
              alt={altMatch?.[1] || ''}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="rounded-xl object-cover"
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

function extractFaqs(content: string) {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split('\n');
  let currentQuestion = '';
  let currentAnswer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('### ')) {
      if (currentQuestion && currentAnswer.length > 0) {
        faqs.push({
          question: currentQuestion,
          answer: currentAnswer.join(' ').replace(/[*_#\[\]\(\)]/g, '').trim(),
        });
      }
      currentQuestion = line.replace('### ', '').trim();
      currentAnswer = [];
    } else if (currentQuestion) {
      if (line.startsWith('## ') || line === '---') {
        if (currentAnswer.length > 0) {
          faqs.push({
            question: currentQuestion,
            answer: currentAnswer.join(' ').replace(/[*_#\[\]\(\)]/g, '').trim(),
          });
        }
        currentQuestion = '';
        currentAnswer = [];
      } else if (line.length > 0) {
        currentAnswer.push(line);
      }
    }
  }
  if (currentQuestion && currentAnswer.length > 0) {
    faqs.push({
      question: currentQuestion,
      answer: currentAnswer.join(' ').replace(/[*_#\[\]\(\)]/g, '').trim(),
    });
  }
  return faqs;
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getPostBySlug(params.slug);
  if (!article) notFound();

  const faqs = extractFaqs(article.content);
  const canonicalUrl = `https://www.whispers-within.in/blog/${params.slug}`;

  const breadcrumbsSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.whispers-within.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.whispers-within.in/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  const articleJsonLd = {
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: 'Shiva',
      url: 'https://www.whispers-within.in/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Whispers Within',
      logo: { '@type': 'ImageObject', url: 'https://www.whispers-within.in/logo.png' },
    },
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    image: `https://www.whispers-within.in/api/og?title=${encodeURIComponent(article.title)}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
  };

  const graphElements: any[] = [articleJsonLd, breadcrumbsSchema];

  if (faqs.length > 0) {
    graphElements.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  const fullSchema = {
    '@context': 'https://schema.org',
    '@graph': graphElements,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fullSchema) }}
      />
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground font-medium mb-8">
          <Link href="/" className="hover:text-violet-400 transition-colors">Home</Link>
          <span className="text-muted-foreground/50">/</span>
          <Link href="/blog" className="hover:text-violet-400 transition-colors">Blog</Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground truncate max-w-[200px] sm:max-w-[400px]">{article.title}</span>
        </nav>

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

        {/* Author Box with E-E-A-T credentials */}
        <div className="mt-16 p-6 rounded-2xl flex items-center gap-5 border border-violet-500/15"
          style={{ background: 'rgba(21, 18, 31, 0.6)' }}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold font-mono shrink-0 shadow-lg shadow-violet-500/20">
            SS
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-foreground">Shiva</p>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Founder &amp; Engineer
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Software engineer and creator of Whispers Within. Passionate about building secure, privacy-first communication platforms with zero ads and zero data harvesting.
            </p>
            <div className="pt-1">
              <Link href="/about" className="text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors">
                Read our story &amp; mission →
              </Link>
            </div>
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
