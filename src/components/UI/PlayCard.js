import React from "react";
import styles from './PlayCard.module.css';
import Icon from './Icon';

const PlayCard = (props) => {
    return (
        <div className={styles.wrapper}>
            <img className={props.rounded ? styles.rounded : null} src={props.cover} alt="Cover" />
            <div className={styles.title}>{props.title}</div>
            <div className={styles.subtitle}>{props.subtitle}</div>
            {!props.dontShowPlayButton &&
                <div className={styles['button-wrapper']}>
                    <Icon name="player-play" color="black" width={18} height={18} />
                </div>
            }
        </div>
    )
}

export default PlayCard;