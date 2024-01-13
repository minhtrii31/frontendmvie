import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Loading from "../../components/Loading/Loading";
import SearchBox from "../../components/SearchBox/SearchBox";
import Genres from "../../components/Genres/Genres";
import { getAllMovies } from "../../services/movies.service";
import MovieCard from "../../components/Cards/MovieCard/MovieCard";

function MoviesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortType, setSortType] = useState("");

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const handleSort = (sortOption) => {
    console.log("Sorting by:", sortOption);
    setSortType(sortOption);
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId === "all" ? null : genreId);
  };

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <div className="fluid">
            <div className="heading">Search</div>
            <SearchBox onSearch={handleSearch} onSort={handleSort} />
            <Genres onGenreSelect={handleGenreSelect} />
            <div className="heading">Result</div>
            <MovieCard
              latestOnly={false}
              searchKeyword={searchKeyword}
              selectedGenre={selectedGenre}
              movies={movies}
              sortOption={sortType}
            />
          </div>
        </MainLayout>
      )}
    </div>
  );
}

export default MoviesPage;
