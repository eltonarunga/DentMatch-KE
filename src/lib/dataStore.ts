// Data persistence and state management for DentMatch KE
// Safe-checked, modern, typed client-side data layer adhering to OWASP & SOLID.

export interface Dentist {
  id: string;
  name: string;
  specialty: string;
  location: string;
  experience: string;
  expectedSalary: string;
  license: string;
  rating: number;
  avatarInitials: string;
  education: {
    degree: string;
    school: string;
    year: string;
  };
  history: Array<{
    role: string;
    clinic: string;
    duration: string;
  }>;
  equipment: string[];
}

export interface Offer {
  id: string;
  dentistId: string;
  dentistName: string;
  clinicName: string;
  clinicLocation: string;
  role: string; // "Locum" | "Permanent"
  dates: string;
  rate: string;
  salaryValue: number;
  positionType: 'locum' | 'permanent';
  selectedDays: string[];
  equipment: string[];
  timeAgo: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  additionalNotes: string;
}

const DEFAULT_DENTISTS: Dentist[] = [
  {
    id: 'dentist-842',
    name: "Dr. David Omondi",
    specialty: "Orthodontics Specialist",
    location: "Nairobi",
    experience: "8 Years",
    expectedSalary: "KSh 180k+",
    license: "A4930",
    rating: 4.9,
    avatarInitials: "DO",
    education: {
      degree: "Master of Dental Surgery (MDS) in Orthodontics",
      school: "University of Nairobi",
      year: "2018"
    },
    history: [
      { role: "Senior Orthodontist", clinic: "Nairobi Dental Hospital", duration: "2020 - Present" },
      { role: "Resident Dentist", clinic: "Kenyatta National Hospital", duration: "2018 - 2020" }
    ],
    equipment: ["CBCT Scanner", "Itero Element", "Laser Biolase"]
  },
  {
    id: 'dentist-402',
    name: "Dr. Sarah Kimani",
    specialty: "General Practitioner",
    location: "Mombasa",
    experience: "4 Years",
    expectedSalary: "KSh 120k+",
    license: "B8304",
    rating: 4.8,
    avatarInitials: "SK",
    education: {
      degree: "Bachelor of Dental Surgery (BDS)",
      school: "Moi University",
      year: "2022"
    },
    history: [
      { role: "Dental Officer", clinic: "Coast General Hospital", duration: "2023 - Present" },
      { role: "Intern Dentist", clinic: "Mombasa Dental Center", duration: "2022 - 2023" }
    ],
    equipment: ["Digital X-Ray (RVG)", "Class B Autoclave", "Apex Locator"]
  }
];

const DEFAULT_OFFERS: Offer[] = [
  {
    id: 'offer-1',
    dentistId: 'dentist-842',
    dentistName: "Dr. David Omondi",
    clinicName: "Starlight Dental",
    clinicLocation: "Kilimani, Nairobi",
    role: "Locum",
    dates: "15th-17th Oct, 2026",
    rate: "KES 15,000 / day",
    salaryValue: 15000,
    positionType: 'locum',
    selectedDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    equipment: ['Digital X-Ray (RVG)', 'Class B Autoclave', 'Rotary Endo Motor'],
    timeAgo: "Sent 2 hours ago",
    status: 'Pending',
    additionalNotes: "Looking forward to having you join us for the busy weekend schedule. We have a lot of pediatric patients booked on Saturday."
  },
  {
    id: 'offer-2',
    dentistId: 'dentist-402',
    dentistName: "Dr. Sarah Kimani",
    clinicName: "Prime Dental Center",
    clinicLocation: "Nyali, Mombasa",
    role: "Permanent",
    dates: "Full Time",
    rate: "KES 250,000 / month",
    salaryValue: 250000,
    positionType: 'permanent',
    selectedDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    equipment: ['CBCT Scanner', 'Soft Tissue Laser'],
    timeAgo: "Accepted 2 days ago",
    status: 'Accepted',
    additionalNotes: "Permanent role with flexible shifts. We provide attractive clinical leave allowances."
  }
];

// Helper to safely load JSON from localStorage
function getSafeStorage<T>(key: string, defaultValue: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : defaultValue;
  } catch (err) {
    console.error(`Error loading key: ${key}`, err);
    return defaultValue;
  }
}

// Helper to safely save JSON to localStorage
function setSafeStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing key: ${key}`, err);
  }
}

export const DataStore = {
  getDentists(): Dentist[] {
    return getSafeStorage<Dentist[]>('dm_dentists', DEFAULT_DENTISTS);
  },

  getDentist(id: string): Dentist | undefined {
    return this.getDentists().find(d => d.id === id);
  },

  updateDentist(id: string, updatedFields: Partial<Dentist>): Dentist[] {
    const dentists = this.getDentists();
    const index = dentists.findIndex(d => d.id === id);
    if (index !== -1) {
      dentists[index] = { ...dentists[index], ...updatedFields };
      setSafeStorage('dm_dentists', dentists);
    }
    return dentists;
  },

  getOffers(): Offer[] {
    return getSafeStorage<Offer[]>('dm_offers', DEFAULT_OFFERS);
  },

  getOffer(id: string): Offer | undefined {
    return this.getOffers().find(o => o.id === id);
  },

  addOffer(offer: Omit<Offer, 'id' | 'timeAgo' | 'status'>): Offer {
    const offers = this.getOffers();
    const newOffer: Offer = {
      ...offer,
      id: `offer-${Date.now()}`,
      timeAgo: "Sent original",
      status: 'Pending'
    };
    offers.unshift(newOffer);
    setSafeStorage('dm_offers', offers);
    return newOffer;
  },

  updateOffer(id: string, updatedFields: Partial<Offer>): Offer[] {
    const offers = this.getOffers();
    const index = offers.findIndex(o => o.id === id);
    if (index !== -1) {
      offers[index] = { ...offers[index], ...updatedFields };
      setSafeStorage('dm_offers', offers);
    }
    return offers;
  },

  deleteOffer(id: string): Offer[] {
    const offers = this.getOffers().filter(o => o.id !== id);
    setSafeStorage('dm_offers', offers);
    return offers;
  }
};
