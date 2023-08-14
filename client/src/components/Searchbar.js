import React, { useState } from "react";
import SearchResults from "./SearchResults";
import { useLazyQuery } from "@apollo/client";
import { GET_OPENAI_RESPONSE } from "../utils/queries";
import searchImg from "./assets/search.png";

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
          <div className="flex-container">
            {/* SEARCH BAR */}
            <form id="search" onSubmit={onSubmit}>
              <div>
                <input
                  className="searchbar"
                  id="searchbar"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Happy camping trip"
                  style={{ paddingLeft: "10px", textAlign: "center" }}
                ></input>
                {/* SEARCH BUTTON */}
                <button className="btn-submit" value="Search" type="submit">
                  <img src={searchImg} alt="Search Icon" />
                </button>
              </div>
              {/*PLAYLIST LENGTH */}
              <div className="custom-radio-list">
                <label className="lengthTitle" htmlFor="length">
                  Length:
                </label>
                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length10"
                    value="10"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  10
                </label>

                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length20"
                    value="20"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  20
                </label>

                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length30"
                    value="30"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  30
                </label>

                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length40"
                    value="40"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  40
                </label>

                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length50"
                    value="50"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  50
                </label>
              </div>
            </form>
          </div>
          {/* GENERATING MESSAGE */}
          <div className="container d-flex justify-content-center align-items-start mt-5">
            <div className="row">
              <div className="col-12">
                <div
                  className="spinner-border"
                  style={{ zIndex: 100 }}
                  role="status"
                >
                  <span className="sr-only"></span>
                </div>
                <span className="ml-3">
                  Getting AI playlist recommendations and Spotify data...
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex-container">
            {/* SEARCH BAR */}
            <form id="search" onSubmit={onSubmit}>
              <div>
                <input
                  className="searchbar"
                  id="searchbar"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Happy camping trip"
                  style={{ paddingLeft: "10px", textAlign: "center" }}
                ></input>
                {/*SEARCH BUTTON */}
                <button className="btn-submit" value="Search" type="submit">
                  <img src={searchImg} alt="Search Icon" />
                </button>
              </div>
              {/*PLAYLIST LENGTH */}
              <div className="custom-radio-list">
                <label className="lengthTitle" htmlFor="length">
                  Length:
                </label>
                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length10"
                    value="10"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  10
                </label>

                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length20"
                    value="20"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  20
                </label>

                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length30"
                    value="30"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  30
                </label>

                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length40"
                    value="40"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  40
                </label>

                <label className="custom-radio-option">
                  <input
                    type="radio"
                    name="length"
                    id="length50"
                    value="50"
                    onChange={handleLength}
                  />
                  <span className="custom-radio-circle"></span>
                  50
                </label>
              </div>
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
