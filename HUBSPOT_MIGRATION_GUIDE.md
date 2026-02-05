# HubSpot Contact API → Forms API Migration Guide

## Table of Contents
1. [Understanding the Problem](#understanding-the-problem)
2. [Why Forms API vs Contact API?](#why-forms-api-vs-contact-api)
3. [How HubSpot APIs Work](#how-hubspot-apis-work)
4. [Complete Implementation Guide](#complete-implementation-guide)
5. [Testing & Validation](#testing--validation)
6. [Troubleshooting](#troubleshooting)

---

## Understanding the Problem

### Current Situation
Your success message says: **"Check your inbox to confirm"**

But no confirmation emails are being sent! Here's why:

**Your current flow:**
```
User submits email
    ↓
Next.js API receives request
    ↓
HubSpot Contact API creates/updates contact
    ↓
Contact exists in HubSpot CRM
    ✗ NO EMAIL SENT (no workflow triggered)
```

**The issue:** The Contact API directly manipulates the CRM database. It's like manually adding someone to a spreadsheet - there's no trigger for automation.

### The Solution
Use the **Forms API** instead, which simulates a form submission:

**New flow with Forms API:**
```
User submits email
    ↓
Next.js API receives request
    ↓
HubSpot Forms API receives form submission
    ↓
Contact created/updated in CRM
    ↓
Form workflows triggered (if configured)
    ↓
✓ Confirmation email sent automatically
```

---

## Why Forms API vs Contact API?

### Contact API (What You're Using Now)
**Purpose:** Direct CRM manipulation - create, read, update, delete contacts

**Use cases:**
- Importing contacts from CSV
- Syncing with other systems
- Building custom CRM integrations
- Bulk operations

**Limitations:**
- Does NOT trigger form-based workflows
- Does NOT send autoresponder emails
- Does NOT count as "form submissions" in analytics
- Requires authentication (access token)

### Forms API (What You Should Use)
**Purpose:** Submit data as if a user filled out a HubSpot form

**Use cases:**
- Custom frontend forms on your website
- Mobile app signups
- Newsletter subscriptions
- Any user-facing form submission

**Benefits:**
- ✅ Triggers form-based workflows (including emails!)
- ✅ Triggers autoresponders
- ✅ Shows in form submission analytics
- ✅ Automatic duplicate handling (idempotent)
- ✅ No authentication required (public endpoint)
- ✅ Built-in GDPR consent tracking

**The key insight:** Forms API is the "front door" for user submissions. Contact API is the "back door" for system integrations.

---

## How HubSpot APIs Work

### Understanding HubSpot Forms

When you create a form in HubSpot, you get a **Form GUID** (globally unique identifier):
```
HUBSPOT_FORM_GUID=80a47946-78a1-4c5d-a0b2-d6bd6b3f23ec
```

This form exists in your HubSpot portal and has:
- **Fields** (email, name, company, etc.)
- **Settings** (redirect URLs, notification emails)
- **Workflows** (automated actions when form is submitted)

### Forms API Endpoint Structure

```
https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
```

**Your specific endpoint:**
```
https://api.hsforms.com/submissions/v3/integration/submit/342889648/80a47946-78a1-4c5d-a0b2-d6bd6b3f23ec
```

Breaking it down:
- `api.hsforms.com` - HubSpot Forms API domain
- `/submissions/v3/integration/submit` - API version 3 submission endpoint
- `342889648` - Your HubSpot portal ID
- `80a47946-78a1-4c5d-a0b2-d6bd6b3f23ec` - Your specific form

### Forms API Request Format

**Request body structure:**
```json
{
  "fields": [
    {
      "objectTypeId": "0-1",
      "name": "email",
      "value": "user@example.com"
    }
  ],
  "context": {
    "pageUri": "https://studio587.com/studio",
    "pageName": "Studio Page"
  },
  "legalConsentOptions": {
    "consent": {
      "consentToProcess": true,
      "text": "I agree to allow Studio 587 to store and process my personal data.",
      "communications": []
    }
  }
}
```

**Understanding each part:**

1. **`fields` array:** The form data
   - `objectTypeId: "0-1"` - This is always "0-1" for contact properties
   - `name` - The HubSpot property name (e.g., "email", "firstname")
   - `value` - The actual data

2. **`context` object:** Metadata about where the submission came from
   - `pageUri` - URL where form was submitted
   - `pageName` - Human-readable page name

3. **`legalConsentOptions`:** GDPR compliance
   - `consentToProcess` - User agrees to data processing
   - `text` - The consent message shown to user
   - `communications` - Optional array for newsletter opt-ins

### How Duplicate Handling Works

**Contact API approach (current):**
```typescript
try {
  // Try to create contact
  await hubSpotClient.crm.contacts.basicApi.create(...)
} catch (error) {
  if (error.code === 409) {
    // Contact exists! Now we need to:
    // 1. Search for the contact by email
    // 2. Get their contact ID
    // 3. Update the contact with new data
    const searchResponse = await hubSpotClient.crm.contacts.searchApi.doSearch(...)
    const contactId = searchResponse.results[0].id
    await hubSpotClient.crm.contacts.basicApi.update(contactId, ...)
  }
}
```
**Problem:** 3 API calls for a duplicate! (create → search → update)

**Forms API approach (new):**
```typescript
await fetch(formUrl, {
  method: "POST",
  body: JSON.stringify(formPayload)
})
```
**Benefit:** 1 API call! Forms API automatically handles duplicates internally.

---

## Complete Implementation Guide

### Step-by-Step Code Changes

**File to modify:** `/src/app/api/subscribe/route.ts`

#### STEP 1: Remove HubSpot SDK Imports

**Find lines 2-4 and DELETE them:**
```typescript
// ❌ DELETE THESE LINES:
import { Client } from "@hubspot/api-client";
import { FilterOperatorEnum } from
"@hubspot/api-client/lib/codegen/crm/contacts/models/Filter";
```

**Why?** You won't need the SDK anymore - you'll use native `fetch()` instead.

---

#### STEP 2: Remove HubSpot Client Initialization

**Find lines 9-12 and DELETE them:**
```typescript
// ❌ DELETE THESE LINES:
const hubSpotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});
```

**Why?** Forms API doesn't require authentication via SDK.

---

#### STEP 3: Replace the Entire Contact Creation Block

**Find lines 80-159 (everything from the comment "// Create or update contact in HubSpot" through the end of the nested try/catch).**

**DELETE all of this:**
```typescript
// ❌ DELETE FROM HERE:
    // Create or update contact in HubSpot
    const contactProperties = {
      email: email.toLowerCase().trim(),
      // Optional: Add custom properties
      // lifecyclestage: 'subscriber',
      // hs_lead_status: 'NEW',
      // Track where they signed up from
      // signup_source: pageName || 'Website',
      // signup_page_url: pageUri || '',
    }

    try {
      // Try to create a new contact
      const contactResponse = await hubSpotClient.crm.contacts.basicApi.create({
        properties: contactProperties,
        associations: [],
      })

      console.log('Contact created in HubSpot:', contactResponse.id)

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed!',
      })
    } catch (hubspotError: any) {
      // If contact already exists (409 error), update it instead
      if (hubspotError.code === 409) {
        console.log('Contact already exists, updating...')

        // Extract existing contact ID from error or search for it
        try {
          const searchResponse = await hubSpotClient.crm.contacts.searchApi.doSearch({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: FilterOperatorEnum.Eq,
                    value: email.toLowerCase().trim(),
                  },
                ],
              },
            ],
            properties: ['email'],
            limit: 1,
          })

          if (searchResponse.results.length > 0) {
            const contactId = searchResponse.results[0].id

            // Update existing contact
            await hubSpotClient.crm.contacts.basicApi.update(contactId, {
              properties: {
                // Update last signup date or other fields
                last_signup_date: new Date().toISOString(),
                signup_page_url: pageUri || '',
              },
            })

            console.log('Existing contact updated:', contactId)
          }

          return NextResponse.json({
            success: true,
            message: 'Successfully subscribed!',
          })
        } catch (updateError) {
          console.error('Error updating existing contact:', updateError)
          // Still return success to user - they're already in the system
          return NextResponse.json({
            success: true,
            message: 'Successfully subscribed!',
          })
        }
      }

      // Log other HubSpot errors
      console.error('HubSpot API error:', hubspotError)
      throw hubspotError
    }
// ❌ DELETE UP TO HERE
```

**REPLACE with this simpler Forms API code:**
```typescript
    // ✅ ADD THIS NEW CODE:
    // Build HubSpot Forms API payload
    const formPayload = {
      fields: [
        {
          objectTypeId: "0-1",
          name: "email",
          value: email.toLowerCase().trim()
        }
      ],
      context: {
        pageUri: pageUri || '',
        pageName: pageName || 'Website'
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow Studio 587 to store and process my personal data.",
          communications: []
        }
      }
    };

    // Construct Forms API endpoint URL
    const formUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`;

    try {
      // Submit to HubSpot Forms API
      const response = await fetch(formUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      // Check if submission was successful
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Forms API error (${response.status}):`, errorText);
        throw new Error(`Form submission failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('Form submission successful:', result);

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed!',
      });
    } catch (hubspotError: any) {
      console.error('HubSpot Forms API error:', hubspotError);
      throw hubspotError;
    }
```

---

### Understanding the New Code

Let's break down what each part does:

#### 1. Building the Payload
```typescript
const formPayload = {
  fields: [
    {
      objectTypeId: "0-1",  // Always "0-1" for contact properties
      name: "email",         // HubSpot property name
      value: email.toLowerCase().trim()  // The actual email
    }
  ],
  context: {
    pageUri: pageUri || '',      // Where they signed up from
    pageName: pageName || 'Website'  // User-friendly page name
  },
  legalConsentOptions: {
    consent: {
      consentToProcess: true,  // Required for GDPR
      text: "I agree to allow Studio 587 to store and process my personal data.",
      communications: []  // Empty = no marketing consent (just processing)
    }
  }
};
```

**Why `objectTypeId: "0-1"`?**
- HubSpot uses object type IDs to identify different types of objects
- `0-1` = Contact object (the most common)
- `0-2` = Company, `0-3` = Deal, etc.
- For email subscriptions, you're always working with contacts, so always use `0-1`

**Why `legalConsentOptions`?**
- GDPR compliance requires explicit consent
- HubSpot tracks this automatically when you include it
- The `text` field is what was shown to the user (your privacy note)
- `consentToProcess: true` means user agreed to data processing
- `communications: []` means no marketing emails consent (yet)

#### 2. Constructing the URL
```typescript
const formUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`;
```

This creates:
```
https://api.hsforms.com/submissions/v3/integration/submit/342889648/80a47946-78a1-4c5d-a0b2-d6bd6b3f23ec
```

**Components:**
- `HUBSPOT_PORTAL_ID` = Your HubSpot account (342889648)
- `HUBSPOT_FORM_GUID` = The specific form (80a47946...)

#### 3. Making the Request
```typescript
const response = await fetch(formUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formPayload),
});
```

**Why `fetch()` instead of SDK?**
- Simpler - no library initialization needed
- Native to Node.js and browsers
- Fewer dependencies
- More control over error handling

#### 4. Error Handling
```typescript
if (!response.ok) {
  const errorText = await response.text();
  console.error(`Forms API error (${response.status}):`, errorText);
  throw new Error(`Form submission failed: ${response.status}`);
}
```

**Possible status codes:**
- `200` - Success (contact created or updated)
- `400` - Bad request (invalid email format, missing required fields)
- `403` - Forbidden (invalid portal ID or form GUID)
- `404` - Form not found
- `429` - Rate limit exceeded (too many requests)

**Important:** Unlike Contact API, Forms API returns `200` for duplicates (it handles them automatically).

---

### Complete Final File

Here's what your **entire** `/src/app/api/subscribe/route.ts` should look like after changes:

```typescript
import { NextRequest, NextResponse } from "next/server";

// Rate limiting storage (use Redis in production)
const rateLimit = new Map<string, number[]>();

// Rate limiting function
function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000')
  const maxRequests = parseInt(process.env.RATE_LIMIT_REQUESTS || '10')

  const requests = rateLimit.get(identifier) || []
  const recentRequests = requests.filter((time) => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return false
  }

  recentRequests.push(now)
  rateLimit.set(identifier, recentRequests)
  return true
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Get client IP
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(request: NextRequest) {
  try {
    // parse request body
    const body = await request.json()
    const { email, pageUri, website, pageName } = body

     // Honeypot check - if 'website' field is filled, it's likely a bot
     if (website) {
      console.log('Bot detected via honeypot field')
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      )
    }

    // Validate Email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

     // Rate limiting
     const clientIp = getClientIp(request)
     if (!checkRateLimit(clientIp)) {
       console.log(`Rate limit exceeded for IP: ${clientIp}`)
       return NextResponse.json(
         { error: 'Too many requests. Please try again later.' },
         { status: 429 }
       )
     }

    // Build HubSpot Forms API payload
    const formPayload = {
      fields: [
        {
          objectTypeId: "0-1",
          name: "email",
          value: email.toLowerCase().trim()
        }
      ],
      context: {
        pageUri: pageUri || '',
        pageName: pageName || 'Website'
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow Studio 587 to store and process my personal data.",
          communications: []
        }
      }
    };

    // Construct Forms API endpoint URL
    const formUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`;

    try {
      // Submit to HubSpot Forms API
      const response = await fetch(formUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
      });

      // Check if submission was successful
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Forms API error (${response.status}):`, errorText);
        throw new Error(`Form submission failed: ${response.status}`);
      }

      const result = await response.json();
      console.log('Form submission successful:', result);

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed!',
      });
    } catch (hubspotError: any) {
      console.error('HubSpot Forms API error:', hubspotError);
      throw hubspotError;
    }
  } catch (error) {
    console.error('Subscription error:', error)

    return NextResponse.json(
      {
        error: 'An error occurred while processing your subscription. Please try again.',
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check API health
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'email-subscription',
    provider: 'hubspot',
  })
}
```

---

## Environment Variables

**Check your `.env.local` file has these:**
```env
HUBSPOT_PORTAL_ID=342889648
HUBSPOT_FORM_GUID=80a47946-78a1-4c5d-a0b2-d6bd6b3f23ec
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
```

**No longer needed (but safe to keep):**
```env
HUBSPOT_ACCESS_TOKEN=...  # Not used by Forms API
HUBSPOT_CLIENT_SECRET=...  # Not used by Forms API
```

---

## Testing & Validation

### Pre-Deployment: HubSpot Configuration

**CRITICAL STEP:** Before testing, set up the confirmation email workflow in HubSpot.

1. **Login to HubSpot:**
   - Go to your HubSpot portal (ID: 342889648)

2. **Find your form:**
   - Navigate to: **Marketing → Forms**
   - Search for form GUID: `80a47946-78a1-4c5d-a0b2-d6bd6b3f23ec`
   - Verify it exists (it should!)

3. **Create confirmation email workflow:**
   - Go to: **Automation → Workflows**
   - Click "Create workflow"
   - Choose "Contact-based" workflow
   - Set enrollment trigger: "Form submission" → Select your form
   - Add action: "Send email"
   - Create/select confirmation email template:
     ```
     Subject: Confirm your subscription to Studio 587

     Hi there,

     Thanks for subscribing to Studio notes!

     Click here to confirm: [confirmation link]

     Best,
     Studio 587
     ```
   - Click "Review and publish"
   - Turn workflow ON

### Testing Checklist

#### Test 1: Happy Path
**Action:** Submit a valid new email
**Expected:**
- ✅ Frontend shows success message
- ✅ Contact appears in HubSpot CRM
- ✅ Confirmation email arrives in inbox
- ✅ Console logs: "Form submission successful"

#### Test 2: Duplicate Email
**Action:** Submit the same email twice
**Expected:**
- ✅ Both submissions return success
- ✅ No error messages
- ✅ Contact is updated in HubSpot (not duplicated)
- ✅ Second submission might trigger workflow again (depends on HubSpot settings)

#### Test 3: Invalid Email
**Action:** Submit "notanemail"
**Expected:**
- ✅ Frontend validation catches it before API call
- ❌ If it reaches API: 400 error "Please provide a valid email address"

#### Test 4: Rate Limiting
**Action:** Submit 11 requests rapidly from same IP
**Expected:**
- ✅ Requests 1-10 succeed
- ❌ Request 11 returns 429 "Too many requests"
- ✅ After 60 seconds, can submit again

#### Test 5: Bot Detection
**Action:** Fill the hidden "website" honeypot field
**Expected:**
- ❌ 400 error "Invalid submission"
- ✅ Console logs "Bot detected via honeypot field"

#### Test 6: Network Error
**Action:** Temporarily use wrong portal ID in .env
**Expected:**
- ❌ 403 error from HubSpot
- ✅ Error caught and 500 returned to user
- ✅ Console logs "Forms API error (403)"

---

## Troubleshooting

### Issue: No confirmation email received

**Possible causes:**

1. **Workflow not active:**
   - Check HubSpot → Automation → Workflows
   - Ensure workflow is "ON" (not draft)

2. **Form GUID mismatch:**
   - Verify `.env.local` has correct GUID
   - Check HubSpot form settings for correct GUID

3. **Email in spam:**
   - Check spam/junk folder
   - Add HubSpot sender to contacts

4. **Workflow enrollment settings:**
   - Check if workflow allows re-enrollment
   - For testing, enable "Re-enroll contacts"

### Issue: 403 Forbidden error

**Cause:** Invalid portal ID or form GUID

**Solution:**
1. Double-check `.env.local` values
2. Verify form exists in HubSpot portal
3. Check form hasn't been deleted

### Issue: 400 Bad Request error

**Possible causes:**

1. **Invalid field name:**
   - Ensure field name is "email" (lowercase)
   - Check HubSpot form for correct field names

2. **Missing required fields:**
   - Some forms have required fields beyond email
   - Add them to `fields` array in payload

3. **Invalid objectTypeId:**
   - Must be "0-1" for contacts (string, not number)

### Issue: Contact created but no workflow triggered

**Possible causes:**

1. **Workflow trigger not set to form submission:**
   - Edit workflow
   - Ensure trigger is "Form submission" for your specific form

2. **Contact doesn't meet workflow criteria:**
   - Check workflow enrollment filters
   - Ensure contact properties match criteria

3. **Form not connected to workflow:**
   - Verify workflow is triggered by correct form GUID

### Issue: Duplicate contacts in HubSpot

**Cause:** This shouldn't happen with Forms API (it's idempotent)

**If it does happen:**
1. Check if you're still using Contact API somewhere
2. Verify you fully replaced the old code
3. Check HubSpot deduplication settings

---

## What Gets Preserved (No Changes Needed)

### Frontend Component
**File:** `/src/components/ui/email-capture-card.tsx`
**Status:** ✅ NO CHANGES NEEDED

The component already sends the right data:
```typescript
fetch("/api/subscribe", {
  method: "POST",
  body: JSON.stringify({
    email: value.email,
    pageUri: window.location.href,
    website: honeypot,  // Still used for bot detection
    pageName: headline,
  }),
})
```

This works perfectly with the new Forms API backend!

### Security Features
✅ Email validation (regex)
✅ Honeypot bot detection
✅ Rate limiting (10 requests / 60 seconds)
✅ Client IP tracking
✅ Error messages to user

All preserved in the new implementation!

---

## Optional Post-Implementation Cleanup

### Remove HubSpot SDK Dependency

**File:** `package.json`

**Find:**
```json
"dependencies": {
  "@hubspot/api-client": "^13.4.0",
  ...
}
```

**Action:** Check if `@hubspot/api-client` is used anywhere else:
```bash
grep -r "@hubspot/api-client" src/
```

**If not used:** Remove it:
```bash
npm uninstall @hubspot/api-client
```

**Benefits:**
- Smaller bundle size
- Fewer dependencies to maintain
- Faster npm install

---

## Comparison: Before vs After

### Lines of Code
- **Before:** 179 lines
- **After:** ~145 lines
- **Savings:** 34 lines removed (19% reduction)

### API Calls Per Submission
- **Before (new contact):** 1 call (create)
- **Before (duplicate):** 3 calls (create → search → update)
- **After (both cases):** 1 call (submit form)

### Dependencies
- **Before:** Requires `@hubspot/api-client` SDK
- **After:** Uses native `fetch()` only

### Complexity
- **Before:** 80 lines of duplicate handling logic
- **After:** Forms API handles duplicates automatically

### Email Automation
- **Before:** ❌ No automated emails
- **After:** ✅ Triggers HubSpot workflows

---

## Summary

### What Changed
1. Removed HubSpot SDK imports and initialization
2. Replaced Contact API logic with Forms API fetch call
3. Simplified duplicate handling (now automatic)
4. Added GDPR consent tracking

### What Stayed the Same
1. Frontend component (zero changes)
2. All security features (validation, honeypot, rate limiting)
3. User-facing error messages
4. API endpoint URL (`/api/subscribe`)

### Key Benefits
1. ✅ **Automated confirmation emails** via HubSpot workflows
2. ✅ **Simpler code** (35 fewer lines)
3. ✅ **Fewer API calls** (1 instead of up to 3)
4. ✅ **Better separation** (right tool for the job)
5. ✅ **GDPR compliance** (built-in consent tracking)

### Next Steps
1. ✅ Implement the code changes above
2. ✅ Verify environment variables
3. ✅ Set up confirmation email workflow in HubSpot
4. ✅ Test thoroughly using checklist
5. ✅ Deploy and monitor

---

## Questions?

If you run into issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Verify HubSpot workflow is active
3. Check browser console and server logs for errors
4. Review HubSpot form submission analytics

Good luck with the implementation! 🚀
