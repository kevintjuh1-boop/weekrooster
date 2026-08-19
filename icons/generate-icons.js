// Genereert eenvoudige PNG-iconen zonder externe dependencies (pure Node + zlib).
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ACCENT = [99, 102, 241];    // #6366f1
const ACCENT_DARK = [67, 56, 202]; // #4338ca
const WHITE = [255, 255, 255];
const LIGHT = [229, 231, 235];    // #e5e7eb

let crcTable = null;
function crc32(buf) {
  if (!crcTable) {
    crcTable = [];
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      crcTable[n] = c;
    }
  }
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function makePNG(width, height, pixelFn) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0;
    for (let x = 0; x < width; x++) {
      const p = pixelFn(x, y);
      raw[offset++] = p[0]; raw[offset++] = p[1]; raw[offset++] = p[2]; raw[offset++] = p[3];
    }
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function inRoundedRect(px, py, left, top, right, bottom, r) {
  if (r <= 0) return px >= left && px < right && py >= top && py < bottom;
  const cx = clamp(px, left + r, right - r);
  const cy = clamp(py, top + r, bottom - r);
  const dx = px - cx, dy = py - cy;
  return dx * dx + dy * dy <= r * r;
}

function drawIcon(size, squareBackground) {
  const bgR = squareBackground ? 0 : size * 0.22;
  const bodyLeft = size * 0.18, bodyRight = size * 0.82, bodyTop = size * 0.26, bodyBottom = size * 0.82, bodyR = size * 0.06;
  const headerBottom = size * 0.38;
  const tabW = size * 0.05, tabTop = size * 0.16, tabBottom = size * 0.30;
  const tab1X = size * 0.32, tab2X = size * 0.63;
  const bar1 = { l: size * 0.28, r: size * 0.72, t: size * 0.50, b: size * 0.565 };
  const bar2 = { l: size * 0.28, r: size * 0.58, t: size * 0.63, b: size * 0.695 };

  return function pixel(x, y) {
    const px = x + 0.5, py = y + 0.5;
    if (!inRoundedRect(px, py, 0, 0, size, size, bgR)) return [0, 0, 0, 0];

    if (inRoundedRect(px, py, tab1X, tabTop, tab1X + tabW, tabBottom, tabW / 2)) return [...WHITE, 255];
    if (inRoundedRect(px, py, tab2X, tabTop, tab2X + tabW, tabBottom, tabW / 2)) return [...WHITE, 255];

    if (inRoundedRect(px, py, bodyLeft, bodyTop, bodyRight, bodyBottom, bodyR)) {
      if (py < headerBottom) return [...ACCENT_DARK, 255];
      if (inRoundedRect(px, py, bar1.l, bar1.t, bar1.r, bar1.b, (bar1.b - bar1.t) / 2)) return [...LIGHT, 255];
      if (inRoundedRect(px, py, bar2.l, bar2.t, bar2.r, bar2.b, (bar2.b - bar2.t) / 2)) return [...LIGHT, 255];
      return [...WHITE, 255];
    }
    return [...ACCENT, 255];
  };
}

const outDir = __dirname;
[192, 512].forEach(function (size) {
  const png = makePNG(size, size, drawIcon(size, false));
  fs.writeFileSync(path.join(outDir, "icon-" + size + ".png"), png);
  console.log("wrote icon-" + size + ".png");
});

const applePng = makePNG(180, 180, drawIcon(180, true));
fs.writeFileSync(path.join(outDir, "apple-touch-icon.png"), applePng);
console.log("wrote apple-touch-icon.png");
