# DentMatch KE

**Kenya's First Reverse-Recruitment Platform for Dental Professionals**

## Vision
To solve the severe dental workforce shortage and maldistribution in Kenya by creating a transparent, efficient, and direct marketplace connecting verified dental professionals with healthcare facilities.

## The Problem
Kenya has a severe dentist shortage (roughly 800–1,300 registered dentists for ~55 million people). The traditional hiring process is slow, relationship-driven, and highly informal. Employers struggle to find talent, and dentists lack visibility into the best opportunities regarding salary, location, and clinic equipment.

## The Solution
DentMatch KE flips the script. It operates a reverse-recruitment model (inspired by Incredible Health):
1. **Dentists** create rich, verified profiles stating their specialties, expected salary, and required environment.
2. **Employers (Clinics/Hospitals)** browse this anonymized pool of talent and send direct, transparent offers to the candidates.
3. Dentists choose which offers to accept, revealing their contact information and opening direct communication.

## Tech Stack
* **Frontend:** React (Next.js/Vite), Tailwind CSS, Lucide Icons, React Router.
* **Backend / Database:** Supabase (PostgreSQL, Row Level Security, Edge Functions).
* **Authentication:** Phone OTP via Africa's Talking (Low-friction, Mobile-first).
* **Payments:** Safaricom Daraja API (M-Pesa STK Push for employer subscriptions).
* **Notifications:** WhatsApp Business API + SMS Fallback (Africa's Talking).
* **Hosting:** Vercel (or Google Cloud Platform / AWS Africa).

## Features
* **KMPDC Verification:** Building institutional trust by verifying dental licenses.
* **Locum & Permanent:** Catering to both immediate temporary needs and long-term hiring.
* **Employer Subscriptions:** Freemium for dentists, pay-to-message SaaS model for clinics.
* **Mobile First:** Designed for Android and 3G networks primarily used across the country.

## Getting Started

### Prerequisites
* Node.js (v18+)
* Supabase Account
* Africa's Talking Account (for Auth/SMS)
* Safaricom Daraja Developer Account

### Development
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Set up your `.env` following `.env.example`.

## Documentation Structure
* `prd.md`: Product Requirements Document.
* `architecture.md`: Technical architecture and database schema details.
* `planning.md`: Product roadmap and phased rollout strategy.
* `tasks.md`: Active task tracking for the MVP build.
* `AGENTS.md`: Guidelines for AI agents working on this repository.
