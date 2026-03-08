const fs = require('fs');
const path = require('path');

// 创建简单的 PNG 图标（使用 Canvas 或直接用 base64）
// 这里我们创建一个简单的占位图标

const sizes = [16, 48, 128];

sizes.forEach(size => {
  // 创建一个简单的 SVG 并保存
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size/5}" fill="url(#grad)"/>
  <text x="${size/2}" y="${size*0.7}" font-size="${size*0.5}" text-anchor="middle" fill="white">📄</text>
</svg>
  `.trim();
  
  fs.writeFileSync(path.join(__dirname, `icon${size}.svg`), svg);
});

console.log('图标已生成（SVG格式）');
