namespace Blog.Shared.Models;

public record Manifest
{
    public DateTime       GeneratedAt { get; init; }
    public List<PostMeta> Posts       { get; init; } = [];
    public List<PageMeta> Pages       { get; init; } = [];
}
