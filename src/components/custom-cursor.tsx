"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setIsVisible(true);

    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const handleHover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      const interactive = t.closest('a, button, [data-cursor="hover"], [data-cursor="magnetic"], input, select, textarea');
      setIsHover(!!interactive);
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleHover);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleHover);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        left: 0,
        top: 0,
        width: isHover ? 40 : 20,
        height: isHover ? 40 : 20,
        borderRadius: "50%",
        background: isHover ? "rgba(47,165,181,0.85)" : "rgba(47,165,181,0.6)",
      }}
    />
  );
}
