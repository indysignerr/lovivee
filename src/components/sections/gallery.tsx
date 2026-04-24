import Image from "next/image";
import type { GalleryPhoto } from "@/lib/content";

const radii = [
  "120px 12px 120px 12px",
  "12px 120px 12px 120px",
  "12px 120px 12px 120px",
  "120px 12px 120px 12px",
];

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const items = [...photos].sort((a, b) => a.order - b.order).slice(0, 4);

  return (
    <section
      className="relative bg-cream py-24 md:py-32 noise-overlay"
      aria-label="Galerie photos"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-14 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-turquoise">
            La maison
          </span>
          <h2 className="mt-4 font-display text-display-lg font-semibold italic text-night">
            <span className="title-underline mx-auto inline-block" style={{ paddingBottom: 18 }}>
              L'ambiance
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:gap-10">
          {items.map((p, i) => (
            <div
              key={i}
              className="reveal-image group relative aspect-[4/5] overflow-hidden bg-stone shadow-card-soft transition-shadow hover:shadow-card-hover"
              style={{ borderRadius: radii[i % radii.length] }}
              data-delay={i * 110}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise/10 via-stone/30 to-stone-warm/40" />
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04] group-hover:rotate-[1deg]"
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
              <div
                className="absolute inset-0 bg-night/0 transition-colors duration-500 group-hover:bg-night/10"
                aria-hidden
              />
              <div className="absolute bottom-6 left-6 right-6 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-base italic text-cream drop-shadow-md">
                  {p.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
