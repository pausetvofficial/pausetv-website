"use client";

import { useMemo, useState } from "react";
import type { Category, Video } from "@/types";
import VideoCard from "@/components/VideoCard";
import CategoryFilter from "@/components/CategoryFilter";

export default function VideosListClient({ videos }: { videos: Video[] }) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const map = new Map<string, Category>();
    for (const video of videos) {
      if (video.category?._id) map.set(video.category._id, video.category);
    }
    return Array.from(map.values());
  }, [videos]);

  const filteredVideos = activeCategoryId
    ? videos.filter((video) => video.category?._id === activeCategoryId)
    : videos;

  return (
    <>
      <CategoryFilter
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelect={setActiveCategoryId}
        light
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.length ? (
          filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <p className="text-white/40">No videos in this category yet.</p>
        )}
      </div>
    </>
  );
}
