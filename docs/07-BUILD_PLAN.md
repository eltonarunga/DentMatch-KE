# DentMatch KE MVP: Build & Launch Plan

## 1. Phased Build Order (8 Weeks, 2 Devs)

- **Week 1: Foundations & Auth**
  - Supabase Setup (Tables, RLS)
  - Africa's Talking OTP Auth Integration.
  - Basic Next.js App routing and Layout (Tailwind).
- **Week 2: Supply Side Profiles (Dentists)**
  - Dentist Onboarding Wizard.
  - Dentist Dashboard / Profile Edit.
  - *Shippable: Dentists can sign up and create beautiful profiles.*
- **Week 3: Demand Side & Directory (Employers)**
  - Employer Signup & Clinic Profiles.
  - The "Browse Dentists" directory with exact filters (Location, Specialty, Availability).
  - *Shippable: Employers can register and see masked/summarized dentist cards.*
- **Week 4: The Core Engine (Offers)**
  - Offer Creation UI (Sending side).
  - Offer Inbox UI (Dentist side).
  - Database schema binding for offers and statuses.
- **Week 5: Monetization (M-Pesa)**
  - Daraja API STK Push setup.
  - Subscription gating logic (Locking "Send Offer" button).
  - Webhooks handling.
  - *Shippable: End-to-end flow with monetary transaction possible.*
- **Week 6: Notifications & Comms**
  - WhatsApp Business API integration wrappers.
  - SMS fallbacks.
  - Internal Messaging / Chat implementation upon Accepted Offer.
- **Week 7: Polish & RLS Security Audit**
  - Verify all Supabase RLS policies are airtight to prevent scraping.
  - Mobile responsiveness QA checking on low-end Androids.
  - Implement soft KMPDC check logic (even if manual initially, flag unverified accounts).
- **Week 8: Beta Launch**
  - Vercel production deployment.
  - DNS, SSL, error tracking (Sentry) setup.
  - Go live.

## 2. Pre-Launch Checklist

**Technical:**
- [ ] OTP auth gracefully handles invalid input and timeouts.
- [ ] RLS policies prevent unauthorized database dumps of dentist profiles.
- [ ] Daraja webhook secured.
- [ ] Images/Avatars optimized for fast 3G loading.

**Legal & Compliance (Kenya):**
- [ ] Data Protection Act 2019 compliance (Clear privacy policy).
- [ ] KMPDC Terms alignment.

**Go-to-Market Initial Seed:**
- [ ] Get 50 "Alpha" Dentists: Cold outreach via WhatsApp groups.
- [ ] Get 10 "Alpha" Clinics: Manual visits in Nairobi/Kiambu, offering 3 months free to create liquidity.

## 3. Definition of Success (Beta)
- **Top Metric**: Marketplace Liquidity (Offers Sent).
- **Goal**: >30 Offers initiated between 10 Clinics and 50 Dentists in Month 1.
- **Acceptance Metric**: >40% Offer response rate.
- **Pause Trigger**: If employers complain the quality of dentists is low, halt matching and focus exclusively on the credentialing pipeline first.
