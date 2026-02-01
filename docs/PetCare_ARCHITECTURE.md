# PetCare.ai Architecture & Implementation Plan

> **Version**: 1.0
> **Date**: January 2026
> **Status**: Ready for Implementation

---

## 1. Recommended Tech Stack

| Layer | Technology | Reasoning |
|-------|------------|-----------|
| **Frontend** | SvelteKit | Simpler than React, better performance, elegant form handling |
| **Styling** | Tailwind CSS | Matches design tokens, utility-first, fast iteration |
| **Database** | Supabase (PostgreSQL) | Real-time subscriptions, Row Level Security, generous free tier |
| **Auth** | Supabase Auth | Phone OTP built-in (critical for India), social auth |
| **Storage** | Supabase Storage | Pet photos, prescriptions, vet documents |
| **Edge Functions** | Supabase Edge Functions | Serverless, Deno-based, close to DB |
| **AI** | OpenAI GPT-4 Vision | Best multimodal model for pet image analysis |
| **WhatsApp** | Twilio WhatsApp API | Official BSP, reliable, good India support |
| **Video** | Twilio Video | WebRTC, works on mobile browsers, HIPAA-ready |
| **Payments** | Razorpay | Best India coverage, UPI, easy webhooks |
| **Hosting** | Vercel | SvelteKit native support, edge network, free tier |
| **Monitoring** | Sentry + PostHog | Error tracking + product analytics |

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PETCARE.AI SYSTEM ARCHITECTURE                       │
└─────────────────────────────────────────────────────────────────────────────┘

                                    CLIENTS
    ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
    │   WhatsApp    │    │  Landing Page │    │ Vet Dashboard │
    │   (Users)     │    │    (PWA)      │    │  (SvelteKit)  │
    └───────┬───────┘    └───────┬───────┘    └───────┬───────┘
            │                    │                    │
            ▼                    └─────────┬──────────┘
    ┌───────────────┐                      │
    │    Twilio     │                      ▼
    │   WhatsApp    │            ┌───────────────────┐
    │   Webhook     │            │      Vercel       │
    └───────┬───────┘            │   (SvelteKit)     │
            │                    └─────────┬─────────┘
            │                              │
            ▼                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SUPABASE BACKEND                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │  Edge Functions │  │    Realtime     │  │     Auth        │            │
│  │                 │  │  (WebSockets)   │  │   (Phone OTP)   │            │
│  │ • /whatsapp     │  │                 │  │                 │            │
│  │ • /triage       │  │ • Vet online    │  │ • Pet Parents   │            │
│  │ • /payment      │  │ • New patient   │  │ • Vets          │            │
│  │ • /prescription │  │ • Chat messages │  │ • Admins        │            │
│  └────────┬────────┘  └─────────────────┘  └─────────────────┘            │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │                        PostgreSQL Database                           │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │  │
│  │  │  users  │ │  pets   │ │  vets   │ │consults │ │payments │       │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘       │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────┐                                                       │
│  │     Storage     │ ← Pet photos, prescriptions, vet documents            │
│  └─────────────────┘                                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
            │                              │
            ▼                              ▼
┌───────────────────┐            ┌───────────────────┐
│   OpenAI API      │            │     Razorpay      │
│   (GPT-4 Vision)  │            │    (Payments)     │
└───────────────────┘            └───────────────────┘
            │
            ▼
┌───────────────────┐
│   Twilio Video    │
│   (Vet Calls)     │
└───────────────────┘
```

---

## 3. Data Flow Diagrams

### Flow 1: WhatsApp Triage

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           WHATSAPP TRIAGE FLOW                              │
└────────────────────────────────────────────────────────────────────────────┘

User                    Twilio              Edge Function           OpenAI
  │                        │                      │                    │
  │──"My dog is sick"─────►│                      │                    │
  │                        │──webhook POST───────►│                    │
  │                        │                      │──check user────────┤
  │                        │                      │◄─user found────────┤
  │                        │◄─"Send photo"────────│                    │
  │◄───────────────────────│                      │                    │
  │                        │                      │                    │
  │──[photo + symptoms]───►│                      │                    │
  │                        │──webhook POST───────►│                    │
  │                        │                      │──analyze image────►│
  │                        │                      │◄─triage result─────│
  │                        │                      │                    │
  │                        │                      │──save to DB────────┤
  │                        │                      │──create consult────┤
  │                        │                      │                    │
  │                        │◄─"⚠️ VET NEEDED     │                    │
  │◄───────────────────────│   [Connect ₹149]"   │                    │
  │                        │                      │                    │
  │──[clicks button]──────►│                      │                    │
  │                        │──webhook POST───────►│                    │
  │                        │                      │──create order──────┤
  │                        │                      │──Razorpay link─────┤
  │                        │◄─payment link────────│                    │
  │◄───────────────────────│                      │                    │
  │                        │                      │                    │
```

### Flow 2: Vet Consultation

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         VET CONSULTATION FLOW                               │
└────────────────────────────────────────────────────────────────────────────┘

Payment             Edge Function        Supabase           Vet Dashboard
Webhook                  │               Realtime                │
   │                     │                  │                    │
   │──payment success───►│                  │                    │
   │                     │──update consult──►                    │
   │                     │──notify vet──────►──────────────────►│
   │                     │                  │     "New patient!" │
   │                     │                  │                    │
   │                     │◄─vet accepts─────◄────────────────────│
   │                     │                  │                    │
   │                     │──create Twilio   │                    │
   │                     │  video room──────┤                    │
   │                     │                  │                    │
   │                     │──send links──────►──────────────────►│
   │                     │      │           │                    │
   │                     │      ▼           │                    │
   │                     │   WhatsApp       │                    │
   │                     │   (to user)      │                    │
   │                     │                  │                    │
```

---

## 4. Database Schema

### Core Tables

```sql
-- ============================================
-- USERS TABLE (Pet Parents)
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(255),
  language_pref VARCHAR(10) DEFAULT 'en', -- en, hi, ta, te, kn
  state VARCHAR(50),
  district VARCHAR(50),
  whatsapp_id VARCHAR(50), -- Twilio WhatsApp ID
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PETS TABLE
-- ============================================
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(20) NOT NULL, -- dog, cat, bird, etc.
  breed VARCHAR(100),
  gender VARCHAR(10),
  date_of_birth DATE,
  weight_kg DECIMAL(5,2),
  photo_url TEXT,
  is_neutered BOOLEAN DEFAULT FALSE,
  microchip_id VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- VETS TABLE
-- ============================================
CREATE TABLE vets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  license_number VARCHAR(50) NOT NULL,
  license_document_url TEXT,
  specializations TEXT[], -- ['dermatology', 'surgery', 'general']
  years_experience INTEGER,
  clinic_name VARCHAR(200),
  clinic_address TEXT,
  languages TEXT[], -- ['en', 'hi', 'ta']
  bio TEXT,
  consult_fee INTEGER DEFAULT 149, -- in INR
  is_verified BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2,1) DEFAULT 0,
  total_consults INTEGER DEFAULT 0,
  subscription_tier VARCHAR(20) DEFAULT 'basic', -- basic, featured
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONSULTATIONS TABLE
-- ============================================
CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id),
  user_id UUID REFERENCES users(id),
  vet_id UUID REFERENCES vets(id),

  -- AI Triage
  ai_triage_category VARCHAR(20), -- EMERGENCY, VET_RECOMMENDED, HOME_CARE
  ai_triage_confidence DECIMAL(3,2),
  ai_triage_summary TEXT,
  symptoms_text TEXT,
  photo_urls TEXT[],

  -- Consultation
  status VARCHAR(20) DEFAULT 'pending',
  -- pending, payment_pending, waiting_vet, in_progress, completed, cancelled

  video_room_id VARCHAR(100), -- Twilio room ID
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,

  -- Prescription
  prescription_text TEXT,
  prescription_pdf_url TEXT,
  diagnosis TEXT,
  follow_up_date DATE,

  -- Rating
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,

  -- Payment
  payment_id UUID,
  amount INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  consultation_id UUID,

  razorpay_order_id VARCHAR(100),
  razorpay_payment_id VARCHAR(100),
  razorpay_signature VARCHAR(255),

  amount INTEGER NOT NULL, -- in paise
  currency VARCHAR(3) DEFAULT 'INR',
  status VARCHAR(20) DEFAULT 'created', -- created, paid, failed, refunded

  vet_payout_amount INTEGER, -- amount to pay vet
  vet_payout_status VARCHAR(20) DEFAULT 'pending', -- pending, processed
  vet_payout_id VARCHAR(100),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- VET_AVAILABILITY TABLE
-- ============================================
CREATE TABLE vet_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vet_id UUID REFERENCES vets(id) ON DELETE CASCADE,
  day_of_week INTEGER, -- 0-6 (Sunday-Saturday)
  start_time TIME,
  end_time TIME,
  is_active BOOLEAN DEFAULT TRUE
);

-- ============================================
-- MEDICAL_RECORDS TABLE (Pet Health Passport)
-- ============================================
CREATE TABLE medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id UUID REFERENCES pets(id) ON DELETE CASCADE,
  record_type VARCHAR(50), -- vaccination, deworming, surgery, checkup, prescription
  title VARCHAR(200),
  description TEXT,
  document_url TEXT,
  record_date DATE,
  next_due_date DATE, -- for vaccinations, dewormings
  vet_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_pets_owner ON pets(owner_id);
CREATE INDEX idx_vets_available ON vets(is_available, is_verified);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_vet ON consultations(vet_id);
CREATE INDEX idx_payments_razorpay ON payments(razorpay_order_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_own_data ON users
  FOR ALL USING (auth.uid() = id);

-- Users can only see their own pets
CREATE POLICY pets_own_data ON pets
  FOR ALL USING (owner_id = auth.uid());

-- Users can see their consultations, vets can see assigned ones
CREATE POLICY consultations_access ON consultations
  FOR SELECT USING (
    user_id = auth.uid() OR
    vet_id IN (SELECT id FROM vets WHERE user_id = auth.uid())
  );
```

### Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    USERS    │       │    PETS     │       │    VETS     │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──┐   │ id (PK)     │   ┌──►│ id (PK)     │
│ phone       │   │   │ owner_id(FK)│───┘   │ user_id(FK) │───┐
│ name        │   │   │ name        │       │ license_no  │   │
│ language    │   │   │ species     │       │ is_verified │   │
│ state       │   │   │ breed       │       │ rating      │   │
└─────────────┘   │   └──────┬──────┘       └──────┬──────┘   │
                  │          │                     │          │
                  │          │                     │          │
                  │   ┌──────▼──────────────────────▼──────┐  │
                  │   │           CONSULTATIONS            │  │
                  │   ├────────────────────────────────────┤  │
                  └───│ user_id (FK)                       │  │
                      │ pet_id (FK)                        │  │
                      │ vet_id (FK)                        │◄─┘
                      │ ai_triage_category                 │
                      │ status                             │
                      │ prescription                       │
                      │ rating                             │
                      └──────────────┬─────────────────────┘
                                     │
                              ┌──────▼──────┐
                              │  PAYMENTS   │
                              ├─────────────┤
                              │ razorpay_id │
                              │ amount      │
                              │ status      │
                              └─────────────┘
```

---

## 5. API Design

### Edge Functions / API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/whatsapp/webhook` | POST | Handle incoming WhatsApp messages |
| `/api/whatsapp/send` | POST | Send WhatsApp message to user |
| `/api/triage/analyze` | POST | Send image to GPT-4 Vision, return triage |
| `/api/consultation/create` | POST | Create new consultation request |
| `/api/consultation/accept` | POST | Vet accepts consultation |
| `/api/consultation/complete` | POST | Mark consultation complete |
| `/api/payment/create-order` | POST | Create Razorpay order |
| `/api/payment/verify` | POST | Verify Razorpay payment |
| `/api/payment/webhook` | POST | Razorpay webhook handler |
| `/api/video/create-room` | POST | Create Twilio video room |
| `/api/video/token` | GET | Get Twilio access token |
| `/api/prescription/generate` | POST | Generate PDF prescription |

### SvelteKit Routes

```
src/routes/
├── +page.svelte                    # Landing page
├── +layout.svelte                  # Root layout
├── (auth)/
│   ├── login/+page.svelte          # Phone OTP login
│   └── callback/+page.svelte       # Auth callback
├── (app)/
│   ├── +layout.svelte              # App layout (requires auth)
│   ├── dashboard/+page.svelte      # Pet parent dashboard
│   ├── pets/
│   │   ├── +page.svelte            # My pets list
│   │   ├── [id]/+page.svelte       # Pet profile
│   │   └── new/+page.svelte        # Add pet
│   ├── consultations/
│   │   ├── +page.svelte            # Consultation history
│   │   └── [id]/+page.svelte       # Consultation detail
│   └── health-passport/
│       └── [petId]/+page.svelte    # Pet health records
├── vet/
│   ├── +layout.svelte              # Vet layout
│   ├── dashboard/+page.svelte      # Vet dashboard (incoming patients)
│   ├── consultation/
│   │   └── [id]/+page.svelte       # Active consultation + video
│   ├── earnings/+page.svelte       # Vet earnings
│   ├── profile/+page.svelte        # Vet profile settings
│   └── register/+page.svelte       # Vet registration
├── admin/
│   ├── +layout.svelte              # Admin layout
│   ├── dashboard/+page.svelte      # Admin dashboard
│   ├── vets/+page.svelte           # Verify vets
│   └── analytics/+page.svelte      # Platform analytics
└── api/
    ├── whatsapp/
    │   └── webhook/+server.ts      # WhatsApp webhook
    ├── triage/
    │   └── analyze/+server.ts      # AI triage
    ├── payment/
    │   ├── create-order/+server.ts
    │   ├── verify/+server.ts
    │   └── webhook/+server.ts
    └── video/
        ├── create-room/+server.ts
        └── token/+server.ts
```

---

## 6. Key Technical Decisions

### Decision 1: WhatsApp-First via Twilio

**What**: Use Twilio WhatsApp Business API as primary user interface

**Why**:
- 500M+ Indian users on WhatsApp
- No app download friction
- Works on basic phones, 2G networks
- Natural conversation flow

**Trade-off**: Limited UI compared to app, but higher adoption

### Decision 2: GPT-4 Vision for Triage (No Custom ML)

**What**: Use OpenAI's GPT-4 Vision API with custom prompts, not train custom model

**Why**:
- No ML team required
- Faster to market
- Model improves automatically
- ₹2-5 per analysis is acceptable at ₹149/consult

**Trade-off**: Dependency on OpenAI, but acceptable for MVP

### Decision 3: Supabase for Everything Backend

**What**: Single platform for DB, Auth, Storage, Edge Functions, Realtime

**Why**:
- Faster development (one platform)
- Built-in phone OTP (critical for India)
- Real-time subscriptions for vet dashboard
- Row Level Security for data isolation
- Generous free tier

**Trade-off**: Vendor lock-in, but migration path exists

### Decision 4: Razorpay over Stripe

**What**: Use Razorpay for payments

**Why**:
- Best UPI support (dominant in India)
- Lower fees for domestic transactions
- Built-in subscription management
- Local support

**Trade-off**: Less global, but we're India-first

### Decision 5: SvelteKit over Next.js

**What**: Use SvelteKit for all web interfaces

**Why**:
- Simpler mental model (no useState/useEffect)
- Better performance out of box
- Form actions are elegant for our flows
- Smaller bundle = faster on slow networks

**Trade-off**: Smaller ecosystem, but sufficient for our needs

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Day 1-2: Project Setup**
- [ ] Initialize SvelteKit project with TypeScript
- [ ] Configure Tailwind CSS with design tokens
- [ ] Set up Supabase project (database, auth, storage)
- [ ] Configure environment variables
- [ ] Set up Vercel deployment pipeline

**Day 3-4: Database & Auth**
- [ ] Create database schema (all tables)
- [ ] Set up Row Level Security policies
- [ ] Implement phone OTP authentication
- [ ] Create user registration flow
- [ ] Test auth on mobile browsers

**Day 5-7: Core Components**
- [ ] Build UI component library (buttons, cards, inputs)
- [ ] Create landing page (all sections)
- [ ] Build responsive navigation
- [ ] Implement dark/light mode (optional)

### Phase 2: Core Features (Week 3-4)

**Day 8-10: WhatsApp Integration**
- [ ] Set up Twilio WhatsApp sandbox
- [ ] Create webhook endpoint for incoming messages
- [ ] Implement conversation state machine
- [ ] Handle media (photos) reception
- [ ] Test end-to-end message flow

**Day 11-13: AI Triage**
- [ ] Integrate OpenAI GPT-4 Vision API
- [ ] Create triage prompt with Indian pet context
- [ ] Build triage response flow
- [ ] Store triage results in database
- [ ] Handle edge cases (unclear images, etc.)

**Day 14-16: Vet Dashboard**
- [ ] Build vet registration flow
- [ ] Create vet dashboard (incoming patients)
- [ ] Implement availability toggle (real-time)
- [ ] Build consultation queue view
- [ ] Add consultation accept/reject flow

**Day 17-19: Video Consultation**
- [ ] Integrate Twilio Video SDK
- [ ] Create video room component
- [ ] Implement prescription writing interface
- [ ] Build consultation summary screen
- [ ] Generate PDF prescription

**Day 20-21: Payments**
- [ ] Integrate Razorpay SDK
- [ ] Create payment order flow
- [ ] Handle payment verification
- [ ] Implement vet payout tracking
- [ ] Add payment history views

### Phase 3: Polish & Launch (Week 5-6)

**Day 22-24: Pet Parent Features**
- [ ] Build pet profile management
- [ ] Create Pet Health Passport
- [ ] Add vaccination reminders
- [ ] Implement consultation history
- [ ] Build rating system

**Day 25-27: Admin & Analytics**
- [ ] Create admin dashboard
- [ ] Build vet verification workflow
- [ ] Add platform analytics
- [ ] Implement basic reporting
- [ ] Set up monitoring (Sentry)

**Day 28-30: Testing & Launch**
- [ ] End-to-end testing (WhatsApp → payment → video)
- [ ] Mobile browser testing (Chrome, Safari)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Soft launch with 10 vets, 50 users

---

## 8. Project Structure

```
petcare-ai/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/                 # Base UI components
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Card.svelte
│   │   │   │   ├── Input.svelte
│   │   │   │   └── ...
│   │   │   ├── landing/            # Landing page sections
│   │   │   │   ├── Hero.svelte
│   │   │   │   ├── HowItWorks.svelte
│   │   │   │   └── ...
│   │   │   ├── vet/                # Vet dashboard components
│   │   │   │   ├── PatientQueue.svelte
│   │   │   │   ├── VideoCall.svelte
│   │   │   │   └── ...
│   │   │   └── pet/                # Pet-related components
│   │   │       ├── PetCard.svelte
│   │   │       └── HealthPassport.svelte
│   │   ├── server/
│   │   │   ├── supabase.ts         # Supabase client
│   │   │   ├── openai.ts           # OpenAI client
│   │   │   ├── twilio.ts           # Twilio clients
│   │   │   └── razorpay.ts         # Razorpay client
│   │   ├── stores/
│   │   │   ├── auth.ts             # Auth state
│   │   │   └── realtime.ts         # Real-time subscriptions
│   │   ├── utils/
│   │   │   ├── triage.ts           # Triage logic
│   │   │   ├── whatsapp.ts         # WhatsApp message builders
│   │   │   └── pdf.ts              # PDF generation
│   │   └── types/
│   │       └── index.ts            # TypeScript types
│   ├── routes/
│   │   └── ... (as described above)
│   └── app.html
├── static/
│   └── images/
├── supabase/
│   ├── migrations/                  # Database migrations
│   └── functions/                   # Edge functions (if separate)
├── tests/
│   ├── unit/
│   └── e2e/
├── docs/
│   ├── PetCare_PRD.md
│   ├── PetCare_DESIGN.md
│   └── PetCare_ARCHITECTURE.md
├── .env.example
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 9. Environment Variables

```bash
# .env.example

# Supabase
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# OpenAI
OPENAI_API_KEY=sk-...

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=+14155238886
TWILIO_API_KEY=SK...
TWILIO_API_SECRET=...

# Razorpay
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...

# App
PUBLIC_APP_URL=https://petcare.ai
```

---

## 10. Getting Started

```bash
# 1. Create SvelteKit project
npx sv create petcare-ai
cd petcare-ai

# 2. Install dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install openai
npm install twilio
npm install razorpay
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/node

# 3. Initialize Tailwind
npx tailwindcss init -p

# 4. Set up Supabase
npx supabase init
npx supabase login
npx supabase link --project-ref your-project-ref

# 5. Copy environment variables
cp .env.example .env.local

# 6. Start development
npm run dev
```

---

## 11. Third-Party Setup Checklist

### Supabase
- [ ] Create project at supabase.com
- [ ] Enable Phone Auth provider
- [ ] Run database migrations
- [ ] Set up storage buckets (pets, prescriptions, vet-docs)
- [ ] Configure RLS policies

### Twilio
- [ ] Create account at twilio.com
- [ ] Set up WhatsApp Sandbox (for development)
- [ ] Apply for WhatsApp Business API (for production)
- [ ] Configure webhook URL
- [ ] Set up Twilio Video

### Razorpay
- [ ] Create account at razorpay.com
- [ ] Get test API keys
- [ ] Configure webhook URL
- [ ] Set up payment pages (optional)

### OpenAI
- [ ] Create account at openai.com
- [ ] Generate API key
- [ ] Set usage limits (important for cost control)

### Vercel
- [ ] Connect GitHub repository
- [ ] Configure environment variables
- [ ] Set up custom domain

---

## 12. AI Triage Prompt

```
You are a veterinary triage AI for PetCare.ai, an Indian pet health platform.
Analyze the pet photo and symptoms to categorize urgency.

CATEGORIES:
- EMERGENCY: Requires immediate vet attention
  Examples: bleeding, difficulty breathing, seizures, poisoning, severe injury,
  bloating, loss of consciousness, severe vomiting/diarrhea with blood

- VET_RECOMMENDED: Should see vet within 24-48 hours
  Examples: persistent scratching, skin infections, eye discharge, limping,
  loss of appetite >24hrs, unusual lethargy, ear infections

- HOME_CARE: Can be managed at home with guidance
  Examples: minor scratches, occasional vomiting, mild diarrhea,
  slight behavior changes, minor skin irritation

IMPORTANT:
- Always err on the side of caution
- If uncertain, recommend VET_RECOMMENDED
- Never diagnose - only triage
- Consider Indian breeds (Indie, Rajapalayam, Mudhol, etc.)
- Account for Indian climate conditions

RESPONSE FORMAT (JSON):
{
  "category": "EMERGENCY|VET_RECOMMENDED|HOME_CARE",
  "confidence": 0.0-1.0,
  "summary": "Brief description of what you observe (2-3 sentences)",
  "possible_conditions": ["condition1", "condition2"],
  "next_steps": ["Step 1", "Step 2", "Step 3"],
  "urgency_reason": "Why this urgency level",
  "disclaimer": "This is AI-assisted triage, not a diagnosis. Always consult a veterinarian for medical advice."
}
```

---

## 13. Security Considerations

### Data Protection
- [ ] All data encrypted in transit (TLS 1.3)
- [ ] All data encrypted at rest (Supabase default)
- [ ] PII masked in logs
- [ ] GDPR-compliant data deletion

### Authentication
- [ ] Phone OTP verification
- [ ] Session management via Supabase
- [ ] Rate limiting on auth endpoints
- [ ] Vet license verification (manual)

### Payments
- [ ] Razorpay handles PCI DSS compliance
- [ ] Webhook signature verification
- [ ] No card data stored locally

### Video
- [ ] Twilio handles encryption
- [ ] Video recordings auto-delete after 30 days
- [ ] Room access tokens with expiry

### API Security
- [ ] Rate limiting on all endpoints
- [ ] Input validation
- [ ] CORS configuration
- [ ] Webhook signature verification

---

## 14. Monitoring & Observability

### Error Tracking (Sentry)
- [ ] Client-side error tracking
- [ ] Server-side error tracking
- [ ] Source maps uploaded
- [ ] Alerts configured

### Analytics (PostHog)
- [ ] Page views
- [ ] Feature usage
- [ ] Funnel analysis
- [ ] Session recordings (optional)

### Key Metrics Dashboard
- [ ] Active users (DAU/MAU)
- [ ] Consultations per day
- [ ] AI triage accuracy (vet feedback)
- [ ] Payment success rate
- [ ] Vet response time
- [ ] Video call quality

---

## Architecture Summary

| Component | Technology | Status |
|-----------|------------|--------|
| Frontend | SvelteKit + Tailwind | Ready to build |
| Database | Supabase PostgreSQL | Schema designed |
| Auth | Supabase Phone OTP | Ready |
| Storage | Supabase Storage | Ready |
| AI | OpenAI GPT-4 Vision | Prompt ready |
| WhatsApp | Twilio | Integration planned |
| Video | Twilio Video | Integration planned |
| Payments | Razorpay | Integration planned |
| Hosting | Vercel | Ready |

---

*Generated with IdeaRalph + Claude Code*
