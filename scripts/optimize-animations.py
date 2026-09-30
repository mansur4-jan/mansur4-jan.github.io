"""Build silent H.264 loops from the supplied GIFs (requires ffmpeg)."""
import argparse
import json
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('source_directory', type=Path)
parser.add_argument('--ffmpeg', default='ffmpeg')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
items = [
    ('video (4).gif', 'hero/classroom', None),
    ('мальчик.gif', 'hero/boy', None),
    ('2 скорочтение.gif', 'programs/speed-reading', 'skorochtenie'),
    ('3 таблица.gif', 'programs/multiplication', 'sekretnaya-tablitsa-umnozheniya-za-21-zanyatie'),
    ('4 программа рост.gif', 'programs/school-preparation', 'podgotovka-k-shkole'),
    ('6 письмо и калиграфия.gif', 'programs/calligraphy', 'gramotnoe-pismo-i-kalligrafiya'),
    ('7 вундеркинд.gif', 'programs/wonder-child', 'vunderkind-1-2-3-stupen'),
    ('8 английский.gif', 'programs/english', 'angliyskiy-yazyk'),
]
manifest_path = root / 'content/program-animations.json'
manifest = json.loads(manifest_path.read_text())
for filename, stem, slug in items:
    source = (root / "public/assets" / (stem + ".gif")) if stem.startswith("hero/") else args.source_directory / filename
    output = root / 'public/assets' / (stem + '.mp4')
    width = 480 if stem.startswith('hero/') else 640
    subprocess.run([
        args.ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source),
        '-an', '-vf', f"scale='min({width},iw)':-2:flags=lanczos,format=yuv420p",
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '28',
        '-movflags', '+faststart', str(output),
    ], check=True)
    if slug:
        manifest['/kindergarten/' + slug + '/']['video'] = '/assets/' + stem + '.mp4'
    print(f'{stem}: {output.stat().st_size:,} bytes', flush=True)
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
