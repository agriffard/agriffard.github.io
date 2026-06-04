---
title: "Understanding Shapes in Orchard Core"
slug: orchard-core-shapes
author: agriffard
pubDatetime: 2026-06-04T12:00:00Z
categories: [OrchardCore]
tags: [OrchardCore, DotNet]
description: "Shapes are the dynamic building blocks of every Orchard Core page. Here is what they are, how the rendering pipeline turns them into HTML, and why alternates and placement give you so much control without touching code."
---

If you come to Orchard Core from classic ASP.NET MVC, the first thing that confuses you is that there are almost no fixed view models. A page is not a single strongly-typed `Model` rendered by a single `.cshtml`. Instead, the page is a **tree of Shapes** — small, dynamic objects that each know how they want to be displayed, assembled at runtime and rendered into HTML.

Shapes are the single most important concept in Orchard Core's UI layer. Once they click, the whole theming and customization story makes sense. Until they click, everything feels like magic. This post is about removing the magic.

## What a Shape actually is

A Shape is a **dynamic object**. Technically it is an instance built on top of `Composite` / `IShape`, and you interact with it like an `ExpandoObject`: you can add any property to it at runtime without declaring a class.

```csharp
dynamic shape = await _shapeFactory.CreateAsync("Product");
shape.Title = "Keyboard";
shape.Price = 49.90m;
```

There is no `ProductShape` class with a `Title` property. You invented `Title` and `Price` on the spot. That is the point: a Shape carries **data** plus **metadata about how to render it**, and nothing more rigid than that.

Every Shape has a `Metadata` object that holds the important rendering information:

- **Type** — the logical name, e.g. `Product`. This drives template selection.
- **Alternates** — an ordered list of candidate template names (more on this below).
- **DisplayType** — `Detail`, `Summary`, `SummaryAdmin`, etc.
- **Wrappers**, **Position**, and a few other hints.

The mental shift: a Shape does not *know* its HTML. It only knows its **type and data**. Turning it into markup is the job of the rendering pipeline.

## The rendering pipeline

When Orchard Core needs to render a Shape, the **`IDisplayHelper`** asks the **shape table** which template matches. Resolution walks the candidate names from **most specific to least specific** and picks the first template that exists:

```
Product-Keyboard.Detail.cshtml   ← most specific (alternate)
Product.Detail.cshtml
Product.cshtml                    ← least specific (fallback)
```

The first file found wins. If none exist, Orchard falls back to a default rendering. This is why you can drop a single `.cshtml` into your theme and override exactly one Shape in one display type without recompiling anything — the resolver simply finds your more specific template first.

Templates can live in **modules** or **themes**, and the theme always wins over the module. That is the entire override mechanism: ship a default in the module, let the theme replace it by providing a file with a matching name.

## Alternates: targeted overrides without code

Alternates are the killer feature. They are extra, more specific candidate template names added to a Shape's metadata so you can override rendering in a narrow context — without touching the module that produced the Shape.

Orchard Core adds many alternates automatically. For a content item you get alternates by content type, by display type, by id, and so on:

```
Content-Article.Detail.cshtml     ← only Article, only Detail view
Content-Article.cshtml            ← only Article
Content__42.cshtml                ← only the item with id 42
Content.Detail.cshtml
Content.cshtml
```

You can also add your own alternates from a template or a driver. Want a special layout for the homepage article only? Add an alternate and create that one file. **Nothing else changes.** No conditionals scattered through a shared view, no flags — just one more template the resolver can find.

## Placement: moving Shapes without templates

If alternates control *how* a Shape renders, **`placement.json`** controls *where* it renders and *whether* it renders at all. Placement is a JSON file in a module or theme that targets Shapes by type and moves them into zones, reorders them, or hides them:

```json
{
  "Parts_Title": [
    { "place": "Header:1" }
  ],
  "TextField": [
    {
      "place": "Content:5",
      "displayType": "Detail"
    }
  ]
}
```

Here `Parts_Title` is pushed into the `Header` zone at position 1, and the text field is placed in the `Content` zone at position 5, but only in the `Detail` display type. Setting `"place": "-"` hides a Shape entirely.

This is the part that surprises newcomers: **you can completely rearrange a content item's display by editing JSON**, no Razor involved. Drivers produce Shapes; placement decides their destination.

## Where Shapes come from: drivers

Most Shapes you see on a page are produced by **display drivers**. A content part or field has a driver whose `Display` method returns one or more Shapes:

```csharp
public override IDisplayResult Display(ProductPart part, BuildPartDisplayContext context)
{
    return Initialize<ProductViewModel>("ProductPart", model =>
    {
        model.Title = part.Title;
        model.Price = part.Price;
    })
    .Location("Detail", "Content:5")
    .Location("Summary", "Content:1");
}
```

`Initialize<T>` creates a Shape named `ProductPart` backed by a typed view model — so inside the template you actually get IntelliSense. `.Location(...)` sets the default placement, which `placement.json` can then override. The driver never decides the final HTML or the final position; it only **offers a Shape and a suggestion**.

## Zones and the layout tree

Shapes nest. The top-level Shape is the **Layout**, which exposes named **zones** — `Header`, `Navigation`, `Content`, `Footer`, and any you define. Rendering a zone renders the ordered Shapes placed into it, each of which may itself contain more zones.

```
Layout
├── Header  → [ Branding, Menu ]
├── Content → [ Article (→ Title, Body, Tags) ]
└── Footer  → [ Copyright ]
```

The page is this whole tree flattened depth-first into HTML. Every node is a Shape; every Shape was resolved to a template independently. That uniformity is what makes the system so composable — there is no special case for "the page" versus "a widget" versus "a field." It is Shapes all the way down.

## Creating ad-hoc Shapes in a view

You are not limited to driver Shapes. From any Razor template you can mint a Shape on the fly with the `New` helper and render it:

```cshtml
@{
    var card = await New.ProductCard(Title: "Mouse", Price: 19.90m);
}
@await DisplayAsync(card)
```

Orchard looks for `ProductCard.cshtml`, passes your properties as the model, and renders it. This is how you build reusable UI fragments that still benefit from alternates and theme overrides.

## Why this design is worth the learning curve

| Without Shapes | With Shapes |
|----------------|-------------|
| One view model per view | Dynamic objects, no class needed |
| Override = edit or fork the view | Override = add a more specific template |
| Reorder UI = change Razor | Reorder UI = edit `placement.json` |
| Conditional rendering scattered in views | Alternates pick the right template automatically |
| Modules and themes tightly coupled | Theme overrides module by file name |

The cost is real: the indirection is hard at first, debugging "which template rendered this?" takes practice (the **Shape tracing** / placement info tools help), and dynamic objects mean fewer compile-time guarantees.

But what you buy is a UI that is **endlessly customizable without forking code**. A module author ships sensible defaults. A theme author overrides exactly what they need — one field, one content type, one display type — by adding files and JSON. Neither has to know about the other. That decoupling is the whole reason Orchard Core themes are as powerful as they are.

## Conclusion

Shapes are dynamic view models that carry data plus rendering metadata. The pipeline resolves each Shape to a template by walking its alternates from most to least specific, drivers produce the Shapes, and `placement.json` decides where they land. Master those four ideas — **Shape, alternate, driver, placement** — and the rest of Orchard Core's UI stops being magic and starts being a tool you can bend to your will.

Start small: open the placement info on a page, find a single Shape, and override it with one template. Once you have done it once, you will see Shapes everywhere — because in Orchard Core, that is all there is.
