#!/usr/bin/env python3
"""Generate Sanskrit audio for all Upanishad verses using Edge TTS."""
import asyncio
import os
import re

def extract_upanishad_verses(ts_path):
    with open(ts_path, 'r') as f:
        content = f.read()
    pattern = re.compile(r'id:\s*`((?:isha|katha|mandukya)\.[^`]+)`[^}]*?sanskrit:\s*`([^`]+)`', re.DOTALL)
    verses = []
    for m in pattern.finditer(content):
        vid = m.group(1)
        sanskrit = m.group(2).replace('\\n', ' ').replace('\n', ' ').strip()
        # Remove IAST-style markers
        sanskrit = re.sub(r'\s+', ' ', sanskrit).strip()
        if sanskrit:
            verses.append((vid, sanskrit))
    return verses

async def main():
    import edge_tts
    ts_path = '/Users/samarthrao/prodgita/src/lib/upanishad-data.ts'
    output_dir = '/Users/samarthrao/prodgita/public/audio/upanishads'
    voice = 'hi-IN-MadhurNeural'
    rate = '-15%'
    
    os.makedirs(output_dir, exist_ok=True)
    verses = extract_upanishad_verses(ts_path)
    print(f"Found {len(verses)} Upanishad verses to generate")
    
    success = skipped = failed = 0
    for i, (vid, text) in enumerate(verses):
        out_path = os.path.join(output_dir, f"{vid}.mp3")
        if os.path.exists(out_path):
            skipped += 1
            continue
        try:
            communicate = edge_tts.Communicate(text, voice, rate=rate)
            await communicate.save(out_path)
            success += 1
            if success <= 3 or success % 20 == 0:
                print(f"  [{i+1}/{len(verses)}] {vid}: ✅")
        except Exception as e:
            failed += 1
            print(f"  [{i+1}/{len(verses)}] {vid}: ❌ {str(e)[:50]}")
    
    total = sum(os.path.getsize(os.path.join(output_dir, f)) for f in os.listdir(output_dir) if f.endswith('.mp3'))
    print(f"\nDone! Generated: {success}, Skipped: {skipped}, Failed: {failed}")
    print(f"Total size: {total / (1024*1024):.1f} MB")

if __name__ == '__main__':
    asyncio.run(main())
