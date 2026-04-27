import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { buildTitle } from '../utils/seoHelpers';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>{buildTitle('Our Dental Services – Complete Oral Care')}</title>
        <meta name="description" content="Explore all dental and maxillofacial services at Banani Clinic: implants, root canals, cosmetic dentistry, periodontal surgery, oral cancer screening and more." />
      </Helmet>
      <div ref={ref}>
        <section className="relative py-28 md:py-36" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
          <div className="container-custom text-center">
            <span className="badge mb-4 border border-white/30" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#bfdbfe' }}>All Services</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 fade-in">Complete Oral Care Under One Roof</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto fade-in" style={{ color: '#bfdbfe' }}>From a first check-up to complex maxillofacial reconstruction — we have the expertise, equipment, and compassion to handle every case.</p>
          </div>
        </section>

        <section className="py-14 md:py-20" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.map((s, i) => <ServiceCard key={s.id} title={s.title} slug={s.slug} icon={s.icon} shortDesc={s.shortDesc} index={i} />)}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
          <div className="container-custom text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 fade-in">Not Sure Which Treatment You Need?</h2>
            <p className="mb-6 max-w-xl mx-auto fade-in" style={{ color: '#bfdbfe' }}>Book a free consultation. Dr. Aslam will diagnose your condition and recommend the best path forward — no pressure, no obligation.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/book" className="btn-primary px-8 py-4">Book Free Consultation <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn-secondary px-8 py-4">Contact Us</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
