import { config } from "../config";
import type { Demande, InfosRendezVous } from "../types";

/** "2026-12-24" → "jeudi 24 décembre" */
export function formaterDate(dateISO: string): string {
  const [annee, mois, jour] = dateISO.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(
    new Date(annee, mois - 1, jour),
  );
}

/** Aujourd'hui au format AAAA-MM-JJ (première date possible). */
export function aujourdhuiISO(maintenant: Date): string {
  const deux = (n: number) => String(n).padStart(2, "0");
  return `${maintenant.getFullYear()}-${deux(maintenant.getMonth() + 1)}-${deux(maintenant.getDate())}`;
}

const MOMENTS: Record<string, string> = {
  matin: "le matin",
  "apres-midi": "l'après-midi",
  soir: "en fin de journée",
};

/** Le message de demande de rendez-vous : tout ce qu'il faut pour confirmer en une réponse. */
export function creerMessage(demande: Demande, infos: InfosRendezVous): string {
  const lignes = [`Bonjour ${config.nom} ! Je souhaite prendre rendez-vous :`, ""];

  if (demande.type === "prestation") {
    lignes.push(`• Prestation : ${demande.prestation} (${demande.categorie})`);
  } else {
    lignes.push(`• Style vu sur votre site : ${demande.modele} (${demande.theme})`);
  }
  lignes.push(`• Jour souhaité : ${formaterDate(infos.date)}, plutôt ${MOMENTS[infos.moment] ?? infos.moment}`);
  const note = infos.note.trim();
  if (note) lignes.push(`• Précision : ${note}`);
  lignes.push(`Prénom : ${infos.prenom.trim()}`);
  if (demande.type === "style") lignes.push("", "Je vous envoie une photo du modèle juste après.");
  lignes.push("", "Pouvez-vous me confirmer l'heure et le prix ? Merci !");
  return lignes.join("\n");
}

/** Lien wa.me qui ouvre WhatsApp avec le message déjà écrit. */
export function creerLienWhatsApp(numero: string, message: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}
