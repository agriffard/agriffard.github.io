namespace Blog.Shared.Config;

public class NavSettings
{
    public const string Section = "Nav";
    public List<NavLink> Links { get; init; } = [];
}

public class NavLink
{
    public string Label { get; init; } = string.Empty;
    public string Href  { get; init; } = string.Empty;
}
