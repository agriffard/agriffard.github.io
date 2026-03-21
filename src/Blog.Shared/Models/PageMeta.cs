namespace Blog.Shared.Models;

public record PageMeta
{
    public string Slug   { get; init; } = string.Empty;
    public string Title  { get; init; } = string.Empty;
    public string Layout { get; init; } = "default";
    public string Path   { get; init; } = string.Empty;
}
