import { MapPin, Clock, Phone } from "lucide-react";
import type { GeneralSettings } from "@/lib/content";

export function Local({ settings }: { settings: GeneralSettings }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-night py-24 text-cream md:py-32"
      aria-label="Adresse et horaires"
    >
      {/* Decorative arc — evokes the O */}
      <svg
        className="absolute -right-40 top-1/2 -translate-y-1/2 opacity-[0.08]"
        width="800"
        height="800"
        viewBox="0 0 800 800"
        aria-hidden
      >
        <circle cx="400" cy="400" r="340" stroke="#2FA5B5" strokeWidth="80" fill="none" />
      </svg>

      <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        <div className="reveal">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-turquoise">
            Ancrage
          </span>
          <h2 className="mt-4 font-display font-semibold italic text-cream leading-[0.9]" style={{ fontSize: "clamp(5rem, 14vw, 11rem)" }}>
            Biot.
          </h2>
        </div>

        <div className="reveal" data-delay="120">
          <h3 className="title-underline font-display text-display-md font-semibold italic text-cream">
            À deux minutes du centre
          </h3>

          <ul className="mt-10 space-y-6 text-cream/85">
            <li className="flex items-start gap-4">
              <MapPin size={20} strokeWidth={1.6} className="mt-1 shrink-0 text-turquoise" />
              <div>
                <p className="text-base">{settings.address}</p>
                <p className="text-base">{settings.city}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock size={20} strokeWidth={1.6} className="mt-1 shrink-0 text-turquoise" />
              <div className="space-y-1">
                <p className="text-base">
                  <span className="font-medium text-cream">Lun–Ven</span> · {settings.hours.weekdays}
                </p>
                <p className="text-base">
                  <span className="font-medium text-cream">Samedi</span> · {settings.hours.saturday}
                </p>
                <p className="text-sm italic text-cream/60">{settings.hours.closed}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone size={20} strokeWidth={1.6} className="mt-1 shrink-0 text-turquoise" />
              <a
                href={`tel:${settings.phoneRaw}`}
                data-cursor="hover"
                className="text-base transition-colors hover:text-turquoise"
              >
                {settings.phone}
              </a>
            </li>
          </ul>

          <div
            className="reveal-image mt-12 overflow-hidden border-2 border-turquoise/70"
            style={{ borderRadius: "24px 4px 24px 4px" }}
            data-delay="240"
          >
            <iframe
              src="https://www.google.com/maps?q=329+route+d%27Antibes+06410+Biot&output=embed"
              width="100%"
              height="320"
              style={{ border: 0, display: "block", filter: "saturate(0.8) contrast(0.95)" }}
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
