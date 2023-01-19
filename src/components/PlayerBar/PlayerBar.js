import React, { useEffect, useState, useCallback, useContext } from "react";
import styles from "./PlayerBar.module.css";
import Icon from "../UI/Icon";
import { Link } from "react-router-dom";
import AppContext from "../../store/index.js";

import Spotify from "../../spotify/api";

const PlayerBar = () => {
  const appCtx = useContext(AppContext);
  const [recentSong, setRecentSong] = useState();
  const getRecentPlayedTrack = useCallback(async () => {
    const listOfTracks = await Spotify.getCurrentUserRecentlyPlayedTracks();
    setRecentSong(listOfTracks && listOfTracks.items[0]);
  }, []);

  useEffect(() => {
    window.addInputRangeStyle();
    appCtx.isLoggedIn && getRecentPlayedTrack();
  }, [appCtx.isLoggedIn, getRecentPlayedTrack]);

  return (
    <div className={styles.bar}>
      <div className={styles["now-playing"]}>
        <img
          loading="lazy"
          className={styles["now-playing-cover"]}
          alt=""
          src={recentSong ? recentSong.track.album.images[0].url : "/blank.jpg"}
        />
        <div className={styles["now-playing-info"]}>
          <Link to="#" className={styles["now-playing-info-title"]}>
            {recentSong ? recentSong.track.name : "..."}
          </Link>
          <div className={styles["now-playing-info-artist"]}>
            {recentSong
              ? recentSong.track.artists.map((artist, i) => (
                  <React.Fragment key={i}>
                    <Link key={i} to={`/artist/${artist.id}`}>
                      {artist.name}
                    </Link>
                    {recentSong.track.artists.length - 2 < i ? null : ", "}
                  </React.Fragment>
                ))
              : "..."}
          </div>
        </div>
        <div className={styles["now-playing-action-button"]}>
          <Icon
            name="player-heart"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
        <div className={styles["now-playing-action-button"]}>
          <Icon
            name="player-pip-toggle"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
      </div>
      <div className={styles["player-controls"]}>
        <div className={styles["player-control-buttons"]}>
          <Icon
            name="player-shuffle"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
          <Icon
            name="player-skip-back"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
          <div className={styles["player-control-play"]}>
            <Icon name="player-play" color="black" width={16} height={16} />
          </div>
          <Icon
            name="player-skip-forward"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
          <Icon
            name="player-repeat"
            color="rgb(255, 255, 255, .7)"
            width={16}
            height={16}
          />
        </div>
        <div className={styles["player-control-bar"]}>
          <div className={styles["player-control-position"]}>7:51</div>
          <div className={styles["player-control-progress"]}>
            <input
              className={styles["player-control-progress-input"]}
              type="range"
              min={0}
              max={100}
              step={2}
              defaultValue={0}
            />
          </div>
          <div className={styles["player-control-duration"]}>9:40</div>
        </div>
      </div>
      <div className={styles.controls}>
        <Icon
          name="player-queue"
          color="rgb(255, 255, 255, .7)"
          width={16}
          height={16}
        />
        <Icon
          name="player-devices"
          color="rgb(255, 255, 255, .7)"
          width={16}
          height={16}
        />
        <Icon
          name="player-volume-off"
          color="rgb(255, 255, 255, .7)"
          width={16}
          height={16}
        />
        <div className={styles["player-volume-bar"]}>
          <input
            className={styles["player-control-progress-input"]}
            type="range"
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
