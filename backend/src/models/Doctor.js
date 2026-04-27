import mongoose from 'mongoose';

const DoctorCredentialSchema = new mongoose.Schema({
  flag: { type: String, default: '' },
  degree: { type: String, default: '' },
  institution: { type: String, default: '' },
  year: { type: String, default: '' }
}, { _id: false });

const DoctorStatSchema = new mongoose.Schema({
  value: { type: String, default: '' },
  label: { type: String, default: '' }
}, { _id: false });

const DoctorDetailSchema = new mongoose.Schema({
  label: { type: String, default: '' },
  value: { type: String, default: '' }
}, { _id: false });

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  badge: { type: String, default: 'Chief Surgeon' },
  designation: { type: String, default: '' },
  short_bio: { type: String, default: '' },
  biography: { type: [String], default: [] },
  photo_url: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  credentials: { type: [DoctorCredentialSchema], default: [] },
  expertise: { type: [String], default: [] },
  stats: { type: [DoctorStatSchema], default: [] },
  details: { type: [DoctorDetailSchema], default: [] },
  published: { type: Boolean, default: true },
  created_at: { type: Date, default: () => new Date() }
});

export default mongoose.model('Doctor', DoctorSchema);
