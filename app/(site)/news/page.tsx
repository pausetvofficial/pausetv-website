import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { NEWS_QUERY } from "@/sanity/lib/queries";
import NewsListClient from "@/components/NewsListClient";
import SectionHeading from "@/components/SectionHeading";
import type { NewsPost } from "@/types";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "News & Press Latest Updates & Coverage",
  description:
    "Read the latest news, press releases, and media coverage from PauseTV. Stay updated on new episodes, special events, and industry news.",
  keywords: [
    "PauseTV news",
    "press release",
    "media coverage",
    "entertainment news",
    "latest updates",
  ],
  openGraph: {
    title: "News & Press — PauseTV",
    description:
      "The latest news, press, and updates from PauseTV and entertainment media.",
    type: "website",
  },
};

export default async function NewsPage() {
  const posts = await client.fetch<NewsPost[]>(NEWS_QUERY);

  return (
    <section className="min-h-screen bg-black pt-32 pb-20 text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="In the Press"
          title="Latest News"
          light={true}
        />

        <NewsListClient posts={posts ?? []} />
      </div>
    </section>
  );
}
