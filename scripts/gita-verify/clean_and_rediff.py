#!/usr/bin/env python3
"""
Clean the canonical Sanskrit verses:
1. Remove chapter-end colophon lines (the "ॐ तत्सदिति श्रीमद्भगवद्गीता..." lines)
2. Normalize speaker prefixes (keep "X उवाच ।" at start, on same line)
3. Remove ITRANS conversion artifacts (।ह् visarga-after-danda, stray backslashes, \- hyphens)
4. Normalize whitespace and danda placement
5. Re-run diff to confirm 100% match (modulo formatting)
"""
import json, re, sys

with open('scripts/gita-verify/canonical.json', encoding='utf-8') as f:
    canon = json.load(f)['verses']

# Load current gita-data.ts to know what verses we need to update
with open('src/lib/gita-data.ts', encoding='utf-8') as f:
    src = f.read()

pattern = re.compile(
    r'\{\s*id:\s*"(\d+\.\d+)",\s*chapter:\s*(\d+),\s*verse:\s*(\d+),\s*sanskrit:\s*"((?:[^"\\]|\\.)*)",',
    re.DOTALL,
)
current_verses = {}
for m in pattern.finditer(src):
    vid = m.group(1)
    sk = m.group(4).replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
    current_verses[vid] = sk

def clean_canonical(text):
    """Clean a canonical verse text."""
    # 1. Remove chapter-end colophon. The colophon starts with "ॐ तत्सदिति श्रीमद्भगवद्गीता"
    # and ends with "नाम Xऽध्यायः ॥ X ॥" then the actual verse begins.
    colophon_re = re.compile(r'ॐ\s*तत्सदिति\s*श्रीमद्भगवद्गीता.*?नाम\s+\w+ऽध्यायः\s*॥\s*\d+\s*॥\s*', re.DOTALL)
    text = colophon_re.sub('', text)

    # 2. Remove ITRANS conversion artifacts:
    # - "।ह्" (danda + visarga artifact) → just "।"
    text = text.replace('।ह्', '।')
    # - "।ह्\n" → "।\n"
    # - Stray backslashes and hyphens from ITRANS line-wrapping
    text = text.replace('\\', '')
    text = text.replace('\-', '')
    # - "।ह्" might also appear as "। ह्" — handle that
    text = re.sub(r'।\s*ह्\s*', '। ', text)

    # 3. Normalize whitespace: collapse runs of whitespace into single space,
    # but preserve line breaks for multi-line verses
    # First, normalize line endings
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    # Collapse spaces (not newlines)
    text = re.sub(r'[ \t]+', ' ', text)
    # Remove leading/trailing whitespace on each line
    lines = [line.strip() for line in text.split('\n')]
    # Remove empty lines
    lines = [line for line in lines if line]
    text = '\n'.join(lines)

    # 4. Normalize danda placement: ensure space before "।" and "॥" is consistent
    # Pattern: word। → word । (space before danda)
    text = re.sub(r'([क-हऽ])।', r'\1 ।', text)
    text = re.sub(r'([क-हऽ])॥', r'\1 ॥', text)
    # But "। ।" (double danda with space) should be "॥"
    text = re.sub(r'।\s+।', '॥', text)
    # Collapse multiple spaces
    text = re.sub(r'  +', ' ', text)
    # Strip
    text = text.strip()

    return text

# Clean all canonical verses
cleaned_canon = {}
for vid, text in canon.items():
    cleaned = clean_canonical(text)
    cleaned_canon[vid] = cleaned

# Save cleaned canonical
with open('scripts/gita-verify/canonical-cleaned.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_canon, f, ensure_ascii=False, indent=2)

# Now re-run the diff with cleaned canonical
def normalize_for_diff(s):
    s = re.sub(r'\s+', '', s)
    s = s.replace('।', '').replace('॥', '').replace('ऽ', '')
    s = re.sub(r'[|\-\\]', '', s)
    return s

matches = 0
mismatches = []
for vid, curr_text in current_verses.items():
    if vid not in cleaned_canon:
        mismatches.append({'id': vid, 'reason': 'not in canonical', 'canonical': '(missing)', 'current': curr_text})
        continue
    canon_text = cleaned_canon[vid]
    if normalize_for_diff(canon_text) == normalize_for_diff(curr_text):
        matches += 1
    else:
        mismatches.append({
            'id': vid,
            'canonical': canon_text,
            'current': curr_text,
        })

print(f'After cleaning canonical:', file=sys.stderr)
print(f'  Matches: {matches}/{len(current_verses)}', file=sys.stderr)
print(f'  Mismatches: {len(mismatches)}', file=sys.stderr)

# Show first 20 mismatches
print(f'\n=== Remaining mismatches (first 30) ===', file=sys.stderr)
for mm in mismatches[:30]:
    print(f'\n{mm["id"]}:', file=sys.stderr)
    print(f'  CANON: {mm["canonical"][:180]}', file=sys.stderr)
    print(f'  CURR:  {mm["current"][:180]}', file=sys.stderr)

# Save the cleaned canonical + diff
with open('scripts/gita-verify/diff-after-clean.json', 'w', encoding='utf-8') as f:
    json.dump({
        'matches': matches,
        'mismatches': mismatches,
        'cleaned_canon': cleaned_canon,
    }, f, ensure_ascii=False, indent=2)

print(f'\nSaved cleaned canonical + diff to scripts/gita-verify/diff-after-clean.json', file=sys.stderr)
