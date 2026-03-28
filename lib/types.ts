export type ListTab = "man" | "woman" | "shared";
export type EntryType = "series" | "movie";

export const PLATFORMS = [
  "Netflix",
  "HBO Max",
  "Disney+",
  "Amazon Prime",
  "Apple TV+",
  "Crunchyroll",
  "SkyShowtime",
  "Other",
] as const;

export type Platform = (typeof PLATFORMS)[number];

export interface WatchEntry {
  id: string;
  name: string;
  type: EntryType;
  season?: number;
  platform: Platform;
  imdbRating?: number;
  list: ListTab;
  addedAt: string;
}
