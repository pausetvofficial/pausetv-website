"use client";

import type { Category } from "@/types";

export default function CategoryFilter({
  categories,
  activeCategoryId,
  onSelect,
  light = false,
}: {
  categories: Category[];
  activeCategoryId: string | null;
  onSelect: (categoryId: string | null) => void;
  light?: boolean;
}) {
  if (categories.length === 0) return null;

  const baseChip = light
    ? "border-white/20 text-white/70 hover:border-white hover:text-white"
    : "border-black/20 text-black/70 hover:border-black hover:text-black";

  const activeChip = light
    ? "border-brand-red bg-brand-red text-white"
    : "border-brand-red bg-brand-red text-white";

  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="scrollbar-thin flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const active = cat._id === activeCategoryId;
          return (
            <button
              key={cat._id}
              type="button"
              onClick={() => onSelect(active ? null : cat._id)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-wider transition-colors ${
                active ? activeChip : baseChip
              }`}
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {activeCategoryId && (
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`shrink-0 text-xs font-semibold uppercase tracking-wider underline underline-offset-4 ${
            light
              ? "text-white/60 hover:text-white"
              : "text-black/50 hover:text-black"
          }`}
        >
          Clear Category
        </button>
      )}
    </div>
  );
}
