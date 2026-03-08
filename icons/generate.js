const fs = require('fs');

// 创建最小化的 PNG 图标（纯色 + emoji）
// 使用 data URI 方式创建简单图标

const createSimpleIcon = (size) => {
  // 这是一个简化的方案，实际应该用 canvas 或图像处理库
  // 但为了快速原型，我们先创建占位文件
  
  const canvas = `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${Math.floor(size/5)}" fill="url(#grad${size})"/>
    <text x="${size/2}" y="${size*0.68}" font-size="${Math.floor(size*0.6)}" text-anchor="middle" fill="white" font-family="Arial">📄</text>
  </svg>
  `;
  
  return canvas.trim();
};

// 生成 SVG 文件（Chrome 也支持 SVG 作为图标）
[16, 48, 128].forEach(size => {
  const svg = createSimpleIcon(size);
  fs.writeFileSync(`icon${size}.svg`, svg);
  console.log(`Generated icon${size}.svg`);
});

console.log('\n注意：Chrome 扩展推荐使用 PNG 格式图标');
console.log('请使用以下方法之一转换 SVG 到 PNG：');
console.log('1. 在线工具：https://cloudconvert.com/svg-to-png');
console.log('2. 使用 Figma/Sketch 导出');
console.log('3. 安装 ImageMagick: brew install imagemagick');
console.log('   然后运行: for i in 16 48 128; do convert icon$i.svg icon$i.png; done');
