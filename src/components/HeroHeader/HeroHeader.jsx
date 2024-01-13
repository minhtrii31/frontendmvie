import React from "react";
import "./HeroHeader.css";
import { Link } from "react-router-dom";

function HeroHeader() {
  return (
    <div className="hero-header">
      <div className="hero-background">
        <video muted loop autoPlay>
          <source src="https://cdn.discordapp.com/attachments/1189056514892234774/1192720250974781440/pexels-pavel-danilyuk-9121649_1440p.mp4?ex=65aa1a4b&is=6597a54b&hm=fb42a23be5e67028ef8493081182e8131f214fcb6cb103f4be5d273f838bd14c&" />
        </video>
      </div>
      <div className="hero-content">
        <div className="hero-item">
          <h1>
            Unlimited <span className="highlight">Entertainment</span> at{" "}
            <span className="highlight">Your Fingertips.</span>
          </h1>
          <span style={{ fontSize: "calc(1.275rem + .3vw)" }}>
            Watch your favorite movies and TV shows anytime, anywhere.
          </span>
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h4
              style={{
                textDecoration: "underline",
                textDecorationColor: "var(--secondary-color)",
                textUnderlineOffset: "8px",
              }}
            >
              Let's us know what you like.
            </h4>{" "}
            💖
          </h4>
        </div>
        <div className="hero-item">
          <Link to={"/movies"}>
            <button className="buttonHero">Discover Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroHeader;
