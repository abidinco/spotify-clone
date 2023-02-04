import React, { useRef } from "react";
import styles from "./SongList.module.css";
import Icon from "../../UI/Icon";
import { Link } from "react-router-dom";

import { formatDate, millisToMinutesAndSeconds } from "../../../utils";

const SongList = (props) => {
  const tableHeaderElement = useRef(null);

  return (
    <div className={styles.table}>
      <div className={styles["table-header"]} ref={tableHeaderElement}>
        <div>#</div>
        <div>Title</div>
        {props.page !== "album" ? <div>Album</div> : null}
        {props.page !== "album" ? (
          props.page === "artist" ? (
            <div>Date Released</div>
          ) : (
            <div>Date Added</div>
          )
        ) : null}
        <div>
          <Icon name="duration" height={16} width={16} color="#b3b3b3" />
        </div>
      </div>
      <div className={styles.playlist}>
        {props.songs
          ? props.songs.map((song, index) => (
              <div className={styles.item} key={index}>
                <div className={styles.index}>
                  <div className={styles["index-number"]}>{index + 1}</div>
                  <div className={styles["index-icon"]}>
                    <Icon
                      name="player-play"
                      width={12}
                      height={12}
                      color="#fff"
                    />
                  </div>
                </div>
                <div className={styles.meta}>
                  {props.page !== "album" ? (
                    <img
                      loading="lazy"
                      src={
                        props.page === "artist"
                          ? song.album.images[0].url
                          : song.track.album.images[0].url
                          ? song.track.album.images[0].url
                          : "/blank.jpg"
                      }
                      alt="Song"
                    />
                  ) : null}
                  <div className={styles["song-artist-column"]}>
                    <div className={styles["song-name"]}>
                      {props.page === "artist"
                        ? song.name
                        : props.page === "album"
                        ? song.name
                        : song.track.name}
                    </div>
                    <div className={styles["artist-links"]}>
                      {props.page === "artist"
                        ? song.artists.map((artist, i) => (
                            <React.Fragment key={i}>
                              <Link
                                className={styles["song-link"]}
                                to={`/artist/${artist.id}`}
                              >
                                {artist.name}
                              </Link>
                              {song.artists.length - 2 < i ? null : ", "}
                            </React.Fragment>
                          ))
                        : props.page !== "album" &&
                          song.track.artists.map((artist, i) => (
                            <React.Fragment key={i}>
                              <Link
                                className={styles["song-link"]}
                                to={`/artist/${artist.id}`}
                              >
                                {artist.name}
                              </Link>
                              {song.track.artists.length - 2 < i ? null : ", "}
                            </React.Fragment>
                          ))}
                    </div>
                  </div>
                </div>
                {props.page === "artist" ? (
                  <div className={styles.album}>
                    <Link to={`/album/${song.album.id}`}>
                      {song.album.name}
                    </Link>
                  </div>
                ) : (
                  props.page !== "album" && (
                    <div className={styles.album}>
                      <Link to={`/album/${song.track.album.id}`}>
                        {song.track.album.name}
                      </Link>
                    </div>
                  )
                )}
                {props.page === "artist" ? (
                  <div className={styles.date}>
                    formatDate(song.album.release_date)
                  </div>
                ) : (
                  props.page !== "album" && (
                    <div className={styles.date}>
                      {formatDate(song.added_at)}
                    </div>
                  )
                )}
                <div className={styles.duration}>
                  <span>
                    {props.page === "artist" || props.page === "album"
                      ? millisToMinutesAndSeconds(song.duration_ms)
                      : props.page !== "album" &&
                        millisToMinutesAndSeconds(song.track.duration_ms)}
                  </span>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SongList;
