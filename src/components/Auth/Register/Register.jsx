import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { getUserByPhone, register } from "../../../services/user.service";
import "./Register.css";
import Auth from "../../../layouts/Auth/Auth";
import { toast } from "sonner";

function Register() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      password2 === ""
    ) {
      toast.error("Please fill out the form.");
      return;
    } else if (password !== password2) {
      toast.error("Password and repeat password do not match");
    } else if (!isEmailValid(email)) {
      toast.error("Invalid email");
    } else {
      try {
        const success = await register(name, email, phone, password);
        if (success) {
          const user = await getUserByPhone(phone);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error("Please check the information again.");
        }
      } catch (error) {
        toast.error("Please check the information again.");
      }
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
                <p className="auth-header">REGISTER</p>
                <p>We are very pleased to meet you!</p>
                <div className="separate"></div>
                <form>
                  <div>
                    <label htmlFor="name" style={{ padding: "10px 0" }}>
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ padding: "10px 0" }}>
                      Your Email
                    </label>
                    <input
                      type="text"
                      placeholder="Enter email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" style={{ padding: "10px 0" }}>
                      Your Phone
                    </label>
                    <input
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
                      type="password"
                      placeholder="Enter password"
                      className="input"
                      aria-describedby="passwordHelpBlock"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password2" style={{ padding: "10px 0" }}>
                      Please Repeat Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter repeat password"
                      className="input"
                      aria-describedby="passwordHelpBlock"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
                  <div className="d-grid" style={{ marginTop: "30px" }}>
                    <button
                      className="btn buttonStyle"
                      style={{ height: 50 }}
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                  </div>
                  <div>
                    <p className="text-center" style={{ marginTop: "30px" }}>
                      Have an account?{" "}
                      <Link to="/login" style={{ textDecoration: "none" }}>
                        <strong>Login</strong>
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

export default Register;
