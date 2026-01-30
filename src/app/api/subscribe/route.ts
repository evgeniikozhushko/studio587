import { NextRequest, NextResponse } from "next/server";

// Rate limiting storage (use Redis in production)
const rateLimit = new Map<string, number[]>();

// Rate limiting function
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000");
  const maxRequests = parseInt(process.env.RATE_LIMIT_REQUESTS || "10");

  const requests = rateLimit.get(identifier) || [];
  const recentRequests = requests.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  rateLimit.set(identifier, recentRequests);
  return true;
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Get client IP
function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    // parse request body
    const body = await request.json();
    const { email, pageUri, website, pageName } = body;

    // Honeypot check - if 'website' field is filled, it's likely a bot
    if (website) {
      console.log("Bot detected via honeypot field");
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 },
      );
    }

    // Validate Email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    // Rate limiting
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // Build HubSpot Forms API payload
    const formPayload = {
      fields: [
        {
          objectTypeId: "0-1",
          name: "email",
          value: email.toLowerCase().trim(),
        },
      ],
      context: {
        pageUri: pageUri || "",
        pageName: pageName || "Website",
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow Studio 587 to store and process my personal data.",
          communications: [],
        },
      },
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
      console.log("Form submission successful:", result);

      return NextResponse.json({
        success: true,
        message: "Successfully subscribed!",
      });
    } catch (hubspotError: any) {
      console.error("HubSpot Forms API error:", hubspotError);
      throw hubspotError;
    }
  } catch (error) {
    console.error("Subscription error:", error);

    return NextResponse.json(
      {
        error:
          "An error occurred while processing your subscription. Please try again.",
      },
      { status: 500 },
    );
  }
}

// GET endpoint to check API health
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "email-subscription",
    provider: "hubspot",
  });
}
