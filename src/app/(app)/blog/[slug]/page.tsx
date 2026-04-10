import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';

interface ArticleData {
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  content: string[];
}

const articles: Record<string, ArticleData> = {
  'power-of-anonymous-feedback': {
    title: 'The Power of Anonymous Feedback: Why Honesty Matters More Than Ever',
    description: 'Explore how anonymous feedback creates meaningful conversations and why removing identity barriers leads to more genuine communication in the digital age.',
    category: 'Insights',
    readTime: '5 min read',
    date: 'April 8, 2026',
    content: [
      'In today\'s hyper-connected world, we share more about ourselves than any previous generation. Our social media profiles are carefully curated galleries of our best moments, our filtered achievements, and our most photogenic experiences. Yet despite this constant sharing, genuine honesty between people has become increasingly rare. The fear of judgment, social repercussions, and awkward real-life encounters has created a paradox — we are more connected than ever, but less honest with each other than ever before.',
      'This is where anonymous feedback changes the equation entirely. When the pressure of identity is removed, something remarkable happens: people say what they actually mean. The compliments become genuine rather than obligatory. The feedback becomes constructive rather than diluted. The confessions become real rather than performative.',
      '## Why Anonymity Unlocks Honesty',
      'Research in social psychology has consistently demonstrated that people communicate more honestly when they believe their identity is protected. This is not because people are inherently dishonest — it is because social dynamics create invisible barriers to truth-telling. Consider these everyday scenarios:',
      'A friend asks you how their outfit looks. Social convention demands a polite response. A colleague asks for feedback on their presentation. Professional dynamics encourage diplomatic language. A classmate wants to know what people think of them. Peer pressure dictates acceptable responses.',
      'In each case, the person asking genuinely wants honest feedback, but the social context makes full honesty uncomfortable for the responder. Anonymous platforms like Whispers Within remove this friction entirely. When there are no social consequences to honesty, the feedback becomes dramatically more authentic and useful.',
      '## The Compliment Effect',
      'One of the most surprising findings from our community data is that the majority of anonymous messages are positive. Contrary to the assumption that anonymity breeds negativity, most people use anonymous messaging to share compliments, confessions of admiration, and words of encouragement that they feel too shy or awkward to say in person.',
      'Think about it: how many times have you wanted to tell someone they looked great, that you admire their work, or that they made your day better — but held back because it might seem weird or forward? Anonymous messaging removes that barrier. It gives people permission to be genuinely kind without the social complexity of face-to-face delivery.',
      '## Building Deeper Connections',
      'The information shared through anonymous feedback often leads to deeper, more meaningful relationships. When you discover that multiple friends think you\'re an amazing listener, or that someone has had a secret crush on you, or that your classmates genuinely respect your work ethic — these insights have a profound impact on self-perception and social dynamics.',
      'Many of our users report that anonymous feedback has helped them understand how they are perceived by others, identify strengths they did not know they had, and build confidence in social situations. Some have even used the platform to break the ice on long-held feelings, leading to new friendships and relationships.',
      '## Responsible Anonymity',
      'Of course, anonymity comes with responsibility. At Whispers Within, we believe that anonymous communication should empower honesty, not enable abuse. That is why we invest heavily in AI-powered content moderation, user controls, and community guidelines. Every message is scanned for harmful content before delivery. Users have full control over their message settings. And our community actively promotes a culture of honest, respectful communication.',
      'The goal is not to create a space where anything goes — it is to create a space where genuine thoughts flow freely in a safe, positive environment.',
      '## The Future of Digital Honesty',
      'As social media continues to evolve, we believe there will always be a need for platforms that prioritize authenticity over performance. Whispers Within is part of a growing movement toward more genuine digital communication — one where the quality of the message matters more than the identity of the messenger.',
      'In a world that is increasingly filtered, anonymous feedback offers something refreshingly real. And that, we believe, is worth building for.',
    ],
  },
  'how-to-use-instagram-stories': {
    title: 'How to Use Whispers Within on Instagram Stories: A Complete Guide',
    description: 'Step-by-step tutorial on sharing your Whispers Within link on Instagram Stories and maximizing anonymous messages from followers.',
    category: 'Tutorial',
    readTime: '4 min read',
    date: 'April 5, 2026',
    content: [
      'Instagram Stories are the single most popular way our users share their Whispers Within links. With over 500 million people viewing Stories daily, it is the perfect medium to reach your friends and followers and invite them to send you anonymous messages. This guide walks you through every step of the process, from getting your link to creating eye-catching story graphics.',
      '## Step 1: Get Your Unique Link',
      'After signing up on Whispers Within, your unique profile link is generated automatically. You can find it at the top of your dashboard — it looks like this: whispers-within.in/u/yourname. This is the link people will visit to send you anonymous messages. Copy it by clicking the "Copy" button on your dashboard.',
      '## Step 2: Use Our Built-In Story Template Generator',
      'We know that a plain link does not grab attention on Instagram. That is why we built a Story Template Generator directly into your dashboard. Click the "Share on IG" button to open the template creator. You will see beautiful, pre-designed story templates with your username and link already embedded. Select a template style that matches your aesthetic, preview it, and download the high-quality image directly to your phone or device.',
      '## Step 3: Post to Your Instagram Story',
      'Open Instagram, swipe to create a new Story, and select the image you just downloaded from your camera roll. You can add additional stickers, text, or effects if you want. For maximum engagement, we recommend adding a "Link" sticker with your Whispers Within URL so followers can tap directly to your profile. If you have fewer than 10,000 followers, the link sticker still works — Instagram made it available to everyone in 2024.',
      '## Pro Tips for Maximum Engagement',
      'Based on data from thousands of our users, here are the strategies that generate the most anonymous messages:',
      '**Post at peak hours:** The best times to share your link are between 7-9 PM on weekdays and 11 AM-1 PM on weekends when your followers are most active on Instagram.',
      '**Use engaging captions:** Phrases like "Tell me something you\'ve never told me before" or "What\'s your honest opinion of me?" generate significantly more responses than generic captions like "Send me anonymous messages".',
      '**Share multiple times:** Do not just post once. Share your link on your Story 2-3 times over a few days. Not all followers see every Story, and repetition dramatically increases response rates.',
      '**Share the best messages:** When you receive interesting, funny, or sweet messages, screenshot them from your dashboard and share them on your Story (without revealing the sender, of course). This creates a viral loop — when followers see interesting messages others have received, they are more likely to send their own.',
      '**Engage with responses:** React to messages publicly on your Story. This shows your followers that you actually read and appreciate their messages, encouraging others to participate.',
      '## Beyond Instagram',
      'While Instagram Stories are the most popular sharing method, your Whispers Within link works everywhere. You can share it on Snapchat, WhatsApp Status, Twitter/X bio, Facebook Stories, Discord servers, or even in your school or college WhatsApp groups. The link works on any device with a web browser — no app download required for anyone.',
      '## Troubleshooting',
      'If people are visiting your link but you are not receiving messages, check the "Accept Messages" toggle in your dashboard — make sure it is turned on. If a message was flagged by our AI moderation system, it may have been blocked before reaching your inbox. This is a safety feature that protects you from harmful content.',
    ],
  },
  'staying-safe-online': {
    title: 'Staying Safe Online: Our Commitment to User Privacy and Security',
    description: 'A detailed look at how Whispers Within protects user privacy through encryption, AI moderation, and privacy-first architecture.',
    category: 'Safety',
    readTime: '6 min read',
    date: 'April 1, 2026',
    content: [
      'Trust is the foundation of any platform that handles personal and sensitive communication. At Whispers Within, we understand that users are sharing their most honest thoughts — and receiving messages that can be deeply personal. This responsibility shapes every technical and design decision we make. In this article, we provide a transparent look at exactly how we protect our users.',
      '## Our Privacy-First Architecture',
      'Privacy at Whispers Within is not an afterthought or a settings toggle — it is built into the fundamental architecture of the platform. Our approach is based on a simple principle: if we do not collect data, we cannot lose it, sell it, or be compelled to hand it over.',
      'For anonymous message senders, we collect the absolute minimum data necessary to deliver their message. This means: the message content, a generalized device category (like "Mobile" or "Desktop"), and a generalized time period (like "Evening"). We do not collect IP addresses, we do not set tracking cookies, we do not use browser fingerprinting, and we do not require senders to create accounts or provide any personal information.',
      '## AI-Powered Content Moderation',
      'While we are committed to anonymity and free expression, we draw a firm line at harmful content. Every message submitted through Whispers Within passes through our AI-powered moderation system before delivery. This system is designed to detect and block several categories of harmful content in real-time.',
      'The moderation system scans for direct threats and violence, harassment and bullying patterns, hate speech targeting protected groups, sexually explicit content involving minors, doxxing or sharing of personal information, and spam or automated abuse. Messages flagged by our system are silently blocked — the sender receives no notification that their message was filtered, and the recipient never sees the harmful content.',
      '## Encryption and Data Security',
      'All data in transit between your device and our servers is encrypted using HTTPS with modern TLS 1.3 standards. This means that even if someone intercepts the network traffic, they cannot read the data being transmitted. Our database connections are encrypted, and database access is restricted through IP whitelisting and strong authentication credentials.',
      'User passwords are never stored in plaintext. We use bcrypt hashing — an industry-standard, computationally intensive algorithm that makes it virtually impossible to reverse-engineer passwords even if our database were somehow compromised. Authentication sessions are managed through NextAuth.js with secure, HTTP-only cookies and CSRF protection.',
      '## What We Will Never Do',
      'We believe in being transparent about our commitments. Here is what Whispers Within will never do with your data: We will never sell your personal information or usage data to third parties. We will never use your message content for advertising targeting. We will never store identifiable information about anonymous message senders. We will never share your data with third parties for marketing purposes. We will never use dark patterns to trick you into sharing more data than necessary.',
      '## User Controls and Agency',
      'Beyond our platform-level protections, we give every user granular control over their experience. You can toggle message acceptance on and off at any time. You can delete individual messages or clear your entire inbox with one click. You can be selective about where you share your link. You decide what stays in your dashboard and what gets removed.',
      '## Continuous Improvement',
      'Security is not a destination — it is an ongoing journey. We continuously review and update our security practices, moderation algorithms, and privacy measures. We stay informed about emerging threats, follow security advisories from the frameworks and services we use, and regularly audit our codebase for vulnerabilities.',
      'We believe that users deserve a platform that respects their privacy as much as it enables their self-expression. That commitment is at the core of everything we build at Whispers Within.',
    ],
  },
  'creative-ways-anonymous-messaging': {
    title: '7 Creative Ways to Use Anonymous Messaging Beyond Instagram Q&A',
    description: 'Discover innovative ways to use anonymous messaging — from classroom feedback to party games to team retrospectives.',
    category: 'Ideas',
    readTime: '5 min read',
    date: 'March 28, 2026',
    content: [
      'When most people think of anonymous messaging, they think of Instagram Story Q&A sessions. And while that is certainly the most popular use case, the versatility of anonymous feedback extends far beyond social media. Here are seven creative, practical, and fun ways to use Whispers Within in your daily life.',
      '## 1. Classroom Feedback for Teachers',
      'Teachers can share their Whispers Within link with students to receive honest, anonymous feedback about their teaching methods, pace, and course content. Students are often reluctant to speak up in person about what is working and what is not. Anonymous feedback empowers them to share genuine insights — like "the homework is too long" or "your explanations of calculus are really clear" — that can directly improve the learning experience. Several educators in our community report that anonymous student feedback has transformed their teaching approach.',
      '## 2. Birthday Party Truth or Dare',
      'Turn any birthday party or get-together into a memorable event with anonymous messaging. The birthday person shares their Whispers Within link with all party guests, and everyone sends anonymous messages — compliments, funny memories, embarrassing stories, or heartfelt wishes. The birthday person reads them aloud to the group, trying to guess who sent each one. It creates hilarious, touching moments that everyone remembers.',
      '## 3. Team Retrospectives at Work',
      'After a project wraps up, share a Whispers Within link with your team for anonymous retrospective feedback. Team members can share honestly about what went well, what could be improved, and what they would do differently — without the politics and hierarchy that often inhibit honest workplace feedback. This is especially valuable for cross-functional teams where people may not feel comfortable giving direct feedback to colleagues from other departments.',
      '## 4. College Club or Organization Feedback',
      'If you run a college club, student organization, or community group, anonymous feedback is invaluable for understanding what members really think. Share your link after events to get honest feedback on the experience, or use it periodically to gauge general satisfaction. You will learn things through anonymous feedback that no amount of in-person conversations would reveal — because people are conditioned to be polite face-to-face.',
      '## 5. Creative Writing Prompts',
      'Writers and content creators can use Whispers Within as an anonymous prompt generator. Share your link and ask followers to send you story ideas, character descriptions, writing challenges, or creative scenarios. The anonymity often leads to more imaginative and uninhibited prompts than you would get through regular comments or direct messages. Several creators in our community use this technique regularly to overcome writer\'s block.',
      '## 6. Relationship Check-Ins',
      'Couples can use anonymous messaging as a unique way to communicate things they find difficult to say face-to-face. Share your Whispers Within link with your partner and invite them to share anonymous thoughts, compliments, or gentle feedback. Because the messages are anonymous (even though you both know who the sender is), it creates a psychological safe space that makes honest communication easier. Think of it as a digital version of putting a note in someone\'s lunchbox.',
      '## 7. Event Planning Surveys',
      'Planning a group trip, party, or event? Instead of the usual group chat debate, share a Whispers Within link and ask everyone to anonymously share their honest preferences. "Where should we go for the team outing?" "What kind of food should we order?" "What time works best?" You will get more honest answers because no one feels pressured to agree with the loudest voice in the group chat.',
      '## The Common Thread',
      'What all these use cases share is a simple insight: people communicate more honestly, creatively, and thoughtfully when the social pressure of identity is removed. Whether you are a teacher seeking genuine feedback, a friend planning a birthday surprise, or a team leader looking for honest retrospective insights — anonymous messaging creates the safe space that honest communication requires.',
    ],
  },
  'digital-trust-anonymity': {
    title: 'Understanding Digital Trust: How Anonymity Builds More Honest Communities',
    description: 'The psychology behind anonymous communication and how platforms like Whispers Within foster authentic communities.',
    category: 'Insights',
    readTime: '7 min read',
    date: 'March 22, 2026',
    content: [
      'The concept of anonymity in digital communication is often met with skepticism. Critics argue that anonymity enables trolling, abuse, and irresponsibility. While these concerns are valid in unmoderated environments, the reality is more nuanced. When implemented thoughtfully — with proper safety measures, content moderation, and community guidelines — anonymous platforms can actually foster more honest, empathetic, and authentic communities than their identity-based counterparts.',
      '## The Psychology of Self-Disclosure',
      'Psychologists have long studied the concept of "self-disclosure" — the process of sharing personal thoughts, feelings, and information with others. Research consistently shows that people disclose more deeply and honestly when they feel psychologically safe. Anonymity is one of the most effective ways to create this psychological safety.',
      'This phenomenon is sometimes called the "online disinhibition effect," a term coined by psychologist John Suler. While this effect can manifest negatively (toxic disinhibition), it more frequently manifests as "benign disinhibition" — where people become more open, honest, and even kinder than they would be in face-to-face interactions. On Whispers Within, we see this every day: the majority of anonymous messages are positive, supportive, and genuinely heartfelt.',
      '## Why Identity Can Be a Barrier',
      'Consider the social dynamics that govern our everyday interactions. We are constantly performing versions of ourselves — adjusting our language, opinions, and emotional expression based on who is watching. A student might not share a genuine opinion in class because their crush is sitting nearby. An employee might not give honest feedback because their manager is in the meeting. A friend might not share a personal struggle because they do not want to seem vulnerable.',
      'These social filters serve important evolutionary purposes — they help us navigate complex social hierarchies and maintain relationships. But they also prevent us from saying the things that matter most. Anonymous messaging creates a channel that bypasses these filters, allowing the raw, unedited version of a person\'s thoughts to flow through.',
      '## The Kindness Hypothesis',
      'One of the most counterintuitive findings from our platform data is what we call the "Kindness Hypothesis." Conventional wisdom suggests that anonymity brings out the worst in people. Our data tells a different story. Across millions of messages, the vast majority are positive: compliments, confessions of admiration, expressions of gratitude, and supportive words.',
      'Why? Because most of the things people hold back in person are positive, not negative. The compliment you wanted to give but thought would be weird. The crush you have been harboring but were too nervous to express. The gratitude you feel but never articulated because the moment passed. Anonymity gives these positive impulses a voice — and the result is overwhelmingly kind.',
      '## Trust Through Transparency',
      'At Whispers Within, we believe that trust is built through transparency. We are transparent about what data we collect (very little), how we use it (only for service delivery), and what we do to keep users safe (AI moderation, user controls, encryption). We publish detailed Privacy Policy and Terms of Service documents, maintain an open-source codebase, and communicate openly about our practices.',
      'This transparency is essential because anonymous platforms require a higher level of trust from users. When you cannot see who is sending you a message, you need to trust that the platform has adequate safety measures in place. And when you send an anonymous message, you need to trust that your identity is genuinely protected. We take both responsibilities seriously.',
      '## Building Community Without Identity',
      'The Confession Wall on Whispers Within demonstrates a fascinating social phenomenon: meaningful community can form around shared experiences rather than shared identities. Users connect with confessions not because they know who wrote them, but because they relate to the content — the shared experience of an unrequited crush, the relief of saying something you have been holding in, the comfort of knowing you are not alone in your struggles.',
      'This "identity-free community" has unique properties. It is more inclusive because there are no social barriers to participation. It is more honest because there are no reputational stakes. And it is more empathetic because readers engage with content on its own merits rather than through the lens of their existing social relationships.',
      '## The Role of Moderation',
      'None of this is possible without robust content moderation. Unmoderated anonymous spaces quickly devolve into toxic environments — this is well documented. The key insight is that anonymity itself is not the problem; the absence of accountability structures is the problem. At Whispers Within, our AI moderation system serves as this accountability structure. It allows genuine, honest expression while filtering out content that would harm individuals or the community.',
      '## Looking Forward',
      'As digital communication continues to evolve, we believe anonymous platforms will play an increasingly important role in fostering genuine human connection. The question is not whether anonymity is good or bad — it is how we design anonymous spaces to maximize the positive potential while minimizing harm. At Whispers Within, that design challenge is our daily work and our long-term mission.',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles[params.slug];
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | Whispers Within Blog`,
    description: article.description,
    openGraph: { title: article.title, description: article.description },
  };
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
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
          {article.content.map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-bold text-foreground pt-6">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              return <p key={i} className="text-foreground font-semibold leading-relaxed">{paragraph.replace(/\*\*/g, '')}</p>;
            }
            if (paragraph.startsWith('**')) {
              const parts = paragraph.split('**');
              return (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {parts.map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                  )}
                </p>
              );
            }
            return <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>;
          })}
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
