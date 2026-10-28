# DentMatch KE 🇰🇪

**Kenya's First Reverse-Recruitment & Contract Escrow Platform for Dental Professionals**

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![KMPDC Verified](https://img.shields.io/badge/KMPDC-Registry_Verified-006A60.svg)](https://kmpdc.go.ke)
[![M-Pesa Daraja](https://img.shields.io/badge/Safaricom-Lipa_Na_M--Pesa-008080.svg)](https://developer.safaricom.co.ke)
[![Node.js](https://img.shields.io/badge/Node.js-20_LTS-003178.svg)](https://nodejs.org)
[![Vite + React](https://img.shields.io/badge/Frontend-React_19_+_Vite-0D47A1.svg)](https://vitejs.dev)

---

## 🌟 The Vision

Kenya faces a critical shortage of dental surgeons, with approximately 800 to 1,300 registered dentists serving a population of over 54 million. The legacy hiring model is fragmented, slow, and dependent on informal word-of-mouth.

**DentMatch KE** flips the script through **Reverse Recruitment**:
1. **Accredited Dental Specialists** publish verified profiles detailing their clinical skills, preferred equipment, and salary expectations (KES/day for locums, KES/month for permanent contracts).
2. **Licensed Dental Clinics** browse this pool of verified talent and dispatch binding offers directly to candidates.
3. **Safaricom Lipa Na M-Pesa Escrow** secures locum shifts in advance, guaranteeing turnout and prompt compensation.
4. **Instant WhatsApp Handshake**: Accepting an offer immediately connects both parties via a pre-filled WhatsApp consultation link.

---

## 🚀 Key Features

* **KMPDC Verification Engine**: Direct registry verification of Kenya Medical Practitioners and Dentists Council licenses (e.g. `A4930`, `B8304`, `C5921`).
* **Safaricom Lipa Na M-Pesa Escrow**: Real-time Daraja STK Push integration holding shift compensation in escrow until clinical procedures are executed.
* **Low-Data & Mobile-First**: Tailored for Kenyan 3G networks and mid-range Android smartphones with small DOM payloads and minimum 44px touch targets.
* **Kenyan Phone Authentication**: One-time SMS/WhatsApp PIN verification (Africa's Talking format: `+254` / `07XX` / `01XX`).
* **Clinical Equipment Checklist**: Specific filtering by practice instrumentation (CBCT, Digital RVG, Class B Autoclave, Rotary Endo, Implant Motors).
* **Localized Market Rate Benchmarks**: Transparent salary and daily locum rate intelligence for Nairobi (Kilimani, Westlands), Mombasa, Kisumu, Nakuru, and Eldoret.

---

## 🏗️ Architecture & Tech Stack

```
dentmatch-ke/
├── public/                 # Static assets (SVG favicon, site.webmanifest, robots.txt)
├── src/                    # React 19 Frontend
│   ├── components/         # Reusable UI components (ScrollToTop, Navbar, etc.)
│   ├── lib/                # api.ts (REST client) and dataStore.ts (State & fallback)
│   ├── pages/              # Route pages (Landing, Login, TalentBrowser, Onboarding,
│   │                       # SendOffer, ReviewOffer, DentistDashboard, Profiles)
│   ├── index.css           # Tailwind CSS v4 design system with Kenyan teal & navy palette
│   └── main.tsx            # React application entry point
├── server.ts               # Production Express API & Vite SSR/Middleware integration
├── docs/                   # Comprehensive technical documentation
│   ├── 01-PAGE_LIST.md     # Route map & screens
│   ├── 02-SUPABASE_SCHEMA.sql # Production PostgreSQL & RLS schema
│   ├── 03-DENTIST_ONBOARDING.md # Registration and KMPDC verification flow
│   ├── 04-EMPLOYER_OFFER_FLOW.md # Reverse-recruitment contracting workflow
│   ├── 05-DARAJA_API_SPEC.md # Safaricom M-Pesa payment architecture
│   ├── 06-NOTIFICATION_SYSTEM.md # WhatsApp & SMS webhook triggers
│   ├── 07-BUILD_PLAN.md    # Phased rollout and milestone roadmap
│   ├── 08-DEPLOYMENT_GUIDE.md # Container & Cloud Run deployment guide
│   └── 09-API_REFERENCE.md # Complete REST API endpoint reference
├── Dockerfile              # Production multi-stage Alpine container
└── metadata.json           # Google AI Studio application descriptor
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ (Node 20 LTS recommended)
- npm or bun

### Local Development
```bash
# 1. Clone repository and install dependencies
git clone https://github.com/your-username/dentmatch-ke.git
cd dentmatch-ke
npm install

# 2. Configure environment variables (optional for local mock mode)
cp .env.example .env

# 3. Start full-stack development server (API + Vite HMR)
npm run dev
```

The application will start on `http://localhost:3000`.

### Production Build & Launch
```bash
# Compile client assets and bundle server.ts with esbuild
npm run build

# Start production server
npm start
```

---

## 🐳 Docker Deployment

DentMatch KE includes a minimal, unprivileged container configuration:

```bash
# Build the Docker image
docker build -t dentmatch-ke:latest .

# Run container on port 3000
docker run -p 3000:3000 -e NODE_ENV=production dentmatch-ke:latest
```

---

## 🧪 Demo & Testing Credentials

For fast review and demonstration, use the following built-in credentials:

| Scenario | Credentials / Input | Expected Result |
| :--- | :--- | :--- |
| **Phone OTP Auth** | Phone: `0712345678`<br>Code: `7788` or `1234` | Instant authenticated session for Dr. David Omondi or Smilecare Clinic |
| **KMPDC Verification** | License: `A4930` | Validates Dr. David Omondi (Orthodontics Specialist, UoN, Active) |
| **KMPDC Verification** | License: `B8304` | Validates Dr. Sarah Kimani (General Practitioner, Moi, Active) |
| **KMPDC Verification** | License: `C5921` | Validates Dr. Kevin Mutua (Oral & Maxillofacial Surgeon, Active) |
| **M-Pesa STK Push** | Any Kenyan phone number | Dispatches simulated STK prompt and moves funds to Escrow |
| **Health Check** | `GET /api/health` | Returns real-time memory usage, uptime, and database metrics |

---

## ⚖️ Regulatory & Legal Compliance

* **Kenya Medical Practitioners and Dentists Council (KMPDC)**: All offers comply with KMPDC advertising and fee transparency ethical rules (CAP 253, Laws of Kenya).
* **Kenyan Data Protection Act (2019)**: Practitioner contacts remain protected until mutual contract acceptance, with opt-in visibility toggles.
* **Kenya Dental Association (KDA)**: Benchmark locum rates adhere to recommended professional ranges for general practitioners and dental specialists.

---

## 📄 License
Released under the MIT License. Built for the Kenyan dental community.
