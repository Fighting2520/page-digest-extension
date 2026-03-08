# PageDigest

AI-powered web page summarization Chrome extension.

## Features

- ✨ **Smart Summarization** - One-click webpage summarization powered by Google Gemini
- 📊 **Data Extraction** - Extract key data, statistics, and facts
- 📝 **Key Points** - Generate concise bullet-point summaries
- 🌐 **Smart Translation** - Auto-detect language and translate (EN↔️CN)
- 📚 **History** - Save and revisit your recent summaries
- 🎨 **Modern UI** - Clean, professional interface inspired by Notion and Linear
- 📄 **Markdown Support** - Beautiful rendering of formatted content

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/page-digest-extension.git
   ```

2. Get a free Gemini API Key:
   - Visit https://aistudio.google.com/app/apikey
   - Create an API key (free tier available)

3. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `page-digest-extension` folder

4. Configure your API key:
   - Click the PageDigest icon in your toolbar
   - Paste your Gemini API key
   - Click "Get Started"

## Usage

### Quick Actions

- **Summarize** - Get a concise summary of the current webpage
- **Extract Data** - Pull out all statistics and key facts
- **Key Points** - Generate bullet-point highlights
- **Translate** - Auto-translate based on page language

### Custom Prompts

Click "Custom Prompt" to enter your own instructions for the AI.

### History

Access your recent summaries by clicking "History" at the bottom.

## Technology Stack

- **Manifest V3** - Latest Chrome extension standard
- **Vanilla JavaScript** - No framework dependencies
- **Google Gemini 2.5 Flash** - Fast, powerful AI model
- **Marked.js** - Markdown rendering
- **Modern CSS** - Clean, responsive design

## Privacy

- All processing happens via Google Gemini API
- Your API key is stored locally in Chrome storage
- No data is sent to third-party servers
- History is stored locally on your device

## Development

### Project Structure

```
page-digest-extension/
├── manifest.json       # Extension configuration
├── popup.html          # Main UI
├── popup.css           # Styles
├── popup.js            # Core logic
├── background.js       # Background service worker
├── content.js          # Content script
├── marked.min.js       # Markdown parser
└── icons/              # Extension icons
```

### Local Testing

1. Make changes to the code
2. Go to `chrome://extensions/`
3. Click the refresh icon on PageDigest
4. Test your changes

## Roadmap

- [ ] Side panel mode
- [ ] Export to Markdown/PDF
- [ ] Keyboard shortcuts
- [ ] Multi-language UI
- [ ] Custom prompt templates
- [ ] Cloud sync (optional)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Made with ❤️ using Google Gemini AI**
