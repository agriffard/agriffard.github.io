---
title: "Développeur et IA : La suspension consentie d'incrédulité"
slug: suspension-d-incredulite
author: agriffard
pubDatetime: 2026-03-22T12:00:00Z
categories: [Development]
tags: [AI, Agents]
description: "Quand un développeur commence à utiliser des agents IA pour coder, il traverse les mêmes étapes qu'un spectateur au cinéma : le refus, le doute, puis cette acceptation volontaire qui permet d'en tirer le meilleur — sans jamais perdre son esprit critique."
---

Au cinéma, il existe un concept fondamental : la **suspension consentie d'incrédulité** (*willing suspension of disbelief*). C'est ce mécanisme mental par lequel le spectateur accepte volontairement l'impossible — un homme qui vole, un voyage dans le temps, un robot qui ressent des émotions — pour profiter pleinement de l'histoire. Il sait que c'est faux. Il choisit d'y croire quand même, temporairement, parce que ça en vaut la peine.

En tant que développeur qui utilise des agents IA au quotidien, je peux retrouver un mécanisme semblable. Accepter qu'une machine écrive du code à ma place demande le même saut de foi. Et comme au cinéma, ce n'est ni aveugle ni passif : c'est un **choix conscient**, avec des limites, et un esprit critique qui ne s'éteint jamais complètement.

## Acte I : Le refus — "Je ne marche pas"

Tout commence par le scepticisme. Comme devant un film dont la bande-annonce ne convainc pas.

```
> "Génère-moi un service de notification"
```

L'agent produit 80 lignes de code. On les lit. On fronce les sourcils. On remarque un pattern qu'on n'aurait pas choisi, une convention de nommage qui ne colle pas, une dépendance qu'on n'utilise pas dans le projet. On se dit :

- *"C'est pas comme ça qu'on fait ici."*
- *"Il ne connaît pas notre architecture."*
- *"J'aurais été plus rapide à l'écrire moi-même."*

Et parfois, c'est vrai. Comme un film avec des incohérences trop grosses, on décroche. On ferme le panneau de suggestion et on reprend le clavier.

**C'est sain.** Ce réflexe critique est exactement ce qui fait de nous des développeurs, pas des opérateurs de prompt.

## Acte II : La curiosité — "Voyons voir..."

Puis un jour, pressé par un deadline ou fatigué d'écrire un énième mapper DTO, on laisse l'agent tenter sa chance. Non pas parce qu'on y croit, mais parce qu'on n'a rien à perdre.

```
> "Implémente le mapping entre OrderRequest et OrderEntity
>  en suivant les conventions du dossier /Mappers"
```

Et là, surprise. Le code généré est... correct. Pas parfait, mais correct. Les noms correspondent. La structure suit le pattern existant. Il y a même la gestion du `null` qu'on aurait oubliée.

On commence à comprendre que la qualité du résultat dépend de **la qualité de la demande**. Comme un metteur en scène qui doit briefer ses acteurs, on apprend à :

- **Donner du contexte** : "dans ce projet, on utilise Mediator, pas des services injectés directement."
- **Montrer l'exemple** : "fais comme dans `UserMapper.cs`."
- **Poser des contraintes** : "pas de bibliothèque externe, pas de réflexion, pas de code généré à l'exécution."

La suspension d'incrédulité commence ici : on **accepte de ne pas tout contrôler** pour voir ce que ça donne.

## Acte III : La négociation — "OK, mais à mes conditions"

C'est la phase la plus productive. On a trouvé le rythme. On sait ce que l'agent fait bien et ce qu'il fait mal. On ne lui fait pas confiance aveuglément, mais on ne le rejette plus par principe.

Le workflow ressemble à une **chorégraphie** :

| Étape | Développeur | Agent |
|-------|------------|-------|
| 1. Intention | Décrit le besoin, le contexte, les contraintes | — |
| 2. Génération | — | Propose une implémentation |
| 3. Review | Lit, questionne, identifie les écarts | — |
| 4. Guidage | "Utilise plutôt `IAsyncEnumerable`", "Sépare la validation" | Ajuste |
| 5. Validation | Vérifie les tests, la cohérence, la maintenabilité | — |
| 6. Acceptation | Intègre le code dans le projet | — |

On découvre que **prompter est une compétence en soi**. Ce n'est pas "demander un truc et voir". C'est :

- **Orchestrer** : découper un problème en sous-tâches que l'agent peut traiter.
- **Guider** : corriger la trajectoire plutôt que réécrire depuis zéro.
- **Filtrer** : distinguer ce qui est acceptable, ce qui doit être ajusté, et ce qui doit être refusé.

Comme un réalisateur qui tire le meilleur de ses acteurs en leur donnant les bonnes indications, pas en jouant la scène à leur place.

## Acte IV : L'acceptation lucide — "Je sais que c'est une machine, et c'est OK"

La suspension d'incrédulité est maintenant complète. On **sait** que l'agent ne comprend pas réellement le code. On **sait** qu'il peut halluciner une API qui n'existe pas, inventer un paramètre, ou proposer un pattern obsolète. On le sait — et on travaille avec quand même.

Parce qu'on a appris à mettre en place des **garde-fous** :

```
✅ Le code compile       → vérification automatique
✅ Les tests passent     → filet de sécurité
✅ Le diff est lisible   → review humaine
✅ L'architecture tient  → jugement du développeur
✅ Pas de régression     → CI/CD
```

On ne demande pas à l'agent d'être infaillible. On lui demande d'être **utile**. La différence est immense.

C'est exactement comme au cinéma : on ne demande pas au film d'être réaliste. On lui demande d'être **cohérent dans ses propres règles**. Un superhéros peut voler, mais il ne peut pas oublier qu'il sait voler au milieu du film sans explication.

De même, un agent peut proposer du code qu'on n'aurait pas écrit soi-même, mais il ne peut pas ignorer l'architecture du projet, les conventions de l'équipe, ou les contraintes de performance.

## Ce qui ne se suspend jamais

La suspension d'incrédulité a ses limites. Au cinéma, on accepte les dragons, pas les fautes de scénario. En développement, on accepte la génération, pas l'abandon de nos standards.

**Ce qui reste non négociable :**

- **La maintenabilité** — Si le code généré est illisible dans six mois, il ne passe pas. Un humain devra le maintenir, le déboguer, le faire évoluer. L'agent ne sera pas là pour expliquer ses choix.
- **La compréhension** — Chaque ligne qui entre dans le projet doit être comprise par le développeur qui l'accepte. "L'agent l'a écrit" n'est pas une justification en code review.
- **La responsabilité** — Le bug en production, c'est le développeur qui le corrige, pas l'agent. Accepter du code qu'on ne comprend pas, c'est signer un chèque en blanc.
- **La sécurité** — L'agent ne pense pas aux injections SQL, aux secrets exposés, aux failles de désérialisation. C'est le rôle du développeur de les traquer.
- **L'intention** — L'agent ne sait pas *pourquoi* on construit cette fonctionnalité. Il ne connaît ni les utilisateurs, ni le contexte métier, ni les arbitrages passés. Le "pourquoi" reste humain.

## Le bon compromis

Après des mois de pratique, voici l'équilibre que j'ai trouvé :

**Laisser faire l'agent :**
- Le boilerplate, le code répétitif, les patterns connus.
- La première ébauche d'une implémentation.
- Les tests unitaires basés sur du code existant.
- La documentation technique.

**Garder la main :**
- Les décisions d'architecture.
- La modélisation du domaine.
- Les choix de compromis (performance vs lisibilité, flexibilité vs simplicité).
- Le nommage — parce que nommer les choses reste le problème le plus difficile en informatique, et les agents ne font pas exception.

**Collaborer :**
- Le refactoring : l'agent propose, le développeur valide la direction.
- Le débogage : l'agent analyse, le développeur confirme l'hypothèse.
- L'exploration : l'agent génère des options, le développeur choisit.

## Conclusion

La suspension consentie d'incrédulité, c'est ce qui sépare le spectateur passif du spectateur engagé. L'un subit le film, l'autre y participe activement tout en gardant sa lucidité.

En développement, c'est pareil. Le développeur qui utilise efficacement les agents IA n'est ni celui qui refuse tout en bloc ("ce n'est pas du vrai code"), ni celui qui accepte tout sans lire ("l'IA sait mieux que moi"). C'est celui qui a appris à **suspendre son incrédulité juste assez** — assez pour en tirer de la valeur, pas assez pour perdre le contrôle.

Parce qu'à la fin, ce qui compte, ce n'est pas qui a écrit le code. C'est **qui en répond**.
