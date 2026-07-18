import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Globe, Facebook, Instagram, Youtube, MessageCircle, ArrowRight } from 'lucide-react';
import {
  locations,
  telHref,
  websiteLabel,
  CLINIC_NAME,
  CLINIC_TAGLINE,
} from '../data/locations';

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/bcfc.org', Icon: Facebook },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'YouTube', href: '#', Icon: Youtube },
];

const quickLinks: [string, string][] = [
  ['About Us', '/about'],
  ['Our Services', '/services'],
  ['Doctor Profile', '/doctor/aslam-al-mehdi'],
  ['Gallery', '/gallery'],
  ['Blog', '/blog'],
  ['Locations', '/locations'],
  ['Book Appointment', '/book'],
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1A3A5C', color: 'white' }}>
      <div className="container-custom py-12 md:py-16">
        {/* Brand + Quick Links + Get in touch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 md:mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex-shrink-0">
                <img src="/logo.jpeg" alt="Banani Clinic logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-sm text-white leading-tight">{CLINIC_NAME}</div>
                <div className="font-bold text-sm text-white leading-tight">{CLINIC_TAGLINE}</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-md" style={{ color: '#bfdbfe' }}>
              Dhaka's most trusted oral & maxillofacial surgery clinic.
              International-grade care, local heart.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href === '#' ? undefined : '_blank'}
                  rel={href === '#' ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2B7CC1')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(([label, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm flex items-center gap-1.5 hover:text-white transition-colors"
                    style={{ color: '#bfdbfe' }}
                  >
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#5BA5FF' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href={telHref('01711780957')}
                className="text-sm flex items-center gap-2 hover:text-white transition-colors"
                style={{ color: '#bfdbfe' }}
              >
                <Phone size={15} style={{ color: '#5BA5FF' }} /> 01711-780957
              </a>
              <a
                href="https://wa.me/8801711780957?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20treatment."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <Link to="/book" className="btn-primary text-sm px-4 py-2.5 w-full justify-center">
                Book Appointment <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Our Locations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((loc) => (
              <div key={loc.name}>
                <h4 className="font-bold text-white text-sm mb-3">{loc.name}</h4>
                <div className="space-y-2.5">
                  <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}>
                    <MapPin size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#5BA5FF' }} />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}>
                    <Clock size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#5BA5FF' }} />
                    <span>Visiting Hours: {loc.hours}</span>
                  </div>
                  <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}>
                    <Phone size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#5BA5FF' }} />
                    <div>
                      {loc.phones.map((p) => (
                        <a key={p} href={telHref(p)} className="block hover:text-white transition-colors">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2.5 text-sm" style={{ color: '#bfdbfe' }}>
                    <Globe size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#5BA5FF' }} />
                    <a href={loc.website} target="_blank" rel="noopener noreferrer" className="break-all hover:text-white transition-colors">
                      {websiteLabel(loc.website)}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div
          className="container-custom py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-center sm:text-left"
          style={{ color: '#93c5fd' }}
        >
          <span>
            © {new Date().getFullYear()} {CLINIC_NAME}. All rights reserved.
          </span>
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
