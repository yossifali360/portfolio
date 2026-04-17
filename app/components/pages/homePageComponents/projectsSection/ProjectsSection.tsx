"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PortfolioCard } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import ProjectImage from "./projectImage/ProjectImage";

type ProjectsSectionProps = {
  portfolioCards?: PortfolioCard[];
};

function getPrimaryLink(card: PortfolioCard) {
  if (card?.links && card?.links?.length > 0) return card?.links[0];
  if (card.link) return { href: card.link, labelKey: "View Project" };
  return null;
}

function getSecondaryLink(card: PortfolioCard) {
  if (card?.links && card?.links?.length > 1) return card?.links[1];
  return null;
}

function projectHeadline(card: PortfolioCard) {
  return `${card?.title} - ${card?.subtitle}`;
}

const SCROLL_GAP_PER_CARD = 0.55;

export function ProjectsSection({
  portfolioCards,
}: ProjectsSectionProps) {
  const tSections = useTranslations("sections");
  const projects = useMemo(() => portfolioCards ?? [], [portfolioCards]);

const sectionRef = useRef<HTMLElement | null>(null);
const pinRef = useRef<HTMLDivElement | null>(null);
  const stackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || projects.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const cards = projects
          .map((_, i) => cardRefs.current[i])
          .filter((el): el is HTMLElement => Boolean(el));

        if (cards.length === 0) return;

        cards.forEach((el, i) => {
          gsap.set(el, {
            yPercent: i === 0 ? 0 : 100,
            zIndex: i,
          });
        });

        if (cards.length === 1) return;

        const stack = stackRef.current;
        const slideHeight = () =>
          stack && stack.offsetHeight > 0
            ? stack.offsetHeight
            : pin.offsetHeight > 0
              ? pin.offsetHeight
              : window.innerHeight;

        const transitions = cards.length - 1;
        const scrollUnits = transitions * (1 + SCROLL_GAP_PER_CARD);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollUnits * slideHeight()}`,
            pin: pin,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        });

        tl.to({}, { duration: SCROLL_GAP_PER_CARD });

        for (let i = 1; i < cards.length; i++) {
          tl.to(cards[i], { yPercent: 0, duration: 1 });
          if (i < cards.length - 1) {
            tl.to({}, { duration: SCROLL_GAP_PER_CARD });
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, [projects]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-neutral-950 text-white dark:bg-neutral-950"
      aria-label={tSections("work")}
    >
      <div
        ref={pinRef}
        className="flex w-full flex-col overflow-x-clip overflow-y-visible lg:h-dvh lg:min-h-svh lg:overflow-hidden"
      >
        <div className="shrink-0 px-3 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 md:px-6 md:pt-3 md:pb-3">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
              {tSections("work")}
            </h2>
          </div>
        </div>

        <div
          ref={stackRef}
          className="relative flex w-full flex-col gap-10 pb-6 pt-2 lg:min-h-0 lg:flex-1 lg:gap-0 lg:overflow-hidden lg:pb-0 lg:pt-0"
        >
          {projects.map((project, index) => {
            const primary = getPrimaryLink(project);
            const secondary = getSecondaryLink(project);

            return (
              <article
                key={project.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={cn(
                  "relative flex w-full shrink-0 flex-col overflow-hidden bg-neutral-950 px-3 pb-3 md:px-6 md:pb-4",
                  "lg:absolute lg:inset-0 lg:h-full lg:shrink-0",
                )}
              >
                <div className="mx-auto flex w-full max-w-6xl flex-col lg:h-full lg:min-h-0">
                  <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm lg:min-h-0 lg:flex-1">
                    <ProjectImage project={project} />

                    <div className="shrink-0 space-y-3 p-4 md:p-6 md:pt-5">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
                        {project?.subtitle}
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight">{project?.title}</h3>
                      <p className="line-clamp-3 text-sm leading-6 text-neutral-200 md:line-clamp-4">
                        {project?.description}
                      </p>

                      <ul className="flex flex-wrap gap-2">
                        {project?.tags?.slice(0, 4).map((tag) => (
                          <li
                            key={`${project.id}-${tag}`}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      {(primary || secondary) && (
                        <div className="flex flex-wrap gap-3 pt-1">
                          {primary && (
                            <a
                              href={primary.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
                              aria-label={projectHeadline(project)}
                            >
                              {primary?.labelKey}
                            </a>
                          )}
                          {secondary && (
                            <a
                              href={secondary.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium transition hover:border-white/60 hover:bg-white/10"
                            >
                              {secondary?.labelKey}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
