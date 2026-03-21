using Blog.Shared.Models;

namespace Blog.Wasm.Services;

public interface ISearchService
{
    Task LoadIndexAsync();
    Task<IReadOnlyList<SearchEntry>> SearchAsync(string query, string? tag = null, string? category = null);
}
