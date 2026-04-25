import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { getContent, type GeneralSettings } from "@/lib/content";

export function LegalShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  const settings = getContent<GeneralSettings>("settings/general.json");

  return (
    <main>
      <Navbar phone={settings.phone} phoneRaw={settings.phoneRaw} />

      <article className="mx-auto max-w-[820px] px-6 pb-24 pt-36 md:pb-32 md:pt-44 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-turquoise-dark"
        >
          <ArrowLeft size={15} strokeWidth={2} />
          Retour à l'accueil
        </Link>

        <h1 className="mt-10 font-display text-4xl font-semibold italic text-night md:text-5xl">
          {title}
        </h1>

        {intro && (
          <p className="mt-5 max-w-xl font-display text-lg italic text-muted">{intro}</p>
        )}

        <div
          className="prose mt-12 max-w-none text-night/85"
          style={{ "--prose-base": "16px" } as React.CSSProperties}
        >
          {children}
        </div>
      </article>

      <Footer settings={settings} />
    </main>
  );
}
