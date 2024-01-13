import React, { useState } from "react";
import Auth from "../../../layouts/Auth/Auth";
import { toast } from "sonner";
import { getUserByPhone } from "../../../services/user.service";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const handleButtonClick = async (e) => {
    e.preventDefault();

    try {
      const response = await getUserByPhone(phone);
      if (response) {
        navigate("/resetpwd", { state: { user: response } });
      } else {
        toast.error("Can't find your phone number.");
      }
    } catch (error) {
      console.error("Error fetching user by phone:", error);
      toast.error("Can't find your phone number.");
    }
  };

  return (
    <Auth>
      <div>
        <div className="input-area">
          <div className="input-content">
            <div className="auth-header">Forgot Password?</div>
            <p>Don't worry, just give us the necessary information.</p>
            <div className="separate"></div>
            <form>
              <div>
                <label htmlFor="phone" style={{ padding: "10px 0" }}>
                  Please enter your phone
                </label>
                <input
                  type="text"
                  placeholder="Your phone"
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div>
                  <p className="mt-3" style={{ textAlign: "right" }}>
                    <Link
                      to={"/forgotPhone"}
                      style={{ textDecoration: "none" }}
                    >
                      <strong>Forgot your phone?</strong>
                    </Link>
                  </p>
                </div>
                <div className="d-grid" style={{ marginTop: "30px" }}>
                  <button
                    className="btn buttonStyle"
                    style={{ height: 50 }}
                    onClick={handleButtonClick}
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default ForgotPassword;
