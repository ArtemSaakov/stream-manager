/* global chrome */
import React, { useEffect, useState } from "react";

/**
 * The main application component that displays tracked media.
 *
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
  /**
   * @typedef {Object} Media
   * @property {string} title - The title of the media.
   * @property {string} platform - The platform of the media.
   */

  /** @type {Media[]} */
  const [trackedMedia, setTrackedMedia] = useState([]);

  /**
   * Fetches the tracked media from Chrome storage when the component mounts.
   */
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
            /**
             * Renders a single media item.
             *
             * @param {Media} media - The media item to display.
             * @param {number} index - The index of the media item.
             * @returns {JSX.Element} The list item element.
             */
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