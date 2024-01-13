import React, { useEffect, useState } from "react";
import { getActorById } from "../../../services/actor.service";
import { toast } from "sonner";
import "./ActorCard.css";

function ActorCard({ data }) {
  const [actor, setActor] = useState([]);

  useEffect(() => {
    getActorById(data)
      .then((respond) => {
        setActor(respond);
      })
      .catch((error) => {
        toast.error(error);
      });
  });
  return (
    <div className="actor-card">
      <img src={actor.img} alt={actor.name} />
      <p>{actor.name}</p>
    </div>
  );
}

export default ActorCard;
