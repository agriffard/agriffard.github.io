namespace Blog.Wasm.Services;

public interface IMarkdownService
{
    string ToHtml(string rawMarkdown);
}
