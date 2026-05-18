# Phone AI Receptionist — Setup Template
## Reusable Framework for Medical Practice Deployments
**Version:** 1.0 | **Date:** May 18, 2026  
**Based on:** Taylor (TMG) and Patrice (TMD) deployments  
**Author:** Operations System

---

## Overview

This template documents the complete process for deploying a phone AI receptionist for a medical practice. It is designed to be replicated for any new practice with minimal customization. The system handles inbound calls 24/7, collects patient information, books appointments, takes messages, and sends staff summaries — all without human intervention.

The two live deployments this template is based on are:

| AI Name | Practice | Phone Line | Platform |
|---------|----------|------------|----------|
| Taylor | Taylor Medical Group (TMG) | 678-443-4000 (RingCentral) | Railway (Node.js) |
| Patrice | Taylor MD Formulations (TMD) | 678-443-4099 (RingCentral) | Railway (Node.js) |

---

## PART 1 — INFRASTRUCTURE REQUIREMENTS

### 1.1 Core Services Required

| Service | Purpose | Cost (approx.) |
|---------|---------|----------------|
| **Twilio** | Voice calls, call recording, SMS | ~$15–30/month |
| **OpenAI** | GPT-4 (conversation) + Whisper (transcription) | ~$20–50/month |
| **IntakeQ** | Practice management, scheduling, patient portal | ~$99–199/month |
| **Resend** | Transactional email (staff summaries, patient confirmations) | Free–$20/month |
| **Railway** | Server hosting (Node.js) | ~$5–20/month |
| **RingCentral** | Office phone system (call forwarding to Twilio) | Existing subscription |

### 1.2 Domain and DNS

No custom domain is required. The Railway deployment URL serves as the webhook endpoint for Twilio.

---

## PART 2 — TWILIO CONFIGURATION

### 2.1 Phone Number Setup

The AI does not answer the practice's main number directly. Instead:

1. The practice's main number (e.g., 678-443-4000) is hosted on RingCentral.
2. RingCentral forwards unanswered calls to the Twilio AI number.
3. Twilio routes the call to the Railway server via webhook.

**Twilio number purpose:** Backend only — patients never dial this number directly.

### 2.2 Webhook Configuration

In the Twilio Console, configure the phone number as follows:

| Setting | Value |
|---------|-------|
| Voice — A Call Comes In | Webhook → `https://[railway-url]/voice` |
| HTTP Method | HTTP POST |
| Call Status Changes | `https://[railway-url]/clinic/status` |
| Recording Status Callback | `https://[railway-url]/recording-status` |

### 2.3 Call Recording

Enable call recording in the `/voice` handler using Twilio's `<Record>` verb or by passing `record: 'record-from-answer'` in the call parameters. All recordings are stored in Twilio and referenced by SID.

### 2.4 A2P SMS Registration (Required for Outbound SMS)

Before the AI can reliably send SMS to patients, complete A2P 10DLC registration:

**Step 1 — Brand Registration**
- Register the practice as a brand in Twilio Console → Messaging → Sender Profiles
- Required: Legal business name, EIN, address, website, contact email

**Step 2 — Campaign Registration**
- Create a campaign under the registered brand
- Use case: "Healthcare — appointment reminders, scheduling links, patient portal links"
- Sample messages must be provided (see Section 6.3)
- Timeline: 1–5 business days for carrier approval

**Until campaign is approved:** Use email as the primary delivery method for links and confirmations.

---

## PART 3 — RAILWAY DEPLOYMENT

### 3.1 Repository Structure

```
server.js          ← Main application (Express + Twilio TwiML)
package.json       ← Dependencies
.env               ← Environment variables (never commit to git)
```

### 3.2 Environment Variables

The following environment variables must be set in the Railway project settings:

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `TWILIO_ACCOUNT_SID` | Twilio account identifier | Twilio Console → Account Info |
| `TWILIO_AUTH_TOKEN` | Twilio authentication token | Twilio Console → Account Info |
| `TWILIO_CLINIC_NUMBER` | The Twilio phone number (e.g., +14047366917) | Twilio Console → Phone Numbers |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 and Whisper | platform.openai.com |
| `INTAKEQ_API_KEY` | IntakeQ API key for scheduling | IntakeQ → Settings → API |
| `RESEND_API_KEY` | Resend API key for email | resend.com → API Keys |
| `GMAIL_NOTIFY_USER` | Staff email address for call summaries | Practice staff email |
| `TRANSCRIPT_SECRET` | Secret token for accessing transcript review endpoint | Generate a random string |
| `NODE_ENV` | Set to `production` | Hardcode as `production` |

### 3.3 Deployment Process

1. Push code to the connected GitHub repository.
2. Railway automatically deploys on every push to the `master` branch.
3. Verify deployment at `https://[railway-url]/health`.
4. Update Twilio webhook URLs if the Railway URL changes.

### 3.4 Health Check

The server exposes a `/health` endpoint that returns:
```json
{
  "status": "ok",
  "version": "7.39",
  "uptime": 12345,
  "name": "Taylor Medical Group AI Receptionist"
}
```

Monitor this endpoint to confirm the server is live.

---

## PART 4 — INTAKEQ INTEGRATION

### 4.1 API Capabilities Used

| Function | IntakeQ API Endpoint |
|----------|---------------------|
| Search for patient by name + DOB | `GET /api/clients` |
| Get patient record | `GET /api/clients/{id}` |
| Update patient contact info | `PUT /api/clients/{id}` |
| Get available appointment slots | `GET /api/appointments/slots` |
| Book appointment | `POST /api/appointments` |
| Cancel appointment | `DELETE /api/appointments/{id}` |
| Send patient portal invite | `POST /api/clients/{id}/invite` |

### 4.2 Appointment Booking Logic

The AI queries IntakeQ for available slots, presents up to three options to the caller, and books the selected slot via API. If the booking API call fails, the AI takes a message and flags it for staff rather than ending the call.

### 4.3 Patient Portal Invitations

The AI sends a portal invitation via IntakeQ API whenever:
- A new patient completes intake
- An existing patient does not have an active portal account
- A patient requests their lab results or needs to message the doctor

---

## PART 5 — OPENAI INTEGRATION

### 5.1 Conversation Engine (GPT-4)

The AI uses GPT-4 to process caller speech (converted to text by Twilio's speech recognition) and generate natural, contextually appropriate responses. The system prompt defines the AI's persona, knowledge base, and behavioral rules.

**System prompt structure:**
```
You are [AI Name], the AI receptionist for [Practice Name].
Your job is to [core responsibilities].
You have access to the following information: [knowledge base].
You must follow these rules: [behavioral rules].
Never do: [prohibited actions].
```

### 5.2 Whisper Transcription (Post-Call)

After every call, the recording is downloaded from Twilio and transcribed using OpenAI Whisper. The transcript is:
- Stored in the server's in-memory transcript store (accessible via `/transcripts` endpoint)
- Included in the staff summary email
- Used for QA review and pattern analysis

### 5.3 Knowledge Base

The AI's knowledge base is embedded in the system prompt and includes:
- Practice name, address, phone, hours
- Services offered and general pricing policy
- Provider names and specialties
- Scheduling policies (new patient process, cancellation policy)
- Patient portal URL
- FAQ answers from the practice website

---

## PART 6 — EMAIL AND SMS NOTIFICATIONS

### 6.1 Staff Summary Email (Post-Call)

Sent to the practice's staff email after every call. Contains:

```
Subject: [AI Name] Call Summary — [Caller Name] | [Date/Time]

CONTACT INFO
Phone: [Twilio caller ID — always available]
Email: [collected during call, or NOT COLLECTED]
Name:  [collected during call, or NOT COLLECTED]

CALL OUTCOME
Result: [Booked / Message Taken / Information Provided / Unresolved]
Duration: [X minutes]

DETAILS
[Summary of what was discussed and any action items]

RECORDING
[Link to Twilio recording]

TRANSCRIPT
[Full Whisper transcript, or "Not available — recording pending"]
```

### 6.2 Patient Confirmation (Post-Booking)

Sent to the patient after a successful appointment booking:

```
Subject: Appointment Confirmed — Taylor Medical Group

Hi [Name],

Your appointment is confirmed:
Date: [Day, Date]
Time: [Time]
Provider: [Doctor]
Type: [Telehealth / In-Office]

Patient Portal: [link]
Office: 678-443-4000
Address: [address]

Taylor Medical Group
678-443-4000 | taylormedicalgroup.net
```

### 6.3 SMS Templates (A2P Compliant)

**Scheduling link:**
> *"Hi [Name], here's your scheduling link for Taylor Medical Group: [link]. Reply STOP to opt out. Taylor Medical Group | 678-443-4000"*

**Portal invite:**
> *"Hi [Name], you've been invited to the Taylor Medical Group patient portal: [link]. Reply STOP to opt out. Taylor Medical Group | 678-443-4000"*

**Appointment reminder:**
> *"Reminder: You have an appointment at Taylor Medical Group on [Date] at [Time] with [Doctor]. Questions? Call 678-443-4000. Reply STOP to opt out."*

---

## PART 7 — CUSTOMIZATION CHECKLIST FOR NEW DEPLOYMENTS

When deploying this system for a new practice, update the following:

### Practice Identity
- [ ] AI name (e.g., Taylor, Patrice, or a new name)
- [ ] Practice name
- [ ] Practice phone number (RingCentral number)
- [ ] Practice address
- [ ] Office hours
- [ ] Provider names and titles
- [ ] Website URL
- [ ] Patient portal URL

### Services and Policies
- [ ] Services offered (with descriptions)
- [ ] Insurance policy (accepts / does not accept; HSA/FSA)
- [ ] New patient process
- [ ] Cancellation policy
- [ ] Prescription refill policy
- [ ] Lab results policy

### Technical Configuration
- [ ] New Twilio phone number provisioned
- [ ] Railway project created and environment variables set
- [ ] GitHub repository connected to Railway
- [ ] Twilio webhooks updated to new Railway URL
- [ ] IntakeQ API key generated and tested
- [ ] OpenAI API key confirmed active
- [ ] Resend API key configured
- [ ] Staff email address set for call summaries
- [ ] A2P brand and campaign registered in Twilio
- [ ] RingCentral call forwarding configured to new Twilio number

### Testing
- [ ] Call the Twilio number directly and verify greeting
- [ ] Test new patient booking flow end-to-end
- [ ] Test existing patient verification
- [ ] Test prescription refill message flow
- [ ] Test escalation / "speak to a human" flow
- [ ] Verify staff summary email is received after each test call
- [ ] Verify Whisper transcription is working (requires valid OpenAI key)
- [ ] Test SMS delivery (after A2P campaign approval)

---

## PART 8 — KNOWN ISSUES AND FIXES

The following issues were identified during the Taylor/Patrice deployments and should be addressed in future builds:

| Issue | Impact | Fix |
|-------|--------|-----|
| Phone number transcription errors (e.g., reads "609-377-1434" as "693-771-434") | Patient cannot be verified | Implement digit-by-digit confirmation using DTMF (keypad input) as fallback |
| Email address transcription failures | Cannot send portal invites | Add a "spell it out" fallback + send via SMS as backup |
| IntakeQ booking API errors mid-transaction | Appointment not booked | Add error handling that takes a message instead of disconnecting |
| "No" or "Front desk" registered as patient names | Wrong patient record created | Add intent detection before name collection |
| IV therapy script says "fourth therapy" | Patient confusion | Fix system prompt to say "IV therapy" explicitly |
| Robocalls reaching the AI line | Wasted API calls | Implement caller ID screening for known robocall numbers |
| No graceful handling of "I need to speak to a human" | Patient frustration | Add explicit escalation trigger detection |

---

## PART 9 — MAINTENANCE AND MONITORING

### Daily
- Review staff summary emails for any flagged calls
- Check Railway deployment health at `/health`
- Review any calls where booking failed

### Weekly
- Review Whisper transcripts for quality issues
- Check IntakeQ for any appointments that need manual confirmation
- Review Twilio call logs for unusual patterns

### Monthly
- Review A2P campaign status in Twilio
- Update the AI's knowledge base with any practice changes (new services, updated hours, new providers)
- Review and update the system prompt based on recurring issues

---

## PART 10 — SCALING TO MULTIPLE PRACTICES

This system is designed to scale. Each new practice deployment requires:

1. A new Railway project (copy the existing server.js, update environment variables)
2. A new Twilio number
3. A new IntakeQ API key (from the practice's IntakeQ account)
4. A new OpenAI API key (or use the same key with separate projects)
5. A new A2P brand registration (if the practice is a different legal entity)

The codebase is shared — improvements made for one deployment benefit all deployments. The only practice-specific elements are the environment variables and the system prompt.

---

*This template is maintained by the Operations System and updated after each new deployment.*  
*For questions, contact the system operator.*
