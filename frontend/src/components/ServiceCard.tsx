import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps { title: string; slug: string; image?: string; shortDesc: string; index?: number; }

export default function ServiceCard({ title, slug, image, shortDesc, index = 0 }: ServiceCardProps) {
  return (
    <div className="fade-in card p-5 md:p-6 group border border-gray-100" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="mb-4 md:mb-5 h-20 w-20 overflow-hidden rounded-2xl bg-blue-50 ring-1 ring-blue-100 transition-all duration-300 group-hover:scale-105 md:h-24 md:w-24">
        <img
          src={image || '/logo.jpeg'}
          alt={`${title} service`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-bold text-base md:text-lg mb-2 group-hover:text-blue-600 transition-colors" style={{ color: '#1A3A5C' }}>{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{shortDesc}</p>
      <Link to={`/services/${slug}`} className="inline-flex items-center gap-1.5 font-semibold text-sm hover:gap-3 transition-all duration-200" style={{ color: '#2B7CC1' }}>
        Learn More <ArrowRight size={15} />
      </Link>
    </div>
  );
}
