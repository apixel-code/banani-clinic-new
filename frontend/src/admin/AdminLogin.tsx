import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { setError('Invalid email or password. Please try again.'); return; }
    navigate('/admin');
  };

  return (
    <>
      <Helmet><title>Admin Login – Banani Clinic</title></Helmet>
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)' }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white" style={{ backgroundColor: '#2B7CC1' }}>
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#1A3A5C' }}>Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Banani Clinic – Staff Access Only</p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>}
            <div>
              <label className="label">Email Address</label>
              <input className="input-field" type="email" placeholder="admin@bananiclinic.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input className="input-field pr-12" type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
