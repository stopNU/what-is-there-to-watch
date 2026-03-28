import { kv } from "@vercel/kv";
import type { WatchEntry, ListTab } from "./types";

const KEY = "watchlist";

export async function getEntries(): Promise<WatchEntry[]> {
  const data = await kv.get<WatchEntry[]>(KEY);
  return data ?? [];
}

export async function addEntry(entry: WatchEntry): Promise<void> {
  const entries = await getEntries();
  entries.push(entry);
  await kv.set(KEY, entries);
}

export async function deleteEntry(id: string): Promise<void> {
  const entries = await getEntries();
  await kv.set(
    KEY,
    entries.filter((e) => e.id !== id)
  );
}
