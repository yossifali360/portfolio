"use client";

import { useTranslations } from "next-intl";
import type { SkillGroup, SkillItem } from "@/types/skills";

function SkillChip({ item }: { item: SkillItem }) {
  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-indigo-500/15 px-3 py-1.5 text-sm font-medium text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-200">
      <span className="min-w-0 truncate">{item.name}</span>
    </span>
  );
}

export function SkillsSection({
  groups,
}: {
  groups?: SkillGroup[] | null;
}) {
  const t = useTranslations("sections");

  return (
    <section
      id="skills"
      className="relative z-10 bg-background px-4 py-20 md:px-8 md:py-28"
      aria-label={t("skills")}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          {t("skills")}
        </h2>
        <p className="mb-14 text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {t("skillsTitle")}
        </p>
        <div className="grid gap-10 md:grid-cols-3">
          {groups && groups.length > 0 && groups.map((group) => {
            return (
              <div
                key={group.id}
                className="rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 dark:border-white/10 dark:bg-neutral-900/40"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {group.title}
                </h3>
                {group.items && group.items.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item, idx) => (
                      <li key={`${group.id}-${idx}`}>
                        <SkillChip item={item} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })
          }
        </div>
      </div>
    </section>
  );
}
