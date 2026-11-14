/*
  LA CAMÉRA : LE « VOYAGE »
  1. Intro : la caméra part de très haut (dans les étoiles) et plonge vers la mer de nuages.
  2. Ensuite, c'est le défilement qui la fait avancer, d'une « station » à la suivante.
     Les stations des prochaines sections seront ajoutées dans STATIONS.
  3. La souris la fait légèrement pivoter (parallaxe), pour donner de la profondeur.
*/
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { appareil } from "../appareil";
import { defilement, souris } from "../defilement";
import { horloge, lisse } from "./horloge";

type Vec = [number, number, number];
interface Station {
  /** Progression du défilement (0 à 1) à laquelle la caméra est à cette station. */
  a: number;
  position: Vec;
  /** Le point que la caméra regarde. */
  cible: Vec;
}

/** Les stations de la caméra, dans l'ordre du défilement. */
const STATIONS: Station[] = [
  { a: 0, position: [0, 2.6, 17], cible: [0, 3.9, 0] },
  { a: 0.22, position: [0, 2.9, 10.5], cible: [0, 3.6, -12] },
  { a: 1, position: [0, 3.2, -70], cible: [0, 3, -100] },
];

/** Point de départ de l'intro : haut dans le ciel, regard vers les nuages. */
const DEPART = { position: new THREE.Vector3(0, 46, 34), cible: new THREE.Vector3(0, 0, -6) };
const DUREE_PLONGEE = 4.6;

const pos = new THREE.Vector3();
const cible = new THREE.Vector3();
const a = new THREE.Vector3();
const b = new THREE.Vector3();

/** Position et cible de la caméra pour une progression donnée, entre deux stations. */
function surLeTrajet(p: number) {
  let i = 0;
  while (i < STATIONS.length - 2 && p > STATIONS[i + 1].a) i++;
  const s1 = STATIONS[i];
  const s2 = STATIONS[i + 1];
  const t = lisse((p - s1.a) / (s2.a - s1.a));
  pos.lerpVectors(a.set(...s1.position), b.set(...s2.position), t);
  cible.lerpVectors(a.set(...s1.cible), b.set(...s2.cible), t);
}

export function Camera() {
  const { camera } = useThree();
  const regard = useRef(new THREE.Vector3(0, 4, 0));
  const parallaxe = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    surLeTrajet(defilement.progression);

    // Pendant l'intro, on part du ciel et on rejoint le trajet.
    const k = appareil.mouvementReduit ? 1 : lisse(horloge.depuisDebut() / DUREE_PLONGEE);
    pos.lerpVectors(DEPART.position, pos, k);
    cible.lerpVectors(DEPART.cible, cible, k);

    // Parallaxe : la souris décale un peu le regard (environ 2 à 3 degrés).
    if (!appareil.mouvementReduit) {
      const amorti = 1 - Math.exp(-delta * 2.5);
      parallaxe.current.x += (souris.x - parallaxe.current.x) * amorti;
      parallaxe.current.y += (souris.y - parallaxe.current.y) * amorti;
      pos.x += parallaxe.current.x * 0.6;
      pos.y -= parallaxe.current.y * 0.25;
    }

    camera.position.copy(pos);
    regard.current.copy(cible);
    camera.lookAt(regard.current);
  });

  return null;
}
