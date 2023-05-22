---
title: Orchard Harvest 2012 Performance
author: agriffard
pubDatetime: 2012-09-21T12:00:00Z
categories: [Orchard]
tags: [Harvest]
description: Performance
---

Dimanche 9 Septembre, 11:45 am - 12:30 pm

Speaker : Sébastien Ros ([@sebastienros](https://twitter.com/sebastienros))

Cette session avait pour objectif de présenter les fonctionnalités liées à l'amélioration des performances d'un site [Orchard](http://orchardproject.fr/).

## Performances d'un site

Il faut tout d'abord bien comprendre que l'utilisation moyenne d'un site (en nombre de visites et de pages) peut être très différente en fonction des pics d'utilisation qui peuvent intervenir à certaines périodes (et qu'ils soient prévus ou inattendus).

C'est pourquoi il faut que votre environnement soit élastique et puisse s'adapter à ce genre de baisses ou de montées d'activité du site.

L'indicateur principal sur lequel se base le visiteur pour déterminer si la navigation dans un site est performante, est le temps moyen de chargement des pages (et plus particulièrement le temps de chargement ressenti).

## Scalabilité d'un site

La scalabilité est justement le terme qui désigne la capacité de votre site à s'adapter à une augmentation du flux de visiteurs.

Pour présenter les choses simplement, il y a 2 façons dont la charge peut être supportée :

- La charge serveur (verticale) : on fait évoluer le serveur pour supporter la montée en charge (Mémoire, CPU, …).
- Le nombre de serveurs (horizontale) : on ajoute des serveurs (ex : ferme de serveurs, cloud computing) pour répartir la charge.

L'augmentation de la charge a des impacts à plusieurs points clés :

L'utilisation de la mémoire et du processeur: le processus qui exécute le site web est mis à contribution en fonction du nombre d'appels de pages.

La base de données : Les requêtes vers les tables permettent de récupérer les contenus stockées, les paramètres du site ou les définitions des types de contenus.

Un élément important à ne pas négliger concerne le temps de démarrage du site (après un redémarrage par exemple, voulu ou non). Sur ce point, un des atouts d'Orchard est de proposer un module Warmup qui fait en sorte de stocker des versions des pages importantes (qu'on spécifie), ce qui permet de les afficher plus rapidement lors d'un redémarrage.

## Mesures des performances

Il existe de nombreux outils qui peuvent vous aider à mesurer les performances :

- Visual Studio performance Tools
- [Mini profiler](http://gallery.orchardproject.net/List/Modules/Orchard.Module.Four2n.MiniProfiler) : un module qui vous liste les temps d'appels de chauqe méthode.
- [Web Capacity Analysis Tool](<http://www.google.fr/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&ved=0CCUQFjAA&url=http%3A%2F%2Fwww.iis.net%2Fdownloads%2Fcommunity%2F2007%2F05%2Fwcat-63-(x86)&ei=NFFcUOuxJ4eb1AXbj4GwCQ&usg=AFQjCNGtBbRen-Fz_OaoisCAk5cBFivVSQ&sig2=VqSGKZrXXIQvTkSHkfeVmw>) (WCAT) : un outil simple pour faire des requêtes Http (Voir Orchard.Profile et le fichier Go.cmd)

Un test encore plus basique est d'utiliser l'outil de développement Web de votre navigateur qui fournit souvent un onglet pour afficher le temps de chargement de chaque fichier. En regardant les résultats renvoyés, on peut déterminer quelles ressources prennent le plus de temps en fonction de leur taille ou de leur délai de livraison. Il distingue aussi parfois le temps de chargement ressenti (zone rouge pour montrer à partir de quel moment la page est consultable).

Pour une navigation agréable dans le site, il est conseilé que ce temps de chargement de page ressenti ne soit pas supérieur à 600 ms.

Il existe des services similaires en ligne, comme [gtmetrix](http://gtmetrix.com/) qui utilise les recommandations de YSlow ou Page Speed pour analyser les pages de votre site et vous conseiller des améliorations. C'est d'autant plus important quand on sait que les moteurs de recherche peuvent aussi prendre en compte ce temps de chargement dans le référencement et donc le positionnement du site dans les résultats de recherche.

## Amélioration des performances

Les développeurs Orchard essaient toujours de garder à l'esprit que de bonnes performances sont un pré-requis important dans l'utilisation d'un CMS.

C'est pourquoi ils essaient continuellement d'améliorer ces performances là où c'est nécessaire ou de proposer des fonctionnalités qui permettent d'accélérer la consultation des pages ou la charge du serveur.

Cela passe parfois par des optimisations de requêtes en base de données (ex : utilisation de GetMany(), …).

La notion de mise en cache (Caching) est aussi un élément central pour diminuer le nombre de requêtes.

Il existe plusieurs niveaux et mécanismes de cache :

- Application Caching : En implémentant ICacheManager, on a ensuite la possibilité d'utiliser la classe Signal pour gérer des objets en cache.
- Static Caching : avec le module [Contrib.Cache](http://gallery.orchardproject.net/List/Modules/Orchard.Module.Contrib.Cache), il est assez simple d'activer et de mettre en mémoire des éléments de contenus.
- Reverse proxy caching : avec IIS, [Application Request Routing](http://www.iis.net/downloads/microsoft/application-request-routing) (ARR) qui améliore les performances pour distribuer du contenu ou des ressources statiques.

Comme vous le voyez, l'amélioration des performances peut se faire à plusieurs niveaux. Un site performant et qui supporte les montées en charge peut faire la différence dans la manière dont les visiteurs l'adoptent et le parcourent.

Si vous avez des questions concernant Orchard et les performances, n'hésitez pas à poster un commentaire.
