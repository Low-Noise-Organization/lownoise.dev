/**
 * ═══════════════════════════════════════════════════════════════════
 *  HERO BADGE — Motor de física (MEJORADO)
 *  ═══════════════════════════════════════════════════════════════════
 *
 *  Mejoras:
 *  - Uso de Pointer API para unificar mouse/touch/pen
 *  - Reseteo de posición con doble clic / Escape
 *  - Corrección de bug en resize (px,py actualizados)
 *  - transform3d para aceleración GPU
 *  - Throttling del glare con requestAnimationFrame
 *  - Mejor gestión de delta time y visibilidad
 *  - Soporte para tecla Escape cancelando arrastre
 *  ═══════════════════════════════════════════════════════════════════
 */

(function BadgePhysics() {
  'use strict';

  /* ─── PARÁMETROS ────────────────────────────────────────────── */
  const P = {
    gravity: 1400,
    ropeLength: 100,
    ropeStretch: 110,
    ropeElasticity: 22,
    damping: 0.018,
    dragForce: 38,
    rotSmooth: 0.10,
    maxRot: 16,
    idleForce: 12,
    idlePeriod: 5200,
  };

  /* ─── ESTADO (coordenadas de documento) ────────────────────── */
  let px = 0, py = 0;          // centro actual del badge
  let vx = 0, vy = 0;
  let anchorX = 0, anchorY = 0;
  let rotDeg = 0;

  let isDragging = false;
  let cursorX = 0, cursorY = 0;
  let pointerId = null;         // para pointer events

  let rafId = null, lastTime = 0, idleT = 0, hasDragged = false;

  /* ─── DOM ───────────────────────────────────────────────────── */
  let badge, anchor, ropeSvg, ropeStrand1, ropeStrand2, ropeStrand3, glare, hero;

  /* ─── UTILIDADES ────────────────────────────────────────────── */
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const lerp = (a, b, t) => a + (b - a) * (t < 0 ? 0 : t > 1 ? 1 : t);
  const toDoc = (cx, cy) => [cx + window.scrollX, cy + window.scrollY];

  /* ─── INIT ──────────────────────────────────────────────────── */
  function init() {
    badge = document.getElementById('badge');
    anchor = document.getElementById('anchor');
    ropeSvg = document.getElementById('ropeSvg');
    ropeStrand1 = document.getElementById('ropeStrand1');
    ropeStrand2 = document.getElementById('ropeStrand2');
    ropeStrand3 = document.getElementById('ropeStrand3');
    glare = document.getElementById('badgeGlare');
    hero = document.getElementById('hero');

    if (!badge || !anchor) return;

    // Mover al body para coordenadas globales
    document.body.appendChild(ropeSvg);
    document.body.appendChild(badge);

    computeAnchor();
    setInitialPosition();
    bindEvents();

    // Glare con throttling
    if (matchMedia('(hover:hover)').matches) {
      let frame;
      badge.addEventListener('pointermove', (e) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          onGlareMove(e);
          frame = null;
        });
      }, { passive: true });
      badge.addEventListener('pointerleave', onGlareLeave, { passive: true });
    }

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('keydown', onKeyDown, { passive: false });

    lastTime = performance.now();
    rafId = requestAnimationFrame(loop);

    // Generar QR real con GitHub
    function generateQR() {
      const qrContainer = document.getElementById('qrContainer');
      if (!qrContainer) return;

      qrContainer.innerHTML = '';
      const githubUrl = 'https://github.com/Adri-Coding-Dev';

      QRCode.toCanvas(githubUrl, {
        width: 64,          // coincide con el CSS
        margin: 1,          // un pequeño margen para mejorar escaneo
        errorCorrectionLevel: 'H',
        color: { dark: '#000000', light: '#ffffff' }
      }, function (error, canvas) {
        if (error) {
          console.error('Error generando QR:', error);
          qrContainer.textContent = 'GitHub';
          return;
        }
        qrContainer.appendChild(canvas);

        // Opcional: al hacer clic en el QR, abrir GitHub
        canvas.addEventListener('click', () => {
          window.open(githubUrl, '_blank');
        });
        canvas.style.cursor = 'pointer';
      });
    }

    // Llamar a generateQR dentro de init() después de setInitialPosition
    generateQR();
  }

  /* ─── ANCLA: coords de documento ───────────────────────────── */
  function computeAnchor() {
    const r = anchor.getBoundingClientRect();
    anchorX = r.left + r.width / 2 + window.scrollX;
    anchorY = r.top + r.height + window.scrollY;
  }

  /* ─── POSICIÓN INICIAL ──────────────────────────────────────── */
  function setInitialPosition() {
    const bw = badge.offsetWidth;
    const bh = badge.offsetHeight;

    px = anchorX;
    py = anchorY + P.ropeLength;
    vx = 0; vy = 0;

    badge.style.left = (px - bw / 2) + 'px';
    badge.style.top = (py - bh / 2) + 'px';
    badge._baseX = px;
    badge._baseY = py;
  }

  function resetToAnchor() {
    const bh = badge.offsetHeight;
    const targetX = anchorX;
    const targetY = anchorY + P.ropeLength;
    // Animación suave: aplicar impulso hacia el ancla
    vx += (targetX - px) * 0.15;
    vy += (targetY - py) * 0.15;
    vx *= 0.8; vy *= 0.8; // amortiguar
  }

  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      computeAnchor();
      const bw = badge.offsetWidth, bh = badge.offsetHeight;

      // Actualizar base y posición absoluta
      badge._baseX = anchorX;
      badge._baseY = anchorY + P.ropeLength;
      badge.style.left = (anchorX - bw / 2) + 'px';
      badge.style.top = (anchorY + P.ropeLength - bh / 2) + 'px';

      // CORRECCIÓN: actualizar px,py al nuevo centro
      px = anchorX;
      py = anchorY + P.ropeLength;

      vx *= 0.2; vy *= 0.2;
    }, 100);
  }

  /* ─── EVENTOS ───────────────────────────────────────────────── */
  function bindEvents() {
    // Usar Pointer API
    badge.addEventListener('pointerdown', onPointerDown, { passive: false });
    document.addEventListener('pointermove', onPointerMove, { passive: false });
    document.addEventListener('pointerup', onPointerUp, { passive: true });
    document.addEventListener('pointercancel', onPointerUp, { passive: true });
    badge.addEventListener('dragstart', e => e.preventDefault());
    badge.addEventListener('dblclick', resetToAnchor);
  }

  function onPointerDown(e) {
    if (!e.isPrimary) return; // solo el primer punto
    e.preventDefault();
    badge.setPointerCapture(e.pointerId);
    pointerId = e.pointerId;
    const [x, y] = toDoc(e.clientX, e.clientY);
    startDrag(x, y);
  }

  function onPointerMove(e) {
    if (!isDragging || e.pointerId !== pointerId) return;
    e.preventDefault();
    [cursorX, cursorY] = toDoc(e.clientX, e.clientY);
  }

  function onPointerUp(e) {
    if (e.pointerId !== pointerId) return;
    badge.releasePointerCapture(e.pointerId);
    pointerId = null;
    if (isDragging) endDrag();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape' && isDragging) {
      e.preventDefault();
      endDrag();
      resetToAnchor();
    }
  }

  function startDrag(x, y) {
    isDragging = true;
    cursorX = x; cursorY = y;
    hero.classList.add('dragging');
    if (!hasDragged) { hasDragged = true; hero.classList.add('has-dragged'); }
  }

  function endDrag() {
    isDragging = false;
    hero.classList.remove('dragging');
  }

  /* ─── LOOP ──────────────────────────────────────────────────── */
  function loop(now) {
    rafId = requestAnimationFrame(loop);
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    computeAnchor(); // recalcular cada frame → sigue el scroll
    step(dt);
    render();
  }

  /* ─── FÍSICA ────────────────────────────────────────────────── */
  function step(dt) {
    let ax = 0, ay = P.gravity;

    if (isDragging) {
      ax += (cursorX - px) * P.dragForce;
      ay += (cursorY - py) * P.dragForce;
    } else {
      idleT += dt;
      if (Math.sqrt(vx * vx + vy * vy) < 30) {
        ax += Math.sin((idleT * 1000 / P.idlePeriod) * Math.PI * 2) * P.idleForce;
      }
    }

    /* Tensión de la cuerda — desde la parte superior del badge */
    const bh = badge.offsetHeight;
    const topX = px;
    const topY = py - bh / 2;
    const cdx = topX - anchorX;
    const cdy = topY - anchorY;
    const dist = Math.sqrt(cdx * cdx + cdy * cdy);
    if (dist > P.ropeLength) {
      const ux = cdx / dist, uy = cdy / dist;
      const excess = dist - P.ropeLength;
      const t = Math.min(excess / P.ropeStretch, 1);
      const tension = P.ropeElasticity * excess * (1 + t * 3);
      ax -= ux * tension;
      ay -= uy * tension;
    }

    /* Integración */
    vx += ax * dt; vy += ay * dt;
    let nx = px + vx * dt, ny = py + vy * dt;

    /* Tope duro */
    const ntopX = nx;
    const ntopY = ny - bh / 2;
    const ndx = ntopX - anchorX, ndy = ntopY - anchorY;
    const nd = Math.sqrt(ndx * ndx + ndy * ndy);
    const max = P.ropeLength + P.ropeStretch;
    if (nd > max) {
      const ux = ndx / nd, uy = ndy / nd;
      nx = anchorX + ux * max;
      ny = anchorY + uy * max + bh / 2;
      const vr = vx * ux + vy * uy;
      if (vr > 0) { vx -= vr * ux; vy -= vr * uy; }
    }

    /* Amortiguación */
    const d = Math.pow(1 - P.damping, dt * 60);
    vx *= d; vy *= d;
    px = nx; py = ny;

    const tgt = clamp(vx * 0.055, -P.maxRot, P.maxRot);
    rotDeg += (tgt - rotDeg) * clamp(P.rotSmooth * dt * 60, 0, 1);
  }

  /* ─── RENDER ────────────────────────────────────────────────── */
  function render() {
    if (!badge._baseX) return;

    const dx = px - badge._baseX;
    const dy = py - badge._baseY;

    badge.style.transform =
      `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) rotate(${rotDeg.toFixed(3)}deg)`;

    /* Cuerda */
    const badgeHalfH = badge.offsetHeight / 2;
    const ropeEndX = px;
    const ropeEndY = py - badgeHalfH;
    setLine(ropeStrand1, anchorX, anchorY, ropeEndX, ropeEndY);

    const len = Math.max(Math.hypot(ropeEndX - anchorX, ropeEndY - anchorY), 0.001);
    const perpX = -(ropeEndY - anchorY) / len;
    const perpY = (ropeEndX - anchorX) / len;
    const off = 2.5;
    setLine(ropeStrand2,
      anchorX + perpX * off, anchorY + perpY * off,
      ropeEndX + perpX * off, ropeEndY + perpY * off);
    setLine(ropeStrand3,
      anchorX - perpX * off, anchorY - perpY * off,
      ropeEndX - perpX * off, ropeEndY - perpY * off);

    /* Sombra dinámica */
    const dist = Math.abs(px - anchorX);
    const drop = py - anchorY;
    const maxL = P.ropeLength + P.ropeStretch;
    const t = clamp(drop / maxL, 0, 1);
    const tilt = clamp(dist / 120, 0, 1);
    badge.style.boxShadow = [
      `${clamp((px - anchorX) * 0.1, -18, 18).toFixed(1)}px` +
      ` ${lerp(6, 24, t).toFixed(1)}px ${lerp(18, 48, t).toFixed(1)}px` +
      ` rgba(0,0,0,${lerp(.45, .78, Math.max(t, tilt)).toFixed(2)})`,
      '0 2px 5px rgba(0,0,0,.3)',
      `0 0 0 1px rgba(255,255,255,${(0.04 + tilt * 0.05).toFixed(3)})`,
    ].join(',');
  }

  function setLine(el, x1, y1, x2, y2) {
    el.setAttribute('x1', x1.toFixed(2));
    el.setAttribute('y1', y1.toFixed(2));
    el.setAttribute('x2', x2.toFixed(2));
    el.setAttribute('y2', y2.toFixed(2));
  }

  /* ─── GLARE ─────────────────────────────────────────────────── */
  function onGlareMove(e) {
    if (!glare) return;
    const r = badge.getBoundingClientRect();
    const gx = ((1 - (e.clientX - r.left) / r.width) * 100).toFixed(1);
    const gy = ((1 - (e.clientY - r.top) / r.height) * 100).toFixed(1);
    glare.style.background =
      `radial-gradient(circle at ${gx}% ${gy}%,` +
      `rgba(255,255,255,.09) 0%,rgba(255,255,255,.03) 40%,transparent 65%)`;
  }
  function onGlareLeave() { if (glare) glare.style.background = ''; }

  /* ─── VISIBILIDAD ───────────────────────────────────────────── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else {
      lastTime = performance.now();
      vx *= 0.3; vy *= 0.3;
      rafId = requestAnimationFrame(loop);
    }
  });

  /* ─── A11Y ──────────────────────────────────────────────────── */
  function applyA11y() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      P.damping = 0.08;
      P.idleForce = 0;
      P.dragForce = 60;
    }
  }

  /* ─── BOOTSTRAP ─────────────────────────────────────────────── */
  function bootstrap() { applyA11y(); init(); }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', bootstrap);
  else bootstrap();

  window.HeroBadge = {
    impulse(ix, iy) { vx += ix || 0; vy += iy || 0; },
    getState() { return { px, py, vx, vy, isDragging }; },
    reset: resetToAnchor,
  };

})();