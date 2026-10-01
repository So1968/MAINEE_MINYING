# Site V1 — Mainée / MingYin

Site public et page d’atelier protégée, servis par Node.js. L’architecture complète du coffre et des accès invités reste un objectif de développement.

## Liens rapides

- [Projet et identité Mainée](../README.md)
- [Architecture des accès](../ACCES_PROTEGES.md)
- [Tests d’accès HTTP](./tests/server.test.mjs)

## Déploiement Coolify

- Source : `So1968/MAINEE_MINYING`
- Branche : `main`
- Dossier de base : `site`
- Build pack : Dockerfile
- Port : `3000`
- Variable obligatoire : `MAINEE_PRIVATE_PASSWORD`
- Variable optionnelle : `MAINEE_PRIVATE_USER` (défaut : `mainee`)

Définir les identifiants dans les variables de l’hébergeur. Le domaine public doit utiliser HTTPS : l’authentification HTTP Basic ne chiffre pas le transport.

Sans mot de passe configuré, l’atelier reste fermé. Le site public reste accessible.

## Séparation des fichiers

- `public/` contient les fichiers destinés au site public.
- `private/prive.html` est le modèle d’interface de l’atelier, servi après authentification sur `/prive`, `/prive/` et `/prive.html`.
- Le chemin est décodé et normalisé avant le contrôle d’accès.
- Un lien symbolique dans `public/` ne peut pas servir un fichier situé hors de ce dossier.
- Les réponses privées interdisent le cache et demandent l’absence d’indexation.
- Une adresse malformée est refusée ; une page d’atelier manquante ne fait pas tomber le serveur public.

Le modèle d’interface est versionné dans ce dépôt public. Les originaux, documents de travail, mots de passe et données personnelles ne doivent pas y être ajoutés. Le dossier `private/` est ignoré par Git, à l’exception de ce modèle ; ce dossier ne constitue pas à lui seul le coffre de conservation décrit dans les documents de conception.

## Lancement et contrôles locaux

Depuis la racine du dépôt :

```bash
cd site
pwd
node --version
npm test
read -r -s -p "Mot de passe local de l’atelier : " MAINEE_PRIVATE_PASSWORD
printf '\n'
export MAINEE_PRIVATE_PASSWORD
npm start
```

Le projet utilise les modules natifs de Node.js et n’a pas de dépendance à installer. Node.js 20 ou supérieur est déclaré dans le manifeste ; l’image Docker utilise Node.js 22.

La commande de développement `npm run dev` active la synchronisation Git et écoute sur le port 8080. Les tests utilisent un serveur isolé, des fichiers fictifs et désactivent cette synchronisation.

## Vérification de la correction A02

La suite teste les adresses normales et encodées, les connexions acceptées ou refusées, l’absence de mot de passe, les mots de passe contenant un deux-points, les liens symboliques, les requêtes HEAD, les erreurs d’adresse et la disponibilité du site public.

Le workflow GitHub vérifie la syntaxe et cette suite sur Node.js 20 et 22. Un contrôle Docker vérifie aussi que le modèle privé est présent dans l’image et que les adresses privées sont refusées sans identifiant.

Ces essais vérifient le serveur et ses conditions de lancement. Ils ne prouvent pas quelle version est actuellement servie par l’hébergement réel.

## Images

Les images de cette V1 proviennent uniquement des fichiers WhatsApp fournis pour Maryline. Aucune image générée n’est utilisée dans la galerie publique.
