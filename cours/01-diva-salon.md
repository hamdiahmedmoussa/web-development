# Cours 1 · Diva Salon

**Ce que tu sauras faire à la fin** : un site React complet, découpé en composants, avec un formulaire
qui prépare un message WhatsApp, un état « ouvert / fermé » juste à l'heure de Djibouti, et des tests.

Le vrai projet est dans `diva-salon/`. Tu vas le reconstruire dans `entrainement/diva-salon/`.

---

## Partie A · La conception

### 1. Le problème à résoudre

Aujourd'hui, une cliente écrit au salon sur Instagram ou WhatsApp : « Bonjour, c'est combien un brushing ?
Vous avez de la place samedi ? » Puis il faut des allers-retours pour savoir quoi, quand, et pour qui.

**L'idée du site** : la cliente choisit la prestation, le jour et le moment, écrit son prénom, et
**le site prépare le message complet**. Elle n'a plus qu'à appuyer sur « Envoyer sur WhatsApp ».
Le salon reçoit une demande prête à confirmer en une seule réponse.

**Pourquoi pas de paiement ni de base de données ?** Parce que le salon fonctionne déjà avec WhatsApp :
on ne change pas ses habitudes, on les simplifie. Moins de code, rien à héberger, rien à pirater.

### 2. Le parcours de la cliente

```
Elle arrive  →  voit le nom, « réservé aux femmes », « Ouvert jusqu'à 20 h »
             →  descend vers la carte des prestations  ─┐
             →  ou vers les réalisations (photos)       ├─ elle touche « Réserver » ou « Je veux ce style »
             →  ou touche la bulle « Un rendez-vous ? » ┘
             →  une fenêtre s'ouvre : prénom, jour, matin / après-midi / soir, précision
             →  « Préparer ma demande » : elle VOIT le message, dans une bulle verte
             →  « Envoyer sur WhatsApp » : WhatsApp s'ouvre, message déjà écrit
```

Deux choix de conception à retenir :
- **On montre le message avant de l'envoyer.** Plus rassurant qu'un bouton qui part dans le vide.
- **On demande un « moment » (matin, après-midi, soir), pas une heure précise.** C'est le salon qui connaît
  son planning : il confirme l'heure, comme il le fait déjà.

### 3. L'arbre des composants

```
<App>
 └─ <ReservationProvider>                 ← garde « ce que la cliente veut réserver »
     ├─ <Entete>                          ← nom du salon + <Statut> (ouvert / fermé)
     ├─ <main>
     │   ├─ <Accueil>  + <Henne>          ← ouverture, motif qui se dessine
     │   ├─ <Prestations>                 ← carte des prestations → ouvrir(…)
     │   ├─ <Galerie>  + <Visuel>         ← photos par thème → ouvrir(…)
     │   └─ <FAQ>                         ← « Bon à savoir »
     ├─ <PiedDePage> + <Statut>           ← adresse, horaires, contacts
     ├─ <Bulle>                           ← « Un rendez-vous ? » qui apparaît en descendant
     └─ <Reservation>                     ← la fenêtre du formulaire (lit la demande)
```

### 4. Le chemin des données (le plus important)

**Le problème** : trois composants éloignés (`Prestations`, `Galerie`, `Bulle`) doivent tous ouvrir
**la même** fenêtre `Reservation`, et lui dire quoi réserver.

**La solution : un contexte.** `ReservationProvider` garde une seule information, `demande`, et donne à tous
ses enfants deux fonctions : `ouvrir(demande)` et `fermer()`.

```
Prestations ──ouvrir({type:"prestation", …})──┐
Galerie ──────ouvrir({type:"style", …})───────┤──►  ReservationContext.demande  ──►  Reservation s'ouvre
Bulle ────────lien vers #prestations          │                                      et affiche le formulaire
Reservation ──fermer()────────────────────────┘
```

Sans contexte, il faudrait faire « descendre » `ouvrir` à travers `App` → `main` → chaque composant
(on appelle ça le *prop drilling*). Avec 3 composants, c'est déjà pénible ; avec 10, c'est ingérable.

### 5. Le rôle de chaque dossier

| Dossier | Ce qu'il contient | Règle |
|---|---|---|
| `config.ts` | Nom, numéro WhatsApp, adresse, horaires, réseaux | Pour un nouveau client, on change **ce fichier**, pas les composants |
| `data/` | Prestations, photos de la galerie, questions | Le contenu, séparé de l'affichage |
| `types.ts` | La « forme » des données (TypeScript) | Le compilateur vérifie qu'on la respecte partout |
| `lib/` | Fonctions **pures** : message WhatsApp, ouvert / fermé | Aucune dépendance à React : faciles à tester |
| `context/` | Le contexte de réservation | La seule « mémoire » partagée du site |
| `hooks/` | `useMaintenant` (l'heure, mise à jour chaque minute) | Logique React réutilisable |
| `components/` | Un dossier par composant, avec son CSS | Chaque composant ne fait qu'une chose |

C'est **la même organisation que Han'sCake** : une fois comprise, tu peux faire un site par commerce.

---

## Partie B · Les notions React, une par une

Pour chaque notion : l'idée, puis **où la regarder** dans le vrai projet.

**1. Composant et props.** Un composant est une fonction qui reçoit des « props » et renvoie du JSX.
→ `components/Visuel/Visuel.tsx` reçoit `chemin`, `alt`, `prioritaire`… et affiche une image.

**2. Listes et `key`.** `.map()` transforme un tableau de données en éléments ; chaque élément a une `key`
unique pour que React sache lequel a changé.
→ `components/Prestations/Prestations.tsx` : `categories.map(c => …)` puis `c.prestations.map(p => …)`.

**3. État (`useState`).** Une valeur dont le changement redessine le composant.
→ `Reservation.tsx` : `infos` (ce que la cliente tape) et `message` (null = formulaire, texte = aperçu).

**4. Formulaire « contrôlé ».** La valeur du champ vient de l'état, et chaque frappe met l'état à jour.
→ `value={infos.prenom} onChange={(e) => modifier("prenom", e.target.value)}`.
La fonction `modifier` est générique : elle marche pour n'importe quel champ, avec le bon type.

**5. Rendu conditionnel.** `{message ? <Apercu/> : <Formulaire/>}` : on affiche l'un ou l'autre.

**6. Contexte (`createContext`, `useContext`).** Partager une valeur sans la passer de parent en enfant.
→ `context/ReservationContext.tsx`. Remarque le `throw` dans `useReservation` : si on oublie le Provider,
l'erreur est claire au lieu d'un plantage mystérieux.

**7. Effet (`useEffect`).** Faire quelque chose **après** l'affichage, en réaction à un changement.
→ `Reservation.tsx` : quand `demande` change, on appelle `showModal()` ou `close()` sur le `<dialog>`.
→ `hooks/useMaintenant.ts` : un minuteur, et **son nettoyage** (`clearInterval`) dans le `return`.
Sans nettoyage, chaque passage créerait un minuteur de plus.

**8. Référence (`useRef`).** Accéder à un vrai élément HTML (ici le `<dialog>`) pour appeler ses méthodes.

**9. `key` pour remettre à zéro.** `<Contenu key={JSON.stringify(demande)} …/>` : si la demande change,
React jette l'ancien formulaire et en crée un neuf, vide. Astuce élégante, à retenir.

**10. Hook personnalisé.** Une fonction `useQuelqueChose` qui regroupe état et effet réutilisables.
→ `useMaintenant` et `useReservation`.

**11. TypeScript : l'union discriminée.**
```ts
type Demande =
  | { type: "prestation"; categorie: string; prestation: string }
  | { type: "style"; theme: string; modele: string };
```
Après `if (demande.type === "prestation")`, TypeScript **sait** que `demande.prestation` existe.
→ `lib/whatsapp.ts`, fonction `creerMessage`.

**12. Fonctions pures et tests.** `creerMessage` et `etatBoutique` ne dépendent que de leurs paramètres :
même entrée, même sortie. On les teste avec Vitest (`lib/*.test.ts`), sans navigateur.

**13. L'heure de Djibouti.** `Intl.DateTimeFormat` avec `timeZone: "Africa/Djibouti"` : le site affiche le bon
« ouvert / fermé » même si la cliente est à Paris. → `lib/horaires.ts`, fonction `heureLocale`.

**14. Le lien WhatsApp.** `https://wa.me/<numéro>?text=<message>`, avec `encodeURIComponent` pour que les
espaces, accents et retours à la ligne passent dans l'adresse. → `creerLienWhatsApp`.

**15. `<dialog>` natif.** Le navigateur gère pour nous la touche Échap, le fond sombre et le clavier
gardé dans la fenêtre. Moins de code, plus accessible qu'une fenêtre « faite main ».

**16. Animations (Motion).** `AnimatePresence` permet d'animer un élément **qui disparaît** ;
`useReducedMotion` respecte les personnes qui ont demandé moins d'animations.

---

## Partie C · Reconstruire, étape par étape

Prépare le dossier d'entraînement :

```bash
cd web-development
mkdir -p entrainement && cd entrainement
npm create vite@latest diva-salon -- --template react-ts
cd diva-salon
npm install
npm install motion
npm install -D vitest
npm run dev
```

Pour chaque étape : **écris d'abord**, vérifie le résultat, **puis seulement** compare avec le fichier indiqué.

| # | Objectif | Ce que tu dois voir | Indice | Comparer avec |
|---|---|---|---|---|
| 1 | Vider le modèle Vite ; créer `config.ts` avec le nom, le numéro et l'adresse | « Diva Salon » affiché depuis `config.nom` | `export const config = { … }` | `src/config.ts` |
| 2 | `types.ts` : `Categorie`, `Prestation` ; `data/prestations.ts` avec 2 catégories | — (rien à l'écran, mais aucune erreur TypeScript) | Une catégorie = `{ id, nom, prestations: [...] }` | `src/types.ts`, `src/data/prestations.ts` |
| 3 | Composant `Prestations` qui affiche la carte | Les catégories et leurs prestations | Deux `.map()` imbriqués, chacun avec une `key` | `components/Prestations/` |
| 4 | `lib/whatsapp.ts` : `creerMessage` et `creerLienWhatsApp` **+ un test** | `npx vitest run` : test vert | Teste d'abord avec un objet écrit à la main | `src/lib/whatsapp.ts` et `.test.ts` |
| 5 | Le contexte `ReservationContext` ; le bouton d'une prestation appelle `ouvrir(...)` | `console.log(demande)` affiche la prestation touchée | `useState<Demande \| null>(null)` dans le Provider | `src/context/ReservationContext.tsx` |
| 6 | Le composant `Reservation` avec `<dialog>` qui s'ouvre et se ferme | Toucher une prestation ouvre la fenêtre ; Échap la ferme | `useRef` + `useEffect` qui appelle `showModal()` | `components/Reservation/` |
| 7 | Le formulaire contrôlé (prénom, date, moment, précision) | Ce que tu tapes reste affiché ; date minimale = aujourd'hui | Un seul état `infos`, et une fonction `modifier` | `Reservation.tsx`, fonction `Contenu` |
| 8 | L'aperçu du message puis le lien WhatsApp | « Préparer » montre le message ; « Envoyer » ouvre WhatsApp | État `message` : `null` ou texte | `Reservation.tsx` |
| 9 | `lib/horaires.ts` + `useMaintenant` + `<Statut>` dans l'en-tête **+ un test** | « Ouvert jusqu'à 20 h » ou « Nous ouvrons à 9 h » | Commence par `heureLocale`, teste-la avec une date fixe | `src/lib/horaires.ts`, `hooks/`, `PiedDePage/Statut.tsx` |
| 10 | La galerie qui ouvre aussi la réservation (« Je veux ce style ») | Toucher une photo ouvre le formulaire avec le bon titre | Le second cas de l'union `Demande` | `components/Galerie/` |
| 11 | Le style : variables CSS, téléphone d'abord | Lisible sur téléphone (`npm run dev -- --host`) | Couleurs dans `:root`, jamais en dur dans les composants | `styles/variables.css`, `global.css` |
| 12 | Bonus : la bulle, le motif de henné, les animations | — | Garde-les pour la fin : c'est de la décoration | `Bulle/`, `Accueil/Henne.tsx` |

**Conseil** : fais un commit à chaque étape réussie (`git add -A && git commit -m "Étape 3 : prestations"`).
Si tu casses tout, tu reviens en arrière.

---

## Partie D · Vérifie que tu as compris

Réponds sans regarder, puis ouvre la réponse.

<details><summary>1. Pourquoi un contexte, et pas des props, pour ouvrir la réservation ?</summary>

Trois composants éloignés (prestations, galerie, bulle) doivent ouvrir la même fenêtre. Avec des props, il
faudrait faire passer `ouvrir` par tous les composants intermédiaires (*prop drilling*). Le contexte la rend
disponible partout sous le Provider.
</details>

<details><summary>2. Que se passerait-il sans le <code>return () => clearInterval(...)</code> de useMaintenant ?</summary>

À chaque fois que le composant est retiré puis remis (et deux fois en développement avec `StrictMode`),
un nouveau minuteur serait créé sans que l'ancien s'arrête : fuite de mémoire et mises à jour en double.
</details>

<details><summary>3. Pourquoi <code>encodeURIComponent</code> dans le lien WhatsApp ?</summary>

Une adresse web n'accepte pas directement les espaces, accents, `&`, `?` ou retours à la ligne. Sans encodage,
le message serait coupé ou déformé.
</details>

<details><summary>4. À quoi sert <code>key={JSON.stringify(demande)}</code> sur <code>&lt;Contenu&gt;</code> ?</summary>

Quand la cliente choisit une autre prestation, la `key` change : React recrée le formulaire à neuf, donc vide,
au lieu de garder le prénom et la date de la demande précédente.
</details>

<details><summary>5. Pourquoi calculer « ouvert / fermé » avec <code>timeZone: "Africa/Djibouti"</code> ?</summary>

`new Date()` donne l'heure du téléphone de la visiteuse. Une cliente à Paris (2 h de décalage) verrait
« ouvert » alors que le salon est fermé. On convertit donc toujours à l'heure de Djibouti.
</details>

<details><summary>6. Pourquoi <code>creerMessage</code> est-elle dans <code>lib/</code> et pas dans le composant ?</summary>

C'est une fonction pure : elle se teste sans navigateur, se réutilise (Han'sCake a la même), et le composant
reste court et lisible.
</details>

<details><summary>7. Un nouveau client, un barbier, veut le même site. Que changes-tu ?</summary>

`config.ts` (nom, numéro, adresse, horaires), `data/` (prestations, photos, questions), les couleurs dans
`styles/variables.css`. Les composants ne bougent pas : c'est tout l'intérêt de l'organisation.
</details>

---

## Partie E · Ta variante

Refais le site pour un **autre commerce** de ton choix (barbier, garage, cours particuliers…) :
- une carte de services à réserver ;
- une autre palette de couleurs ;
- **une règle en plus** : par exemple, pas de rendez-vous le vendredi matin. Le champ date doit le refuser,
  et un test doit le vérifier.

Quand c'est fait, envoie-moi ton code : je te fais une relecture comme un développeur expérimenté le ferait.
