namespace Blog.Shared.Models;

public record SearchEntry
{
    public string Slug    { get; init; } = string.Empty;
    public string Title   { get; init; } = string.Empty;
    public string Content { get; init; } = string.Empty;
    public string Tags    { get; init; } = string.Empty;
}
