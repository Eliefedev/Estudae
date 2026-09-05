(function () {
    const root = document.documentElement;
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    const savedTheme = localStorage.getItem('estudae-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        root.dataset.theme = isDark ? 'dark' : 'light';
        toggleButtons.forEach((button) => {
            const label = button.querySelector('[data-theme-label]');
            const icon = button.querySelector('[aria-hidden]');
            button.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo escuro');
            if (label) label.textContent = isDark ? 'Modo claro' : 'Modo escuro';
            if (icon) icon.textContent = isDark ? '☀' : '☾';
        });
    }

    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    toggleButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('estudae-theme', nextTheme);
            applyTheme(nextTheme);
        });
    });
})();
