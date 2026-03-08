// popup.js - 优化版（支持语言检测和Markdown渲染）

document.addEventListener('DOMContentLoaded', async () => {
  console.log('PageDigest: Popup loaded');
  
  // 配置 marked
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  // DOM 元素
  const setupSection = document.getElementById('setup-section');
  const mainSection = document.getElementById('main-section');
  const apiKeyInput = document.getElementById('api-key-input');
  const toggleKeyVisibility = document.getElementById('toggle-key-visibility');
  const saveKeyBtn = document.getElementById('save-key-btn');
  const settingsBtn = document.getElementById('settings-btn');
  
  console.log('Elements found:', {
    setupSection: !!setupSection,
    mainSection: !!mainSection,
    apiKeyInput: !!apiKeyInput,
    toggleKeyVisibility: !!toggleKeyVisibility,
    saveKeyBtn: !!saveKeyBtn
  });
  
  const actionCards = document.querySelectorAll('.action-card');
  const customToggle = document.getElementById('custom-toggle');
  const customPromptArea = document.getElementById('custom-prompt-area');
  const customPromptInput = document.getElementById('custom-prompt');
  const runCustomBtn = document.getElementById('run-custom-btn');
  
  const loading = document.getElementById('loading');
  const resultSection = document.getElementById('result-section');
  const resultContent = document.getElementById('result-content');
  const wordCount = document.getElementById('word-count');
  const resultTime = document.getElementById('result-time');
  const copyBtn = document.getElementById('copy-btn');
  
  const historyToggle = document.getElementById('history-toggle');
  const historyList = document.getElementById('history-list');

  // 检查是否已保存 API Key
  const { apiKey } = await chrome.storage.local.get('apiKey');
  
  if (apiKey) {
    setupSection.classList.add('hidden');
    mainSection.classList.remove('hidden');
    loadHistory();
  }

  // 显示/隐藏 API Key
  let keyVisible = false;
  if (toggleKeyVisibility) {
    toggleKeyVisibility.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      keyVisible = !keyVisible;
      apiKeyInput.type = keyVisible ? 'text' : 'password';
    });
  }

  // 保存 API Key
  if (saveKeyBtn) {
    saveKeyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const key = apiKeyInput.value.trim();
      if (!key) {
        alert('Please enter a valid API Key');
        return;
      }

      try {
        await chrome.storage.local.set({ apiKey: key });
        setupSection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        loadHistory();
      } catch (error) {
        alert('Failed to save API Key: ' + error.message);
      }
    });
  }

  // 设置按钮
  settingsBtn.addEventListener('click', () => {
    mainSection.classList.add('hidden');
    setupSection.classList.remove('hidden');
    apiKeyInput.value = '';
    apiKeyInput.type = 'password';
    keyVisible = false;
  });

  // 操作卡片
  actionCards.forEach(card => {
    card.addEventListener('click', async () => {
      const promptTemplate = card.dataset.promptTemplate;
      
      if (promptTemplate === 'translate') {
        // 翻译功能：检测语言并翻译
        await handleTranslate();
      } else {
        const prompt = card.dataset.prompt;
        const langDetect = card.dataset.langDetect === 'true';
        await processPage(prompt, langDetect);
      }
    });
  });

  // 自定义提示切换
  customToggle.addEventListener('click', () => {
    customPromptArea.classList.toggle('hidden');
    customToggle.classList.toggle('active');
  });

  // 执行自定义提示
  runCustomBtn.addEventListener('click', async () => {
    const prompt = customPromptInput.value.trim();
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }
    await processPage(prompt, false);
  });

  // 复制结果
  copyBtn.addEventListener('click', () => {
    const text = resultContent.innerText;
    navigator.clipboard.writeText(text);
    
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
    }, 2000);
  });

  // 历史记录切换
  historyToggle.addEventListener('click', () => {
    historyList.classList.toggle('hidden');
    historyToggle.classList.toggle('active');
  });

  // 全局变量
  let currentPrompt = '';
  let currentResult = '';

  // 处理翻译
  async function handleTranslate() {
    loading.classList.remove('hidden');
    resultSection.classList.add('hidden');

    try {
      // 获取当前标签页
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // 检测网页语言
      const [langResult] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: detectPageLanguage
      });

      const detectedLang = langResult.result;
      
      // 根据检测到的语言决定翻译方向
      let prompt;
      if (detectedLang === 'zh' || detectedLang === 'zh-CN' || detectedLang === 'zh-TW') {
        prompt = 'Translate this webpage content into English. Maintain professionalism and accuracy.';
      } else {
        prompt = '将这个网页的内容翻译成中文。保持专业性和准确性。';
      }

      await processPage(prompt, false);
    } catch (error) {
      alert(`Error: ${error.message}`);
      loading.classList.add('hidden');
    }
  }

  // 检测网页语言
  function detectPageLanguage() {
    // 优先使用 html lang 属性
    const htmlLang = document.documentElement.lang;
    if (htmlLang) return htmlLang;

    // 检测内容语言（简单启发式）
    const text = document.body.innerText.substring(0, 1000);
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
    
    if (chineseChars && chineseChars.length > 50) {
      return 'zh';
    }
    
    return 'en';
  }

  // 处理网页内容
  async function processPage(userPrompt, detectLang = false) {
    currentPrompt = userPrompt;
    loading.classList.remove('hidden');
    resultSection.classList.add('hidden');

    const startTime = Date.now();

    try {
      // 获取当前标签页
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // 注入脚本提取网页内容
      const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractPageContent
      });

      const pageContent = result.result;

      if (!pageContent || pageContent.length < 50) {
        throw new Error('Unable to extract page content. Please ensure the page is fully loaded.');
      }

      // 如果需要语言检测，添加语言提示
      let finalPrompt = userPrompt;
      if (detectLang) {
        const [langResult] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: detectPageLanguage
        });
        const lang = langResult.result;
        
        if (lang === 'zh' || lang === 'zh-CN' || lang === 'zh-TW') {
          finalPrompt = `请用中文回答：${userPrompt}`;
        } else {
          finalPrompt = `Please respond in English: ${userPrompt}`;
        }
      }

      // 调用 Gemini API
      const { apiKey } = await chrome.storage.local.get('apiKey');
      const summary = await callGeminiAPI(apiKey, pageContent, finalPrompt);

      // 渲染 Markdown
      const htmlContent = marked.parse(summary);
      
      // 显示结果
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      resultContent.innerHTML = htmlContent;
      currentResult = summary;
      
      const charCount = summary.length;
      wordCount.textContent = `${charCount} chars`;
      resultTime.textContent = `${duration}s`;
      
      resultSection.classList.remove('hidden');
      
      // 自动保存到历史
      await saveToHistory(currentPrompt, summary);
      loadHistory();
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      loading.classList.add('hidden');
    }
  }

  // 提取网页内容
  function extractPageContent() {
    const clone = document.cloneNode(true);
    const scripts = clone.querySelectorAll('script, style, noscript, iframe, nav, footer, header');
    scripts.forEach(el => el.remove());

    const body = clone.body || clone;
    let text = body.innerText || body.textContent || '';
    text = text.replace(/\s+/g, ' ').trim();

    return text.substring(0, 30000);
  }

  // 调用 Gemini API
  async function callGeminiAPI(apiKey, content, userPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{
          text: `${userPrompt}\n\nWebpage content:\n${content}`
        }]
      }]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API call failed');
    }

    const data = await response.json();
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!result) {
      throw new Error('API returned empty result');
    }

    return result;
  }

  // 保存到历史
  async function saveToHistory(prompt, result) {
    const history = await getHistory();
    const newItem = {
      id: Date.now(),
      prompt: prompt,
      result: result,
      timestamp: Date.now()
    };

    history.unshift(newItem);
    if (history.length > 10) history.pop();

    await chrome.storage.local.set({ history });
  }

  // 获取历史记录
  async function getHistory() {
    const { history } = await chrome.storage.local.get('history');
    return history || [];
  }

  // 加载历史记录
  async function loadHistory() {
    const history = await getHistory();
    
    if (history.length === 0) {
      historyList.innerHTML = '<div class="history-empty">No history yet</div>';
      return;
    }

    historyList.innerHTML = history.map(item => `
      <div class="history-item" data-id="${item.id}">
        <div class="history-item-prompt">${escapeHtml(item.prompt.substring(0, 60))}...</div>
        <div class="history-item-time">${formatTime(item.timestamp)}</div>
      </div>
    `).join('');

    historyList.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.id);
        const historyItem = history.find(h => h.id === id);
        if (historyItem) {
          const htmlContent = marked.parse(historyItem.result);
          resultContent.innerHTML = htmlContent;
          currentResult = historyItem.result;
          currentPrompt = historyItem.prompt;
          
          wordCount.textContent = `${historyItem.result.length} chars`;
          resultTime.textContent = formatTime(historyItem.timestamp);
          resultSection.classList.remove('hidden');
        }
      });
    });
  }

  // 格式化时间
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  }

  // HTML 转义
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
