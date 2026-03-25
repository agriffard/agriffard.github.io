namespace Blog.Shared.Models;

public record PostMeta
{
    public string       Slug        { get; init; } = string.Empty;
    public string       Title       { get; init; } = string.Empty;
    public DateTime     PubDatetime { get; init; }
    public string       Author      { get; init; } = string.Empty;
    public List<string> Categories  { get; init; } = [];
    public List<string> Tags        { get; init; } = [];
    public string       Description { get; init; } = string.Empty;
    public string?      Cover       { get; init; }
    public int          ReadingTime { get; init; }
    public bool         Draft       { get; init; }
    public bool         Featured    { get; init; }
    public string       Path        { get; init; } = string.Empty;
}
