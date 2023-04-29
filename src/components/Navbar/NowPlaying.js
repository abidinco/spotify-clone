import React, { useContext } from "react";
import AppContext from "../../store";
import Icon from "../UI/Icon";
import styles from "./NowPlaying.module.css";

const NowPlaying = () => {
  const appCtx = useContext(AppContext);
  return (
    <div className={styles.wrapper} id="navbar-now-playing-wrapper">
      <div className={styles.icon}>
        <Icon name="player-play" color="#000" width={20} height={20} />
      </div>
      <div className={styles.text}>{appCtx.navbarNowPlayingText}</div>
    </div>
  );
};

export default NowPlaying;
