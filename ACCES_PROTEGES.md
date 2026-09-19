# Accès protégés — Mainée / MingYin

## Principe général

Le projet distingue clairement ce qui est public, ce qui appartient à l’atelier privé de Maryline et ce qui peut être partagé temporairement avec une personne choisie.

Aucune œuvre, photographie, note, texte, recherche ou document de travail ne doit devenir public par défaut.

La règle est simple :

> Tout entre dans l’atelier en privé. Rien n’en sort sans une décision explicite de Maryline.

## Les trois niveaux d’accès

### 1. Le site public

Accessible à tous, sans connexion.

Il contient uniquement les éléments validés pour publication :

- page d’accueil ;
- galerie publique ;
- démarche artistique ;
- présentation de Mainée ;
- Cahiers MingYin publiés ;
- actualités et expositions ;
- contact ;
- présentation publique de la recherche doctorale.

Le site public ne donne jamais accès :

- aux fichiers originaux haute définition ;
- aux brouillons ;
- aux œuvres en cours ;
- aux notes privées ;
- aux preuves de création ;
- aux données personnelles ;
- aux textes non validés ;
- à la thèse complète sauf décision expresse de Maryline.

### 2. L’atelier privé de Maryline

Accessible uniquement après connexion sécurisée.

Cet espace contient :

- les originaux ;
- les œuvres en préparation ;
- l’Herbier vivant ;
- la Serre des recherches ;
- le Jardin des séries ;
- les Cahiers en cours d’écriture ;
- les photographies non publiées ;
- les métadonnées ;
- les versions successives ;
- le Sas de protection ;
- les empreintes SHA-256 ;
- les horodatages ;
- le registre des preuves ;
- le portfolio privé ;
- le Chemin du trait ;
- les éléments préparés pour une exposition ou une candidature.

Maryline est propriétaire de cet espace et garde la décision finale sur tout changement de visibilité.

### 3. Les accès invités

Maryline peut ouvrir un accès limité à une personne précise : commissaire d’exposition, galerie, chercheur, partenaire, proche ou autre interlocuteur choisi.

Chaque accès invité doit être :

- limité à une sélection précise ;
- protégé par un lien personnel ou une connexion ;
- éventuellement limité dans le temps ;
- révocable immédiatement ;
- sans accès au reste de l’atelier ;
- sans accès aux originaux ni au registre des preuves, sauf autorisation particulière ;
- traçable dans un journal simple.

Un invité peut seulement voir ce que Maryline lui a explicitement ouvert.

## Rôles prévus

### Mainée — propriétaire

Droits complets :

- créer ;
- modifier ;
- protéger ;
- classer ;
- partager ;
- publier ;
- retirer une publication ;
- ouvrir ou fermer un accès invité ;
- consulter le registre des preuves.

### Administrateur technique

Accès limité à la maintenance du logiciel.

Il ne doit pas pouvoir publier une œuvre ni décider à la place de Maryline.

Toute intervention sensible doit être visible dans un journal d’activité.

### Invité

Accès en lecture seule à une sélection déterminée.

### Public

Accès uniquement aux contenus déjà publiés.

## Sécurité attendue

Le système devra prévoir au minimum :

- mots de passe robustes ;
- stockage chiffré des mots de passe ;
- connexion sécurisée HTTPS ;
- sessions qui expirent ;
- protection contre les tentatives répétées ;
- sauvegarde régulière ;
- séparation stricte entre fichiers publics et fichiers privés ;
- originaux stockés hors du dossier public du site ;
- journal des connexions et des partages ;
- révocation immédiate d’un lien invité ;
- possibilité d’activer une double authentification ;
- absence de données sensibles dans les adresses web ;
- aucune indexation des espaces privés par les moteurs de recherche.

## Protection des fichiers

Les fichiers privés ne doivent jamais être accessibles par une adresse publique permanente.

Lorsqu’un fichier privé est consulté :

- le logiciel vérifie l’identité et les droits ;
- il délivre un accès temporaire ;
- il peut afficher une version réduite ou filigranée ;
- l’original reste conservé dans le coffre privé ;
- l’action peut être inscrite dans le journal.

## Publication en deux gestes

Une publication ne doit jamais résulter d’un clic accidentel.

Le parcours comprend deux décisions distinctes :

1. **Préparer pour publication** : création de la copie web, vérification du titre, des crédits, des métadonnées et de la protection.
2. **Publier maintenant** : confirmation explicite de Maryline.

Le même principe s’applique au retrait d’une œuvre publique et à l’envoi d’un portfolio privé.

## États de visibilité

Chaque élément peut porter l’un des états suivants :

- Secret d’atelier ;
- Privé — travail en cours ;
- Visible par une personne choisie ;
- Portfolio privé ;
- Prêt pour le site ;
- Public ;
- Retiré du public ;
- Archivé.

Le changement d’état reste réversible, sauf lorsqu’une copie a déjà été reçue ou enregistrée par un tiers : le logiciel doit le rappeler honnêtement.

## Interface

La protection doit être compréhensible immédiatement.

Chaque écran indique clairement :

- qui peut voir l’élément ;
- s’il est protégé ;
- s’il est partagé ;
- s’il est public ;
- la dernière décision prise ;
- le bouton permettant de fermer l’accès.

Les métaphores de l’atelier peuvent accompagner l’interface, mais les actions sensibles utilisent toujours des mots directs :

- Privé ;
- Partager ;
- Fermer l’accès ;
- Préparer pour publication ;
- Publier ;
- Retirer du site.

## Première version à construire

La première version fonctionnelle doit contenir :

1. une page publique ;
2. une page de connexion ;
3. un tableau de bord privé ;
4. une photothèque privée ;
5. une fiche par œuvre ;
6. les états de visibilité ;
7. un dossier d’originaux non public ;
8. un partage invité révocable ;
9. un journal minimal des actions ;
10. une publication en deux gestes.

Les fonctions plus avancées pourront venir ensuite, mais cette séparation des accès doit être présente dès le début du développement.
