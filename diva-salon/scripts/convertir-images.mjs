/*
  Convertit toutes les images PNG de public/images/ en WebP.
  Le WebP garde la transparence et pèse souvent 3 à 5 fois moins lourd :
  le site charge beaucoup plus vite sur une connexion mobile lente.

  Utilisation : npm run images
  (à relancer chaque fois que tu ajoutes ou remplaces une image PNG)
*/
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DOSSIER = "public/images";
// Largeur maximum selon le dossier (une image plus grande ne sert à rien).
const LARGEURS = { parfums: 1000, vitrine: 700, ingredients: 300, logo: 600 };

async function* fichiersPng(dossier) {
  for (const entree of await readdir(dossier, { withFileTypes: true })) {
    const chemin = path.join(dossier, entree.name);
    if (entree.isDirectory()) yield* fichiersPng(chemin);
    else if (entree.name.toLowerCase().endsWith(".png")) yield chemin;
  }
}

let total = 0;
for await (const png of fichiersPng(DOSSIER)) {
  const webp = png.replace(/\.png$/i, ".webp");
  const largeur = LARGEURS[path.basename(path.dirname(png))] ?? 1000;
  await sharp(png).resize({ width: largeur, withoutEnlargement: true }).webp({ quality: 82 }).toFile(webp);
  const [avant, apres] = await Promise.all([stat(png), stat(webp)]);
  console.log(`${png} : ${Math.round(avant.size / 1024)} Ko → ${Math.round(apres.size / 1024)} Ko`);
  total++;
}
console.log(total ? `${total} image(s) convertie(s).` : "Aucune image PNG trouvée dans public/images/.");
