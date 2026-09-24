#!/usr/bin/env python3
"""Import every public sitemap URL as a local content snapshot."""
import concurrent.futures
import json
import subprocess
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse, urljoin
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://school-bratsk.ru'
URLS = []
for sitemap in sorted(Path('/tmp').glob('school-map-*.xml')):
    try:
        root = ET.parse(sitemap).getroot()
        URLS += [node.text for node in root.iter() if node.tag.endswith('loc') and node.text]
    except ET.ParseError:
        pass
URLS = list(dict.fromkeys(URLS))

def fetch(url):
    result = subprocess.run(['curl', '-Ls', '--retry', '2', '--max-time', '45',
                             '-A', 'Mozilla/5.0', url], capture_output=True, timeout=55)
    return result.stdout.decode('utf-8', 'replace')

def extract(url):
    raw = fetch(url)
    soup = BeautifulSoup(raw, 'html.parser')
    main = soup.select_one('main#jupiterx-main') or soup.select_one('main')
    if not main:
        return {'path': urlparse(url).path, 'title': '', 'html': '', 'links': [],
                'sourceStatus': 'missing-main', 'bytes': len(raw)}
    for node in main.select('script, style, noscript, svg, iframe, form, button, input, textarea, select'):
        node.decompose()
    for node in main.select('*'):
        attrs = {}
        if node.name == 'a' and node.get('href'):
            href = urljoin(url, node['href'])
            attrs['href'] = href.replace(SOURCE + '/', '/') if href.startswith(SOURCE + '/') else href
        if node.name in ('img', 'source'):
            src = node.get('data-src') or node.get('src')
            if src:
                attrs['src'] = urljoin(url, src)
            if node.get('alt'):
                attrs['alt'] = node['alt']
        if node.name == 'video' and node.get('src'):
            attrs['src'] = urljoin(url, node['src'])
        node.attrs = attrs
    title = (soup.find('h1') or soup.find('title'))
    title = title.get_text(' ', strip=True) if title else urlparse(url).path
    links = sorted({a['href'] for a in main.find_all('a', href=True) if a['href'].startswith('/')})
    return {'path': urlparse(url).path, 'title': title, 'html': str(main),
            'links': links, 'sourceStatus': 'ok', 'bytes': len(raw)}

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    pages = list(pool.map(extract, URLS))

out = ROOT / 'content'
out.mkdir(exist_ok=True)
(out / 'pages.json').write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding='utf-8')
(out / 'routes.json').write_text(json.dumps([p['path'] for p in pages], ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'count': len(pages), 'ok': sum(p['sourceStatus'] == 'ok' for p in pages),
                  'failed': [p['path'] for p in pages if p['sourceStatus'] != 'ok'],
                  'htmlBytes': sum(len(p['html']) for p in pages)}, ensure_ascii=False))
