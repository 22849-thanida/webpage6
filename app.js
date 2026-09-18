// Cursor Track
const cursorGlow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// 5-Stage Cinematic Timeline Sequence
document.getElementById('enter-btn').addEventListener('click', () => {
    const curtain = document.getElementById('ocean-curtain');
    const portal = document.getElementById('portal-target');
    const statusBox = document.getElementById('portal-status-box');
    const statusText = document.getElementById('status-text');
    const progressBar = document.getElementById('progress-bar');
    const statusPercent = document.getElementById('status-percent');

    const flash = document.getElementById('screen-flash');
    const crack = document.getElementById('reality-crack');
    const btn = document.getElementById('enter-btn');

    const waves = [
        document.getElementById('shockwave-1'),
        document.getElementById('shockwave-2'),
        document.getElementById('shockwave-3'),
        document.getElementById('shockwave-4'),
        document.getElementById('shockwave-5')
    ];

    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.3';
    statusBox.style.display = 'block';

    // Start 6-Second Epic Audio
    if (typeof playLongEpicEntranceSound === 'function') {
        playLongEpicEntranceSound();
    }

    // --- STAGE 1: ENERGY CHARGE (0s - 2.2s) ---
    portal.classList.add('portal-charge');
    let percent = 0;
    const progressInterval = setInterval(() => {
        percent += 1;
        if (percent <= 100) {
            progressBar.style.width = percent + '%';
            statusPercent.textContent = percent + '%';

            if (percent === 30) statusText.textContent = 'CORE ENERGY CHARGING...';
            if (percent === 60) statusText.textContent = 'QUANTUM STABILITY: CRITICAL';
            if (percent === 85) statusText.textContent = 'IMPLOSION SINGULARITY NEAR';
        } else {
            clearInterval(progressInterval);
        }
    }, 22);

    // --- STAGE 2: GRAVITY WELL IMPLOSION (2.2s - 3.8s) ---
    setTimeout(() => {
        statusText.textContent = 'WARNING: GRAVITY COLLAPSE!';
        portal.classList.remove('portal-charge');
        portal.classList.add('portal-implode');
        if (typeof setParticleState === 'function') {
            setParticleState('suck');
        }
    }, 2200);

    // --- STAGE 3: SUPERNOVA EXPLOSION & REALITY CRACK (3.9s) ---
    setTimeout(() => {
        statusText.textContent = 'DIMENSION SHATTERING...';
        document.body.classList.add('earthquake-shake');
        crack.classList.add('crack-active');

        if (typeof setParticleState === 'function') {
            setParticleState('warp');
        }
        if (typeof triggerPortalExplosion === 'function') {
            triggerPortalExplosion(window.innerWidth / 2, window.innerHeight / 2);
        }

        flash.classList.add('flash-active');
        waves.forEach((w, idx) => {
            setTimeout(() => w.classList.add('active'), idx * 120);
        });

        curtain.classList.add('open');
    }, 3900);

    // --- STAGE 4: CLEANUP & REVEAL SITE (6.0s) ---
    setTimeout(() => {
        curtain.style.display = 'none';
        flash.classList.remove('flash-active');
        crack.classList.remove('crack-active');
        document.body.classList.remove('earthquake-shake');
    }, 6000);
});

// Navigation Engine
const navLinks = document.querySelectorAll('.nav-link, .nav-trigger');
const sections = document.querySelectorAll('.content-section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            e.preventDefault();
            if (typeof playBubbleClickSound === 'function') {
                playBubbleClickSound();
            }

            document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'));
            const activeNav = document.querySelector(`.nav-link[href="#${targetId}"]`);
            if (activeNav) activeNav.classList.add('active');

            sections.forEach(sec => sec.classList.remove('active'));
            targetSection.classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// 3D Glass Card Tilt Effect
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 12;
        const rotateY = (centerX - x) / 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
});
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. High-Performance Cursor Tracking ---
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let isTicking = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isTicking) {
                requestAnimationFrame(() => {
                    cursorGlow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
                    isTicking = false;
                });
                isTicking = true;
            }
        });
    }

    // --- 2. 5-Stage Cinematic Timeline Sequence ---
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            const curtain = document.getElementById('ocean-curtain');
            const portal = document.getElementById('portal-target');
            const statusBox = document.getElementById('portal-status-box');
            const statusText = document.getElementById('status-text');
            const progressBar = document.getElementById('progress-bar');
            const statusPercent = document.getElementById('status-percent');
            const flash = document.getElementById('screen-flash');
            const crack = document.getElementById('reality-crack');

            const waves = [
                document.getElementById('shockwave-1'),
                document.getElementById('shockwave-2'),
                document.getElementById('shockwave-3'),
                document.getElementById('shockwave-4'),
                document.getElementById('shockwave-5')
            ].filter(Boolean); // คัดกรองเฉพาะ Element ที่มีอยู่จริงใน DOM

            // ล็อกปุ่มเพื่อป้องกันการกดซ้ำ
            enterBtn.style.pointerEvents = 'none';
            enterBtn.style.opacity = '0.3';
            if (statusBox) statusBox.style.display = 'block';

            // เริ่มเล่นเสียง Cinematic
            if (typeof playLongEpicEntranceSound === 'function') {
                playLongEpicEntranceSound();
            }

            // --- STAGE 1: ENERGY CHARGE (0s - 2.2s) ---
            if (portal) portal.classList.add('portal-charge');
            let percent = 0;
            const progressInterval = setInterval(() => {
                percent += 1;
                if (percent <= 100) {
                    if (progressBar) progressBar.style.width = `${percent}%`;
                    if (statusPercent) statusPercent.textContent = `${percent}%`;

                    if (statusText) {
                        if (percent === 30) statusText.textContent = 'CORE ENERGY CHARGING...';
                        if (percent === 60) statusText.textContent = 'QUANTUM STABILITY: CRITICAL';
                        if (percent === 85) statusText.textContent = 'IMPLOSION SINGULARITY NEAR';
                    }
                } else {
                    clearInterval(progressInterval);
                }
            }, 22);

            // --- STAGE 2: GRAVITY WELL IMPLOSION (2.2s - 3.8s) ---
            setTimeout(() => {
                if (statusText) statusText.textContent = 'WARNING: GRAVITY COLLAPSE!';
                if (portal) {
                    portal.classList.remove('portal-charge');
                    portal.classList.add('portal-implode');
                }
                if (typeof setParticleState === 'function') {
                    setParticleState('suck');
                }
            }, 2200);

            // --- STAGE 3: SUPERNOVA EXPLOSION & REALITY CRACK (3.9s) ---
            setTimeout(() => {
                if (statusText) statusText.textContent = 'DIMENSION SHATTERING...';
                document.body.classList.add('earthquake-shake');
                if (crack) crack.classList.add('crack-active');

                if (typeof setParticleState === 'function') {
                    setParticleState('warp');
                }
                if (typeof triggerPortalExplosion === 'function') {
                    triggerPortalExplosion(window.innerWidth / 2, window.innerHeight / 2);
                }

                if (flash) flash.classList.add('flash-active');
                waves.forEach((w, idx) => {
                    setTimeout(() => w.classList.add('active'), idx * 120);
                });

                if (curtain) curtain.classList.add('open');
            }, 3900);

            // --- STAGE 4: CLEANUP & REVEAL SITE (6.0s) ---
            setTimeout(() => {
                if (curtain) curtain.style.display = 'none';
                if (flash) flash.classList.remove('flash-active');
                if (crack) crack.classList.remove('crack-active');
                document.body.classList.remove('earthquake-shake');
            }, 6000);
        });
    }

    // --- 3. Navigation Engine ---
    const navLinks = document.querySelectorAll('.nav-link, .nav-trigger');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                e.preventDefault();
                if (typeof playBubbleClickSound === 'function') {
                    playBubbleClickSound();
                }

                document.querySelectorAll('.nav-link').forEach(nl => nl.classList.remove('active'));
                const activeNav = document.querySelector(`.nav-link[href="#${targetId}"]`);
                if (activeNav) activeNav.classList.add('active');

                sections.forEach(sec => sec.classList.remove('active'));
                targetSection.classList.add('active');

                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // --- 4. 3D Glass Card Tilt Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / 12).toFixed(2);
            const rotateY = ((centerX - x) / 12).toFixed(2);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
});
