export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  image?: string;
  shortDesc: string;
  fullDesc: string;
  whatIsIt: string;
  whoNeedsIt: string;
  process: string[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Dental Implants',
    slug: 'dental-implants',
    icon: 'tooth',
    image: '/service_icon/dental_implants.jpeg',
    shortDesc: 'Permanent tooth replacement that looks, feels, and functions like natural teeth.',
    fullDesc: 'Dental implants are the gold standard for replacing missing teeth. A titanium post is surgically placed into the jawbone, providing a permanent anchor for a lifelike crown.',
    whatIsIt: 'A dental implant is a titanium screw surgically inserted into the jawbone to serve as an artificial tooth root. Once healed, a custom porcelain crown is attached, creating a replacement tooth indistinguishable from natural teeth.',
    whoNeedsIt: 'Anyone with one or more missing teeth who has sufficient bone density. Ideal for patients who want a permanent, low-maintenance solution without affecting adjacent teeth.',
    process: [
      'Initial consultation with 3D X-ray and bone density assessment',
      'Digital implant planning and crown design',
      'Titanium post placement under local anesthesia (painless)',
      'Healing period of 3–6 months (osseointegration)',
      'Custom crown fabrication and attachment',
      'Final polish and bite adjustment'
    ],
    faqs: [
      { q: 'Are dental implants painful?', a: 'The procedure is performed under local anesthesia. Most patients report less discomfort than a tooth extraction. Post-operative soreness typically resolves within 3–5 days.' },
      { q: 'How long do implants last?', a: 'With proper care, dental implants can last a lifetime. The crown may need replacement after 15–20 years depending on wear.' },
      { q: 'Am I a candidate for implants?', a: 'Most adults with good general health qualify. We assess bone density, gum health, and systemic factors. Diabetic and smoker patients can still receive implants with proper management.' },
      { q: 'What is the cost?', a: 'We provide transparent pricing after consultation. Implant costs vary by case complexity. We offer treatment plans with full cost breakdown — no hidden fees.' }
    ]
  },
  {
    id: '2',
    title: 'Root Canal Treatment',
    slug: 'root-canal-treatment',
    icon: 'activity',
    image: '/service_icon/Root Canal Treatment.jpeg',
    shortDesc: 'Save your natural tooth and eliminate pain with our modern, virtually painless protocol.',
    fullDesc: 'Root canal treatment removes infected pulp tissue, eliminates pain, and saves your natural tooth. Our advanced technique and anesthesia protocol make the procedure comfortable and efficient.',
    whatIsIt: 'Root canal therapy (endodontic treatment) cleans and seals the inner chamber of a tooth that has been infected or inflamed due to deep decay, cracks, or trauma.',
    whoNeedsIt: 'Patients experiencing severe toothache, prolonged sensitivity to hot/cold, tooth discoloration, swollen gums, or an abscess. Also recommended before placing a crown on a severely damaged tooth.',
    process: [
      'Clinical examination and X-ray diagnosis',
      'Administration of local anesthesia',
      'Access opening to the pulp chamber',
      'Complete removal of infected pulp tissue',
      'Shaping and cleaning of root canals',
      'Filling with biocompatible gutta-percha',
      'Placement of permanent crown for protection'
    ],
    faqs: [
      { q: 'Will root canal treatment hurt?', a: 'Modern root canal therapy is performed under effective local anesthesia. The procedure itself is painless. You may experience mild soreness for 2–3 days afterward, managed with standard pain relief.' },
      { q: 'How long does the treatment take?', a: 'Most root canals are completed in 1–2 appointments of 60–90 minutes each. Complex cases may require an additional visit.' },
      { q: 'Is it better to extract the tooth?', a: 'Preserving your natural tooth is always preferable. Extraction leads to bone loss, shifting of adjacent teeth, and requires replacement with an implant or bridge.' }
    ]
  },
  {
    id: '3',
    title: 'Cosmetic Dentistry',
    slug: 'cosmetic-dentistry',
    icon: 'sparkles',
    image: '/service_icon/Cosmetic Dentistry.jpeg',
    shortDesc: 'Teeth whitening, veneers, and alignment solutions for the smile you deserve.',
    fullDesc: 'Transform your smile with our comprehensive cosmetic dentistry services. From professional whitening to porcelain veneers and Invisalign-style alignment, we craft smiles that boost confidence.',
    whatIsIt: 'Cosmetic dentistry encompasses procedures that improve the appearance of your teeth, gums, and overall smile — including whitening, veneers, bonding, and clear aligners.',
    whoNeedsIt: 'Anyone who feels self-conscious about stained, chipped, misaligned, gapped, or uneven teeth. Cosmetic procedures are also used to rejuvenate aging smiles.',
    process: [
      'Smile analysis consultation and digital smile preview',
      'Discussion of goals and treatment options',
      'Professional cleaning and preparation',
      'Whitening, bonding, veneer preparation, or aligner fitting',
      'Trial smile (where applicable)',
      'Final placement and polishing',
      'Follow-up and maintenance guidance'
    ],
    faqs: [
      { q: 'How white can my teeth get?', a: 'Professional in-office whitening can brighten teeth 6–10 shades in a single session. Results depend on the type and cause of staining.' },
      { q: 'What are veneers?', a: 'Veneers are ultra-thin porcelain shells bonded to the front surface of teeth. They correct color, shape, size, and minor alignment issues permanently.' },
      { q: 'How long do cosmetic results last?', a: 'Whitening: 1–3 years with maintenance. Veneers: 10–20 years. Bonding: 5–10 years. Clear aligners: permanent with retainer use.' }
    ]
  },
  {
    id: '4',
    title: 'Periodontal Plastic Surgery',
    slug: 'periodontal-plastic-surgery',
    icon: 'scissors',
    image: '/service_icon/Periodontal Plastic Surgery.jpeg',
    shortDesc: 'Treat gum disease and reshape your gum line for healthier, more beautiful teeth.',
    fullDesc: 'Dr. Aslam Al Mehdi holds a Ph.D. in Periodontal Plastic Surgery from Tokyo. Our periodontal treatments address gum disease, gum recession, and aesthetic gum reshaping at the highest level.',
    whatIsIt: 'Periodontal plastic surgery includes procedures to treat gum disease, graft receded gums, reshape uneven gum lines (crown lengthening), and regenerate lost bone and tissue around teeth.',
    whoNeedsIt: 'Patients with bleeding gums, receding gums, loose teeth, persistent bad breath, deep gum pockets, or an uneven "gummy smile."',
    process: [
      'Full periodontal examination and pocket depth measurement',
      'Dental X-rays for bone assessment',
      'Professional deep cleaning (scaling and root planing)',
      'Surgical intervention if required (under local anesthesia)',
      'Gum grafting or regeneration procedures',
      'Post-operative care and monitoring',
      'Maintenance therapy every 3–6 months'
    ],
    faqs: [
      { q: 'Can gum disease be reversed?', a: 'Early-stage gingivitis is fully reversible with professional cleaning and improved home care. Advanced periodontitis can be controlled and stabilized but not fully reversed.' },
      { q: 'Is gum surgery painful?', a: 'All procedures are performed under local anesthesia. Post-operative discomfort is managed with prescribed medication. Most patients return to normal activities within a week.' },
      { q: 'Why is gum health so important?', a: 'Gum disease is linked to heart disease, diabetes, and premature birth. Healthy gums are the foundation of overall oral health.' }
    ]
  },
  {
    id: '5',
    title: 'Oral & Maxillofacial Surgery',
    slug: 'oral-maxillofacial-surgery',
    icon: 'shield',
    image: '/service_icon/Oral and maxillofacial Surgery.jpeg',
    shortDesc: 'Complex surgical procedures of the mouth, jaw, and face by a Korea-trained specialist.',
    fullDesc: 'Our maxillofacial surgery department, led by Dr. Aslam Al Mehdi (MS, Korea), handles complex cases including wisdom tooth removal, jaw surgery, facial trauma, and tumor removal.',
    whatIsIt: 'Oral and maxillofacial surgery addresses diseases, injuries, and defects of the mouth, teeth, jaws, and face. It bridges dentistry and medicine for complex cases.',
    whoNeedsIt: 'Patients with impacted wisdom teeth, jaw misalignment (orthognathic surgery), facial trauma, cysts, tumors, facial pain, or conditions requiring reconstructive procedures.',
    process: [
      'Comprehensive clinical and radiographic evaluation',
      'Medical history review and pre-surgical workup',
      'Treatment planning with 3D imaging where required',
      'Surgical procedure under local or general anesthesia',
      'Intraoperative care with monitoring',
      'Post-surgical instructions and follow-up',
      'Rehabilitation and recovery support'
    ],
    faqs: [
      { q: 'When should wisdom teeth be removed?', a: 'When they are impacted (unable to fully erupt), causing pain, damaging adjacent teeth, or creating infection risk. Not all wisdom teeth require removal — we assess each case individually.' },
      { q: 'What is jaw surgery (orthognathic surgery)?', a: 'Jaw surgery corrects skeletal discrepancies — an underbite, overbite, or asymmetry not solvable with braces alone. It dramatically improves facial appearance and bite function.' }
    ]
  },
  {
    id: '6',
    title: 'Cleft Lip & Palate Surgery',
    slug: 'cleft-lip-palate-surgery',
    icon: 'heart',
    image: '/service_icon/Cleft Lip & Palate Surgery.jpeg',
    shortDesc: 'Life-changing reconstructive surgery for cleft lip and palate conditions.',
    fullDesc: 'We provide expert surgical correction of cleft lip and palate, improving speech, appearance, and quality of life for patients of all ages with compassion and precision.',
    whatIsIt: 'Cleft lip and palate are birth defects where the lip or the roof of the mouth does not fully close during development. Surgical repair restores normal form and function.',
    whoNeedsIt: 'Infants, children, and adults with cleft lip, cleft palate, or both. Secondary corrections for adults who had incomplete earlier repairs.',
    process: [
      'Pre-surgical evaluation with multidisciplinary team',
      'Nutritional and general health optimization',
      'Surgical repair under general anesthesia',
      'Detailed tissue reconstruction and closure',
      'Post-operative care and wound management',
      'Speech therapy referral if required',
      'Long-term follow-up for revision if needed'
    ],
    faqs: [
      { q: 'At what age should cleft surgery be done?', a: 'Cleft lip repair is typically performed at 3–6 months, cleft palate repair at 9–18 months. Adults can also benefit from corrective procedures.' },
      { q: 'How many surgeries are required?', a: 'Primary repair requires 1–2 surgeries. Secondary corrections for bone grafting, nose reshaping, or scar revision may be needed as the child grows.' }
    ]
  },
  {
    id: '7',
    title: 'TMJ Disorder Treatment',
    slug: 'tmj-disorder-treatment',
    icon: 'zap',
    image: '/service_icon/Temporomandibular joint Treatment.jpeg',
    shortDesc: 'Relieve jaw pain, clicking, and headaches caused by temporomandibular joint disorders.',
    fullDesc: 'TMJ disorders cause chronic jaw pain, clicking sounds, headaches, and limited mouth opening. Our targeted treatment protocols provide lasting relief without surgery in most cases.',
    whatIsIt: 'Temporomandibular joint (TMJ) disorders affect the joint connecting your jaw to your skull. They cause pain, popping sounds, difficulty chewing, and sometimes lock-jaw.',
    whoNeedsIt: 'Patients experiencing jaw pain or soreness, clicking/popping when opening the mouth, difficulty fully opening or closing the mouth, headaches upon waking, or teeth grinding (bruxism).',
    process: [
      'Clinical jaw joint examination',
      'Assessment of bite and joint range of motion',
      'Imaging (X-ray or MRI if required)',
      'Custom occlusal splint fabrication',
      'Physical therapy exercises and jaw stretches',
      'Medications for pain and inflammation if needed',
      'Surgical consultation for severe cases'
    ],
    faqs: [
      { q: 'Is TMJ treatment covered by insurance?', a: 'Coverage varies. We provide detailed documentation to support your insurance claim. We also offer transparent self-pay pricing.' },
      { q: 'Will I need surgery for TMJ?', a: 'The majority of TMJ cases resolve with conservative treatment — splints, physical therapy, and behavior modification. Surgery is reserved for cases unresponsive to all other treatments.' }
    ]
  },
  {
    id: '8',
    title: 'Oral Cancer Screening',
    slug: 'oral-cancer-screening',
    icon: 'search',
    image: '/service_icon/Oral Cancer Screening.jpeg',
    shortDesc: 'Early detection saves lives. Comprehensive oral cancer screening for all patients.',
    fullDesc: 'Oral cancer detected early has a 90%+ survival rate. We conduct thorough visual and tactile screenings during routine visits, with advanced screening tools for high-risk patients.',
    whatIsIt: 'Oral cancer screening is a systematic examination of the mouth, lips, tongue, throat, and surrounding tissues to detect early signs of cancer or precancerous conditions.',
    whoNeedsIt: 'All adults, particularly those who smoke, use tobacco products, consume alcohol regularly, have had prior oral cancer, or have unexplained mouth sores or white/red patches.',
    process: [
      'Visual examination of lips, tongue, cheeks, and throat',
      'Tactile palpation of lymph nodes and jaw',
      'Identification of suspicious lesions or discoloration',
      'Advanced screening with Velscope or similar technology if indicated',
      'Documentation and risk stratification',
      'Biopsy referral for suspicious lesions',
      'Patient education on risk reduction'
    ],
    faqs: [
      { q: 'How often should I be screened?', a: 'Annual screening is recommended for adults over 40 or anyone with risk factors. High-risk patients may need more frequent monitoring.' },
      { q: 'What does a suspicious lesion look like?', a: 'White patches (leukoplakia), red patches (erythroplakia), non-healing ulcers, lumps, or any tissue change lasting more than 2 weeks should be evaluated.' }
    ]
  },
  {
    id: '9',
    title: 'Dental X-Rays',
    slug: 'dental-xrays',
    icon: 'monitor',
    image: '/service_icon/Dental X-ray.jpeg',
    shortDesc: 'Digital X-rays with 90% less radiation for precise diagnosis and treatment planning.',
    fullDesc: 'Our clinic uses state-of-the-art digital radiography — including intraoral, panoramic, and 3D CBCT imaging — for accurate diagnosis with minimal radiation exposure.',
    whatIsIt: 'Dental X-rays use radiation to create images of teeth, bone, and surrounding structures not visible during clinical examination. Digital X-rays offer superior image quality with 90% less radiation than traditional film.',
    whoNeedsIt: 'New patients for baseline records; patients with suspected decay, bone loss, infections, or impacted teeth; pre-surgical planning; orthodontic assessment; and routine monitoring.',
    process: [
      'Assessment of imaging requirements',
      'Appropriate positioning and digital sensor placement',
      'Exposure with minimal radiation dose',
      'Immediate digital image capture and enhancement',
      'Radiographic interpretation and diagnosis',
      'Patient education on findings',
      'Integration into treatment plan'
    ],
    faqs: [
      { q: 'Are dental X-rays safe?', a: 'Modern digital X-rays emit extremely low radiation — equivalent to a few hours of natural background radiation. Lead aprons are provided as standard. Pregnant patients should inform us before X-rays.' },
      { q: 'How often do I need X-rays?', a: 'Frequency depends on your individual risk level and clinical situation. Low-risk adults typically need bitewing X-rays every 2–3 years. Higher-risk patients may need them annually.' }
    ]
  },
  {
    id: '10',
    title: 'Orofacial Pain Management',
    slug: 'orofacial-pain-management',
    icon: 'activity',
    image: '/service_icon/Orofacial Pain menagement.jpeg',
    shortDesc: 'Specialized diagnosis and treatment for chronic facial pain, neuralgia, and complex pain syndromes.',
    fullDesc: 'Orofacial pain is one of the most misunderstood conditions in medicine. Our specialized team diagnoses and treats trigeminal neuralgia, burning mouth syndrome, and chronic facial pain.',
    whatIsIt: 'Orofacial pain management addresses chronic pain affecting the face, mouth, jaws, and head — including conditions like trigeminal neuralgia, burning mouth syndrome, myofascial pain, and headache disorders.',
    whoNeedsIt: 'Patients with unexplained facial pain, shooting or burning sensations, chronic headaches with dental or jaw involvement, or pain that has not responded to standard dental treatment.',
    process: [
      'Detailed pain history and behavioral assessment',
      'Clinical examination of head, neck, and jaw',
      'Neurological screening where indicated',
      'Diagnostic imaging and laboratory tests',
      'Multidisciplinary treatment planning',
      'Medication management and trigger point therapy',
      'Behavioral and cognitive strategies for chronic pain'
    ],
    faqs: [
      { q: 'Is orofacial pain a dental or medical problem?', a: 'Often both. Orofacial pain sits at the intersection of dentistry, neurology, and pain medicine. Our specialized training allows us to approach it from all angles.' },
      { q: 'Can chronic facial pain be cured?', a: 'Many conditions can be fully resolved. Others are managed to significantly reduce pain and improve quality of life. Early diagnosis dramatically improves outcomes.' }
    ]
  }
];
