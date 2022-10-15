---
title: Orchard Harvest 2012 Sessions Day 2
author: agriffard
datetime: 2012-09-26T12:00:00Z
categories: [Orchard]
tags: [Harvest]
---

Voici les résumés de quelques sessions qui se sont déroulées le Dimanche 9 Septembre 2012, lors du 2ème jour de la conférence[Orchard Harvest](http://harvest.orchardproject.fr/).

## Case Study - Media Garden

11:00 am - 11:45 am : [Pete Hurst](http://www.codeplex.com/site/users/view/randompete)

Pete nous a fait une démonstration d'un site utilisant le module Media Garden :[http://orchardmediagarden.codeplex.com/](http://orchardmediagarden.codeplex.com/)

Il gère grâce à celui-ci différents type de médias (Vidéos, Audio, Images) et des fonctionnalités comme le redimensionnement de vignettes ou le streaming de vidéos.

## Projections

14:00 am - 14:45 am : Bertrand Leroy ([@bleroy](http://twitter.com/bleroy))

Bertrand nous a fait des démonstrations du module de Projector qui donne la possibilité de faire des requêtes sur les éléments de contenus, d'y appliquer des filtres sur les données et de les afficher avec une certaine disposition (layout).

Il a ainsi expliqué les notions de liaisons (Bindings) qui permet d'ajouter des propriétés de pièces et des champs existants à celles déjà existantes afin d'enrichir la liste de filtres à disposition.

Certains layouts proposent aussi de paramétrer une liste de propriétés avec des options spécifiques qui agissent sur leur rendu au moment de l'affichage.

Cette personnalisation des propriétés passe parfois par l'utilisation des tokens qui vous aident à formater les chaînes affichées et à faire appel à des sorte de balises, similaires aux short codes qu'on retrouve dans WordPress.

## Search engine optimization

3:00 pm - 3:45 pm : Zoltán Lehóczky ([Orchard Project Hungary](http://english.orchardproject.hu/))

Zoltán nous a donné quelques conseils concernant la SEO (optimisation du référencement pour les moteurs de recherche).

Il rappelle que pour mesurer le traffic, il est toujours intéressant d'insérer un script d'Analytics ainsi que les metas qui permettent à des services comme [Web Master Tools](https://www.google.com/webmasters/tools/home) d'analyser les visites sur le site.

La structure des contenus a également un impact sur les moteurs de recherche.

La configuration d'un fichier Robots.txt aide à spécifier la façon de parcourir les pages du site.

Des urls conviviales (obtenus à l'aide du module Autoroute) peuvent aussi améliorer le référencement.

Un fichier .sitemap permettra quant à lui d'indiquer au moteur d'exploration quelles urls il doit parcourir en priorité et y revenir régulièrement.

Enfin, les balises méta de Keywords et de Description restent encore le meilleur moyen de paramétrer les informations à afficher dans les résultats de recherche.

Quelques démos ont ainsi été présentées pour montrer le fonctionnement du module OneStop.SEO qui permet de gérer facilement ces balises. Il devrait être mis à disposition prochainement dans la [galerie de modules Orchard](http://gallery.orchardproject.net/).

## Migrating a website to Orchard

4:00 pm - 4:30 pm : Benedek Farkas ([@FarkasBenedek](https://twitter.com/FarkasBenedek))

Benedek a présenté la façon de migrer un site WordPress vers [Orchard](http://orchardproject.fr/), qu'il s'agisse de l'import des articles existants ou de la création d'un [thème Orchard](http://gallery.orchardproject.net/List/Themes) à partir d'un [thème WordPress](http://wordpress.org/extend/themes/).

Une des solutions d'import est d'ude passer par le format BlogML. Pour cela, vous pouvez vous aider de l'outil WPBlogML ([http://wpblogml.codeplex.com/](http://wpblogml.codeplex.com/)). Il vous permettra d'exporter des portions ou la totalité des posts de votre blog WordPress.

Il vous suffit ensuite d'utiliser le module [Orchard Import Export Module for external schemas](http://orchardimportexport.codeplex.com/) de [Nicholas Mayne](http://themayneissue.com/)([@NicholasMayne](https://twitter.com/NicholasMayne)) pour importer les posts.

Il est également possible d'adapter des thèmes WordPress afin d'obtenir un design similaire dans Orchard.

Un exemple de thème migré vers Orchard est celui de [TheJournalist](http://gallery.orchardproject.net/List/Themes/Orchard.Theme.TheJournalist), adapté par [Sébastien Ros](http://www.sebastienros.com/) et [Lucian E. Marin](http://lucianmarin.com/).

Ces sessions étaient donc très intéressantes et sur des sujets très variés associés à des fonctionnalités disponibles dans Orchard, ce qui montre bien l'étendue des possibilités de ce CMS.

Si vous avez des questions, n'héistez pas à poster un commentaire.
