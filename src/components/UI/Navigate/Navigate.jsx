import React, { useState } from "react";
import "./Navigate.css";
import { Link } from "react-router-dom";
import { checkIfLoggedIn, getLoggedInUser } from "../../../utils/authUtils";

function Header() {
  const isAuthenticated = checkIfLoggedIn();
  const user = getLoggedInUser();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleOpenSideBar = () => {
    setOpenSideBar(true);
  };

  const handleCloseSideBar = () => {
    setOpenSideBar(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
  };

  const handleShowDropdown = () => {
    setDropdown(!dropdown);
  };

  // const closeDropdown = () => {
  //   setDropdown(false);
  // };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to={"/"}>
            <img
              src="../img/logo_1.png"
              alt="logo"
              style={{ width: "150px" }}
            />
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Link to={"/search"}>
            <span style={{ marginRight: "15px" }}>
              <i className="nav-icon bi bi-search"></i>
            </span>
          </Link> */}
          <div>
            <div className="open-collapse">
              {openSideBar ? (
                <span onClick={handleCloseSideBar}>
                  <i className="nav-icon bi bi-x-lg"></i>
                </span>
              ) : (
                <span onClick={handleOpenSideBar}>
                  <i className="nav-icon bi bi-list"></i>
                </span>
              )}
            </div>
            <div className={`navbar-collapse${openSideBar ? " active" : ""}`}>
              <div className="navbar-nav">
                <Link to={"/hotMovies"}>Hot Movies</Link>
                <Link to={"/movies"}>Movies</Link>
                {/* <Link to={"/actors"}>Actors</Link> */}
                {/* <Link to={"/actors"}>Pricing</Link> */}
                <Link to={"/about"}>About us</Link>
              </div>
              <div className="navbar-auth">
                {isAuthenticated ? (
                  <div
                    style={{ position: "relative", cursor: "pointer" }}
                    onClick={handleShowDropdown}
                  >
                    <div>{user.name}</div>
                    {dropdown && (
                      <div className="dropdown-wrapper">
                        <Link to={"/profile"}>Profile</Link>
                        <div
                          className="separate"
                          style={{ width: "100%" }}
                        ></div>
                        <Link to={"/"} onClick={handleLogout}>
                          Logout
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={"/login"}>Login/Register</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
