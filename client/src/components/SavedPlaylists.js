import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_PLAYLISTS } from "../utils/queries";
import { Carousel } from "react-bootstrap";
import { PiPlayPause } from "react-icons/pi";

const SavedPlaylists = () => {
  const { loading, data } = useQuery(GET_USER_PLAYLISTS, {
    update(cache, { data: { getUserPlaylists } }) {
      const data = cache.readQuery({ query: GET_USER_PLAYLISTS });
      cache.writeQuery({
        query: GET_USER_PLAYLISTS,
        data: {
          getUserPlaylists: [...data.getUserPlaylists, getUserPlaylists],
        },
      });
    },
  });

  let audio = new Audio();

  if (loading) {
    return <div>Loading...</div>;
  }

  const playlists = data?.getUserPlaylists || [];

  return (
    <>
      {playlists.map((playlist) => {
        return (
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <h1 className='text-center mb-5'>{playlist.name}</h1>
                <Carousel className='mt-5'>
                  {playlist.tracks.map((track, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className='d-block w-100'
                          src={track.image}
                          alt='...'
                        />
                        <Carousel.Caption>
                          <h3>{track.title}</h3>
                          <p>{track.artists[0]}</p>
                          {track.previewUrl && (
                            <button
                              className='btn-play'
                              onClick={() => {
                                if (audio.src !== track.previewUrl) {
                                  audio.src = track.previewUrl;
                                }
                                audio.paused ? audio.play() : audio.pause();
                              }}
                            >
                              <PiPlayPause />
                            </button>
                          )}
                          {"  "}

                          <span className='duration'>{track.duration}</span>
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SavedPlaylists;
