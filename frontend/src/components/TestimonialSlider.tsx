import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Rafiqul Islam', treatment: 'Dental Implant', rating: 5, text: 'Dr. Aslam Al Mehdi is very professional and skilled. The treatment was completely painless. I was terrified of dentists before, but now I smile without hesitation. Highly recommend this clinic.', location: 'Gulshan, Dhaka' },
  { name: 'Nasrin Akter', treatment: 'Root Canal Treatment', rating: 5, text: 'He explained my problem clearly and suggested the best treatment. I had severe tooth pain for months and was afraid of procedures. The root canal was done painlessly and I felt relief immediately.', location: 'Mirpur, Dhaka' },
  { name: 'Mohammad Hasan', treatment: 'Cosmetic Dentistry', rating: 5, text: 'I had stained teeth for years and avoided smiling in photos. After my cosmetic treatment at Banani Clinic, my confidence has completely transformed. Results exceeded expectations.', location: 'Uttara, Dhaka' },
  { name: 'Tahmina Begum', treatment: 'Periodontal Surgery', rating: 5, text: "World-class treatment at an affordable price. Dr. Aslam's international expertise is evident in every step. The clinic is clean and modern. Staff are very courteous and helpful.", location: 'Dhanmondi, Dhaka' },
];

export default function TestimonialSlider() {
  const scrollingTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden">
      <style>{`
        @keyframes reviewsMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .reviews-track {
          animation: reviewsMarquee 32s linear infinite;
        }
        .reviews-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#EBF4FF] to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#EBF4FF] to-transparent md:w-28" />

      <div className="reviews-track flex w-max gap-4 py-2 md:gap-5">
        {scrollingTestimonials.map((testimonial, index) => (
          <article
            key={`${testimonial.name}-${index}`}
            className="w-[300px] rounded-2xl border border-blue-100 bg-white p-5 shadow-sm md:w-[380px] md:p-6"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={17}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="mb-5 line-clamp-5 text-sm leading-relaxed text-gray-600 md:text-base">
              "{testimonial.text}"
            </blockquote>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold"
                style={{ backgroundColor: '#EBF4FF', color: '#2B7CC1' }}
              >
                {testimonial.name[0]}
              </div>
              <div>
                <div
                  className="text-sm font-bold md:text-base"
                  style={{ color: '#1A3A5C' }}
                >
                  {testimonial.name}
                </div>
                <div className="text-xs text-gray-400 md:text-sm">
                  {testimonial.treatment} · {testimonial.location}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
