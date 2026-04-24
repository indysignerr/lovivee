import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Formats } from "@/components/sections/formats";
import { MenuSection } from "@/components/sections/menu";
import { Local } from "@/components/sections/local";
import { Gallery } from "@/components/sections/gallery";
import { Reviews } from "@/components/sections/reviews";
import { Call } from "@/components/sections/call";
import { Footer } from "@/components/sections/footer";
import { StickyCallCTA } from "@/components/sticky-cta";
import {
  getContent,
  type GeneralSettings,
  type Pizza,
  type RestaurantDish,
  type HeroContent,
  type FormatBlock,
  type GalleryPhoto,
} from "@/lib/content";

export default function Home() {
  const settings = getContent<GeneralSettings>("settings/general.json");
  const hero = getContent<HeroContent>("sections/hero.json");
  const formats = getContent<{ blocks: FormatBlock[] }>("sections/formats.json");
  const pizzas = getContent<{ items: Pizza[] }>("menu/pizzas.json");
  const dishes = getContent<{ items: RestaurantDish[] }>("menu/restaurant.json");
  const gallery = getContent<{ items: GalleryPhoto[] }>("gallery/photos.json");

  return (
    <main>
      <Navbar phone={settings.phone} phoneRaw={settings.phoneRaw} />
      <Hero hero={hero} settings={settings} />
      <Formats blocks={formats.blocks} />
      <MenuSection pizzas={pizzas.items} dishes={dishes.items} />
      <Gallery photos={gallery.items} />
      <Local settings={settings} />
      <Call settings={settings} />
      <Reviews />
      <Footer settings={settings} />
      <StickyCallCTA phone={settings.phone} phoneRaw={settings.phoneRaw} />
    </main>
  );
}
