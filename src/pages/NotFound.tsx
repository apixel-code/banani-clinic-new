import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 – Page Not Found | Banani Clinic</title></Helmet>
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
        <div className="text-center max-w-lg">
          <div className="text-7xl md:text-8xl font-extrabold mb-4 leading-none" style={{ color: 'rgba(255,255,255,0.2)' }}>404</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="mb-8 leading-relaxed text-sm md:text-base" style={{ color: '#bfdbfe' }}>The page you are looking for does not exist. But a healthy smile is just one click away.</p>
          <Link to="/" className="btn-primary px-8"><ArrowLeft size={16} /> Back to Home</Link>
        </div>
      </div>
    </>
  );
}
