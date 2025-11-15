export interface Garage {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  location: Location;
  services: string[];
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  contactInfo: ContactInfo;
  workingHours: WorkingHours;
  images: string[];
}

export interface Expert {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  location: Location;
  contactInfo: ContactInfo;
  certifications: string[];
  isVerified: boolean;
  avatar?: string;
}

export interface Booking {
  id: string;
  customerId: string;
  serviceProviderId: string;
  serviceType: 'garage' | 'expert';
  serviceDate: Date;
  status: BookingStatus;
  notes?: string;
  totalAmount: number;
  createdAt: Date;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  country: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
}

export interface WorkingHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

export interface TimeSlot {
  open: string;
  close: string;
  isClosed: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';