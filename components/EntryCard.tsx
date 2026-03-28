"use client";

import type { WatchEntry } from "@/lib/types";

interface Props {
  entry: WatchEntry;
  onDelete: (id: string) => void;
}

export default function EntryCard({ entry, onDelete }: Props) {
  return (
    <div className="group flex items-start justify-between rounded-xl bg-gray-800 px-4 py-3 hover:bg-gray-750 transition-colors">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {entry.imdbUrl ? (
            <a
              href={entry.imdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white truncate hover:text-yellow-400 transition-colors"
            >
              {entry.name}
            </a>
          ) : (
            <span className="font-semibold text-white truncate">{entry.name}</span>
          )}
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              entry.type === "series"
                ? "bg-blue-900/60 text-blue-300"
                : "bg-purple-900/60 text-purple-300"
            }`}
          >
            {entry.type === "series" ? "Series" : "Movie"}
          </span>
          {entry.type === "series" && entry.season != null && (
            <span className="shrink-0 rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
              S{entry.season}
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
          <span>{entry.platform}</span>
          {entry.imdbRating != null && (
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {entry.imdbRating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(entry.id)}
        className="ml-3 mt-0.5 shrink-0 text-gray-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all text-lg leading-none"
        title="Remove"
      >
        ×
      </button>
    </div>
  );
}
