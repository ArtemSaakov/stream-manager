let trackedMedia = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateMedia") {
    const media = message.data;

    // check if the media is already being tracked (by title and platform)
    const existingMediaIndex = trackedMedia.findIndex(
      (item) => item.title === media.title && item.platform === media.platform
    );

    if (existingMediaIndex >= 0) {
      // update the existing entry
      trackedMedia[existingMediaIndex] = media;
    } else {
      // add new media to the list
      trackedMedia.push(media);
    }

    // save updated trackedMedia to storage
    chrome.storage.local.set({ trackedMedia }, () => {
      if (chrome.runtime.lastError) {
        console.log("Failed to update trackedMedia in storage:", chrome.runtime.lastError);
      }
    });
  }
});