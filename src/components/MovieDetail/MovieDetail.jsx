import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import "./MovieDetail.css";
import { Link, useParams } from "react-router-dom";
import { getMovieById } from "../../services/movies.service";
import { toast } from "sonner";
import ActorsCard from "../Cards/ActorsCard/ActorsCard";
import ReactPlayer from "react-player";
import Comment from "../Comment/Comment";
import { checkIfLoggedIn } from "../../utils/authUtils";
import Loading from "../Loading/Loading";

function MovieDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [actors, setActors] = useState([]);
  const { id } = useParams();

  const isAuth = checkIfLoggedIn();

  useEffect(() => {
    getMovieById(id)
      .then((data) => {
        setMovie(data);
        if (Array.isArray(data.actors)) {
          setActors(data.actors);
        } else {
          console.error("Actors is not an array");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <div className="detail">
            <div
              className="detail-background"
              style={{ backgroundImage: `url(${movie.imageUrl})` }}
            >
              <div className="background-overlay"></div>
              <div className="detail-wrapper">
                <div className="detail-title">
                  <h1>{movie.title}</h1>
                </div>
                <div className="detail-content">
                  <div className="detail-content-left">
                    <img
                      className="detail-img"
                      src={movie.poster}
                      alt="poster"
                    />
                    {isAuth ? (
                      <Link to={`/play/${id}`}>
                        <button
                          className="buttonStyle"
                          style={{
                            marginTop: "20px",
                            width: "95%",
                            padding: "15px 0",
                          }}
                        >
                          WATCH NOW
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="buttonStyle"
                        style={{
                          marginTop: "20px",
                          width: "95%",
                          padding: "15px 0",
                        }}
                      >
                        LOGIN TO WATCH
                      </button>
                    )}
                  </div>
                  <div className="detail-content-right">
                    <div>
                      <div
                        className="profile-heading"
                        style={{ textAlign: "left", marginBottom: "10px" }}
                      >
                        Details
                      </div>
                      <p>Director: {movie.director}</p>
                      <p>Release Year: {movie.releaseYear}</p>
                      <p>IMDB: {movie.imdbRating}</p>
                    </div>
                    <div>
                      <div
                        className="profile-heading"
                        style={{ textAlign: "left", marginBottom: "10px" }}
                      >
                        Description
                      </div>
                      <p>{movie.description}</p>
                    </div>
                    <div>
                      <div
                        className="profile-heading"
                        style={{ textAlign: "left", marginBottom: "10px" }}
                      >
                        Actors
                      </div>
                      <ActorsCard actors={actors} />
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="profile-heading"
                    style={{ padding: "20px 0" }}
                  >
                    Trailer
                  </div>
                  <div className="detail-trailer">
                    <ReactPlayer
                      url={movie.video}
                      controls={true}
                      width={"100%"}
                      height={"auto"}
                    />
                  </div>
                </div>
                <div>
                  <div
                    className="profile-heading"
                    style={{ padding: "20px 0" }}
                  >
                    Comments
                  </div>
                  <Comment movieId={id} />
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </>
  );
}

export default MovieDetail;
