import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-2">
        <a href="tel:+8801711780957" className="flex items-center justify-center gap-2 py-4 font-bold text-sm transition-colors" style={{ color: '#1A3A5C' }}>
          <Phone size={18} style={{ color: '#2B7CC1' }} />Call Now
        </a>
        <Link to="/book" className="flex items-center justify-center gap-2 py-4 text-white font-bold text-sm transition-colors" style={{ backgroundColor: '#FF6B35' }}>
          <Calendar size={18} />Book Now
        </Link>
      </div>
    </div>
  );
}
