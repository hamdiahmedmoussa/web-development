import { describe, expect, it } from "vitest";
import { inclinaison, reconnaitre, versCommande, type Point } from "./reconnaitre";

/**
 * Fabrique une main « de face », doigts vers le haut.
 * tendus = [index, majeur, annulaire, auriculaire]. angle = inclinaison en degrés.
 */
function main(tendus: [boolean, boolean, boolean, boolean], angle = 0): Point[] {
  const poignet = { x: 0.5, y: 0.8 };
  const p: Point[] = [poignet];
  // Pouce (1-4) : sur le côté, il n'est pas utilisé par la reconnaissance.
  for (let i = 1; i <= 4; i++) p.push({ x: 0.5 - 0.04 * i, y: 0.75 - 0.03 * i });
  tendus.forEach((tendu, f) => {
    const x = 0.46 + f * 0.04; // le majeur (f = 1) est pile au-dessus du poignet
    p.push({ x, y: 0.6 }, { x, y: 0.5 }); // base, articulation du milieu
    // Doigt tendu : le bout continue vers le haut. Plié : il revient vers la paume.
    p.push(tendu ? { x, y: 0.45 } : { x, y: 0.56 }, tendu ? { x, y: 0.4 } : { x, y: 0.62 });
  });
  // Inclinaison : rotation autour du poignet. Image en miroir : pencher à droite = x diminue en haut.
  const r = (angle * Math.PI) / 180;
  return p.map((q) => {
    const dx = q.x - poignet.x;
    const dy = q.y - poignet.y;
    return { x: poignet.x + dx * Math.cos(r) + dy * Math.sin(r), y: poignet.y - dx * Math.sin(r) + dy * Math.cos(r) };
  });
}

describe("reconnaître un geste", () => {
  it("main ouverte, poing, index, V", () => {
    expect(reconnaitre(main([true, true, true, true]))).toBe("ouverte");
    expect(reconnaitre(main([false, false, false, false]))).toBe("poing");
    expect(reconnaitre(main([true, false, false, false]))).toBe("index");
    expect(reconnaitre(main([true, true, false, false]))).toBe("victoire");
    expect(reconnaitre(main([false, false, false, true]))).toBe("inconnu");
    expect(reconnaitre(null)).toBe("aucun");
  });

  it("reconnaît encore le geste quand la main est inclinée", () => {
    expect(reconnaitre(main([true, true, true, true], 30))).toBe("ouverte");
    expect(reconnaitre(main([false, false, false, false], -30))).toBe("poing");
  });

  it("mesure l'inclinaison dans le bon sens", () => {
    expect(inclinaison(main([true, true, true, true], 0))).toBeCloseTo(0, 5);
    expect(inclinaison(main([true, true, true, true], 25))).toBeCloseTo(25, 5);
    expect(inclinaison(main([true, true, true, true], -25))).toBeCloseTo(-25, 5);
  });
});

describe("transformer le geste en commande", () => {
  it("main droite : pas de déplacement (zone morte)", () => {
    const m = main([true, true, true, true], 5);
    expect(versCommande("ouverte", m).lateral).toBe(0);
  });

  it("main penchée à droite : le drone va à droite, à fond au-delà de 40°", () => {
    expect(versCommande("ouverte", main([true, true, true, true], 26)).lateral).toBeCloseTo(0.5, 5);
    expect(versCommande("ouverte", main([true, true, true, true], 60)).lateral).toBe(1);
    expect(versCommande("ouverte", main([true, true, true, true], -60)).lateral).toBe(-1);
  });

  it("index = monter, V = descendre, poing = atterrir", () => {
    expect(versCommande("index", null).vertical).toBe(1);
    expect(versCommande("victoire", null).vertical).toBe(-1);
    expect(versCommande("poing", null).atterrir).toBe(true);
    expect(versCommande("inconnu", null)).toEqual({ vertical: 0, lateral: 0, decoller: false, atterrir: false });
  });
});
