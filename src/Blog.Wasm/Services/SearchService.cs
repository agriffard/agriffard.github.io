using System.Net.Http.Json;
using Blog.Shared.Models;

namespace Blog.Wasm.Services;

public sealed class SearchService(HttpClient http) : ISearchService
{
    private List<SearchEntry>? _index;

    public async Task LoadIndexAsync()
    {
        if (_index is not null) return;
        _index = await http.GetFromJsonAsync<List<SearchEntry>>("data/search-index.json") ?? [];
    }

    public async Task<IReadOnlyList<SearchEntry>> SearchAsync(string query, string? tag = null, string? category = null)
    {
        await LoadIndexAsync();
        if (string.IsNullOrWhiteSpace(query) && string.IsNullOrWhiteSpace(tag))
            return [];

        var results = _index!.AsEnumerable();

        if (!string.IsNullOrWhiteSpace(tag))
            results = results.Where(e => e.Tags.Contains(tag, StringComparison.OrdinalIgnoreCase));

        if (!string.IsNullOrWhiteSpace(query))
        {
            var q = query.Trim();
            results = results.Where(e =>
                e.Title.Contains(q, StringComparison.OrdinalIgnoreCase) ||
                e.Content.Contains(q, StringComparison.OrdinalIgnoreCase) ||
                e.Tags.Contains(q, StringComparison.OrdinalIgnoreCase));
        }

        return results.ToList();
    }
}
