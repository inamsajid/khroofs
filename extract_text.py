import re

with open('khroofs_dump.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's search for text contents
text_blocks = re.findall(r'<(?:p|span|h1|h2|h3|h4|h5|li)[^>]*>(.*?)</(?:p|span|h1|h2|h3|h4|h5|li)>', html, re.DOTALL)
clean_blocks = []
for block in text_blocks:
    # strip inner tags
    t = re.sub(r'<[^>]+>', ' ', block).strip()
    t = re.sub(r'\s+', ' ', t)
    t = t.replace('&nbsp;', ' ').replace('&#39;', "'").replace('&amp;', '&').replace('&quot;', '"')
    if len(t) > 15 and not t.startswith('{') and not t.startswith('var ') and not 'function()' in t:
        clean_blocks.append(t)

clean_blocks = list(dict.fromkeys(clean_blocks))
print(f"Found {len(clean_blocks)} clean blocks:\n")
for i, b in enumerate(clean_blocks[:80]):
    print(f"[{i+1}] {b}\n")
