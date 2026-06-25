#!/usr/bin/env python3
"""
Diff canonical Sanskrit (from sanskritdocuments.org) against current gita-data.ts.
Report mismatches and produce a fixes file.
"""
import json, re, sys, unicodedata

# Load canonical
with open('scripts/gita-verify/canonical.json', encoding='utf-8') as f:
    canon = json.load(f)
canonical_verses = canon['verses']  # {"1.1": "धृतराष्ट्र...", ...}
print(f'Canonical verses loaded: {len(canonical_verses)}', file=sys.stderr)

# Load current gita-data.ts
with open('src/lib/gita-data.ts', encoding='utf-8') as f:
    src = f.read()

# Parse current verses
pattern = re.compile(
    r'\{\s*id:\s*"(\d+\.\d+)",\s*chapter:\s*(\d+),\s*verse:\s*(\d+),\s*sanskrit:\s*"((?:[^"\\]|\\.)*)",',
    re.DOTALL,
)
current_verses = {}
for m in pattern.finditer(src):
    vid = m.group(1)
    sk = m.group(4)
    # Unescape
    sk = sk.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
    current_verses[vid] = sk

print(f'Current verses loaded: {len(current_verses)}', file=sys.stderr)

# Normalize function: remove all whitespace, dandas (।), double dandas (॥),
# avagraha (ऽ), and other punctuation for comparison
def normalize(s):
    # Remove speaker prefixes like "धृतराष्ट्र उवाच" — actually keep them, they're part of the verse
    # in the canonical source too
    # Remove whitespace
    s = re.sub(r'\s+', '', s)
    # Remove dandas and double dandas
    s = s.replace('।', '').replace('॥', '')
    # Remove avagraha (ऽ) — it's an optional sandhi marker; some editions include, some don't
    s = s.replace('ऽ', '')
    # Remove other punctuation
    s = re.sub(r'[|\-]', '', s)
    # NFC normalize
    s = unicodedata.normalize('NFC', s)
    return s

# Compare
matches = []
mismatches = []
missing_in_current = []
missing_in_canonical = []

# Get all verse ids from both
all_ids = sorted(set(list(canonical_verses.keys()) + list(current_verses.keys())),
                 key=lambda x: tuple(int(p) for p in x.split('.')))

for vid in all_ids:
    in_canon = vid in canonical_verses
    in_current = vid in current_verses
    if not in_canon:
        missing_in_canonical.append(vid)
        continue
    if not in_current:
        missing_in_current.append(vid)
        continue
    canon_norm = normalize(canonical_verses[vid])
    curr_norm = normalize(current_verses[vid])
    if canon_norm == curr_norm:
        matches.append(vid)
    else:
        mismatches.append({
            'id': vid,
            'canonical': canonical_verses[vid],
            'current': current_verses[vid],
            'canonical_normalized': canon_norm,
            'current_normalized': curr_norm,
        })

print(f'\n=== DIFF SUMMARY ===', file=sys.stderr)
print(f'Exact matches:    {len(matches)}', file=sys.stderr)
print(f'Mismatches:       {len(mismatches)}', file=sys.stderr)
print(f'Missing in current (in canon only): {len(missing_in_current)}', file=sys.stderr)
print(f'Missing in canonical (in current only): {len(missing_in_canonical)}', file=sys.stderr)

# Report mismatches in detail (first 30)
print(f'\n=== FIRST 30 MISMATCHES ===', file=sys.stderr)
for mm in mismatches[:30]:
    print(f'\n--- {mm["id"]} ---', file=sys.stderr)
    print(f'  CANON: {mm["canonical"][:200]}', file=sys.stderr)
    print(f'  CURR:  {mm["current"][:200]}', file=sys.stderr)
    # Show character-level diff (first difference)
    c = mm['canonical_normalized']
    u = mm['current_normalized']
    # Find first diff position
    for i in range(min(len(c), len(u))):
        if c[i] != u[i]:
            start = max(0, i-15)
            print(f'  First diff at char {i}:', file=sys.stderr)
            print(f'    canon: ...{c[start:i+15]}...', file=sys.stderr)
            print(f'    curr:  ...{u[start:i+15]}...', file=sys.stderr)
            break
    else:
        # One is prefix of the other
        print(f'  Length diff: canon={len(c)} curr={len(u)}', file=sys.stderr)
        if len(c) > len(u):
            print(f'    canon extra: ...{c[len(u):][:60]}...', file=sys.stderr)
        else:
            print(f'    curr extra: ...{u[len(c):][:60]}...', file=sys.stderr)

# Save full report
report = {
    'summary': {
        'exact_matches': len(matches),
        'mismatches': len(mismatches),
        'missing_in_current': missing_in_current,
        'missing_in_canonical': missing_in_canonical,
        'total_canonical': len(canonical_verses),
        'total_current': len(current_verses),
    },
    'mismatches': mismatches,
    'matches': matches,
}
with open('scripts/gita-verify/diff-report.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print(f'\nFull report saved to scripts/gita-verify/diff-report.json', file=sys.stderr)
