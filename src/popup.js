import { useEffect, useState } from "react";

/**
 * @typedef {Object} Media
 * @property {string} title - The title of the media.
 * @property {string} platform - The platform the media is on.
 * @property {number} currentTime - The current playback time in seconds.
 * @property {number} duration - The total duration of the media in seconds.
 */

/**
 * Popup component for displaying tracked media.
 *
 * @returns {JSX.Element} The rendered popup component.
 */
const Popup = () => {
  const [trackedMedia, setTrackedMedia] = useState([]);

  useEffect(() => {
    {/* Fetch tracked media from local storage */ }
    chrome.storage.local.get("trackedMedia", (result) => {
      setTrackedMedia(result.trackedMedia || []);
    });
  }, []);

  return (
    <div>
      <h1>Tracked Media</h1>
      { trackedMedia.length > 0 ? (
        <ul>
          { trackedMedia.map((media, i) => (
            <li key={ i }>
              <strong>{ media.title }</strong> on { media.platform } <br />
              {/* Calculate remaining time */ }
              Remaining:{ " " }
              { Math.max(0, Math.round(media.duration - media.currentTime)) }s
            </li>
          )) }
        </ul>
      ) : (
        <p>Nothing tracked yet. Watch something!</p>
      ) }
    </div>
  );
};

export default Popup;