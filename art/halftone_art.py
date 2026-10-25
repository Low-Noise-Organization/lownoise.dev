#!/usr/bin/env python3
"""Arte propio de Low Noise: formas esculpidas (campos de distancia) -> media tinta a 45° en una sola tinta clara sobre transparente.

Técnica: trama de puntos a 45° con bordes duros (luces = puntos, sombras = vacío), un único color de tinta y un plano de fondo
geométrico plano al ~16 %. Todo el contenido (escenas, formas, composición) es original y se genera con este script.
Uso: python3 art/halftone_art.py [nombre ...]   (sin argumentos genera todo en public/art/)
"""
import sys, os
import numpy as np
from PIL import Image
from multiprocessing import Pool

INK = (211, 215, 207)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "art")

# ---------- primitivas (p: (...,3)) ----------
def nrm(v): return np.linalg.norm(v, axis=-1)
def sphere(p, r): return nrm(p) - r
def box(p, b):
    q = np.abs(p) - np.array(b, np.float32)
    return nrm(np.maximum(q, 0)) + np.minimum(q.max(-1), 0)
def rbox(p, b, r): return box(p, np.array(b, np.float32) - r) - r
def cyl(p, h, r):  # eje Y
    d = np.stack([np.hypot(p[..., 0], p[..., 2]) - r, np.abs(p[..., 1]) - h], -1)
    return np.minimum(d.max(-1), 0) + nrm(np.maximum(d, 0))
def cylz(p, h, r): return cyl(p[..., [0, 2, 1]], h, r)  # eje Z
def capsule(p, a, b, r):
    a = np.array(a, np.float32); b = np.array(b, np.float32); pa = p - a; ba = b - a
    h = np.clip((pa @ ba) / (ba @ ba), 0, 1)[..., None]
    return nrm(pa - ba * h) - r
def torus(p, R, r):  # en plano XZ
    q = np.stack([np.hypot(p[..., 0], p[..., 2]) - R, p[..., 1]], -1); return nrm(q) - r
def torusz(p, R, r): return torus(p[..., [0, 2, 1]], R, r)  # en plano XY
def cone(p, h, r):  # eje Y, punta arriba, base en y=-h
    k = np.clip((p[..., 1] + h) / (2 * h), 0, 1); rad = r * (1 - k)
    d = np.stack([np.hypot(p[..., 0], p[..., 2]) - rad, np.abs(p[..., 1]) - h], -1)
    return np.minimum(d.max(-1), 0) + nrm(np.maximum(d, 0))
def T(p, x=0, y=0, z=0): return p - np.stack(np.broadcast_arrays(np.float32(x), np.float32(y), np.float32(z)), -1)
def rz(p, a):
    c, s = np.cos(a), np.sin(a); x, y = p[..., 0], p[..., 1]
    return np.stack([c * x + s * y, -s * x + c * y, p[..., 2]], -1)
def rx(p, a):
    c, s = np.cos(a), np.sin(a); y, z = p[..., 1], p[..., 2]
    return np.stack([p[..., 0], c * y + s * z, -s * y + c * z], -1)
def ry(p, a):
    c, s = np.cos(a), np.sin(a); x, z = p[..., 0], p[..., 2]
    return np.stack([c * x + s * z, p[..., 1], -s * x + c * z], -1)
def U(*ds):
    out = ds[0]
    for d in ds[1:]: out = np.minimum(out, d)
    return out
def SU(a, b, k=0.12):
    h = np.clip(0.5 + 0.5 * (b - a) / k, 0, 1); return b * (1 - h) + a * h - k * h * (1 - h)
def SUB(a, b): return np.maximum(a, -b)

# ---------- escenas ----------
def panel(p, w=0.95, h=0.6, prompt=True):
    base = rbox(p, (w, h, 0.05), 0.03)
    bar = SUB(base, box(T(p, 0, h - 0.13, 0.05), (w - 0.06, 0.012, 0.03)))
    if not prompt: return bar
    chev = U(capsule(p, (-w + .24, .13, -.05), (-w + .42, 0, -.05), .042), capsule(p, (-w + .42, 0, -.05), (-w + .24, -.13, -.05), .042))
    line = capsule(p, (-w + .56, -.13, -.05), (-w + .9, -.13, -.05), .042)
    return U(bar, chev, line)

def S_tuios(p):  # tres ventanas en cascada sobre una base
    back = panel(T(p, -0.55, 0.55, 0.45), 1.05, 0.7, prompt=False)
    mid = panel(T(p, 0.2, 0.05, 0.05), 1.05, 0.7, prompt=False)
    front = panel(T(p, 0.85, -0.5, -0.4), 0.95, 0.6)
    return U(back, mid, front, rbox(T(p, 0.1, -1.35, 0.1), (2.2, 0.06, 1.0), 0.03))

# onda de audio que se aplana: "less noise"
_BARS = (2.3, 1.5, 2.7, 1.2, 2.1, 0.95, 1.6, 0.8, 1.05, 0.55, 0.65, 0.4, 0.32, 0.26, 0.22, 0.2, 0.2)
def S_hero(p):
    bars = U(*[rbox(T(p, -3.2 + i * 0.4, 0.15, 0), (0.12, h / 2, 0.2), 0.11) for i, h in enumerate(_BARS)])
    return U(bars, panel(T(p, 1.9, -1.05, -0.8), 1.05, 0.66))

def S_nsharp(p):  # monolito con la "#" en relieve
    mono = rbox(T(p, 0, 0.0, 0.1), (0.95, 1.45, 0.38), 0.05)
    hsh = U(capsule(p, (-0.62, 0.35, -0.3), (0.62, 0.35, -0.3), 0.09), capsule(p, (-0.62, -0.35, -0.3), (0.62, -0.35, -0.3), 0.09),
            capsule(p, (-0.2, 0.8, -0.3), (-0.34, -0.8, -0.3), 0.09), capsule(p, (0.34, 0.8, -0.3), (0.2, -0.8, -0.3), 0.09))
    return U(mono, hsh, rbox(T(p, 0, -1.55, 0.1), (1.35, 0.07, 0.7), 0.03))

def S_vega(p):
    q = rx(p, 0.35)
    ring = torus(q, 1.55, 0.07)
    ring2 = torus(q, 1.8, 0.04)
    planet = sphere(p, 0.95) + 0.012 * np.sin(p[..., 1] * 24)
    stars = U(sphere(T(p, -1.9, 1.2, -0.3), 0.14), sphere(T(p, 1.8, -1.1, 0.3), 0.1), sphere(T(p, 2.1, 1.1, 0.2), 0.07), sphere(T(p, -1.5, -1.3, 0.4), 0.09))
    return U(planet, ring, ring2, stars)

def S_voxen(p):
    d = None
    for i, (dx, dy) in enumerate(((-0.55, -1.2), (0.35, -1.2), (-0.15, -0.5), (0.7, -0.5), (-0.4, 0.2))):
        q = T(p, dx, dy, 0)
        c = rbox(q, (0.85, 0.3, 0.42), 0.03)
        c = c + 0.012 * np.sin(q[..., 0] * 30)
        d = c if d is None else np.minimum(d, c)
    return U(d, rbox(T(p, 0, -1.62, 0), (1.9, 0.05, 0.6), 0.02))

def S_systui(p):
    hs = (0.7, 1.4, 0.9, 1.9, 1.2, 2.3, 1.6, 1.0, 1.7)
    bars = U(*[rbox(T(p, -1.7 + i * 0.425, -1.0 + h / 2 - .1, 0), (0.17, h / 2, 0.3), 0.025) for i, h in enumerate(hs)])
    base = rbox(T(p, 0, -1.15, 0), (2.2, 0.06, 0.5), 0.02)
    return U(bars, base)

def S_filetui(p):
    out = []
    for x, w, z in ((-1.2, 0.55, 0.0), (0.0, 0.65, -0.18), (1.25, 0.55, 0.0)):
        pn = rbox(T(p, x, 0, z), (w, 1.35, 0.1), 0.03)
        rows = U(*[capsule(p, (x - w + .18, 0.75 - i * .32, z - .1), (x + w - .2 - (i % 2) * .22, 0.75 - i * .32, z - .1), 0.03) for i in range(5)])
        out += [pn, rows]
    return U(*out)

def S_prompt(p):
    ch = U(capsule(p, (-1.4, 0.8, -0.2), (-0.35, 0, -0.2), 0.16), capsule(p, (-0.35, 0, -0.2), (-1.4, -0.8, -0.2), 0.16))
    us = capsule(p, (0.1, -0.8, -0.2), (1.35, -0.8, -0.2), 0.16)
    cur = rbox(T(p, 1.7, 0.05, -0.2), (0.14, 0.7, 0.14), 0.03)
    return U(ch, us, cur, rbox(T(p, 0.1, -1.3, 0), (2.1, 0.06, 0.6), 0.02))

def S_contact(p):
    env = rbox(p, (1.35, 0.85, 0.09), 0.04)
    flap = U(rbox(T(rz(T(p, -0.62, 0.42, -0.1), -0.6), 0, 0, 0), (0.78, 0.045, 0.045), 0.02), rbox(T(rz(T(p, 0.62, 0.42, -0.1), 0.6), 0, 0, 0), (0.78, 0.045, 0.045), 0.02))
    bub = U(sphere(T(p, -0.4, -0.05, -0.12), .1), sphere(T(p, 0, -0.05, -0.12), .1), sphere(T(p, 0.4, -0.05, -0.12), .1))
    sat = U(sphere(T(p, 1.9, 1.0, 0), .1), sphere(T(p, -1.9, -1.0, 0), .12), sphere(T(p, 1.7, -1.2, 0), .08))
    return U(env, flap, bub, sat)

def S_transit(p):
    q = ry(p, -0.25)
    body = rbox(q, (1.25, 0.5, 0.5), 0.12)
    wins = U(*[rbox(T(q, -0.85 + i * 0.5, 0.15, -0.5), (0.2, 0.16, 0.04), 0.03) for i in range(5)])
    body = SUB(body, wins)
    wheels = U(cylz(T(q, -0.75, -0.5, -0.42), 0.09, 0.24), cylz(T(q, 0.75, -0.5, -0.42), 0.09, 0.24), cylz(T(q, -0.75, -0.5, 0.42), 0.09, 0.24), cylz(T(q, 0.75, -0.5, 0.42), 0.09, 0.24))
    pole = U(capsule(p, (1.9, -1.0, 0.0), (1.9, 0.9, 0.0), 0.05), cylz(T(p, 1.9, 0.95, 0), 0.04, 0.3))
    return U(body, wheels, pole, rbox(T(p, 0, -0.85, 0), (2.4, 0.04, 0.7), 0.02))

def S_drop(p):
    ph = rbox(T(rz(p, 0.18), -0.9, 0.05, 0), (0.52, 1.0, 0.07), 0.07)
    ph = SUB(ph, rbox(T(rz(p, 0.18), -0.9, 0.05, -0.07), (0.44, 0.88, 0.03), 0.04))
    arrow = U(capsule(p, (0.9, 0.7, 0), (0.9, -0.5, 0), 0.12), cone(rx(T(p, 0.9, -0.8, 0), np.pi), 0.34, 0.36))
    tray = rbox(T(p, 0.9, -1.15, 0), (0.9, 0.06, 0.4), 0.03)
    return U(ph, arrow, tray)

def S_music(p):
    q = rx(p, 0.9)
    disc = cyl(q, 0.04, 1.25)
    disc = SUB(disc, cyl(T(q, 0, 0, 0), 0.2, 0.09)) + 0.01 * np.sin(np.hypot(q[..., 0], q[..., 2]) * 55) * (np.abs(q[..., 1]) < 0.05)
    label = cyl(T(q, 0, 0.05, 0), 0.03, 0.42)
    arm = U(capsule(p, (1.6, 0.4, -0.2), (0.55, 0.15, -0.5), 0.045), sphere(T(p, 1.65, 0.45, -0.2), 0.14))
    return U(disc, label, arm)

def S_key(p):
    q = rz(p, -0.55)
    ring = torusz(T(q, -0.95, 0, 0), 0.5, 0.14)
    shaft = capsule(q, (-0.4, 0, 0), (1.5, 0, 0), 0.1)
    teeth = U(rbox(T(q, 1.2, -0.22, 0), (0.1, 0.2, 0.1), 0.02), rbox(T(q, 0.85, -0.18, 0), (0.1, 0.16, 0.1), 0.02), rbox(T(q, 1.45, -0.18, 0), (0.1, 0.16, 0.1), 0.02))
    return U(ring, shaft, teeth)

def S_chat(p):
    b1 = rbox(T(p, -0.55, 0.45, 0), (1.15, 0.6, 0.12), 0.1)
    t1 = cone(rx(rz(T(p, -1.1, -0.25, 0), 0.5), np.pi), 0.22, 0.28)
    b2 = rbox(T(p, 0.7, -0.7, -0.15), (0.95, 0.5, 0.1), 0.1)
    t2 = cone(rx(rz(T(p, 1.2, -1.25, -0.15), -0.5), np.pi), 0.2, 0.25)
    dots = U(sphere(T(p, -0.9, 0.45, -0.14), 0.09), sphere(T(p, -0.55, 0.45, -0.14), 0.09), sphere(T(p, -0.2, 0.45, -0.14), 0.09))
    return U(b1, t1, b2, t2, dots)

def S_notes(p):
    q = rz(p, 0.12)
    nb = rbox(q, (1.0, 1.35, 0.14), 0.05)
    lines = U(*[capsule(q, (-0.65, 0.7 - i * 0.28, -0.14), (0.7 - (i % 3) * 0.2, 0.7 - i * 0.28, -0.14), 0.025) for i in range(6)])
    rings = U(*[torus(rx(T(q, -1.02, 1.05 - i * 0.37, 0), np.pi / 2), 0.1, 0.03) for i in range(7)])
    pen = U(capsule(p, (0.9, -1.4, -0.3), (1.85, 0.5, -0.3), 0.09), cone(rz(T(p, 0.82, -1.58, -0.3), 0.46), 0.15, 0.09))
    return U(nb, lines, rings, pen)

def S_rook(p):
    body = U(cyl(T(p, 0, -1.2, 0), 0.12, 0.85), SU(cyl(T(p, 0, -0.3, 0), 0.85, 0.52), cyl(T(p, 0, 0.7, 0), 0.12, 0.7), 0.1))
    top = cyl(T(p, 0, 1.0, 0), 0.25, 0.7)
    top = SUB(top, cyl(T(p, 0, 1.18, 0), 0.2, 0.5))
    for a in (0, np.pi / 2):
        top = SUB(top, box(T(ry(p, a), 0, 1.2, 0), (0.95, 0.2, 0.12)))
    return U(body, top)

def S_king(p):
    body = U(cyl(T(p, 0, -1.25, 0), 0.1, 0.8), SU(cyl(T(p, 0, -0.4, 0), 0.8, 0.46), cyl(T(p, 0, 0.5, 0), 0.08, 0.62), 0.1), SU(sphere(T(p, 0, 0.95, 0), 0.42), cyl(T(p, 0, 0.62, 0), 0.06, 0.4), 0.1))
    cross = U(rbox(T(p, 0, 1.55, 0), (0.07, 0.3, 0.07), 0.02), rbox(T(p, 0, 1.58, 0), (0.22, 0.07, 0.07), 0.02))
    return U(body, cross)

def S_joystick(p):
    base = rbox(T(p, 0, -0.95, 0), (1.5, 0.28, 0.95), 0.1)
    stick = U(capsule(p, (-0.5, -0.65, 0.05), (-0.5, 0.35, 0.05), 0.09), sphere(T(p, -0.5, 0.6, 0.05), 0.34))
    btn = U(cyl(T(p, 0.45, -0.62, 0.35), 0.06, 0.22), cyl(T(p, 1.0, -0.62, 0.0), 0.06, 0.22), cyl(T(p, 0.55, -0.62, -0.38), 0.06, 0.2))
    return U(base, stick, btn)

def S_anvil(p):
    top = rbox(T(p, 0, 0.3, 0), (1.3, 0.28, 0.48), 0.06)
    horn = cone(rz(T(p, 1.75, 0.3, 0), -np.pi / 2), 0.55, 0.28)
    waist = rbox(T(p, 0, -0.35, 0), (0.55, 0.45, 0.38), 0.05)
    base = rbox(T(p, 0, -0.98, 0), (0.95, 0.18, 0.55), 0.05)
    spark = U(sphere(T(p, -0.6, 1.0, 0.1), 0.06), sphere(T(p, 0.1, 1.4, -0.1), 0.05), sphere(T(p, 0.7, 1.0, 0.2), 0.045))
    return U(top, horn, waist, base, spark)

def S_cup(p):
    cup = cyl(T(p, 0, 0, 0), 0.62, 0.78) + 0.0
    cup = SUB(cup, cyl(T(p, 0, 0.22, 0), 0.5, 0.64))
    handle = SUB(torusz(T(p, 0.82, 0.05, 0), 0.34, 0.09), box(T(p, 0.5, 0, 0), (0.4, 1, 1)))
    saucer = SUB(cyl(T(p, 0, -0.72, 0), 0.05, 1.25), cyl(T(p, 0, -0.62, 0), 0.04, 0.9))
    steam = U(*[capsule(p, (-0.2 + i * 0.25, 0.95, 0), (-0.1 + i * 0.25, 1.5, 0), 0.05) for i in range(3)])
    return U(cup, handle, saucer, steam)

def S_dumbbell(p):
    q = rz(p, 0.4)
    bar = capsule(q, (-1.6, 0, 0), (1.6, 0, 0), 0.085)
    plates = U(*[cylz(T(rz(q, 0), x, 0, 0).take([1, 0, 2], axis=-1)[..., [1, 0, 2]], 0.06, r) if False else cyl(T(rz(q, np.pi / 2), 0, -x, 0), 0.07, r) for x, r in ((-1.15, 0.75), (-0.92, 0.6), (1.15, 0.75), (0.92, 0.6))])
    return U(bar, plates)

SCENES = {  # nombre: (función, yaw, pitch, escala px/unidad, centro (x,y) en unidades, sol (cx,cy,r) en fracción del lienzo)
    "hero": (S_hero, -0.32, 0.1, 285, (0.3, 0.05), (0.62, 0.42, 0.34)),
    "tui-os": (S_tuios, -0.45, 0.14, 215, (0.0, 0.0), (0.55, 0.45, 0.3)),
    "n-sharp": (S_nsharp, -0.5, 0.14, 215, (0.0, 0.0), (0.5, 0.45, 0.3)),
    "vega-os": (S_vega, -0.2, 0.1, 190, (0.0, 0.0), (0.52, 0.5, 0.3)),
    "voxen": (S_voxen, -0.55, 0.2, 235, (0.0, 0.1), (0.5, 0.4, 0.3)),
    "systui": (S_systui, -0.5, 0.22, 240, (0.0, -0.1), (0.52, 0.42, 0.3)),
    "filetui": (S_filetui, -0.45, 0.12, 215, (0.0, 0.0), (0.5, 0.45, 0.3)),
    "prompt": (S_prompt, -0.4, 0.1, 235, (0.0, 0.0), (0.48, 0.5, 0.3)),
    "contact-suite": (S_contact, -0.4, 0.18, 235, (0.0, 0.0), (0.5, 0.45, 0.3)),
    "transit": (S_transit, -0.4, 0.14, 205, (0.1, 0.0), (0.45, 0.4, 0.3)),
    "androiddrop": (S_drop, -0.35, 0.1, 230, (0.0, -0.1), (0.5, 0.45, 0.3)),
    "music-player": (S_music, -0.3, 0.1, 235, (0.0, 0.0), (0.45, 0.45, 0.3)),
    "cipherkey": (S_key, -0.3, 0.1, 240, (0.0, -0.1), (0.5, 0.45, 0.3)),
    "pchat": (S_chat, -0.3, 0.08, 235, (0.0, 0.0), (0.5, 0.45, 0.3)),
    "misnotas": (S_notes, -0.4, 0.1, 225, (0.1, 0.0), (0.5, 0.45, 0.3)),
    "chess-tui": (S_rook, -0.5, 0.14, 230, (0.0, 0.0), (0.5, 0.45, 0.3)),
    "master-chess": (S_king, -0.5, 0.14, 215, (0.0, 0.2), (0.5, 0.45, 0.3)),
    "retrotui": (S_joystick, -0.5, 0.22, 235, (0.0, 0.0), (0.5, 0.5, 0.3)),
    "hollowforge": (S_anvil, -0.45, 0.14, 205, (0.2, 0.0), (0.5, 0.45, 0.3)),
    "de-0-a-java": (S_cup, -0.3, 0.2, 245, (0.0, 0.0), (0.5, 0.45, 0.3)),
    "exercism": (S_dumbbell, -0.3, 0.1, 235, (0.0, 0.0), (0.5, 0.45, 0.3)),
}

# ---------- render ----------
def opening(m):
    e = m & np.roll(m, 1, 0) & np.roll(m, -1, 0) & np.roll(m, 1, 1) & np.roll(m, -1, 1)
    d = e | np.roll(e, 1, 0) | np.roll(e, -1, 0) | np.roll(e, 1, 1) | np.roll(e, -1, 1)
    return d & m

def halftone(lum, cell=6.0, angle=45.0, gamma=1.5, contrast=1.25):
    h, w = lum.shape
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    a = np.deg2rad(angle)
    u = (x * np.cos(a) + y * np.sin(a)) * (2 * np.pi / cell); v = (-x * np.sin(a) + y * np.cos(a)) * (2 * np.pi / cell)
    screen = (np.cos(u) + np.cos(v)) / 2
    l = np.clip((lum ** gamma - 0.5) * contrast + 0.5, 0, 1)
    return (l * 2 - 1) > screen

def render(name, W=960, H=720, cell=6.0):
    fn, yaw, pitch, scale, (cx, cy), (sx, sy, sr) = SCENES[name]
    scale = scale * W / (1600 if name == 'hero' else 960)   # las escalas están pensadas para el tamaño final
    ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
    X = (xs - W / 2) / scale + cx; Y = -(ys - H / 2) / scale + cy
    # rayos ortográficos hacia +Z; la escena se gira con yaw/pitch
    R = lambda p: rx(ry(p, yaw), pitch)
    t = np.full(X.shape, -6.0, np.float32); hit = np.zeros(X.shape, bool); active = np.ones(X.shape, bool)
    org = np.stack([X, Y, np.zeros_like(X)], -1)
    def sdf(P): return fn(R(P))
    for _ in range(90):
        idx = np.nonzero(active)
        if idx[0].size == 0: break
        P = org[idx] + np.stack([np.zeros_like(t[idx]), np.zeros_like(t[idx]), t[idx]], -1)
        d = sdf(P)
        h = d < 0.002; hit[idx[0][h], idx[1][h]] = True
        far = t[idx] > 6.0
        stop = h | far; active[idx[0][stop], idx[1][stop]] = False
        t[idx] += np.where(stop, 0, d * 0.95)
    hit = opening(hit)
    lum = np.zeros(X.shape, np.float32)
    idx = np.nonzero(hit)
    if idx[0].size:
        P = org[idx] + np.stack([np.zeros_like(t[idx]), np.zeros_like(t[idx]), t[idx]], -1); e = 0.004
        n = np.stack([sdf(P + [e, 0, 0]) - sdf(P - [e, 0, 0]), sdf(P + [0, e, 0]) - sdf(P - [0, e, 0]), sdf(P + [0, 0, e]) - sdf(P - [0, 0, e])], -1)
        n = n / (np.linalg.norm(n, axis=-1, keepdims=True) + 1e-8)
        L = np.array([-0.72, 0.62, -0.32], np.float32); L /= np.linalg.norm(L)
        # n está en el espacio de la escena rotada; llevar la luz al mismo espacio
        Lr = rx(ry(L[None, :], -yaw), 0)[0] if False else L
        nv = np.stack([n[:, 0], n[:, 1], n[:, 2]], -1)
        # normal de pantalla: deshacer la rotación de la escena
        def unrot(v): return ry(rx(v, -pitch), -yaw)
        ns = unrot(nv)
        diff = np.clip(ns @ L, 0, 1)
        ao = np.ones(len(P), np.float32)
        for k, s in enumerate((0.05, 0.12, 0.25)):
            ao -= np.clip(s - sdf(P + nv * s), 0, None) * (0.6 / (k + 1))
        rim = np.clip(1 - np.abs(ns[:, 2]), 0, 1) * 0.12
        lum[idx] = np.clip((0.10 + 0.78 * diff ** 1.15) * np.clip(ao, 0.25, 1) + rim, 0, 1)
    mask = halftone(lum, cell) & hit
    q = np.stack([np.abs(xs - sx * W), np.abs(ys - sy * H)], -1) - (sr * H * 0.82)
    sun = (np.linalg.norm(np.maximum(q, 0), axis=-1) + np.minimum(q.max(-1), 0) - sr * H * 0.18) < 0   # cuadrado redondeado plano
    out = np.zeros((H, W, 4), np.uint8)
    out[sun & ~hit] = (*INK, 41)
    out[mask] = (*INK, 255)
    return Image.fromarray(out, "RGBA")

def job(args):
    name, W, H, cell = args
    im = render(name, W, H, cell); os.makedirs(OUT, exist_ok=True)
    f = os.path.join(OUT, f"{name}.png"); im.save(f, optimize=True); return f

if __name__ == "__main__":
    names = sys.argv[1:] or list(SCENES)
    jobs = [(n, 1600, 900, 7.0) if n == "hero" else (n, 960, 720, 6.0) for n in names]
    with Pool(min(6, len(jobs))) as p:
        for f in p.imap_unordered(job, jobs): print("ok", os.path.basename(f))
