import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import SectionHeading from "@/components/SectionHeading";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact & Booking — PauseTV | Get in Touch",
  description:
    "Contact the PauseTV team for booking inquiries, press opportunities, or general questions. Reach out to us through email or social media.",
  keywords: [
    "contact PauseTV",
    "booking",
    "press inquiries",
    "general inquiries",
    "get in touch",
  ],
  openGraph: {
    title: "Contact & Booking — PauseTV",
    description:
      "Get in touch with the PauseTV team for booking, press, or general inquiries.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact & Booking — PauseTV",
      },
    ],
  },
};

type SiteSettings = {
  email?: string;
  bookingEmail?: string;
  socialLinks?: { platform?: string; url?: string }[];
};

export default async function ContactPage() {
  const settings = await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);

  return (
    <section className="min-h-screen bg-black pt-32 pb-20 text-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="Get in Touch" title="Contact PauseTV" light />
        <p className="mt-4 max-w-xl text-white/70">
          Got Trending News or Gist? Contact Us!
          <br />
          Kana da Sabbin Labarai ko Gist? Tuntube Mu!
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="rounded-lg border border-white/10 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              Call Us
            </h3>
            <a
              href={`tel:+2347060661655`}
              className="mt-3 block text-lg font-semibold hover:text-brand-red"
            >
              +234 706 066 1655
            </a>
          </div>

          <div className="rounded-lg border border-white/10 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              WhatsApp
            </h3>
            <a
              href={`https://wa.me/2349164617966`}
              className="mt-3 block text-lg font-semibold hover:text-brand-red"
            >
              +234 916 461 7966
            </a>
          </div>

          <div className="rounded-lg border border-white/10 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              General Inquiries
            </h3>
            <a
              href={`mailto:${settings?.email ?? "hello@pausetv.com"}`}
              className="mt-3 block text-lg font-semibold hover:text-brand-red"
            >
              {settings?.email ?? "hello@pausetv.com"}
            </a>
          </div>

          <div className="rounded-lg border border-white/10 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              Booking
            </h3>
            <a
              href={`mailto:${settings?.bookingEmail ?? "booking@pausetv.com"}`}
              className="mt-3 block text-lg font-semibold hover:text-brand-red"
            >
              {settings?.bookingEmail ?? "booking@pausetv.com"}
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
            Visit Us
          </h3>
          <p className="mt-3 block text-lg font-semibold hover:text-brand-red">
            Abuja, Nigeria
          </p>
        </div>

        {settings?.socialLinks?.length ? (
          <div className="mt-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
              Follow PauseTV
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {settings.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-colors hover:border-brand-red hover:text-brand-red"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
