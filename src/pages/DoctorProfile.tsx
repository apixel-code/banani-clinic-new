import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { buildTitle, DOCTOR_SCHEMA } from '../utils/seoHelpers';
import { Award, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const credentials = [
  { flag: '🇯🇵', degree: 'Ph.D. — Periodontal Plastic Surgery', institution: 'Tokyo Medical and Dental University', year: '2014' },
  { flag: '🇰🇷', degree: 'MS — Oral & Maxillofacial Surgery', institution: 'Seoul National University', year: '2011' },
  { flag: '🇬🇧', degree: 'FIAOO — Fellow, Int\'l Academy of Oral Oncology', institution: 'London, United Kingdom', year: '2016' },
  { flag: '🇺🇸', degree: 'FICD — Fellow, Int\'l College of Dentists', institution: 'Washington D.C., USA', year: '2018' },
  { flag: '🇦🇺', degree: 'Postdoctoral Research — Oral Sciences', institution: 'Australia', year: '2022' },
  { flag: '🇧🇩', degree: 'BDS — Bachelor of Dental Surgery', institution: 'University of Dhaka', year: '2002' },
];

const expertise = ['Dental Implantology','Periodontal Plastic Surgery','Oral & Maxillofacial Surgery','Cosmetic Smile Design','Cleft Lip & Palate Repair','Oral Cancer Diagnosis & Surgery','TMJ Disorder Management','Orofacial Pain Management','Digital Treatment Planning','Bone Grafting & Ridge Augmentation'];

export default function DoctorProfile() {
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
        <title>{buildTitle('Dr. Aslam Al Mehdi – Oral & Maxillofacial Surgeon')}</title>
        <meta name="description" content="Dr. Aslam Al Mehdi – Ph.D. Tokyo, MS Seoul, FIAOO UK. Dhaka's leading oral & maxillofacial surgeon with 15+ years experience and 1500+ patients." />
        <script type="application/ld+json">{JSON.stringify(DOCTOR_SCHEMA)}</script>
      </Helmet>

      <div ref={ref}>
        {/* HERO */}
        <section className="relative py-28 md:py-36 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2238 0%, #1A3A5C 40%, #2B7CC1 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <img src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.1 }} />
          </div>
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="fade-in">
                <span className="badge mb-4 border border-white/30" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#bfdbfe' }}>Chief Surgeon</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">Dr. Aslam Al Mehdi</h1>
                <p className="font-semibold text-lg mb-6" style={{ color: '#93c5fd' }}>Oral & Maxillofacial Surgeon | Periodontist | Oral Oncologist</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Ph.D. Tokyo','MS Seoul','FIAOO UK','FICD USA','Postdoc Australia'].map((c) => (
                    <span key={c} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}>{c}</span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/book" className="btn-primary">Book Appointment <ArrowRight size={16} /></Link>
                  <a href="tel:+8801311129952" className="btn-secondary">01311-129952</a>
                </div>
              </div>
              <div className="fade-in hidden lg:block">
                <div className="aspect-[3/4] max-w-xs mx-auto rounded-3xl overflow-hidden shadow-2xl">
                  <img src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg" alt="Dr. Aslam Al Mehdi" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[['1500+','Patients Treated'],['15+','Years Experience'],['5','Int\'l Fellowships'],['4','Countries Trained']].map(([n, l]) => (
                <div key={l}>
                  <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: '#2B7CC1' }}>{n}</div>
                  <div className="text-xs md:text-sm text-gray-500 font-medium">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BIO */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2 space-y-5 fade-in">
                <h2 className="section-title">Biography</h2>
                {[
                  'Dr. Aslam Al Mehdi is one of Bangladesh\'s most distinguished oral and maxillofacial surgeons. With a Ph.D. from Tokyo Medical and Dental University and an MS from Seoul National University, he brings an unparalleled depth of international training to his practice at Banani Clinic.',
                  'His academic journey began in Dhaka before taking him to the Korean Peninsula for his master\'s degree in oral surgery, then to Tokyo — considered the world\'s leading center for periodontal plastic surgery research — for his doctorate. He has conducted postdoctoral research in Australia and holds active fellowships from the International Academy of Oral Oncology (UK) and the International College of Dentists (USA).',
                  'Despite his extensive international credentials, Dr. Aslam\'s philosophy is deeply rooted in accessibility. He founded Banani Clinic on the principle that every Bangladeshi patient deserves the same quality of care available in Tokyo, Seoul, or London — without compromising on compassion or affordability.',
                  'Over 15 years of clinical practice, he has treated more than 1500 patients across the full spectrum of oral health — from routine extractions to complex maxillofacial reconstruction and oral cancer surgery. He is registered with the Bangladesh Medical & Dental Council (BMDC Reg. No. 871).',
                ].map((p, i) => <p key={i} className="text-gray-700 leading-relaxed text-sm md:text-base">{p}</p>)}
              </div>
              <div className="fade-in space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: '#1A3A5C' }}>Clinic Details</h3>
                  <div className="space-y-3 text-sm">
                    <div><span className="font-semibold" style={{ color: '#1A3A5C' }}>Registration:</span><span className="text-gray-600 ml-2">BMDC No. 871</span></div>
                    <div><span className="font-semibold" style={{ color: '#1A3A5C' }}>Experience:</span><span className="text-gray-600 ml-2">15+ Years</span></div>
                    <div><span className="font-semibold" style={{ color: '#1A3A5C' }}>Languages:</span><span className="text-gray-600 ml-2">Bengali, English, Japanese</span></div>
                    <div><span className="font-semibold" style={{ color: '#1A3A5C' }}>Specialties:</span><span className="text-gray-600 ml-2">Implants, Periodontics, OMS</span></div>
                  </div>
                </div>
                <Link to="/book" className="btn-primary w-full justify-center">Book Consultation</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CREDENTIALS */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <span className="badge mb-3" style={{ backgroundColor: '#D6E9FF', color: '#2268A8' }}>Education & Credentials</span>
              <h2 className="section-title fade-in">International Academic Excellence</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {credentials.map((c, i) => (
                <div key={i} className="fade-in bg-white border-2 border-blue-50 hover:border-blue-200 rounded-2xl p-5 md:p-6 transition-all hover:shadow-md" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="text-3xl mb-3">{c.flag}</div>
                  <div className="font-bold text-sm md:text-base mb-1" style={{ color: '#1A3A5C' }}>{c.degree}</div>
                  <div className="text-xs md:text-sm text-gray-500 mb-1">{c.institution}</div>
                  <div className="text-xs font-semibold" style={{ color: '#2B7CC1' }}>{c.year}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section className="py-14 md:py-20" style={{ backgroundColor: '#EBF4FF' }}>
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="section-title fade-in">Areas of Expertise</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {expertise.map((item, i) => (
                <div key={i} className="fade-in flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm" style={{ animationDelay: `${i * 0.05}s` }}>
                  <CheckCircle size={18} className="flex-shrink-0" style={{ color: '#2B7CC1' }} />
                  <span className="text-sm font-medium" style={{ color: '#1A3A5C' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
          <div className="container-custom text-center">
            <Award size={40} className="text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 fade-in">Book a Consultation with Dr. Aslam</h2>
            <p className="mb-6 max-w-xl mx-auto fade-in" style={{ color: '#bfdbfe' }}>Join 1500+ patients who have experienced the difference of internationally-trained specialist care in Dhaka.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/book" className="btn-primary px-8 py-4">Book Appointment</Link>
              <Link to="/services" className="btn-secondary px-8 py-4">Explore Services</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
