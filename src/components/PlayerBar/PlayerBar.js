import styles from './Playerbar.module.css'
import React, { useEffect } from 'react';
import Icon from '../UI/Icon';
import { Link } from 'react-router-dom';

const Playerbar = () => {

    useEffect(() => {
        window.addInputRangeStyle();
    }, [window.addInputRangeStyle]);

    return (
        <div className={styles.bar}>
            <div className={styles['now-playing']}>
                <img className={styles['now-playing-cover']} alt="Song Cover" src="/browse-card-images/new-releases.jfif" />
                <div className={styles['now-playing-info']}>
                    <Link to="" className={styles['now-playing-info-title']}>Bregovic: Ederlezi</Link>
                    <div className={styles['now-playing-info-artist']}>
                        <Link to="">Goran Bregovic</Link><span>,</span>
                        <Link to="">Nigel Kennedy</Link></div>
                </div>
                <div className={styles['now-playing-action-button']}>
                    <Icon name="player-heart" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                </div>
                <div className={styles['now-playing-action-button']}>
                    <Icon name="player-pip-toggle" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                </div>
            </div>
            <div className={styles['player-controls']}>
                <div className={styles['player-control-buttons']}>
                    <Icon name="player-shuffle" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                    <Icon name="player-skip-back" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                    <div className={styles['player-control-play']}>
                        <Icon name="player-play" color="black" width={16} height={16} />
                    </div>
                    <Icon name="player-skip-forward" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                    <Icon name="player-repeat" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                </div>
                <div className={styles['player-control-bar']}>
                    <div className={styles['player-control-position']}>
                        7:51
                    </div>
                    <div className={styles['player-control-progress']}>
                        <input className={styles['player-control-progress-input']} type="range" min={0} max={100} step={2} defaultValue={0} />
                    </div>
                    <div className={styles['player-control-duration']}>
                        9:40
                    </div>
                </div>
            </div>
            <div className={styles.controls}>
                <Icon name="player-queue" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                <Icon name="player-devices" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                <Icon name="player-volume-off" color="rgb(255, 255, 255, .7)" width={16} height={16} />
                <div className={styles['player-volume-bar']}>
                    <input className={styles['player-control-progress-input']} type="range" min={0} max={100} step={1} />
                </div>
            </div>
        </div>
    )
}

export default Playerbar;