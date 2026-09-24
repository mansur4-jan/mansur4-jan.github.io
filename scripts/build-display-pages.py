#!/usr/bin/env python3
"""Prepare readable display HTML while retaining the downloaded source HTML."""
import json
from pathlib import Path
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parents[1]
path = root / 'content/pages.json'
pages = json.loads(path.read_text(encoding='utf-8'))
cleaned = 0
for page in pages:
    page.pop('displayHtml', None)
    if not page['path'].startswith('/kindergarten/'):
        continue
    soup = BeautifulSoup(page['html'], 'html.parser')
    generic_heading = next((h for h in soup.find_all('h1') if h.get_text(' ', strip=True) == 'Программа'), None)
    if generic_heading:
        section = generic_heading.find_parent('section')
        if section:
            section.decompose()
    stock_age = next((h for h in soup.find_all('h6') if h.get_text(' ', strip=True) == 'Возраст'), None)
    if stock_age:
        inner = stock_age.find_parent('section')
        outer = inner.find_parent('section') if inner else None
        if outer:
            outer.decompose()
        elif inner:
            inner.decompose()
    page['displayHtml'] = str(soup)
    cleaned += 1
path.write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Prepared {cleaned} course displays; source HTML retained")
