let trackedMedia = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateMedia") {
    const media = message.data;
    trackedMedia.push(media);
    chrome.storage.local.set({ trackedMedia });
  }
});