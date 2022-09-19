import React from "react";
import styles from './TopItem.module.css';
import Icon from "./Icon";

const TopItem = (props) => {
    return(
        <div className={styles.wrapper}>
            <img src={props.image} alt="Top Item Cover" />
            <div>{props.name}</div>
            <div className={styles.button}>
                <Icon name="player-play" width={20} height={20} color="#000" />
            </div>
        </div>
    )
}

export default TopItem;