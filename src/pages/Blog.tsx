import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';
import { buildTitle } from '../utils/seoHelpers';
import BlogCard from '../components/BlogCard';
import LoadingSpinner from '../components/LoadingSpinner';

const CATS = ['All', 'Dental Health Tips', 'Treatment Guide', 'Patient Stories', 'Clinic News'];

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('All');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.from('blog_posts').select('title,slug,excerpt,og_image,author,category,published_at').eq('published', true).order('published_at', { ascending: false }).then(({ data }) => { setPosts(data || []); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts, cat]);

  const filtered = cat === 'All' ? posts : posts.filter((p) => p.category === cat);

  return (
    <>
      <Helmet>
        <title>{buildTitle('Dental Health Blog – Tips & Treatment Guides')}</title>
        <meta name="description" content="Expert dental health tips, treatment guides, and patient stories from Dr. Aslam Al Mehdi and the Banani Clinic team." />
      </Helmet>
      <div ref={ref}>
        <section className="relative py-28 md:py-36" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
          <div className="container-custom text-center">
            <span className="badge mb-4 border border-white/30" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#bfdbfe' }}>Knowledge Hub</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 fade-in">Dental Health Insights</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto fade-in" style={{ color: '#bfdbfe' }}>Expert articles, treatment guides, and patient stories from Dr. Aslam Al Mehdi.</p>
          </div>
        </section>

        <section className="py-10 md:py-16" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
              {CATS.map((c) => (
                <button key={c} onClick={() => setCat(c)} className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{ backgroundColor: cat === c ? '#2B7CC1' : 'white', color: cat === c ? 'white' : '#1A3A5C', border: `2px solid ${cat === c ? '#2B7CC1' : '#D6E9FF'}` }}
                >{c}</button>
              ))}
            </div>
            {loading ? <LoadingSpinner size="lg" /> : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-400">No posts in this category yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((post, i) => <BlogCard key={post.slug} {...post} index={i} />)}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
