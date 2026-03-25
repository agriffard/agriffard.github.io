using System.Text.Json;
using System.Text.RegularExpressions;
using Blog.Shared.Models;
using Markdig;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

if (args.Length < 1)
{
    Console.Error.WriteLine("Usage: generator <wwwroot-path> [base-url]");
    return 1;
}

var wwwroot = Path.GetFullPath(args[0]);
var baseUrl = args.Length > 1 ? args[1].TrimEnd('/') : string.Empty;

if (!Directory.Exists(wwwroot))
{
    Console.Error.WriteLine($"Dossier introuvable : {wwwroot}");
    return 1;
}

var postsDir  = Path.Combine(wwwroot, "content", "posts");
var pagesDir  = Path.Combine(wwwroot, "content", "pages");
var outputDir = Path.Combine(wwwroot, "data");
Directory.CreateDirectory(outputDir);

var jsonOptions = new JsonSerializerOptions
{
    WriteIndented        = true,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
};

var mdPipeline = new MarkdownPipelineBuilder().UseAdvancedExtensions().Build();

// ── Articles ──────────────────────────────────────────────────────────────────
var posts       = new List<PostMeta>();
var searchIndex = new List<SearchEntry>();

if (Directory.Exists(postsDir))
{
    foreach (var file in Directory.EnumerateFiles(postsDir, "*.md", SearchOption.AllDirectories)
                                  .OrderByDescending(f => f))
    {
        var raw        = await File.ReadAllTextAsync(file);
        var (fm, body) = ParseFrontMatter(raw);

        if (GetBool(fm, "draft")) continue;

        var slug         = GetString(fm, "slug")  ?? Path.GetFileNameWithoutExtension(file);
        var title        = GetString(fm, "title") ?? slug;
        var relativePath = "content/posts/" + Path.GetRelativePath(postsDir, file).Replace('\\', '/');

        var meta = new PostMeta
        {
            Slug        = slug,
            Title       = title,
            PubDatetime = ParseDateTime(GetString(fm, "pubDatetime") ?? GetString(fm, "date") ?? string.Empty),
            Author      = GetString(fm, "author")      ?? string.Empty,
            Categories  = GetStringList(fm, "categories") is { Count: > 0 } cats
                            ? cats
                            : GetString(fm, "category") is { } cat && cat.Length > 0
                                ? [cat]
                                : [],
            Tags        = GetStringList(fm, "tags"),
            Description = GetString(fm, "description") ?? string.Empty,
            Cover       = GetString(fm, "cover") ?? $"og/{slug}.svg",
            ReadingTime = CalculateReadingTime(body),
            Draft       = false,
            Featured    = GetBool(fm, "featured"),
            Path        = relativePath,
        };

        posts.Add(meta);

        var html      = Markdown.ToHtml(body, mdPipeline);
        var plainText = System.Net.WebUtility.HtmlDecode(
            Regex.Replace(html, "<[^>]+>", " ")).Replace("  ", " ").Trim();

        searchIndex.Add(new SearchEntry
        {
            Slug    = slug,
            Title   = title,
            Content = plainText[..Math.Min(plainText.Length, 5000)],
            Tags    = string.Join(' ', meta.Tags),
        });

        // Write pre-rendered HTML alongside the .md file
        var htmlPath = Path.ChangeExtension(file, ".html");
        await File.WriteAllTextAsync(htmlPath, html);

        Console.WriteLine($"  ✓ {relativePath}");
    }
}

// ── Pages custom ──────────────────────────────────────────────────────────────
var pages = new List<PageMeta>();

if (Directory.Exists(pagesDir))
{
    foreach (var file in Directory.EnumerateFiles(pagesDir, "*.md", SearchOption.AllDirectories))
    {
        var raw         = await File.ReadAllTextAsync(file);
        var (fm, body)  = ParseFrontMatter(raw);
        var slug        = GetString(fm, "slug") ?? Path.GetFileNameWithoutExtension(file);

        pages.Add(new PageMeta
        {
            Slug   = slug,
            Title  = GetString(fm, "title")  ?? slug,
            Layout = GetString(fm, "layout") ?? "default",
            Path   = "content/pages/" + Path.GetRelativePath(pagesDir, file).Replace('\\', '/'),
        });

        // Write pre-rendered HTML alongside the .md file
        var pageHtml = Markdown.ToHtml(body, mdPipeline);
        var htmlPath = Path.ChangeExtension(file, ".html");
        await File.WriteAllTextAsync(htmlPath, pageHtml);

        Console.WriteLine($"  ✓ page/{slug}");
    }
}

// ── Écriture ──────────────────────────────────────────────────────────────────
var manifest = new Manifest
{
    GeneratedAt = DateTime.UtcNow,
    Posts       = [.. posts.OrderByDescending(p => p.PubDatetime)],
    Pages       = pages,
};

await WriteJsonAsync(Path.Combine(outputDir, "manifest.json"),     manifest,    jsonOptions);
await WriteJsonAsync(Path.Combine(outputDir, "search-index.json"), searchIndex, jsonOptions);
Console.WriteLine($"\n✓ manifest.json       — {posts.Count} articles, {pages.Count} pages");
Console.WriteLine($"✓ search-index.json   — {searchIndex.Count} entrées");

if (!string.IsNullOrEmpty(baseUrl))
{
    await File.WriteAllTextAsync(Path.Combine(wwwroot, "rss.xml"),
        BuildRss(manifest.Posts.ToList(), baseUrl));
    Console.WriteLine($"✓ rss.xml             — {posts.Count} entrées");
}

// ── Generate OG images ───────────────────────────────────────────────────────
var ogDir = Path.Combine(wwwroot, "og");
Directory.CreateDirectory(ogDir);
var siteTitle = string.Empty;
var siteDesc = string.Empty;
var siteUrl = string.Empty;

var appSettingsForOg = Path.Combine(wwwroot, "appsettings.json");
if (File.Exists(appSettingsForOg))
{
    using var cfgDoc = JsonDocument.Parse(await File.ReadAllTextAsync(appSettingsForOg));
    var siteEl = cfgDoc.RootElement.GetProperty("Site");
    siteTitle = siteEl.GetProperty("Title").GetString() ?? string.Empty;
    siteDesc = siteEl.TryGetProperty("Description", out var descEl) ? descEl.GetString() ?? string.Empty : string.Empty;
    siteUrl = siteEl.TryGetProperty("BaseUrl", out var urlEl) ? urlEl.GetString() ?? string.Empty : string.Empty;
}

// Site OG image
await File.WriteAllTextAsync(Path.Combine(ogDir, "site.svg"), BuildSiteOgImage(siteTitle, siteDesc, siteUrl));

// Post OG images
var ogCount = 0;
foreach (var post in manifest.Posts)
{
    var ogPath = Path.Combine(ogDir, $"{post.Slug}.svg");
    var svg = BuildOgImage(post.Title, siteTitle, post.PubDatetime);
    await File.WriteAllTextAsync(ogPath, svg);
    ogCount++;
}
Console.WriteLine($"✓ og/                 — {ogCount + 1} OG images generated (1 site + {ogCount} posts)");

// ── Generate per-post HTML shells with OG meta for crawlers ──────────────────
foreach (var post in manifest.Posts)
{
    var postDir = Path.Combine(wwwroot, "posts", post.Slug);
    Directory.CreateDirectory(postDir);
    var postOgImage = $"{baseUrl}/og/{post.Slug}.svg";
    var postUrl = $"{baseUrl}/posts/{post.Slug}";
    var html = BuildPostHtmlShell(post, siteTitle, postOgImage, postUrl);
    await File.WriteAllTextAsync(Path.Combine(postDir, "index.html"), html);
}
Console.WriteLine($"✓ posts/*/index.html  — {manifest.Posts.Count} post shells generated");

// ── Patch OG meta placeholders in index.html ─────────────────────────────────
var indexPath = Path.Combine(wwwroot, "index.html");
if (File.Exists(indexPath))
{
    var ogImageUrl = $"{baseUrl}/og/site.svg";
    var indexHtml = await File.ReadAllTextAsync(indexPath);

    // Replace OG meta content values (works whether placeholders or previously patched values)
    indexHtml = Regex.Replace(indexHtml, @"(og:title""\s+content="")[^""]*""", $"${{1}}{System.Security.SecurityElement.Escape(siteTitle)}\"");
    indexHtml = Regex.Replace(indexHtml, @"(og:description""\s+content="")[^""]*""", $"${{1}}{System.Security.SecurityElement.Escape(siteDesc)}\"");
    indexHtml = Regex.Replace(indexHtml, @"(og:url""\s+content="")[^""]*""", $"${{1}}{baseUrl}\"");
    indexHtml = Regex.Replace(indexHtml, @"(og:image""\s+content="")[^""]*""", $"${{1}}{ogImageUrl}\"");
    indexHtml = Regex.Replace(indexHtml, @"(og:site_name""\s+content="")[^""]*""", $"${{1}}{System.Security.SecurityElement.Escape(siteTitle)}\"");
    indexHtml = Regex.Replace(indexHtml, @"(name=""description""\s+content="")[^""]*""", $"${{1}}{System.Security.SecurityElement.Escape(siteDesc)}\"");

    await File.WriteAllTextAsync(indexPath, indexHtml);
    Console.WriteLine("✓ index.html          — OG meta patched");
}

return 0;

// ── Helpers ───────────────────────────────────────────────────────────────────
static string BuildPostHtmlShell(PostMeta post, string siteName, string ogImage, string canonicalUrl)
{
    var title = System.Security.SecurityElement.Escape(post.Title);
    var desc = System.Security.SecurityElement.Escape(post.Description);
    var site = System.Security.SecurityElement.Escape(siteName);
    var tags = string.Join(", ", post.Tags);

    return $"""
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{title} — {site}</title>
          <meta name="description" content="{desc}" />
          <meta property="og:title" content="{title}" />
          <meta property="og:description" content="{desc}" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="{canonicalUrl}" />
          <meta property="og:image" content="{ogImage}" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="{site}" />
          {(tags.Length > 0 ? $"""<meta name="keywords" content="{tags}" />""" : "")}
          <link rel="canonical" href="{canonicalUrl}" />
          <script>sessionStorage.setItem('spa-redirect', window.location.pathname); window.location.replace('/');</script>
        </head>
        <body>
          <p>Redirecting to <a href="/">{title}</a>…</p>
        </body>
        </html>
        """;
}

static async Task WriteJsonAsync<T>(string path, T value, JsonSerializerOptions opts)
    => await File.WriteAllTextAsync(path, JsonSerializer.Serialize(value, opts));

static (Dictionary<string, object?> fm, string body) ParseFrontMatter(string raw)
{
    var fm = new Dictionary<string, object?>(StringComparer.OrdinalIgnoreCase);
    if (!raw.StartsWith("---")) return (fm, raw);
    var end = raw.IndexOf("\n---", 3);
    if (end < 0) return (fm, raw);
    try
    {
        var parsed = new DeserializerBuilder()
            .WithNamingConvention(CamelCaseNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .Build()
            .Deserialize<Dictionary<string, object?>>(raw[3..end].Trim());
        if (parsed is not null)
            fm = new Dictionary<string, object?>(parsed, StringComparer.OrdinalIgnoreCase);
    }
    catch (Exception ex) { Console.Error.WriteLine($"  ⚠ YAML : {ex.Message}"); }
    return (fm, raw[(end + 4)..].TrimStart());
}

static string? GetString(Dictionary<string, object?> fm, string key)
    => fm.TryGetValue(key, out var v) ? v?.ToString() : null;

static bool GetBool(Dictionary<string, object?> fm, string key)
    => fm.TryGetValue(key, out var v) && v is true or "true" or "True";

static List<string> GetStringList(Dictionary<string, object?> fm, string key)
{
    if (!fm.TryGetValue(key, out var v)) return [];
    return v switch
    {
        List<object> list => [.. list.Select(x => x?.ToString() ?? string.Empty)],
        string s          => [.. s.Split(',', StringSplitOptions.TrimEntries)],
        _                 => [],
    };
}

static DateTime ParseDateTime(string raw)
{
    if (string.IsNullOrWhiteSpace(raw)) return DateTime.MinValue;
    return DateTime.TryParse(raw, System.Globalization.CultureInfo.InvariantCulture,
        System.Globalization.DateTimeStyles.RoundtripKind, out var d) ? d : DateTime.MinValue;
}

static int CalculateReadingTime(string markdown)
{
    var text  = Regex.Replace(markdown, @"```[\s\S]*?```", string.Empty);
    var words = text.Split([' ', '\n', '\r', '\t'], StringSplitOptions.RemoveEmptyEntries).Length;
    return Math.Max(1, (int)Math.Round(words / 200.0));
}

static string BuildSiteOgImage(string title, string description, string url)
{
    var escapedTitle = System.Security.SecurityElement.Escape(title);
    var escapedDesc = System.Security.SecurityElement.Escape(description);
    var hostname = string.Empty;
    try { hostname = new Uri(url).Host; } catch { }

    return $"""
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
          <!-- Background -->
          <rect width="1200" height="630" fill="#fefbfb"/>
          <!-- Shadow card -->
          <rect x="78" y="68" width="1044" height="494" rx="4" fill="#ecebeb"/>
          <!-- Main card -->
          <rect x="70" y="60" width="1044" height="494" rx="4" fill="#fefbfb" stroke="#1a1a2e" stroke-width="4"/>
          <!-- Accent bar -->
          <rect x="70" y="60" width="1044" height="8" rx="4" fill="#0d6efd"/>
          <!-- Title -->
          <text x="600" y="270" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="72" font-weight="700" fill="#1a1a2e" text-anchor="middle">{escapedTitle}</text>
          <!-- Description -->
          <text x="600" y="340" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" fill="#6c757d" text-anchor="middle">{escapedDesc}</text>
          <!-- URL -->
          <text x="1064" y="510" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" font-weight="700" fill="#6c757d" text-anchor="end">{hostname}</text>
          <!-- Code icon -->
          <text x="120" y="510" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" fill="#0d6efd">&lt;/&gt;</text>
        </svg>
        """;
}

static string BuildOgImage(string title, string siteName, DateTime date)
{
    var escaped = System.Security.SecurityElement.Escape(title);
    var dateStr = date != DateTime.MinValue ? date.ToString("dd MMMM yyyy", System.Globalization.CultureInfo.GetCultureInfo("fr-FR")) : string.Empty;
    var escapedSite = System.Security.SecurityElement.Escape(siteName);

    // Word-wrap title into lines of ~35 chars max
    var words = escaped.Split(' ');
    var lines = new List<string>();
    var current = "";
    foreach (var word in words)
    {
        if (current.Length + word.Length + 1 > 35 && current.Length > 0)
        {
            lines.Add(current);
            current = word;
        }
        else
        {
            current = current.Length == 0 ? word : $"{current} {word}";
        }
    }
    if (current.Length > 0) lines.Add(current);
    if (lines.Count > 4) lines = lines.Take(4).ToList();

    var titleFontSize = lines.Count > 2 ? 48 : 60;
    var titleY = 200;
    var lineHeight = titleFontSize + 12;
    var titleSvg = string.Concat(lines.Select((line, i) =>
        $"""<text x="100" y="{titleY + i * lineHeight}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="{titleFontSize}" font-weight="700" fill="#1a1a2e">{line}</text>"""));

    return $"""
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
          <!-- Background -->
          <rect width="1200" height="630" fill="#fefbfb"/>
          <!-- Shadow card -->
          <rect x="58" y="38" width="1084" height="554" rx="4" fill="#ecebeb"/>
          <!-- Main card -->
          <rect x="50" y="30" width="1084" height="554" rx="4" fill="#fefbfb" stroke="#1a1a2e" stroke-width="4"/>
          <!-- Accent bar -->
          <rect x="50" y="30" width="1084" height="8" rx="4" fill="#0d6efd"/>
          <!-- Title -->
          {titleSvg}
          <!-- Date -->
          <text x="100" y="{titleY + lines.Count * lineHeight + 20}" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="24" fill="#6c757d">{dateStr}</text>
          <!-- Site name -->
          <text x="1084" y="540" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" fill="#6c757d" text-anchor="end">{escapedSite}</text>
          <!-- Code icon -->
          <text x="100" y="540" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="28" fill="#0d6efd">&lt;/&gt;</text>
        </svg>
        """;
}

static string BuildRss(List<PostMeta> posts, string baseUrl)
{
    var items = string.Concat(posts.Select(p =>
        $"""
              <item>
                <title><![CDATA[{p.Title}]]></title>
                <link>{baseUrl}/posts/{p.Slug}</link>
                <guid isPermaLink="true">{baseUrl}/posts/{p.Slug}</guid>
                <pubDate>{p.PubDatetime:R}</pubDate>
                <description><![CDATA[{p.Description}]]></description>
                {string.Concat(p.Tags.Select(t => $"<category>{t}</category>"))}
              </item>
        """));
    return $"""
        <?xml version="1.0" encoding="UTF-8"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
          <channel>
            <link>{baseUrl}</link>
            <atom:link href="{baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
            {items}
          </channel>
        </rss>
        """;
}
