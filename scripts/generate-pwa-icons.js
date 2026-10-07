const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Sacred Om and radiant mandala SVG
function createSvgIcon(isMaskable = false) {
  // If maskable, scale the central emblem down so it sits safely inside the 65% safe zone (inner circle)
  const scale = isMaskable ? 0.68 : 0.85;
  const size = 512;
  const center = size / 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#2c1a0e" />
      <stop offset="50%" stop-color="#19110b" />
      <stop offset="100%" stop-color="#0e0a07" />
    </radialGradient>

    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3C4" />
      <stop offset="25%" stop-color="#FDE047" />
      <stop offset="60%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>

    <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#B45309" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#78350F" stop-opacity="0" />
    </radialGradient>

    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Dark Obsidian Sacred Background -->
  <rect width="${size}" height="${size}" ${isMaskable ? '' : 'rx="110"'} fill="url(#bgGrad)" />

  <g transform="translate(${center}, ${center}) scale(${scale}) translate(-${center}, -${center})">
    <!-- Divine Aura Glow -->
    <circle cx="${center}" cy="${center}" r="190" fill="url(#auraGlow)" />

    <!-- Outer Decorative Sacred Mandala Ring -->
    <circle cx="${center}" cy="${center}" r="216" stroke="url(#goldGrad)" stroke-width="2" stroke-opacity="0.4" stroke-dasharray="6 8" />
    <circle cx="${center}" cy="${center}" r="202" stroke="url(#goldGrad)" stroke-width="3" stroke-opacity="0.75" />
    <circle cx="${center}" cy="${center}" r="192" stroke="url(#goldGrad)" stroke-width="1" stroke-opacity="0.5" />

    <!-- 12 Radiating Rays of Knowledge -->
    ${Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = center + 175 * Math.cos(angle);
      const y1 = center + 175 * Math.sin(angle);
      const x2 = center + 188 * Math.cos(angle);
      const y2 = center + 188 * Math.sin(angle);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="url(#goldGrad)" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.85" />`;
    }).join('\n    ')}

    <!-- Sacred 8-Petal Geometry / Mandala Points -->
    ${Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const x = center + 155 * Math.cos(angle);
      const y = center + 155 * Math.sin(angle);
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="url(#goldGrad)" opacity="0.9" />`;
    }).join('\n    ')}

    <!-- Golden Om (Aum) Glyph -->
    <g filter="url(#glow)">
      <!-- Beautifully drawn Devanagari Sacred Om glyph -->
      <path d="
        M 190 220
        C 190 175 235 155 260 180
        C 285 205 260 235 240 240
        C 275 245 295 285 275 325
        C 255 365 195 365 180 335
        C 170 315 185 300 200 305
        C 215 310 215 330 235 330
        C 255 330 265 305 250 280
        C 235 255 205 260 195 245
        C 188 235 190 225 190 220 Z
        M 260 240
        C 290 240 325 255 340 290
        C 350 310 350 340 350 360
        C 345 365 335 365 330 355
        C 330 335 330 315 320 300
        C 310 280 285 270 260 270 Z
        M 315 175
        C 325 195 345 205 375 200
        C 365 190 355 175 355 155
        C 355 145 360 140 365 140
        C 370 140 375 145 375 155
        C 375 180 395 195 410 195
        C 400 185 390 170 390 150
        C 390 130 405 125 415 135
        M 305 140
        C 335 130 370 130 395 140
        C 370 150 335 150 305 140 Z
        M 345 105
        A 14 14 0 1 1 345 133
        A 14 14 0 1 1 345 105 Z
      " fill="url(#goldGrad)" fill-rule="evenodd" />

      <!-- Central Sacred Bindu (Radiant Dot) -->
      <circle cx="345" cy="119" r="8" fill="#FFFBEB" />
      <circle cx="345" cy="119" r="16" fill="url(#goldGrad)" opacity="0.4" />
    </g>
  </g>
</svg>
`;
}

async function generate() {
  const publicIconsDir = path.join(__dirname, '..', 'public', 'icons');
  if (!fs.existsSync(publicIconsDir)) {
    fs.mkdirSync(publicIconsDir, { recursive: true });
  }

  console.log('Rendering high-resolution PWA icons...');

  const standardSvg = createSvgIcon(false);
  const maskableSvg = createSvgIcon(true);

  // Save base SVG
  fs.writeFileSync(path.join(publicIconsDir, 'icon-base.svg'), standardSvg);
  fs.writeFileSync(path.join(publicIconsDir, 'icon-maskable.svg'), maskableSvg);

  // Generate 512x512 standard
  await sharp(Buffer.from(standardSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicIconsDir, 'icon-512.png'));
  console.log('✔ Generated icon-512.png');

  // Generate 192x192 standard
  await sharp(Buffer.from(standardSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicIconsDir, 'icon-192.png'));
  console.log('✔ Generated icon-192.png');

  // Generate 512x512 maskable (with safe zone margins)
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicIconsDir, 'icon-maskable-512.png'));
  console.log('✔ Generated icon-maskable-512.png');

  // Generate Apple Touch Icon 180x180
  await sharp(Buffer.from(standardSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicIconsDir, 'apple-touch-icon.png'));
  console.log('✔ Generated apple-touch-icon.png');

  // Copy apple-touch-icon to public root for default Apple Safari lookup
  fs.copyFileSync(
    path.join(publicIconsDir, 'apple-touch-icon.png'),
    path.join(__dirname, '..', 'public', 'apple-touch-icon.png')
  );

  // Generate favicon 32x32 & 48x48
  await sharp(Buffer.from(standardSvg))
    .resize(48, 48)
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'favicon.png'));
  console.log('✔ Generated favicon.png');

  console.log('✨ All PWA icons generated successfully!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
