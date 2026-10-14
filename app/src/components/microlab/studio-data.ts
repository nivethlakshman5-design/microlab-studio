import { Activity, BookOpen, Cpu, Power, Zap } from "lucide-react";
export type Board = "Arduino Uno" | "ESP32";
export const STORAGE_KEY = "microlab-studio-v1";
export const STARTER = `// MicroLab Studio · Blink an LED\nconst int ledPin = LED_BUILTIN;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n  Serial.println("Starting blink sketch");\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(1000);\n  digitalWrite(ledPin, LOW);\n  delay(1000);\n}`;
export const LESSONS = [
 { id: "start", n: "01", title: "Meet your board", level: "Beginner", time: "8 min", copy: "Find the USB port, power pins, digital pins and the processor that runs your sketch.", outcome: "Identify the board, ground, power and a digital pin.", icon: Cpu },
 { id: "blink", n: "02", title: "Blink an LED", level: "Beginner", time: "12 min", copy: "Use setup, loop, pinMode, digitalWrite and delay to make a light blink.", outcome: "Change the blink interval and explain HIGH versus LOW.", icon: Zap },
 { id: "button", n: "03", title: "Read a button", level: "Beginner", time: "15 min", copy: "Turn a physical input into a program decision with a digital read.", outcome: "Describe input pins, pull-up logic and a simple if statement.", icon: Power },
 { id: "sensor", n: "04", title: "Read a sensor", level: "Next step", time: "18 min", copy: "Connect a distance sensor and send measurements to the serial monitor.", outcome: "Trace a sensor reading from input to serial output.", icon: Activity },
];
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

export const CODE_EXAMPLES: Record<string, { label: string; board: Board; code: string }> = {
  blink: { label: "01 · Blink an LED", board: "Arduino Uno", code: `// Example 01: Blink the built-in LED\nconst int ledPin = LED_BUILTIN;\n\nvoid setup() {\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n  Serial.println("Blink example ready");\n}\n\nvoid loop() {\n  digitalWrite(ledPin, HIGH);\n  delay(500);\n  digitalWrite(ledPin, LOW);\n  delay(500);\n}` },
  traffic: { label: "02 · Traffic light", board: "Arduino Uno", code: `// Example 02: Three LEDs (use a resistor per LED)\nconst int redPin = 8;\nconst int yellowPin = 9;\nconst int greenPin = 10;\n\nvoid setup() {\n  pinMode(redPin, OUTPUT);\n  pinMode(yellowPin, OUTPUT);\n  pinMode(greenPin, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(greenPin, HIGH);\n  delay(3000);\n  digitalWrite(greenPin, LOW);\n  digitalWrite(yellowPin, HIGH);\n  delay(1000);\n  digitalWrite(yellowPin, LOW);\n  digitalWrite(redPin, HIGH);\n  delay(3000);\n  digitalWrite(redPin, LOW);\n}` },
  button: { label: "03 · Read a button", board: "Arduino Uno", code: `// Example 03: Button between pin 2 and GND\nconst int buttonPin = 2;\nconst int ledPin = LED_BUILTIN;\n\nvoid setup() {\n  pinMode(buttonPin, INPUT_PULLUP);\n  pinMode(ledPin, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  const bool pressed = digitalRead(buttonPin) == LOW;\n  digitalWrite(ledPin, pressed ? HIGH : LOW);\n  Serial.println(pressed ? "Pressed" : "Released");\n  delay(50);\n}` },
  sensor: { label: "04 · Ultrasonic sensor", board: "Arduino Uno", code: `// Example 04: HC-SR04 (check your module voltage)\nconst int trigPin = 5;\nconst int echoPin = 6;\n\nvoid setup() {\n  pinMode(trigPin, OUTPUT);\n  pinMode(echoPin, INPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  digitalWrite(trigPin, LOW);\n  delayMicroseconds(2);\n  digitalWrite(trigPin, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(trigPin, LOW);\n  long duration = pulseIn(echoPin, HIGH, 30000);\n  float cm = duration * 0.0343 / 2.0;\n  Serial.println(cm);\n  delay(250);\n}` },
  wifi: { label: "05 · ESP32 Wi-Fi scan", board: "ESP32", code: `// Example 05: ESP32 Wi-Fi scan\n#include <WiFi.h>\n\nvoid setup() {\n  Serial.begin(115200);\n  WiFi.mode(WIFI_STA);\n  WiFi.disconnect();\n  delay(100);\n  Serial.println("Starting Wi-Fi scan");\n}\n\nvoid loop() {\n  int count = WiFi.scanNetworks();\n  Serial.printf("Networks found: %d\\n", count);\n  WiFi.scanDelete();\n  delay(10000);\n}` },
};
