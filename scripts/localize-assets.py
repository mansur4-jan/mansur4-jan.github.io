#!/usr/bin/env python3
"""Copy source media into public/ and point imported content at those files."""
import concurrent.futures
import json
import re
import subprocess
from pathlib import Path
from urllib.parse import urlparse, unquote
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / 'content/pages.json'
pages = json.loads(PAGES.read_text(encoding='utf-8'))
source = 'https://school-bratsk.ru'
external_activity = 'https://jupiterx.artbees.net/kindergarten/wp-content/uploads/sites/332/2019/12/home-activity@2x.jpg'
urls = set()
for page in pages:
    soup = BeautifulSoup(page['html'], 'html.parser')
    for placeholder in soup.find_all('img', src=re.compile(r'/elementor/assets/images/placeholder\.png')):
        placeholder.decompose()
    heading = soup.find('h1') or soup.find('h2')
    if heading:
        page['title'] = heading.get_text(' ', strip=True)
    if page['path'].startswith('/kindergarten/'):
        descriptive = next((h.get_text(' ', strip=True) for h in soup.find_all('h2') if h.get_text(' ', strip=True) not in ('Напишите нам', 'План программы')), '')
        if descriptive:
            page['title'] = re.sub(r'^Описание программы\s*', '', descriptive).strip(' «»')
    page['html'] = str(soup)
    page['html'] = page['html'].replace(external_activity, '/assets/home-activity.jpg')
    urls.update(re.findall(r'https://school-bratsk\.ru/wp-content/uploads/[^" <]+', page['html']))
    page['html'] = page['html'].replace(source + '/wp-content/uploads/', '/wp-content/uploads/')

css = Path('/tmp/school-post8.css')
if css.exists():
    urls.update(re.findall(r'https://school-bratsk\.ru/wp-content/uploads/[^" )]+', css.read_text()))
home = Path('/tmp/school-home.html')
if home.exists():
    urls.update(re.findall(r'https://school-bratsk\.ru/wp-content/uploads/[^" <]+', home.read_text()))

urls = {u.rstrip('),') for u in urls if urlparse(u).path.startswith('/wp-content/uploads/')}

def download(url):
    path = ROOT / 'public' / unquote(urlparse(url).path.lstrip('/'))
    if path.exists() and path.stat().st_size:
        return (url, 'existing')
    path.parent.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(['curl', '-LfsS', '--retry', '2', '--max-time', '90', url,
                             '-o', str(path)], capture_output=True, timeout=100)
    if result.returncode or not path.exists() or not path.stat().st_size:
        path.unlink(missing_ok=True)
        return (url, 'failed')
    return (url, 'ok')

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    results = list(pool.map(download, sorted(urls)))

PAGES.write_text(json.dumps(pages, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'assets': len(results), 'ok': sum(s in ('ok','existing') for _,s in results),
                  'failed': [u for u,s in results if s == 'failed']}, ensure_ascii=False))
