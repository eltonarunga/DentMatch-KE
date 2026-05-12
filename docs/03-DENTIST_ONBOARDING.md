# DentMatch KE MVP: Dentist Onboarding Flow

**Context**: Mobile-first, Android-focused, 3G connections. Fast, intuitive, localized context. Must capture KMPDC license for verification.

## Architecture
A 4-step progressive wizard. Persists to local storage between steps to prevent data loss on connection drop.

### Step 1: Authentication & Basic Identity
**Purpose**: Verify phone number and get real name.
- **UI**: Clean card. "Let's get you set up to receive offers."
- **Fields**:
  - `phone_number` (Prefix: +254, Validation: 9 digits)
  - OTP verification screen (Auto-focus, 4-6 digit numeric keypad).
  - `full_name` (Text input, label: "Full Legal Name (As per KMPDC)")
- **Microcopy**: "Employers will use this to verify your credentials." / *Swahili: "Waajiri watatumia jina hili kuthibitisha leseni yako."*

### Step 2: Professional Credentials
**Purpose**: Build trust through licensing and specialty.
- **Fields**:
  - `kmpdc_number` (Text input, placeholder "e.g. A1234")
  - `specialty` (Dropdown/Select: General Dentistry, Orthodontics, Pediatric, Oral Surgery, COHO, Dental Technologist)
  - `experience_years` (Numeric stepper or dropdown: 0-1 Yr, 2-5 Yrs, 5-10 Yrs, 10+ Yrs)
- **Validation**: KMPDC number is mandatory.
- **Microcopy**: "Your KMPDC number is kept secure and only used for our internal verification process."

### Step 3: Work Preferences
**Purpose**: Define what the dentist is looking for so matching works.
- **Fields**:
  - `availability` (Single choice pills: "Full-Time", "Locum", "Open to Both")
  - `preferred_county` (Searchable select list of 47 Kenya Counties)
  - `expected_salary_min` & `expected_salary_max` (Ranged slider or numeric inputs prefixed with KSh).
- **Microcopy**: "Be honest about your expectations. We only show you offers that respect your baseline."

### Step 4: Profile Activation
**Purpose**: Final check and opt-in to marketplace visibility.
- **UI**: Summary of submitted data.
- **Action**: Toggle switch "Make my profile visible to verified clinics".
- **CTA**: "Complete & Enter Marketplace"
- **Post-Completion**: Diverts to `/dentist/dashboard`. Shows a success toast: *"Profile active! We will notify you via WhatsApp when you receive an offer."*

## Edge Cases handled:
- Network drop during submit -> LocalStorage cache resumes on reload.
- Invalid KMPDC format -> Soft warning, allowing submission but flagging account for manual review.
