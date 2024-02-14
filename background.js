// background.js
chrome.runtime.onInstalled.addListener(function () {
    // Initialize storage if not present
    chrome.storage.local.get(['tp', 'fp', 'fn', 'tn'], function (result) {
      if (!result.tp || !result.fp || !result.fn || !result.tn) {
        chrome.storage.local.set({ 'tp': 0, 'fp': 0, 'fn': 0, 'tn': 0 });
      }
    });
  });
  
  // Listen for changes from content scripts or popup
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.updateStorage) {
      chrome.storage.local.set({
        'tp': request.tp || 0,
        'fp': request.fp || 0,
        'fn': request.fn || 0,
        'tn': request.tn || 0
      });
    }
  });
  