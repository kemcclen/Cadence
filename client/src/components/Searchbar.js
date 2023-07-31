import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { useMutation } from "@apollo/client";
import { SEARCH_TRACKS } from "../../../server/utils/mutations";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [next, setNext] = useState("");

  const [trackSearch, { loading, error, data }] = useMutation(SEARCH_TRACKS, {
    variables: { searchTerm: search },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload;

    if (document.getElementById("btn-track").checked) {
      payload = search;
    } else if (document.getElementById("btn-artist").checked) {
      payload = "artist: " + search;
    } else if (document.getElementById("btn-genre").checked) {
      payload = "genre: " + search;
    }

    if (search) {
      try {
        const { data } = await trackSearch({
          variables: { searchTerm: payload },
        });

        setResults(data.trackSearch);

        setSearch("");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please enter a search term.");
    }
  };

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className='flex-container'>
            <form id='search' onSubmit={onSubmit}>
              <input
                className='btn-search-radio'
                type='radio'
                name='search'
                id='btn-track'
                defaultChecked
                value='By Track Title'
              ></input>
              <label htmlFor='btn-track' className='search-label'>
                By Track Title
              </label>
              <input
                className='btn-search-radio'
                type='radio'
                name='search'
                id='btn-artist'
                value='By Artist'
              ></input>
              <label htmlFor='btn-artist' className='search-label'>
                By Artist
              </label>
              <input
                className='btn-search-radio'
                type='radio'
                name='search'
                id='btn-genre'
                value='By Genre'
              ></input>
              <label htmlFor='btn-genre' className='search-label'>
                By Genre
              </label>
              <div>
                <input
                  className='searchbar'
                  id='searchbar'
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search by Track, Artist, or Genre.'
                ></input>
                <input
                  className='btn-submit'
                  value='Search'
                  type='submit'
                ></input>
              </div>
            </form>
          </div>
          {results && (
            <SearchResults
              results={results}
              setResults={setResults}
              next={next}
              setNext={setNext}
            />
          )}
        </>
      )}
    </>
  );
};

export default Searchbar;
