import React, { useEffect, useState } from "react";
import "./Login.css";
import { getUserByPhone, login } from "../../../services/user.service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import Auth from "../../../layouts/Auth/Auth";
import { toast } from "sonner";

function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (phone === "" || password === "") {
      toast.error("Please fill out the form");
      return;
    }
    try {
      const success = await login(phone, password);
      if (success) {
        const user = await getUserByPhone(phone);
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Please check the information again");
      }
    } catch (error) {
      toast.error("Please check the information again");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <Auth>
          <div>
            <div className="input-area">
              <div className="input-content">
                <p className="auth-header">LOGIN</p>
                <p>Welcome back my friend!</p>
                <div className="separate"></div>
                <form>
                  <div>
                    <label htmlFor="phone" style={{ padding: "10px 0" }}>
                      Your Phone
                    </label>
                    <input
                      id="login_phone"
                      type="text"
                      placeholder="Enter phone number"
                      className="input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" style={{ padding: "10px 0" }}>
                      Your Password
                    </label>
                    <input
                      id="login_password"
                      type="password"
                      placeholder="Enter password"
                      className="input"
                      aria-describedby="passwordHelpBlock"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid" style={{ marginTop: "30px" }}>
                    <button
                      className="btn buttonStyle"
                      style={{ height: 50 }}
                      onClick={handleLogin}
                    >
                      Sign in
                    </button>
                  </div>
                  <p className="mt-3" style={{ textAlign: "right" }}>
                    <Link to={"/forgotpwd"} style={{ textDecoration: "none" }}>
                      <strong>Forgot Password?</strong>
                    </Link>
                  </p>

                  <div>
                    <p className="text-center">
                      Don't have an account?{" "}
                      <Link to="/register" style={{ textDecoration: "none" }}>
                        <strong>Register</strong>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Auth>
      )}
    </div>
  );
}
export default Login;
