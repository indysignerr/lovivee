import Image from "next/image";
import type { GalleryPhoto } from "@/lib/content";

const radii = [
  "120px 8px 120px 8px",
  "8px 120px 8px 120px",
  "8px 120px 8px 120px",
  "120px 8px 120px 8px",
];

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const items = [...photos].sort((a, b) => a.order - b.order).slice(0, 4);

  return (
    <section className="relative bg-cream py-28 md:py-36" aria-label="Galerie photos">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mb-20 max-w-2xl">
          <h2 className="title-underline font-display font-semibold italic text-night" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
            L'ambiance
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:gap-10">
          {items.map((p, i) => (
            <div
              key={i}
              className="reveal-image group relative aspect-[4/5] overflow-hidden bg-stone"
              style={{ borderRadius: radii[i % radii.length] }}
              data-delay={i * 110}
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
