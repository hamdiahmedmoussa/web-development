/*
  LA PIÈCE ET LE DRONE EN 3D
  À chaque image (useFrame), on lit la commande finale, on fait avancer la simulation,
  puis on place le modèle 3D du drone là où la simulation dit qu'il est.
*/
import { Grid, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { mettreAJour, PIECE, type Phase } from "../drone/simulateur";
import { commandeFinale, pilotage } from "../pilotage";

const COULEUR_PHASE: Record<Phase, string> = {
  pose: "#64748b",
  decollage: "#facc15",
  vol: "#22c55e",
  atterrissage: "#f97316",
};

/** Les quatre bras du drone, en croix (X). */
const BRAS = [45, 135, 225, 315].map((deg) => (deg * Math.PI) / 180);

function Drone() {
  const groupe = useRef<THREE.Group>(null);
  const helices = useRef<(THREE.Mesh | null)[]>([]);
  const voyant = useRef<THREE.MeshBasicMaterial>(null);
  const ombre = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // dt limité : si l'onglet était en arrière-plan, on évite un « saut » énorme.
    const dt = Math.min(delta, 0.05);
    const d = mettreAJour(pilotage.drone, commandeFinale(), dt);
    pilotage.drone = d;
    if (d.phase === "pose") pilotage.urgence = false; // l'urgence est terminée une fois posé

    const g = groupe.current;
    if (!g) return;
    g.position.set(d.x, d.altitude + 0.1, 0);
    // Un vrai drone se penche dans le sens où il avance.
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -d.vx * 0.18, 0.2);

    const vitesseRotor = d.phase === "pose" ? 0 : 40;
    helices.current.forEach((h, i) => h && (h.rotation.y += vitesseRotor * dt * (i % 2 ? 1 : -1)));
    voyant.current?.color.set(COULEUR_PHASE[d.phase]);

    // Ombre au sol : plus le drone est haut, plus elle est grande et pâle.
    if (ombre.current) {
      ombre.current.position.x = d.x;
      ombre.current.scale.setScalar(1 + d.altitude * 0.4);
      (ombre.current.material as THREE.MeshBasicMaterial).opacity = 0.35 / (1 + d.altitude);
    }
  });

  return (
    <>
      <mesh ref={ombre} rotation-x={-Math.PI / 2} position-y={0.005}>
        <circleGeometry args={[0.55, 32]} />
        <meshBasicMaterial color="#000" transparent opacity={0.35} />
      </mesh>

      {/* Agrandi pour bien le voir à l'écran (la simulation, elle, reste en mètres réels). */}
      <group ref={groupe} scale={1.8}>
        {/* Corps */}
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.07, 0.22]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Voyant : sa couleur indique la phase (gris = posé, vert = en vol…) */}
        <mesh position={[0, 0.045, 0.08]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshBasicMaterial ref={voyant} color={COULEUR_PHASE.pose} />
        </mesh>

        {BRAS.map((angle, i) => {
          const x = Math.cos(angle) * 0.22;
          const z = Math.sin(angle) * 0.22;
          return (
            <group key={angle}>
              <mesh position={[x / 2, 0, z / 2]} rotation-y={-angle}>
                <boxGeometry args={[0.24, 0.025, 0.03]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
              {/* Moteur */}
              <mesh position={[x, 0.03, z]}>
                <cylinderGeometry args={[0.025, 0.025, 0.05, 16]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
              {/* Hélice : un disque fin et transparent qui tourne */}
              <mesh ref={(m) => (helices.current[i] = m)} position={[x, 0.06, z]}>
                <boxGeometry args={[0.2, 0.004, 0.025]} />
                <meshStandardMaterial color="#94a3b8" transparent opacity={0.85} />
              </mesh>
            </group>
          );
        })}
      </group>
    </>
  );
}

/** Les limites de la pièce (murs et plafond) : le drone ne peut pas en sortir. */
function Limites() {
  const l = PIECE.demiLargeur;
  const h = PIECE.plafond;
  return (
    <Line
      points={[[-l, 0, 0], [-l, h, 0], [l, h, 0], [l, 0, 0]]}
      color="#475569"
      lineWidth={1}
      dashed
      dashSize={0.15}
      gapSize={0.1}
    />
  );
}

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 1.6, 5.2], fov: 50 }} dpr={[1, 2]} onCreated={({ camera }) => camera.lookAt(0, 0.9, 0)}>
      <color attach="background" args={["#0b1220"]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.4} />
      <Grid
        args={[12, 12]}
        cellSize={0.5}
        cellColor="#1e293b"
        sectionSize={1}
        sectionColor="#334155"
        fadeDistance={14}
        infiniteGrid
      />
      <Limites />
      <Drone />
    </Canvas>
  );
}
