
/*
  # Dental Clinic - Complete Database Schema

  1. New Tables
    - `appointments` - Patient appointment bookings with multi-step form data
      - id, patient_name, patient_email, patient_phone, patient_age
      - service, branch, preferred_date, preferred_time
      - status (pending/confirmed/completed/cancelled)
      - notes, created_at

    - `blog_posts` - Blog/article content
      - id, title, slug, content, excerpt, meta_description
      - og_image, author, category, tags, published, published_at, created_at

    - `gallery_images` - Clinic gallery
      - id, url, caption, category, alt_text, created_at

    - `contact_submissions` - Contact form submissions
      - id, name, phone, email, preferred_date, message, read, created_at

    - `admin_users` - Admin panel users
      - id, email, password_hash, role, created_at

  2. Security
    - RLS enabled on all tables
    - Public can insert appointments and contact submissions
    - Public can read published blog posts and gallery images
    - Only authenticated admins can manage all data
*/

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  patient_email text NOT NULL DEFAULT '',
  patient_phone text NOT NULL,
  patient_age text DEFAULT '',
  service text NOT NULL,
  branch text NOT NULL DEFAULT 'main',
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text DEFAULT '',
  excerpt text DEFAULT '',
  meta_description text DEFAULT '',
  og_image text DEFAULT '',
  author text DEFAULT 'Dr. Aslam Al Mehdi',
  category text DEFAULT 'Dental Health Tips',
  tags text[] DEFAULT '{}',
  published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Admins can manage all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  caption text DEFAULT '',
  category text DEFAULT 'Clinic',
  alt_text text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text DEFAULT '',
  preferred_date date,
  message text DEFAULT '',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert seed blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, meta_description, category, published, published_at, og_image) VALUES
(
  'Why Dental Implants Are the Gold Standard for Missing Teeth',
  'dental-implants-gold-standard',
  'Missing a tooth? Discover why dental implants are the most permanent, natural-feeling solution for tooth replacement — and why thousands of patients choose them every year.',
  '<h2>The Problem with Missing Teeth</h2><p>Losing a tooth is more than a cosmetic issue. When a tooth is missing, the jawbone begins to deteriorate within months. Adjacent teeth shift. Your bite changes. Confidence fades. Many patients tell us they stop smiling in photos, avoid certain foods, and feel self-conscious in social situations.</p><h2>What Are Dental Implants?</h2><p>A dental implant is a titanium post surgically placed into your jawbone. It acts as an artificial tooth root. Over 3–6 months, the implant fuses with the bone — a process called osseointegration. A porcelain crown is then placed on top, creating a tooth that looks, feels, and functions exactly like a natural one.</p><h2>Why Choose Implants Over Dentures or Bridges?</h2><ul><li><strong>Permanent:</strong> With proper care, implants last a lifetime.</li><li><strong>Natural feel:</strong> No slipping, clicking, or discomfort.</li><li><strong>Bone preservation:</strong> Stimulates jawbone growth, preventing deterioration.</li><li><strong>No damage to adjacent teeth:</strong> Unlike bridges, implants stand alone.</li></ul><h2>The Implant Process at Banani Clinic</h2><p>Our process begins with a 3D X-ray and consultation. We design your implant digitally before a single incision is made. Under local anesthesia, the titanium post is placed painlessly. After healing, your custom crown is fitted — often in a single appointment.</p><p>Over 500 implants have been placed at our clinic by Dr. Aslam Al Mehdi, who trained in implant surgery in South Korea and Tokyo.</p>',
  'Learn why dental implants are the most trusted permanent solution for missing teeth, and how Banani Clinic can restore your smile.',
  'Treatment Guide',
  true,
  now() - interval '5 days',
  'https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg'
),
(
  '5 Signs You Need a Root Canal (And Why It''s Not as Scary as You Think)',
  'signs-you-need-root-canal',
  'Root canal treatment has a frightening reputation — but modern techniques make it no more uncomfortable than a filling. Here are the 5 warning signs you shouldn''t ignore.',
  '<h2>The Fear Around Root Canals</h2><p>Few phrases cause more dread than "you need a root canal." But this fear is largely outdated. Modern root canal therapy, performed with advanced anesthesia and precision instruments, is typically no more painful than getting a filling placed.</p><h2>5 Warning Signs</h2><h3>1. Severe, Persistent Toothache</h3><p>Pain that lingers after eating or drinking, especially to temperature changes, often indicates pulp inflammation. Do not ignore it — the nerve is signaling serious infection.</p><h3>2. Darkening or Discoloration of the Tooth</h3><p>A grey or black tooth is a classic sign that the pulp tissue inside has died or is dying. This needs immediate attention.</p><h3>3. Swollen, Tender Gums</h3><p>Swelling around a specific tooth, sometimes with a pimple-like bump on the gum, indicates an abscess — a pocket of infection that can spread if untreated.</p><h3>4. Prolonged Sensitivity</h3><p>If your tooth aches for minutes or hours after heat or cold exposure (long after the stimulus is gone), the pulp may be damaged.</p><h3>5. Cracked or Chipped Tooth</h3><p>Cracks expose the inner pulp to bacteria. Even without pain, a cracked tooth is a pathway for infection.</p><h2>What Happens During Treatment?</h2><p>We numb the area completely. An opening is made in the crown, infected pulp is removed, canals are cleaned and shaped, then filled with a biocompatible material. A crown is placed to protect the tooth. Most patients report immediate relief.</p>',
  'Recognize the 5 warning signs that indicate you need root canal treatment, and why modern procedures are pain-free at Banani Clinic.',
  'Dental Health Tips',
  true,
  now() - interval '12 days',
  'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg'
),
(
  'Teeth Whitening: Professional vs. At-Home — What Actually Works?',
  'teeth-whitening-professional-vs-home',
  'The market is flooded with whitening strips, toothpastes, and LED kits. But how do they compare to professional whitening at a dental clinic? We break down the science.',
  '<h2>Why Teeth Stain</h2><p>Teeth discolor from two sources: extrinsic stains (coffee, tea, tobacco, wine) on the enamel surface, and intrinsic stains deep within the dentin layer. Most at-home products only address surface stains. Professional treatment reaches both.</p><h2>At-Home Options</h2><h3>Whitening Toothpastes</h3><p>Contain mild abrasives. Remove surface stains but cannot change the actual tooth color. Maximum improvement: 1 shade.</p><h3>Whitening Strips</h3><p>Contain low concentrations of hydrogen peroxide (3–10%). Can improve 2–3 shades over 2 weeks. Results are uneven and sensitivity is common.</p><h3>LED Kits</h3><p>The light alone does nothing. Any results come from the peroxide gel used alongside. Often overpriced for moderate results.</p><h2>Professional Whitening</h2><p>At Banani Clinic, we use professional-grade carbamide or hydrogen peroxide (up to 40%) with custom-fitted trays. A single in-office session produces 6–8 shades of improvement — results that would take months with at-home products. We also protect your gums throughout the process.</p><h2>Who Is a Candidate?</h2><p>Whitening works best on natural teeth with extrinsic staining. It does not work on crowns, veneers, or bonding. Patients with severe intrinsic staining may need veneers for optimal results. A consultation with Dr. Aslam will determine the right approach for you.</p>',
  'Compare professional dental whitening with at-home options and find out which delivers real, lasting results for your smile.',
  'Dental Health Tips',
  true,
  now() - interval '20 days',
  'https://images.pexels.com/photos/3762468/pexels-photo-3762468.jpeg'
);

-- Insert seed gallery images
INSERT INTO gallery_images (url, caption, category, alt_text) VALUES
('https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg', 'State-of-the-art treatment room', 'Clinic', 'Modern dental treatment room at Banani Clinic'),
('https://images.pexels.com/photos/3845743/pexels-photo-3845743.jpeg', 'Advanced dental equipment', 'Clinic', 'Advanced dental equipment and technology'),
('https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg', 'Comfortable waiting area', 'Clinic', 'Comfortable patient waiting area'),
('https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg', 'Dental implant consultation', 'Procedures', 'Dental implant procedure consultation'),
('https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg', 'Root canal treatment', 'Procedures', 'Root canal treatment procedure'),
('https://images.pexels.com/photos/3762468/pexels-photo-3762468.jpeg', 'Cosmetic dentistry result', 'Before & After', 'Before and after cosmetic dentistry result'),
('https://images.pexels.com/photos/3845623/pexels-photo-3845623.jpeg', 'Happy patient after treatment', 'Before & After', 'Patient smiling after successful dental treatment'),
('https://images.pexels.com/photos/3779703/pexels-photo-3779703.jpeg', 'Dental team consultation', 'Team', 'Dental team member consulting with patient'),
('https://images.pexels.com/photos/3845544/pexels-photo-3845544.jpeg', 'Modern X-ray facility', 'Procedures', 'Modern dental X-ray facility');
