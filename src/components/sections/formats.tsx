import { Utensils, Pizza, ChefHat, Users, type LucideIcon } from "lucide-react";
import type { FormatBlock } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = { Utensils, Pizza, ChefHat, Users };

export function Formats({ blocks }: { blocks: FormatBlock[] }) {
  return (
    <section className="relative py-28 md:py-36" aria-label="Trois formats">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3 md:gap-16">
          {blocks.map((b, i) => {
            const Icon = iconMap[b.icon] ?? Utensils;
            return (
              <div key={i} className="reveal" data-delay={i * 100}>
                <Icon size={28} strokeWidth={1.4} className="text-turquoise" />
                <h3 className="mt-8 font-display text-2xl font-semibold italic text-night md:text-3xl">
                  {b.title}
                </h3>
                <p className="mt-3 text-base text-muted">{b.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
