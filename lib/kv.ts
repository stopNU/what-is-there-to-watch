import { Redis } from "@upstash/redis";
import type { WatchEntry } from "./types";

const kv = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

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

export async function updateEntry(updated: WatchEntry): Promise<void> {
  const entries = await getEntries();
  await kv.set(
    KEY,
    entries.map((e) => (e.id === updated.id ? updated : e))
  );
}

export async function deleteEntry(id: string): Promise<void> {
  const entries = await getEntries();
  await kv.set(
    KEY,
    entries.filter((e) => e.id !== id)
  );
}
