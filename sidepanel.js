// sidepanel.js - 侧边栏逻辑（包含智能问答）

document.addEventListener('DOMContentLoaded', async () => {
  // 配置 marked
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  // DOM 元素
  const modeToggle = document.getElementById('mode-toggle');
  const summaryMode = document.getElementById('summary-mode');
  const qaMode = document.getElementById('qa-mode');
  const settingsBtn = document.getElementById('settings-btn');
  
  const actionBtns = document.querySelectorAll('.action-btn');
  const customPrompt = document.getElementById('custom-prompt');
  const runCustom = document.getElementById('run-custom');
  
  const qaMessages = document.getElementById('qa-messages');
  const qaInput = document.getElementById('qa-input');
  const qaSend = document.getElementById('qa-send');
  
  const loading = document.getElementById('loading');
  const resultSection = document.getElementById('result-section');
  const resultContent = document.getElementById('result-content');
  const resultTime = document.getElementById('result-time');
  const copyBtn = document.getElementById('copy-btn');

  let currentMode = 'summary'; // 'summary' or 'qa'
  let qaContext = []; // Q&A 对话历史
  let pageContent = ''; // 缓存的网页内容

  // 模式切换
  modeToggle.addEventListener('click', () => {
    if (currentMode === 'summary') {
      currentMode = 'qa';
      summaryMode.classList.add('hidden');
      qaMode.classList.remove('hidden');
      modeToggle.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      modeToggle.title = 'Switch to Summary mode';
    } else {
      currentMode = 'summary';
      qaMode.classList.add('hidden');
      summaryMode.classList.remove('hidden');
      modeToggle.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      `;
      modeToggle.title = 'Switch to Q&A mode';
    }
  });

  // 快速操作按钮
  actionBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const action = btn.dataset.action;
      let prompt = '';
      
      switch (action) {
        case 'summarize':
          prompt = 'Summarize the core content and main points of this webpage in 3-5 sentences.';
          break;
        case 'extract':
          prompt = 'Extract all key data, statistics, and important facts from this webpage.';
          break;
        case 'keypoints':
          prompt = 'List the core points of this webpage in concise bullet points.';
          break;
        case 'translate':
          await handleTranslate();
          return;
      }
      
      await processPage(prompt);
    });
  });

  // 自定义提示
  runCustom.addEventListener('click', async () => {
    const prompt = customPrompt.value.trim();
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }
    await processPage(prompt);
  });

  // Q&A 发送
  qaSend.addEventListener('click', () => sendQAMessage());
  qaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQAMessage();
    }
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

  // 设置按钮 - 打开设置页面
  settingsBtn.addEventListener('click', () => {
    chrome.windows.create({
      url: 'settings.html',
      type: 'popup',
      width: 440,
      height: 400
    });
  });

  // 处理翻译
  async function handleTranslate() {
    try {
      const content = await getPageContent();
      const lang = await detectLanguage(content);
      
      let prompt;
      if (lang === 'zh' || lang === 'zh-CN' || lang === 'zh-TW') {
        prompt = 'Translate this webpage content into English. Maintain professionalism and accuracy.';
      } else {
        prompt = '将这个网页的内容翻译成中文。保持专业性和准确性。';
      }
      
      await processPage(prompt);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  // 检测语言
  function detectLanguage(text) {
    const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
    if (chineseChars && chineseChars.length > 50) {
      return 'zh';
    }
    return 'en';
  }

  // 处理网页内容
  async function processPage(userPrompt) {
    loading.classList.remove('hidden');
    resultSection.classList.add('hidden');

    const startTime = Date.now();

    try {
      const content = await getPageContent();
      const { apiKey } = await chrome.storage.local.get('apiKey');
      
      if (!apiKey) {
        throw new Error('Please configure your API key first');
      }

      const result = await callGeminiAPI(apiKey, content, userPrompt);
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(1);
      const htmlContent = marked.parse(result);
      
      resultContent.innerHTML = htmlContent;
      resultTime.textContent = `${duration}s`;
      resultSection.classList.remove('hidden');
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      loading.classList.add('hidden');
    }
  }

  // 发送 Q&A 消息
  async function sendQAMessage() {
    const question = qaInput.value.trim();
    if (!question) return;

    // 添加用户消息
    addQAMessage('user', question);
    qaInput.value = '';

    // 显示加载
    const loadingMsg = addQAMessage('assistant', '...');
    
    try {
      const content = await getPageContent();
      const { apiKey } = await chrome.storage.local.get('apiKey');
      
      if (!apiKey) {
        throw new Error('Please configure your API key first');
      }

      // 构建上下文
      let contextPrompt = `Based on the following webpage content, answer the user's question.\n\nWebpage content:\n${content}\n\n`;
      
      if (qaContext.length > 0) {
        contextPrompt += 'Previous conversation:\n';
        qaContext.forEach(msg => {
          contextPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
        });
      }
      
      contextPrompt += `\nUser: ${question}\nAssistant:`;

      const answer = await callGeminiAPI(apiKey, '', contextPrompt);
      
      // 移除加载消息
      loadingMsg.remove();
      
      // 添加助手回复
      addQAMessage('assistant', answer);
      
      // 保存到上下文
      qaContext.push({ role: 'user', content: question });
      qaContext.push({ role: 'assistant', content: answer });
      
      // 限制上下文长度
      if (qaContext.length > 10) {
        qaContext = qaContext.slice(-10);
      }
    } catch (error) {
      loadingMsg.remove();
      addQAMessage('assistant', `Error: ${error.message}`);
    }
  }

  // 添加 Q&A 消息
  function addQAMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `qa-message ${role}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'qa-message-content';
    
    if (role === 'assistant' && content !== '...') {
      contentDiv.innerHTML = marked.parse(content);
    } else {
      contentDiv.textContent = content;
    }
    
    messageDiv.appendChild(contentDiv);
    qaMessages.appendChild(messageDiv);
    qaMessages.scrollTop = qaMessages.scrollHeight;
    
    return messageDiv;
  }

  // 获取网页内容
  async function getPageContent() {
    if (pageContent) return pageContent;

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const clone = document.cloneNode(true);
        const scripts = clone.querySelectorAll('script, style, noscript, iframe, nav, footer, header');
        scripts.forEach(el => el.remove());

        const body = clone.body || clone;
        let text = body.innerText || body.textContent || '';
        text = text.replace(/\s+/g, ' ').trim();

        return text.substring(0, 30000);
      }
    });

    pageContent = result.result;
    return pageContent;
  }

  // 调用 Gemini API
  async function callGeminiAPI(apiKey, content, userPrompt) {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{
          text: content ? `${userPrompt}\n\nWebpage content:\n${content}` : userPrompt
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

  // 监听快捷键触发
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarize') {
      processPage('Summarize the core content and main points of this webpage in 3-5 sentences.');
    } else if (request.action === 'open-qa') {
      if (currentMode !== 'qa') {
        modeToggle.click();
      }
      qaInput.focus();
    } else if (request.action === 'translate') {
      handleTranslate();
    }
  });
});
