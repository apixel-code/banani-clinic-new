import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  { name: 'Rafiqul Islam', treatment: 'Dental Implant', rating: 5, text: 'Dr. Aslam Al Mehdi is very professional and skilled. The treatment was completely painless. I was terrified of dentists before, but now I smile without hesitation. Highly recommend this clinic.', location: 'Gulshan, Dhaka' },
  { name: 'Nasrin Akter', treatment: 'Root Canal Treatment', rating: 5, text: 'He explained my problem clearly and suggested the best treatment. I had severe tooth pain for months and was afraid of procedures. The root canal was done painlessly and I felt relief immediately.', location: 'Mirpur, Dhaka' },
  { name: 'Mohammad Hasan', treatment: 'Cosmetic Dentistry', rating: 5, text: 'I had stained teeth for years and avoided smiling in photos. After my cosmetic treatment at Banani Clinic, my confidence has completely transformed. Results exceeded expectations.', location: 'Uttara, Dhaka' },
  { name: 'Tahmina Begum', treatment: 'Periodontal Surgery', rating: 5, text: "World-class treatment at an affordable price. Dr. Aslam's international expertise is evident in every step. The clinic is clean and modern. Staff are very courteous and helpful.", location: 'Dhanmondi, Dhaka' },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (dir: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent((c) => (c + dir + testimonials.length) % testimonials.length); setAnimating(false); }, 200);
  };

  useEffect(() => { const t = setInterval(() => go(1), 5000); return () => clearInterval(t); }, []);

  return (
    <div className="relative">
      <div className={`transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl mx-auto">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonials[current].rating }).map((_, i) => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
          </div>
          <blockquote className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 italic">"{testimonials[current].text}"</blockquote>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0" style={{ backgroundColor: '#EBF4FF', color: '#2B7CC1' }}>
              {testimonials[current].name[0]}
            </div>
            <div>
              <div className="font-bold text-sm md:text-base" style={{ color: '#1A3A5C' }}>{testimonials[current].name}</div>
              <div className="text-xs md:text-sm text-gray-400">{testimonials[current].treatment} · {testimonials[current].location}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
        <button onClick={() => go(-1)} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all" style={{ color: '#1A3A5C' }}><ChevronLeft size={20} /></button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all duration-300" style={{ width: i === current ? 24 : 10, height: 10, backgroundColor: i === current ? '#2B7CC1' : '#ADD3FF' }} />
          ))}
        </div>
        <button onClick={() => go(1)} className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all" style={{ color: '#1A3A5C' }}><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}
