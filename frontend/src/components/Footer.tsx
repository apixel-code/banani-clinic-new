import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A3A5C', color: 'white' }}>
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex-shrink-0">
                <img src="/logo.jpeg" alt="Banani Clinic logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-sm text-white leading-tight">Dental & Maxillofacial Surgery</div>
                <div className="font-bold text-sm text-white leading-tight">Banani Clinic (Specialized Hospital)</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#bfdbfe' }}>Dhaka's most trusted oral & maxillofacial surgery clinic. International-grade care, local heart.</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2B7CC1')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                ><Icon size={16} /></a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[['About Us','/about'],['Our Services','/services'],['Doctor Profile','/doctor/aslam-al-mehdi'],['Gallery','/gallery'],['Blog','/blog'],['Locations','/locations'],['Book Appointment','/book']].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm flex items-center gap-1.5 hover:text-white transition-colors" style={{ color: '#bfdbfe' }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#5BA5FF' }} />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Main Chamber</h3>
            <div className="space-y-3">
              <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}><MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#5BA5FF' }} /><span>House #78/E, Road #12, Banani, Dhaka-1213</span></div>
              <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}><Phone size={15} className="flex-shrink-0" style={{ color: '#5BA5FF' }} /><div><a href="tel:+8801311129952" className="hover:text-white block">01311-129952</a><a href="tel:+8801311129953" className="hover:text-white block">01311-129953</a></div></div>
              <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}><Clock size={15} className="flex-shrink-0" style={{ color: '#5BA5FF' }} /><span>10:00 AM – 9:00 PM</span></div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">York Hospital Branch</h3>
            <div className="space-y-3">
              <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}><MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#5BA5FF' }} /><span>House #12 & 13, Road #22, Block K, Banani, Dhaka-1213</span></div>
              <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}><Phone size={15} className="flex-shrink-0" style={{ color: '#5BA5FF' }} /><div><a href="tel:+8801711780957" className="hover:text-white block">01711-780957</a><a href="tel:+8801711780958" className="hover:text-white block">01711-780958</a></div></div>
              <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}><Clock size={15} className="flex-shrink-0" style={{ color: '#5BA5FF' }} /><span>10:00 AM – 2:00 PM</span></div>
              <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}><Mail size={15} className="flex-shrink-0" style={{ color: '#5BA5FF' }} /><a href="mailto:aslam.almehdi@gmail.com" className="hover:text-white break-all">aslam.almehdi@gmail.com</a></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="container-custom py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-center sm:text-left" style={{ color: '#93c5fd' }}>
          <span>© {new Date().getFullYear()} Banani Clinic (Specialized Hospital). All rights reserved.</span>
          <span>
            Developed by{' '}
            <a
              href="https://www.apixel.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:underline"
            >
              Apixel
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
