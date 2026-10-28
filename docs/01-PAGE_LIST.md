# DentMatch KE: Implemented Screen & Route Reference

## 1. Landing & Authentication
- **`/` (Landing Page)**: Dual-sided reverse recruitment platform introduction. Live marketplace stats (KMPDC verified counts, average match times, county coverage), value proposition for dentists and clinics, and interactive entry points.
- **`/login` (Phone OTP Authentication)**: Kenyan mobile-first authentication (+254 / 07XX / 01XX). Triggers SMS/WhatsApp OTP code (test code: `7788` or `1234`). Role selector between Dentist and Dental Clinic.

## 2. Supply Side: Dentist Experience
- **`/onboarding` (Dentist Onboarding Wizard)**:
  - Step 1: KMPDC license lookup against live official registry (`A4930`, `B8304`, `C5921`), specialty selector, and years of clinical practice.
  - Step 2: Rate expectations (daily locum rate & permanent monthly salary in KES), retention certificate drag-and-drop uploader.
  - Step 3: Profile activation and active locum toggle.
- **`/dashboard` (Dentist Dashboard)**: Real-time received binding offers, status breakdown (Pending, Accepted, Countered), market rate benchmarks by Kenyan county, and quick-action response buttons (Accept, Counter-Offer, WhatsApp chat).
- **`/review-offer?offerId=:id` (Offer Review & Counter Negotiation)**: Dedicated contract review page showing clinic facilities, chairside assistant availability, equipment list, proposed dates and compensation. Allows accepting (generates WhatsApp direct link) or submitting counter-rate proposals.
- **`/profile/dentist`**: Detailed clinical CV view featuring KMPDC registration badge, education, clinical history, equipment proficiency, and contact visibility controls.

## 3. Demand Side: Dental Clinic Experience
- **`/browse` (Verified Talent Browser)**: Filterable dentist directory by Specialty (Orthodontics, Oral Surgery, Pediatric, Periodontics, etc.), Location/County (Nairobi, Mombasa, Kisumu, Nakuru, Eldoret), Minimum Experience, and Daily Locum Rates.
- **`/send-offer?dentistId=:id` (Reverse-Recruitment Offer Builder)**:
  - Role selection (Locum per day vs. Permanent per month).
  - Compensation in KES with real-time Nairobi market benchmarks.
  - Clinical equipment checklist (RVG, CBCT, Rotary Endo, Class B Autoclave).
  - Safaricom Lipa Na M-Pesa STK Push escrow guarantee checkout.
  - Direct WhatsApp alert generation to the doctor.
- **`/profile/clinic` (Clinic Operations Profile)**: Facility equipment specifications, KMPDC facility registration number, physical branch location, and tracking of all sent offers with live escrow status.

## 4. Legal & Regulatory Compliance
- **`/privacy-policy`**: Kenyan Data Protection Act (2019) compliance, medical practitioner anonymity and credential safeguarding.
- **`/terms`**: KMPDC ethical guidelines compliance, reverse-recruitment terms, and Safaricom Lipa Na M-Pesa escrow rules.
