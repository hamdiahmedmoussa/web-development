import { describe, expect, it } from "vitest";
import { nouvelEtat, stabiliser } from "./stabiliser";
import type { Geste } from "./reconnaitre";

/** Simule une suite d'images à 30 par seconde avec le même geste. */
function pendant(etat: ReturnType<typeof nouvelEtat>, geste: Geste, debut: number, duree: number) {
  let e = etat;
  for (let t = debut; t <= debut + duree + 1e-9; t += 1 / 30) e = stabiliser(e, geste, t);
  return e;
}

describe("stabiliser", () => {
  it("ignore un geste vu une seule image (erreur de détection)", () => {
    let e = pendant(nouvelEtat(0), "ouverte", 0, 0.5);
    e = stabiliser(e, "index", 0.53);
    e = stabiliser(e, "ouverte", 0.56);
    expect(e.confirme).toBe("ouverte");
  });

  it("confirme un geste tenu assez longtemps", () => {
    const e = pendant(nouvelEtat(0), "index", 0, 0.3);
    expect(e.confirme).toBe("index");
  });

  it("le poing (atterrir) est confirmé plus vite que les autres gestes", () => {
    const e = pendant(pendant(nouvelEtat(0), "ouverte", 0, 0.5), "poing", 0.55, 0.1);
    expect(e.confirme).toBe("poing");
  });

  it("déclenche la sécurité quand la main disparaît trop longtemps", () => {
    let e = pendant(nouvelEtat(0), "ouverte", 0, 0.5);
    e = pendant(e, "aucun", 0.53, 0.5);
    expect(e.mainPerdue).toBe(false);
    e = pendant(e, "aucun", 1.06, 0.4);
    expect(e.mainPerdue).toBe(true);
    // La main revient : la sécurité se lève.
    e = stabiliser(e, "ouverte", 1.6);
    expect(e.mainPerdue).toBe(false);
  });
});
