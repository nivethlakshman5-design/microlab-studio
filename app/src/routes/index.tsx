import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BookOpen, CircuitBoard, Code2, Cpu, FolderKanban, GitBranch, Menu, X, ShieldCheck } from "lucide-react";
import { ScrollScrub } from "@/components/scroll-scrub/scroll-scrub";
import { StudioApp } from "@/components/microlab/studio-app";
import { scrollScrubScenes, scrollScrubTheme } from "@/scroll-scrub-scenes";

export const Route = createFileRoute("/")({ component: MicroLabHome });

function MicroLabHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  const links = [{ label: "Studio", href: "#workspace", icon: CircuitBoard }, { label: "Learn", href: "#learn", icon: BookOpen }, { label: "Code Studio", href: "#code-studio", icon: Code2 }, { label: "Virtual Lab", href: "#virtual-lab", icon: Cpu }, { label: "Projects", href: "#projects", icon: FolderKanban }, { label: "Node Workshop", href: "#node-studio", icon: GitBranch }];
  return <main className="ml-app">
    <a className="skip-link" href="#workspace">Skip to the learning studio</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="MicroLab Studio home"><span className="brand-mark"><CircuitBoard size={23} /></span><span>MicroLab <b>Studio</b></span></a>
      <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">{links.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}<a href="#ai-tutor" onClick={() => setMenuOpen(false)}>Guide</a></nav>
      <div className="header-actions"><a className="header-link" href="#docs">Docs <ArrowUpRight size={14} /></a><a className="header-start" href="#code-studio">Open the lab <ArrowRight size={15} /></a><button className="dev-options-trigger" onClick={() => setDevOpen(true)} aria-label="Open developer options" title="Developer options"><ShieldCheck size={18} /><span>Dev</span></button><button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
    </header>
    <div id="top" className="journey-intro">
      <div className="journey-overline"><span className="live-dot" /> THE MAKER'S JOURNEY <span className="overline-rule" /> SCROLL TO EXPLORE</div>
      <ScrollScrub scenes={scrollScrubScenes} theme={scrollScrubTheme} className="microlab-scroll" />
      <div className="journey-footer"><span>FROM FIRST PIN TO FIRST LIGHT</span><span className="scroll-cue">KEEP SCROLLING <b>↓</b></span><span>01 / 05</span></div>
    </div>
    <section className="intro-strip" aria-label="What you can do"><div className="strip-cell"><span className="strip-icon"><Code2 size={19} /></span><div><b>Write real sketches</b><span>Arduino-style C++ examples</span></div></div><div className="strip-cell"><span className="strip-icon"><CircuitBoard size={19} /></span><div><b>Explore circuits</b><span>Try virtual behaviors</span></div></div><div className="strip-cell"><span className="strip-icon"><BookOpen size={19} /></span><div><b>Learn by doing</b><span>Short lessons and checks</span></div></div><div className="strip-cell"><span className="strip-icon"><Cpu size={19} /></span><div><b>Arduino + ESP32</b><span>Choose a board profile</span></div></div></section>
    <StudioApp devOpen={devOpen} closeDev={() => setDevOpen(false)} />
    <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><CircuitBoard size={22} /></span><span>MicroLab <b>Studio</b></span></a><p>Learn the signal. Understand the circuit. Make the next thing.</p><div className="footer-meta"><span>STANDALONE LEARNING WORKSPACE</span><a href="#top">BACK TO TOP ↑</a><span>© MicroLab Studio</span></div></footer>
  </main>;
}
