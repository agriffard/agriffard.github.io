namespace Blog.Shared.Config;

public class FeatureFlags
{
    public const string Section = "Features";
    public bool Search          { get; init; } = true;
    public bool Rss             { get; init; } = true;
    public bool DarkMode        { get; init; } = true;
    public bool ReadingTime     { get; init; } = true;
    public bool TableOfContents { get; init; } = true;
}
