import type { Horaires } from "../types";

/*
  « OUVERT MAINTENANT / FERMÉ »
  On regarde l'heure qu'il est À DJIBOUTI (et non sur le téléphone du visiteur,
  qui peut être à Paris ou à Dubaï), puis on compare aux horaires du jour.
*/

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

/** Jour (0-6) et minutes depuis minuit, dans le fuseau donné. */
export function heureLocale(date: Date, fuseau: string): { jour: number; minutes: number } {
  const parties = new Intl.DateTimeFormat("en-US", {
    timeZone: fuseau,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const lire = (type: string) => parties.find((p) => p.type === type)!.value;
  const jour = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(lire("weekday"));
  return { jour, minutes: Number(lire("hour")) * 60 + Number(lire("minute")) };
}

/** "07:30" → 450 */
function enMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** "07:00" → "7 h", "07:30" → "7 h 30" */
export function formaterHeure(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
}

export interface Etat {
  ouvert: boolean;
  /** Phrase courte : « ferme à 21 h », « ouvre à 15 h », « ouvre demain à 7 h »… */
  detail: string;
  /** La même chose, dite comme le dirait la vendeuse : « Nous rouvrons demain à 7 h ». */
  phrase: string;
}

export function etatBoutique(horaires: Horaires, date: Date, fuseau: string): Etat {
  const { jour, minutes } = heureLocale(date, fuseau);
  const aujourdhui = horaires[jour];

  if (aujourdhui) {
    const [ouv, ferm] = aujourdhui.map(enMinutes);
    if (minutes >= ouv && minutes < ferm) {
      const h = formaterHeure(aujourdhui[1]);
      return { ouvert: true, detail: `ferme à ${h}`, phrase: `Ouvert jusqu'à ${h}` };
    }
    if (minutes < ouv) {
      const h = formaterHeure(aujourdhui[0]);
      return { ouvert: false, detail: `ouvre à ${h}`, phrase: `Nous ouvrons à ${h}` };
    }
  }

  // Fermé pour aujourd'hui : on cherche le prochain jour d'ouverture.
  for (let ecart = 1; ecart <= 7; ecart++) {
    const j = (jour + ecart) % 7;
    const plage = horaires[j];
    if (plage) {
      const quand = ecart === 1 ? "demain" : JOURS[j];
      const h = formaterHeure(plage[0]);
      return { ouvert: false, detail: `ouvre ${quand} à ${h}`, phrase: `Nous rouvrons ${quand} à ${h}` };
    }
  }
  return { ouvert: false, detail: "horaires à venir", phrase: "Horaires à venir" };
}

/** Résumé lisible des horaires, en regroupant les jours identiques. */
export function resumerHoraires(horaires: Horaires): string[] {
  // On commence la semaine le samedi, comme à Djibouti (le vendredi est le jour de repos).
  const ordre = [6, 0, 1, 2, 3, 4, 5];
  const groupes: { jours: number[]; texte: string }[] = [];
  for (const j of ordre) {
    const p = horaires[j];
    const texte = p ? `${formaterHeure(p[0])} à ${formaterHeure(p[1])}` : "fermé";
    const dernier = groupes[groupes.length - 1];
    if (dernier && dernier.texte === texte) dernier.jours.push(j);
    else groupes.push({ jours: [j], texte });
  }
  const majuscule = (s: string) => s[0].toUpperCase() + s.slice(1);
  return groupes.map(({ jours, texte }) => {
    const nom = jours.length === 1 ? JOURS[jours[0]] : `${JOURS[jours[0]]} au ${JOURS[jours[jours.length - 1]]}`;
    return `${majuscule(nom)} : ${texte}`;
  });
}

/** Lien Google Maps qui cherche la boutique (fonctionne sans clé d'API). */
export function lienMaps(recherche: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(recherche)}`;
}
