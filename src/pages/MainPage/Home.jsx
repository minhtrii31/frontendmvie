import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import "./Home.css";
import HeroHeader from "../../components/HeroHeader/HeroHeader";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../components/Loading/Loading";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    AOS.init({ duration: 2000 });
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
          <HeroHeader />
          <div className="section-wrapper" data-aos="fade-right">
            <div className="section">
              <div className="section-left">
                <h3>Dive into a World of Infinite Entertainment</h3>
                <span className="span-text">
                  Immerse yourself in an extensive library of movies and TV
                  shows spanning various genres, from timeless classics to the
                  latest releases
                </span>
              </div>
              <div className="section-right">
                <img
                  src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
                  alt=""
                  className="img-illus"
                />
              </div>
            </div>
          </div>
          <div className="section-wrapper" data-aos="fade-left">
            <div className="section">
              <div className="section-left">
                <img
                  src="https://images.pexels.com/photos/3764958/pexels-photo-3764958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  className="img-illus"
                />
              </div>
              <div className="section-right">
                <h3>Your Entertainment, Your Schedule</h3>
                <span className="span-text">
                  Never miss a moment, and create your own personalized viewing
                  experience that aligns with your schedule.
                </span>
              </div>
            </div>
          </div>
          <div className="section-wrapper" data-aos="fade-right">
            <div className="section">
              <div className="section-left">
                <h3>Watch everywhere</h3>
                <span className="span-text">
                  Stream unlimited movies and TV shows on your phone, tablet,
                  laptop, and TV.
                </span>
              </div>
              <div className="section-right">
                <img
                  src="https://images.unsplash.com/photo-1535495649876-d51efb6f9931?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="img-illus"
                />
              </div>
            </div>
          </div>
          <div className="join" data-aos="zoom-in-up">
            <div className="join-content">
              <h3 style={{ color: "var(--primary-color)" }}>
                Join Us – Your Passport to Endless Entertainment
              </h3>
              <div className="join-wrapper">
                <input
                  type="text"
                  className="input input-join"
                  placeholder="Enter your email to get started"
                />
                <button className="buttonHero">Get Started</button>
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </>
  );
}

export default Home;
