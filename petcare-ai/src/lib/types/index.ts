// ===========================================
// PetCare.ai Type Definitions
// ===========================================

// User Types
export interface User {
  id: string;
  phone: string;
  name: string | null;
  email: string | null;
  language_pref: 'en' | 'hi' | 'ta' | 'te' | 'kn';
  state: string | null;
  district: string | null;
  whatsapp_id: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

// Pet Types
export interface Pet {
  id: string;
  owner_id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string | null;
  gender: 'male' | 'female' | null;
  date_of_birth: string | null;
  weight_kg: number | null;
  photo_url: string | null;
  is_neutered: boolean;
  microchip_id: string | null;
  created_at: string;
  updated_at: string;
}

// Vet Types
export interface Vet {
  id: string;
  user_id: string;
  license_number: string;
  license_document_url: string | null;
  specializations: string[];
  years_experience: number | null;
  clinic_name: string | null;
  clinic_address: string | null;
  languages: string[];
  bio: string | null;
  consult_fee: number;
  is_verified: boolean;
  is_available: boolean;
  rating: number;
  total_consults: number;
  subscription_tier: 'basic' | 'featured';
  created_at: string;
  updated_at: string;
}

// Triage Types
export type TriageCategory = 'EMERGENCY' | 'VET_RECOMMENDED' | 'HOME_CARE';

export interface TriageResult {
  category: TriageCategory;
  confidence: number;
  summary: string;
  possible_conditions: string[];
  next_steps: string[];
  urgency_reason: string;
  disclaimer: string;
}

// Consultation Types
export type ConsultationStatus =
  | 'pending'
  | 'payment_pending'
  | 'waiting_vet'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface Consultation {
  id: string;
  pet_id: string;
  user_id: string;
  vet_id: string | null;

  // AI Triage
  ai_triage_category: TriageCategory | null;
  ai_triage_confidence: number | null;
  ai_triage_summary: string | null;
  symptoms_text: string | null;
  photo_urls: string[];

  // Consultation
  status: ConsultationStatus;
  video_room_id: string | null;
  started_at: string | null;
  ended_at: string | null;
  duration_seconds: number | null;

  // Prescription
  prescription_text: string | null;
  prescription_pdf_url: string | null;
  diagnosis: string | null;
  follow_up_date: string | null;

  // Rating
  rating: number | null;
  review_text: string | null;

  // Payment
  payment_id: string | null;
  amount: number | null;

  created_at: string;
  updated_at: string;
}

// Payment Types
export type PaymentStatus = 'created' | 'paid' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  user_id: string;
  consultation_id: string | null;

  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;

  amount: number;
  currency: string;
  status: PaymentStatus;

  vet_payout_amount: number | null;
  vet_payout_status: 'pending' | 'processed';
  vet_payout_id: string | null;

  created_at: string;
  updated_at: string;
}

// Medical Record Types
export type RecordType = 'vaccination' | 'deworming' | 'surgery' | 'checkup' | 'prescription';

export interface MedicalRecord {
  id: string;
  pet_id: string;
  record_type: RecordType;
  title: string;
  description: string | null;
  document_url: string | null;
  record_date: string;
  next_due_date: string | null;
  vet_name: string | null;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
