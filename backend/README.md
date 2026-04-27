# Banani Clinic Backend

Express + MongoDB backend for the Banani Clinic frontend. Basic REST endpoints for appointments, blog posts, gallery images and contact submissions.

Environment:

- Copy `.env.example` to `.env` and set `MONGODB_URI`.
- For admin image uploads, also set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`.

Run locally:

```bash
cd backend
npm install
npm run dev
```

Seed data:

```bash
npm run seed
```
