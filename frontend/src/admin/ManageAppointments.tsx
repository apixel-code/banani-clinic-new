import { RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../components/Toast";
import adminApi from "../lib/adminApi";

const STATUSES = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const toast = useToast();

  const load = () => {
    setLoading(true);
    adminApi
      .getAllAppointments()
      .then((data) => {
        setAppointments(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (!id) {
      toast("Missing appointment ID.", "error");
      return;
    }

    setUpdating(id);
    try {
      await adminApi.updateAppointment(id, { status });
      setUpdating(null);
      toast("Status updated.", "success");
      load();
    } catch (err) {
      setUpdating(null);
      toast("Failed to update status.", "error");
    }
  };

  const getAppointmentId = (appointment: any) => appointment._id || appointment.id;

  const filtered = appointments.filter((a) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      a.patient_name?.toLowerCase().includes(q) ||
      a.patient_phone?.includes(q) ||
      a.doctor_name?.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadgeStyle = (status: string) => {
    const map: Record<string, { bg: string; color: string }> = {
      pending: { bg: "#fef9c3", color: "#854d0e" },
      confirmed: { bg: "#dbeafe", color: "#1e40af" },
      completed: { bg: "#dcfce7", color: "#166534" },
      cancelled: { bg: "#fee2e2", color: "#991b1b" },
    };
    return map[status] || { bg: "#f3f4f6", color: "#374151" };
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 w-full sm:max-w-md">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="input-field pl-10 py-2.5 text-sm"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input-field py-2.5 text-sm w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s === "all" ? "All Statuses" : s}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:bg-gray-50 transition-colors"
          style={{ color: "#1A3A5C" }}
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />{" "}
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {[
                  "Patient",
                  "Phone",
                  "Service",
                  "Doctor",
                  "Date",
                  "Time",
                  "Branch",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 9 }).map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-gray-200 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                : filtered.map((a) => {
                    const appointmentId = getAppointmentId(a);
                    const rowKey = appointmentId || `${a.patient_phone}-${a.created_at}`;
                    const s = statusBadgeStyle(a.status);
                    return (
                      <tr key={rowKey} className="hover:bg-gray-50">
                        <td
                          className="px-4 py-3 font-medium text-xs"
                          style={{ color: "#1A3A5C" }}
                        >
                          {a.patient_name}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          <a
                            href={`tel:${a.patient_phone}`}
                            className="hover:text-blue-600"
                          >
                            {a.patient_phone}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs max-w-[130px] truncate">
                          {a.service}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs max-w-[150px] truncate">
                          {a.doctor_name || "-"}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                          {a.preferred_date}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                          {a.preferred_time}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs capitalize">
                          {a.branch}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="badge text-xs capitalize"
                            style={{ backgroundColor: s.bg, color: s.color }}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            disabled={!appointmentId || updating === appointmentId}
                            value={a.status}
                            onChange={(e) => updateStatus(appointmentId, e.target.value)}
                            className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white cursor-pointer focus:outline-none focus:ring-1"
                            style={{ color: "#1A3A5C" }}
                          >
                            {[
                              "pending",
                              "confirmed",
                              "completed",
                              "cancelled",
                            ].map((s) => (
                              <option key={s} value={s} className="capitalize">
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
