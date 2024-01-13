import React, { useState } from "react";
import "./SearchBox.css";

function SearchBox({ onSearch, onSort }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearch = () => {
    onSearch(searchKeyword);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortClick = (option) => {
    setSortOption(option);
    onSort(option);
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          className="search-input"
          placeholder="Enter title to search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="buttonStyle buttonSearch" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          margin: "20px 0",
        }}
      >
        <button
          className={`buttonOutline sorting-button ${
            sortOption === "alphabetical" && "active"
          }`}
          onClick={() => handleSortClick("alphabetical")}
        >
          Alphabetical
        </button>
        <button
          className={`buttonOutline sorting-button ${
            sortOption === "releaseDate" && "active"
          }`}
          onClick={() => handleSortClick("releaseDate")}
        >
          Release Date
        </button>
        <button
          className={`buttonOutline sorting-button ${
            sortOption === "highestRating" && "active"
          }`}
          onClick={() => handleSortClick("highestRating")}
        >
          Highest Rating
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
