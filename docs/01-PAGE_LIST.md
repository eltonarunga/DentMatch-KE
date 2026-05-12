# DentMatch KE MVP: Page & Screen List

## 1. Landing & Auth Pages
- **`/` (Landing Page)**: dual-sided value proposition, call-to-actions for Dentists and Employers.
- **`/login` / `/signup`**: Phone number entry UI -> OTP verification UI (handled via Africa's Talking SMS).

## 2. Dentist Flow (Supply Side)
- **`/dentist/onboarding`**: Step-by-step profile creation wizard.
- **`/dentist/dashboard`**: Read-only overview of profile stats, active visibility toggle, recent offers summary.
- **`/dentist/profile`**: Edit details (KMPDC, specialty, county, salary expectations).
- **`/dentist/offers`**: List view of received applications/offers from employers.
- **`/dentist/offers/[id]`**: Detailed view of a specific offer (employer details, salary, role). Actions: Accept, Decline, Message.

## 3. Employer Flow (Demand Side)
- **`/employer/onboarding`**: Clinic setup (Name, location, equipment, patient volume).
- **`/employer/browse`**: The primary marketplace directory. Lists verified passive dentists. Includes filters (County, Specialty, Availability).
- **`/employer/dentist/[id]`**: Detailed view of a dentist's anonymized or full profile (based on subscription).
- **`/employer/send-offer/[dentist_id]`**: The Offer Form (Role title, salary, hours, start date, context message).
- **`/employer/dashboard`**: Overview of sent offers and their statuses (Pending, Accepted, Declined).
- **`/employer/billing`**: Subscription management and M-Pesa Daraja payment trigger.

## 4. Shared/Utility Screens
- **`/messages`**: Simple chat interface active ONLY between an employer and dentist once an offer is sent or accepted.
- **`/settings`**: Account deletion, notification preferences.
