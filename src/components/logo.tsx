import Image from "next/image";

export function Logo({
  className,
  height = 48,
}: {
  className?: string;
  height?: number;
  variant?: "default" | "light";
}) {
  return (
    <span className={className} aria-label="L'Ovive — accueil" style={{ display: "inline-block" }}>
      <Image
        src="/logo.png"
        alt="L'Ovive"
        width={Math.round(height * 2.7)}
        height={height}
        priority
        unoptimized
        style={{ height, width: "auto" }}
      />
    </span>
  );
}
