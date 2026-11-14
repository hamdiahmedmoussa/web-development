import { Arc } from "./components/Arc/Arc";
import { Avis } from "./components/Avis/Avis";
import { Calculateur } from "./components/Calculateur/Calculateur";
import { Galerie } from "./components/Galerie/Galerie";
import { Bulle } from "./components/Bulle/Bulle";
import { ComposerBoite } from "./components/Boite/ComposerBoite";
import { Carrousel } from "./components/Carrousel/Carrousel";
import { Commande } from "./components/Commande/Commande";
import { Entete } from "./components/Entete/Entete";
import { FAQ } from "./components/FAQ/FAQ";
import { Film } from "./components/Film/Film";
import { PiedDePage } from "./components/PiedDePage/PiedDePage";
import { Vitrine } from "./components/Vitrine/Vitrine";
import { CommandeProvider } from "./context/CommandeContext";
import { version } from "./version";

/** La page entière, section par section, dans l'ordre du brief. */
export default function App() {
  return (
    <CommandeProvider>
      <div id="haut" className="page">
        <Entete />
        <main>
          {/* L'ouverture dépend de la version : le film (Cinéma) ou l'arc (Rétro). */}
          {version === "cinema" ? <Film /> : <Arc />}
          <Galerie />
          <Carrousel />
          <Calculateur />
          <Vitrine />
          <ComposerBoite />
          <Avis />
          <FAQ />
        </main>
        <PiedDePage />
      </div>
      <Bulle />
      <Commande />
    </CommandeProvider>
  );
}
