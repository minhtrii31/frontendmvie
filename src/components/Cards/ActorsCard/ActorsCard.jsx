import React from "react";
import ActorCard from "../ActorCard/ActorCard";
import "./ActorsCard.css";

function ActorsCard({ actors }) {
  return (
    <div className="actor">
      {actors.map((actor) => (
        <ActorCard key={actor} data={actor} />
      ))}
    </div>
  );
}

export default ActorsCard;
