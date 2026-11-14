/*
  « PORTFOLIO » QUI SE FORME, SE DISPERSE, PUIS DEVIENT « HAMDI »
  Chaque particule connaît trois positions :
    - aDepart : dans la brume, en bas (d'où elle monte) ;
    - aMot1   : sa place dans « PORTFOLIO » ;
    - aMot2   : sa place dans « HAMDI ».
  Le shader passe de l'une à l'autre selon deux réglages, uForme1 et uForme2 (de 0 à 1).
  Chaque particule part avec un petit retard différent : effet de sable qui s'assemble.
*/
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { appareil, combien } from "../appareil";
import { intro } from "../data";
import { pointsDuMot } from "./echantillonner";
import { horloge, lisse } from "./horloge";

const vertexShader = /* glsl */ `
  uniform float uTemps;
  uniform float uForme1;
  uniform float uForme2;
  uniform float uTaille;
  uniform float uPixel;
  uniform float uCalme;
  uniform float uEchelle;
  attribute vec3 aDepart;
  attribute vec3 aMot1;
  attribute vec3 aMot2;
  attribute float aHasard;
  varying float vHasard;
  varying float vEclat;

  // Progression propre à chaque particule : elle démarre avec un retard (0 à 0,45).
  float etape(float t, float h) {
    float retard = h * 0.45;
    return smoothstep(retard, retard + 0.55, t);
  }

  void main() {
    float a = etape(uForme1, aHasard);
    float b = etape(uForme2, fract(aHasard * 7.31));

    // 1. De la brume vers « PORTFOLIO ».
    vec3 p = mix(aDepart, aMot1, a);
    // 2. Vers « HAMDI », en passant par un nuage dispersé (au milieu de la transition).
    float milieu = sin(b * 3.14159);
    vec3 eclatement = normalize(aMot1 + vec3(0.001)) * 2.5 + (aDepart - aMot1) * 0.12;
    p = mix(p, aMot2, b) + eclatement * milieu;

    // Agitation : forte pendant les transitions, presque nulle quand le mot est formé.
    float agitation = (0.025 + 0.9 * milieu + 1.2 * (1.0 - a)) * uCalme;
    p.x += sin(uTemps * 0.7 + aHasard * 40.0) * agitation;
    p.y += cos(uTemps * 0.9 + aHasard * 31.0) * agitation;
    p.z += sin(uTemps * 0.5 + aHasard * 17.0) * agitation;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // Si le mot est réduit (téléphone), les particules le sont aussi : sinon elles se chevauchent.
    gl_PointSize = uTaille * uEchelle * uPixel * (0.55 + aHasard * 0.9) / -mv.z;

    vHasard = aHasard;
    vEclat = 0.65 + 0.35 * sin(uTemps * 2.2 + aHasard * 60.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vHasard;
  varying float vEclat;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float doux = smoothstep(0.5, 0.05, d);
    // 3 particules sur 4 dorées (or pâle), 1 sur 4 argentée.
    vec3 or = vec3(0.98, 0.84, 0.58);
    vec3 argent = vec3(0.80, 0.82, 0.88);
    vec3 couleur = mix(or, argent, step(0.75, vHasard));
    gl_FragColor = vec4(couleur * (0.75 + vEclat * 0.35), doux * vEclat * 0.6);
  }
`;

/** Les moments de l'intro, en secondes depuis l'ouverture de la page. */
const TEMPS = {
  debutMot1: 0.8,
  dureeMot1: 2.8,
  debutMot2: 5.2,
  dureeMot2: 2.8,
};
/** Durée totale de l'intro : l'interface apparaît après. */
export const FIN_INTRO = TEMPS.debutMot2 + TEMPS.dureeMot2;

/** Largeur des mots dans la scène, en unités 3D. */
const LARGEUR_MOT1 = 20;
const LARGEUR_MOT2 = 15;

export function MotEnParticules() {
  const nombre = combien(24000);
  const [formes, setFormes] = useState<{ mot1: Float32Array; mot2: Float32Array } | null>(null);
  const groupe = useRef<THREE.Group>(null);
  const materiau = useRef<THREE.ShaderMaterial>(null);
  const { camera, size } = useThree();

  // On calcule les points des deux mots une fois la police chargée.
  useEffect(() => {
    let annule = false;
    Promise.all([
      pointsDuMot(intro.mot1, nombre, LARGEUR_MOT1, "Instrument Serif"),
      pointsDuMot(intro.mot2, nombre, LARGEUR_MOT2, "Instrument Serif"),
    ]).then(([mot1, mot2]) => {
      if (!annule) setFormes({ mot1, mot2 });
    });
    return () => {
      annule = true;
    };
  }, [nombre]);

  const geometrie = useMemo(() => {
    if (!formes) return null;
    const depart = new Float32Array(nombre * 3);
    const hasards = new Float32Array(nombre);
    for (let i = 0; i < nombre; i++) {
      // Départ : étalé dans la brume, sous le mot.
      depart[i * 3] = (Math.random() - 0.5) * 60;
      depart[i * 3 + 1] = -5.5 - Math.random() * 2;
      depart[i * 3 + 2] = (Math.random() - 0.5) * 40;
      hasards[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    // « position » est obligatoire pour Three.js ; le shader utilise les trois autres.
    g.setAttribute("position", new THREE.BufferAttribute(formes.mot2, 3));
    g.setAttribute("aDepart", new THREE.BufferAttribute(depart, 3));
    g.setAttribute("aMot1", new THREE.BufferAttribute(formes.mot1, 3));
    g.setAttribute("aMot2", new THREE.BufferAttribute(formes.mot2, 3));
    g.setAttribute("aHasard", new THREE.BufferAttribute(hasards, 1));
    return g;
  }, [formes, nombre]);

  const uniforms = useMemo(
    () => ({
      uTemps: { value: 0 },
      uForme1: { value: appareil.mouvementReduit ? 1 : 0 },
      uForme2: { value: appareil.mouvementReduit ? 1 : 0 },
      uTaille: { value: 0.045 },
      uPixel: { value: Math.min(window.devicePixelRatio, 1.5) * 1000 },
      uCalme: { value: appareil.mouvementReduit ? 0 : 1 },
      uEchelle: { value: 1 },
    }),
    [],
  );

  useFrame((etat) => {
    const m = materiau.current;
    if (!m) return;
    if (!appareil.mouvementReduit) {
      const t = horloge.depuisDebut();
      m.uniforms.uTemps.value = etat.clock.elapsedTime;
      m.uniforms.uForme1.value = lisse((t - TEMPS.debutMot1) / TEMPS.dureeMot1);
      m.uniforms.uForme2.value = lisse((t - TEMPS.debutMot2) / TEMPS.dureeMot2);
    }

    // Sur un écran étroit (téléphone), on réduit le mot pour qu'il tienne en largeur.
    if (groupe.current) {
      const cam = camera as THREE.PerspectiveCamera;
      const distance = cam.position.distanceTo(groupe.current.position);
      const largeurVisible =
        2 * distance * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * (size.width / size.height);
      const echelle = Math.min(1, (largeurVisible * 0.86) / LARGEUR_MOT1);
      groupe.current.scale.setScalar(echelle);
      // Un peu moins réduites que le mot, pour rester lisibles sur un petit écran.
      m.uniforms.uEchelle.value = Math.sqrt(echelle);
    }
  });

  if (!geometrie) return null;

  return (
    // Le mot flotte au-dessus des nuages, légèrement penché vers l'arrière.
    <group ref={groupe} position={[0, 4.6, 0]} rotation-x={-0.1}>
      <points geometry={geometrie} frustumCulled={false}>
        <shaderMaterial
          ref={materiau}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
