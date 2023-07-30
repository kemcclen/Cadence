import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";
import { GET_TRACK_ANALYSIS } from "../utils/mutations";
import { GET_TRACKS } from "../utils/queries";

const Track = (props) => {
  const [apiData, setApiData] = useState("");

  const [getTrackAnalysis, { loading, error, data }] = useMutation(
    GET_TRACK_ANALYSIS,
    {
      variables: { trackId: props.id },
    }
  );

  useEffect(() => {
    getTrackAnalysis();
  }, []);

  console.log("DATA", data);

  if (error) console.log(error);

  const keyConverter = {
    0: "C",
    1: "C#",
    2: "D",
    3: "E♭",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "B♭",
    11: "B",
  };

  let artists = [];
  props.artists.forEach((artist) => artists.push(artist));
  const artistList = artists.join(", ");

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <tr key={props.id}>
          <td>
            <button
              className='btn-delete-track'
              onClick={() => props.deleteTrack(props.id)}
            >
              -
            </button>
          </td>
          <td>{artistList}</td>
          <td>{`${
            props.title.length > 30
              ? props.title.slice(0, 29) + "..."
              : props.title
          }`}</td>
          <td>{`${Math.floor(
            Math.round(apiData.duration / 1000 / 60)
          )}:${Math.round(apiData.duration / 1000)}`}</td>
          <td>{apiData.bpm}</td>
          <td>{keyConverter[apiData.key]}</td>
          <td>{Math.round(apiData.energy * 100) + "%"}</td>
          <td>{Math.round(apiData.danceability * 100) + "%"}</td>
        </tr>
      )}
    </>
  );
};
export default Track;
