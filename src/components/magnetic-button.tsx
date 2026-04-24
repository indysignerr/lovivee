"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button" | "a";
  href?: string;
  strength?: number;
  className?: string;
  children: React.ReactNode;
};

export function MagneticButton({
  as = "button",
  href,
  strength = 0.35,
  className,
  children,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 80;
      if (dist < radius * 1.5) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      }
    };

    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    const onClick = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };

    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave as EventListener);
    el.addEventListener("click", onClick as EventListener);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave as EventListener);
      el.removeEventListener("click", onClick as EventListener);
    };
  }, [strength]);

  const baseClass = cn(
    "wave-btn inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-shadow",
    className
  );

  if (as === "a" && href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        data-cursor="magnetic"
        className={baseClass}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      data-cursor="magnetic"
      className={baseClass}
      {...rest}
    >
      {children}
    </button>
  );
}
