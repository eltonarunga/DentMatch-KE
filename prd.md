# Product Requirements Document (PRD): DentMatch KE

## 1. Product Overview
DentMatch KE is a reverse-recruitment marketplace for the Kenyan dental industry. Dentists create passive, verified profiles. Employers (Clinics, Hospitals) browse these profiles and proactively send job offers (Locum or Full-Time).

## 2. Target Audience
**Supply Side: Dental Professionals**
* Dentists (BDS/MDS), Community Oral Health Officers (COHOs), Dental Technologists.
* **Pain Points:** Low salary transparency, unclear clinic equipment quality, tedious application processes.
* **Goals:** Receive competitive offers, find weekend locum shifts to supplement income, work in well-equipped environments.

**Demand Side: Employers**
* Private Dental Clinics, County Hospitals, Mission Hospitals, NGOs.
* **Pain Points:** Months-long time-to-hire, low quality of applicants on generic job boards, lack of passive candidate access.
* **Goals:** Quickly identify qualified candidates, verify KMPDC licenses easily, fill urgent locum gaps within 24-48 hours.

## 3. MVP Core Scope

### 3.1. Authentication
* Mobile Phone Number + OTP (via Africa's Talking).
* Single identity, user selects role (Dentist vs Employer) during onboarding.

### 3.2. Dentist Experience
* **Profile Creation:** Full Legal Name, KMPDC number, Specialty, Experience, Preferred County, Minimum Expected Salary, Availability (Locum/Full-Time).
* **Dashboard:** View received offers.
* **Offer Management:** Accept, Decline with a reason, or message the employer for clarification.

### 3.3. Employer Experience
* **Clinic Profile:** Clinic Name, Location, Facility Type, Equipment available.
* **The Directory:** Browse all active dentists. Filter by Specialty, County, Availability.
* **Send Offer:** Form requiring Role Title, Offered Salary, Hours, Start Date, and an introductory message.
* **Subscription Wall:** Freemium access to browse; active M-Pesa subscription required to send an offer.

### 3.4. Match & Communication
* **Notification System:** WhatsApp primary, SMS fallback.
* Notifications triggered on: New Offer, Offer Accepted, Offer Declined.

## 4. Out of Scope for MVP
* AI-based screening and matching algorithms (stick to manual filtering).
* Tele-dentistry scheduling.
* In-app video interviewing.
* Advanced HR Analytics and Payroll integrations.
* Native iOS/Android apps (Progressive Web App / responsive mobile web is sufficient).

## 5. Success Metrics (Month 1)
* **Liquidity:** 50 Dentists, 10 Clinics onboarded.
* **Activity:** 30 Offers Sent.
* **Conversion:** > 40% Offer response rate (Accept or Decline).
