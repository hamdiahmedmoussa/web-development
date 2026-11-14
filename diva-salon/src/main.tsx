import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Polices hébergées avec le site : Gloock (titres, serif au caractère marqué), Figtree (textes).
import "@fontsource/gloock";
import "@fontsource-variable/figtree";
import "./styles/variables.css";
import "./styles/global.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
