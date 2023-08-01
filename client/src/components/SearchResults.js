import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import BottomNav from "./BottomNav";
import MetaInfo from "./MetaInfo";

const SearchResults = ({ results, setResults, next, setNext }) => {
  const [addedTracks, setAddedTracks] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [showMetaInfo, setShowMetaInfo] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const portrait = window.matchMedia("(orientation: portrait)");

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    portrait.addEventListener("change", handleResize);

    return () => {
      portrait.removeEventListener("change", handleResize);
    };
  }, []);

  let audio = new Audio();

  const deleteTrack = (id) => {
    setAddedTracks((prevAddedTracks) =>
      prevAddedTracks.filter((track) => track.trackId !== id)
    );
  };

  const goToSearch = () => {
    setShowResults(true);
    setShowMetaInfo(false);
  };

  const goToData = () => {
    setShowResults(false);
    setShowMetaInfo(true);
  };

  const titles = results.map((track) => {
    let artists = [];
    track.artists.forEach((artist) => artists.push(artist));
    const artistNames = artists.join(", ");

    return (
      <tr key={track.trackId}>
        <td>
          <div className='flex-container-tracks'>
            {track.previewUrl && (
              <button
                className='btn-play'
                onClick={() => {
                  if (audio.src !== track.previewUrl) {
                    audio.src = track.previewUrl;
                  }
                  audio.paused ? audio.play() : audio.pause();
                }}
              >
                <FaPlay />
              </button>
            )}
            <button
              className='btn-add-track'
              onClick={() => {
                if (!addedTracks.includes(track)) {
                  setAddedTracks([...addedTracks, track]);
                }
              }}
            >
              +
            </button>
          </div>
        </td>
        <td>{artistNames}</td>
        <td>{track.title}</td>
      </tr>
    );
  });

  return (
    <>
      <div className='flex-container-tracks'>
        <section className='results-section'>
          {showResults && (
            <>
              <h2 className='track-results-header'>Preview and Add Tracks</h2>
              <table>
                <tbody>{titles}</tbody>
              </table>
            </>
          )}
        </section>
      </div>
      {showMetaInfo && (
        <MetaInfo addedTracks={addedTracks} deleteTrack={deleteTrack} />
      )}
      <BottomNav search={goToSearch} data={goToData} />
    </>
  );
};

export default SearchResults;
