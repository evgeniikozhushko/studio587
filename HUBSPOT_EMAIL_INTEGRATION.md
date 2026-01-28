# HubSpot Email Integration - Direct API Method

## Overview
Complete guide for integrating the email capture feature with HubSpot CRM using direct API contact creation (not Forms API). This method creates contacts directly in HubSpot using the `@hubspot/api-client` SDK.

## Prerequisites
- HubSpot account (Free tier works)
- HubSpot Private App with API Access Token
- Existing email capture components (already created)

## HubSpot Setup

### Step 1: Create a Private App in HubSpot

1. **Navigate to Settings**
   - Log in to your HubSpot account
   - Click the settings icon (gear) in the main navigation

2. **Create Private App**
   - Go to: Integrations → Private Apps
   - Click "Create a private app"
   - Name it: "Studio587 Website Integration"
   - Description: "Email capture form integration for studio587.ca"

3. **Configure Scopes**
   Required scopes for direct contact creation:
   - `crm.objects.contacts.write` - Create/update contacts
   - `crm.objects.contacts.read` - Read contact data (for duplicate checking and updates)

4. **Get Your Access Token**
   - Click "Create app"
   - Copy the access token (you'll only see this once!)
   - Store it securely - this goes in your `.env.local`

**Note:** No form creation needed in HubSpot - we'll create contacts directly via API.

## Environment Variables Setup

### Step 2: Configure `.env.local`

Create or update your `.env.local` file:

```bash
# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Optional: Rate limiting configuration
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
```

### Update `.gitignore`

Ensure `.env.local` is in your `.gitignore`:

```bash
# Local env files
.env*.local
.env.local
```

## API Implementation

### Step 3: Install Dependencies

```bash
npm install @hubspot/api-client
```

### Step 4: Create API Route

**File: `src/app/api/subscribe/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@hubspot/api-client'

// Rate limiting storage (use Redis in production)
const rateLimit = new Map<string, number[]>()

// Initialize HubSpot client
const hubspotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
})

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
    // Parse request body
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

    // Validate email
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

    // Create or update contact in HubSpot
    const contactProperties = {
      email: email.toLowerCase().trim(),
      // Optional: Add custom properties
      lifecyclestage: 'subscriber',
      hs_lead_status: 'NEW',
      // Track where they signed up from
      signup_source: pageName || 'Website',
      signup_page_url: pageUri || '',
    }

    try {
      // Try to create a new contact
      const contactResponse = await hubspotClient.crm.contacts.basicApi.create({
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
          const searchResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'email',
                    operator: 'EQ',
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
            await hubspotClient.crm.contacts.basicApi.update(contactId, {
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

// Optional: GET endpoint to check API health
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'email-subscription',
    provider: 'hubspot',
  })
}
```

## How It Works

The implementation uses the HubSpot Node.js SDK (`@hubspot/api-client`) to:

1. **Receive email submission** from the EmailCaptureCard component
2. **Validate** email format and check honeypot field for bots
3. **Rate limit** requests to prevent spam
4. **Create new contact** in HubSpot with custom properties
5. **Handle duplicates** by searching for and updating existing contacts
6. **Return success/error** responses to the frontend

### Key Features

- ✅ Direct contact creation (no form setup needed in HubSpot)
- ✅ Automatic duplicate handling
- ✅ Custom contact properties (signup_source, signup_page_url, etc.)
- ✅ Bot protection via honeypot
- ✅ Rate limiting
- ✅ Comprehensive error handling

## Step 5: Create HubSpot Custom Properties (Optional but Recommended)

To track where contacts signed up from, create custom properties in HubSpot:

1. **Go to Settings → Properties**
2. **Select "Contact properties"**
3. **Click "Create property"**
4. **Create these properties:**

| Property Name | Internal Name | Field Type | Description |
|--------------|---------------|------|-------------|
| Signup Source | `signup_source` | Single-line text | Where user signed up (e.g., "Website") |
| Signup Page URL | `signup_page_url` | Single-line text | Exact URL where they signed up |
| Last Signup Date | `last_signup_date` | Date picker | Most recent signup attempt |

**Note:** If you don't create these properties, the API will still work but these fields won't be populated. Standard HubSpot properties like `email`, `lifecyclestage`, and `hs_lead_status` work by default.

## Step 6: Integration with Hero Component

Add the EmailCaptureCard component to your Hero section.

**File: `src/components/home/hero/Hero.tsx`**

```tsx
import EmailCaptureCard from "@/components/ui/email-capture-card"

export default function Hero() {
  const handleEmailClick = () => {
    const email = "hello@studio587.ca";
    const subject = "Studio587.ca";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <>
      <main className="space-y-0">
        <section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4 mt-30 mb-10 md:my-60">
          {/* Existing hero content */}
          <div className="col-span-1 md:col-span-6 space-y-4">
            <div className="text-sm uppercase col-span-1 md:col-span-12">
              Brand Design & Web Development for Culture, Technology, and Commerce.
            </div>
            <div className="text-4xl md:text-5xl font-semibold col-span-1 md:col-span-12">
              Building the next generation of brands, experiences && growth.
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 md:col-start-9 md:row-start-1 flex flex-col gap-2 items-start">
            <div className="hidden md:block uppercase text-xs md:text-sm">
              Servicing Canmore, Banff, Bow Valley, Alberta, and clients globally.
            </div>
            <Button className="mt-2 px-18" onClick={handleEmailClick}>
              Start a project
            </Button>
            <div className="md:hidden uppercase text-xs md:text-sm mt-16">
              Servicing Canmore, Banff, Bow Valley, Alberta, and clients globally.
            </div>
            <Separator className="col-span-1 mt-14 mb-0 md:hidden" />
          </div>

          {/* Email Capture Card */}
          <div className="col-span-1 md:col-span-6 md:col-start-4 mt-12">
            <EmailCaptureCard
              headline="Stay Updated"
              description="Get the latest updates on design, development, and digital culture delivered to your inbox."
              successMessage="Thanks for subscribing! We'll be in touch soon."
              privacyNote="We respect your privacy. Unsubscribe anytime."
            />
          </div>
        </section>
      </main>
    </>
  )
}
```

## Testing Checklist

### Local Testing

1. **Environment Setup**
   - [ ] `.env.local` created with HubSpot token
   - [ ] Token has correct scopes
   - [ ] Dependencies installed (`@hubspot/api-client`)

2. **API Route Testing**
   ```bash
   # Test with curl
   curl -X POST http://localhost:3000/api/subscribe \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","pageUri":"http://localhost:3000","website":"","pageName":"Test"}'
   ```

3. **Frontend Testing**
   - [ ] Form displays correctly
   - [ ] Email validation works
   - [ ] Loading state shows during submission
   - [ ] Success message displays
   - [ ] Error handling works

4. **HubSpot Verification**
   - [ ] Check Contacts in HubSpot dashboard
   - [ ] Verify contact properties are set
   - [ ] Test duplicate email handling
   - [ ] Verify custom properties appear

### Security Testing

- [ ] Honeypot field catches bots
- [ ] Rate limiting prevents spam
- [ ] Invalid emails rejected
- [ ] API token not exposed to client

## Deployment

### Vercel Deployment

1. **Add Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `HUBSPOT_ACCESS_TOKEN`
   - Add other env vars as needed

2. **Deploy**
   ```bash
   git add .
   git commit -m "Add HubSpot email integration"
   git push origin main
   ```

3. **Verify in Production**
   - Test the form on production URL
   - Check HubSpot for new contacts
   - Monitor error logs in Vercel

### Other Platforms (Netlify, etc.)

Add environment variables in your platform's dashboard under Environment Variables or Build Settings.

## HubSpot Workflows (Optional)

Set up automated workflows in HubSpot:

1. **Welcome Email**
   - Trigger: Contact property "signup_source" equals "Website"
   - Action: Send welcome email template

2. **Contact Assignment**
   - Trigger: New contact created
   - Action: Assign to sales rep based on criteria

3. **List Management**
   - Create static or active list: "Website Subscribers"
   - Filter: signup_source contains "Website"

## Monitoring & Analytics

### HubSpot Analytics
- View contact acquisition over time
- Track conversion rates
- Monitor email engagement

### Server Logs
```typescript
// Add to your API route for better logging
console.log({
  timestamp: new Date().toISOString(),
  action: 'subscription',
  email: email,
  source: pageName,
  ip: clientIp,
  success: true,
})
```

## Troubleshooting

### Common Issues

**1. 401 Unauthorized Error**
- Check access token is correct
- Verify token hasn't expired
- Ensure scopes include `crm.objects.contacts.write`

**2. 409 Conflict (Contact Exists)**
- This is handled in the code
- Contact will be updated instead of created

**3. Rate Limiting**
- Adjust `RATE_LIMIT_REQUESTS` and `RATE_LIMIT_WINDOW_MS`
- Consider using Redis for production rate limiting

**4. CORS Errors**
- Ensure API route allows your domain
- Check Next.js API route configuration

### Debug Mode

Add to your API route for debugging:

```typescript
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Request body:', body)
  console.log('HubSpot response:', contactResponse)
}
```

## Production Best Practices

1. **Use Redis for Rate Limiting**
   ```bash
   npm install @upstash/redis @upstash/ratelimit
   ```

2. **Add Request Logging**
   - Log to service like LogTail, Datadog, or Sentry
   - Track subscription success/failure rates

3. **Set Up Monitoring**
   - Monitor HubSpot API quota usage
   - Set up alerts for high error rates
   - Track form submission metrics

4. **GDPR Compliance**
   - Add privacy policy link
   - Implement unsubscribe mechanism
   - Add consent checkbox if required

5. **Email Verification**
   - Consider double opt-in workflow
   - Send confirmation email via HubSpot

## Cost Considerations

- **HubSpot Free Tier**: Up to 1,000,000 contacts
- **API Rate Limits**:
  - Free: 100 requests per 10 seconds
  - Paid: Higher limits based on tier

## Resources

- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [HubSpot Node.js Client](https://github.com/HubSpot/hubspot-api-nodejs)
- [HubSpot Forms API](https://developers.hubspot.com/docs/api/marketing/forms)
- [HubSpot Private Apps](https://developers.hubspot.com/docs/api/private-apps)

## Support

For HubSpot-specific issues:
- [HubSpot Developer Forums](https://community.hubspot.com/t5/APIs-Integrations/ct-p/apis)
- [HubSpot Support](https://help.hubspot.com/)

---

## Quick Start Summary

**Implementation Steps:**

1. ✅ **HubSpot Setup**
   - Create Private App in HubSpot
   - Get access token
   - Configure scopes: `crm.objects.contacts.write` and `crm.objects.contacts.read`

2. ✅ **Environment Configuration**
   - Add `HUBSPOT_ACCESS_TOKEN` to `.env.local`
   - Ensure `.env.local` is in `.gitignore`

3. ✅ **Install Dependencies**
   ```bash
   npm install @hubspot/api-client
   ```

4. ✅ **Create API Route**
   - Create `src/app/api/subscribe/route.ts` with the code above
   - Handles contact creation, duplicates, validation, and rate limiting

5. ✅ **Create Custom Properties** (Optional)
   - Add `signup_source`, `signup_page_url`, `last_signup_date` in HubSpot

6. ✅ **Integrate Component**
   - Add EmailCaptureCard to Hero.tsx

7. ✅ **Test Locally**
   - Run dev server
   - Test form submission
   - Verify contact appears in HubSpot

8. ✅ **Deploy**
   - Add `HUBSPOT_ACCESS_TOKEN` to Vercel/hosting platform
   - Deploy and test in production

---

**Components Already Created:**
- `src/components/ui/email-capture-card.tsx` ✅
- `src/components/ui/input.tsx` ✅
- `@tanstack/react-form` dependency added ✅

**Still Needed:**
- `src/app/api/subscribe/route.ts` (code provided above)
- HubSpot configuration
- Environment variables
