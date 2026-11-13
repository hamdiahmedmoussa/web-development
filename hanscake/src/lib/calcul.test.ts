import { describe, expect, it } from "vitest";
import { conseillerParts } from "./calcul";

const tailles = [8, 10, 12, 16, 20, 24];

describe("conseillerParts", () => {
  it("jamais moins que le minimum de 8 parts", () => {
    expect(conseillerParts(3, tailles, 3500, 8)).toEqual({ parts: 8, prix: 3500 });
  });
  it("prend la plus petite taille suffisante", () => {
    expect(conseillerParts(11, tailles, 3500, 8)).toEqual({ parts: 12, prix: 5300 });
  });
  it("taille exacte", () => {
    expect(conseillerParts(16, tailles, 4000, 8)).toEqual({ parts: 16, prix: 8000 });
  });
  it("au-delà de la plus grande taille : pas de conseil automatique", () => {
    expect(conseillerParts(40, tailles, 3500, 8)).toEqual({ parts: null, prix: null });
  });
});
