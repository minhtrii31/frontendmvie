import React from "react";
import "./Genre.css";

function Genre({ genres, onSelect }) {
  return (
    <>
      {genres.map((genre) => (
        <li className="list-inline-item" key={genre._id}>
          <button
            className="btn btn-outline-info"
            onClick={() => onSelect(genre._id)}
          >
            {genre.name}
          </button>
        </li>
      ))}
    </>
  );
}

export default Genre;
