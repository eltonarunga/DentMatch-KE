# Technical Architecture

## 1. System Components

* **Frontend Client:** React (Vite / Next.js app router), deployed on Vercel or locally in AI Studio. Handles all UI, state, and client-side validation.
* **Backend / Database:** Supabase (PostgreSQL). Acts as the primary backend-as-a-service.
* **Authentication Provider:** Supabase Auth (configured for Phone OTP via external SMS provider).
* **SMS/USSD Gateway:** Africa's Talking API.
* **Payments Gateway:** Safaricom Daraja API (Lipa Na M-Pesa).
* **Notifications Gateway:** WhatsApp Business API (e.g., via Twilio or Meta directly).

## 2. Infrastructure Diagram

```text
[ Mobile/Web Browser ] 
        |
        v (HTTPS)
[ Frontend (React/Vite) ] <--- State Management, UI
        |
        v 
[ Supabase ]
   |- PostgreSQL (Core Data)
   |- GoTrue (Authentication API)
   |- PostgREST (Auto-generated Data APIs)
   |- Edge Functions (Webhooks, Secure Integrations)
        |
        |---> [ Africa's Talking API ] (Send OTP Auth, SMS Fallback)
        |---> [ Safaricom Daraja API ] (M-Pesa STK Push)
        |---> [ WhatsApp Business API ] (Transactional Notifications)
```

## 3. Database Schema Overview

The Supabase PostgreSQL database revolves around `users` acting as a strict parent to either `dentist_profiles` or `employer_profiles`. The transactional core is the `offers` table.

* **Users:** Linked to Auth. Single point of contact (phone number).
* **Dentist Profiles (Supply):** Contains KMPDC verifications, salary limits, availability.
* **Employer Profiles (Demand):** Contains clinic details, equipment lists.
* **Offers:** Links an Employer to a Dentist. Tracks status (`pending`, `accepted`, `declined`).
* **Subscriptions:** Tracks M-Pesa payments from employers granting them row-level access to send offers.

*(See `docs/02-SUPABASE_SCHEMA.sql` for exact DDL and RLS).*

## 4. Security & Compliance

* **Row Level Security (RLS):** All Supabase tables MUST have RLS enforced. Dentists can only see their own private info. Employers can only see dentists if they are active, and can only see their own sent offers.
* **Data Protection:** Compliance with Kenya Data Protection Act. PII (phone numbers) are hidden from employers until an offer is explicitly accepted.
* **Secure Webhooks:** Verification of Safaricom Daraja webhook payloads using shared secrets to prevent fraudulent subscription activations.

## 5. Third-Party Integrations

### 5.1 Safaricom Daraja (M-Pesa)
Used exclusively for Employer subscriptions.
* **Flow:** STK Push (Lipa na M-Pesa online).
* **Architecture:** Frontend requests payment -> Supabase Edge function triggers Daraja API -> User inputs PIN -> Daraja calls Supabase Webhook to confirm payment -> Supabase updates `subscriptions` table.

### 5.2 Africa's Talking
* **Auth:** Handles outbound OTP SMS for login/signup.
* **Fallback:** Handles transactional SMS if a WhatsApp message fails to deliver (e.g., user is offline or not registered on WhatsApp).
