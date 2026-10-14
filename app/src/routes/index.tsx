import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  CircuitBoard,
  Code2,
  Cpu,
  FolderKanban,
  GitBranch,
  LockKeyhole,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { StudioApp } from "@/components/microlab/studio-app";

export const Route = createFileRoute("/")({ component: MicroLabHome });

const links = [
  { label: "Workbench", href: "#workspace", icon: CircuitBoard },
  { label: "Learn", href: "#learn", icon: BookOpen },
  { label: "Code", href: "#code-studio", icon: Code2 },
  { label: "Virtual lab", href: "#virtual-lab", icon: Cpu },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "Node workshop", href: "#node-studio", icon: GitBranch },
];

function MicroLabHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [devOpen, setDevOpen] = useState(false);
  return (
    <main className="ml-app redesigned-app">
      <a className="skip-link" href="#workspace">Skip to the learning studio</a>
      <header className="site-header redesign-header">
        <a className="brand" href="#top" aria-label="MicroLab Studio home">
          <span className="brand-mark"><CircuitBoard size={22} strokeWidth={2.1} /></span>
          <span>MicroLab <b>Studio</b></span>
          <span className="brand-beta">MAKER SPACE</span>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {links.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <a href="#ai-tutor" onClick={() => setMenuOpen(false)}>Guide</a>
        </nav>
        <div className="header-actions">
          <span className="header-local-state"><i /> Local workspace</span>
          <a className="header-start" href="#workspace">Open workbench <ArrowRight size={15} /></a>
          <button className="dev-options-trigger" onClick={() => setDevOpen(true)} aria-label="Open developer options" title="Developer options"><ShieldCheck size={17} /><span>Dev</span></button>
          <button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      <section className="hero-redesign" id="top" aria-labelledby="hero-title">
        <div className="hero-grid-texture" aria-hidden="true" />
        <div className="hero-redesign-inner">
          <div className="hero-copy redesign-hero-copy">
            <div className="hero-eyebrow"><span className="hero-eyebrow-icon"><Sparkles size={14} /></span> YOUR NEXT IDEA STARTS HERE <span className="hero-eyebrow-rule" /> LAB 001</div>
            <h1 id="hero-title">Small circuits.<br /><em>Big ideas.</em></h1>
            <p className="hero-description">A hands-on workspace to learn electronics, write code, test circuit ideas, and build your first robot — one experiment at a time.</p>
            <div className="hero-actions">
              <a className="hero-primary-action" href="#workspace">Enter the workbench <ArrowRight size={17} /></a>
              <a className="hero-secondary-action" href="#learn"><span className="hero-play-icon"><BookOpen size={16} /></span> Start with a lesson</a>
            </div>
            <div className="hero-trust-row"><span><CheckCircle2 size={15} /> Beginner friendly</span><span><CheckCircle2 size={15} /> No hardware required</span><span><CheckCircle2 size={15} /> Saves in this browser</span></div>
          </div>

          <div className="hero-visual redesign-hero-visual" aria-label="Illustration of a simulated electronics workbench">
            <div className="hero-float-label hero-float-top"><span className="hero-float-dot" /> SIMULATOR ONLINE <span className="hero-float-live">LIVE</span></div>
            <div className="hero-console">
              <div className="hero-console-head"><div className="hero-window-dots"><i /><i /><i /></div><span className="hero-console-title"><CircuitBoard size={14} /> CIRCUIT PLAYGROUND <span>/</span> 01</span><span className="hero-console-menu">•••</span></div>
              <div className="hero-console-body">
                <div className="hero-canvas-label"><span>01 — LED STARTER CIRCUIT</span><span>VIEW / TOP</span></div>
                <div className="hero-circuit-stage">
                  <svg className="hero-wiring" viewBox="0 0 520 300" preserveAspectRatio="none" aria-hidden="true"><path d="M82 119 H146 V78 H215 V93 H269" /><path d="M82 180 H122 V225 H327 V205" /><path d="M336 107 H393 V150 H449" /><path d="M338 202 H393 V241 H449" /><circle cx="269" cy="93" r="4"/><circle cx="327" cy="205" r="4"/><circle cx="449" cy="150" r="4"/><circle cx="449" cy="241" r="4"/></svg>
                  <div className="hero-led-module"><div className="hero-led-halo" /><div className="hero-led-bulb"><span /></div><span className="hero-part-name">LED · D13</span><span className="hero-part-meta">DIGITAL OUT</span></div>
                  <div className="hero-resistor"><span /><i /><span /></div>
                  <div className="hero-board"><div className="hero-board-usb"><span /></div><div className="hero-board-power"><i /><i /><i /></div><div className="hero-board-brand">MICRO<span>LAB</span><small>UNO / R3</small></div><div className="hero-board-chip"><i /><i /><i /><i /><b>ATmega</b><b>328P</b><i /><i /><i /><i /></div><div className="hero-board-pins">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div><div className="hero-board-mount one"/><div className="hero-board-mount two"/><div className="hero-board-mount three"/><div className="hero-board-mount four"/></div>
                  <div className="hero-current-pill"><span /> SIGNAL FLOW <b>ON</b></div>
                </div>
                <div className="hero-console-footer"><span><i /> SIMULATED OUTPUT</span><span>PIN 13 <b>·</b> HIGH <b>·</b> 1000 ms</span></div>
              </div>
            </div>
            <div className="hero-float-card"><span className="hero-float-card-icon"><Zap size={17} fill="currentColor" /></span><span><b>First light</b><small>Your first working circuit</small></span><span className="hero-float-card-check"><CheckCircle2 size={17} /></span></div>
            <span className="hero-visual-index">FIG 01 <i /> BUILD · TEST · REPEAT</span>
          </div>
        </div>
        <div className="hero-bottom-line"><span>LEARN BY MAKING</span><span className="hero-bottom-center"><i /> A FRIENDLY PLACE TO EXPERIMENT</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="intro-strip redesigned-strip" aria-label="What you can do">
        <div className="strip-cell"><span className="strip-icon"><BookOpen size={18} /></span><div><b>12 guided missions</b><span>Go from first pin to projects</span></div><span className="strip-index">01</span></div>
        <div className="strip-cell"><span className="strip-icon"><Code2 size={18} /></span><div><b>Real Arduino-style code</b><span>Write, check and run examples</span></div><span className="strip-index">02</span></div>
        <div className="strip-cell"><span className="strip-icon"><Cpu size={18} /></span><div><b>Virtual circuit lab</b><span>Explore without risking hardware</span></div><span className="strip-index">03</span></div>
        <div className="strip-cell"><span className="strip-icon"><GitBranch size={18} /></span><div><b>Build your own ideas</b><span>Explore components and nodes</span></div><span className="strip-index">04</span></div>
      </section>

      <div className="redesign-section-label"><span><i /> YOUR MAKER WORKSPACE</span><span>01—06 / EXPLORE</span></div>
      <StudioApp devOpen={devOpen} closeDev={() => setDevOpen(false)} />
      <footer className="site-footer redesigned-footer">
        <div className="footer-main-row"><a className="brand footer-brand" href="#top"><span className="brand-mark"><CircuitBoard size={22} /></span><span>MicroLab <b>Studio</b></span></a><p>Understand the signal.<br /><b>Make the next thing.</b></p><a className="footer-top-link" href="#top">BACK TO TOP <ArrowUpRight size={15} /></a></div>
        <div className="footer-meta"><span>STANDALONE LEARNING WORKSPACE</span><span><LockKeyhole size={12} /> YOUR SKETCHES STAY IN THIS BROWSER</span><span>© MICROLAB STUDIO</span></div>
      </footer>
    </main>
  );
}
