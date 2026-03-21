using Blazored.LocalStorage;
using Microsoft.JSInterop;

namespace Blog.Wasm.Services;

public sealed class ThemeService(ILocalStorageService localStorage, IJSRuntime js)
{
    private const string StorageKey = "theme";
    private bool _isDark;
    private bool _initialized;

    public bool IsDark => _isDark;

    public async Task InitializeAsync()
    {
        if (_initialized) return;
        _initialized = true;

        var stored = await localStorage.GetItemAsStringAsync(StorageKey);
        if (!string.IsNullOrEmpty(stored))
        {
            _isDark = stored == "dark";
        }
        else
        {
            _isDark = await js.InvokeAsync<bool>("eval",
                "window.matchMedia('(prefers-color-scheme: dark)').matches");
        }

        await ApplyThemeAsync();
    }

    public async Task ToggleAsync()
    {
        _isDark = !_isDark;
        await localStorage.SetItemAsStringAsync(StorageKey, _isDark ? "dark" : "light");
        await ApplyThemeAsync();
    }

    private async Task ApplyThemeAsync()
    {
        var theme = _isDark ? "dark" : "light";
        await js.InvokeVoidAsync("eval",
            $"document.documentElement.className = '{theme}'");
    }
}
