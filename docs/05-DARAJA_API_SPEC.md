# Daraja API Integration Spec for DentMatch KE

**Objective**: Allow employers to pay a subscription fee to unlock dentist contact details and send offers.

## Flow Choice: Lipa Na M-Pesa Online (STK Push)
**Why**: STK Push is the lowest friction for mobile-first users. The user inputs their phone number, and a PIN prompt automatically appears on their device. No need to manually go to the SIM toolkit and enter paybill numbers.

## Architecture & Steps
1. **Initiate Payment (Frontend)**
   - Employer views pricing on `/employer/billing`.
   - Clicks "Pay KSh 5,000 for 1 Month".
   - Prompts for M-Pesa Phone Number (Defaults to their auth phone number).
   - FE sends `POST /api/payments/stkpush` to Supabase Edge Function / Next.js API.

2. **Backend Processing (API Route)**
   - Fetch Safaricom OAuth Token (caches for 55 mins).
   - Generate password using `Base64(Shortcode + Passkey + Timestamp)`.
   - Call Safaricom `https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest`.
   - Send `CallbackURL` pointing to `https://[APP_URL]/api/payments/webhook`.
   - Return `CheckoutRequestID` to frontend.

3. **User Experience (STK Pop-up)**
   - User enters PIN on their phone.
   - Frontend polls `GET /api/payments/status?id=CheckoutRequestID` every 3 seconds (or subscribes via Supabase Realtime to the `subscriptions` table).

4. **Safaricom Webhook Callback (`POST /api/payments/webhook`)**
   - Safaricom sends payment success/failure to the webhook.
   - **On Success (`ResultCode: 0`)**:
     - Verify amount.
     - Extract `MpesaReceiptNumber` and `PhoneNumber`.
     - Update Supabase `subscriptions` table (`status: active`, `valid_until: NOW() + 30 days`).
   - **On Failure (`ResultCode != 0`)**:
     - Log failure (e.g., cancelled by user, insufficient funds).

## Handling Edge Cases
- **Timeout**: If user ignores STK prompt, Safaricom sends timeout to webhook. UI times out after 60s and offers "Retry" or "Pay via Paybill (Manual)".
- **Duplicate Payment**: Unique constraints on `mpesa_receipt_number` in `subscriptions` table prevent double crediting.

## Sandbox Testing
1. Create App on Safaricom Daraja Portal.
2. Note `Consumer Key`, `Consumer Secret`, `Shortcode` (174379), and `Passkey` (bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919).
3. Use test credentials provided by Daraja portal to simulate STK payment success/fail.
