import dotenv from 'dotenv';
import mongoose from 'mongoose';
import BlogPost from './src/models/BlogPost.js';
import GalleryImage from './src/models/GalleryImage.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/banani_clinic';

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

  console.log('Seed complete');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
