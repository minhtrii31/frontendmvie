import React, { useEffect, useState } from "react";
import "./HotMovies.css";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import CustomCarousel from "../../components/Carousel/CustomCarousel";
import CardSlider from "../../components/Cards/CardSlider/CardSlider";
import Loading from "../../components/Loading/Loading";

function HotMovies() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <div>
            <CustomCarousel />
          </div>
          <div style={{ padding: "10px 50px" }}>
            <div className="hot-section">
              <div className="heading">Top IMDB Score</div>
              <CardSlider type={"top"} />
            </div>
            <div className="hot-section">
              <div className="heading">Most Views</div>
              <CardSlider type={"topViews"} />
            </div>
            <div className="hot-section">
              <div className="heading">New release</div>
              <CardSlider type={"newest"} />
            </div>
            <div className="hot-section">
              <div className="heading">Crime Movies</div>
              <CardSlider type={"byGenreName"} genreName={"Crime"} />
            </div>
            <div className="hot-section">
              <div className="heading">Drama Movies</div>
              <CardSlider type={"byGenreName"} genreName={"Drama"} />
            </div>
            <div className="hot-section">
              <div className="heading">Action Movies</div>
              <CardSlider type={"byGenreName"} genreName={"Action"} />
            </div>
          </div>
        </MainLayout>
      )}
    </>
  );
}

export default HotMovies;
