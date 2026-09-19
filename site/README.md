# Site V1 — Mainée / MingYin

Site public codé pour être déployé depuis GitHub sur Coolify (ou tout hébergeur Docker).

## Déploiement Coolify
- Source : `So1968/MAINEE_MINYING`
- Branche : `main`
- Dossier de base : `site`
- Build pack : Dockerfile
- Port : `3000`
- Variable obligatoire : `MAINEE_PRIVATE_PASSWORD`
- Variable optionnelle : `MAINEE_PRIVATE_USER` (défaut : `mainee`)

Le site public est ouvert. `/prive` est fermé tant qu’un mot de passe n’est pas défini, puis protégé par authentification HTTP Basic.

## Images
Les images de cette V1 proviennent uniquement des fichiers WhatsApp fournis pour Maryline. Aucune image générée n’est utilisée dans la galerie publique.
