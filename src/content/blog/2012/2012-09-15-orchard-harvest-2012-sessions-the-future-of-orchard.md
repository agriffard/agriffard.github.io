---
title: Orchard Harvest 2012 Sessions The future of Orchard
author: agriffard
pubDatetime: 2012-09-15T12:00:00Z
categories: [Orchard]
tags: [Harvest]
description: The future of Orchard
---

Samedi 8 Septembre, 10h – 10h45.

Speaker : Sébastien Ros.

![Orchard Harvest 2012](/assets/blog/Harvest/2012/OrchardHarvest2012_2.jpg)

L'objectif de cette session était d'avoir un aperçu des futures fonctionnalités implémentées dans les prochaines versions d'Orchard.

## Fonctionnalités les plus attendues

Voici donc de possibles axes de développements pour des modules qui sont encore à réaliser :

- Workflow : Mécanisme de validation et d'état : Draft =&gt; Review =&gt; Published
- Deploiement : Gérer la synchronisation des contenus entre les différents environnement : Développement, Recette / Staging, Production.
- Layers : 'Placed Content Part' pour plus facilement disposer des éléments dans une page.
- Calendar / Events : 'Event Part' avec une date de début et de fin, 'Projection Layout' pour afficher les dates et évènements dans un calendrier (Mois, Semaine, Jour, …)
- Shapes : 'Code editor' pour rendre les shapes un peu plus dynamiques et éditables.

## Contributions des développeurs

Sébastien en a profité pour rappeler les étapes qui mène à la création de modules :

- Discussion : Dans le forum, les réseaux sociaux ou par mail pour faire part d'une idée.
- Design : Pour définir les grandes lignes et l'objectif du module.
- Implémentation : Pour le développement.

Il a ainsi donné des exemples de contributions très concluantes qui ont conduit au développement de modules comme Autoroute (Gestion des urls dynamiques) ou Content items permissions avec l'aide de personnes se trouvant à l'autre bout du monde (Angleterre, Nouvelle Zélande, …)

## Démos de modules

Dans le même genre d'idées, un module Scheduler a récemment était publié sur la galerie : [http://gallery.orchardproject.net/List/Modules/Orchard.Module.Orchard.Scheduler/1.5.4](http://gallery.orchardproject.net/List/Modules/Orchard.Module.Orchard.Scheduler/1.5.4)

Il permet de planifier des actions en utilisant le moteur de Rules (Règles qui réagissent à des évènements) et TaskLease (exécution de tâches en arrière plan).

## Gestion des médias

Une des grandes évolutions attendues à partir de la version 1.7 (la 1.6 n'étant essentiellement qu'une mise à jour de librairies importantes comme ASP.NET MVC 4, Web API, NHibernate 3.3 ainsi que des corrections de bugs) sera la nouvelle gestion des médias.

Un des développements en cours s'appelle le Media Processing qui va permettre d'appliquer des filtres sur des images.

Voici des exemples de filtres qui peuvent être regroupés dans des Profiles (= série de filtres identifiée par un nom) :

- Thumbnail : Resize, Crop = redimensionner une image
- Image Format : changer le format de l'image source
- CDN : faire pointer vers un Content Delivery Network

Les filtres à disposition sont de plus extensibles et peuvent être développés depuis d'autres modules pour enrichir les existants.

Des évolutions viseront également à améliorer les performances et la gestion des contenus (versionning, …).

## Document databases

Orchard permet déjà de stocker ses données dans des bases Sql Server, Sql Compact et bientôt MySql.

Une réflexion est évoquée en parallèle afin de permettre de supporter des bases NoSql qui seraient très appropriées pour indexer les types de contenus présents dans Orchard.

Etant donné que des moteurs comme MongoDb (Non transactionnel) ou RavenDb (payant) ne s'avèrent pas être des alternatives qui répondent à toutes les attentes, une des pistes serait d'utiliser [YesSql](https://github.com/sebastienros/yessql), un moteur de base de données documentaire pouvant se servir de n'importe quelle base de données relationnelle.

Bref, il y a encore de futures fonctionnalités très intéressantes à développer pour Orchard.  
N'hésitez pas à rejoindre le [projet Orchard](http://orchardproject.net/) et à participer pour contribuer à son évolution.
