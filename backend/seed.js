import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AdminUser from './src/models/AdminUser.js';
import BlogPost from './src/models/BlogPost.js';
import Doctor from './src/models/Doctor.js';
import GalleryImage from './src/models/GalleryImage.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/banani_clinic';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@clinic.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin12345';

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding');

  await BlogPost.deleteMany({});
  await GalleryImage.deleteMany({});

  await BlogPost.create([{
    title: 'Why Dental Implants Are the Gold Standard',
    slug: 'dental-implants-gold-standard',
    excerpt: 'Missing a tooth? Discover why dental implants are the most permanent solution.',
    content: '<p>Sample content</p>',
    published: true,
  }]);

  await GalleryImage.create([{
    url: 'https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg',
    caption: 'State-of-the-art treatment room'
  }]);

  const doctors = [
    {
      name: 'Dr. Aslam Al Mehdi',
      slug: 'aslam-al-mehdi',
      badge: 'Chief Surgeon',
      designation: 'Oral & Maxillofacial Surgeon | Periodontist | Oral Oncologist',
      short_bio: 'Internationally trained oral and maxillofacial surgeon with advanced expertise in implants, periodontics and complex oral surgery.',
      photo_url: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
      phone: '+8801311129952',
      biography: [
        'Dr. Aslam Al Mehdi is one of Bangladesh\'s distinguished oral and maxillofacial surgeons, bringing international academic training and specialist clinical experience to Banani Clinic.',
        'His practice focuses on advanced oral surgery, dental implants, periodontal plastic surgery and comprehensive maxillofacial care.',
      ],
      credentials: [
        { flag: 'JP', degree: 'Ph.D. - Periodontal Plastic Surgery', institution: 'Tokyo Medical and Dental University', year: '2014' },
        { flag: 'KR', degree: 'MS - Oral & Maxillofacial Surgery', institution: 'Seoul National University', year: '2011' },
        { flag: 'UK', degree: 'FIAOO - Fellow, International Academy of Oral Oncology', institution: 'United Kingdom', year: '2016' },
      ],
      expertise: ['Dental Implantology', 'Oral & Maxillofacial Surgery', 'Periodontal Plastic Surgery', 'Oral Cancer Diagnosis'],
      stats: [
        { value: '1500+', label: 'Patients Treated' },
        { value: '15+', label: 'Years Experience' },
        { value: '5', label: 'International Fellowships' },
        { value: '4', label: 'Countries Trained' },
      ],
      details: [
        { label: 'Registration', value: 'BMDC No. 871' },
        { label: 'Languages', value: 'Bengali, English, Japanese' },
        { label: 'Specialties', value: 'Implants, Periodontics, OMS' },
      ],
      published: true,
    },
    {
      name: 'Dr. Sanjir Howlader',
      slug: 'sanjir-howlader',
      badge: 'Dental & Maxillofacial Surgeon',
      designation: 'Dental & Maxillofacial Surgeon',
      short_bio: 'Dental and maxillofacial surgeon with focused training in oral surgery, implantology, esthetic dentistry, endodontics and orthodontics.',
      photo_url: 'https://images.pexels.com/photos/5214995/pexels-photo-5214995.jpeg',
      phone: '+8801311129952',
      biography: [
        'Dr. Sanjir Howlader is a dental and maxillofacial surgeon trained in oral and maxillofacial surgery, implant dentistry, esthetic dentistry and modern endodontic care.',
        'His clinical interests include comprehensive dental surgery, manual and rotary endodontics, orthodontic treatment planning and micro endodontic care.',
      ],
      credentials: [
        { flag: 'BD', degree: 'BDS', institution: 'University of Dhaka', year: '' },
        { flag: 'BD', degree: 'PGT - Oral & Maxillofacial Surgery', institution: 'Dhaka Dental College, BIRDEM Hospital', year: '' },
        { flag: 'US', degree: 'Fellow of the International Congress of Oral Implantologists', institution: 'USA', year: '' },
        { flag: 'BD', degree: 'C.P.R', institution: 'Dhaka Medical College Hospital', year: '' },
        { flag: '', degree: 'Advanced Course - Esthetic Dentistry and Endodontics', institution: 'Manual & Rotary', year: '' },
        { flag: '', degree: 'Advanced Course - Orthodontics', institution: 'International Fellowship on Micro Endodontics, ODONTOS', year: '' },
      ],
      expertise: ['Maxillofacial Surgery', 'Oral Implantology', 'Esthetic Dentistry', 'Manual & Rotary Endodontics', 'Orthodontics', 'Micro Endodontics'],
      stats: [
        { value: '6+', label: 'Advanced Trainings' },
        { value: 'ICOI', label: 'Implant Fellowship' },
        { value: 'OMS', label: 'Surgical Focus' },
        { value: 'DU', label: 'Dental Graduate' },
      ],
      details: [
        { label: 'Degree', value: 'BDS (DU)' },
        { label: 'Training', value: 'PGT (OMS), Dhaka Dental College' },
        { label: 'Hospital', value: 'BIRDEM Hospital' },
        { label: 'Specialties', value: 'OMS, Implants, Endodontics' },
      ],
      published: true,
    },
    {
      name: 'Dr. Farhana Rahman',
      slug: 'farhana-rahman',
      badge: 'Cosmetic Dental Surgeon',
      designation: 'Cosmetic Dental Surgeon | Endodontic Specialist',
      short_bio: 'Cosmetic dental surgeon focused on smile design, restorative dentistry, root canal treatment and patient-centered preventive care.',
      photo_url: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg',
      phone: '+8801311129952',
      biography: [
        'Dr. Farhana Rahman provides cosmetic and restorative dental care with a focus on natural-looking results, comfort and long-term oral health.',
        'Her work includes smile design, tooth-colored restorations, root canal treatment, whitening and preventive care planning for families.',
      ],
      credentials: [
        { flag: 'BD', degree: 'BDS', institution: 'University of Dhaka', year: '' },
        { flag: '', degree: 'Advanced Training - Cosmetic Dentistry', institution: 'Smile Design and Restorative Care', year: '' },
        { flag: '', degree: 'Advanced Training - Endodontics', institution: 'Manual and Rotary Root Canal Treatment', year: '' },
      ],
      expertise: ['Cosmetic Dentistry', 'Root Canal Treatment', 'Smile Design', 'Restorative Dentistry', 'Teeth Whitening'],
      stats: [
        { value: '8+', label: 'Years Experience' },
        { value: '500+', label: 'Smiles Enhanced' },
        { value: 'Rct', label: 'Endodontic Care' },
        { value: 'Family', label: 'Dental Care' },
      ],
      details: [
        { label: 'Focus', value: 'Cosmetic and Restorative Dentistry' },
        { label: 'Training', value: 'Advanced Endodontics' },
        { label: 'Languages', value: 'Bengali, English' },
      ],
      published: true,
    },
  ];

  await Doctor.bulkWrite(doctors.map((doctor) => ({
    updateOne: {
      filter: { slug: doctor.slug },
      update: { $set: doctor },
      upsert: true,
    },
  })));

  console.log(`Seeded ${doctors.length} doctor profiles`);

  const password_hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await AdminUser.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    { email: ADMIN_EMAIL, password_hash, role: 'admin' },
    { upsert: true, new: true }
  );

  console.log(`Admin user ready: ${ADMIN_EMAIL}`);

  console.log('Seed complete');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
