import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import {
  SITE_SETTINGS_QUERY,
  FEATURED_VIDEOS_QUERY,
  FEATURED_NEWS_QUERY,
  HOST_QUERY,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import VideoCard from "@/components/VideoCard";
import NewsCard from "@/components/NewsCard";
import SectionHeading from "@/components/SectionHeading";
import NewsletterSection from "@/components/NewsletterSection";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "PAUSE TV NEWS LIMITED",
  description:
    "Credible News. Engaging Entertainment. We keep our audience informed, inspired, and entertained — one story at a time.",
  openGraph: {
    title: "PAUSE TV NEWS LIMITED",
    description:
      "Credible News. Engaging Entertainment. We keep our audience informed, inspired, and entertained — one story at a time.",
    type: "website",
  },
};

export default async function HomePage() {
  const [settings, videos, news, host] = await Promise.all([
    client.fetch<any>(SITE_SETTINGS_QUERY),
    client.fetch<any[]>(FEATURED_VIDEOS_QUERY),
    client.fetch<any[]>(FEATURED_NEWS_QUERY),
    client.fetch<any>(HOST_QUERY),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          {settings?.heroImage ? (
            <Image
              src={urlFor(settings.heroImage).width(1920).height(1080).url()}
              alt="PauseTV - Real Talk, Real Laughs hero banner"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-50"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-brand-red/20" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pt-16 sm:px-8">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
            {settings?.heroEyebrow ?? "PauseTV Presents"}
          </span>
          <h1 className="mt-4 font-display text-6xl leading-[0.95] tracking-wide sm:text-8xl">
            CREDIBLE NEWS.
            <br />
            <span className="text-brand-red">ENGAGING ENTERTAINMENT.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70">
            {settings?.tagline ??
              "We keep our audience informed, inspired, and entertained — one story at a time."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shows"
              className="rounded-full bg-brand-red px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-red-dark"
            >
              {settings?.heroCtaLabel ?? "Watch Now"}
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:border-white"
            >
              Meet the Host
            </Link>
          </div>
        </div>
      </section>

      {/* Featured videos */}
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Latest" title="Fresh Off the Set" light />
            <Link
              href="/shows"
              className="text-sm font-semibold uppercase tracking-wider text-brand-red hover:text-white"
            >
              View all shows →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos?.length ? (
              videos
                .slice(0, 6)
                .map((video: any) => (
                  <VideoCard key={video._id} video={video} />
                ))
            ) : (
              <p className="text-white/40">
                No videos yet — add one from the Sanity Studio.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* About teaser */}
      {host && (
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-[minmax(0,320px)_1fr] md:items-center">
            <div className="relative mx-auto aspect-3/4 w-full max-w-xs overflow-hidden rounded-lg bg-black/5">
              {host.photo ? (
                <Image
                  src={urlFor(host.photo).width(480).height(640).url()}
                  alt={`${host.name ?? "Host"} - PauseTV host portrait`}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div>
              <SectionHeading
                eyebrow="The Host"
                title={host.name ?? "Meet the Host"}
              />
              {host.role && (
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-black/50">
                  {host.role}
                </p>
              )}
              <p className="mt-4 max-w-2xl text-black/70">{host.bio}</p>
              <Link
                href="/about"
                className="mt-6 inline-block rounded-full bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand-red"
              >
                Full Bio
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* News */}
      <section className="bg-black py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="In the Press" title="Latest News" light />
            <Link
              href="/news"
              className="text-sm font-semibold uppercase tracking-wider text-brand-red hover:text-white"
            >
              All news →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news?.length ? (
              news
                .slice(0, 6)
                .map((post: any) => <NewsCard key={post._id} post={post} />)
            ) : (
              <p className="text-white/40">
                No news posts yet — add one from the Sanity Studio.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
