# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blarkdown is a **Blazor WebAssembly (.NET 10) static blog** hosted on GitHub Pages. It renders Markdown content with YAML Front Matter entirely client-side — no backend. The PRD (`PRD.md`) is the authoritative specification.

## Solution Structure

```
Blog.slnx
├── src/Blog.Shared/        — Models (PostMeta, PageMeta, Manifest, SearchEntry) and Config (Options pattern classes)
├── src/Blog.Wasm/          — Blazor WASM app (pages, components, services)
│   └── wwwroot/
│       ├── content/        — Markdown files (posts/ and pages/), committed to repo
│       └── data/           — Generated at build (manifest.json, search-index.json, rss.xml) — gitignored
└── tools/Blog.ManifestGenerator/ — CLI tool that scans .md files and generates manifest/search/RSS
```

## Build Commands

```bash
dotnet restore Blog.slnx
dotnet build Blog.slnx                    # also runs ManifestGenerator via MSBuild target
dotnet run --project src/Blog.Wasm        # dev server at http://localhost:5000
dotnet publish src/Blog.Wasm/Blog.Wasm.csproj -c Release -o publish \
  /p:SiteBaseUrl=https://user.github.io/repo /p:GHPagesBase=/repo
```

Building `Blog.Wasm` automatically triggers `Blog.ManifestGenerator` (MSBuild `BeforeTargets="BeforeBuild"`), which scans `wwwroot/content/` and writes `wwwroot/data/manifest.json`, `search-index.json`, and `rss.xml`.

## Architecture Key Points

- **Zero backend**: everything runs in the browser via WASM + static files fetched over HTTP
- **Content pipeline**: `Blog.ManifestGenerator` parses Front Matter (YamlDotNet) and Markdown (Markdig) at build time, producing JSON manifests the WASM app consumes at runtime
- **Runtime flow**: `ContentService` fetches `data/manifest.json` once (cached), then lazy-loads individual `.md` files on demand; `MarkdownService` renders them to HTML client-side
- **Configuration**: `appsettings.json` uses the Options pattern (`IOptions<SiteSettings>`, `IOptions<ContentSettings>`, etc.) — see `Blog.Shared/Config/`
- **SPA routing on GitHub Pages**: `404.html` is a copy of `index.html`; a sessionStorage-based redirect script handles deep links
- **`#{GHPagesBase}` placeholder** in `index.html` `<base href>` is replaced by MSBuild's `PatchBaseHref` target at publish time

## Key Dependencies

- .NET 10, Blazor WebAssembly
- Markdig (1+) — Markdown rendering
- YamlDotNet (16+) — Front Matter parsing
- Blazored.LocalStorage — theme/user preferences
- Solution format: `.slnx` (not `.sln`)

## Content Format

Posts live in `wwwroot/content/posts/` and pages in `wwwroot/content/pages/`. Front Matter fields: `title`, `slug`, `date`, `author`, `category`, `tags`, `description`, `cover`, `draft`, `layout`.

## Deployment

GitHub Actions (`deploy.yml`): push to `main` → `dotnet publish` → `peaceiris/actions-gh-pages` → `gh-pages` branch. The manifest generator runs automatically as part of publish.

## Language

The PRD and UI are in French. Code (identifiers, comments in source) should be in English.
