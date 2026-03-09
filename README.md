# QuickRead AI

🚀 **AI-powered web page summarization Chrome extension**

Transform any webpage into concise, actionable insights with one click. Powered by Google Gemini AI.

---

## ✨ Features

- **📝 Smart Summarization** - Get instant, intelligent summaries of any webpage
- **📊 Data Extraction** - Automatically extract key statistics, facts, and figures
- **🎯 Key Points** - Generate bullet-point highlights for quick scanning
- **🌐 Smart Translation** - Auto-detect language and translate (EN ↔️ CN)
- **📚 History** - Save and revisit your recent summaries
- **⚡ Keyboard Shortcuts** - Work faster with customizable hotkeys
- **🎨 Modern UI** - Clean, professional interface inspired by Notion and Linear
- **📄 Markdown Support** - Beautiful rendering of formatted content
- **🔒 Privacy First** - All data stays local, no tracking

---

## 🚀 Installation

### Option 1: Chrome Web Store (Coming Soon)

We're preparing for official release on Chrome Web Store. Stay tuned!

### Option 2: Install from Source

1. **Download the extension**
   ```bash
   git clone https://github.com/Fighting2520/page-digest-extension.git
   ```

2. **Get a free Gemini API Key**
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key" (free tier available)
   - Copy the generated key

3. **Load the extension in Chrome**
   - Open `chrome://extensions/` in Chrome
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `page-digest-extension` folder

4. **Configure your API key**
   - Click the QuickRead AI icon in your toolbar
   - Paste your Gemini API key
   - Click "Save & Get Started"

---

## 📖 Usage

### Quick Actions

Click the QuickRead AI icon and choose:

- **📝 Summarize** - Get a concise summary of the current webpage
- **📊 Extract Data** - Pull out all statistics and key facts
- **🎯 Key Points** - Generate bullet-point highlights
- **🌐 Translate** - Auto-translate based on page language

### Custom Prompts

Click "✨ Custom Prompt" to enter your own instructions:
- "Explain this article to a 10-year-old"
- "List all the action items mentioned"
- "What are the main arguments for and against?"

### Keyboard Shortcuts

- `Alt+S` - Quick summarize
- `Alt+Q` - Open Q&A mode
- `Alt+T` - Translate page
- `Alt+D` - Toggle side panel

*Shortcuts can be customized in `chrome://extensions/shortcuts`*

### History

Access your recent summaries by clicking "📚 History" at the bottom of the panel.

---

## 🛠️ Technology Stack

- **Manifest V3** - Latest Chrome extension standard
- **Vanilla JavaScript** - No framework dependencies, fast and lightweight
- **Google Gemini 2.5 Flash** - State-of-the-art AI model
- **Marked.js** - Markdown rendering
- **Modern CSS** - Clean, responsive design

---

## 🔒 Privacy & Security

**Your privacy is our priority.**

- ✅ **No data collection** - We don't collect, store, or transmit any personal data
- ✅ **Local storage only** - Your API key and history stay on your device
- ✅ **Direct API calls** - Content is sent directly to Google Gemini API
- ✅ **Open source** - Full transparency, audit the code yourself

Read our full [Privacy Policy](./PRIVACY.md)

---

## 📁 Project Structure

```
page-digest-extension/
├── manifest.json       # Extension configuration
├── popup.html          # Popup UI
├── popup.css           # Popup styles
├── popup.js            # Popup logic
├── sidepanel.html      # Side panel UI
├── sidepanel.css       # Side panel styles
├── sidepanel.js        # Side panel logic
├── background.js       # Background service worker
├── content.js          # Content script
├── settings.html       # Settings page
├── settings.js         # Settings logic
├── marked.min.js       # Markdown parser
├── icons/              # Extension icons
├── PRIVACY.md          # Privacy policy
└── README.md           # This file
```

---

## 🗺️ Roadmap

- [x] Core summarization features
- [x] Side panel mode
- [x] Keyboard shortcuts
- [x] History tracking
- [ ] Export to Markdown/PDF
- [ ] Multi-language UI
- [ ] Custom prompt templates
- [ ] Cloud sync (optional)
- [ ] Browser action context menu
- [ ] Batch processing

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

---

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/Fighting2520/page-digest-extension/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Fighting2520/page-digest-extension/discussions)

---

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Markdown rendering by [Marked.js](https://marked.js.org/)
- Inspired by modern design systems like Notion and Linear

---

**Made with ❤️ by developers, for developers**

⭐ If you find QuickRead AI useful, please star the repo!
