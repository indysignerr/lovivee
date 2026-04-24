import { Phone } from "lucide-react";

export function StickyCallCTA({
  phone,
  phoneRaw,
}: {
  phone: string;
  phoneRaw: string;
}) {
  return (
    <a
      href={`tel:${phoneRaw}`}
      aria-label={`Appeler ${phone}`}
      className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-3 rounded-full bg-turquoise px-6 py-4 text-[15px] font-medium text-cream shadow-glow-turquoise lg:hidden"
      style={{ height: 56 }}
    >
      <Phone size={18} strokeWidth={2.2} />
      Appeler — {phone}
    </a>
  );
}
