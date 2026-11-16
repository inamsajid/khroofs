import re

with open('khroofs_dump.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Let's inspect the gallery / projects section in the HTML
# Search for gallery items or project items
gallery_matches = re.findall(r'<div[^>]+id=["\'](?:gallery|portfolio|projects|comp-[^"\']+)["\'][^>]*>.*?</div>', text, re.I | re.DOTALL)
print(f"Gallery matches: {len(gallery_matches)}")

# Let's find image filenames and their media IDs
media_ids = re.findall(r'media/([a-zA-Z0-9_]+~mv2\.(?:jpg|jpeg|png|webp))', text)
unique_media = list(dict.fromkeys(media_ids))
print(f"Unique media count: {len(unique_media)}")
for m in unique_media:
    print("Media:", m)

