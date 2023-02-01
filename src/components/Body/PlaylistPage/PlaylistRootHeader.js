import React from "react";
import styles from "./PlaylistRootHeader.module.css";
import { numberWithCommas } from "../../../utils";

const PlaylistRootHeader = (props) => {
  return (
    <div
      className={styles.header}
      style={{ backgroundColor: "rgb(var(--navbar-background-color))" }}
    >
      <div className={styles.noise}></div>
      <div
        className={
          props.page === "artist"
            ? styles["header-image-artist"]
            : styles["header-image"]
        }
      >
        <img loading="lazy" src={props.image} alt="Playlist Cover" />
      </div>
      <div className={styles["header-info"]}>
        {props.page !== "artist" && (
          <div className={styles["header-info-type"]}>Playlist</div>
        )}
        <div className={styles["header-info-name"]}>{props.name}</div>
        <div className={styles["header-info-description"]}>
          {props.description}
        </div>
        <div className={styles["header-info-bottom"]}>
          {props.page === "artist" ? (
            <span>
              {props.listeners ? numberWithCommas(props.listeners) : 0} monthly
              listeners
            </span>
          ) : (
            <React.Fragment>
              <img
                loading="lazy"
                src={props.ownerPP}
                width={24}
                height={24}
                alt={`${props.owner}'s profile`}
              />{" "}
              <span>{props.owner}</span>
              {props.followers > 0 ? ` • ${props.followers} likes` : null}{" "}
              {props.count > 0 ? ` • ${props.count} song` : null}
              {props.count > 1 ? "s" : null}
              {props.count > 0 ? <span>, {props.duration}</span> : null}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistRootHeader;
