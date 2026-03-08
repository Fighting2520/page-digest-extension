// background.js - 后台服务（处理快捷键和侧边栏）

chrome.runtime.onInstalled.addListener(() => {
  console.log('PageDigest installed');
  
  // 创建右键菜单
  chrome.contextMenus.create({
    id: 'summarize-selection',
    title: 'Summarize selected text',
    contexts: ['selection']
  });
});

// 处理快捷键
chrome.commands.onCommand.addListener((command) => {
  console.log('Command:', command);
  
  if (command === 'toggle-sidepanel') {
    // 切换侧边栏
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.sidePanel.open({ windowId: tabs[0].windowId });
      }
    });
  } else {
    // 其他命令发送到侧边栏
    chrome.runtime.sendMessage({ action: command });
  }
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'summarize-selection') {
    const selectedText = info.selectionText;
    
    // 打开侧边栏并发送选中文本
    chrome.sidePanel.open({ windowId: tab.windowId }, () => {
      setTimeout(() => {
        chrome.runtime.sendMessage({
          action: 'summarize-selection',
          text: selectedText
        });
      }, 500);
    });
  }
});

// 监听来自 content script 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    sendResponse({ success: true });
  }
  return true;
});
