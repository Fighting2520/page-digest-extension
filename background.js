// background.js - 后台服务（处理快捷键和侧边栏）

chrome.runtime.onInstalled.addListener(() => {
  console.log('PageDigest installed');
  
  // 创建右键菜单 - 快速操作弹窗
  chrome.contextMenus.create({
    id: 'open-popup',
    title: 'Quick actions (popup)',
    contexts: ['action']
  });
  
  // 创建右键菜单 - 选中文字总结
  chrome.contextMenus.create({
    id: 'summarize-selection',
    title: 'Summarize selected text',
    contexts: ['selection']
  });
});

// 点击插件图标 → 打开侧边栏
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
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
  } else if (command === 'summarize') {
    // 打开侧边栏并触发总结
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.sidePanel.open({ windowId: tabs[0].windowId });
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: 'summarize' });
        }, 300);
      }
    });
  } else if (command === 'open-qa') {
    // 打开侧边栏并切换到问答模式
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.sidePanel.open({ windowId: tabs[0].windowId });
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: 'open-qa' });
        }, 300);
      }
    });
  } else if (command === 'translate') {
    // 打开侧边栏并触发翻译
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.sidePanel.open({ windowId: tabs[0].windowId });
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: 'translate' });
        }, 300);
      }
    });
  }
});

// 处理右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'open-popup') {
    // 打开弹窗（快速操作）
    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: 440,
      height: 600
    });
  } else if (info.menuItemId === 'summarize-selection') {
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
