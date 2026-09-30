#!/usr/bin/env python3
"""Check every imported sitemap URL against the running local site."""
import concurrent.futures
import json
import os
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
routes = json.loads((ROOT / 'content/routes.json').read_text())
base_url = os.environ.get('MIGRATION_BASE_URL', 'http://localhost:3000').rstrip('/')

def check(path):
    try:
        with urllib.request.urlopen(base_url + path, timeout=30) as response:
            body = response.read().decode('utf-8', 'replace')
            marker = 'home-shell' if path == '/' else 'inner-shell'
            return {'path': path, 'status': response.status, 'bytes': len(body), 'hasContent': marker in body}
    except Exception as exc:
        return {'path': path, 'status': 0, 'error': str(exc), 'hasContent': False}

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, routes))
report = {'total': len(results), 'passed': sum(x['status'] == 200 and x['hasContent'] for x in results),
          'failed': [x for x in results if x['status'] != 200 or not x['hasContent']]}
(ROOT / '.shipstudio/route-check.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(json.dumps(report, ensure_ascii=False))
