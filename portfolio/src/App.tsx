import { useEffect, useState } from "react";
import { appareil } from "./appareil";
import { moi, sections } from "./data";
import { demarrerDefilement } from "./defilement";
import { Entete } from "./interface/Entete";
import { Titre } from "./interface/Titre";
import { Viseur } from "./interface/Viseur";
import { FIN_INTRO } from "./scene/MotEnParticules";
import { Scene } from "./scene/Scene";

export default function App() {
  // L'interface (menu, sous-titre) apparaît quand « HAMDI » est formé.
  const [introFinie, setIntroFinie] = useState(appareil.mouvementReduit);

  useEffect(() => demarrerDefilement(appareil.mouvementReduit), []);

  useEffect(() => {
    if (introFinie) return;
    const minuteur = window.setTimeout(() => setIntroFinie(true), (FIN_INTRO - 0.6) * 1000);
    return () => window.clearTimeout(minuteur);
  }, [introFinie]);

  return (
    <>
      <Scene />
      <Entete visible={introFinie} />
      {appareil.pointeurFin && !appareil.mouvementReduit && <Viseur />}
      <div className="barre-progression" aria-hidden="true" />

      <main>
        {/* Accueil : le nom en particules est dans la scène 3D, derrière ce bloc. */}
        <section id="accueil" className={`accueil ${introFinie ? "est-visible" : ""}`}>
          <h1 className="sr-only">{moi.prenom}, portfolio</h1>
          <p className="accueil-sous-titre">{moi.sousTitre}</p>
          <p className="accueil-coin mono">
            <span>{moi.domaines.join(" · ")}</span>
            <span>
              {moi.ville} — {moi.annee}
            </span>
          </p>
          <p className="accueil-defiler mono">Défiler</p>
        </section>

        {/* Les prochaines sections : leur contenu arrive aux étapes 3 à 7. */}
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="section">
            <Titre numero={s.numero} titre={s.titre} italique={s.italique} />
          </section>
        ))}
      </main>
    </>
  );
}
