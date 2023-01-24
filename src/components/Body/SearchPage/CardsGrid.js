import React, { useEffect, useState } from "react";
import styles from "./CardsGrid.module.css";
import BrowseCard from "../../UI/BrowseCard";
import { useParams } from "react-router-dom";
import PlayCard from "../../UI/PlayCard";
import Spotify from "../../../spotify/api";
import { getRandomRGB } from "../../../utils";

const Genres = (props) => {
  const { searchType } = useParams();
  const [genres, setGenres] = useState(null);
  const isCoverRounded = searchType === "artists" || searchType === "users";
  const dontShowPlayButton =
    searchType === "podcastAndEpisodes" || searchType === "users";
  const getGenres = async (limit) => {
    const genresList = await Spotify.getFeaturedPlaylists(limit);
    setGenres(genresList.playlists.items);
  };
  useEffect(() => {
    props.genres && getGenres(20);
  }, [props.genres]);
  return (
    <div
      className={
        props.genres ? styles["padding-genres"] : styles["padding-others"]
      }
    >
      {props.genres && <div className={styles["text-browse"]}>Browse all</div>}
      <div className={styles["cards-container"]}>
        {props.genres && (
          <React.Fragment>
            {genres
              ? genres.map((genre, i) => (
                  <BrowseCard
                    key={i}
                    id={genre.id}
                    name={genre.name}
                    color={getRandomRGB(255)}
                    image={genre.images[0].url}
                  />
                ))
              : null}
          </React.Fragment>
        )}
        {!props.genres && (
          <React.Fragment>
            <PlayCard
              cover="/browse-card-images/new-releases.jfif"
              title="Daily Mix 1"
              subtitle="Ebru Gündeş, Ahmet Kaya"
              rounded={isCoverRounded}
              dontShowPlayButton={dontShowPlayButton}
            />
            <PlayCard
              cover="/browse-card-images/new-releases.jfif"
              title="Daily Mix 1"
              subtitle="Ebru Gündeş, Ahmet Kaya"
              rounded={isCoverRounded}
              dontShowPlayButton={dontShowPlayButton}
            />
            <PlayCard
              cover="/browse-card-images/new-releases.jfif"
              title="Daily Mix 1"
              subtitle="Ebru Gündeş, Ahmet Kaya"
              rounded={isCoverRounded}
              dontShowPlayButton={dontShowPlayButton}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Genres;
