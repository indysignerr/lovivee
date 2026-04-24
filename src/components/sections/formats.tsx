"use client";

import { Utensils, Pizza, ChefHat, type LucideIcon } from "lucide-react";
import type { FormatBlock } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = { Utensils, Pizza, ChefHat };

export function Formats({ blocks }: { blocks: FormatBlock[] }) {
  return (
    <section
      className="relative bg-stone py-20 md:py-28 noise-overlay"
      aria-label="Trois formats"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid gap-px overflow-hidden rounded-[28px_4px_28px_4px] bg-night/10 md:grid-cols-3">
          {blocks.map((b, i) => {
            const Icon = iconMap[b.icon] ?? Utensils;
            return (
              <div
                key={i}
                className="reveal group relative flex flex-col items-start gap-5 bg-stone p-8 transition-transform duration-500 hover:-translate-y-1 md:p-10 lg:p-12"
                data-delay={i * 120}
              >
                <div className="rounded-full border border-turquoise/30 bg-cream/40 p-4 text-turquoise transition-colors group-hover:border-turquoise group-hover:bg-cream">
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <h3 className="font-display text-2xl font-semibold italic text-night md:text-3xl">
                  {b.title}
                </h3>
                <p className="font-display text-base italic text-muted md:text-lg">
                  {b.text}
                </p>
                <span className="mt-2 h-px w-10 bg-turquoise transition-all duration-500 group-hover:w-20" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
