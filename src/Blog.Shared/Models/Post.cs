namespace Blog.Shared.Models;

public record Post
{
    public PostMeta Meta        { get; init; } = new();
    public string   RawMarkdown { get; init; } = string.Empty;
    public string   Html        { get; init; } = string.Empty;
}
