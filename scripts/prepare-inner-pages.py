"""Generate semantic inner-page content from the preserved import. Requires bs4 and Pillow."""
from pathlib import Path
import hashlib, html, json, re
from bs4 import BeautifulSoup, NavigableString, Comment
from PIL import Image, ImageOps
ROOT = Path(__file__).resolve().parents[1]
output = ROOT / 'public/assets/inner'
output.mkdir(parents=True, exist_ok=True)
images = {}
def image(src):
    if src in images: return images[src]
    file = ROOT / 'public' / src.lstrip('/')
    if not file.is_file(): return src
    try:
        with Image.open(file) as im:
            im = ImageOps.exif_transpose(im).convert('RGB')
            im.thumbnail((1100, 1100))
            name = hashlib.sha256(src.encode()).hexdigest()[:12] + '.webp'
            im.save(output / name, 'WEBP', quality=78, method=6)
            images[src] = {'src': '/assets/inner/' + name, 'width': im.width, 'height': im.height}
            return images[src]
    except OSError: return src

def clean(source):
    soup = BeautifulSoup(source, 'html.parser')
    for n in soup(['script','style']): n.decompose()
    blocks=[]
    def walk(n):
        if isinstance(n, Comment): return
        if isinstance(n, NavigableString):
            text=str(n).strip()
            if text: blocks.append('<p>'+html.escape(text)+'</p>')
            return
        if n.name=='h1': return
        if n.name in ['h2','h3','h4','h5','h6','p','ul','ol','blockquote','table','a','img']:
            if n.name=='a' and n.find(['h1','h2','h3','h4','p','img']):
                for c in list(n.children): walk(c)
                return
            if n.name=='img':
                asset=image(n.get('src',''))
                if isinstance(asset,dict):
                    blocks.append('<figure><img src="'+asset['src']+'" width="'+str(asset['width'])+'" height="'+str(asset['height'])+'" loading="lazy" decoding="async" alt="'+html.escape(n.get('alt',''),quote=True)+'"/></figure>')
                return
            if not n.get_text(strip=True): return
            if n.name in ['h2','h3','h4','h5','h6']: n.name='h2'
            for el in [n,*n.find_all(True)]:
                el.attrs={k:v for k,v in el.attrs.items() if k in ['href','id','colspan','rowspan']}
                if el.name=='a':
                    href=el.get('href','')
                    if '#elementor-action' in href: el['href']='/contact/#trial'
                    elif href in ['http://contact','http://about','http://our-courses']: el['href']='/'+href[7:]+'/'
                    elif href=='/home': el['href']='/'
            value=str(n)
            if n.name=='a': value='<p><a href="'+html.escape(n.get('href',''),quote=True)+'">'+html.escape(n.get_text(' ',strip=True))+'</a></p>'
            blocks.append(value)
            return
        for c in list(n.children): walk(c)
    walk(soup)
    markup='\n'.join(blocks)
    # Remove broken controls inherited from the original slider/video widgets.
    markup=re.sub(r'<p>(?:Предыдущая|Следующая|Проигрывать видео)</p>\n?', '', markup)
    markup=re.sub(r'<h2>поделиться</h2>\n?', '', markup)
    markup=re.sub(r'<h2>16</h2>\s*<h2>Уроков</h2>\s*<h2>для всех</h2>\s*<h2>Уровень</h2>\s*<h2>6000</h2>\s*<h2>абонемент в месяц</h2>', '<div class="inner-facts"><span>16 уроков</span><span>Уровень: для всех</span><span>Абонемент: 6000 в месяц</span></div>', markup)
    # The shared consultation replaces the old duplicated enrolment banner.
    markup=re.sub(r'<h2><span><span>Регистрация уже началась[\s\S]*$', '', markup)
    markup=re.sub(r'<h2>Напишите нам</h2>\s*$', '', markup)
    markup=re.sub(r'<h2>Вы готовы начать\?</h2>\s*<p><a[^>]*>ДА</a></p>', '', markup)
    document=BeautifulSoup(markup, 'html.parser')
    run=[]
    def wrap_run():
        if len(run)>1:
            gallery=document.new_tag('div',attrs={'class':'inner-gallery'})
            run[0].insert_before(gallery)
            for figure in run: gallery.append(figure.extract())
        run.clear()
    for child in list(document.children):
        if getattr(child,'name',None)=='figure': run.append(child)
        elif getattr(child,'name',None): wrap_run()
    wrap_run()
    teachers=next((h for h in document.find_all('h2') if h.get_text(' ',strip=True).lower() in ['наши учителя','наши преподаватели']),None)
    if teachers:
        grid=document.new_tag('div',attrs={'class':'inner-teachers'})
        current=None
        for sibling in list(teachers.next_siblings):
            if not getattr(sibling,'name',None): continue
            if sibling.name=='h2':
                if current is None or current.find('h3'):
                    current=document.new_tag('div',attrs={'class':'inner-teacher'})
                    grid.append(current)
                sibling.name='h3'
            elif sibling.name=='figure':
                current=document.new_tag('div',attrs={'class':'inner-teacher'})
                grid.append(current)
            if current is not None: current.append(sibling.extract())
        if grid.contents: teachers.insert_after(grid)
    markup=str(document)
    return markup

result={}
for page in json.loads((ROOT/'content/pages.json').read_text()):
    path=page['path']
    if path=='/' or path.startswith(('/tag/','/category/','/author/')): continue
    soup=BeautifulSoup(page.get('displayHtml') or page['html'],'html.parser')
    first=soup.find('p')
    lead=first.get_text(' ',strip=True) if first else ''
    lead=re.sub(r'^([А-ЯЁ])\s+([а-яё])', r'\1\2', lead)
    if len(lead)>260:
        sentences=re.split(r'(?<=[.!?])\s+', lead)
        lead=sentences[0]
        for sentence in sentences[1:]:
            if len(lead)+len(sentence)>260: break
            lead+=' '+sentence
    markup=clean(str(soup))
    if path=='/about/':
        markup=re.sub(r'<h2>Образовательная лицензия</h2>\s*<h2>Экспертный состав учителей</h2>', '<div class="inner-facts"><span>Образовательная лицензия</span><span>Экспертный состав учителей</span></div>', markup)
        markup=re.sub(r'<h2><span><span>Набор уже идет[\s\S]*?</a></p>', '', markup)
        activity=['Конструктор Куборо','Викторины и Призы','Дружественная обстановка','Занятия с тренажерами']
        for title in activity:
            markup=re.sub(r'<h2>\s*<span>\s*'+re.escape(title)+r'\s*</span>\s*</h2>', '<p class="inner-activity">'+title+'</p>', markup)
        about=BeautifulSoup(markup,'html.parser')
        quotes=[p for p in about.find_all('p',recursive=False) if p.get_text(strip=True).startswith('“')]
        for index,quote in enumerate(quotes):
            if index==0:
                heading=about.new_tag('h2');heading.string='Отзывы родителей';quote.insert_before(heading)
            name=quote.find_next_sibling('p')
            role=name.find_next_sibling('p') if name else None
            card=about.new_tag('blockquote',attrs={'class':'inner-review'})
            quote.insert_before(card);card.append(quote.extract())
            if name:
                name.name='cite';card.append(name.extract())
            if role: role.decompose()
        markup=str(about)
    result[path]={'lead':lead,'html':markup}
(ROOT/'content/inner-pages.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
(ROOT/'content/inner-images.json').write_text(json.dumps(images,ensure_ascii=False,indent=2)+'\n')
print(f'Prepared {len(result)} pages, {len(images)} compressed images')
