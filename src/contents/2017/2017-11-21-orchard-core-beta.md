---
title: Orchard Core Beta
author: agriffard
datetime: 2017-11-21T12:00:00Z
categories: [OrchardCore]
tags: [Release]
---

Today, we are really proud to announce that the first version of **Orchard Core** has been released in [Beta](https://github.com/OrchardCMS/OrchardCore/releases/tag/1.0.0-beta1).

## What is Orchard Core and Orchard Core CMS?  

**Orchard Core** is a Modular and Extensible Application Framework developped on the .NET Core ecosystem.  
It allows you to create Multi tenant SaaS applications and host multiple sites with only one instance.  
**Orchard Core CMS** is a full featured Content Management System that provides many useful modules.  
With it, you can easily enable existing features or add your own modules to extend your application.

## What features are available?

These features are available out of the box:

- **Nuget Packages**: Add reference in your application to Orchard Core Nuget packages.  
- **Performance**: Handle many requests per second by default and even more with Response Cache.  
- **Portable**: You can develop and deploy on multiple platforms : Windows, Mac and Linux.  
- **Deployment**: Import/Export the data and the structure of your site with deployment plans.  
- **Setup**: Use different recipes to setup your site with initial features and content types using configurable steps and dynamic parameters.
- **Storage**: YesSQL allows you to store your contents in SQL Server, SQLite, MySQL or PostgreSQL as if it was a document database.  

Many other modules can allow you to create a CMS:

- Create your **Content Types** adding out of the box predefined Parts and Fields.  
- Customize your site using **Themes**with ASP.NET Razor or Liquid syntax files.  
- Define different **Zones** on the site and add **Widgets**anywhere in your pages.  
- Declare **Templates**in admin that overrides the rendering of your content types.  
- Edit your content with **Wysiwyg**or **Mardown**editors that can use **Liquid filters**.  
- Get a **Live Preview** of your content in separate window while editing it from the admin.  
- Manage the **Users, Roles and Permissions** to give access to the Admin dashboard pages.  
- Manage your Assets and Media folders, upload files and add link to dynamically resized pictures.  
- Organize your **Contents**and navigate in the site: Lists, Menus, Taxonomies, Urls, ...  
- Search: **Index** your data and **Query**them in **Sql**or **Lucene**using Liquid syntax.  

## What is the current Status?

Orchard Core is currently in **Beta**. See the [Roadmap](https://github.com/OrchardCMS/OrchardCore/wiki/Roadmap) for more details.  
This is an **Open Source** project so everyone can contribute and help in many ways to make it grows.

## How do I get started?

Create an application using Orchard Core is as easy as adding a Nuget package reference to your **ASP.NET Core project** and configure two lines in the startup.cs file.  
You can have a running instance in less than 5 minutes following this [tutorial](http://www.ideliverable.com/blog/getting-started-with-orchard-core-as-a-nuget-package).

## Useful links

GitHub repository : [https://github.com/OrchardCMS/OrchardCore](https://github.com/OrchardCMS/OrchardCore)  
Gitter chat room : [https://gitter.im/OrchardCMS/OrchardCore](https://gitter.im/OrchardCMS/OrchardCore)  
Orchard Project site : [http://orchardproject.net](http://orchardproject.net/)  
Orchard Core documentation : [http://orchardcore.readthedocs.io](http://orchardcore.readthedocs.io/)
