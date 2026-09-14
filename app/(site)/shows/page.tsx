import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { VIDEOS_QUERY } from "@/sanity/lib/queries";
import VideosListClient from "@/components/VideosListClient";
import SectionHeading from "@/components/SectionHeading";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shows & Episodes — PauseTV | Watch Comedy & Interviews",
  description:
    "Watch every episode, clip, and full interview from PauseTV. New shows streaming weekly featuring sharp comedy, honest conversations, and breaking news.",
  keywords: [
    "comedy episodes",
    "late night shows",
    "video clips",
    "full episodes",
    "interviews",
  ],
  openGraph: {
    title: "Shows & Episodes — PauseTV",
    description:
      "Watch every clip, interview, and full episode from PauseTV streaming now.",
    type: "website",
  },
};

export default async function ShowsPage() {
  const videos = await client.fetch<any[]>(VIDEOS_QUERY);

  return (
    <section className="bg-black min-h-screen pt-32 pb-20 text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Watch" title="Shows & Episodes" light />

        <VideosListClient videos={videos ?? []} />
      </div>
    </section>
  );
}
