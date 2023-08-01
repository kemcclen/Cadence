import React from "react";
import { Carousel } from "react-bootstrap";
import { FaPlay } from "react-icons/fa";

const Playlist = ({ playlist }) => {
  let audio = new Audio();

  const carouselItems = playlist.map((track) => {
    return (
      <Carousel.Item key={track.id}>
        <img className='d-block w-100' src={track.image} alt='...' />
        <Carousel.Caption>
          <h3>{track.title}</h3>
          <p>{track.artist}</p>
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
              <FaPlay />
            </button>
          )}

          {"  "}
          <span className='duration'>{track.duration}</span>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  return (
    <>
      <Carousel>{carouselItems}</Carousel>
    </>
  );
};

export default Playlist;
