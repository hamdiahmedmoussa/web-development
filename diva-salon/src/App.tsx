import { Accueil } from "./components/Accueil/Accueil";
import { Bulle } from "./components/Bulle/Bulle";
import { Entete } from "./components/Entete/Entete";
import { FAQ } from "./components/FAQ/FAQ";
import { Galerie } from "./components/Galerie/Galerie";
import { PiedDePage } from "./components/PiedDePage/PiedDePage";
import { Prestations } from "./components/Prestations/Prestations";
import { Reservation } from "./components/Reservation/Reservation";
import { ReservationProvider } from "./context/ReservationContext";

/** Le site Diva Salon : ouverture, prestations, réalisations, bon à savoir, salon et contacts. */
export default function App() {
  return (
    <ReservationProvider>
      <div className="page">
        <Entete />
        <main>
          <Accueil />
          <Prestations />
          <Galerie />
          <FAQ />
        </main>
        <PiedDePage />
      </div>
      <Bulle />
      <Reservation />
    </ReservationProvider>
  );
}
