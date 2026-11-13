import { config, formaterPrix } from "../config";
import type { Article, InfosCommande } from "../types";

/** "2026-12-24" → "jeudi 24 décembre" */
export function formaterDate(dateISO: string): string {
  const [annee, mois, jour] = dateISO.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(
    new Date(annee, mois - 1, jour),
  );
}

/** Première date de retrait possible, au format AAAA-MM-JJ. */
export function dateMinimum(aujourdhui: Date, delaiJours: number): string {
  const d = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate() + delaiJours);
  const deux = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${deux(d.getMonth() + 1)}-${deux(d.getDate())}`;
}

/** Total d'une boîte de pâtisseries. */
export function totalBoite(patisseries: { prix: number }[]): number {
  return patisseries.reduce((somme, p) => somme + p.prix, 0);
}

/** Regroupe les doublons : [éclair, éclair, fraisier] → « 2 × Éclair, 1 × Fraisier » */
export function resumerBoite(patisseries: { nom: string }[]): string[] {
  const compte = new Map<string, number>();
  for (const p of patisseries) compte.set(p.nom, (compte.get(p.nom) ?? 0) + 1);
  return [...compte].map(([nom, n]) => `${n} × ${nom}`);
}

/**
 * Le message de commande : tout ce dont la pâtisserie a besoin pour
 * confirmer en une seule réponse.
 */
export function creerMessage(article: Article, infos: InfosCommande): string {
  const lignes: string[] = [];

  if (article.type === "gateau") {
    lignes.push(
      `Bonjour ${config.nom} ! Je souhaite commander un gâteau :`,
      "",
      `• Parfum : ${article.parfum.nom}`,
      `• Nombre de parts : ${infos.parts}`,
    );
    const inscription = infos.inscription.trim();
    if (inscription) lignes.push(`• Inscription : « ${inscription} »`);
  } else {
    lignes.push(`Bonjour ${config.nom} ! Je souhaite commander une boîte de pâtisseries :`, "");
    for (const ligne of resumerBoite(article.patisseries)) lignes.push(`• ${ligne}`);
    lignes.push(`Total indiqué sur le site : ${formaterPrix(totalBoite(article.patisseries))}`);
  }

  lignes.push(
    "",
    `Retrait : ${formaterDate(infos.date)} à ${infos.heure.replace(":", " h ")}`,
    `Prénom : ${infos.prenom.trim()}`,
    "",
    "Pouvez-vous me confirmer le prix et m'envoyer le numéro CAC ? Merci !",
  );
  return lignes.join("\n");
}

/** Lien wa.me qui ouvre WhatsApp avec le message déjà écrit. */
export function creerLienWhatsApp(numero: string, message: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}
