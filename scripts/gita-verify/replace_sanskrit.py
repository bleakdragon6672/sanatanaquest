#!/usr/bin/env python3
"""
Replace ALL Sanskrit in gita-data.ts with cleaned canonical text.
Keep English translations and meanings as-is.
Keep the current 700-verse structure (Ch1: 1.1-1.46, Ch2: 2.1-2.72, etc.).
Do NOT add 1.47 (the transitional verse lives only at 2.1 in our structure).
"""
import json, re

# Load cleaned canonical
with open('scripts/gita-verify/canonical-cleaned.json', encoding='utf-8') as f:
    cleaned_canon = json.load(f)

print(f'Canonical verses: {len(cleaned_canon)}')

# Read current gita-data.ts
with open('src/lib/gita-data.ts', encoding='utf-8') as f:
    src = f.read()

def ts_escape(s):
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')

replacements = 0
missing_canon = []

def replace_verse_sanskrit(match):
    global replacements
    full = match.group(0)
    vid = match.group(1)
    if vid not in cleaned_canon:
        missing_canon.append(vid)
        return full
    canon_text = cleaned_canon[vid]
    escaped = ts_escape(canon_text)
    new = re.sub(
        r'(sanskrit:\s*")((?:[^"\\]|\\.)*)(")',
        lambda m: m.group(1) + escaped + m.group(3),
        full,
        count=1,
    )
    replacements += 1
    return new

verse_obj_re = re.compile(
    r'\{\s*id:\s*"(\d+\.\d+)",\s*chapter:\s*\d+,\s*verse:\s*\d+,\s*sanskrit:\s*"(?:[^"\\]|\\.)*",\s*transliteration:\s*"(?:[^"\\]|\\.)*",\s*english:\s*"(?:[^"\\]|\\.)*"(?:,\s*meaning:\s*"(?:[^"\\]|\\.)*")?\s*\}',
    re.DOTALL,
)

new_src = verse_obj_re.sub(replace_verse_sanskrit, src)

print(f'Replaced Sanskrit in {replacements} verses')
if missing_canon:
    print(f'Verses missing from canonical (kept original): {missing_canon}')

# Update header comment
new_src = new_src.replace(
    '// Bhagavad Gita — Complete: all 700 verses (canonical standard).',
    '// Bhagavad Gita — 700 verses. Sanskrit verified against sanskritdocuments.org (bhagvadnew.itx).',
)

with open('src/lib/gita-data.ts', 'w', encoding='utf-8') as f:
    f.write(new_src)

print('Wrote updated gita-data.ts')
verse_count = len(re.findall(r'id:\s*"\d+\.\d+"', new_src))
print(f'Total verse entries: {verse_count}')
