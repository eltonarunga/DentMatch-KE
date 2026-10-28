# DentMatch KE - REST API Reference

The DentMatch KE backend provides a high-performance Express REST API for practitioner profiles, KMPDC verification, reverse-recruitment offers, and Safaricom Lipa Na M-Pesa STK push.

---

## 1. System & Health

### `GET /api/health`
Returns service uptime, memory metrics, environment, and dataset statistics.

### `GET /api/info`
Returns platform metadata, capabilities, supported Kenyan counties, and feature list.

---

## 2. KMPDC Official Registry Verification

### `GET /api/kmpdc/verify/:licenseNumber`
Queries the Kenya Medical Practitioners and Dentists Council official registry to confirm practitioner accreditation status.

**Parameters:**
- `licenseNumber`: e.g. `A4930`, `B8304`, `C5921`, `D1042`, `E7719`

**Response (200 OK):**
```json
{
  "verified": true,
  "data": {
    "licenseNumber": "A4930",
    "practitionerName": "Dr. David Omondi",
    "specialty": "Orthodontics Specialist",
    "qualifications": "BDS (UoN), MDS Ortho (UoN)",
    "registrationYear": "2018",
    "status": "Active",
    "county": "Nairobi"
  },
  "message": "Verified KMPDC Registry Record for Dr. David Omondi"
}
```

---

## 3. Phone OTP Authentication (Kenyan SMS / WhatsApp)

### `POST /api/auth/otp/send`
Dispatches a 4-digit verification code to a Kenyan phone number.

**Request Body:**
```json
{
  "phone": "0712345678",
  "role": "dentist"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "phone": "+254712345678",
  "message": "Verification code sent to +254712345678 via SMS & WhatsApp.",
  "debugCode": "7788"
}
```

### `POST /api/auth/otp/verify`
Validates the one-time code and issues an access token and user session.

**Request Body:**
```json
{
  "phone": "0712345678",
  "code": "7788",
  "role": "dentist"
}
```

**Universal Test Code:** `7788` or `1234`

---

## 4. Dentists Talent Marketplace

### `GET /api/dentists`
Query dentists pool with multi-field filtering.

**Query Parameters:**
- `specialty`: e.g., `Orthodontics`, `Pediatric`, `General`
- `location`: e.g., `Nairobi`, `Mombasa`, `Kisumu`
- `search`: Keyword matching name, bio, equipment, or license

### `GET /api/dentists/:id`
Fetch single practitioner detailed profile.

### `PATCH /api/dentists/:id`
Update practitioner availability, rate expectations, or specialty details.

---

## 5. Reverse-Recruitment Offers Engine

### `GET /api/offers`
Retrieve sent or received offers. Filterable by `dentistId` or `status` (`Pending`, `Accepted`, `Declined`, `Countered`).

### `POST /api/offers`
Create and dispatch a binding locum or permanent offer.

**Request Body:**
```json
{
  "dentistId": "dentist-842",
  "dentistName": "Dr. David Omondi",
  "clinicName": "Smilecare Dental Clinic",
  "clinicLocation": "Westlands, Nairobi",
  "role": "Locum",
  "dates": "15th-17th Oct, 2026",
  "rate": "KES 15,000 / day",
  "salaryValue": 15000,
  "positionType": "locum",
  "selectedDays": ["Mon", "Tue", "Wed", "Thu", "Fri"],
  "equipment": ["Digital X-Ray (RVG)", "Class B Autoclave", "Rotary Endo Motor"],
  "additionalNotes": "High orthodontic volume.",
  "enableEscrow": true
}
```

### `PATCH /api/offers/:id/status`
Updates offer status (`Accepted` | `Declined`). Releasing escrow funds when marked `Accepted`.

### `POST /api/offers/:id/counter`
Submits a practitioner counter-offer rate and clinical conditions.

---

## 6. Safaricom Lipa Na M-Pesa Online (Daraja STK Push)

### `POST /api/mpesa/stkpush`
Triggers an instant STK Push prompt to the clinic director's phone to hold the locum fee in escrow.

**Request Body:**
```json
{
  "phone": "0712345678",
  "amount": 15000,
  "offerId": "offer-1",
  "description": "Locum Escrow Guarantee"
}
```

**Response (200 OK):**
```json
{
  "MerchantRequestID": "MR_1729000000",
  "CheckoutRequestID": "ws_CO_1729000000_12345",
  "ResponseCode": "0",
  "ResponseDescription": "Success. Request accepted for processing",
  "CustomerMessage": "Success. An STK push of KES 15,000 has been sent to +254712345678."
}
```

### `GET /api/mpesa/query/:checkoutRequestId`
Polls transaction status and retrieves the simulated M-Pesa receipt number.

---

## 7. Market Rates Analytics

### `GET /api/analytics/rates`
Returns localized Kenyan dental benchmarks (Nairobi, Mombasa, Kisumu, Nakuru, Eldoret) with median locum daily rates and permanent monthly benchmarks in KES.
