// background.js - 后台服务

chrome.runtime.onInstalled.addListener(() => {
  console.log('PageDigest 已安装');
});

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    // 可以在这里处理更复杂的逻辑
    sendResponse({ success: true });
  }
  return true;
});
