import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "../components/Toast";
import { services } from "../data/services";
import api from "../lib/api";
import { buildTitle } from "../utils/seoHelpers";

const TIMES = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
];

const STEPS = ["Patient Info", "Treatment", "Date & Time", "Confirm"];

export default function BookAppointment() {
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    patient_name: "",
    patient_phone: "",
    patient_email: "",
    patient_age: "",
    service: "",
    branch: "",
    preferred_date: "",
    preferred_time: "",
    notes: "",
  });

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
  }, [step]);

  const canNext = () => {
    if (step === 0)
      return form.patient_name.trim() && form.patient_phone.trim();
    if (step === 1) return form.service && form.branch;
    if (step === 2) return form.preferred_date && form.preferred_time;
    return true;
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      await api.submitAppointment({
        patient_name: form.patient_name,
        patient_email: form.patient_email,
        patient_phone: form.patient_phone,
        patient_age: form.patient_age,
        service: form.service,
        branch: form.branch,
        preferred_date: form.preferred_date,
        preferred_time: form.preferred_time,
        notes: form.notes,
        status: "pending",
      });
      setSubmitting(false);
      setDone(true);
    } catch (err) {
      setSubmitting(false);
      toast("Failed to submit. Please try again.", "error");
    }
  };

  if (done) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 pt-20"
        style={{ backgroundColor: "#EBF4FF" }}
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
            style={{ backgroundColor: "#22c55e" }}
          >
            <CheckCircle size={40} />
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: "#1A3A5C" }}
          >
            Appointment Requested!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you, <strong>{form.patient_name}</strong>. We have received
            your request for <strong>{form.service}</strong> on{" "}
            <strong>{form.preferred_date}</strong> at{" "}
            <strong>{form.preferred_time}</strong>.
          </p>
          <div
            className="rounded-xl p-4 mb-6 text-sm text-left"
            style={{ backgroundColor: "#EBF4FF" }}
          >
            <p className="font-semibold mb-2" style={{ color: "#1A3A5C" }}>
              What happens next:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-600">
              <li>
                Our team will call you on <strong>{form.patient_phone}</strong>{" "}
                to confirm.
              </li>
              <li>Please arrive 10 minutes before your appointment.</li>
              <li>Bring any previous dental records or X-rays if available.</li>
            </ol>
          </div>
          <button
            onClick={() => {
              setDone(false);
              setStep(0);
              setForm({
                patient_name: "",
                patient_phone: "",
                patient_email: "",
                patient_age: "",
                service: "",
                branch: "",
                preferred_date: "",
                preferred_time: "",
                notes: "",
              });
            }}
            className="btn-outline w-full justify-center"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{buildTitle("Book an Appointment")}</title>
        <meta
          name="description"
          content="Book an appointment with Dr. Aslam Al Mehdi at Banani Clinic. Choose your service, preferred date and time, and submit your request online."
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
              Appointments
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 fade-in">
              Book Your Appointment
            </h1>
            <p
              className="text-lg max-w-xl mx-auto fade-in"
              style={{ color: "#bfdbfe" }}
            >
              Fill in the form below and we will confirm your slot within hours.
            </p>
          </div>
        </section>

        <section
          className="py-10 md:py-16"
          style={{ backgroundColor: "#EBF4FF" }}
        >
          <div className="container-custom max-w-3xl">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-8 md:mb-10 fade-in">
              {STEPS.map((label, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${i < step ? "text-white" : i === step ? "text-white" : "bg-white text-gray-400 border-2 border-gray-200"}`}
                      style={{
                        backgroundColor: i <= step ? "#2B7CC1" : undefined,
                      }}
                    >
                      {i < step ? <CheckCircle size={18} /> : i + 1}
                    </div>
                    <span
                      className={`mt-1.5 text-xs font-medium hidden sm:block ${i <= step ? "text-blue-600" : "text-gray-400"}`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="flex-1 h-0.5 mx-2"
                      style={{
                        backgroundColor: i < step ? "#2B7CC1" : "#D6E9FF",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-6 md:p-8 fade-in">
              {/* Step 0 */}
              {step === 0 && (
                <div className="space-y-5">
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "#1A3A5C" }}
                  >
                    Your Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <div className="relative">
                        <User
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          className="input-field pl-10"
                          placeholder="Your full name"
                          value={form.patient_name}
                          onChange={(e) =>
                            setForm({ ...form, patient_name: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label">Phone Number *</label>
                      <div className="relative">
                        <Phone
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          className="input-field pl-10"
                          placeholder="01XXXXXXXXX"
                          value={form.patient_phone}
                          onChange={(e) =>
                            setForm({ ...form, patient_phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label">Email Address</label>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          className="input-field pl-10"
                          type="email"
                          placeholder="you@email.com"
                          value={form.patient_email}
                          onChange={(e) =>
                            setForm({ ...form, patient_email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label">Age</label>
                      <input
                        className="input-field"
                        placeholder="Your age"
                        value={form.patient_age}
                        onChange={(e) =>
                          setForm({ ...form, patient_age: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "#1A3A5C" }}
                  >
                    Select Service & Branch
                  </h2>
                  <div>
                    <label className="label mb-3">Select Treatment</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {services.map((s) => (
                        <button
                          key={s.slug}
                          onClick={() => setForm({ ...form, service: s.title })}
                          className="text-left p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200"
                          style={{
                            borderColor:
                              form.service === s.title ? "#2B7CC1" : "#D6E9FF",
                            backgroundColor:
                              form.service === s.title ? "#EBF4FF" : "white",
                            color:
                              form.service === s.title ? "#1A3A5C" : "#6b7280",
                          }}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label mb-3">Select Branch</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        {
                          key: "main",
                          name: "Main Chamber",
                          addr: "House #78/E, Road #12, Banani",
                          hours: "10AM – 9PM",
                        },
                        {
                          key: "york",
                          name: "York Hospital Branch",
                          addr: "House #12&13, Road #22, Banani",
                          hours: "10AM – 2PM",
                        },
                      ].map((b) => (
                        <button
                          key={b.key}
                          onClick={() => setForm({ ...form, branch: b.key })}
                          className="text-left p-4 rounded-xl border-2 transition-all duration-200"
                          style={{
                            borderColor:
                              form.branch === b.key ? "#2B7CC1" : "#D6E9FF",
                            backgroundColor:
                              form.branch === b.key ? "#EBF4FF" : "white",
                          }}
                        >
                          <div
                            className="font-bold text-sm mb-1"
                            style={{ color: "#1A3A5C" }}
                          >
                            {b.name}
                          </div>
                          <div className="text-xs text-gray-500">{b.addr}</div>
                          <div
                            className="text-xs font-medium mt-1"
                            style={{ color: "#2B7CC1" }}
                          >
                            {b.hours}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "#1A3A5C" }}
                  >
                    Choose Date & Time
                  </h2>
                  <div>
                    <label className="label">
                      <Calendar size={16} className="inline mr-1" />
                      Preferred Date
                    </label>
                    <input
                      className="input-field"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={form.preferred_date}
                      onChange={(e) =>
                        setForm({ ...form, preferred_date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="label mb-3">
                      <Clock size={16} className="inline mr-1" />
                      Preferred Time
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIMES.map((t) => (
                        <button
                          key={t}
                          onClick={() =>
                            setForm({ ...form, preferred_time: t })
                          }
                          className="py-2.5 rounded-xl text-xs font-semibold border-2 transition-all duration-200"
                          style={{
                            borderColor:
                              form.preferred_time === t ? "#2B7CC1" : "#D6E9FF",
                            backgroundColor:
                              form.preferred_time === t ? "#2B7CC1" : "white",
                            color:
                              form.preferred_time === t ? "white" : "#6b7280",
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label">Notes (optional)</label>
                    <textarea
                      className="input-field resize-none"
                      rows={3}
                      placeholder="Describe your symptoms or any specific concerns..."
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                    />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h2
                    className="text-xl font-bold mb-6"
                    style={{ color: "#1A3A5C" }}
                  >
                    Confirm Your Appointment
                  </h2>
                  <div
                    className="rounded-2xl p-5 md:p-6 mb-6 space-y-3"
                    style={{ backgroundColor: "#EBF4FF" }}
                  >
                    {[
                      ["Patient", form.patient_name],
                      ["Phone", form.patient_phone],
                      form.patient_email && ["Email", form.patient_email],
                      form.patient_age && ["Age", form.patient_age],
                      ["Service", form.service],
                      [
                        "Branch",
                        form.branch === "main"
                          ? "Main Chamber"
                          : "York Hospital Branch",
                      ],
                      ["Date", form.preferred_date],
                      ["Time", form.preferred_time],
                      form.notes && ["Notes", form.notes],
                    ]
                      .filter(Boolean)
                      .map((row: any) => (
                        <div key={row[0]} className="flex gap-3 text-sm">
                          <span
                            className="font-semibold w-20 flex-shrink-0"
                            style={{ color: "#1A3A5C" }}
                          >
                            {row[0]}:
                          </span>
                          <span className="text-gray-700">{row[1]}</span>
                        </div>
                      ))}
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    By submitting, you agree to be contacted by our team to
                    confirm your appointment.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                {step > 0 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 font-semibold text-sm transition-colors hover:text-blue-600"
                    style={{ color: "#1A3A5C" }}
                  >
                    <ArrowLeft size={16} /> Previous
                  </button>
                ) : (
                  <div />
                )}
                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={!canNext()}
                    className="btn-primary px-6 py-2.5 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="btn-primary px-6 py-2.5 text-sm disabled:opacity-40"
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <CheckCircle size={16} /> Confirm Booking
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
