// background.js - Service Worker
// Gère les messages globaux et le démarrage de l'enregistrement

chrome.runtime.onInstalled.addListener(() => {
  console.log('Logic Time-Machine installé');
});

// Écoute les messages du popup/content
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startRecording') {
    // Broadcast à tous les tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {action: 'startTracer'});
      });
    });
    sendResponse({success: true});
  } else if (request.action === 'stopRecording') {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {action: 'stopTracer'});
      });
    });
    sendResponse({success: true});
  }
  return true; // async response
});

// Communication avec DevTools
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'timeMachinePanel') {
    port.onMessage.addListener((msg) => {
      // Relayer vers content scripts
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, msg);
        }
      });
    });
  }
});

