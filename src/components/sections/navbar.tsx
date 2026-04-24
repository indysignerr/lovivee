"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { href: "#carte", label: "Carte" },
  { href: "#contact", label: "Contact" },
  { href: "#avis", label: "Avis" },
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
        background: scrolled ? "rgba(250,248,243,0.92)" : "rgba(250,248,243,0.6)",
        borderBottom: scrolled ? "1px solid rgba(30,43,79,0.06)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 lg:px-10">
        <a href="#" aria-label="L'Ovive — accueil" className="shrink-0 transition-transform hover:scale-[1.02]">
          <Logo height={scrolled ? 44 : 56} />
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium uppercase tracking-[0.18em] text-night/75 transition-colors hover:text-night"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-turquoise transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href={`tel:${phoneRaw}`}
          aria-label={`Appeler le ${phone}`}
          className="inline-flex items-center gap-2 rounded-full bg-night px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-turquoise sm:px-6"
        >
          <Phone size={15} strokeWidth={2.2} />
          <span className="hidden sm:inline">{phone}</span>
          <span className="sm:hidden">Appeler</span>
        </a>
      </div>
    </header>
  );
}
