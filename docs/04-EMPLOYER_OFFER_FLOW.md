# DentMatch KE MVP: Employer Offer-Sending Flow

**Purpose**: Shift the power dynamic. Employers must court dentists with transparent, serious offers.

## Step 1: Dentist Discovery (The "Browse" Stage)
- **UI**: Employer clicks "Send Offer" button gracefully hovering on a Dentist Profile card.
- **Gate Check**: If employer is not on active subscription, intercept with a Payment Modal (Daraja STK Push).

## Step 2: Offer Creation Screen
- **UI**: A clean, serious-looking form. It should feel like writing an official contract term sheet, not a casual message.
- **Fields**:
  - `role_title` (e.g., "Lead Associate Dentist", "Weekend Locum COHO")
  - `salary_offered` (Numeric KSh. Validation: should ideally be equal to or higher than dentist's stated minimum).
  - `hours_per_week` or `schedule` (Text: e.g., "Monday - Friday, 8am - 5pm")
  - `start_date` (Date picker)
  - `message` (Textarea. **Microcopy**: "Introduce your clinic. Why should they join your team? Mention the equipment they will use.")
- **Validation**: All fields mandatory. Salary must be numeric.

## Step 3: Offer Preview
- **UI**: Renders a "Mock WhatsApp Message" or "Card" showing exactly what the dentist will see.
- **Action**: "Confirm and Send Offer"

## Step 4: What the Dentist Sees
- **Trigger**: Dentist receives WhatsApp: *"Dr. [Name], [Clinic Name] wants to hire you! Role: [Title]. Pay: KSh [Salary]. Tap here to view full offer and accept/decline: [Link]"*
- **Dentist UI**: They click the link, opening a secure page showing the clinic's equipment, location, and the specific offer.
- **Actions**:
  - `Accept Offer`: Opens a direct chat channel. Employer notified.
  - `Decline`: Prompts for a mandatory reason (Salary too low, Location too far, Not looking right now).
  - `Message`: Ask clarifying questions before deciding.

## Notification Triggers
1. **Send**: WhatsApp to Dentist ("New Offer!").
2. **Accept**: WhatsApp & SMS to Employer ("Offer Accepted! Dr. X is ready to connect. Tap to chat.")
3. **Decline**: Notification to Employer ("Offer Declined. Reason: Salary expectations not met.")
