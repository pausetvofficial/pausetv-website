import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { HOST_QUERY, EVENTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About the Host — PauseTV | Meet Behind the Scenes",
  description:
    "Meet the host behind PauseTV and learn about their journey creating sharp comedy and honest interviews. Discover upcoming live events and appearances.",
  keywords: [
    "PauseTV host",
    "biography",
    "comedian",
    "personality",
    "live events",
  ],
  openGraph: {
    title: "About the Host — PauseTV",
    description:
      "Meet the host behind PauseTV and their journey in comedy and entertainment.",
    type: "profile",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About the Host — PauseTV",
      },
    ],
  },
};

type Host = {
  name?: string;
  role?: string;
  bio?: string;
  photo?: unknown;
  longBio?: any;
  highlights?: { _key: string; label?: string; value?: string }[];
};

export default async function AboutPage() {
  const [host, events] = await Promise.all([
    client.fetch<Host | null>(HOST_QUERY),
    client.fetch(EVENTS_QUERY),
  ]);

  return (
    <>
      <section className="bg-black pt-32 pb-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,340px)_1fr] md:items-center">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-lg bg-white/5">
            {host?.photo ? (
              <Image
                src={urlFor(host.photo).width(600).height(800).url()}
                alt={host.name ?? "Host"}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 340px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white/20">
                Photo coming soon
              </div>
            )}
          </div>

          <div>
            <SectionHeading
              eyebrow="About"
              title={host?.name ?? "The Host"}
              light
            />
            {host?.role && (
              <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                {host.role}
              </p>
            )}
            <p className="mt-6 max-w-2xl text-lg text-white/70">{host?.bio}</p>

            {host?.highlights?.length ? (
              <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {host.highlights.map((h) => (
                  <div key={h._key}>
                    <dt className="font-display text-3xl text-brand-red">
                      {h.value}
                    </dt>
                    <dd className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      {h.label}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </section>

      {host?.longBio && (
        <section className="bg-white py-20">
          <div className="prose prose-lg mx-auto max-w-3xl px-5 prose-headings:font-display prose-a:text-brand-red sm:px-8">
            <PortableText value={host.longBio} />
          </div>
        </section>
      )}

      {events?.length ? (
        <section className="bg-black py-20 text-white">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <SectionHeading
              eyebrow="Where to Catch Him"
              title="Upcoming Appearances"
              light
            />
            <div className="mt-10">
              {events.map((event: any) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
