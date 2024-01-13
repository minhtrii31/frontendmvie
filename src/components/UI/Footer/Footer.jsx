import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-brand">Mvie</div>
        <div className="footer-nav">
          <Link>About</Link>
          <Link>Movies</Link>
          <Link>Hot Movies</Link>
          <Link>Legal</Link>
          <Link>Contact</Link>
        </div>
        <div className="footer-social">
          <Link>
            <i className="bi bi-instagram"></i>
          </Link>
          <Link>
            <i className="bi bi-facebook"></i>
          </Link>
          <Link>
            <i className="bi bi-twitter"></i>
          </Link>
          <Link>
            <i className="bi bi-pinterest"></i>
          </Link>
          <Link>
            <i className="bi bi-dribble"></i>
          </Link>
        </div>
        <div className="footer-copyright">
          <small>&copy; Mvie. All Rights Reserved.</small>
        </div>
      </div>
    </div>
  );
}

export default Footer;
