import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  role: { type: String, default: 'admin' },
  created_at: { type: Date, default: () => new Date() }
});

export default mongoose.model('AdminUser', AdminUserSchema);
