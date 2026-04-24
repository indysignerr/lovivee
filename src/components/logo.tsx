import Image from "next/image";

export function Logo({
  className,
  height = 48,
  variant = "default",
}: {
  className?: string;
  height?: number;
  variant?: "default" | "light";
}) {
  const src = variant === "light" ? "/logo-light.svg" : "/logo.svg";
  return (
    <span className={className} aria-label="L'Ovive — accueil">
      <Image
        src={src}
        alt="L'Ovive"
        width={Math.round(height * 3.2)}
        height={height}
        priority
        style={{ height, width: "auto" }}
      />
    </span>
  );
}
