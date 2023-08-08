import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_PLAYLISTS } from "../utils/queries";
import { DELETE_PLAYLIST } from "../utils/mutations";
import { Carousel, Button } from "react-bootstrap";
import { PiPlayPause } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";

const SavedPlaylists = () => {
  const { loading, error, data, refetch } = useQuery(GET_USER_PLAYLISTS, {
    onCompleted: (data) => {
      refetch();
    },
  });

  const [deletePlaylist] = useMutation(DELETE_PLAYLIST);

  let audio = new Audio();

  if (loading) {
    return <div>Loading...</div>;
  }

  const playlists = data?.getUserPlaylists || [];

  return (
    <>
      {playlists.length ? (
        playlists.map((playlist) => {
          return (
            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <div className='d-flex'>
                    <h1 className='text-center mb-5'>{playlist.name}</h1>
                    <Button
                      className='ms-auto'
                      style={{ height: "fit-content" }}
                      variant='danger'
                      onClick={async () => {
                        await deletePlaylist({
                          variables: {
                            playlistId: playlist._id,
                          },
                        });
                        refetch();
                      }}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                  <h2 className='text-center mb-5 ms-auto'>
                    {playlist.description}
                  </h2>
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
        })
      ) : (
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <h1 className='text-center mb-5'>No saved playlists yet!</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedPlaylists;
