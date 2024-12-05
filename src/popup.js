import { useEffect, useState } from "react";

const Popup = () => {
  const [trackedMedia, setTrackedMedia] = useState([]);

  //
  useEffect(() => {
    chrome.storage.local.get("cachedMedia", (result) => {
      setTrackedMedia(
        result.cachedMedia || ["Nothing tracked yet. Watch something!"]
      );
    });
  }, []);

  return (
    <div>
      <h1>Tracked Media</h1>
      <ul>
        {trackedMedia.map((media, i) => (
          <li key={i}>
            {media.title} on {media.platform}
            {/*need to include remaining time as well*/}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
