---
title: Prototyping with AI Agents
slug: prototyping-with-ai-agents
author: agriffard
pubDatetime: 2025-12-31T10:00:00Z
categories: [Development, Open Source]
tags: [AI, Copilot, CSharp, DotNet, GitHub]
description: Exploring how AI agents like GitHub Copilot can accelerate development - creating multiple C# .NET libraries and samples during holiday break.
featured: true
---

## Overview

During the end-of-year holidays 2025, I embarked on an ambitious experiment: **leverage AI agents to rapidly prototype and implement a suite of C# .NET libraries and application samples**. This post shares my findings on how GitHub Copilot and Claude Opus can effectively co-work with a senior developer to validate ideas, build prototypes, and test new features at unprecedented speed.

## The Experiment

As a Senior Developer, I wanted to test the hypothesis: _Can AI agents help bridge the gap between architecture and rapid implementation, enabling faster iteration and validation?_

**Methodology:**
1. Define project requirements using PRD (Product Requirements Document) files
2. Request GitHub Copilot/Claude Opus to implement the features
3. Review and validate the generated code
4. Iterate based on feedback and requirements
5. Document learnings and best practices

This approach allowed me to create **multiple production-ready libraries and samples** in weeks rather than months.

## Projects Created

All repositories are available at: [github.com/agriffard?tab=repositories](https://github.com/agriffard?tab=repositories)

### Core Libraries

#### **AspNetCore.Foundation**
A plug & play middleware pack for ASP.NET Core applications including:
- Correlation ID tracking
- Exception handling
- Request timing

#### **EFCore.Tagging**
A simple and standardized API to automatically apply `TagWith` to EF Core queries for improved debugging, observability, and SQL performance analysis.

#### **EFInsight**
A lightweight library for detecting, logging, and analyzing slow or problematic EF Core queries.

#### **EntityKit**
A standardized set of interfaces and base classes for structuring C# and EF Core entities.

#### **EntityMapper.Generator**
A high-performance C# Incremental Source Generator for .NET 10 that generates compile-time-safe mapping extension methods between Entity Framework Core entities and DTOs.

### Data & Query Libraries

#### **EFSearch**
A dynamic, type-safe search library for .NET that transforms search requests into Expression Trees for `IQueryable`. Perfect for building APIs with filtering, sorting, and pagination capabilities.

#### **Querify**
A lightweight .NET library for building dynamic LINQ expressions and `IQueryable` extensions for filtering, sorting, and pagination.

#### **DynamicViews**
A .NET library for creating, organizing and saving dynamic views with customizable filters, sorting, and pagination. Compatible with EF Core and Blazor.

#### **ExprMap**
A source generator for EF Core that automatically generates DTOs and type-safe projection expressions from your entity models.

### Data Access & Caching

#### **EFProjectionCache**
A strongly-typed projection cache for EF Core with automatic and transitive invalidation using FusionCache.

#### **Decoratory**
A .NET library providing composable, Scrutor-based decorators over generic repositories. It enables clean, extensible data-access pipelines for cross-cutting concerns such as logging, validation, caching, metrics, resilience, and security.

### Business Logic & Tracking

#### **SoftTrack**
A .NET library for managing entities with Soft Delete and Version Tracking support for Entity Framework Core.

#### **Audit**
A centralized mechanism for tracking and historizing all EF Core entity modifications, enabling audit, compliance, and change analysis.

#### **ReportEngine**
A .NET library for generating dynamic reports and exports from EF Core entities, with support for filtering, sorting, pagination, and multiple export formats (CSV, Excel, JSON).

### Permissions & Workflows

#### **PermissionMatrix**
A centralized .NET library for managing and applying dynamic permissions by role and resource, secure, typed and extensible.

#### **StatusFlow**
A lightweight .NET library for modeling, visualizing, and executing business status workflows based on enums, with actions, rules, and integrated Blazor UI components.

### Applications & Tools

#### **Neat Admin**
A Blazor Server admin panel for managing Countries, Contacts, and Addresses with RBAC features.

#### **BlazorChoices**
A Blazor component library that wraps Choices.js to provide enhanced select and input elements with search, tags, and more.
See live demo: [antoinegriffard.com/BlazorChoices/](https://antoinegriffard.com/BlazorChoices/)

## Key Learnings: AI-Assisted Development

### ✅ What Worked Exceptionally Well

**1. PRD-Driven Development**
Creating detailed Product Requirements Documents before coding sessions yielded the best results. AI agents performed excellently when given:
- Clear use cases and examples
- Specific API design expectations
- Edge cases and validation rules
- Performance requirements

**2. Rapid Iteration**
The feedback loop between human review and AI implementation was remarkably fast. Typical workflow:
- Request feature implementation: 2-5 minutes
- Review generated code: 10-15 minutes
- Request refinements: 5-10 minutes per iteration
- Ship to production: negligible

**3. Boilerplate Reduction**
AI agents excelled at generating:
- Repetitive infrastructure code (configuration, DI setup)
- Test scaffolding and fixtures
- Documentation and XML comments
- Configuration files (csproj, launchSettings, etc.)

**4. Architecture Validation**
AI agents helped validate architectural decisions by implementing them end-to-end, revealing issues early that might otherwise surface in production.

**5. Cross-Cutting Concerns**
Pattern implementation for logging, validation, caching, and error handling was swift and consistent across projects.

### ⚠️ Challenges & Limitations

**1. Deep Domain Logic**
Complex business logic involving multiple entities and state transitions required human oversight. AI agents sometimes oversimplified or missed edge cases.

**2. Performance Optimization**
Initial implementations were functionally correct but not optimized. SQL query generation in LINQ providers needed refinement for production workloads.

**3. Context Window Management**
Larger projects sometimes exceeded context limits, requiring strategic file breakdowns and focused sessions.

**4. Dependency Management**
AI occasionally suggested packages without considering existing ecosystem compatibility or project constraints.

## Best Practices for AI-Assisted Development

### 1. **Write Comprehensive PRDs**
```
- Problem statement
- User stories with examples
- API design expectations
- Validation & error handling rules
- Performance requirements
- Extensibility points
```

### 2. **Start with Interfaces**
Define public APIs and contracts before requesting implementations. This guides AI agents toward better architecture.

### 3. **Review Unit Tests First**
Always ask AI to implement tests alongside features. Good tests reveal implementation quality immediately.

### 4. **Maintain Human Oversight**
AI agents should be co-workers, not replacements. Critical decisions about:
- Architecture patterns
- Dependency choices
- Performance trade-offs
- Security implications

...should remain with experienced developers.

### 5. **Use Focused Sessions**
Break large projects into 30-60 minute focused sessions with specific scopes. This prevents context bloat and maintains quality.

### 6. **Version Control Everything**
Treat AI-generated code like any external contribution. Use branches, code review, and CI/CD pipelines.

## Tools & Models Used

- **GitHub Copilot**: Quick implementation and code suggestions
- **Claude Opus**: Strategic architecture guidance and complex logic
- **Visual Studio**: IDE integration for seamless workflow

## Conclusion

AI agents have demonstrated exceptional value in **rapid prototyping, boilerplate reduction, and productivity acceleration**. However, they work best as **co-workers alongside experienced developers**, not as replacements.

The projects created during this holiday break prove that:
- ✅ Senior developers can leverage AI to validate and implement multiple ideas quickly
- ✅ PRD-driven development + AI implementation = faster iteration
- ✅ Code quality remains high when guided by human oversight
- ✅ AI excels at well-defined, structured problems

Whether you're prototyping new ideas, exploring architectural patterns, or building a library ecosystem, **AI agents can be your most productive pair programmer**.

## Next Steps

All projects are open-source and available on GitHub. Contributions and feedback are welcome! 

Looking forward to exploring more ways to collaborate with AI agents in 2026.

---

**What's your experience with AI-assisted development? Share your thoughts in the comments!**
