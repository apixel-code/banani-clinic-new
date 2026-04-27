const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:4000";

async function getJson(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getRecentBlogPosts(limit = 3) {
  const data = await getJson("/api/blog");
  const published = (data || [])
    .filter((p: any) => p.published)
    .sort((a: any, b: any) => {
      const da = new Date(a.published_at || a.created_at || 0).getTime();
      const db = new Date(b.published_at || b.created_at || 0).getTime();
      return db - da;
    });
  return published.slice(0, limit);
}

export async function getBlogPosts() {
  const data = await getJson("/api/blog");
  return (data || [])
    .filter((p: any) => p.published)
    .sort(
      (a: any, b: any) =>
        new Date(b.published_at || b.created_at).getTime() -
        new Date(a.published_at || a.created_at).getTime(),
    );
}

export async function getBlogPostBySlug(slug: string) {
  const data = await getJson("/api/blog");
  return (data || []).find((p: any) => p.slug === slug && p.published) || null;
}

export async function getGalleryImages() {
  const data = await getJson("/api/gallery");
  return (data || []).sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export async function getDoctors() {
  const data = await getJson("/api/doctors?published=true");
  return data || [];
}

export async function getDoctorBySlug(slug: string) {
  return await getJson(`/api/doctors/slug/${slug}?published=true`);
}

export async function submitContact(payload: any) {
  return await getJson("/api/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitAppointment(payload: any) {
  return await getJson("/api/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export default {
  getRecentBlogPosts,
  getBlogPosts,
  getBlogPostBySlug,
  getGalleryImages,
  getDoctors,
  getDoctorBySlug,
  submitContact,
  submitAppointment,
};
