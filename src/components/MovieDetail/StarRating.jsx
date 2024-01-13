import React from "react";
import { Container } from "react-bootstrap";

function StarRating({ rating }) {
  const stars = [];
  const integerRating = Math.floor(rating);
  for (let i = 0; i < integerRating; i++) {
    stars.push(<i key={i} className="bi bi-star-fill"></i>);
  }
  const decimalRating = rating - integerRating;
  if (decimalRating >= 0.5) {
    stars.push(<i key="half" className="bi bi-star-half"></i>);
  }
  return (
    <Container>
      <div style={{ display: "flex" }}>
        <div>{stars}</div>
      </div>
    </Container>
  );
}

export default StarRating;
