import React from "react";
import Icon from "../UI/Icon";
import styles from "./NowPlaying.module.css";

const NowPlaying = () => {
  return (
    <div className={styles.wrapper} id="navbar-now-playing-wrapper">
      <div className={styles.icon}>
        <Icon name="player-play" color="#000" width={20} height={20} />
      </div>
      <div className={styles.text}>
        playlist name: arkada çalması düşünülsün
      </div>
    </div>
  );
};

export default NowPlaying;
