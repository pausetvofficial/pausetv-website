import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-15",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request: NextRequest) {
  const { token, email } = await request.json();

  if (!token && !email) {
    return NextResponse.json(
      { error: "Token or email is required" },
      { status: 400 },
    );
  }

  try {
    let query = `*[_type == "newsletterSubscription"`;
    let params: Record<string, string> = {};

    if (token) {
      query += ` && unsubscribeToken == $token`;
      params.token = token;
    } else if (email) {
      query += ` && email == $email`;
      params.email = email;
    }

    query += `][0]`;

    const subscription = await writeClient.fetch<{
      _id: string;
      email: string;
    } | null>(query, params);

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 },
      );
    }

    // Update subscription status to unsubscribed
    await writeClient
      .patch(subscription._id)
      .set({ status: "unsubscribed" })
      .commit();

    return NextResponse.json(
      { message: "Unsubscribed successfully", email: subscription.email },
      { status: 200 },
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 },
    );
  }
}
