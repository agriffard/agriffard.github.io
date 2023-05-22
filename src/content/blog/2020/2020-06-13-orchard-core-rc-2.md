---
title: Orchard Core RC 2
author: agriffard
pubDatetime: 2020-06-13T12:00:00Z
categories: [OrchardCore]
tags: [Release]
description: Orchard Core RC 2
---

Orchard Core is available in [RC2](https://github.com/OrchardCMS/OrchardCore/releases/tag/1.0.0-rc2).

## What is Orchard Core?

Orchard Core Framework is an application framework for building modular, multi-tenant applications on ASP.NET Core.

Or you can use Orchard Core CMS, a Web Content Management System (CMS) built on top of the Orchard Core Framework, that allows you to build full websites, or headless websites using GraphQL.

## Getting Started

### Installing the templates

You can install the recommended templates by running:

`dotnet new -i OrchardCore.ProjectTemplates::1.0.0-*`

### Creating a new modular application

Using the templates, a modular MVC application can be created by running:

`dotnet new ocmvc -n MySite`

And a module is created by running:

`dotnet new ocmodulemvc -n MyModuledotnet add MySite reference MyModule`

### Creating a CMS website

If you want to create new site based on the Orchard Core CMS you only need to run this:

`dotnet new occms -n MySitedotnet run --project .\MySite\MySite.csproj`

After going through the setup form you get a working Blog.

## What's new

Orchard Core is the product of more than **150 contributors**, and has now [4K stars on GitHub](https://github.com/orchardcms/orchardcore).

Some notable improvements include:

- Content localization support, and pre-configured localized Setup experience
- Improved block content management experience
- Sitemaps management
- Azure support improvements

## Resources

The Orchard Core source code is available on [GitHub](https://github.com/OrchardCMS/OrchardCore).

There are still many important pieces to add and you might want to check our [roadmap](https://github.com/OrchardCMS/OrchardCore/wiki/Roadmap), but it's also the best time to jump into the project and start contributing new modules, themes, improvements, or just ideas.

Feel free to drop on our dedicated [Gitter chat](https://gitter.im/OrchardCMS/OrchardCore) and ask questions.
