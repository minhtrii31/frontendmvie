import React, { useEffect, useState } from "react";
import "./MovieCard.css";
import { getAllMovies, getMovieById } from "../../../services/movies.service";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function MovieCard({
  latestOnly,
  searchKeyword,
  selectedGenre,
  movie,
  top,
  topViews,
  sortOption,
}) {
  const [movies, setMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(7);

  useEffect(() => {
    console.log(sortOption);

    if (movie) {
      getMovieById(movie)
        .then((data) => {
          setMovies([data]);
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      getAllMovies(latestOnly, searchKeyword, selectedGenre)
        .then((data) => {
          let filteredMovies = latestOnly ? data.slice(0, 6) : data;
          if (searchKeyword) {
            const lowercaseSearchKeyword =
              typeof searchKeyword === "string"
                ? searchKeyword.toLowerCase()
                : searchKeyword.toString().toLowerCase();

            filteredMovies = filteredMovies.filter((movie) =>
              movie.title.toLowerCase().includes(lowercaseSearchKeyword)
            );
          } else if (selectedGenre) {
            filteredMovies = filteredMovies.filter((movie) =>
              movie.genres.includes(selectedGenre)
            );
          } else if (top) {
            filteredMovies.sort((a, b) => b.imdbRating - a.imdbRating);
            filteredMovies = filteredMovies.slice(0, 6);
          } else if (topViews) {
            filteredMovies.sort((a, b) => b.views - a.views);
            filteredMovies = filteredMovies.slice(0, 6);
          }
          switch (sortOption) {
            case "alphabetical":
              console.log("Sorting alphabetical");
              filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
              break;
            case "releaseDate":
              console.log("Sorting by release date");
              filteredMovies.sort((a, b) => b.releaseYear - a.releaseYear);
              break;
            case "highestRating":
              console.log("Sorting by highest rating");
              filteredMovies.sort((a, b) => b.imdbRating - a.imdbRating);
              break;
            default:
              break;
          }

          setMovies(filteredMovies);
        })
        .catch((e) => {
          toast.error("Error fetching data: ", e);
        });
    }
  }, [
    searchKeyword,
    latestOnly,
    selectedGenre,
    movie,
    top,
    topViews,
    sortOption,
  ]);

  const handleLoadMore = () => {
    setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 5);
  };

  return (
    <div>
      <div className="movie-row">
        {movies.slice(0, visibleMovies).map((movie) => (
          <div className="swiper-slide" key={movie._id}>
            <Link
              to={`/movies/${movie._id}`}
              style={{
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              <img
                className="movie-poster"
                src={movie.poster}
                alt=""
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
              <div className="movie-info">
                <img className="movie-info-img" src={movie.imageUrl} alt="" />
                <div className="movie-info-desc">
                  <h4>{movie.title}</h4>
                  <span>
                    <i className="bi bi-star-fill"></i> {movie.imdbRating}
                  </span>
                  <span>&emsp;|&emsp;{movie.releaseYear}</span>
                </div>
                <span>{movie.director}</span>
                <div
                  style={{
                    padding: "10px 30px",
                    maxHeight: "15%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {movie.description}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {movies.length > visibleMovies && (
        <div style={{ margin: "50px 0" }}>
          <button className="buttonHero buttonMore" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieCard;
