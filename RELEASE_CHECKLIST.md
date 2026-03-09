# 🚀 Release Checklist for QuickRead AI v2.0.0

## ✅ Completed

- [x] Rebranded to QuickRead AI
- [x] Updated manifest.json with new name and description
- [x] Created comprehensive README.md
- [x] Added PRIVACY.md (privacy policy)
- [x] Added CHANGELOG.md (version history)
- [x] Added LICENSE (MIT)
- [x] Created MARKETING.md (store listing guide)
- [x] Created icon generator tool (icons/generate-icons.html)

## 📋 TODO Before GitHub Release

### 1. Generate PNG Icons (5 minutes)
- [ ] Open `icons/generate-icons.html` in Chrome
- [ ] Click "Generate & Download Icons"
- [ ] Move downloaded files to `icons/` folder:
  - icon16.png
  - icon48.png
  - icon128.png
- [ ] Update manifest.json to reference PNG icons (if needed)

### 2. Test the Extension (15 minutes)
- [ ] Load extension in Chrome (chrome://extensions/)
- [ ] Test all features:
  - [ ] Summarize
  - [ ] Extract Data
  - [ ] Key Points
  - [ ] Translate
  - [ ] Custom Prompt
  - [ ] History
  - [ ] Keyboard shortcuts
- [ ] Test on different websites:
  - [ ] News article (e.g., TechCrunch)
  - [ ] Blog post (e.g., Medium)
  - [ ] Documentation (e.g., MDN)
  - [ ] Chinese website (for translation test)

### 3. Create Screenshots (20 minutes)
Follow instructions in MARKETING.md:
- [ ] Screenshot 1: Main interface with summary
- [ ] Screenshot 2: Features overview
- [ ] Screenshot 3: Custom prompt example
- [ ] Screenshot 4: History view
- [ ] Screenshot 5: Settings/API setup

Tips:
- Use Chrome DevTools to set viewport to 1280x800
- Use a real article for authentic screenshots
- Ensure UI looks clean and professional

### 4. Prepare Release Package (5 minutes)
```bash
cd /tmp/page-digest-extension
zip -r quickread-ai-v2.0.0.zip . \
  -x "*.git*" \
  -x "TEST.md" \
  -x ".DS_Store" \
  -x "icons/create-png.html" \
  -x "icons/generate-png.js" \
  -x "icons/generate-icons.html" \
  -x "RELEASE_CHECKLIST.md"
```

### 5. Create GitHub Release (10 minutes)
- [ ] Go to https://github.com/Fighting2520/page-digest-extension/releases/new
- [ ] Tag: `v2.0.0`
- [ ] Title: `QuickRead AI v2.0.0 - Brand Launch`
- [ ] Description: Copy from template below
- [ ] Attach `quickread-ai-v2.0.0.zip`
- [ ] Mark as "Latest release"
- [ ] Publish

#### Release Description Template:
```markdown
# 🎉 QuickRead AI v2.0.0 - Brand Launch

We're excited to announce the official launch of **QuickRead AI** (formerly PageDigest)!

## ✨ What's New

- 🎨 **Brand Refresh** - New name, new identity
- 📝 **Enhanced Documentation** - Comprehensive guides and privacy policy
- 🚀 **Production Ready** - Polished UI and improved stability
- 🔒 **Privacy First** - Full transparency with open source code

## 🚀 Quick Start

1. Download `quickread-ai-v2.0.0.zip`
2. Extract the files
3. Load in Chrome: `chrome://extensions/` → "Load unpacked"
4. Get a free [Gemini API key](https://aistudio.google.com/app/apikey)
5. Start summarizing!

## 📖 Features

- AI-powered webpage summarization
- Data extraction and key points
- Smart translation (EN ↔️ CN)
- History tracking
- Keyboard shortcuts
- Modern, clean interface

## 🔗 Links

- [Installation Guide](https://github.com/Fighting2520/page-digest-extension#-installation)
- [Privacy Policy](https://github.com/Fighting2520/page-digest-extension/blob/main/PRIVACY.md)
- [Report Issues](https://github.com/Fighting2520/page-digest-extension/issues)

## 📝 Full Changelog

See [CHANGELOG.md](https://github.com/Fighting2520/page-digest-extension/blob/main/CHANGELOG.md)

---

**Made with ❤️ for developers and knowledge workers**

⭐ If you find QuickRead AI useful, please star the repo!
```

### 6. Update Repository (5 minutes)
- [ ] Push all changes to main branch
- [ ] Update repository description: "🚀 AI-powered web page summarizer for Chrome. Extract insights, translate, and save summaries with one click."
- [ ] Add topics/tags: `chrome-extension`, `ai`, `summarization`, `gemini`, `productivity`, `translation`
- [ ] Enable Issues and Discussions
- [ ] Add README badges (optional):
  - Version
  - License
  - Stars

### 7. Announce (Optional)
- [ ] Share on Twitter/X
- [ ] Post in relevant Reddit communities (r/chrome, r/productivity)
- [ ] Share in developer communities
- [ ] Update personal portfolio/website

---

## 🎯 Phase 2: Chrome Web Store (1-2 weeks)

### Preparation
- [ ] Create promotional tiles (440x280, 920x680, 1400x560)
- [ ] Write store listing copy (use MARKETING.md as guide)
- [ ] Set up GitHub Pages for privacy policy hosting
- [ ] Register Chrome Web Store developer account ($5 one-time fee)

### Submission
- [ ] Upload extension package
- [ ] Fill in store listing
- [ ] Upload screenshots and promotional images
- [ ] Submit for review
- [ ] Wait for approval (typically 1-3 days)

---

## 📊 Success Metrics

Track after release:
- GitHub stars
- Downloads/installs
- Issues reported
- User feedback
- Feature requests

---

## 🆘 Troubleshooting

### If icons don't generate:
- Try different browser (Firefox, Safari)
- Use online SVG to PNG converter
- Ask for help in GitHub Issues

### If extension doesn't load:
- Check manifest.json syntax
- Verify all file paths
- Check browser console for errors

---

**Current Status**: Ready for icon generation and testing

**Estimated Time to Release**: 1-2 hours

**Next Step**: Generate PNG icons using `icons/generate-icons.html`
