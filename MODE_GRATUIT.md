# Mode gratuit obligatoire — Mainée MingYin

## Principe

Le logiciel et le site doivent fonctionner sans abonnement, sans API payante et sans dépôt payant obligatoire.

Le sas gratuit combine plusieurs traces techniques indépendantes. Elles améliorent fortement la preuve d'antériorité et d'intégrité, mais ne remplacent pas juridiquement un horodatage électronique qualifié ou un dépôt e-Soleau.

## Parcours automatisé gratuit

1. Import privé depuis le téléphone ou l'ordinateur.
2. Conservation de l'original sans modification.
3. Calcul de l'empreinte SHA-256.
4. Extraction des métadonnées utiles.
5. Création d'un identifiant stable et d'un manifeste JSON.
6. Copie de l'original dans deux emplacements privés distincts.
7. Création d'une preuve OpenTimestamps `.ots`, sans compte ni clé API.
8. Inscription de l'empreinte et du manifeste dans un registre Git privé versionné.
9. Création d'une copie web réduite, créditée et nettoyée des données privées.
10. Ajout d'un manifeste C2PA avec l'outil libre `c2patool`.
11. Validation manuelle de Mainée.
12. Publication uniquement après validation.

## Outils gratuits prévus

- SHA-256 fourni par le système ou la bibliothèque standard ;
- ExifTool pour les métadonnées ;
- OpenTimestamps pour l'horodatage blockchain gratuit ;
- Git pour l'historique du registre ;
- dépôt GitHub privé gratuit pour les manifestes, empreintes et journaux, jamais pour les originaux lourds ou confidentiels ;
- c2patool pour la provenance C2PA ;
- ImageMagick ou Sharp pour créer les copies web ;
- stockage local sur ordinateur et disque externe déjà disponible.

## Ce qui reste facultatif et payant

- e-Soleau ;
- horodatage électronique qualifié ;
- certificat C2PA délivré par une autorité reconnue ;
- stockage cloud immuable professionnel.

Ces services ne doivent jamais bloquer le fonctionnement normal du logiciel. Ils pourront être ajoutés plus tard uniquement si Mainée le décide.

## Règle de coût

Aucune création ne doit nécessiter un paiement pour passer de `ORIGINAL_RECU` à `PRET_A_PUBLIER`.
