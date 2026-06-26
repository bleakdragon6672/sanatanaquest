#!/usr/bin/env python3
"""
Extract verse data (with commentary) from the live deployment JS bundle.
The bundle contains an array of verse objects like:
  {id:"1.1",chapter:1,verse:1,sanskrit:"...",transliteration:"...",
   english:"...",meaning:"..."?,commentary:"..."}
We need to extract this array and reconstruct the gita-data.ts file
that matches what the live deployment uses.
"""
import re
import json
import os
import sys

BUNDLE_PATH = "/home/z/my-project/recovery/live_mirror/sanatanaquest.space-z.ai/_next/static/chunks/40dd8df7f1426fe9.js"
OUT_JSON = "/home/z/my-project/recovery/inspections/verses_live.json"

with open(BUNDLE_PATH, "r", encoding="utf-8") as f:
    js = f.read()

# We need to find each verse object individually.
# Pattern: {id:"X.Y",chapter:N,verse:N,sanskrit:"...",transliteration:"...",
#           english:"...",meaning:"..."?,commentary:"..."}
# The string values use double-quoted JS strings with possible escapes.

# Strategy: find every `id:"<chapter>.<verse>"` occurrence and parse outward
# from there using a state machine for JS string parsing.

def parse_js_string(s, start):
    r"""Parse a JS double-quoted string starting at index `start` (s[start] == '"').
    Returns (string_value, end_index) where end_index is the index just past the closing quote.
    Handles escapes: \" \\ \n \t \r \/ \uXXXX \xXX octal (best-effort)
    """
    assert s[start] == '"', f"Expected '\"' at {start}, got {s[start]!r}"
    i = start + 1
    out = []
    while i < len(s):
        c = s[i]
        if c == '\\':
            i += 1
            if i >= len(s):
                break
            e = s[i]
            if e == '"': out.append('"')
            elif e == '\\': out.append('\\')
            elif e == "'": out.append("'")
            elif e == 'n': out.append('\n')
            elif e == 't': out.append('\t')
            elif e == 'r': out.append('\r')
            elif e == 'b': out.append('\b')
            elif e == 'f': out.append('\f')
            elif e == '/': out.append('/')
            elif e == '0': out.append('\0')
            elif e == 'u':
                hex_digits = s[i+1:i+5]
                if len(hex_digits) == 4:
                    try:
                        out.append(chr(int(hex_digits, 16)))
                        i += 4
                    except ValueError:
                        out.append(hex_digits)
                else:
                    out.append('\\u')
            elif e == 'x':
                hex_digits = s[i+1:i+3]
                if len(hex_digits) == 2:
                    try:
                        out.append(chr(int(hex_digits, 16)))
                        i += 2
                    except ValueError:
                        out.append('\\x')
                else:
                    out.append('\\x')
            else:
                # Unknown escape — keep literally
                out.append('\\' + e)
            i += 1
        elif c == '"':
            return (''.join(out), i + 1)
        else:
            out.append(c)
            i += 1
    raise ValueError("Unterminated string starting at " + str(start))


def parse_js_single_string(s, start):
    r"""Parse a JS single-quoted string starting at index `start` (s[start] == '\'').
    Returns (string_value, end_index).
    Handles escapes: \' \\ \n \t \r \/ \uXXXX \xXX
    """
    assert s[start] == "'"
    i = start + 1
    out = []
    while i < len(s):
        c = s[i]
        if c == '\\':
            i += 1
            if i >= len(s):
                break
            e = s[i]
            if e == '"': out.append('"')
            elif e == '\\': out.append('\\')
            elif e == "'": out.append("'")
            elif e == 'n': out.append('\n')
            elif e == 't': out.append('\t')
            elif e == 'r': out.append('\r')
            elif e == 'b': out.append('\b')
            elif e == 'f': out.append('\f')
            elif e == '/': out.append('/')
            elif e == '0': out.append('\0')
            elif e == 'u':
                hex_digits = s[i+1:i+5]
                if len(hex_digits) == 4:
                    try:
                        out.append(chr(int(hex_digits, 16)))
                        i += 4
                    except ValueError:
                        out.append(hex_digits)
                else:
                    out.append('\\u')
            elif e == 'x':
                hex_digits = s[i+1:i+3]
                if len(hex_digits) == 2:
                    try:
                        out.append(chr(int(hex_digits, 16)))
                        i += 2
                    except ValueError:
                        out.append('\\x')
                else:
                    out.append('\\x')
            else:
                out.append('\\' + e)
            i += 1
        elif c == "'":
            return (''.join(out), i + 1)
        else:
            out.append(c)
            i += 1
    raise ValueError("Unterminated single-quoted string starting at " + str(start))


def parse_js_value(s, start):
    """Parse a JS value (string, number, true, false, null, array, object) starting at `start`.
    Returns (value, end_index).
    Skips leading whitespace.
    """
    # Skip whitespace
    while start < len(s) and s[start] in ' \t\n\r':
        start += 1
    if start >= len(s):
        raise ValueError("Unexpected end of input")
    c = s[start]
    if c == '"':
        return parse_js_string(s, start)
    if c == "'":
        return parse_js_single_string(s, start)
    if c == '[':
        return parse_js_array(s, start)
    if c == '{':
        return parse_js_object(s, start)
    if c == '-' or c.isdigit():
        # Number — read until non-numeric
        i = start
        if s[i] == '-': i += 1
        while i < len(s) and (s[i].isdigit() or s[i] in '.eE+-'):
            i += 1
        num_str = s[start:i]
        try:
            if '.' in num_str or 'e' in num_str or 'E' in num_str:
                return (float(num_str), i)
            return (int(num_str), i)
        except ValueError:
            return (num_str, i)
    if s[start:start+4] == 'true':
        return (True, start + 4)
    if s[start:start+5] == 'false':
        return (False, start + 5)
    if s[start:start+4] == 'null':
        return (None, start + 4)
    # Identifier — read until non-identifier char (could be unquoted key)
    i = start
    while i < len(s) and (s[i].isalnum() or s[i] == '_' or s[i] == '$'):
        i += 1
    if i > start:
        return (s[start:i], i)
    raise ValueError(f"Unknown value starting at {start}: {s[start:start+50]!r}")


def parse_js_array(s, start):
    assert s[start] == '['
    i = start + 1
    items = []
    while i < len(s):
        while i < len(s) and s[i] in ' \t\n\r,':
            i += 1
        if i >= len(s):
            raise ValueError("Unterminated array")
        if s[i] == ']':
            return (items, i + 1)
        val, i = parse_js_value(s, i)
        items.append(val)
        # Skip whitespace + comma
        while i < len(s) and s[i] in ' \t\n\r':
            i += 1
        if i < len(s) and s[i] == ',':
            i += 1
    raise ValueError("Unterminated array")


def parse_js_object(s, start):
    assert s[start] == '{'
    i = start + 1
    obj = {}
    while i < len(s):
        while i < len(s) and s[i] in ' \t\n\r,':
            i += 1
        if i >= len(s):
            raise ValueError("Unterminated object")
        if s[i] == '}':
            return (obj, i + 1)
        # Parse key — may be quoted or identifier
        if s[i] == '"':
            key, i = parse_js_string(s, i)
        elif s[i] == "'":
            key, i = parse_js_single_string(s, i)
        else:
            # Identifier
            j = i
            while j < len(s) and (s[j].isalnum() or s[j] == '_' or s[j] == '$'):
                j += 1
            key = s[i:j]
            i = j
        # Skip whitespace
        while i < len(s) and s[i] in ' \t\n\r':
            i += 1
        if i >= len(s) or s[i] != ':':
            raise ValueError(f"Expected ':' after key {key!r} at {i}")
        i += 1
        val, i = parse_js_value(s, i)
        obj[key] = val
        # Skip whitespace + comma
        while i < len(s) and s[i] in ' \t\n\r':
            i += 1
        if i < len(s) and s[i] == ',':
            i += 1
    raise ValueError("Unterminated object")


# Find all verse object starts
# Pattern: {id:"1.1",  — look for this
verse_starts = []
for m in re.finditer(r'\{id:"(\d+\.\d+)",chapter:', js):
    verse_starts.append((m.group(1), m.start()))

print(f"Found {len(verse_starts)} verse-start markers")
print(f"First 5 verse IDs: {[v[0] for v in verse_starts[:5]]}")
print(f"Last 5 verse IDs: {[v[0] for v in verse_starts[-5:]]}")

# Parse each verse object
verses = []
errors = []
for verse_id, start in verse_starts:
    try:
        obj, end = parse_js_object(js, start)
        verses.append(obj)
    except Exception as e:
        errors.append((verse_id, str(e)))
        print(f"Failed to parse verse {verse_id}: {e}")

print(f"\nSuccessfully parsed {len(verses)} verses")
print(f"Errors: {len(errors)}")

# Sanity-check the verse IDs are unique
ids = [v['id'] for v in verses]
unique_ids = set(ids)
print(f"Unique verse IDs: {len(unique_ids)} (total: {len(ids)})")

# Check fields present
if verses:
    sample = verses[0]
    print(f"\nSample verse fields: {sorted(sample.keys())}")
    print(f"Sample verse 1.1 commentary length: {len(sample.get('commentary', ''))}")

# How many verses have commentary
with_commentary = sum(1 for v in verses if v.get('commentary') and v['commentary'].strip() != '(Commentary not available for this verse)')
without_commentary = sum(1 for v in verses if not v.get('commentary') or v['commentary'].strip() == '(Commentary not available for this verse)')
print(f"\nVerses with full commentary: {with_commentary}")
print(f"Verses without commentary: {without_commentary}")

# Save to JSON
os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
with open(OUT_JSON, 'w', encoding='utf-8') as f:
    json.dump(verses, f, ensure_ascii=False, indent=2)
print(f"\nSaved {len(verses)} verses to {OUT_JSON}")
print(f"File size: {os.path.getsize(OUT_JSON)} bytes")
