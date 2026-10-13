import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

describe("MicroLab Studio standalone website contract", () => {
  test("home route renders the scroll-controlled journey and the product studio", () => {
    const route = readFileSync(new URL("../src/routes/index.tsx", import.meta.url), "utf8");
    const studio = readFileSync(new URL("../src/components/microlab/studio-app.tsx", import.meta.url), "utf8");
    expect(route).toContain("ScrollScrub");
    expect(route).toContain("StudioApp");
    expect(studio).toContain("CodePanel");
    expect(studio).toContain("LearnPanel");
    expect(studio).toContain("VirtualLabPanel");
    expect(studio).toContain("ProjectsPanel");
    expect(studio).toContain("GuidePanel");
  });

  test("does not expose the scaffold's generation app route", () => {
    expect(existsSync(fileURLToPath(new URL("../src/routes/app.tsx", import.meta.url)))).toBe(false);
    expect(existsSync(fileURLToPath(new URL("../src/layouts/custom.tsx", import.meta.url)))).toBe(false);
    const route = readFileSync(new URL("../src/routes/index.tsx", import.meta.url), "utf8");
    expect(route).not.toContain("LandingPage");
    expect(route).not.toContain("GenerateImage");
    expect(route).not.toContain("GenerateVideo");
  });

  test("includes both exact-frame scroll-scrub clips and their posters", () => {
    const scenes = readFileSync(new URL("../src/scroll-scrub-scenes.ts", import.meta.url), "utf8");
    for (const asset of ["scene-01.mp4", "scene-01-mobile.mp4", "scene-01-poster.png", "scene-01-mobile-poster.png"]) {
      expect(scenes).toContain(asset);
      const path = fileURLToPath(new URL(`../public/assets/world/${asset}`, import.meta.url));
      expect(existsSync(path)).toBe(true);
      expect(statSync(path).size).toBeGreaterThan(1000);
    }
  });
});
