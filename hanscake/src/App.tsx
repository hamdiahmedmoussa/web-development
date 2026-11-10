import { useState } from "react";
import { Accueil } from "./components/Accueil/Accueil";
import { Atelier } from "./components/Atelier/Atelier";
import { BandeauDemo } from "./components/BandeauDemo/BandeauDemo";
import { BarreCommande } from "./components/BarreCommande/BarreCommande";
import { BonASavoir } from "./components/BonASavoir/BonASavoir";
import { Commande } from "./components/Commande/Commande";
import { PiedDePage } from "./components/PiedDePage/PiedDePage";
import { Recapitulatif } from "./components/Recapitulatif/Recapitulatif";
import { Vitrine } from "./components/Vitrine/Vitrine";
import { config } from "./config";
import { gateauParDefaut } from "./data/options";
import type { CategorieId, GateauChoisi } from "./types";

/**
 * Le composant principal. Il garde en mémoire (« state ») les deux informations
 * partagées par toute la page : le gâteau composé, et si la fenêtre de commande
 * est ouverte. Il les transmet ensuite aux sections qui en ont besoin.
 */
export default function App() {
  const [gateau, setGateau] = useState<GateauChoisi>(gateauParDefaut);
  const [commandeOuverte, setCommandeOuverte] = useState(false);

  /** Remplace le choix d'une étape, en gardant les trois autres. */
  function choisir(categorie: CategorieId, optionId: string) {
    setGateau((ancien) => ({ ...ancien, [categorie]: optionId }));
  }

  return (
    <>
      {config.estUneMaquette && <BandeauDemo />}
      <Accueil />
      <main>
        <Atelier gateau={gateau} onChoisir={choisir} />
        <Recapitulatif gateau={gateau} onCommander={() => setCommandeOuverte(true)} />
        <BonASavoir />
        <Vitrine />
      </main>
      <PiedDePage />
      <BarreCommande gateau={gateau} onCommander={() => setCommandeOuverte(true)} />
      <Commande ouverte={commandeOuverte} gateau={gateau} onFermer={() => setCommandeOuverte(false)} />
    </>
  );
}
