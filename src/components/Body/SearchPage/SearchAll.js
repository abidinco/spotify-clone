import React, { useEffect, useState, useContext } from "react";
import styles from "./SearchAll.module.css";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../UI/Icon";
import Spotify from "../../../spotify/api";
import AppContext from "../../../store";
import PlayCard from "../../UI/PlayCard";
import { millisToMinutesAndSeconds } from "../../../utils";

const SearchAll = () => {
  const navigate = useNavigate();
  const appCtx = useContext(AppContext);
  const [albums, setAlbums] = useState(null);
  const [songs, setSongs] = useState(null);
  const [artist, setArtist] = useState(null);

  const getAlbums = async () => {
    const results = await Spotify.search(appCtx.searchText, "album", 7);
    setAlbums(results.albums.items);
  };

  const getSongs = async () => {
    const results = await Spotify.search(appCtx.searchText, "track", 3);
    setSongs(results.tracks.items);
  };

  const getArtist = async () => {
    const results = await Spotify.search(appCtx.searchText, "artist", 1);
    setArtist(results);
  };

  useEffect(() => {
    getAlbums();
    getSongs();
    getArtist();
  }, [appCtx.searchText]);

  return (
    <React.Fragment>
      {console.log(artist)}
      {console.log(albums)}
      <div className={styles.grid}>
        <div className={styles["top-result"]}>
          <div>Top result</div>
          <Link to="/" className={styles.card}>
            <img loading="lazy" src="/discover-weekly.jfif" alt="Top Result" />
            <div>Top result name</div>
            <div className={styles.row}>
              <div onClick={() => navigate("")} className={styles["meta-link"]}>
                Bottom meta
              </div>
              <div className={styles.chip}>Song</div>
            </div>
            <div className={styles["button-wrapper"]}>
              <Icon name="player-play" color="black" width={18} height={18} />
            </div>
          </Link>
        </div>
        <div className={styles.songs}>
          <div>Songs</div>
          {songs
            ? songs.map((song, index) => (
                <div className={styles.item}>
                  <div className={styles.meta}>
                    <div className={styles.icon}>
                      <Icon
                        name="player-play"
                        color="white"
                        width={16}
                        height={16}
                      />
                    </div>
                    <img
                      loading="lazy"
                      src={
                        song.album.images[0]
                          ? song.album.images[song.album.images.length - 1].url // to get lowest-resolution image
                          : "/blank.jpg"
                      }
                      alt="Top Result"
                    />
                    <div className={styles["meta-infos"]}>
                      <div>{song.name}</div>
                      {song.artists
                        ? song.artists.map((artist, i) => (
                            <Link
                              to={`/artist/${artist.id}`}
                              className={styles.artist}
                            >
                              <span key={i}>{artist.name}</span>
                            </Link>
                          ))
                        : null}
                    </div>
                  </div>
                  <div>{millisToMinutesAndSeconds(song.duration_ms)}</div>
                </div>
              ))
            : null}
        </div>
      </div>
      <div className={styles.header}>Albums</div>
      <div className={styles.tiles}>
        {albums
          ? albums.map((album, index) => (
              <PlayCard
                cover={album.images[0] ? album.images[0].url : "/blank.jpg"}
                title={album.name}
                subtitle={
                  album.artists
                    ? album.artists.map((artist, i) => (
                        <span key={i}>{artist.name}</span>
                      ))
                    : null
                }
              />
            ))
          : null}
      </div>
    </React.Fragment>
  );
};

export default SearchAll;
