#!/usr/bin/env python3
"""Draws the project images as vector art (public/art/<slug>.svg) and the Low Noise mark.

One shared system: black 4:3 plate, a faint dot grid, viewfinder corner marks and one geometric emblem in
white and two greys. Everything is plain SVG (a few KB each, crisp at any size), no raster and no AI.

    python3 art/make_icons.py            # rewrites public/art/*.svg
    python3 art/make_icons.py --sheet    # also writes a contact sheet to /tmp for a quick look (needs ImageMagick)
"""
import math
import sys
from pathlib import Path

W, H = 1200, 900
WHITE, G1, G2, G3 = "#ffffff", "#8d8d8d", "#2a2a2a", "#141414"
SW = 6  # base stroke


# ---------- tiny SVG helpers (emblem coordinates are centred on 0,0) ----------
def a(**k):
    return "".join(f' {key.replace("_", "-")}="{v}"' for key, v in k.items())


def rect(x, y, w, h, r=0, fill="none", stroke=WHITE, sw=SW, **k):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}"' + (f' rx="{r}"' if r else "") + a(fill=fill, stroke=stroke if stroke else "none", stroke_width=sw, **k) + "/>"


def line(x1, y1, x2, y2, sw=SW, stroke=WHITE, cap="butt", **k):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}"' + a(stroke=stroke, stroke_width=sw, stroke_linecap=cap, **k) + "/>"


def circle(cx, cy, r, fill="none", stroke=WHITE, sw=SW, **k):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}"' + a(fill=fill, stroke=stroke if stroke else "none", stroke_width=sw, **k) + "/>"


def path(d, fill="none", stroke=WHITE, sw=SW, join="miter", cap="butt", **k):
    return f'<path d="{d}"' + a(fill=fill, stroke=stroke if stroke else "none", stroke_width=sw, stroke_linejoin=join, stroke_linecap=cap, **k) + "/>"


def poly(points, fill="none", stroke=WHITE, sw=SW, **k):
    return f'<polygon points="{" ".join(f"{x},{y}" for x, y in points)}"' + a(fill=fill, stroke=stroke if stroke else "none", stroke_width=sw, stroke_linejoin="miter", **k) + "/>"


def ellipse(cx, cy, rx, ry, rot=0, fill="none", stroke=WHITE, sw=SW, **k):
    t = f' transform="rotate({rot} {cx} {cy})"' if rot else ""
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"{t}' + a(fill=fill, stroke=stroke if stroke else "none", stroke_width=sw, **k) + "/>"


def plate(slug: str, body: str) -> str:
    ticks = ""
    m, L = 44, 34
    for sx, sy in ((1, 1), (-1, 1), (1, -1), (-1, -1)):
        x, y = (m if sx > 0 else W - m), (m if sy > 0 else H - m)
        ticks += f'<path d="M{x} {y + sy * L} V{y} H{x + sx * L}" fill="none" stroke="#fff" stroke-opacity="0.45" stroke-width="3"/>'
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="{slug}">'
        '<defs><pattern id="d" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.6" fill="#fff" fill-opacity="0.2"/></pattern>'
        '<radialGradient id="v" cx="50%" cy="46%" r="60%"><stop offset="0" stop-color="#1d1d1d"/><stop offset="0.7" stop-color="#000"/></radialGradient></defs>'
        f'<rect width="{W}" height="{H}" fill="#000"/><rect width="{W}" height="{H}" fill="url(#v)"/><rect width="{W}" height="{H}" fill="url(#d)"/>{ticks}'
        f'<g transform="translate({W // 2} {H // 2 + 6}) scale(1.4)">{body}</g></svg>\n'
    )


# ---------- emblems ----------
def window(x, y, w, h, lines=0, hl=False):
    s = rect(x, y, w, h, 10, fill="#000")
    s += line(x, y + 40, x + w, y + 40, sw=4)
    for i in range(3):
        s += circle(x + 24 + i * 22, y + 20, 5, fill=WHITE, stroke=None)
    for i in range(lines):
        s += line(x + 26, y + 72 + i * 30, x + 26 + (w - 90) * (0.9 if i % 2 == 0 else 0.55), y + 72 + i * 30, sw=6, stroke=WHITE if not (hl and i == 1) else G1)
    if hl:
        s += rect(x + 22, y + 118, 34, 20, 0, fill=WHITE, stroke=None)
    return s


def tui_os():
    s = window(-215, -165, 300, 210)
    s += window(-120, -105, 300, 210)
    s += window(-20, -40, 310, 215, lines=4, hl=True)
    s += rect(-170, 178, 340, 34, 17, fill="#000")
    for i in range(5):
        s += rect(-130 + i * 62, 188, 36, 14, 4, fill=WHITE if i == 1 else G1, stroke=None)
    return s


def n_sharp():
    s = ""
    for x1, x2 in ((-62, -92), (58, 28)):
        s += line(x1, -170, x2, 170, sw=34)
    for y1, y2 in ((-62, -74), (52, 40)):
        s += line(-175, y1, 175, y2, sw=34)
    # syntax-tree fragment, top right
    nodes = [(215, -185), (170, -145), (260, -145), (145, -105), (195, -105)]
    for (x1, y1), (x2, y2) in ((nodes[0], nodes[1]), (nodes[0], nodes[2]), (nodes[1], nodes[3]), (nodes[1], nodes[4])):
        s += line(x1, y1, x2, y2, sw=3, stroke=G1)
    for x, y in nodes:
        s += circle(x, y, 9, fill="#000", stroke=WHITE, sw=4)
    return s


def vega_os():
    s = ellipse(0, 0, 250, 78, -22, sw=3, stroke=G1) + ellipse(0, 0, 190, 54, 38, sw=3, stroke=G1)
    star = "M0 -175 Q16 -16 175 0 Q16 16 0 175 Q-16 16 -175 0 Q-16 -16 0 -175 Z"
    s += path(star, fill=WHITE, stroke=None)
    s += circle(0, 0, 38, fill="#000", stroke=None) + circle(0, 0, 22, fill=WHITE, stroke=None)
    ang = math.radians(-22)
    px, py = 250 * math.cos(math.radians(150)), 78 * math.sin(math.radians(150))
    x, y = px * math.cos(ang) - py * math.sin(ang), px * math.sin(ang) + py * math.cos(ang)
    s += circle(round(x, 1), round(y, 1), 13, fill=WHITE, stroke=None)
    return s


def cube(cx, cy, s, top=WHITE, left=G1, right=G2):
    h = s * 0.5
    t = [(cx, cy - s), (cx + s * 0.87, cy - s + h), (cx, cy - s + 2 * h), (cx - s * 0.87, cy - s + h)]
    l = [(cx - s * 0.87, cy - s + h), (cx, cy - s + 2 * h), (cx, cy + h * 1.0 + s * 0.0 + (s - 2 * h) + h), (cx - s * 0.87, cy + h * 1.0)]
    # side faces: height s
    l = [(cx - s * 0.87, cy - s + h), (cx, cy - s + 2 * h), (cx, cy + 2 * h), (cx - s * 0.87, cy + h)]
    r = [(cx + s * 0.87, cy - s + h), (cx, cy - s + 2 * h), (cx, cy + 2 * h), (cx + s * 0.87, cy + h)]
    return poly(l, fill=left, stroke="#000", sw=4) + poly(r, fill=right, stroke="#000", sw=4) + poly(t, fill=top, stroke="#000", sw=4)


def voxen():
    z = 78
    dx, dy = z * 0.87, z * 0.5
    s = ""
    # pyramid of 6 cubes, painted back to front
    layout = [(0, -170, 1), (-dx, -170 + dy * 2 - dy + dy, 2), (dx, -170 + dy * 2 - dy + dy, 2)]
    pos = [(0, -150), (-dx, -150 + z * 0.5 + z * 0.5 * 1.0), (dx, -150 + z * 0.5 + z * 0.5 * 1.0), (-2 * dx, -150 + 2 * (z * 0.5 + z * 0.5)), (0, -150 + 2 * (z * 0.5 + z * 0.5)), (2 * dx, -150 + 2 * (z * 0.5 + z * 0.5))]
    # bottom row first so upper cubes overlap correctly
    order = [3, 4, 5, 1, 2, 0]
    for i in order:
        x, y = pos[i]
        s += cube(round(x, 1), round(y + 70, 1), z, top=WHITE if i == 0 else "#dcdcdc", left=G1, right=G2)
    # filter funnel / seal mark on the right
    s += circle(250, -120, 44, fill="#000", sw=5) + path("M232 -120 l14 16 l28 -34", stroke=WHITE, sw=6, join="miter")
    return s


def systui():
    s = line(-200, 170, 200, 170, sw=5)
    hs = [90, 150, 70, 210, 130, 250, 110]
    for i, h in enumerate(hs):
        x = -190 + i * 56
        s += rect(x, 170 - h, 36, h, 0, fill=WHITE if i == 5 else G2, stroke=WHITE if i != 5 else None, sw=4)
    pts = [(-172, -10), (-116, -70), (-60, -20), (-4, -110), (52, -60), (108, -150), (164, -100)]
    s += f'<polyline points="{" ".join(f"{x},{y}" for x, y in pts)}" fill="none" stroke="{WHITE}" stroke-width="5" stroke-linejoin="miter"/>'
    for x, y in pts:
        s += circle(x, y, 8, fill="#000", sw=4)
    s += circle(pts[5][0], pts[5][1], 8, fill=WHITE, stroke=None)
    return s


def filetui():
    s = ""
    for i in range(3):
        x = -215 + i * 150
        s += rect(x, -170, 130, 340, 8, fill="#000")
        s += line(x, -128, x + 130, -128, sw=4)
        for r in range(6):
            y = -100 + r * 44
            ind = (r % 3) * 12 if i == 0 else (8 if i == 1 and r in (2, 3, 4) else 0)
            sel = (i == 1 and r == 2)
            if sel:
                s += rect(x + 8, y - 14, 114, 32, 0, fill=WHITE, stroke=None)
            s += rect(x + 18 + ind, y - 5, 18, 14, 0, fill="#000" if sel else G1, stroke=None if sel else None)
            s += line(x + 46 + ind, y + 2, x + 108 - (r % 2) * 22, y + 2, sw=5, stroke="#000" if sel else G1)
    return s


def prompt():
    s = path("M-190 -150 L-40 0 L-190 150", sw=44, join="miter")
    s += rect(0, 118, 190, 34, 0, fill=WHITE, stroke=None)
    s += rect(-210, 190, 130, 40, 20, fill=WHITE, stroke=None) + rect(-90, 190, 150, 40, 20, fill=G1, stroke=None) + rect(50, 190, 170, 40, 20, fill=G2, stroke=WHITE, sw=3)
    return s


def contact_suite():
    s = ""
    pts = [(-250, -150), (0, -215), (250, -150), (-250, 150), (250, 150)]
    for x, y in pts:
        s += line(0, 0, x * 0.78, y * 0.78, sw=3, stroke=G1, stroke_dasharray="2 12", cap="round")
    s += rect(-110, -72, 220, 144, 8, fill="#000") + path("M-110 -64 L0 20 L110 -64", sw=SW)
    s += line(-110, 72, -30, 8, sw=3) + line(110, 72, 30, 8, sw=3)
    for i, (x, y) in enumerate(pts):
        bw = 96 if i % 2 == 0 else 80
        s += rect(x - bw / 2, y - 34, bw, 62, 14, fill="#000", sw=5) + poly([(x - 10, y + 28), (x + 10, y + 28), (x - 14 if x > 0 else x + 14, y + 48)], fill="#000", sw=5)
        s += line(x - bw / 2 + 18, y - 12, x + bw / 2 - 18, y - 12, sw=5, stroke=G1) + line(x - bw / 2 + 18, y + 8, x + bw / 2 - 34, y + 8, sw=5, stroke=G1)
    return s


def androiddrop():
    s = rect(-290, -130, 112, 236, 22, fill="#000") + line(-250, -108, -218, -108, sw=5, cap="round") + circle(-234, 84, 7, fill=WHITE, stroke=None)
    s += rect(50, -105, 240, 150, 10, fill="#000") + path("M30 55 H310 L292 87 H48 Z", fill=G2, sw=5)
    s += path("M-160 -40 Q-60 -190 40 -50", sw=4, stroke=G1, stroke_dasharray="2 14", cap="round")
    s += path("M-62 -150 h40 l22 22 v52 h-62 Z", fill="#000", sw=5) + path("M-22 -150 v22 h22", sw=5) + line(-48 + 8, -106, -8, -106, sw=4, stroke=G1) + line(-40, -90, -12, -90, sw=4, stroke=G1)
    s += path("M40 -50 l-24 -10 M40 -50 l-6 -26", sw=6, cap="round")
    return s


def pchat():
    s = rect(-230, -190, 460, 380, 10, fill="#000") + line(-230, -146, 230, -146, sw=4)
    for i in range(3):
        s += circle(-200 + i * 22, -168, 5, fill=WHITE, stroke=None)
    rows = [(-195, -96, 190, False), (-30, -20, 170, True), (-195, 52, 130, False), (-60, 120, 230, True)]
    for x, y, w, mine in rows:
        xx = x if not mine else 230 - 30 - w
        s += rect(xx, y - 22, w, 50, 22, fill=WHITE if mine else "#000", sw=5)
        s += line(xx + 22, y + 3, xx + w - 22, y + 3, sw=6, stroke="#000" if mine else G1)
    return s


def misnotas():
    s = rect(-130, -200, 260, 400, 30, fill="#000") + line(-30, -178, 30, -178, sw=5, cap="round")
    s += rect(-92, -140, 184, 26, 0, fill=WHITE, stroke=None)
    for i in range(3):
        s += line(-92, -84 + i * 30, 92 - (i % 2) * 40, -84 + i * 30, sw=5, stroke=G1)
    for i in range(2):
        s += circle(-84, 20 + i * 44, 6, fill=WHITE, stroke=None) + line(-62, 20 + i * 44, 80 - i * 50, 20 + i * 44, sw=6)
    for i in range(2):
        y = 112 + i * 40
        s += rect(-92, y - 14, 28, 28, 4, fill=WHITE if i == 0 else "#000", sw=4)
        if i == 0:
            s += path(f"M-86 {y} l8 8 l14 -16", stroke="#000", sw=4)
        s += line(-50, y, 70 - i * 30, y, sw=6, stroke=G1)
    return s


def chess_tui():
    s = ""
    for r in range(2):
        for c in range(8):
            if (r + c) % 2 == 0:
                s += rect(-232 + c * 58, 150 + r * 38, 58, 38, 0, fill=G2, stroke=None)
    s += rect(-232, 150, 464, 76, 0, fill="none", sw=4)
    knight = "M-90 140 C-84 70 -48 42 -36 4 C-66 8 -100 28 -128 66 L-152 44 C-124 -22 -64 -88 6 -112 L22 -158 L52 -118 C116 -98 144 -28 134 52 C128 88 110 114 100 140 Z"
    s += path(knight, fill=WHITE, stroke=None)
    s += circle(40, -70, 9, fill="#000", stroke=None) + path("M-128 66 l22 10", stroke="#000", sw=5) + rect(-112, 126, 224, 28, 0, fill=WHITE, stroke=None)
    return s


def retrotui():
    s = ""
    for r in range(3):
        for c in range(7):
            x, y = -220 + c * 64, -190 + r * 40
            s += rect(x, y, 58, 32, 0, fill=WHITE if (r + c) % 3 != 1 else G1, stroke=None)
    s += rect(-24, 20, 30, 30, 0, fill=WHITE, stroke=None)
    for i in range(1, 5):
        s += rect(-24 - i * 26, 20 + i * 24, 30 - i * 5, 30 - i * 5, 0, fill=G1 if i < 3 else G2, stroke=None, fill_opacity=1 - i * 0.18)
    s += rect(-110, 168, 220, 28, 0, fill=WHITE, stroke=None)
    return s


def master_chess():
    s = ""
    for c in range(6):
        s += rect(-180 + c * 60, 176, 60, 34, 0, fill=WHITE if c % 2 == 0 else G2, stroke=None)
    body = "M-78 152 C-66 62 -44 2 -80 -78 L-48 -54 L-38 -126 L-8 -58 L0 -150 L8 -58 L38 -126 L48 -54 L80 -78 C44 2 66 62 78 152 Z"
    s += path(body, fill=WHITE, stroke=None)
    for x, y in ((-80, -90), (-38, -140), (0, -164), (38, -140), (80, -90)):
        s += circle(x, y, 12, fill=WHITE, stroke=None)
    s += rect(-104, 146, 208, 24, 0, fill=WHITE, stroke=None) + line(-52, -20, 52, -20, sw=5, stroke="#000") + line(-60, 70, 60, 70, sw=5, stroke="#000")
    return s


def hollowforge():
    anvil = "M-175 -40 L125 -40 L180 -18 L125 12 L62 12 L84 92 L136 92 L136 132 L-136 132 L-136 92 L-72 92 L-50 12 L-122 12 C-156 12 -175 -10 -175 -40 Z"
    s = path(anvil, fill=G2, sw=6)
    s += path("M-175 -40 L125 -40 L180 -18 L125 12 L-122 12 C-156 12 -175 -10 -175 -40 Z", fill=WHITE, stroke=None)
    sword = (poly([(0, -170), (15, -125), (15, 30), (-15, 30), (-15, -125)], fill=WHITE, stroke=None)
             + line(0, -150, 0, 20, sw=3, stroke="#000")
             + rect(-52, 30, 104, 18, 0, fill=WHITE, stroke=None) + rect(-9, 48, 18, 54, 0, fill=G1, stroke=None) + circle(0, 114, 13, fill=WHITE, stroke=None))
    s += f'<g transform="translate(-10 -48) rotate(38) translate(0 -70) scale(0.78)">{sword}</g>'
    for x, y, r in ((-120, -92, 14), (-150, -60, 9), (-86, -130, 9), (-170, -100, 6)):
        s += poly([(x, y - r), (x + r * 0.3, y - r * 0.3), (x + r, y), (x + r * 0.3, y + r * 0.3), (x, y + r), (x - r * 0.3, y + r * 0.3), (x - r, y), (x - r * 0.3, y - r * 0.3)], fill=WHITE, stroke=None)
    return s


def de_0_a_java():
    s = ellipse(-6, 168, 210, 30, 0, fill=G2, sw=5)
    s += path("M-150 -30 H110 L90 90 Q80 150 10 150 H-60 Q-130 150 -140 90 Z", fill="#000")
    s += path("M110 10 H150 Q200 10 196 60 Q190 108 130 106", sw=SW)
    s += path("M-130 24 H96", sw=4, stroke=G1)
    brace_l = "M-26 -60 C-58 -60 -58 -88 -58 -108 C-58 -132 -74 -138 -88 -142 C-74 -146 -58 -152 -58 -176 C-58 -196 -58 -224 -26 -224"
    s += path(brace_l, sw=9, cap="round") + path(brace_l, sw=9, cap="round", transform="translate(-6 0) scale(-1 1) translate(6 0)", **{})
    s += path("M-14 -100 C-4 -128 14 -132 22 -154 M14 -100 C24 -128 42 -130 50 -156", sw=0, stroke=None)
    s += path("M-3 -110 q18 -26 0 -52 q-18 -26 0 -52", sw=6, stroke=G1, cap="round")
    return s


def exercism():
    s = ""
    bars = [(-150, -190, 22, 100), (-110, -170, 18, 60), (110, -190, 22, 100), (128, -170, 18, 60)]
    s += line(-110, -140, 128, -140, sw=14)
    for x, y, w, h in ((-150, -190, 26, 100), (-118, -168, 20, 56), (124, -190, 26, 100), (100, -168, 20, 56)):
        s += rect(x, y, w, h, 4, fill=WHITE, stroke=None)
    marks = ["( )", "[ ]", "{ }", "< >", "/* */"]
    for i in range(5):
        w = 330 - i * 14
        x = -w / 2 + (14 if i % 2 else -10)
        y = -80 + i * 46
        s += rect(x, y, w, 38, 6, fill=G2 if i % 2 else "#000", sw=5)
        mx = x + 24
        s += line(mx, y + 19, mx + 40, y + 19, sw=5, stroke=G1)
        if i == 0:
            s += path(f"M{x + w - 62} {y + 10} q-10 9 0 18 M{x + w - 36} {y + 10} q10 9 0 18", sw=4)
        elif i == 1:
            s += path(f"M{x + w - 62} {y + 8} h-8 v22 h8 M{x + w - 34} {y + 8} h8 v22 h-8", sw=4)
        elif i == 2:
            s += path(f"M{x + w - 60} {y + 8} q-8 0 -8 8 v4 q0 6 -6 6 q6 0 6 6 v4 q0 8 8 8", sw=4)
        elif i == 3:
            s += path(f"M{x + w - 60} {y + 8} l-12 11 l12 11 M{x + w - 34} {y + 8} l12 11 l-12 11", sw=4)
        else:
            s += line(x + w - 70, y + 28, x + w - 38, y + 10, sw=4)
    return s


EMBLEMS = {
    "tui-os": tui_os, "n-sharp": n_sharp, "vega-os": vega_os, "voxen": voxen, "systui": systui, "filetui": filetui,
    "prompt": prompt, "contact-suite": contact_suite, "androiddrop": androiddrop, "pchat": pchat, "misnotas": misnotas,
    "chess-tui": chess_tui, "retrotui": retrotui, "master-chess": master_chess, "hollowforge": hollowforge,
    "de-0-a-java": de_0_a_java, "exercism": exercism,
}


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    out = root / "public" / "art"
    out.mkdir(parents=True, exist_ok=True)
    for slug, fn in EMBLEMS.items():
        svg = plate(slug, fn())
        (out / f"{slug}.svg").write_text(svg)
        print(f"{slug:14} {len(svg) / 1024:4.1f} KB")
    if "--sheet" in sys.argv:
        import subprocess
        files = [str(out / f"{s}.svg") for s in EMBLEMS]
        subprocess.run(["magick", "montage", *files, "-background", "#333", "-tile", "4x", "-geometry", "400x300+6+6", "/tmp/lownoise-icons-sheet.png"], check=True)
        print("sheet: /tmp/lownoise-icons-sheet.png")
    return 0


if __name__ == "__main__":
    sys.exit(main())
