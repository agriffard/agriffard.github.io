---
title: "AI & Development: Sharpen your axe before coding"
slug: sharpen-your-axe
author: agriffard
pubDatetime: 2026-03-25T12:00:00Z
categories: [Development]
tags: [AI, Agents]
description: "\"Give me six hours to chop down a tree and I will spend the first four sharpening the axe.\" In the age of AI agents, the time spent thinking, framing and detailing what you actually want has become the real productivity lever."
---

*"Give me six hours to chop down a tree and I will spend the first four sharpening the axe."*

This well-known proverb has never been more relevant than today, in the context of AI-assisted development.

When working with an AI agent to write code, **the natural instinct is to dive in**: open the terminal, type a prompt, and wait for the agent to produce something. It's tempting. It's fast. And it's almost always a mistake.

## The trap of the immediate prompt

Say you need to build an email notification feature in an existing application. The reflex:

```
> "Create an email notification system"
```

The agent will produce code. Probably functional. Probably generic. And probably not what you actually wanted. You'll then correct, re-specify, re-generate, correct again. After six iterations, you'll have spent more time course-correcting than it would have taken to frame the requirement properly from the start.

That's chopping at the tree with a dull axe. You swing hard, you exhaust yourself, and the tree falls in the wrong direction.

## Sharpening the axe: the invisible work

Sharpening the axe, in the AI context, is **all the thinking that happens before the first prompt**. It's the time you spend asking yourself the right questions before asking anything from the agent.

### 1. Clarify the intent — The "Why"

Before describing *what you want*, you need to know *why you want it*. What problem are you solving? For whom? In what context?

An AI agent doesn't know your business. It doesn't know that notifications must comply with GDPR, that your users are in Europe and emails should be sent in local time, or that the marketing team needs to track open rates.

**This clarification work is human, and it is irreplaceable.**

### 2. Define the expected outcome — The "What"

What do you expect concretely? Not in terms of code, but in terms of behavior:

- What types of notifications?
- What data is available for the template?
- What error cases should be handled?
- What are the success criteria?

The more precise the expected outcome, the more likely the agent will hit the target on the first try. You don't sharpen the axe for fun — you sharpen it so that every swing counts.

### 3. Provide context — The "Where" and "How"

The agent doesn't know your project. You need to provide:

- **The existing architecture**: "We use a layered architecture with a service layer and repository pattern."
- **The conventions**: "Services go in `/Services`, interfaces in `/Contracts`, configurations in `/Options`."
- **The technical constraints**: ".NET 10, no external NuGet dependency for SMTP."
- **The examples**: "Follow the same structure as `UserService.cs`."

It's like giving a map of the forest to the lumberjack: they'll know where to strike and which way the tree should fall.

### 4. Define the roles — The "Who does what"

Here's the often-overlooked key: **decide in advance what you delegate and what you keep**.

| Decision | Human | Agent |
|----------|-------|-------|
| Overall architecture | **Yes** | No |
| Implementation pattern | Case by case | Can suggest |
| Class and method naming | **Yes** or validate | Can suggest |
| Writing the code | Supervise | **Yes** |
| Unit tests | Define the cases | **Yes** |
| Library choices | **Yes** | No |

If you have a clear vision of the result, guide the agent precisely. If you're exploring, let it suggest technical choices — but always define the boundaries.

## A good prompt is a creative brief

In practice, a good prompt for an AI agent looks a lot like a **creative brief** you'd give to a skilled contractor who doesn't know your project:

```
Context:
E-commerce application in .NET 10 with a service/repository architecture.
Orders are managed through OrderService (see OrderService.cs).
Emails are sent via an SmtpClient injected as IEmailSender.

Need:
When an order transitions to "Shipped" status, send a confirmation
email to the customer with the tracking number.

Constraints:
- Follow the existing event handling pattern in the project.
- Email template is HTML, stored in /Templates/Emails/.
- Retry with exponential backoff (max 3 attempts).
- Log every attempt and every failure.

Expected output:
- An event handler for the OrderShippedEvent.
- An HTML template for the confirmation email.
- Associated unit tests.

Do not:
- Do not modify the existing order flow.
- Do not add any NuGet dependency.
```

This prompt takes five minutes to write. But it saves thirty minutes of corrections and back-and-forth. **Four hours of sharpening, two hours of clean cutting.**

## The two-thirds rule

Through experience, I've arrived at a simple rule:

> **Spend at least two-thirds of your time preparing, one-third executing.**

Concretely, for a one-hour feature:

| Phase | Time | Activity |
|-------|------|----------|
| **Thinking** | 20 min | Understand the need, explore the existing code, identify impacts |
| **Formulating** | 15 min | Write the prompt with context, constraints, examples, expected output |
| **Executing** | 15 min | Run the agent, review the code, adjust if needed |
| **Validating** | 10 min | Verify tests, consistency, integrate |

The temptation is to jump straight to execution. But every minute invested upstream saves three downstream. The agent isn't smarter when you give it a good prompt — it's simply **better directed**.

## How AI changes the equation

Before AI agents, a developer's time breakdown looked something like this:

```
Thinking : 20%  |::::
Writing  : 60%  |::::::::::::
Debugging: 20%  |::::
```

With AI agents, it should look like this:

```
Thinking   : 50%  |::::::::::
Formulating: 15%  |:::
Supervising: 25%  |:::::
Validating : 10%  |::
```

Pure writing time **nearly disappears**. It's absorbed by the agent. But this freed-up time shouldn't be wasted chaining sloppy prompts. It should be **reinvested in thinking**.

This is a fundamental shift in posture. The developer who works with AI no longer types code — they **think code**. And like all thinking work, the quality of the result depends directly on the time you dedicate to it.

## The anti-pattern: the dull axe

You can spot a developer who doesn't sharpen their axe by these symptoms:

- **Vague prompts**: "Do something to manage users."
- **Correction loops**: five iterations to arrive at what a single well-crafted prompt would have produced.
- **Frustration**: "The AI doesn't understand anything" — when really, the brief is incomplete.
- **Loss of control**: generated code piles up and nobody understands the whole picture.
- **Wasted time**: paradoxically, you end up spending *more* time than coding it yourself.

A dull axe is a sloppy prompt. And a sloppy prompt with a powerful agent is like a chainsaw in the hands of someone who doesn't know where to cut: it goes fast, but not necessarily in the right direction.

## Conclusion

Preparation is not time lost — it's time **invested**. In a world where technical execution is increasingly delegated to AI agents, a developer's value shifts toward their ability to **think clearly, formulate precisely, and decide wisely**.

Sharpening the axe means:
- **Understand** before you ask.
- **Frame** before you generate.
- **Think** before you prompt.

The tree will fall. The question is whether it falls where you wanted — or on the neighbor's house.
