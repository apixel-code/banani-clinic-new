import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileCTABar from './components/MobileCTABar';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import OurDoctors from './pages/OurDoctors';
import DoctorProfile from './pages/DoctorProfile';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import NotFound from './pages/NotFound';

import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ManageAppointments from './admin/ManageAppointments';
import ManageDoctors from './admin/ManageDoctors';
import ManageBlog from './admin/ManageBlog';
import ManageGallery from './admin/ManageGallery';
import ManageContacts from './admin/ManageContacts';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCTABar />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
              <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
              <Route path="/doctors" element={<PublicLayout><OurDoctors /></PublicLayout>} />
              <Route path="/doctor/aslam-al-mehdi" element={<PublicLayout><DoctorProfile /></PublicLayout>} />
              <Route path="/doctor/:slug" element={<PublicLayout><DoctorProfile /></PublicLayout>} />
              <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
              <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
              <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
              <Route path="/locations" element={<PublicLayout><Locations /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/book" element={<PublicLayout><BookAppointment /></PublicLayout>} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="appointments" element={<ManageAppointments />} />
                <Route path="doctors" element={<ManageDoctors />} />
                <Route path="blog" element={<ManageBlog />} />
                <Route path="gallery" element={<ManageGallery />} />
                <Route path="contacts" element={<ManageContacts />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
