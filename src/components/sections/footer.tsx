import { Logo } from "@/components/logo";
import type { GeneralSettings } from "@/lib/content";

export function Footer({ settings }: { settings: GeneralSettings }) {
  return (
    <footer className="bg-night text-cream/85" aria-label="Pied de page">
      <div className="mx-auto max-w-[1320px] px-6 pb-10 pt-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo height={56} variant="light" />
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-cream/65">
              Pizzeria · Restaurant · Biot
            </p>
            <p className="mt-6 max-w-xs font-display text-base italic text-cream/70">
              Une table posée là, entre pierre et Méditerranée.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
              Nous trouver
            </h4>
            <address className="mt-5 not-italic">
              <p>{settings.address}</p>
              <p>{settings.city}</p>
              <p className="mt-3">
                <a
                  href={`tel:${settings.phoneRaw}`}
                  data-cursor="hover"
                  className="transition-colors hover:text-turquoise"
                >
                  {settings.phone}
                </a>
              </p>
            </address>
            <div className="mt-5 space-y-1 text-sm text-cream/75">
              <p><span className="text-cream">Lun–Ven</span> · {settings.hours.weekdays}</p>
              <p><span className="text-cream">Samedi</span> · {settings.hours.saturday}</p>
              <p className="italic text-cream/55">{settings.hours.closed}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-turquoise">
              Légal
            </h4>
            <ul className="mt-5 space-y-2 text-sm">
              <li><a href="#" className="transition-colors hover:text-turquoise">Mentions légales</a></li>
              <li><a href="#" className="transition-colors hover:text-turquoise">Politique de confidentialité</a></li>
              <li><a href="/admin" className="transition-colors hover:text-turquoise">Administration</a></li>
            </ul>
          </div>
        </div>

        <div className="my-10 h-px bg-turquoise/30" />

        <p className="text-center text-xs text-cream/55">
          © 2026 L'Ovive — Site créé par{" "}
          <a
            href="https://indysigner.fr"
            data-cursor="hover"
            className="text-cream/80 transition-colors hover:text-turquoise"
          >
            Indysigner
          </a>
        </p>
      </div>
    </footer>
  );
}
