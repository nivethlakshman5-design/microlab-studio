import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, Code2, ExternalLink, LockKeyhole, X } from "lucide-react";
import { StudioOverview } from "./workspace-panels";
import { CodePanel, LearnPanel } from "./workspace-panels";
import { VirtualLabPanel } from "./lab-panels";
import { BuildLabPanel } from "./build-lab";
import { CircuitBuilder } from "./circuit-builder";
import { GuidePanel, ProjectsPanel, DocsPanel } from "./guide-panels";
import { Board, GUIDE, LESSONS, PROJECTS, STARTER, STORAGE_KEY, CODE_EXAMPLES } from "./studio-data";

export function StudioApp({ devOpen = false, closeDev = () => {} }: { devOpen?: boolean; closeDev?: () => void }) {
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
 const [devTab, setDevTab] = useState("content");
 const [accentDraft, setAccentDraft] = useState("#d74455");
 const [forestDraft, setForestDraft] = useState("#28584b");
 const [inkDraft, setInkDraft] = useState("#172321");
 const [paperDraft, setPaperDraft] = useState("#f2f4f2");
 const [savedTheme, setSavedTheme] = useState(false);
 useEffect(() => {
  try { const raw = window.localStorage.getItem(STORAGE_KEY); if (raw) { const d = JSON.parse(raw) as { board?: Board; sketch?: string; done?: string[]; parts?: string[] }; if (d.board === "Arduino Uno" || d.board === "ESP32") setBoard(d.board); if (typeof d.sketch === "string") setSketch(d.sketch); if (Array.isArray(d.done)) setDone(d.done.filter((id) => LESSONS.some((l) => l.id === id))); if (Array.isArray(d.parts)) setParts(d.parts.filter((p) => ["LED", "Resistor", "Button", "Potentiometer"].includes(p))); } } catch { /* Keep starter state if storage is unavailable. */ } setReady(true);
 }, []);
 useEffect(() => { if (!ready) return; try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ board, sketch, done, parts })); } catch { /* Session remains usable without storage. */ } }, [board, sketch, done, parts, ready]);
 useEffect(() => {
  try {
   const raw = window.localStorage.getItem("microlab-theme-preview");
   if (!raw) return;
   const theme = JSON.parse(raw) as { accent?: string; forest?: string; ink?: string; paper?: string };
   const valid = (value?: string) => typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
   if (valid(theme.accent)) { setAccentDraft(theme.accent!); document.documentElement.style.setProperty("--accent", theme.accent!); }
   if (valid(theme.forest)) { setForestDraft(theme.forest!); document.documentElement.style.setProperty("--forest", theme.forest!); }
   if (valid(theme.ink)) { setInkDraft(theme.ink!); document.documentElement.style.setProperty("--ink", theme.ink!); }
   if (valid(theme.paper)) { setPaperDraft(theme.paper!); document.documentElement.style.setProperty("--paper", theme.paper!); document.body.style.backgroundColor = theme.paper!; }
  } catch { /* Ignore an invalid local preview and keep the site's default theme. */ }
 }, []);
 function selectLesson(id: string) { setLessonId(id); setChoice(""); setQuiz(""); }
 const progress = Math.round(done.length / LESSONS.length * 100);
 function loadExample(id: string) { const example = CODE_EXAMPLES[id]; if (!example) return; setSketch(example.code); setBoard(example.board); setCheck(`${example.label} loaded. Review the wiring notes before using physical hardware.`); setStatus("Example loaded · local only"); setSerial((s) => [...s, `[example] Loaded ${example.label}. No device connected.`].slice(-12)); }
 const lesson = LESSONS.find((l) => l.id === lessonId) ?? LESSONS[1];
 const filteredProjects = useMemo(() => PROJECTS.filter((p) => (filter === "All" || p.level === filter) && `${p.title} ${p.copy} ${p.tags}`.toLowerCase().includes(search.trim().toLowerCase())), [filter, search]);
 const jump = (id: string) => window.document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
 function verify() { if (!/\bvoid\s+setup\s*\(/.test(sketch) || !/\bvoid\s+loop\s*\(/.test(sketch)) { setCheck("Add both setup() and loop() before testing the sketch."); setStatus("Check needed"); return false; } if ((sketch.match(/\{/g) ?? []).length !== (sketch.match(/\}/g) ?? []).length) { setCheck("Opening and closing braces do not match. Check your code blocks."); setStatus("Check needed"); return false; } setCheck("Basic structure checks passed. This is a pattern check, not a C++ compiler."); setStatus("Structure checked"); return true; }
 function run() { if (!verify()) { setSerial((s) => [...s, "[check] Sketch structure needs attention."].slice(-12)); return; } const lines = [`[${board}] Local simulation started. No device connected.`, /digitalWrite\s*\(/.test(sketch) ? "Output call detected: digitalWrite()" : "Output behavior is outside the supported subset.", /delay\s*\(/.test(sketch) ? "delay() detected. Timing is illustrative." : "No delay() call detected.", /Serial\.println\s*\(/.test(sketch) ? "Serial output call detected." : "Try adding Serial.println().", "Simulation finished. Firmware was not compiled or uploaded."]; setSerial((s) => [...s, ...lines].slice(-12)); if (/digitalWrite\s*\(/.test(sketch)) setLed((v) => !v); setStatus("Simulation complete · local only"); }
 function ask(q = question) { const text = q.trim().toLowerCase(); if (!text) { setAnswer("Type a question or choose a starter topic."); return; } setAnswer(GUIDE.find((g) => g.keys.some((k) => text.includes(k)))?.answer ?? "Try asking about setup()/loop(), pins and GPIO, LED resistors, ESP32 voltage, serial output, or the limits of this local simulator. This is an offline reference, not a connected AI service."); }
 function complete(id: string) { setDone((items) => items.includes(id) ? items : [...items, id]); setQuiz("Lesson marked complete. Progress is saved in this browser."); }
 return <>
  {devOpen && <div className="dev-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeDev(); }}>
   <aside className="dev-drawer" role="dialog" aria-modal="true" aria-labelledby="dev-title">
    <div className="dev-drawer-head"><span className="dev-mark"><Code2 size={19} /></span><div><p className="eyebrow">MICROLAB STUDIO</p><h2 id="dev-title">Developer options</h2></div><button className="dev-close" onClick={closeDev} aria-label="Close developer options"><X size={20} /></button></div>
    <p className="dev-intro">Manage lessons, code examples and theme previews. Publishing is protected by your GitHub account through Pages CMS.</p>
    <div className="dev-tabs" role="tablist" aria-label="Developer settings">{[{id:"content",label:"Content"},{id:"theme",label:"Theme"},{id:"publish",label:"Admin access"}].map((tab)=><button key={tab.id} role="tab" aria-selected={devTab===tab.id} className={devTab===tab.id?"active":""} onClick={()=>setDevTab(tab.id)}>{tab.label}</button>)}</div>
    {devTab === "content" && <div className="dev-panel"><div className="dev-panel-title"><Code2 size={18}/><div><b>Edit lessons and quizzes</b><small>Structured forms for all 12 lessons</small></div></div><a className="dev-primary" href="https://app.pagescms.org/nivethlakshman5-design/microlab-studio/main/file/learning-content" target="_blank" rel="noreferrer">Open content editor <ExternalLink size={15}/></a><div className="dev-panel-title"><Code2 size={18}/><div><b>Edit code examples</b><small>Arduino Uno and ESP32 sketches</small></div></div><a className="dev-secondary" href="https://app.pagescms.org/nivethlakshman5-design/microlab-studio/main/file/code-examples" target="_blank" rel="noreferrer">Manage code examples <ArrowUpRight size={15}/></a><div className="dev-note">CMS saves changes to GitHub. The existing GitHub Pages workflow then deploys the site.</div></div>}
    {devTab === "theme" && <div className="dev-panel"><p className="dev-section-caption">LIVE LOCAL THEME PREVIEW</p><label className="dev-color-field">Accent color <span><input type="color" value={accentDraft} onChange={(e)=>{setAccentDraft(e.target.value);document.documentElement.style.setProperty("--accent",e.target.value);setSavedTheme(false);}}/><code>{accentDraft}</code></span></label><label className="dev-color-field">Forest color <span><input type="color" value={forestDraft} onChange={(e)=>{setForestDraft(e.target.value);document.documentElement.style.setProperty("--forest",e.target.value);setSavedTheme(false);}}/><code>{forestDraft}</code></span></label><label className="dev-color-field">Text color <span><input type="color" value={inkDraft} onChange={(e)=>{setInkDraft(e.target.value);document.documentElement.style.setProperty("--ink",e.target.value);setSavedTheme(false);}}/><code>{inkDraft}</code></span></label><label className="dev-color-field">Page background <span><input type="color" value={paperDraft} onChange={(e)=>{setPaperDraft(e.target.value);document.documentElement.style.setProperty("--paper",e.target.value);document.body.style.backgroundColor=e.target.value;setSavedTheme(false);}}/><code>{paperDraft}</code></span></label><button className="dev-primary" onClick={()=>{try{localStorage.setItem("microlab-theme-preview",JSON.stringify({accent:accentDraft,forest:forestDraft,ink:inkDraft,paper:paperDraft}));setSavedTheme(true);}catch{} }}><Check size={16}/> Save preview on this device</button><button className="dev-secondary" onClick={()=>{setAccentDraft("#d74455");setForestDraft("#28584b");setInkDraft("#172321");setPaperDraft("#f2f4f2");document.documentElement.style.setProperty("--accent","#d74455");document.documentElement.style.setProperty("--forest","#28584b");document.documentElement.style.setProperty("--ink","#172321");document.documentElement.style.setProperty("--paper","#f2f4f2");document.body.style.backgroundColor="#f2f4f2";try{localStorage.removeItem("microlab-theme-preview");}catch{}setSavedTheme(false);}}>Reset theme preview</button>{savedTheme&&<p className="dev-success"><Check size={14}/> Preview saved in this browser only.</p>}<p className="dev-note">These controls preview colors in this browser; they do not publish site-wide changes yet.</p></div>}
    {devTab === "publish" && <div className="dev-panel"><div className="dev-panel-title"><LockKeyhole size={19}/><div><b>Secure administrator sign-in</b><small>Use your own account credentials only on the trusted login provider</small></div></div><p className="dev-note">MicroLab Studio is a static GitHub Pages site, so it cannot securely verify an email/password itself. This menu never collects or stores your password. Pages CMS handles sign-in and repository permissions.</p><a className="dev-primary" href="https://app.pagescms.org/nivethlakshman5-design/microlab-studio/main/file/learning-content" target="_blank" rel="noreferrer">Sign in to admin editor <ExternalLink size={15}/></a><a className="dev-secondary" href="https://github.com/settings/security" target="_blank" rel="noreferrer">Manage GitHub account security <ArrowUpRight size={15}/></a></div>}
    <div className="dev-drawer-foot"><span className="dev-status-dot"/> GitHub Pages · standalone hosting <a href="https://github.com/nivethlakshman5-design/microlab-studio" target="_blank" rel="noreferrer">Repository <ExternalLink size={12}/></a></div>
   </aside>
  </div>}
  <StudioOverview board={board} done={done} progress={progress} jump={jump} setLessonId={selectLesson} />
  <CodePanel board={board} setBoard={setBoard} loadExample={loadExample} sketch={sketch} setSketch={setSketch} serial={serial} setSerial={setSerial} status={status} check={check} setCheck={setCheck} verify={verify} run={run} reset={() => { setSketch(STARTER); setCheck("Starter sketch restored."); setStatus("Ready for a local simulation"); }} />
  <LearnPanel loadExample={loadExample} done={done} lesson={lesson} lessonId={lessonId} setLessonId={selectLesson} choice={choice} setChoice={setChoice} quiz={quiz} setQuiz={setQuiz} complete={complete} jump={jump} />
  <VirtualLabPanel board={board} setBoard={setBoard} led={led} setLed={setLed} pressed={pressed} setPressed={setPressed} parts={parts} setParts={setParts} status={status} setStatus={setStatus} setSerial={setSerial} />
  <CircuitBuilder />
  <BuildLabPanel />
  <ProjectsPanel loadExample={loadExample} filtered={filteredProjects} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} setLessonId={selectLesson} jump={jump} />
  <GuidePanel question={question} setQuestion={setQuestion} answer={answer} ask={ask} />
  <DocsPanel reset={() => { try { window.localStorage.removeItem(STORAGE_KEY); } catch {} setDone([]); setSketch(STARTER); setParts(["LED", "Resistor"]); setBoard("Arduino Uno"); setCheck("Local workspace reset."); }} />
 </>;
}
