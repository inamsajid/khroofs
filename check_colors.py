import re

with open('khroofs_dump.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's inspect CSS color variables or styles
wix_colors = re.findall(r'--color_[0-9]+:\s*([^;]+);', html)
print('Wix color variables:', wix_colors[:20])

# Look for specific color definitions in style tags or json
color_palette = re.findall(r'"color":\s*"([^"]+)"', html)
print('Color references in json:', list(set(color_palette))[:20])

# Let's find background colors and text colors
bg_matches = re.findall(r'background(?:-color)?:\s*([^;!"]+)', html)
print('Common backgrounds:', list(dict.fromkeys(bg_matches))[:15])

# Find image URLs in the site to inspect logos and projects
img_srcs = re.findall(r'https://static\.wixstatic\.com/media/[^\s"\'\)]+', html)
unique_imgs = list(dict.fromkeys(img_srcs))
print(f'Total wix images: {len(unique_imgs)}')
for u in unique_imgs[:15]:
    print(' ', u)

