"use client";

import { useTranslations } from "next-intl";
import { useThemeStore } from "@/store/useThemeStore";
import { useEffect } from "react";
import Button from "@/app/components/common/button/Button";

const CV_URL = "https://api.youssef-ali.com/cv.pdf";

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocaleThemeToggle() {
  const t = useTranslations("toggles");
  const tCommon = useTranslations("common");
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-neutral-300 bg-white/90 px-2 py-2 shadow-sm backdrop-blur-sm dark:border-white/20 dark:bg-neutral-900/90">
      <a
        href={CV_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-white/10"
      >
        <FileIcon className="shrink-0 opacity-90" />
        <span>{tCommon("downloadCv")}</span>
      </a>
      <span className="h-4 w-px bg-neutral-300 dark:bg-white/20" aria-hidden />
      <span className="sr-only">{t("theme")}</span>
      <Button
        type="button"
        onClick={() => toggleTheme()}
        className="rounded-full px-3 py-1.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
        title={theme === "dark" ? t("light") : t("dark")}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </Button>
    </div>
  );
}
