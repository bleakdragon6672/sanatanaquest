#!/usr/bin/env python3
"""
Replace ALL Sanskrit in gita-data.ts with the cleaned canonical text from
sanskritdocuments.org. Keep English translations as-is.

Key decisions:
- The canonical source has 701 verses (1.47 = transitional verse, and 2.1 = same verse).
  My app currently uses 700 verses (transitional verse only at 1.47, since I removed
  the 2.1 duplicate earlier). I'll keep my 700-verse structure (canonical for 1.47
  stays, and for 2.1 I use canonical 2.1's text which is the SAME verse — but since
  I only have one slot, I'll use the canonical 2.1 text for my 2.1... wait, my 2.1
  IS the transitional verse. Let me check.

Actually, looking at the canonical source: 1.47 = "sañjaya uvāca... taṃ tathā kṛpayāviṣṭam..."
and 2.1 = the SAME text (the colophon line precedes it). So canonical 1.47 == canonical 2.1.

My current app has 1.47 = that transitional verse (correct), and NO 2.1 (since I removed it).
My chapter 2 starts at 2.2 in my numbering, but the canonical source's 2.2 is "kutas tvā...".
Wait — earlier I "fixed" the renumbering so my 2.1 = canonical 2.2 ("kutas tvā...").
But canonical 2.1 = the transitional verse (same as 1.47).

So if I align to canonical: my 2.1 should = canonical 2.2, my 2.2 = canonical 2.3, etc.
But canonical has 72 verses in Ch 2 (2.1 through 2.72), and I only have 71 (2.1 through 2.71).

Hmm. The cleanest fix: use canonical 2.2 through 2.72 for my 2.1 through 2.71.
That means my Ch 2 = canonical's 2.2-2.72 (71 verses). Total = 46 (Ch1) + 71 (Ch2) + ... = 700.

Wait, but my Ch 1 has 46 verses (1.1-1.46), and canonical has 47 (1.1-1.47). My 1.46
is canonical 1.46, and canonical 1.47 = the transitional verse which I do NOT have.
But earlier verification showed my 1.46 = "सञ्जय उवाच। एवमुक्त्वार्जुनः..." which is
canonical 1.46. So my Ch 1 ends at 1.46 (46 verses), and the transitional verse is NOT
in my Ch 1.

Hmm wait, let me re-check. Earlier output said my 1.46 = canonical 1.46 ("एवमुक्त्वार्जुनः
सङ्ख्ये रथोपस्थ उपाविशत्") — but the canonical 1.46 is "यदि मामप्रतीकारमशस्त्रं...".
Let me look again at the diff:

  1.46:
    CANON: यदि मामप्रतीकारमशस्त्रं शस्त्रपाणयः । धार्तराष्ट्रा रणे हन्युस्तन्मे क्षेमतरं भवेत्
    CURR:  सञ्जय उवाच। एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्। विसृज्य सशरं चापं शोकसम्पिन्नमानसः॥

So my 1.46 = canonical 1.47 content! And my 1.45 = canonical 1.46 content.
So my Chapter 1 is ALSO shifted by 1 — my 1.N = canonical 1.(N+1) for the last several verses.

Wait no — earlier the shift analysis showed:
  My 1.40 = Canonical 1.41
  My 1.42 = Canonical 1.43
  My 1.43 = Canonical 1.44
  My 1.45 = Canonical 1.46

So from 1.40 onward, my numbering is shifted. Let me check 1.1-1.39:
Looking at the diff, 1.1, 1.2 match. But 1.3-1.6 have verse-split differences (not shifts).
Then 1.7-1.18 might match... Actually the categorization showed only 36 shifts total, 4 in Ch1.

OK this is getting complex. Let me take the simplest, most reliable approach:

**Strategy: For every verse ID in my current data, replace its Sanskrit with the canonical
Sanskrit for that SAME verse ID.** Where my verse ID doesn't exist in canonical (shouldn't
happen except for the 1.47/2.1 overlap), skip. Where canonical has a verse ID I don't have
(only 1.47), skip.

This means:
- My 1.1 → canonical 1.1
- My 1.2 → canonical 1.2
- ...
- My 1.46 → canonical 1.46 (NOT 1.47)
- My 2.1 → canonical 2.1 (which is the transitional verse, same as canonical 1.47)
- My 2.2 → canonical 2.2
- ...
- My 2.71 → canonical 2.71

Wait, but canonical has 2.72 too. And I only have up to 2.71. Let me check: my Ch 2 has 71 verses (2.1-2.71). Canonical Ch 2 has 72 verses (2.1-2.72). So I'm missing canonical 2.72.

Hmm, but the total needs to be 700. If I add 1.47 AND keep 2.1-2.72, that's 47+72 = 119 for Ch1+2, plus 581 for Ch3-18 = 700. But 1.47 and 2.1 are the SAME verse text in canonical, so that's a duplicate.

OK let me think about this differently. The user wants EXACTLY the canonical 700 verses.
The canonical source (Gita Press convention) has 701 verse entries, but 1.47 and 2.1 are
the same verse. So the actual UNIQUE verse count is 700.

The cleanest solution: use canonical verse IDs as-is (1.1-1.47, 2.1-2.72, etc.) but
deduplicate the 1.47/2.1 overlap by keeping only ONE of them. Since the user's table
says Ch 1 = 47 verses and Ch 2 = 72, but those sum to 119 (one over), I'll follow the
Gita Press convention: keep 1.47 AND 2.1 as separate entries (both with the same text),
giving 47+72 = 119, total 701. But the user wants 700...

Actually, you know what, let me just look at what the user's table says and match it
exactly, even if it means one verse is technically duplicated. The user said:
  Ch 1: 47, Ch 2: 72, ..., Total: 700
47+72 = 119, but 119 + 581 (Ch3-18) = 700. So the user's own table has 700 total
with Ch1=47 and Ch2=72. This is only possible if one verse is NOT counted twice.

The standard resolution: Ch 1 has 47 verses (including 1.47 = transitional), Ch 2 has
72 verses (2.1-2.72), but 1.47 and 2.1 are the same verse, so unique = 700.

I'll go with: my app has 700 verse SLOTS, matching the user's table. The structure:
  Ch 1: 1.1 - 1.47 (47 verses) — BUT I currently only have 1.1-1.46!
  Ch 2: 2.1 - 2.72 (72 verses) — BUT I currently only have 2.1-2.71!

So I'm missing 1.47 and 2.72. Let me add those.

Actually wait — let me re-read my current data. Earlier I "fixed" things by removing 1.47
and renumbering Ch 2. Let me check what I actually have now:
"""
import json, re

# Load cleaned canonical
with open('scripts/gita-verify/canonical-cleaned.json', encoding='utf-8') as f:
    cleaned_canon = json.load(f)

# Load current gita-data.ts verse IDs
with open('src/lib/gita-data.ts', encoding='utf-8') as f:
    src = f.read()
pattern = re.compile(r'\{\s*id:\s*"(\d+\.\d+)",')
current_ids = set()
for m in pattern.finditer(src):
    current_ids.add(m.group(1))

print(f'Current verse count: {len(current_ids)}')
print(f'Canonical verse count: {len(cleaned_canon)}')

# Check what's in canonical but not in current
canon_only = set(cleaned_canon.keys()) - current_ids
print(f'In canonical but not current: {sorted(canon_only, key=lambda x: tuple(int(p) for p in x.split(".")))}')

# Check what's in current but not in canonical
curr_only = current_ids - set(cleaned_canon.keys())
print(f'In current but not canonical: {sorted(curr_only, key=lambda x: tuple(int(p) for p in x.split(".")))}')

# Count per chapter
from collections import Counter
curr_by_ch = Counter(int(v.split('.')[0]) for v in current_ids)
canon_by_ch = Counter(int(v.split('.')[0]) for v in cleaned_canon.keys())
print('\nPer-chapter comparison (current / canonical):')
for ch in sorted(set(list(curr_by_ch.keys()) + list(canon_by_ch.keys()))):
    print(f'  Ch {ch}: {curr_by_ch.get(ch,0)} / {canon_by_ch.get(ch,0)}')
