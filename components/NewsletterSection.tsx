"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "already-subscribed"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.alreadySubscribed) {
          setStatus("already-subscribed");
          setMessage("You're already subscribed to our newsletter!");
        } else {
          setStatus("error");
          setMessage(data.error || "Something went wrong. Please try again.");
        }
        setTimeout(() => setStatus("idle"), 5000);
        return;
      }

      setStatus("success");
      setMessage(data.message || "Thanks! Check your email for confirmation.");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="newsletter"
      className="bg-brand-red py-16 text-white scroll-mt-20"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <h2 className="font-display text-4xl tracking-wide sm:text-5xl">
          Never Miss an Episode
        </h2>
        <p className="text-white/90">
          Get new episodes, tour dates, and behind-the-scenes updates straight
          to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="flex-1 rounded-full bg-white/20 px-6 py-3 text-white placeholder:text-white/50 focus:bg-white/30 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-black px-8 py-3 font-semibold uppercase tracking-wider text-white transition-colors hover:bg-black/80 disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {status === "success" && (
            <p className="mt-3 text-sm text-white/80">{message}</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-white/60">{message}</p>
          )}
          {status === "already-subscribed" && (
            <p className="mt-3 text-sm text-white/90 font-medium">{message}</p>
          )}
        </form>

        <p className="text-xs text-white/60">
          We respect your privacy.{" "}
          <a href="/unsubscribe" className="underline hover:text-white">
            Unsubscribe
          </a>{" "}
          at any time.
        </p>
      </div>
    </section>
  );
}
