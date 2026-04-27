import mongoose from 'mongoose';

const ContactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  preferred_date: { type: Date },
  message: { type: String, default: '' },
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: () => new Date() }
});

export default mongoose.model('ContactSubmission', ContactSubmissionSchema);
