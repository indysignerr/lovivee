"use client";

import Script from "next/script";

export function Reviews() {
  return (
    <section
      id="avis"
      className="relative bg-night py-28 text-cream md:py-36"
      aria-label="Avis Google"
    >
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" async />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <h2 className="title-underline font-display font-semibold italic text-cream" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
            Ce que disent nos clients
          </h2>
          <p className="mt-6 font-display text-lg italic text-cream/65">Avis Google vérifiés.</p>
        </div>

        <div className="reveal mx-auto max-w-[1100px]">
          <div className="elfsight-app-22c3e9a8-3596-4d02-a421-14b8c186d315" data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  );
}
