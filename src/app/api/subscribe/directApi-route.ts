import { NextRequest, NextResponse } from "next/server";
import { Client } from "@hubspot/api-client";
import { FilterOperatorEnum } from 
"@hubspot/api-client/lib/codegen/crm/contacts/models/Filter";

// Rate limiting storage (use Redis in production)
const rateLimit = new Map<string, number[]>();

// Initialize HubSpot client
const hubSpotClient = new Client({
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
});

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