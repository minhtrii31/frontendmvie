import React from "react";
import "./Auth.css";

function Auth({ children }) {
  return (
    <div className="auth-main">
      <main className="auth-children">{children}</main>
    </div>
  );
}

export default Auth;
