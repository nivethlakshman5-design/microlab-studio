import { useEffect, useMemo, useState } from "react";
import { StudioOverview } from "./workspace-panels";
import { CodePanel, LearnPanel } from "./workspace-panels";
import { VirtualLabPanel } from "./lab-panels";
import { GuidePanel, ProjectsPanel, DocsPanel } from "./guide-panels";
import { Board, GUIDE, LESSONS, PROJECTS, STARTER, STORAGE_KEY } from "./studio-data";

export function StudioApp() {
 const [board, setBoard] = useState<Board>("Arduino Uno");
 const [sketch, setSketch] = useState(STARTER);
 const [done, setDone] = useState<string[]>([]);
 const [lessonId, setLessonId] = useState("blink");
 const [choice, setChoice] = useState("");
 const [quiz, setQuiz] = useState("");
 const [check, setCheck] = useState("");
 const [status, setStatus] = useState("Ready for a local simulation");
 const [serial, setSerial] = useState(["MicroLab serial monitor", "No hardware connected. Output here is simulated."]);
 const [led, setLed] = useState(false);
 const [pressed, setPressed] = useState(false);
 const [parts, setParts] = useState(["LED", "Resistor"]);
 const [filter, setFilter] = useState("All");
 const [search, setSearch] = useState("");
 const [question, setQuestion] = useState("");
 const [answer, setAnswer] = useState("");
 const [ready, setReady] = useState(false);
 useEffect(() => {
  try { const raw = window.localStorage.getItem(STORAGE_KEY); if (raw) { const d = JSON.parse(raw) as { board?: Board; sketch?: string; done?: string[]; parts?: string[] }; if (d.board === "Arduino Uno" || d.board === "ESP32") setBoard(d.board); if (typeof d.sketch === "string") setSketch(d.sketch); if (Array.isArray(d.done)) setDone(d.done.filter((id) => LESSONS.some((l) => l.id === id))); if (Array.isArray(d.parts)) setParts(d.parts.filter((p) => ["LED", "Resistor", "Button", "Potentiometer"].includes(p))); } } catch { /* Keep starter state if storage is unavailable. */ } setReady(true);
 }, []);
 useEffect(() => { if (!ready) return; try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ board, sketch, done, parts })); } catch { /* Session remains usable without storage. */ } }, [board, sketch, done, parts, ready]);
 const progress = Math.round(done.length / LESSONS.length * 100);
 const lesson = LESSONS.find((l) => l.id === lessonId) ?? LESSONS[1];
 const filteredProjects = useMemo(() => PROJECTS.filter((p) => (filter === "All" || p.level === filter) && `${p.title} ${p.copy} ${p.tags}`.toLowerCase().includes(search.trim().toLowerCase())), [filter, search]);
 const jump = (id: string) => window.document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
 function verify() { if (!/\bvoid\s+setup\s*\(/.test(sketch) || !/\bvoid\s+loop\s*\(/.test(sketch)) { setCheck("Add both setup() and loop() before testing the sketch."); setStatus("Check needed"); return false; } if ((sketch.match(/\{/g) ?? []).length !== (sketch.match(/\}/g) ?? []).length) { setCheck("Opening and closing braces do not match. Check your code blocks."); setStatus("Check needed"); return false; } setCheck("Basic structure checks passed. This is a pattern check, not a C++ compiler."); setStatus("Structure checked"); return true; }
 function run() { if (!verify()) { setSerial((s) => [...s, "[check] Sketch structure needs attention."].slice(-12)); return; } const lines = [`[${board}] Local simulation started. No device connected.`, /digitalWrite\s*\(/.test(sketch) ? "Output call detected: digitalWrite()" : "Output behavior is outside the supported subset.", /delay\s*\(/.test(sketch) ? "delay() detected. Timing is illustrative." : "No delay() call detected.", /Serial\.println\s*\(/.test(sketch) ? "Serial output call detected." : "Try adding Serial.println().", "Simulation finished. Firmware was not compiled or uploaded."]; setSerial((s) => [...s, ...lines].slice(-12)); if (/digitalWrite\s*\(/.test(sketch)) setLed((v) => !v); setStatus("Simulation complete · local only"); }
 function ask(q = question) { const text = q.trim().toLowerCase(); if (!text) { setAnswer("Type a question or choose a starter topic."); return; } setAnswer(GUIDE.find((g) => g.keys.some((k) => text.includes(k)))?.answer ?? "Try asking about setup()/loop(), pins and GPIO, LED resistors, ESP32 voltage, serial output, or the limits of this local simulator. This is an offline reference, not a connected AI service."); }
 function complete(id: string) { setDone((items) => items.includes(id) ? items : [...items, id]); setQuiz("Lesson marked complete. Progress is saved in this browser."); }
 return <>
  <StudioOverview board={board} done={done} progress={progress} jump={jump} setLessonId={setLessonId} />
  <CodePanel board={board} setBoard={setBoard} sketch={sketch} setSketch={setSketch} serial={serial} setSerial={setSerial} status={status} check={check} setCheck={setCheck} verify={verify} run={run} reset={() => { setSketch(STARTER); setCheck("Starter sketch restored."); setStatus("Ready for a local simulation"); }} />
  <LearnPanel done={done} lesson={lesson} lessonId={lessonId} setLessonId={setLessonId} choice={choice} setChoice={setChoice} quiz={quiz} setQuiz={setQuiz} complete={complete} jump={jump} />
  <VirtualLabPanel board={board} setBoard={setBoard} led={led} setLed={setLed} pressed={pressed} setPressed={setPressed} parts={parts} setParts={setParts} status={status} setStatus={setStatus} setSerial={setSerial} />
  <ProjectsPanel filtered={filteredProjects} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} setLessonId={setLessonId} jump={jump} />
  <GuidePanel question={question} setQuestion={setQuestion} answer={answer} ask={ask} />
  <DocsPanel reset={() => { try { window.localStorage.removeItem(STORAGE_KEY); } catch {} setDone([]); setSketch(STARTER); setParts(["LED", "Resistor"]); setBoard("Arduino Uno"); setCheck("Local workspace reset."); }} />
 </>;
}
