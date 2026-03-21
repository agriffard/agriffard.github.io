namespace Blog.Shared.Config;

public class ContentSettings
{
    public const string Section = "Content";
    public string PostsPath     { get; init; } = "content/posts";
    public string PagesPath     { get; init; } = "content/pages";
    public string AssetsPath    { get; init; } = "assets";
    public int    PostsPerPage  { get; init; } = 10;
    public string DefaultCover  { get; init; } = "/assets/og-default.png";
    public string DateFormat    { get; init; } = "dd MMMM yyyy";
}
