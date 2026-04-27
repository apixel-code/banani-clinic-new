import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import AdminUser from './src/models/AdminUser.js';
import Appointment from './src/models/Appointment.js';
import BlogPost from './src/models/BlogPost.js';
import ContactSubmission from './src/models/ContactSubmission.js';
import Doctor from './src/models/Doctor.js';
import GalleryImage from './src/models/GalleryImage.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(currentDir, '.env') });

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
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@clinic.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin12345';

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding');

  // Clear collections
  await BlogPost.deleteMany({});
  await GalleryImage.deleteMany({});
  await Appointment.deleteMany({});
  await ContactSubmission.deleteMany({});

  // Seed Blog Posts
  const blogPosts = [
    {
      title: 'Why Dental Implants Are the Gold Standard',
      slug: 'dental-implants-gold-standard',
      excerpt: 'Missing a tooth? Discover why dental implants are the most permanent solution.',
      category: 'Treatment Guide',
      author: 'Dr. Aslam Al Mehdi',
      content: '<h2>The Complete Guide to Dental Implants</h2><p>Dental implants are the most advanced solution for replacing missing teeth. Unlike dentures or bridges, implants are surgically anchored into the jawbone, providing a permanent, natural-looking replacement that functions like your natural teeth.</p><h3>Why Choose Implants?</h3><ul><li>Permanent solution that lasts 25+ years</li><li>Natural appearance and function</li><li>Prevents bone loss in the jaw</li><li>No impact on adjacent teeth</li><li>Improved speech and eating comfort</li></ul><p>At Banani Clinic, Dr. Aslam Al Mehdi uses the latest implant technology and surgical techniques to ensure your success.</p>',
      meta_description: 'Learn about dental implants - the gold standard for replacing missing teeth with a permanent solution.',
      tags: ['implants', 'tooth-replacement', 'permanent-solution'],
      published: true,
      published_at: new Date('2024-01-15'),
    },
    {
      title: 'Root Canal Treatment: Saving Your Natural Tooth',
      slug: 'root-canal-treatment-guide',
      excerpt: 'Root canal therapy is a painless procedure that saves infected or damaged teeth from extraction.',
      category: 'Dental Health Tips',
      author: 'Dr. Farhana Rahman',
      content: '<h2>Understanding Root Canal Treatment</h2><p>A root canal is a common dental procedure performed to save a tooth that has become severely infected or damaged. Despite its reputation, modern root canal treatment is no more uncomfortable than having a filling placed.</p><h3>When Do You Need a Root Canal?</h3><ul><li>Severe tooth pain when chewing or applying pressure</li><li>Prolonged sensitivity to hot or cold temperatures</li><li>Discoloration or darkening of the tooth</li><li>Swelling and tenderness in nearby gums</li><li>A persistent or recurring pimple on the gums</li></ul><p>Our experienced endodontists use advanced techniques including rotary instruments and apex locators to complete treatment efficiently.</p>',
      meta_description: 'Guide to root canal treatment - understand the procedure and why it saves your natural tooth.',
      tags: ['root-canal', 'endodontics', 'tooth-pain'],
      published: true,
      published_at: new Date('2024-01-20'),
    },
    {
      title: 'Cosmetic Dentistry: Transform Your Smile',
      slug: 'cosmetic-dentistry-smile-transformation',
      excerpt: 'From teeth whitening to smile design, discover how cosmetic dentistry can enhance your appearance.',
      category: 'Treatment Guide',
      author: 'Dr. Farhana Rahman',
      content: '<h2>Modern Cosmetic Dentistry Solutions</h2><p>Your smile is one of the first things people notice. Cosmetic dentistry offers numerous treatments to improve the appearance of your teeth and restore your confidence.</p><h3>Popular Cosmetic Treatments</h3><ul><li><strong>Teeth Whitening:</strong> Professional whitening for a brighter smile</li><li><strong>Veneers:</strong> Thin ceramic shells for perfect tooth shape and color</li><li><strong>Composite Bonding:</strong> Repair chips and close gaps</li><li><strong>Smile Design:</strong> Complete smile makeover planning</li><li><strong>Orthodontics:</strong> Straighten teeth for a perfect alignment</li></ul><p>Dr. Farhana Rahman specializes in creating natural-looking results that enhance your natural beauty.</p>',
      meta_description: 'Explore cosmetic dentistry options to transform your smile at Banani Clinic.',
      tags: ['cosmetic-dentistry', 'smile-design', 'teeth-whitening'],
      published: true,
      published_at: new Date('2024-02-01'),
    },
    {
      title: 'Periodontal Disease: Prevention and Treatment',
      slug: 'periodontal-disease-prevention',
      excerpt: 'Learn about gum disease symptoms, prevention strategies, and modern treatment options.',
      category: 'Dental Health Tips',
      author: 'Dr. Aslam Al Mehdi',
      content: '<h2>Understanding Periodontal Disease</h2><p>Periodontal disease, commonly known as gum disease, is an infection of the tissues and bone that support your teeth. It ranges from simple gum inflammation to serious disease that can lead to tooth loss.</p><h3>Warning Signs of Gum Disease</h3><ul><li>Red, swollen, or tender gums</li><li>Bleeding when brushing or flossing</li><li>Receding gums</li><li>Persistent bad breath</li><li>Loose or shifting teeth</li></ul><h3>Prevention and Treatment</h3><p>Regular brushing, flossing, and professional cleanings are key. Advanced cases may require periodontal surgery, which is our specialty at Banani Clinic.</p>',
      meta_description: 'Comprehensive guide to periodontal disease - prevention, symptoms, and treatment options.',
      tags: ['gum-disease', 'periodontics', 'preventive-care'],
      published: true,
      published_at: new Date('2024-02-10'),
    },
    {
      title: 'Wisdom Teeth: When Do They Need Extraction?',
      slug: 'wisdom-teeth-extraction-guide',
      excerpt: 'Understand wisdom teeth problems and why extraction may be necessary for your oral health.',
      category: 'Treatment Guide',
      author: 'Dr. Sanjir Howlader',
      content: '<h2>The Truth About Wisdom Teeth</h2><p>Wisdom teeth are the last molars to erupt, usually appearing in your late teens or early twenties. While some people never have problems, others require extraction due to various complications.</p><h3>Common Wisdom Teeth Problems</h3><ul><li>Overcrowding and misalignment</li><li>Impaction (tooth stuck in jaw)</li><li>Partial eruption and decay</li><li>Cyst formation</li><li>Damage to adjacent teeth</li></ul><p>Our oral surgeons evaluate each case carefully to determine if extraction is necessary and perform the procedure with minimal discomfort.</p>',
      meta_description: 'Guide to wisdom teeth extraction - learn when and why they need to be removed.',
      tags: ['wisdom-teeth', 'oral-surgery', 'extraction'],
      published: true,
      published_at: new Date('2024-02-15'),
    },
    {
      title: 'Patient Success Story: From Anxiety to Confidence',
      slug: 'patient-success-story-anxiety',
      excerpt: 'Discover how our anxious dental patient overcame fears and got a complete smile makeover.',
      category: 'Patient Stories',
      author: 'Dr. Aslam Al Mehdi',
      content: '<h2>Transforming Dental Anxiety into Confidence</h2><p>Patient Name (anonymized) came to us with severe dental anxiety after a traumatic experience in the past. Through our compassionate approach and advanced sedation options, we helped transform their dental experience.</p><h3>The Treatment Journey</h3><p>We started with comprehensive planning and discussed all options. The patient chose a combination of implant therapy and cosmetic dentistry to completely restore their smile. Today, they visit the clinic regularly for maintenance and checkups with complete confidence.</p><p>"I never thought I\'d smile again. The entire team at Banani Clinic made me feel comfortable and cared for." - Patient Testimonial</p>',
      meta_description: 'Read how we helped an anxious patient transform their smile and confidence.',
      tags: ['patient-stories', 'dental-anxiety', 'smile-makeover'],
      published: true,
      published_at: new Date('2024-02-20'),
    },
  ];

  await BlogPost.insertMany(blogPosts);
  console.log(`Seeded ${blogPosts.length} blog posts`);

  // Seed Gallery Images
  const galleryImages = [
    {
      url: 'https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg',
      caption: 'State-of-the-art treatment room',
      category: 'Clinic',
      alt_text: 'Modern dental treatment room with advanced equipment'
    },
    {
      url: 'https://images.pexels.com/photos/4862321/pexels-photo-4862321.jpeg',
      caption: 'Dental implant consultation',
      category: 'Services',
      alt_text: 'Doctor consulting with patient about implant treatment'
    },
    {
      url: 'https://images.pexels.com/photos/4167551/pexels-photo-4167551.jpeg',
      caption: 'Advanced surgical suite',
      category: 'Clinic',
      alt_text: 'Fully equipped maxillofacial surgery operating room'
    },
    {
      url: 'https://images.pexels.com/photos/4172517/pexels-photo-4172517.jpeg',
      caption: 'Digital imaging technology',
      category: 'Technology',
      alt_text: 'High-tech dental imaging and diagnostic equipment'
    },
    {
      url: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg',
      caption: 'Patient consultation area',
      category: 'Clinic',
      alt_text: 'Comfortable and welcoming patient consultation room'
    },
    {
      url: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg',
      caption: 'Before and after smile transformation',
      category: 'Results',
      alt_text: 'Successful cosmetic dentistry before and after results'
    },
    {
      url: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg',
      caption: 'Team in the operating theatre',
      category: 'Team',
      alt_text: 'Professional dental surgery team performing procedure'
    },
    {
      url: 'https://images.pexels.com/photos/3807516/pexels-photo-3807516.jpeg',
      caption: 'Sterile instrument preparation',
      category: 'Clinic',
      alt_text: 'Properly sterilized surgical instruments ready for procedure'
    },
    {
      url: 'https://images.pexels.com/photos/5214994/pexels-photo-5214994.jpeg',
      caption: 'Cosmetic dentistry results',
      category: 'Results',
      alt_text: 'Beautiful smile result from cosmetic dental work'
    },
    {
      url: 'https://images.pexels.com/photos/4173120/pexels-photo-4173120.jpeg',
      caption: 'Patient care excellence',
      category: 'Team',
      alt_text: 'Caring dental professional providing patient comfort'
    },
  ];

  await GalleryImage.insertMany(galleryImages);
  console.log(`Seeded ${galleryImages.length} gallery images`);

  // Seed Sample Appointments
  const appointments = [
    {
      patient_name: 'Fatima Ahmed',
      patient_email: 'fatima.ahmed@email.com',
      patient_phone: '01712345678',
      patient_age: '32',
      service: 'Dental Implants',
      doctor_name: 'Dr. Aslam Al Mehdi',
      branch: 'main',
      preferred_date: new Date('2024-03-15'),
      preferred_time: '10:00 AM',
      status: 'confirmed',
      notes: 'First-time patient, needs consultation before procedure'
    },
    {
      patient_name: 'Karim Hassan',
      patient_email: 'karim.hassan@email.com',
      patient_phone: '01987654321',
      patient_age: '45',
      service: 'Root Canal Treatment',
      doctor_name: 'Dr. Farhana Rahman',
      branch: 'main',
      preferred_date: new Date('2024-03-16'),
      preferred_time: '2:00 PM',
      status: 'pending',
      notes: 'Patient has high pain sensitivity, request numbing agent'
    },
    {
      patient_name: 'Noor Akter',
      patient_email: 'noor.akter@email.com',
      patient_phone: '01556123456',
      patient_age: '28',
      service: 'Cosmetic Dentistry',
      doctor_name: 'Dr. Farhana Rahman',
      branch: 'main',
      preferred_date: new Date('2024-03-17'),
      preferred_time: '11:00 AM',
      status: 'confirmed',
      notes: 'Interested in smile design consultation'
    },
    {
      patient_name: 'Rajib Khan',
      patient_email: 'rajib.khan@email.com',
      patient_phone: '01445789012',
      patient_age: '55',
      service: 'Periodontal Surgery',
      doctor_name: 'Dr. Aslam Al Mehdi',
      branch: 'main',
      preferred_date: new Date('2024-03-18'),
      preferred_time: '3:00 PM',
      status: 'pending',
      notes: 'Follow-up appointment after gum treatment'
    },
    {
      patient_name: 'Sophia Chowdhury',
      patient_email: 'sophia.c@email.com',
      patient_phone: '01333456789',
      patient_age: '35',
      service: 'Wisdom Teeth Extraction',
      doctor_name: 'Dr. Sanjir Howlader',
      branch: 'main',
      preferred_date: new Date('2024-03-20'),
      preferred_time: '9:00 AM',
      status: 'confirmed',
      notes: 'Impacted wisdom teeth, needs surgical extraction'
    },
  ];

  await Appointment.insertMany(appointments);
  console.log(`Seeded ${appointments.length} sample appointments`);

  // Seed Sample Contact Submissions
  const contactSubmissions = [
    {
      name: 'Arjun Roy',
      phone: '01999888777',
      email: 'arjun.roy@email.com',
      preferred_date: new Date('2024-03-15'),
      message: 'I have a severe toothache and need urgent appointment. Can someone call me back?',
      read: false
    },
    {
      name: 'Mithila Dey',
      phone: '01666555444',
      email: 'mithila.dey@email.com',
      preferred_date: new Date('2024-03-16'),
      message: 'Looking for teeth whitening service. Can you provide pricing information?',
      read: false
    },
    {
      name: 'Hasan Mahmud',
      phone: '01844332211',
      email: 'hasan.m@email.com',
      preferred_date: null,
      message: 'I\'m interested in dental implants. Please send me details about the procedure and costs.',
      read: true
    },
    {
      name: 'Priya Sharma',
      phone: '01777666555',
      email: 'priya.sharma@email.com',
      preferred_date: new Date('2024-03-20'),
      message: 'Need emergency dental care for my child. Is Saturday available?',
      read: false
    },
    {
      name: 'Amir Ahmed',
      phone: '01555444333',
      email: 'amir.ahmed@email.com',
      preferred_date: null,
      message: 'Great service experience! Thank you for fixing my smile. Highly recommend Banani Clinic!',
      read: true
    },
  ];

  await ContactSubmission.insertMany(contactSubmissions);
  console.log(`Seeded ${contactSubmissions.length} contact submissions`);

  // Seed Doctors
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

  // Seed Admin User
  const password_hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await AdminUser.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    { email: ADMIN_EMAIL, password_hash, role: 'admin' },
    { upsert: true, new: true }
  );

  console.log(`Admin user ready: ${ADMIN_EMAIL}`);

  console.log('\n✅ Seed complete! Summary:');
  console.log(`   - ${blogPosts.length} blog posts`);
  console.log(`   - ${galleryImages.length} gallery images`);
  console.log(`   - ${appointments.length} sample appointments`);
  console.log(`   - ${contactSubmissions.length} contact submissions`);
  console.log(`   - ${doctors.length} doctor profiles`);
  console.log(`   - 1 admin user (${ADMIN_EMAIL})`);
  
  await mongoose.connection.close();
  process.exit(0);
}

run().catch(err => { console.error('❌ Seed error:', err); process.exit(1); });
