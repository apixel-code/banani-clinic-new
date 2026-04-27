const API = (import.meta.env.VITE_API_URL as string) || "http://localhost:4000";

function authHeader() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path: string, opts: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...authHeader(),
    ...(opts.headers || {}),
  } as Record<string, string>;
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function login(email: string, password: string) {
  return await request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getAllAppointments() {
  return await request("/api/appointments");
}
export async function updateAppointment(id: string, payload: any) {
  return await request(`/api/appointments/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function getAllContacts() {
  return await request("/api/contacts");
}
export async function updateContact(id: string, payload: any) {
  return await request(`/api/contacts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function getAllBlogPosts() {
  return await request("/api/blog");
}
export async function createBlogPost(payload: any) {
  return await request("/api/blog", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export async function updateBlogPost(id: string, payload: any) {
  return await request(`/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
export async function deleteBlogPost(id: string) {
  return await request(`/api/blog/${id}`, { method: "DELETE" });
}
export async function getBlogPostById(id: string) {
  return await request(`/api/blog/${id}`);
}

export async function getAllGalleryImages() {
  return await request("/api/gallery");
}
export async function createGalleryImage(payload: any) {
  return await request("/api/gallery", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export async function deleteGalleryImage(id: string) {
  return await request(`/api/gallery/${id}`, { method: "DELETE" });
}

export default {
  login,
  getAllAppointments,
  updateAppointment,
  getAllContacts,
  updateContact,
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getAllGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
};
