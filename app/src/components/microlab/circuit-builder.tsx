import { useMemo, useState } from "react";
import { BatteryCharging, CheckCircle2, CircleOff, Lightbulb, Plus, RotateCcw, Zap } from "lucide-react";
import "./circuit-builder.css";

type Part = "LED" | "Resistor" | "Switch" | "Wire";
const parts: { name: Part; note: string }[] = [
 { name: "LED", note: "Emits light when current flows" },
 { name: "Resistor", note: "Limits current through the LED" },
 { name: "Switch", note: "Opens or closes the circuit" },
 { name: "Wire", note: "Completes the electrical path" },
];
export function CircuitBuilder() {
 const [placed, setPlaced] = useState<Part[]>(["LED", "Resistor", "Wire", "Switch"]);
 const [power, setPower] = useState(true);
 const [closed, setClosed] = useState(true);
 const [supply, setSupply] = useState("5");
 const [resistance, setResistance] = useState("220");
 const [checked, setChecked] = useState(false);
 const volts = Number(supply) || 0;
 const ohms = Number(resistance) || 0;
 const ledForward = 2;
 const complete = placed.includes("LED") && placed.includes("Resistor") && placed.includes("Wire");
 const current = complete && ohms > 0 ? Math.max(0, (volts - ledForward) / ohms * 1000) : 0;
 const lit = power && closed && complete && ohms > 0 && volts > ledForward && current <= 20;
 const diagnosis = useMemo(() => {
  if (!power) return "Power is off. Turn on the supply to test your circuit.";
  if (!placed.includes("Wire")) return "Open path: add a wire to complete the circuit.";
  if (!placed.includes("LED")) return "No LED placed. Add an LED to see the output.";
  if (!placed.includes("Resistor")) return "Safety check: add a series resistor before powering the LED.";
  if (!closed || !placed.includes("Switch")) return "The switch path is open. Add and close the switch.";
  if (ohms <= 0) return "Resistance must be greater than zero ohms.";
  if (volts <= ledForward) return "Supply voltage is too low for this simplified red LED model.";
  if (current > 20) return `Current is about ${current.toFixed(1)} mA — too high for this learning example. Increase resistance.`;
  return `Circuit complete. Estimated LED current: ${current.toFixed(1)} mA.`;
 }, [power, placed, closed, ohms, volts, current]);
 function reset() { setPlaced(["LED", "Resistor", "Wire", "Switch"]); setPower(true); setClosed(true); setSupply("5"); setResistance("220"); setChecked(false); }
 return <section id="circuit-builder" className="section-wrap circuit-builder-section">
  <div className="section-heading section-heading-row"><div><p className="eyebrow">05 / INTERACTIVE SIMULATOR</p><h2>Circuit Builder <em>Studio.</em></h2><p className="section-copy">Build a simple LED circuit, change its values, and troubleshoot faults. Everything runs locally in your browser—no hardware required.</p></div><span className="cbs-pill"><span /> LIVE SIMULATION</span></div>
  <div className="cbs-layout">
   <div className="cbs-workbench">
    <div className="cbs-topline"><span><Zap size={14}/> BREADBOARD WORKSPACE</span><span>DC · SIMPLE MODEL</span></div>
    <div className="cbs-canvas" aria-label="Live illustrative circuit diagram">
     <div className="cbs-rail"><span>+</span><i/><i/><i/><i/><i/><i/><span>−</span></div>
     <div className={`cbs-loop ${lit ? "energized" : ""}`}>
      <div className="cbs-battery"><BatteryCharging size={26}/><b>{supply}V</b><small>SUPPLY</small></div>
      <div className="cbs-component cbs-wire"><span className="cbs-wire-line"/><small>WIRE</small></div>
      {placed.includes("Resistor") && <div className="cbs-component"><div className="cbs-resistor"><i/><i/><i/><i/></div><small>{resistance} Ω</small></div>}
      {placed.includes("LED") && <div className={`cbs-component cbs-led ${lit ? "lit" : ""}`}><Lightbulb size={31}/><small>RED LED</small></div>}
      {placed.includes("Switch") && <button className={`cbs-switch ${closed ? "closed" : ""}`} onClick={() => setClosed(v => !v)} aria-label={closed ? "Open switch" : "Close switch"}><span className="cbs-switch-track"><i/></span><small>{closed ? "SWITCH CLOSED" : "SWITCH OPEN"}</small></button>}
     </div>
     <div className="cbs-canvas-foot"><span className={`cbs-led-indicator ${lit ? "on" : ""}`}/><b>{lit ? "LED ILLUMINATED" : "LED OFF"}</b><span>Illustrative current path</span></div>
    </div>
    <div className="cbs-workbench-actions"><button className="outline-button" onClick={reset}><RotateCcw size={14}/> Reset circuit</button><button className="run-button" onClick={() => setChecked(true)}><Zap size={15}/> Run checks</button></div>
    {checked && <div className={`cbs-feedback ${lit ? "success" : "warning"}`} role="status">{lit ? <CheckCircle2 size={17}/> : <CircleOff size={17}/>}<span><b>{lit ? "Circuit looks good" : "Troubleshooting hint"}</b><small>{diagnosis}</small></span></div>}
   </div>
   <aside className="cbs-side">
    <div className="cbs-panel"><div className="cbs-panel-title"><b>Component tray</b><span>{placed.length} placed</span></div><p>Add or remove components to test different circuit faults.</p><div className="cbs-parts">{parts.map(part => { const added = placed.includes(part.name); return <button key={part.name} className={`cbs-part ${added ? "added" : ""}`} onClick={() => { setPlaced(prev => added ? prev.filter(p => p !== part.name) : [...prev, part.name]); setChecked(false); }}><span className={`cbs-part-icon ${part.name.toLowerCase()}`}>{part.name === "LED" ? <Lightbulb size={18}/> : part.name === "Resistor" ? <span className="cbs-mini-resistor"/> : part.name === "Switch" ? <span className="cbs-mini-switch"/> : <span className="cbs-mini-wire"/>}</span><span><b>{part.name}</b><small>{part.note}</small></span><span className="cbs-part-add">{added ? "−" : <Plus size={15}/>}</span></button>; })}</div></div>
    <div className="cbs-panel"><div className="cbs-panel-title"><b>Power & values</b><span>Adjustable</span></div><label className="cbs-power-toggle"><span><b>Power supply</b><small>Enable or disable the circuit</small></span><button role="switch" aria-checked={power} className={`cbs-toggle ${power ? "on" : ""}`} onClick={() => {setPower(v=>!v);setChecked(false);}}><i/></button></label><label className="cbs-field">Supply voltage <span>{supply} V</span><input type="range" min="0" max="9" step="0.5" value={supply} onChange={e=>{setSupply(e.target.value);setChecked(false);}}/></label><label className="cbs-field">Series resistance <span>{resistance} Ω</span><select value={resistance} onChange={e=>{setResistance(e.target.value);setChecked(false);}}><option value="0">0 Ω (unsafe)</option><option value="100">100 Ω</option><option value="220">220 Ω</option><option value="330">330 Ω</option><option value="470">470 Ω</option><option value="1000">1 kΩ</option></select></label><div className="cbs-metric"><span>Estimated current</span><b>{current.toFixed(1)} <small>mA</small></b></div><small className="cbs-disclaimer">Educational approximation: assumes a 2 V red LED. Real components vary; this is not a hardware measurement.</small></div>
   </aside>
  </div>
 </section>;
}
