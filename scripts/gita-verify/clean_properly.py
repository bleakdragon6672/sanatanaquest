#!/usr/bin/env python3
"""
Clean canonical verses more thoroughly:
- Strip chapter-end colophon lines ("ॐ तत्सदिति श्रीमद्भगवद्गीता...नाम Xऽध्यायः ॥ N ॥")
  that appear at the START of the first verse of each chapter.
- DO NOT strip "ॐतत्सदिति" from verse 17.23 (that's actual verse content).
- Normalize whitespace and danda placement.
"""
import json, re

with open('scripts/gita-verify/canonical.json', encoding='utf-8') as f:
    canon = json.load(f)['verses']

def clean_canonical(text):
    # 1. Strip chapter-end colophon. The colophon is:
    # "ॐ तत्सदिति श्रीमद्भगवद्गीतासूपनिषत्सु ब्रह्मविद्यायां योगशास्त्रे
    #  श्रीकृष्णार्जुनसंवादे [chapter-name] नाम [ordinal]ऽध्यायः ॥ [number] ॥"
    # It appears at the START of the first verse of each chapter.
    # Pattern: starts with "ॐ तत्सदिति श्रीमद्भगवद्गीता" and ends with "॥ N ॥"
    # where N is a Devanagari numeral.
    colophon_re = re.compile(
        r'^ॐ\s+तत्सदिति\s+श्रीमद्भगवद्गीता.*?नाम\s+\S+ऽध्यायः\s*॥\s*[०-९]+\s*॥\s*',
        re.DOTALL,
    )
    text = colophon_re.sub('', text)
    # Also handle "॥ ८॥" (no space after numeral) and "॥ ११॥"
    colophon_re2 = re.compile(
        r'^ॐ\s+तत्सदिति\s+श्रीमद्भगवद्गीता.*?ऽध्यायः\s*॥\s*[०-९]+॥\s*',
        re.DOTALL,
    )
    text = colophon_re2.sub('', text)
    # Also handle any remaining colophon with looser pattern
    colophon_re3 = re.compile(
        r'^ॐ\s+तत्सदिति\s+श्रीमद्भगवद्गीता.*?ऽध्यायः\s*॥[^।]*?॥\s*',
        re.DOTALL,
    )
    text = colophon_re3.sub('', text)

    # 2. Remove ITRANS artifacts:
    # - "।ह्" (danda + visarga artifact) → "।"
    text = text.replace('।ह्', '।')
    text = re.sub(r'।\s*ह्\s*', '। ', text)
    # - Stray backslashes and hyphens
    text = text.replace('\\', '')
    text = text.replace('\u00ad', '')  # soft hyphen
    # - Remove hyphens that are ITRANS line-wrap artifacts (but keep actual hyphens if any)
    # In Devanagari, hyphens shouldn't appear; remove them
    text = text.replace('-', '')

    # 3. Normalize whitespace
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    text = re.sub(r'[ \t]+', ' ', text)
    lines = [line.strip() for line in text.split('\n')]
    lines = [line for line in lines if line]
    text = ' '.join(lines)  # Join into single line for consistency

    # 4. Normalize danda placement: ensure space before "।" and "॥"
    text = re.sub(r'([क-हऽ])।', r'\1 ।', text)
    text = re.sub(r'([क-हऽ])॥', r'\1 ॥', text)
    # "। ।" → "॥"
    text = re.sub(r'।\s+।', '॥', text)
    # Collapse multiple spaces
    text = re.sub(r'  +', ' ', text)
    text = text.strip()

    return text

# Clean all
cleaned = {}
for vid, text in canon.items():
    cleaned[vid] = clean_canonical(text)

# Save
with open('scripts/gita-verify/canonical-cleaned.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned, f, ensure_ascii=False, indent=2)

# Verify: check that colophons are gone from first-verses
print('Checking first verses after cleaning:')
for vid in ['2.1', '3.1', '4.1', '5.1', '6.1', '7.1', '8.1', '9.1', '10.1', '11.1', '12.1', '13.1', '14.1', '15.1', '16.1', '17.1', '18.1']:
    text = cleaned[vid]
    has_colophon = text.startswith('ॐ') and 'तत्सदिति' in text[:30] and 'श्रीमद्भगवद्गीता' in text[:50]
    status = 'STILL HAS COLOPHON' if has_colophon else 'clean'
    print(f'  {vid}: {status} — {text[:100]}')

# Also check 17.23 (should KEEP its ॐतत्सदिति as it's verse content)
print(f'\n17.23 (should keep ॐतत्सदिति): {cleaned["17.23"][:100]}')
