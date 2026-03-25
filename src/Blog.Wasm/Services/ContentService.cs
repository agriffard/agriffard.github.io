using System.Net.Http.Json;
using Blog.Shared.Config;
using Blog.Shared.Models;
using Microsoft.Extensions.Options;

namespace Blog.Wasm.Services;

public sealed class ContentService(
    HttpClient http,
    IOptions<ContentSettings> options) : IContentService
{
    private readonly ContentSettings          _settings = options.Value;
    private Manifest?                         _manifest;
    private readonly Dictionary<string, Post> _cache = [];

    public async Task<Manifest> GetManifestAsync()
    {
        if (_manifest is not null) return _manifest;
        _manifest = await http.GetFromJsonAsync<Manifest>("data/manifest.json")
            ?? throw new InvalidOperationException("data/manifest.json introuvable.");
        return _manifest;
    }

    public async Task<(IReadOnlyList<PostMeta> Items, int Total)> GetPostsAsync(
        string? category = null, string? tag = null, int page = 1)
    {
        var m     = await GetManifestAsync();
        var query = m.Posts.Where(p => !p.Draft);
        if (category is not null)
            query = query.Where(p => p.Categories.Contains(category, StringComparer.OrdinalIgnoreCase));
        if (tag is not null)
            query = query.Where(p => p.Tags.Contains(tag, StringComparer.OrdinalIgnoreCase));
        var all   = query.ToList();
        var items = all.Skip((page - 1) * _settings.PostsPerPage).Take(_settings.PostsPerPage).ToList();
        return (items, all.Count);
    }

    public async Task<Post?> GetPostAsync(string slug)
    {
        if (_cache.TryGetValue(slug, out var hit)) return hit;
        var m    = await GetManifestAsync();
        var meta = m.Posts.FirstOrDefault(p => p.Slug == slug);
        return meta is null ? null : await LoadAndCacheAsync(meta, slug);
    }

    public async Task<Post?> GetPageAsync(string slug)
    {
        var key = $"page:{slug}";
        if (_cache.TryGetValue(key, out var hit)) return hit;
        var m        = await GetManifestAsync();
        var pageMeta = m.Pages.FirstOrDefault(p => p.Slug == slug);
        if (pageMeta is null) return null;
        var meta = new PostMeta { Slug = pageMeta.Slug, Title = pageMeta.Title, Path = pageMeta.Path };
        return await LoadAndCacheAsync(meta, key);
    }

    public async Task<IReadOnlyDictionary<int, IReadOnlyList<PostMeta>>> GetArchivesAsync()
    {
        var m = await GetManifestAsync();
        return m.Posts.Where(p => !p.Draft)
            .GroupBy(p => p.PubDatetime.Year)
            .OrderByDescending(g => g.Key)
            .ToDictionary(
                g => g.Key,
                g => (IReadOnlyList<PostMeta>)g.OrderByDescending(p => p.PubDatetime).ToList());
    }

    public async Task<IReadOnlyDictionary<string, int>> GetTagsAsync()
    {
        var m = await GetManifestAsync();
        return m.Posts.Where(p => !p.Draft)
            .SelectMany(p => p.Tags)
            .GroupBy(t => t, StringComparer.OrdinalIgnoreCase)
            .OrderByDescending(g => g.Count())
            .ToDictionary(g => g.Key, g => g.Count());
    }

    public async Task<IReadOnlyDictionary<string, int>> GetCategoriesAsync()
    {
        var m = await GetManifestAsync();
        return m.Posts.Where(p => !p.Draft)
            .SelectMany(p => p.Categories)
            .GroupBy(c => c, StringComparer.OrdinalIgnoreCase)
            .OrderByDescending(g => g.Count())
            .ToDictionary(g => g.Key, g => g.Count());
    }

    public async Task<IReadOnlyList<PostMeta>> GetFeaturedPostsAsync()
    {
        var m = await GetManifestAsync();
        return m.Posts.Where(p => !p.Draft && p.Featured)
            .OrderByDescending(p => p.PubDatetime)
            .ToList();
    }

    private async Task<Post> LoadAndCacheAsync(PostMeta meta, string cacheKey)
    {
        // Fetch pre-rendered HTML (generated at build time)
        var htmlPath = System.IO.Path.ChangeExtension(meta.Path, ".html");
        var html = await http.GetStringAsync(htmlPath);
        var post = new Post { Meta = meta, RawMarkdown = string.Empty, Html = html };
        _cache[cacheKey] = post;
        return post;
    }
}
