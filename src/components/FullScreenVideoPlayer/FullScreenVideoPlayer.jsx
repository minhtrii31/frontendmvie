import React, { useEffect, useState } from "react";
import "./FullScreenVideoPlayer.css";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import Loading from "../Loading/Loading";
import { getMovieById } from "../../services/movies.service";

function FullScreenVideoPlayer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoading = useLoading();
  const goBack = () => {
    navigate(-1);
  };

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const movie = await getMovieById(id);
      setMovie(movie);
    };
    fetch();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="full-screen-video-player">
          <ReactPlayer
            url={movie.source}
            controls={true}
            width={"100%"}
            height={"100%"}
          />
          <button className="full-screen-video-player-btn" onClick={goBack}>
            <i className="bi bi-chevron-left"></i>
          </button>
        </div>
      )}
    </>
  );
}

export default FullScreenVideoPlayer;
