#!/usr/bin/env python3
"""Import the project images generated in ChatGPT.

Put the files in art/ai-input/ named after the project slug (tui-os.png, n-sharp.png, ...).
Each one is turned into a monochrome 1200x900 (4:3) WebP at public/art/<slug>.webp, with the
background pinned to pure black so it melts into the black plates of the site, and the slug is
registered in src/lib/ai-art.ts so the site picks it up. Re-run it any time; it only touches the slugs it finds.

    python3 art/import_ai_images.py            # needs Pillow
    python3 art/import_ai_images.py --in DIR --out DIR --manifest FILE
"""
import argparse
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

# slug -> project. Projects that ship their own icon (ryoku-transit, MusicPlayer, CipherKey) are not here.
SLUGS = {
    "tui-os": "TUI-OS", "n-sharp": "N#", "vega-os": "VEGA OS", "voxen": "Voxen", "systui": "sysTUI", "filetui": "FileTUI",
    "prompt": "Low Noise Prompt", "contact-suite": "Contact Suite", "androiddrop": "AndroidDrop", "pchat": "Pretty Chat",
    "misnotas": "NotesApp", "chess-tui": "CheckMate TUI", "retrotui": "RetroTUI Games", "master-chess": "Master Chess",
    "hollowforge": "HollowForge", "de-0-a-java": "De 0 a Java", "exercism": "Exercism",
}
EXTS = (".png", ".jpg", ".jpeg", ".webp")
W, H = 1200, 900
BLACK_POINT = 14  # ChatGPT's "black" is rarely #000: everything at or below this becomes pure black


def convert(src: Path, dst: Path) -> None:
    im = ImageOps.exif_transpose(Image.open(src)).convert("L")  # monochrome on purpose: strips any colour cast
    w, h = im.size
    target = W / H
    if w / h > target:  # too wide: crop the sides
        nw = round(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:  # too tall: crop top and bottom
        nh = round(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    if im.width > W:
        im = im.resize((W, H), Image.LANCZOS)
    scale = 255 / (255 - BLACK_POINT)
    im = im.point(lambda v: 0 if v <= BLACK_POINT else min(255, round((v - BLACK_POINT) * scale)))
    im.convert("RGB").save(dst, "WEBP", quality=84, method=6)


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="src", default=str(root / "art" / "ai-input"))
    ap.add_argument("--out", default=str(root / "public" / "art"))
    ap.add_argument("--manifest", default=str(root / "src" / "lib" / "ai-art.ts"))
    a = ap.parse_args()
    src, out = Path(a.src), Path(a.out)
    out.mkdir(parents=True, exist_ok=True)

    found = {p.stem.lower(): p for p in sorted(src.iterdir()) if p.suffix.lower() in EXTS} if src.is_dir() else {}
    unknown = [s for s in found if s not in SLUGS and not s.startswith("logo")]
    for slug in SLUGS:
        if slug in found:
            dst = out / f"{slug}.webp"
            convert(found[slug], dst)
            print(f"ok   {slug:14} {found[slug].name} -> {dst.name} ({dst.stat().st_size // 1024} KB)")
    missing = [s for s in SLUGS if s not in found and not (out / f"{s}.webp").exists()]
    if unknown:
        print("ignored (name does not match a slug):", ", ".join(sorted(unknown)))
    if missing:
        print("still without AI image:", ", ".join(missing))

    have = [s for s in SLUGS if (out / f"{s}.webp").exists()]
    Path(a.manifest).write_text(
        "// Slugs (see ART in components/site/art.tsx) that have an AI-generated image at public/art/<slug>.webp.\n"
        "// Maintained by art/import_ai_images.py; every other project still uses its halftone <slug>.png.\n"
        f"export const AI_ART: string[] = {json.dumps(have)};\n"
    )
    print(f"manifest: {len(have)}/{len(SLUGS)} projects use an AI image")
    return 0


if __name__ == "__main__":
    sys.exit(main())
