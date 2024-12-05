import React, { useEffect, useState } from "react";

const App = () => {
  const [trackedMedia, setTrackedMedia] = useState([]);


  useEffect(() => {
    chrome.storage.local.get("trackedMedia", (result) => {
      setTrackedMedia(result.trackedMedia || []);
    });
  }, []);

  return (
    <div>
      <h1>Tracked Media</h1>
      {trackedMedia.length > 0 ? (
        <ul>
          {trackedMedia.map((media, index) => (
            <li key={index}>
              <strong>{media.title}</strong> on {media.platform}
            </li>
          ))}
        </ul>
      ) : (
        <p>No media tracked yet!</p>
      )}
    </div>
  );
};

export default App;