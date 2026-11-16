with open('khroofs_dump.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find all static.wixstatic image links with context
matches = re.findall(r'(https://static\.wixstatic\.com/media/[^"\'\s)]+)', text)
clean_imgs = list(dict.fromkeys(matches))
print(f"Total image URLs found: {len(clean_imgs)}")
for i, url in enumerate(clean_imgs):
    # try to get high-res url by cleaning wix url params
    print(f"{i+1}: {url}")

