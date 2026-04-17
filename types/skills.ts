export interface SkillItem {
  name: string;
  image?: string | null;
}

/** From API (`/api/home`) — localized per Accept-Language */
export interface SkillGroup {
  id: string;
  title: string;
  items: SkillItem[];
}

/** Fallback data in `data/skills.ts` — group titles via next-intl */
export interface SkillGroupStatic {
  id: string;
  titleKey: string;
  items: SkillItem[];
}
