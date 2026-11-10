import { useEffect, useRef } from "react";
import { config } from "../../config";
import type { SceneProps } from "../../types";

/**
 * Option B : une vidéo dont la lecture suit le défilement.
 *
 * Pour l'activer : placer la vidéo dans public/video/ puis écrire
 * modeScene: "video" dans src/config.ts.
 *
 * Conseils pour la vidéo : courte (5 à 8 s), sans son, légère (moins de 3 Mo),
 * et exportée avec « une image clé par image » pour que l'avance soit fluide.
 * Une vidéo ne peut pas changer de couleur : avec cette option, les choix du
 * client apparaissent dans le texte et le récapitulatif, pas dans l'image.
 */
export function SceneVideo({ progression }: SceneProps) {
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = refVideo.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = progression * video.duration;
  }, [progression]);

  return (
    <video
      ref={refVideo}
      className="scene__media scene__media--video"
      src={config.videoScene}
      muted
      playsInline
      preload="auto"
      aria-label="Vidéo : un gâteau se construit couche après couche."
    />
  );
}
