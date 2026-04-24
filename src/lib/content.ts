import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export function getContent<T>(filepath: string): T {
  const fullPath = path.join(contentDir, filepath);
  const fileContent = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(fileContent) as T;
}

export type GeneralSettings = {
  name: string;
  phone: string;
  phoneRaw: string;
  address: string;
  city: string;
  hours: { weekdays: string; saturday: string; closed: string };
};

export type Pizza = {
  name: string;
  ingredients: string;
  price: number;
  available: boolean;
};

export type RestaurantDish = {
  name: string;
  detail: string;
  price?: number;
  price_text?: string;
  available: boolean;
};

export type HeroContent = {
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  imageAlt: string;
};

export type FormatBlock = { title: string; text: string; icon: string };

export type GalleryPhoto = { image: string; alt: string; order: number };
