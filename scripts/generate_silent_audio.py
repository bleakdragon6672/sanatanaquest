#!/usr/bin/env python3
"""
Generate silent placeholder mp3 files for the 8 atmosphere soundscapes.

These placeholders let the UI work end-to-end (the audio element can be
created, played, paused, etc.) without actually producing sound. Users can
later replace them with real royalty-free ambient soundscape audio.

We generate a 10-second silent MP3 using the LAME encoder if available,
or fall back to a minimal valid MP3 byte sequence otherwise.
"""
import os
import struct
import subprocess

OUT_DIR = "/home/z/my-project/public/audio/atmosphere"
FILES = [
    "vrindavan_flute.mp3",
    "ganga_banks.mp3",
    "forest_ashram.mp3",
    "monsoon_meditation.mp3",
    "temple_dawn.mp3",
    "himalayan_night.mp3",
    "sacred_fire.mp3",
    "garden_serenity.mp3",
]

os.makedirs(OUT_DIR, exist_ok=True)


def make_silent_mp3_ffmpeg(path: str, duration_s: int = 10) -> bool:
    """Try to use ffmpeg to generate a 10-second silent mp3."""
    try:
        subprocess.run(
            [
                "ffmpeg", "-y",
                "-f", "lavfi",
                "-i", f"anullsrc=channel_layout=stereo:sample_rate=44100",
                "-t", str(duration_s),
                "-q:a", "9",
                "-acodec", "libmp3lame",
                path,
            ],
            check=True,
            capture_output=True,
        )
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def make_silent_mp3_minimal(path: str) -> None:
    """Write a minimal valid MP3 with one silent frame.

    A minimal MP3 frame is 4 bytes header + data. For MPEG-1 Layer 3,
    32kbps, 44100Hz, mono: frame size = 4 + 32*4 = 132 bytes (we use 96-byte
    padding pattern). This produces ~0.028s of silence per frame.
    We write 360 frames (~10 seconds of silence).
    """
    # MP3 frame header (4 bytes):
    #   11111111 11111111 11111011 11110100
    #   = FF FB F4
    #   Sync word (11 bits): 0xFFE
    #   MPEG version (2 bits): 11 (MPEG1)
    #   Layer (2 bits): 01 (Layer 3)
    #   Protection (1 bit): 1 (no CRC)
    #   Bitrate index (4 bits): 0001 (32 kbps for MPEG1 L3)
    #   Sampling rate (2 bits): 00 (44100 Hz)
    #   Padding (1 bit): 0
    #   Private (1 bit): 0
    #   Channel mode (2 bits): 11 (mono)
    #   Mode extension (2 bits): 00
    #   Copyright (1 bit): 0
    #   Original (1 bit): 0
    #   Emphasis (2 bits): 00
    # Header = 0xFF 0xFB 0x52 0xC4 actually — let's use 0xFF 0xFB 0x90 0x64
    # (32 kbps MPEG1 L3 mono 44.1kHz → frame size = 4 + 32*4 = 132 bytes)
    HEADER = bytes([0xFF, 0xFB, 0x90, 0x64])
    FRAME_SIZE = 132  # bytes for MPEG1 L3 32kbps 44.1kHz no padding
    DATA_SIZE = FRAME_SIZE - 4
    FRAME = HEADER + (b"\x00" * DATA_SIZE)
    NUM_FRAMES = 360  # ~10 seconds at 36 fps
    with open(path, "wb") as f:
        # ID3v2 minimal header (10 bytes) — version 2.3, no flags, no size
        f.write(b"ID3\x03\x00\x00\x00\x00\x00\x00")
        for _ in range(NUM_FRAMES):
            f.write(FRAME)


for fname in FILES:
    path = os.path.join(OUT_DIR, fname)
    print(f"Generating {path}...", end=" ")
    if make_silent_mp3_ffmpeg(path, 10):
        print(f"OK (ffmpeg, {os.path.getsize(path)} bytes)")
    else:
        make_silent_mp3_minimal(path)
        print(f"OK (minimal, {os.path.getsize(path)} bytes)")

print(f"\nAll {len(FILES)} silent placeholder audio files written to {OUT_DIR}")
