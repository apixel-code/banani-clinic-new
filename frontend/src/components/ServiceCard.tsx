import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Activity, Sparkles, Scissors, Shield, Heart, Zap, Search, Monitor } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  tooth: <Stethoscope size={26} />,
  activity: <Activity size={26} />,
  sparkles: <Sparkles size={26} />,
  scissors: <Scissors size={26} />,
  shield: <Shield size={26} />,
  heart: <Heart size={26} />,
  zap: <Zap size={26} />,
  search: <Search size={26} />,
  monitor: <Monitor size={26} />,
};

interface ServiceCardProps { title: string; slug: string; icon: string; shortDesc: string; index?: number; }

export default function ServiceCard({ title, slug, icon, shortDesc, index = 0 }: ServiceCardProps) {
  return (
    <div className="fade-in card p-5 md:p-6 group border border-gray-100" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: '#EBF4FF', color: '#2B7CC1' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#2B7CC1'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#EBF4FF'; (e.currentTarget as HTMLElement).style.color = '#2B7CC1'; }}
      >
        {iconMap[icon] || <Stethoscope size={26} />}
      </div>
      <h3 className="font-bold text-base md:text-lg mb-2 group-hover:text-blue-600 transition-colors" style={{ color: '#1A3A5C' }}>{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{shortDesc}</p>
      <Link to={`/services/${slug}`} className="inline-flex items-center gap-1.5 font-semibold text-sm hover:gap-3 transition-all duration-200" style={{ color: '#2B7CC1' }}>
        Learn More <ArrowRight size={15} />
      </Link>
    </div>
  );
}
