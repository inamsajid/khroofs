import re

with open('khroofs_dump.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

print('HTML length:', len(html))
title = re.search(r'<title>(.*?)</title>', html, re.I)
print('Title:', title.group(1) if title else 'None')

# CSS colors
hex_colors = re.findall(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b', html)
from collections import Counter
c = Counter(hex_colors)
print('Top Hex colors:', c.most_common(20))

# Look for css variables
css_vars = re.findall(r'(--[\w-]+:\s*[^;}]+)', html)
print('CSS Vars count:', len(css_vars))
for var in css_vars[:20]:
    print('  ', var.strip())

# Look for images
images = re.findall(r'src=["\']([^"\']+\.(?:png|jpg|jpeg|svg|webp))["\']', html, re.I)
print('Images count:', len(images))
for img in list(dict.fromkeys(images))[:20]:
    print('  img:', img)

# Headings
h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.I | re.S)
print('H1s:', [re.sub(r'<[^>]+>', '', h).strip() for h in h1s])

h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.I | re.S)
print('H2s:', [re.sub(r'<[^>]+>', '', h).strip() for h in h2s][:15])

h3s = re.findall(r'<h3[^>]*>(.*?)</h3>', html, re.I | re.S)
print('H3s:', [re.sub(r'<[^>]+>', '', h).strip() for h in h3s][:15])

# Nav links
nav_links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html, re.I | re.S)
clean_nav = []
for href, text in nav_links:
    t = re.sub(r'<[^>]+>', '', text).strip()
    if t and len(t) < 40 and not t.startswith('{'):
        clean_nav.append((href, t))
print('Nav/Links sample:', list(dict.fromkeys(clean_nav))[:25])

