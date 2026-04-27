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
export async function deleteAppointment(id: string) {
  return await request(`/api/appointments/${id}`, { method: "DELETE" });
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
export async function updateGalleryImage(id: string, payload: any) {
  return await request(`/api/gallery/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
export async function deleteGalleryImage(id: string) {
  return await request(`/api/gallery/${id}`, { method: "DELETE" });
}

export async function getAllDoctors() {
  return await request("/api/doctors");
}
export async function getDoctorById(id: string) {
  return await request(`/api/doctors/${id}`);
}
export async function createDoctor(payload: any) {
  return await request("/api/doctors", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export async function updateDoctor(id: string, payload: any) {
  return await request(`/api/doctors/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
export async function deleteDoctor(id: string) {
  return await request(`/api/doctors/${id}`, { method: "DELETE" });
}

interface CloudinarySignature {
  cloudName: string;
  apiKey: string;
  folder: string;
  timestamp: number;
  signature: string;
}

export async function uploadImageToCloudinary(
  file: File,
  folder = "banani-clinic",
) {
  const signedUpload: CloudinarySignature = await request(
    "/api/admin/cloudinary/signature",
    {
      method: "POST",
      body: JSON.stringify({ folder }),
    },
  );

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", signedUpload.apiKey);
  form.append("timestamp", String(signedUpload.timestamp));
  form.append("folder", signedUpload.folder);
  form.append("signature", signedUpload.signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${signedUpload.cloudName}/image/upload`,
    {
      method: "POST",
      body: form,
    },
  );
  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body.error?.message || `Upload failed: ${res.status}`);
  }

  return body;
}

export default {
  login,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAllContacts,
  updateContact,
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  uploadImageToCloudinary,
};
