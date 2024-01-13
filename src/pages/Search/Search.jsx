import React from "react";
import "./Search.css";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import SearchBox from "../../components/SearchBox/SearchBox";

function Search() {
  return (
    <MainLayout data-aos="fade">
      <SearchBox />
    </MainLayout>
  );
}

export default Search;
