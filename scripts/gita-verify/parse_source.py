#!/usr/bin/env python3
"""
Parse the canonical ITRANS Gita source, convert each verse to Devanagari,
diff against the current gita-data.ts, and report mismatches.
"""
import json, re, sys
from indic_transliteration import sanscript
from indic_transliteration.sanscript import SchemeMap, ITRANS, DEVANAGARI

# 1. Load source
with open('scripts/gita-verify/bhagvadnew.json') as f:
    d = json.load(f)
html = d['data']['html']

m = re.search(r'<pre[^>]*>(.*?)</pre>', html, re.DOTALL)
text = m.group(1)
text = text.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"').replace('&#39;', "'")

# 2. Extract verses. Each verse ends with || N\-M|| (sometimes with extra parens for variants)
# Verse text is the preceding lines (typically 2 lines = 2 padas of a shloka).
# We'll walk line by line, collecting lines until we hit a verse-number marker.

lines = text.split('\n')

# Skip header (everything before the first \section{atha prathamo)
start_idx = None
for i, line in enumerate(lines):
    if '\\section{' in line and 'prathamo' in line:
        start_idx = i
        break
if start_idx is None:
    start_idx = 0

# Also stop at any \end{document} or post-content markers
end_idx = len(lines)
for i in range(start_idx, len(lines)):
    if '\\end{document}' in lines[i] or 'End of text' in lines[i] or lines[i].startswith('% End'):
        end_idx = i
        break

# Parse verses
# A verse marker looks like: || 1\-1||  or  || 1\-1|| (variant text)
# Sometimes the marker is on the same line as verse text, sometimes on its own.
verse_marker_re = re.compile(r'\|\|\s*(\d+)\\-(\d+)\s*\|\|')

verses = {}  # (ch, v) -> raw itrans text (concatenated, no markers)
current_buffer = []
current_chapter = None  # track via \section markers
# Chapter from \section{atha ... adhyAyaH ...}
section_re = re.compile(r'\\section\{.*?(\w+)mo\.adhyAyaH\|')

for i in range(start_idx, end_idx):
    line = lines[i]
    # Track chapter via \section markers
    sm = section_re.search(line)
    if sm:
        # Convert word like "prathamo" to 1, "dvitIyo" to 2, etc.
        word_to_num = {
            'prathamo': 1, 'dvitIyo': 2, 'tR^itIyo': 3, 'tRitiyo': 3, 'chaturtho': 4, 'pañchamo': 5,
            'pa~nchamo': 5, 'ShaShTha': 6, 'saptamo': 7, 'aShTamo': 8, 'aShTama': 8, 'navamo': 9,
            'dashamo': 10, 'ekAdasho': 11, 'dvAdasho': 12, 'trayodasho': 13, 'chaturdasho': 14,
            'pa~nchadasho': 15, 'pañchadasho': 15, 'SoDashashcha': 16, 'saptadasho': 17,
            'aShTadasho': 18, 'aShTAdasho': 18,
        }
        for w, n in word_to_num.items():
            if w.lower() in line.lower():
                current_chapter = n
                break

    # Skip header/command lines
    if line.strip().startswith('%') or line.strip().startswith('\\') or not line.strip():
        # but if there's a verse marker embedded, handle it
        m2 = verse_marker_re.search(line)
        if m2:
            ch_found = int(m2.group(1))
            v_found = int(m2.group(2))
            # text before the marker
            before = line[:m2.start()].strip()
            if before:
                current_buffer.append(before)
            # save
            raw = ' '.join(current_buffer)
            # strip variant parens like "(saumadattirjayadrathaH)"
            raw = re.sub(r'\([^)]*\)', '', raw).strip()
            key = (ch_found, v_found)
            if key not in verses:
                verses[key] = raw
            current_buffer = []
        continue

    # Check for verse marker in this line
    m2 = verse_marker_re.search(line)
    if m2:
        ch_found = int(m2.group(1))
        v_found = int(m2.group(2))
        before = line[:m2.start()].strip()
        if before:
            current_buffer.append(before)
        raw = ' '.join(current_buffer)
        raw = re.sub(r'\([^)]*\)', '', raw).strip()
        key = (ch_found, v_found)
        if key not in verses:
            verses[key] = raw
        current_buffer = []
    else:
        # It's a verse line — add to buffer
        # Strip trailing | (pada separator) — keep it for now, we'll handle in conversion
        current_buffer.append(line.strip())

print(f'Extracted {len(verses)} verses from canonical source', file=sys.stderr)

# 3. Convert ITRANS → Devanagari for each verse
# The ITRANS source uses conventions like .h for visarga, ~n for palatal nasal, .n for anusvara, etc.
# indic-transliteration's ITRANS scheme should handle these.

canonical_deva = {}
conversion_errors = []
for (ch, v), raw_itrans in sorted(verses.items()):
    try:
        # Remove the .h after consonants (itrans visarga marker) — actually 'h' with dot
        # indic-transliteration expects standard ITRANS. Let's clean up.
        cleaned = raw_itrans
        # Replace .h with H (visarga) — common ITRANS variant
        # Actually 'visarga' in ITRANS is H or .h. Let's keep .h and let the library handle it.
        # The library should handle both.
        deva = sanscript.transliterate(cleaned, ITRANS, DEVANAGARI)
        canonical_deva[(ch, v)] = deva
    except Exception as e:
        conversion_errors.append(((ch, v), str(e), raw_itrans[:80]))

print(f'Converted {len(canonical_deva)} verses to Devanagari', file=sys.stderr)
if conversion_errors:
    print(f'Conversion errors: {len(conversion_errors)}', file=sys.stderr)
    for (k, e, raw) in conversion_errors[:5]:
        print(f'  {k}: {e} | raw: {raw}', file=sys.stderr)

# Save canonical data
with open('scripts/gita-verify/canonical.json', 'w', encoding='utf-8') as f:
    json.dump({
        'verses': {f'{ch}.{v}': deva for (ch, v), deva in canonical_deva.items()},
        'raw_itrans': {f'{ch}.{v}': raw for (ch, v), raw in verses.items()},
    }, f, ensure_ascii=False, indent=2)

# Print a few samples to verify conversion quality
print('=== Sample conversions ===', file=sys.stderr)
for key in [(1,1), (2,47), (4,7), (9,22), (11,32), (18,66)]:
    if key in canonical_deva:
        ch, v = key
        print(f'{ch}.{v}:', file=sys.stderr)
        print(f'  ITRANS: {verses[key][:120]}', file=sys.stderr)
        print(f'  Deva:   {canonical_deva[key][:120]}', file=sys.stderr)

print(f'\nTotal canonical verses: {len(canonical_deva)}', file=sys.stderr)
