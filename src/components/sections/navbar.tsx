"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { MagneticButton } from "@/components/magnetic-button";

const links = [
  { href: "#carte", label: "Carte" },
  { href: "#reservation", label: "Réservation" },
  { href: "#avis", label: "Avis" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({
  phone,
  phoneRaw,
}: {
  phone: string;
  phoneRaw: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: scrolled ? "rgba(250,248,243,0.9)" : "rgba(250,248,243,0.55)",
        borderBottom: scrolled
          ? "1px solid rgba(30,43,79,0.06)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 lg:px-10">
        <a href="#" aria-label="L'Ovive — accueil" className="shrink-0">
          <Logo height={scrolled ? 38 : 48} />
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-10 lg:flex"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium uppercase tracking-[0.15em] text-night/80 transition-colors hover:text-turquoise"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-turquoise transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <MagneticButton
          as="a"
          href={`tel:${phoneRaw}`}
          aria-label={`Appeler le ${phone}`}
          className="animate-pulse-soft bg-turquoise px-5 py-3 text-sm text-white shadow-glow-turquoise hover:bg-turquoise-dark sm:px-6 sm:text-[15px]"
        >
          <Phone size={16} strokeWidth={2.2} />
          <span className="hidden sm:inline">{phone}</span>
          <span className="sm:hidden">Appeler</span>
        </MagneticButton>
      </div>
    </header>
  );
}
