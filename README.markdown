# Blood Bowl Saison 2 - Site Web

## Aperçu
Ce projet est un site web interactif dédié à *Blood Bowl* (Saison 2), un jeu de plateau de football fantastique. Le site fournit des informations sur les équipes, les compétences, les traits, les règles, et les joueurs stars du jeu, avec une interface utilisateur claire et responsive. Les données sont chargées dynamiquement à partir de fichiers JSON, et des fonctionnalités de recherche et de filtrage améliorent l'expérience utilisateur.

## Structure du Projet
Le projet est organisé comme suit :

- **index.html** : Page d'accueil avec une introduction au jeu.
- **teams.html** : Page listant les équipes, avec une barre de recherche et des détails (joueurs, coûts, stats, compétences) affichés dynamiquement.
- **skills.html** : Page listant les compétences et traits, avec une barre de recherche et des filtres par catégorie (Générales, Agilité, Force, Passe, Mutations, Traits).
- **rules.html** : Page listant les règles condensées, avec une barre de recherche et des détails incluant des tableaux (météo, coup d'envoi).
- **starplayers.html** : Page listant les joueurs stars, avec une barre de recherche et des détails (coût, stats, compétences, équipes jouables).
- **styles.css** : Feuille de style pour une mise en page cohérente et responsive.
- **app.js** : Script JavaScript gérant la navigation, le chargement des données JSON, le rendu des cartes, la recherche et l'affichage des détails.
- **data/** :
  - **skills.json** : Données des compétences et traits (nom, catégorie, description).
  - **teams.json** : Données des équipes (nom, description, catégorie, relances, apothicaire, règles spéciales, joueurs).
  - **rules.json** : Données des règles (titre, description, tableaux pour météo et coup d'envoi).
  - **starplayers.json** : Données des joueurs stars (nom, coût, stats, compétences, équipes jouables, description).

## Fonctionnalités
- **Navigation** : Barre de navigation cohérente sur toutes les pages, avec surlignage du lien actif.
- **Recherche** : Barres de recherche sur `teams.html`, `skills.html`, `rules.html`, et `starplayers.html` pour filtrer par nom, description, ou autres critères.
- **Filtres** : Filtres par catégorie pour les compétences sur `skills.html`.
- **Affichage Dynamique** : Données chargées depuis JSON, avec des cartes cliquables pour afficher les détails des équipes, compétences, règles, ou joueurs stars.
- **Responsive** : Design adapté aux écrans de bureau, tablettes et mobiles.

## Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, etc.).
- Un serveur web local (optionnel, pour tester localement) comme `http-server` (Node.js) ou tout autre serveur statique.
- Pas de dépendances externes (le site est purement HTML/CSS/JS).

## Instructions pour Lancer le Site
1. **Cloner ou Télécharger le Projet** :
   - Clonez le dépôt ou téléchargez les fichiers dans un dossier local.
2. **Héberger les Fichiers** :
   - Option 1 : Ouvrez `index.html` directement dans un navigateur (note : le chargement des fichiers JSON peut être bloqué en local à cause des restrictions CORS).
   - Option 2 : Utilisez un serveur local :
     - Installez Node.js si nécessaire.
     - Installez `http-server` : `npm install -g http-server`.
     - Depuis le dossier du projet, lancez : `http-server`.
     - Accédez au site via `http://localhost:8080`.
3. **Naviguer** :
   - Ouvrez `index.html` pour l'accueil.
   - Utilisez la barre de navigation pour accéder aux pages Équipes, Compétences, Règles, ou Joueurs Stars.
   - Utilisez les barres de recherche et filtres pour explorer les données.

## Développement
- **Ajout de Données** : Modifiez `skills.json`, `teams.json`, `rules.json`, ou `starplayers.json` pour ajouter ou mettre à jour des données.
- **Personnalisation des Styles** : Modifiez `styles.css` pour ajuster l'apparence (couleurs, mise en page, animations).
- **Extension des Fonctionnalités** : Mettez à jour `app.js` pour ajouter des fonctionnalités comme des filtres pour les équipes ou l'export en PDF.

## Notes
- Les données sont basées sur les règles de *Blood Bowl* Saison 2 (PDF de référence, pages 43-47 pour les compétences, pages 66-68 pour les joueurs stars, et autres sections pour les équipes et règles).
- Le site est conçu pour être léger et autonome, sans dépendances externes.
- Testé sur Chrome, Firefox et Safari (version de juillet 2025).

## Auteur
Généré avec l'assistance de Grok 3, créé par xAI.

## Licence
Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer selon les termes de cette licence.