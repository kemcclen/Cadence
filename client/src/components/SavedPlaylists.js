import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PLAYLISTS } from "../utils/queries";
import { Carousel } from "react-bootstrap";

const SavedPlaylists = () => {
  const { loading, data } = useQuery(GET_USER_PLAYLISTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const playlists = data?.getUserPlaylists || [];

  console.log(playlists);
  // return a carousel for each playlist containing the tracks
  return (
    <div>
      <h1>Saved Playlists</h1>
      <Carousel>
        {playlists.map((playlist) => (
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={playlist.images[0].url}
              alt='First slide'
            />
            <Carousel.Caption>
              <h3>{playlist.name}</h3>
              <p>{playlist.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SavedPlaylists;
