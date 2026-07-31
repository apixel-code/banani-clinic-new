import { FACEBOOK_PAGE_URL, YOUTUBE_CHANNEL_URL } from '../data/social';

export const SITE_NAME = 'Dental & Maxillofacial Surgery | Banani Clinic (Specialized Hospital)';
export const SITE_URL = 'https://bananiclinic.com';

/** Profiles search engines should treat as the same entity as this site. */
const SOCIAL_PROFILES = [FACEBOOK_PAGE_URL, YOUTUBE_CHANNEL_URL];

export function buildTitle(pageTitle: string) {
  return `${pageTitle} | ${SITE_NAME}`;
}

export const CLINIC_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'LocalBusiness'],
  name: 'Dental & Maxillofacial Surgery | Banani Clinic (Specialized Hospital)',
  url: SITE_URL,
  telephone: '+8801711780957',
  email: 'aslam.almehdi@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'House #116, Road # 15, Block # C, Banani',
    addressLocality: 'Dhaka',
    postalCode: '1213',
    addressCountry: 'BD',
  },
  priceRange: '$$',
  sameAs: SOCIAL_PROFILES,
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
  sameAs: SOCIAL_PROFILES,
};
