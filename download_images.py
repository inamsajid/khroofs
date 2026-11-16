import os
import urllib.request

os.makedirs('public/images', exist_ok=True)

media_ids = [
    ("logo_or_hero_1.jpg", "https://static.wixstatic.com/media/950a2a_47381403c98f4fd68ed43f12673c21fb~mv2.jpeg/v1/fill/w_800,h_500,q_85/img.jpg"),
    ("about_img.jpg", "https://static.wixstatic.com/media/950a2a_5a4e4c37c0d44d5f89b7fdf182ffdd90~mv2.jpeg/v1/fill/w_1000,h_800,q_85/img.jpg"),
    ("project_1.jpg", "https://static.wixstatic.com/media/950a2a_87e94f50d3814d02b02b748b0116afa3~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_2.jpg", "https://static.wixstatic.com/media/950a2a_343fc51c13af4da49b873c54d1bd66ce~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_3.jpg", "https://static.wixstatic.com/media/950a2a_d8e19eb8031647eb86ea5ebc500d4849~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_4.jpg", "https://static.wixstatic.com/media/950a2a_152e893f98d546e091be372b0bc861b3~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_5.jpg", "https://static.wixstatic.com/media/950a2a_44b9e665c14347bf93b4599b643dfb6a~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_6.jpg", "https://static.wixstatic.com/media/950a2a_b53bb19dcf3149688322276eaa54da2e~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_7.jpg", "https://static.wixstatic.com/media/950a2a_53ab8fd369c84d8bae90c1412ae20465~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_8.jpg", "https://static.wixstatic.com/media/950a2a_1a6573f698674625834135c3bd1601d8~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_9.jpg", "https://static.wixstatic.com/media/950a2a_10e126172ca94d28aed6441f7d6badb6~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_10.jpg", "https://static.wixstatic.com/media/950a2a_c01525e0935c42e2b3034f7db6db455a~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_11.jpg", "https://static.wixstatic.com/media/950a2a_d4db0be719c54ca9a0ce196d17e55d04~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("project_12.jpg", "https://static.wixstatic.com/media/950a2a_3cc7ed5ef8f74a949805b310c8abc01f~mv2.jpg/v1/fill/w_800,h_600,q_85/img.jpg"),
    ("banner_or_footer.jpg", "https://static.wixstatic.com/media/950a2a_2f9eed45a1ee4ab3b1fc767183300221~mv2.jpg/v1/fill/w_1000,h_500,q_85/img.jpg"),
]

req_headers = {'User-Agent': 'Mozilla/5.0'}
for fname, url in media_ids:
    dest = os.path.join('public/images', fname)
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req, timeout=10) as resp, open(dest, 'wb') as out:
            out.write(resp.read())
        print(f"Downloaded {fname} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Failed {fname}: {e}")

