import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, default: '' },
  excerpt: { type: String, default: '' },
  meta_description: { type: String, default: '' },
  og_image: { type: String, default: '' },
  author: { type: String, default: 'Dr. Aslam Al Mehdi' },
  category: { type: String, default: 'Dental Health Tips' },
  tags: { type: [String], default: [] },
  published: { type: Boolean, default: false },
  published_at: { type: Date },
  created_at: { type: Date, default: () => new Date() }
});

export default mongoose.model('BlogPost', BlogPostSchema);
