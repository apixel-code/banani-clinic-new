import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import adminRouter from './routes/admin.js';
import appointmentsRouter from './routes/appointments.js';
import blogRouter from './routes/blog.js';
import contactsRouter from './routes/contacts.js';
import galleryRouter from './routes/gallery.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/banani_clinic';
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/appointments', appointmentsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.send('Banani Clinic Backend'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
