import React, { useState } from "react";
import Auth from "../../../layouts/Auth/Auth";
import { getUserByEmail } from "../../../services/user.service";
import { toast } from "sonner";
import sendEmail from "../../../services/sendEmail";

function ForgotPhone() {
  const [email, setEmail] = useState("");

  const handleButtonClick = async (e) => {
    e.preventDefault();

    try {
      const response = await getUserByEmail(email);

      console.log(response);

      if (response) {
        const { phone } = response;

        const emailParams = {
          to: email,
          subject: "Forgot Phone",
          text: `Your email has been linked to phone number ${phone} at mvie`,
        };

        const result = await sendEmail(emailParams);

        toast(result);
      } else {
        toast.error("Can't find your email.");
      }
    } catch (e) {
      toast.error("Error checking your email.");
    }
  };

  return (
    <Auth>
      <div>
        <div className="input-area">
          <div className="input-content">
            <div className="auth-header">Forgot Phone?</div>
            <p>Don't worry, just give us the necessary information.</p>
            <div className="separate"></div>
            <form>
              <div>
                <label htmlFor="email" style={{ padding: "10px 0" }}>
                  Please enter your email
                </label>
                <input
                  type="text"
                  placeholder="Your email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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

export default ForgotPhone;
