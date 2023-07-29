import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { useQuery } from "@apollo/client";
import { QUERY_TRACKS } from "../utils/queries";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [next, setNext] = useState("");

  const { loading, error, data } = useQuery(QUERY_TRACKS, {
    variables: { searchTerm: search },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;

  // if (error) return <p>Error: Something Went Wrong</p>;

  const onSubmit = async (e) => {
    e.preventDefault();

    let payload;

    if (document.getElementById("btn-track").checked) {
      payload = JSON.stringify({ track: search });
    } else if (document.getElementById("btn-artist").checked) {
      payload = JSON.stringify({ track: "artist:" + search });
    } else if (document.getElementById("btn-genre").checked) {
      payload = JSON.stringify({ track: "genre:" + search });
    }

    if (search) {
      setSearch(payload);

      console.log(data);
    }
  };

  return (
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
            <input className='btn-submit' value='Search' type='submit'></input>
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
  );
};

export default Searchbar;
