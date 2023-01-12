import React from "react";
import styles from "./TopItem.module.css";
import Icon from "./Icon";
import { Link } from "react-router-dom";

const TopItem = (props) => {
  return (
    <Link to={props.href} className={styles.wrapper}>
      <img src={props.image} alt="Top Item Cover" />
      <div>{props.name}</div>
      <div className={[styles.button, "pointer"].join(" ")}>
        <Icon name="player-play" width={20} height={20} color="#000" />
      </div>
    </Link>
  );
};

export default TopItem;
