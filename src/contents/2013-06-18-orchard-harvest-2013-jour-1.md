---
title: Conférence Orchard Harvest 2013 à Amsterdam Jour 1
author: agriffard
datetime: 2013-06-18T12:00:00Z
categories: [Orchard]
tags: [Harvest]
---

La première conférence européenne organisée par la communauté [Orchard](http://orchardproject.fr/) s'est déroulé Jeudi 13 et Vendredi 14 Juin 2013 à Amsterdam au [Tobacco Theatre](http://tobacco.nl/engels/index.html).

80 participants de 17 pays différents ont pu assister aux sessions présentées par plusieurs speakers sur des sujets relatifs au développement de sites web avec le CMS ASP.NET MVC Orchard.

## 9h – 9h45 Keynote : State of Orchard

La matinée a commencé avec une intervention d'[Ylan Kunstler](http://euro2013.orchardharvest.org/speaker/ylan-kunstler) qui a consacré beaucoup de temps à l'organisation de cet évènement et a ainsi rappelé à quel point il était important de se réunir pour échanger et rencontrer de nouvelles personnes afin de développer la communauté Orchard.

[Bertrand Le Roy](http://euro2013.orchardharvest.org/speaker/bertrand-le-roy) a ensuite déroulé un historique des versions successives du CMS et des fonctinnalités implémentées au fur et à mesure.  
Il a mis en avant les statistiques croissantes de ces derniers mois qui montrent l'intérêt des développeurs pour le projet :  

- Téléchargements sur Codeplex et la Web plateforme galerie.  
- Nombre de discussions sur le forum et sur StackOverflow.  
- Nombre de modules et de thèmes et de téléchargements de la Galerie Orchard.

## 10h – 10h45 Responsive Web Design &amp; Beyond

[Beatriz Oliveira](http://euro2013.orchardharvest.org/speaker/beatriz-oliveira) de [Bind Tuning](http://bindtuning.com/cms/orchard/orchard-1) a abordé le sujet des design responsives en introduisant plusieurs techniques pour rendre un site adaptatif en fonction des résolutions.

Cela passe par l'utilisation de layouts avec des Fluid grids (ex : YU, Silmple Grid, 1140 grid).  
Le redimensionnement des images, du texte ou des tableaux peut aussi s'adapter à la largeur du navigateur grâce à des styles css ou des plugins javascript.

Les media queries sont bien sûr le meilleure moyen de définir l'affichage des éléments selon la résolution.  
La navigation en particulier peut faire appel à des types de menus qui conviennent mieux à des écrans plus petits (Select menu, Toggle, Left nav Flyout, …).

De nombreux frameworks CSS existent avec des styles prédéfinis qui répondent bien à ce type de design :  

- Bootstrap  
- Foundation  
- Pure Css

## 11h – 11h45 The natural relationship of MV* JS Frameworks and the Orchard ecosystem

[Steve Taylor](http://euro2013.orchardharvest.org/speaker/steve-taylor) a fait une démonstration de plusieurs frameworks Javascript (Angular.js, Backbone) et de la façon de consommer des informations côté client et de les afficher sous Orchard avec des patterns de développement MVC, MVVM.

## 12h – 12h45 Case study : Architecting a high traffic consumer facing website

[Jai Prakash](http://euro2013.orchardharvest.org/speaker/jai-prakash) a expliqué comment ils utilisaient Orchard en tant que service de gestion de contenus afin de gérer un site avec un traffic important.

Il a détaillé l'architecture technique du projet et donner quelques conseils à propos de l'amélioration des performances.

## 14h – 15h30 Module development – understanding concepts and advanced applications

[Sipke Schoorstra](http://euro2013.orchardharvest.org/speaker/sipke-schoorstra) a tenu une session technique avancé sur le développement de module en détaillant toutes les étapes de création d'un Placeholder widget qui permet de réutiliser un contenu à différents endroits du site.

Il a également créé des classes de test unitaires avec NUnit et Mock.

Enfin, il a donner des exemples pratiques de Recipes (recette) et décrit comment packager son projet à l'aide lde l'outil en ligne de commande.

## 15h45 – 16h15 Case study - Forums module: how it was constructed and how you can extend it

[Nicholas Mayne](http://euro2013.orchardharvest.org/speaker/nicholas-mayne) nous a donné un aperçu du module Forums : [http://orchardprojectforum.azurewebsites.net/](http://orchardprojectforum.azurewebsites.net/)

Il a expliqué la structure et les types de contenu ainsi que d'autres modules activés dans son thème : Inline editing, OAuth, …

## 16h30 – 17h30 Panel – A conversation with core contributors

Pour conclure la journée, une séance de questions réponses a eu lieu avec des membres du comité de développeurs.

Des sujets ont été abordés comme la compilation dynamique, la mise en cache ou encore la date de sortie de la version 1.7.

A noter que cette release est prévue très prochainement et contient de nombreuses nouvelles fonctionnalités dont certaines ont été présentées lors de la seconde journée.
