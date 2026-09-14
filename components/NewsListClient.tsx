"use client";

import { useMemo, useState } from "react";
import type { Category, NewsPost } from "@/types";
import NewsCard from "@/components/NewsCard";
import CategoryFilter from "@/components/CategoryFilter";

export default function NewsListClient({ posts }: { posts: NewsPost[] }) {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const map = new Map<string, Category>();
    for (const post of posts) {
      if (post.category?._id) map.set(post.category._id, post.category);
    }
    return Array.from(map.values());
  }, [posts]);

  const filteredPosts = activeCategoryId
    ? posts.filter((post) => post.category?._id === activeCategoryId)
    : posts;

  return (
    <>
      <CategoryFilter
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelect={setActiveCategoryId}
        light={true}
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length ? (
          filteredPosts.map((post) => <NewsCard key={post._id} post={post} />)
        ) : (
          <p className="text-white/40">No news posts in this category yet.</p>
        )}
      </div>
    </>
  );
}
