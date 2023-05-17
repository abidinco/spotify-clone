import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../store";

import Icon from "./Icon";
import styles from "./PlayCard.module.css";

const PlayCard = (props) => {
  const appCtx = useContext(AppContext);
  return (
    <Link
      to={props.href}
      className={[props.className, styles.wrapper, "pointer"].join(" ")}
    >
      <img
        loading="lazy"
        className={props.rounded ? styles.rounded : null}
        src={props.cover}
        alt="Cover"
      />
      <div className={styles.title}>{props.title}</div>
      <div className={styles.subtitle}>{props.subtitle}</div>
      {!props.dontShowPlayButton && props.trackUrl && (
        <div
          className={styles["button-wrapper"]}
          onClick={() => appCtx.handlePlayerChangeTrack(props.trackUrl)}
        >
          <Icon name="player-play" color="black" width={18} height={18} />
        </div>
      )}
    </Link>
  );
};

export default PlayCard;
