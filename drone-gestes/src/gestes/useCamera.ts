/*
  LA CAMÉRA ET LA DÉTECTION DE LA MAIN
  1. On demande l'accès à la webcam (le navigateur affiche une autorisation).
  2. On charge MediaPipe et son modèle « hand_landmarker » (servis par notre propre site).
  3. À chaque image : MediaPipe trouve les 21 points de la main, on les dessine,
     on reconnaît le geste, on le stabilise, puis on écrit la commande dans « pilotage ».

  Tout se passe dans le navigateur : l'image de la caméra n'est envoyée nulle part.
*/
import { DrawingUtils, FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef, useState } from "react";
import { pilotage } from "../pilotage";
import { reconnaitre, versCommande, type Point } from "./reconnaitre";
import { nouvelEtat, stabiliser } from "./stabiliser";

export type StatutCamera = "arret" | "chargement" | "active" | "erreur";

async function creerDetecteur(): Promise<HandLandmarker> {
  const moteur = await FilesetResolver.forVisionTasks("/mediapipe");
  const options = (delegate: "GPU" | "CPU") => ({
    baseOptions: { modelAssetPath: "/modeles/hand_landmarker.task", delegate },
    runningMode: "VIDEO" as const,
    numHands: 1,
  });
  try {
    // La carte graphique (GPU) est beaucoup plus rapide…
    return await HandLandmarker.createFromOptions(moteur, options("GPU"));
  } catch {
    // …mais certains ordinateurs ne la permettent pas : on se rabat sur le processeur.
    return await HandLandmarker.createFromOptions(moteur, options("CPU"));
  }
}

export function useCamera() {
  const video = useRef<HTMLVideoElement>(null);
  const dessin = useRef<HTMLCanvasElement>(null);
  const [statut, setStatut] = useState<StatutCamera>("arret");
  const [erreur, setErreur] = useState("");
  const arret = useRef<() => void>(() => {});

  const demarrer = useCallback(async () => {
    setStatut("chargement");
    setErreur("");
    try {
      const flux = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
        audio: false,
      });
      const v = video.current!;
      v.srcObject = flux;
      await v.play();
      const detecteur = await creerDetecteur();

      const canvas = dessin.current!;
      canvas.width = v.videoWidth;
      canvas.height = v.videoHeight;
      const ctx = canvas.getContext("2d")!;
      const outils = new DrawingUtils(ctx);

      let etat = nouvelEtat(performance.now() / 1000);
      let derniereImage = -1;
      let image = 0;

      const boucle = () => {
        // On n'analyse que les nouvelles images de la caméra (pas deux fois la même).
        if (v.currentTime !== derniereImage) {
          derniereImage = v.currentTime;
          const maintenant = performance.now();
          const resultat = detecteur.detectForVideo(v, maintenant);
          const main: Point[] | null = resultat.landmarks[0] ?? null;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (main) {
            outils.drawConnectors(resultat.landmarks[0], HandLandmarker.HAND_CONNECTIONS, {
              color: "#7dd3fc",
              lineWidth: 3,
            });
            outils.drawLandmarks(resultat.landmarks[0], { color: "#f8fafc", radius: 3 });
          }

          etat = stabiliser(etat, reconnaitre(main), maintenant / 1000);
          pilotage.gesteConfirme = etat.confirme;
          pilotage.mainPerdue = etat.mainPerdue;
          pilotage.commandeMain = versCommande(etat.confirme, main);
        }
        image = requestAnimationFrame(boucle);
      };
      image = requestAnimationFrame(boucle);
      pilotage.cameraActive = true;
      setStatut("active");

      arret.current = () => {
        cancelAnimationFrame(image);
        detecteur.close();
        flux.getTracks().forEach((t) => t.stop());
        pilotage.cameraActive = false;
      };
    } catch (e) {
      setStatut("erreur");
      const nom = e instanceof DOMException ? e.name : "";
      setErreur(
        nom === "NotAllowedError"
          ? "Accès à la caméra refusé. Autorise la caméra dans la barre d'adresse, puis réessaie."
          : nom === "NotFoundError"
            ? "Aucune caméra trouvée sur cet appareil."
            : "Impossible de démarrer la détection de la main. Recharge la page et réessaie.",
      );
    }
  }, []);

  // On arrête proprement la caméra quand on quitte la page.
  useEffect(() => () => arret.current(), []);

  return { video, dessin, statut, erreur, demarrer };
}
