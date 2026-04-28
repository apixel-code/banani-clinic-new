import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import BlogCard from "../components/BlogCard";
import ServiceCard from "../components/ServiceCard";
import TestimonialSlider from "../components/TestimonialSlider";
import { services } from "../data/services";
import { useCounter } from "../hooks/useScrollAnimation";
import api from "../lib/api";
import { buildTitle, CLINIC_SCHEMA, DOCTOR_SCHEMA } from "../utils/seoHelpers";

const heroSlides = ["/slider-01.jpeg", "/slider-02.jpeg", "/slider-03.jpeg"];

function StatCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useCounter(target);
  return (
    <div className="text-center px-2">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1">
        <span ref={ref}>0</span>
        <span style={{ color: "#FF6B35" }}>{suffix}</span>
      </div>
      <div className="text-sm font-medium" style={{ color: "#bfdbfe" }}>
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [isPainPointsExpanded, setIsPainPointsExpanded] = useState(false);

  const showPreviousHeroSlide = () => {
    setActiveHeroSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    );
  };

  const showNextHeroSlide = () => {
    setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
  };

  useEffect(() => {
    api
      .getRecentBlogPosts(3)
      .then((data) => {
        setPosts(data || []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    sectionRef.current
      .querySelectorAll(".fade-in")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  return (
    <>
      <Helmet>
        <title>
          {buildTitle("Dhaka's Best Dental & Maxillofacial Surgery Clinic")}
        </title>
        <meta
          name="description"
          content="Dental & Maxillofacial Surgery at Banani Clinic (Specialized Hospital). Painless dental implants, root canals, cosmetic dentistry by Dr. Aslam Al Mehdi. Book today."
        />
        <script type="application/ld+json">
          {JSON.stringify(CLINIC_SCHEMA)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(DOCTOR_SCHEMA)}
        </script>
      </Helmet>

      <div ref={sectionRef}>
        {/* HERO */}
        <section
          className="relative mt-16 flex h-[560px] items-center justify-center overflow-hidden bg-gray-100 sm:h-[620px] md:mt-20 md:h-[680px] lg:h-[720px]"
          aria-label="Clinic highlights"
        >
          <div
            className="absolute inset-0 flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeHeroSlide * 100}%)` }}
          >
            {heroSlides.map((slide, index) => (
              <img
                key={slide}
                src={slide}
                alt={`Banani Clinic banner ${index + 1}`}
                className="h-full w-full flex-none object-cover"
                draggable={false}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2238]/55 via-[#1A3A5C]/30 to-[#2B7CC1]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/5 to-white/18" />
          <div className="container-custom relative z-10 py-10 text-center">
            <div
              className="inline-flex items-center gap-2 border border-white/20 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-6 md:mb-8"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#bfdbfe",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                style={{ backgroundColor: "#4ade80" }}
              />
              Accepting appointments — limited slots this week
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-4 md:mb-6">
              Stop Living With <br className="hidden sm:block" />
              <span style={{ color: "#FF6B35" }}>Tooth Pain.</span>
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl font-medium mb-3 md:mb-4 px-4"
              style={{ color: "#dbeafe" }}
            >
              Book a Painless Treatment Today — Results You Can See.
            </p>
            <p
              className="text-sm md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4"
              style={{ color: "#bfdbfe" }}
            >
              Dhaka's Most Trusted Oral & Maxillofacial Surgery Clinic —{" "}
              <span className="text-white font-semibold">
                1500+ Transformed Smiles
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
              <Link
                to="/book"
                className="btn-primary text-sm md:text-base px-6 md:px-8 py-3 md:py-4 shadow-xl"
              >
                Book Appointment Now
              </Link>
              <Link
                to="/gallery"
                className="btn-secondary text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
              >
                See Transformations <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 px-4">
              {[
                { label: "Ph.D.", sub: "Tokyo" },
                { label: "MS", sub: "Korea" },
                { label: "FIAOO", sub: "UK" },
                { label: "FICD", sub: "USA" },
                { label: "Postdoc", sub: "Australia" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex flex-col items-center rounded-xl px-3 md:px-4 py-2 md:py-3 border border-white/20"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <span className="text-white font-bold text-xs md:text-sm">
                    {c.label}
                  </span>
                  <span className="text-xs" style={{ color: "#93c5fd" }}>
                    {c.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={showPreviousHeroSlide}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/35 md:left-5 md:h-12 md:w-12"
            aria-label="Previous banner"
          >
            <ChevronLeft size={30} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={showNextHeroSlide}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white transition-colors hover:bg-black/35 md:right-5 md:h-12 md:w-12"
            aria-label="Next banner"
          >
            <ChevronRight size={30} strokeWidth={2.5} />
          </button>
        </section>

        {/* PAIN POINTS */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="section-title fade-in">
                Best Dental Clinic in Banani
              </h2>
              <p
                className="section-subtitle max-w-2xl mx-auto fade-in px-4 overflow-hidden"
                style={{
                  display: isPainPointsExpanded ? "block" : "-webkit-box",
                  WebkitLineClamp: isPainPointsExpanded ? "unset" : 6,
                  WebkitBoxOrient: "vertical",
                }}
              >
                Dental & Maxillofacial Surgery, Banani Clinic (Specialized
                Hospital) is always promised to provide the best oral and dental
                treatment to the patients with all advance technology and top
                notch equipment in Bangladesh. Dental & Maxillofacial Surgery,
                Banani Clinic (Specialized Hospital) ensure you the best
                hygienic environment to perform the best possible oral and
                dental treatment. Currently in each department of this center
                like Dental Implants, Orthodontic Treatment, Cosmetic Dentistry,
                Oral & Maxillofacial Surgery, Root Canal, Crown, Bridges,
                Prosthesis, Filing, Periodontist specialist doctors with degrees
                from home and abroad and highly trained in abroad provide
                treatment to patients in this center. We have long experience of
                serving domestic and foreign patients.
              </p>
              <button
                type="button"
                onClick={() => setIsPainPointsExpanded((prev) => !prev)}
                className="fade-in mt-3 font-semibold text-sm hover:opacity-80 transition-opacity"
                style={{ color: "#2268A8" }}
                aria-expanded={isPainPointsExpanded}
              >
                {isPainPointsExpanded ? "See less" : "See more"}
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {[
                {
                  icon: <ShieldCheck size={28} />,
                  title: "Scared of Pain?",
                  desc: "We use the latest painless anesthesia protocol. Our patients are genuinely surprised every time — most feel nothing at all.",
                },
                {
                  icon: <Clock size={28} />,
                  title: "Don't Know What Treatment You Need?",
                  desc: "Free consultation — our specialist diagnoses your condition, explains everything in plain language, and presents all options clearly.",
                },
                {
                  icon: <Award size={28} />,
                  title: "Worried About Cost?",
                  desc: "Affordable pricing with a fully transparent fee structure. We hand you a written treatment plan before anything begins — no surprises.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="fade-in p-6 md:p-8 rounded-2xl border-2 border-blue-50 hover:border-blue-200 transition-all duration-300 group"
                  style={{
                    background:
                      "linear-gradient(to bottom right, white, #f0f7ff)",
                  }}
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-md text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: "#2B7CC1" }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="font-bold text-base md:text-lg mb-2 md:mb-3"
                    style={{ color: "#1A3A5C" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section
          className="py-12 md:py-16"
          style={{
            background: "linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)",
          }}
        >
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              <StatCounter target={1500} suffix="+" label="Patients Treated" />
              <StatCounter target={15} suffix="+" label="Years of Excellence" />
              <StatCounter target={2} suffix="" label="Branches in Dhaka" />
              <StatCounter target={5} suffix="" label="Int'l Certifications" />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          className="py-14 md:py-20"
          style={{ backgroundColor: "#EBF4FF" }}
        >
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <span
                className="badge mb-3"
                style={{ backgroundColor: "#D6E9FF", color: "#2268A8" }}
              >
                Our Specialties
              </span>
              <h2 className="section-title fade-in">
                World-Class Dental Care Under One Roof
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto fade-in px-4">
                From routine cleanings to complex maxillofacial surgery — every
                level of care with precision and compassion.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.slice(0, 6).map((s, i) => (
                <ServiceCard
                  key={s.id}
                  title={s.title}
                  slug={s.slug}
                  icon={s.icon}
                  shortDesc={s.shortDesc}
                  index={i}
                />
              ))}
            </div>
            <div className="text-center mt-8 md:mt-10">
              <Link to="/services" className="btn-outline inline-flex">
                View All Services <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* BEFORE/AFTER */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <span
                className="badge mb-3"
                style={{ backgroundColor: "#fff0eb", color: "#FF6B35" }}
              >
                Transformations
              </span>
              <h2 className="section-title fade-in">
                Real Patients. Real Results.
              </h2>
              <p className="section-subtitle max-w-xl mx-auto fade-in px-4">
                Drag the slider to see the life-changing results our patients
                experience.
              </p>
            </div>
            <div className="max-w-3xl mx-auto fade-in">
              <BeforeAfterSlider
                before="https://images.pexels.com/photos/3845623/pexels-photo-3845623.jpeg"
                after="https://images.pexels.com/photos/3762468/pexels-photo-3762468.jpeg"
              />
            </div>
            <p className="text-center text-gray-400 text-sm mt-3">
              Drag slider to compare
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          className="py-14 md:py-20"
          style={{ backgroundColor: "#EBF4FF" }}
        >
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <span
                className="badge mb-3"
                style={{ backgroundColor: "#D6E9FF", color: "#2268A8" }}
              >
                Patient Reviews
              </span>
              <h2 className="section-title fade-in">What Our Patients Say</h2>
              <div className="flex justify-center items-center gap-1.5 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-gray-600 text-sm ml-2">
                  4.9/5 from 200+ reviews
                </span>
              </div>
            </div>
            <TestimonialSlider />
          </div>
        </section>

        {/* DOCTOR SPOTLIGHT */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="fade-in order-2 lg:order-1">
                <div className="relative max-w-sm mx-auto lg:max-w-none">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src="/AslamProfile.jpeg"
                      alt="Dr. Aslam Al Mehdi"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap size={16} style={{ color: "#2B7CC1" }} />
                      <span
                        className="font-bold text-xs"
                        style={{ color: "#1A3A5C" }}
                      >
                        BMDC Reg. No. 871
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Bangladesh Medical & Dental Council
                    </p>
                  </div>
                </div>
              </div>
              <div className="fade-in order-1 lg:order-2">
                <span
                  className="badge mb-4"
                  style={{ backgroundColor: "#D6E9FF", color: "#2268A8" }}
                >
                  Meet Your Specialist
                </span>
                <h2 className="section-title mb-2">Prof. Dr. Aslam Almehdi</h2>
                <p
                  className="inline-flex items-center text-sm md:text-base font-semibold mb-3 px-3 py-1.5 rounded-full border"
                  style={{
                    color: "#FF6B35",
                    backgroundColor: "#fff3ed",
                    borderColor: "#ffd9c9",
                  }}
                >
                  Best Dental & Maxillofacial Surgeon in Dhaka
                </p>

                <p
                  className="font-semibold mb-5 md:mb-6"
                  style={{ color: "#2B7CC1" }}
                >
                  Oral & Maxillofacial Surgeon | Periodontist
                </p>
                <div className="space-y-2 mb-6 md:mb-8">
                  {[
                    {
                      flag: "🇯🇵",
                      text: "Ph.D. (Periodontal Plastic Surgery) — Tokyo, Japan",
                    },
                    {
                      flag: "🇰🇷",
                      text: "MS (Oral & Maxillofacial Surgery) — Seoul, Korea",
                    },
                    {
                      flag: "🇬🇧",
                      text: "FIAOO — Fellow of Int'l Academy of Oral Oncology, UK",
                    },
                    {
                      flag: "🇺🇸",
                      text: "FICD — Fellow of Int'l College of Dentists, USA",
                    },
                    { flag: "🇦🇺", text: "Postdoctoral Research — Australia" },
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-lg flex-shrink-0">{c.flag}</span>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {c.text}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
                  With over 15 years of clinical experience and training across
                  four continents, Dr. Aslam brings world-class expertise to
                  every patient.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/book"
                    className="btn-primary justify-center sm:justify-start"
                  >
                    Book with Dr. Aslam <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/doctor/aslam-al-mehdi"
                    className="btn-outline justify-center sm:justify-start"
                  >
                    Full Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG PREVIEW */}
        {posts.length > 0 && (
          <section
            className="py-14 md:py-20"
            style={{ backgroundColor: "#EBF4FF" }}
          >
            <div className="container-custom">
              <div className="text-center mb-10 md:mb-12">
                <span
                  className="badge mb-3"
                  style={{ backgroundColor: "#D6E9FF", color: "#2268A8" }}
                >
                  Knowledge Hub
                </span>
                <h2 className="section-title fade-in">
                  Dental Health Insights
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {posts.map((post, i) => (
                  <BlogCard key={post.slug} {...post} index={i} />
                ))}
              </div>
              <div className="text-center mt-8 md:mt-10">
                <Link to="/blog" className="btn-outline inline-flex">
                  View All Articles <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA BANNER */}
        <section
          className="py-14 md:py-20"
          style={{
            background: "linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)",
          }}
        >
          <div className="container-custom text-center px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 fade-in">
              Your Smile Transformation is
              <br className="hidden md:block" /> One Appointment Away
            </h2>
            <p
              className="mb-6 md:mb-8 max-w-xl mx-auto fade-in text-base md:text-lg"
              style={{ color: "#bfdbfe" }}
            >
              Limited consultation slots available this week. Book now before
              they fill up.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center fade-in">
              <Link
                to="/book"
                className="btn-primary text-sm md:text-base px-6 md:px-8 py-3 md:py-4 shadow-xl"
              >
                Book Free Consultation
              </Link>
              <a
                href="tel:+8801711780957"
                className="btn-secondary text-sm md:text-base px-6 md:px-8 py-3 md:py-4"
              >
                <Phone size={16} /> Call 01711-780957
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
