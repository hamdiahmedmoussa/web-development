import { describe, expect, it } from "vitest";
import { formaterPrix } from "../config";
import { parfums } from "../data/parfums";
import { vitrine } from "../data/vitrine";
import { creerLienWhatsApp, creerMessage, dateMinimum, formaterDate, resumerBoite, totalBoite } from "./whatsapp";

const infos = { prenom: " Amina ", date: "2026-12-24", heure: "16:30", parts: 12, inscription: "", idee: "" };
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
    expect(resumerBoite([eclair, fraisier, eclair])).toEqual([`2 × ${eclair.nom}`, `1 × ${fraisier.nom}`]);
  });
});

describe("creerMessage", () => {
  it("décrit un gâteau, avec l'inscription seulement si elle existe", () => {
    const message = creerMessage({ type: "gateau", parfum: parfums[0] }, infos);
    expect(message).toContain(`• Parfum : ${parfums[0].nom}`);
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
    expect(message).toContain(`• 2 × ${eclair.nom}`);
    expect(message).toContain(`Total indiqué sur le site : ${formaterPrix(eclair.prix * 2 + fraisier.prix)}`);
    expect(message).not.toContain("Nombre de parts");
  });
});

describe("gâteau personnalisé", () => {
  it("reprend l'occasion, le modèle, l'idée et annonce la photo", () => {
    const message = creerMessage(
      { type: "sur-mesure", theme: "Anniversaire enfant", modele: "Gâteau Spider-Man" },
      { ...infos, idee: "Spider-Man, 6 ans, rouge et bleu", inscription: "Joyeux anniversaire Ilyas" },
    );
    expect(message).toContain("• Occasion : Anniversaire enfant");
    expect(message).toContain("• Modèle vu sur votre site : Gâteau Spider-Man");
    expect(message).toContain("• Mon idée : Spider-Man, 6 ans, rouge et bleu");
    expect(message).toContain("• Inscription : « Joyeux anniversaire Ilyas »");
    expect(message).toContain("photo d'exemple");
  });
});

describe("creerLienWhatsApp", () => {
  it("encode le message dans le lien", () => {
    expect(creerLienWhatsApp("25377000000", "Bonjour & merci\nÀ demain")).toBe(
      "https://wa.me/25377000000?text=Bonjour%20%26%20merci%0A%C3%80%20demain",
    );
  });
});
