#!/usr/bin/env python3
"""Derive a navigable homepage view from the preserved source snapshot."""
import json
from pathlib import Path
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parents[1]
pages = json.loads((root / 'content/pages.json').read_text(encoding='utf-8'))
home = next(page for page in pages if page['path'] == '/')
soup = BeautifulSoup(home['html'], 'html.parser')
sections = [section for section in soup.find_all('section') if not section.find_parent('section')]
cards = []
for article in sections[3].find_all('article'):
    heading = article.find('h2')
    link = heading.find('a') if heading else None
    image = article.find('img')
    if link:
        cards.append({'title': link.get_text(' ', strip=True), 'href': link['href'],
                      'image': image.get('src', '') if image else ''})

view = {
    'heroTitle': sections[0].get_text(' ', strip=True),
    'intro': sections[2].get_text(' ', strip=True),
    'courses': cards,
    'highlights': [item.get_text(' ', strip=True) for item in sections[4].find_all('h4')],
    'benefits': [item.get_text(' ', strip=True) for item in sections[5].find_all('li')],
    'credentials': list(dict.fromkeys(item.get_text(' ', strip=True) for item in sections[5].find_all('h4'))),
    'trial': {
        'title': sections[6].find('h3').get_text(' ', strip=True),
        'text': sections[6].find('p').get_text(' ', strip=True),
    },
    'activities': {
        'title': sections[7].find('h3').get_text(' ', strip=True),
        'text': sections[7].find('p').get_text(' ', strip=True),
        'items': [item.get_text(' ', strip=True) for item in sections[7].find_all('h5')],
        'image': sections[7].find('img').get('src', ''),
    },
    'principles': ['успеха', 'лидерства', 'эффективности'],
    'approach': [
        {'title': title, 'text': item.get_text(' ', strip=True)}
        for title, item in zip(
            ['Интерактивное обучение', 'Замечательные учителя', 'Сертификаты'],
            sections[9].find_all('p'),
        )
    ],
    'afterSchool': {
        'title': sections[10].find('h2').get_text(' ', strip=True),
        'paragraphs': [item.get_text(' ', strip=True) for item in sections[10].find_all('p')],
    },
    'parentNote': {
        'title': sections[11].find('h4').get_text(' ', strip=True),
        'text': sections[11].find('p').get_text(' ', strip=True),
    },
    'reviews': [
        {'quote': quote, 'name': name, 'role': role}
        for quote, name, role in zip(
            [item.strip() for item in sections[12].stripped_strings if item.strip().startswith('“')],
            ['Егор Белогорцев', 'Оля Федотова', 'Алена Синицына'],
            ['Папа умницы', 'Мама умника', 'Мама умницы'],
        )
    ],
}
(root / 'content/home-view.json').write_text(json.dumps(view, ensure_ascii=False, indent=2), encoding='utf-8')
print(f"Homepage: {len(cards)} courses, {len(view['highlights'])} highlights, {len(view['reviews'])} reviews")
