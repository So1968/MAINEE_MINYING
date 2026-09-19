# Architecture du logiciel de protection MingYin

## Objectif

Construire un site galerie relié à un bureau privé dans lequel chaque contenu traverse un sas gratuit avant publication.

## Règle économique

Le fonctionnement normal doit rester gratuit : aucun abonnement, aucune API payante, aucun dépôt payant obligatoire.

## Modules

### 1. Boîte d'arrivée privée

- import depuis téléphone ou ordinateur ;
- prise en charge initiale des formats JPEG, PNG, TIFF et PDF ;
- ajout ultérieur des formats RAW ;
- aperçu privé sans modification de l'original.

### 2. Registre des créations

Chaque contenu possède :

- un identifiant stable ;
- un type : photographie, œuvre, texte, article, vidéo ou document ;
- une autrice ;
- un titre ;
- une série ;
- un état de protection ;
- un état de publication ;
- un historique de versions.

### 3. Moteur de preuve gratuit

Le moteur :

- calcule une empreinte SHA-256 ;
- enregistre l'heure de réception par l'ordinateur ;
- extrait les métadonnées ;
- produit un manifeste JSON ;
- conserve un journal append-only des opérations ;
- crée une preuve OpenTimestamps `.ots` ;
- inscrit l'empreinte et le manifeste dans un registre Git privé ;
- contrôle que le fichier courant correspond toujours à l'empreinte enregistrée.

### 4. Archive maître locale

L'original est stocké dans deux emplacements privés distincts, idéalement l'ordinateur et un disque externe. La copie maître ne peut pas être remplacée silencieusement : toute modification crée une nouvelle version reliée à la précédente.

Le registre Git ne reçoit que les empreintes, manifestes et journaux. Les originaux lourds, RAW ou confidentiels ne sont pas envoyés sur GitHub.

### 5. Provenance de diffusion

Une copie distincte destinée au site reçoit :

- le nom de Mainée ;
- la mention de droits ;
- l'identifiant de l'œuvre ;
- un manifeste de provenance C2PA créé avec `c2patool` ;
- une taille et une qualité adaptées au web ;
- un filigrane visible optionnel ;
- un marquage discret optionnel destiné à faciliter le suivi.

Un manifeste C2PA créé avec des outils libres reste utile pour la traçabilité. Sans certificat délivré par une autorité reconnue, sa confiance publique peut toutefois être limitée.

### 6. Dossier de preuve exportable

Le logiciel peut regrouper gratuitement les éléments choisis dans une archive comprenant :

- les originaux sélectionnés ;
- une table des œuvres ;
- les empreintes ;
- les dates ;
- un PDF récapitulatif ;
- les preuves OpenTimestamps ;
- le manifeste de preuve.

Cette archive reste utilisable pour une sauvegarde, une transmission à un avocat, une exposition ou un dépôt payant ultérieur décidé par Mainée.

### 7. Porte de publication

Le site public ne reçoit jamais directement un fichier importé. Il interroge uniquement le catalogue des contenus autorisés.

La publication nécessite :

- l'intégrité de l'original vérifiée ;
- la fiche minimale complétée ;
- la preuve OpenTimestamps créée ;
- le manifeste inscrit dans le registre Git privé ;
- la copie web générée ;
- la décision explicite de Mainée.

Aucun récépissé payant ne peut être exigé pour publier.

## Écrans du bureau privé

- À protéger
- En cours de traitement
- À compléter
- Prêts à publier
- Horodatages gratuits
- Galerie publiée
- Articles et photographie
- Registre des preuves
- Alertes et erreurs

## Première version réalisable

### Phase 1 — preuve locale et galerie verrouillée

- import privé ;
- empreinte SHA-256 ;
- métadonnées ;
- identifiant stable ;
- fiche d'œuvre ;
- journal des opérations ;
- double sauvegarde locale ;
- génération de la copie web ;
- autorisation manuelle de publication.

### Phase 2 — preuve externe gratuite

- intégration OpenTimestamps ;
- vérification automatique des preuves `.ots` ;
- registre Git privé ;
- intégration C2PA libre ;
- export du dossier complet de preuve.

### Phase 3 — surveillance gratuite ou manuelle

- registre des signalements ;
- constitution automatique d'un dossier de comparaison ;
- suivi des demandes de retrait ;
- outils gratuits de recherche inversée utilisés manuellement lorsque nécessaire.

## Services payants facultatifs

- e-Soleau ;
- horodatage électronique qualifié ;
- certificat C2PA reconnu ;
- stockage cloud immuable professionnel.

Ils ne font pas partie du fonctionnement obligatoire.

## Limite essentielle

Le système améliore fortement la preuve, la traçabilité et la maîtrise de la publication. Il ne peut ni interdire techniquement toute copie, ni transformer une idée générale en monopole juridique. Une preuve OpenTimestamps ou Git n'offre pas la même présomption juridique qu'un horodatage électronique qualifié.
