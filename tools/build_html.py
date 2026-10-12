"""Build self-contained HTML (images inlined) from notes/ and questions/ md files into html/."""
import base64, pathlib, re, sys, markdown
root = pathlib.Path(__file__).resolve().parent.parent
out = root / "html"; out.mkdir(exist_ok=True)
CSS = """body{font-family:system-ui,sans-serif;max-width:820px;margin:0 auto;padding:16px;line-height:1.55;background:#fff;color:#1a1a1a}
img{max-width:100%;border:1px solid #ddd;border-radius:6px}table{border-collapse:collapse;width:100%;display:block;overflow-x:auto}
td,th{border:1px solid #ccc;padding:5px 8px}th{background:#f2f2f2}blockquote{border-left:4px solid #7b61ff;background:#f6f4ff;margin:12px 0;padding:8px 14px}
details{background:#eefaf0;border:1px solid #9dd4a8;border-radius:6px;padding:4px 10px;margin:6px 0}summary{cursor:pointer;font-weight:600;color:#1d7a33}
pre{background:#f4f4f4;padding:10px;overflow-x:auto;border-radius:6px}code{font-size:.92em}
@media (prefers-color-scheme:dark){body{background:#17171a;color:#e6e6e6}th{background:#26262b}blockquote{background:#221f33}details{background:#16261a;border-color:#2f6b3c}summary{color:#7fd492}pre{background:#222}img{background:#fff}}"""
def build(md_path):
    txt = md_path.read_text()
    # blockquoted <details> -> unquote inner lines so markdown renders them
    txt = re.sub(r'^> ?(<details>.*)$', r'\1', txt, flags=re.M)
    def img(m):
        f = (md_path.parent / m.group(2)).resolve()
        data = base64.b64encode(f.read_bytes()).decode()
        return f'![{m.group(1)}](data:image/png;base64,{data})'
    txt = re.sub(r'!\[([^\]]*)\]\(([^)]+\.png)\)', img, txt)
    txt = re.sub(r'\]\(\.\./(notes|questions)/([^)]+)\.md\)', lambda m: f"]({m.group(1)}-{m.group(2)}.html)", txt)
    txt = re.sub(r'(</summary>\s*)(\d+)\. ', r'\1\2\\. ', txt)
    txt = txt.replace('<details>', '<details markdown="1">')
    html = markdown.markdown(txt, extensions=["tables", "fenced_code", "md_in_html"])
    title = md_path.stem
    dest = out / f"{md_path.parent.name}-{title}.html"
    dest.write_text(f'<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title}</title><style>{CSS}</style></head><body>{html}</body></html>')
    print(dest)
for p in sys.argv[1:]: build(pathlib.Path(p).resolve())
