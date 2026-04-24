"use client";

import Script from "next/script";

export function Reviews() {
  return (
    <section
      id="avis"
      className="relative bg-night py-24 text-cream md:py-32"
      aria-label="Avis Google"
    >
      <Script
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
        async
      />

      <div className="mx-auto max-w-[1320px] px-6 text-center lg:px-10">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-turquoise">
          La parole est à vous
        </span>
        <h2 className="title-underline mt-4 inline-block font-display text-display-lg font-semibold italic text-cream" style={{ paddingBottom: 18 }}>
          Ce que disent nos clients
        </h2>
        <p className="mt-5 font-display text-lg italic text-cream/70">
          Avis Google vérifiés
        </p>

        <div className="mx-auto mt-14 max-w-[1100px] reveal">
          <div
            className="elfsight-app-22c3e9a8-3596-4d02-a421-14b8c186d315"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  );
}
