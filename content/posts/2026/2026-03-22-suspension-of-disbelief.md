---
title: "Developer and AI: The Willing Suspension of Disbelief"
slug: suspension-of-disbelief
author: agriffard
pubDatetime: 2026-03-22T12:00:00Z
categories: [Development]
tags: [AI, Agents]
description: "When a developer starts using AI agents to code, they go through the same stages as a moviegoer: denial, doubt, then that voluntary acceptance that lets you get the most out of it — without ever losing your critical thinking."
---

In cinema, there is a fundamental concept: the **willing suspension of disbelief**. It is the mental mechanism by which the viewer voluntarily accepts the impossible — a man who flies, time travel, a robot that feels emotions — in order to fully enjoy the story. They know it is not real. They choose to believe anyway, temporarily, because it is worth it.

As a developer who uses AI agents daily, I find exactly the same mechanism at work. Accepting that a machine writes code on my behalf requires the same leap of faith. And just like at the movies, it is neither blind nor passive: it is a **conscious choice**, with boundaries, and a critical mind that never fully shuts off.

## Act I: Denial — "I'm not buying it"

It all starts with skepticism. Like sitting in front of a movie whose trailer did not convince you.

```
> "Generate a notification service for me"
```

The agent produces 80 lines of code. You read them. You frown. You notice a pattern you would not have chosen, a naming convention that does not fit, a dependency that is not used in the project. You think:

- *"That's not how we do things here."*
- *"It doesn't know our architecture."*
- *"I would have been faster writing it myself."*

And sometimes, that is true. Like a movie with glaring inconsistencies, you disengage. You close the suggestion panel and take back the keyboard.

**That is healthy.** This critical reflex is exactly what makes us developers, not prompt operators.

## Act II: Curiosity — "Let's see..."

Then one day, pressed by a deadline or tired of writing yet another DTO mapper, you let the agent have a go. Not because you believe in it, but because you have nothing to lose.

```
> "Implement the mapping between OrderRequest and OrderEntity
>  following the conventions in the /Mappers folder"
```

And then, surprise. The generated code is... correct. Not perfect, but correct. The names match. The structure follows the existing pattern. There is even the `null` handling you would have forgotten.

You start to understand that the quality of the result depends on **the quality of the request**. Like a director who has to brief their actors, you learn to:

- **Provide context**: "in this project, we use Mediator, not directly injected services."
- **Show by example**: "do it like `UserMapper.cs`."
- **Set constraints**: "no external library, no reflection, no runtime code generation."

The suspension of disbelief begins here: you **accept not being in full control** to see what comes out.

## Act III: Negotiation — "OK, but on my terms"

This is the most productive phase. You have found the rhythm. You know what the agent does well and what it does poorly. You do not trust it blindly, but you no longer reject it on principle.

The workflow looks like a **choreography**:

| Step | Developer | Agent |
|------|-----------|-------|
| 1. Intent | Describes the need, context, constraints | — |
| 2. Generation | — | Proposes an implementation |
| 3. Review | Reads, questions, identifies gaps | — |
| 4. Guidance | "Use `IAsyncEnumerable` instead", "Separate the validation" | Adjusts |
| 5. Validation | Checks tests, consistency, maintainability | — |
| 6. Acceptance | Integrates the code into the project | — |

You discover that **prompting is a skill in its own right**. It is not "ask for something and see". It is:

- **Orchestrating**: breaking a problem into subtasks the agent can handle.
- **Guiding**: correcting the trajectory rather than rewriting from scratch.
- **Filtering**: distinguishing what is acceptable, what needs adjustment, and what must be rejected.

Like a director who gets the best out of their actors by giving the right cues, not by playing the scene themselves.

## Act IV: Lucid acceptance — "I know it's a machine, and that's OK"

The suspension of disbelief is now complete. You **know** the agent does not truly understand the code. You **know** it can hallucinate an API that does not exist, invent a parameter, or suggest an obsolete pattern. You know it — and you work with it anyway.

Because you have learned to put **guardrails** in place:

```
✅ The code compiles       → automatic verification
✅ The tests pass          → safety net
✅ The diff is readable    → human review
✅ The architecture holds  → developer judgment
✅ No regressions          → CI/CD
```

You do not ask the agent to be infallible. You ask it to be **useful**. The difference is immense.

It is exactly like at the movies: you do not ask the film to be realistic. You ask it to be **consistent within its own rules**. A superhero can fly, but they cannot forget they can fly in the middle of the movie without explanation.

Likewise, an agent can propose code you would not have written yourself, but it cannot ignore the project's architecture, the team's conventions, or the performance constraints.

## What never gets suspended

The suspension of disbelief has its limits. At the movies, you accept dragons, not plot holes. In development, you accept generation, not the abandonment of your standards.

**What remains non-negotiable:**

- **Maintainability** — If the generated code is unreadable in six months, it does not pass. A human will have to maintain it, debug it, evolve it. The agent will not be there to explain its choices.
- **Understanding** — Every line that enters the project must be understood by the developer who accepts it. "The agent wrote it" is not a justification in code review.
- **Responsibility** — The bug in production is the developer's to fix, not the agent's. Accepting code you do not understand is signing a blank check.
- **Security** — The agent does not think about SQL injections, exposed secrets, or deserialization vulnerabilities. It is the developer's role to track them down.
- **Intent** — The agent does not know *why* you are building this feature. It knows neither the users, nor the business context, nor the past trade-offs. The "why" remains human.

## The right balance

After months of practice, here is the equilibrium I have found:

**Let the agent handle:**
- Boilerplate, repetitive code, well-known patterns.
- The first draft of an implementation.
- Unit tests based on existing code.
- Technical documentation.

**Keep control of:**
- Architecture decisions.
- Domain modeling.
- Trade-off choices (performance vs readability, flexibility vs simplicity).
- Naming — because naming things remains the hardest problem in computer science, and agents are no exception.

**Collaborate on:**
- Refactoring: the agent proposes, the developer validates the direction.
- Debugging: the agent analyzes, the developer confirms the hypothesis.
- Exploration: the agent generates options, the developer chooses.

## Conclusion

The willing suspension of disbelief is what separates the passive viewer from the engaged one. One endures the movie, the other actively participates while keeping their lucidity.

In development, it is the same. The developer who effectively uses AI agents is neither the one who rejects everything outright ("that's not real code"), nor the one who accepts everything without reading ("the AI knows better than me"). It is the one who has learned to **suspend their disbelief just enough** — enough to extract value, not enough to lose control.

Because in the end, what matters is not who wrote the code. It is **who answers for it**.
