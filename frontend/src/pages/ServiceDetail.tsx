import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronDown, ChevronRight, Phone, Calendar } from 'lucide-react';
import { services } from '../data/services';
import { buildTitle } from '../utils/seoHelpers';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);
  const ref = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    ref.current.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#1A3A5C' }}>Service Not Found</h1>
          <Link to="/services" className="btn-primary">View All Services</Link>
        </div>
      </div>
    );
  }

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const prev = services[currentIndex - 1];
  const next = services[currentIndex + 1];

  return (
    <>
      <Helmet>
        <title>{buildTitle(service.title)}</title>
        <meta name="description" content={service.shortDesc} />
      </Helmet>

      <div ref={ref}>
        {/* HERO */}
        <section className="relative py-28 md:py-36" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm mb-6" style={{ color: '#93c5fd' }}>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-white">{service.title}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 fade-in max-w-2xl">{service.title}</h1>
            <p className="text-lg max-w-xl fade-in" style={{ color: '#bfdbfe' }}>{service.shortDesc}</p>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="fade-in bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100">
                  <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#1A3A5C' }}>What Is {service.title}?</h2>
                  <p className="text-gray-700 leading-relaxed">{service.whatIsIt}</p>
                </div>

                <div className="fade-in bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100">
                  <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: '#1A3A5C' }}>Who Needs This Treatment?</h2>
                  <p className="text-gray-700 leading-relaxed">{service.whoNeedsIt}</p>
                </div>

                <div className="fade-in bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100">
                  <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#1A3A5C' }}>The Treatment Process</h2>
                  <div className="space-y-4">
                    {service.process.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0 mt-0.5" style={{ backgroundColor: '#2B7CC1' }}>{i + 1}</div>
                        <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="fade-in bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100">
                  <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#1A3A5C' }}>Frequently Asked Questions</h2>
                  <div className="space-y-3">
                    {service.faqs.map((faq, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                        <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-50 transition-colors">
                          <span className="font-semibold text-sm md:text-base pr-4" style={{ color: '#1A3A5C' }}>{faq.q}</span>
                          <ChevronDown size={18} className={`flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: '#2B7CC1' }} />
                        </button>
                        {openFaq === i && <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">{faq.a}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="sticky top-24 space-y-5">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 fade-in">
                    <h3 className="font-bold text-lg mb-4" style={{ color: '#1A3A5C' }}>Book This Treatment</h3>
                    <p className="text-sm text-gray-600 mb-5">Get a free consultation with Dr. Aslam Al Mehdi and find out if this treatment is right for you.</p>
                    <Link to="/book" className="btn-primary w-full justify-center mb-3">
                      <Calendar size={16} /> Book Appointment
                    </Link>
                    <a href="tel:+8801711780957" className="btn-outline w-full justify-center">
                      <Phone size={16} /> 01711-780957
                    </a>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 fade-in">
                    <h3 className="font-bold text-sm mb-3" style={{ color: '#1A3A5C' }}>Other Services</h3>
                    <div className="space-y-2">
                      {services.filter((s) => s.slug !== slug).slice(0, 5).map((s) => (
                        <Link key={s.slug} to={`/services/${s.slug}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 py-1.5 border-b border-gray-50 last:border-0 transition-colors">
                          <ChevronRight size={14} style={{ color: '#2B7CC1' }} />{s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prev/Next */}
            <div className="flex justify-between items-center mt-10 md:mt-14 pt-8 border-t border-blue-100">
              {prev ? (
                <Link to={`/services/${prev.slug}`} className="flex items-center gap-2 font-semibold text-sm hover:text-blue-600 transition-colors" style={{ color: '#1A3A5C' }}>
                  <ArrowLeft size={16} /><span className="hidden sm:inline">{prev.title}</span><span className="sm:hidden">Previous</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/services/${next.slug}`} className="flex items-center gap-2 font-semibold text-sm hover:text-blue-600 transition-colors" style={{ color: '#1A3A5C' }}>
                  <span className="hidden sm:inline">{next.title}</span><span className="sm:hidden">Next</span><ChevronRight size={16} />
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
