import Image from "next/image";
import { Phone, ArrowDown, UtensilsCrossed } from "lucide-react";
import type { GeneralSettings, HeroContent } from "@/lib/content";

type Props = { hero: HeroContent; settings: GeneralSettings };

function fmtPrice(p: number) {
  return `${p.toFixed(2).replace(".", ",")}€`;
}

export function Hero({ hero, settings }: Props) {
  const titleWords = hero.title.split(" ");

  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32" aria-label="Présentation">
      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:px-10">
        {/* Left column */}
        <div className="word-reveal">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.32em] text-muted"
            style={{ animation: "wordReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards", opacity: 0 }}
          >
            Pizzeria · Restaurant · Biot
          </span>

          <h1
            className="mt-5 font-display font-semibold italic text-night leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 7.5vw, 5.5rem)" }}
          >
            {titleWords.map((w, i) => (
              <span key={i} className="word" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                {w}{" "}
              </span>
            ))}
          </h1>

          <p
            className="mt-5 max-w-[460px] font-display text-base italic text-muted md:text-lg"
            style={{ opacity: 0, animation: "wordReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.6s forwards" }}
          >
            « {hero.tagline} »
          </p>

          {/* Formule du midi — featured card */}
          {hero.lunchFormula && (
            <div
              className="relative mt-10 overflow-hidden bg-white shadow-card-soft"
              style={{
                borderRadius: "32px 6px 32px 6px",
                opacity: 0,
                animation: "wordReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.85s forwards",
              }}
            >
              {/* Soft turquoise wash on top */}
              <div
                className="absolute inset-x-0 top-0 h-24"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(229,242,244,0.65) 0%, rgba(229,242,244,0) 100%)",
                }}
                aria-hidden
              />

              <div className="relative px-6 py-6 sm:px-8 sm:py-7">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-turquoise-mist p-2 text-turquoise-dark">
                    <UtensilsCrossed size={16} strokeWidth={2} />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-turquoise-dark">
                    Service du midi
                  </span>
                </div>

                {/* Formule */}
                <div className="mt-5 flex items-end justify-between gap-4 border-b border-night/8 pb-5">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold italic text-night sm:text-[26px]">
                      {hero.lunchFormula.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-[15px]">
                      {hero.lunchFormula.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-display text-[28px] font-semibold italic text-turquoise-dark tabular-nums sm:text-3xl">
                    {fmtPrice(hero.lunchFormula.price)}
                  </span>
                </div>

                {/* Plat seul */}
                {hero.lunchSingle && (
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <span className="font-display text-lg italic text-night/85 sm:text-xl">
                      {hero.lunchSingle.label}
                    </span>
                    <span className="font-sans text-lg font-semibold text-night/85 tabular-nums sm:text-xl">
                      {fmtPrice(hero.lunchSingle.price)}
                    </span>
                  </div>
                )}

                {/* Reservation note + CTA */}
                <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-display text-base italic text-muted">
                    {hero.reservationNote ?? "Pensez à réserver."}
                  </p>
                  <a
                    href={`tel:${settings.phoneRaw}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-night px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-turquoise"
                  >
                    <Phone size={15} strokeWidth={2.2} />
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Secondary actions */}
          <div
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            style={{
              opacity: 0,
              animation: "wordReveal 0.8s cubic-bezier(0.22,1,0.36,1) 1.05s forwards",
            }}
          >
            <a
              href="#carte"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-night/15 px-5 py-3 text-sm font-medium text-night transition-colors hover:border-night/40"
            >
              Voir la carte
              <ArrowDown size={14} strokeWidth={2} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <span className="text-sm text-muted">
              <span className="font-medium uppercase tracking-[0.18em] text-night/65">Ouvert</span>
              <span className="mx-2.5">·</span>
              {settings.hours.weekdays}
            </span>
          </div>
        </div>

        {/* Right column — image */}
        <div className="relative">
          <div
            className="absolute -bottom-6 -right-6 -z-10 h-[88%] w-[88%]"
            style={{
              borderRadius: "200px 12px 200px 12px",
              background:
                "linear-gradient(135deg, rgba(185,227,234,0.6) 0%, rgba(122,184,197,0.5) 100%)",
            }}
            aria-hidden
          />
          <div
            className="reveal-image relative aspect-[4/5] w-full overflow-hidden bg-stone shadow-wave lg:aspect-auto lg:h-[620px]"
            style={{ borderRadius: "200px 12px 200px 12px" }}
          >
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
