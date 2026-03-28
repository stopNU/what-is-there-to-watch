"use client";

import {
  SiNetflix,
  SiHbomax,
  SiAppletv,
  SiCrunchyroll,
} from "react-icons/si";
import type { Platform } from "@/lib/types";
import { PLATFORMS } from "@/lib/types";

const PLATFORM_META: Record<
  Platform,
  { icon?: React.ReactNode; color: string; bg: string }
> = {
  Netflix: {
    icon: <SiNetflix size={18} />,
    color: "#E50914",
    bg: "rgba(229,9,20,0.15)",
  },
  "HBO Max": {
    icon: <SiHbomax size={18} />,
    color: "#9B59D0",
    bg: "rgba(155,89,208,0.15)",
  },
  "Disney+": {
    color: "#1F78FF",
    bg: "rgba(31,120,255,0.15)",
  },
  "Amazon Prime": {
    color: "#00A8E0",
    bg: "rgba(0,168,224,0.15)",
  },
  "Apple TV+": {
    icon: <SiAppletv size={18} />,
    color: "#d0d0d0",
    bg: "rgba(208,208,208,0.10)",
  },
  Crunchyroll: {
    icon: <SiCrunchyroll size={18} />,
    color: "#F47521",
    bg: "rgba(244,117,33,0.15)",
  },
  SkyShowtime: {
    color: "#6B9FE4",
    bg: "rgba(107,159,228,0.15)",
  },
  Other: {
    color: "#9ca3af",
    bg: "rgba(156,163,175,0.15)",
  },
};

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
