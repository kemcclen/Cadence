import React, { useState, useEffect } from "react";
import Track from "./Track";

const MetaInfo = ({ addedTracks, deleteTrack }) => {
  const [showMetaInfo, setShowMetaInfo] = useState(false);

  useEffect(() => {
    setShowMetaInfo(addedTracks.length > 0);
  }, [addedTracks]);

  return (
    <>
      {showMetaInfo && (
        <section>
          <h2 className='meta-info-header'>Meta Info</h2>
          <table className='table'>
            <thead>
              <tr>
                <th></th>
                <th>Artist(s)</th>
                <th>Title</th>
                <th>Duration</th>
                <th>BPM</th>
                <th>Key</th>
                <th>Energy</th>
                <th>Danceability</th>
              </tr>
            </thead>
            <tbody>
              {addedTracks.map((track) => (
                <Track
                  key={track.trackId}
                  id={track.trackId}
                  title={track.title}
                  artists={track.artists}
                  addedTracks={addedTracks}
                  deleteTrack={deleteTrack}
                />
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
  );
};

export default MetaInfo;
