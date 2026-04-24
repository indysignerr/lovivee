"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = document.querySelectorAll(
      ".reveal, .reveal-image, .title-underline, .underline-curve, [data-reveal]"
    );

    if (reduced) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) : i * 80;
            window.setTimeout(() => el.classList.add("in-view"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((t) => io.observe(t));

    return () => io.disconnect();
  }, []);

  return null;
}
