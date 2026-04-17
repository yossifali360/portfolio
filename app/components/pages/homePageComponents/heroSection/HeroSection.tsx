"use client";

import { useTranslations } from "next-intl";

export function Hero() {
  const tHero = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-100/80 px-6 text-center text-neutral-900 dark:bg-neutral-950/70 dark:text-white">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          {tHero("role")}
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          {tHero("greeting")}{" "}
          <span className="bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-pink-500">
            {tHero("name")}
          </span>
        </h1>
        <p className="text-lg leading-relaxed text-neutral-600 md:text-xl dark:text-neutral-400">
          {tHero("intro")}
        </p>
        <div className="mt-12 flex justify-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            {tCommon("viewWork")}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-neutral-400 px-6 py-3 font-medium text-neutral-900 transition hover:bg-neutral-200 dark:border-white/30 dark:text-white dark:hover:border-white/60 dark:hover:bg-white/5"
          >
            {tCommon("getInTouch")}
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-neutral-500 dark:text-white/50">
        <span className="block text-2xl">↓</span>
      </div>
    </section>
  );
}
