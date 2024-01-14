import React, { useState } from "react";
import Auth from "../../../layouts/Auth/Auth";
import { toast } from "sonner";
import { updateUser } from "../../../services/user.service";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const { user } = JSON.parse(JSON.stringify(location.state));
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (pwd1 !== pwd2) {
      toast.error("Check your information again!");
      return;
    }

    try {
      const request = await updateUser(user._id, { password: pwd1 });
      if (request) {
        toast.success("Change your password successfully!");
      } else {
        toast.error("Error changing your password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Error changing your password");
    }
    console.log(user);
  };

  return (
    <Auth>
      <div>
        <div className="input-area">
          <div className="input-content">
            <div className="auth-header">Reset Password</div>
            <p>Please enter your new password</p>
            <div className="separate"></div>
            <form>
              <div>
                <label htmlFor="pwd1" style={{ padding: "10px 0" }}>
                  Your new password
                </label>
                <input
                  id="reset_password"
                  type="password"
                  placeholder="New Password"
                  value={pwd1}
                  className="input"
                  onChange={(e) => setPwd1(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="pwd2" style={{ padding: "10px 0" }}>
                  Enter your new password
                </label>
                <input
                  id="reset_password2"
                  type="password"
                  placeholder="Your new password again"
                  value={pwd2}
                  className="input"
                  onChange={(e) => setPwd2(e.target.value)}
                />
              </div>
              <div className="d-grid" style={{ marginTop: "30px" }}>
                <button
                  className="btn buttonStyle"
                  style={{ height: 50 }}
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default ResetPassword;
