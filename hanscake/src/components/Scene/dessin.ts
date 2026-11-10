/*
  DESSIN DU GÂTEAU (canvas 2D)

  Le gâteau est dessiné dans un repère fixe de 400 × 250 unités, puis agrandi ou
  réduit pour remplir le canvas. On raisonne donc toujours avec les mêmes nombres,
  quelle que soit la taille de l'écran.

  Chaque couche reçoit un nombre « apparition » entre 0 (invisible) et 1 (en place).
  C'est le défilement de la page qui fait varier ces nombres.
*/

export interface CouleursGateau {
  genoise: string;
  creme: string;
  glacage: string;
  decor: string;
  /** Forme du décor : "framboises", "copeaux" ou "perles". */
  typeDecor: string;
}

// Repère du dessin
const LARGEUR = 400;
const HAUTEUR = 250;
const DECALAGE_Y = 125; // le dessin utilise les ordonnées 125 à 375
const CX = 200; // centre horizontal
const RX = 108; // demi-largeur du gâteau
const RY = 20; // « écrasement » des ellipses, qui donne l'effet de perspective
const Y_BAS = 320; // bas du gâteau
const H_GENOISE = 42;
const H_CREME = 16;

/** Garde un nombre entre 0 et 1. */
function borner(t: number): number {
  return Math.min(1, Math.max(0, t));
}

/** Rend un mouvement plus naturel : rapide au début, doux à la fin. */
function adoucir(t: number): number {
  return 1 - Math.pow(1 - borner(t), 3);
}

/** Faux hasard : donne toujours le même nombre (entre 0 et 1) pour le même n. */
function hasard(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Mélange deux couleurs « #rrggbb ». t = 0 → couleur a, t = 1 → couleur b. */
function melanger(a: string, b: string, t: number): string {
  const lire = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const [r1, v1, b1] = lire(a);
  const [r2, v2, b2] = lire(b);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${mix(r1, r2)}, ${mix(v1, v2)}, ${mix(b1, b2)})`;
}

const NOIR = "#000000";
const BLANC = "#ffffff";

/** Dégradé horizontal qui donne du volume : ombre à gauche et à droite, lumière au centre gauche. */
function volume(ctx: CanvasRenderingContext2D, rx: number, couleur: string): CanvasGradient {
  const degrade = ctx.createLinearGradient(CX - rx, 0, CX + rx, 0);
  degrade.addColorStop(0, melanger(couleur, NOIR, 0.35));
  degrade.addColorStop(0.3, melanger(couleur, BLANC, 0.1));
  degrade.addColorStop(0.65, couleur);
  degrade.addColorStop(1, melanger(couleur, NOIR, 0.45));
  return degrade;
}

/** Dessine une couche cylindrique (génoise ou crème) entre deux hauteurs. */
function couche(ctx: CanvasRenderingContext2D, yHaut: number, yBas: number, rx: number, couleur: string) {
  // Le côté : deux bords verticaux reliés par un demi-ovale en bas.
  ctx.beginPath();
  ctx.moveTo(CX - rx, yHaut);
  ctx.lineTo(CX - rx, yBas);
  ctx.ellipse(CX, yBas, rx, RY, 0, Math.PI, 0, true);
  ctx.lineTo(CX + rx, yHaut);
  ctx.closePath();
  ctx.fillStyle = volume(ctx, rx, couleur);
  ctx.fill();

  // Le dessus : un ovale un peu plus clair.
  ctx.beginPath();
  ctx.ellipse(CX, yHaut, rx, RY, 0, 0, Math.PI * 2);
  ctx.fillStyle = melanger(couleur, BLANC, 0.16);
  ctx.fill();
}

/** Petites bulles sur le côté de la génoise, pour l'aspect moelleux. */
function mie(ctx: CanvasRenderingContext2D, yHaut: number, yBas: number, couleur: string, graine: number) {
  ctx.fillStyle = melanger(couleur, NOIR, 0.4);
  for (let k = 0; k < 22; k++) {
    const x = CX + (hasard(graine + k) * 2 - 1) * RX * 0.9;
    const y = yHaut + RY + 3 + hasard(graine + k + 50) * (yBas - yHaut - 6);
    ctx.globalAlpha *= 0.3;
    ctx.beginPath();
    ctx.ellipse(x, y, 1.5 + hasard(graine + k + 90) * 2, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha /= 0.3;
  }
}

function assiette(ctx: CanvasRenderingContext2D) {
  // Ombre portée sur la table
  ctx.beginPath();
  ctx.ellipse(CX, 348, 178, 24, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.fill();

  // Assiette
  const degrade = ctx.createLinearGradient(CX - 170, 0, CX + 170, 0);
  degrade.addColorStop(0, "#b9aa96");
  degrade.addColorStop(0.35, "#fbf3e6");
  degrade.addColorStop(1, "#a39480");
  ctx.beginPath();
  ctx.ellipse(CX, 338, 168, 27, 0, 0, Math.PI * 2);
  ctx.fillStyle = degrade;
  ctx.fill();

  // Creux de l'assiette
  ctx.beginPath();
  ctx.ellipse(CX, 336, 136, 21, 0, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(90, 70, 50, 0.25)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

/** Le glaçage : un ovale sur le dessus et des coulures sur le devant. */
function glacage(ctx: CanvasRenderingContext2D, yHaut: number, couleur: string, apparition: number) {
  const etendue = adoucir(apparition);
  const rx = RX + 1.5;
  const POINTS = 72;

  // Coulures : on suit le bord avant du gâteau, de gauche à droite,
  // en descendant plus ou moins selon une vague.
  ctx.beginPath();
  for (let i = 0; i <= POINTS; i++) {
    const angle = Math.PI - (i / POINTS) * Math.PI;
    const x = CX + rx * Math.cos(angle);
    const yBord = yHaut + RY * Math.sin(angle);
    const vague = Math.pow((Math.sin(angle * 9 + 0.8) + 1) / 2, 2);
    const longueur = etendue * (7 + 26 * vague);
    if (i === 0) ctx.moveTo(x, yBord + longueur);
    else ctx.lineTo(x, yBord + longueur);
  }
  ctx.lineTo(CX + rx, yHaut);
  ctx.lineTo(CX - rx, yHaut);
  ctx.closePath();
  ctx.fillStyle = volume(ctx, rx, couleur);
  ctx.fill();

  // Dessus
  ctx.beginPath();
  ctx.ellipse(CX, yHaut, rx, RY, 0, 0, Math.PI * 2);
  ctx.fillStyle = melanger(couleur, BLANC, 0.12);
  ctx.fill();

  // Reflet brillant
  ctx.beginPath();
  ctx.ellipse(CX - 38, yHaut - 4, 42, 6, -0.08, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.16)";
  ctx.fill();
}

function framboise(ctx: CanvasRenderingContext2D, x: number, y: number, couleur: string) {
  const degrade = ctx.createRadialGradient(x - 3, y - 4, 1, x, y, 11);
  degrade.addColorStop(0, melanger(couleur, BLANC, 0.35));
  degrade.addColorStop(1, melanger(couleur, NOIR, 0.3));
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = degrade;
  ctx.fill();

  // Les petits grains
  ctx.fillStyle = melanger(couleur, NOIR, 0.35);
  for (let k = 0; k < 6; k++) {
    const angle = (k / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(x + Math.cos(angle) * 5, y + Math.sin(angle) * 5, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
}

function copeau(ctx: CanvasRenderingContext2D, x: number, y: number, couleur: string, n: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((hasard(n + 7) - 0.5) * 1.6);
  ctx.beginPath();
  ctx.roundRect(-11, -3.5, 22, 7, 3.5);
  ctx.fillStyle = couleur;
  ctx.fill();
  ctx.strokeStyle = melanger(couleur, BLANC, 0.3);
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
}

function perle(ctx: CanvasRenderingContext2D, x: number, y: number, couleur: string) {
  const degrade = ctx.createRadialGradient(x - 1.5, y - 2, 0.5, x, y, 5.5);
  degrade.addColorStop(0, "#fff7dd");
  degrade.addColorStop(0.5, couleur);
  degrade.addColorStop(1, melanger(couleur, NOIR, 0.4));
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = degrade;
  ctx.fill();
}

/** Les éléments du décor tombent un par un sur le dessus du gâteau. */
function decor(ctx: CanvasRenderingContext2D, yHaut: number, couleurs: CouleursGateau, apparition: number) {
  // 1. On calcule où poser chaque élément (position sur l'ovale du dessus).
  const positions: { x: number; y: number; n: number }[] = [];
  const poser = (angle: number, rayon: number, n: number) => {
    positions.push({
      x: CX + Math.cos(angle) * RX * rayon,
      y: yHaut + Math.sin(angle) * RY * rayon,
      n,
    });
  };

  if (couleurs.typeDecor === "copeaux") {
    for (let n = 0; n < 16; n++) poser(hasard(n) * Math.PI * 2, 0.15 + hasard(n + 30) * 0.65, n);
  } else if (couleurs.typeDecor === "perles") {
    for (let n = 0; n < 18; n++) poser((n / 18) * Math.PI * 2, 0.82, n);
    for (let n = 18; n < 23; n++) poser((n / 5) * Math.PI * 2, 0.3, n);
  } else {
    for (let n = 0; n < 8; n++) poser((n / 8) * Math.PI * 2 + 0.3, 0.66, n);
    poser(0, 0, 8);
  }

  // 2. On dessine d'abord ceux du fond, pour que ceux de devant passent par-dessus.
  positions.sort((a, b) => a.y - b.y);

  const alphaDeBase = ctx.globalAlpha;
  const decalageMax = 0.5; // le dernier élément démarre à 50 % de l'animation
  positions.forEach((position) => {
    const retard = (position.n / positions.length) * decalageMax;
    const t = adoucir((apparition - retard) / (1 - decalageMax));
    if (t <= 0) return;

    const chute = (1 - t) * -70;
    ctx.globalAlpha = alphaDeBase * t;
    if (couleurs.typeDecor === "copeaux") copeau(ctx, position.x, position.y - 3 + chute, couleurs.decor, position.n);
    else if (couleurs.typeDecor === "perles") perle(ctx, position.x, position.y - 4 + chute, couleurs.decor);
    else framboise(ctx, position.x, position.y - 7 + chute, couleurs.decor);
  });
  ctx.globalAlpha = alphaDeBase;
}

/**
 * Dessine le gâteau complet.
 * @param apparitions quatre nombres entre 0 et 1 : génoise, crème, glaçage, décor.
 */
export function dessinerGateau(
  ctx: CanvasRenderingContext2D,
  largeur: number,
  hauteur: number,
  couleurs: CouleursGateau,
  apparitions: number[],
) {
  const [tGenoise, tCreme, tGlacage, tDecor] = apparitions.map(borner);

  ctx.clearRect(0, 0, largeur, hauteur);
  ctx.save();

  // On adapte le repère 400 × 250 à la taille réelle du canvas, en le centrant.
  const echelle = Math.min(largeur / LARGEUR, hauteur / HAUTEUR);
  ctx.translate((largeur - LARGEUR * echelle) / 2, (hauteur - HAUTEUR * echelle) / 2);
  ctx.scale(echelle, echelle);
  ctx.translate(0, -DECALAGE_Y);

  assiette(ctx);

  // La crème « pousse » entre les deux génoises : celle du dessus se soulève.
  const hauteurCreme = H_CREME * adoucir(tCreme);
  const yCremeBas = Y_BAS - H_GENOISE;
  const yCremeHaut = yCremeBas - hauteurCreme;
  const yHaut = yCremeHaut - H_GENOISE; // dessus du gâteau

  // Génoise du bas (première moitié de l'étape), puis génoise du haut (seconde moitié).
  const tBas = adoucir(tGenoise * 2);
  const tDessus = adoucir(tGenoise * 2 - 1);

  if (tBas > 0) {
    ctx.save();
    ctx.globalAlpha = tBas;
    ctx.translate(0, (1 - tBas) * -50);
    couche(ctx, yCremeBas, Y_BAS, RX, couleurs.genoise);
    mie(ctx, yCremeBas, Y_BAS, couleurs.genoise, 1);
    ctx.restore();
  }

  if (hauteurCreme > 0.5) {
    couche(ctx, yCremeHaut, yCremeBas, RX + 2, couleurs.creme);
  }

  if (tDessus > 0) {
    ctx.save();
    ctx.globalAlpha = tDessus;
    ctx.translate(0, (1 - tDessus) * -50);
    couche(ctx, yHaut, yCremeHaut, RX, couleurs.genoise);
    mie(ctx, yHaut, yCremeHaut, couleurs.genoise, 200);
    ctx.restore();
  }

  if (tGlacage > 0) {
    ctx.save();
    ctx.globalAlpha = borner(tGlacage * 3);
    glacage(ctx, yHaut, couleurs.glacage, tGlacage);
    ctx.restore();
  }

  if (tDecor > 0) {
    decor(ctx, yHaut, couleurs, tDecor);
  }

  ctx.restore();
}
