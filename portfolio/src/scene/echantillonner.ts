/*
  TRANSFORMER UN MOT EN POINTS
  1. On écrit le mot en blanc dans un canvas invisible (comme sur une feuille).
  2. On lit chaque pixel : là où il y a de l'encre, on garde la position.
  3. On tire au hasard « nombre » positions parmi elles, et on les convertit
     en coordonnées 3D (le mot est centré sur 0, 0).
*/

export async function pointsDuMot(
  mot: string,
  nombre: number,
  /** Largeur du mot dans la scène 3D, en unités. */
  largeur: number,
  police: string,
): Promise<Float32Array> {
  const taille = 240;
  const fonte = `400 ${taille}px "${police}"`;
  // On attend que la police soit chargée, sinon le canvas utiliserait une police de secours.
  await document.fonts.load(fonte);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.font = fonte;
  ctx.letterSpacing = "6px";
  const mesure = ctx.measureText(mot);
  canvas.width = Math.ceil(mesure.width) + 40;
  canvas.height = Math.ceil(taille * 1.25);

  // Changer la taille du canvas efface ses réglages : on les remet.
  ctx.font = fonte;
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";
  ctx.fillText(mot, 20, canvas.height / 2);

  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const encre: number[] = [];
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      // data contient R, V, B, A pour chaque pixel : l'alpha (A) est le 4e nombre.
      if (data[(y * width + x) * 4 + 3] > 128) encre.push(x, y);
    }
  }

  const echelle = largeur / width;
  const points = new Float32Array(nombre * 3);
  for (let i = 0; i < nombre; i++) {
    const k = Math.floor(Math.random() * (encre.length / 2)) * 2;
    // Petit décalage aléatoire : les points ne tombent pas tous sur la même grille.
    const x = encre[k] + (Math.random() - 0.5) * 2;
    const y = encre[k + 1] + (Math.random() - 0.5) * 2;
    points[i * 3] = (x - width / 2) * echelle;
    points[i * 3 + 1] = -(y - height / 2) * echelle;
    points[i * 3 + 2] = (Math.random() - 0.5) * 0.35; // un peu d'épaisseur
  }
  return points;
}
