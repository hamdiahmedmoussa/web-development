import { describe, expect, it } from "vitest";
import type { Horaires } from "../types";
import { etatBoutique, heureLocale, lienMaps, resumerHoraires } from "./horaires";

const horaires: Horaires = {
  0: ["07:00", "21:00"],
  1: ["07:00", "21:00"],
  2: ["07:00", "21:00"],
  3: ["07:00", "21:00"],
  4: ["07:00", "21:00"],
  5: ["15:00", "21:00"],
  6: ["07:00", "21:00"],
};
const FUSEAU = "Africa/Djibouti"; // UTC+3, sans heure d'été

// Mardi 15 décembre 2026 (en UTC). Djibouti = UTC + 3 h.
const djibouti = (jour: number, heure: number, minute = 0) => new Date(Date.UTC(2026, 11, jour, heure - 3, minute));

describe("heureLocale", () => {
  it("donne l'heure de Djibouti, pas celle du visiteur", () => {
    expect(heureLocale(djibouti(15, 10, 30), FUSEAU)).toEqual({ jour: 2, minutes: 630 });
  });
});

describe("etatBoutique", () => {
  it("ouvert en journée", () => {
    expect(etatBoutique(horaires, djibouti(15, 10), FUSEAU)).toEqual({ ouvert: true, detail: "ferme à 21 h" });
  });
  it("fermé tôt le matin", () => {
    expect(etatBoutique(horaires, djibouti(15, 6), FUSEAU)).toEqual({ ouvert: false, detail: "ouvre à 7 h" });
  });
  it("fermé le soir : ouvre demain", () => {
    expect(etatBoutique(horaires, djibouti(15, 22), FUSEAU)).toEqual({ ouvert: false, detail: "ouvre demain à 7 h" });
  });
  it("vendredi matin : ouvre l'après-midi", () => {
    expect(etatBoutique(horaires, djibouti(18, 9), FUSEAU)).toEqual({ ouvert: false, detail: "ouvre à 15 h" });
  });
  it("jeudi soir : ouvre demain (vendredi) à 15 h", () => {
    expect(etatBoutique(horaires, djibouti(17, 22), FUSEAU)).toEqual({ ouvert: false, detail: "ouvre demain à 15 h" });
  });
  it("jour fermé : cherche le prochain jour ouvert", () => {
    const fermeLundi = { ...horaires, 1: null };
    expect(etatBoutique(fermeLundi, djibouti(13, 22), FUSEAU)).toEqual({ ouvert: false, detail: "ouvre mardi à 7 h" });
  });
});

describe("resumerHoraires", () => {
  it("regroupe les jours identiques", () => {
    expect(resumerHoraires(horaires)).toEqual(["Samedi au jeudi : 7 h à 21 h", "Vendredi : 15 h à 21 h"]);
  });
});

describe("lienMaps", () => {
  it("encode la recherche", () => {
    expect(lienMaps("Han'sCake, Rue de Rome")).toBe(
      "https://www.google.com/maps/search/?api=1&query=Han'sCake%2C%20Rue%20de%20Rome",
    );
  });
});
