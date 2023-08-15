import React from "react";
import { Carousel } from "react-bootstrap";
import { PiPlayPause } from "react-icons/pi";

const Playlist = ({ playlist }) => {
  let audio = new Audio();

  const carouselItems = playlist.map((track, index) => {
    return (
      <Carousel.Item key={index}>

        {/* Album art */}
        <div className="carousel-item-content">
          <img src={track.image} alt="..." />
        </div>
        {/* Album info */}
        <div className="caption-content">

          <Carousel.Caption>
            <h3>{track.title}</h3>
            <p>{track.artist}</p>
            {track.previewUrl && (
              // Play button
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


            <span className='duration'>{track.duration}</span>

          </Carousel.Caption>
        </div>
      </Carousel.Item>
    );
  });

  return (
    <>

      <Carousel className="mt-5 carousel-view">{carouselItems}</Carousel>

    </>
  );
};

export default Playlist;
