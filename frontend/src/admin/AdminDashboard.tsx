import {
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  Image,
  MessageSquare,
  Stethoscope,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminApi from "../lib/adminApi";

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  contacts: number;
  posts: number;
  gallery: number;
  doctors: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getAllAppointments(),
      adminApi.getAllContacts(),
      adminApi.getAllBlogPosts(),
      adminApi.getAllGalleryImages(),
      adminApi.getAllDoctors(),
    ])
      .then(([appts, contacts, posts, gallery, doctors]) => {
        const a = appts || [];
        setStats({
          total: a.length,
          pending: a.filter((x: any) => x.status === "pending").length,
          confirmed: a.filter((x: any) => x.status === "confirmed").length,
          completed: a.filter((x: any) => x.status === "completed").length,
          contacts: (contacts || []).length || 0,
          posts: (posts || []).length || 0,
          gallery: (gallery || []).length || 0,
          doctors: (doctors || []).length || 0,
        });
        setRecent((a as any[]).slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statusBadge = (status: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      pending: { bg: "#fef9c3", color: "#854d0e" },
      confirmed: { bg: "#dbeafe", color: "#1e40af" },
      completed: { bg: "#dcfce7", color: "#166534" },
      cancelled: { bg: "#fee2e2", color: "#991b1b" },
    };
    const s = map[status] || { bg: "#f3f4f6", color: "#374151" };
    return (
      <span
        className="badge text-xs capitalize"
        style={{ backgroundColor: s.bg, color: s.color }}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-1" style={{ color: "#1A3A5C" }}>
          Welcome back
        </h2>
        <p className="text-sm text-gray-500">
          Here's what's happening at the clinic today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Bookings",
            value: stats?.total,
            color: "#2B7CC1",
            bg: "#EBF4FF",
            icon: <Calendar size={20} />,
          },
          {
            label: "Pending",
            value: stats?.pending,
            color: "#d97706",
            bg: "#fef9c3",
            icon: <Clock size={20} />,
          },
          {
            label: "Confirmed",
            value: stats?.confirmed,
            color: "#2563eb",
            bg: "#dbeafe",
            icon: <Calendar size={20} />,
          },
          {
            label: "Completed",
            value: stats?.completed,
            color: "#16a34a",
            bg: "#dcfce7",
            icon: <Calendar size={20} />,
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: s.bg, color: s.color }}
              >
                {s.icon}
              </div>
            </div>
            <div
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{ color: "#1A3A5C" }}
            >
              {s.value}
            </div>
            <div className="text-xs text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Doctors",
            value: stats?.doctors,
            path: "/admin/doctors",
            icon: <Stethoscope size={18} />,
            color: "#0891b2",
          },
          {
            label: "Contact Submissions",
            value: stats?.contacts,
            path: "/admin/contacts",
            icon: <MessageSquare size={18} />,
            color: "#2B7CC1",
          },
          {
            label: "Blog Posts",
            value: stats?.posts,
            path: "/admin/blog",
            icon: <FileText size={18} />,
            color: "#7c3aed",
          },
          {
            label: "Gallery Images",
            value: stats?.gallery,
            path: "/admin/gallery",
            icon: <Image size={18} />,
            color: "#db2777",
          },
        ].map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: s.color }}
              >
                {s.icon}
              </div>
              <div>
                <div className="text-xl font-bold" style={{ color: "#1A3A5C" }}>
                  {s.value}
                </div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-gray-300 group-hover:text-gray-500 transition-colors"
            />
          </Link>
        ))}
      </div>

      {/* Recent appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-sm" style={{ color: "#1A3A5C" }}>
            Recent Appointments
          </h3>
          <Link
            to="/admin/appointments"
            className="text-xs font-semibold hover:underline"
            style={{ color: "#2B7CC1" }}
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Patient", "Service", "Date", "Time", "Branch", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recent.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-400 text-sm"
                  >
                    No appointments yet
                  </td>
                </tr>
              ) : (
                recent.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td
                      className="px-4 py-3 font-medium text-xs md:text-sm"
                      style={{ color: "#1A3A5C" }}
                    >
                      {r.patient_name}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[120px] truncate">
                      {r.service}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {r.preferred_date}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {r.preferred_time}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs capitalize">
                      {r.branch}
                    </td>
                    <td className="px-4 py-3">{statusBadge(r.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
