import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, default: '' },
  category: { type: String, default: 'Clinic' },
  alt_text: { type: String, default: '' },
  created_at: { type: Date, default: () => new Date() }
});

export default mongoose.model('GalleryImage', GalleryImageSchema);
