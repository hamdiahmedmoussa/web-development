import { useEffect, useState } from "react";
import { NOMS_PHASES } from "./drone/simulateur";
import { NOMS_GESTES } from "./gestes/reconnaitre";
import { useCamera } from "./gestes/useCamera";
import { pilotage } from "./pilotage";
import { Scene } from "./scene/Scene";
import { useClavier } from "./useClavier";

/** Les gestes à connaître, affichés en permanence. */
const AIDE = [
  { geste: "✋", nom: "Main ouverte", action: "Décoller, puis rester sur place" },
  { geste: "↔", nom: "Main ouverte inclinée", action: "Aller à gauche ou à droite" },
  { geste: "☝️", nom: "Index levé", action: "Monter" },
  { geste: "✌️", nom: "Deux doigts", action: "Descendre" },
  { geste: "✊", nom: "Poing fermé", action: "Atterrir" },
];

/** Relit l'état du pilotage 10 fois par seconde pour l'affichage (suffisant pour des chiffres). */
function useTableauDeBord() {
  const [infos, setInfos] = useState(() => ({ ...pilotage }));
  useEffect(() => {
    const minuteur = window.setInterval(() => setInfos({ ...pilotage }), 100);
    return () => window.clearInterval(minuteur);
  }, []);
  return infos;
}

export default function App() {
  const camera = useCamera();
  const infos = useTableauDeBord();
  useClavier();

  const alerte = infos.urgence
    ? "Atterrissage d'urgence"
    : infos.cameraActive && infos.mainPerdue && infos.drone.phase !== "pose"
      ? "Main perdue : atterrissage automatique"
      : null;

  return (
    <div className="page">
      <div className="scene">
        <Scene />
      </div>

      <header className="titre">
        <h1>Drone piloté par les gestes</h1>
        <p>Simulateur · la main devant la webcam, ou le clavier</p>
      </header>

      {/* Tableau de bord : ce que fait le drone et ce que la caméra comprend */}
      <section className="panneau tableau" aria-label="État du drone">
        <dl>
          <div>
            <dt>Drone</dt>
            <dd className={`phase phase--${infos.drone.phase}`}>{NOMS_PHASES[infos.drone.phase]}</dd>
          </div>
          <div>
            <dt>Altitude</dt>
            <dd>{infos.drone.altitude.toFixed(2)} m</dd>
          </div>
          <div>
            <dt>Geste</dt>
            <dd>{infos.cameraActive ? NOMS_GESTES[infos.gesteConfirme] : "Caméra éteinte"}</dd>
          </div>
        </dl>
        {/* role="alert" : un lecteur d'écran annonce l'alerte dès qu'elle apparaît */}
        <p className="alerte" role="alert">
          {alerte}
        </p>
        <button type="button" className="bouton bouton--urgence" onClick={() => (pilotage.urgence = true)}>
          Atterrissage d'urgence <kbd>Espace</kbd>
        </button>
      </section>

      <section className="panneau aide" aria-label="Les gestes">
        <h2>Les gestes</h2>
        <ul>
          {AIDE.map((a) => (
            <li key={a.nom}>
              <span className="aide__geste" aria-hidden="true">
                {a.geste}
              </span>
              <span>
                <strong>{a.nom}</strong>
                {a.action}
              </span>
            </li>
          ))}
        </ul>
        <p className="aide__clavier">
          Clavier : <kbd>Entrée</kbd> décoller · <kbd>↑</kbd> <kbd>↓</kbd> monter / descendre · <kbd>←</kbd>{" "}
          <kbd>→</kbd> gauche / droite
        </p>
      </section>

      {/* La caméra : image en miroir (plus naturel), avec les points de la main par-dessus */}
      <section className="panneau camera" aria-label="Caméra">
        <div className="camera__cadre">
          <video ref={camera.video} playsInline muted />
          <canvas ref={camera.dessin} />
          {camera.statut !== "active" && (
            <div className="camera__voile">
              <button
                type="button"
                className="bouton"
                onClick={camera.demarrer}
                disabled={camera.statut === "chargement"}
              >
                {camera.statut === "chargement" ? "Chargement…" : "Activer la caméra"}
              </button>
              {camera.erreur && <p className="camera__erreur">{camera.erreur}</p>}
              <p className="camera__note">L'image reste sur ton ordinateur : rien n'est envoyé sur internet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
