"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useRef } from "react";

function buildBackground(x: number, y: number): string {
  return [
    `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.45), transparent 55%)`,
    `radial-gradient(420px circle at ${x}px ${y}px, rgba(236, 72, 153, 0.22), transparent 50%)`,
  ].join(",");
}

export function MouseSpotlight() {
  const theme = useThemeStore((s) => s.theme);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el || theme !== "dark") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.background = buildBackground(
        window.innerWidth / 2,
        window.innerHeight / 2,
      );
      return;
    }

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.background = buildBackground(e.clientX, e.clientY);
      });
    };

    el.style.background = buildBackground(
      window.innerWidth / 2,
      window.innerHeight / 2,
    );
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, [theme]);

  return (
    <div
      ref={layerRef}
      className={`pointer-events-none fixed inset-0  hidden lg:block z-1 ${theme !== "dark" ? "hidden" : ""}`}
      aria-hidden
    />
  );
}
