// Subtle periwinkle cursor glow effect that follows mouse
export function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = -500, mouseY = -500;
    let glowX = -500, glowY = -500;
    let raf;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    /* Smooth lerp follow */
    function lerp(a, b, t) { return a + (b - a) * t; }

    function frame() {
        glowX = lerp(glowX, mouseX, 0.07);
        glowY = lerp(glowY, mouseY, 0.07);
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    document.addEventListener('mouseleave', () => cancelAnimationFrame(raf));
    document.addEventListener('mouseenter', () => { raf = requestAnimationFrame(frame); });
}