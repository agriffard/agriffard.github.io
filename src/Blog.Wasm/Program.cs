using Blog.Shared.Config;
using Blog.Wasm.Services;
using Blazored.LocalStorage;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);

builder.RootComponents.Add<Blog.Wasm.App>("#app");
builder.RootComponents.Add<Microsoft.AspNetCore.Components.Web.HeadOutlet>("head::after");

builder.Services.AddScoped(sp =>
    new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

builder.Services
    .Configure<SiteSettings>   (builder.Configuration.GetSection(SiteSettings.Section))
    .Configure<ContentSettings>(builder.Configuration.GetSection(ContentSettings.Section))
    .Configure<FeatureFlags>   (builder.Configuration.GetSection(FeatureFlags.Section))
    .Configure<SeoSettings>    (builder.Configuration.GetSection(SeoSettings.Section))
    .Configure<NavSettings>    (builder.Configuration.GetSection(NavSettings.Section))
    .Configure<SocialSettings> (builder.Configuration.GetSection(SocialSettings.Section));

builder.Services
    .AddScoped<IContentService,  ContentService>()
    .AddScoped<IMarkdownService, MarkdownService>()
    .AddScoped<ISearchService,   SearchService>()
    .AddScoped<ThemeService>()
    .AddBlazoredLocalStorage();

await builder.Build().RunAsync();
