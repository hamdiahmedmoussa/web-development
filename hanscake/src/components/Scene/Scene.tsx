import { config } from "../../config";
import type { SceneProps } from "../../types";
import { SceneCanvas } from "./SceneCanvas";
import { SceneVideo } from "./SceneVideo";
import "./Scene.css";

/**
 * La scène du gâteau. Elle choisit entre le dessin (canvas) et la vidéo
 * selon le réglage modeScene de config.ts. Le reste du site ne voit que <Scene />.
 */
export function Scene(props: SceneProps) {
  return (
    <div className="scene">
      {config.modeScene === "video" ? <SceneVideo {...props} /> : <SceneCanvas {...props} />}
    </div>
  );
}
