import { describe, expect, it } from "vitest";
import { gateauParDefaut } from "../data/options";
import { creerLienWhatsApp, creerMessage, dateMinimum, formaterDate } from "./whatsapp";

const infos = { prenom: " Amina ", date: "2026-12-24", heure: "16:30", parts: 12, inscription: "" };

describe("formaterDate", () => {
  it("écrit la date en toutes lettres, en français", () => {
    expect(formaterDate("2026-12-24")).toBe("jeudi 24 décembre 2026");
  });
});

describe("dateMinimum", () => {
  it("ajoute le délai, même en fin de mois", () => {
    expect(dateMinimum(new Date(2026, 10, 30), 1)).toBe("2026-12-01");
  });
});

describe("creerMessage", () => {
  it("contient les quatre choix et les informations de retrait", () => {
    const message = creerMessage("Han'sCake", gateauParDefaut, infos);
    expect(message).toContain("• Génoise : Vanille");
    expect(message).toContain("• Décor : Framboises fraîches");
    expect(message).toContain("Nombre de parts : 12");
    expect(message).toContain("Retrait : jeudi 24 décembre 2026 à 16 h 30");
    expect(message).toContain("Prénom : Amina");
  });

  it("n'ajoute la ligne d'inscription que si elle est remplie", () => {
    expect(creerMessage("Han'sCake", gateauParDefaut, infos)).not.toContain("Inscription");
    const avec = creerMessage("Han'sCake", gateauParDefaut, { ...infos, inscription: "Joyeux anniversaire" });
    expect(avec).toContain("Inscription sur le gâteau : « Joyeux anniversaire »");
  });
});

describe("creerLienWhatsApp", () => {
  it("encode le message dans le lien wa.me", () => {
    const lien = creerLienWhatsApp("25377000000", "Bonjour & merci\nÀ demain");
    expect(lien).toBe("https://wa.me/25377000000?text=Bonjour%20%26%20merci%0A%C3%80%20demain");
  });
});
