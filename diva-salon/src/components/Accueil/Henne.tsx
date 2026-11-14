import { motion, useReducedMotion } from "motion/react";

/*
  UN MOTIF DE HENNÉ QUI SE DESSINE
  C'est le seul effet animé de l'ouverture : les traits apparaissent l'un après
  l'autre, comme tracés au cône. Motion anime « pathLength » de 0 à 1
  (la part du trait déjà dessinée). Sans animation si « moins d'animations ».
*/
const TRAITS = [
  // la tige centrale et ses feuilles
  "M150 330 C150 270 150 220 150 160",
  "M150 260 C120 250 104 228 104 200 C130 206 146 226 150 260",
  "M150 260 C180 250 196 228 196 200 C170 206 154 226 150 260",
  "M150 200 C126 192 114 172 116 150 C138 158 148 176 150 200",
  "M150 200 C174 192 186 172 184 150 C162 158 152 176 150 200",
  // la fleur du haut
  "M150 160 C130 140 128 110 150 84 C172 110 170 140 150 160",
  "M150 150 C122 146 100 126 98 98 C126 104 144 122 150 150",
  "M150 150 C178 146 200 126 202 98 C174 104 156 122 150 150",
  // la goutte et les points
  "M150 84 C146 70 146 62 150 52 C154 62 154 70 150 84",
  "M150 40 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0",
  "M118 80 m-2.5 0 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0",
  "M182 80 m-2.5 0 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0",
  // les volutes en bas
  "M150 330 C120 330 96 312 96 290 C96 276 108 268 120 272",
  "M150 330 C180 330 204 312 204 290 C204 276 192 268 180 272",
];

export function Henne() {
  const reduit = useReducedMotion();
  return (
    <svg className="henne" viewBox="40 30 220 310" aria-hidden="true">
      {TRAITS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: reduit ? 1 : 0, opacity: reduit ? 1 : 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduit ? 0 : 1.1, delay: reduit ? 0 : 0.3 + i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
