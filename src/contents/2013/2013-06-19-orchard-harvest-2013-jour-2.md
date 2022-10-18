---
title: Orchard Harvest 2013 Keynote Jour 2
author: agriffard
datetime: 2013-06-19T12:00:00Z
categories: [Orchard]
tags: [Harvest]
---

Sébastien Ros a fait un tour d'horizon des évolutions et des nouveautés qu'amènera la prochaine version 1.7 d'Orchard.

Les performances seront améliorées grâce l'abandon de Clay pour charger des objets dynamiques. La quantité de mémoire nécessaire sera réduite et le temps de chargement sera accéléré.

Les recettes (Recipes) pourront maintenant être incluses dans les modules et une page permettra de les lister et les exécuter.

La recherche pourra être divisée en plusieurs index pour séparer l'indexation des contenus et de leurs propriétés.

De nouveaux layouts seront disponibles pour les projections : Shape et Raw.

Un Shape menu item sera très utile pour définir un élément de menu à partir d'une Shape (typiquement, par un fichier .cshtml dans le thème).

Une validation par script pourra être activée pour déclarer du code C# afin de renvoyer ou non une erreur en fonction de l'élément de contenu publié.  
Une syntaxe alternative pour les tokens ( #{Token} ) permettra d'y accéder dans ce code C#.

L'apparition de Threaded Comments permettra d'obtenir des commentaires hiérarchiques avec des réponses associées.

Certains modules externes ont été intégrés dans les modules disponibles par défaut : Orchard.Taxonomies, Orchard.OutputCache.

Enfin, les nouvelles fonctionnalités qui apparaîtront dans la version 1.7 ont été présentées :

## Workflows

Ce tout nouveau module donnera la possibilité de déclarer des évènements qui déclencheront des tâches ou des activités via un éditeur avec des éléments à glisser-déposer et paramétrer manuellement. Il sera ainsi très simple de mettre en place un mécanisme d'approbation de contenu avec envoi de mail, vérification de rôles, notification.

## Media library

Une interface améliorée de gestion des medias permettra d'organiser, d'importer et d'éditer les fichiers comme les images. Tout média s'apparentera ainsi à un élément de contenu à part entière. De plus, la plupart des éléments sont extensibles, ce qui autorise par exemple de développer son propre mécanisme d'import depuis des services externes (SkyDrive, DropBox,…).

Des media profiles permettront quant à eux de générer des transformations lors de l'upload d'images pour par exemple redimensionner, générer une vignette, …

Pour finir, il a été question de la vNext et des futures évolutions apportées à la plateforme :

- Nouveau Default theme.
- Amélioration de l'administration
- Déploiement de contenu
- Layout de page ; Builder
- Evolution du site Web Orchard.
- Nouvelle implémentation de la galerie.
