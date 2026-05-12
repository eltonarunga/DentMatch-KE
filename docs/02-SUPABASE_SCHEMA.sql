# DentMatch KE MVP: Supabase PostgreSQL Schema

This schema provides the foundation for the DentMatch KE marketplace. It includes tables for users, profiles, offers, subscriptions, and notifications, along with Row Level Security (RLS) policies for data privacy.

```sql
-- Enhance Postgres with UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. ENUMS
-- ==============================================================================
CREATE TYPE user_role AS ENUM ('dentist', 'employer', 'admin');
CREATE TYPE availability_type AS ENUM ('full_time', 'locum', 'both');
CREATE TYPE facility_type AS ENUM ('private_clinic', 'hospital_unit', 'ngo', 'county_facility');
CREATE TYPE offer_status AS ENUM ('pending', 'accepted', 'declined', 'withdrawn');
CREATE TYPE subscription_status AS ENUM ('active', 'expired', 'canceled', 'past_due');
CREATE TYPE notification_type AS ENUM ('new_offer', 'offer_accepted', 'offer_declined', 'subscription_expiring', 'system_alert');

-- ==============================================================================
-- 2. TABLES
-- ==============================================================================

-- USERS (Extends Supabase Auth Auth.users optionally, or relies purely on custom table based on OTP)
-- Typically, you link this tightly to auth.users using a trigger.
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DENTIST PROFILES
CREATE TABLE public.dentist_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    kmpdc_number VARCHAR(100) UNIQUE NOT NULL,
    specialty VARCHAR(100) NOT NULL, -- e.g. General Dentistry, Orthodontics, COHO
    experience_years INTEGER NOT NULL DEFAULT 0,
    preferred_county VARCHAR(100) NOT NULL,
    expected_salary_min INTEGER NOT NULL, -- Stored in KES
    expected_salary_max INTEGER,
    availability availability_type NOT NULL,
    is_active BOOLEAN DEFAULT true, -- For pausing visibility
    is_verified BOOLEAN DEFAULT false, -- Admin/KMPDC verification flag
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- EMPLOYER PROFILES (Facilities)
CREATE TABLE public.employer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    facility_name VARCHAR(255) NOT NULL,
    location_county VARCHAR(100) NOT NULL,
    facility_type facility_type NOT NULL,
    equipment_list TEXT[], -- Array of available equipment
    patient_volume VARCHAR(50), -- e.g., '10-30 per day'
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- OFFERS (The core reverse-recruitment mechanism)
CREATE TABLE public.offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES public.employer_profiles(id) ON DELETE CASCADE,
    dentist_id UUID REFERENCES public.dentist_profiles(id) ON DELETE CASCADE,
    role_title VARCHAR(255) NOT NULL,
    salary_offered INTEGER NOT NULL,
    hours_per_week INTEGER,
    start_date DATE,
    message TEXT,
    status offer_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- MESSAGES (Internal comms directly tied to offers for context)
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offer_id UUID REFERENCES public.offers(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUBSCRIPTIONS (For Employers)
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID REFERENCES public.employer_profiles(id) ON DELETE CASCADE,
    status subscription_status DEFAULT 'active',
    mpesa_receipt_number VARCHAR(50) UNIQUE,
    amount_paid INTEGER NOT NULL,
    valid_from TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTIFICATIONS (Used to trigger / track WhatsApp & SMS sends)
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    external_sent_status VARCHAR(50) DEFAULT 'pending', -- pending, sent_whatsapp, sent_sms, failed
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX idx_dentist_profiles_search 
ON public.dentist_profiles (specialty, preferred_county, availability) WHERE is_active = true;

CREATE INDEX idx_offers_dentist_id ON public.offers (dentist_id);
CREATE INDEX idx_offers_employer_id ON public.offers (employer_id);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dentist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own base user record
CREATE POLICY "Users view own record" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own record" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Dentists can view and edit their own profile
CREATE POLICY "Dentists manage own profile" ON public.dentist_profiles 
    FOR ALL USING (user_id = auth.uid());

-- Employers can view all ACTIVE dentist profiles 
-- (In production, restrict so employers can only view if they have a valid sub, handled at application edge or deeper RLS)
CREATE POLICY "Employers view active dentists" ON public.dentist_profiles 
    FOR SELECT USING (is_active = true);

-- Employers can manage their own profile
CREATE POLICY "Employers manage own profile" ON public.employer_profiles 
    FOR ALL USING (user_id = auth.uid());

-- Dentists can view employer profiles
CREATE POLICY "Dentists view employers" ON public.employer_profiles 
    FOR SELECT USING (true);

-- Offers: Employers can create and view their sent offers
CREATE POLICY "Employers manage own offers" ON public.offers 
    FOR ALL USING (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));

-- Offers: Dentists can view offers sent to them and update status (accept/decline)
CREATE POLICY "Dentists view and update received offers" ON public.offers 
    FOR SELECT USING (dentist_id IN (SELECT id FROM public.dentist_profiles WHERE user_id = auth.uid()));
CREATE POLICY "Dentists update received offers" ON public.offers 
    FOR UPDATE USING (dentist_id IN (SELECT id FROM public.dentist_profiles WHERE user_id = auth.uid()))
    WITH CHECK (status IN ('accepted', 'declined'));

-- Subscriptions: Employers can only see their own
CREATE POLICY "Employers view own subscriptions" ON public.subscriptions 
    FOR SELECT USING (employer_id IN (SELECT id FROM public.employer_profiles WHERE user_id = auth.uid()));
```
