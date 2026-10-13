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
    expect(studio).toContain("BuildLabPanel");
    const builder = readFileSync(new URL("../src/components/microlab/build-lab.tsx", import.meta.url), "utf8");
    expect(builder).toContain("new THREE.WebGLRenderer");
    expect(builder).toContain("Parts catalogue");
    expect(builder).toContain("application/microlab-part");
    expect(builder).toContain("@dimforge/rapier3d-compat");
    expect(builder).toContain("Add 3D landscape");
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

describe("beginner examples and touch interactions", () => {
  test("every advertised example has a complete sketch and the correct board profile", () => {
    const data = readFileSync(new URL("../src/components/microlab/studio-data.ts", import.meta.url), "utf8");
    for (const example of ["blink", "traffic", "button", "sensor", "wifi"]) {
      expect(data).toContain(`${example}: { label:`);
    }
    const match = data.match(/export const CODE_EXAMPLES: Record<string, \{ label: string; board: Board; code: string \}> = ([\s\S]*?);\n/);
    expect(match).not.toBeNull();
    const studio = readFileSync(new URL("../src/components/microlab/studio-app.tsx", import.meta.url), "utf8");
    expect(studio).toContain("function loadExample(id: string)");
    expect(studio).toContain("setSketch(example.code)");
    expect(studio).toContain("setBoard(example.board)");
  });

  test("project cards and lesson practice load examples into the editor rather than only scrolling", () => {
    const projects = readFileSync(new URL("../src/components/microlab/guide-panels.tsx", import.meta.url), "utf8");
    const lessons = readFileSync(new URL("../src/components/microlab/workspace-panels.tsx", import.meta.url), "utf8");
    expect(projects).toContain("loadExample(exampleId)");
    expect(projects).toContain("Try example");
    expect(lessons).toContain("loadExample(lessonId");
    expect(lessons).toContain("Load example");
  });
});
