# DentMatch KE: MVP Planning & Roadmap

## Phase 1: Foundation (Weeks 1-2)
**Goal:** Establish architecture, database rules, and basic authentication.
* Define and execute Supabase database schema.
* Implement strict Row Level Security (RLS) policies.
* Integrate Africa's Talking Phone OTP Auth.
* Build shared UI components (Buttons, Inputs, Cards, Layouts).

## Phase 2: Supply Side (Dentists) (Weeks 3-4)
**Goal:** Capture the inventory. Dentists must be able to create rich profiles.
* Build the multi-step Dentist Onboarding Wizard.
* Build Dentist Dashboard (viewing profile stats and visibility toggles).
* Seed the database with 5-10 mock dentist profiles for employer testing.

## Phase 3: Demand Side (Employers) (Weeks 5-6)
**Goal:** Enable employers to browse talent and conceptualize offers.
* Build Employer Onboarding (Clinic profile creation).
* Build the "Directory" displaying active dentists with filters.
* Build the "Send Offer" flow (Offer Form creation and state management).

## Phase 4: Core Engine & Monetization (Weeks 7-8)
**Goal:** Close the loop, allow offers to be sent, and capture revenue.
* Build the Offer Inbox for Dentists (Accept/Decline UX).
* Integrate Safaricom Daraja API for STK Push payments.
* Lock the "Send Offer" action behind active subscriptions.
* Hook up Webhooks for payment confirmation.

## Phase 5: Notifications & Polish (Week 9)
**Goal:** Ensure users are engaged without needing to constantly check the app.
* Set up WhatsApp Business API templates.
* Implement Edge Functions to trigger WhatsApp/SMS on offer changes.
* Full mobile responsiveness QA.

## Identified Risks & Mitigation
1. **Marketplace Liquidity:** (Risk) Employers won't pay if there are no dentists. (Mitigation) Make the directory free to browse, mask names/contacts. Seed initial 50 dentists via direct outreach before charging clinics.
2. **KMPDC Fraud:** (Risk) Fake licenses. (Mitigation) Manual vetting initially; build a backend admin dashboard to cross-reference KMPDC publicly available registers until an API integration is possible.
3. **Payment Drop-offs:** (Risk) STK push timeouts. (Mitigation) Clearly indicate when the user should check their phone, and provide an instant "Retry" button.
