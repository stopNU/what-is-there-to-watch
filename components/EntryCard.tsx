"use client";

import Image from "next/image";
import type { WatchEntry } from "@/lib/types";

interface Props {
  entry: WatchEntry;
  onEdit: (entry: WatchEntry) => void;
  onDelete: (entry: WatchEntry) => void;
  onRefetch: (entry: WatchEntry) => void;
  refetching?: boolean;
}

export default function EntryCard({ entry, onEdit, onDelete, onRefetch, refetching }: Props) {
  return (
    <div className="group flex items-start gap-3 rounded-xl bg-gray-800 p-3 transition-colors">
      <div className="shrink-0">
        {entry.posterUrl ? (
          <Image
            src={entry.posterUrl}
            alt={entry.name}
            width={48}
            height={72}
            className="rounded-md object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-[72px] w-[48px] items-center justify-center rounded-md bg-gray-700 text-xl text-gray-500">
            ?
          </div>
        )}
      </div>

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
          <span>{entry.platforms?.join(", ")}</span>
          {entry.imdbRating != null && (
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {entry.imdbRating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      <div className="ml-1 flex shrink-0 flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={() => onRefetch(entry)}
          disabled={!entry.imdbUrl || refetching}
          className="text-gray-500 hover:text-emerald-400 transition-colors text-sm leading-none disabled:opacity-40 disabled:hover:text-gray-500"
          title={entry.imdbUrl ? "Refetch poster & rating from IMDB" : "Add an IMDB URL to enable refetching"}
        >
          {refetching ? "…" : "↻"}
        </button>
        <button
          onClick={() => onEdit(entry)}
          className="text-gray-500 hover:text-indigo-400 transition-colors text-sm leading-none"
          title="Edit"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(entry)}
          className="text-gray-500 hover:text-red-400 transition-colors text-lg leading-none"
          title="Remove"
        >
          ×
        </button>
      </div>
    </div>
  );
}
