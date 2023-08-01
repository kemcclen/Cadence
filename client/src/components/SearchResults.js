import React, { useState, useEffect } from "react";
import Playlist from "./Playlist";

const SearchResults = ({ results, setResults }) => {
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

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <Playlist playlist={results} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
