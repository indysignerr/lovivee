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
    <li className="reveal flex items-baseline gap-6 border-b border-night/8 py-5 last:border-b-0">
      <div className="flex-1">
        <h4 className="font-display text-[19px] font-medium text-night">{name}</h4>
        {detail && <p className="mt-1 text-sm leading-relaxed text-muted">{detail}</p>}
      </div>
      <span className="shrink-0 font-sans text-base font-medium text-night/80 tabular-nums">
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
      className="relative bg-cream py-28 md:py-36"
      aria-label="Notre carte"
    >
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
        <div className="mb-20 max-w-2xl">
          <h2 className="title-underline font-display font-semibold italic text-night" style={{ fontSize: "clamp(2.4rem, 5vw, 3.6rem)" }}>
            La carte
          </h2>
          <p className="mt-6 max-w-lg font-display text-lg italic text-muted">
            Pizzas au four et plats cuisinés, à emporter ou à savourer en salle.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <div className="mb-10 flex items-baseline justify-between gap-4 border-b border-night/15 pb-4">
              <h3 className="font-display text-2xl font-semibold italic text-night md:text-3xl">
                Pizzeria
              </h3>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
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

          <div className="reveal" data-delay="120">
            <div className="mb-10 flex items-baseline justify-between gap-4 border-b border-night/15 pb-4">
              <h3 className="font-display text-2xl font-semibold italic text-night md:text-3xl">
                Restaurant
              </h3>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
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
      </div>
    </section>
  );
}
