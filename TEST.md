# 快速测试指南

## 第一步：加载插件

1. 打开 Chrome 浏览器
2. 地址栏输入：`chrome://extensions/`
3. 右上角开启"开发者模式"（Developer mode）
4. 点击"加载已解压的扩展程序"（Load unpacked）
5. 选择这个文件夹：`page-digest-extension`

## 第二步：获取 API Key

1. 访问：https://aistudio.google.com/app/apikey
2. 登录 Google 账号
3. 点击"Create API Key"
4. 复制生成的 Key

## 第三步：测试插件

1. 打开任意新闻网站，例如：
   - https://www.bbc.com/news
   - https://techcrunch.com
   - 任何中文新闻网站

2. 点击浏览器右上角的 PageDigest 图标（紫色渐变）

3. 首次使用：
   - 粘贴您的 Gemini API Key
   - 点击"保存"

4. 点击"📝 总结网页"按钮

5. 等待 5-10 秒，查看 AI 生成的摘要

## 测试自定义提示

1. 点击"✨ 自定义提示"
2. 输入：`用三句话总结这篇文章的核心观点`
3. 点击"执行"

## 常见问题

**Q: 图标显示不正常？**
A: SVG 图标在某些 Chrome 版本可能不显示，这是临时占位。正式版会用 PNG。

**Q: 提示"无法提取网页内容"？**
A: 某些网站有反爬虫保护，换一个网站测试。

**Q: API 调用失败？**
A: 检查 API Key 是否正确，或者访问 Google AI Studio 确认 Key 状态。

**Q: 加载插件后没有图标？**
A: 点击浏览器右上角的拼图图标，找到 PageDigest 并固定到工具栏。

## 下一步

测试通过后，告诉老板，我们准备：
1. 优化图标（转换为 PNG）
2. 准备发布材料
3. 提交到 Chrome Web Store
