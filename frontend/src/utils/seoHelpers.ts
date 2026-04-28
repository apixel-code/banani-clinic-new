export const SITE_NAME = 'Dental & Maxillofacial Surgery | Banani Clinic (Specialized Hospital)';
export const SITE_URL = 'https://bananiclinic.com';

export function buildTitle(pageTitle: string) {
  return `${pageTitle} | ${SITE_NAME}`;
}

export const CLINIC_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  name: 'Dental & Maxillofacial Surgery | Banani Clinic (Specialized Hospital)',
  url: SITE_URL,
  telephone: '+8801311129952',
  email: 'aslam.almehdi@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'House #78/E, Road #12, Banani',
    addressLocality: 'Dhaka',
    postalCode: '1213',
    addressCountry: 'BD',
  },
  priceRange: '$$',
};

export const DOCTOR_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Aslam Al Mehdi',
  jobTitle: 'Oral & Maxillofacial Surgeon, Periodontist',
  affiliation: {
    '@type': 'MedicalOrganization',
    name: 'Dental & Maxillofacial Surgery | Banani Clinic (Specialized Hospital)',
  },
};
