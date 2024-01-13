import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import Home from "./pages/MainPage/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import Profile from "./components/Profile/Profile";
import ActorsPage from "./pages/ActorsPage/ActorsPage";
import FullScreenVideoPlayer from "./components/FullScreenVideoPlayer/FullScreenVideoPlayer";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import { Toaster } from "sonner";
import HotMovies from "./pages/HotMovies/HotMovies";
import Search from "./pages/Search/Search";
import ForgotPhone from "./components/Auth/FotgotPhone/ForgotPhone";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/play/:id" element={<FullScreenVideoPlayer />} />
        <Route path="/actors" element={<ActorsPage />} />
        <Route path="/forgotpwd" element={<ForgotPassword />} />
        <Route path="/resetpwd" element={<ResetPassword />} />
        <Route path="/hotMovies" element={<HotMovies />} />
        <Route path="/search" element={<Search />} />
        <Route path="/forgotPhone" element={<ForgotPhone />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <div className="toaster">
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
