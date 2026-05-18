# Taylor Medical Group — Staff Follow-Up List
## Taylor AI Receptionist — Call Review | May 15–17, 2026
**Prepared by:** Operations System  
**Action Required By:** Staff — Please address all Priority 1 items today

---

## PRIORITY 1 — IMMEDIATE FOLLOW-UP REQUIRED

---

### CALL 1 — BOOKING FAILURE (Application Error)
**Caller:** +1 (910) 545-9839  
**Call Duration:** 11 minutes 21 seconds  
**Date/Time:** May 15, 2026  
**What Happened:** Patient "ISTL Morgan" (likely a name recognition error — real name unclear) spent 11 minutes on the phone. Taylor successfully verified identity, found the patient record (email: comccee@yahoo.com, phone: 910-545-9839), and offered appointment slots. Patient selected **Monday May 18 at 3:00 PM with Dr. Eldred Taylor**. At the moment of booking, Taylor returned: *"We are sorry. An application error has occurred. Goodbye."* — and disconnected. **The appointment was NOT booked.**

**Staff Action Required:**
- Call back +1 (910) 545-9839 immediately
- Confirm the patient's real name (Taylor misheard it as "ISTL Morgan")
- Book their appointment for an iron infusion — they requested Monday May 18 at 3 PM with Dr. Eldred Taylor
- Verify if they are in IntakeQ and send portal invite if not

**Root Cause (Technical):** IntakeQ booking API call failed mid-transaction. This is a code-level bug — flagged for fix.

---

### CALL 2 — FRUSTRATED PATIENT, PRESCRIPTION REFILL UNRESOLVED
**Caller:** +1 (954) 658-8867  
**Call Duration:** 2 minutes 30 seconds  
**Date/Time:** May 15, 2026  
**What Happened:** Patient called needing a **prescription refill**. Taylor repeatedly asked for name spelling instead of routing the refill request. Patient became visibly frustrated: *"I need to talk to a human, not you."* and *"You're an idiot."* Call ended without the refill being processed or a message being taken.

**Staff Action Required:**
- Call back +1 (954) 658-8867
- Apologize for the experience
- Process the prescription refill request
- Ask if they need anything else and ensure they are on the patient portal

**Root Cause (Technical):** Taylor's name-spelling loop triggered before intent was captured. Prescription refill path needs to be accessible without completing full name verification first.

---

### CALL 3 — SAME PATIENT CALLED TWICE, SECOND CALL ALSO FAILED
**Caller:** +1 (954) 658-8867 (same as Call 2)  
**Call Duration:** 3 minutes 16 seconds  
**Date/Time:** May 15, 2026 (called back ~7 minutes after Call 2)  
**What Happened:** Same frustrated patient called back. Same outcome — Taylor looped on name verification, patient never got their prescription refill addressed.

**Staff Action Required:** Same as Call 2 above — one callback will resolve both.

---

### CALL 4 — NEW PATIENT INQUIRY DROPPED MID-COLLECTION
**Caller:** +1 (470) 244-1585  
**Call Duration:** 3 minutes  
**Date/Time:** May 15, 2026  
**What Happened:** Patient **Angela Box** (DOB March 6, 1965, phone 609-377-1434) called to confirm her 1:30 PM appointment was telehealth. Taylor went into a new booking flow instead of confirming the existing appointment. Taylor also failed to correctly capture the phone number — confirmed it as "seven" after multiple failed attempts. Patient stated *"That's not my account"* when Taylor pulled up a different patient record (706-463-2626 / abutner@winstream.net). Call ended without resolution.

**Staff Action Required:**
- Look up Angela Box in IntakeQ (DOB 3/6/1965)
- Confirm her 1:30 PM appointment is marked as telehealth
- Call her back at 609-377-1434 to confirm
- Verify the correct patient record is linked to her name

---

### CALL 5 — NEW PATIENT INTEREST IN IRON INFUSION, CALL DROPPED
**Caller:** +1 (404) 735-2310 (Stephanie Olson)  
**Call Duration:** 1 minute 53 seconds  
**Date/Time:** May 15, 2026  
**What Happened:** New patient **Stephanie Olson** called asking about iron infusions. Taylor began collecting new patient information, then the call ended abruptly mid-sentence. No appointment was booked, no follow-up information was captured.

**Staff Action Required:**
- Call back +1 (404) 735-2310
- Explain iron infusion services and pricing
- Schedule a new patient evaluation appointment
- Send patient portal invite to her email once collected

---

### CALL 6 — CALLER TRYING TO REACH FRONT DESK / STAFF MEMBER
**Caller:** +1 (619) 377-1434 (approximate — number unclear from transcript)  
**Call Duration:** 1 minute 54 seconds  
**Date/Time:** May 15, 2026  
**What Happened:** Caller repeatedly said *"Front desk"* and *"Dr. Taylor"* — appeared to be calling to speak directly with staff, possibly a vendor, referral partner, or internal caller. Taylor treated them as a new patient and attempted to collect name/email. Caller gave name as "No-No" (clearly not cooperating with the flow). Call ended without resolution.

**Staff Action Required:**
- Review if this was a known vendor, partner, or staff member calling in
- If a patient, call back and route appropriately
- Note: Taylor needs a "transfer to staff" or "leave a message for the doctor" path for these calls

---

## PRIORITY 2 — MONITOR / NO IMMEDIATE ACTION NEEDED

---

### CALL 7 — CALLER DID NOT RESPOND (Silent Call × 3)
**Caller:** +1 (617) 458-7298  
**Call Duration:** 66 seconds  
**What Happened:** Taylor greeted the caller three times with no response. Caller never spoke. Likely a pocket dial or robocall.  
**Action:** No follow-up needed unless this number calls again.

---

### CALL 8 — CALLER DID NOT RESPOND (Silent Call × 3)
**Caller:** +1 (504) 782-5643  
**Call Duration:** 64 seconds  
**What Happened:** Same pattern — Taylor greeted three times, caller said "Hello?" at the end but call ended. Likely a connection issue.  
**Action:** No follow-up needed unless this number calls again.

---

### CALL 9 — NAME RECOGNITION FAILURE (Farron/Sharon)
**Caller:** Unknown (102 seconds)  
**What Happened:** Caller's name appeared to be "Farron" or "Sharon" — Taylor could not confirm it correctly after multiple attempts. Call ended without resolution.  
**Action:** No phone number captured. Cannot follow up. Flag as a name recognition bug for Taylor.

---

### CALL 10 — CALLER ASKING FOR KATHLEEN SULLIVAN
**Caller:** Unknown (118 seconds)  
**Patient Name:** Alice Berdy (or similar spelling)  
**What Happened:** Patient Alice Berdy called asking to speak with "Kathleen Sullivan." Taylor did not recognize this as a staff/provider lookup and instead launched into an IV therapy explanation. Call ended without connecting the caller to the right person.  
**Action:** Identify who Kathleen Sullivan is (staff member? provider? patient?). If a staff member, Taylor needs to be trained to take a message for specific staff.

---

### CALL 11 — LISA LEONARBY — MESSAGE SENT BUT INCOMPLETE
**Caller:** Unknown  
**Patient Name:** Lisa Leonarby  
**Call Duration:** 97 seconds  
**What Happened:** Taylor collected name and began collecting last name, then abruptly said *"I've sent your message to our team."* The call ended before the reason for the call was captured.  
**Action:** Check if a message was actually sent to staff. If so, follow up with Lisa Leonarby. If not, no contact info available.

---

## ADDITIONAL CALLS — MAY 16–17, 2026

---

### CALL 12 — JESSICA PARKER — APPOINTMENT CALLBACK (May 17)
**Caller:** +1 (240) 805-8495  
**Call Duration:** 2 min 24 sec  
**What Happened:** Jessica Parker called back about an appointment. She left a voicemail saying she can do **1:00 PM on Monday with Dr. Ava Bell-Taylor** if that slot is still open. Taylor registered her last name as "Tarker" instead of Parker.

**Staff Action Required:**
- Call Jessica back at 240-805-8495
- Confirm if 1 PM Monday with Dr. Ava is available
- Book the appointment and correct her last name to Parker in IntakeQ

---

### CALL 13 — SOPHIA AGUILAR — NEW PATIENT, EMAIL CAPTURE FAILED (May 17)
**Caller:** +1 (647) 268-4151  
**Call Duration:** 4 min 48 sec  
**What Happened:** Sophia Aguilar (new patient, calling from Canada) wanted to book an appointment. Taylor could not correctly capture her email address (sofia@sophiaaguilar.ca) after multiple attempts. Call ended mid-sentence without completing the booking.

**Staff Action Required:**
- Call Sophia back at 647-268-4151
- Confirm her email (likely sofia@sophiaaguilar.ca)
- Complete new patient intake and send patient portal invite
- Book her first appointment

---

### CALL 14 — ALICE ROSE — FRUSTRATED, HUNG UP (May 17)
**Caller:** +1 (678) 886-8680  
**Call Duration:** 43 sec  
**What Happened:** Alice Rose called and Taylor immediately misheard her name as "in." After Alice corrected Taylor multiple times, she said: **"Never mind. You're AI. You don't care about us."** She hung up.

**Staff Action Required:**
- Call Alice back at 678-886-8680 — this is a retention risk
- Personally apologize for the AI experience
- Determine what she needed and resolve it

---

### CALL 15 — PUBLIX PHARMACY ROBOCALL (May 17)
**Caller:** +1 (770) 621-3186  
**What Happened:** Automated call from Publix Pharmacy at Hugh Howell Village. Prescription ready for pickup, $60.98 due. This is a robocall that reached the Taylor AI line — no patient involved.

**Action:** No follow-up needed. Note: This number should be blocked to prevent future robocalls from reaching Taylor.

---

## SMS STATUS

**Current Status:** A2P campaign has been submitted to carriers (IN_PROGRESS). SMS will be fully reliable once carriers approve the campaign (1–5 business days). Until then, email remains the primary delivery method for portal links and confirmations.

---

## SUMMARY TABLE

| # | Caller | Issue | Action | Priority |
|---|--------|-------|--------|----------|
| 1 | +1 (910) 545-9839 | Booking crashed — appointment NOT booked | Call back TODAY, book May 18 3PM with Dr. Eldred | **URGENT** |
| 2 & 3 | +1 (954) 658-8867 | Prescription refill — patient frustrated, unresolved x2 | Call back, process refill, apologize | **URGENT** |
| 4 | +1 (470) 244-1585 (Angela Box) | Appointment confirmation failed, wrong record pulled | Confirm telehealth appt, call back | **URGENT** |
| 14 | +1 (678) 886-8680 (Alice Rose) | Patient hung up frustrated — "You don't care about us" | Call back immediately, personal apology | **URGENT** |
| 5 | +1 (404) 735-2310 (Stephanie Olson) | New patient iron infusion inquiry dropped | Call back, schedule new patient eval | **HIGH** |
| 12 | +1 (240) 805-8495 (Jessica Parker) | Left voicemail — wants 1PM Monday with Dr. Ava | Call back, book if available | **HIGH** |
| 13 | +1 (647) 268-4151 (Sophia Aguilar) | New patient, email capture failed, booking incomplete | Call back, complete intake, send portal invite | **HIGH** |
| 6 | Unknown | Caller wanted front desk, looped in AI | Review, call back if identifiable | **MEDIUM** |
| 10 | Unknown (Alice Berdy) | Asking for Kathleen Sullivan | Identify Kathleen Sullivan — is she staff? | **MEDIUM** |
| 7–8 | Various | Silent calls / no response | No action | LOW |
| 9 | Unknown | Name recognition failure | No contact info — cannot follow up | LOW |
| 11 | Unknown (Lisa Leonarby) | Message sent but incomplete | Verify message was received | LOW |
| 15 | +1 (770) 621-3186 | Publix Pharmacy robocall | Block this number | LOW |

---

*Document generated from Twilio call recordings — May 15–17, 2026*  
*Taylor AI Receptionist v7.39 | TMG Phone: +1 (404) 736-6917*
