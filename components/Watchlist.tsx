"use client";

import { useState, useEffect } from "react";
import AddEntryModal from "./AddEntryModal";
import EntryCard from "./EntryCard";
import { PLATFORMS } from "@/lib/types";
import type { WatchEntry, ListTab, Platform } from "@/lib/types";

const TABS: { id: ListTab; label: string }[] = [
  { id: "man", label: "The Man" },
  { id: "woman", label: "The Woman" },
  { id: "shared", label: "Shared" },
];

export default function Watchlist() {
  const [entries, setEntries] = useState<WatchEntry[]>([]);
  const [activeTab, setActiveTab] = useState<ListTab>("shared");
  const [showModal, setShowModal] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState<Platform | "all">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/entries")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  async function handleAdd(entry: Omit<WatchEntry, "id" | "addedAt">) {
    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    const newEntry: WatchEntry = await res.json();
    setEntries((prev) => [...prev, newEntry]);
  }

  async function handleDelete(id: string) {
    await fetch("/api/entries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const filtered = entries.filter((e) => {
    if (e.list !== activeTab) return false;
    if (filterPlatform !== "all" && e.platform !== filterPlatform) return false;
    return true;
  });

  const series = filtered.filter((e) => e.type === "series");
  const movies = filtered.filter((e) => e.type === "movie");

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            What is there to watch?
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-500 transition-colors"
          >
            + Add
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex rounded-xl bg-gray-800 p-1">
          {TABS.map((tab) => {
            const count = entries.filter((e) => e.list === tab.id).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-gray-950 text-white shadow"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span className="ml-1.5 text-xs opacity-60">{count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap gap-2">
          <select
            className="rounded-lg bg-gray-800 px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value as Platform | "all")}
          >
            <option value="all">All platforms</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {filterPlatform !== "all" && (
            <button
              onClick={() => setFilterPlatform("all")}
              className="rounded-lg bg-gray-700 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* List */}
        {loading ? (
          <div className="py-16 text-center text-gray-500">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            {entries.filter((e) => e.list === activeTab).length === 0
              ? "Nothing here yet. Add something to watch!"
              : "No entries match the current filters."}
          </div>
        ) : (
          <div className="space-y-8">
            {series.length > 0 && (
              <section>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Series <span className="ml-1 opacity-60">{series.length}</span>
                </h2>
                <div className="space-y-2">
                  {series.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} onDelete={handleDelete} />
                  ))}
                </div>
              </section>
            )}
            {movies.length > 0 && (
              <section>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Movies <span className="ml-1 opacity-60">{movies.length}</span>
                </h2>
                <div className="space-y-2">
                  {movies.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} onDelete={handleDelete} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {showModal && (
        <AddEntryModal
          activeList={activeTab}
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
