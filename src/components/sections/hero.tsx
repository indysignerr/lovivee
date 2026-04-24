import Image from "next/image";
import { Phone, ArrowDown } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import type { GeneralSettings, HeroContent } from "@/lib/content";

type Props = { hero: HeroContent; settings: GeneralSettings };

export function Hero({ hero, settings }: Props) {
  const titleWords = hero.title.split(" ");
  const subtitleWords = hero.subtitle.split(" ");

  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-44 lg:pb-32 noise-overlay"
      aria-label="Présentation"
    >
      <div className="absolute inset-0 stone-texture opacity-40 pointer-events-none" />

      {/* Decorative arc */}
      <svg
        className="absolute -left-32 top-1/2 -translate-y-1/2 hidden lg:block opacity-[0.07]"
        width="640"
        height="640"
        viewBox="0 0 640 640"
        aria-hidden
      >
        <circle cx="320" cy="320" r="280" stroke="#2FA5B5" strokeWidth="60" fill="none" />
      </svg>

      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-10">
        {/* Left column */}
        <div className="word-reveal">
          <div className="mb-8 flex items-center gap-4">
            <span
              className="block h-[2px] w-12 bg-turquoise origin-left"
              style={{ animation: "wordReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.05s forwards", opacity: 0 }}
            />
            <span
              className="text-xs font-medium uppercase tracking-[0.25em] text-muted"
              style={{ animation: "wordReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s forwards", opacity: 0 }}
            >
              Pizzeria · Restaurant
            </span>
          </div>

          <h1 className="font-display text-display-xl font-semibold italic text-night">
            {titleWords.map((w, i) => (
              <span
                key={i}
                className="word"
                style={{ animationDelay: `${0.12 + i * 0.08}s` }}
              >
                {w}{" "}
              </span>
            ))}
          </h1>

          <p className="mt-6 font-sans text-base font-light uppercase tracking-[0.18em] text-night/80 md:text-xl">
            {subtitleWords.map((w, i) => (
              <span
                key={i}
                className="word"
                style={{ animationDelay: `${0.4 + i * 0.06}s` }}
              >
                {w}{" "}
              </span>
            ))}
          </p>

          <p
            className="mt-8 max-w-[480px] font-display text-lg italic text-muted md:text-xl"
            style={{
              opacity: 0,
              animation: "wordReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.85s forwards",
            }}
          >
            « {hero.tagline} »
          </p>

          <div
            className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            style={{
              opacity: 0,
              animation: "wordReveal 0.8s cubic-bezier(0.22,1,0.36,1) 1.05s forwards",
            }}
          >
            <MagneticButton
              as="a"
              href={`tel:${settings.phoneRaw}`}
              className="bg-turquoise px-7 py-4 text-[15px] text-white shadow-glow-turquoise hover:bg-turquoise-dark"
            >
              <Phone size={18} strokeWidth={2.2} />
              {settings.phone}
            </MagneticButton>
            <a
              href="#carte"
              data-cursor="hover"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-night/20 px-7 py-4 text-[15px] font-medium text-night transition-colors hover:border-night/60 hover:bg-night/5"
            >
              Voir la carte
              <ArrowDown
                size={16}
                strokeWidth={2}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </div>

          <div
            className="mt-12 flex items-center gap-4 border-t border-night/10 pt-6 text-sm text-muted"
            style={{
              opacity: 0,
              animation: "wordReveal 0.8s cubic-bezier(0.22,1,0.36,1) 1.25s forwards",
            }}
          >
            <span className="font-medium uppercase tracking-[0.15em] text-night/70">
              Ouvert
            </span>
            <span aria-hidden>·</span>
            <span>{settings.hours.weekdays}</span>
          </div>
        </div>

        {/* Right column — image */}
        <div className="relative">
          {/* Decorative arc background */}
          <div
            className="absolute -bottom-6 -right-6 -z-10 h-[88%] w-[88%] bg-turquoise/40"
            style={{ borderRadius: "240px 16px 240px 16px", opacity: 0.4 }}
            aria-hidden
          />
          <div
            className="reveal-image relative aspect-[5/6] w-full overflow-hidden bg-stone shadow-wave md:aspect-[4/5] lg:aspect-auto lg:h-[560px]"
            style={{ borderRadius: "240px 16px 240px 16px" }}
          >
            <div
              className="h-full w-full animate-ken-burns"
              style={{
                background:
                  "linear-gradient(135deg, rgba(47,165,181,0.18) 0%, rgba(232,221,201,0.4) 50%, rgba(201,184,150,0.5) 100%)",
              }}
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
            <div className="hero-overlay absolute inset-0 pointer-events-none" />
          </div>

          {/* Decorative tag */}
          <div
            className="absolute -left-4 top-8 hidden rotate-[-8deg] rounded-full bg-cream px-4 py-2 font-display text-sm italic text-night shadow-card-soft md:block"
            style={{
              opacity: 0,
              animation: "wordReveal 0.8s cubic-bezier(0.22,1,0.36,1) 1.4s forwards",
            }}
          >
            depuis Biot
          </div>
        </div>
      </div>
    </section>
  );
}
