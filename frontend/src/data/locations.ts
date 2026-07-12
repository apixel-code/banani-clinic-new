export interface ClinicLocation {
  id: string;
  name: string;
  tagline?: string;
  label: string;
  address: string;
  hours: string;
  phones: string[];
  email: string;
  website: string;
}

export const CLINIC_NAME = "Banani Clinic (Specialized Hospital)";
export const CLINIC_TAGLINE = "Dental, Oral & Maxillofacial Surgery";

export const locations: ClinicLocation[] = [
  {
    id: "banani",
    name: "Banani Clinic (Specialized Hospital)",
    tagline: "Dental, Oral & Maxillofacial Surgery",
    label: "Main Branch",
    address: "House # 116, Road # 15, Block # C, Banani, Dhaka-1213",
    hours: "10:00 AM – 5:00 PM",
    phones: ["01711780957", "01711780958"],
    email: "aslam.almehdi@gmail.com",
    website: "https://www.bananiclinic.com",
  },
  {
    id: "bio",
    name: "BIO Dental & Maxillofacial Surgery Clinic",
    label: "Branch",
    address:
      "Lavel 8, Praasad Trade Centre, 6 Kemal Ataturk Avenue, Banani, Dhaka-1213",
    hours: "5:00 PM – 9:00 PM",
    phones: ["01711734470", "01711734478"],
    email: "aslam.almehdi@gmail.com",
    website: "https://www.bioplasticsurgeryclinic.com",
  },
  {
    id: "royal",
    name: "Royal Dental & Maxillofacial Surgery",
    label: "Branch",
    address: "House # 78/E, Road # 12, Banani, Dhaka-1213",
    hours: "10:00 AM – 9:00 PM",
    phones: ["01311129952", "01311129953"],
    email: "aslam.almehdi@gmail.com",
    website: "https://www.rdmsbd.com",
  },
];

/** Build a `tel:` href in +880 international format from a local BD number. */
export function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+880${digits.replace(/^0/, "")}`;
}

/** Strip protocol / www for a compact display label. */
export function websiteLabel(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

/** Keyless Google Maps embed URL derived from the address. */
export function mapEmbedSrc(address: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
}
