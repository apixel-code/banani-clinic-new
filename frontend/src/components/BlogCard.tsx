import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogCardProps { title: string; slug: string; excerpt: string; og_image: string; author: string; category: string; published_at: string; index?: number; }

export default function BlogCard({ title, slug, excerpt, og_image, author, category, published_at, index = 0 }: BlogCardProps) {
  const date = new Date(published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <article className="fade-in card overflow-hidden group border border-gray-100" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="relative overflow-hidden h-44 md:h-48">
        <img src={og_image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <span className="absolute top-3 left-3 badge text-white text-xs" style={{ backgroundColor: '#2B7CC1' }}>{category}</span>
      </div>
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1"><Calendar size={12} />{date}</span>
          <span className="flex items-center gap-1"><User size={12} />{author}</span>
        </div>
        <h3 className="font-bold text-base md:text-lg leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2" style={{ color: '#1A3A5C' }}>{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
        <Link to={`/blog/${slug}`} className="inline-flex items-center gap-1.5 font-semibold text-sm hover:gap-3 transition-all duration-200" style={{ color: '#2B7CC1' }}>
          Read More <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
