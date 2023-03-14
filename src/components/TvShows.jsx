import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import "../styles/Videos.css";
import NoImg from "./NoImg.jpg";
import axios from "axios";
import { Container } from "./NavBar";
import TrailerTvShows from "../Trailers/TrailerTvShows";

function TvShows() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [showData, setShowData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("");
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`;
  const Images = "https://image.tmdb.org/t/p/w500";
  const TvShows = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "69e86e460b45cf6335e6350879bb00f6",
        query: input,
      },
    });
    const results = data.data.results;
    setShowData(results);
  };
  useEffect(() => {
    TvShows();
  });
  const TvShowTitle = (shows) => {
    setTitle(shows.name);
    setTrailer(!trailer);
  };
  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {showData.map((shows) => {
            return (
              <Fragment key={shows.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle
                    color="white"
                    fontSize={40}
                    id={trailer ? "playIcon" : "hide"}
                    onClick={() => TvShowTitle(shows)}
                  />
                  <img
                    src={
                      shows.poster_path
                        ? `${Images}${shows.poster_path}`
                        : NoImg
                    }
                    alt=""
                    onClick={() => TvShowTitle(shows)}
                  />
                  <h3 className={toggle ? "mainColor" : "secondaryColor"}>
                    {shows.name}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <TrailerTvShows TvShowsTitle={title} />}
          <AiOutlineClose
            id={trailer ? "Nothing" : "Exit1"}
            className={toggle ? "DarkTheme" : "LightThemeClose"}
            onClick={() => setTrailer(true)}
            fontSize={55}
            color="white"
            cursor={"pointer"}
          />
        </div>
      </div>
    </Fragment>
  );
}
export default TvShows;
