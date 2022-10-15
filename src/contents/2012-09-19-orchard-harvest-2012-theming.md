---
title: Orchard Harvest 2012 Theming
author: agriffard
datetime: 2012-09-19T12:00:00Z
categories: [Orchard]
tags: [Harvest]
---

Dimanche 9 Septembre, 10:00 am - 10:45 am

Speaker : Sébastien Ros ([@sebastienros](https://twitter.com/sebastienros))

Cette session avait pour objectif de présenter les bases de la création de thèmes pour [Orchard](http://orchardproject.fr/).

## Successful web sites = Design + Content + Performance

Le premier principe a avoir à l'esprit est qu'un site efficace repose sur 3 ingrédients :  

- Un Design convivial et ergonomique.  
- Des Contenus pertinents et bien structurés.  
- Des Performances qui permettent de supporter la charge des visites.

La philosophie de développement dans Orchard est d'essayer de respecter le plus possible ces prérogatives, notamment lorsqu'il s'agit de la gestion des thèmes et de l'interface utilisateur.

Des captures d'écran de sites existants nous ont rappelé à quel point une interface graphique inadaptée (couleurs criardes, surcharge des contenus, gifs animés, …) peut desservir le contenu du site.

Plusieurs sites se sont ainsi déjà lancés dans la création de thèmes Orchard, parmi lesquels :  

- [Bind Tuning](http://tuning.bind.pt/Orchard-Themes.aspx) (qui a été un des premiers à proposer des thèmes personnalisés pour Orchard)  
- [Orchard Prime](http://www.orchardprime.com/) (qui a réalisé le design du site [http://harvest.orchardproject.net/](http://harvest.orchardproject.net/))

## Thèmes Orchard

Parmi les avantages des thèmes développés pour Orchard, on peut voir qu'ils sont :  

- Tailored (adaptés sur mesure aux contenus)  
- Framework based (reposent sur une plateforme solide)  
- Platform oriented (utilisent de nombreux outils et aides pour personnaliser au mieux le design)

Pour rappel, un thème se compose des éléments suivants :  

- Un fichier Manifest qui décrit ses informations globales.  
- Des ressources graphiques (css, images, scripts)  
- Un fichier placement.info qui spécifie le positionnement des shapes.

Il peut également hériter d'un thème parent pour bénéficier des éléments de base, tout en permettant de le personnaliser.

## Shape tracing

Concernant les aides à la personnalisation, le module de ‘Shape Tracing' active une fenêtre en bas de pages similaire à l'outil de développement Web de votre navigateur et vous permet de sélectionner les éléments dans la hiérarchie des contenus, qu'il s'agisse de zones, de listes de contenus ou même de pièces ou de champs.

Il est très utile pour comprendre le fonctionnement des Shapes et la façon dont sont reliés les modèles de données et leur templates d'affichages.

## Shapes

La définition d'une shape est la suivante :

> A dynamic object which carries a hierarchy of data representing what will be rendered on the targeted medium.

Une traduction simpliste pourrait être : Un objet dynamic (au sens C# du terme) qui transporte une hiérarchie de données représentant ce qui sera affiché sur le média cible.

Durant le reste de la présentation, des exemples de code ont ensuite été mis en oeuvre afin d'expliquer le fonctionnement des Shapes dans les Views et les différentes façons de les afficher et de tirer parti des nombreuses classes et méthodes d'aide à l'affichage des shapes.

Il y aurait beaucoup de choses à expliquer à propos des Shapes. ça fera peut-être l'objet d'un futur article.

Les choix que vous faîtes en choisissant un thème graphique pour votre site sont très importants pour sa réussite.

La création de thèmes dans un CMS doit être à la fois flexible et performante.

Dans Orchard, ils vous permettent de réaliser des designs très avancés et de les personnaliser de manière simple et efficace.

Si vous avez des questions sur les thèmes dans Orchard, n'hésitez pas à poster un commentaire.
