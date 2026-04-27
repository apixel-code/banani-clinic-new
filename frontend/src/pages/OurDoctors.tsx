import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Phone, Stethoscope } from "lucide-react";
import { getDoctors } from "../lib/api";
import { buildTitle } from "../utils/seoHelpers";

const fallbackDoctors = [
  {
    name: "Dr. Aslam Al Mehdi",
    slug: "aslam-al-mehdi",
    badge: "Chief Surgeon",
    designation: "Oral & Maxillofacial Surgeon | Periodontist | Oral Oncologist",
    short_bio:
      "Internationally trained oral and maxillofacial surgeon with 15+ years of clinical experience.",
    photo_url: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
    phone: "+8801311129952",
    expertise: ["Dental Implantology", "Periodontal Surgery", "Oral & Maxillofacial Surgery"],
  },
];

function getDoctorKey(doctor: any) {
  return doctor._id || doctor.id || doctor.slug;
}

export default function OurDoctors() {
  const [doctors, setDoctors] = useState<any[]>(fallbackDoctors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getDoctors()
      .then((data) => {
        if (!active) return;
        setDoctors(data?.length ? data : fallbackDoctors);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setDoctors(fallbackDoctors);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{buildTitle("Our Doctors")}</title>
        <meta
          name="description"
          content="Meet the doctors at Banani Clinic and view each doctor's profile, expertise and credentials."
        />
      </Helmet>

      <section
        className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0F2238 0%, #1A3A5C 45%, #2B7CC1 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.12 }}
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span
              className="badge mb-4 border border-white/30"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#bfdbfe" }}
            >
              Our Doctors
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Meet Our Specialist Doctors
            </h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "#bfdbfe" }}>
              Experienced clinicians providing focused dental, oral surgery and maxillofacial care at Banani Clinic.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20" style={{ backgroundColor: "#EBF4FF" }}>
        <div className="container-custom">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {doctors.map((doctor) => (
                <Link
                  key={getDoctorKey(doctor)}
                  to={`/doctor/${doctor.slug}`}
                  className="group bg-white rounded-2xl border border-blue-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    {doctor.photo_url ? (
                      <img
                        src={doctor.photo_url}
                        alt={doctor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Stethoscope size={44} style={{ color: "#2B7CC1" }} />
                      </div>
                    )}
                    <div className="absolute left-4 top-4">
                      <span
                        className="badge text-xs border border-white/30"
                        style={{ backgroundColor: "rgba(26,58,92,0.82)", color: "white" }}
                      >
                        {doctor.badge || "Doctor"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <h2 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors" style={{ color: "#1A3A5C" }}>
                      {doctor.name}
                    </h2>
                    <p className="text-sm font-semibold mb-3" style={{ color: "#2B7CC1" }}>
                      {doctor.designation}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                      {doctor.short_bio || "View profile, credentials and areas of expertise."}
                    </p>

                    {doctor.expertise?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {doctor.expertise.slice(0, 3).map((item: string) => (
                          <span
                            key={item}
                            className="text-xs font-semibold px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: "#EBF4FF", color: "#2268A8" }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                      {doctor.phone ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                          <Phone size={13} />
                          {doctor.phone}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-gray-400">View profile</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: "#FF6B35" }}>
                        Details <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
