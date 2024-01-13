import React, { useEffect, useRef, useState } from "react";
import { Button, Carousel, Image } from "react-bootstrap";
import { getAllMovies } from "../../services/movies.service";
import { Link } from "react-router-dom";
import "./CustomCarousel.css";
import ReactPlayer from "react-player";

function CustomCarousel() {
  const [movies, setMovies] = useState([]);
  const [mutedVideos, setMutedVideos] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const playerRef = useRef();

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        const latestFourMovies = data
          .sort((a, b) => b.releaseYear - a.releaseYear)
          .slice(0, 4);
        setMovies(latestFourMovies);
        setMutedVideos(
          latestFourMovies.reduce(
            (acc, movie) => ({ ...acc, [movie._id]: true }),
            {}
          )
        );
      })
      .catch((e) => {
        console.log("Error fetching data: ", e);
      });
  }, []);

  const handleMuteToggle = (videoId) => {
    setMutedVideos((prevMutedVideos) => ({
      ...prevMutedVideos,
      [videoId]: !prevMutedVideos[videoId],
    }));
  };

  const handleSlideChange = (selectedIndex) => {
    if (playerRef.current) {
      playerRef.current.seekTo(0, "seconds");
      const isPreviousVideoMuted = mutedVideos[movies[activeIndex]._id];
      setMutedVideos((prevMutedVideos) => ({
        ...prevMutedVideos,
        [movies[selectedIndex]._id]: isPreviousVideoMuted,
        [movies[activeIndex]._id]: true,
      }));
    }

    setActiveIndex(selectedIndex);
  };

  const handleVideoEnded = () => {
    setMutedVideos((prevMutedVideos) => ({
      ...prevMutedVideos,
      [movies[activeIndex]._id]: true,
    }));
    setActiveIndex(-1);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsVideoVisible(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Carousel
      activeIndex={activeIndex}
      onSelect={handleSlideChange}
      data-bs-theme="light"
      keyboard={true}
      style={{ position: "relative" }}
      fade
    >
      {movies.map((m, index) => (
        <Carousel.Item key={m._id}>
          {isVideoVisible ? (
            <ReactPlayer
              ref={playerRef}
              url={m.video}
              className="carousel-video"
              width="100%"
              height="70vh"
              loop
              playing
              muted={mutedVideos[m._id]}
              onEnded={handleVideoEnded}
              config={{
                file: {
                  forceVideo: true,
                },
              }}
            />
          ) : (
            <Image
              src={m.imageUrl}
              style={{
                height: 1000,
                width: "100%",
                objectFit: "cover",
                opacity: 0.5,
              }}
            />
          )}
          <Carousel.Caption as="div" className="carousel-caption">
            <div className="carousel-caption-wrapper">
              <h1>{m.title}</h1>
              <div className="carousel-rating">
                <span>
                  <i className="bi bi-star-fill"></i> {m.imdbRating}
                </span>
                <span>&emsp;|&emsp;{m.releaseYear}</span>
              </div>
              <div className="carousel-content">
                <p style={{ color: "white" }}>{m.description || m.director}</p>
              </div>
              <Link to={`/movies/${m._id}`}>
                <Button
                  className="buttonStyle"
                  style={{
                    margin: "30px 0",
                    textDecoration: "none",
                  }}
                >
                  Watch Now
                </Button>
              </Link>
            </div>
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => handleMuteToggle(m._id)}
                className="buttonMute"
                style={{
                  margin: "10px 0",
                  textDecoration: "none",
                }}
              >
                {mutedVideos[m._id] ? (
                  <i className="volumn bi bi-volume-mute"></i>
                ) : (
                  <i className="volumn bi bi-volume-up"></i>
                )}
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CustomCarousel;
