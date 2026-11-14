/*
  LE CHAMP D'ÉTOILES ET LA POUSSIÈRE QUI FLOTTE
  Un seul composant pour les deux : des milliers de points, dessinés par la carte
  graphique (un « shader »). Chaque point scintille à son propre rythme.
*/
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { appareil } from "../appareil";

const vertexShader = /* glsl */ `
  uniform float uTemps;
  uniform float uTaille;
  uniform float uPixel;
  uniform float uDerive;
  attribute float aHasard;
  varying float vEclat;

  void main() {
    vec3 p = position;
    // La poussière monte doucement et ondule ; les étoiles, elles, ne bougent pas (uDerive = 0).
    p.y += mod(uTemps * 0.15 * uDerive + aHasard * 20.0, 20.0) * uDerive;
    p.x += sin(uTemps * 0.2 + aHasard * 30.0) * 0.6 * uDerive;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // Plus le point est loin, plus il est petit (perspective).
    gl_PointSize = uTaille * uPixel * (0.4 + aHasard) / -mv.z;
    // Scintillement : chaque point a sa propre phase.
    vEclat = 0.45 + 0.55 * sin(uTemps * (0.6 + aHasard * 1.6) + aHasard * 50.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uCouleur;
  uniform float uOpacite;
  varying float vEclat;

  void main() {
    // gl_PointCoord va de 0 à 1 dans le carré du point : on en fait un disque doux.
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float doux = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(uCouleur, doux * vEclat * uOpacite);
  }
`;

interface Props {
  nombre: number;
  /** Fonction qui place un point : renvoie [x, y, z]. */
  placer: () => [number, number, number];
  taille: number;
  couleur: string;
  opacite: number;
  /** 0 = immobile (étoiles), 1 = flotte et monte (poussière). */
  derive?: number;
}

export function ChampDePoints({ nombre, placer, taille, couleur, opacite, derive = 0 }: Props) {
  const materiau = useRef<THREE.ShaderMaterial>(null);

  // useMemo : les positions sont tirées au hasard UNE seule fois, pas à chaque rendu.
  const geometrie = useMemo(() => {
    const positions = new Float32Array(nombre * 3);
    const hasards = new Float32Array(nombre);
    for (let i = 0; i < nombre; i++) {
      positions.set(placer(), i * 3);
      hasards[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aHasard", new THREE.BufferAttribute(hasards, 1));
    return g;
  }, [nombre]);

  const uniforms = useMemo(
    () => ({
      uTemps: { value: 0 },
      uTaille: { value: taille },
      uPixel: { value: Math.min(window.devicePixelRatio, 1.5) },
      uDerive: { value: appareil.mouvementReduit ? 0 : derive },
      uCouleur: { value: new THREE.Color(couleur) },
      uOpacite: { value: opacite },
    }),
    [taille, derive, couleur, opacite],
  );

  useFrame((etat) => {
    if (materiau.current && !appareil.mouvementReduit) {
      materiau.current.uniforms.uTemps.value = etat.clock.elapsedTime;
    }
  });

  return (
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
  );
}

/** Un point au hasard sur une coquille autour de la scène, surtout au-dessus des nuages. */
export function placerEtoile(): [number, number, number] {
  const rayon = 90 + Math.random() * 110;
  const theta = Math.random() * Math.PI * 2;
  // phi proche de 0 = en haut ; on évite le bas (caché par les nuages de toute façon).
  const phi = Math.acos(1 - Math.random() * 1.15);
  return [
    rayon * Math.sin(phi) * Math.cos(theta),
    rayon * Math.cos(phi),
    rayon * Math.sin(phi) * Math.sin(theta),
  ];
}

/** Un grain de poussière dans la zone où passe la caméra. */
export function placerPoussiere(): [number, number, number] {
  return [(Math.random() - 0.5) * 50, Math.random() * 14 - 4, 20 - Math.random() * 90];
}
