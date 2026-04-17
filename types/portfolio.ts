export interface PortfolioLink {
  href: string;
  /** Key under `common` in messages (e.g. regionKsa) */
  labelKey: string;
}

export interface PortfolioCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link?: string;
  /** Multiple CTAs (e.g. regional sites); takes precedence over `link` when present */
  links?: PortfolioLink[];
  image?: string;
  accentColor: string;
}
