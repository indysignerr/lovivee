"use client";

import { useState } from "react";
import { Pizza as PizzaIcon, Utensils } from "lucide-react";
import type { Pizza, RestaurantDish } from "@/lib/content";

function priceLabel(p?: number, t?: string) {
  if (typeof p === "number") return `${p.toFixed(2).replace(".", ",")}€`;
  if (t) return t;
  return "";
}

type Tab = "pizzeria" | "restaurant";

function MenuRow({
  name,
  detail,
  price,
  index,
}: {
  name: string;
  detail: string;
  price: string;
  index: number;
}) {
  return (
    <li
      className="group flex items-baseline gap-6 border-b border-night/10 py-5 transition-colors hover:bg-turquoise-mist/40 sm:py-6"
      style={{
        animation: `wordReveal 0.5s cubic-bezier(0.22,1,0.36,1) ${0.04 * index}s both`,
      }}
    >
      <div className="flex-1 px-2">
        <h4 className="font-display text-[20px] font-medium text-night transition-colors group-hover:text-turquoise-dark sm:text-[22px]">
          {name}
        </h4>
        {detail && (
          <p className="mt-1 text-sm leading-relaxed text-muted sm:text-[15px]">{detail}</p>
        )}
      </div>
      <span className="shrink-0 px-2 font-sans text-base font-semibold text-turquoise-dark tabular-nums sm:text-lg">
        {price}
      </span>
    </li>
  );
}

export function MenuSection({
  pizzas,
  dishes,
}: {
  pizzas: Pizza[];
  dishes: RestaurantDish[];
}) {
  const [tab, setTab] = useState<Tab>("pizzeria");

  const visiblePizzas = pizzas.filter((p) => p.available);
  const visibleDishes = dishes.filter((d) => d.available);

  return (
    <section
      id="carte"
      className="relative bg-cream py-28 md:py-36"
      aria-label="Notre carte"
    >
      {/* soft turquoise mist top accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(229,242,244,0.5) 0%, rgba(229,242,244,0) 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="mb-12 max-w-2xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-turquoise-dark">
            La carte
          </span>
          <h2
            className="title-underline mt-5 font-display font-semibold italic text-night"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
          >
            Ce qu'on prépare pour vous
          </h2>
          <p className="mt-6 max-w-lg font-display text-lg italic text-muted">
            Pizzas au four et plats cuisinés, à emporter ou à savourer en salle.
          </p>
        </div>

        {/* Toggle */}
        <div
          className="mb-12 inline-flex rounded-full border border-night/10 bg-white p-1.5 shadow-sm"
          role="tablist"
          aria-label="Choisir une carte"
        >
          <TabButton
            active={tab === "pizzeria"}
            onClick={() => setTab("pizzeria")}
            icon={<PizzaIcon size={16} strokeWidth={2} />}
            label="Pizzeria"
            count={visiblePizzas.length}
          />
          <TabButton
            active={tab === "restaurant"}
            onClick={() => setTab("restaurant")}
            icon={<Utensils size={16} strokeWidth={2} />}
            label="Restaurant"
            count={visibleDishes.length}
          />
        </div>

        {/* Card area — large */}
        <div
          key={tab}
          className="relative overflow-hidden bg-white shadow-card-soft"
          style={{
            borderRadius: "40px 6px 40px 6px",
            background: "linear-gradient(180deg, #ffffff 0%, #FDFBF6 100%)",
          }}
        >
          {/* Header band */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b border-night/10 px-6 py-5 sm:px-10 sm:py-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(229,242,244,0.55) 0%, rgba(185,227,234,0.25) 100%)",
            }}
          >
            <div>
              <h3 className="font-display text-2xl font-semibold italic text-night sm:text-3xl">
                {tab === "pizzeria" ? "Pizzeria" : "Restaurant"}
              </h3>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
                {tab === "pizzeria"
                  ? "Sur place & à emporter"
                  : "Sur place uniquement"}
              </p>
            </div>
            <span className="rounded-full bg-turquoise/10 px-4 py-2 text-xs font-medium text-turquoise-dark">
              {tab === "pizzeria"
                ? `${visiblePizzas.length} pizzas au four`
                : `${visibleDishes.length} plats du jour`}
            </span>
          </div>

          {/* List */}
          <ul className="divide-y divide-transparent px-4 py-2 sm:px-8">
            {tab === "pizzeria"
              ? visiblePizzas.map((p, i) => (
                  <MenuRow
                    key={`p-${i}`}
                    name={p.name}
                    detail={p.ingredients}
                    price={priceLabel(p.price)}
                    index={i}
                  />
                ))
              : visibleDishes.map((d, i) => (
                  <MenuRow
                    key={`d-${i}`}
                    name={d.name}
                    detail={d.detail || ""}
                    price={priceLabel(d.price, d.price_text)}
                    index={i}
                  />
                ))}
          </ul>

          {/* Footer note */}
          <div className="border-t border-night/8 bg-turquoise-mist/30 px-6 py-5 text-center text-sm italic text-muted sm:px-10">
            {tab === "pizzeria"
              ? "Disponibles midi et soir, à emporter ou en salle."
              : "Suggestions du jour à découvrir sur ardoise."}
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={active}
      className={`relative inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 sm:px-7 sm:py-3 ${
        active
          ? "bg-night text-cream shadow-md"
          : "text-night/70 hover:text-night"
      }`}
    >
      <span className={active ? "text-turquoise-light" : "text-muted"}>{icon}</span>
      {label}
      <span
        className={`ml-1 text-[10px] font-medium ${
          active ? "text-cream/65" : "text-muted/70"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
