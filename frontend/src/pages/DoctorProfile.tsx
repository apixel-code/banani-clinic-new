import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Award, CheckCircle, ArrowRight } from "lucide-react";
import { getDoctorBySlug } from "../lib/api";
import { buildTitle, DOCTOR_SCHEMA } from "../utils/seoHelpers";

const fallbackDoctor = {
  name: "Dr. Aslam Al Mehdi",
  slug: "aslam-al-mehdi",
  badge: "Chief Surgeon",
  designation: "Oral & Maxillofacial Surgeon | Periodontist | Oral Oncologist",
  short_bio:
    "Dhaka's leading oral and maxillofacial surgeon with international training and 15+ years of clinical experience.",
  photo_url: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
  phone: "+8801711780957",
  biography: [
    "Dr. Aslam Al Mehdi is one of Bangladesh's most distinguished oral and maxillofacial surgeons. With a Ph.D. from Tokyo Medical and Dental University and an MS from Seoul National University, he brings an unparalleled depth of international training to his practice at Banani Clinic.",
    "His academic journey began in Dhaka before taking him to the Korean Peninsula for his master's degree in oral surgery, then to Tokyo for his doctorate. He has conducted postdoctoral research in Australia and holds active fellowships from the International Academy of Oral Oncology and the International College of Dentists.",
    "Despite his extensive international credentials, Dr. Aslam's philosophy is deeply rooted in accessibility. He founded Banani Clinic on the principle that every Bangladeshi patient deserves the same quality of care available internationally, without compromising on compassion or affordability.",
    "Over 15 years of clinical practice, he has treated more than 1500 patients across the full spectrum of oral health, from routine extractions to complex maxillofacial reconstruction and oral cancer surgery.",
  ],
  credentials: [
    { flag: "JP", degree: "Ph.D. - Periodontal Plastic Surgery", institution: "Tokyo Medical and Dental University", year: "2014" },
    { flag: "KR", degree: "MS - Oral & Maxillofacial Surgery", institution: "Seoul National University", year: "2011" },
    { flag: "GB", degree: "FIAOO - Fellow, Intl Academy of Oral Oncology", institution: "London, United Kingdom", year: "2016" },
    { flag: "US", degree: "FICD - Fellow, Intl College of Dentists", institution: "Washington D.C., USA", year: "2018" },
  ],
  expertise: [
    "Dental Implantology",
    "Periodontal Plastic Surgery",
    "Oral & Maxillofacial Surgery",
    "Cosmetic Smile Design",
    "Cleft Lip & Palate Repair",
    "Oral Cancer Diagnosis & Surgery",
    "TMJ Disorder Management",
    "Digital Treatment Planning",
  ],
  stats: [
    { value: "1500+", label: "Patients Treated" },
    { value: "15+", label: "Years Experience" },
    { value: "5", label: "Intl Fellowships" },
    { value: "4", label: "Countries Trained" },
  ],
  details: [
    { label: "Registration", value: "BMDC No. 871" },
    { label: "Experience", value: "15+ Years" },
    { label: "Languages", value: "Bengali, English, Japanese" },
    { label: "Specialties", value: "Implants, Periodontics, OMS" },
  ],
};

function normalizeDoctor(doctor: any) {
  return {
    ...fallbackDoctor,
    ...doctor,
    biography: doctor?.biography?.length ? doctor.biography : fallbackDoctor.biography,
    credentials: doctor?.credentials?.length ? doctor.credentials : fallbackDoctor.credentials,
    expertise: doctor?.expertise?.length ? doctor.expertise : fallbackDoctor.expertise,
    stats: doctor?.stats?.length ? doctor.stats : fallbackDoctor.stats,
    details: doctor?.details?.length ? doctor.details : fallbackDoctor.details,
    photo_url: doctor?.photo_url || fallbackDoctor.photo_url,
    phone: doctor?.phone || fallbackDoctor.phone,
  };
}

export default function DoctorProfile() {
  const { slug } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const [doctor, setDoctor] = useState<any>(fallbackDoctor);

  useEffect(() => {
    let active = true;
    getDoctorBySlug(slug || "aslam-al-mehdi")
      .then((data) => {
        if (active) setDoctor(normalizeDoctor(data));
      })
      .catch(() => {
        if (active) setDoctor(fallbackDoctor);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    ref.current.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [doctor]);

  const schema = {
    ...DOCTOR_SCHEMA,
    name: doctor.name,
    jobTitle: doctor.designation,
    image: doctor.photo_url,
    telephone: doctor.phone,
  };

  return (
    <>
      <Helmet>
        <title>{buildTitle(`${doctor.name} - ${doctor.designation || "Doctor"}`)}</title>
        <meta name="description" content={doctor.short_bio || `${doctor.name} at Banani Clinic.`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div ref={ref}>
        <section
          className="relative py-28 md:py-36 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0F2238 0%, #1A3A5C 40%, #2B7CC1 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <img src={doctor.photo_url} alt="" className="w-full h-full object-cover" style={{ opacity: 0.1 }} />
          </div>
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="fade-in">
                <span
                  className="badge mb-4 border border-white/30"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#bfdbfe" }}
                >
                  {doctor.badge}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">{doctor.name}</h1>
                <p className="font-semibold text-lg mb-6" style={{ color: "#93c5fd" }}>
                  {doctor.designation}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {doctor.credentials.slice(0, 5).map((credential: any, index: number) => (
                    <span
                      key={`${credential.degree}-${index}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white" }}
                    >
                      {credential.degree}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/book" className="btn-primary">
                    Book Appointment <ArrowRight size={16} />
                  </Link>
                  {doctor.phone && (
                    <a href={`tel:${doctor.phone}`} className="btn-secondary">
                      {doctor.phone}
                    </a>
                  )}
                </div>
              </div>
              <div className="fade-in hidden lg:block">
                <div className="aspect-[3/4] max-w-xs mx-auto rounded-3xl overflow-hidden shadow-2xl">
                  <img src={doctor.photo_url} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 bg-white border-b border-gray-100">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {doctor.stats.map((stat: any, index: number) => (
                <div key={`${stat.label}-${index}`}>
                  <div className="text-3xl md:text-4xl font-extrabold mb-1" style={{ color: "#2B7CC1" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20" style={{ backgroundColor: "#EBF4FF" }}>
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
              <div className="lg:col-span-2 space-y-5 fade-in">
                <h2 className="section-title">Biography</h2>
                {doctor.biography.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="fade-in space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: "#1A3A5C" }}>
                    Clinic Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    {doctor.details.map((detail: any, index: number) => (
                      <div key={`${detail.label}-${index}`}>
                        <span className="font-semibold" style={{ color: "#1A3A5C" }}>
                          {detail.label}:
                        </span>
                        <span className="text-gray-600 ml-2">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/book" className="btn-primary w-full justify-center">
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <span className="badge mb-3" style={{ backgroundColor: "#D6E9FF", color: "#2268A8" }}>
                Education & Credentials
              </span>
              <h2 className="section-title fade-in">International Academic Excellence</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {doctor.credentials.map((credential: any, index: number) => (
                <div
                  key={`${credential.degree}-${index}`}
                  className="fade-in bg-white border-2 border-blue-50 hover:border-blue-200 rounded-2xl p-5 md:p-6 transition-all hover:shadow-md"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="text-2xl mb-3">{credential.flag}</div>
                  <div className="font-bold text-sm md:text-base mb-1" style={{ color: "#1A3A5C" }}>
                    {credential.degree}
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 mb-1">{credential.institution}</div>
                  <div className="text-xs font-semibold" style={{ color: "#2B7CC1" }}>
                    {credential.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20" style={{ backgroundColor: "#EBF4FF" }}>
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="section-title fade-in">Areas of Expertise</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {doctor.expertise.map((item: string, index: number) => (
                <div
                  key={`${item}-${index}`}
                  className="fade-in flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CheckCircle size={18} className="flex-shrink-0" style={{ color: "#2B7CC1" }} />
                  <span className="text-sm font-medium" style={{ color: "#1A3A5C" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20" style={{ background: "linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)" }}>
          <div className="container-custom text-center">
            <Award size={40} className="text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 fade-in">
              Book a Consultation with {doctor.name}
            </h2>
            <p className="mb-6 max-w-xl mx-auto fade-in" style={{ color: "#bfdbfe" }}>
              {doctor.short_bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/book" className="btn-primary px-8 py-4">
                Book Appointment
              </Link>
              <Link to="/services" className="btn-secondary px-8 py-4">
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
