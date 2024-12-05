/*
script to fetch Netflix metadata to be displayed in the
Stream-Manager(TM) extension

tries to gather the metadata from the Netflix video player and send it to
the background script. observes Netflix's root DOM and monitors it for changes (🤞)
*/

const getNetflixMetadata = () => {
  // variable explanations in order:
  // the media title, episode title/number, season title, the video player element itself
  const netflixData = {
    title: document.querySelector("h2.ltr-er2d3m"),
    episode: document.querySelector("h3.ltr-xa2yhw"),
    season: document.querySelector("h4.ltr-lwi9ge"),
    videoPlayer: document.querySelector("video"),
  };

  if (netflixData["title"] && netflixData["videoPlayer"]) {
    const { title, episode, season, videoPlayer } = netflixData;

    // create a workable media object with all relevant data
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

/*sends the mediaDetails to the background script. uses a chrome extension API*/
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

/*monitors the Netflix DOM for changes/updates
MutationObserver API watches for changes in the DOM.*/
const videoElement = document.querySelector("video");
if (videoElement && videoElement.parentNode) {
  const observedNode = videoElement.parentNode;
  const observer = new MutationObserver(() => {
    sendMediaDetails();
  });

  /*the observing process... targeting the video parent node
because we just want changes related to the video*/
  observer.observe(observedNode, {
    childList: true,
    subtree: true,
  });

  sendMediaDetails();
} else {
  console.error("Unable to find the video player's parent node.");
}
