using Markdig;

namespace Blog.Wasm.Services;

public sealed class MarkdownService : IMarkdownService
{
    private readonly MarkdownPipeline _pipeline = new MarkdownPipelineBuilder()
        .UseAdvancedExtensions()
        .Build();

    public string ToHtml(string rawMarkdown)
    {
        var content = StripFrontMatter(rawMarkdown);
        return Markdown.ToHtml(content, _pipeline);
    }

    private static string StripFrontMatter(string raw)
    {
        if (!raw.StartsWith("---")) return raw;
        var end = raw.IndexOf("\n---", 3);
        if (end < 0) return raw;
        return raw[(end + 4)..].TrimStart();
    }
}
