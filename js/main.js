// Application entry point: initializes all modules
import { initTheme } from './theme.js';
import { initNavbar } from './navbar.js';
import { initReveal } from './reveal.js';
import { initCursorGlow } from './cursor.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initReveal();
    initCursorGlow();
});
