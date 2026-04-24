import { MapPin, Clock, Phone } from "lucide-react";
import type { GeneralSettings } from "@/lib/content";

export function Local({ settings }: { settings: GeneralSettings }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-night py-28 text-cream md:py-36"
      aria-label="Adresse et horaires"
      style={{
        background:
          "linear-gradient(170deg, #15203D 0%, #1E2B4F 45%, #2A3A66 100%)",
      }}
    >
      {/* Subtle turquoise wash */}
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #5FBFCD 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-stretch gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-10">
        {/* Left — brick wall feature panel with "Biot." overlay */}
        <div className="reveal relative aspect-[4/5] w-full overflow-hidden md:aspect-[5/6] lg:aspect-auto lg:min-h-[520px]"
          style={{ borderRadius: "180px 12px 180px 12px" }}>
          <div className="absolute inset-0 brick-wall" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(30,43,79,0.15) 0%, rgba(30,43,79,0.55) 100%)",
            }}
            aria-hidden
          />
          <div className="relative flex h-full flex-col justify-end p-8 md:p-12">
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-cream/75">
              Ancrage
            </span>
            <h2
              className="mt-4 font-display font-semibold italic text-cream leading-[0.85]"
              style={{ fontSize: "clamp(4rem, 11vw, 8rem)" }}
            >
              Biot.
            </h2>
            <p className="mt-5 max-w-xs font-display text-base italic text-cream/80">
              À deux minutes du centre, posé entre pierre et Méditerranée.
            </p>
          </div>
        </div>

        {/* Right — practical info */}
        <div className="reveal flex flex-col justify-center" data-delay="120">
          <h3 className="title-underline font-display text-3xl font-semibold italic text-cream md:text-4xl">
            Nous trouver
          </h3>

          <ul className="mt-10 space-y-7 text-cream/85">
            <li className="flex items-start gap-5">
              <MapPin size={18} strokeWidth={1.6} className="mt-1 shrink-0 text-turquoise" />
              <div>
                <p className="text-base">{settings.address}</p>
                <p className="text-base">{settings.city}</p>
              </div>
            </li>
            <li className="flex items-start gap-5">
              <Clock size={18} strokeWidth={1.6} className="mt-1 shrink-0 text-turquoise" />
              <div className="space-y-1.5">
                <p className="text-base">
                  <span className="text-cream">Lun–Ven</span>
                  <span className="mx-2 text-cream/40">·</span>
                  {settings.hours.weekdays}
                </p>
                <p className="text-base">
                  <span className="text-cream">Samedi</span>
                  <span className="mx-2 text-cream/40">·</span>
                  {settings.hours.saturday}
                </p>
                <p className="text-sm italic text-cream/55">{settings.hours.closed}</p>
              </div>
            </li>
            <li className="flex items-start gap-5">
              <Phone size={18} strokeWidth={1.6} className="mt-1 shrink-0 text-turquoise" />
              <a href={`tel:${settings.phoneRaw}`} className="text-base transition-colors hover:text-turquoise">
                {settings.phone}
              </a>
            </li>
          </ul>

          <div
            className="reveal-image mt-10 overflow-hidden border border-turquoise/40"
            style={{ borderRadius: "20px 4px 20px 4px" }}
            data-delay="240"
          >
            <iframe
              src="https://www.google.com/maps?q=329+route+d%27Antibes+06410+Biot&output=embed"
              width="100%"
              height="280"
              style={{ border: 0, display: "block", filter: "saturate(0.7) contrast(0.95)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Plan d'accès — L'Ovive"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
