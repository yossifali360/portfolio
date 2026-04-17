import type { EducationEntry } from "@/types/education";
import type { ExperienceEntry } from "@/types/experience";
import type { PortfolioCard } from "@/types/portfolio";
import type { SkillGroup } from "@/types/skills";

export const API_DEFAULT_REVALIDATE_SECONDS = 60;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly path: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function apiBase(): string | undefined {
  const base = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "");
  return base;
}

export function normalizeApiPath(path: string): string {
  const trimmed = path.trim().replace(/^\/+/, "");
  if (!trimmed) return "";
  return trimmed.startsWith("api/") ? `/${trimmed}` : `/api/${trimmed}`;
}

type FetchJsonInit = RequestInit & {
  next?: { revalidate?: number };
};
export async function fetchJsonFromApi<T>(
  path: string,
  init: FetchJsonInit = {},
): Promise<T> {
  const url = `${apiBase()}${path.startsWith("/") ? path : `/${path}`}`;
  const { next, ...rest } = init;
  const method = rest.method ?? "GET";
  const isGet = method === "GET";

  const res = await fetch(url, {
    ...rest,
    ...(isGet
      ? { next: next ?? { revalidate: API_DEFAULT_REVALIDATE_SECONDS } }
      : {}),
    headers: {
      Accept: "application/json",
      ...(rest.headers as Record<string, string>),
    },
  });

  if (!res.ok) {
    throw new ApiError(`${path}: ${res.status}`, path, res.status);
  }

  return res.json() as Promise<T>;
}

export interface HomeApiPayload {
  portfolioCards: PortfolioCard[];
  experience: ExperienceEntry[];
  skillGroups: SkillGroup[];
  educationEntries: EducationEntry[];
}

export async function fetchHomeData(
  init?: FetchJsonInit,
  locale: string = "en",
): Promise<HomeApiPayload> {
  const acceptLang = locale.toLowerCase().startsWith("ar") ? "ar" : "en";
  return fetchJsonFromApi<HomeApiPayload>("/api/home", {
    ...init,
    headers: {
      ...(init?.headers as Record<string, string> | undefined),
      "Accept-Language": acceptLang,
    },
  });
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
