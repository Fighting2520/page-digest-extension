#!/usr/bin/env node

/**
 * Generate PNG icons from SVG using Node.js canvas
 * 
 * If canvas is not installed, this script will provide instructions
 * for manual conversion using the browser.
 */

const fs = require('fs');
const path = require('path');

// Check if canvas is available
let Canvas;
try {
  Canvas = require('canvas');
} catch (e) {
  console.log('❌ Canvas module not found.');
  console.log('\n📝 To generate PNG icons, you have two options:\n');
  console.log('Option 1: Install canvas (requires build tools)');
  console.log('  npm install canvas\n');
  console.log('Option 2: Use browser (recommended)');
  console.log('  1. Open icons/create-png.html in Chrome');
  console.log('  2. PNG files will download automatically');
  console.log('  3. Move them to the icons/ folder\n');
  process.exit(1);
}

const { createCanvas } = Canvas;

const sizes = [16, 48, 128];
const colors = {
  start: '#667eea',
  end: '#764ba2'
};

function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, colors.start);
  gradient.addColorStop(1, colors.end);

  // Draw rounded rectangle
  const radius = size / 5.3;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw emoji (simplified - canvas doesn't render emoji well)
  // Instead, draw a simple document icon
  ctx.fillStyle = 'white';
  const iconSize = size * 0.6;
  const iconX = (size - iconSize) / 2;
  const iconY = (size - iconSize) / 2;
  
  // Document shape
  ctx.beginPath();
  ctx.moveTo(iconX + iconSize * 0.2, iconY);
  ctx.lineTo(iconX + iconSize * 0.7, iconY);
  ctx.lineTo(iconX + iconSize * 0.8, iconY + iconSize * 0.1);
  ctx.lineTo(iconX + iconSize * 0.8, iconY + iconSize);
  ctx.lineTo(iconX + iconSize * 0.2, iconY + iconSize);
  ctx.closePath();
  ctx.fill();

  // Lines on document
  ctx.strokeStyle = colors.start;
  ctx.lineWidth = size * 0.02;
  const lineY1 = iconY + iconSize * 0.3;
  const lineY2 = iconY + iconSize * 0.5;
  const lineY3 = iconY + iconSize * 0.7;
  const lineX1 = iconX + iconSize * 0.3;
  const lineX2 = iconX + iconSize * 0.7;
  
  ctx.beginPath();
  ctx.moveTo(lineX1, lineY1);
  ctx.lineTo(lineX2, lineY1);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(lineX1, lineY2);
  ctx.lineTo(lineX2, lineY2);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(lineX1, lineY3);
  ctx.lineTo(lineX2 - iconSize * 0.1, lineY3);
  ctx.stroke();

  return canvas;
}

// Generate icons
console.log('🎨 Generating PNG icons...\n');

sizes.forEach(size => {
  const canvas = createIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(__dirname, `icon${size}.png`);
  
  fs.writeFileSync(filename, buffer);
  console.log(`✅ Created icon${size}.png`);
});

console.log('\n✨ All icons generated successfully!');
