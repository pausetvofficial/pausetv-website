import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Newsletter Subscription — PauseTV",
  description: "Unsubscribe or manage your PauseTV newsletter subscription.",
  robots: "noindex, nofollow",
};

async function UnsubscribeContent({ token }: { token: string | null }) {
  if (!token) {
    return (
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        <div className="rounded-lg bg-brand-red/10 p-6 border border-brand-red/20">
          <h2 className="font-display text-2xl text-brand-red mb-3">
            Invalid Link
          </h2>
          <p className="text-black/70 mb-4">
            The unsubscribe link you clicked is invalid or has expired. Please
            contact us if you need help managing your subscription.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-brand-red px-6 py-2 text-sm font-semibold text-white hover:bg-brand-red-dark transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 sm:px-8">
      <UnsubscribeForm token={token} />
    </div>
  );
}

function UnsubscribeForm({ token }: { token: string }) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("/api/newsletter/unsubscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            window.location.href = "/?unsubscribed=true";
          } else {
            alert("Failed to unsubscribe. Please try again.");
          }
        } catch (error) {
          alert("Something went wrong. Please try again.");
        }
      }}
      className="rounded-lg bg-white border border-black/10 p-8"
    >
      <h2 className="font-display text-2xl mb-4 text-black">
        Manage Your Subscription
      </h2>
      <p className="text-black/70 mb-6">
        We're sorry to see you go! Your email will be removed from our
        newsletter immediately.
      </p>

      <div className="space-y-4">
        <button
          type="submit"
          className="w-full rounded-full bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-brand-red transition-colors"
        >
          Confirm Unsubscribe
        </button>

        <p className="text-xs text-black/50 text-center">
          You'll be unsubscribed immediately and won't receive any more emails
          from us.
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-black/10">
        <p className="text-sm text-black/70 mb-3">
          Changed your mind? You can always resubscribe on our website.
        </p>
        <Link
          href="/#newsletter"
          className="text-brand-red font-semibold hover:underline"
        >
          Go back and resubscribe →
        </Link>
      </div>
    </form>
  );
}

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="mb-12">
          <h1 className="font-display text-4xl tracking-wide text-black sm:text-5xl mb-2">
            Newsletter Preferences
          </h1>
          <p className="text-black/60">
            Manage your PauseTV newsletter subscription
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-lg bg-black/5 p-8 animate-pulse">
              <div className="h-8 bg-black/10 rounded mb-4 w-1/3" />
              <div className="h-4 bg-black/10 rounded mb-2" />
              <div className="h-4 bg-black/10 rounded w-2/3" />
            </div>
          }
        >
          {searchParams.then((params) => {
            const token =
              typeof params.token === "string" ? params.token : null;
            return <UnsubscribeContent token={token} />;
          })}
        </Suspense>

        <div className="mt-16 pt-8 border-t border-black/10">
          <Link
            href="/"
            className="text-black/60 hover:text-black transition-colors"
          >
            ← Back to PauseTV
          </Link>
        </div>
      </div>
    </div>
  );
}
