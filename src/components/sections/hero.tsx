import Image from "next/image";
import { Phone, ArrowDown } from "lucide-react";
import type { GeneralSettings, HeroContent } from "@/lib/content";

type Props = { hero: HeroContent; settings: GeneralSettings };

export function Hero({ hero, settings }: Props) {
  const titleWords = hero.title.split(" ");

  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 lg:pt-48" aria-label="Présentation">
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-10">
        {/* Left column */}
        <div className="word-reveal">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.32em] text-muted"
            style={{ animation: "wordReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards", opacity: 0 }}
          >
            Pizzeria · Restaurant · Biot
          </span>

          <h1 className="mt-6 font-display font-semibold italic text-night leading-[0.95]" style={{ fontSize: "clamp(4rem, 11vw, 8rem)" }}>
            {titleWords.map((w, i) => (
              <span key={i} className="word" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                {w}{" "}
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-[460px] font-display text-lg italic text-muted md:text-xl"
            style={{ opacity: 0, animation: "wordReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.7s forwards" }}
          >
            « {hero.tagline} »
          </p>

          <div
            className="mt-12 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            style={{ opacity: 0, animation: "wordReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.9s forwards" }}
          >
            <a
              href={`tel:${settings.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-night px-7 py-4 text-[15px] font-medium text-cream transition-colors hover:bg-turquoise"
            >
              <Phone size={17} strokeWidth={2.2} />
              {settings.phone}
            </a>
            <a
              href="#carte"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-night/15 px-7 py-4 text-[15px] font-medium text-night transition-colors hover:border-night/40"
            >
              Voir la carte
              <ArrowDown size={15} strokeWidth={2} className="transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          <p
            className="mt-12 text-sm text-muted"
            style={{ opacity: 0, animation: "wordReveal 0.8s cubic-bezier(0.22,1,0.36,1) 1.05s forwards" }}
          >
            <span className="font-medium uppercase tracking-[0.2em] text-night/65">Ouvert</span>
            <span className="mx-3">·</span>
            {settings.hours.weekdays}
          </p>
        </div>

        {/* Right column — image */}
        <div className="relative">
          <div
            className="reveal-image relative aspect-[4/5] w-full overflow-hidden bg-stone shadow-wave lg:aspect-auto lg:h-[580px]"
            style={{ borderRadius: "200px 12px 200px 12px" }}
          >
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
