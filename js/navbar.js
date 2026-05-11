// Scroll state tracking, active section highlighting, mobile menu
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const THRESHOLD = 24;

    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > THRESHOLD);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on init
}

function initActiveSections() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!navLinks.length) return;

    const sections = Array.from(document.querySelectorAll('section[id]'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            });
        },
        { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    function toggle() {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    }

    function close() {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', toggle);

    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            close();
        }
    });
}

function initScrollTopButton() {
    const button = document.getElementById('scrollTopBtn');
    if (!button) return;

    const THRESHOLD = 320;

    function updateVisibility() {
        button.classList.toggle('visible', window.scrollY > THRESHOLD);
    }

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();
}

export function initNavbar() {
    initNavbarScroll();
    initActiveSections();
    initMobileMenu();
    initScrollTopButton();
}