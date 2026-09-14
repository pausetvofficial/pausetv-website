import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { VIDEO_QUERY, VIDEOS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 300;

function getYoutubeEmbedUrl(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const video = await client.fetch(VIDEO_QUERY, { slug });

  if (!video) {
    return {
      title: "Video Not Found — PauseTV",
      description: "The video you are looking for does not exist.",
    };
  }

  return {
    title: `${video.title} — PauseTV`,
    description:
      video.description ||
      "Watch this episode from PauseTV featuring sharp comedy, honest interviews, and breaking news.",
    keywords: [
      video.title,
      "PauseTV",
      video.category?.title || "comedy",
      "episode",
      "watch online",
    ],
    openGraph: {
      title: video.title,
      description:
        video.description ||
        "Watch this episode from PauseTV featuring sharp comedy, honest interviews, and breaking news.",
      type: "video.episode",
      images: video.thumbnail
        ? [
            {
              url: urlFor(video.thumbnail).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: video.title,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const videos = await client.fetch(VIDEOS_QUERY);
  return videos.map((video: any) => ({
    slug: video.slug?.current || video._id,
  }));
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const video = await client.fetch(VIDEO_QUERY, { slug });

  if (!video) notFound();

  const embedUrl = video.youtubeUrl
    ? getYoutubeEmbedUrl(video.youtubeUrl)
    : null;
  const date = video.publishedAt
    ? new Date(video.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <article className="bg-black min-h-screen pt-32 pb-20 text-white">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {video.category?.title && (
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-red">
            {video.category.title}
          </span>
        )}
        <h1 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
          {video.title}
        </h1>
        {date && <p className="mt-2 text-sm text-white/50">{date}</p>}

        <div className="relative mt-8 aspect-video overflow-hidden rounded-lg bg-white/5">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <Link
              href={video.youtubeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-0"
            >
              {video.thumbnail ? (
                <Image
                  src={urlFor(video.thumbnail).width(1200).height(675).url()}
                  alt={video.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/30">
                  No thumbnail
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-2xl text-white">
                  ▶
                </span>
              </div>
            </Link>
          )}
        </div>

        {video.description && (
          <p className="mt-8 max-w-2xl text-white/70">{video.description}</p>
        )}
      </div>
    </article>
  );
}
