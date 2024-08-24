RICVA
Bienvenue sur RICVA
RICVA est une plateforme dédiée au suivi et à la gestion du secteur agricole, de la production à la vente.

Fonctionnalités
Création de compte / Connexion : Les utilisateurs peuvent créer un compte ou se connecter.
Si la connexion est réussie, l'utilisateur est redirigé vers la liste des entrepôts.
En cas d'échec, un message d'erreur est affiché.
Gestion des entrepôts : Ajouter, modifier, supprimer, et lire des entrepôts.
Des modals de confirmation sont affichés pour valider les actions (ajout, modification, suppression).
Si l'action n'est pas confirmée, l'utilisateur est redirigé vers la liste des entrepôts.
Validation des formulaires : Les formulaires sont validés localement avant d'être sauvegardés dans la base de données.
Base de données : Utilisation de Firebase pour la gestion des données.
Prérequis
Avant de commencer, assurez-vous d'avoir installé Node.js, pnpm, et d'avoir un compte Firebase configuré.

Installation
Clonez ce dépôt sur votre machine :
git clone <URL_DU_REPOSITORY>
Accédez au répertoire du projet :
cd ricva
Installez les dépendances du projet :
pnpm install
Configuration
Renommez le fichier .env.example en .env et configurez les variables d'environnement nécessaires.
Assurez-vous que les configurations Firebase sont correctes.
Utilisation
Mode développement :
Démarrez l'application en mode développement :
pnpm run start:dev
Accédez à l'URL suivante dans votre navigateur :
http://localhost:4200

Accès en ligne :
Vous pouvez également accéder à l'application en ligne :
RICVA
