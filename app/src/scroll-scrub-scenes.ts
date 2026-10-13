import type { ScrollScrubScene, ScrollScrubTheme } from "@/components/scroll-scrub/scroll-scrub";
export const scrollScrubTheme: ScrollScrubTheme = { accent: "#D74455", background: "#F2F4F2", ink: "#172321", muted: "#DDE3DF" };
export const scrollScrubScenes: ScrollScrubScene[] = [{
  id: "first-light", label: "First light", poster: "/assets/world/scene-01-poster.png", mobilePoster: "/assets/world/scene-01-mobile-poster.png",
  clip: "/assets/world/scene-01.mp4", mobileClip: "/assets/world/scene-01-mobile.mp4", title: "Start with a spark.",
  body: "A tiny circuit can teach you a lot. Follow the board, the pins, the code, and the moment an output changes.",
  kicker: "THE CIRCUIT EXPEDITION / 01", tags: ["Arduino + ESP32", "Code by doing", "Virtual circuit lab"], align: "left", scroll: 1.55,
  objectPosition: "55% 50%", mobileObjectPosition: "50% 48%",
}];
