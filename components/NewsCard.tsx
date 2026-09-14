import Image from "next/image";
import Link from "next/link";
import type { NewsPost } from "@/types";
import { urlFor } from "@/sanity/lib/image";

export default function NewsCard({ post }: { post: NewsPost }) {
  const slug = post.slug?.current || post._id;

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/news/${slug}`}
      className="group block overflow-hidden rounded-lg border border-black/10 bg-white"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
        {post.coverImage ? (
          <Image
            src={urlFor(post.coverImage).width(640).height(400).url()}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-black/20">
            PauseTV
          </div>
        )}
      </div>
      <div className="p-5">
        {date && (
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-red">
            {date}
          </span>
        )}
        <h3 className="mt-1 line-clamp-2 text-lg font-bold text-black">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm text-black/60">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
