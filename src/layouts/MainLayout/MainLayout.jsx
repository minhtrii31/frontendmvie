import React from "react";
import Header from "../../components/UI/Navigate/Navigate";
import Footer from "../../components/UI/Footer/Footer";
function MainLayout({ children }) {
  return (
    <div className="App">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
