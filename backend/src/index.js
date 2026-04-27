import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import adminRouter from './routes/admin.js';
import appointmentsRouter from './routes/appointments.js';
import blogRouter from './routes/blog.js';
import contactsRouter from './routes/contacts.js';
import doctorsRouter from './routes/doctors.js';
import galleryRouter from './routes/gallery.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(currentDir, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

function withDatabaseName(uri, databaseName) {
  try {
    const mongoUrl = new URL(uri);
    if (!mongoUrl.pathname || mongoUrl.pathname === '/') {
      mongoUrl.pathname = `/${databaseName}`;
    }
    return mongoUrl.toString();
  } catch {
    return uri;
  }
}

const MONGODB_URI = withDatabaseName(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/banani_clinic',
  process.env.DB_NAME || 'banani_clinic'
);
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/appointments', appointmentsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => res.send('Banani Clinic Backend'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
