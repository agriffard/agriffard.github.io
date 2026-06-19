---
title: Laws of Software Engineering
slug: laws-of-software-engineering
author: agriffard
pubDatetime: 2026-04-19T12:00:00Z
categories: [Engineering]
tags: [software-engineering, architecture, teams]
description: A quick tour of lawsofsoftwareengineering.com and five laws that help teams make better technical and product decisions.
---

I discovered [lawsofsoftwareengineering.com](https://lawsofsoftwareengineering.com/), a curated collection of software engineering principles grouped by themes like architecture, quality, planning, teams, and decisions.

What I like is that the site gives us practical reminders we can apply during design reviews, sprint planning, and incident retrospectives.

Here are a few laws I keep coming back to.

## 1. Conway's Law

> Organizations design systems that mirror their own communication structure.

If your teams are separated by domain, your architecture will likely reflect those boundaries. This is not good or bad by itself, but it is predictable.

**Practical takeaway:** when architecture is messy, look at org structure and communication paths before blaming code alone.

## 2. Hyrum's Law

> With enough users, every observable behavior of your system will be depended on by somebody.

Even undocumented behavior becomes a contract once clients rely on it.

**Practical takeaway:** treat API changes with humility. Version intentionally, communicate clearly, and assume consumers depend on more than you documented.

## 3. Gall's Law

> A complex system that works is usually evolved from a simple system that worked.

Big-bang designs look elegant in diagrams, but reliable systems tend to grow in iterations.

**Practical takeaway:** start with the smallest solution that can work in production, then evolve based on real constraints.

## 4. Brooks's Law

> Adding manpower to a late software project makes it later.

More people can increase coordination overhead, onboarding time, and communication costs.

**Practical takeaway:** when timelines slip, fix scope and sequencing first. Adding engineers late is often the most expensive move.

## 5. Goodhart's Law

> When a measure becomes a target, it stops being a good measure.

Metrics are useful until teams optimize the metric instead of the outcome.

**Practical takeaway:** use a balanced set of indicators (quality, delivery, reliability, user impact), and review behaviors created by each metric.

## Why this collection is useful

The value of these laws is not in memorizing one-liners. It is in using them as **decision prompts**:

- Are we designing around our org chart? (Conway)
- Are we breaking hidden contracts? (Hyrum)
- Are we overengineering too early? (Gall)
- Are we solving delay with headcount instead of clarity? (Brooks)
- Are we gaming our own dashboard? (Goodhart)

That is why this site is worth bookmarking: it helps turn experience into better defaults.
