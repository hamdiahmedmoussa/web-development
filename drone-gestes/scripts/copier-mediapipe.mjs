// Copie le moteur de MediaPipe (fichiers .wasm) dans public/ après chaque « npm install ».
// Ainsi le site ne dépend d'aucun site extérieur pour reconnaître la main.
import { cpSync } from "node:fs";

cpSync("node_modules/@mediapipe/tasks-vision/wasm", "public/mediapipe", { recursive: true });
console.log("MediaPipe copié dans public/mediapipe");
