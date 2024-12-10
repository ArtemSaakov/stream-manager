/**
 * An array to store tracked media items.
 * @type {Media[]}
 */
let trackedMedia = [];

/**
 * Listener for messages from other parts of the extension.
 *
 * @param {Object} message - The message received from the sender.
 * @param {chrome.runtime.MessageSender} sender - Details about the script context that sent the message.
 * @param {function} sendResponse - Function to call when you have a response. The argument should be any JSON-ifiable object.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateMedia") {
    /** @type {Media} */
    const media = message.data;

   // Find the index of the existing media item with the same title and platform
   const existingMediaIndex = trackedMedia.findIndex(
    (item) => item.title === media.title && item.platform === media.platform
  );

  if (existingMediaIndex >= 0) {
    // Update the existing media item
    trackedMedia[existingMediaIndex] = media;
  } else {
    // Add the new media item to the trackedMedia array
    trackedMedia.push(media);
  }
    // Save updated trackedMedia to storage
    chrome.storage.local.set({ trackedMedia }, () => {
      if (chrome.runtime.lastError) {
        console.log("Failed to update trackedMedia in storage:", chrome.runtime.lastError);
      }
    });
  }
});