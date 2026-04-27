import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  patient_name: { type: String, required: true },
  patient_email: { type: String, default: '' },
  patient_phone: { type: String, required: true },
  patient_age: { type: String, default: '' },
  service: { type: String, required: true },
  doctor_id: { type: String, default: '' },
  doctor_name: { type: String, default: '' },
  branch: { type: String, default: 'main' },
  preferred_date: { type: Date, required: true },
  preferred_time: { type: String, required: true },
  status: { type: String, default: 'pending' },
  notes: { type: String, default: '' },
  created_at: { type: Date, default: () => new Date() }
});

export default mongoose.model('Appointment', AppointmentSchema);
