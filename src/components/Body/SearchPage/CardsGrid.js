import React, { useEffect, useState, useContext } from "react";
import styles from "./CardsGrid.module.css";
import BrowseCard from "../../UI/BrowseCard";
import { useParams } from "react-router-dom";
import PlayCard from "../../UI/PlayCard";
import Spotify from "../../../spotify/api";
import { getRandomRGB } from "../../../utils";
import AppContext from "../../../store";

const Genres = (props) => {
  const appCtx = useContext(AppContext);
  const { searchType } = useParams();

  const [genres, setGenres] = useState(null);
  const [artists, setArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [shows, setShows] = useState(null);

  const isCoverRounded = searchType === ("artists" || "users");
  const dontShowPlayButton =
    searchType === "podcastAndEpisodes" || searchType === "users";

  const getGenres = async (limit) => {
    const genresList = await Spotify.getFeaturedPlaylists(limit);
    setGenres(genresList.playlists.items);
  };
  // TODO: Repetitive functions going on here. Will be fixed!
  const getArtists = async () => {
    const results = await Spotify.search(appCtx.searchText, "artist");
    setArtists(results.artists.items);
  };
  const getPlaylists = async () => {
    const results = await Spotify.search(appCtx.searchText, "playlist");
    setPlaylists(results.playlists.items);
  };
  const getAlbums = async () => {
    const results = await Spotify.search(appCtx.searchText, "album");
    setAlbums(results.albums.items);
  };
  const getShows = async () => {
    const results = await Spotify.search(appCtx.searchText, "show");
    setShows(results.shows.items);
  };

  useEffect(() => {
    appCtx.isUserLoggedIn && props.genres && getGenres(20);
    appCtx.isUserLoggedIn && searchType === "artists" && getArtists();
    appCtx.isUserLoggedIn && searchType === "playlists" && getPlaylists();
    appCtx.isUserLoggedIn && searchType === "albums" && getAlbums();
    appCtx.isUserLoggedIn && searchType === "podcastAndEpisodes" && getShows();
  }, [props.genres, searchType]);
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
              : "You should login first"}
          </React.Fragment>
        )}

        {!props.genres && (
          <React.Fragment>
            {searchType === "artists" && artists
              ? artists.map((artist, i) => (
                  <PlayCard
                    key={i}
                    id={artist.id}
                    href={`/artist/${artist.id}`}
                    cover={
                      artist.images.length > 0
                        ? artist.images[0].url
                        : "/blank.jpg"
                    }
                    title={artist.name}
                    subtitle="Artist"
                    rounded={isCoverRounded}
                    dontShowPlayButton={dontShowPlayButton}
                  />
                ))
              : null}
            {searchType === "playlists" && playlists
              ? playlists.map((playlist, i) => (
                  <PlayCard
                    key={i}
                    id={playlist.id}
                    href={`/playlist/${playlist.id}`}
                    cover={
                      playlist.images.length > 0
                        ? playlist.images[0].url
                        : "/blank.jpg"
                    }
                    title={playlist.name}
                    subtitle="Playlist"
                    rounded={isCoverRounded}
                    dontShowPlayButton={dontShowPlayButton}
                  />
                ))
              : null}
            {searchType === "albums" && albums
              ? albums.map((album, i) => (
                  <PlayCard
                    key={i}
                    id={album.id}
                    href={`/album/${album.id}`}
                    cover={
                      album.images.length > 0
                        ? album.images[0].url
                        : "/blank.jpg"
                    }
                    title={album.name}
                    subtitle="Album"
                    rounded={isCoverRounded}
                    dontShowPlayButton={dontShowPlayButton}
                  />
                ))
              : null}
            {searchType === "podcastAndEpisodes" && shows
              ? shows.map((show, i) => (
                  <PlayCard
                    key={i}
                    id={show.id}
                    cover={
                      show.images.length > 0 ? show.images[0].url : "/blank.jpg"
                    }
                    title={show.name}
                    subtitle="Podcasts and Episodes"
                    rounded={isCoverRounded}
                    dontShowPlayButton={dontShowPlayButton}
                  />
                ))
              : null}
            {searchType === "users" && (
              <figure>
                Spotify API isn't supporting user-search at the moment{" "}
                <a
                  href="https://github.com/spotify/web-api/issues/95"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  related github issue
                </a>
              </figure>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Genres;
