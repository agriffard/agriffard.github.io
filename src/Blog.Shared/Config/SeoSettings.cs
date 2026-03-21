namespace Blog.Shared.Config;

public class SeoSettings
{
    public const string Section = "Seo";
    public string  OgImage       { get; init; } = string.Empty;
    public int     OgImageWidth  { get; init; } = 1200;
    public int     OgImageHeight { get; init; } = 630;
}
