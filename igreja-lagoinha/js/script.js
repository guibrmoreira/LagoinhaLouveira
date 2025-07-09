document.addEventListener('DOMContentLoaded', function () {
    const themeSwitcher = document.getElementById('themeSwitcher');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    function updateThemeIcon() {
        const icon = themeSwitcher.querySelector('i');
        if (htmlElement.getAttribute('data-theme') === 'light') {
            icon.textContent = '🌙';
            icon.style.color = '#000';
        } else {
            icon.textContent = '☀️';
            icon.style.color = '#000';
        }
    }

    themeSwitcher.addEventListener('click', function () {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });

    updateThemeIcon();

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });
});


