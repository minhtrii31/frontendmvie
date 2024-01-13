import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { getUserWatchHistory, updateUser } from "../../services/user.service";
import { getLoggedInUser } from "../../utils/authUtils";
import useLoading from "../../hooks/useLoading";
import Loading from "../Loading/Loading";
import MovieCard from "../Cards/MovieCard/MovieCard";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(getLoggedInUser());
  const isLoading = useLoading();
  const [editing, setEditing] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getUserWatchHistory(user._id)
        .then((data) => {
          setHistory(data.watched);
        })
        .catch((error) => {
          console.log("Lỗi");
        });
    }
  }, [user]);

  const handleSave = async (e) => {
    try {
      const updateUserData = {
        ...user,
      };

      if (editPassword && password.trim() !== "") {
        updateUserData.password = password;
        const success = await updateUser(user._id, updateUserData);
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", JSON.stringify(updateUserData));
        window.location.reload(true);
      }
      if (editing && name.trim() != "") {
        updateUserData.name = name;
        const success = await updateUser(user._id, updateUserData);
        sessionStorage.removeItem("user");
        sessionStorage.setItem("user", JSON.stringify(updateUserData));
        window.location.reload(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MainLayout>
          <div className="profile">
            <div className="profile-wrapper">
              <div className="profile-container">
                <div className="profile-heading">PRIVACY SETTING</div>
                <div className="profile-edit">
                  <div className="profile-edit-heading">
                    <div>Personal information</div>
                    <div className="div">
                      {!editing && (
                        <button
                          className="buttonStyle"
                          onClick={() => setEditing(!editing)}
                        >
                          Edit
                        </button>
                      )}
                      {editing && (
                        <button
                          className="buttonStyle"
                          onClick={() => {
                            setEditing(!editing);
                            handleSave();
                          }}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="separate"></div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className={`input ${editing ? "" : "input-disable"}`}
                    placeholder={user.name}
                    disabled={!editing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="input input-disable"
                    placeholder={user.email}
                  ></input>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="input input-disable"
                    placeholder={user.phone}
                  ></input>
                  <div className="profile-edit-heading">
                    <div>
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className={`input ${
                          editPassword ? "" : "input-disable"
                        }`}
                        placeholder={"**********"}
                        disabled={!editPassword}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="div">
                      {!editPassword && (
                        <button
                          style={{
                            backgroundColor: "transparent",
                            outline: "none",
                            color: "var(--text-color)",
                            border: "none",
                            fontWeight: "bold",
                          }}
                          onClick={() => setEditPassword(!editPassword)}
                        >
                          Edit
                        </button>
                      )}
                      {editPassword && (
                        <button
                          style={{
                            backgroundColor: "transparent",
                            outline: "none",
                            color: "var(--text-color)",
                            border: "none",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            setEditPassword(!editPassword);
                            handleSave();
                          }}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </>
  );
}

export default Profile;
