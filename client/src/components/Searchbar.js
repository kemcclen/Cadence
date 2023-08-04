import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { useLazyQuery } from "@apollo/client";
import { GET_OPENAI_RESPONSE, LOGIN_SPOTIFY } from "../utils/queries";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [spotifyAuthLink, setSpotifyAuthLink] = useState("");

  const [getOpenAIResponse, { loading, data }] = useLazyQuery(
    GET_OPENAI_RESPONSE,
    {
      onCompleted: (data) => {
        setResults(data.getOpenAIResponse);
      },
    }
  );

  const [loginSpotify] = useLazyQuery(LOGIN_SPOTIFY);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const { data, loading, error } = await loginSpotify();

      if (loading) {
        return <div>Loading...</div>;
      }

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log("Login Successful!", data.loginSpotify);
        setSpotifyAuthLink(data.loginSpotify);
        window.location.href = data.loginSpotify;
      }
    } catch (err) {
      console.error(err);
    }
  };

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
                <div
                  className='spinner-border'
                  style={{ zIndex: 100 }}
                  role='status'
                >
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
            <button className='btn-submit' onClick={handleClick}>
              LOGIN TO SPOTIFY
            </button>
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
