import { Eye, EyeOff, Plus, Save, Stethoscope, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ImageUploadField from "../components/ImageUploadField";
import { useToast } from "../components/Toast";
import adminApi from "../lib/adminApi";

const emptyDoctor = {
  name: "",
  slug: "",
  badge: "Chief Surgeon",
  designation: "",
  short_bio: "",
  biography: [],
  photo_url: "",
  phone: "",
  email: "",
  credentials: [],
  expertise: [],
  stats: [],
  details: [],
  published: true,
};

const fallbackStats = "1500+ | Patients Treated\n15+ | Years Experience";
const fallbackDetails = "Registration | BMDC No. 871\nLanguages | Bengali, English";

const getDoctorId = (doctor: any) => doctor?._id || doctor?.id;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const lines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const listToText = (value: string[] = []) => value.join("\n");

const credentialsToText = (credentials: any[] = []) =>
  credentials
    .map((item) =>
      [item.flag, item.degree, item.institution, item.year]
        .filter((part) => part !== undefined && part !== null)
        .join(" | "),
    )
    .join("\n");

const textToCredentials = (value: string) =>
  lines(value).map((line) => {
    const [flag = "", degree = "", institution = "", year = ""] = line
      .split("|")
      .map((part) => part.trim());
    return { flag, degree, institution, year };
  });

const pairsToText = (items: any[] = []) =>
  items.map((item) => `${item.value || item.label || ""} | ${item.label && item.value ? item.label : item.value || ""}`).join("\n");

const textToPairs = (value: string) =>
  lines(value).map((line) => {
    const [valuePart = "", labelPart = ""] = line
      .split("|")
      .map((part) => part.trim());
    return { value: valuePart, label: labelPart };
  });

const detailsToText = (items: any[] = []) =>
  items.map((item) => `${item.label || ""} | ${item.value || ""}`).join("\n");

const textToDetails = (value: string) =>
  lines(value).map((line) => {
    const [label = "", detailValue = ""] = line
      .split("|")
      .map((part) => part.trim());
    return { label, value: detailValue };
  });

function toForm(doctor: any) {
  return {
    ...emptyDoctor,
    ...doctor,
    biographyText: listToText(doctor?.biography || []),
    credentialsText: credentialsToText(doctor?.credentials || []),
    expertiseText: listToText(doctor?.expertise || []),
    statsText: pairsToText(doctor?.stats || []),
    detailsText: detailsToText(doctor?.details || []),
  };
}

function toPayload(form: any) {
  return {
    name: form.name,
    slug: form.slug,
    badge: form.badge,
    designation: form.designation,
    short_bio: form.short_bio,
    biography: lines(form.biographyText || ""),
    photo_url: form.photo_url,
    phone: form.phone,
    email: form.email,
    credentials: textToCredentials(form.credentialsText || ""),
    expertise: lines(form.expertiseText || ""),
    stats: textToPairs(form.statsText || ""),
    details: textToDetails(form.detailsText || ""),
    published: !!form.published,
  };
}

export default function ManageDoctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();

  const load = () => {
    setLoading(true);
    adminApi
      .getAllDoctors()
      .then((data) => {
        setDoctors(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openNewDoctor = () => {
    setEditing(
      toForm({
        ...emptyDoctor,
        stats: textToPairs(fallbackStats),
        details: textToDetails(fallbackDetails),
      }),
    );
  };

  const save = async () => {
    if (!editing.name || !editing.slug) {
      toast("Name and slug are required.", "error");
      return;
    }

    const doctorId = getDoctorId(editing);
    setSaving(true);
    try {
      const payload = toPayload(editing);
      if (doctorId) {
        await adminApi.updateDoctor(doctorId, payload);
      } else {
        await adminApi.createDoctor(payload);
      }
      toast("Doctor saved.", "success");
      setEditing(null);
      load();
    } catch (err: any) {
      toast(err.message || "Failed to save doctor.", "error");
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (doctor: any) => {
    const doctorId = getDoctorId(doctor);
    if (!doctorId) return;

    try {
      await adminApi.updateDoctor(doctorId, {
        ...doctor,
        published: !doctor.published,
      });
      load();
    } catch (err) {
      toast("Failed to update doctor.", "error");
    }
  };

  const remove = async () => {
    const doctorId = getDoctorId(deleteTarget);
    if (!doctorId) {
      toast("Missing doctor ID.", "error");
      return;
    }

    setDeleting(true);
    try {
      await adminApi.deleteDoctor(doctorId);
      toast("Doctor deleted.", "success");
      setDeleteTarget(null);
      load();
    } catch (err) {
      toast("Failed to delete doctor.", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">{doctors.length} doctors total</p>
        <button onClick={openNewDoctor} className="btn-primary text-sm px-4 py-2.5">
          <Plus size={16} /> Add Doctor
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Doctor", "Designation", "Phone", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : doctors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-10 text-sm">
                    No doctors yet
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => {
                  const doctorId = getDoctorId(doctor);
                  const rowKey = doctorId || `${doctor.slug}-${doctor.created_at}`;
                  return (
                    <tr key={rowKey} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 min-w-[220px]">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-50 flex items-center justify-center flex-shrink-0">
                            {doctor.photo_url ? (
                              <img src={doctor.photo_url} alt={doctor.name} className="w-full h-full object-cover" />
                            ) : (
                              <Stethoscope size={18} style={{ color: "#2B7CC1" }} />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-xs" style={{ color: "#1A3A5C" }}>
                              {doctor.name}
                            </div>
                            <div className="text-xs text-gray-400">{doctor.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-[220px] truncate">
                        {doctor.designation || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                        {doctor.phone || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => togglePublish(doctor)}
                          disabled={!doctorId}
                          className={`badge text-xs cursor-pointer disabled:opacity-50 ${
                            doctor.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {doctor.published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditing(toForm(doctor))}
                            disabled={!doctorId}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 transition-colors"
                          >
                            <Stethoscope size={14} />
                          </button>
                          <button
                            onClick={() => togglePublish(doctor)}
                            disabled={!doctorId}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                          >
                            {doctor.published ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button
                            onClick={() => setDeleteTarget(doctor)}
                            disabled={!doctorId}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 disabled:opacity-50 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold" style={{ color: "#1A3A5C" }}>
                {getDoctorId(editing) ? "Edit Doctor" : "Add Doctor"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Name *</label>
                  <input
                    className="input-field"
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        name: e.target.value,
                        slug: getDoctorId(editing) ? editing.slug : slugify(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="label">Slug *</label>
                  <input
                    className="input-field font-mono text-sm"
                    value={editing.slug}
                    onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Badge</label>
                  <input
                    className="input-field"
                    value={editing.badge || ""}
                    onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Designation</label>
                  <input
                    className="input-field"
                    value={editing.designation || ""}
                    onChange={(e) => setEditing({ ...editing, designation: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <ImageUploadField
                  label="Profile Photo"
                  value={editing.photo_url || ""}
                  onChange={(url) => setEditing({ ...editing, photo_url: url })}
                  folder="banani-clinic/doctors"
                  previewAlt={editing.name || "Doctor profile preview"}
                />
                <div className="space-y-4">
                  <div>
                    <label className="label">Phone</label>
                    <input
                      className="input-field"
                      value={editing.phone || ""}
                      onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      className="input-field"
                      value={editing.email || ""}
                      onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="label">Short Bio</label>
                <textarea
                  className="input-field resize-none"
                  rows={3}
                  value={editing.short_bio || ""}
                  onChange={(e) => setEditing({ ...editing, short_bio: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Biography</label>
                  <textarea
                    className="input-field resize-none"
                    rows={8}
                    placeholder="One paragraph per line"
                    value={editing.biographyText || ""}
                    onChange={(e) => setEditing({ ...editing, biographyText: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Expertise</label>
                  <textarea
                    className="input-field resize-none"
                    rows={8}
                    placeholder="One expertise item per line"
                    value={editing.expertiseText || ""}
                    onChange={(e) => setEditing({ ...editing, expertiseText: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="label">Credentials</label>
                <textarea
                  className="input-field resize-none font-mono text-xs"
                  rows={5}
                  placeholder="Flag | Degree | Institution | Year"
                  value={editing.credentialsText || ""}
                  onChange={(e) => setEditing({ ...editing, credentialsText: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Stats</label>
                  <textarea
                    className="input-field resize-none font-mono text-xs"
                    rows={4}
                    placeholder="1500+ | Patients Treated"
                    value={editing.statsText || ""}
                    onChange={(e) => setEditing({ ...editing, statsText: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Clinic Details</label>
                  <textarea
                    className="input-field resize-none font-mono text-xs"
                    rows={4}
                    placeholder="Registration | BMDC No. 871"
                    value={editing.detailsText || ""}
                    onChange={(e) => setEditing({ ...editing, detailsText: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="doctor-published"
                  checked={editing.published || false}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <label htmlFor="doctor-published" className="text-sm font-medium cursor-pointer" style={{ color: "#1A3A5C" }}>
                  Published
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button onClick={save} disabled={saving} className="btn-primary text-sm px-5 py-2 disabled:opacity-60">
                {saving ? "Saving..." : <><Save size={15} /> Save Doctor</>}
              </button>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        open={!!deleteTarget}
        title="Delete Doctor"
        message="Are you sure you want to permanently delete this doctor profile?"
        itemName={deleteTarget?.name}
        confirmLabel="Delete Doctor"
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={remove}
      />
    </div>
  );
}
