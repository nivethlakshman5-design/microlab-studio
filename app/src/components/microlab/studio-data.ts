import { Activity, BookOpen, Cpu, Power, Zap, Gauge, SlidersHorizontal, RotateCw, Radio, Wifi, Bot, GitBranch } from "lucide-react";
import learningContent from "./learning-content.json";
import codeExamplesContent from "./code-examples.json";
export type Board = "Arduino Uno" | "ESP32";
export const STORAGE_KEY = "microlab-studio-v1";
export const STARTER = `// MicroLab Studio · Blink an LED\nconst int ledPin = LED_BUILTIN;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n  Serial.println("Starting blink sketch");\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(1000);\n  digitalWrite(ledPin, LOW);\n  delay(1000);\n}`;
const lessonIcons = { Cpu, Zap, Power, Activity, Radio, SlidersHorizontal, Gauge, RotateCw, Wifi, GitBranch, Bot };
export const LESSONS = learningContent.lessons.map((lesson) => ({
  ...lesson,
  icon: lessonIcons[lesson.icon as keyof typeof lessonIcons] ?? Cpu,
}));
export const PROJECTS = [
 { id: "blink", title: "Blink an LED", level: "Beginner", time: "10 min", copy: "Your first output, one pin and a clear feedback loop.", image: `${import.meta.env.BASE_URL}assets/sections/project-led.svg`, tags: "GPIO · Timing" },
 { id: "traffic", title: "Traffic light", level: "Beginner", time: "20 min", copy: "Sequence three lights with readable timing logic.", image: `${import.meta.env.BASE_URL}assets/sections/project-traffic.svg`, tags: "Outputs · Logic" },
 { id: "distance", title: "Ultrasonic distance", level: "Intermediate", time: "30 min", copy: "Measure an echo pulse and turn time into distance.", image: `${import.meta.env.BASE_URL}assets/sections/project-sensor.svg`, tags: "Sensor · Serial" },
 { id: "wifi", title: "ESP32 status beacon", level: "Intermediate", time: "35 min", copy: "Explore Wi-Fi capability and the difference between a board and a service.", image: `${import.meta.env.BASE_URL}assets/sections/project-wifi.svg`, tags: "ESP32 · IoT" },
];
export const GUIDE = [
 { keys: ["setup", "loop"], answer: "setup() runs once after the board starts. loop() repeats while the board is powered, so put recurring behavior there." },
 { keys: ["pin", "gpio"], answer: "A pin is a physical connection. Digital pins read or drive HIGH/LOW logic. Check the exact board profile before assuming a pin number or voltage." },
 { keys: ["resistor", "led"], answer: "An LED needs a current-limiting resistor in series. The long leg is usually the anode (+); the flat package edge marks the cathode (−). Verify ratings before wiring real hardware." },
 { keys: ["esp32", "voltage", "3.3"], answer: "Most ESP32 GPIO uses 3.3 V logic and is not 5 V tolerant. Never feed 5 V into an ESP32 GPIO; use a suitable level shifter when needed." },
 { keys: ["serial", "monitor", "baud"], answer: "Serial.begin(9600) starts a serial connection at 9600 baud. The monitor's baud rate must match. Serial.println() adds a line break." },
 { keys: ["simulation", "compile", "hardware", "run"], answer: "The local checker recognizes a few common Arduino-style patterns. It does not compile firmware, connect to a board, or replace electrical safety checks." },
];

export const CODE_EXAMPLES: Record<string, { label: string; board: Board; code: string }> = Object.fromEntries(
  codeExamplesContent.examples.map(({ id, label, board, code }) => [id, { label, board: board as Board, code }]),
);
