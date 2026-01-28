# Email Capture Feature - Implementation Plan

## Overview
Implementation plan for adding email subscription functionality to the Studio587 website hero section.

## Current Status
- ✅ EmailCaptureCard component created (`src/components/ui/email-capture-card.tsx`)
- ✅ Input component with error states created (`src/components/ui/input.tsx`)
- ✅ @tanstack/react-form dependency added
- ⏳ API route for handling subscriptions (needs implementation)
- ⏳ Integration into Hero component (needs implementation)
- ⏳ Email service configuration (needs setup)

## Architecture

### Components Created

#### 1. EmailCaptureCard (`src/components/ui/email-capture-card.tsx`)
**Features:**
- Email validation using @tanstack/react-form
- Honeypot field for bot protection
- Loading states during submission
- Success/error state handling
- Accessible form with ARIA attributes
- Responsive design

**Props:**
```typescript
interface EmailCaptureCardProps {
  headline: string          // Main heading text
  description: string       // Subheading/description
  successMessage: string    // Message shown after successful subscription
  privacyNote: string       // Privacy policy note
  className?: string        // Optional styling
}
```

#### 2. Input Component (`src/components/ui/input.tsx`)
**Features:**
- CVA (class-variance-authority) for variant management
- Error state styling
- Focus states with ring effects
- Accessible with ARIA attributes

## Implementation Steps

### Step 1: Create API Route
**File:** `src/app/api/subscribe/route.ts`

**Requirements:**
- POST endpoint at `/api/subscribe`
- Accepts JSON payload: `{ email, pageUri, website, pageName }`
- Validates email format
- Checks honeypot field (`website`) - reject if filled
- Rate limiting to prevent abuse
- Integration with email service provider

**Recommended Services:**
1. **Mailchimp** - Full-featured email marketing
2. **ConvertKit** - Creator-focused platform
3. **Resend** - Developer-first email API
4. **Brevo (Sendinblue)** - Marketing automation
5. **Custom Database** - Store in your own DB

**Response Format:**
```typescript
// Success
{ success: true, message: "Subscription successful" }

// Error
{ success: false, error: "Error message" }
```

### Step 2: Environment Variables Setup
**File:** `.env.local` (create if doesn't exist)

**Required Variables (example for Resend):**
```bash
# Email Service Provider API Key
EMAIL_SERVICE_API_KEY=your_api_key_here

# Optional: Audience/List ID
EMAIL_LIST_ID=your_list_id_here

# Optional: Rate limiting
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000
```

**Note:** Add `.env.local` to `.gitignore` to prevent committing secrets

### Step 3: Integrate into Hero Component
**File:** `src/components/home/hero/Hero.tsx`

**Changes Needed:**
1. Import EmailCaptureCard component
2. Add EmailCaptureCard to the layout grid
3. Position appropriately (suggested: below main content, inside grid)

**Suggested Placement:**
```tsx
<section className="grid w-full grid-cols-1 md:grid-cols-12 px-5 gap-y-4 mt-30 mb-10 md:my-60">
  {/* Existing content... */}

  {/* Add Email Capture Card */}
  <div className="col-span-1 md:col-span-6 md:col-start-4 mt-8">
    <EmailCaptureCard
      headline="Stay in the loop"
      description="Get the latest updates on design, development, and digital culture."
      successMessage="Thanks for subscribing! Check your inbox to confirm."
      privacyNote="We respect your privacy. Unsubscribe anytime."
    />
  </div>
</section>
```

### Step 4: API Route Implementation Options

#### Option A: Resend (Recommended for developers)
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Add to audience
await resend.contacts.create({
  email: email,
  audienceId: process.env.RESEND_AUDIENCE_ID!,
})
```

**Setup:**
1. Sign up at resend.com
2. Create API key
3. Create audience
4. Install: `npm install resend`

#### Option B: Mailchimp
```typescript
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID!, {
  email_address: email,
  status: 'subscribed',
})
```

**Setup:**
1. Sign up at mailchimp.com
2. Get API key
3. Get audience ID
4. Install: `npm install @mailchimp/mailchimp_marketing`

#### Option C: Database Storage Only
Store emails in your own database for later processing.

**Setup:**
1. Set up database (PostgreSQL, MongoDB, etc.)
2. Create subscribers table/collection
3. Add email validation and duplicate checking
4. Implement export functionality

### Step 5: Security & Best Practices

**Implement:**
1. ✅ Honeypot field (already implemented)
2. ⏳ Rate limiting per IP address
3. ⏳ Email validation (server-side)
4. ⏳ CORS headers if needed
5. ⏳ Error logging
6. ⏳ Double opt-in confirmation emails

**Rate Limiting Example:**
```typescript
// Simple in-memory rate limiter (use Redis in production)
const rateLimit = new Map()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const requests = rateLimit.get(ip) || []
  const recentRequests = requests.filter(
    (time: number) => now - time < 60000 // 1 minute window
  )

  if (recentRequests.length >= 5) {
    return false // Too many requests
  }

  recentRequests.push(now)
  rateLimit.set(ip, recentRequests)
  return true
}
```

### Step 6: Testing Checklist

**Frontend:**
- [ ] Form validation works (empty email, invalid format)
- [ ] Loading state displays during submission
- [ ] Success message shows after subscription
- [ ] Error message shows on failure
- [ ] Honeypot field is hidden and functional
- [ ] Mobile responsive design works
- [ ] Keyboard navigation works
- [ ] Screen reader accessibility

**Backend:**
- [ ] API accepts valid email addresses
- [ ] API rejects invalid email formats
- [ ] Honeypot field blocks bot submissions
- [ ] Rate limiting prevents spam
- [ ] Emails are added to service provider
- [ ] Error handling works properly
- [ ] Environment variables load correctly

**Integration:**
- [ ] Form submits to correct endpoint
- [ ] Network errors handled gracefully
- [ ] Duplicate emails handled appropriately
- [ ] Confirmation email sent (if using double opt-in)

## Deployment Considerations

### Environment Variables
Add these to your hosting platform (Vercel, Netlify, etc.):
- `EMAIL_SERVICE_API_KEY`
- `EMAIL_LIST_ID` (if applicable)
- Any other service-specific variables

### GDPR Compliance
If serving EU users:
- Add privacy policy link
- Implement unsubscribe mechanism
- Include data processing information
- Consider cookie consent for tracking

### Monitoring
Set up monitoring for:
- API endpoint errors
- Subscription success/failure rates
- Email service provider status
- Rate limiting triggers

## Next Steps

1. **Choose Email Service Provider**
   - Evaluate options based on needs and budget
   - Sign up and get API credentials

2. **Implement API Route**
   - Create `src/app/api/subscribe/route.ts`
   - Add rate limiting
   - Integrate with chosen provider

3. **Configure Environment**
   - Create `.env.local`
   - Add API keys
   - Update `.gitignore`

4. **Integrate Component**
   - Add to Hero.tsx
   - Adjust styling/positioning

5. **Test Thoroughly**
   - Test all edge cases
   - Verify emails are captured
   - Check mobile experience

6. **Deploy**
   - Add env vars to hosting platform
   - Deploy to production
   - Monitor for issues

## Files Modified/Created

**Created:**
- `src/components/ui/email-capture-card.tsx` ✅
- `src/components/ui/input.tsx` ✅
- `src/app/api/subscribe/route.ts` ⏳

**Modified:**
- `src/components/home/hero/Hero.tsx` ⏳
- `package.json` ✅ (added @tanstack/react-form)
- `.env.local` ⏳ (needs creation)

**To Install:**
- Email service SDK (e.g., `npm install resend`)
- Rate limiting library (optional, e.g., `npm install @upstash/ratelimit`)

## Questions to Answer Before Implementation

1. **Which email service provider do you want to use?**
   - Resend (developer-friendly)
   - Mailchimp (marketing features)
   - ConvertKit (creator-focused)
   - Custom database
   - Other?

2. **Do you want double opt-in confirmation?**
   - Yes - sends confirmation email, more compliant
   - No - immediate subscription

3. **Where should the email capture card appear?**
   - In the hero section (suggested)
   - Separate page section
   - Footer
   - Modal/popup

4. **What happens after signup?**
   - Welcome email?
   - Redirect to thank you page?
   - Just show success message?

## References

- [Resend Documentation](https://resend.com/docs)
- [Mailchimp API Docs](https://mailchimp.com/developer/)
- [TanStack Form Docs](https://tanstack.com/form/latest)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)