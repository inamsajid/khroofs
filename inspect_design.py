import re

with open('khroofs_dump.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's inspect where #FFC917 or #242222 or #ed412b are used
for m in re.finditer(r'([^{}]*\{[^{}]*(?:#FFC917|#242222|250,196,97|#ffeeee|#55aeed)[^{}]*\})', html, re.I):
    print("Match CSS rule:", m.group(1)[:150])

# Let's check the logo specifically
logo_candidates = re.findall(r'<img[^>]+(?:logo|header|brand|title)[^>]*>', html, re.I)
print("Logo candidates:", logo_candidates)

# Check all img tags with their alt, id, class, src
all_imgs = re.findall(r'<img\s+([^>]+)>', html, re.I)
print(f"Total img tags: {len(all_imgs)}")
for img in all_imgs[:15]:
    src = re.search(r'src=["\']([^"\']+)["\']', img)
    alt = re.search(r'alt=["\']([^"\']*)["\']', img)
    print("IMG -> src:", src.group(1) if src else "None", "| alt:", alt.group(1) if alt else "None")

