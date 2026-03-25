using Blog.Shared.Models;

namespace Blog.Wasm.Services;

public interface IContentService
{
    Task<Manifest> GetManifestAsync();
    Task<(IReadOnlyList<PostMeta> Items, int Total)> GetPostsAsync(string? category = null, string? tag = null, int page = 1);
    Task<Post?> GetPostAsync(string slug);
    Task<Post?> GetPageAsync(string slug);
    Task<IReadOnlyDictionary<int, IReadOnlyList<PostMeta>>> GetArchivesAsync();
    Task<IReadOnlyDictionary<string, int>> GetTagsAsync();
    Task<IReadOnlyDictionary<string, int>> GetCategoriesAsync();
    Task<IReadOnlyList<PostMeta>> GetFeaturedPostsAsync();
}
