import { Phone } from "lucide-react";
import type { GeneralSettings } from "@/lib/content";

export function Call({ settings }: { settings: GeneralSettings }) {
  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-cream py-28 md:py-36"
      aria-label="Réserver"
    >
      <div className="absolute inset-0 brick-wall opacity-50 pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-[900px] px-6 text-center lg:px-10">
        <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-muted reveal">
          Réserver une table
        </span>
        <h2
          className="reveal mt-6 font-display font-semibold italic text-night"
          style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}
          data-delay="80"
        >
          Une table ce soir ?
        </h2>
        <p className="reveal mx-auto mt-6 max-w-md font-display text-lg italic text-muted" data-delay="160">
          Le plus simple, c'est de nous appeler.
        </p>

        <a
          href={`tel:${settings.phoneRaw}`}
          className="reveal group mt-12 inline-flex items-center gap-4 rounded-full bg-night px-8 py-5 text-cream transition-colors hover:bg-turquoise"
          data-delay="240"
        >
          <Phone size={20} strokeWidth={2.2} className="transition-transform group-hover:rotate-[12deg]" />
          <span className="font-display text-2xl italic md:text-3xl">{settings.phone}</span>
        </a>

        <p className="reveal mt-8 text-sm text-muted" data-delay="320">
          Ouvert du lundi au vendredi <span className="text-night/70">·</span> {settings.hours.weekdays}
        </p>
      </div>
    </section>
  );
}
