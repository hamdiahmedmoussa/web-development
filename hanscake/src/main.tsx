import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Polices hébergées avec le site (aucun appel à Google Fonts au chargement).
// « opsz » : Bodoni Moda adapte le dessin des lettres à leur taille (plus fin quand c'est très grand).
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource-variable/figtree";
import "./styles/variables.css";
import "./styles/global.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
