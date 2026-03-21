// Highlights code blocks with Prism and adds copy-to-clipboard buttons.
// Called from Blazor after content renders.
window.highlightAndAddCopyButtons = function () {
    if (typeof Prism === 'undefined') return;

    // Set autoloader path for CDN language grammars
    if (Prism.plugins && Prism.plugins.autoloader) {
        Prism.plugins.autoloader.languages_path =
            'https://cdnjs.cloudflare.com/ajax/libs/prism/1.30.0/components/';
    }

    // Find all code blocks not yet processed
    document.querySelectorAll('pre > code').forEach(function (codeEl) {
        var pre = codeEl.parentElement;
        if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) return;

        // Detect language from class (e.g., language-csharp)
        var langClass = Array.from(codeEl.classList).find(function (c) { return c.startsWith('language-'); });
        if (!langClass) {
            // Try to infer from common patterns
            codeEl.classList.add('language-plaintext');
        }

        // Wrap pre in a container for the copy button
        var wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        // Add copy button
        var btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.setAttribute('aria-label', 'Copy code');
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
        btn.addEventListener('click', function () {
            var text = codeEl.textContent;
            navigator.clipboard.writeText(text).then(function () {
                btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
                btn.classList.add('copied');
                setTimeout(function () {
                    btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy';
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
        wrapper.appendChild(btn);
    });

    // Run Prism highlighting
    Prism.highlightAll();
};
