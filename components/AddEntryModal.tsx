"use client";

import { useState } from "react";
import { PLATFORMS } from "@/lib/types";
import { PLATFORM_META } from "@/lib/platformMeta";
import type { WatchEntry, ListTab, EntryType, Platform } from "@/lib/types";

interface Props {
  activeList: ListTab;
  onAdd: (entry: Omit<WatchEntry, "id" | "addedAt">) => Promise<void>;
  onClose: () => void;
}

export default function AddEntryModal({ activeList, onAdd, onClose }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<EntryType>("series");
  const [season, setSeason] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [imdbRating, setImdbRating] = useState("");
  const [imdbUrl, setImdbUrl] = useState("");
  const [list, setList] = useState<ListTab>(activeList);
  const [saving, setSaving] = useState(false);

  function togglePlatform(p: Platform) {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || platforms.length === 0) return;
    setSaving(true);

    let posterUrl: string | undefined;
    const trimmedUrl = imdbUrl.trim();
    if (trimmedUrl) {
      const res = await fetch(`/api/fetch-poster?url=${encodeURIComponent(trimmedUrl)}`);
      const data = await res.json();
      posterUrl = data.posterUrl ?? undefined;
    }

    await onAdd({
      name: name.trim(),
      type,
      season: type === "series" && season ? parseInt(season) : undefined,
      platforms,
      imdbRating: imdbRating ? parseFloat(imdbRating) : undefined,
      imdbUrl: trimmedUrl || undefined,
      posterUrl,
      list,
    });
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-900 p-6 shadow-2xl">
        <h2 className="mb-5 text-xl font-bold text-white">Add to watchlist</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">Title</label>
            <input
              className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Breaking Bad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-gray-400">Type</label>
              <select
                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={type}
                onChange={(e) => setType(e.target.value as EntryType)}
              >
                <option value="series">Series</option>
                <option value="movie">Movie</option>
              </select>
            </div>

            {type === "series" && (
              <div>
                <label className="mb-1 block text-sm text-gray-400">Season</label>
                <input
                  type="number"
                  min="1"
                  className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 2"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Platform
              {platforms.length === 0 && (
                <span className="ml-1 text-red-400">*</span>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => {
                const meta = PLATFORM_META[p];
                const active = platforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    style={
                      active
                        ? { color: meta.color, background: meta.bg, borderColor: meta.color }
                        : {}
                    }
                    className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                      active
                        ? "border-current"
                        : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
                    }`}
                  >
                    {meta.icon && <span>{meta.icon}</span>}
                    <span>{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-gray-400">IMDB Rating</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. 8.5"
                value={imdbRating}
                onChange={(e) => setImdbRating(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-400">IMDB URL</label>
              <input
                type="url"
                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://www.imdb.com/title/tt..."
                value={imdbUrl}
                onChange={(e) => setImdbUrl(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-400">List</label>
            <select
              className="w-full rounded-lg bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={list}
              onChange={(e) => setList(e.target.value as ListTab)}
            >
              <option value="man">The Man</option>
              <option value="woman">The Woman</option>
              <option value="shared">Shared</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || platforms.length === 0}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
            >
              {saving ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
