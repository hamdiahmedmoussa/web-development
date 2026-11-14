# Diva Salon · site démo

Maquette de démonstration (site **non officiel**) pour Diva Salon, salon de beauté et coiffure
réservé aux femmes, au Bawadi Mall, Djibouti. Construite à partir de la démo Han'sCake.

React, Vite, TypeScript, Motion (`motion/react`), CSS simple.

## Lancer le site

```bash
npm install
npm run dev       # http://localhost:5173
npm run images    # convertit les PNG de public/images/ en WebP
npm test
```

## Les sections

| Section | Composant |
|---|---|
| Ouverture : « Un moment rien que pour vous » et un motif de henné qui se dessine | `components/Accueil` |
| Carte des prestations : un toucher ouvre la demande de rendez-vous | `components/Prestations` |
| Réalisations par thème, « Je veux ce style » | `components/Galerie` |
| Bon à savoir | `components/FAQ` |
| Demande de rendez-vous (jour + matin / après-midi / fin de journée) et aperçu du message WhatsApp | `components/Reservation` |
| Le salon (ouvert / fermé, horaires, itinéraire) et contacts avec icônes | `components/PiedDePage` |
| Bulle « Un rendez-vous ? » | `components/Bulle` |

## Où modifier quoi

| Je veux changer… | Fichier |
|---|---|
| Numéro qui reçoit les rendez-vous, adresse, horaires, réseaux | `src/config.ts` |
| Prestations | `src/data/prestations.ts` |
| Photos des réalisations | `src/data/galerie.ts` + `public/images/galerie/` |
| Bon à savoir | `src/data/faq.ts` |
| Couleurs et polices | `src/styles/variables.css` |

⚠️ `config.whatsappRendezVous` est le numéro de Hamdi pendant la démo. Pour le vrai site : celui du salon.

## Ce qui est vérifié, ce qui ne l'est pas

- **Vérifié** (Instagram, Facebook) : salon réservé aux femmes, Bawadi Mall, comptes @divasalondjibouti.
- **À confirmer** : la liste des prestations, les horaires, le numéro de téléphone.
- **À fournir** : les photos des réalisations (`coiffure-1.png`, `mariee-1.png`, `ongles-1.png`, `henne-1.png`…),
  à récupérer sur leur Instagram avec leur accord.
