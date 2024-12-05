import { useEffect, useState } from "react";

const Popup = () => {
  const [trackedMedia, setTrackedMedia] = useState([]);

  useEffect(() => {
    // Fetch tracked media from storage
    chrome.storage.local.get("trackedMedia", (result) => {
      setTrackedMedia(result.trackedMedia || []);
    });
  }, []);

  return (
    <div>
      <h1>Tracked Media</h1>
      {trackedMedia.length > 0 ? (
        <ul>
          {trackedMedia.map((media, i) => (
            <li key={i}>
              <strong>{media.title}</strong> on {media.platform} <br />
              {/* calculate remaining time at some point */}
              Remaining:{" "}
              {Math.max(0, Math.round(media.duration - media.currentTime))}s
            </li>
          ))}
        </ul>
      ) : (
        <p>Nothing tracked yet. Watch something!</p>
      )}
    </div>
  );
};

export default Popup;