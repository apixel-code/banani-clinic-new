import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "Dental Implants", path: "/services/dental-implants" },
      { label: "Root Canal", path: "/services/root-canal-treatment" },
      { label: "Cosmetic Dentistry", path: "/services/cosmetic-dentistry" },
      {
        label: "Periodontal Surgery",
        path: "/services/periodontal-plastic-surgery",
      },
      {
        label: "Maxillofacial Surgery",
        path: "/services/oral-maxillofacial-surgery",
      },
      { label: "All Services →", path: "/services" },
    ],
  },
  { label: "Our Doctors", path: "/doctors" },
  { label: "Gallery", path: "/gallery" },
  { label: "Blog", path: "/blog" },
  { label: "Locations", path: "/locations" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      // Prevent scroll on both html and body
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll on both html and body
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const solid = true;
  const isActiveLink = (path: string) =>
    location.pathname === path ||
    (path === "/doctors" && location.pathname.startsWith("/doctor/"));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden bg-white shadow-md flex-shrink-0"
            >
              <img
                src="/logo.jpeg"
                alt="Banani Clinic logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="block min-w-0 max-w-[190px] sm:max-w-[240px] lg:max-w-[260px]">
              <div
                className={`font-bold text-[10px] sm:text-xs md:text-sm leading-tight transition-colors ${solid ? "text-navy-DEFAULT" : "text-white"}`}
                style={{ color: solid ? "#1A3A5C" : "white" }}
              >
                Dental & Maxillofacial Surgery
              </div>
              <div
                className="text-[9px] sm:text-[10px] md:text-xs leading-tight"
                style={{ color: solid ? "#8A9BB0" : "#bfdbfe" }}
              >
                Banani Clinic (Specialized Hospital)
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.path} className="relative group">
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${solid ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                  >
                    {link.label} <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActiveLink(link.path)
                      ? solid
                        ? "text-blue-600 bg-blue-50"
                        : "text-white bg-white/20"
                      : solid
                        ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="tel:+8801711780957"
              className={`hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors ${solid ? "text-gray-800" : "text-white"}`}
            >
              <Phone size={14} />
              <span className="hidden xl:inline">01711-780957</span>
            </a>
            <Link
              to="/book"
              className="hidden md:inline-flex btn-primary text-sm px-4 py-2.5"
            >
              Book Now 
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${solid ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <nav className="container-custom py-4 space-y-1 pb-24">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.path}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full flex items-center justify-between px-4 py-4 font-semibold text-base hover:bg-blue-50 rounded-xl"
                    style={{ color: "#1A3A5C" }}
                  >
                    {link.label}
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="pl-4 space-y-1 pb-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-4 rounded-xl font-semibold text-base transition-colors ${isActiveLink(link.path) ? "text-blue-600 bg-blue-50" : "text-gray-800 hover:text-blue-600 hover:bg-blue-50"}`}
                >
                  {link.label}
                </Link>
              ),
            )}
            <div className="pt-4 border-t border-gray-100 space-y-3 mt-4">
              <a
                href="tel:+8801711780957"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 font-bold text-base"
                style={{ borderColor: "#2B7CC1", color: "#2B7CC1" }}
              >
                <Phone size={18} /> Call 01711-780957
              </a>
              <Link
                to="/book"
                className="btn-primary flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-base"
              >
                Book Appointment
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
