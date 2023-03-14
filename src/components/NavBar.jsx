import React, { Fragment, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Routes, Route, NavLink } from "react-router-dom";
import "../styles/NavBarStyle.css";
import Movies from "./Movies";
import TvShows from "./TvShows";

export const Container = React.createContext();

function NavBar() {
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  return (
    <Container.Provider value={{ toggle, inputValue }}>
      <Fragment>
        <nav className={toggle ? "" : "navBarColor"}>
          <div className="nav-options">
            <h1 id={toggle ? "" : "heading"}>GENINHO</h1>
            <NavLink
              to="/"
              style={({ isActive }) => {
                return { color: isActive ? "#FFF" : "#E8E5DA" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>Movies</span>
            </NavLink>
            <NavLink
              to="/TvShows"
              style={({ isActive }) => {
                return { color: isActive ? "#FFF" : "#E8E5DA" };
              }}
            >
              <span id={toggle ? "Movies" : "MoviesLight"}>TvShows</span>
            </NavLink>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search whatever you want"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <HiSearch fontSize={21} color="black" id="search" />
            <div id="Color-switcher" onClick={() => setToggle(!toggle)}>
              <div
                id={toggle ? "Color-switcher-mover" : "Color-switcher-moved"}
              ></div>
            </div>
          </div>
        </nav>
        {/* serve para redirecionar para cada pagina, sendo a default movies */}
        <Routes>
          <Route path="" element={<Movies />} />
          <Route path="TvShows" element={<TvShows />} />
        </Routes>
      </Fragment>
    </Container.Provider>
  );
}

export default NavBar;
