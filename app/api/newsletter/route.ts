import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import crypto from "crypto";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

function generateUnsubscribeToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  // Validate email
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  try {
    // Check if email already exists in Sanity
    const existingSubscription = await writeClient.fetch<{
      _id: string;
      status: string;
    } | null>(`*[_type == "newsletterSubscription" && email == $email][0]`, {
      email,
    });

    if (existingSubscription) {
      return NextResponse.json(
        {
          error: "This email is already subscribed to our newsletter",
          alreadySubscribed: true,
        },
        { status: 400 },
      );
    }

    // Generate unsubscribe token
    const unsubscribeToken = generateUnsubscribeToken();

    // Create new subscription in Sanity
    const subscription = await writeClient.create({
      _type: "newsletterSubscription",
      email,
      subscribedAt: new Date().toISOString(),
      status: "active",
      source: "website",
      unsubscribeToken,
    });

    console.log("✅ Newsletter subscription created:", {
      subscriptionId: subscription._id,
      email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message:
          "Subscribed successfully! Thank you for joining our newsletter.",
        subscriptionId: subscription._id,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error);

    // Check for specific errors
    if (error instanceof Error) {
      if (error.message.includes("token")) {
        return NextResponse.json(
          {
            error:
              "Newsletter service not configured. Add SANITY_API_WRITE_TOKEN to .env.local with Editor permissions.",
            debug:
              process.env.NODE_ENV === "development"
                ? error.message
                : undefined,
          },
          { status: 500 },
        );
      }

      if (
        error.message.includes("permission") ||
        error.message.includes("unauthorized")
      ) {
        return NextResponse.json(
          {
            error:
              "Write token does not have permission. Ensure SANITY_API_WRITE_TOKEN has Editor role.",
            debug:
              process.env.NODE_ENV === "development"
                ? error.message
                : undefined,
          },
          { status: 403 },
        );
      }
    }

    return NextResponse.json(
      {
        error: "Failed to subscribe. Please try again or contact support.",
        debug:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 },
    );
  }
}
