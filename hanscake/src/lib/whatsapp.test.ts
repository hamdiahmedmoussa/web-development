import { describe, expect, it } from "vitest";
import { parfums } from "../data/parfums";
import { vitrine } from "../data/vitrine";
import { creerLienWhatsApp, creerMessage, dateMinimum, formaterDate, resumerBoite, totalBoite } from "./whatsapp";

const infos = { prenom: " Amina ", date: "2026-12-24", heure: "16:30", parts: 12, inscription: "" };
const [fraisier, , , eclair] = vitrine;

describe("formaterDate", () => {
  it("écrit la date en toutes lettres", () => {
    expect(formaterDate("2026-12-24")).toBe("jeudi 24 décembre");
  });
});

describe("dateMinimum", () => {
  it("ajoute le délai, même en fin de mois", () => {
    expect(dateMinimum(new Date(2026, 10, 30), 1)).toBe("2026-12-01");
  });
});

describe("boîte", () => {
  it("additionne les prix", () => {
    expect(totalBoite([eclair, eclair, fraisier])).toBe(eclair.prix * 2 + fraisier.prix);
  });
  it("regroupe les doublons", () => {
    expect(resumerBoite([eclair, fraisier, eclair])).toEqual(["2 × Éclair au chocolat", "1 × Fraisier"]);
  });
});

describe("creerMessage", () => {
  it("décrit un gâteau, avec l'inscription seulement si elle existe", () => {
    const message = creerMessage({ type: "gateau", parfum: parfums[0] }, infos);
    expect(message).toContain("• Parfum : Chocolat framboise");
    expect(message).toContain("• Nombre de parts : 12");
    expect(message).toContain("Retrait : jeudi 24 décembre à 16 h 30");
    expect(message).toContain("Prénom : Amina");
    expect(message).not.toContain("Inscription");
    const avec = creerMessage({ type: "gateau", parfum: parfums[0] }, { ...infos, inscription: "Joyeux 18 ans" });
    expect(avec).toContain("• Inscription : « Joyeux 18 ans »");
  });

  it("décrit une boîte avec son total", () => {
    const message = creerMessage({ type: "boite", patisseries: [eclair, eclair, fraisier] }, infos);
    expect(message).toContain("boîte de pâtisseries");
    expect(message).toContain("• 2 × Éclair au chocolat");
    expect(message).toContain("Total indiqué sur le site : 1 400 FDJ");
    expect(message).not.toContain("Nombre de parts");
  });
});

describe("creerLienWhatsApp", () => {
  it("encode le message dans le lien", () => {
    expect(creerLienWhatsApp("25377000000", "Bonjour & merci\nÀ demain")).toBe(
      "https://wa.me/25377000000?text=Bonjour%20%26%20merci%0A%C3%80%20demain",
    );
  });
});
