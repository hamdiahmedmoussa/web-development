import { describe, expect, it } from "vitest";
import { COMMANDE_NEUTRE, type Commande } from "../gestes/reconnaitre";
import { droneAuSol, mettreAJour, PIECE, type Drone } from "./simulateur";

/** Fait tourner la simulation pendant « duree » secondes avec la même commande. */
function voler(drone: Drone, commande: Commande, duree: number): Drone {
  let d = drone;
  for (let t = 0; t < duree; t += 1 / 60) d = mettreAJour(d, commande, 1 / 60);
  return d;
}
const DECOLLER = { ...COMMANDE_NEUTRE, decoller: true };

describe("simulateur de drone", () => {
  it("reste posé sans commande", () => {
    expect(voler(droneAuSol(), COMMANDE_NEUTRE, 2).phase).toBe("pose");
  });

  it("décolle jusqu'à 1 m puis passe en vol", () => {
    const d = voler(droneAuSol(), DECOLLER, 4);
    expect(d.phase).toBe("vol");
    expect(d.altitude).toBeGreaterThanOrEqual(PIECE.altitudeDecollage - 0.05);
  });

  it("monte sans dépasser le plafond, et ne sort pas de la pièce", () => {
    let d = voler(droneAuSol(), DECOLLER, 4);
    d = voler(d, { ...COMMANDE_NEUTRE, vertical: 1, lateral: 1 }, 10);
    expect(d.altitude).toBeLessThanOrEqual(PIECE.plafond);
    expect(d.x).toBeLessThanOrEqual(PIECE.demiLargeur);
  });

  it("l'atterrissage est prioritaire, même pendant le décollage", () => {
    let d = voler(droneAuSol(), DECOLLER, 0.5);
    expect(d.phase).toBe("decollage");
    d = mettreAJour(d, { ...COMMANDE_NEUTRE, atterrir: true, decoller: true }, 1 / 60);
    expect(d.phase).toBe("atterrissage");
    d = voler(d, COMMANDE_NEUTRE, 5);
    expect(d.phase).toBe("pose");
    expect(d.altitude).toBe(0);
  });

  it("garde de l'inertie : il ne s'arrête pas instantanément", () => {
    let d = voler(droneAuSol(), DECOLLER, 4);
    d = voler(d, { ...COMMANDE_NEUTRE, lateral: 1 }, 1);
    d = mettreAJour(d, COMMANDE_NEUTRE, 1 / 60);
    expect(d.vx).toBeGreaterThan(0.5);
  });
});
