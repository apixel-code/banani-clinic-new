import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { buildTitle } from '../utils/seoHelpers';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    supabase.from('blog_posts').select('*').eq('slug', slug).eq('published', true).maybeSingle().then(({ data }) => {
      setPost(data);
      setLoading(false);
      if (data) {
        supabase.from('blog_posts').select('title,slug,excerpt,og_image,author,category,published_at').eq('published', true).eq('category', data.category).neq('slug', slug).limit(3).then(({ data: r }) => { if (r) setRelated(r); });
      }
    });
  }, [slug]);

  useEffect(() => {
    if (!ref.current || loading) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [post, loading]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20"><LoadingSpinner size="lg" /></div>;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#1A3A5C' }}>Post Not Found</h1>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const date = new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.og_image,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.published_at,
    publisher: { '@type': 'Organization', name: 'Banani Clinic' },
  };

  return (
    <>
      <Helmet>
        <title>{buildTitle(post.title)}</title>
        <meta name="description" content={post.meta_description || post.excerpt} />
        <meta property="og:image" content={post.og_image} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div ref={ref}>
        {/* HERO */}
        <section className="relative pt-20 overflow-hidden">
          {post.og_image && (
            <div className="relative h-64 md:h-80 lg:h-96">
              <img src={post.og_image} alt={post.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,58,92,0.8), transparent)' }} />
            </div>
          )}
        </section>

        {/* CONTENT */}
        <section className="py-10 md:py-16" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 hover:opacity-80 transition-opacity" style={{ color: '#2B7CC1' }}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
              <article className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-blue-100 fade-in">
                  <span className="badge mb-4 text-white" style={{ backgroundColor: '#2B7CC1' }}>{post.category}</span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight" style={{ color: '#1A3A5C' }}>{post.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
                    <span className="flex items-center gap-1.5"><Calendar size={14} />{date}</span>
                    <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
                  </div>
                  {post.excerpt && (
                    <blockquote className="border-l-4 pl-5 mb-6 text-gray-600 italic text-base md:text-lg leading-relaxed" style={{ borderColor: '#2B7CC1' }}>{post.excerpt}</blockquote>
                  )}
                  <div className="prose-clinic" dangerouslySetInnerHTML={{ __html: post.content }} />
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-gray-100">
                      <Tag size={14} style={{ color: '#2B7CC1' }} />
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="badge text-xs" style={{ backgroundColor: '#EBF4FF', color: '#2268A8' }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>

              {/* Sidebar */}
              <div className="fade-in space-y-5">
                <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
                  <h3 className="font-bold mb-4" style={{ color: '#1A3A5C' }}>Book a Consultation</h3>
                  <p className="text-sm text-gray-600 mb-4">Ready to take the next step? Book with Dr. Aslam Al Mehdi today.</p>
                  <Link to="/book" className="btn-primary w-full justify-center mb-3">Book Appointment</Link>
                  <Link to="/services" className="btn-outline w-full justify-center">View Services</Link>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="mt-12 md:mt-16">
                <h2 className="text-xl md:text-2xl font-bold mb-6 fade-in" style={{ color: '#1A3A5C' }}>Related Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {related.map((p, i) => <BlogCard key={p.slug} {...p} index={i} />)}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
