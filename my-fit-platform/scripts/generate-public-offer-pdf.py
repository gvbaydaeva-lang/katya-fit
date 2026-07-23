from __future__ import annotations

import html
import re
import shutil
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    ListFlowable,
    ListItem,
    PageTemplate,
    Paragraph,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "public-offer.md"
OUTPUT = ROOT / "output" / "pdf" / "public-offer.pdf"
PUBLIC_COPY = ROOT / "public" / "documents" / "public-offer.pdf"

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
FONT_REGULAR = FONT_DIR / "Arial.ttf"
FONT_BOLD = FONT_DIR / "Arial Bold.ttf"

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN_X = 21 * mm
MARGIN_TOP = 21 * mm
MARGIN_BOTTOM = 18 * mm
ACCENT = colors.HexColor("#B07D54")
TEXT = colors.HexColor("#3F3A36")
MUTED = colors.HexColor("#77706A")
RULE = colors.HexColor("#E8E2D9")


class OfferDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=MARGIN_X,
            rightMargin=MARGIN_X,
            topMargin=MARGIN_TOP,
            bottomMargin=MARGIN_BOTTOM,
            title="Публичная оферта Katy Dikaeva",
            author="Екатерина Дикаева",
            subject="Договор-оферта об оказании услуг и предоставлении доступа к цифровым материалам",
        )
        frame = Frame(
            self.leftMargin,
            self.bottomMargin,
            self.width,
            self.height,
            id="content",
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(PageTemplate(id="offer", frames=[frame], onPage=self.draw_page))

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.6)
        canvas.line(MARGIN_X, 13 * mm, PAGE_WIDTH - MARGIN_X, 13 * mm)
        canvas.setFont("Arial", 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(MARGIN_X, 8.2 * mm, "Katy Dikaeva · ИНН 081409365170")
        canvas.drawRightString(PAGE_WIDTH - MARGIN_X, 8.2 * mm, f"Страница {doc.page}")
        canvas.restoreState()


def safe(text: str) -> str:
    escaped = html.escape(text.strip())
    return re.sub(r"(https?://[^\s]+)", r'<link href="\1" color="#B07D54">\1</link>', escaped)


def build_story(lines: list[str]):
    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "OfferTitle",
        parent=styles["Title"],
        fontName="Arial-Bold",
        fontSize=22,
        leading=27,
        textColor=colors.HexColor("#1C1917"),
        alignment=TA_CENTER,
        spaceAfter=8 * mm,
    )
    subtitle = ParagraphStyle(
        "OfferSubtitle",
        parent=styles["Normal"],
        fontName="Arial",
        fontSize=10,
        leading=14,
        textColor=MUTED,
        alignment=TA_CENTER,
        spaceAfter=4 * mm,
    )
    heading = ParagraphStyle(
        "OfferHeading",
        parent=styles["Heading2"],
        fontName="Arial-Bold",
        fontSize=12.2,
        leading=15.5,
        textColor=colors.HexColor("#1C1917"),
        spaceBefore=5.5 * mm,
        spaceAfter=2.2 * mm,
        keepWithNext=True,
    )
    body = ParagraphStyle(
        "OfferBody",
        parent=styles["BodyText"],
        fontName="Arial",
        fontSize=9.2,
        leading=12.9,
        textColor=TEXT,
        spaceAfter=1.8 * mm,
        allowWidows=0,
        allowOrphans=0,
    )
    bullet = ParagraphStyle(
        "OfferBullet",
        parent=body,
        leftIndent=0,
        firstLineIndent=0,
        spaceAfter=1.2 * mm,
    )

    story = []
    bullets: list[str] = []
    title_seen = False

    def flush_bullets():
        nonlocal bullets
        if not bullets:
            return
        story.append(
            ListFlowable(
                [ListItem(Paragraph(safe(item), bullet), leftIndent=2 * mm) for item in bullets],
                bulletType="bullet",
                start="circle",
                leftIndent=6 * mm,
                bulletFontName="Arial",
                bulletFontSize=6,
                bulletColor=ACCENT,
                spaceAfter=1.5 * mm,
            )
        )
        bullets = []

    for raw in lines:
        line = raw.strip()
        if not line:
            flush_bullets()
            continue
        if line.startswith("- "):
            bullets.append(line[2:])
            continue
        flush_bullets()
        if line.startswith("# "):
            story.append(Spacer(1, 10 * mm))
            story.append(Paragraph(safe(line[2:]), title))
            title_seen = True
        elif line.startswith("## "):
            text = line[3:]
            if title_seen and not re.match(r"\d+\.", text):
                story.append(Paragraph(safe(text), subtitle))
            else:
                story.append(Paragraph(safe(text), heading))
        elif line.startswith("Версия "):
            story.append(Paragraph(safe(line), subtitle))
            story.append(Spacer(1, 2 * mm))
        else:
            story.append(Paragraph(safe(line), body))

    flush_bullets()
    return story


def main():
    if not FONT_REGULAR.exists() or not FONT_BOLD.exists():
        raise FileNotFoundError("Arial fonts with Cyrillic support were not found")

    pdfmetrics.registerFont(TTFont("Arial", str(FONT_REGULAR)))
    pdfmetrics.registerFont(TTFont("Arial-Bold", str(FONT_BOLD)))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_COPY.parent.mkdir(parents=True, exist_ok=True)

    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    doc = OfferDocTemplate(str(OUTPUT))
    doc.build(build_story(lines))
    shutil.copy2(OUTPUT, PUBLIC_COPY)
    print(f"Created: {OUTPUT}")
    print(f"Published copy: {PUBLIC_COPY}")


if __name__ == "__main__":
    main()
