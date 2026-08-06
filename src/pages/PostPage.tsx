import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import FadeIn from '../components/ui/FadeIn';
import { formatDate, getPost, renderMarkdown } from '../lib/blog';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col" style={{ overflowX: 'clip' }}>
        <SiteHeader current="/blog" />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-5 text-center">
          <h1
            className="hero-heading font-black uppercase leading-none"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 120px)' }}
          >
            Not found
          </h1>
          <Link
            to="/blog"
            className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 text-sm transition-colors duration-300 hover:bg-[#D7E2EA]/10"
          >
            Back to the blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <SiteHeader current="/blog" />

      <article className="px-5 sm:px-8 md:px-10 pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="max-w-[720px] mx-auto">
          <FadeIn delay={0} y={20}>
            <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-widest">
              <span className="text-[#D7E2EA]">{post.category}</span>
              <span className="text-[#D7E2EA]/30">{formatDate(post.date)}</span>
              <span className="text-[#D7E2EA]/30">{post.readingMinutes} min</span>
            </div>

            <h1
              className="hero-heading font-black uppercase leading-[1.05] tracking-tight mt-5"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)' }}
            >
              {post.title}
            </h1>
          </FadeIn>

          {post.cover ? (
            <FadeIn delay={0.1} y={30} className="mt-8 sm:mt-10">
              <img
                src={post.cover}
                alt=""
                aria-hidden="true"
                className="w-full rounded-[24px] sm:rounded-[28px] object-cover"
              />
            </FadeIn>
          ) : null}

          <FadeIn delay={0.15} y={20} className="mt-10 sm:mt-12">
            {/* Markdown is authored by Gianluca and committed to this repo;
                nothing here comes from user input. */}
            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
            />
          </FadeIn>

          <FadeIn delay={0.2} y={20} className="mt-14 sm:mt-16">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA] font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm transition-colors duration-300 hover:bg-[#D7E2EA]/10"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              All articles
            </Link>
          </FadeIn>
        </div>
      </article>
    </div>
  );
}
