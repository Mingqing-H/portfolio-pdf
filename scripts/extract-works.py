from pathlib import Path
import fitz
from PIL import Image

root = Path(__file__).resolve().parents[1]
output = root / "public" / "works"
output.mkdir(parents=True, exist_ok=True)

with fitz.open(root / "docs" / "portfolio.pdf") as document:
    for index, page in enumerate(document):
        pixmap = page.get_pixmap(matrix=fitz.Matrix(1.9, 1.9), alpha=False)
        Image.frombytes("RGB", [pixmap.width, pixmap.height], pixmap.samples).save(
            output / f"project-{index + 1}.webp", quality=85
        )
        images = page.get_image_info()
        selected = images[1 if index == 0 else 0]
        pixmap = page.get_pixmap(
            matrix=fitz.Matrix(1.7, 1.7), clip=fitz.Rect(selected["bbox"]), alpha=False
        )
        cover = Image.frombytes("RGB", [pixmap.width, pixmap.height], pixmap.samples)
        cover.thumbnail((780, 780))
        cover.save(output / f"cover-{index + 1}.webp", quality=83)
