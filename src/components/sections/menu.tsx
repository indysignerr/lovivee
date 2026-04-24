import type { Pizza, RestaurantDish } from "@/lib/content";

function priceLabel(p?: number, t?: string) {
  if (typeof p === "number") return `${p.toFixed(2).replace(".", ",")}€`;
  if (t) return t;
  return "";
}

function MenuRow({
  name,
  detail,
  price,
}: {
  name: string;
  detail: string;
  price: string;
}) {
  return (
    <li className="reveal group flex items-baseline gap-4 border-b border-night/8 py-5 last:border-b-0">
      <div className="flex-1">
        <h4 className="font-display text-[19px] font-semibold text-night transition-colors group-hover:text-turquoise">
          {name}
        </h4>
        {detail && (
          <p className="mt-1 text-sm leading-relaxed text-muted">{detail}</p>
        )}
      </div>
      <span className="shrink-0 font-sans text-base font-semibold text-turquoise">
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
  const visiblePizzas = pizzas.filter((p) => p.available);
  const visibleDishes = dishes.filter((d) => d.available);

  return (
    <section
      id="carte"
      className="relative bg-cream py-24 md:py-32 noise-overlay"
      aria-label="Notre carte"
    >
      {/* Decorative stone pattern band */}
      <div className="absolute left-0 right-0 top-0 h-24 stone-texture opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="mb-16 max-w-3xl md:mb-20">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-turquoise">
            La carte
          </span>
          <h2 className="title-underline mt-4 font-display text-display-lg font-semibold italic text-night">
            Ce qu'on prépare pour vous
          </h2>
          <p className="mt-6 max-w-xl font-display text-lg italic text-muted">
            Pizzas au four et plats cuisinés, à emporter ou à savourer en salle.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Pizzeria */}
          <div className="reveal relative bg-cream p-8 shadow-card-soft md:p-12" style={{ borderRadius: "32px 4px 32px 4px", background: "linear-gradient(180deg, #FAF8F3 0%, #F5F0E5 100%)" }}>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  Pizzeria
                </span>
                <h3 className="mt-1 font-display text-3xl font-semibold italic text-night md:text-4xl">
                  Au four
                </h3>
              </div>
              <span className="rounded-full bg-turquoise/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-turquoise-dark">
                Sur place & à emporter
              </span>
            </div>

            <ul>
              {visiblePizzas.map((p, i) => (
                <MenuRow
                  key={i}
                  name={p.name}
                  detail={p.ingredients}
                  price={priceLabel(p.price)}
                />
              ))}
            </ul>
          </div>

          {/* Restaurant */}
          <div className="reveal relative p-8 shadow-card-soft md:p-12" style={{ borderRadius: "4px 32px 4px 32px", background: "linear-gradient(180deg, #F5F0E5 0%, #E8DDC9 100%)" }}>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  Restaurant
                </span>
                <h3 className="mt-1 font-display text-3xl font-semibold italic text-night md:text-4xl">
                  En salle
                </h3>
              </div>
              <span className="rounded-full bg-turquoise/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-turquoise-dark">
                Sur place uniquement
              </span>
            </div>

            <ul>
              {visibleDishes.map((d, i) => (
                <MenuRow
                  key={i}
                  name={d.name}
                  detail={d.detail || ""}
                  price={priceLabel(d.price, d.price_text)}
                />
              ))}
            </ul>
          </div>
        </div>

        <p className="reveal mt-12 text-center font-display text-base italic text-muted">
          Suggestions du jour à découvrir sur ardoise.
        </p>
      </div>
    </section>
  );
}
