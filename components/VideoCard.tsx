import Image from "next/image";
import Link from "next/link";
import type { Video } from "@/types";
import { urlFor } from "@/sanity/lib/image";

export default function VideoCard({ video }: { video: Video }) {
  const slug = video.slug?.current || video._id;

  return (
    <Link
      href={`/shows/${slug}`}
      className="group block overflow-hidden rounded-lg bg-brand-charcoal"
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {video.thumbnail ? (
          <Image
            src={urlFor(video.thumbnail).width(640).height(360).url()}
            alt={video.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/30">
            No thumbnail
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white">
            ▶
          </span>
        </div>
      </div>
      <div className="p-4">
        {video.category?.title && (
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-red">
            {video.category.title}
          </span>
        )}
        <h3 className="mt-1 line-clamp-2 font-semibold text-white">
          {video.title}
        </h3>
      </div>
    </Link>
  );
}
