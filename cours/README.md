# Mon parcours : comprendre et refaire chaque projet

Le but n'est pas de relire le code : c'est de **pouvoir le réécrire seul**, et d'expliquer chaque choix
à un client, à un recruteur ou à un jury.

## La méthode, pour chaque projet

1. **Comprendre la conception** : le problème, le parcours de l'utilisateur, l'arbre des composants,
   le chemin des données. Sans regarder le code d'abord.
2. **Apprendre les notions React** utilisées, une par une, avec un exemple court.
3. **Reconstruire depuis un dossier vide**, étape par étape, dans `entrainement/` (ce dossier n'est pas envoyé
   sur GitHub). À chaque étape : ce que tu dois obtenir, un indice, puis seulement après, le fichier du vrai
   projet pour comparer.
4. **Répondre aux questions** de fin de cours, sans regarder les réponses.
5. **Une variante à toi** : changer quelque chose (un autre commerce, une autre couleur, une autre règle).
   C'est là qu'on voit si on a compris.

## L'ordre (du plus simple au plus difficile)

| # | Projet | Ce que tu apprends en plus | Cours |
|---|---|---|---|
| 1 | **Diva Salon** | Composants, props, état, contexte, formulaires, `<dialog>`, lien WhatsApp, tests | [01-diva-salon.md](01-diva-salon.md) |
| 2 | **Han'sCake** | Deux thèmes avec les variables CSS, galerie et carrousel, calculs testés, animations au défilement | à venir |
| 3 | **Drone piloté par les gestes** | Caméra et MediaPipe, `useRef` contre `useState`, boucle d'animation, première 3D | à venir |
| 4 | **Bras et main robotiques** | Filtre One Euro, USB (Web Serial), protocole, modèle 3D articulé | à venir |
| 5 | **Portfolio** | Particules et shaders, caméra pilotée par le défilement | à venir |

Ensuite : **Python**, avec le détecteur d'arnaques puis le laboratoire Modbus.

## Mes règles

- **Je tape le code moi-même.** Pas de copier-coller depuis le vrai projet : la main apprend en écrivant.
- **Quand ça casse, je lis l'erreur en entier** avant de demander. La moitié du métier est là.
- **Je teste sur mon téléphone** (`npm run dev -- --host`), pas seulement sur le PC.
- **Je note mes questions** au fil de l'eau, et je les pose à Claude en fin de séance.
