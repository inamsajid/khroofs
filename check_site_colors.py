with open('khroofs_dump.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Look for color definitions in Wix site model or styles
styles = re.findall(r'<style[^>]*>(.*?)</style>', text, re.DOTALL)
print(f"Total style tags: {len(styles)}")

# Search for color: or background: or fill: or border-color:
colors = re.findall(r'(?:color|background-color|background|border-color|fill)\s*:\s*([^;!}\n]+)', text)
clean_c = []
for c in colors:
    c = c.strip()
    if ('#' in c or 'rgb' in c) and len(c) < 35:
        clean_c.append(c)

from collections import Counter
counts = Counter(clean_c)
print("Top styling colors:")
for c, cnt in counts.most_common(25):
    print(f"  {cnt}x : {c}")

