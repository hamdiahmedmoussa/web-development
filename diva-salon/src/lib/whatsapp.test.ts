import { describe, expect, it } from "vitest";
import { aujourdhuiISO, creerLienWhatsApp, creerMessage, formaterDate } from "./whatsapp";

const infos = { prenom: " Amina ", date: "2026-12-24", moment: "apres-midi", note: "" };

describe("formaterDate", () => {
  it("écrit la date en toutes lettres", () => {
    expect(formaterDate("2026-12-24")).toBe("jeudi 24 décembre");
  });
});

describe("aujourdhuiISO", () => {
  it("formate avec des zéros", () => {
    expect(aujourdhuiISO(new Date(2026, 0, 5))).toBe("2026-01-05");
  });
});

describe("creerMessage", () => {
  it("décrit une prestation choisie dans la liste", () => {
    const m = creerMessage({ type: "prestation", categorie: "Ongles", prestation: "Pose d'ongles" }, infos);
    expect(m).toContain("• Prestation : Pose d'ongles (Ongles)");
    expect(m).toContain("• Jour souhaité : jeudi 24 décembre, plutôt l'après-midi");
    expect(m).toContain("Prénom : Amina");
    expect(m).not.toContain("Précision");
    expect(m).not.toContain("photo du modèle");
  });

  it("décrit un style de la galerie, avec la précision et l'annonce de la photo", () => {
    const m = creerMessage(
      { type: "style", theme: "Mariées", modele: "Maquillage de mariée" },
      { ...infos, moment: "matin", note: "Mariage le 30, essai avant" },
    );
    expect(m).toContain("• Style vu sur votre site : Maquillage de mariée (Mariées)");
    expect(m).toContain("plutôt le matin");
    expect(m).toContain("• Précision : Mariage le 30, essai avant");
    expect(m).toContain("photo du modèle");
  });
});

describe("creerLienWhatsApp", () => {
  it("encode le message", () => {
    expect(creerLienWhatsApp("25377000000", "Bonjour & merci")).toBe("https://wa.me/25377000000?text=Bonjour%20%26%20merci");
  });
});
