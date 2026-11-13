import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { etapesFilm } from "../../data/film";
import type { EtapeFilm } from "../../types";
import "./Film.css";

/*
  OUVERTURE : LE FILM PILOTÉ PAR LE DÉFILEMENT

  1. La section est très haute (plusieurs écrans). À l'intérieur, une « scène »
     reste collée à l'écran (position: sticky) pendant qu'on fait défiler.
  2. useScroll mesure l'avancement dans la section : un nombre de 0 à 1.
  3. useTransform convertit cet avancement en secondes de vidéo (0,8 s, 7,9 s…).
  4. useSpring adoucit ce temps (comme un amortisseur), puis on le donne à la vidéo.
*/

// Bornes de chaque étape sur l'axe du défilement (0 → 1), calculées avec les « poids ».
const totalPoids = etapesFilm.reduce((s, e) => s + e.poids, 0);
const bornes = etapesFilm.reduce<number[]>((acc, e) => [...acc, acc[acc.length - 1] + e.poids / totalPoids], [0]);
// Exemple : [0, 0.12, 0.35, 0.56, 0.69, 1]
const tempsAuxBornes = [etapesFilm[0].debut, ...etapesFilm.map((e) => e.fin)];

// Vidéo plus légère sur téléphone (854 px de large au lieu de 1280).
const estMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 759px)").matches;
const SOURCE = estMobile ? "/hanscake-film-mobile.mp4" : "/hanscake-film.mp4";

export function Film() {
  const reduit = useReducedMotion();
  if (reduit) return <FilmStatique />;
  return <FilmDefilant />;
}

function FilmDefilant() {
  const refSection = useRef<HTMLElement>(null);
  const refVideo = useRef<HTMLVideoElement>(null);
  const [pret, setPret] = useState(false);
  const [enPanne, setEnPanne] = useState(false);

  // offset : 0 quand le haut de la section touche le haut de l'écran,
  //          1 quand le bas de la section touche le bas de l'écran.
  const { scrollYProgress } = useScroll({ target: refSection, offset: ["start start", "end end"] });
  const tempsCible = useTransform(scrollYProgress, bornes, tempsAuxBornes);
  const temps = useSpring(tempsCible, { stiffness: 140, damping: 30, mass: 0.6 });

  // À chaque changement du temps adouci, on avance la vidéo.
  const dernierSaut = useRef(0);
  useMotionValueEvent(temps, "change", (t) => {
    const video = refVideo.current;
    if (!video || !pret) return;
    const maintenant = performance.now();
    // Si la vidéo est encore en train de chercher l'image précédente, on attend un peu :
    // sinon les demandes s'empilent et l'image se fige.
    if (video.seeking && maintenant - dernierSaut.current < 200) return;
    if (Math.abs(video.currentTime - t) > 0.02) {
      video.currentTime = Math.min(t, video.duration - 0.05);
      dernierSaut.current = maintenant;
    }
  });

  // Certains téléphones (iPhone) n'affichent pas l'image d'une vidéo tant qu'elle
  // n'a jamais été lue : on la lance puis on la met en pause aussitôt.
  useEffect(() => {
    const video = refVideo.current;
    if (!video) return;
    const amorcer = () => video.play().then(() => video.pause()).catch(() => {});
    amorcer();
    window.addEventListener("touchstart", amorcer, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", amorcer);
  }, []);

  return (
    <section ref={refSection} className="film" aria-label="Le film : un gâteau préparé étape par étape">
      <div className="film__scene">
        <div className="film__ecran">
          {enPanne ? (
            <img className="film__video" src="/hanscake-fin.jpg" alt="" />
          ) : (
            <video
              ref={refVideo}
              className="film__video"
              src={SOURCE}
              poster="/hanscake-debut.jpg"
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              onLoadedData={() => setPret(true)}
              onError={() => setEnPanne(true)}
            />
          )}
          {!pret && !enPanne && (
            <p className="film__chargement" role="status">
              Chargement du film…
            </p>
          )}
        </div>

        <div className="film__textes">
          {etapesFilm.map((etape, index) => (
            <TitreEtape key={etape.titre} etape={etape} index={index} progression={scrollYProgress} />
          ))}
        </div>

        <Repere progression={scrollYProgress} />
      </div>
    </section>
  );
}

interface TitreEtapeProps {
  etape: EtapeFilm;
  index: number;
  progression: MotionValue<number>;
}

/** Le titre d'une étape : il apparaît en fondu au début de son étape et s'efface à la fin. */
function TitreEtape({ etape, index, progression }: TitreEtapeProps) {
  const debut = bornes[index];
  const fin = bornes[index + 1];
  const fondu = (fin - debut) * 0.22;
  const premiere = index === 0;
  const derniere = index === etapesFilm.length - 1;

  // La première étape est visible dès l'arrivée ; la dernière reste affichée jusqu'au bout.
  const opacite = useTransform(
    progression,
    [debut, debut + fondu, fin - fondu, fin],
    [premiere ? 1 : 0, 1, 1, derniere ? 1 : 0],
  );
  const y = useTransform(progression, [debut, debut + fondu, fin - fondu, fin], [premiere ? 0 : 40, 0, 0, derniere ? 0 : -40]);

  const Titre = premiere ? "h1" : "h2";
  return (
    <motion.div className="film__etape" style={{ opacity: opacite, y }}>
      {!premiere && (
        <p className="film__numero">
          Étape {index} sur {etapesFilm.length - 1}
        </p>
      )}
      <Titre className="film__titre">{etape.titre}</Titre>
      <p className="film__texte">{etape.texte}</p>
      {premiere && <p className="film__invitation">Faites défiler</p>}
    </motion.div>
  );
}

/** Petite jauge verticale qui montre où on en est dans le film. */
function Repere({ progression }: { progression: MotionValue<number> }) {
  return (
    <div className="film__repere" aria-hidden="true">
      <motion.span style={{ scaleY: progression }} />
    </div>
  );
}

/** Version sans animation (réglage « réduire les animations ») : image fixe et textes à la suite. */
function FilmStatique() {
  return (
    <section className="film film--statique" aria-label="Comment nous préparons nos gâteaux">
      <img className="film__video" src="/hanscake-fin.jpg" alt="Gâteau au chocolat décoré de framboises" />
      <div className="conteneur film__liste">
        {etapesFilm.map((etape, index) => {
          const Titre = index === 0 ? "h1" : "h2";
          return (
            <div key={etape.titre} className="film__etape">
              <Titre className="film__titre">{etape.titre}</Titre>
              <p className="film__texte">{etape.texte}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
