#!/usr/bin/env python3
"""Turn the logo generated in ChatGPT into a clean vector.

    python3 art/import_logo.py art/ai-input/logo-b.png          # needs Pillow and potrace
    -> public/logo.svg (single path, fill=currentColor), public/logo-preview.png (for a quick look)

Works with a white mark on black or a black mark on white. Prints the viewBox and path so the
inline <Mark> component and the favicon can be updated from it.
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageOps, ImageStat


def otsu(hist: list[int]) -> int:
    total = sum(hist)
    sum_all = sum(i * c for i, c in enumerate(hist))
    best, wb, sum_b, thr = 0.0, 0, 0, 128
    for t in range(256):
        wb += hist[t]
        if wb == 0:
            continue
        wf = total - wb
        if wf == 0:
            break
        sum_b += t * hist[t]
        mb, mf = sum_b / wb, (sum_all - sum_b) / wf
        var = wb * wf * (mb - mf) ** 2
        if var > best:
            best, thr = var, t
    return thr


def main() -> int:
    if len(sys.argv) < 2:
        print(__doc__)
        return 1
    root = Path(__file__).resolve().parent.parent
    im = ImageOps.exif_transpose(Image.open(sys.argv[1])).convert("L")
    if ImageStat.Stat(im).mean[0] > 127:  # white background -> invert so the mark is white
        im = ImageOps.invert(im)
    thr = otsu(im.histogram())
    mask = im.point(lambda v: 255 if v > thr else 0)  # white mark
    box = mask.getbbox()
    if not box:
        print("no mark found")
        return 1
    mark = mask.crop(box)
    side = round(max(mark.size) * 1.0)
    canvas = Image.new("L", (side, side), 0)
    canvas.paste(mark, ((side - mark.width) // 2, (side - mark.height) // 2))
    canvas = canvas.resize((1024, 1024), Image.LANCZOS).point(lambda v: 255 if v > 127 else 0)
    with tempfile.TemporaryDirectory() as d:
        pbm, raw = Path(d, "m.pbm"), Path(d, "m.svg")
        ImageOps.invert(canvas).convert("1").save(pbm)  # potrace traces the black pixels
        subprocess.run(["potrace", str(pbm), "-s", "-o", str(raw), "--turdsize", "10", "--alphamax", "1.0", "--opttolerance", "0.4"], check=True)
        svg = raw.read_text()
    paths = re.findall(r'<path d="([^"]+)"', svg)
    transform = re.search(r'<g transform="([^"]+)"', svg)
    vb = re.search(r'viewBox="([^"]+)"', svg)
    body = "".join(f'<path d="{p}"/>' for p in paths)
    out = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb.group(1) if vb else "0 0 1024 1024"}" fill="currentColor" role="img" aria-label="Low Noise">'
        f'<g transform="{transform.group(1) if transform else ""}">{body}</g></svg>\n'
    )
    (root / "public").mkdir(exist_ok=True)
    (root / "public" / "logo.svg").write_text(out)
    prev = Image.new("RGB", (512, 512), "black")
    prev.paste(canvas.resize((512, 512)).convert("RGB"), (0, 0))
    prev.save(root / "public" / "logo-preview.png")
    print(f"public/logo.svg written ({len(out) // 1024 or 1} KB, {len(paths)} path(s), threshold {thr})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
