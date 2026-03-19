---
title: "Développement : De la boîte manuelle au pilote automatique"
slug: pilotage-automatique
author: agriffard
pubDatetime: 2026-03-19T12:00:00Z
categories: [Development]
tags: [AI, .NET, Visual Studio, Copilot]
description: "Un parallèle entre l'évolution de l'automobile et celle du développement informatique ces 25 dernières années. De la boîte manuelle sans direction assistée à la voiture électrique autonome, du code sans IntelliSense aux agents IA."
---

En l'an 2000, j'ai obtenu mon permis de conduire. Ma première voiture avait une boîte de vitesses manuelle, pas de direction assistée, et encore moins de GPS. Pour se rendre quelque part, il fallait déplier une carte routière sur le capot, mémoriser l'itinéraire, et espérer ne pas rater la sortie d'autoroute. Quelques temps plus tard, je commençais mes études d'informatique puis ma carrière de développeur. Les similitudes entre ces deux univers n'ont cessé de me frapper au fil des années.

## L'ère du tout-manuel (2000-2006)

### Sur la route

Conduire en 2000, c'était un engagement physique et mental total. Chaque trajet demandait :

- **Passer les vitesses** manuellement, en synchronisant embrayage et accélérateur.
- **Tourner le volant** à la force des bras, sans assistance.
- **Naviguer de mémoire** ou avec une carte Michelin pliée en huit sur le siège passager.
- **Anticiper chaque manœuvre** sans aucune aide électronique.

On maîtrisait tout, mais tout reposait sur nous. Une erreur d'inattention, un mauvais créneau, et c'était entièrement notre responsabilité.

### Derrière l'écran

Développer avec **.NET 1.1** et **Visual Studio 2003**, c'était la même philosophie :

```csharp
// 2003 : Tout taper de mémoire, caractère par caractère
// Pas d'IntelliSense, pas de suggestion, pas de filet de sécurité

public class DataAccess
{
    public DataSet GetCustomers()
    {
        SqlConnection conn = new SqlConnection(
            "Server=myServer;Database=myDB;User Id=sa;Password=secret;"
        );
        SqlCommand cmd = new SqlCommand("SELECT * FROM Customers", conn);
        SqlDataAdapter adapter = new SqlDataAdapter(cmd);
        DataSet ds = new DataSet();

        conn.Open();
        adapter.Fill(ds);
        conn.Close();

        return ds;
    }
}
```

**Il fallait tout connaître par cœur :**

- Les noms exacts des classes et méthodes.
- L'ordre des paramètres des constructeurs.
- Les chaînes de connexion, les noms de tables, les colonnes.
- Les patterns de gestion des ressources.

Comme sur la route sans GPS, on développait **à la carte Michelin** : avec de la documentation papier (les fameux livres O'Reilly), MSDN en version hors-ligne, et beaucoup d'essais-erreurs.

## L'arrivée de l'assistance (2007-2015)

### Sur la route

Progressivement, la voiture s'est mise à nous aider :

- **Direction assistée** : le volant devient léger, les manœuvres moins fatigantes.
- **GPS intégré** : plus besoin de carte, la voiture nous guide.
- **Régulateur de vitesse** : on délègue le maintien de l'allure.
- **Caméra de recul** : les créneaux deviennent moins stressants.

On conduisait toujours, mais avec un copilote silencieux qui nous facilitait la vie.

### Derrière l'écran

**Visual Studio 2008** a marqué un tournant avec l'arrivée d'**IntelliSense** :

```csharp
// 2008+ : IntelliSense complète les noms, montre les signatures
// C'est comme passer de la carte routière au GPS

public class CustomerService
{
    private readonly CustomerRepository _repository;

    public CustomerService(CustomerRepository repository) // <- IntelliSense suggère le type
    {
        _repository = repository;
    }

    public List<Customer> GetActiveCustomers()
    {
        return _repository          // <- Ctrl+Espace : liste des méthodes disponibles
            .GetAll()               // <- Signature affichée en tooltip
            .Where(c => c.IsActive) // <- LINQ avec IntelliSense sur les propriétés
            .ToList();
    }
}
```

**L'assistance au développement s'est enrichie progressivement :**

| Année | Innovation | Équivalent automobile |
|-------|-----------|----------------------|
| 2007 | IntelliSense avancé | GPS intégré |
| 2008 | LINQ, lambda expressions | Boîte automatique |
| 2010 | NuGet (gestionnaire de packages) | Station-service automatisée |
| 2012 | Async/Await | Régulateur de vitesse adaptatif |
| 2014 | Roslyn (compilateur en temps réel) | Capteurs d'angle mort |

On tapait toujours du code, mais l'IDE nous **guidait** : suggestions de types, détection d'erreurs en temps réel, navigation dans le code. Comme le GPS qui recalcule l'itinéraire quand on rate une sortie, IntelliSense nous remettait sur la bonne voie quand on oubliait un nom de méthode.

## L'autocomplétion intelligente (2016-2022)

### Sur la route

La voiture est devenue semi-autonome :

- **Freinage d'urgence automatique** : la voiture réagit plus vite que nous.
- **Maintien de voie** : elle corrige nos écarts.
- **Stationnement automatique** : on regarde, elle manœuvre.
- **Écran tactile central** : toute l'information à portée de doigt.

On reste les mains sur le volant, mais la voiture **anticipe** et **corrige** nos actions.

### Derrière l'écran

L'autocomplétion est devenue **prédictive** :

```csharp
// 2020+ : L'IDE prédit des blocs entiers de code

public class OrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly ILogger<OrderService> _logger;

    // On tape le début du constructeur...
    // L'autocomplétion propose tout le corps :
    public OrderService(
        IOrderRepository orderRepository,  // <- Suggestion automatique
        ILogger<OrderService> logger)      // <- basée sur les champs déclarés
    {
        _orderRepository = orderRepository;  // <- Bloc entier proposé
        _logger = logger;                    // <- en une seule touche Tab
    }

    public async Task<Order> CreateOrderAsync(CreateOrderRequest request)
    {
        // On commence à taper "var order = new Order"
        // L'autocomplétion propose l'initialisation complète
        // basée sur les propriétés de la classe et le contexte
    }
}
```

Les outils comme **IntelliCode** apprenaient de millions de repositories open-source pour proposer les patterns les plus probables. Comme le maintien de voie qui analyse les marquages au sol, l'IDE analysait le contexte pour nous maintenir sur la bonne trajectoire.

## La révolution autonome (2023-aujourd'hui)

### Sur la route

La voiture **électrique avec pilote automatique** change tout :

- On **dit où on veut aller**, la voiture s'occupe du reste.
- Plus de vitesses à passer, plus d'embrayage.
- La voiture **voit** à 360°, **anticipe** le trafic, **s'adapte** aux conditions.
- On reste vigilant, mais on **supervise** plus qu'on ne conduit.

Le rôle du conducteur a fondamentalement changé : de **pilote** à **superviseur**.

### Derrière l'écran

Les **agents IA** comme GitHub Copilot, Cursor ou les CLIs comme Claude Code ont tout transformé :

```
> "Crée un service d'envoi d'emails avec retry, logging,
   et configuration via IOptions<T>"
```

Et l'agent génère :

```csharp
public class EmailOptions
{
    public const string SectionName = "Email";

    [Required]
    public string SmtpServer { get; set; } = string.Empty;

    [Range(1, 65535)]
    public int SmtpPort { get; set; } = 587;

    [Required, EmailAddress]
    public string FromAddress { get; set; } = string.Empty;

    [Range(1, 10)]
    public int MaxRetries { get; set; } = 3;
}

public class EmailService : IEmailService
{
    private readonly EmailOptions _options;
    private readonly ILogger<EmailService> _logger;

    public EmailService(
        IOptions<EmailOptions> options,
        ILogger<EmailService> logger)
    {
        _options = options.Value;
        _logger = logger;
    }

    public async Task SendAsync(string to, string subject, string body)
    {
        for (int attempt = 1; attempt <= _options.MaxRetries; attempt++)
        {
            try
            {
                // Envoi de l'email...
                _logger.LogInformation("Email envoyé à {To}", to);
                return;
            }
            catch (Exception ex) when (attempt < _options.MaxRetries)
            {
                _logger.LogWarning(ex,
                    "Tentative {Attempt}/{MaxRetries} échouée",
                    attempt, _options.MaxRetries);
                await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, attempt)));
            }
        }
    }
}
```

**On ne code plus de la même manière :**

| Avant | Maintenant |
|-------|------------|
| Écrire chaque ligne | Décrire l'intention |
| Chercher dans la documentation | L'agent connaît la documentation |
| Déboguer à tâtons | L'agent analyse et propose des corrections |
| Copier-coller depuis Stack Overflow | L'agent génère du code adapté au contexte |
| Écrire les tests manuellement | L'agent génère les tests du code qu'il a écrit |

## Le parallèle complet

| Époque | Automobile | Développement |
|--------|-----------|---------------|
| **2000** | Boîte manuelle, pas de direction assistée | .NET 1.1, Visual Studio sans IntelliSense |
| **2007** | GPS, direction assistée, régulateur | IntelliSense, LINQ, refactoring assisté |
| **2015** | Caméra de recul, freinage auto, maintien de voie | Autocomplétion prédictive, analyseurs en temps réel |
| **2023** | Voiture électrique, pilote automatique | Agents IA, génération de code par intention |
| **2025** | On dit la destination, la voiture conduit | On décrit le besoin, l'agent développe |

## Ce qui n'a pas changé

Malgré toute cette automatisation, certaines choses restent constantes :

**Sur la route :**
- Il faut toujours **savoir conduire** pour intervenir en cas de problème.
- Il faut **comprendre le code de la route** même si la voiture le respecte seule.
- La **responsabilité** reste celle du conducteur.
- Il faut **savoir où on veut aller**.

**En développement :**
- Il faut toujours **comprendre le code** que l'agent génère.
- Il faut **maîtriser les fondamentaux** : architecture, patterns, principes SOLID.
- La **responsabilité** du code en production reste celle du développeur.
- Il faut **savoir ce qu'on veut construire**.

L'IA ne remplace pas le développeur, comme le pilote automatique ne remplace pas le conducteur. Elle transforme son rôle : moins d'exécution mécanique, plus de réflexion, de supervision et de décision.

## Conclusion

En 25 ans, je suis passé d'une voiture où tout reposait sur mes bras et ma mémoire à un véhicule à qui je dis simplement où je veux aller. En parallèle, je suis passé d'un éditeur de texte glorifié où je tapais chaque caractère de mémoire à un environnement où je décris mon intention et un agent la concrétise.

Dans les deux cas, la courbe est la même : **du tout-manuel à l'assisté, de l'assisté à l'autonome**. Et dans les deux cas, la compétence fondamentale reste la même : **savoir où on va, et pourquoi**.

La prochaine étape ? Un jour prochain, on décrira simplement le problème métier, et le système choisira lui-même l'architecture, les technologies, et déploiera la solution.

Pour l'instant, gardons quand même les mains sur le volant — et les yeux sur le code.
