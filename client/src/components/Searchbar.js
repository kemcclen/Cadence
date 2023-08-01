import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { useLazyQuery } from "@apollo/client";
import { GET_OPENAI_RESPONSE } from "../utils/queries";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [getOpenAIResponse, { loading, data }] = useLazyQuery(
    GET_OPENAI_RESPONSE,
    {
      onCompleted: (data) => {
        setResults(data.getOpenAIResponse);
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await getOpenAIResponse({ variables: { length: 10, input: search } });
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
            </form>
          </div>
          <div className='container'>
            <div className='row'>
              <div className='col-12 d-flex justify-content-center align-items-center mt-5'>
                <div className='spinner-border' role='status'>
                  <span className='sr-only'></span>
                </div>
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
            </form>
          </div>
          {results && (
            <SearchResults results={results} setResults={setResults} />
          )}
        </>
      )}
    </>
  );
};

export default Searchbar;
