import { BarreCommande } from "./components/BarreCommande/BarreCommande";
import { ComposerBoite } from "./components/Boite/ComposerBoite";
import { Carrousel } from "./components/Carrousel/Carrousel";
import { Commande } from "./components/Commande/Commande";
import { Entete } from "./components/Entete/Entete";
import { FAQ } from "./components/FAQ/FAQ";
import { Film } from "./components/Film/Film";
import { PiedDePage } from "./components/PiedDePage/PiedDePage";
import { Vitrine } from "./components/Vitrine/Vitrine";
import { CommandeProvider } from "./context/CommandeContext";

/** La page entière, section par section, dans l'ordre du brief. */
export default function App() {
  return (
    <CommandeProvider>
      <div id="haut" className="page">
        <Entete />
        <main>
          <Film />
          <Carrousel />
          <Vitrine />
          <ComposerBoite />
          <FAQ />
        </main>
        <PiedDePage />
      </div>
      <BarreCommande />
      <Commande />
    </CommandeProvider>
  );
}
