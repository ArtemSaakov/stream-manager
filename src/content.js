/**
 * Fetches metadata from the Netflix video player to be displayed in the Stream-Manager extension.
 *
 * @returns {Object|null} The media details if available, otherwise null.
 */
const getNetflixMetadata = () => {
  // Variables to store Netflix DOM elements
  const netflixData = {
    /** @type {HTMLElement|null} */
    title: document.querySelector("h2.ltr-er2d3m"),
    /** @type {HTMLElement|null} */
    episode: document.querySelector("h3.ltr-xa2yhw"),
    /** @type {HTMLElement|null} */
    season: document.querySelector("h4.ltr-lwi9ge"),
    /** @type {HTMLVideoElement|null} */
    videoPlayer: document.querySelector("video"),
  };

  if (netflixData.title && netflixData.videoPlayer) {
    const { title, episode, season, videoPlayer } = netflixData;

    // Create a media object with all relevant data
    const mediaDetails = {
      title: title.textContent.trim(),
      episode: episode?.textContent.trim() || null,
      season: season?.textContent.trim() || null,
      currentTime: videoPlayer.currentTime,
      duration: videoPlayer.duration,
      platform: "Netflix",
    };

    return mediaDetails;
  }

  return null;
};

/**
 * Sends the media details to the background script using the Chrome extension API.
 */
const sendMetadata = () => {
  const mediaDetails = getNetflixMetadata();
  if (mediaDetails) {
    try {
      chrome.runtime.sendMessage({
        type: "updateMedia",
        data: mediaDetails,
      });
    } catch (error) {
      console.error("Failed to send metadata:", error);
    }
  } else {
    console.warn("No media details available to send.");
  }
};

/**
 * Monitors the Netflix DOM for changes and sends updated media details.
 * Uses MutationObserver API to watch for changes in the DOM.
 */
const videoElement = document.querySelector("video");
if (videoElement && videoElement.parentNode) {
  const observedNode = videoElement.parentNode;
  const observer = new MutationObserver(() => {
    sendMetadata();
  });

  // Start observing changes to the video player's parent node
  observer.observe(observedNode, {
    childList: true,
    subtree: true,
  });

  // Send initial media details
  sendMetadata();
} else {
  console.error("Unable to find the video player's parent node.");
}