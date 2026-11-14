/*
  LA MER DE NUAGES
  Deux grands plans horizontaux, l'un au-dessus de l'autre. Sur chacun, un shader
  calcule un « bruit » (des taches douces et aléatoires) qui glisse lentement :
  ça donne des nuages qui dérivent. Les bords s'effacent au loin.
*/
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { appareil } from "../appareil";

const vertexShader = /* glsl */ `
  varying vec3 vMonde;
  void main() {
    vec4 monde = modelMatrix * vec4(position, 1.0);
    vMonde = monde.xyz;
    gl_Position = projectionMatrix * viewMatrix * monde;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTemps;
  uniform float uEchelle;
  uniform float uOpacite;
  uniform vec2 uVent;
  varying vec3 vMonde;

  // Bruit de valeur : un nombre pseudo-aléatoire par case, lissé entre les cases.
  float hasard(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float bruit(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hasard(i), hasard(i + vec2(1, 0)), u.x),
               mix(hasard(i + vec2(0, 1)), hasard(i + vec2(1, 1)), u.x), u.y);
  }
  // fbm : on additionne plusieurs bruits de plus en plus fins → aspect de nuage.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * bruit(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vMonde.xz * uEchelle + uVent * uTemps;
    // On déforme le bruit avec un autre bruit : les formes deviennent plus « vaporeuses ».
    float n = fbm(p + fbm(p * 0.7 + uTemps * 0.01) * 1.6);
    float densite = smoothstep(0.32, 0.78, n);

    vec3 ombre = vec3(0.32, 0.32, 0.34);
    vec3 clair = vec3(0.81, 0.80, 0.77); // #cfccc4
    vec3 couleur = mix(ombre, clair, densite);

    // Une lueur dorée sous le nom, comme un projecteur posé sur les nuages.
    float centre = exp(-dot(vMonde.xz - vec2(0.0, 0.0), vMonde.xz - vec2(0.0, 0.0)) / 220.0);
    couleur += vec3(0.95, 0.82, 0.55) * centre * 0.35;

    // Les nuages s'effacent loin du centre : pas de bord visible.
    float distance = length(vMonde.xz - vec2(0.0, -20.0));
    float bord = 1.0 - smoothstep(55.0, 130.0, distance);

    gl_FragColor = vec4(couleur, densite * uOpacite * bord);
  }
`;

interface CoucheProps {
  hauteur: number;
  echelle: number;
  opacite: number;
  vent: [number, number];
}

function Couche({ hauteur, echelle, opacite, vent }: CoucheProps) {
  const materiau = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTemps: { value: 0 },
      uEchelle: { value: echelle },
      uOpacite: { value: opacite },
      uVent: { value: new THREE.Vector2(...vent) },
    }),
    [echelle, opacite, vent],
  );

  useFrame((etat) => {
    if (materiau.current && !appareil.mouvementReduit) {
      materiau.current.uniforms.uTemps.value = etat.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, hauteur, -20]}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        ref={materiau}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function Brume() {
  return (
    <group>
      <Couche hauteur={-0.6} echelle={0.045} opacite={0.7} vent={[0.025, 0.012]} />
      <Couche hauteur={0.5} echelle={0.07} opacite={0.22} vent={[-0.018, 0.02]} />
    </group>
  );
}
