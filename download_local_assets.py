import os
import urllib.request

os.makedirs('assets/images', exist_ok=True)

images_to_download = [
    # About Section
    ("about_craftsman.jpg", "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85"),
    
    # Projects Gallery
    ("project_slate_didsbury.jpg", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=85"),
    ("project_epdm_cheadle.jpg", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"),
    ("project_tile_rochdale.jpg", "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=900&q=85"),
    ("project_gutters_prestwich.jpg", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=85"),
    ("project_storm_openshaw.jpg", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85"),
    ("project_dormer_wilmslow.jpg", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85"),
    
    # Hero roofer thumbnail / banner
    ("hero_roofer.jpg", "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=85"),
]

req_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in images_to_download:
    dest = os.path.join('assets/images', fname)
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req, timeout=12) as resp, open(dest, 'wb') as out:
            out.write(resp.read())
        print(f"SUCCESS: {fname} -> {os.path.getsize(dest)} bytes")
    except Exception as e:
        print(f"ERROR downloading {fname}: {e}")

