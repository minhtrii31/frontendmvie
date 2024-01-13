import React, { useEffect, useState } from "react";
import {
  getMoviesByGenreName,
  getNewest,
  getTopMovies,
  getTopViewedMovies,
} from "../../../services/movies.service";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./CardSlider.css";
import { Link } from "react-router-dom";

function CardSlider({ type, genreName }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let moviesData;
        switch (type) {
          case "top":
            moviesData = await getTopMovies();
            break;
          case "topViews":
            moviesData = await getTopViewedMovies();
            break;
          case "newest":
            moviesData = await getNewest();
            break;
          case "byGenreName":
            moviesData = await getMoviesByGenreName(genreName);
            break;
          default:
            break;
        }
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchMovies();
  }, [type, genreName]);

  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        padding: "30px",
      }}
      slidesPerView={3}
      spaceBetween={5}
      freeMode={true}
      navigation
      scrollbar={{ draggable: true }}
      modules={[FreeMode, Pagination, Navigation, A11y]}
      onSlideChange={() => console.log("slide change")}
      effect={"cube"}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      breakpoints={{
        1200: {
          slidesPerView: 6,
        },
        768: {
          slidesPerView: 4,
        },
      }}
    >
      <div className="movie-row">
        {movies.map((m) => (
          <div className="movie-column" key={m._id}>
            <SwiperSlide>
              <Link
                to={`/movies/${m._id}`}
                style={{
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                <img
                  className="movie-poster"
                  src={m.poster}
                  alt=""
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    zIndex: "3",
                  }}
                />
                <div className="movie-info" style={{ zIndex: "10" }}>
                  <img className="movie-info-img" src={m.imageUrl} alt="" />
                  <div className="movie-info-desc">
                    <h4>{m.title}</h4>
                    <span>
                      <i className="bi bi-star-fill"></i> {m.imdbRating}
                    </span>
                    <span>&emsp;|&emsp;{m.releaseYear}</span>
                  </div>
                  <span>{m.director}</span>
                  <div
                    style={{
                      padding: "10px 30px",
                      maxHeight: "15%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {m.description}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          </div>
        ))}
      </div>
    </Swiper>
  );
}

export default CardSlider;
