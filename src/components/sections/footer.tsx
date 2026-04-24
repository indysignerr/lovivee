import { Logo } from "@/components/logo";
import type { GeneralSettings } from "@/lib/content";

export function Footer({ settings }: { settings: GeneralSettings }) {
  return (
    <footer className="bg-night text-cream/85" aria-label="Pied de page">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-24 lg:px-10">
        <div className="grid gap-14 md:grid-cols-3">
          <div>
            <div className="inline-block rounded-2xl bg-cream px-5 py-3">
              <Logo height={44} />
            </div>
            <p className="mt-6 max-w-xs font-display text-base italic text-cream/65">
              Une table posée là, entre pierre et Méditerranée.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.25em] text-turquoise">
              Nous trouver
            </h4>
            <address className="mt-5 not-italic">
              <p>{settings.address}</p>
              <p>{settings.city}</p>
              <p className="mt-3">
                <a href={`tel:${settings.phoneRaw}`} className="transition-colors hover:text-turquoise">
                  {settings.phone}
                </a>
              </p>
            </address>
            <div className="mt-5 space-y-1 text-sm text-cream/65">
              <p>Lun–Ven · {settings.hours.weekdays}</p>
              <p>Samedi · {settings.hours.saturday}</p>
              <p className="italic text-cream/50">{settings.hours.closed}</p>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-[0.25em] text-turquoise">
              Légal
            </h4>
            <ul className="mt-5 space-y-2 text-sm">
              <li><a href="#" className="transition-colors hover:text-turquoise">Mentions légales</a></li>
              <li><a href="#" className="transition-colors hover:text-turquoise">Politique de confidentialité</a></li>
              <li><a href="/admin/" className="transition-colors hover:text-turquoise">Administration</a></li>
            </ul>
          </div>
        </div>

        <div className="my-12 h-px bg-cream/15" />

        <p className="text-center text-xs text-cream/50">
          © 2026 L'Ovive — Site créé par{" "}
          <a href="https://indysigner.fr" className="text-cream/75 transition-colors hover:text-turquoise">
            Indysigner
          </a>
        </p>
      </div>
    </footer>
  );
}
