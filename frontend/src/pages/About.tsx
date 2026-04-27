import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Lightbulb, Users, Award, Shield, Globe, CheckCircle, ArrowRight } from 'lucide-react';
import { buildTitle } from '../utils/seoHelpers';

const values = [
  { icon: <Heart size={24} />, title: 'Empathy', desc: 'Every patient is treated with genuine compassion and understanding.' },
  { icon: <Lightbulb size={24} />, title: 'Innovation', desc: 'We adopt the latest techniques from our international training.' },
  { icon: <Users size={24} />, title: 'Respect', desc: 'Your time, budget, and decisions are always respected.' },
  { icon: <Award size={24} />, title: 'Expertise', desc: 'Fellowship-level training across four continents.' },
  { icon: <Shield size={24} />, title: 'Safety', desc: 'Stringent sterilization and clinical protocols.' },
  { icon: <Globe size={24} />, title: 'Excellence', desc: 'World-class outcomes for every patient, every time.' },
];

const timeline = [
  { year: '2008', event: 'Banani Clinic founded — one chair, one mission.' },
  { year: '2011', event: 'Dr. Aslam receives MS in Oral & Maxillofacial Surgery from Seoul, Korea.' },
  { year: '2014', event: 'Ph.D. in Periodontal Plastic Surgery from Tokyo Medical and Dental University.' },
  { year: '2016', event: 'FIAOO fellowship awarded by the International Academy of Oral Oncology, UK.' },
  { year: '2018', event: 'FICD fellowship from the International College of Dentists, USA.' },
  { year: '2019', event: 'Second chamber opened at York Hospital, Banani.' },
  { year: '2022', event: 'Postdoctoral research completed in Australia. 1000th implant placed.' },
  { year: '2024', event: '1500+ patients treated. Expanding services in oral oncology and maxillofacial surgery.' },
];

export default function About() {
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
        <title>{buildTitle('About Banani Clinic – Our Story & Mission')}</title>
        <meta name="description" content="Learn about Banani Clinic, Dr. Aslam Al Mehdi, and our mission to provide world-class dental and maxillofacial surgery in Dhaka, Bangladesh." />
      </Helmet>

      <div ref={ref}>
        {/* HERO */}
        <section className="relative py-28 md:py-36 flex items-center" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
          <div className="container-custom relative z-10 text-center">
            <span className="badge mb-4 border border-white/30 text-sm" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#bfdbfe' }}>Our Story</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 fade-in">More Than a Clinic.<br />A Commitment.</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed fade-in" style={{ color: '#bfdbfe' }}>Founded on the belief that every Bangladeshi deserves world-class dental care — compassionate, affordable, and permanent.</p>
          </div>
        </section>

        {/* STORY */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="fade-in">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img src="https://images.pexels.com/photos/3845743/pexels-photo-3845743.jpeg" alt="Banani Clinic interior" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-in">
                <span className="badge mb-4" style={{ backgroundColor: '#D6E9FF', color: '#2268A8' }}>How We Started</span>
                <h2 className="section-title mb-5">Born From a Gap in Quality Care</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                  <p>In 2008, Dr. Aslam Al Mehdi returned from training in South Korea with a clear vision: Dhaka deserved a dental clinic that matched the quality he had witnessed in Tokyo and Seoul — but remained accessible to local patients.</p>
                  <p>He started with a single chair in Banani. The commitment was simple: no compromise on technique, no shortcut in sterilization, no hidden charges. Every patient treated exactly as he would treat family.</p>
                  <p>Over 15 years and 1500+ patients later, that commitment has only deepened. Two chambers, five international fellowships, and a team trained to the same standard — all in service of one mission: <strong className="font-semibold" style={{ color: '#1A3A5C' }}>transforming lives, one smile at a time.</strong></p>
                </div>
                <Link to="/doctor/aslam-al-mehdi" className="btn-outline inline-flex mt-6">Meet Dr. Aslam <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <span className="badge mb-3" style={{ backgroundColor: '#D6E9FF', color: '#2268A8' }}>Our Values</span>
              <h2 className="section-title fade-in">What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {values.map((v, i) => (
                <div key={i} className="fade-in bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition-shadow group" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white transition-transform group-hover:scale-110" style={{ backgroundColor: '#2B7CC1' }}>{v.icon}</div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: '#1A3A5C' }}>{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <span className="badge mb-3" style={{ backgroundColor: '#D6E9FF', color: '#2268A8' }}>Our Journey</span>
              <h2 className="section-title fade-in">15 Years of Excellence</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, i) => (
                <div key={i} className="fade-in flex gap-4 md:gap-6 mb-6 md:mb-8" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0" style={{ backgroundColor: '#2B7CC1' }}>{item.year}</div>
                    {i < timeline.length - 1 && <div className="w-0.5 flex-1 mt-2" style={{ backgroundColor: '#D6E9FF', minHeight: 24 }} />}
                  </div>
                  <div className="pb-6">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed pt-3">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="section-title fade-in">Why Patients Choose Us</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Internationally trained specialist with 5 global fellowships',
                'Painless procedures using the latest anesthesia protocols',
                'Fully transparent pricing — written cost plan before treatment',
                'Two conveniently located chambers in Banani, Dhaka',
                'State-of-the-art 3D imaging and digital treatment planning',
                'Strict international sterilization and infection control standards',
              ].map((item, i) => (
                <div key={i} className="fade-in flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm" style={{ animationDelay: `${i * 0.07}s` }}>
                  <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#2B7CC1' }} />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
          <div className="container-custom text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 fade-in">Ready to Experience the Difference?</h2>
            <p className="mb-6 max-w-xl mx-auto fade-in" style={{ color: '#bfdbfe' }}>Book a free consultation and discover what world-class care feels like.</p>
            <Link to="/book" className="btn-primary px-8 py-4 text-base">Book Free Consultation</Link>
          </div>
        </section>
      </div>
    </>
  );
}
