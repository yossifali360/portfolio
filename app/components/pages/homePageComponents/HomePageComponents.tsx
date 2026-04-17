"use client";

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { Hero } from "@/app/components/pages/homePageComponents/heroSection/HeroSection";
import { ProjectsSection } from "@/app/components/pages/homePageComponents/projectsSection/ProjectsSection";
import YALoader from "@/app/components/common/Logo/Logo";
import { homeDataQueryOptions } from "@/lib/queries";
import { ExperienceTimeline } from "./experienceTimeline/ExperienceTimeline";
import { SkillsSection } from "./skillsSection/SkillsSection";
import { EducationSection } from "./educationSection/EducationSection";
import Footer from "../../common/footer/Footer";

export default function HomePageComponents() {
  const locale = useLocale();
  const tSections = useTranslations("sections");
  const { data } = useQuery(homeDataQueryOptions(locale));
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <>
      {!introDone && (
        <YALoader onComplete={handleIntroComplete} />
      )}
      <main
        className={`min-h-screen ${introDone ? "opacity-100" : "opacity-0 h-screen overflow-hidden"} transition-opacity duration-500`}
      >
        <div className="relative mx-auto w-full max-w-[100vw] overflow-x-clip">
          <Hero />
          <section id="work" aria-label={tSections("work")}>
            <div className="relative w-full">
              <ProjectsSection
                portfolioCards={data?.portfolioCards}
              />
            </div>
          </section>
          <div className="relative w-full">
            <ExperienceTimeline
              experience={data?.experience || []}
            />
          </div>
          <SkillsSection groups={data?.skillGroups || []} />
          <EducationSection entries={data?.educationEntries || []} />
          <Footer />
        </div>
      </main>
    </>
  );
}
