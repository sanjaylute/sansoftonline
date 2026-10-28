"""Build cached translations for the public Sansoft conversion pages.

This only reads publicly rendered marketing pages. It does not read forms,
analytics, customer records, or any private application data.
"""
import concurrent.futures
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOCALES = ['es', 'de', 'fr', 'it', 'pt', 'nl', 'pl', 'da', 'id', 'tr', 'ja', 'hi', 'mr']
PATHS = ['/', '/about-us/', '/seo-services/', '/local-seo-services/', '/google-ads-management-services/', '/social-media-management-services/', '/web-development-services/', '/contact-us/']
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3011'

def normalize(value):
    return re.sub(r'\s+', ' ', value).strip()

class PublicCopyParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = set()
        self.stack = []
        self.skip = 0
    def add(self, value):
        value = normalize(value)
        if value and re.search(r'[A-Za-z]', value) and not re.match(r'^(https?://|/|[\w.+-]+@)', value):
            self.text.add(value)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if self.stack:
            self.stack[-1][1] = True
        if tag not in ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']:
            self.stack.append([[], False, tag])
        if tag in ['script', 'style', 'svg']:
            self.skip += 1
        if not self.skip:
            for key in ['alt', 'title', 'placeholder', 'aria-label']:
                self.add(attrs.get(key, ''))
    def handle_endtag(self, tag):
        if self.stack and self.stack[-1][2] == tag:
            parts, has_children, _ = self.stack.pop()
            if not has_children and not self.skip:
                self.add(''.join(parts))
        if tag in ['script', 'style', 'svg']:
            self.skip = max(0, self.skip - 1)
    def handle_data(self, data):
        if not self.skip:
            self.add(data)
            if self.stack:
                self.stack[-1][0].append(data)

def public_copy():
    result = set()
    for path in PATHS:
        request = urllib.request.Request(BASE + path, headers={'User-Agent': 'Sansoft translation generator'})
        with urllib.request.urlopen(request, timeout=60) as response:
            parser = PublicCopyParser()
            parser.feed(response.read().decode('utf-8'))
            result.update(parser.text)
    return sorted(result)

def translate_batch(batch, locale):
    protected = 'SANSOFTBRAND'
    marked = '\n'.join('[%d]\n%s' % (index + 10001, value.replace('Sansoft', protected)) for index, value in enumerate(batch))
    query = urllib.parse.urlencode({'client': 'dict-chrome-ex', 'sl': 'en', 'tl': locale, 'dt': 't', 'q': marked})
    request = urllib.request.Request('https://translate.googleapis.com/translate_a/t?' + query, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(request, timeout=60) as response:
        translated = json.load(response)[0]
    pieces = re.split(r'\[\s*(\d{5})\s*\]', translated)
    found = {int(pieces[index]) - 10001: normalize(pieces[index + 1]).replace(protected, 'Sansoft') for index in range(1, len(pieces) - 1, 2)}
    if len(found) != len(batch) or any(not found.get(index) for index in range(len(batch))):
        raise ValueError('Translation markers changed')
    return {value: found[index] for index, value in enumerate(batch)}

def translate(batch, locale):
    for attempt in range(4):
        try:
            return translate_batch(batch, locale)
        except Exception:
            if attempt == 3:
                if len(batch) > 1:
                    middle = len(batch) // 2
                    return {**translate(batch[:middle], locale), **translate(batch[middle:], locale)}
                raise
            time.sleep(2 ** (attempt + 1))

def batches(values, size=1800):
    batch, length = [], 0
    for value in values:
        if batch and length + len(value) > size:
            yield batch
            batch, length = [], 0
        batch.append(value)
        length += len(value) + 12
    if batch:
        yield batch

sources = public_copy()
print('Collected', len(sources), 'public strings', flush=True)
for locale in LOCALES:
    destination = ROOT / 'src' / 'locales' / (locale + '.json')
    existing = json.loads(destination.read_text()) if destination.exists() else {}
    missing = [value for value in sources if value not in existing]
    work = list(batches(missing))
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        futures = [executor.submit(translate, batch, locale) for batch in work]
        for index, future in enumerate(concurrent.futures.as_completed(futures), 1):
            existing.update(future.result())
            destination.write_text(json.dumps(existing, ensure_ascii=False, indent=2) + '\n')
            print(locale, index, '/', len(work), flush=True)
    print(locale, 'saved', len(existing), flush=True)
