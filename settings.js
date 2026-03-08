// settings.js - 设置页面逻辑

document.addEventListener('DOMContentLoaded', async () => {
  const apiKeyInput = document.getElementById('api-key-input');
  const toggleKeyVisibility = document.getElementById('toggle-key-visibility');
  const saveKeyBtn = document.getElementById('save-key-btn');

  // 加载已保存的 API Key
  const { apiKey } = await chrome.storage.local.get('apiKey');
  if (apiKey) {
    apiKeyInput.value = apiKey;
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
        alert('API Key saved successfully!');
        window.close();
      } catch (error) {
        alert('Failed to save API Key: ' + error.message);
      }
    });
  }
});
