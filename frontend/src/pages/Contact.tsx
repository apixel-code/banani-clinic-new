import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "../components/Toast";
import api from "../lib/api";
import { buildTitle } from "../utils/seoHelpers";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    preferred_date: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    ref.current
      .querySelectorAll(".fade-in")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast("Name and phone number are required.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await api.submitContact({
        name: form.name,
        phone: form.phone,
        email: form.email,
        preferred_date: form.preferred_date || null,
        message: form.message,
      });
      setSubmitting(false);
      setSuccess(true);
      toast("Message sent! We will contact you shortly.", "success");
    } catch (err) {
      setSubmitting(false);
      toast("Failed to send message. Please try again.", "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>{buildTitle("Contact Us – Get in Touch")}</title>
        <meta
          name="description"
          content="Contact Banani Clinic. Call, email, or send a message to reach Dr. Aslam Al Mehdi's team. Two chambers in Banani, Dhaka."
        />
      </Helmet>
      <div ref={ref}>
        <section
          className="relative py-28 md:py-36"
          style={{
            background: "linear-gradient(135deg, #1A3A5C 0%, #2B7CC1 100%)",
          }}
        >
          <div className="container-custom text-center">
            <span
              className="badge mb-4 border border-white/30"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#bfdbfe",
              }}
            >
              Contact
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 fade-in">
              Get in Touch
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto fade-in"
              style={{ color: "#bfdbfe" }}
            >
              Questions about treatment? Want to book? Reach out — we will
              respond within one business day.
            </p>
          </div>
        </section>

        <section
          className="py-14 md:py-20"
          style={{ backgroundColor: "#EBF4FF" }}
        >
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact info */}
              <div className="fade-in space-y-5">
                {[
                  {
                    icon: <Phone size={22} />,
                    title: "Main Chamber",
                    lines: ["01711-780957", "01711-780958"],
                    href: "tel:+8801711780957",
                  },
                  {
                    icon: <Phone size={22} />,
                    title: "York Hospital Branch",
                    lines: ["01711-780957", "01711-780958"],
                    href: "tel:+8801711780957",
                  },
                  {
                    icon: <Mail size={22} />,
                    title: "Email",
                    lines: ["aslam.almehdi@gmail.com"],
                    href: "mailto:aslam.almehdi@gmail.com",
                  },
                  {
                    icon: <MapPin size={22} />,
                    title: "Main Address",
                    lines: [
                      "House #116, Road # 15, Block # C, Banani",
                      "Dhaka-1213, Bangladesh",
                    ],
                    href: undefined,
                  },
                  {
                    icon: <Clock size={22} />,
                    title: "Opening Hours",
                    lines: [
                      "Main: 10:00 AM – 9:00 PM",
                      "York: 10:00 AM – 2:00 PM",
                      "Open Daily",
                    ],
                    href: undefined,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-blue-100 items-start"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: "#2B7CC1" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3
                        className="font-bold text-sm mb-1"
                        style={{ color: "#1A3A5C" }}
                      >
                        {item.title}
                      </h3>
                      {item.lines.map((line) =>
                        item.href ? (
                          <a
                            key={line}
                            href={item.href.startsWith("tel:") ? `tel:+880${line.replace(/-/g, "").slice(1)}` : item.href}
                            className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={line} className="text-sm text-gray-600">
                            {line}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                ))}
                <a
                  href="https://wa.me/8801711780957?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20treatment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white shadow-md transition-all hover:opacity-90"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle size={22} /> Chat on WhatsApp
                </a>
              </div>

              {/* Form */}
              <div className="fade-in bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100">
                {success ? (
                  <div className="text-center py-10">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white"
                      style={{ backgroundColor: "#22c55e" }}
                    >
                      <Send size={28} />
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: "#1A3A5C" }}
                    >
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We will be in touch within one business day.
                    </p>
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setForm({
                          name: "",
                          phone: "",
                          email: "",
                          preferred_date: "",
                          message: "",
                        });
                      }}
                      className="btn-outline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <h2
                      className="text-xl md:text-2xl font-bold mb-6"
                      style={{ color: "#1A3A5C" }}
                    >
                      Send Us a Message
                    </h2>
                    <div>
                      <label className="label">Full Name *</label>
                      <input
                        className="input-field"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Phone Number *</label>
                      <input
                        className="input-field"
                        placeholder="01XXXXXXXXX"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Email Address</label>
                      <input
                        className="input-field"
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="label">Preferred Visit Date</label>
                      <input
                        className="input-field"
                        type="date"
                        value={form.preferred_date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                          setForm({ ...form, preferred_date: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="label">Message</label>
                      <textarea
                        className="input-field resize-none"
                        rows={4}
                        placeholder="Describe your symptoms or questions..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center py-3.5"
                    >
                      {submitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
