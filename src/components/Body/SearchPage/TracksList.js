import React from "react";
import styles from "./TracksList.module.css";
import Icon from "../../UI/Icon";

const TracksList = () => {
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
        <div className={styles.item}>
          <div className={styles.index}>
            <div className={styles["index-number"]}>1</div>
            <div className={styles["index-icon"]}>
              <Icon name="player-play" width={16} height={16} color="#fff" />
            </div>
          </div>
          <div className={styles.meta}>
            <img src="/browse-card-images/decades.jfif" alt="Song" />
            <div>
              <div className={styles["song-name"]}>Gnossienne No.1</div>
              <div>Erkan Oğur</div>
            </div>
          </div>
          <div>Dönmez Yol</div>
          <div className={styles.duration}>4:39</div>
        </div>
      </div>
    </div>
  );
};

export default TracksList;
