"use client";

import { useTranslations } from "next-intl";
import type { EducationEntry } from "@/types/education";

export function EducationSection({
  entries,
}: {
  entries?: EducationEntry[] | null;
}) {
  const t = useTranslations("sections");

  return (
    <section
      id="education"
      className="relative z-10 bg-background px-4 py-20 md:px-8 md:py-28"
      aria-label={t("education")}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          {t("education")}
        </h2>
        <p className="mb-14 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {t("educationTitle")}
        </p>
        <ul className="flex flex-col gap-6">
          {entries && entries?.length > 0 && entries?.map((entry) => (
            <li
              key={entry?.id}
              className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 dark:border-white/10 dark:bg-neutral-900/40 md:p-8"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {entry?.period}
              </p>
              <h3 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
                {entry?.degree}
              </h3>
              <p className="mt-1 text-lg text-indigo-600 dark:text-indigo-400">
                {entry?.institution}
              </p>
              {entry?.detail && (
                <p className="mt-4 text-pretty text-neutral-600 dark:text-neutral-400">
                  {entry?.detail}
                </p>
              )}
              {entry?.overallGrade && (
                <p className="mt-4 text-pretty text-neutral-600 dark:text-neutral-400">
                  {entry?.overallGrade}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
