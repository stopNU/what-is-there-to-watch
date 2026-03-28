import {
  SiNetflix,
  SiHbomax,
  SiAppletv,
  SiCrunchyroll,
} from "react-icons/si";
import type { Platform } from "./types";

export const PLATFORM_META: Record<
  Platform,
  { icon?: React.ReactNode; color: string; bg: string }
> = {
  Netflix: {
    icon: <SiNetflix size={16} />,
    color: "#E50914",
    bg: "rgba(229,9,20,0.15)",
  },
  "HBO Max": {
    icon: <SiHbomax size={16} />,
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
    icon: <SiAppletv size={16} />,
    color: "#d0d0d0",
    bg: "rgba(208,208,208,0.10)",
  },
  Crunchyroll: {
    icon: <SiCrunchyroll size={16} />,
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
