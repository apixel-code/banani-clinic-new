import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Globe, ArrowRight, Bus, Car } from 'lucide-react';
import { buildTitle } from '../utils/seoHelpers';
import { locations, telHref, websiteLabel, mapEmbedSrc } from '../data/locations';

export default function Locations() {
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
        <title>{buildTitle('Our Locations – Three Chambers in Banani, Dhaka')}</title>
        <meta name="description" content="Banani Clinic has three convenient chambers in Banani, Dhaka. Find directions, hours, and contact info for each location." />
      </Helmet>
      <div ref={ref}>
        <section className="relative py-28 md:py-36" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
          <div className="container-custom text-center">
            <span className="badge mb-4 border border-white/30" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#bfdbfe' }}>Find Us</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 fade-in">Three Convenient Locations</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto fade-in" style={{ color: '#bfdbfe' }}>All our chambers are located in Banani, Dhaka — easily accessible from all parts of the city.</p>
          </div>
        </section>

        <section className="py-14 md:py-20" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {locations.map((chamber, i) => (
                <div key={chamber.name} className="fade-in flex flex-col bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="aspect-video w-full overflow-hidden bg-gray-100">
                    <iframe
                      src={mapEmbedSrc(chamber.address)}
                      width="100%" height="100%"
                      style={{ border: 0 }}
                      allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={chamber.name}
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6 md:p-7">
                    <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 text-white" style={{ backgroundColor: '#2B7CC1' }}>
                      {chamber.label}
                    </div>
                    <h2 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#1A3A5C' }}>{chamber.name}</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex gap-3 text-sm text-gray-600"><MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#2B7CC1' }} /><span>{chamber.address}</span></div>
                      <div className="flex gap-3 text-sm text-gray-600"><Clock size={16} className="flex-shrink-0" style={{ color: '#2B7CC1' }} /><span>Visiting Hours: {chamber.hours}</span></div>
                      <div className="flex gap-3 text-sm text-gray-600"><Phone size={16} className="flex-shrink-0" style={{ color: '#2B7CC1' }} />
                        <div>{chamber.phones.map((p) => <a key={p} href={telHref(p)} className="block hover:text-blue-600 transition-colors">{p}</a>)}</div>
                      </div>
                      <div className="flex gap-3 text-sm text-gray-600"><Globe size={16} className="flex-shrink-0 mt-0.5" style={{ color: '#2B7CC1' }} /><a href={chamber.website} target="_blank" rel="noopener noreferrer" className="break-all hover:text-blue-600 transition-colors">{websiteLabel(chamber.website)}</a></div>
                    </div>
                    <Link to="/book" className="btn-primary w-full justify-center mt-auto">Book at this Location <ArrowRight size={16} /></Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Getting here */}
            <div className="mt-10 md:mt-14">
              <h2 className="text-xl md:text-2xl font-bold mb-6 fade-in text-center" style={{ color: '#1A3A5C' }}>Getting Here</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: <Bus size={24} />, title: 'By Bus', desc: 'Banani is served by multiple city bus routes. Get off at Banani or Gulshan-1 Circle and walk or take a rickshaw.' },
                  { icon: <Car size={24} />, title: 'By Car', desc: 'Ample street parking available near both chambers. Rideshare services (Uber, Pathao) work excellently in this area.' },
                  { icon: <MapPin size={24} />, title: 'Landmarks', desc: 'The main branch is in Block C, Banani. The BIO clinic is on Kemal Ataturk Avenue at Praasad Trade Centre.' },
                ].map((item, i) => (
                  <div key={i} className="fade-in bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-blue-100" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white" style={{ backgroundColor: '#2B7CC1' }}>{item.icon}</div>
                    <h3 className="font-bold mb-2" style={{ color: '#1A3A5C' }}>{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
