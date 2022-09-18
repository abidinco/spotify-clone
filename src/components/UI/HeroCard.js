import React from "react";
import styles from './HeroCard.module.css';
import Icon from './Icon';

const HeroCard = (props) => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.list}>
                <span>Erkan Oğur</span>
                <span>Gnossienne No.1</span>
                <span>Erkan Oğur</span>
                <span>Gnossienne No.1</span>
                <span>Erkan Oğur</span>
                <span>Gnossienne No.1</span>
                <span>Erkan Oğur</span>
                <span>Gnossienne No.1</span>
            </div>
            <div className={styles.name}>Liked Songs</div>
            <div className={styles.count}>{props.count} liked songs</div>
            <div className={styles['button-wrapper']}>
                <Icon name="player-play" color="black" width={18} height={18} />
            </div>
        </div>
    )
}

export default HeroCard;