import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { Container } from "./NavBar";
import "../styles/Videos.css";
import NoImg from "./NoImg.jpg";
import TrailerMovies from "../Trailers/TrailerMovies";

function Movies() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [moviesData, setMoviesData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
  const Images = "https://image.tmdb.org/t/p/w500";
  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "69e86e460b45cf6335e6350879bb00f6",
        query: input,
      },
    });
    const results = data.data.results;
    setMoviesData(results);
  };
  useEffect(() => {
    setTimeout(() => {
      MovieCall();
    }, 100);
  });
  // console.log(moviesData);

  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title);
    setTrailer(!trailer);
  };

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secundaryBgColor"}>
        <div className="movies-container">
          {moviesData.map((movie) => {
            return (
              <Fragment>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="white"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => MoviesTitle(movie)}
                  />
                  <img
                    src={
                      movie.poster_path
                        ? `${Images}${movie.poster_path}`
                        : NoImg
                    }
                    alt=""
                    onClick={() => MoviesTitle(movie)}
                  />
                  <h3 className={toggle ? "mainColor" : "secondaryColor"}>
                    {movie.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrailerMovies moviesTitle={movieTitle} />}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClsoe"}
            fontSize={55}
            color="white"
            cursor={"pointer"}
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Movies;
