"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon } from "@sanity/icons/ChevronLeft";
import { ChevronRightIcon } from "@sanity/icons/ChevronRight";

interface ImageCarouselProps {
  images: Array<{
    _key?: string;
    asset?: { _ref: string; _type: string };
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { left: number; top: number; right: number; bottom: number };
    url?: string;
  }>;
  title: string;
  autoSwipeInterval?: number;
}

export default function ImageCarousel({
  images,
  title,
  autoSwipeInterval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsAutoPlay(false);
  };

  // Auto-swipe effect
  useEffect(() => {
    if (!isAutoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, autoSwipeInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length, autoSwipeInterval]);

  // Resume auto-play after 8 seconds of inactivity
  useEffect(() => {
    if (images.length <= 1) return;

    const timeout = setTimeout(() => {
      setIsAutoPlay(true);
    }, 8000);

    return () => clearTimeout(timeout);
  }, [currentIndex, images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-black group">
      {currentImage.url ? (
        <Image
          key={currentImage._key || currentIndex}
          src={currentImage.url}
          alt={`${title} - Image ${currentIndex + 1} of ${images.length}`}
          fill
          priority={currentIndex === 0}
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover transition-all duration-500"
        />
      ) : (
        <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-600">
          Image not available
        </div>
      )}

      {/* Navigation Buttons - Only show if multiple images */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all opacity-100 focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeftIcon width={24} height={24} />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all opacity-100 focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRightIcon width={24} height={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
