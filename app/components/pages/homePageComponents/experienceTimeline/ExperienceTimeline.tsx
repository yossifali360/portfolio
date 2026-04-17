"use client";

import { useTranslations } from "next-intl";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./experience-timeline.css";
import {
  timelineContentArrowStyle,
  timelineContentStyle,
  timelineIconStyle,
} from "./experience-timeline-styles";
import { ExperienceTimelineIcon } from "@/app/components/pages/homePageComponents/experienceTimeline/ExperienceTimelineIcon";
import type { ExperienceEntry } from "@/types/experience";


export type ExperienceTimelineProps = {
  experience?: ExperienceEntry[];
};

export function ExperienceTimeline({
  experience: data,
}: ExperienceTimelineProps) {
  const t = useTranslations("sections");
  const aria = t("experience");

  return (
    <section id="experience" className={`relative z-10 bg-neutral-950 px-4 py-20 md:px-8 md:py-28 dark:bg-neutral-950/70`} aria-label={aria}>
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">
          {t("experience")}
        </h2>
        <p className="mb-16 text-center text-2xl font-bold tracking-tight md:text-3xl text-white dark:text-white">
          {t("experienceTitle")}
        </p>
        <div
          className="experience-timeline-root relative"
        >
          <VerticalTimeline
            animate
            layout="2-columns"
            lineColor="rgba(124, 58, 237, 0.5)"
            className="experience-timeline"
          >
            {data &&
              data?.map((entry) => (
                <VerticalTimelineElement
                  key={entry.id}
                  contentStyle={timelineContentStyle}
                  contentArrowStyle={timelineContentArrowStyle}
                  date={entry.period}
                  dateClassName="!text-neutral-400 !font-medium"
                  iconStyle={timelineIconStyle}
                  icon={<ExperienceTimelineIcon />}
                >
                  <h3 className="vertical-timeline-element-title mb-1! text-lg! font-bold! text-white!">
                    {entry?.title}
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle mb-3! text-indigo-400!">
                    {entry?.company}
                  </h4>
                  <p className="text-neutral-400! whitespace-pre-line!">
                    {entry?.description}
                  </p>
                  {entry?.tags && entry?.tags?.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {entry?.tags?.map((tag) => (
                        <li key={tag}>
                          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-neutral-300">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </VerticalTimelineElement>
              ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
}
