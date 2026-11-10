import { optionChoisie } from "../data/options";
import type { GateauChoisi, InfosCommande } from "../types";

/** "2026-12-24" → "jeudi 24 décembre 2026" */
export function formaterDate(dateISO: string): string {
  const [annee, mois, jour] = dateISO.split("-").map(Number);
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(annee, mois - 1, jour));
}

/** Première date de retrait possible, au format AAAA-MM-JJ (pour le champ date). */
export function dateMinimum(aujourdhui: Date, delaiJours: number): string {
  const date = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth(), aujourdhui.getDate() + delaiJours);
  const deuxChiffres = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${deuxChiffres(date.getMonth() + 1)}-${deuxChiffres(date.getDate())}`;
}

/**
 * Écrit le message de commande. Il contient tout ce dont la pâtisserie a besoin,
 * pour qu'elle puisse confirmer en une seule réponse.
 */
export function creerMessage(nomPatisserie: string, gateau: GateauChoisi, infos: InfosCommande): string {
  const lignes = [
    `Bonjour ${nomPatisserie} ! Je souhaite commander un gâteau :`,
    "",
    `• Génoise : ${optionChoisie(gateau, "genoise").nom}`,
    `• Crème : ${optionChoisie(gateau, "creme").nom}`,
    `• Glaçage : ${optionChoisie(gateau, "glacage").nom}`,
    `• Décor : ${optionChoisie(gateau, "decor").nom}`,
    "",
    `Nombre de parts : ${infos.parts}`,
    `Retrait : ${formaterDate(infos.date)} à ${infos.heure.replace(":", " h ")}`,
  ];

  const inscription = infos.inscription.trim();
  if (inscription) lignes.push(`Inscription sur le gâteau : « ${inscription} »`);

  lignes.push(`Prénom : ${infos.prenom.trim()}`, "", "Pouvez-vous me confirmer le prix et l'acompte ? Merci !");
  return lignes.join("\n");
}

/**
 * Construit le lien wa.me : il ouvre WhatsApp sur la conversation avec la
 * pâtisserie, le message déjà écrit. encodeURIComponent transforme les espaces,
 * accents et retours à la ligne pour qu'ils passent dans une adresse web.
 */
export function creerLienWhatsApp(numero: string, message: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}
