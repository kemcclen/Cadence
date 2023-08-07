import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { useLazyQuery } from "@apollo/client";
import { GET_OPENAI_RESPONSE } from "../utils/queries";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(
    JSON.parse(localStorage.getItem("results")) || []
  );
  const [length, setLength] = useState(10);

  const [getOpenAIResponse, { loading }] = useLazyQuery(GET_OPENAI_RESPONSE, {
    onCompleted: (data) => {
      console.log("OpenAI Response:", data.getOpenAIResponse);

      if (data.getOpenAIResponse) {
        setResults(data.getOpenAIResponse);
        localStorage.setItem("results", JSON.stringify(data.getOpenAIResponse));
      } else {
        setResults([]);
        localStorage.setItem("results", JSON.stringify([]));
      }
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleLength = (e) => {
    setLength(parseInt(e.target.value));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await getOpenAIResponse({ variables: { length, input: search } });
      setSearch("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div className='flex-container'>
            <form id='search' onSubmit={onSubmit}>
              <div>
                <input
                  className='searchbar'
                  id='searchbar'
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Happy camping trip'
                ></input>
                <input
                  className='btn-submit'
                  value='Search'
                  type='submit'
                ></input>
              </div>
              <label htmlFor='length'>Length of Playlist</label>
              <select name='length' id='length' onChange={handleLength}>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
                <option value='40'>40</option>
                <option value='50'>50</option>
              </select>
            </form>
          </div>
          <div className='container d-flex justify-content-center align-items-start mt-5'>
            <div className='row'>
              <div className='col-12'>
                <div
                  className='spinner-border'
                  style={{ zIndex: 100 }}
                  role='status'
                >
                  <span className='sr-only'></span>
                </div>
                <span className='ml-3'>
                  Getting AI playlist recommendations and Spotify data...
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex-container'>
            <form id='search' onSubmit={onSubmit}>
              <div>
                <input
                  className='searchbar'
                  id='searchbar'
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Happy camping trip'
                ></input>
                <input
                  className='btn-submit'
                  value='Search'
                  type='submit'
                ></input>
              </div>
              <label htmlFor='length'>Length of Playlist</label>
              <select name='length' id='length' onChange={handleLength}>
                <option value='10'>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
                <option value='40'>40</option>
                <option value='50'>50</option>
              </select>
            </form>
          </div>
          {results.length && (
            <>
              <SearchResults results={results} setResults={setResults} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Searchbar;
