/*
  LA SCÈNE 3D, FIXÉE DERRIÈRE LA PAGE
  Le texte de la page défile par-dessus ; la scène, elle, ne bouge pas :
  c'est la caméra qui se déplace dedans.
*/
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { appareil, combien } from "../appareil";
import { Brume } from "./Brume";
import { Camera } from "./Camera";
import { ChampDePoints, placerEtoile, placerPoussiere } from "./Etoiles";
import { MotEnParticules } from "./MotEnParticules";

export function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 400, position: [0, 46, 34] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#07080c"]} />
        <Camera />
        <ChampDePoints nombre={combien(3500)} placer={placerEtoile} taille={420} couleur="#ece8df" opacite={0.9} />
        <ChampDePoints
          nombre={combien(700)}
          placer={placerPoussiere}
          taille={30}
          couleur="#f3e6c4"
          opacite={0.55}
          derive={1}
        />
        <Brume />
        <MotEnParticules />

        {/* Effets de lumière (halo doré, coins assombris, grain de film) : ordinateur seulement. */}
        {!appareil.leger && (
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur intensity={0.8} luminanceThreshold={0.45} luminanceSmoothing={0.3} />
            <Vignette offset={0.25} darkness={0.75} />
            <Noise opacity={0.035} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
