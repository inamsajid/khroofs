import re

with open('khroofs_dump.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

media_ids = [
    "950a2a_5a4e4c37c0d44d5f89b7fdf182ffdd90~mv2.jpeg",
    "950a2a_47381403c98f4fd68ed43f12673c21fb~mv2.jpeg",
    "950a2a_87e94f50d3814d02b02b748b0116afa3~mv2.jpg",
    "950a2a_343fc51c13af4da49b873c54d1bd66ce~mv2.jpg",
    "950a2a_d8e19eb8031647eb86ea5ebc500d4849~mv2.jpg",
    "950a2a_152e893f98d546e091be372b0bc861b3~mv2.jpg",
    "950a2a_44b9e665c14347bf93b4599b643dfb6a~mv2.jpg",
    "950a2a_b53bb19dcf3149688322276eaa54da2e~mv2.jpg",
    "950a2a_53ab8fd369c84d8bae90c1412ae20465~mv2.jpg",
    "950a2a_471a2faa8ccf48a3a4a9b4c05e4aa097~mv2.png",
    "950a2a_1a6573f698674625834135c3bd1601d8~mv2.jpg",
    "950a2a_10e126172ca94d28aed6441f7d6badb6~mv2.jpg",
    "950a2a_c01525e0935c42e2b3034f7db6db455a~mv2.jpg",
    "950a2a_d4db0be719c54ca9a0ce196d17e55d04~mv2.jpg",
    "950a2a_3cc7ed5ef8f74a949805b310c8abc01f~mv2.jpg",
    "950a2a_87648f788d4b4bfcb68e7eda584b633f~mv2.png",
    "950a2a_a409fb067acf43449699bf3c4ac96dc0~mv2.png",
    "950a2a_8af7e6d3059d4f25b63b7f65caad434e~mv2.jpeg",
    "950a2a_e52b3a722e894e6ebcc302553a9faa20~mv2.jpg",
    "950a2a_65088fcd6f954d5bb754da1ffbc5422d~mv2.png",
    "950a2a_af302961271d4aec973b252fac1e2f78~mv2.jpg",
    "950a2a_2f9eed45a1ee4ab3b1fc767183300221~mv2.jpg",
]

for m in media_ids:
    idx = text.find(m)
    if idx != -1:
        start = max(0, idx - 150)
        end = min(len(text), idx + 250)
        snippet = text[start:end]
        alt = re.search(r'alt=["\']([^"\']*)["\']', snippet)
        title = re.search(r'title=["\']([^"\']*)["\']', snippet)
        print(f"[{m}]")
        print(f"   alt: {alt.group(1) if alt else 'None'} | title: {title.group(1) if title else 'None'}")

