import { MapPin, Clock, Phone } from "lucide-react";
import type { GeneralSettings } from "@/lib/content";

export function Local({ settings }: { settings: GeneralSettings }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-night py-28 text-cream md:py-36"
      aria-label="Adresse et horaires"
    >
      <div className="absolute inset-0 brick-wall opacity-30 pointer-events-none" aria-hidden />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
        <div className="reveal">
          <h2 className="font-display font-semibold italic text-cream leading-[0.9]" style={{ fontSize: "clamp(4.5rem, 12vw, 9rem)" }}>
            Biot.
          </h2>
          <p className="mt-6 max-w-xs font-display text-lg italic text-cream/65">
            À deux minutes du centre.
          </p>
        </div>

        <div className="reveal" data-delay="120">
          <ul className="space-y-7 text-cream/85">
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
            className="reveal-image mt-12 overflow-hidden border border-turquoise/40"
            style={{ borderRadius: "20px 4px 20px 4px" }}
            data-delay="240"
          >
            <iframe
              src="https://www.google.com/maps?q=329+route+d%27Antibes+06410+Biot&output=embed"
              width="100%"
              height="320"
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
