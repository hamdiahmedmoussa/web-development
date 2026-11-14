import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Polices hébergées avec le site. Le navigateur ne télécharge que celles réellement utilisées.
import "@fontsource-variable/bricolage-grotesque/wdth.css"; // version Cinéma (titres étroits et textes)
import "@fontsource-variable/fraunces/full.css"; // titres de la version Rétro
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/figtree"; // textes des deux versions
import "@fontsource/great-vibes"; // le logo, en écriture attachée comme leur enseigne
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/retro.css";
import App from "./App.tsx";
import { version } from "./version";

// On écrit la version sur <html> AVANT d'afficher la page : les bonnes couleurs dès la première image.
document.documentElement.dataset.theme = version;
document.querySelector('meta[name="theme-color"]')?.setAttribute("content", version === "retro" ? "#fdf0dc" : "#372c2b");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
