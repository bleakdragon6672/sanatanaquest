#!/usr/bin/env python3
"""Generate Sanskrit audio for all 700 Bhagavad Gita verses using Edge TTS."""
import asyncio
import os
import re
import sys

# Parse all verse Sanskrit text from the TypeScript data file
def extract_verses(ts_path):
    """Extract (verse_id, sanskrit_text) from gita-data.ts."""
    with open(ts_path, 'r') as f:
        content = f.read()
    
    # Match: id: "1.1", ... sanskrit: "..."
    pattern = re.compile(
        r'id:\s*"(\d+\.\d+)"[^}]*?sanskrit:\s*"([^"]+)"',
        re.DOTALL
    )
    verses = []
    for m in pattern.finditer(content):
        vid = m.group(1)
        sanskrit = m.group(2).replace('\\n', ' ').replace('\n', ' ').strip()
        verses.append((vid, sanskrit))
    return verses

async def generate_verse(vid, text, output_dir, voice, rate):
    """Generate audio for a single verse."""
    import edge_tts
    
    out_path = os.path.join(output_dir, f"{vid}.mp3")
    if os.path.exists(out_path):
        return vid, True, "skipped"
    
    try:
        communicate = edge_tts.Communicate(text, voice, rate=rate)
        await communicate.save(out_path)
        return vid, True, "ok"
    except Exception as e:
        return vid, False, str(e)

async def main():
    ts_path = '/Users/samarthrao/prodgita/src/lib/gita-data.ts'
    output_dir = '/Users/samarthrao/prodgita/public/audio/gita'
    voice = 'hi-IN-MadhurNeural'
    rate = '-15%'  # Slower for devotional recitation
    
    os.makedirs(output_dir, exist_ok=True)
    
    verses = extract_verses(ts_path)
    print(f"Found {len(verses)} verses to generate")
    print(f"Voice: {voice}, Rate: {rate}")
    print(f"Output: {output_dir}")
    print()
    
    success = 0
    failed = 0
    skipped = 0
    
    for i, (vid, text) in enumerate(verses):
        vid_result, ok, msg = await generate_verse(vid, text, output_dir, voice, rate)
        
        if msg == "skipped":
            skipped += 1
            if skipped <= 3 or skipped % 100 == 0:
                print(f"  [{i+1}/{len(verses)}] {vid}: skipped (exists)")
        elif ok:
            success += 1
            if success <= 5 or success % 50 == 0:
                print(f"  [{i+1}/{len(verses)}] {vid}: ✅ generated")
        else:
            failed += 1
            print(f"  [{i+1}/{len(verses)}] {vid}: ❌ {msg[:60]}")
    
    print(f"\n{'='*50}")
    print(f"Done! Generated: {success}, Skipped: {skipped}, Failed: {failed}")
    print(f"Total files: {success + skipped}")
    
    # Show total size
    total_size = sum(
        os.path.getsize(os.path.join(output_dir, f))
        for f in os.listdir(output_dir) if f.endswith('.mp3')
    )
    print(f"Total size: {total_size / (1024*1024):.1f} MB")

if __name__ == '__main__':
    asyncio.run(main())
