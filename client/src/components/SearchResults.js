import React, { useState, useEffect } from "react";
import Playlist from "./Playlist";
import SavePlaylistForm from "./SavePlaylistForm";

const SearchResults = ({ results, setResults }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let images = [];
  for (let i = 0; i < results.length; i++) {
    if (i === 4) break;
    images.push(results[i].image);
  }

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

  return (
    <>
      <div className='container d-flex align-items-start justify-content-center'>
        <div className='row'>
          <div className='col-12'>
            <Playlist playlist={results} />
            <SavePlaylistForm
              className='mt-3'
              tracks={results}
              images={images}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
