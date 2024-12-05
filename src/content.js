/*
script to fetch Netflix metadata to be displayed in the
Stream-Manager(TM) extension

tries to gather the metadata from the Netflix video player and send it to
the background script. observes Netflix's root DOM and monitors it for changes (🤞)
*/

const getNetflixMetadata = () => {
  // variable explanations in order:
  // the media title, episode title, season/episode info, the video player element itself
  const netflixData = {
    title: document.querySelector("h2.ltr-er2d3m"),
    episode: document.querySelector(".episode-title"),
    mediaMetadata: document.querySelector(".ellipsize-text"),
    videoPlayer: document.querySelector("video"),
  };

  if (netflixData["title"] && netflixData["videoPlayer"]) {
    const { title, episode, mediaMetadata, videoPlayer } = netflixData;

    // create a workable media object with all relevant data
    const mediaDetails = {
      title: title.textContent,
      episode: episode.textContent,
      mediaMetadata: mediaMetadata.textContent,
      currentTime: videoPlayer.currentTime,
      duration: videoPlayer.duration,
      platform: "Netflix",
    };

    return mediaDetails;
  };

  return null;
};


/*sends the mediaDetails to the background script. uses a chrome extension API*/
const sendMetadata = () => {

  const mediaDetails = getNetflixMetadata();
  if (mediaDetails) {
    chrome.runtime.sendMessage({
      type: "updateMedia",
      data: mediaDetails,
    });
  };
};

/*monitors the Netflix DOM for changes/updates*/
const observer = new MutationObserver(() => {
  sendMediaDetails();
});

/*the observing process*/
const observed