/* ============================================================
           CURSOR
           ============================================================ */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
});

function animateCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

/* ============================================================
   PRELOADER
   ============================================================ */
const logs = [
    { text: 'BIOS 3.0 — Iniciando kernel de portfolio...', type: 'ok', delay: 0 },
    { text: 'Cargando módulo: identidad.jar', type: 'ok', delay: 180 },
    { text: 'Cargando módulo: proyectos.bin', type: 'ok', delay: 360 },
    { text: 'Cargando módulo: experiencia.log', type: 'ok', delay: 540 },
    { text: 'Comprobando dependencias Java 21...', type: 'ok', delay: 720 },
    { text: 'Montando sistema de archivos /dev/portfolio', type: 'ok', delay: 860 },
    { text: 'Validando certificados TLS...', type: 'warn', delay: 980 },
    { text: 'WARN: talent overflow detected (esperado)', type: 'warn', delay: 1080 },
    { text: 'Sistema listo. Bienvenido.', type: 'ok', delay: 1200 },
];

const preLog = document.getElementById('pre-logs');
const preBar = document.getElementById('pre-bar');
const preBarW = document.getElementById('pre-bar-wrap');
const preSkip = document.getElementById('pre-skip');
const preEl = document.getElementById('preloader');

let preloadDone = false;

function finishPreload() {
    if (preloadDone) return;
    preloadDone = true;
    preEl.classList.add('hidden');
}

preSkip.addEventListener('click', finishPreload);

// Animate logs
logs.forEach((l, i) => {
    setTimeout(() => {
        const div = document.createElement('div');
        div.className = `pre-log ${l.type}`;
        div.style.animationDelay = '0s';
        div.innerHTML = `<span style="color:var(--fg-muted)">[${String(i).padStart(2, '0')}]</span>&nbsp;<span class="status">${l.type === 'ok' ? 'OK' : l.type === 'warn' ? 'WARN' : 'ERR'}</span>&nbsp;&nbsp;${l.text}`;
        preLog.appendChild(div);
    }, l.delay);
});

// Show bar after logs
setTimeout(() => {
    preBarW.style.opacity = '1';
    preBarW.style.transition = 'opacity 0.3s';
    let w = 0;
    const iv = setInterval(() => {
        w = Math.min(100, w + 2);
        preBar.style.width = w + '%';
        if (w >= 100) {
            clearInterval(iv);
            setTimeout(finishPreload, 400);
        }
    }, 20);
}, 1400);

/* ============================================================
   TYPING EFFECT
   ============================================================ */
const phrases = [
    'Backend Developer',
    'Java Enthusiast',
    'Linux Nativo',
    'Problem Solver',
    'Autodidacta',
    'Open Source Fan',
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
    const current = phrases[phraseIdx];
    if (!deleting) {
        typedEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
        }
    }
    setTimeout(type, deleting ? 60 : 100);
}

setTimeout(type, 2200);

/* ============================================================
   TERMINAL TYPING IN ABOUT
   ============================================================ */
const tCmd = document.getElementById('terminal-type-cmd');
const tCmds = ['./run_portfolio.sh', 'ls projects/', 'git log --oneline', 'ssh root@localhost'];
let tIdx = 0, tChar = 0, tDel = false;

function typeTerminal() {
    const cur = tCmds[tIdx];
    if (!tDel) {
        tCmd.textContent = cur.substring(0, tChar + 1);
        tChar++;
        if (tChar === cur.length) { tDel = true; setTimeout(typeTerminal, 1600); return; }
    } else {
        tCmd.textContent = cur.substring(0, tChar - 1);
        tChar--;
        if (tChar === 0) { tDel = false; tIdx = (tIdx + 1) % tCmds.length; }
    }
    setTimeout(typeTerminal, tDel ? 50 : 90);
}

setTimeout(typeTerminal, 3500);

/* ============================================================
   NAV SCROLL STATE
   ============================================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ============================================================
   CONTRIBUTION GRAPH (generado proceduralmente)
   ============================================================ */
function generateContributions() {
    const grid = document.getElementById('contrib-grid');
    const seed = 42;
    function rand(n) { return (Math.sin(n * 9301 + 49297) * 233280) % 1; }

    for (let w = 0; w < 52; w++) {
        const week = document.createElement('div');
        week.className = 'contribution-week';
        for (let d = 0; d < 7; d++) {
            const day = document.createElement('div');
            day.className = 'contribution-day';
            const r = rand(w * 7 + d + seed);
            if (r > 0.85) day.classList.add('l4');
            else if (r > 0.7) day.classList.add('l3');
            else if (r > 0.5) day.classList.add('l2');
            else if (r > 0.3) day.classList.add('l1');
            week.appendChild(day);
        }
        grid.appendChild(week);
    }
}
generateContributions();

/* ============================================================
   CONTACT FORM
   ============================================================ */
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Configuración EmailJS
    const serviceID = 'service_1bw55e9';   // Reemplaza con tu Service ID de EmailJS
    const templateID = 'template_raoqd99'; // Reemplaza con tu Template ID de EmailJS

    // Extraer los datos del formulario explícitamente
    const templateParams = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        message: document.getElementById('form-msg').value
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(() => {
            btn.textContent = 'Enviar mensaje →';
            btn.disabled = false;
            feedback.textContent = '✓ Mensaje enviado. Respondo en menos de 24h.';
            feedback.className = 'form-feedback success';
            form.reset();
            setTimeout(() => { feedback.textContent = ''; }, 5000);
        }, (error) => {
            btn.textContent = 'Enviar mensaje →';
            btn.disabled = false;
            feedback.textContent = '✗ Hubo un error al enviar el mensaje.';
            feedback.className = 'form-feedback';
            feedback.style.color = '#ff4757'; // Resalta el error en rojo (mismo rojo de youtube)
            console.error('EmailJS Error:', error);
            setTimeout(() => {
                feedback.textContent = '';
                feedback.style.color = '';
            }, 5000);
        });
});

/* ============================================================
   PARALLAX HERO ORBS
   ============================================================ */
document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    document.querySelector('.hero-orb-1').style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    document.querySelector('.hero-orb-2').style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
});

/* ============================================================
   HERO NAME GLITCH ON HOVER
   ============================================================ */
const heroName = document.querySelector('.hero-name');
let glitchTimeout;

heroName.addEventListener('mouseenter', () => {
    heroName.style.transition = 'filter 0.1s';
    let count = 0;
    const glitch = setInterval(() => {
        heroName.style.filter = count % 2 === 0
            ? 'blur(1px) brightness(1.2)'
            : 'none';
        count++;
        if (count > 5) {
            clearInterval(glitch);
            heroName.style.filter = 'none';
        }
    }, 60);
});