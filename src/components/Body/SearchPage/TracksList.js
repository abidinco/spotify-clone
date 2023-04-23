import React, { useState, useEffect, useContext } from "react";
import styles from "./TracksList.module.css";
import Icon from "../../UI/Icon";
import Spotify from "../../../spotify/api";
import AppContext from "../../../store";
import { Link } from "react-router-dom";

const TracksList = () => {
  const appCtx = useContext(AppContext);

  const [songs, setSongs] = useState(null);

  const getSongs = async () => {
    const results = await Spotify.search(appCtx.searchText, "track");
    setSongs(results.tracks.items);
  };

  useEffect(() => {
    appCtx.isUserLoggedIn && getSongs();
  }, [appCtx.searchText]);

  return (
    <div className={styles.table}>
      <div className={styles["table-header"]}>
        <div style={{ fontSize: 16, fontWeight: 300 }}>#</div>
        <div>Title</div>
        <div>Album</div>
        <div>
          <Icon name="duration" height={16} width={16} color="#b3b3b3" />
        </div>
      </div>
      <div className={styles.playlist}>
        {songs &&
          songs.map((song, i) => {
            return (
              <div className={styles.item} key={i}>
                <div className={styles.index}>
                  <div className={styles["index-number"]}>{i + 1}</div>
                  <div className={styles["index-icon"]}>
                    <Icon
                      name="player-play"
                      width={16}
                      height={16}
                      color="#fff"
                    />
                  </div>
                </div>
                <div className={styles.meta}>
                  <img
                    loading="lazy"
                    src={song.album.images[0].url}
                    alt="Song"
                  />
                  <div>
                    <div className={styles["song-name"]}>{song.name}</div>
                    <div className={styles["song-artists"]}>
                      {song.artists.map((artist, i) => {
                        return (
                          <Link to={`/artist/${artist.id}`} key={i}>
                            {artist.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles["song-album"]}>{song.album.name}</div>
                <div className={styles.duration}>
                  {Math.floor(song.duration_ms / 60000)}:
                  {Math.floor((song.duration_ms % 60000) / 1000)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TracksList;
