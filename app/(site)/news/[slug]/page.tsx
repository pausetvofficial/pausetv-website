import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { NEWS_POST_QUERY, NEWS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import ImageCarousel from "@/components/ImageCarousel";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(NEWS_POST_QUERY, { slug });

  if (!post) {
    return {
      title: "Article Not Found — PauseTV",
      description: "The article you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} — PauseTV News`,
    description:
      post.excerpt ||
      post.description ||
      "Read this latest news and press release from PauseTV.",
    keywords: [
      post.title,
      "PauseTV",
      "news",
      "press",
      "entertainment",
      "article",
    ],
    authors: post.author ? [{ name: post.author }] : [{ name: "PauseTV" }],
    openGraph: {
      title: post.title,
      description:
        post.excerpt ||
        post.description ||
        "Read this latest news and press release from PauseTV.",
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : ["PauseTV"],
      images: post.coverImage
        ? [
            {
              url: urlFor(post.coverImage).width(1200).height(630).url(),
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch(NEWS_QUERY);
  return posts.map((post: any) => ({
    slug: post.slug?.current || post._id,
  }));
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(NEWS_POST_QUERY, { slug });

  if (!post) notFound();

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const allImages = [
    ...(post.coverImage ? [post.coverImage] : []),
    ...(post.galleryImages || []),
  ];

  // De-dupe in case the cover image was also added to the gallery
  const seenRefs = new Set<string>();
  const galleryImages = allImages.filter((image: any) => {
    const ref = image?.asset?._ref;
    if (!ref || seenRefs.has(ref)) return !ref ? true : false;
    seenRefs.add(ref);
    return true;
  });

  const formattedImages = galleryImages
    .filter((image: any) => image && image.asset)
    .map((image: any) => {
      try {
        return {
          ...image,
          url: urlFor(image).width(1200).height(675).url(),
        };
      } catch (error) {
        console.error("Failed to format image URL:", image, error);
        return { ...image, url: "" };
      }
    });

  return (
    <article className="min-h-screen bg-black pt-32 pb-20 text-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {date && (
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-red">
            {date}
          </span>
        )}
        <h1 className="mt-2 font-display text-4xl tracking-wide text-white sm:text-5xl">
          {post.title}
        </h1>

        {post.coverImage && (
          <ImageCarousel
            images={formattedImages}
            title={post.title}
            autoSwipeInterval={5000}
          />
        )}

        {post.body && (
          <div className="prose prose-invert prose-lg mt-10 max-w-none prose-headings:font-display prose-a:text-brand-red">
            <PortableText value={post.body} />
          </div>
        )}
      </div>
    </article>
  );
}
