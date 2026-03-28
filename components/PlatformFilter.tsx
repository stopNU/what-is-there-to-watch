"use client";

import type { Platform } from "@/lib/types";
import { PLATFORMS } from "@/lib/types";
import { PLATFORM_META } from "@/lib/platformMeta";

interface Props {
  value: Platform | "all";
  onChange: (value: Platform | "all") => void;
}

export default function PlatformFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORMS.map((platform) => {
        const meta = PLATFORM_META[platform];
        const active = value === platform;
        return (
          <button
            key={platform}
            onClick={() => onChange(active ? "all" : platform)}
            title={platform}
            style={
              active
                ? { color: meta.color, background: meta.bg, borderColor: meta.color }
                : {}
            }
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
              active
                ? "border-current"
                : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200"
            }`}
          >
            {meta.icon && (
              <span style={active ? { color: meta.color } : {}}>{meta.icon}</span>
            )}
            <span>{platform}</span>
          </button>
        );
      })}
    </div>
  );
}
