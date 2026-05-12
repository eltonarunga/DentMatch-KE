# DentMatch KE Notification System

**Tech Stack**: WhatsApp Business API (via Meta/Twilio/Africa's Talking) + SMS Fallback (Africa's Talking).

## Logic: WhatsApp vs SMS
- Always attempt WhatsApp first. It's cheaper, supports rich links, and is heavily used by Kenyan professionals.
- If the WhatsApp message fails delivery (user not on WhatsApp), trigger the SMS fallback immediately using webhook delivery statuses.

## Triggers & Templates

### 1. New Offer Received (Dentist)
**WhatsApp Template:**
```text
Hi Dr. {{name}},
Great news! {{clinic_name}} sent you an offer for an open role as a {{role_title}} in {{county}} paying KSh {{salary}}.
Tap below to view full details and accept/decline.
[View Offer Link]
```
**Swahili Version:**
```text
Hujambo Dr. {{name}},
Habari njema! {{clinic_name}} wamekutumia ofa ya kazi kama {{role_title}} kule {{county}} kwa KSh {{salary}}.
Bonyeza hapa kuona maelezo kamili.
[View Offer Link]
```
**SMS Fallback:**
`DentMatch KE: {{clinic_name}} wants to hire you as {{role_title}} for KSh {{salary}}. View and accept here: {{short_link}}`

### 2. Offer Accepted (Employer)
**WhatsApp Template:**
```text
Hi {{employer_name}},
Dr. {{dentist_name}} has ACCEPTED your offer for {{role_title}}! 🎉
You can now safely contact them via chat or at {{dentist_phone}}.
[Open Chat Link]
```
**SMS Fallback:**
`DentMatch KE: Dr. {{dentist_name}} ACCEPTED your offer. Log in to contact them now: {{short_link}}`

### 3. Offer Declined (Employer)
**WhatsApp Template:**
```text
Hi {{employer_name}},
Unfortunately, Dr. {{dentist_name}} declined your offer.
Reason provided: {{decline_reason}}.
Don't give up! Browse other verified dentists in your area.
[Find More Dentists Link]
```

### 4. Subscription Expiring (Employer)
**WhatsApp Template:**
```text
Hi {{employer_name}},
Your DentMatch KE premium access expires in 3 days. Renew now to keep finding verified dental talent.
[Renew Access]
```

## Opt-Out
- All WhatsApp messages include footer: `Reply STOP to opt out.`
- If user opts out, update `users.marketing_opt_in = false` in DB. Transactional alerts fall back strictly to SMS.
