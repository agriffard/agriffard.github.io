---
title: Orchard Harvest 2012 Sessions Day 1
author: agriffard
datetime: 2012-09-17T12:00:00Z
categories: [Orchard]
tags: [Harvest]
---

Voici un résumé des autres sessions qui ont eu lieu le premier jour de la [conférence Orchard Harvest 2012](http://harvest.orchardproject.net/), le Samedi 8 Septembre.

## Module development

2 pm - 3:30 pm, Speaker : [Sipke Schoorstra](http://skywalkersoftwaredevelopment.net/) ([@sfmskywalker](https://twitter.com/sfmskywalker))

Sipke, membre du [comité de pilotage d'Orchard](http://orchardproject.fr/about), nous a fait un tour d'horizon des différentes API utilisables par les développeurs pour créer leurs modules.

Il s'agissait donc essentiellement d'exemple de code pour implémenter des fonctionnalités comme un formulaire de contact, des notifications ou des filters.

## Localization

3:45 pm - 4:30 pm, Speaker : [Piotr Szmyd](http://www.szmyd.com.pl/) ([@pszmyd](https://twitter.com/pszmyd), [Proligence](http://www.proligence.pl/))

Piotr, un autre membre du comité Orchard, nous a présenté les multiples façons de localiser un site Orchard.

Il a expliqué les différences entre la localisation (traduire des ressources) et l'internationnalisation (appliquer une culture à un site) et le fonctionnement du Localizer (et du mot clé T(“…”) qu'on utilise dans les views et les classes).

La gestion de toutes les cultures existantes et des ressources localisées pour Orchard peuvent être récupérées (et administrées) depuis le site [http://orchardproject.net/localize](http://orchardproject.net/localize).

Plusieurs modules peuvent vous aider à gérer vos contenus localisés et les langues de votre site :

- Q42.DbTranslations
- Orchard.CulturePicker
- Vitus.Localization

Enfin, il nous a donné un exemple de chargement de la culture en récupérant la langue par défaut du navigateur en se basant sur l'attribut ‘Accept-Language'.

## Panel

5 pm - 5:45 pm, Intervenants : [Sébastien Ros](http://www.sebastienros.com/), [Bertrand Le Roy](http://weblogs.asp.net/bleroy/), [Sipke Schoorstra](http://skywalkersoftwaredevelopment.net/), [Piotr Szmyd](http://www.szmyd.com.pl/)

Pour terminer la journée, les membres du comité présents ont répondu à des questions ouvertes de la part des participants dans la salle :

- Comment Orchard a démarré ?
- Comment bien commencer avec Orchard ?
- Peut-on facilement construire une Business Line Application ?
- Est-ce qu'il existe une fonctionnalité similaire aux short codes de WordPress ?
- Peut-on vraiment construire un site Orchard à l'aide de Web Matrix ?
- Quels sont les mécanismes de Cache utilisables ?
- Est-ce que le module Multi-tenants est une bonne réponse pour gérer des sites multi-clients ?

Ces questions mériteraient à elles seules un article chacune. Si vous aussi vous avez des questions, n'hésitez pas à laisser un commentaire.

Bref, il est toujours intéressant d'assister à des sessions présentées par les développeurs qui utilisent au quotidien et font évoluer en permanence la plateforme [Orchard](http://orchardcore.net/).
