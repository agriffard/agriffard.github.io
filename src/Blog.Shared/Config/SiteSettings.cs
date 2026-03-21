namespace Blog.Shared.Config;

public class SiteSettings
{
    public const string Section = "Site";
    public string Title         { get; init; } = string.Empty;
    public string Description   { get; init; } = string.Empty;
    public string BaseUrl       { get; init; } = string.Empty;
    public string Language      { get; init; } = "fr";
    public AuthorSettings Author { get; init; } = new();
}

public class AuthorSettings
{
    public string Name   { get; init; } = string.Empty;
    public string Email  { get; init; } = string.Empty;
    public string Avatar { get; init; } = string.Empty;
    public string Bio    { get; init; } = string.Empty;
}

public class SocialSettings
{
    public const string Section = "Social";
    public string? GitHub   { get; init; }
    public string? LinkedIn { get; init; }
    public string? Twitter  { get; init; }
    public string? Mvp      { get; init; }
}
