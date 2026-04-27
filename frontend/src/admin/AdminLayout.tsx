import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, FileText, Image, MessageSquare, LogOut, Menu, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} />, exact: true },
  { path: '/admin/appointments', label: 'Appointments', icon: <Calendar size={18} /> },
  { path: '/admin/blog', label: 'Blog Posts', icon: <FileText size={18} /> },
  { path: '/admin/gallery', label: 'Gallery', icon: <Image size={18} /> },
  { path: '/admin/contacts', label: 'Contacts', icon: <MessageSquare size={18} /> },
];

export default function AdminLayout() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (!user) { navigate('/admin/login'); return null; }

  const currentTitle = navItems.find((n) => n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path))?.label || 'Admin';

  const handleSignOut = async () => { await signOut(); navigate('/admin/login'); };

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ backgroundColor: '#2B7CC1' }}>RD</div>
        <div>
          <div className="font-bold text-white text-sm leading-tight">Banani Clinic</div>
          <div className="text-xs" style={{ color: '#93c5fd' }}>Admin Panel</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.exact} onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-blue-200 hover:text-white hover:bg-white/10'}`}
            style={({ isActive }) => isActive ? { backgroundColor: 'rgba(43,124,193,0.4)' } : undefined}
          >
            {item.icon}{item.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link to="/" target="_blank" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:text-white hover:bg-white/10 transition-colors">
          <ExternalLink size={16} /> View Website
        </Link>
        <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:text-white hover:bg-white/10 transition-colors w-full">
          <LogOut size={16} /> Sign Out
        </button>
        <div className="px-4 py-2 text-xs truncate" style={{ color: '#93c5fd' }}>{user.email}</div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 fixed left-0 top-0 h-full z-30" style={{ backgroundColor: '#1A3A5C' }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-50 flex flex-col w-72 h-full" style={{ backgroundColor: '#1A3A5C' }}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 h-16 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Menu size={20} />
            </button>
            <h1 className="font-bold text-base md:text-lg" style={{ color: '#1A3A5C' }}>{currentTitle}</h1>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
